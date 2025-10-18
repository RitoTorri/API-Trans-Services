// imports
import responses from '../../shared/utils/responses.js'
import ServiceEmployee from './employee.service.js';

// variables e instancias
const service = new ServiceEmployee();

class ControllerEmployee {
    constructor() { }

    async getAllEmployees(req, res) {
        try {
            // debugger
            console.log("Estamos en el controller");
            console.log(req.filter);
            const result = await service.getAllEmployees(req.filter);
            return responses.QuerySuccess(res, result);

        } catch (error) {
            return responses.ErrorInternal(res, "Error Internal Server");
        }
    }

    async createEmployee(req, res) {
        try {
            // debugger
            console.log("Estamos en el controller");
            console.log(req.body);

            const { name, lastname, ci, rol } = req.body;
            const object = { name: name, lastname: lastname, ci: ci, rol: rol };

            const result = await service.createEmployee(object);
            return responses.ItemCreated(res, result);
        } catch (error) {
            if (error.message === 'Employee exists ci.') return responses.ResConflict(res, "Employee already exists with this ci..");
            return responses.ErrorInternal(res, "Error Internal Server");
        }
    }
}

export default ControllerEmployee;