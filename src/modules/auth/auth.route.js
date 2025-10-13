// imports
import express from 'express';
import authMiddleware from './auth.middleware.js';
import ControllerAuth from './auth.controller.js';

// instacias y variables
const controllerAuth = new ControllerAuth();
const router = express.Router();

router.post('/login', authMiddleware, controllerAuth.login);

export default router;