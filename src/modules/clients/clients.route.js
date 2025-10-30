import express from 'express';
import ControllerClients from './clients.controller.js';
import middlewares from './clients.middleware.js';

const router = express.Router();
const controller = new ControllerClients();

router.post('/clients', middlewares.addClientMiddleware, controller.addClient);

router.get('/clients/:filter', middlewares.getClientsMiddleware, controller.getClients);

router.patch('/clients/:id', middlewares.updateClientMiddleware, controller.updateClient);

export default router;