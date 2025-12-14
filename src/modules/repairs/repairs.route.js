import { Router } from 'express';
import controller from './repairs.controller.js';
import {
    validateCreateRepairData,
    validateRepairIdParam,
    validateUpdateRepairData,
    validateDateRange // <-- Nueva función de validación
} from './repairs.middleware.js';
import TokenValidation from '../../shared/middlewares/validate.token.middleware.js';
import authorization from '../../shared/middlewares/authorization.middleware.js';

const router = Router();

// 1. AGREGAR (REGISTRAR NUEVA REPARACIÓN)
router.post(
    '/repairs/registerRepair',
    TokenValidation,
    authorization(['Administrador', 'SuperUsuario']),
    validateCreateRepairData,
    controller.registerRepair.bind(controller)
);

// 2. CONSULTAR TODO
router.get(
    '/repairs/all',
    TokenValidation,
    authorization(['Invitado', 'Administrador', 'SuperUsuario']),
    controller.listAll.bind(controller)
);

// 3. CONSULTAR POR FECHA (Rango) -> Usa query params: /findByDateRange?startDate=...&endDate=...
router.get(
    '/repairs/ByDateRange',
    TokenValidation,
    authorization(['Invitado', 'Administrador', 'SuperUsuario']),
    validateDateRange, // <-- Validamos que las fechas sean correctas
    controller.getRepairsByDateRange.bind(controller)
);

// 4. EDITAR (ACTUALIZAR DETALLE DE REPARACIÓN POR ID)
router.put(
    '/repairs/update/:repairId',
    TokenValidation,
    authorization(['SuperUsuario']),
    validateRepairIdParam,
    validateUpdateRepairData,
    controller.updateRepairDetails.bind(controller)
);

export default router;