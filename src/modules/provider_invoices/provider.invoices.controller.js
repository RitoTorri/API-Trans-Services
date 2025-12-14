import responses from '../../shared/utils/responses.js';
import ProviderInvoicesService from './provider.invoices.service.js';

const service = new ProviderInvoicesService();

class ProviderInvoicesController {
  async create(req, res) {
    try {
      const body = {
        ...req.body,
        invoice_date: new Date(req.body.invoice_date)
      };
      const result = await service.create(body);
      return responses.ItemCreated(res, result);
    } catch (error) {
      if (error.message === 'Proveedor no encontrado.') {
        return responses.ItemNotFound(res, error.message);
      }
      return responses.ErrorInternal(res, error.message);
    }
  }

  async findAll(req, res) {
    try {
      const result = await service.findAll();
      return responses.QuerySuccess(res, result);
    } catch (error) {
      return responses.ErrorInternal(res, error.message);
    }
  }

  async findByProvider(req, res) {
    try {
      const provider_id = parseInt(req.params.provider_id);
      if (Number.isNaN(provider_id)) {
        return responses.BadRequest(res, 'ID de proveedor inválido.');
      }
      const result = await service.findByProvider(provider_id);
      return responses.QuerySuccess(res, result);
    } catch (error) {
      return responses.ErrorInternal(res, error.message);
    }
  }

  async findByDateRange(req, res) {
    try {
      const { start, end } = req.query;
      if (!start || !end) {
        return responses.BadRequest(res, 'Falta fecha de inicio o fin.');
      }
      const result = await service.findByDateRange(start, end);
      return responses.QuerySuccess(res, result);
    } catch (error) {
      return responses.ErrorInternal(res, error.message);
    }
  }

  async searchByControlNumber(req, res) {
    try {
      const { value } = req.params;
      if (!value || typeof value !== 'string') {
        return responses.BadRequest(res, 'Valor de búsqueda inválido.');
      }
      const result = await service.searchByControlNumber(value);
      return responses.QuerySuccess(res, result);
    } catch (error) {
      return responses.ErrorInternal(res, error.message);
    }
  }

  async updateStatus(req, res) {
    try {
      const id = Number(req.params.id);
      const { status } = req.body;

      if (Number.isNaN(id)) {
        return responses.BadRequest(res, 'ID de factura inválido.');
      }
      if (!status || typeof status !== 'string') {
        return responses.BadRequest(res, 'Campo "status" requerido y debe ser texto.');
      }

      // 🔹 Validar que el status sea uno de los permitidos
      const validStatuses = ['pendiente', 'pagado', 'cancelado'];
      if (!validStatuses.includes(status)) {
        return responses.BadRequest(res, `Estado inválido. Debe ser uno de: ${validStatuses.join(', ')}`);
      }

      const result = await service.updateStatus(id, status);
      return responses.QuerySuccess(res, result);
    } catch (error) {
      if (
        error.message === 'Factura no encontrada.' ||
        error.message === 'Transición inválida: pendiente solo puede pasar a pagado o cancelado.' ||
        error.message.startsWith('No se puede modificar una factura')
      ) {
        return responses.ItemNotFound(res, error.message);
      }
      return responses.ErrorInternal(res, error.message);
    }
  }

  async findByStatus(req, res) {
  try {
    const { status } = req.params;
    const result = await service.findByStatus(status);
    return responses.QuerySuccess(res, result);
  } catch (error) {
    if (error.message.startsWith('Estado inválido')) {
      return responses.BadRequest(res, error.message);
    }
    return responses.ErrorInternal(res, error.message);
  }
}


  async findInvoiceFull(req, res) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return responses.BadRequest(res, 'ID de factura inválido.');
      }

      const result = await service.findInvoiceFull(id);
      if (!result) {
        return responses.ItemNotFound(res, 'Factura no encontrada.');
      }

      return responses.QuerySuccess(res, result);
    } catch (error) {
      return responses.ErrorInternal(res, error.message);
    }
  }
}

export default ProviderInvoicesController;
