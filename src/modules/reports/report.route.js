import express from "express";
import ReportsController from "./report.controller.js";
import middlewares from "./report.middleware.js";
import authorization from "../../shared/middlewares/authorization.middleware.js";
import TokenValidation from "../../shared/middlewares/validate.token.middleware.js";

const router = express.Router();
const controller = new ReportsController();

router.get('/reports/expenses/annual/:year',
    TokenValidation,
    authorization(['Invitado', 'Administrador', 'SuperUsuario']),
    middlewares.ValidateYear,
    controller.getAnnualExpensesReport
);

router.get('/reports/revenue/annual/:year',
    TokenValidation,
    authorization(['Invitado', 'Administrador', 'SuperUsuario']),
    middlewares.ValidateYear,
    controller.getAnnualRevenueReport
);

router.get('/reports/clients/service/ranking/:year/:month',
    TokenValidation,
    authorization(['Invitado', 'Administrador', 'SuperUsuario']),
    middlewares.ValidateYear,
    middlewares.ValidateMonth,
    controller.getClientServiceRanking
);

router.get('/reports/employees/services/borrowed/:year/:month',
    TokenValidation,
    authorization(['Invitado', 'Administrador', 'SuperUsuario']),
    middlewares.ValidateYear,
    middlewares.ValidateMonth,
    controller.getEmployeesWithMoreServices
);

router.get('/reports/expenses/details/:year/:month',
    TokenValidation,
    authorization(['Invitado', 'Administrador', 'SuperUsuario']),
    middlewares.ValidateYear,
    middlewares.ValidateMonth,
    controller.getExpenseDetails
);

router.get('/reports/providers/:year/:month',
    TokenValidation,
    authorization(['Invitado', 'Administrador', 'SuperUsuario']),
    middlewares.ValidateYear,
    middlewares.ValidateMonth,
    controller.getProvidersReport
);

// PDFS 
router.get('/reports/clients/pdf',
    TokenValidation,
    authorization(['Invitado', 'Administrador', 'SuperUsuario']),
    controller.getPdfReportClients
);

router.get('/reports/employees/pdf',
    TokenValidation,
    authorization(['Invitado', 'Administrador', 'SuperUsuario']),
    controller.getPdfReportEmployees
);

// Muestra los datos de todos los proveedores
router.get('/reports/provider/pdf',
    TokenValidation,
    authorization(['Invitado', 'Administrador', 'SuperUsuario']),
    controller.getPdfReportProviders
);

router.get('/reports/vehicles/pdf',
    TokenValidation,
    authorization(['Invitado', 'Administrador', 'SuperUsuario']),
    controller.getPdfReportVehicles
);

router.get('/reports/expenses/pdf/:year/:month',
    TokenValidation,
    authorization(['Invitado', 'Administrador', 'SuperUsuario']),
    middlewares.ValidateYear,
    middlewares.ValidateMonth,
    controller.getPdfReportExpenses
);

router.get('/reports/revenue/pdf/:year/:month',
    TokenValidation,
    authorization(['Invitado', 'Administrador', 'SuperUsuario']),
    middlewares.ValidateYear,
    middlewares.ValidateMonth,
    controller.getPdfReportRevenue
);

// Este reporte muestra los proveedores a los que se les debe dinero
router.get('/reports/debt/providers/pdf',
    TokenValidation,
    authorization(['Invitado', 'Administrador', 'SuperUsuario']),
    controller.getPdfReportProvidersDebt
);


export default router;