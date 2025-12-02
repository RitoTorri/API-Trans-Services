import ProviderModel from './provider.model.js';
const providerModel = new ProviderModel();

class ProviderService {
  async create(data, contacts = []) {
    const exist = await providerModel.findByRif(data.rif);
    if (exist) throw new Error('Provider already exists.');
    return await providerModel.createWithContacts({ ...data, contacts });
  }

  async findAll() {
    return await providerModel.findAll();
  }

  async findById(id) {
    return await providerModel.findById(id);
  }

  async findByName(name) {
    return await providerModel.findByName(name);
  }

  async findInactiveByName(name) {
    return await providerModel.findInactiveByName(name);
  }

  async update(provider, contacts = [], contactsToDelete = []) {
    const exist = await providerModel.findById(provider.id);
    if (!exist) throw new Error('Provider not found.');

    if (provider.rif) {
      const existRif = await providerModel.findByRif(provider.rif);
      if (existRif && existRif.id !== provider.id) {
        throw new Error('Provider with this rif already exists.');
      }
    }

    const idProvider = provider.id;
    delete provider.id;

    try {
      return await providerModel.updateProvider(provider, idProvider, contacts, contactsToDelete);
    } catch (error) {
      if (error.message.includes('Contact with id')) {
        throw new Error(error.message); // mensaje claro para el controller
      }
      throw error;
    }
  }

  async delete(id) {
    const exist = await providerModel.findById(id);
    if (!exist) throw new Error('Provider not found.');
    return await providerModel.softDelete(id);
  }

  async findDeleted() {
    return await providerModel.findDeleted();
  }

  async restore(id) {
    const provider = await providerModel.findById(id);
    if (!provider || provider.is_active) {
      throw new Error('Provider not found.');
    }
    return await providerModel.restore(id);
  }
}

export default ProviderService;
