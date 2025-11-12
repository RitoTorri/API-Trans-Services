import responses from '../../shared/utils/responses.js';
import validators from '../../shared/utils/format.data.js';

const validateCreate = (req, res, next) => {
  const provider_id = Number(req.params.provider_id); // ✅ viene de la URL
  const { control_number, invoice_number, invoice_date, total_amount } = req.body;
  let errors = [];

  if (!provider_id || !control_number || !invoice_number || !invoice_date || total_amount === undefined) {
    return responses.BadRequest(res, 'Missing required fields.');
  }

  if (validators.formatNumberInvalid(provider_id)) errors.push('Invalid provider_id.');
  if (validators.formatTextInvalid(control_number)) errors.push('Invalid control_number.');
  if (validators.formatTextInvalid(invoice_number)) errors.push('Invalid invoice_number.');
  if (validators.formatDateInvalid(invoice_date)) errors.push('Invalid invoice_date.');
  if (typeof total_amount !== 'number' || total_amount < 0) errors.push('Invalid total_amount.');

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
