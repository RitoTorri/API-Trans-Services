import { PrismaClient } from '@prisma/client';
import ProviderInvoicesModel from './provider.invoices.model.js';
import ProviderModel from '../provider/provider.model.js';

const prisma = new PrismaClient();
const model = new ProviderInvoicesModel();
const providerModel = new ProviderModel();

class ProviderInvoicesService {
  // Crear factura + cálculo de impuestos + gasto automático
  async create(data) {
    const provider = await providerModel.findById(data.provider_id);
    if (!provider) throw new Error('Provider not found.');

    const subtotal = data.subtotal ?? 0;
    let totalTaxes = 0;

    // 🔹 Crear factura primero
    const providerInvoice = await prisma.provider_invoices.create({
      data: {
        provider_id: data.provider_id,
        control_number: data.control_number,
        invoice_number: data.invoice_number,
        invoice_date: new Date(data.invoice_date),
        subtotal,
        total_amount: 0, // se actualiza luego
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

    // 🔹 Crear gasto automático vinculado
    const descripcionGasto = `Gasto automático de factura ${data.invoice_number}`;
    const expense = await prisma.expenses.create({
      data: {
        provider_invoice_id: providerInvoice.id,
        description: descripcionGasto,
        subtotal,
        taxes: totalTaxes,
        total: totalAmount
      }
    });

    return {
      provider_invoice: updatedInvoice,
      taxes: await prisma.invoice_taxes.findMany({
        where: { provider_invoice_id: providerInvoice.id }
      }),
      expense
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

  // 🔹 Consulta completa de factura con impuestos y gasto automático
  async findInvoiceFull(id) {
    const invoice = await model.findById(id);
    if (!invoice) return null;

    const taxes = await prisma.invoice_taxes.findMany({
      where: { provider_invoice_id: id }
    });

    const expense = await prisma.expenses.findFirst({
      where: { provider_invoice_id: id }
    });

    return {
      provider_invoice: invoice,
      taxes,
      expense
    };
  }
}

export default ProviderInvoicesService;
