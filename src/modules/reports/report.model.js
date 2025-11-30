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

    async getAnnualRevenueReport(year) {
        try {
            return await prisma.$queryRaw`
                SELECT EXTRACT(YEAR FROM date) || '-' || EXTRACT(MONTH FROM date) AS "Fecha", 
                SUM(amount) AS "Ganancia Mensual" FROM revenue 
                WHERE EXTRACT(YEAR FROM date) = ${year}
                GROUP BY("Fecha")
            `
        } catch (error) { throw error; }
    }

    async getClientServiceRanking() {
        try {
            return await prisma.$queryRaw`
                SELECT 
                    c.name AS "Clientes",
                    c.rif AS "Rif",
                    EXTRACT(YEAR FROM s.start_date) || '-' || EXTRACT(MONTH FROM s.start_date) AS "Fecha de servicios",
                    COUNT(s.id)::integer AS "Servicios Solicitados" 
                FROM clients c 
                INNER JOIN services s ON c.id = s.client_id 
                WHERE s.payment_status = 'paid' 
                    AND EXTRACT(YEAR FROM s.start_date) = EXTRACT(YEAR FROM CURRENT_DATE)
                    AND EXTRACT(MONTH FROM s.start_date) = EXTRACT(MONTH FROM CURRENT_DATE)
                GROUP BY c.name, c.rif, EXTRACT(YEAR FROM s.start_date), EXTRACT(MONTH FROM s.start_date)
                ORDER BY "Servicios Solicitados" DESC 
                LIMIT 3;    
            `
        } catch (error) { throw error; }
    }
}

export default ReportsModel;