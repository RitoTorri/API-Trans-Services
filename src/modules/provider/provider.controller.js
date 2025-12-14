import responses from '../../shared/utils/responses.js';
import ProviderService from './provider.service.js';
const service = new ProviderService();

class ProviderController {

  async create(req, res) {
    try {
      const { contacts, ...providerData } = req.body;
      const result = await service.create(providerData, contacts || []);
      return responses.ItemCreated(res, result);
    } catch (error) {
      // 🔹 RIF duplicado
      if (error.message === 'RIF already exists.') {
      return responses.ResConflict(res, error.message);
    }

      // 🔹 Contacto duplicado (Prisma lanza Unique constraint failed)
      if (
        error.message.includes('Unique constraint failed on the fields: (`contact_info`)') ||
        error.message.includes('Contact info')
      ) {
        return responses.ResConflict(res, 'Contact info already exists in another provider.');
      }
      // 🔹 Otros errores internos
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

  async findByName(req, res) {
    try {
      const result = await service.findByName(req.params.name);
      return responses.QuerySuccess(res, result);
    } catch (error) {
      return responses.ErrorInternal(res, error.message);
    }
  }

  async findInactiveByName(req, res) {
    try {
      const result = await service.findInactiveByName(req.params.name);
      return responses.QuerySuccess(res, result);
    } catch (error) {
      return responses.ErrorInternal(res, error.message);
    }
  }

  async update(req, res) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return responses.BadRequest(res, 'Invalid provider ID.');

    const { name, rif, contacts, contactsToDelete } = req.body;
    let provider = { id };
    if (name) provider.name = name;
    if (rif) provider.rif = rif;

    const result = await service.update(provider, contacts || [], contactsToDelete || []);
    return responses.QuerySuccess(res, result);
  } catch (error) {
    // 🔹 Proveedor no encontrado
    if (error.message === 'Provider not found.') {
      return responses.ItemNotFound(res, error.message);
    }
    // 🔹 RIF duplicado
    if (error.message === 'RIF already exists.') {
    return responses.ResConflict(res, error.message);
  }


    // 🔹 Contacto duplicado
    if (
      error.message.includes('Unique constraint failed on the fields: (`contact_info`)') ||
      error.message.includes('Contact info')
    ) {
      return responses.ResConflict(res, 'Contact info already exists in another provider.');
    }
    // 🔹 Contacto inexistente
    if (error.message.includes('Contact with id')) {
      return responses.ItemNotFound(res, error.message);
    }
    // 🔹 Otros errores internos
    return responses.ErrorInternal(res, error.message);
  }
}


  async delete(req, res) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return responses.BadRequest(res, 'Invalid provider ID.');

      const result = await service.delete(id);
      return responses.QuerySuccess(res, result);
    } catch (error) {
      if (error.message === 'Provider not found.') {
        return responses.ItemNotFound(res, error.message);
      }
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
      const id = Number(req.params.id);
      if (isNaN(id)) return responses.BadRequest(res, 'Invalid provider ID.');

      const result = await service.restore(id);
      return responses.QuerySuccess(res, result);
    } catch (error) {
      if (error.message === 'Provider not found.') {
        return responses.ItemNotFound(res, error.message);
      }
      return responses.ErrorInternal(res, error.message);
    }
  }
}

export default ProviderController;
