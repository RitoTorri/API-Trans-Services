import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class ProviderContactsModel {
  // Crear nuevo contacto
  async create(data) {
    return await prisma.provider_contacts.create({ data });
  }

  // Buscar contacto por info y proveedor (evita duplicados por proveedor)
  async findByContactInfo(info, provider_id) {
    return await prisma.provider_contacts.findFirst({
      where: {
        contact_info: info,
        provider_id
      }
    });
  }

  // Buscar contacto por ID
  async findById(id) {
    return await prisma.provider_contacts.findFirst({ where: { id } });
  }

  // Eliminar contacto (eliminación completa del registro)
  async delete(id) {
    return await prisma.provider_contacts.delete({
      where: { id }
    });
  }

  // Listar todos los contactos activos de un proveedor
  async findByProviderId(provider_id) {
    return await prisma.provider_contacts.findMany({
      where: {
        provider_id
      },
      orderBy: { created_at: 'desc' }
    });
  }
}

export default ProviderContactsModel;
