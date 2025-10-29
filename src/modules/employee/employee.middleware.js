// Importaciones
import responses from '../../shared/utils/responses.js'
import validators from '../../shared/utils/format.data.js'

const middlewareGetEmployee = (req, res, next) => {

    // Destructurar los datos de la petición
    const { active, filter } = req.params;

    req.filter = {}; // Objeto para almacenar los filtros

    if (active === 'true' || active === 'false') {
        active === 'true'
            ? req.filter = { is_active: true }
            : req.filter = { is_active: false };
    }

    if (filter.toLowerCase() === 'all') {
        req.filter = { ...req.filter, filterSearch: 'all' };
        return next();
    }

    if (!validators.formatCiInvalid(filter)) {
        req.filter = { ...req.filter, ci: filter };
        return next();
    }

    if (!validators.formatNamesInvalid(filter)) {
        req.filter = { ...req.filter, name: { contains: filter, mode: 'insensitive' } };
        return next();
    }

    return responses.BadRequest(res, "Parameters invalid. filter must be all, true or false or a name or a ci.");
}


const middlewareCreateEmployee = (req, res, next) => {

    const { name, lastname, ci, rol, contacts } = req.body;
    let errors = []; // Array para almacenar los errores

    if (!name || !lastname || !ci || !rol || !contacts) {
        return responses.BadRequest(res, "Parameters invalid. name, lastname, ci, contacs and rol are required.");
    }

    if (validators.formatNamesInvalid(name)) errors.push("Error: name is invalid.");

    if (validators.formatNamesInvalid(lastname)) errors.push("Error: lastname is invalid.");

    if (validators.formatCiInvalid(ci)) errors.push("Error: ci is invalid.");

    if (validators.formatNamesInvalid(rol)) errors.push("Error: rol is invalid.");

    for (let i = 0; i < contacts.length; i++) {
        if (!validators.formatEmailInvalid(contacts[i].contact_info)) continue;

        if (!validators.formatNumberInvalid(contacts[i].contact_info)) continue;

        errors.push(`Error in position ${i + 1}: contact_info is invalid.`);
    }

    if (errors.length > 0) return responses.ParametersInvalid(res, errors);
    next();
}


const middlewareDeleteEmployee = (req, res, next) => {
    const { id } = req.params;

    if (!id) return responses.BadRequest(res, "Parameters invalid. id is required.");

    if (validators.formatNumberInvalid(id)) {
        return responses.BadRequest(res, "Parameters invalid. id must be a number.");
    }
    next();
}


const middlewareUpdateEmployee = (req, res, next) => {
    // Destructurar los datos de la petición
    const { id } = req.params;
    const { name, lastname, ci, rol } = req.body;

    let object = { id: parseInt(id) };
    let errors = [];

    if (!id) return responses.BadRequest(res, "Parameters invalid. id is required.");
    if (!name && !lastname && !ci && !rol) return responses.BadRequest(res, "Parameters invalid. We need at least one field to update.");

    if (name) {
        if (validators.formatNamesInvalid(name)) errors.push("Error: name is invalid.");
        else object = { ...object, name: name };
    }

    if (lastname) {
        if (validators.formatNamesInvalid(lastname)) errors.push("Error: lastname is invalid.");
        else object = { ...object, lastname: lastname };
    }

    if (ci) {
        if (validators.formatCiInvalid(ci)) errors.push("Error: ci is invalid.");
        else object = { ...object, ci: ci };
    }

    if (rol) {
        if (validators.formatNamesInvalid(rol)) errors.push("Error: rol is invalid.");
        else object = { ...object, rol: rol };
    }

    if (errors.length > 0) return responses.ParametersInvalid(res, errors);
    next();
}

const middlewareEmployeeRestore = (req, res, next) => {
    const { id } = req.params;

    if (!id) return responses.BadRequest(res, "Is required id.");

    if (validators.formatNumberInvalid(id)) {
        return responses.BadRequest(res, "Format id invalid. id must be number.");
    }

    next();
}

export default {
    middlewareGetEmployee, middlewareCreateEmployee, middlewareDeleteEmployee, middlewareUpdateEmployee, middlewareEmployeeRestore
};