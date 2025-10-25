// imports
import express from 'express';
import authMiddleware from './auth.middleware.js'; // Valida el formato de los datos
import ControllerAuth from './auth.controller.js'; // Llama al controlador

// instacias y variables
const controllerAuth = new ControllerAuth();
const router = express.Router();

// Ruta Publica
router.post('/login', authMiddleware, controllerAuth.login);

export default router;