import responses from '../../shared/utils/responses.js'; // Asumimos la ruta a tus respuestas
import validator from '../../shared/utils/format.data.js'; // Asumimos la ruta a tus utilidades de formato

// Middleware para validar la creación de una nueva reparación
export const validateCreateRepairData = (req, res, next) => {
    const { vehicleId, description, estimatedCost } = req.body;

    // 1. Verificar campos obligatorios
    if (!vehicleId || !description) {
        return responses.BadRequest(res, { 
            message: 'Faltan campos obligatorios para registrar la reparación.',
            required: ['vehicleId', 'description']
        });
    }

    // 2. Validar formato: vehicleId debe ser un número entero
    if (validator.formatNumberInvalid(vehicleId.toString())) { 
        return responses.ParametersInvalid(res, {
            field: 'vehicleId',
            message: 'El campo vehicleId debe ser un número entero válido.'
        });
    }

    // 3. Validar formato: description (debe ser texto y no vacío)
    if (description.trim().length === 0 || validator.formatTextInvalid(description)) {
        return responses.ParametersInvalid(res, {
            field: 'description',
            message: 'La descripción contiene caracteres no permitidos o está vacía.'
        });
    }

    // 4. Validar formato: estimatedCost (si existe, debe ser un número)
    if (estimatedCost !== undefined && estimatedCost !== null) {
        if (isNaN(estimatedCost) || parseFloat(estimatedCost) < 0) {
            return responses.ParametersInvalid(res, {
                field: 'estimatedCost',
                message: 'El costo estimado debe ser un número no negativo.'
            });
        }
        // Opcional: convertir a flotante si el modelo espera un número
        req.body.estimatedCost = parseFloat(estimatedCost);
    }
    
    next();
};

export const validateDateRange = (req, res, next) => {
    const { startDate, endDate } = req.query; // Esperamos las fechas por query params

    if (!startDate || !endDate) {
        return responses.BadRequest(res, {
            message: 'Se requieren las fechas de inicio (startDate) y fin (endDate) para la consulta por rango.',
            required: ['startDate', 'endDate']
        });
    }

    // Validación simple de formato de fecha. Usa Date.parse para verificar si es una fecha reconocible.
    if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) {
        return responses.ParametersInvalid(res, {
            message: 'El formato de las fechas proporcionadas (startDate o endDate) es inválido. Use un formato de fecha válido (Ej: YYYY-MM-DD).',
        });
    }
    
    // Opcional: Asegurar que la fecha de inicio no sea posterior a la de fin
    if (new Date(startDate) > new Date(endDate)) {
        return responses.ParametersInvalid(res, {
            message: 'La fecha de inicio (startDate) no puede ser posterior a la fecha de fin (endDate).'
        });
    }

    next();
};

// Middleware para validar el parámetro de ID en la URL
export const validateRepairIdParam = (req, res, next) => {
    const { repairId } = req.params; // Asumimos que el parámetro es :repairId

    if (!repairId) {
        return responses.BadRequest(res, {
            error: 'MISSING_REPAIR_ID_PARAM',
            message: 'El parámetro de ID de la reparación en la URL no puede estar vacío.'
        });
    }
    
    if (validator.formatNumberInvalid(repairId.toString())) {
        return responses.ParametersInvalid(res, {
            field: 'repairId',
            message: 'El ID de la reparación debe ser un número entero válido.'
        });
    }

    // Convertir a número entero para usarlo en el Controlador/Servicio
    req.params.repairId = parseInt(repairId, 10);

    next();
};

// Middleware para validar la actualización de una reparación
export const validateUpdateRepairData = (req, res, next) => {
    const { status, finalCost, description, startDate, endDate } = req.body;

    if (Object.keys(req.body).length === 0) {
        return responses.BadRequest(res, { 
            message: 'Se requiere al menos un campo para actualizar.'
        });
    }
    
    // Lista de estados válidos (puedes ajustarla según tu lógica)
    const validStatuses = ["Pending", "InProgress", "Completed", "Canceled"];

    if (status && !validStatuses.includes(status)) {
        return responses.ParametersInvalid(res, { 
            field: 'status', 
            message: `El estado proporcionado no es válido. Debe ser uno de: ${validStatuses.join(', ')}.` 
        });
    }
    
    if (finalCost !== undefined && (isNaN(finalCost) || parseFloat(finalCost) < 0)) {
        return responses.ParametersInvalid(res, {
            field: 'finalCost',
            message: 'El costo final debe ser un número no negativo.'
        });
    }

    // Nota: Las validaciones de formato de fecha (startDate, endDate) son más complejas y pueden requerir una librería como Moment.js o Day.js.

    next();
};