// src/modules/vehicleModel/vehicleModel.router.js

import { Router } from 'express';
import controller from './vehicle_model.controller.js';
import middleware from './vehicle_model.middleware.js';

const router = Router();

// 1. LISTAR TODOS LOS MODELOS (Catálogo)
router.get(
    '/listModel',
    controller.listAllModels.bind(controller)
);

// 2. CREAR UN NUEVO MODELO (Admin)
router.post(
    '/registerModel',
    middleware.validateModelData.bind(middleware), // Asegura que 'name' sea válido
    controller.createModel.bind(controller)
);

// 3. ACTUALIZAR UN MODELO ESPECÍFICO
router.put(
    '/updateModel/:id',
    middleware.validateModelId.bind(middleware),    // Valida que :id sea un número
    middleware.validateModelData.bind(middleware),  // Valida que el body tenga un 'name' válido
    controller.updateModel.bind(controller)
);

// 4. ELIMINAR UN MODELO ESPECÍFICO
router.delete(
    '/deleteModel/:id',
    middleware.validateModelId.bind(middleware), // Valida que :id sea un número
    controller.deleteModel.bind(controller)
);

export default router;