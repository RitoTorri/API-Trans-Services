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

    async getAnnualExpensesFullReport(year, month) {
        try {
            return await prisma.$queryRaw`
                SELECT EXTRACT(YEAR FROM e.created_at) || '-' || EXTRACT(MONTH FROM e.created_at) || '-' || EXTRACT(DAY FROM e.created_at) AS "Fecha", 
                te.name,
                e.description AS "Descripcion",
                SUM(total) AS "Gasto_Mensual" FROM expenses e
                INNER JOIN expense_types te ON te.id = e.id_expense_type
                WHERE EXTRACT(YEAR FROM e.created_at) = ${year} 
                    AND EXTRACT(MONTH FROM e.created_at) = ${month}
                GROUP BY("Fecha", te.name, "Descripcion")
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

    async getAnnualRevenueFullReport(year, month) {
        try {
            return await prisma.$queryRaw`
                SELECT  EXTRACT(YEAR FROM date) || '-' || EXTRACT(MONTH FROM date) || '-' || EXTRACT(DAY FROM date) AS "Fecha",
                description AS "Descripcion", amount
                FROM revenue WHERE 
                    EXTRACT(YEAR FROM date) = ${year}
                    AND EXTRACT(MONTH FROM date) = ${month}
            `
        } catch (error) { throw error; }
    }

    async getClientServiceRanking(year, month) {
        try {
            return await prisma.$queryRaw`
                SELECT 
                    c.name AS "Clientes",
                    c.rif AS "Rif",
                    ${year} || '-' || ${month} AS "Fecha de servicios",
                    COUNT(s.id)::integer AS "Servicios Solicitados" 
                FROM clients c 
                INNER JOIN services s ON c.id = s.client_id 
                WHERE s.payment_status = 'paid' 
                    AND EXTRACT(YEAR FROM s.start_date) = ${year}
                    AND EXTRACT(MONTH FROM s.start_date) = ${month}
                GROUP BY c.name, c.rif, "Fecha de servicios"
                ORDER BY "Servicios Solicitados" DESC 
                LIMIT 3;    
            `
        } catch (error) { throw error; }
    }

    async getEmployeesWithMoreServices(year, month) {
        try {
            return await prisma.$queryRaw`
                SELECT e.name || ' ' || e.lastname AS "Conductor",
                e.ci AS "Cedula",
                COUNT(s.id)::integer AS "Viajes Realizados",
                ${year} || '-' || ${month} AS "Fecha de servicios"
                FROM employees e
                INNER JOIN vehicles v ON e.id = v.driver_id
                INNER JOIN services s ON v.id = s.vehicle_id
                WHERE s.payment_status = 'paid' 
                    AND EXTRACT(YEAR FROM s.start_date) = ${year}
                    AND EXTRACT(MONTh FROM s.start_date) = ${month}
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

    async getProvidersReport(year, month) {
        try {
            return await prisma.$queryRaw`
                SELECT 
                    p.name AS "Nombre de proveedor",
                    p.rif AS "RIF",
                    TO_CHAR(pi.invoice_date, 'YYYY-MM') AS "Periodo",
                    COUNT(pi.id)::integer AS "Cantidad de compras realizadas",
                    SUM(pi.total_amount)::decimal(10,2) AS "Total de gastos"
                FROM provider_invoices pi
                JOIN providers p ON pi.provider_id = p.id
                WHERE pi.status = 'pagado'
                AND EXTRACT(YEAR FROM pi.invoice_date) = ${year}
                AND EXTRACT(MONTH FROM pi.invoice_date) = ${month}
                GROUP BY p.name, p.rif, "Periodo"
                ORDER BY "Total de gastos" DESC
                LIMIT 3;
            `
        } catch (error) { throw error; }
    }

    // PDFS

    // Este reporte muestra los proveedores a los que se les debe dinero
    async getPdfReportProvidersDebt() {
        try {
            return await prisma.$queryRaw`
                SELECT 
                    p.name AS proveedor,
                    p.rif,
                    STRING_AGG(DISTINCT CASE WHEN pc.contact_info NOT LIKE '%@%' THEN pc.contact_info END, ', ') AS telefonos,
                    STRING_AGG(DISTINCT CASE WHEN pc.contact_info LIKE '%@%' THEN pc.contact_info END, ', ') AS correos,
                    SUM(pi.subtotal) AS subtotal_pendiente,
                    SUM(it.amount) AS impuestos_pendientes,
                    SUM(pi.subtotal + COALESCE(it.amount,0)) AS total_adeudado
                FROM providers p
                JOIN provider_invoices pi ON p.id = pi.provider_id
                LEFT JOIN provider_contacts pc ON p.id = pc.provider_id
                LEFT JOIN invoice_taxes it ON pi.id = it.provider_invoice_id
                WHERE pi.status = 'pendiente'
                GROUP BY p.id, p.name, p.rif;
            `
        } catch (error) { throw error; }
    }

    // Este reporte muestra los datos de todos los proveedores
    async getPdfReportProviders() {
        try {
            return await prisma.$queryRaw`
                SELECT 
                    p.name,
                    p.rif,
                    STRING_AGG(CASE 
                        WHEN pc.contact_info LIKE '%@%' THEN pc.contact_info 
                        ELSE NULL 
                    END, ', ') AS correos,
                    STRING_AGG(CASE 
                        WHEN pc.contact_info NOT LIKE '%@%' THEN pc.contact_info 
                        ELSE NULL 
                    END, ', ') AS telefonos
                FROM providers p
                INNER JOIN provider_contacts pc ON p.id = pc.provider_id
                GROUP BY p.id, p.name, p.rif;
            `
        } catch (error) { throw error; }
    }
}

export default ReportsModel;