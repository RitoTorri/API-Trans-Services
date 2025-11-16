import express from 'express';
import middlewares from './services.middleware.js';
import ServicesController from './services.controller.js';
import validationToken from '../../shared/middlewares/validate.token.middleware.js'; // Valida el token
import authorization from '../../shared/middlewares/authorization.middleware.js'; // Verifica roles de usuario

const router = express.Router();
const controller = new ServicesController();

router.post('/offered/services',
    validationToken,
    authorization(['Administrador', 'SuperUsuario']),
    middlewares.addServiceMiddleware,
    controller.addService
);

router.get('/offered/services/search',
    validationToken,
    authorization(['Administrador', 'SuperUsuario']),
    middlewares.getServicesMiddleware,
    controller.getServices
);

// Actualiza el estado de pago de un servicio
router.patch('/offered/services/payment/:id',
    validationToken,
    authorization(['Administrador', 'SuperUsuario']),
    middlewares.updatePaymentStatusMiddleware,
    controller.updatePaymentStatus
);

export default router;