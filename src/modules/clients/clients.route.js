import express from 'express';
import ControllerClients from './clients.controller.js';
import middlewares from './clients.middleware.js';
import validationToken from '../../shared/middlewares/validate.token.middleware.js'; // Valida el token
import authorization from '../../shared/middlewares/authorization.middleware.js'; // Verifica roles de usuario

const router = express.Router();
const controller = new ControllerClients();

router.post('/clients',
    validationToken,
    authorization(['Administrador']),
    middlewares.addClientMiddleware,
    controller.addClient
);

router.get('/clients/:filter',
    validationToken,
    authorization(['Administrador']),
    middlewares.getClientsMiddleware,
    controller.getClients
);

router.patch('/clients/:id',
    validationToken,
    authorization(['Administrador']),
    middlewares.updateClientMiddleware,
    controller.updateClient
);

export default router;