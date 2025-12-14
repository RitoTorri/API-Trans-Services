import ProviderModel from './provider.model.js';
const providerModel = new ProviderModel();

class ProviderService {
  async create(data, contacts = []) {
    const exist = await providerModel.findByRif(data.rif);
    if (exist) throw new Error('RIF already exists.');
    try {
      return await providerModel.createWithContacts({ ...data, contacts });
    } catch (error) {
      // 🔹 Captura de error por contacto duplicado
      if (
        error.message.includes('Unique constraint failed on the fields: (`contact_info`)') ||
        error.message.includes('Contact info')
      ) {
        throw new Error('Contact info already exists in another provider.');
      }
      throw error;
    }
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
    // 🔹 Validar existencia del proveedor
    const exist = await providerModel.findById(provider.id);
    if (!exist) throw new Error('Provider not found.');

    // 🔹 Validar RIF único
    if (provider.rif) {
      const existRif = await providerModel.findByRif(provider.rif);
      if (existRif && existRif.id !== provider.id) {
        throw new Error('RIF already exists.');
      }
    }

    // 🔹 Validar contactos únicos
    for (const contact of contacts) {
      if (contact.contact_info) {
        const existContact = await providerModel.findContactByInfo(contact.contact_info);
        if (existContact && existContact.provider_id !== provider.id) {
          throw new Error(`Contact info "${contact.contact_info}" already exists in another provider.`);
        }
      }
    }

    const idProvider = provider.id;
    delete provider.id;

    try {
      return await providerModel.updateProvider(provider, idProvider, contacts, contactsToDelete);
    } catch (error) {
      // 🔹 Contacto inexistente
      if (error.message.includes('Contact with id')) {
        throw new Error(error.message);
      }
      // 🔹 Contacto duplicado (por constraint de Prisma)
      if (
        error.message.includes('Unique constraint failed on the fields: (`contact_info`)') ||
        error.message.includes('Contact info')
      ) {
        throw new Error('Contact info already exists in another provider.');
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
