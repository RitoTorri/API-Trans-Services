import express from 'express';
import ProviderController from './provider.controller.js';
import middleware from './provider.middleware.js';
import validateTokenAccess from '../../shared/middlewares/validate.token.middleware.js';
import authorization from '../../shared/middlewares/authorization.middleware.js';

const router = express.Router();
const controller = new ProviderController();

// 📌 Crear proveedor con contactos
router.post('/provider',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  middleware.validateProvider,
  (req, res) => controller.create(req, res)
);

// 📌 Listar proveedores activos
router.get('/providers',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  (req, res) => controller.findAll(req, res)
);

// 📌 Buscar proveedores activos por nombre
router.get('/provider/search/:name',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  (req, res) => controller.findByName(req, res)
);

// 📌 Buscar proveedores inactivos por nombre
router.get('/provider/inactive/search/:name',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  (req, res) => controller.findInactiveByName(req, res)
);

// 📌 Actualizar proveedor y contactos
router.patch('/provider/:id',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  middleware.validateProviderUpdate,
  (req, res) => controller.update(req, res)
);

// 📌 Eliminar proveedor (soft delete)
router.delete('/provider/:id',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  (req, res) => controller.delete(req, res)
);

// 📌 Listar proveedores eliminados
router.get('/providers-deleted',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  (req, res) => controller.findDeleted(req, res)
);

// 📌 Restaurar proveedor eliminado (solo con ID)
router.put('/provider/restore/:id',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  (req, res) => controller.restore(req, res)
);

export default router;
