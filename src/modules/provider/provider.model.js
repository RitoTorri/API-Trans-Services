import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class ProviderModel {
  // Crear nuevo proveedor
  async create(data) {
    return await prisma.providers.create({ data });
  }

  // Listar todos los proveedores activos
  async findAll() {
    return await prisma.providers.findMany({
      where: { is_active: true },
      orderBy: { created_at: 'desc' }
    });
  }

  // Buscar proveedor activo por ID
  async findById(id) {
    return await prisma.providers.findFirst({ where: { id, is_active: true } });
  }

  // Buscar proveedor por RIF (sin importar si está activo o no)
  async findByRif(rif) {
    return await prisma.providers.findFirst({ where: { rif } });
  }

  // Actualizar proveedor por ID
  async update(id, data) {
    return await prisma.providers.update({ where: { id }, data });
  }

  // Marcar proveedor como eliminado (soft delete)
  async softDelete(id) {
    return await prisma.providers.update({ where: { id }, data: { is_active: false } });
  }

  // Restaurar proveedor eliminado
  async restore(id) {
    return await prisma.providers.update({ where: { id }, data: { is_active: true } });
  }

  // Listar proveedores eliminados (inactivos)
async findDeleted() {
  return await prisma.providers.findMany({
    where: { is_active: false },
    orderBy: { created_at: 'desc' }
  });
}


  // Verificar si existe un RIF activo (para evitar duplicados al restaurar)
  async existsActiveRif(rif) {
    return await prisma.providers.findFirst({
      where: {
        rif,
        is_active: true
      }
    });
  }
}

export default ProviderModel;