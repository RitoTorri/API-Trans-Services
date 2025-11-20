import responses from '../../shared/utils/responses.js';
import ProviderService from './provider.service.js';
const service = new ProviderService();

class ProviderController {
  // Crear proveedor
  async create(req, res) {
    try {
      const result = await service.create(req.body);
      return responses.ItemCreated(res, result);
    } catch (error) {
      if (error.message === 'Provider already exists.') {
        return responses.ResConflict(res, error.message);
      }
      return responses.ErrorInternal(res, error.message);
    }
  }

  // Listar todos los proveedores activos
  async findAll(req, res) {
    try {
      const result = await service.findAll();
      return responses.QuerySuccess(res, result);
    } catch (error) {
      return responses.ErrorInternal(res, error.message);
    }
  }

  // Actualizar proveedor
  async update(req, res) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return responses.BadRequest(res, 'Invalid provider ID.');

      const result = await service.update(id, req.body);
      return responses.QuerySuccess(res, result);
    } catch (error) {
      if (error.message === 'Provider not found.') {
        return responses.ItemNotFound(res, error.message);
      }
      if (error.message === 'RIF already exists.') {
        return responses.ResConflict(res, error.message);
      }
      return responses.ErrorInternal(res, error.message);
    }
  }

  // Eliminar proveedor (soft delete)
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

  // Listar proveedores eliminados
  async findDeleted(req, res) {
    try {
      const result = await service.findDeleted();
      return responses.QuerySuccess(res, result);
    } catch (error) {
      return responses.ErrorInternal(res, error.message);
    }
  }

  // Restaurar proveedor eliminado
  async restore(req, res) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return responses.BadRequest(res, 'Invalid provider ID.');

      const { rif } = req.body;
      if (!rif) return responses.BadRequest(res, 'Missing RIF for restoration.');

      const result = await service.restore(id, rif);
      return responses.QuerySuccess(res, result);
    } catch (error) {
      if (error.message === 'Provider is not marked as deleted.') {
        return responses.ItemNotFound(res, error.message);
      }
      if (error.message === 'RIF already exists.') {
        return responses.ResConflict(res, error.message);
      }
      return responses.ErrorInternal(res, error.message);
    }
  }

  // Buscar proveedores por nombre
  async findByName(req, res) {
    try {
      const name = req.params.name;
      const result = await service.findByName(name);
      return responses.QuerySuccess(res, result);
    } catch (error) {
      return responses.ErrorInternal(res, error.message);
    }
  }

  // 📌 Agregar contacto
  async addContact(req, res) {
    try {
      const providerId = Number(req.params.id);
      const { contact_info } = req.body;
      const result = await service.addContact(providerId, contact_info);
      return responses.ItemCreated(res, result);
    } catch (error) {
      if (error.message === 'Provider not found.') {
        return responses.ItemNotFound(res, error.message);
      }
      return responses.ErrorInternal(res, error.message);
    }
  }

  // 📌 Actualizar contacto
  async updateContact(req, res) {
    try {
      const providerId = Number(req.params.id);
      const contactId = Number(req.params.contact_id);
      const { contact_info } = req.body;
      const result = await service.updateContact(providerId, contactId, contact_info);
      return responses.QuerySuccess(res, result);
    } catch (error) {
      if (error.message === 'Provider not found.') {
        return responses.ItemNotFound(res, error.message);
      }
      return responses.ErrorInternal(res, error.message);
    }
  }

  // 📌 Eliminar contacto
  async deleteContact(req, res) {
    try {
      const providerId = Number(req.params.id);
      const contactId = Number(req.params.contact_id);
      const result = await service.deleteContact(providerId, contactId);
      return responses.QuerySuccess(res, result);
    } catch (error) {
      if (error.message === 'Provider not found.') {
        return responses.ItemNotFound(res, error.message);
      }
      return responses.ErrorInternal(res, error.message);
    }
  }

  // 📌 Listar contactos
  async listContacts(req, res) {
    try {
      const providerId = Number(req.params.id);
      const result = await service.listContacts(providerId);
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
