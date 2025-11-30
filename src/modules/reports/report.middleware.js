import responses from "../../shared/utils/responses.js";
import validators from "../../shared/utils/format.data.js";

const ValidateYear = (req, res, next) => {
    const { year } = req.params;

    if (!year) {
        return responses.BadRequest(res, "Incomplete request. The following parameters are required: year.");
    }

    if (validators.formatYearInvalid(year)) {
        return responses.BadRequest(res, "year is invalid. year must be a number.");
    }
    next();
}

const ValidateMonth = (req, res, next) => {
    const { month } = req.params;

    if (!month) {
        return responses.BadRequest(res, "Incomplete request. The following parameters are required: month.");
    }

    if (validators.formatMonthInvalid(month)) {
        return responses.BadRequest(res, "month is invalid. month must be a number.");
    }
    next();
}

export default { ValidateYear, ValidateMonth };