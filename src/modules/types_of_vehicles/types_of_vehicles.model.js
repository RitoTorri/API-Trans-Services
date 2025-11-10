import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class types_of_vehicles {
    constructor(){}
    async findAllTypes() {
        try {
            return await prisma.vehicle_types.findMany({
                orderBy: { id: 'asc' }
            });
        } catch (error) {
            // Es buena práctica lanzar el error para que el Service lo maneje
            throw error;
        }
    }

    async findTypeById(id) {
        try {
            return await prisma.vehicle_types.findUnique({
                where: { id: parseInt(id) }
            });
        } catch (error) {
            throw error;
        }
    }

    async createType(data) {
        // data esperada: { type_name, description }
        try {
            return await prisma.vehicle_types.create({
                data,
            });
        } catch (error) {
            throw error;
        }
    }

    async updateType(id, data) {
        try {
            return await prisma.vehicle_types.update({
                where: { id: parseInt(id) },
                data,
            });
        } catch (error) {
            throw error;
        }
    }

    async deleteType(id) {
        try {
            return await prisma.vehicle_types.delete({
                where: { id: parseInt(id) },
            });
        } catch (error) {
            throw error;
        }
    }

};
export default new types_of_vehicles();

