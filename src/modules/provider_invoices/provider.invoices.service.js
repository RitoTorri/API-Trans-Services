import { PrismaClient } from '@prisma/client';
import ProviderInvoicesModel from './provider.invoices.model.js';
import ProviderModel from '../provider/provider.model.js';
import validators from '../../shared/utils/format.data.js' // 🔹 Import de validaciones

const prisma = new PrismaClient();
const model = new ProviderInvoicesModel();
const providerModel = new ProviderModel();

class ProviderInvoicesService {
  // Crear factura + cálculo de IVA desde catálogo
  async create(data) {
    const provider = await providerModel.findById(data.provider_id);
    if (!provider) throw new Error('Proveedor no encontrado.');

    const subtotal = data.subtotal ?? 0;

  // 🔹 Validar descripción libre con util validators
  if (data.description) {
    if (typeof data.description !== 'string' || data.description.trim() === '') {
      throw new Error('La descripción debe ser texto válido y no vacía.');
    }
    if (data.description.length > 255) {
      throw new Error('La descripción no puede superar los 255 caracteres.');
  }
    if (validators.formatDescriptionInvalid(data.description)) {
      throw new Error('La descripción solo puede contener letras, números, espacios, puntos, comas y paréntesis.');
    }
  }


    // 🔹 Buscar IVA en el catálogo
    const ivaParam = await prisma.tax_parameters.findUnique({
      where: { code: "iva" }
    });
    if (!ivaParam) throw new Error('IVA no está definido en el catálogo de impuestos.');

    // 🔹 Calcular IVA y total
    const ivaAmount = subtotal * Number(ivaParam.percentage);
    const totalAmount = subtotal + ivaAmount;

    // 🔹 Generar control_number automático
    const lastInvoice = await prisma.provider_invoices.findFirst({
      orderBy: { id: 'desc' }
    });

    let nextNumber = 1;
    if (lastInvoice) {
      const lastCN = lastInvoice.control_number; // Ej: "CN-0005"
      const numericPart = parseInt(lastCN.replace("CN-", ""), 10);
      if (!isNaN(numericPart)) {
        nextNumber = numericPart + 1;
      }
    }
    const newControlNumber = `CN-${String(nextNumber).padStart(4, '0')}`;

    // 🔹 Crear factura
    const providerInvoice = await prisma.provider_invoices.create({
      data: {
        provider_id: data.provider_id,
        control_number: newControlNumber,
        invoice_date: new Date(data.invoice_date),
        subtotal,
        total_amount: totalAmount,
        status: 'pendiente',
        description: data.description ?? null
      }
    });

    // 🔹 Registrar impuesto aplicado
    await prisma.invoice_taxes.create({
      data: {
        provider_invoice_id: providerInvoice.id,
        tax_code: ivaParam.code,
        amount: ivaAmount
      }
    });

    return {
      provider_invoice: providerInvoice,
      taxes: await prisma.invoice_taxes.findMany({
        where: { provider_invoice_id: providerInvoice.id },
        include: { tax_parameter: true }
      })
    };
  }

  // 🔹 Listar todas las facturas
  async findAll() {
    return await prisma.provider_invoices.findMany({
      include: {
        provider: { select: { name: true, rif: true } },
        invoice_taxes: { include: { tax_parameter: true } }
      }
    });
  }

  // 🔹 Buscar facturas por proveedor
  async findByProvider(provider_id) {
    return await prisma.provider_invoices.findMany({
      where: { provider_id },
      include: {
        provider: { select: { name: true, rif: true } },
        invoice_taxes: { include: { tax_parameter: true } }
      }
    });
  }

  // 🔹 Buscar facturas por rango de fechas
  async findByDateRange(start, end) {
    return await prisma.provider_invoices.findMany({
      where: {
        invoice_date: { gte: new Date(start), lte: new Date(end) }
      },
      include: {
        provider: { select: { name: true, rif: true } },
        invoice_taxes: { include: { tax_parameter: true } }
      }
    });
  }

  // 🔹 Buscar factura por número de control
  async searchByControlNumber(value) {
    return await prisma.provider_invoices.findMany({
      where: {
        control_number: { contains: value }
      },
      include: {
        provider: { select: { name: true, rif: true } },
        invoice_taxes: { include: { tax_parameter: true } }
      }
    });
  }

  async findDeleted() {
    return await model.findDeleted();
  }

  async restore(id) {
    const invoice = await model.findById(id);
    if (!invoice) throw new Error('Factura no encontrada.');
    if (!invoice.control_number.startsWith('deleted_')) {
      throw new Error('La factura no está marcada como eliminada.');
    }

    const restoredControlNumber = invoice.control_number.replace(/^deleted_\d+/, '');
    return await model.restore(id, restoredControlNumber);
  }

  async delete(id) {
    const invoice = await model.findById(id);
    if (!invoice) throw new Error('Factura no encontrada.');
    return await model.softDelete(id);
  }

  // 🔹 Cambiar estado de factura (pendiente → pagado → cancelado)
  async updateStatus(id, status) {
    const invoice = await prisma.provider_invoices.findUnique({
      where: { id },
      include: { provider: { select: { name: true, rif: true } } }
    });
    if (!invoice) throw new Error('Factura no encontrada.');

    // Restricciones de transición
    if (invoice.status === 'pagado' || invoice.status === 'cancelado') {
      throw new Error(`No se puede modificar una factura con estado '${invoice.status}'.`);
    }
    if (invoice.status === 'pendiente' && !['pagado', 'cancelado'].includes(status)) {
      throw new Error('Transición inválida: pendiente solo puede pasar a pagado o cancelado.');
    }

    const updated = await prisma.provider_invoices.update({
      where: { id },
      data: { status }
    });

    // Crear gasto automático solo si pasa a pagado
    if (status === 'pagado') {
      const descripcionGasto = invoice.description 
        ? invoice.description 
        : `Compra al ${invoice.provider.name} - Control ${invoice.control_number}`;

      let expenseType = await prisma.expense_types.findFirst({
        where: { name: "compras" }
      });
      if (!expenseType) {
        expenseType = await prisma.expense_types.create({
          data: {
            name: "compras",
            description: "Gastos por compras de proveedores"
          }
        });
      }

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
    const invoice = await prisma.provider_invoices.findUnique({
      where: { id },
      include: { provider: { select: { name: true, rif: true } } }
    });
    if (!invoice) return null;

    const taxes = await prisma.invoice_taxes.findMany({
      where: { provider_invoice_id: id },
      include: { tax_parameter: true }
    });

    const expense = await prisma.expenses.findFirst({
      where: { description: invoice.description 
        ? invoice.description 
        : `Compra al ${invoice.provider.name} - Control ${invoice.control_number}` }
    });

    return { provider_invoice: invoice, taxes, expense };
  }
}

export default ProviderInvoicesService;
