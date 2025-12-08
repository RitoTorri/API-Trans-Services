// imports
import modelEmployee from '../employee/employee.model.js';
import modelPayrolls from './payrolls.model.js';
import modelTaxParameters from '../tax_parameters/tax.parameters.model.js';
import isrCalculator from '../../shared/utils/isr.calculator.js';

// variables e instancias
const model = new modelPayrolls();
const employeeModel = new modelEmployee();
const taxParametersModel = new modelTaxParameters();

class PayrollsService {
    constructor() { }

    async addPayrolls(payroll) {
        try {
            // Verficar que el empleado exista
            const employee = await employeeModel.getEmployeeById(payroll.employee_id);
            if (!employee) throw new Error('Employee not found.');

            const employeeWithPayroll = await await model.validatedDuplicatePayroll(payroll.employee_id, payroll.period_start, payroll.period_end);
            if (employeeWithPayroll) throw new Error('Employee already has a payroll.');

            // Calculo de salario diario y total de días pagados
            payroll.daily_salary = (employee.salary_monthly / 30).toFixed(2);
            payroll.total_days_paid = 15;
            payroll.monthly_salary = employee.salary_monthly;
            payroll.assignments = Math.round(parseFloat(payroll.daily_salary) * payroll.total_days_paid);

            /* 
              Esta funcion calcula el total a reterner de la asignacion de la nomina.
              Tambien retorna el salario neto de la nomina
            */
            const payrollFinal = await this.CalculatePayrolls(payroll);

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
                let year = new Date().getFullYear() - new Date(result.employee.date_of_entry).getFullYear();
                let month = new Date().getMonth() - new Date(result.employee.date_of_entry).getMonth();
                let ssoResult = parseFloat(result.payrolls_retentions[0].total_retention);
                let pieResult = parseFloat(result.payrolls_retentions[1].total_retention);
                let faovResult = parseFloat(result.payrolls_retentions[2].total_retention);
                let totalDeductions = ssoResult + pieResult + faovResult;
                let netSalaryResult = parseFloat(result.assignments) - parseFloat(totalDeductions);

                return {
                    id: result.id,
                    status: result.status,
                    employee: {
                        name: result.employee.name,
                        ci: result.employee.ci,
                        rol: result.employee.rol,
                        old_date: `${year} años y ${month} meses`, // Antigüedad en años
                        date_of_entry: result.employee.date_of_entry.toISOString().split('T')[0] // Año de ingreso
                    },
                    Payment_period: {
                        from: result.period_start.toISOString().split('T')[0],
                        to: result.period_end.toISOString().split('T')[0]
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
                            sso: ssoResult,
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

    async CalculatePayrolls(payroll) {
        let retentions = [];

        // Busca las retenciones de la db
        const taxParameters = await taxParametersModel.getTaxParameters();

        // Sacamos los codigo y porcentaje de retenciones
        const SSO = taxParameters.find(tax => tax.code === "sso");
        const PIE = taxParameters.find(tax => tax.code === "pie");
        const FAOV = taxParameters.find(tax => tax.code === "faov");

        // Calculamos el total a retener
        const sso = isrCalculator(payroll.assignments, SSO.percentage);
        const pie = isrCalculator(payroll.assignments, PIE.percentage);
        const faov = isrCalculator(payroll.assignments, FAOV.percentage);

        // Creamos los objetos retenciones para devolver
        let ssoObj = {
            retention_code: SSO.code,
            base_amount: payroll.assignments,
            rate_retention: SSO.percentage,
            total_retention: sso
        }

        let pieObj = {
            retention_code: PIE.code,
            base_amount: payroll.assignments,
            rate_retention: PIE.percentage,
            total_retention: pie
        }

        let faovObj = {
            retention_code: FAOV.code,
            base_amount: payroll.assignments,
            rate_retention: FAOV.percentage,
            total_retention: faov
        }

        retentions.push(ssoObj);
        retentions.push(pieObj);
        retentions.push(faovObj);

        payroll.net_salary = parseFloat(payroll.assignments) - (parseFloat(sso) + parseFloat(pie) + parseFloat(faov));
        return [payroll, retentions];
    }
}

export default PayrollsService;