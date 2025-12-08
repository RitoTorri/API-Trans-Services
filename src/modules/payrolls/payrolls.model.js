import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class PayrollsModel {
    constructor() { }

    async addPayrolls(payroll, retentions) {
        try {
            return await prisma.$transaction(async (e) => {

                // Primero creamos la nomina
                const payrollResult = await e.payrolls.create({
                    data: payroll,
                    include: {
                        employee: {
                            select: { name: true, ci: true, rol: true }
                        }
                    }
                });

                // Le agregamos el id de la nominas a las retenciones que se van a guardar
                const retentionFinal = retentions.map(retention => {
                    return {
                        ...retention,
                        payroll_id: payrollResult.id
                    }
                });

                // Creamos los retenciones
                const retentionsResult = await e.payrolls_retentions.createMany({
                    data: retentionFinal
                });

                return { payrollResult, retentionsResult: { data: retentionsResult } };
            });
        } catch (error) { throw error; }
    }

    async updatePayrollStatePaid(id, totalExpense, description) {
        try {
            return await prisma.$transaction(async (e) => {

                // Primero actualizamos la nomina
                await prisma.payrolls.update({
                    where: { id: id },
                    data: { status: "paid" }
                });

                // Buscamos el tipo de gasto 
                let expenseType = await e.expense_types.findFirst({
                    where: { name: "nominas" }
                });

                // Crea el gasto realizado en la tabla de gastos
                const expensesResult = await e.expenses.create({
                    data: {
                        id_expense_type: expenseType.id,
                        description: description,
                        total: totalExpense
                    }
                });

                return { data_expenses: expensesResult };
            });
        } catch (error) { throw error; }
    }

    async updatePayrollStateCancelled(id) {
        try {
            return await prisma.payrolls.update({
                where: { id: id },
                data: { status: "cancelled" }
            });
        } catch (error) { throw error; }
    }

    async getPayrolls(filter) {
        try {
            return await prisma.payrolls.findMany({
                where: { ...filter },
                orderBy: { period_start: 'desc' },
                include: {
                    employee: {
                        select: { name: true, ci: true, rol: true, date_of_entry: true }
                    },
                    payrolls_retentions: {
                        select: { retention_code: true, rate_retention: true, total_retention: true }
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
                where: { id: id },
                include: {
                    payrolls_retentions: {
                        select: { retention_code: true, rate_retention: true, total_retention: true }
                    }
                }
            });
        } catch (error) { throw error; }
    }

    async validatedDuplicatePayroll(id, dateStart, dateEnd) {
        try {
            return await prisma.payrolls.findFirst({
                where: {
                    employee_id: id,
                    period_start: { gte: dateStart },
                    period_end: { lte: dateEnd },
                    status: "draft"
                }
            });
        } catch (error) { throw error; }
    }
}

export default PayrollsModel;