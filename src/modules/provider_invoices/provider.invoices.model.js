import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class ProviderInvoicesModel {
  // Crear factura + detalle de compra + retenciones + gasto automático
  async createWithPurchase(data) {
    const {
      provider_id,
      control_number,
      invoice_number,
      invoice_date,
      total_amount,
      purchase,       // { expense_type_id, purchase_date, description, exempt_amount }
      retentions = [] // [{ retention_code, rate_retention, base_amount }]
    } = data;

    return await prisma.$transaction(async (tx) => {
      // 1) Factura del proveedor
      const providerInvoice = await tx.provider_invoices.create({
        data: {
          provider_id,
          control_number,
          invoice_number,
          invoice_date,
          total_amount
        }
      });

      // 2) Detalle de compra asociado
      const purchaseInvoice = await tx.purchase_invoices.create({
        data: {
          provider_invoice_id: providerInvoice.id,
          expense_type_id: purchase.expense_type_id,
          purchase_date: new Date(purchase.purchase_date),
          description: purchase.description,
          exempt_amount: purchase.exempt_amount ?? 0,
          total_amount
        }
      });

      // 3) Retenciones de la compra
      let totalRetenciones = 0;
      for (const r of retentions) {
        const base = Number(r.base_amount ?? total_amount);
        const rate = Number(r.rate_retention);
        const total = Number(((base * rate) / 100).toFixed(2));
        totalRetenciones += total;

        await tx.purchase_invoices_retentions.create({
          data: {
            purchase_invoice_id: purchaseInvoice.id,
            retention_code: r.retention_code,
            base_amount: base,
            rate_retention: rate,
            total_retention: total
          }
        });
      }

      // 🔹 Consultar retenciones con nombre
      const retencionesConNombre = await tx.purchase_invoices_retentions.findMany({
        where: { purchase_invoice_id: purchaseInvoice.id },
        include: { retention: true }
      });

      // 🔹 Consultar nombre del proveedor
      const proveedor = await tx.providers.findUnique({
        where: { id: provider_id },
        select: { name: true }
      });

      // 4) Gasto automático con vínculo directo a la factura
      const neto = Number(total_amount) - Number(totalRetenciones);
      const descripcionGasto = `Compra al proveedor ${proveedor?.name ?? provider_id} el ${new Date(purchase.purchase_date).toISOString().slice(0, 10)}`;

      const expense = await tx.expenses.create({
        data: {
          id_expense_type: purchase.expense_type_id,
          description: descripcionGasto,
          total: neto,
          provider_invoice_id: providerInvoice.id // ✅ vínculo directo
        }
      });

      // 5) Actualizar balance del proveedor (puedes usar neto si prefieres)
      await tx.providers.update({
        where: { id: provider_id },
        data: { balance: { increment: total_amount } }
      });

      return {
        provider_invoice: providerInvoice,
        purchase_invoice: purchaseInvoice,
        retentions: retencionesConNombre, // 🔹 devuelve código + nombre
        total_retentions: Number(totalRetenciones.toFixed(2)),
        expense: { 
          id: expense.id,
          total: Number(neto.toFixed(2)), 
          description: descripcionGasto,
          provider_name: proveedor?.name ?? null
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

  async restore(id, newControlNumber) {
    return await prisma.provider_invoices.update({
      where: { id },
      data: { control_number: newControlNumber }
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

  async findRetentionsByPurchase(purchase_invoice_id) {
    return await prisma.purchase_invoices_retentions.findMany({
      where: { purchase_invoice_id },
      include: { retention: true }
    });
  }
}

export default ProviderInvoicesModel;
