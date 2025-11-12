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
            let { contact_info } = req.body;

            // Normalizar el contacto
            contact_info = contact_info.trim().toLowerCase();

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
            return responses.QuerySuccess(res, {
                message: "Contact deleted successfully.",
                data: result
            });

        } catch (error) {
            if (error.message === 'Contact not found.') {
                return responses.ItemNotFound(res, "Contact not found.");
            }

            return responses.ErrorInternal(res, error.message);
        }
    }
<<<<<<< Updated upstream
=======

    async updateEmployeeContact(req, res) {
        try {
            let { contacts } = req.body;
            let Parse = [];

            // Normalizar y parsear los datos
            contacts.forEach(contact => {
                Parse.push({
                    id: parseInt(contact.id),
                    contact_info: contact.contact_info.trim().toLowerCase()
                });
            });

            // Llamar al servicio
            const result = await service.updateEmployeeContact(Parse);

            // Respuesta con actualizados y omitidos
            return responses.QuerySuccess(res, {
                message: "Contact update completed.",
                updated: result.updated,
                skipped: result.skipped
            });

        } catch (error) {
            if (error.message === 'Contact not found.') {
                return responses.ItemNotFound(res, "Contact not found.");
            }

            if (error.message === 'All contact_info values already exist.') {
                return responses.ResConflict(res, "All contact_info values already exist.");
            }

            return responses.ErrorInternal(res, error.message);
        }
    }
>>>>>>> Stashed changes
}

export default ControllerEmployeeContacts;