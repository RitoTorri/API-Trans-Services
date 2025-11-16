import responses from "../../shared/utils/responses.js";
import validators from "../../shared/utils/format.data.js";

const addPayrolls = async (req, res, next) => {
    // Destructuracion de los parametros
    const { employee_id, period_start, period_end, daily_salary, total_days_paid, ivss, pie, faov } = req.body;
    let errors = [];

    if (!employee_id || !period_start || !period_end || !daily_salary || !total_days_paid || !ivss || !pie || !faov) {
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

    if (validators.formatMoneyInvalid(daily_salary)) {
        errors.push("daily_salary is invalid. daily_salary must be a number.");
    }

    if (validators.formatNumberInvalid(total_days_paid)) {
        errors.push("total_days_paid is invalid. total_days_paid must be a number.");
    }

    if (validators.formatMoneyInvalid(ivss)) {
        errors.push("ivss is invalid. ivss must be a number.");
    }

    if (validators.formatMoneyInvalid(pie)) {
        errors.push("pie is invalid. pie must be a number.");
    }

    if (validators.formatMoneyInvalid(faov)) {
        errors.push("faov is invalid. faov must be a number.");
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

const updatePayrolls = async (req, res, next) => {
    const { id } = req.params;
    const { period_start, period_end, daily_salary, total_days_paid, ivss, pie, faov } = req.body;
    let errors = [];

    if (!id) return responses.BadRequest(res, "Incomplete request. The following parameters are required: id.");

    if (validators.formatNumberInvalid(id)) {
        errors.push("id invalid. id must be a number.");
    }

    if (validators.formatDateInvalid(period_start)) {
        errors.push("period_start invalid. period_start must be a date.");
    }

    if (validators.formatDateInvalid(period_end)) {
        errors.push("period_end invalid. period_end must be a date.");
    }

    if (validators.formatMoneyInvalid(daily_salary)) {
        errors.push("daily_salary invalid. daily_salary must be a number.");
    }

    if (validators.formatNumberInvalid(total_days_paid)) {
        errors.push("total_days_paid invalid. total_days_paid must be a number.");
    }

    if (validators.formatMoneyInvalid(ivss)) {
        errors.push("ivss invalid. ivss must be a number.");
    }

    if (validators.formatMoneyInvalid(pie)) {
        errors.push("pie invalid. pie must be a number.");
    }

    if (validators.formatMoneyInvalid(faov)) {
        errors.push("faov invalid. faov must be a number.");
    }

    if (errors.length > 0) return responses.BadRequest(res, errors);
    next();
}

export default { addPayrolls, getPayrolls, updatePayrollState, updatePayrolls };