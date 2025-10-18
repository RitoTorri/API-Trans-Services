import responses from '../../shared/utils/responses.js'
import validators from '../../shared/utils/format.data.js'

const middlewareGetEmployee = (req, res, next) => {
    const { active, filter } = req.params;
    req.filter = {};

    if (active === 'true' || active === 'false') {
        active === 'true' ? req.filter = { is_active: true } : req.filter = { is_active: false };
    }

    if (filter === 'all') {
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
    const { name, lastname, ci, rol } = req.body;
    let errors = [];

    if (!name && !lastname && !ci && !rol) {
        return responses.BadRequest(res, "Parameters invalid. name, lastname, ci and rol are required.");
    }

    if (validators.formatNamesInvalid(name)) errors.push("Error: name is invalid.");
    if (validators.formatNamesInvalid(lastname)) errors.push("Error: lastname is invalid.");
    if (validators.formatCiInvalid(ci)) errors.push("Error: ci is invalid.");

    if (errors.length > 0) return responses.ParametersInvalid(res, errors);
    next();
}


export default {
    middlewareGetEmployee, middlewareCreateEmployee
};