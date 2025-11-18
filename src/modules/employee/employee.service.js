// Importaciones de clases
import ModelEmployee from './employee.model.js';
const model = new ModelEmployee();

import ModelEmployeeContacts from '../employee_contacts/employee.contacts.model.js';
const modelContacts = new ModelEmployeeContacts();

class ServiceEmployee {
    constructor() { }

    // Método para consultar todos los empleados
    async getAllEmployees(data) {
        try {
            return await model.getAllEmployees(data);
        } catch (error) { throw error; }
    }

    // Método para crear un empleado
    async createEmployee(employee, contacts) {
        try {
            // Verificar si existe un empleado con la cedula enviada
            const exist = await model.getAllEmployees({ ci: employee.ci });
            if (exist.length > 0) throw new Error('Employee exists ci.');

            // verificar contactos
            const contactsExist = await modelContacts.getContactInfoAll(contacts);
            if (contactsExist.length > 0) throw new Error('Contact info already exists.');

            // Crear empleado
            return await model.createEmployee(employee, contacts);
        } catch (error) { throw error; }
    }

    async deleteEmployee(object) {
        try {
            // Verificar si el empleado a eliminar existe
            const exist = await model.getEmployeeById(object.id);
            if (!exist) throw new Error('Employee not found.');

            return await model.deleteEmployee(object);
        } catch (error) { throw error; }
    }

    async updateEmployee(object, contacts) {
        try {
            // Verificar si el empleado a actualizar existe
            const exist = await model.getEmployeeById(object.id);
            if (!exist) throw new Error('Employee not found.');

            // Verificar si la cedula nueva ya existe en la db
            if (object.ci) {
                const ciExist = await model.getEmployeeByCi(object.ci);
                if (ciExist) throw new Error('Employee with this ci already exists.');
            }

            // Verificar si los contactos ya existen
            if (contacts.length > 0) {
                const contactsExist = await modelContacts.getContactInfoAll(contacts);
                if (contactsExist.length > 0) throw new Error('Contact info already exists.');
            }

            const idEmployee = object.id; // Obtener el id del empleado a actualizar
            delete object.id; // Eliminar el id del objeto

            return await model.updateEmployee(object, idEmployee, contacts);
        } catch (error) { throw error; }
    }

    async restoreEmployee(id) {
        try {
            // Verificar si el empleado a actualizar existe
            const exist = await model.getEmployeedDeletedById(id);
            if (!exist) throw new Error('Employee not found.');

            return await model.restoreEmployee(id);
        } catch (error) { throw error; }
    }
}

export default ServiceEmployee;