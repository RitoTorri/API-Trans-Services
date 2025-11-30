import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class ProviderModel {
  // Crear proveedor con contactos en una sola transacción
  async createWithContacts(data) {
    return await prisma.providers.create({
      data: {
        name: data.name,
        rif: data.rif,
        provider_contacts: {
          create: data.contacts || []
        }
      },
      include: { provider_contacts: true }
    });
  }

  async findAll() {
    return await prisma.providers.findMany({
      where: { is_active: true },
      orderBy: { created_at: 'desc' },
      include: { provider_contacts: true }
    });
  }

  async findById(id) {
    return await prisma.providers.findFirst({
      where: { id },
      include: { provider_contacts: true }
    });
  }

  async findByRif(rif) {
    return await prisma.providers.findFirst({ where: { rif } });
  }

  async findByName(name) {
    return await prisma.providers.findMany({
      where: {
        is_active: true,
        name: { contains: name, mode: 'insensitive' }
      },
      orderBy: { created_at: 'desc' },
      include: { provider_contacts: true }
    });
  }

  async findInactiveByName(name) {
    return await prisma.providers.findMany({
      where: {
        is_active: false,
        name: { contains: name, mode: 'insensitive' }
      },
      orderBy: { created_at: 'desc' },
      include: { provider_contacts: true }
    });
  }

  async update(id, data) {
    return await prisma.providers.update({
      where: { id },
      data: {
        name: data.name,
        rif: data.rif,
        provider_contacts: data.contacts
          ? {
              deleteMany: {}, // elimina todos los contactos previos
              create: data.contacts
            }
          : undefined
      },
      include: { provider_contacts: true }
    });
  }

  async softDelete(id) {
    return await prisma.providers.update({
      where: { id },
      data: { is_active: false }
    });
  }

  async restore(id) {
    return await prisma.providers.update({
      where: { id },
      data: { is_active: true },
      include: { provider_contacts: true }
    });
  }

  async findDeleted() {
    return await prisma.providers.findMany({
      where: { is_active: false },
      orderBy: { created_at: 'desc' },
      include: { provider_contacts: true }
    });
  }

  async existsActiveRif(rif) {
    return await prisma.providers.findFirst({
      where: { rif, is_active: true }
    });
  }
}

export default ProviderModel;
