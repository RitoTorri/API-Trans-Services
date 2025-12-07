import responses from "../../shared/utils/responses.js";
import ServicesService from "./services.service.js";

const service = new ServicesService();

class ServicesController {
    constructor() { }

    async addService(req, res) {
        try {
            // Destructurar los datos de la petición
            const services = req.body.services;

            // Mapeo de conversión de datos
            const servicesNew = services.map(service => {
                return {
                    vehicle_id: parseInt(service.vehicle_id),
                    client_id: parseInt(service.client_id),
                    price: parseFloat(service.price),
                    start_date: new Date(service.start_date),
                    end_date: new Date(service.end_date),
                }
            });

            const result = await service.addService(servicesNew);
            return responses.QuerySuccess(res, `${result} services has been registered successfully.`);

        } catch (error) {
            if (error.message === "Vehicle in use.") {
                return responses.ResConflict(res, "Vehicle already has a service in progress.");
            }

            if (error.message === "Vehicle not found.") {
                return responses.ItemNotFound(res, "Vehicle not found. Please, check the vehicle id.");
            }

            if (error.message === "Client not found.") {
                return responses.ItemNotFound(res, "Client not found. Please, check the client id.");
            }
            return responses.ErrorInternal(res, error.message);
        }
    }

    async getServices(req, res) {
        try {
            const result = await service.getServices(req.filter);
            return responses.QuerySuccess(res, result);

        } catch (error) {
            return responses.ErrorInternal(res, "Error in the numbers of the date, possibly very large numbers.");
        }
    }

    async updatePaymentStatus(req, res) {
        try {
            const result = await service.updatePaymentStatus(parseInt(req.params.id), req.params.status);
            return responses.QuerySuccess(res, result);

        } catch (error) {
            if (error.message === "Service not found.") {
                return responses.ItemNotFound(res, "Service not found. Please, check the service id.");
            }
            if (error.message === "Service already paid or canceled.") {
                return responses.ResConflict(res, "Service already paid or canceled. Please, check the service id.");
            }
            return responses.ErrorInternal(res, error.message);
        }
    }
}

export default ServicesController;