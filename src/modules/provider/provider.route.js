import express from 'express';
import ProviderController from './provider.controller.js';
import ProviderService from './provider.service.js';
import middleware from './provider.middleware.js';
import validateTokenAccess from '../../shared/middlewares/validate.token.middleware.js';
import authorization from '../../shared/middlewares/authorization.middleware.js';
import responses from '../../shared/utils/responses.js';

const router = express.Router();
const controller = new ProviderController();
const service = new ProviderService();

// Crear proveedor
router.post('/provider',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  middleware.validateProvider,
  controller.create
);

// Listar proveedores activos
router.get('/providers',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  controller.findAll
);

// Buscar proveedores por nombre
router.get('/provider/search/:name',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  async (req, res) => {
    try {
      const name = req.params.name;
      const result = await service.findAll({ name: { startsWith: name } });
      return responses.QuerySuccess(res, result);
    } catch (error) {
      return responses.ErrorInternal(res, error.message);
    }
  }
);

// Actualizar proveedor
router.patch('/provider/:id',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  middleware.validateProviderUpdate,
  controller.update
);

// Eliminar proveedor (soft delete)
router.delete('/provider/:id',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  controller.delete
);

// Listar proveedores eliminados
router.get('/providers-deleted',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  controller.findDeleted
);


// Restaurar proveedor eliminado
router.put('/provider/restore/:id',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  async (req, res) => controller.restore(req, res)
);

export default router;