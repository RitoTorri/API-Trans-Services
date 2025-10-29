// imports
import PayrollsService from './payrolls.service.js';
import responses from '../../shared/utils/responses.js';

// variables e instancias
const service = new PayrollsService();

class PayrollsController {
    constructor() { }

    async addPayrolls(req, res) {
        try {
            // Destructuracion de los parametros
            const { employee_id, base_salary, period_start, period_end, payment_date, hours_worked, bonus, deductions } = req.body;

            // Contruccion de nuevo objeto
            const payroll = {
                employee_id: parseInt(employee_id),
                base_salary: parseFloat(base_salary),
                period_start: new Date(period_start),
                period_end: new Date(period_end),
                payment_date: new Date(payment_date),
                hours_worked: parseInt(hours_worked),
            };

            if (bonus) payroll.bonus = parseFloat(bonus);
            if (deductions) payroll.deductions = parseFloat(deductions);

            // Guardamos el objeto en la base de datos
            const result = await service.addPayrolls(payroll);
            return responses.QuerySuccess(res, result);

        } catch (error) {
            if (error.message === 'Employee not found.') return responses.ItemNotFound(res, "Not exist employee with this id.");
            return responses.ErrorInternal(res, error.message);
        }
    }

    async getPayrolls(req, res) {
        try {
            const { filterSearch } = req.body;
            const payrolls = await service.getPayrolls(filterSearch);
            return responses.QuerySuccess(res, payrolls);

        } catch (error) {
            return responses.ErrorInternal(res, error.message);
        }
    }

    async updatePayrollState(req, res) {
        try {
            const payroll = {
                id: parseInt(req.params.id),
                status: req.params.status
            };

            const result = await service.updatePayrollState(payroll);
            return responses.QuerySuccess(res, { message: "payroll update succefully.", data: result });

        } catch (error) {
            if (error.message === 'Payroll not found.') {
                return responses.ItemNotFound(res, "Not exist payroll with this id.");
            }

            if (error.message === "This payroll can not modify.") {
                return responses.ResConflict(res, "This payroll can not modify. ");
            }

            return responses.ErrorInternal(res, error.message);
        }
    }

    async updatePayrolls(req, res) {
        try {
            // Destructuracion de los parametros
            const { id } = req.params;
            const { employee_id, base_salary, period_start, period_end, payment_date, hours_worked, bonus, deductions } = req.body;

            // Contruccion de nuevo objeto
            const payroll = {
                id: parseInt(id),
                employee_id: parseInt(employee_id),
                base_salary: parseFloat(base_salary),
                period_start: new Date(period_start),
                period_end: new Date(period_end),
                payment_date: new Date(payment_date),
                hours_worked: parseInt(hours_worked),
            };

            if (bonus) payroll.bonus = parseFloat(bonus);
            if (deductions) payroll.deductions = parseFloat(deductions);

            const result = await service.updatePayrolls(payroll);
            return responses.QuerySuccess(res, { message: "payroll update succefully.", data: result });

        } catch (error) {
            if (error.message === 'Payroll not found.') {
                return responses.ItemNotFound(res, "Not exist payroll with this id.");
            }

            if (error.message === "This payroll can not modify.") {
                return responses.ResConflict(res, "This payroll can not modify. ");
            }

            if (error.message === 'Employee not found.') {
                return responses.ItemNotFound(res, "Not exist employee with this id.");
            }
            return responses.ErrorInternal(res, error.message);
        }
    }
}

export default PayrollsController;