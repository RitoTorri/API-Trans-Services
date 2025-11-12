import express from 'express';
import ProviderContactsController from './provider.contacts.controller.js';
import middleware from './provider.contacts.middleware.js';
import validateTokenAccess from '../../shared/middlewares/validate.token.middleware.js';
import authorization from '../../shared/middlewares/authorization.middleware.js';

const router = express.Router();
const controller = new ProviderContactsController();

// Crear contacto
router.post('/provider-contact/:provider_id',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUser']),
  middleware.validateCreate,
  controller.create
);

// Eliminar contacto
router.delete('/provider-contact/:contact_id',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUser']),
  middleware.validateDelete,
  controller.delete
);

// Listar contactos por proveedor
router.get('/provider-contact/:provider_id',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUser']),
  controller.findByProvider
);

export default router;
