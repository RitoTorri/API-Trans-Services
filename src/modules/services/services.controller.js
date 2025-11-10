import responses from "../../shared/utils/responses.js";
import ServicesService from "./services.service.js";

const service = new ServicesService();

class ServicesController {
    constructor() { }

    async addService(req, res) {
        try {
            const serviceObj = {
                vehicle_id: parseInt(req.body.vehicle_id),
                client_id: parseInt(req.body.client_id),
                price: parseFloat(req.body.price),
                dropoff_location: req.body.dropoff_location,
                number_of_people: parseInt(req.body.number_of_people),
                payment_status: req.body.payment_status,
            };

            const result = await service.addService(serviceObj);
            return responses.QuerySuccess(res, result);

        } catch (error) {
            console.log(error);

            if (error.message === "Client not found.") {
                return responses.ItemNotFound(res, "Client not found. Please, check the client id.");
            }

            return responses.ErrorInternal(res, error);
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
            const serviceObj = {};

            // Si se envia alguno de los campos, se actualizan
            if (req.body.vehicle_id) serviceObj.vehicle_id = parseInt(req.body.vehicle_id);
            if (req.body.client_id) serviceObj.client_id = parseInt(req.body.client_id);
            if (req.body.payment_status) serviceObj.payment_status = req.body.payment_status;
            if (req.body.price) serviceObj.price = parseFloat(req.body.price);
            if (req.body.number_of_people) serviceObj.number_of_people = parseInt(req.body.number_of_people);
            if (req.body.dropoff_location) serviceObj.dropoff_location = req.body.dropoff_location;

            const result = await service.updatePaymentStatus(parseInt(req.params.id), serviceObj);
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