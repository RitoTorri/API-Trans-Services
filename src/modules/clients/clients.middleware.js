import responses from '../../shared/utils/responses.js';
import validators from '../../shared/utils/format.data.js';

const addClientMiddleware = (req, res, next) => {
    const { rif, name, contact, address } = req.body;
    let errors = [];

    if (!rif || !name || !contact || !address) {
        return responses.BadRequest(res, 'Missing required fields');
    }

    if (validators.formatRifInvalid(rif)) errors.push("Invalid rif. Code be must a RIF. Example: V-1234567-8")

    if (validators.formatNamesInvalid(name)) errors.push("Invalid name");

    if (validators.formatNumberInvalid(contact)) errors.push("Invalid contact. Contact must be a number.");

    if (validators.formatTextInvalid(address)) errors.push("Invalid address. Address must be a string.");

    if (errors.length > 0) return responses.BadRequest(res, errors);
    return next();
}

const getClientsMiddleware = (req, res, next) => {
    const { filter } = req.params;

    if (filter.toLowerCase() === "all") {
        req.filter = {};
        return next();
    }

    if (!validators.formatRifInvalid(filter)) {
        req.filter = { rif: filter };
        return next();
    }

    if (!validators.formatNamesInvalid(filter)) {
        req.filter = {
            name: { startsWith: filter, mode: 'insensitive' }
        }
        return next();
    }

    return responses.BadRequest(res, 'Invalid filter. Filter must be all, name or rif.');
}

const updateClientMiddleware = (req, res, next) => {
    const { id } = req.params;
    const { rif, name, contact, address } = req.body;
    let errors = [];

    if (validators.formatNumberInvalid(id)) {
        return responses.BadRequest(res, 'Invalid id. Id must be a number.');
    }

    if (!rif && !name && !contact && !address) {
        return responses.BadRequest(res, 'Missing required fields. You must send at least one field.');
    }

    if (rif) {
        if (validators.formatRifInvalid(rif)) errors.push("Invalid rif. Code be must a RIF. Example: V-1234567-8")
    }

    if (name) {
        if (validators.formatNamesInvalid(name)) errors.push("Invalid name. Name must be a string.");
    }

    if (contact) {
        if (validators.formatNumberInvalid(contact)) errors.push("Invalid contact. Contact must be a number.");
    }

    if (address) {
        if (validators.formatTextInvalid(address)) errors.push("Invalid address.");
    }

    if (errors.length > 0) return responses.BadRequest(res, errors);
    return next();
}

export default { addClientMiddleware, getClientsMiddleware, updateClientMiddleware }