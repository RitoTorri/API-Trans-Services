import responses from '../../shared/utils/responses.js';
import validators from '../../shared/utils/format.data.js';

const addServiceMiddleware = (req, res, next) => {
    const {
        id_vehicle,           // id_vehículo
        id_client,            // id_cliente
        price,                // precio
        pickup_location,      // lugar_de_recogida
        dropoff_location,     // lugar_de_entrega
        number_of_people,     // número_de_personas
        payment_status,       // estado_del_pago
        start_time,           // hora_de_inicio
        end_time              // hora_de_finalización
    } = req.body;

    let errors = [];

    if (!id_vehicle || !id_client || !price || !pickup_location || !dropoff_location || !number_of_people || !payment_status || !start_time || !end_time) {
        return responses.BadRequest(res, 'Missing required fields');
    }

    if (validators.formatNumberInvalid(id_vehicle)) {
        errors.push("Invalid vehicle id. Id must be a number.");
    }

    if (validators.formatNumberInvalid(id_client)) {
        errors.push("Invalid client id. Id must be a number.");
    }

    if (validators.formatDecimalInvalid(price)) {
        errors.push("Invalid price. Price must be a number.");
    }

    if (validators.formatTextInvalid(pickup_location)) {
        errors.push("Invalid pickup location. Pickup location must be a string.");
    }

    if (validators.formatTextInvalid(dropoff_location)) {
        errors.push("Invalid dropoff location. Dropoff location must be a string.");
    }

    if (validators.formatNumberInvalid(number_of_people)) {
        errors.push("Invalid number of people. Number of people must be a number.");
    }

    if (payment_status !== "pending" && payment_status !== "paid" && payment_status !== "canceled") {
        errors.push("Invalid payment status. Payment status must be pending, paid or canceled.");
    }

    if (validators.formatDateInvalid(start_time)) {
        errors.push("Invalid start time. Start time must be a date.");
    }

    if (validators.formatDateInvalid(end_time)) {
        errors.push("Invalid end time. End time must be a date.");
    }

    if (errors.length > 0) {
        return responses.BadRequest(res, errors);
    }
    return next();
}

export default { addServiceMiddleware }