import responses from "../../shared/utils/responses.js";
import ReportsService from "./report.service.js";
const service = new ReportsService();

class ReportsController {
    constructor() { }

    async getAnnualExpensesReport(req, res) {
        try {
            const { year } = req.body;
            const result = await service.getAnnualExpensesReport(parseInt(year));
            return responses.QuerySuccess(res, result);

        } catch (error) {
            return responses.ErrorInternal(res, error.message);
        }
    }
}

export default ReportsController;