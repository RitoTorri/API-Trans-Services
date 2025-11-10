import responses from '../../shared/utils/responses.js';
import validators from '../../shared/utils/format.data.js';

const addServiceMiddleware = (req, res, next) => {
    const {
        vehicle_id,           // id_vehículo
        client_id,            // id_cliente
        price,                // precio
        dropoff_location,     // lugar_de_entrega
        number_of_people,     // número_de_personas
        payment_status,       // estado_del_pago    
    } = req.body;

    let errors = [];

    if (!vehicle_id || !client_id || !price || !dropoff_location || !number_of_people || !payment_status) {
        return responses.BadRequest(res, 'Missing required fields');
    }

    if (validators.formatNumberInvalid(vehicle_id)) {
        errors.push("Invalid vehicle id. Id must be a number.");
    }

    if (validators.formatNumberInvalid(client_id)) {
        errors.push("Invalid client id. Id must be a number.");
    }

    if (validators.formatMoneyInvalid(price)) {
        errors.push("Invalid price. Price must be a number.");
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

    if (errors.length > 0) {
        return responses.BadRequest(res, errors);
    }
    return next();
}

const getServicesMiddleware = (req, res, next) => {
    const { filterSearch } = req.body;

    if (!filterSearch) {
        return responses.BadRequest(res, 'Missing required fields: filterSearch');
    }

    if (Object.keys(filterSearch).length === 0) {
        req.filterSearch = {};
        return next();
    }

    if (!validators.formatNamesInvalid(filterSearch)) {
        req.filterSearch = { name_client: filterSearch };
        console.log(req.filterSearch);
        return next();
    }

    if (!validators.formatDateInvalid(filterSearch.dateStart) && !validators.formatDateInvalid(filterSearch.dateEnd)) {
        req.filterSearch = { dateStart: filterSearch.dateStart, dateEnd: filterSearch.dateEnd };
        return next();
    }

    return responses.BadRequest(res, 'You should send a valid filterSearch object. A name or a date range is expected.');
}

const updatePaymentStatusMiddleware = (req, res, next) => {
    const { id } = req.params;
    const {
        vehicle_id,           // id_vehículo
        client_id,            // id_cliente
        price,                // precio
        dropoff_location,     // lugar_de_entrega
        number_of_people,     // número_de_personas
        payment_status,       // estado_del_pago
    } = req.body;

    let errors = [];

    if (!id) {
        return responses.BadRequest(res, 'Missing required fields: id');
    }

    if (!vehicle_id && !client_id && !price && !dropoff_location && !number_of_people && !payment_status) {
        return responses.BadRequest(res, 'Missing required fields: vehicle_id, client_id, price, dropoff_location, number_of_people, payment_status');
    }

    if (validators.formatNumberInvalid(id)) {
        return responses.BadRequest(res, 'Invalid id. Id must be a number.');
    }

    if (vehicle_id) {
        if (validators.formatNumberInvalid(vehicle_id)) {
            errors.push("Invalid vehicle id. Id must be a number.");
        }
    }

    if (client_id) {
        if (validators.formatNumberInvalid(client_id)) {
            errors.push("Invalid client id. Id must be a number.");
        }
    }

    if (price) {
        if (validators.formatMoneyInvalid(price)) {
            errors.push("Invalid price. Price must be a number.");
        }
    }

    if (dropoff_location) {
        if (validators.formatTextInvalid(dropoff_location)) {
            errors.push("Invalid dropoff location. Dropoff location must be a string.");
        }
    }

    if (number_of_people) {
        if (validators.formatNumberInvalid(number_of_people)) {
            errors.push("Invalid number of people. Number of people must be a number.");
        }
    }

    if (payment_status) {
        if (payment_status !== "pending" && payment_status !== "paid" && payment_status !== "canceled") {
            errors.push("Invalid payment status. Payment status must be pending, paid or canceled.");
        }
    }

    if (errors.length > 0) {
        return responses.BadRequest(res, errors);
    }
    return next();
}

export default { addServiceMiddleware, getServicesMiddleware, updatePaymentStatusMiddleware };