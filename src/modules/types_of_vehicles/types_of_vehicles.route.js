import { Router } from 'express';
import ControllerType from './types_of_vehicles.controller.js';
import { ValidateTypeData, validateTypeIdParam, validateTypeNameParam } from './types_of_vehicles.middleware.js';
import TokenValidation from '../../shared/middlewares/validate.token.middleware.js';
import authorization from '../../shared/middlewares/authorization.middleware.js';

const router = Router();

// Creamos una instancia del controlador para usar sus métodos
const typeController = new ControllerType();

// [GET] /api/v1/types - Listar todos
router.get('/list',
    TokenValidation,
    authorization(['Invitado', 'Administrador', 'SuperUsuario']),
    typeController.listAll
);

// [GET] /api/trans/services/list/:typeId - Obtener un solo registro por ID
router.get('/list/by_name/:typeName',
    TokenValidation,
    authorization(['Invitado', 'Administrador', 'SuperUsuario']),
    validateTypeNameParam,
    typeController.getTypeByName
);


router.post('/createType',
    TokenValidation,
    authorization(['Administrador', 'SuperUsuario']),
    ValidateTypeData,
    typeController.create
);


router.put('/updateTypeId/:typeId',
    TokenValidation,
    authorization(['SuperUsuario']),
    validateTypeIdParam,
    typeController.update
);


router.delete('/deleteTypeId/:typeId',
    TokenValidation,
    authorization(['SuperUsuario']),
    validateTypeIdParam,
    typeController.delete
);

export default router;