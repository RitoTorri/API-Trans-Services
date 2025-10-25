// imports
import express from 'express';
import middlewares from './employee.contacts.middleware.js'; // Valida el formato de los datos
import ControllerEmployeeContacts from './employee.contacts.controller.js'; // Llama al controlador
import validationToken from '../../shared/middlewares/validate.token.middleware.js'; // Valida el token
import authorization from '../../shared/middlewares/authorization.middleware.js'; // Verifica roles de usuario

// variables e instancias
const router = express.Router();
const controller = new ControllerEmployeeContacts();

router.post('/employee/contact/:employee_id', // Body: contact_info y Params: employee_id
    validationToken,
    authorization(['Administrador']),
    middlewares.middlewareAddEmployeeContact,
    controller.addEmployeeContact
)

router.delete('/employee/contact/:contact_id', // Params: contact_id
    validationToken,
    authorization(['Administrador']),
    middlewares.middlewareDeleteEmployeeContact,
    controller.deleteEmployeeContact
);

export default router;