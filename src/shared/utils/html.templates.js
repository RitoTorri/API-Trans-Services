const htmlClientsReport = (data) => {
    return `<!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Clientes - Trans Services C.A</title>
        <style>
        /* RESET PARA PDF - Todo más compacto */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }

        body {
            background-color: #ffffff;
            color: #333;
            line-height: 1.4;
            padding: 20px !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            font-size: 12px;
        }

        /* HEADER - Igual al de empleados */
        .header-container {
            display: flex;
            align-items: flex-start;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 2px solid #3498db;
            page-break-inside: avoid !important;
        }

        .logo-container {
            margin-right: 20px;
            position: relative;
        }

        .bus-icon {
            width: 70px;
            height: 70px;
            background-color: #3498db;
            border-radius: 6px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .bus-body {
            width: 50px;
            height: 25px;
            background-color: #ffffff;
            border-radius: 4px;
            position: relative;
        }

        .bus-window {
            position: absolute;
            width: 38px;
            height: 10px;
            background-color: #3498db;
            top: 4px;
            left: 6px;
            border-radius: 2px;
        }

        .bus-wheels {
            position: absolute;
            bottom: -6px;
            width: 100%;
            display: flex;
            justify-content: space-between;
        }

        .bus-wheel {
            width: 10px;
            height: 10px;
            background-color: #2c3e50;
            border-radius: 50%;
        }

        .wheel-left {
            margin-left: 8px;
        }

        .wheel-right {
            margin-right: 8px;
        }

        .header-text {
            display: flex;
            flex-direction: column;
        }

        .header-title {
            display: flex;
            flex-direction: column;
        }

        h1 {
            color: #2c3e50;
            font-size: 2.2rem;
            margin: 0 0 5px 0;
            padding: 0;
            border: none;
            text-align: left;
            font-weight: normal;
        }

        .company-name {
            font-weight: bold;
            color: #2980b9;
            font-size: 1.5rem;
            margin: 0;
            padding: 0;
            text-align: left;
        }

        /* CONTADOR - Igual al de empleados */
        #clientes-cantidad {
            background-color: #f0f7ff;
            padding: 12px 18px;
            border-radius: 5px;
            border-left: 4px solid #3498db;
            margin: 20px 0 25px 0;
            font-weight: 600;
            color: #2c3e50;
            font-size: 1rem;
            line-height: 1.4;
            page-break-inside: avoid;
        }

        /* TABLA - Estilo igual al de empleados */
        table {
            width: 100% !important;
            border-collapse: collapse !important;
            margin: 0 0 30px 0 !important;
            border: 1px solid #e1e1e1;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
            font-size: 13px;
            page-break-inside: auto !important;
        }

        thead {
            background-color: #3498db !important;
            color: white !important;
        }

        th {
            padding: 14px 12px !important;
            text-align: left;
            font-weight: 600;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            font-size: 0.9rem;
            border-right: 1px solid rgba(255, 255, 255, 0.2);
        }

        th:last-child {
            border-right: none;
        }

        tbody tr {
            border-bottom: 1px solid #e1e1e1;
            page-break-inside: avoid !important;
        }

        tbody tr:nth-of-type(even) {
            background-color: #f9f9f9 !important;
        }

        td {
            padding: 12px 10px !important;
            font-size: 0.95rem;
            border-right: 1px solid #f0f0f0;
            line-height: 1.4;
            word-wrap: break-word;
        }

        td:last-child {
            border-right: none;
        }

        /* Estilos específicos para columnas - Similar a empleados */
        td:first-child {
            font-weight: 600;
            color: #2c3e50;
            font-size: 0.9rem;
        }

        td:nth-child(2) {
            color: #2980b9;
        }

        td:nth-child(3) {
            font-family: monospace;
            font-size: 1rem;
        }

        /* Información para PDF - Ocultar en impresión */
        .pdf-info {
            background-color: #f8f9fa;
            padding: 12px;
            border-radius: 5px;
            margin-top: 25px;
            font-size: 0.8rem;
            color: #666;
            border: 1px dashed #ddd;
            text-align: center;
        }

        /* RESPONSIVE - Similar a empleados */
        @media (max-width: 768px) {
            body {
                padding: 15px !important;
            }
            
            .header-container {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .logo-container {
                margin-bottom: 15px;
            }
            
            h1 {
                font-size: 1.8rem;
            }
            
            .company-name {
                font-size: 1.3rem;
            }
            
            table {
                display: block;
                overflow-x: auto;
            }
            
            th, td {
                padding: 10px 8px !important;
                font-size: 0.85rem;
            }
        }

        /* REGLAS ESPECÍFICAS PARA PDF/IMPRESIÓN */
        @page {
            margin: 15mm !important;
            size: A4;
        }

        @media print {
            body {
                padding: 10px !important;
                margin: 0 !important;
                font-size: 11px !important;
            }
            
            .header-container {
                margin-top: 0 !important;
                margin-bottom: 20px !important;
            }
            
            /* Asegurar que fondos se impriman */
            thead {
                background-color: #3498db !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            
            tbody tr:nth-of-type(even) {
                background-color: #f9f9f9 !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            
            /* Eliminar sombras para impresión */
            table {
                box-shadow: none !important;
                border: 1px solid #ccc;
            }
            
            /* Evitar cortes feos en filas */
            tr {
                page-break-inside: avoid;
                page-break-after: auto;
            }
            
            /* Ocultar pie de página en impresión */
            .pdf-info {
                display: none !important;
            }
            
            /* Ajustar tamaños de fuente para impresión */
            h1 {
                font-size: 24pt !important;
            }
            
            .company-name {
                font-size: 18pt !important;
            }
            
            #clientes-cantidad {
                font-size: 11pt !important;
                margin: 15px 0 20px 0 !important;
            }
            
            th {
                font-size: 10pt !important;
                padding: 10px 8px !important;
            }
            
            td {
                font-size: 10pt !important;
                padding: 8px 6px !important;
            }
        }

        /* MEJORAS ESPECÍFICAS PARA CLIENTES */
        /* Ajustar columna de dirección para mejor visualización */
        td:nth-child(4) {
            font-size: 0.9rem;
            line-height: 1.4;
        }
        
        /* Separador de fecha en el contador */
        #clientes-cantidad {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .fecha-generacion {
            color: #7f8c8d;
            font-weight: normal;
            font-size: 0.9rem;
        }
    </style>
    </head>

    <body>
        <div class="header-container">
            <div class="logo-container">
                <div class="bus-icon">
                    <div class="bus-body">
                        <div class="bus-window"></div>
                        <div class="bus-wheels">
                            <div class="bus-wheel wheel-left"></div>
                            <div class="bus-wheel wheel-right"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header-text">
                <div class="header-title">
                    <h1 class="main-title">Trans Services C.A</h1>
                    <p class="company-name">Reporte de Clientes</p>
                </div>
            </div>
        </div>

        <div id="clientes-cantidad">
            <span>Cantidad de clientes: ${data.length}</span>
            <span class="fecha-generacion">Generado: ${new Date().toLocaleString()}</span>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Rif</th>
                    <th>Nombre</th>
                    <th>Contacto</th>
                    <th>Dirección</th>
                </tr>
            </thead>
            <tbody id="clientes-lista">
                ${data.length === 0
            ? `<tr>
                        <td colspan="4" style="text-align: center; padding: 20px; color: #666;">
                            No hay clientes en el sistema
                        </td>
                    </tr>`
            : data.map(item => `
                        <tr>
                            <td>${item.rif || ''}</td>
                            <td>${item.name || ''}</td>
                            <td>${item.contact || ''}</td>
                            <td>${item.address || ''}</td>
                        </tr>
                    `).join('')
        }
            </tbody>
        </table>

        <div class="pdf-info no-print">
            Este documento está optimizado para impresión/PDF | Trans Services C.A
        </div>
    </body>

    </html>
    `
}

const htmlEmployeesReport = (data) => {
    return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Clientes - Trans Services C.A</title>
        <style>
            /* Estilos generales - IDENTICO AL ANTERIOR */
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }

            body {
                background-color: #ffffff;
                color: #333;
                line-height: 1.6;
                padding: 30px;
                max-width: 1200px;
                margin: 0 auto;
            }

            /* Encabezado con logo y texto - IDENTICO */
            .header-container {
                display: flex;
                align-items: flex-start;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid #3498db;
            }

            .logo-container {
                margin-right: 25px;
                position: relative;
            }

            .bus-icon {
                width: 80px;
                height: 80px;
                background-color: #3498db;
                border-radius: 8px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            /* Dibujo del camión/bus - IDENTICO */
            .bus-body {
                width: 60px;
                height: 30px;
                background-color: #ffffff;
                border-radius: 5px;
                position: relative;
            }

            .bus-window {
                position: absolute;
                width: 45px;
                height: 12px;
                background-color: #3498db;
                top: 5px;
                left: 8px;
                border-radius: 2px;
            }

            .bus-wheels {
                position: absolute;
                bottom: -8px;
                width: 100%;
                display: flex;
                justify-content: space-between;
            }

            .bus-wheel {
                width: 12px;
                height: 12px;
                background-color: #2c3e50;
                border-radius: 50%;
            }

            .wheel-left {
                margin-left: 10px;
            }

            .wheel-right {
                margin-right: 10px;
            }

            .header-text {
                display: flex;
                flex-direction: column;
            }

            .header-title {
                display: flex;
                flex-direction: column;
            }

            .main-title {
                color: #2c3e50;
                font-size: 2.4rem;
                margin: 0 0 8px 0;
                padding: 0;
                border: none;
                text-align: left;
            }

            .report-title {
                font-weight: bold;
                color: #2980b9;
                font-size: 1.8rem;
                margin: 0;
                padding: 0;
                text-align: left;
            }

            /* Contador de empleados - IGUAL al anterior pero con nombre cambiado */
            #clientes-cantidad {
                background-color: #f0f7ff;
                padding: 12px 18px;
                border-radius: 5px;
                border-left: 4px solid #3498db;
                margin: 25px 0;
                font-weight: 600;
                color: #2c3e50;
                font-size: 1.1rem;
            }

            /* Estilos de la tabla - EXACTAMENTE IGUAL */
            table {
                width: 100%;
                border-collapse: collapse;
                margin: 25px 0;
                border: 1px solid #e1e1e1;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
            }

            thead {
                background-color: #3498db;
                color: white;
            }

            th {
                padding: 16px 14px;
                text-align: left;
                font-weight: 600;
                letter-spacing: 0.5px;
                text-transform: uppercase;
                font-size: 0.95rem;
                border-right: 1px solid rgba(255, 255, 255, 0.2);
            }

            th:last-child {
                border-right: none;
            }

            tbody tr {
                border-bottom: 1px solid #e1e1e1;
            }

            tbody tr:nth-of-type(even) {
                background-color: #f9f9f9;
            }

            td {
                padding: 15px 14px;
                font-size: 1rem;
                border-right: 1px solid #f0f0f0;
            }

            td:last-child {
                border-right: none;
            }

            /* Estilos específicos para columnas - Mismo patrón */
            td:first-child {
                font-weight: 600;
                color: #2c3e50;
            }

            td:nth-child(2) {
                color: #2980b9;
            }

            td:nth-child(3) {
                font-family: monospace;
                font-size: 1.05rem;
            }

            /* Para las columnas adicionales */
            td:nth-child(4) {
                color: #2c3e50;
                font-weight: 600;
            }

            td:nth-child(5),
            td:nth-child(6) {
                font-family: monospace;
                font-size: 1.05rem;
            }

            /* Información para PDF - IDENTICO */
            .pdf-info {
                background-color: #f8f9fa;
                padding: 15px;
                border-radius: 5px;
                margin-top: 30px;
                font-size: 0.9rem;
                color: #666;
                border: 1px dashed #ddd;
                text-align: center;
            }

            /* Responsividad mínima - IGUAL */
            @media (max-width: 768px) {
                body {
                    padding: 20px;
                }

                .header-container {
                    flex-direction: column;
                    align-items: flex-start;
                }

                .logo-container {
                    margin-bottom: 15px;
                }

                .main-title {
                    font-size: 2rem;
                }

                .report-title {
                    font-size: 1.5rem;
                }
            }

            /* Estilos para impresión/PDF - IDENTICO */
            @media print {
                body {
                    padding: 20px;
                }

                .pdf-info {
                    display: none;
                }

                table {
                    box-shadow: none;
                    border: 1px solid #ccc;
                }

                thead {
                    background-color: #e0e0e0 !important;
                    color: #000;
                    -webkit-print-color-adjust: exact;
                }
            }

            /* NOTA: He cambiado los th dentro de tbody por td para mantener consistencia */
            /* Si necesitas th, deberías cambiar los estilos */
        </style>
    </head>

    <body>
        <div class="header-container">
            <div class="logo-container">
                <div class="bus-icon">
                    <div class="bus-body">
                        <div class="bus-window"></div>
                        <div class="bus-wheels">
                            <div class="bus-wheel wheel-left"></div>
                            <div class="bus-wheel wheel-right"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header-text">
                <div class="header-title">
                    <h1 class="main-title">Trans Services C.A</h1>
                    <p class="report-title">Reporte de Empleados</p>
                </div>
            </div>
        </div>

        <p id="clientes-cantidad">Cantidad de empleados: ${data.length} | Generado: ${new Date().toLocaleString()}</p>

        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Cédula</th>
                    <th>Cargo</th>
                    <th>Correo</th>
                    <th>Telefono</th>
                </tr>
            </thead>
            <tbody id="clientes-lista">
            ${data && data.length > 0
            ? data.map(item => {
                // Inicializar variables para correo y teléfono
                let email = '';
                let phone = '';

                // Procesar los contactos si existen
                if (item.employee_contacts && Array.isArray(item.employee_contacts)) {
                    item.employee_contacts.forEach(contact => {
                        if (contact.contact_info) {
                            // Detectar si es correo (contiene @) o teléfono
                            if (contact.contact_info.includes('@')) {
                                email = contact.contact_info;
                            } else {
                                phone = contact.contact_info;
                            }
                        }
                    });
                }

                return `
                        <tr>
                            <td>${item.name || ''}</td>
                            <td>${item.lastname || ''}</td>
                            <td>${item.ci || ''}</td>
                            <td>${item.rol || ''}</td>
                            <td>${email}</td>
                            <td>${phone}</td>
                        </tr>
                    `;
            }).join('')
            : `<tr>
                    <td colspan="10" style="text-align: center; padding: 30px; color: #666;">
                        No hay empleados en el sistema
                    </td>
                </tr>`
        }
        </tbody>
        </table>

        <div class="pdf-info">
            Este documento está optimizado para impresión/PDF | Trans Services C.A
        </div>
    </body>

    </html>
    `
}

const htmlProvidersReport = (data) => {
    return `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reporte de Gastos - Trans Services C.A</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }

                body {
                    background-color: #ffffff;
                    color: #333;
                    line-height: 1.4;
                    padding: 20px !important;
                    margin: 0 !important;
                    width: 100% !important;
                    max-width: 100% !important;
                    font-size: 12px;
                }

                .header-container {
                    display: flex;
                    align-items: flex-start;
                    margin-bottom: 25px;
                    padding-bottom: 15px;
                    border-bottom: 2px solid #3498db;
                    page-break-inside: avoid !important;
                }

                .logo-container {
                    margin-right: 20px;
                    position: relative;
                }

                .bus-icon {
                    width: 70px;
                    height: 70px;
                    background-color: #3498db;
                    border-radius: 6px;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .bus-body {
                    width: 50px;
                    height: 25px;
                    background-color: #ffffff;
                    border-radius: 4px;
                    position: relative;
                }

                .bus-window {
                    position: absolute;
                    width: 38px;
                    height: 10px;
                    background-color: #3498db;
                    top: 4px;
                    left: 6px;
                    border-radius: 2px;
                }

                .bus-wheels {
                    position: absolute;
                    bottom: -6px;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                }

                .bus-wheel {
                    width: 10px;
                    height: 10px;
                    background-color: #2c3e50;
                    border-radius: 50%;
                }

                .wheel-left {
                    margin-left: 8px;
                }

                .wheel-right {
                    margin-right: 8px;
                }

                .header-text {
                    display: flex;
                    flex-direction: column;
                }

                .header-title {
                    display: flex;
                    flex-direction: column;
                }

                h1 {
                    color: #2c3e50;
                    font-size: 2.2rem;
                    margin: 0 0 5px 0;
                    padding: 0;
                    border: none;
                    text-align: left;
                    font-weight: normal;
                }

                .company-name {
                    font-weight: bold;
                    color: #2980b9;
                    font-size: 1.5rem;
                    margin: 0;
                    padding: 0;
                    text-align: left;
                }

                #clientes-cantidad {
                    background-color: #f0f7ff;
                    padding: 12px 18px;
                    border-radius: 5px;
                    border-left: 4px solid #3498db;
                    margin: 20px 0 25px 0;
                    font-weight: 600;
                    color: #2c3e50;
                    font-size: 1rem;
                    line-height: 1.4;
                    page-break-inside: avoid;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .fecha-generacion {
                    color: #7f8c8d;
                    font-weight: normal;
                    font-size: 0.9rem;
                }

                table {
                    width: 100% !important;
                    border-collapse: collapse !important;
                    margin: 0 0 30px 0 !important;
                    border: 1px solid #e1e1e1;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
                    font-size: 13px;
                    page-break-inside: auto !important;
                }

                thead {
                    background-color: #3498db !important;
                    color: white !important;
                }

                th {
                    padding: 14px 12px !important;
                    text-align: left;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                    font-size: 0.9rem;
                    border-right: 1px solid rgba(255, 255, 255, 0.2);
                }

                th:last-child {
                    border-right: none;
                }

                tbody tr {
                    border-bottom: 1px solid #e1e1e1;
                    page-break-inside: avoid !important;
                }

                tbody tr:nth-of-type(even) {
                    background-color: #f9f9f9 !important;
                }

                td {
                    padding: 12px 10px !important;
                    font-size: 0.95rem;
                    border-right: 1px solid #f0f0f0;
                    line-height: 1.4;
                    word-wrap: break-word;
                    text-align: left !important; /* CORRECCIÓN: Alineación izquierda para todas las celdas */
                }

                td:last-child {
                    border-right: none;
                    /* text-align: right; */ /* ESTO FUE ELIMINADO/COMENTADO */
                    font-family: inherit; /* Cambiado de monospace a la fuente normal */
                    font-weight: normal; /* Cambiado de 500 a normal */
                }

                .total-row {
                    background-color: #e8f4fd !important;
                    border-top: 2px solid #3498db !important;
                    font-weight: bold !important;
                }

                .total-row td {
                    padding: 14px 12px !important;
                    font-weight: bold !important;
                }

                .pdf-info {
                    background-color: #f8f9fa;
                    padding: 12px;
                    border-radius: 5px;
                    margin-top: 25px;
                    font-size: 0.8rem;
                    color: #666;
                    border: 1px dashed #ddd;
                    text-align: center;
                }

                @media (max-width: 768px) {
                    body {
                        padding: 15px !important;
                    }

                    .header-container {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .logo-container {
                        margin-bottom: 15px;
                    }

                    h1 {
                        font-size: 1.8rem;
                    }

                    .company-name {
                        font-size: 1.3rem;
                    }

                    table {
                        display: block;
                        overflow-x: auto;
                    }

                    th,
                    td {
                        padding: 10px 8px !important;
                        font-size: 0.85rem;
                    }
                }

                @page {
                    margin: 15mm !important;
                    size: A4;
                }

                @media print {
                    body {
                        padding: 10px !important;
                        margin: 0 !important;
                        font-size: 11px !important;
                    }

                    .header-container {
                        margin-top: 0 !important;
                        margin-bottom: 20px !important;
                    }

                    thead {
                        background-color: #3498db !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }

                    tbody tr:nth-of-type(even) {
                        background-color: #f9f9f9 !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }

                    table {
                        box-shadow: none !important;
                        border: 1px solid #ccc;
                    }

                    tr {
                        page-break-inside: avoid;
                        page-break-after: auto;
                    }

                    .pdf-info {
                        display: none !important;
                    }

                    h1 {
                        font-size: 24pt !important;
                    }

                    .company-name {
                        font-size: 18pt !important;
                    }

                    #clientes-cantidad {
                        font-size: 11pt !important;
                        margin: 15px 0 20px 0 !important;
                    }

                    th {
                        font-size: 10pt !important;
                        padding: 10px 8px !important;
                    }

                    td {
                        font-size: 10pt !important;
                        padding: 8px 6px !important;
                    }
                }
            </style>
        </head>

        <body>
            <div class="header-container">
                <div class="logo-container">
                    <div class="bus-icon">
                        <div class="bus-body">
                            <div class="bus-window"></div>
                            <div class="bus-wheels">
                                <div class="bus-wheel wheel-left"></div>
                                <div class="bus-wheel wheel-right"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="header-text">
                    <div class="header-title">
                        <h1 class="main-title">Trans Services C.A</h1>
                        <p class="company-name">Reporte de Proveedores</p>
                    </div>
                </div>
            </div>

            <div id="clientes-cantidad">
                <span>Cantidad de registros: ${data ? data.length : 0}</span>
                <span class="fecha-generacion">Generado: ${new Date().toLocaleString()}</span>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>RIF</th>
                        <th>Correo</th>
                        <th>Telefono</th>
                    </tr>
                </thead>
                <tbody id="clientes-lista">
                    ${data && data.length > 0
            ? data.map(item => {
                return `
                        <tr>
                            <td>${item.name || ''}</td>
                            <td>${item.rif || ''}</td>
                            <td>${item.correos || ''}</td>
                            <td>${item.telefonos || ''}</td>
                        </tr>
                    `;
            }).join('')
            : `<tr>
                        <td colspan="4" style="text-align: center; padding: 30px; color: #666;">
                            No hay proveedores a los que se les debe dinero
                        </td>
                    </tr>`
        }
                </tbody>
            </table>

            <div class="pdf-info no-print">
                Este documento está optimizado para impresión/PDF | Trans Services C.A
            </div>
        </body>

        </html>
    `
}

const htmlVehiclesReport = (data) => {
    return `<!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Clientes - Trans Services C.A</title>
            <style>
                /* RESET PARA PDF - Todo más compacto */
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }

                body {
                    background-color: #ffffff;
                    color: #333;
                    line-height: 1.4;
                    padding: 20px !important;
                    margin: 0 !important;
                    width: 100% !important;
                    max-width: 100% !important;
                    font-size: 12px;
                }

                /* HEADER - Igual al de empleados */
                .header-container {
                    display: flex;
                    align-items: flex-start;
                    margin-bottom: 25px;
                    padding-bottom: 15px;
                    border-bottom: 2px solid #3498db;
                    page-break-inside: avoid !important;
                }

                .logo-container {
                    margin-right: 20px;
                    position: relative;
                }

                .bus-icon {
                    width: 70px;
                    height: 70px;
                    background-color: #3498db;
                    border-radius: 6px;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .bus-body {
                    width: 50px;
                    height: 25px;
                    background-color: #ffffff;
                    border-radius: 4px;
                    position: relative;
                }

                .bus-window {
                    position: absolute;
                    width: 38px;
                    height: 10px;
                    background-color: #3498db;
                    top: 4px;
                    left: 6px;
                    border-radius: 2px;
                }

                .bus-wheels {
                    position: absolute;
                    bottom: -6px;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                }

                .bus-wheel {
                    width: 10px;
                    height: 10px;
                    background-color: #2c3e50;
                    border-radius: 50%;
                }

                .wheel-left {
                    margin-left: 8px;
                }

                .wheel-right {
                    margin-right: 8px;
                }

                .header-text {
                    display: flex;
                    flex-direction: column;
                }

                .header-title {
                    display: flex;
                    flex-direction: column;
                }

                h1 {
                    color: #2c3e50;
                    font-size: 2.2rem;
                    margin: 0 0 5px 0;
                    padding: 0;
                    border: none;
                    text-align: left;
                    font-weight: normal;
                }

                .company-name {
                    font-weight: bold;
                    color: #2980b9;
                    font-size: 1.5rem;
                    margin: 0;
                    padding: 0;
                    text-align: left;
                }

                /* CONTADOR - Igual al de empleados */
                #clientes-cantidad {
                    background-color: #f0f7ff;
                    padding: 12px 18px;
                    border-radius: 5px;
                    border-left: 4px solid #3498db;
                    margin: 20px 0 25px 0;
                    font-weight: 600;
                    color: #2c3e50;
                    font-size: 1rem;
                    line-height: 1.4;
                    page-break-inside: avoid;
                }

                /* TABLA - Estilo igual al de empleados */
                table {
                    width: 100% !important;
                    border-collapse: collapse !important;
                    margin: 0 0 30px 0 !important;
                    border: 1px solid #e1e1e1;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
                    font-size: 13px;
                    page-break-inside: auto !important;
                }

                thead {
                    background-color: #3498db !important;
                    color: white !important;
                }

                th {
                    padding: 14px 12px !important;
                    text-align: left;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                    font-size: 0.9rem;
                    border-right: 1px solid rgba(255, 255, 255, 0.2);
                }

                th:last-child {
                    border-right: none;
                }

                tbody tr {
                    border-bottom: 1px solid #e1e1e1;
                    page-break-inside: avoid !important;
                }

                tbody tr:nth-of-type(even) {
                    background-color: #f9f9f9 !important;
                }

                td {
                    padding: 12px 10px !important;
                    font-size: 0.95rem;
                    border-right: 1px solid #f0f0f0;
                    line-height: 1.4;
                    word-wrap: break-word;
                }

                td:last-child {
                    border-right: none;
                }

                /* Estilos específicos para columnas - Similar a empleados */
                td:first-child {
                    font-weight: 600;
                    color: #2c3e50;
                    font-size: 0.9rem;
                }

                td:nth-child(2) {
                    color: #2980b9;
                }

                td:nth-child(3) {
                    font-family: monospace;
                    font-size: 1rem;
                }

                /* Información para PDF - Ocultar en impresión */
                .pdf-info {
                    background-color: #f8f9fa;
                    padding: 12px;
                    border-radius: 5px;
                    margin-top: 25px;
                    font-size: 0.8rem;
                    color: #666;
                    border: 1px dashed #ddd;
                    text-align: center;
                }

                /* RESPONSIVE - Similar a empleados */
                @media (max-width: 768px) {
                    body {
                        padding: 15px !important;
                    }

                    .header-container {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .logo-container {
                        margin-bottom: 15px;
                    }

                    h1 {
                        font-size: 1.8rem;
                    }

                    .company-name {
                        font-size: 1.3rem;
                    }

                    table {
                        display: block;
                        overflow-x: auto;
                    }

                    th,
                    td {
                        padding: 10px 8px !important;
                        font-size: 0.85rem;
                    }
                }

                /* REGLAS ESPECÍFICAS PARA PDF/IMPRESIÓN */
                @page {
                    margin: 15mm !important;
                    size: A4;
                }

                @media print {
                    body {
                        padding: 10px !important;
                        margin: 0 !important;
                        font-size: 11px !important;
                    }

                    .header-container {
                        margin-top: 0 !important;
                        margin-bottom: 20px !important;
                    }

                    /* Asegurar que fondos se impriman */
                    thead {
                        background-color: #3498db !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }

                    tbody tr:nth-of-type(even) {
                        background-color: #f9f9f9 !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }

                    /* Eliminar sombras para impresión */
                    table {
                        box-shadow: none !important;
                        border: 1px solid #ccc;
                    }

                    /* Evitar cortes feos en filas */
                    tr {
                        page-break-inside: avoid;
                        page-break-after: auto;
                    }

                    /* Ocultar pie de página en impresión */
                    .pdf-info {
                        display: none !important;
                    }

                    /* Ajustar tamaños de fuente para impresión */
                    h1 {
                        font-size: 24pt !important;
                    }

                    .company-name {
                        font-size: 18pt !important;
                    }

                    #clientes-cantidad {
                        font-size: 11pt !important;
                        margin: 15px 0 20px 0 !important;
                    }

                    th {
                        font-size: 10pt !important;
                        padding: 10px 8px !important;
                    }

                    td {
                        font-size: 10pt !important;
                        padding: 8px 6px !important;
                    }
                }

                /* MEJORAS ESPECÍFICAS PARA CLIENTES */
                /* Ajustar columna de dirección para mejor visualización */
                td:nth-child(4) {
                    font-size: 0.9rem;
                    line-height: 1.4;
                }

                /* Separador de fecha en el contador */
                #clientes-cantidad {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .fecha-generacion {
                    color: #7f8c8d;
                    font-weight: normal;
                    font-size: 0.9rem;
                }
            </style>
        </head>

        <body>
            <div class="header-container">
                <div class="logo-container">
                    <div class="bus-icon">
                        <div class="bus-body">
                            <div class="bus-window"></div>
                            <div class="bus-wheels">
                                <div class="bus-wheel wheel-left"></div>
                                <div class="bus-wheel wheel-right"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="header-text">
                    <div class="header-title">
                        <h1 class="main-title">Trans Services C.A</h1>
                        <p class="company-name">Reporte de Flota Vehicular</p>
                    </div>
                </div>
            </div>

            <div id="clientes-cantidad">
                <span>Cantidad de vehiculos: ${data.length}</span>
                <span class="fecha-generacion">Generado: ${new Date().toLocaleString()}</span>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Conductor</th>
                        <th>Modelo de transporte</th>
                        <th>Placa</th>
                        <th>Asientos disponibles</th>
                        <th>TIpo de vehiculo</th>
                    </tr>
                </thead>
                <tbody id="clientes-lista">
                ${data && data.length > 0
            ? data.map(item => `
                        <tr>
                            <td>${item.employees && item.employees.name && item.employees.lastname
                    ? `${item.employees.name} ${item.employees.lastname}`
                    : 'No asignado'}</td>
                            <td>${item.model || 'N/A'}</td>
                            <td>${item.license_plate || 'N/A'}</td>
                            <td>${item.total_seats || '0'}</td>
                            <td>${item.vehicle_types && item.vehicle_types.type_name
                    ? item.vehicle_types.type_name
                    : 'No especificado'}</td>
                        </tr>
                    `).join('')
            : `<tr>
                        <td colspan="5" style="text-align: center; padding: 30px; color: #666;">
                            No hay vehículos registrados en el sistema
                        </td>
                    </tr>`
        }
            </tbody>
            </table>

            <div class="pdf-info no-print">
                Este documento está optimizado para impresión/PDF | Trans Services C.A
            </div>
        </body>
        </html>`
}

const htmlExpensesReport = (data) => {
    return `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Clientes - Trans Services C.A</title>
            <style>
                /* RESET PARA PDF - Todo más compacto */
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }

                body {
                    background-color: #ffffff;
                    color: #333;
                    line-height: 1.4;
                    padding: 20px !important;
                    margin: 0 !important;
                    width: 100% !important;
                    max-width: 100% !important;
                    font-size: 12px;
                }

                /* HEADER - Igual al de empleados */
                .header-container {
                    display: flex;
                    align-items: flex-start;
                    margin-bottom: 25px;
                    padding-bottom: 15px;
                    border-bottom: 2px solid #3498db;
                    page-break-inside: avoid !important;
                }

                .logo-container {
                    margin-right: 20px;
                    position: relative;
                }

                .bus-icon {
                    width: 70px;
                    height: 70px;
                    background-color: #3498db;
                    border-radius: 6px;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .bus-body {
                    width: 50px;
                    height: 25px;
                    background-color: #ffffff;
                    border-radius: 4px;
                    position: relative;
                }

                .bus-window {
                    position: absolute;
                    width: 38px;
                    height: 10px;
                    background-color: #3498db;
                    top: 4px;
                    left: 6px;
                    border-radius: 2px;
                }

                .bus-wheels {
                    position: absolute;
                    bottom: -6px;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                }

                .bus-wheel {
                    width: 10px;
                    height: 10px;
                    background-color: #2c3e50;
                    border-radius: 50%;
                }

                .wheel-left {
                    margin-left: 8px;
                }

                .wheel-right {
                    margin-right: 8px;
                }

                .header-text {
                    display: flex;
                    flex-direction: column;
                }

                .header-title {
                    display: flex;
                    flex-direction: column;
                }

                h1 {
                    color: #2c3e50;
                    font-size: 2.2rem;
                    margin: 0 0 5px 0;
                    padding: 0;
                    border: none;
                    text-align: left;
                    font-weight: normal;
                }

                .company-name {
                    font-weight: bold;
                    color: #2980b9;
                    font-size: 1.5rem;
                    margin: 0;
                    padding: 0;
                    text-align: left;
                }

                /* CONTADOR - Igual al de empleados */
                #clientes-cantidad {
                    background-color: #f0f7ff;
                    padding: 12px 18px;
                    border-radius: 5px;
                    border-left: 4px solid #3498db;
                    margin: 20px 0 25px 0;
                    font-weight: 600;
                    color: #2c3e50;
                    font-size: 1rem;
                    line-height: 1.4;
                    page-break-inside: avoid;
                }

                /* TABLA - Estilo igual al de empleados */
                table {
                    width: 100% !important;
                    border-collapse: collapse !important;
                    margin: 0 0 30px 0 !important;
                    border: 1px solid #e1e1e1;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
                    font-size: 13px;
                    page-break-inside: auto !important;
                }

                thead {
                    background-color: #3498db !important;
                    color: white !important;
                }

                th {
                    padding: 14px 12px !important;
                    text-align: left;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                    font-size: 0.9rem;
                    border-right: 1px solid rgba(255, 255, 255, 0.2);
                }

                th:last-child {
                    border-right: none;
                }

                tbody tr {
                    border-bottom: 1px solid #e1e1e1;
                    page-break-inside: avoid !important;
                }

                tbody tr:nth-of-type(even) {
                    background-color: #f9f9f9 !important;
                }

                td {
                    padding: 12px 10px !important;
                    font-size: 0.95rem;
                    border-right: 1px solid #f0f0f0;
                    line-height: 1.4;
                    word-wrap: break-word;
                }

                td:last-child {
                    border-right: none;
                }

                /* Estilos específicos para columnas - Similar a empleados */
                td:first-child {
                    font-weight: 600;
                    color: #2c3e50;
                    font-size: 0.9rem;
                }

                td:nth-child(2) {
                    color: #2980b9;
                }

                td:nth-child(3) {
                    font-family: monospace;
                    font-size: 1rem;
                }

                /* Información para PDF - Ocultar en impresión */
                .pdf-info {
                    background-color: #f8f9fa;
                    padding: 12px;
                    border-radius: 5px;
                    margin-top: 25px;
                    font-size: 0.8rem;
                    color: #666;
                    border: 1px dashed #ddd;
                    text-align: center;
                }

                /* RESPONSIVE - Similar a empleados */
                @media (max-width: 768px) {
                    body {
                        padding: 15px !important;
                    }

                    .header-container {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .logo-container {
                        margin-bottom: 15px;
                    }

                    h1 {
                        font-size: 1.8rem;
                    }

                    .company-name {
                        font-size: 1.3rem;
                    }

                    table {
                        display: block;
                        overflow-x: auto;
                    }

                    th,
                    td {
                        padding: 10px 8px !important;
                        font-size: 0.85rem;
                    }
                }

                /* REGLAS ESPECÍFICAS PARA PDF/IMPRESIÓN */
                @page {
                    margin: 15mm !important;
                    size: A4;
                }

                @media print {
                    body {
                        padding: 10px !important;
                        margin: 0 !important;
                        font-size: 11px !important;
                    }

                    .header-container {
                        margin-top: 0 !important;
                        margin-bottom: 20px !important;
                    }

                    /* Asegurar que fondos se impriman */
                    thead {
                        background-color: #3498db !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }

                    tbody tr:nth-of-type(even) {
                        background-color: #f9f9f9 !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }

                    /* Eliminar sombras para impresión */
                    table {
                        box-shadow: none !important;
                        border: 1px solid #ccc;
                    }

                    /* Evitar cortes feos en filas */
                    tr {
                        page-break-inside: avoid;
                        page-break-after: auto;
                    }

                    /* Ocultar pie de página en impresión */
                    .pdf-info {
                        display: none !important;
                    }

                    /* Ajustar tamaños de fuente para impresión */
                    h1 {
                        font-size: 24pt !important;
                    }

                    .company-name {
                        font-size: 18pt !important;
                    }

                    #clientes-cantidad {
                        font-size: 11pt !important;
                        margin: 15px 0 20px 0 !important;
                    }

                    th {
                        font-size: 10pt !important;
                        padding: 10px 8px !important;
                    }

                    td {
                        font-size: 10pt !important;
                        padding: 8px 6px !important;
                    }
                }

                /* MEJORAS ESPECÍFICAS PARA CLIENTES */
                /* Ajustar columna de dirección para mejor visualización */
                td:nth-child(4) {
                    font-size: 0.9rem;
                    line-height: 1.4;
                }

                /* Separador de fecha en el contador */
                #clientes-cantidad {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .fecha-generacion {
                    color: #7f8c8d;
                    font-weight: normal;
                    font-size: 0.9rem;
                }
            </style>
        </head>

        <body>
            <div class="header-container">
                <div class="logo-container">
                    <div class="bus-icon">
                        <div class="bus-body">
                            <div class="bus-window"></div>
                            <div class="bus-wheels">
                                <div class="bus-wheel wheel-left"></div>
                                <div class="bus-wheel wheel-right"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="header-text">
                    <div class="header-title">
                        <h1 class="main-title">Trans Services C.A</h1>
                        <p class="company-name">Reporte de Gastos</p>
                    </div>
                </div>
            </div>

            <div id="clientes-cantidad">
                <span>Cantidad de registros: ${data.length}</span><tr>
                <span class="fecha-generacion">Generado: ${new Date().toLocaleString()}</span><tr>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Fecha del Gasto</th>
                        <th>Tipo de Gasto</th>
                        <th>Descripción</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody id="clientes-lista">
                ${(() => {
            if (!data || data.length === 0) {
                return `<tr><td colspan="4">No hay gastos realizados para esta fecha</td></tr>`;
            } else {
                // Calcular el total
                let total = 0;
                data.forEach(item => {
                    // Asegurar que Gasto_Mensual sea un número
                    const gasto = parseFloat(item.Gasto_Mensual) || 0;
                    total += gasto;
                });

                // Generar filas de datos
                const filas = data.map(item => `
                            <tr>
                                <td>${item.Fecha || ''}</td>
                                <td>${item.name || ''}</td>
                                <td>${item.Descripcion || ''}</td>
                                <td>${item.Gasto_Mensual || '0.00'} Bs</td>
                            </tr>
                        `).join('');

                // Agregar fila del total
                const filaTotal = `
                            <tr class="total-row">
                                <td colspan="3" style="text-align: right; font-weight: bold;">Total:</td>
                                <td style="font-weight: bold;">${total.toFixed(2)}</td>
                            </tr>`;

                return filas + filaTotal;
            }
        })()}
            </tbody>
            </table>

            <div class="pdf-info no-print">
                Este documento está optimizado para impresión/PDF | Trans Services C.A
            </div>
        </body>

        </html>
    `
}


const htmlRevenueReport = (data) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reporte de Gastos - Trans Services C.A</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }

            body {
                background-color: #ffffff;
                color: #333;
                line-height: 1.4;
                padding: 20px !important;
                margin: 0 !important;
                width: 100% !important;
                max-width: 100% !important;
                font-size: 12px;
            }

            .header-container {
                display: flex;
                align-items: flex-start;
                margin-bottom: 25px;
                padding-bottom: 15px;
                border-bottom: 2px solid #3498db;
                page-break-inside: avoid !important;
            }

            .logo-container {
                margin-right: 20px;
                position: relative;
            }

            .bus-icon {
                width: 70px;
                height: 70px;
                background-color: #3498db;
                border-radius: 6px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .bus-body {
                width: 50px;
                height: 25px;
                background-color: #ffffff;
                border-radius: 4px;
                position: relative;
            }

            .bus-window {
                position: absolute;
                width: 38px;
                height: 10px;
                background-color: #3498db;
                top: 4px;
                left: 6px;
                border-radius: 2px;
            }

            .bus-wheels {
                position: absolute;
                bottom: -6px;
                width: 100%;
                display: flex;
                justify-content: space-between;
            }

            .bus-wheel {
                width: 10px;
                height: 10px;
                background-color: #2c3e50;
                border-radius: 50%;
            }

            .wheel-left {
                margin-left: 8px;
            }

            .wheel-right {
                margin-right: 8px;
            }

            .header-text {
                display: flex;
                flex-direction: column;
            }

            .header-title {
                display: flex;
                flex-direction: column;
            }

            h1 {
                color: #2c3e50;
                font-size: 2.2rem;
                margin: 0 0 5px 0;
                padding: 0;
                border: none;
                text-align: left;
                font-weight: normal;
            }

            .company-name {
                font-weight: bold;
                color: #2980b9;
                font-size: 1.5rem;
                margin: 0;
                padding: 0;
                text-align: left;
            }

            #clientes-cantidad {
                background-color: #f0f7ff;
                padding: 12px 18px;
                border-radius: 5px;
                border-left: 4px solid #3498db;
                margin: 20px 0 25px 0;
                font-weight: 600;
                color: #2c3e50;
                font-size: 1rem;
                line-height: 1.4;
                page-break-inside: avoid;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .fecha-generacion {
                color: #7f8c8d;
                font-weight: normal;
                font-size: 0.9rem;
            }

            table {
                width: 100% !important;
                border-collapse: collapse !important;
                margin: 0 0 30px 0 !important;
                border: 1px solid #e1e1e1;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
                font-size: 13px;
                page-break-inside: auto !important;
            }

            thead {
                background-color: #3498db !important;
                color: white !important;
            }

            th {
                padding: 14px 12px !important;
                text-align: left;
                font-weight: 600;
                letter-spacing: 0.5px;
                text-transform: uppercase;
                font-size: 0.9rem;
                border-right: 1px solid rgba(255, 255, 255, 0.2);
            }

            th:last-child {
                border-right: none;
            }

            tbody tr {
                border-bottom: 1px solid #e1e1e1;
                page-break-inside: avoid !important;
            }

            tbody tr:nth-of-type(even) {
                background-color: #f9f9f9 !important;
            }

            td {
                padding: 12px 10px !important;
                font-size: 0.95rem;
                border-right: 1px solid #f0f0f0;
                line-height: 1.4;
                word-wrap: break-word;
            }

            td:last-child {
                border-right: none;
                text-align: right;
                font-family: monospace;
                font-weight: 500;
            }

            .total-row {
                background-color: #e8f4fd !important;
                border-top: 2px solid #3498db !important;
                font-weight: bold !important;
            }

            .total-row td {
                padding: 14px 12px !important;
                font-weight: bold !important;
            }

            .pdf-info {
                background-color: #f8f9fa;
                padding: 12px;
                border-radius: 5px;
                margin-top: 25px;
                font-size: 0.8rem;
                color: #666;
                border: 1px dashed #ddd;
                text-align: center;
            }

            @media (max-width: 768px) {
                body {
                    padding: 15px !important;
                }

                .header-container {
                    flex-direction: column;
                    align-items: flex-start;
                }

                .logo-container {
                    margin-bottom: 15px;
                }

                h1 {
                    font-size: 1.8rem;
                }

                .company-name {
                    font-size: 1.3rem;
                }

                table {
                    display: block;
                    overflow-x: auto;
                }

                th, td {
                    padding: 10px 8px !important;
                    font-size: 0.85rem;
                }
            }

            @page {
                margin: 15mm !important;
                size: A4;
            }

            @media print {
                body {
                    padding: 10px !important;
                    margin: 0 !important;
                    font-size: 11px !important;
                }

                .header-container {
                    margin-top: 0 !important;
                    margin-bottom: 20px !important;
                }

                thead {
                    background-color: #3498db !important;
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }

                tbody tr:nth-of-type(even) {
                    background-color: #f9f9f9 !important;
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }

                table {
                    box-shadow: none !important;
                    border: 1px solid #ccc;
                }

                tr {
                    page-break-inside: avoid;
                    page-break-after: auto;
                }

                .pdf-info {
                    display: none !important;
                }

                h1 {
                    font-size: 24pt !important;
                }

                .company-name {
                    font-size: 18pt !important;
                }

                #clientes-cantidad {
                    font-size: 11pt !important;
                    margin: 15px 0 20px 0 !important;
                }

                th {
                    font-size: 10pt !important;
                    padding: 10px 8px !important;
                }

                td {
                    font-size: 10pt !important;
                    padding: 8px 6px !important;
                }
            }
        </style>
    </head>
    <body>
        <div class="header-container">
            <div class="logo-container">
                <div class="bus-icon">
                    <div class="bus-body">
                        <div class="bus-window"></div>
                        <div class="bus-wheels">
                            <div class="bus-wheel wheel-left"></div>
                            <div class="bus-wheel wheel-right"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header-text">
                <div class="header-title">
                    <h1 class="main-title">Trans Services C.A</h1>
                    <p class="company-name">Reporte de Ganancias</p>
                </div>
            </div>
        </div>

        <div id="clientes-cantidad">
            <span>Cantidad de registros: ${data ? data.length : 0}</span>
            <span class="fecha-generacion">Generado: ${new Date().toLocaleString()}</span>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Fecha del Ganacia</th>
                    <th>Descripción</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody id="clientes-lista">
                ${(() => {
            if (!data || !Array.isArray(data) || data.length === 0) {
                return `<tr>
                            <td colspan="3" style="text-align: center; padding: 30px; color: #666;">
                                No hay registros de ganancias para esta fecha
                            </td>
                        </tr>`;
            }

            let filasHTML = '';
            let totalGeneral = 0;

            // Generar filas de datos
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                const monto = parseFloat(item.amount) || 0;
                totalGeneral += monto;

                filasHTML += `
                        <tr>
                            <td>${item.Fecha || 'N/A'}</td>
                            <td>${item.Descripcion || 'N/A'}</td>
                            <td>${monto.toFixed(2)} Bs</td>
                        </tr>`;
            }

            // Agregar fila del total (COLSPAN=2 para las primeras 2 columnas)
            filasHTML += `
                    <tr class="total-row">
                        <td colspan="2" style="text-align: right;">TOTAL GENERAL:</td>
                        <td>${totalGeneral.toFixed(2)}</td>
                    </tr>`;

            return filasHTML;
        })()}
            </tbody>
        </table>

        <div class="pdf-info no-print">
            Este documento está optimizado para impresión/PDF | Trans Services C.A
        </div>
    </body>
    </html>
    `;
}

// Este reporte muestra los proveedores a los que se les debe dinero
const htmlProvidersReportDebt = (data) => {
    return `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reporte de Gastos - Trans Services C.A</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }

                body {
                    background-color: #ffffff;
                    color: #333;
                    line-height: 1.4;
                    padding: 20px !important;
                    margin: 0 !important;
                    width: 100% !important;
                    max-width: 100% !important;
                    font-size: 12px;
                }

                .header-container {
                    display: flex;
                    align-items: flex-start;
                    margin-bottom: 25px;
                    padding-bottom: 15px;
                    border-bottom: 2px solid #3498db;
                    page-break-inside: avoid !important;
                }

                .logo-container {
                    margin-right: 20px;
                    position: relative;
                }

                .bus-icon {
                    width: 70px;
                    height: 70px;
                    background-color: #3498db;
                    border-radius: 6px;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .bus-body {
                    width: 50px;
                    height: 25px;
                    background-color: #ffffff;
                    border-radius: 4px;
                    position: relative;
                }

                .bus-window {
                    position: absolute;
                    width: 38px;
                    height: 10px;
                    background-color: #3498db;
                    top: 4px;
                    left: 6px;
                    border-radius: 2px;
                }

                .bus-wheels {
                    position: absolute;
                    bottom: -6px;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                }

                .bus-wheel {
                    width: 10px;
                    height: 10px;
                    background-color: #2c3e50;
                    border-radius: 50%;
                }

                .wheel-left {
                    margin-left: 8px;
                }

                .wheel-right {
                    margin-right: 8px;
                }

                .header-text {
                    display: flex;
                    flex-direction: column;
                }

                .header-title {
                    display: flex;
                    flex-direction: column;
                }

                h1 {
                    color: #2c3e50;
                    font-size: 2.2rem;
                    margin: 0 0 5px 0;
                    padding: 0;
                    border: none;
                    text-align: left;
                    font-weight: normal;
                }

                .company-name {
                    font-weight: bold;
                    color: #2980b9;
                    font-size: 1.5rem;
                    margin: 0;
                    padding: 0;
                    text-align: left;
                }

                #clientes-cantidad {
                    background-color: #f0f7ff;
                    padding: 12px 18px;
                    border-radius: 5px;
                    border-left: 4px solid #3498db;
                    margin: 20px 0 25px 0;
                    font-weight: 600;
                    color: #2c3e50;
                    font-size: 1rem;
                    line-height: 1.4;
                    page-break-inside: avoid;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .fecha-generacion {
                    color: #7f8c8d;
                    font-weight: normal;
                    font-size: 0.9rem;
                }

                table {
                    width: 100% !important;
                    border-collapse: collapse !important;
                    margin: 0 0 30px 0 !important;
                    border: 1px solid #e1e1e1;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
                    font-size: 13px;
                    page-break-inside: auto !important;
                }

                thead {
                    background-color: #3498db !important;
                    color: white !important;
                }

                th {
                    padding: 14px 12px !important;
                    text-align: left;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                    font-size: 0.9rem;
                    border-right: 1px solid rgba(255, 255, 255, 0.2);
                }

                th:last-child {
                    border-right: none;
                }

                tbody tr {
                    border-bottom: 1px solid #e1e1e1;
                    page-break-inside: avoid !important;
                }

                tbody tr:nth-of-type(even) {
                    background-color: #f9f9f9 !important;
                }

                td {
                    padding: 12px 10px !important;
                    font-size: 0.95rem;
                    border-right: 1px solid #f0f0f0;
                    line-height: 1.4;
                    word-wrap: break-word;
                }

                td:last-child {
                    border-right: none;
                    text-align: right;
                    font-family: monospace;
                    font-weight: 500;
                }

                .total-row {
                    background-color: #e8f4fd !important;
                    border-top: 2px solid #3498db !important;
                    font-weight: bold !important;
                }

                .total-row td {
                    padding: 14px 12px !important;
                    font-weight: bold !important;
                }

                .pdf-info {
                    background-color: #f8f9fa;
                    padding: 12px;
                    border-radius: 5px;
                    margin-top: 25px;
                    font-size: 0.8rem;
                    color: #666;
                    border: 1px dashed #ddd;
                    text-align: center;
                }

                @media (max-width: 768px) {
                    body {
                        padding: 15px !important;
                    }

                    .header-container {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .logo-container {
                        margin-bottom: 15px;
                    }

                    h1 {
                        font-size: 1.8rem;
                    }

                    .company-name {
                        font-size: 1.3rem;
                    }

                    table {
                        display: block;
                        overflow-x: auto;
                    }

                    th,
                    td {
                        padding: 10px 8px !important;
                        font-size: 0.85rem;
                    }
                }

                @page {
                    margin: 15mm !important;
                    size: A4;
                }

                @media print {
                    body {
                        padding: 10px !important;
                        margin: 0 !important;
                        font-size: 11px !important;
                    }

                    .header-container {
                        margin-top: 0 !important;
                        margin-bottom: 20px !important;
                    }

                    thead {
                        background-color: #3498db !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }

                    tbody tr:nth-of-type(even) {
                        background-color: #f9f9f9 !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }

                    table {
                        box-shadow: none !important;
                        border: 1px solid #ccc;
                    }

                    tr {
                        page-break-inside: avoid;
                        page-break-after: auto;
                    }

                    .pdf-info {
                        display: none !important;
                    }

                    h1 {
                        font-size: 24pt !important;
                    }

                    .company-name {
                        font-size: 18pt !important;
                    }

                    #clientes-cantidad {
                        font-size: 11pt !important;
                        margin: 15px 0 20px 0 !important;
                    }

                    th {
                        font-size: 10pt !important;
                        padding: 10px 8px !important;
                    }

                    td {
                        font-size: 10pt !important;
                        padding: 8px 6px !important;
                    }
                }
            </style>
        </head>

        <body>
            <div class="header-container">
                <div class="logo-container">
                    <div class="bus-icon">
                        <div class="bus-body">
                            <div class="bus-window"></div>
                            <div class="bus-wheels">
                                <div class="bus-wheel wheel-left"></div>
                                <div class="bus-wheel wheel-right"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="header-text">
                    <div class="header-title">
                        <h1 class="main-title">Trans Services C.A</h1>
                        <p class="company-name">Reporte de Deudas de proveedores</p>
                    </div>
                </div>
            </div>

            <div id="clientes-cantidad">
                <span>Cantidad de registros: ${data ? data.length : 0}</span>
                <span class="fecha-generacion">Generado: ${new Date().toLocaleString()}</span>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>RIF</th>
                        <th>Correo</th>
                        <th>Telefono</th>
                        <th>Subtotal</th>
                        <th>Retenciones</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody id="clientes-lista">
                    ${(() => {
            if (!data || !Array.isArray(data) || data.length === 0) {
                return `<tr>    
                            <td colspan="7" style="text-align: center; padding: 30px; color: #666;">
                                No hay proveedores a los que se les debe dinero
                            </td>
                        </tr>`;
            } else {
                return data.map(item => `
                        <tr>
                            <td>${item.proveedor || ''}</td>
                            <td>${item.rif || ''}</td>
                            <td>${item.correos || ''}</td>
                            <td>${item.telefonos || ''}</td>
                            <td>${item.subtotal_pendiente} Bs</td>
                            <td>${item.impuestos_pendientes} Bs</td>
                            <td>${item.total_adeudado} Bs</td>
                        </tr>
                    `).join('');
            }
        })()}
                </tbody>
            </table>

            <div class="pdf-info no-print">
                Este documento está optimizado para impresión/PDF | Trans Services C.A
            </div>
        </body>

        </html>
    `;
}

export default {
    htmlClientsReport, htmlEmployeesReport, htmlProvidersReport,
    htmlVehiclesReport, htmlExpensesReport, htmlRevenueReport,
    htmlProvidersReportDebt
};