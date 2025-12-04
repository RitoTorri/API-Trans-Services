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
                }
            })
        } catch (error) { throw error; }
    }
}

export default new vehicles();