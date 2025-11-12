// imports
import express from 'express';
import ControllerEmployee from './employee.controller.js';
import middlewares from './employee.middleware.js';  // Valida el formato de los datos
import validationToken from '../../shared/middlewares/validate.token.middleware.js'; // Valida el token
import authorization from '../../shared/middlewares/authorization.middleware.js'; // Verifica roles de usuario

// variables e instancias
const router = express.Router();
const controller = new ControllerEmployee(); // Llama al controlador

// Devuelve Epleados + Contactos
router.get('/employees/search/:active/:filter', // Params: active = true o false, filter = all, ci o name
    validationToken,
    authorization(['Administrador','SuperUser']),
    middlewares.middlewareGetEmployee,
    controller.getAllEmployees
);

// Eliminar empleado + Contactos
router.delete('/employee/:id', // Params: id
    validationToken,
    authorization(['Administrador','SuperUser']),
    middlewares.middlewareDeleteEmployee,
    controller.deleteEmployee
);

// Crear empleado + Contactos
router.post('/employee', // Body: name, lastname, ci, rol, Arreglo de contactos
    validationToken,
    authorization(['Administrador','SuperUser']),
    middlewares.middlewareCreateEmployee,
    controller.createEmployee
);

// me falta esta monda
router.patch('/employee/:id', // Params: id, Body: name, lastname, ci, rol, is_active
    validationToken,
    authorization(['Administrador', 'SuperUser']),
    middlewares.middlewareUpdateEmployee,
    controller.updateEmployee
);

<<<<<<< Updated upstream
=======
router.patch('/employee/restore/:id',
    validationToken,
    authorization(['Administrador', 'SuperUser']),
    middlewares.middlewareEmployeeRestore,
    controller.restoreEmployee
);

>>>>>>> Stashed changes
export default router;