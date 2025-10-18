// imports
import { PrismaClient } from '@prisma/client';

// variables e instancias
const prisma = new PrismaClient();

class ModelEmployee {
    constructor() { }

    async getAllEmployees(data) {
        try {
            if (data.filterSearch === 'all') return await prisma.employees.findMany({ where: { is_active: data.is_active } });

            return await prisma.employees.findMany({
                where: { ...data }
            });
        } catch (error) { throw error; }
    }

    async createEmployee(object) {
        try {
            return await prisma.employees.create({
                data: object
            });
        } catch (error) { throw error; }
    }
}

export default ModelEmployee;