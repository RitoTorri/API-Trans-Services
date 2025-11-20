import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class ServicesModel {
    constructor() { }

    async addService(service, retentions) {
        try {
            return await prisma.$transaction(async (e) => {
                // Crear servicio
                const serviceCreated = await prisma.services.create({
                    data: service
                });

                // Agregamos el id del servicio a las retenciones
                retentions.service_id = serviceCreated.id;

                // Crear retenciones
                const retentionsCreated = await prisma.services_retentions.create({
                    data: retentions
                });

                return [serviceCreated, retentionsCreated];
            });
        } catch (error) { throw error; }
    }

    async getServices(filter) {
        try {
            return await prisma.services.findMany({
                where: filter,
                include: {
                    clients: { select: { name: true, rif: true } },
                    services_retentions: { select: { code_retention: true, rate_retention: true, total_retention: true } },
                    vehicles: { select: { license_plate: true } }
                }
            });
        } catch (error) { throw error; }
    }

    async updatePaymentStatusPaid(id, status) {
        try {
            return await prisma.$transaction(async (e) => {
                // Actualizamos el estado de pago
                const servicesUpdate = await prisma.services.update({
                    where: { id: id },
                    data: { payment_status: status }
                });

                // Buscamos las retenciones de ese servicio
                const servicesRetentions = await prisma.services_retentions.findFirst({
                    where: { service_id: id }
                });

                // Buscamos el cliente que solicito el servicio
                const client = await prisma.clients.findFirst({
                    where: { id: servicesUpdate.client_id }
                });

                // Calculamos el total de la ganancia 
                let totalGanancia = servicesUpdate.price - servicesRetentions.total_retention;

                // Creamos el objeto de la ganancia
                const revenue = {
                    description: `Servicio vendido a ${client.name}, ${client.rif}. Desde ${servicesUpdate.start_date.toISOString().split('T')[0]} hasta ${servicesUpdate.end_date.toISOString().split('T')[0]}`,
                    amount: totalGanancia,
                    category: "ganancia",
                    date: new Date(),
                };

                // Creamos la ganancia
                await prisma.revenue.create({
                    data: revenue
                });

                return "Service payed successfully.";
            });
        } catch (error) { throw error; }
    }

    async updatePaymentStatusCanceled(id) {
        try {
            return await prisma.services.update({
                where: { id: id },
                data: { payment_status: "canceled" }
            })
        } catch (error) { throw error; }
    }

    async getServiceById(id) {
        try {
            return await prisma.services.findFirst({
                where: { id: id }
            });
        } catch (error) { throw error; }
    }

    async getCountServices() {
        try {
            return await prisma.services.count();
        } catch (error) { throw error; }
    }
}

export default ServicesModel;