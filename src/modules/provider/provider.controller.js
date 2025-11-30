import responses from '../../shared/utils/responses.js';
import ProviderService from './provider.service.js';
const service = new ProviderService();

class ProviderController {
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
      const name = req.params.name;
      const result = await service.findByName(name);
      return responses.QuerySuccess(res, result);
    } catch (error) {
      return responses.ErrorInternal(res, error.message);
    }
  }

  async findInactiveByName(req, res) {
    try {
      const name = req.params.name;
      const result = await service.findInactiveByName(name);
      return responses.QuerySuccess(res, result);
    } catch (error) {
      return responses.ErrorInternal(res, error.message);
    }
  }

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
      if (error.message === 'Provider is not marked as deleted.') {
        return responses.ItemNotFound(res, error.message);
      }
      return responses.ErrorInternal(res, error.message);
    }
  }
}

export default ProviderController;
