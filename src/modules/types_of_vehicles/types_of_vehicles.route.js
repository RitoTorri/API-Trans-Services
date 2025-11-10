import { Router } from 'express';
import ControllerType from './types_of_vehicles.controller.js';
import { ValidateTypeData, validateTypeIdParam } from './types_of_vehicles.middleware.js';

const router = Router();

// Creamos una instancia del controlador para usar sus métodos
const typeController = new ControllerType();

// [GET] /api/v1/types - Listar todos
router.get('/list', typeController.listAll);

// [GET] /api/trans/services/list/:typeId - Obtener un solo registro por ID
router.get('/list/:typeId', validateTypeIdParam, typeController.getTypeById);


router.post('/create', ValidateTypeData, typeController.create);


router.put('/update/:typeId', validateTypeIdParam, typeController.update);


router.delete('/delete/:typeId', validateTypeIdParam, typeController.delete); 

export default router;