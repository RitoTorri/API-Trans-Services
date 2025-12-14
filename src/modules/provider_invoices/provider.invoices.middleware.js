import responses from '../../shared/utils/responses.js';
import validators from '../../shared/utils/format.data.js';

// 🔹 Validar creación de factura
const validateCreate = (req, res, next) => {
  const provider_id = Number(req.params.provider_id); // ✅ viene de la URL
  const { invoice_date, subtotal, description } = req.body;
  const errors = [];

  // Validaciones básicas
  if (Number.isNaN(provider_id) || !invoice_date || subtotal === undefined) {
    return responses.BadRequest(res, 'Faltan campos obligatorios.');
  }

  // Validaciones de formato
  if (validators.formatNumberInvalid(provider_id)) {
    errors.push('ID de proveedor inválido.');
  }
  if (validators.formatDateInvalid(invoice_date)) {
    errors.push('Fecha de factura inválida.');
  }

  // Validaciones numéricas
  if (typeof subtotal !== 'number' || subtotal < 0) {
    errors.push('Subtotal inválido.');
  }

  // Validación opcional de descripción libre
  if (description) {
    if (typeof description !== 'string' || description.trim() === '') {
      errors.push('La descripción debe ser texto válido y no vacía.');
    }
    if (description.length > 255) {
      errors.push('La descripción no puede superar los 255 caracteres.');
    }
    if (validators.formatDescriptionInvalid(description)) {
      errors.push('La descripción solo puede contener letras, números, espacios, puntos, comas y paréntesis.');
    }
  }

  if (errors.length > 0) {
    return responses.ParametersInvalid(res, errors);
  }

  // Inyectar provider_id en el body para el controller
  req.body.provider_id = provider_id;
  next();
};

// 🔹 Validar cambio de estado de factura
const validateStatusUpdate = (req, res, next) => {
  const { status } = req.body;
  const validStatuses = ['pendiente', 'pagado', 'cancelado'];

  if (!status || typeof status !== 'string') {
    return responses.BadRequest(res, 'Campo "status" requerido y debe ser texto.');
  }

  if (!validStatuses.includes(status)) {
    return responses.BadRequest(res, `Estado inválido. Debe ser uno de: ${validStatuses.join(', ')}`);
  }

  next();
};

export default { validateCreate, validateStatusUpdate };
