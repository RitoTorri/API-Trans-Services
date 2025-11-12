import responses from '../../shared/utils/responses.js';
import validators from '../../shared/utils/format.data.js';

const validateProvider = (req, res, next) => {
  const { name, rif, balance } = req.body;
  let errors = [];

  if (!name || !rif || balance === undefined) {
    return responses.BadRequest(res, 'Missing required fields.');
  }

  if (validators.formatNamesInvalid(name)) errors.push('Invalid name.');
  if (validators.formatRifInvalid(rif)) errors.push('Invalid RIF.');
  if (typeof balance !== 'number' || balance < 0) errors.push('Balance must be a positive number.');

  if (errors.length > 0) return responses.ParametersInvalid(res, errors);
  next();
};

const validateProviderUpdate = (req, res, next) => {
  const { name, rif, balance } = req.body;
  let errors = [];

  if (!name && !rif && balance === undefined) {
    return responses.BadRequest(res, 'You must send at least one field.');
  }

  if (name && validators.formatNamesInvalid(name)) errors.push('Invalid name.');
  if (rif && validators.formatRifInvalid(rif)) errors.push('Invalid RIF.');
  if (balance !== undefined && (typeof balance !== 'number' || balance < 0)) {
    errors.push('Balance must be a positive number.');
  }

  if (errors.length > 0) return responses.ParametersInvalid(res, errors);
  next();
};

export default { validateProvider, validateProviderUpdate };
