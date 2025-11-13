import ProviderModel from './provider.model.js';
const model = new ProviderModel();

class ProviderService {
  // Crear proveedor si el RIF no existe
  async create(data) {
    const exist = await model.findByRif(data.rif);
    if (exist) throw new Error('Provider already exists.');
    return await model.create(data);
  }

  // Listar todos los proveedores activos
  async findAll() {
    return await model.findAll();
  }

  // Actualizar proveedor si existe y el nuevo RIF no está duplicado
  async update(id, data) {
    const exist = await model.findById(id);
    if (!exist) throw new Error('Provider not found.');

    if (data.rif) {
      const existRif = await model.findByRif(data.rif);
      if (existRif && existRif.id !== id) throw new Error('RIF already exists.');
    }

    return await model.update(id, data);
  }

  // Eliminar proveedor (soft delete)
  async delete(id) {
    const exist = await model.findById(id);
    if (!exist) throw new Error('Provider not found.');
    return await model.softDelete(id);
  }

  async findDeleted() {
  return await model.findDeleted();
}



  // Restaurar proveedor eliminado si el RIF no está duplicado
  async restore(id, rif) {
    const provider = await model.findByRif(rif);
    if (!provider || provider.id !== id || provider.is_active) {
      throw new Error('Provider is not marked as deleted.');
    }

    const duplicate = await model.existsActiveRif(rif);
    if (duplicate) throw new Error('RIF already exists.');

    return await model.restore(id);
  }
}

export default ProviderService;