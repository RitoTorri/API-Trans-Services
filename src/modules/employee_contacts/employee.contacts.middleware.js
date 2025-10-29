// Importaciones
import responses from '../../shared/utils/responses.js'
import validators from '../../shared/utils/format.data.js'

const middlewareAddEmployeeContact = (req, res, next) => {
    // Destructurar los datos de la petición
    const { employee_id } = req.params;
    const { contact_info } = req.body;

    if (validators.formatNumberInvalid(employee_id)) return responses.BadRequest(res, "Parameters invalid. employee_id is required.");

    if (!contact_info) {
        return responses.BadRequest(res, "Parameters invalid. The contact_info is required.");
    }

    if (!validators.formatNumberInvalid(contact_info)) return next();

    if (!validators.formatEmailInvalid(contact_info)) return next();

    return responses.BadRequest(res, "Parameters invalid. The contact_info must be a valid email or number phone.");
}

const middlewareDeleteEmployeeContact = (req, res, next) => {
    const { contact_id } = req.params;

    if (validators.formatNumberInvalid(contact_id)) {
        return responses.BadRequest(res, "Parameters invalid. contact_id must be a number.");
    }
    return next();
}

const middlewareUpdateEmployeeContact = (req, res, next) => {
    const { contacts } = req.body;
    let errors = [];

    if (!contacts) {
        return responses.BadRequest(res, "Parameters invalid. The contacts is required.");
    }

    for (let i = 0; i < contacts.length; i++) {
        if (validators.formatNumberInvalid(contacts[i].id)) errors.push(`Error in position ${i + 1}: id is invalid.`);

        if (!validators.formatNumberInvalid(contacts[i].contact_info)) continue;

        if (!validators.formatEmailInvalid(contacts[i].contact_info)) continue;

        errors.push(`Error in position ${i + 1}: contact_info is invalid.`);
    }

    if (errors.length > 0) return responses.ParametersInvalid(res, errors);
    next();
}

export default { middlewareAddEmployeeContact, middlewareDeleteEmployeeContact, middlewareUpdateEmployeeContact };