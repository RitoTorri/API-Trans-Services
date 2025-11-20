import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class ProviderModel {
  // Crear proveedor con contactos en una sola transacción
  async createWithContacts(data) {
    return await prisma.providers.create({
      data: {
        name: data.name,
        rif: data.rif,
        balance: data.balance,
        provider_contacts: {
          create: data.contacts || []
        }
      },
      include: { provider_contacts: true }
    });
  }

  async create(data) {
    return await prisma.providers.create({ data });
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
      where: { id, is_active: true },
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


  async update(id, data) {
    return await prisma.providers.update({ where: { id }, data });
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
      data: { is_active: true }
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

  // 📌 Crear contacto
  async addContact(providerId, contact_info) {
    // Validar duplicado
    const existing = await prisma.provider_contacts.findFirst({
      where: { contact_info }
    });
    if (existing) throw new Error('Contact info already exists.');

    return await prisma.provider_contacts.create({
      data: { provider_id: providerId, contact_info }
    });
  }


  // 📌 Actualizar contacto
  async updateContact(contactId, contact_info) {
    return await prisma.provider_contacts.update({
      where: { id: contactId },
      data: { contact_info }
    });
  }

  // 📌 Eliminar contacto
  async deleteContact(contactId) {
    return await prisma.provider_contacts.delete({
      where: { id: contactId }
    });
  }

  // 📌 Listar contactos de un proveedor
  async listContacts(providerId) {
    return await prisma.provider_contacts.findMany({
      where: { provider_id: providerId },
      orderBy: { created_at: 'desc' }
    });
  }

}

export default ProviderModel;
