import responses from '../../shared/utils/responses.js';
import validators from '../../shared/utils/format.data.js';

const validateCreate = (req, res, next) => {
  const provider_id = Number(req.params.provider_id); // ✅ viene de la URL
  const { invoice_date, subtotal } = req.body;
  let errors = [];

  // 🔹 Validaciones básicas
  if (
    Number.isNaN(provider_id) ||
    !invoice_date ||
    subtotal === undefined
  ) {
    return responses.BadRequest(res, 'Faltan campos obligatorios.');
  }

  // 🔹 Validaciones de formato
  if (validators.formatNumberInvalid(provider_id)) errors.push('ID de proveedor inválido.');
  if (validators.formatDateInvalid(invoice_date)) errors.push('Fecha de factura inválida.');

  // 🔹 Validaciones numéricas
  if (typeof subtotal !== 'number' || subtotal < 0) errors.push('Subtotal inválido.');

  if (errors.length > 0) return responses.ParametersInvalid(res, errors);

  // 🔹 Inyectar provider_id en el body para el controller
  req.body.provider_id = provider_id;
  next();
};

const validateDelete = (req, res, next) => {
  const { id } = req.params;
  if (validators.formatNumberInvalid(id)) {
    return responses.BadRequest(res, 'ID de factura inválido.');
  }
  next();
};

export default { validateCreate, validateDelete };
