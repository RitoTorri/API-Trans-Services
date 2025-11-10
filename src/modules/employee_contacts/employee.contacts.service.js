// Importaciones de clases
import ModelEmployeeContacts from './employee.contacts.model.js';
const model = new ModelEmployeeContacts();

import ModelEmployee from '../employee/employee.model.js';
const modelEmployee = new ModelEmployee();

class ServiceEmployeeContacts {
    constructor() { }

    async addEmployeeContact(object) {
        try {
            // Verificar si el contacto ya existe
            const exist = await model.getContactInfo(object.contact_info);
            if (exist) throw new Error('Contact info already exists.');

            // Verificar si el empleado ya existe
            const existEmployee = await modelEmployee.getEmployeeById(object.employee_id);
            if (!existEmployee) throw new Error('Employee not found.');

            return await model.addEmployeeContact(object); // Llamar al modelo
        } catch (error) { throw error; }
    }

    async deleteEmployeeContact(id) {
        try {
            // Verificar si el registro existe
            const existContact = await model.getContactById(id);
            if (!existContact) throw new Error('Contact not found.');

            return await model.deleteEmployeeContact(id); // Llamar al modelo
        } catch (error) { throw error; }
    }

    async updateEmployeeContact(contacts) {
        try {
            // Verificar si el registro existe
            const existContact = await model.getContactByIdAll(contacts);
            if (!existContact) throw new Error('Contact not found.');

            // Verificar si el info de contacto ya existe
            const existContactInfo = await model.getContactInfoAll(contacts);
            if (existContactInfo.length > 0) throw new Error('Contact info already exists.');

            return await model.updateEmployeeContact(contacts); // Llamar al modelo
        } catch (error) { throw error; }
    }
}

export default ServiceEmployeeContacts;