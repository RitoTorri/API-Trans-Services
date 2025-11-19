import { Router } from 'express';
import ControllerType from './types_of_vehicles.controller.js';
import { ValidateTypeData, validateTypeIdParam, validateTypeNameParam } from './types_of_vehicles.middleware.js';

const router = Router();

// Creamos una instancia del controlador para usar sus métodos
const typeController = new ControllerType();

// [GET] /api/v1/types - Listar todos
router.get('/list', typeController.listAll);

// [GET] /api/trans/services/list/:typeId - Obtener un solo registro por ID
router.get('/list/by_name/:typeName', validateTypeNameParam, typeController.getTypeByName);


router.post('/createType', ValidateTypeData, typeController.create);


router.put('/updateTypeId/:typeId', validateTypeIdParam, typeController.update);


router.delete('/deleteTypeId/:typeId', validateTypeIdParam, typeController.delete); 

export default router;