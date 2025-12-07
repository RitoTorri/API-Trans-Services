import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
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
  await prisma.tax_parameters.createMany({
    data: [
      { code: "sso", name: "Seguro Social Obligatorio", percentage: 0.04, description: "Retención del Seguro Social Obligatorio" },
      { code: "faov", name: "Fondo de Ahorro Obligatorio de Vivienda", percentage: 0.01, description: "Retención del Fondo de Ahorro Obligatorio de Vivienda" },
      { code: "pie", name: "Paro Forzoso Quincenal", percentage: 0.005, description: "Retención PIE" },
      { code: "iva", name: "Impuesto al Valor Agregado", percentage: 0.16, description: "Impuesto al Valor Agregado" },
    ],
    skipDuplicates: true
  });

  await prisma.vehicle_types.createMany({
    data: [
      { type_name: "Bus", description: "Tipo de vehículo para gran cantidad de personas" },
      { type_name: "Van", description: "Tipo de vehículo para menos personas" },
      { type_name: "Auto Particular", description: "Tipo de vehículo para menos personas" },
    ],
    skipDuplicates: true
  });

  // Script de creacion del super usuario
  await prisma.users.createMany({
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

  console.log("Seed data has been inserted.");
}