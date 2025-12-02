import express from "express";
import ReportsController from "./report.controller.js";
import middlewares from "./report.middleware.js";
import authorization from "../../shared/middlewares/authorization.middleware.js";
import TokenValidation from "../../shared/middlewares/validate.token.middleware.js";

const router = express.Router();
const controller = new ReportsController();

router.get('/reports/expenses/annual/:year',
    TokenValidation,
    authorization(['Administrador', 'SuperUsuario']),
    middlewares.ValidateYear,
    controller.getAnnualExpensesReport
);

router.get('/reports/revenue/annual/:year',
    TokenValidation,
    authorization(['Administrador', 'SuperUsuario']),
    middlewares.ValidateYear,
    controller.getAnnualRevenueReport
);

router.get('/reports/clients/service/ranking/:year/:month',
    TokenValidation,
    authorization(['Administrador', 'SuperUsuario']),
    middlewares.ValidateYear,
    middlewares.ValidateMonth,
    controller.getClientServiceRanking
);

router.get('/reports/employees/services/borrowed/:year/:month',
    TokenValidation,
    authorization(['Administrador', 'SuperUsuario']),
    middlewares.ValidateYear,
    middlewares.ValidateMonth,
    controller.getEmployeesWithMoreServices
);

router.get('/reports/expenses/details/:year/:month',
    TokenValidation,
    authorization(['Administrador', 'SuperUsuario']),
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
    TokenValidation,
    authorization(['Administrador', 'SuperUsuario']),
    controller.getPdfReportClients
);

router.get('/reports/employees/pdf',
    TokenValidation,
    authorization(['Administrador', 'SuperUsuario']),
    controller.getPdfReportEmployees
);


export default router;