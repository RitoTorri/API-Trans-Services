import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function main() {
  // Tipos de gasto básicos
  await prisma.expense_types.createMany({
    data: [
      { name: "compras", description: "Gastos por compras de proveedores" },
      { name: "nomina", description: "Pago de empleados" },
      { name: "servicios", description: "Servicios contratados" }
    ],
    skipDuplicates: true
  });

  // Retenciones básicas
  await prisma.retentions.createMany({
    data: [
      { code: "isrl", name: "Impuesto sobre la renta", description: "Retención ISLR" },
      { code: "ivss", name: "Seguro Social", description: "Retención IVSS" },
      { code: "faov", name: "Fondo de Ahorro", description: "Retención FAOV" },
      { code: "pie", name: "Paro forzoso", description: "Retención PIE" }
    ],
    skipDuplicates: true
  });

  console.log("✅ Tipos de gasto y retenciones iniciales creados");
}