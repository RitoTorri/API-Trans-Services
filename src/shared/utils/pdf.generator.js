// src/utils/pdfGenerator.js
import puppeteer from 'puppeteer';

async function generarPDF(htmlContenido) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Configurar viewport más grande
    await page.setViewport({
        width: 1240,
        height: 1754,
        deviceScaleFactor: 2 // Más resolución
    });

    await page.setContent(htmlContenido);

    // 👇 CONFIGURACIÓN CRÍTICA PARA EL PDF
    const pdfOptions = {
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: false, // Importante

        // 👇 MÁRGENES MÁS PEQUEÑOS para que no corte
        margin: {
            top: '5mm',    // Reducido de 20mm
            right: '5mm',  // Reducido de 15mm
            bottom: '5mm', // Reducido de 20mm
            left: '5mm'    // Reducido de 15mm
        },
        preferCSSPageSize: true,
        scale: 0.95
    };

    const pdfBuffer = await page.pdf(pdfOptions);
    await browser.close();
    return pdfBuffer;
}

export default generarPDF;