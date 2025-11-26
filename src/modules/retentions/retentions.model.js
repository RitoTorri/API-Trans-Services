import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class RetentionsModel {
  async create(data) {
    return await prisma.retentions.create({ data });
  }

  async findAll() {
    return await prisma.retentions.findMany({
      orderBy: { created_at: 'desc' }
    });
  }

  async findByCode(code) {
    return await prisma.retentions.findUnique({ where: { code } });
  }

  async update(code, data) {
    return await prisma.retentions.update({
      where: { code },
      data
    });
  }

  async delete(code) {
    return await prisma.retentions.delete({ where: { code } });
  }
}

export default RetentionsModel;
