import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class ExpenseTypesModel {
  async create(data) {
    return await prisma.expense_types.create({ data });
  }

  async findAll() {
    return await prisma.expense_types.findMany({
      orderBy: { created_at: 'desc' }
    });
  }

  async findById(id) {
    return await prisma.expense_types.findUnique({ where: { id: Number(id) } });
  }

  async update(id, data) {
    return await prisma.expense_types.update({
      where: { id: Number(id) },
      data
    });
  }

  async delete(id) {
    return await prisma.expense_types.delete({ where: { id: Number(id) } });
  }
}

export default ExpenseTypesModel;
