import ProviderContactsModel from './provider.contacts.model.js';
import ProviderModel from '../provider/provider.model.js';

const model = new ProviderContactsModel();
const providerModel = new ProviderModel();

class ProviderContactsService {
  // Crear contacto validando duplicados y proveedor existente
  async create(data) {
    const exist = await model.findByContactInfo(data.contact_info, data.provider_id);
    if (exist) throw new Error('Contact info already exists.');

    const provider = await providerModel.findById(data.provider_id);
    if (!provider) throw new Error('Provider not found.');

    return await model.create(data);
  }

  // Eliminar contacto por ID
  async delete(id) {
    const contact = await model.findById(id);
    if (!contact) throw new Error('Contact not found.');

    return await model.delete(id);
  }

  // Listar contactos por proveedor
  async findByProvider(provider_id) {
    return await model.findByProviderId(provider_id);
  }
}

export default ProviderContactsService;
