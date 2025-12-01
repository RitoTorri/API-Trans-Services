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

  // ✅ Actualización parcial con validación de contactos
  async updateProvider(object, idProvider, contacts = [], contactsToDelete = []) {
    return await prisma.$transaction(async (tx) => {
      // Actualizar proveedor si hay datos
      const providerResult = await tx.providers.update({
        where: { id: idProvider },
        data: object,
        include: { provider_contacts: true }
      });

      let contactsResult = [];

      // Actualizar o crear contactos
      for (const c of contacts) {
        if (c.id) {
          const existContact = await tx.provider_contacts.findUnique({
            where: { id: parseInt(c.id) }
          });
          if (!existContact) {
            throw new Error(`Contact with id ${c.id} not found.`);
          }

          const updated = await tx.provider_contacts.update({
            where: { id: parseInt(c.id) },
            data: { contact_info: c.contact_info }
          });
          contactsResult.push(updated);
        } else {
          const created = await tx.provider_contacts.create({
            data: { provider_id: idProvider, contact_info: c.contact_info }
          });
          contactsResult.push(created);
        }
      }

      // Eliminar contactos específicos
      for (const id of contactsToDelete) {
        const existContact = await tx.provider_contacts.findUnique({ where: { id } });
        if (!existContact) {
          throw new Error(`Contact with id ${id} not found.`);
        }
        await tx.provider_contacts.delete({ where: { id } });
      }

      return { providerResult, contacts_result: contactsResult };
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
