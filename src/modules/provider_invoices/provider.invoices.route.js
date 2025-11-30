import express from 'express';
import ProviderInvoicesController from './provider.invoices.controller.js';
import middleware from './provider.invoices.middleware.js';
import validateTokenAccess from '../../shared/middlewares/validate.token.middleware.js';
import authorization from '../../shared/middlewares/authorization.middleware.js';

const router = express.Router();
const controller = new ProviderInvoicesController();

// 📌 Crear factura + cálculo de subtotal, impuestos, total y gasto automático
router.post('/provider-invoice/:provider_id',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  middleware.validateCreate,
  (req, res) => controller.create(req, res)
);

// 📌 Listar todas las facturas activas
router.get('/provider-invoices',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  (req, res) => controller.findAll(req, res)
);

// 📌 Listar facturas por proveedor
router.get('/provider-invoices/provider/:provider_id',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  (req, res) => controller.findByProvider(req, res)
);

// 📌 Filtrar facturas por rango de fechas
router.get('/provider-invoices-range',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  (req, res) => controller.findByDateRange(req, res)
);

// 📌 Buscar por número fiscal o control
router.get('/provider-invoices/search/:value',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  (req, res) => controller.searchByNumber(req, res)
);

// 📌 Listar facturas eliminadas (soft deleted)
router.get('/provider-invoices-deleted',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  (req, res) => controller.findDeleted(req, res)
);

// 📌 Restaurar factura eliminada (solo por ID)
router.put('/provider-invoice/restore/:id',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  (req, res) => controller.restore(req, res)
);

// 📌 Soft delete: marcar factura como eliminada
router.delete('/provider-invoice/:id',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  middleware.validateDelete,
  (req, res) => controller.delete(req, res)
);

// 📌 Consultar factura completa con gasto automático (incluye desglose)
router.get('/provider-invoices/:id/full',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  async (req, res) => {
    try {
      await controller.findInvoiceFull(req, res);
    } catch (error) {
      return res.status(500).json({
        success: false,
        code: 'ERROR_INTERNAL',
        message: error.message
      });
    }
  }
);

export default router;
