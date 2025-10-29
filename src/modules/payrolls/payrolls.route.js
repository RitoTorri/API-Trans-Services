// imports
import express from "express";
import middlewares from './payrolls.middleware.js';
import PayrollsController from './payrolls.controller.js';
import authorization from '../../shared/middlewares/authorization.middleware.js';
import TokenValidation from '../../shared/middlewares/validate.token.middleware.js';

// variables e instancias
const router = express.Router();
const controller = new PayrollsController();

// employee_id, base_salary, period_start, period_end, payment_date, hours_worked, bonus, deductions
router.post('/payrolls',
    TokenValidation,
    authorization(['Administrador']),
    middlewares.addPayrolls,
    controller.addPayrolls
);

// filterSearch: { year: 2022, month: 1 } o { year: 2022 } o {} desde del body
router.get('/payrolls/search',
    TokenValidation,
    authorization(['Administrador']),
    middlewares.getPayrolls,
    controller.getPayrolls
);

// status: draft, cancelled, paid
router.patch('/payrolls/:id/:status',
    TokenValidation,
    authorization(['Administrador']),
    middlewares.updatePayrollState,
    controller.updatePayrollState
);

// Actualiza Datos de la nomina
router.put('/payrolls/:id',
    middlewares.updatePayrolls,
    middlewares.addPayrolls,
    controller.updatePayrolls
);

export default router;