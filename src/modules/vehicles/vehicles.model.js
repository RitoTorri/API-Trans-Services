import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class vehicles {
    constructor() { }

    async createVehicle(vehicleData) {
        try {
            return await prisma.vehicles.create(
                { data: vehicleData },
            );
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

    async getVehicleById(id) {
        try {
            return await prisma.vehicles.findUnique({
                where: { id: id }
            });
        } catch (error) { throw error; }
    }
}

export default new vehicles();