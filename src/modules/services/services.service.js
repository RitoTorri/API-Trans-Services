import ServicesModel from "./services.model.js";
const model = new ServicesModel();

// Importacion de clientes
import ClientsModel from "../clients/clients.model.js";
const clients = new ClientsModel();

class ServicesService {
    constructor() { }

    async addService(service) {
        try {
            // Validar si existe un cliente con ese rif
            const client = await clients.getClientById(service.client_id);
            if (!client) throw new Error("Client not found.");

            // Validar si existe un vehículo con ese id

            return await model.addService(service);
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
                    created_at: {
                        gte: dateStart,
                        lte: dateEnd
                    }
                };
            }

            return await model.getServices(filterSearch);
        } catch (error) { throw error; }
    }

    async updatePaymentStatus(id, serviceObj) {
        try {
            // Verificar que exista un servicio con ese id
            const servicesExist = await model.getServiceById(id);
            if (!servicesExist) throw new Error("Service not found.");

            if (servicesExist.payment_status !== "pending") {
                throw new Error("Service already paid or canceled.");
            }

            return await model.updatePaymentStatus(id, serviceObj);
        } catch (error) { throw error; }
    }
}

export default ServicesService;