import responses from "../../shared/utils/responses.js";
import validators from "../../shared/utils/format.data.js";

const addPayrolls = async (req, res, next) => {
    // Destructuracion de los parametros
    const { employee_id, period_start, period_end } = req.body;
    let errors = [];

    if (!employee_id || !period_start || !period_end) {
        return responses.BadRequest(res, "Incomplete request. The following parameters are required: employee_id, period_start, period_end, daily_salary, total_days_paid, ivss, pie, faov.");
    }

    if (validators.formatNumberInvalid(employee_id)) {
        errors.push("id_employe is invalid. id_employe must be a number.");
    }

    if (validators.formatDateInvalid(period_start)) {
        errors.push("period_start is invalid. period_start must be a date.");
    }

    if (validators.formatDateInvalid(period_end)) {
        errors.push("period_end is invalid. period_end must be a date.");
    }

    if (errors.length > 0) return responses.BadRequest(res, errors);
    next();
}

const getPayrolls = async (req, res, next) => {
    const { filterSearch } = req.body;
    let errors = []; // Guarda los errores encontrados

    if (!filterSearch) {
        return responses.BadRequest(res, "Incomplete request. The following parameters are required: filterSearch.");
    }

    // si recibe filterSearch: {} devolver todos los empleados
    if (Object.keys(filterSearch).length === 0) return next();

    if (filterSearch.status) return next();

    if (!filterSearch.dateStart || !filterSearch.dateEnd) {
        return responses.BadRequest(res, "Incomplete request. The following parameters are required: dateStart and dateEnd.");
    }

    // Recibe fecha de inicio y fin
    if (filterSearch.dateStart && filterSearch.dateEnd) {
        if (validators.formatDateInvalid(filterSearch.dateStart)) {
            errors.push("dateStart is invalid. dateStart must be a date.");
        }

        if (validators.formatDateInvalid(filterSearch.dateEnd)) {
            errors.push("dateEnd is invalid. dateEnd must be a date.");
        }
    }

    if (errors.length > 0) return responses.BadRequest(res, errors);
    next();
}

const updatePayrollState = async (req, res, next) => {
    const { id, status } = req.params;
    let errors = [];

    if (!id || !status) {
        return responses.BadRequest(req, "Error, The params id and status are required.");
    }

    if (validators.formatNumberInvalid(id)) errors.push("id invalid. id must be a number.");

    if (validators.formatNamesInvalid(status)) errors.push("status invalid. status must be a caracters.");

    if (status !== "draft" && status !== "cancelled" && status !== "paid") {
        errors.push("state invalid.")
    }

    if (errors.length > 0) return responses.BadRequest(res, errors)
    next();
}

export default { addPayrolls, getPayrolls, updatePayrollState };