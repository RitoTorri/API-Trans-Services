import responses from "../../shared/utils/responses";
import ServicesService from "./services.service";

const service = new ServicesService();

class ServicesController {
    constructor() { }

    async addService(req, res) {
        try {
            const serviceObj = {
                id_vehicle: parseInt(req.body.id_vehicle),
                id_client: parseInt(req.body.id_client),
                price: parseFloat(req.body.price),
                pickup_location: req.body.pickup_location,
                dropoff_location: req.body.dropoff_location,
                number_of_people: parseInt(req.body.number_of_people),
                payment_status: req.body.payment_status,
                start_time: new Date(req.body.start_time),
                end_time: new Date(req.body.end_time)
            };

            const result = await service.addService(serviceObj);
            return responses.QuerySuccess(res, result);

        } catch (error) {
            return responses.ErrorInternal(res, error);
        }
    }
}

export default ServicesController;