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
            const { employee_id, period_start, period_end, daily_salary, total_days_paid, ivss, pie, faov } = req.body;

            // Contruccion de nuevo objeto
            const payroll = {
                employee_id: parseInt(employee_id), // ID del empleado asociado a esta nómina
                period_start: new Date(period_start), // Fecha de inicio del período de nómina
                period_end: new Date(period_end), // Fecha de fin del período de nómina
                daily_salary: parseFloat(daily_salary), // Salario base diario
                total_days_paid: parseInt(total_days_paid), // Total de días pagados en el período
                ivss: parseFloat(ivss), // Deducción por seguro social 
                pie: parseFloat(pie), // Deducción por paro forzoso
                faov: parseFloat(faov), // Aporte al fondo de ahorro
            };

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
                return responses.ResConflict(res, "This payroll can not modify. Becaise it is not draft.");
            }

            return responses.ErrorInternal(res, error.message);
        }
    }

    async updatePayrolls(req, res) {
        try {
            // Destructuracion de los parametros
            const { id } = req.params;
            const { period_start, period_end, daily_salary, total_days_paid, ivss, pie, faov } = req.body;

            // Contruccion de nuevo objeto
            const payroll = {
                id: parseInt(id), // ID de la nomina
                period_start: new Date(period_start), // Fecha de inicio del período de nómina
                period_end: new Date(period_end), // Fecha de fin del período de nómina
                daily_salary: parseFloat(daily_salary), // Salario base diario
                total_days_paid: parseInt(total_days_paid), // Total de días pagados en el período
                ivss: parseFloat(ivss), // Deducción por seguro social 
                pie: parseFloat(pie), // Deducción por paro forzoso
                faov: parseFloat(faov), // Aporte al fondo de ahorro
            };

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