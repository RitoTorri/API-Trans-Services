import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class ProviderInvoicesModel {
  // Crear factura + impuestos + gasto automático
  async createWithExpense(data) {
    const {
      provider_id,
      control_number,
      invoice_number,
      invoice_date,
      subtotal,
      taxes,
      total_amount,
      status
    } = data;

    return await prisma.$transaction(async (tx) => {
      // 1) Crear factura del proveedor con include para traer el nombre
      const providerInvoice = await tx.provider_invoices.create({
        data: {
          provider_id,
          control_number,
          invoice_number,
          invoice_date,
          subtotal,
          total_amount,
          status
        },
        include: { provider: true }
      });

      // 2) Registrar impuestos detallados
      let totalTaxes = 0;
      if (Array.isArray(taxes)) {
        for (const tax of taxes) {
          const amount = (subtotal * tax.percentage) / 100;
          totalTaxes += amount;

          await tx.invoice_taxes.create({
            data: {
              provider_invoice_id: providerInvoice.id,
              code: tax.code,
              name: tax.name,
              percentage: tax.percentage,
              amount
            }
          });
        }
      }

      // 3) Crear gasto automático general con descripción del proveedor
      const descripcionGasto = `Compra al ${providerInvoice.provider.name}`;
      const expense = await tx.expenses.create({
        data: {
          description: descripcionGasto,
          total: subtotal + totalTaxes,
          id_expense_type: 1 // ⚠️ Ajusta según tu catálogo de tipos de gasto
        }
      });

      return {
        provider_invoice: providerInvoice,
        expense: {
          id: expense.id,
          total: Number(subtotal + totalTaxes),
          description: descripcionGasto
        }
      };
    });
  }

  async create(data) {
    return await prisma.provider_invoices.create({ data });
  }

  async findById(id) {
    return await prisma.provider_invoices.findFirst({
      where: { id },
      include: { provider: true } // 🔹 ahora incluye el proveedor
    });
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
