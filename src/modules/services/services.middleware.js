import responses from '../../shared/utils/responses.js';
import validators from '../../shared/utils/format.data.js';

const addServiceMiddleware = (req, res, next) => {
    const {
        vehicle_id,           // id_vehículo
        client_id,            // id_cliente
        start_date,           // fecha_de_inicio
        end_date,             // fecha_de_fin
        price,                // precio
        isrl,                 // impuesto sobre la renta
    } = req.body;

    let errors = [];

    if (!vehicle_id || !client_id || !price || !start_date || !end_date || !isrl) {
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

    if (validators.formatDateInvalid(start_date)) {
        errors.push("Invalid start date. Start date must be a date.");
    }

    if (validators.formatDateInvalid(end_date)) {
        errors.push("Invalid end date. End date must be a date.");
    }

    if (validators.formatMoneyInvalid(isrl)) {
        errors.push("Invalid isrl. Isrl must be a number.");
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

    if (filterSearch === "paid" || filterSearch === "canceled" || filterSearch === "pending") {
        req.filterSearch = { payment_status: filterSearch };
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
    const { id, status } = req.params;

    if (!id || !status) {
        return responses.BadRequest(res, 'Missing required fields: id, status');
    }

    if (validators.formatNumberInvalid(id)) {
        return responses.BadRequest(res, 'Invalid id. Id must be a number.');
    }

    if (status !== "pending" && status !== "paid" && status !== "canceled") {
        return responses.BadRequest(res, 'Invalid status. Status must be pending, paid or canceled.');
    }

    return next();
}

export default { addServiceMiddleware, getServicesMiddleware, updatePaymentStatusMiddleware };