import { PrismaClient } from '@prisma/client';
import ProviderInvoicesModel from './provider.invoices.model.js';
import ProviderModel from '../provider/provider.model.js';

const prisma = new PrismaClient();
const model = new ProviderInvoicesModel();
const providerModel = new ProviderModel();

class ProviderInvoicesService {
  // Crear factura + compra + retenciones + gasto automático
  async create(data) {
    const provider = await providerModel.findById(data.provider_id);
    if (!provider) throw new Error('Provider not found.');
    return await model.createWithPurchase(data);
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

  async restore(id, newControlNumber) {
    const invoice = await model.findById(id);
    if (!invoice) throw new Error('Invoice not found.');
    if (!invoice.control_number.startsWith('deleted_')) {
      throw new Error('Invoice is not marked as deleted.');
    }

    const duplicate = await model.existsControlNumber(newControlNumber);
    if (duplicate) throw new Error('Control number already exists.');

    return await model.restore(id, newControlNumber);
  }

  async delete(id) {
    const invoice = await model.findById(id);
    if (!invoice) throw new Error('Invoice not found.');
    return await model.softDelete(id);
  }

  async getPurchaseWithRetentions(purchase_invoice_id) {
    return await model.findRetentionsByPurchase(purchase_invoice_id);
  }

  // 🔹 Consulta completa de factura con compras, retenciones y gasto automático
  async findInvoiceFull(id) {
    const invoice = await model.findById(id);
    if (!invoice) return null;

    // Traer todas las compras con sus retenciones
    const purchases = await prisma.purchase_invoices.findMany({
      where: { provider_invoice_id: id },
      include: {
        purchase_invoices_retentions: { include: { retention: true } }
      }
    });

    // Aplanar todas las retenciones
    const allRetentions = purchases.flatMap(pi => pi.purchase_invoices_retentions);

    // Calcular total de retenciones
    const totalRetentions = allRetentions.reduce((acc, r) => acc + Number(r.total_retention), 0);

    // Traer gasto automático vinculado directamente por provider_invoice_id
    const expense = await prisma.expenses.findFirst({
      where: { provider_invoice_id: id },
      include: {
        expense_type: true,      // ✅ nombre correcto según tu schema
        provider_invoice: true   // opcional, si quieres ver la factura asociada
      }
    });

    return {
      provider_invoice: invoice,
      purchase_invoices: purchases,
      retentions: allRetentions,
      total_retentions: totalRetentions,
      expense: expense || null
    };
  }
}

export default ProviderInvoicesService;
