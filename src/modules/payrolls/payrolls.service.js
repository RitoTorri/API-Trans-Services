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

            // Calculos
            let salaryFinal = payroll.base_salary;

            if (payroll.bonus) {
                salaryFinal = isrCalculator.salaryBonus(salaryFinal, payroll.bonus);
            }

            if (payroll.deductions) {
                salaryFinal = isrCalculator.salaryDeductions(salaryFinal, payroll.deductions);
            }

            if (!payroll.bonus && !payroll.deductions) salaryFinal = payroll.base_salary;

            payroll.net_salary = salaryFinal;
            return await model.addPayrolls(payroll);
        } catch (error) { throw error; }
    }

    async getPayrolls(filterSearch) {
        try {
            let filter = {};

            /*
                Recibimos esto:
                {   
                    dateStart: 2002-10-10,
                    dateEnd: 2002-10-10
                }
            */

            if (filterSearch.dateStart && filterSearch.dateEnd) {
                const startDate = new Date(filterSearch.dateStart);
                const endDate = new Date(filterSearch.dateEnd);

                filter = {
                    period_start: {
                        gte: new Date(startDate),
                        lte: new Date(endDate)
                    }
                };
            } else filter = {};

            return await model.getPayrolls(filter);
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

            // Verficar que el empleado exista
            const employee = await employeeModel.getEmployeeById(payroll.employee_id);
            if (!employee) throw new Error('Employee not found.');

            if (existPayroll.status !== "draft") throw new Error('This payroll can not modify.');

            // Calculos
            let salaryFinal = payroll.base_salary;

            if (payroll.bonus) {
                salaryFinal = isrCalculator.salaryBonus(salaryFinal, payroll.bonus);
            }

            if (payroll.deductions) {
                salaryFinal = isrCalculator.salaryDeductions(salaryFinal, payroll.deductions);
            }

            if (!payroll.bonus && !payroll.deductions) salaryFinal = payroll.base_salary;

            payroll.net_salary = salaryFinal;

            const id = payroll.id;
            delete payroll.id;

            return await model.updatePayrolls(id, payroll);
        } catch (error) { throw error; }
    }
}

export default PayrollsService;