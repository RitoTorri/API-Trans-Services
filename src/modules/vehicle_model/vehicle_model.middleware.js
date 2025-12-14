// src/modules/vehicleModel/vehicleModel.middleware.js

import responses from '../../shared/utils/responses.js';

class VehicleModelMiddleware {
    // Middleware para validar la creación y actualización de un modelo
    validateModelData(req, res, next) {
        const { name } = req.body;

        if (!name || typeof name !== 'string' || name.trim() === '') {
            return responses.ResBadRequest(res, {
                message: 'El nombre del modelo es obligatorio y debe ser una cadena de texto no vacía.',
                field: 'name'
            });
        }

        // Si la data es válida, pasa al siguiente middleware o controlador
        next();
    }
    
    // Middleware para validar el ID en las rutas PUT y DELETE
    validateModelId(req, res, next) {
        const { id } = req.params;

        // Verifica si el ID es un número entero válido (Prisma requiere Int)
        if (!id || isNaN(parseInt(id)) || parseInt(id) <= 0) {
            return responses.ResBadRequest(res, {
                message: 'El ID del modelo proporcionado es inválido. Debe ser un número entero positivo.',
                field: 'id'
            });
        }
        
        // Pasa el ID como entero para el controlador/servicio
        req.params.id = parseInt(id);
        next();
    }
}

export default new VehicleModelMiddleware();