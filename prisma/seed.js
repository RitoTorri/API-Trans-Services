import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function main() {
  try {
    // Verificar cada tabla individualmente antes de insertar
    const [expenseTypesExist, taxParamsExist, vehicleTypesExist, superUserExists] = await Promise.all([
      prisma.expense_types.findFirst({ where: { name: "compras" } }),
      prisma.tax_parameters.findFirst({ where: { code: "sso" } }),
      prisma.vehicle_types.findFirst({ where: { type_name: "Bus" } }),
      prisma.users.findUnique({ where: { username: "super" } })
    ]);

    // Usar transacción para atomicidad
    await prisma.$transaction(async (tx) => {
      // Tipos de gasto básicos - solo si no existen
      if (!expenseTypesExist) {
        await tx.expense_types.createMany({
          data: [
            { name: "compras", description: "Gastos por compras de proveedores" },
            { name: "nominas", description: "Pago de empleados" },
            { name: "servicios", description: "Servicios contratados" }
          ],
          skipDuplicates: true
        });
        console.log("Expense types created");
      } else {
        console.log("Expense types already exist, skipping...");
      }

      // Retenciones e impuestos básicos - solo si no existen
      if (!taxParamsExist) {
        await tx.tax_parameters.createMany({
          data: [
            { code: "sso", name: "Seguro Social Obligatorio", percentage: 0.04 },
            { code: "faov", name: "Fondo de Ahorro Obligatorio de Vivienda", percentage: 0.01 },
            { code: "pie", name: "Paro Forzoso Quincenal", percentage: 0.005 },
            { code: "iva", name: "Impuesto al Valor Agregado", percentage: 0.16 },
          ],
          skipDuplicates: true
        });
        console.log("Tax parameters created");
      } else {
        console.log("Tax parameters already exist, skipping...");
      }

      // Tipos de vehículos - solo si no existen
      if (!vehicleTypesExist) {
        await tx.vehicle_types.createMany({
          data: [
            { type_name: "Bus", description: "Tipo de vehículo para gran cantidad de personas" },
            { type_name: "Van", description: "Tipo de vehículo para menos personas" },
            { type_name: "Auto Particular", description: "Tipo de vehículo para menos personas" },
          ],
          skipDuplicates: true
        });
        console.log("Vehicle types created");
      } else {
        console.log("Vehicle types already exist, skipping...");
      }

      // Usuarios - solo si no existen
      if (!superUserExists) {
        await tx.users.createMany({
          data: [
            {
              username: "super",
              password: bcrypt.hashSync("super", 10),
              rol: "SuperUsuario"
            },
            {
              username: "admin",
              password: bcrypt.hashSync("admin", 10),
              rol: "Administrador"
            },
            {
              username: "invitado",
              password: bcrypt.hashSync("invitado", 10),
              rol: "Invitado"
            }
          ],
          skipDuplicates: true
        });
        console.log("Users created");
      } else {
        console.log("Users already exist, skipping...");
      }
    });

    console.log("Seed process completed.");
  } catch (error) {
    console.error("Error during seeding:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}