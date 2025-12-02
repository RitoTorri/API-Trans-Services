import responses from '../../shared/utils/responses.js';
import validators from '../../shared/utils/format.data.js';

const validateProvider = (req, res, next) => {
  const { name, rif, contacts } = req.body;
  let errors = [];

  // Campos obligatorios
  if (!name || !rif) {
    return responses.BadRequest(res, 'Missing required fields.');
  }

  // Validaciones de formato
  if (validators.formatNamesInvalid(name)) errors.push('Invalid name.');
  if (validators.formatRifInvalid(rif)) errors.push('Invalid RIF.');

  // Validaciones de longitud según schema
  if (name && name.length > 30) errors.push('Name must be 30 characters or less.');
  if (rif && rif.length > 30) errors.push('RIF must be 30 characters or less.');

  // Validar contactos si vienen
  if (contacts && Array.isArray(contacts)) {
    contacts.forEach(c => {
      if (!c.contact_info || typeof c.contact_info !== 'string') {
        errors.push('Contact info is required and must be a string.');
      } else if (c.contact_info.length > 100) {
        errors.push('Contact info must be 100 characters or less.');
      }
    });
  }

  if (errors.length > 0) return responses.ParametersInvalid(res, errors);
  next();
};

const validateProviderUpdate = (req, res, next) => {
  const { name, rif, contacts, contactsToDelete } = req.body;
  let errors = [];

  // Al menos un campo debe venir
  if (!name && !rif && !contacts && !contactsToDelete) {
    return responses.BadRequest(res, 'You must send at least one field.');
  }

  // Validaciones de formato
  if (name && validators.formatNamesInvalid(name)) errors.push('Invalid name.');
  if (rif && validators.formatRifInvalid(rif)) errors.push('Invalid RIF.');

  // Validaciones de longitud según schema
  if (name && name.length > 30) errors.push('Name must be 30 characters or less.');
  if (rif && rif.length > 30) errors.push('RIF must be 30 characters or less.');

  // Validar contactos si vienen
  if (contacts && Array.isArray(contacts)) {
    contacts.forEach(c => {
      if (!c.contact_info || typeof c.contact_info !== 'string') {
        errors.push('Contact info is required and must be a string.');
      } else if (c.contact_info.length > 100) {
        errors.push('Contact info must be 100 characters or less.');
      }
    });
  }

  // Validar contactos a eliminar
  if (contactsToDelete && !Array.isArray(contactsToDelete)) {
    errors.push('contactsToDelete must be an array of IDs.');
  }

  if (errors.length > 0) return responses.ParametersInvalid(res, errors);
  next();
};

export default { validateProvider, validateProviderUpdate };
