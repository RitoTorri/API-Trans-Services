import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class ServicesModel {
    constructor() { }

    async addService(service) {
        try {
            return await prisma.services.create({
                data: service
            });
        } catch (error) { throw error; }
    }

    async getServices(filter) {
        try {
            return await prisma.services.findMany({
                where: filter,
                include: {
                    clients: true
                }
            });
        } catch (error) { throw error; }
    }

    async updatePaymentStatus(id, serviceObj) {
        try {
            return await prisma.services.update({
                where: { id: id },
                data: { ...serviceObj }
            });
        } catch (error) { throw error; }
    }

    async getServiceById(id) {
        try {
            return await prisma.services.findFirst({
                where: { id: id }
            });
        } catch (error) { throw error; }
    }
}

export default ServicesModel;