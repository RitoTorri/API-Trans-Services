import ServicesModel from "./services.model.js";
const model = new ServicesModel();

// Importacion de clientes
import ClientsModel from "../clients/clients.model.js";
const clients = new ClientsModel();

// Importacion de vehículos
import VehiclesModel from "../vehicles/vehicles.model.js";
import vehiclesModel from "../vehicles/vehicles.model.js";

class ServicesService {
    constructor() { }

    async addService(services) {
        try {
            // Validar que el vehiculo no se use en la misma fecha
            for (let i = 0; i < services.length; i++) {
                for (let j = i + 1; j < services.length; j++) {
                    if (services[i].vehicle_id === services[j].vehicle_id) {
                        // Si las fechas se solapan, error
                        if (services[i].start_date <= services[j].end_date &&
                            services[j].start_date <= services[i].end_date) {
                            throw new Error(`You already have existing records with vehicle ${services[i].vehicle_id} on the same dates.This is not allowed.`);
                        }
                    }
                }
            }

            for (const service of services) {
                // Validar si existe un cliente con ese rif
                const client = await clients.getClientById(service.client_id);
                if (!client) throw new Error("Client not found.");

                // Validar si existe un vehículo con ese id
                const vehicle = await VehiclesModel.getVehicleById(service.vehicle_id);
                if (!vehicle) throw new Error("Vehicle not found.");

                // Validamos que el vehiculo no tenga otro servicio en curso
                const vehicleInUse = await vehiclesModel.validateVehicleInUse(service.vehicle_id, service.start_date.toISOString().split('T')[0], service.end_date.toISOString().split('T')[0]);
                if (vehicleInUse.length > 0) throw new Error(`Vehicle in use.`);
            }

            return await model.addService(services);
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
                        star_date: result.start_date.toISOString().split('T')[0],
                        end_date: result.end_date.toISOString().split('T')[0],
                        price: result.price,
                        invoice_number: result.invoice_number,
                        invoice_date: result.invoice_date.toISOString().split('T')[0],
                        payment_status: result.payment_status
                    },
                    client: result.clients,
                    vehicle: result.vehicles,
                    totalAmount: result.price
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

            await model.updatePaymentStatusCanceled(id);
            return "Service canceled successfully.";
        } catch (error) { throw error; }
    }
}

export default ServicesService;