// Importaciones de clases
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class ModelEmployeeContacts {
    constructor() { }

    // Método para crear un contacto
    async addEmployeeContact(object) {
        try {
            return await prisma.employee_contacts.create({
                data: object
            });
        } catch (error) { throw error; }
    }

    // Método para eliminar un contacto
    async deleteEmployeeContact(id) {
        try {
            return await prisma.employee_contacts.delete({
                where: { id: id }
            });
        } catch (error) { throw error; }
    }

    async updateEmployeeContact(object) {
        try {
            return await prisma.$transaction(async (prisma) => {
                const updatePromises = object.map(contact =>
                    prisma.employee_contacts.update({
                        where: {
                            id: contact.id  // Usamos el ID de cada contacto
                        },
                        data: {
                            contact_info: contact.contact_info
                        }
                    })
                );

                return await Promise.all(updatePromises);
            });
        } catch (error) { throw error; }
    }

    // Método para consultar un contacto por su valor de contact_info
    async getContactInfo(info) {
        try {
            return await prisma.employee_contacts.findFirst({
                where: { contact_info: info }
            });
        } catch (error) { throw error; }
    }

    async getContactInfoAll(array) {
        try {
            const maped = array.map(c => c.contact_info);

            return await prisma.employee_contacts.findMany({
                where: { contact_info: { in: maped } },
                select: { contact_info: true }
            });

        } catch (error) { throw error; }
    }

    async getContactByIdAll(array) {
        try {
            const maped = array.map(c => c.id);

            return await prisma.employee_contacts.findMany({
                where: { id: { in: maped } },
                select: { contact_info: true }
            });

        } catch (error) { throw error; }
    }

    async getContactById(id) {
        try {
            return await prisma.employee_contacts.findFirst({
                where: { id: id }
            });
        } catch (error) { throw error; }
    }
}

export default ModelEmployeeContacts;