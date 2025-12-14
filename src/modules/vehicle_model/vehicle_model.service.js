// src/modules/vehicleModel/vehicleModel.service.js

import VehicleModelModel from './vehicle_model.model.js';
import { Prisma } from '@prisma/client';

class VehicleModelService {
    constructor() {
        this.vehicleModelModel = VehicleModelModel;
    }

    // 1. Lógica para listar todos los modelos
    async getModelList() {
        return this.vehicleModelModel.findAllModels();
    }

    // 2. Lógica para crear un nuevo modelo
    async registerNewModel(modelData) {
        try {
            return await this.vehicleModelModel.createModel(modelData);
        } catch (error) {
            // Manejar error de UNICIDAD (nombre duplicado)
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // P2002 es el código estándar de Prisma para la violación de una restricción UNIQUE
                if (error.code === 'P2002' && error.meta?.target.includes('name')) {
                    // Lanzar un error específico que el Controlador pueda manejar
                    throw new Error("MODEL_NAME_ALREADY_EXISTS");
                }
            }
            throw error;
        }
    }

    // 3. Lógica para actualizar un modelo
    async updateModelDetails(id, updateData) {
        try {
            return await this.vehicleModelModel.updateModel(id, updateData);
        } catch (error) {
            // Manejar error de registro no encontrado o unicidad (P2025: no encontrado)
            if (error.code === 'P2025') {
                throw new Error("MODEL_NOT_FOUND");
            }
            if (error.code === 'P2002' && error.meta?.target.includes('name')) {
                throw new Error("MODEL_NAME_ALREADY_EXISTS");
            }
            throw error;
        }
    }

    // 4. Lógica para eliminar un modelo
    async deleteModel(id) {
        try {
            return await this.vehicleModelModel.deleteModel(id);
        } catch (error) {
             // Manejar error de registro no encontrado (P2025)
            if (error.code === 'P2025') {
                throw new Error("MODEL_NOT_FOUND");
            }
            // Importante: Si la eliminación falla por Foreign Key (P2003)
            if (error.code === 'P2003') {
                throw new Error("MODEL_IN_USE");
            }
            throw error;
        }
    }
}

export default new VehicleModelService();