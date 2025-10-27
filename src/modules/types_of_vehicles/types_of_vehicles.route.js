import { Router } from 'express';
import ControllerType from './type.controller.js';
import { typesMiddleware } from 'types_of_vehicles.middleware.js';

const router = Router();

// Creamos una instancia del controlador para usar sus métodos
const typeController = new ControllerType();

// [GET] /api/v1/types - Listar todos
router.get('/list', typeController.listAll);



// [POST] /api/v1/types - Crear uno nuevo (REQUIERE autenticación)
router.post('/create', typesMiddleware, typeController.create);

// [PUT] /api/v1/types/:id - Actualizar uno (REQUIERE autenticación)
router.put('/update/:typeId', typesMiddleware, typeController.update);

// [DELETE] /api/v1/types/:id - Eliminar uno (REQUIERE autenticación)
router.delete('/delete/:typeId', typesMiddleware, typeController.delete); 

export default router;