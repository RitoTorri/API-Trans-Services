import ReportModel from "./report.model.js";
const model = new ReportModel();

class ReportsService {
    constructor() { }

    async getAnnualExpensesReport(year) {
        try {
            return await model.getAnnualExpensesReport(year);
        } catch (error) { throw error; }
    }

    async getAnnualRevenueReport(year) {
        try {
            return await model.getAnnualRevenueReport(year);
        } catch (error) { throw error; }
    }

    async getClientServiceRanking() {
        try {
            return await model.getClientServiceRanking();
        } catch (error) { throw error; }
    }
}

export default ReportsService;