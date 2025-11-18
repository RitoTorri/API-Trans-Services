// imports
import modelEmployee from '../employee/employee.model.js';
import modelPayrolls from './payrolls.model.js';
import isrCalculator from '../../shared/utils/isr.calculator.js';

// variables e instancias
const model = new modelPayrolls();
const employeeModel = new modelEmployee();

class PayrollsService {
    constructor() { }

    async addPayrolls(payroll) {
        try {
            // Verficar que el empleado exista
            const employee = await employeeModel.getEmployeeById(payroll.employee_id);
            if (!employee) throw new Error('Employee not found.');

            /* 
              Calculamos las retenciones aplicadas y las ganancias mensuales, quincenales y anuales
              Esto me devuel un array de objetos que contienen los datos de la nomina y las retenciones 
              de esa nomina
            */
            const payrollFinal = this.CalculatePayrolls(payroll);

            // Sacamos las retenciones de la nomina
            delete payrollFinal[0].ivss;
            delete payrollFinal[0].pie;
            delete payrollFinal[0].faov;

            // EL 0 es el payroll y el 1 es las retenciones de la nomina
            return await model.addPayrolls(payrollFinal[0], payrollFinal[1]);
        } catch (error) { throw error; }
    }

    async getPayrolls(filterSearch) {
        try {
            let filter = {};

            if (filterSearch.status) {
                filter = { status: filterSearch.status }

            } else if (filterSearch.dateStart && filterSearch.dateEnd) {
                const startDate = new Date(filterSearch.dateStart);
                const endDate = new Date(filterSearch.dateEnd);

                filter = {
                    period_start: {
                        gte: new Date(startDate),
                    },
                    period_end: {
                        lte: new Date(endDate)
                    }
                };
            } else filter = {};

            const result = await model.getPayrolls(filter);

            // Mensaje burda de grande. Pero retorna los necesario para el frontend
            return result.map(result => {
                let year = new Date().getFullYear() - new Date(result.employee.created_at).getFullYear();
                let month = new Date().getMonth() - new Date(result.employee.created_at).getMonth();
                let ivssResult = parseFloat(result.payrolls_retentions[0].total_retention);
                let pieResult = parseFloat(result.payrolls_retentions[1].total_retention);
                let faovResult = parseFloat(result.payrolls_retentions[2].total_retention);
                let totalDeductions = ivssResult + pieResult + faovResult;
                let netSalaryResult = parseFloat(result.assignments) - parseFloat(totalDeductions);

                return {
                    id: result.id,
                    status: result.status,
                    employee: {
                        name: result.employee.name,
                        ci: result.employee.ci,
                        rol: result.employee.rol,
                        old_date: `Años ${year} y Meses ${month}`, // Antigüedad en años
                        date_of_entry: result.employee.created_at // Año de ingreso
                    },
                    Payment_period: {
                        from: result.period_start,
                        to: result.period_end
                    },
                    details: {
                        salary_daily: result.daily_salary,
                        total_days_paid: result.total_days_paid,
                        integral_salary: result.integral_salary,
                        annual_earnings: result.annual_earnings,
                    },
                    description: {
                        salary_biweekly: result.assignments,
                        monthly_salary: result.monthly_salary,
                        deductions: {
                            ivss: ivssResult,
                            pie: pieResult,
                            faov: faovResult
                        },
                        totalDeductions: totalDeductions,
                        net_salary: netSalaryResult
                    }
                };
            });
        } catch (error) { throw error; }
    }


    async updatePayrollState(payroll) {
        try {
            // Verificamos que exista la nomina
            const existPayroll = await model.getPayrollById(payroll.id);
            if (!existPayroll) throw new Error('Payroll not found.');

            // Si el estado de la nominaes "paid" o "cancelled" no se puede modificar
            if (existPayroll.status !== "draft") throw new Error('This payroll can not modify.');

            // Sacamos el id de la nomina para no actualizarla
            const id = payroll.id;
            delete payroll.id;

            if (payroll.status === "paid") {
                let totalRetentions = 0; // Almacena lo que se retiene de la nomina

                // Sumamos todas las retenciones de la nomina ivss + pie + faov
                for (const element of existPayroll.payrolls_retentions) {
                    totalRetentions += parseFloat(element.total_retention);
                }

                // Se le resta las retenciones a las asignaciones
                const totalExpense = existPayroll.assignments - totalRetentions;

                // Obtenemos los datos del empleado de la nomina
                const employee = await employeeModel.getEmployeeById(existPayroll.employee_id);

                // Creamos la descripcion del pago de la nomina
                let dateStart = new Date(existPayroll.period_start);
                let dateEnd = new Date(existPayroll.period_end);

                dateStart = dateStart.toISOString().split('T')[0];
                dateEnd = dateEnd.toISOString().split('T')[0];

                const description = `Pago de la nomina de ${employee.name} ${employee.lastname} desde ${dateStart} hasta ${dateEnd}`;
                return await model.updatePayrollStatePaid(id, totalExpense, description);
            }

            return await model.updatePayrollStateCancelled(id);
        } catch (error) { throw error; }
    }

    async updatePayrolls(payroll) {
        try {
            // Verificamos que exita la nomina
            const existPayroll = await model.getPayrollById(payroll.id);
            if (!existPayroll) throw new Error('Payroll not found.');

            if (existPayroll.status !== "draft") throw new Error('This payroll can not modify.');

            /* 
                Calculamos las retenciones aplicadas y las ganancias mensuales, quincenales y anuales
                Esto me devuel un array de objetos que contienen los datos de la nomina y las retenciones 
                de esa nomina
            */
            const payrollFinal = this.CalculatePayrolls(payroll);

            // sacamos el id de la nomina para no actualizarla
            const id = payrollFinal[0].id;
            delete payrollFinal[0].id;

            // Eliminamos las retenciones del objeto de la nomina
            delete payrollFinal[0].ivss;
            delete payrollFinal[0].pie;
            delete payrollFinal[0].faov;

            // EL 0 es el payroll y el 1 es las retenciones de la nomina
            return await model.updatePayrolls(id, payrollFinal[0], payrollFinal[1]);
        } catch (error) { throw error; }
    }

    CalculatePayrolls(payroll) {
        let assignments = Math.round(payroll.daily_salary * payroll.total_days_paid); // salario quincenal
        let monthly_salary = assignments * 2; // salario mensual

        let retentions = [];

        // Calculamos el resultado obtenido con retenciones
        let ivss = isrCalculator(assignments, payroll.ivss);
        ivss = ivss.toFixed(2);

        let pie = isrCalculator(assignments, payroll.pie);
        pie = pie.toFixed(2);

        let faov = isrCalculator(assignments, payroll.faov);
        faov = faov.toFixed(2);

        // Creamos los objetos retenciones para devolver
        let ivssObj = {
            retention_code: "ivss",
            base_amount: assignments,
            rate_retention: payroll.ivss,
            total_retention: ivss
        }

        let pieObj = {
            retention_code: "pie",
            base_amount: assignments,
            rate_retention: payroll.pie,
            total_retention: pie
        }

        let faovObj = {
            retention_code: "faov",
            base_amount: assignments,
            rate_retention: payroll.faov,
            total_retention: faov
        }

        retentions.push(ivssObj);
        retentions.push(pieObj);
        retentions.push(faovObj);

        payroll.assignments = assignments;
        payroll.monthly_salary = monthly_salary;

        return [payroll, retentions];
    }
}

export default PayrollsService;