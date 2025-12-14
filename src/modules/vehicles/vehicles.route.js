import { Router } from 'express';
import controller from './vehicles.controller.js';
import { validateCreateVehicleData, validateLicensePlateParam, validateUpdateVehicleData } from './vehicles.middleware.js';
import TokenValidation from '../../shared/middlewares/validate.token.middleware.js';
import authorization from '../../shared/middlewares/authorization.middleware.js';

const router = Router();

router.get(
    '/findAll',
    TokenValidation,
    authorization(['Invitado', 'Administrador', 'SuperUsuario']),
    controller.listAll
);

router.post(
    '/registerVehicle',
    TokenValidation,
    authorization(['Administrador', 'SuperUsuario']),
    validateCreateVehicleData,
    controller.createVehicle.bind(controller)
);

router.get(
    '/vehicles/:license_plate',
    TokenValidation,
    authorization(['Invitado', 'Administrador', 'SuperUsuario']),
    validateLicensePlateParam,
    controller.getVehicleByPlate
);

router.put(
    '/vehicles/updateVehicle/:license_plate',
    TokenValidation,
    authorization(['SuperUsuario']),
    validateLicensePlateParam,
    validateUpdateVehicleData,
    controller.updateVehicle
);

router.delete(
    '/vehicles/deleteVehicle/:license_plate',
    TokenValidation,
    authorization(['SuperUsuario']),
    validateLicensePlateParam, // Solo necesitamos validar el parámetro
    controller.deleteVehicle
);

router.put(
    '/reactivate/:license_plate',
    TokenValidation,
    authorization(['SuperUsuario']),
    validateLicensePlateParam,
    controller.reactivateVehicle.bind(controller)
);

router.get(
    '/availableByDate',
    TokenValidation,
    authorization(['Invitado', 'Administrador', 'SuperUsuario']),
    controller.getAvailableVehicles.bind(controller)
);

export default router;