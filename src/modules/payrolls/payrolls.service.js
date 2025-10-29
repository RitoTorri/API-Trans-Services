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

            if (filterSearch.year && filterSearch.month) {
                // CONVERTIR a números y ajustar meses (0-based)
                const year = parseInt(filterSearch.year);
                const month = parseInt(filterSearch.month);

                filter = {
                    period_start: {
                        gte: new Date(year, month - 1, 1),
                        lte: new Date(year, month, 0)
                    }
                };

            } else if (filterSearch.year) {
                const year = parseInt(filterSearch.year);
                filter = {
                    period_start: {
                        gte: new Date(year, 0, 1),
                        lte: new Date(year, 11, 31)
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