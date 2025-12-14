// imports
import express from "express";
import middlewares from './payrolls.middleware.js';
import PayrollsController from './payrolls.controller.js';
import authorization from '../../shared/middlewares/authorization.middleware.js';
import TokenValidation from '../../shared/middlewares/validate.token.middleware.js';

// variables e instancias
const router = express.Router();
const controller = new PayrollsController();

router.post('/payrolls',
    TokenValidation,
    authorization(['Administrador', 'SuperUsuario']),
    middlewares.addPayrolls,
    controller.addPayrolls
);

// filterSearch: { dateStart: 2002-10-10, dateEnd: 2002-10-10  } o {} desde del body
router.post('/payrolls/search',
    TokenValidation,
    authorization(['Invitado', 'Administrador', 'SuperUsuario']),
    middlewares.getPayrolls,
    controller.getPayrolls
);

// status: draft, cancelled, paid
router.patch('/payrolls/:id/:status',
    TokenValidation,
    authorization(['Administrador', 'SuperUsuario']),
    middlewares.updatePayrollState,
    controller.updatePayrollState
);

export default router;