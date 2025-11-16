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

            const payrollFinal = this.CalculatePayrolls(payroll);

            return await model.addPayrolls(payrollFinal);
        } catch (error) { throw error; }
    }

    async getPayrolls(filterSearch) {
        try {
            let filter = {};

            /* Recibimos esto:
                {   
                    dateStart: 2002-10-10,
                    dateEnd: 2002-10-10
                }
            */
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
            return result.map(result => {
                let year = new Date().getFullYear() - new Date(result.employees.created_at).getFullYear();
                let month = new Date().getMonth() - new Date(result.employees.created_at).getMonth();

                return {
                    id: result.id,
                    status: result.status,
                    employee: {
                        name: result.employees.name,
                        ci: result.employees.ci,
                        rol: result.employees.rol,
                        old_date: `Años ${year} y Meses ${month}`, // Antigüedad en años
                        date_of_entry: result.employees.created_at // Año de ingreso
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
                        salary_biweekly: result.assements,
                        monthly_salary: result.monthly_salary,
                        deductions: {
                            ivss: result.ivss,
                            pie: result.pie,
                            faov: result.faov
                        },
                        totalDeductions: result.total_deductions,
                        net_salary: result.net_salary
                    }
                };
            });
        } catch (error) { throw error; }
    }


    async updatePayrollState(payroll) {
        try {
            // Verificamos que exita la nomina
            const existPayroll = await model.getPayrollById(payroll.id);
            if (!existPayroll) throw new Error('Payroll not found.');

            if (existPayroll.status !== "draft") throw new Error('This payroll can not modify.');

            const id = payroll.id;
            delete payroll.id;

            return await model.updatePayrollState(id, payroll);
        } catch (error) { throw error; }
    }

    async updatePayrolls(payroll) {
        try {
            // Verificamos que exita la nomina
            const existPayroll = await model.getPayrollById(payroll.id);
            if (!existPayroll) throw new Error('Payroll not found.');

            if (existPayroll.status !== "draft") throw new Error('This payroll can not modify.');

            // Verficar que el empleado exista
            const employee = await employeeModel.getEmployeeById(payroll.employee_id);
            if (!employee) throw new Error('Employee not found.');

            const payrollFinal = this.CalculatePayrolls(payroll);

            const id = payrollFinal.id;
            delete payrollFinal.id;

            return await model.updatePayrolls(id, payrollFinal);
        } catch (error) { throw error; }
    }

    CalculatePayrolls(payroll) {
        // Calculos
        let assements = Math.round(payroll.daily_salary * payroll.total_days_paid);
        let monthly_salary = assements * 2;

        let ivss = isrCalculator(assements, payroll.ivss);
        ivss = ivss.toFixed(2);

        let pie = isrCalculator(assements, payroll.pie);
        pie = pie.toFixed(2);

        let faov = isrCalculator(assements, payroll.faov);
        faov = faov.toFixed(2);

        let totalDeductions = parseFloat(ivss) + parseFloat(pie) + parseFloat(faov);
        let net_salary = assements - totalDeductions;

        payroll.assements = assements;
        payroll.monthly_salary = monthly_salary;
        payroll.total_deductions = totalDeductions;
        payroll.net_salary = net_salary;

        return payroll;
    }
}

export default PayrollsService;