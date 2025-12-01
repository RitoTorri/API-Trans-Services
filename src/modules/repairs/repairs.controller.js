import repairsModel from './repairs.model.js';
import vehiclesModel from '../vehicles/vehicles.model.js'; // Necesitamos el modelo de vehículos para la validación
import { Prisma } from '@prisma/client';

class RepairsService {
    constructor() {
        this.repairsModel = repairsModel;
        this.vehiclesModel = vehiclesModel; // Se incluye el modelo de vehículos
    }

    async registerNewRepair(repairData) {
        try {
            // 1. Verificar si el vehículo existe y está activo
            const vehicle = await this.vehiclesModel.findVehicleById(repairData.vehicleId);
            
            if (!vehicle || !vehicle.is_active) {
                throw new Error("VEHICLE_NOT_FOUND_OR_INACTIVE");
            }

            // 2. Si el vehículo es válido, crear la reparación
            return await this.repairsModel.createRepair(repairData);
        } catch (error) {
            // 3. Manejo de errores de Prisma (si aplica)
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // Específicamente el error de clave foránea fallida (P2003)
                if (error.code === 'P2003' && error.meta?.target.includes('vehicleId')) {
                    throw new Error("VEHICLE_ID_INVALID");
                }
            }
            throw error;
        }
    }

    async getRepairsList() {
        try {
            const result = await this.repairsModel.findAllRepairs();
            
            if (!result || result.length === 0) {
                return []; 
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getRepairDetailsById(repairId) {
        try {
            const repair = await this.repairsModel.findRepairById(repairId);

            if (!repair) {
                throw new Error("REPAIR_NOT_FOUND");
            }
            
            return repair;
        } catch (error) {
            throw error;
        }
    }

    async updateRepairDetails(repairId, updateData) {
        try {
            const updatedRepair = await this.repairsModel.updateRepair(repairId, updateData);
            return updatedRepair;
        } catch (error) {
            if (error.code === 'P2025') {
                throw new Error("REPAIR_NOT_FOUND");
            }
            throw error;
        }
    }

    async deleteRepair(repairId) {
        try {
            const deletedRepair = await this.repairsModel.deleteRepair(repairId);
            return deletedRepair;
        } catch (error) {
            if (error.code === 'P2025') {
                throw new Error("REPAIR_NOT_FOUND");
            }
            throw error;
        }
    }

}

export default new RepairsService();