import { Router } from 'express';
import controller from './repairs.controller.js';
import { 
    validateCreateRepairData, 
    validateRepairIdParam, 
    validateUpdateRepairData,
    validateDateRange // <-- Nueva función de validación
} from './repairs.middleware.js'; 

const router = Router();

// 1. AGREGAR (REGISTRAR NUEVA REPARACIÓN)
router.post(
    '/repairs/registerRepair', 
    validateCreateRepairData, 
    controller.registerRepair.bind(controller) 
);

// 2. CONSULTAR TODO
router.get(
    '/repairs/all', 
    controller.listAll.bind(controller) 
);

// 3. CONSULTAR POR FECHA (Rango) -> Usa query params: /findByDateRange?startDate=...&endDate=...
router.get(
    '/repairs/ByDateRange', 
    validateDateRange, // <-- Validamos que las fechas sean correctas
    controller.getRepairsByDateRange.bind(controller) 
);

// 4. EDITAR (ACTUALIZAR DETALLE DE REPARACIÓN POR ID)
router.put(
    '/repairs/update/:repairId', 
    validateRepairIdParam, 
    validateUpdateRepairData, 
    controller.updateRepairDetails.bind(controller) 
);

export default router;