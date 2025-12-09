import responses from '../../shared/utils/responses.js';
import validator from '../../shared/utils/format.data.js';

export const validateCreateVehicleData = (req, res, next) => {

    const { driver_id, vehicle_model_id, license_plate, total_seats, vehicle_type_id, color } = req.body;
    
    
    if (!driver_id || !vehicle_model_id || !license_plate || !total_seats || !vehicle_type_id) {
        return responses.BadRequest(res, { 
            message: 'Faltan campos obligatorios.',
            required: ['driver_id', 'vehicle_model_id', 'license_plate', 'total_seats', 'vehicle_type_id']
        });
    }

    
    if (validator.formatNumberInvalid(driver_id.toString())) { 
        return responses.ParametersInvalid(res, {
            field: 'driver_id',
            message: 'El campo driver_id debe ser un número entero válido.'
        });
    }
    
    
    if (validator.formatNumberInvalid(total_seats.toString())) {
        return responses.ParametersInvalid(res, {
            field: 'total_seats',
            message: 'El campo total_seats debe ser un número entero válido.'
        });
    }

    
    if (validator.formatNumberInvalid(vehicle_type_id.toString())) { 
        return responses.ParametersInvalid(res, {
            field: 'vehicle_type_id',
            message: 'El campo vehicle_type_id debe ser un número entero válido.'
        });
    }
    
    
    if (validator.formatNumberInvalid(vehicle_model_id.toString())) { 
        return responses.ParametersInvalid(res, {
            field: 'vehicle_model_id',
            message: 'El campo vehicle_model_id debe ser un número entero válido.'
        });
    }

    next();
};


export const validateLicensePlateParam = (req, res, next) => {
    
    const { license_plate } = req.params;

    

    if (!license_plate || license_plate.trim().length === 0) {
        return responses.BadRequest(res, {
            error: 'MISSING_LICENSE_PLATE_PARAM',
            message: 'El parámetro de la placa del vehículo en la URL no puede estar vacío.'
        });
    }
    
    if (validator.formatTextInvalid(license_plate)) {
        return responses.ParametersInvalid(res, {
            field: 'license_plate',
            message: 'El formato de la placa contiene caracteres no permitidos.'
        });
    }

    next();
};

export const validateUpdateVehicleData = (req, res, next) => {
    const { driver_id, vehicle_model_id, license_plate, total_seats, vehicle_type_id } = req.body;

    
    if (Object.keys(req.body).length === 0) {
        return responses.BadRequest(res, { 
            message: 'Se requiere al menos un campo para actualizar.'
        });
    }

   
    if (license_plate && validator.formatTextInvalid(license_plate)) {
        return responses.ParametersInvalid(res, { field: 'license_plate', message: 'Formato de placa no permitido.' });
    }
    
    
    if (driver_id && validator.formatNumberInvalid(driver_id.toString())) {
        return responses.ParametersInvalid(res, { field: 'driver_id', message: 'El campo driver_id debe ser un número entero válido.' });
    }
    
    if (vehicle_model_id && validator.formatNumberInvalid(vehicle_model_id.toString())) { 
        return responses.ParametersInvalid(res, {
            field: 'vehicle_model_id',
            message: 'El campo vehicle_model_id debe ser un número entero válido.'
        });
    }
    

    next();
};