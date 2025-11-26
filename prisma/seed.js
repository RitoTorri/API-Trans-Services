import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Tipos de gasto básicos
  await prisma.expense_types.createMany({
    data: [
      { name: "Compras", description: "Gastos por compras de proveedores" },
      { name: "Nómina", description: "Pago de empleados" },
      { name: "Servicios", description: "Servicios contratados" }
    ],
    skipDuplicates: true
  });

  // Retenciones básicas
  await prisma.retentions.createMany({
    data: [
      { code: "ISLR", name: "Impuesto sobre la renta", description: "Retención ISLR" },
      { code: "IVSS", name: "Seguro Social", description: "Retención IVSS" },
      { code: "FAOV", name: "Fondo de Ahorro", description: "Retención FAOV" }
    ],
    skipDuplicates: true
  });

  console.log("✅ Tipos de gasto y retenciones iniciales creados");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
