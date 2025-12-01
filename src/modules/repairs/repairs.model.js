import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class RepairsModel {
    constructor() {}

  
    async createRepair(repairData) {
        try {
            return await prisma.repair.create({
                data: repairData,
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Obtiene la lista completa de reparaciones, incluyendo detalles del vehículo.
     */
    async findAllRepairs() {
        try {
            return await prisma.repair.findMany({
                orderBy: { createdAt: 'desc' },
                include: {
                    vehicle: { // Incluye la información del vehículo relacionado
                        select: {
                            license_plate: true,
                            model: true,
                            driver_id: true,
                        }
                    }
                }
            });
        } catch (error) {
            throw error;
        }
    }

    
    async findRepairById(repairId) {
        try {
            return await prisma.repair.findUnique({
                where: { id: repairId },
                include: {
                    vehicle: true,
                }
            });
        } catch (error) {
            throw error;
        }
    }

   
    async updateRepair(repairId, updateData) {
        try {
            return await prisma.repair.update({
                where: { id: repairId },
                data: updateData,
            });
        } catch (error) {
            throw error;
        }
    }

   
    async deleteRepair(repairId) {
        try {
            // Nota: Se recomienda cambiar a borrado lógico (is_active: false) si se necesita historial.
            return await prisma.repair.delete({
                where: { id: repairId },
            });
        } catch (error) {
            throw error;
        }
    }
}

export default new RepairsModel();