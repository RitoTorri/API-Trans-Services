import express from 'express';
import middleware from './services.middleware.js';
import ServicesController from './services.controller.js';
import validationToken from '../../shared/middlewares/validate.token.middleware.js'; // Valida el token
import authorization from '../../shared/middlewares/authorization.middleware.js'; // Verifica roles de usuario

const router = express.Router();
const controller = new ServicesController();

router.post('/offered/services',
    middleware.addServiceMiddleware,
    controller.addService
);


export default router;