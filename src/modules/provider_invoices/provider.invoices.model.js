import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class ProviderInvoicesModel {
  // Crear factura + gasto automático con desglose
  async createWithExpense(data) {
    const {
      provider_id,
      control_number,
      invoice_number,
      invoice_date,
      subtotal,
      taxes,
      total_amount,
      balance,
      status
    } = data;

    return await prisma.$transaction(async (tx) => {
      // 1) Factura del proveedor
      const providerInvoice = await tx.provider_invoices.create({
        data: {
          provider_id,
          control_number,
          invoice_number,
          invoice_date,
          subtotal,
          taxes,
          total_amount,
          balance,
          status
        }
      });

      // 2) Gasto automático vinculado a la factura con desglose
      const descripcionGasto = `Gasto automático de factura ${invoice_number}`;
      const expense = await tx.expenses.create({
        data: {
          description: descripcionGasto,
          subtotal,
          taxes,
          total: total_amount,
          provider_invoice_id: providerInvoice.id
        }
      });

      return {
        provider_invoice: providerInvoice,
        expense: {
          id: expense.id,
          subtotal: Number(subtotal),
          taxes: Number(taxes),
          total: Number(total_amount),
          description: descripcionGasto
        }
      };
    });
  }

  async create(data) {
    return await prisma.provider_invoices.create({ data });
  }

  async findById(id) {
    return await prisma.provider_invoices.findFirst({ where: { id } });
  }

  async findAll() {
    return await prisma.provider_invoices.findMany({
      where: { control_number: { not: { startsWith: 'deleted_' } } },
      orderBy: { invoice_date: 'desc' }
    });
  }

  async findByProviderId(provider_id) {
    return await prisma.provider_invoices.findMany({
      where: {
        provider_id,
        control_number: { not: { startsWith: 'deleted_' } }
      },
      orderBy: { invoice_date: 'desc' }
    });
  }

  async findByDateRange(start, end) {
    return await prisma.provider_invoices.findMany({
      where: {
        invoice_date: { gte: new Date(start), lte: new Date(end) },
        control_number: { not: { startsWith: 'deleted_' } }
      },
      orderBy: { invoice_date: 'desc' }
    });
  }

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

  // Restaurar factura eliminada solo con ID
  async restore(id) {
    const invoice = await prisma.provider_invoices.findFirst({ where: { id } });
    if (!invoice) throw new Error('Invoice not found.');
    if (!invoice.control_number.startsWith('deleted_')) {
      throw new Error('Invoice is not marked as deleted.');
    }

    // Quitar prefijo deleted_
    const restoredControlNumber = invoice.control_number.replace(/^deleted_\d+/, '');

    return await prisma.provider_invoices.update({
      where: { id },
      data: { control_number: restoredControlNumber }
    });
  }

  async existsControlNumber(control_number) {
    return await prisma.provider_invoices.findFirst({
      where: {
        control_number,
        NOT: { control_number: { startsWith: 'deleted_' } }
      }
    });
  }

  async findDeleted() {
    return await prisma.provider_invoices.findMany({
      where: { control_number: { startsWith: 'deleted_' } },
      orderBy: { invoice_date: 'desc' }
    });
  }

  async softDelete(id) {
    return await prisma.provider_invoices.update({
      where: { id },
      data: { control_number: `deleted_${Date.now()}` }
    });
  }
}

export default ProviderInvoicesModel;
