import ReportModel from "./report.model.js";
const model = new ReportModel();

// Importacion de generador de PDF
import generarPDF from "../../shared/utils/pdf.generator.js";
import htmls from "../../shared/utils/html.templates.js";

// Importacion de clientes
import ClientsModel from "../clients/clients.model.js";
const clients = new ClientsModel();

// Importacion de empleados
import EmployeesModel from "../employee/employee.model.js";
const employees = new EmployeesModel();

// Importacion de vehículos
import vehiclesModel from "../vehicles/vehicles.model.js";


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

    async getClientServiceRanking(year, month) {
        try {
            return await model.getClientServiceRanking(year, month);
        } catch (error) { throw error; }
    }

    async getEmployeesWithMoreServices(year, month) {
        try {
            return await model.getEmployeesWithMoreServices(year, month);
        } catch (error) { throw error; }
    }

    async getExpenseDetails(year, month) {
        try {
            return await model.getExpenseDetails(year, month);
        } catch (error) { throw error; }
    }

    async getProvidersReport(year, month) {
        try {
            return await model.getProvidersReport(year, month);
        } catch (error) { throw error; }
    }

    // PDFS
    async getPdfReportClients() {
        try {
            const data = await clients.getClients({});
            const html = await htmls.htmlClientsReport(data);
            const pdf = await generarPDF(html);

            return pdf;
        } catch (error) { throw error; }
    }

    async getPdfReportEmployees() {
        try {
            const data = await employees.getAllEmployees({ is_active: true, filterSearch: 'all' });
            const html = await htmls.htmlEmployeesReport(data);
            const pdf = await generarPDF(html);

            return pdf;
        } catch (error) { throw error; }
    }

    async getPdfReportProviders() {
        try {

        } catch (error) { throw error; }
    }

    async getPdfReportVehicles() {
        try {
            const data = await vehiclesModel.getAllInfoVehicles();
            const html = await htmls.htmlVehiclesReport(data);
            const pdf = await generarPDF(html);

            return pdf;
        } catch (error) { throw error; }
    }

    async getPdfReportExpenses(year, month) {
        try {
            const data = await model.getAnnualExpensesFullReport(year, month);

            const html = await htmls.htmlExpensesReport(data);
            const pdf = await generarPDF(html);

            return pdf;
        } catch (error) { throw error; }
    }

    async getPdfReportRevenue(year, month) {
        try {
            const data = await model.getAnnualRevenueFullReport(year, month);

            const html = await htmls.htmlRevenueReport(data);
            const pdf = await generarPDF(html);

            return pdf;
        } catch (error) { throw error; }
    }
}

export default ReportsService;