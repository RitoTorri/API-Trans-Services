import responses from '../../shared/utils/responses.js';
import ProviderContactsService from './provider.contacts.service.js';
const service = new ProviderContactsService();

class ProviderContactsController {
  // Crear contacto
  async create(req, res) {
    try {
      const data = {
        provider_id: parseInt(req.params.provider_id),
        contact_info: req.body.contact_info
      };
      const result = await service.create(data);
      return responses.ItemCreated(res, result);
    } catch (error) {
      if (error.message === 'Contact info already exists.') {
        return responses.ResConflict(res, error.message);
      }
      if (error.message === 'Provider not found.') {
        return responses.ItemNotFound(res, error.message);
      }
      return responses.ErrorInternal(res, error.message);
    }
  }

  // Eliminar contacto
  async delete(req, res) {
    try {
      const result = await service.delete(parseInt(req.params.contact_id));
      return responses.QuerySuccess(res, result);
    } catch (error) {
      if (error.message === 'Contact not found.') {
        return responses.ItemNotFound(res, error.message);
      }
      return responses.ErrorInternal(res, error.message);
    }
  }

  // Listar contactos por proveedor
  async findByProvider(req, res) {
    try {
      const provider_id = parseInt(req.params.provider_id);
      const result = await service.findByProvider(provider_id);
      return responses.QuerySuccess(res, result);
    } catch (error) {
      return responses.ErrorInternal(res, error.message);
    }
  }
}

export default ProviderContactsController;
