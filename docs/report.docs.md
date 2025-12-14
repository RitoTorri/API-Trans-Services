# Modulo de Reportes
**Rol requerido:**  Administrador o SuperUsuario

### 1. Obtener reporte de gastos anuales
**INFO:** Este reporte muestra los gastos anuales por mes. Es decir gastos totales por mes y por año.  
**Método:** `GET`  
**Endpoint:** `http://localhost:3000/api/trans/services/reports/expenses/annual`    
**Headers:**
```
Authorization: Bearer {token}
```

**Parámetros de la URL:**
- `year` (integer): Año a consultar

**Ejemplo de la URL:**
```
GET http://localhost:3000/api/trans/services/reports/expenses/annual/2025
```

```

**Respuesta:**
```json
{
    "success": true,
    "code": "REQUEST_SUCCESSFUL",
    "message": "The request was successful.",
    "details": [
        {
            "Fecha": "2025-11",
            "Gasto Mensual": "61.64"
        },
        {
            "Fecha": "2025-12",
            "Gasto Mensual": "61.64"
        }
    ]
}
```

---

### 2. Reporte de Ganancias Anuales
**INFO:** Este reporte muestra las ganancias anuales por meses. Es decir ganancia total por mes y por año.  
**Método:** `GET`  
**Endpoint:** `http://localhost:3000/api/trans/services/reports/revenue/annual/:year`  
**Headers:**
```
Authorization: Bearer {token}
```

**Parámetros URL:**
- `year` (integer): Año a consultar

**Ejemplo de URL:**
```
GET http://localhost:3000/api/trans/services/reports/revenue/annual/2025
```

**Respuesta:**
```json
{
    "success": true,
    "code": "REQUEST_SUCCESSFUL",
    "message": "The request was successful.",
    "details": [
        {
            "Fecha": "2025-11",
            "Ganancia Mensual": "61.64"
        },
        {
            "Fecha": "2025-12",
            "Ganancia Mensual": "61.64"
        }
    ]
}
```

---

### 3. Reporte de Clientes con mayor número de servicios
**info:** Este reporte muestra los clientes con mayor número de servicios solicitados. Los clientes retornados se hacen por el año y mes actual. 
**Método:** `GET`  
**Endpoint:** `http://localhost:3000/api/trans/services/reports/clients/service/ranking/:year/:month`
**Headers:**
```
Authorization: Bearer {token}
```

**Ejemplo de URL:**
```
GET http://localhost:3000/api/trans/services/reports/clients/service/ranking/2025/11
```

**Respuesta:**
```json
{
    "success": true,
    "code": "REQUEST_SUCCESSFUL",
    "message": "The request was successful.",
    "details": [
        {
            "Clientes": "Richard",
            "Rif": "V-1234567-0",
            "Fecha de servicios": "2025-11",
            "Servicios Solicitados": 1
        }
    ]
}
```

### 4. Reportes de empleados con mayor número de servicios
**info:** Este reporte muestra los empleados con mayor número de servicios o viajes realizados. Los empleados retornados se hacen por el año y mes actual. Se retornan los primeros 3.  
**Método:** `GET`  
**Endpoint:** `http://localhost:3000/api/trans/services/reports/employees/services/borrowed/:year/:month`
**Headers:**
```
Authorization: Bearer {token}
```

**Ejemplo de URL:**
```
GET http://localhost:3000/api/trans/services/reports/employees/services/borrowed/2025/11
```

**Respuesta:**
```json
{
    "success": true,
    "code": "REQUEST_SUCCESSFUL",
    "message": "The request was successful.",
    "details": [
        {
            "Conductor": "Jesus hola",
            "Cedula": "32137510",
            "Viajes Realizados": 1,
            "Fecha de servicios": "2025-11"
        }
    ]
}
```

### 5. Reporte de gastos anuales por tipo de gasto / Gastos detallados
**INFO:** Este reporte muestra los gastos anuales por tipo de gasto. Es decir el total de los gastos por nominas, compras, compras de servicios, etc.  
**Método:** `GET`  
**Endpoint:** `http://localhost:3000/api/trans/services/reports/expenses/details/:year/:month`  
**Headers:**
```
Authorization: Bearer {token}   
```

**Parámetros URL:**
- `year` (integer): Año a consultar
- `month` (integer): Mes a consultar

**Ejemplo de URL:**
```
GET http://localhost:3000/api/trans/services/reports/expenses/details/2025/11
```

**Respuesta:**
```json
{
    "success": true,
    "code": "REQUEST_SUCCESSFUL",
    "message": "The request was successful.",
    "details": [
        {
            "Tipo de gasto": "nominas",
            "Fecha de gasto": "2025-11",
            "Total": "1417.72"
        }
    ]
}
```

### 6. Reporte de los proveedores al que se les a comprado mas
**INFO:** Este reporte muestra los 3 proveedores a los que se les a comprado mas. Los proveedores retornados se hacen por el año y mes actual.  
**Método:** `GET`  
**Endpoint:** `http://localhost:3000/api/trans/services/reports/providers/:year/:month`
**Headers:**
```
Authorization: Bearer {token}
```

**Parámetros de la URL:**
- `year` (integer): Año a consultar
- `month` (integer): Mes a consultar

**Ejemplo de la URL:**
```
GET http://localhost:3000/api/trans/services/reports/providers/2025/11
```

**Respuesta:**
```json
{
    "success": true,
    "code": "REQUEST_SUCCESSFUL",
    "message": "The request was successful.",
    "details": [
        {
            "Nombre de proveedor": "Distribuidora Lara",
            "RIF": "J-11223344-5",
            "Periodo": "2025-11",
            "Cantidad de compras realizadas": "3",
            "Total de gastos": "61.64"
        }
    ]
}
```


### 7. Reporte de Clientes en pdf
**INFO:** Este reporte te devuelve un pdf con todos los clientes registrados.  
**Método:** `GET`    
**Endpoint:** `http://localhost:3000/api/trans/services/reports/clients/pdf`    
**Headers:**
```
Authorization: Bearer {token}
```

**Ejemplo de URL:**
```
GET http://localhost:3000/api/trans/services/reports/clients/pdf
```

**Respuesta:** Es la descarga del pdf.

### 8. Reporte de Empleados en pdf
**INFO:** Este reporte te devuelve un pdf con todos los empleados registrados.  
**Método:** `GET`  
**Endpoint:** `http://localhost:3000/api/trans/services/reports/employees/pdf`  
**Headers:**
```
Authorization: Bearer {token}
```

**Ejemplo de URL:**
```
GET http://localhost:3000/api/trans/services/reports/employees/pdf
```

**Respuesta:** Es la descarga del pdf.

### 9. Reporte de vehiculos en pdf
**INFO:** Este reporte te devuelve un pdf con todos los vehiculos registrados.  
**Método:** `GET`  
**Endpoint:** `http://localhost:3000/api/trans/services/reports/vehicles/pdf`  
**Headers:**
```
Authorization: Bearer {token}
```

**Ejemplo de URL:**
```
GET http://localhost:3000/api/trans/services/reports/vehicles/pdf
```

**Respuesta:** Es la descarga del pdf.

### 10. Reporte de gastos en pdf
**INFO:** Este reporte te devuelve un pdf con todos los gastos registrados.  
**Método:** `GET`  
**Endpoint:** `http://localhost:3000/api/trans/services/reports/expenses/pdf/:year/:month`  
**Headers:**
```
Authorization: Bearer {token}
```

**Parámetros URL:**
- `year` (integer): Año a consultar
- `month` (integer): Mes a consultar

**Ejemplo de URL:**
```
GET http://localhost:3000/api/trans/services/reports/expenses/pdf/2025/11
```

**Respuesta:** Es la descarga del pdf.

### 11. Reporte de ganancias en pdf
**INFO:** Este reporte te devuelve un pdf con todos los ganancias registrados.  
**Método:** `GET`  
**Endpoint:** `http://localhost:3000/api/trans/services/reports/revenue/pdf/:year/:month`  
**Headers:**
```
Authorization: Bearer {token}
```

**Parámetros URL:**
- `year` (integer): Año a consultar
- `month` (integer): Mes a consultar

**Ejemplo de URL:**
```
GET http://localhost:3000/api/trans/services/reports/revenue/pdf/2025/12
```

**Respuesta:** Es la descarga del pdf.

### 12. Reporte de proveedores a los que se les debe dinero
**INFO:** Este reporte muestra los proveedores a los que se les debe dinero.
**Método:** `GET`  
**Endpoint:** `http://localhost:3000/api/trans/services/reports/debt/providers/pdf`  
**Headers:**
```
Authorization: Bearer {token}
```

**Ejemplo de la URL:**
```
GET http://localhost:3000/api/trans/services/reports/debt/providers/pdf
```

**Respuesta:** Es la descarga del pdf.

### 13. Reporte de proveedores
**INFO:** Este reporte muestra los datos de todos los proveedores.
**Método:** `GET`  
**Endpoint:** `http://localhost:3000/api/trans/services/report/provider/pdf`  
**Headers:**
```
Authorization: Bearer {token}
```

**Ejemplo de la URL:**
```
GET http://localhost:3000/api/trans/services/reports/provider/pdf
```

**Respuesta:** Es la descarga del pdf.