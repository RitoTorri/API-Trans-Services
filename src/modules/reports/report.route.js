import express from "express";
import ReportsController from "./report.controller.js";
import middlewares from "./report.middleware.js";
import authorization from "../../shared/middlewares/authorization.middleware.js";
import TokenValidation from "../../shared/middlewares/validate.token.middleware.js";

const router = express.Router();
const controller = new ReportsController();

router.get('/reports/expenses/annual',
    TokenValidation,
    authorization(['Administrador', 'SuperUsuario']),
    middlewares.getAnnualExpensesReport,
    controller.getAnnualExpensesReport
);


export default router;