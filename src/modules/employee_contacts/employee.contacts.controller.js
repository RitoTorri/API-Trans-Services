// imports
import { parse } from 'dotenv';
import responses from '../../shared/utils/responses.js'
import ServiceEmployeeContacts from './employee.contacts.service.js';

// variables e instancias
const service = new ServiceEmployeeContacts();

class ControllerEmployeeContacts {
    constructor() { }

    async addEmployeeContact(req, res) {
        try {
            // Destructurar los datos de la petición
            const { employee_id } = req.params;
            const { contact_info } = req.body;

            // Objeto con los datos del contacto
            const object = {
                employee_id: parseInt(employee_id),
                contact_info: contact_info,
            };

            // Llamar al servicio
            const result = await service.addEmployeeContact(object);
            return responses.QuerySuccess(res, result);

        } catch (error) {
            if (error.message === 'Contact info already exists.') {
                return responses.ResConflict(res, "Contact info already exists.");
            }

            if (error.message === 'Employee not found.') {
                return responses.ItemNotFound(res, "Employee not found.");
            }

            return responses.ErrorInternal(res, error.message);
        }
    }

    async deleteEmployeeContact(req, res) {
        try {
            // Destructurar los datos de la petición
            const { contact_id } = req.params;

            const result = await service.deleteEmployeeContact(parseInt(contact_id));
            return responses.QuerySuccess(res, { message: "Contact deleted successfully.", data: result });

        } catch (error) {
            if (error.message === 'Contact not found.') {
                return responses.ItemNotFound(res, "Contact not found.");
            }

            return responses.ErrorInternal(res, error.message);
        }
    }
}

export default ControllerEmployeeContacts;