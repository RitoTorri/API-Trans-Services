import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class PayrollsModel {
    constructor() { }

    async addPayrolls(payroll) {
        try {
            return await prisma.payrolls.create({
                data: payroll
            });
        } catch (error) { throw error; }
    }

    async updatePayrollState(id, data) {
        try {
            return await prisma.payrolls.update({
                where: { id: id },
                data: data
            });
        } catch (error) { throw error; }
    }

    async updatePayrolls(id, payroll) {
        try {
            return await prisma.payrolls.update({
                where: { id: id },
                data: payroll
            });
        } catch (error) { throw error; }
    }

    async getPayrolls(filter) {
        try {
            return await prisma.payrolls.findMany({
                where: { ...filter },
                orderBy: { period_start: 'desc' },
                include: {
                    employees: {
                        select: { name: true, ci: true }
                    }
                }
            });
        } catch (error) { throw error; }
    }

    async getPayrollByIdEmployee(idEmployee) {
        try {
            return await prisma.payrolls.findUnique({
                where: { employee_id: idEmployee }
            });
        } catch (error) { throw error; }
    }

    async getPayrollById(id) {
        try {
            return await prisma.payrolls.findFirst({
                where: { id: id }
            });
        } catch (error) { throw error; }
    }
}

export default PayrollsModel;