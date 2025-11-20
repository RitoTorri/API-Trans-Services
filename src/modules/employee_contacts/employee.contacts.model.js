// Importaciones de clases
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class ModelEmployeeContacts {
    constructor() { }

    // Método para consultar todos los contactos de un empleado
    async getContactInfoAll(array) {
        try {
            const maped = array.map(c => c.contact_info);

            return await prisma.employee_contacts.findMany({
                where: { contact_info: { in: maped } },
                select: { contact_info: true }
            });

        } catch (error) { throw error; }
    }
}

export default ModelEmployeeContacts;