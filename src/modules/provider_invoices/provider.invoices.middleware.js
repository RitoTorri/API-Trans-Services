import responses from '../../shared/utils/responses.js';
import validators from '../../shared/utils/format.data.js';

const validateCreate = (req, res, next) => {
  const provider_id = Number(req.params.provider_id); // ✅ viene de la URL
  const { control_number, invoice_number, invoice_date, subtotal, taxes } = req.body;
  let errors = [];

  // Validaciones básicas
  if (!provider_id || !control_number || !invoice_number || !invoice_date || subtotal === undefined || !Array.isArray(taxes)) {
    return responses.BadRequest(res, 'Missing required fields or taxes must be an array.');
  }

  // Validaciones de formato
  if (validators.formatNumberInvalid(provider_id)) errors.push('Invalid provider_id.');
  if (validators.formatTextInvalid(control_number)) errors.push('Invalid control_number.');
  if (validators.formatTextInvalid(invoice_number)) errors.push('Invalid invoice_number.');
  if (validators.formatDateInvalid(invoice_date)) errors.push('Invalid invoice_date.');

  // Validaciones numéricas
  if (typeof subtotal !== 'number' || subtotal < 0) errors.push('Invalid subtotal.');

  // Validar impuestos detallados
  taxes.forEach((tax, index) => {
    if (!tax.code || !tax.name || tax.percentage === undefined) {
      errors.push(`Tax at index ${index} is missing required fields.`);
    }
    if (validators.formatTextInvalid(tax.code)) errors.push(`Invalid tax code at index ${index}.`);
    if (validators.formatTextInvalid(tax.name)) errors.push(`Invalid tax name at index ${index}.`);
    if (typeof tax.percentage !== 'number' || tax.percentage < 0) {
      errors.push(`Invalid tax percentage at index ${index}.`);
    }
  });

  if (errors.length > 0) return responses.ParametersInvalid(res, errors);

  // Inyectar provider_id en el body para el controller
  req.body.provider_id = provider_id;
  next();
};

const validateDelete = (req, res, next) => {
  const { id } = req.params;
  if (validators.formatNumberInvalid(id)) {
    return responses.BadRequest(res, 'Invalid invoice id.');
  }
  next();
};

export default { validateCreate, validateDelete };
