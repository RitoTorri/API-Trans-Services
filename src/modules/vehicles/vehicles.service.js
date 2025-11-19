import vehiclesModel from './vehicles.model.js';
import { Prisma } from '@prisma/client';
class vehiclesServices{
    constructor(){
        this.vehiclesModel = vehiclesModel;
    }

    async registerNewVehicle(vehicleData) {
        try {
            // 1. Llamar al Modelo para crear el vehículo
            return await this.vehiclesModel.createVehicle(vehicleData);
        } catch (error) {
            // 2. Manejo específico del error de Placa Duplicada (P2002)
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // El código P2002 es el código estándar de Prisma para la violación de una restricción UNIQUE
                if (error.code === 'P2002' && error.meta?.target.includes('license_plate')) {
                    // Lanzar un error específico que el Controlador pueda manejar
                    throw new Error("LICENSE_PLATE_ALREADY_EXISTS");
                }
            }
            
            throw error;
        }
    }

    async getVehicleDetailsByPlate(licensePlate) {
        try {
            const vehicle = await this.vehiclesModel.findVehicleByPlate(licensePlate);

            // 1. Lógica de Negocio: Verificar la existencia
            if (!vehicle) {
                // Lanzar un error específico que el Controlador traducirá a 404
                throw new Error("VEHICLE_NOT_FOUND");
            }

            // 2. Éxito
            return vehicle;
        } catch (error) {
            // Relanzamos el error
            throw error;
        }
    }

    async updateVehicleDetails(licensePlate, updateData) {
        try {
            
            const updatedVehicle = await this.vehiclesModel.updateVehicleByPlate(licensePlate, updateData);
            return updatedVehicle;
        } catch (error) {
        
            if (error.code === 'P2025') {
                throw new Error("VEHICLE_NOT_FOUND");
            }
            throw error;
        }
    }

    async deleteVehicleByPlate(licensePlate) {
        try {
            
            const deletedVehicle = await this.vehiclesModel.deleteVehicleByPlate(licensePlate);
            return deletedVehicle;
        } catch (error) {
            
            if (error.code === 'P2025') {
                throw new Error("VEHICLE_NOT_FOUND");
            }
            throw error;
        }
    }

}

export default new vehiclesServices();