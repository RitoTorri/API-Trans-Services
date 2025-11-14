import express from 'express';
import ProviderInvoicesController from './provider.invoices.controller.js';
import middleware from './provider.invoices.middleware.js';
import validateTokenAccess from '../../shared/middlewares/validate.token.middleware.js';
import authorization from '../../shared/middlewares/authorization.middleware.js';

const router = express.Router();
const controller = new ProviderInvoicesController();

// 📌 Crear factura
router.post('/provider-invoice/:provider_id',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  middleware.validateCreate,
  controller.create
);

// 📌 Listar todas las facturas activas
router.get('/provider-invoices',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  controller.findAll
);

// 📌 Listar facturas por proveedor
router.get('/provider-invoices/:provider_id',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  controller.findByProvider
);

// 📌 Filtrar facturas por rango de fechas
router.get('/provider-invoices-range',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  controller.findByDateRange
);

// 📌 Buscar por número fiscal o control
router.get('/provider-invoices/search/:value',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  controller.searchByNumber
);

// 📌 Listar facturas eliminadas (soft deleted)
router.get('/provider-invoices-deleted',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  controller.findDeleted
);

// 📌 Restaurar factura eliminada (soft delete)
router.put('/provider-invoice/restore/:id',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  controller.restore
);


// 📌 Soft delete: marcar factura como eliminada
router.delete('/provider-invoice/:id',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  middleware.validateDelete,
  controller.delete
);

export default router;