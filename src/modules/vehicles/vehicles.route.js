import { Router } from 'express';
import controller from './vehicles.controller.js';
import { validateCreateVehicleData, validateLicensePlateParam, validateUpdateVehicleData } from './vehicles.middleware.js'; 

const router = Router();

router.get(
    '/findAll',
      controller.listAll
);

router.post(
    '/registerVehicle', 
    validateCreateVehicleData, 
    controller.createVehicle.bind(controller) 
);

router.get(
    '/vehicles/:license_plate', 
    validateLicensePlateParam, 
    controller.getVehicleByPlate 
);

router.put(
    '/vehicles/updateVehicle/:license_plate', 
    validateLicensePlateParam, 
    validateUpdateVehicleData,  
    controller.updateVehicle
);

router.delete(
    '/vehicles/deleteVehicle/:license_plate', 
    validateLicensePlateParam, // Solo necesitamos validar el parámetro
    controller.deleteVehicle
);

export default router;