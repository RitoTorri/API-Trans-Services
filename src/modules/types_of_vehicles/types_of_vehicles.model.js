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

    async findTypeByName(typeName) {
        try {
            // Usamos findFirst en lugar de findUnique porque no es una búsqueda por @id
            // e implementamos la búsqueda insensible a mayúsculas
            return await prisma.vehicle_types.findFirst({
                where: { 
                    type_name: { 
                        equals: typeName,
                        mode: 'insensitive' // Permite que "Camion" y "camion" funcionen igual
                    } 
                },
                // Incluir los vehículos relacionados (opcional, pero útil para listar)
                /*include: {
                    vehicles: true 
                }*/
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

