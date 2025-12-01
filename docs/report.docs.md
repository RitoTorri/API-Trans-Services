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

**Parámetros del Body:**
- `year` (integer): Año a consultar

**Ejemplo de Body:**
```json
{
    "year": "2025"
}

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
**INFO:** Este reporte muestra las ganancias anualespor meses. Es decir ganancia total por mes y por año.  
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
**info:** Este reporte muestra los clientes con mayor número de servicios solicitados. Los clientes retornados se hacen por el año y mes actual. No tiene filtro de busqueda.  
**Método:** `GET`  
**Endpoint:** `http://localhost:3000/api/trans/services/reports/clients/service/ranking`  
**Headers:**
```
Authorization: Bearer {token}
```

**Ejemplo de URL:**
```
GET http://localhost:3000/api/trans/services/reports/clients/service/ranking
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
**info:** Este reporte muestra los empleados con mayor número de servicios o viajes realizados. Los empleados retornados se hacen por el año y mes actual. No tiene filtro de busqueda. Se retornan los primeros 3.  
**Método:** `GET`  
**Endpoint:** `http://localhost:3000/api/trans/services/reports/employees/services/borrowed`  
**Headers:**
```
Authorization: Bearer {token}
```

**Ejemplo de URL:**
```
GET http://localhost:3000/api/trans/services/reports/employees/services/borrowed
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

### 4. Reporte de Clientes en pdf
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

### 5. Reporte de Empleados en pdf
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