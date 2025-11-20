import ProviderModel from './provider.model.js';
const providerModel = new ProviderModel();

class ProviderService {
  async create(data) {
    const exist = await providerModel.findByRif(data.rif);
    if (exist) throw new Error('Provider already exists.');
    return await providerModel.createWithContacts(data);
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

  async update(id, data) {
    const exist = await providerModel.findById(id);
    if (!exist) throw new Error('Provider not found.');

    if (data.rif) {
      const existRif = await providerModel.findByRif(data.rif);
      if (existRif && existRif.id !== id) throw new Error('RIF already exists.');
    }

    return await providerModel.update(id, data);
  }

  async delete(id) {
    const exist = await providerModel.findById(id);
    if (!exist) throw new Error('Provider not found.');
    return await providerModel.softDelete(id);
  }

  async findDeleted() {
    return await providerModel.findDeleted();
  }

  async restore(id, rif) {
    const provider = await providerModel.findByRif(rif);
    if (!provider || provider.id !== id || provider.is_active) {
      throw new Error('Provider is not marked as deleted.');
    }

    const duplicate = await providerModel.existsActiveRif(rif);
    if (duplicate) throw new Error('RIF already exists.');

    return await providerModel.restore(id);
  }

  async addContact(providerId, contact_info) {
    const provider = await providerModel.findById(providerId);
    if (!provider) throw new Error('Provider not found.');
    return await providerModel.addContact(providerId, contact_info);
  }


  async updateContact(providerId, contactId, contact_info) {
    const provider = await providerModel.findById(providerId);
    if (!provider) throw new Error('Provider not found.');
    return await providerModel.updateContact(contactId, contact_info);
  }

  async deleteContact(providerId, contactId) {
    const provider = await providerModel.findById(providerId);
    if (!provider) throw new Error('Provider not found.');
    return await providerModel.deleteContact(contactId);
  }

  async listContacts(providerId) {
    const provider = await providerModel.findById(providerId);
    if (!provider) throw new Error('Provider not found.');
    return await providerModel.listContacts(providerId);
  }

}

export default ProviderService;
