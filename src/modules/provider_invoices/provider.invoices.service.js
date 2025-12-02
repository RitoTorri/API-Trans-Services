import { PrismaClient } from '@prisma/client';
import ProviderInvoicesModel from './provider.invoices.model.js';
import ProviderModel from '../provider/provider.model.js';

const prisma = new PrismaClient();
const model = new ProviderInvoicesModel();
const providerModel = new ProviderModel();

class ProviderInvoicesService {
  // Crear factura + cálculo de impuestos (sin gasto todavía)
  async create(data) {
    const provider = await providerModel.findById(data.provider_id);
    if (!provider) throw new Error('Provider not found.');

    const subtotal = data.subtotal ?? 0;
    let totalTaxes = 0;

    // 🔹 Crear factura
    const providerInvoice = await prisma.provider_invoices.create({
      data: {
        provider_id: data.provider_id,
        control_number: data.control_number,
        invoice_number: data.invoice_number,
        invoice_date: new Date(data.invoice_date),
        subtotal,
        total_amount: 0,
        status: 'pendiente'
      }
    });

    // 🔹 Registrar impuestos detallados
    if (Array.isArray(data.taxes)) {
      for (const tax of data.taxes) {
        const amount = (subtotal * tax.percentage) / 100;
        totalTaxes += amount;

        await prisma.invoice_taxes.create({
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

    // 🔹 Calcular total y actualizar factura
    const totalAmount = subtotal + totalTaxes;
    const updatedInvoice = await prisma.provider_invoices.update({
      where: { id: providerInvoice.id },
      data: { total_amount: totalAmount }
    });

    return {
      provider_invoice: updatedInvoice,
      taxes: await prisma.invoice_taxes.findMany({
        where: { provider_invoice_id: providerInvoice.id }
      })
    };
  }

  async findAll() {
    return await model.findAll();
  }

  async findByProvider(provider_id) {
    return await model.findByProviderId(provider_id);
  }

  async findByDateRange(start, end) {
    return await model.findByDateRange(start, end);
  }

  async searchByNumber(value) {
    return await model.findByInvoiceOrControlNumber(value);
  }

  async findDeleted() {
    return await model.findDeleted();
  }

  async restore(id) {
    const invoice = await model.findById(id);
    if (!invoice) throw new Error('Invoice not found.');
    if (!invoice.control_number.startsWith('deleted_')) {
      throw new Error('Invoice is not marked as deleted.');
    }

    const restoredControlNumber = invoice.control_number.replace(/^deleted_\d+/, '');
    return await model.restore(id, restoredControlNumber);
  }

  async delete(id) {
    const invoice = await model.findById(id);
    if (!invoice) throw new Error('Invoice not found.');
    return await model.softDelete(id);
  }

  // 🔹 Cambiar estado de factura (pendiente → pagado → cancelado)
// 🔹 Cambiar estado de factura (pendiente → pagado → cancelado)
async updateStatus(id, status) {
  const invoice = await model.findById(id);
  if (!invoice) throw new Error('Invoice not found.');

  // 🔹 Restricciones de transición
  if (invoice.status === 'pagado' || invoice.status === 'cancelado') {
    throw new Error(`No se puede modificar una factura con estado '${invoice.status}'.`);
  }

  if (invoice.status === 'pendiente' && !['pagado', 'cancelado'].includes(status)) {
    throw new Error(`Transición inválida: pendiente solo puede pasar a pagado o cancelado.`);
  }

  const updated = await prisma.provider_invoices.update({
    where: { id },
    data: { status }
  });

  // 🔹 Crear gasto automático solo si pasa a pagado
  if (status === 'pagado') {
    const descripcionGasto = `Compra al ${invoice.provider.name} - Factura ${invoice.invoice_number}`;

    // Buscar tipo de gasto "compras"
    let expenseType = await prisma.expense_types.findFirst({
      where: { name: "compras" }
    });

    // Si no existe, lo creamos
    if (!expenseType) {
      expenseType = await prisma.expense_types.create({
        data: {
          name: "compras",
          description: "Gastos por compras de proveedores"
        }
      });
    }

    // Crear gasto en la tabla expenses
    await prisma.expenses.create({
      data: {
        id_expense_type: expenseType.id,
        description: descripcionGasto,
        total: Number(invoice.total_amount)
      }
    });
  }

  return updated;
}



  // 🔹 Consulta completa de factura con impuestos y gasto automático
  async findInvoiceFull(id) {
    const invoice = await model.findById(id); // incluye provider
    if (!invoice) return null;

    const taxes = await prisma.invoice_taxes.findMany({
      where: { provider_invoice_id: id }
    });

    const expense = await prisma.expenses.findFirst({
      where: { description: `Compra al ${invoice.provider.name} - Factura ${invoice.invoice_number}` }
    });

    return {
      provider_invoice: invoice,
      taxes,
      expense
    };
  }
}

export default ProviderInvoicesService;
