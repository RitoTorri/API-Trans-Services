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
      const result = await service.searchByControlNumber(value);
      return responses.QuerySuccess(res, result);
    } catch (error) {
      return responses.ErrorInternal(res, error.message);
    }
  }

  async findDeleted(req, res) {
    try {
      const result = await service.findDeleted();
      return responses.QuerySuccess(res, result);
    } catch (error) {
      return responses.ErrorInternal(res, error.message);
    }
  }

  async restore(req, res) {
    try {
      const id = parseInt(req.params.id);
      const result = await service.restore(id);
      return responses.QuerySuccess(res, result);
    } catch (error) {
      if (
        error.message === 'Factura no encontrada.' ||
        error.message === 'La factura no está marcada como eliminada.'
      ) {
        return responses.ItemNotFound(res, error.message);
      }
      return responses.ErrorInternal(res, error.message);
    }
  }

  async delete(req, res) {
    try {
      const result = await service.delete(parseInt(req.params.id));
      return responses.QuerySuccess(res, result);
    } catch (error) {
      if (error.message === 'Factura no encontrada.') {
        return responses.ItemNotFound(res, error.message);
      }
      return responses.ErrorInternal(res, error.message);
    }
  }

  async updateStatus(req, res) {
    try {
      const id = Number(req.params.id);
      const { status } = req.body;

      if (!status || typeof status !== 'string') {
        return responses.BadRequest(res, 'Campo "status" requerido y debe ser texto.');
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
