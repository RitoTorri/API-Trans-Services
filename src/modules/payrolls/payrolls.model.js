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
                    include: { employee: true }
                });

                // Creamos los retenciones
                const retentionFinal = retentions.map(retention => {
                    return {
                        ...retention,
                        payroll_id: payrollResult.id
                    }
                });

                const retentionsResult = await e.payrolls_retentions.createMany({
                    data: retentionFinal
                });

                return {
                    payrollResult,
                    retentionsResult: {
                        message: "retentions created successfully.",
                        data: retentionsResult
                    }
                };
            });
        } catch (error) { throw error; }
    }

    async updatePayrollStatePaid(id, totalExpense) {
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

                // Si no existe creamos el tipo de gasto
                if (!expenseType) {
                    expenseType = await e.expense_types.create({
                        data: {
                            name: "nominas",
                            description: "Pago de las nominas"
                        }
                    });
                }

                const expensesResult = await e.expenses.create({
                    data: {
                        id_expense_type: expenseType.id,
                        total: totalExpense
                    }
                });

                return {
                    message: "Payroll paid successfully.",
                    data: expensesResult
                };
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

    async updatePayrolls(id_payroll, payroll, retentions) {
        try {
            return await prisma.$transaction(async (e) => {
                const order = ['ivss', 'pie', 'faov'];

                // Primero actualizamos la nomina
                const payrollResult = await prisma.payrolls.update({
                    where: { id: id_payroll },
                    data: payroll
                });

                // Consultamos las retenciones que le pertenecen a esa nomina que se esta actualizando
                let retentionsByPayroll = await e.payrolls_retentions.findMany({
                    where: { payroll_id: id_payroll }
                });

                // Ordenamos todas las retenciones. NO ERA OBLIGATORIO HACERLO, PERO POR SI ACASO
                retentionsByPayroll.sort((a, b) => order.indexOf(a.retention_code) - order.indexOf(b.retention_code));
                retentions.sort((a, b) => order.indexOf(a.retention_code) - order.indexOf(b.retention_code));

                // Le agregamos los id a las retentions recibida por parametro
                for (let i = 0; i < retentions.length; i++) retentions[i].id = retentionsByPayroll[i].id;

                // Le agregamos id a las retenciones recibidas por parametro
                const retentionsResult = await Promise.all(
                    retentions.map(retention => {
                        // Separamos el id de la retencion
                        let id_retention = retention.id;
                        delete retention.id;

                        return e.payrolls_retentions.update({
                            where: { id: id_retention },
                            data: retention
                        });
                    })
                );

                return {
                    payrollResult,
                    retentionsResult: {
                        message: "retentions updated successfully.",
                        data: retentionsResult
                    }
                }
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
                        select: { name: true, ci: true, rol: true, created_at: true }
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
}

export default PayrollsModel;