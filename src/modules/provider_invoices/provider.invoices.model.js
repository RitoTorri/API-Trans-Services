import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class ProviderInvoicesModel {
  // Crear factura + IVA + gasto automático con control_number auto‑incremental
  async createWithExpense(data) {
    const { provider_id, invoice_date, subtotal, status } = data;

    return await prisma.$transaction(async (tx) => {
      // 1) Buscar último control_number
      const lastInvoice = await tx.provider_invoices.findFirst({
        orderBy: { id: 'desc' }
      });

      let nextNumber = 1;
      if (lastInvoice) {
        const lastControl = parseInt(lastInvoice.control_number.replace('CN-', ''));
        nextNumber = lastControl + 1;
      }

      const control_number = `CN-${String(nextNumber).padStart(5, '0')}`;

      // 2) Buscar IVA en el catálogo
      const ivaParam = await tx.tax_parameters.findUnique({
        where: { code: "iva" }
      });
      if (!ivaParam) throw new Error('IVA no está definido en el catálogo de impuestos.');

      // 3) Calcular IVA y total
      const ivaAmount = subtotal * ivaParam.percentage;
      const totalAmount = subtotal + ivaAmount;

      // 4) Crear factura
      const providerInvoice = await tx.provider_invoices.create({
        data: {
          provider_id,
          control_number,
          invoice_date,
          subtotal,
          total_amount: totalAmount,
          status
        },
        include: { provider: true }
      });

      // 5) Registrar impuesto aplicado
      await tx.invoice_taxes.create({
        data: {
          provider_invoice_id: providerInvoice.id,
          tax_code: ivaParam.code,
          amount: ivaAmount
        }
      });

      // 6) Crear gasto automático general con descripción del proveedor
      const descripcionGasto = `Compra al ${providerInvoice.provider.name} - Control ${control_number}`;
      const expense = await tx.expenses.create({
        data: {
          description: descripcionGasto,
          total: totalAmount,
          id_expense_type: 1 // ⚠️ Ajusta según tu catálogo de tipos de gasto
        }
      });

      return {
        provider_invoice: providerInvoice,
        expense: {
          id: expense.id,
          total: Number(totalAmount),
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
      include: { provider: true }
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

  // 🔹 Buscar solo por número de control
  async findByControlNumber(value) {
    return await prisma.provider_invoices.findMany({
      where: {
        control_number: { contains: value },
        control_number: { not: { startsWith: 'deleted_' } }
      },
      orderBy: { invoice_date: 'desc' }
    });
  }

  // Restaurar factura eliminada solo con ID
  async restore(id) {
    const invoice = await prisma.provider_invoices.findFirst({ where: { id } });
    if (!invoice) throw new Error('Factura no encontrada.');
    if (!invoice.control_number.startsWith('deleted_')) {
      throw new Error('La factura no está marcada como eliminada.');
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
