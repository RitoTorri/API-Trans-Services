import response from '../../shared/utils/responses.js';
import validator from '../../shared/utils/format.data.js';

export const ValidateTypeData = (req,res,next) =>{
     const { type_name } = req.body;
    let error = false;
    let details = [];

    // 1. Verificación de existencia básica (requisito de no vacío)
    if (!type_name) {
        
        return response.BadRequest(res, 'The type_name is required and cannot be empty.');
    }

    // 2. Validación de formato de texto usando la utilidad
    if (validator.formatTextInvalid(type_name)) {
        error = true;
        details.push('The type_name contains invalid characters or has an incorrect length.');
    }

    // 3. Devolver errores si existen
    if (error) return response.ParametersInvalid(res, details);
    
    
    next();
};

export const validateTypeIdParam = (req, res, next) => {
    const { typeId } = req.params;
    let error = false;
    let details = [];

    
    if (validator.formatNumberInvalid(typeId)) {
        error = true;
        details.push('The typeId must be a positive integer.');
    }

    
    if (error) return response.ParametersInvalid(res, details);
    
    // Se parsea a entero ANTES de pasar al Controller/Service para evitar errores de tipo.
    req.params.typeId = parseInt(typeId, 10);

    next();
};

export const validateTypeNameParam = (req, res, next) => {
    const { typeName } = req.params;
    let error = false;
    let details = [];

    // Verificación de existencia básica
    if (!typeName) {
        return response.BadRequest(res, 'The typeName is required and cannot be empty.');
    }

    // Validación de formato de texto (reutilizamos tu utilidad)
    if (validator.formatTextInvalid(typeName)) {
        error = true;
        details.push('The typeName contains invalid characters or has an incorrect length.');
    }

    if (error) return response.ParametersInvalid(res, details);
    
    
    next(); 
};