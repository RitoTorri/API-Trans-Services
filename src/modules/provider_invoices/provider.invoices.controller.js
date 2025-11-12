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
      if (error.message === 'Provider not found.') {
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
        return responses.BadRequest(res, 'Missing start or end date.');
      }
      const result = await service.findByDateRange(start, end);
      return responses.QuerySuccess(res, result);
    } catch (error) {
      return responses.ErrorInternal(res, error.message);
    }
  }

  async searchByNumber(req, res) {
    try {
      const { value } = req.params;
      const result = await service.searchByNumber(value);
      return responses.QuerySuccess(res, result);
    } catch (error) {
      return responses.ErrorInternal(res, error.message);
    }
  }

  // Listar facturas eliminadas
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
    const { control_number } = req.body;

    if (!control_number) {
      return responses.BadRequest(res, 'Missing control_number for restoration.');
    }

    const result = await service.restore(id, control_number);
    return responses.QuerySuccess(res, result);
  } catch (error) {
    if (
      error.message === 'Invoice not found.' ||
      error.message === 'Invoice is not marked as deleted.'
    ) {
      return responses.ItemNotFound(res, error.message);
    }

    if (error.message === 'Control number already exists.') {
      return responses.BadRequest(res, error.message);
    }

    return responses.ErrorInternal(res, error.message);
  }
}

  async delete(req, res) {
    try {
      const result = await service.delete(parseInt(req.params.id));
      return responses.QuerySuccess(res, result);
    } catch (error) {
      if (error.message === 'Invoice not found.') {
        return responses.ItemNotFound(res, error.message);
      }
      return responses.ErrorInternal(res, error.message);
    }
  }
}

export default ProviderInvoicesController;
