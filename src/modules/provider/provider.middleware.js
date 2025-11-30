import responses from '../../shared/utils/responses.js';
import validators from '../../shared/utils/format.data.js';

const validateProvider = (req, res, next) => {
  const { name, rif, contacts } = req.body;
  let errors = [];

  if (!name || !rif) {
    return responses.BadRequest(res, 'Missing required fields.');
  }

  if (validators.formatNamesInvalid(name)) errors.push('Invalid name.');
  if (validators.formatRifInvalid(rif)) errors.push('Invalid RIF.');

  // Validar contactos si vienen
  if (contacts && Array.isArray(contacts)) {
    contacts.forEach(c => {
      if (!c.contact_info) errors.push('Contact info is required.');
    });
  }

  if (errors.length > 0) return responses.ParametersInvalid(res, errors);
  next();
};

const validateProviderUpdate = (req, res, next) => {
  const { name, rif, contacts } = req.body;
  let errors = [];

  if (!name && !rif && !contacts) {
    return responses.BadRequest(res, 'You must send at least one field.');
  }

  if (name && validators.formatNamesInvalid(name)) errors.push('Invalid name.');
  if (rif && validators.formatRifInvalid(rif)) errors.push('Invalid RIF.');

  if (contacts && Array.isArray(contacts)) {
    contacts.forEach(c => {
      if (!c.contact_info) errors.push('Contact info is required.');
    });
  }

  if (errors.length > 0) return responses.ParametersInvalid(res, errors);
  next();
};

export default { validateProvider, validateProviderUpdate };
