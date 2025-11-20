import express from 'express';
import ProviderController from './provider.controller.js';
import middleware from './provider.middleware.js';
import validateTokenAccess from '../../shared/middlewares/validate.token.middleware.js';
import authorization from '../../shared/middlewares/authorization.middleware.js';

const router = express.Router();
const controller = new ProviderController();

// 📌 Crear proveedor
router.post('/provider',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  middleware.validateProvider,
  controller.create
);

// 📌 Listar proveedores activos
router.get('/providers',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  controller.findAll
);

// 📌 Buscar proveedores por nombre
router.get('/provider/search/:name',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  controller.findByName
);

// 📌 Actualizar proveedor
router.patch('/provider/:id',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  middleware.validateProviderUpdate,
  controller.update
);

// 📌 Eliminar proveedor (soft delete)
router.delete('/provider/:id',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  controller.delete
);

// 📌 Listar proveedores eliminados
router.get('/providers-deleted',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  controller.findDeleted
);

// 📌 Restaurar proveedor eliminado
router.put('/provider/restore/:id',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  controller.restore
);
// 📌 Agregar contacto
router.post('/provider/:id/contacts',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  (req, res) => controller.addContact(req, res)
);

// 📌 Actualizar contacto
router.patch('/provider/:id/contacts/:contact_id',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  (req, res) => controller.updateContact(req, res)
);

// 📌 Eliminar contacto
router.delete('/provider/:id/contacts/:contact_id',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  (req, res) => controller.deleteContact(req, res)
);

// 📌 Listar contactos
router.get('/provider/:id/contacts',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  (req, res) => controller.listContacts(req, res)
);

export default router;
