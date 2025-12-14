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

// 📌 Listar todas las facturas
router.get('/provider-invoices',
  validateTokenAccess,
  authorization(['Invitado', 'Administrador', 'SuperUsuario']),
  (req, res) => controller.findAll(req, res)
);

// 📌 Listar facturas por proveedor
router.get('/provider-invoices/provider/:provider_id',
  validateTokenAccess,
  authorization(['Invitado', 'Administrador', 'SuperUsuario']),
  (req, res) => controller.findByProvider(req, res)
);

// 📌 Filtrar facturas por rango de fechas
router.get('/provider-invoices-range',
  validateTokenAccess,
  authorization(['Invitado', 'Administrador', 'SuperUsuario']),
  (req, res) => controller.findByDateRange(req, res)
);

// 📌 Buscar por número de control
router.get('/provider-invoices/search/:value',
  validateTokenAccess,
  authorization(['Invitado', 'Administrador', 'SuperUsuario']),
  (req, res) => controller.searchByControlNumber(req, res)
);

// 📌 Cambiar estado de factura (pendiente → pagado o cancelado)
router.patch('/provider-invoice/:id/status',
  validateTokenAccess,
  authorization(['Administrador', 'SuperUsuario']),
  middleware.validateStatusUpdate,
  (req, res) => controller.updateStatus(req, res)
);

// 📌 Filtrar facturas por estado
router.get('/provider-invoices/status/:status',
  validateTokenAccess,
  authorization(['Invitado', 'Administrador', 'SuperUsuario']),
  (req, res) => controller.findByStatus(req, res)
);


// 📌 Consultar factura completa con impuestos y gasto automático
router.get('/provider-invoices/:id/full',
  validateTokenAccess,
  authorization(['Invitado', 'Administrador', 'SuperUsuario']),
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
