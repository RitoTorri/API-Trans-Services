import responses from "../../shared/utils/responses.js";
import ReportsService from "./report.service.js";
const service = new ReportsService();

class ReportsController {
    constructor() { }

    async getAnnualExpensesReport(req, res) {
        try {
            const { year } = req.params;
            const result = await service.getAnnualExpensesReport(parseInt(year));
            return responses.QuerySuccess(res, result);

        } catch (error) {
            return responses.ErrorInternal(res, error.message);
        }
    }

    async getAnnualRevenueReport(req, res) {
        try {
            const { year } = req.params;
            const result = await service.getAnnualRevenueReport(parseInt(year));
            return responses.QuerySuccess(res, result);

        } catch (error) {
            return responses.ErrorInternal(res, error.message);
        }
    }

    async getClientServiceRanking(req, res) {
        try {
            const { year, month } = req.params;
            const result = await service.getClientServiceRanking(parseInt(year), parseInt(month));
            return responses.QuerySuccess(res, result);

        } catch (error) {
            return responses.ErrorInternal(res, error.message);
        }
    }

    async getEmployeesWithMoreServices(req, res) {
        try {
            const { year, month } = req.params;
            const result = await service.getEmployeesWithMoreServices(parseInt(year), parseInt(month));
            return responses.QuerySuccess(res, result);

        } catch (error) {
            return responses.ErrorInternal(res, error.message);
        }
    }

    async getExpenseDetails(req, res) {
        try {
            const { year, month } = req.params;
            const result = await service.getExpenseDetails(parseInt(year), parseInt(month));
            return responses.QuerySuccess(res, result);
        } catch (error) {
            return responses.ErrorInternal(res, error.message);
        }
    }

    async getProvidersReport(req, res) { // Muestra los 3 proveedores a los que se le realizan mas compras
        try {
            const { year, month } = req.params;
            const result = await service.getProvidersReport(parseInt(year), parseInt(month));
            return responses.QuerySuccess(res, result);

        } catch (error) {
            return responses.ErrorInternal(res, error.message);
        }
    }

    // PDFS
    async getPdfReportClients(req, res) {
        try {
            const pdf = await service.getPdfReportClients();

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="reporte_clientes.pdf"');
            res.send(pdf);

        } catch (error) {
            return responses.ErrorInternal(res, error.message);
        }
    }

    async getPdfReportEmployees(req, res) {
        try {
            const pdf = await service.getPdfReportEmployees();

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="reporte_empleados.pdf"');
            res.send(pdf);

        } catch (error) {
            return responses.ErrorInternal(res, error.message);
        }
    }

    // Este reporte muestra los proveedores a los que se les debe dinero
    async getPdfReportProvidersDebt(req, res) {
        try {
            const pdf = await service.getPdfReportProvidersDebt();

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="reporte_provedores_deudas.pdf"');
            res.send(pdf);

        } catch (error) {
            return responses.ErrorInternal(res, error.message);
        }
    }

    async getPdfReportVehicles(req, res) {
        try {
            const pdf = await service.getPdfReportVehicles();

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="reporte_vehiculos.pdf"');
            res.send(pdf);

        } catch (error) {
            return responses.ErrorInternal(res, error.message);
        }
    }

    async getPdfReportExpenses(req, res) {
        try {
            const { year, month } = req.params;
            const pdf = await service.getPdfReportExpenses(parseInt(year), parseInt(month));

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="reporte_gastos.pdf"');
            res.send(pdf);

        } catch (error) {
            return responses.ErrorInternal(res, error.message);
        }
    }

    async getPdfReportRevenue(req, res) {
        try {
            const { year, month } = req.params;
            const pdf = await service.getPdfReportRevenue(parseInt(year), parseInt(month));

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="reporte_ganancias.pdf"');
            res.send(pdf);

        } catch (error) {
            return responses.ErrorInternal(res, error.message);
        }
    }


    // Este reporte muestra los datos de todos los proveedores
    async getPdfReportProviders(req, res) {
        try {
            const pdf = await service.getPdfReportProviders();

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="reporte_providers.pdf"');
            res.send(pdf);

        } catch (error) {
            return responses.ErrorInternal(res, error.message);
        }
    }
}

export default ReportsController;