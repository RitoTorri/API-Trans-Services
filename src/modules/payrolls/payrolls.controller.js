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
            const { employee_id, period_start, period_end } = req.body;

            // Contruccion de nuevo objeto
            const payroll = {
                employee_id: parseInt(employee_id), // ID del empleado asociado a esta nómina
                period_start: new Date(period_start), // Fecha de inicio del período de nómina
                period_end: new Date(period_end), // Fecha de fin del período de nómina
            };

            // Guardamos el objeto en la base de datos
            const result = await service.addPayrolls(payroll);
            return responses.QuerySuccess(res, result);

        } catch (error) {
            if (error.message === 'Employee already has a payroll.') {
                return responses.ResConflict(res, "Employee already has a payroll for the specified period.");
            }

            if (error.message === 'Employee not found.') {
                return responses.ItemNotFound(res, "Not exist employee with this id.");
            }
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
            return responses.QuerySuccess(res, { data: result });

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
}

export default PayrollsController;