import responses from '../../shared/utils/responses.js' // imports de utilidades

// Importaciones de clases
import ServiceEmployee from './employee.service.js';
const service = new ServiceEmployee();

class ControllerEmployee {
    constructor() { }

    // Método para consultar todos los empleados
    async getAllEmployees(req, res) {
        try {
            const result = await service.getAllEmployees(req.filter);
            return responses.QuerySuccess(res, result);

        } catch (error) {
            return responses.ErrorInternal(res, error.message);
        }
    }

    // Método para crear un empleado
    async createEmployee(req, res) {
        try {
            // Destructurar los datos de la petición
            const { name, lastname, ci, rol, salary_monthly, date_of_entry, contacts } = req.body;

            // Objeto con los datos del empleado
            const employee = {
                name: name,
                lastname: lastname,
                ci: ci,
                rol: rol,
                salary_monthly: salary_monthly,
                date_of_entry: new Date(date_of_entry)
            };
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

            return responses.ErrorInternal(res, error.message);
        }
    }

    // Método para eliminar un empleado
    async deleteEmployee(req, res) {
        try {
            // Destructurar los datos de la petición
            const { id } = req.params;
            const result = await service.deleteEmployee({ id: parseInt(id) });

            return responses.QuerySuccess(res, { message: 'Employee deleted successfully.', result: result });

        } catch (error) {
            if (error.message === 'Employee not found.') {
                return responses.ItemNotFound(res, "Not exist employee with this id.");
            }

            return responses.ErrorInternal(res, error.message);
        }
    }

    // Método para actualizar un empleado
    async updateEmployee(req, res) {
        try {
            // Destructurar los datos de la petición
            const { id } = req.params;
            const { name, lastname, ci, rol, salary_monthly, date_of_entry, contacts } = req.body;

            let employee = { id: parseInt(id) }

            if (name) employee.name = name;
            if (lastname) employee.lastname = lastname;
            if (ci) employee.ci = ci;
            if (rol) employee.rol = rol;
            if (salary_monthly) employee.salary_monthly = salary_monthly;
            if (date_of_entry) employee.date_of_entry = date_of_entry;

            const result = await service.updateEmployee(employee, (contacts) ? contacts : []);
            return responses.QuerySuccess(res, result);

        } catch (error) {
            if (error.message === 'Employee not found.') {
                return responses.ItemNotFound(res, "Not exist employee with this id.");
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