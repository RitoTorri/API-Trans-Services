import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class ServicesModel {
    constructor() { }

    async addService(services) {
        try {
            // Crear servicio
            return await prisma.$transaction(async (e) => {
                let results = [];
                let CountServices = await this.getCountServices(); // Extraemos el conteo de servicios

                for (const service of services) {
                    // Agregamos las propiedades de factura
                    service.invoice_number = `TRS-${new Date().getFullYear()}-${CountServices + 1}`;
                    service.invoice_date = new Date();

                    const result = await e.services.create({ data: service }); // Crear servicio

                    CountServices++; // Incrementamos el contador de servicios
                    results.push(result); // Agregamos el resultado al array de resultados
                }
                return results.length;
            });

        } catch (error) { throw error; }
    }

    async getServices(filter) {
        try {
            return await prisma.services.findMany({
                where: filter,
                include: {
                    clients: { select: { name: true, rif: true } },
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

                // Buscamos el cliente que solicito el servicio
                const client = await prisma.clients.findFirst({
                    where: { id: servicesUpdate.client_id }
                });;

                // Creamos el objeto de la ganancia
                const revenue = {
                    description: `Servicio vendido a ${client.name}, ${client.rif}. Desde ${servicesUpdate.start_date.toISOString().split('T')[0]} hasta ${servicesUpdate.end_date.toISOString().split('T')[0]}`,
                    amount: servicesUpdate.price,
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