import ServicesModel from "./services.model.js";
const model = new ServicesModel();

// Importacion de retenciones
import isrCalculator from "../../shared/utils/isr.calculator.js";

// Importacion de clientes
import ClientsModel from "../clients/clients.model.js";
const clients = new ClientsModel();

class ServicesService {
    constructor() { }

    async addService(service, retention) {
        try {
            // Validar si existe un cliente con ese rif
            const client = await clients.getClientById(service.client_id);
            if (!client) throw new Error("Client not found.");

            // Validar si existe un vehículo con ese id

            // Agregamos las propiedades de factura
            const servicesExists = await model.getCountServices();
            service.invoice_number = `TRS-${new Date().getFullYear()}-${servicesExists + 1}`;
            service.invoice_date = new Date();

            // Cremoas el objeto a guardar en retencion
            retention.total_retention = isrCalculator(service.price, retention.rate_retention);

            return await model.addService(service, retention);
        } catch (error) { throw error; }
    }

    async getServices(filterSearch) {
        try {
            // Validar si existe se busca por nombre del cliente
            if (filterSearch.name_client) {
                const client = await clients.getClientsByName(filterSearch.name_client);

                filterSearch = {
                    client_id: {
                        in: client.map(c => c.id)
                    }
                }
            }

            if (filterSearch.dateStart && filterSearch.dateEnd) {
                const dateStart = new Date(filterSearch.dateStart);
                const dateEnd = new Date(filterSearch.dateEnd);

                filterSearch = {
                    start_date: { gte: dateStart },
                    end_date: { lte: dateEnd }
                };
            }

            const result = await model.getServices(filterSearch);
            return result.map(result => {
                return {
                    services: {
                        id: result.id,
                        star_date: result.start_date,
                        end_date: result.end_date,
                        price: result.price,
                        invoice_number: result.invoice_number,
                        invoice_date: result.invoice_date,
                        payment_status: result.payment_status
                    },
                    client: result.clients,
                    retentions: result.services_retentions[0],
                    vehicle: result.vehicles,
                    totalAmount: result.price - result.services_retentions.map(s => s.total_retention)[0]
                }
            });
        } catch (error) { throw error; }
    }

    async updatePaymentStatus(id, status) {
        try {
            // Verificar que exista un servicio con ese id
            const servicesExist = await model.getServiceById(id);
            if (!servicesExist) throw new Error("Service not found.");

            if (servicesExist.payment_status !== "pending") {
                throw new Error("Service already paid or canceled.");
            }

            if (status === "paid") {
                return await model.updatePaymentStatusPaid(id, status);
            }

            const result = await model.updatePaymentStatusCanceled(id);
            return "Service canceled successfully.";
        } catch (error) { throw error; }
    }
}

export default ServicesService;