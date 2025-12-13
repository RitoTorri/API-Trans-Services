import express from "express";
import ReportsController from "./report.controller.js";
import middlewares from "./report.middleware.js";
import authorization from "../../shared/middlewares/authorization.middleware.js";
import TokenValidation from "../../shared/middlewares/validate.token.middleware.js";

const router = express.Router();
const controller = new ReportsController();

router.get('/reports/expenses/annual/:year',
    middlewares.ValidateYear,
    controller.getAnnualExpensesReport
);

router.get('/reports/revenue/annual/:year',
    middlewares.ValidateYear,
    controller.getAnnualRevenueReport
);

router.get('/reports/clients/service/ranking/:year/:month',
    middlewares.ValidateYear,
    middlewares.ValidateMonth,
    controller.getClientServiceRanking
);

router.get('/reports/employees/services/borrowed/:year/:month',
    middlewares.ValidateYear,
    middlewares.ValidateMonth,
    controller.getEmployeesWithMoreServices
);

router.get('/reports/expenses/details/:year/:month',
    middlewares.ValidateYear,
    middlewares.ValidateMonth,
    controller.getExpenseDetails
);

router.get('/reports/providers/:year/:month',
    middlewares.ValidateYear,
    middlewares.ValidateMonth,
    controller.getProvidersReport
);

// PDFS 
router.get('/reports/clients/pdf',
    controller.getPdfReportClients
);

router.get('/reports/employees/pdf',
    controller.getPdfReportEmployees
);

router.get('/reports/provider/pdf',
    controller.getPdfReportProviders
);

router.get('/reports/vehicles/pdf',
    controller.getPdfReportVehicles
);

router.get('/reports/expenses/pdf/:year/:month',
    middlewares.ValidateYear,
    middlewares.ValidateMonth,
    controller.getPdfReportExpenses
);

router.get('/reports/revenue/pdf/:year/:month',
    middlewares.ValidateYear,
    middlewares.ValidateMonth,
    controller.getPdfReportRevenue
);

// Este reporte muestra los proveedores a los que se les debe dinero
router.get('/reports/debt/providers/pdf',
    controller.getPdfReportProvidersDebt
);

// Este reporte muestra los datos de todos los proveedores
router.get('/reports/pdf/providers',
    controller.getPdfReportProviders
);


export default router;