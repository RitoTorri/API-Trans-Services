import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class ReportsModel {
    constructor() { }

    async getAnnualExpensesReport(year) {
        try {
            return await prisma.$queryRaw`
                SELECT EXTRACT(YEAR FROM created_at) || '-' || EXTRACT(MONTH FROM created_at) AS "Fecha", 
                SUM(total) AS "Gasto Mensual" FROM expenses 
                WHERE EXTRACT(YEAR FROM created_at) = ${year}
                GROUP BY("Fecha")
            `
        } catch (error) { throw error; }
    }
}

export default ReportsModel;