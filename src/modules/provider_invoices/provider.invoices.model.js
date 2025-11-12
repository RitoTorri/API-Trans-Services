import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class ProviderInvoicesModel {
  // Crear nueva factura
  async create(data) {
    return await prisma.provider_invoices.create({ data });
  }

  // Buscar factura por ID
  async findById(id) {
    return await prisma.provider_invoices.findFirst({ where: { id } });
  }

  // Listar todas las facturas activas (excluye eliminadas)
  async findAll() {
    return await prisma.provider_invoices.findMany({
      where: {
        control_number: { not: { startsWith: 'deleted_' } }
      },
      orderBy: { invoice_date: 'desc' }
    });
  }

  // Listar facturas por proveedor (excluye eliminadas)
  async findByProviderId(provider_id) {
    return await prisma.provider_invoices.findMany({
      where: {
        provider_id,
        control_number: { not: { startsWith: 'deleted_' } }
      },
      orderBy: { invoice_date: 'desc' }
    });
  }

  // Listar facturas por rango de fechas (excluye eliminadas)
  async findByDateRange(start, end) {
    return await prisma.provider_invoices.findMany({
      where: {
        invoice_date: {
          gte: new Date(start),
          lte: new Date(end)
        },
        control_number: { not: { startsWith: 'deleted_' } }
      },
      orderBy: { invoice_date: 'desc' }
    });
  }

  // Buscar por número fiscal o número de control (excluye eliminadas)
  async findByInvoiceOrControlNumber(value) {
    return await prisma.provider_invoices.findMany({
      where: {
        OR: [
          { invoice_number: { contains: value } },
          { control_number: { contains: value } }
        ],
        control_number: { not: { startsWith: 'deleted_' } }
      },
      orderBy: { invoice_date: 'desc' }
    });
  }
// Restaurar factura eliminada (soft delete)
async restore(id, newControlNumber) {
  return await prisma.provider_invoices.update({
    where: { id },
    data: { control_number: newControlNumber }
  });
}

// Verifica si un control_number ya existe en facturas activas
async existsControlNumber(control_number) {
  return await prisma.provider_invoices.findFirst({
    where: {
      control_number,
      NOT: {
        control_number: { startsWith: 'deleted_' }
      }
    }
  });
}


// Listar facturas eliminadas (soft deleted)
async findDeleted() {
  return await prisma.provider_invoices.findMany({
    where: {
      control_number: { startsWith: 'deleted_' }
    },
    orderBy: { invoice_date: 'desc' }
  });
}


  // Soft delete: renombra el control_number
  async softDelete(id) {
    return await prisma.provider_invoices.update({
      where: { id },
      data: { control_number: `deleted_${Date.now()}` }
    });
  }
}



export default ProviderInvoicesModel;
