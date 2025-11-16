import express from "express";
import ControllerUsers from "./users.controller.js";
import middlewares from "./users.middleware.js";
import validationToken from '../../shared/middlewares/validate.token.middleware.js'; // Valida el token
import authorization from '../../shared/middlewares/authorization.middleware.js'; // Verifica roles de usuario

const router = express.Router();
const controller = new ControllerUsers();

router.get('/users',
    validationToken,
    authorization(['SuperUsuario']),
    controller.getUsers
);

router.post('/users',
    middlewares.addUserMiddleware,
    controller.addUser
);

router.delete('/users/:id',
    validationToken,
    authorization(['SuperUsuario']),
    middlewares.deleteUserMiddleware,
    controller.deleteUser
);

router.patch('/users/:id',
    validationToken,
    authorization(['SuperUsuario']),
    middlewares.updateUserMiddleware,
    controller.updateUser
);


export default router;
