// src/modules/vehicleModel/vehicleModel.model.js

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class VehicleModelModel {
    constructor() {
        this.prisma = prisma;
    }

    // LISTAR TODOS
    async findAllModels() {
        return this.prisma.VehicleModel.findMany({
            orderBy: { name: 'asc' }
        });
    }

    // CREAR UN NUEVO MODELO
    async createModel(data) {
        return this.prisma.VehicleModel.create({
            data: data,
        });
    }

    // ACTUALIZAR MODELO POR ID
    async updateModel(id, data) {
        return this.prisma.VehicleModel.update({
            where: { id: id },
            data: data,
        });
    }

    // ELIMINAR MODELO POR ID
    async deleteModel(id) {
        return this.prisma.VehicleModel.delete({
            where: { id: id },
        });
    }
}

export default new VehicleModelModel();