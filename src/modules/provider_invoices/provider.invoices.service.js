import ProviderInvoicesModel from './provider.invoices.model.js';
import ProviderModel from '../provider/provider.model.js';

const model = new ProviderInvoicesModel();
const providerModel = new ProviderModel();

class ProviderInvoicesService {
  async create(data) {
    const provider = await providerModel.findById(data.provider_id);
    if (!provider) throw new Error('Provider not found.');
    return await model.create(data);
  }

  async findAll() {
    return await model.findAll();
  }

  async findByProvider(provider_id) {
    return await model.findByProviderId(provider_id);
  }

  async findByDateRange(start, end) {
    return await model.findByDateRange(start, end);
  }

  async searchByNumber(value) {
    return await model.findByInvoiceOrControlNumber(value);
  }

  // Obtener facturas eliminadas
async findDeleted() {
  return await model.findDeleted();
}

async restore(id, newControlNumber) {
  const invoice = await model.findById(id);
  if (!invoice) throw new Error('Invoice not found.');
  if (!invoice.control_number.startsWith('deleted_')) {
    throw new Error('Invoice is not marked as deleted.');
  }

  const duplicate = await model.existsControlNumber(newControlNumber);
  if (duplicate) throw new Error('Control number already exists.');

  return await model.restore(id, newControlNumber);
}

  async delete(id) {
    const invoice = await model.findById(id);
    if (!invoice) throw new Error('Invoice not found.');
    return await model.softDelete(id);
  }
}

export default ProviderInvoicesService;
