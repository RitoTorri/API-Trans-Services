import responses from "../../shared/utils/responses.js";
import ServicesService from "./services.service.js";

const service = new ServicesService();

class ServicesController {
    constructor() { }

    async addService(req, res) {
        try {
            // Este contienen los datos del servicio
            const serviceObj = {
                vehicle_id: parseInt(req.body.vehicle_id),
                client_id: parseInt(req.body.client_id),
                price: parseFloat(req.body.price),
                start_date: new Date(req.body.start_date),
                end_date: new Date(req.body.end_date),
            };

            // Este contienen los datos de la retencion aplicada al servicio
            const retention = {
                code_retention: "isrl",
                base_amount: serviceObj.price,
                rate_retention: req.body.isrl,
            }

            const result = await service.addService(serviceObj, retention);
            return responses.QuerySuccess(res, result);

        } catch (error) {
            if (error.message === "Client not found.") {
                return responses.ItemNotFound(res, "Client not found. Please, check the client id.");
            }
            return responses.ErrorInternal(res, error.message);
        }
    }

    async getServices(req, res) {
        try {
            const result = await service.getServices(req.filterSearch);
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