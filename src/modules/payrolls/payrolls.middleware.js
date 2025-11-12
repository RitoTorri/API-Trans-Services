import responses from "../../shared/utils/responses.js";
import validators from "../../shared/utils/format.data.js";

const addPayrolls = async (req, res, next) => {
    // Destructuracion de los parametros
    const { employee_id, base_salary, period_start, period_end, payment_date, hours_worked, bonus, deductions } = req.body;
    let errors = [];

    if (!employee_id || !base_salary || !period_start || !period_end || !payment_date || !hours_worked) {
        return responses.BadRequest(res, "Incomplete request. The following parameters are required: employee_id, base_salary, period_start, period_end, payment_date.");
    }

    if (validators.formatNumberInvalid(employee_id)) errors.push("id_employe is invalid. id_employe must be a number.");

    if (validators.formatNumberInvalid(hours_worked)) errors.push("hours_worked is invalid. hours_worked must be a number.");

    if (validators.formatMoneyInvalid(base_salary)) errors.push("base_salary is invalid. base_salary must be a number.");

    if (validators.formatDateInvalid(period_start)) errors.push("period_start is invalid. period_start must be a date.");

    if (validators.formatDateInvalid(period_end)) errors.push("period_end is invalid. period_end must be a date.");

    if (validators.formatDateInvalid(payment_date)) errors.push("payment_date is invalid. payment_date must be a date.");

    if (bonus) {
        if (validators.formatMoneyInvalid(bonus)) errors.push("bonus is invalid. bonus must be a number.");
    }

    if (deductions) {
        if (validators.formatMoneyInvalid(deductions)) errors.push("deductions is invalid. deductions must be a number.");
    }

    if (errors.length > 0) return responses.BadRequest(res, errors);
    next();
}

const getPayrolls = async (req, res, next) => {
    const filterSearch = req.body.filterSearch || req.query; // ← esta línea permite ambas formas
    let errors = [];

    if (!filterSearch) {
        return responses.BadRequest(res, "Incomplete request. The following parameters are required: filterSearch.");
    }

    if (Object.keys(filterSearch).length === 0) return next();

    if (filterSearch.year) {
        if (validators.formatYearInvalid(filterSearch.year)) errors.push("year is invalid. year must be a number and must have 4 digits.");
        if (parseInt(filterSearch.year) > new Date().getFullYear()) errors.push("The year must be under to " + new Date().getFullYear());
    } else {
        return responses.BadRequest(res, "Need to specify a year.");
    }

    if (filterSearch.month) {
        if (validators.formatMonthInvalid(filterSearch.month)) errors.push("month is invalid. month must be a number and must have 2 digits.");
        if (parseInt(filterSearch.month) > 12 || parseInt(filterSearch.month) === 0) errors.push("Month must be between 1 and 12.");
    }

    if (errors.length > 0) return responses.BadRequest(res, errors);
    next();
};


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
    if (!id) return responses.BadRequest(res, "Incomplete request. The following parameters are required: id.");
    if (validators.formatNumberInvalid(id)) return responses.BadRequest(res, "id invalid. id must be a number.");
    next();
}

export default { addPayrolls, getPayrolls, updatePayrollState, updatePayrolls };