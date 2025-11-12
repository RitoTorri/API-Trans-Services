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

        // Validar que no exista una nómina solapada para el mismo empleado
        const overlappingPayrolls = await model.getPayrolls({
            employee_id: payroll.employee_id,
            period_start: {
                lte: payroll.period_end
            },
            period_end: {
                gte: payroll.period_start
            }
        });

        if (overlappingPayrolls.length > 0) {
            throw new Error('Payroll period overlaps with an existing record.');
        }

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

            // Ajuste de fechas para cubrir todo el mes en UTC
            const startDate = new Date(`${year}-${String(month).padStart(2, '0')}-01T00:00:00.000Z`);
            const endDate = new Date(`${year}-${String(month).padStart(2, '0')}-${new Date(year, month, 0).getDate()}T23:59:59.999Z`);

            filter = {
                period_start: {
                    gte: startDate,
                    lte: endDate
                }
            };

        } else if (filterSearch.year) {
            const year = parseInt(filterSearch.year);

            // Ajuste de fechas para cubrir todo el año en UTC
            const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
            const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

            filter = {
                period_start: {
                    gte: startDate,
                    lte: endDate
                }
            };

        } else filter = {};

        console.log("Filtro aplicado:", filter);
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

        // Validar que no exista una nómina solapada para el mismo empleado (excluyendo la actual)
        const overlappingPayrolls = await model.getPayrolls({
            employee_id: payroll.employee_id,
            period_start: {
                lte: payroll.period_end
            },
            period_end: {
                gte: payroll.period_start
            }
        });

        const overlaps = overlappingPayrolls.filter(p => p.id !== payroll.id);
        if (overlaps.length > 0) {
            throw new Error('Payroll period overlaps with an existing record.');
        }

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