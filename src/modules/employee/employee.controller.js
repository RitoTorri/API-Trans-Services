import responses from '../../shared/utils/responses.js' // imports de utilidades

// Importaciones de clases
import ServiceEmployee from './employee.service.js';
const service = new ServiceEmployee();

class ControllerEmployee {
    constructor() { }

    // Método para consultar todos los empleados
    async getAllEmployees(req, res) {
        try {
            const result = await service.getAllEmployees(req.filter, req.user.id);
            return responses.QuerySuccess(res, result);

        } catch (error) {
            return responses.ErrorInternal(res, error.message);
        }
    }

    // Método para crear un empleado
    async createEmployee(req, res) {
        try {
            // Destructurar los datos de la petición
            const { name, lastname, ci, rol, contacts } = req.body;

            // Objeto con los datos del empleado
            const employee = { name: name, lastname: lastname, ci: ci, rol: rol };
            const contactsEmployee = contacts;

            const result = await service.createEmployee(employee, contactsEmployee);
            return responses.ItemCreated(res, result);

        } catch (error) {
            if (error.message === 'Employee exists ci.') {
                return responses.ResConflict(res, "Employee already exists with this ci.");
            }

            if (error.message === 'Contact info already exists.') {
                return responses.ResConflict(res, "Contact info already exists.");
            }

            return responses.ErrorInternal(res, "Error Internal Server");
        }
    }

    // Método para eliminar un empleado
    async deleteEmployee(req, res) {
        try {
            // Destructurar los datos de la petición
            const { id } = req.params;
            const result = await service.deleteEmployee({ id: parseInt(id) }, req.user.id);

            return responses.QuerySuccess(res, { message: 'Employee deleted successfully.', result: result });

        } catch (error) {
            if (error.message === 'Employee not found.') {
                return responses.ItemNotFound(res, "Not exist employee with this id.");
            }

            if (error.message === 'You cannot delete yourself.') {
                return responses.UnauthorizedEdit(res, "You cannot delete yourself.");
            }

            return responses.ErrorInternal(res, error.message);
        }
    }

    // Método para actualizar un empleado
    async updateEmployee(req, res) {
        try {
            // Destructurar los datos de la petición
            const { id } = req.params;
            const { name, lastname, ci, rol } = req.body;

            let employee = { id: parseInt(id) }

            if (name) employee.name = name;
            if (lastname) employee.lastname = lastname;
            if (ci) employee.ci = ci;
            if (rol) employee.rol = rol;

            const result = await service.updateEmployee(employee, req.user.id);
            return responses.QuerySuccess(res, result);

        } catch (error) {
            if (error.message === 'Employee not found.') {
                return responses.ItemNotFound(res, "Not exist employee with this id.");
            }

            if (error.message === 'You cannot update yourself.') {
                return responses.UnauthorizedEdit(res, "You cannot update yourself.");
            }
            return responses.ErrorInternal(res, error.message);
        }
    }

    async restoreEmployee(req, res) {
        try {
            // Destructurar los datos de la petición
            const { id } = req.params;

            const result = await service.restoreEmployee(parseInt(id));
            return responses.QuerySuccess(res, result);

        } catch (error) {
            if (error.message === 'Employee not found.') {
                return responses.ItemNotFound(res, "Not exist employee with this id.");
            }
            return responses.ErrorInternal(res, error.message);
        }
    }
}

export default ControllerEmployee;