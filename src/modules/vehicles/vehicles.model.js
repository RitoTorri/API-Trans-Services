import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class vehicles {
    constructor() {
        this.prisma = prisma;
    }

    async createVehicle(vehicleData) {
        try {
            return await prisma.vehicles.create(
                { data: vehicleData },
            );
        } catch (error) {
            throw error;
        }
    }

    async findVehicleById(vehicleId) {
        try {
            return await prisma.vehicles.findUnique({
                where: {
                    id: vehicleId,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async findAllVehicles() {
        try {
            return await prisma.vehicles.findMany({
                orderBy: { id: 'asc' }
            });
        } catch (error) {
            throw error;
        }
    }

    async findVehicleByPlate(licensePlate) {
        try {
            return await prisma.vehicles.findUnique({
                where: {
                    license_plate: licensePlate,
                },

                include: {
                    employees: true,
                    vehicle_types: true,
                    vehicle_model: true,
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async updateVehicleByPlate(licensePlate, vehicleData) {
        try {
            return await prisma.vehicles.update({
                where: {
                    license_plate: licensePlate,
                    //is_active: true,
                },
                data: vehicleData,
            });
        } catch (error) {
            throw error;
        }
    }

    async deleteVehicleByPlate(licensePlate) {
        try {
            return await prisma.vehicles.update({
                where: {
                    license_plate: licensePlate,
                },
                data: {
                    is_active: false,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async reactivateByPlate(license_plate) {
        return this.prisma.vehicles.update({
            where: {
                // Buscamos el vehículo y aseguramos que esté inactivo para reactivarlo
                license_plate: license_plate,
                is_active: false,
            },
            data: {
                is_active: true, // Cambiamos el estado a activo

            },
        });
    }

    async getVehicleById(id) {
        try {
            return await prisma.vehicles.findUnique({
                where: { id: id }
            });
        } catch (error) { throw error; }
    }

    async getAllInfoVehicles() {
        try {
            return await prisma.vehicles.findMany({
                where: { is_active: true },
                include: {
                    vehicle_types: true,
                    employees: true,
                    vehicle_model: true,
                }
            })
        } catch (error) { throw error; }
    }

    // Esta funcion retorna todos los vehiculos que tienen servicios en esa fecha
    async validateVehicleInUse(id, date_start, date_end) {
        return prisma.$queryRaw`
            SELECT * FROM vehicles v
            INNER JOIN services s ON s.vehicle_id = v.id
            WHERE v.id = ${id}
            AND s.payment_status = 'pending'
            AND (
                s.start_date::date <= ${date_end}::date 
                AND s.end_date::date >= ${date_start}::date
            )
        `;
    }

    async findAvailableVehiclesByDate(start, end) {
        try {
            // 1. IDENTIFICAR IDS OCUPADOS
            const occupiedVehicleIds = await prisma.services.findMany({
                where: {
                    end_date: { gte: start },
                    start_date: { lte: end },
                },
                select: { vehicle_id: true },
                distinct: ['vehicle_id'],
            });

            const excludedIds = occupiedVehicleIds.map(service => service.vehicle_id);

            // 2. CONSULTAR VEHÍCULOS DISPONIBLES (Prisma no necesita el formato de salida aquí)
            return await prisma.vehicles.findMany({
                where: {
                    is_active: true,
                    id: { notIn: excludedIds },
                },
                // Incluir relaciones para que el Service pueda formatear la respuesta
                include: {
                    employees: {
                        select: { id: true, name: true, lastname: true, ci: true },
                    },
                    vehicle_model: {
                        select: { name: true },
                    },
                },
            });
        } catch (error) {
            console.error("Prisma Error in findAvailableVehiclesByDate:", error);
            throw error; // El Service manejará el relanzamiento
        }
    }
}

export default new vehicles();