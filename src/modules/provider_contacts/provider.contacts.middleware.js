import responses from '../../shared/utils/responses.js';
import validators from '../../shared/utils/format.data.js';

// Validar creación de contacto
const validateCreate = (req, res, next) => {
  const { provider_id } = req.params;
  const { contact_info } = req.body;

  if (validators.formatNumberInvalid(provider_id)) {
    return responses.BadRequest(res, 'Invalid provider_id.');
  }

  if (!contact_info) {
    return responses.BadRequest(res, 'Missing contact_info.');
  }

  // Acepta email o número
  if (!validators.formatEmailInvalid(contact_info)) return next();
  if (!validators.formatNumberInvalid(contact_info)) return next();

  return responses.ParametersInvalid(res, ['Invalid contact_info format.']);
};

// Validar eliminación
const validateDelete = (req, res, next) => {
  const { contact_id } = req.params;
  if (validators.formatNumberInvalid(contact_id)) {
    return responses.BadRequest(res, 'Invalid contact_id.');
  }
  next();
};

export default { validateCreate, validateDelete };
