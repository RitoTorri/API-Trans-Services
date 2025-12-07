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

  // Retenciones e impuestos basicos
  await prisma.retentions.createMany({
    data: [
      { code: "isrl", name: "Impuesto sobre la renta", percentage: "", description: "Retención ISLR" },
      { code: "ivss", name: "Seguro Social", percentage: "", description: "Retención IVSS" },
      { code: "faov", name: "Fondo de Ahorro", percentage: "", description: "Retención FAOV" },
      { code: "pie", name: "Paro forzoso", percentage: "", description: "Retención PIE" }
    ],
    skipDuplicates: true
  });

  // Script de creacion del super usuario
  await prisma.users.create({
    data: {
      username: "super",
      password: "super",
      rol: "SuperUsuario"
    },
    skipDuplicates: true
  });

  console.log("Seed data has been inserted.");
}