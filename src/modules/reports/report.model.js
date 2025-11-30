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

    async getEmployeesWithMoreServices() {
        try {
            return await prisma.$queryRaw`
                SELECT e.name || ' ' || e.lastname AS "Conductor",
                e.ci AS "Cedula",
                COUNT(s.id)::integer AS "Viajes Realizados",
                EXTRACT(YEAR FROM s.start_date) || '-' || EXTRACT(MONTH FROM s.start_date) AS "Fecha de servicios"
                FROM employees e
                INNER JOIN vehicles v ON e.id = v.driver_id
                INNER JOIN services s ON v.id = s.vehicle_id
                WHERE s.payment_status = 'paid' 
                    AND EXTRACT(YEAR FROM s.start_date) = EXTRACT(YEAR FROM CURRENT_DATE)
                    AND EXTRACT(MONTh FROM s.start_date) = EXTRACT(MONTH FROM CURRENT_DATE)
                GROUP BY("Conductor", "Cedula", "Fecha de servicios") ORDER BY "Viajes Realizados" DESC LIMIT 3
            `
        } catch (error) { throw error; }
    }

    async getExpenseDetails(year, month) {
        try {
            return await prisma.$queryRaw`
                SELECT et.name AS "Tipo de gasto",
                EXTRACT(YEAR FROM e.created_at) || '-' || EXTRACT(MONTH FROM e.created_at) AS "Fecha de gasto",
                SUM(e.total) AS "Total" FROM expense_types et
                INNER JOIN expenses e ON et.id = e.id_expense_type
                WHERE EXTRACT(YEAR FROM e.created_at) = ${year} 
                    AND EXTRACT(MONTH FROM e.created_at) = ${month}
                GROUP BY("Tipo de gasto", "Fecha de gasto")
            `
        } catch (error) { throw error; }
    }
}

export default ReportsModel;