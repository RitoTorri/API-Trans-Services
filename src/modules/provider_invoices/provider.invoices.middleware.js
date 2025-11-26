import responses from '../../shared/utils/responses.js';
import validators from '../../shared/utils/format.data.js';

const validateCreate = (req, res, next) => {
  const provider_id = Number(req.params.provider_id); // ✅ viene de la URL
  const { control_number, invoice_number, invoice_date, total_amount, purchase, retentions } = req.body;
  let errors = [];

  // Validaciones básicas
  if (!provider_id || !control_number || !invoice_number || !invoice_date || total_amount === undefined) {
    return responses.BadRequest(res, 'Missing required fields.');
  }

  if (validators.formatNumberInvalid(provider_id)) errors.push('Invalid provider_id.');
  if (validators.formatTextInvalid(control_number)) errors.push('Invalid control_number.');
  if (validators.formatTextInvalid(invoice_number)) errors.push('Invalid invoice_number.');
  if (validators.formatDateInvalid(invoice_date)) errors.push('Invalid invoice_date.');
  if (typeof total_amount !== 'number' || total_amount < 0) errors.push('Invalid total_amount.');

  // Validar bloque purchase
  if (!purchase || !purchase.expense_type_id || !purchase.purchase_date || !purchase.description) {
    errors.push('Missing purchase details: expense_type_id, purchase_date, description.');
  } else {
    if (validators.formatNumberInvalid(purchase.expense_type_id)) errors.push('Invalid expense_type_id.');
    if (validators.formatDateInvalid(purchase.purchase_date)) errors.push('Invalid purchase_date.');
    if (validators.formatTextInvalid(purchase.description)) errors.push('Invalid purchase description.');
    if (purchase.exempt_amount !== undefined && (typeof purchase.exempt_amount !== 'number' || purchase.exempt_amount < 0)) {
      errors.push('Invalid exempt_amount.');
    }
  }

  // Validar retentions si vienen
  if (retentions && Array.isArray(retentions)) {
    for (const r of retentions) {
      if (!r.retention_code || validators.formatTextInvalid(r.retention_code)) {
        errors.push('Invalid retention_code.');
      }
      if (typeof r.rate_retention !== 'number' || r.rate_retention < 0) {
        errors.push('Invalid rate_retention.');
      }
      if (r.base_amount !== undefined && (typeof r.base_amount !== 'number' || r.base_amount < 0)) {
        errors.push('Invalid base_amount in retention.');
      }
    }
  }

  if (errors.length > 0) return responses.ParametersInvalid(res, errors);

  req.body.provider_id = provider_id; // ✅ lo inyectas para el controller
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
