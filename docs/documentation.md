# Documentación de la API

## Módulo de Empleados
**Rol requerido:** Administrador

### 1. Obtener empleados
**Método:** `GET`  
**Endpoint:** `http://localhost:3000/api/trans/services/employee/search/:active/:filter`  
**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Parámetros URL:**
- `active` (boolean): `true` para activos, `false` para inactivos
- `filter` (string): `all` | `name` | `ci`

**Ejemplo:**
```
GET http://localhost:3000/api/trans/services/employee/search/true/32137510
```

---

### 2. Eliminar empleado
**Método:** `DELETE`  
**Endpoint:** `http://localhost:3000/api/trans/services/employee/:id`  
**Headers:**
```
Authorization: Bearer {token}
```

**Parámetros URL:**
- `id` (integer): ID del empleado

**Ejemplo:**
```
DELETE http://localhost:3000/api/trans/services/employee/1
```

---

### 3. Crear empleado
**Método:** `POST`  
**Endpoint:** `http://localhost:3000/api/trans/services/employee`  
**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Body:**
```json
{
    "name": "string",
    "lastname": "string",
    "ci": "string",
    "rol": "string",
    "contacts": [
        {
            "contact_info": "string",
            "contact_info": "string"
        }
    ]
}
```

**Nota:** El campo `contacts` debe contener al menos 1 contacto y máximo 30.

---

### 4. Actualizar empleado
**Método:** `PATCH`  
**Endpoint:** `http://localhost:3000/api/trans/services/employee/:id`  
**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Parámetros URL:**
- `id` (integer): ID del empleado

**Body:**
```json
{
    "name": "string",
    "lastname": "string",
    "ci": "string",
    "rol": "string",
    "contacts": [
        {
            "id": "integer",
            "contact_info": "string"
        },
        {
            "id": "integer",
            "contact_info": "string"
        }
    ]
}
```

**Ejemplo:**
```
PATCH http://localhost:3000/api/trans/services/employee/1
```

**Nota:** No es obligatorio enviar todos los campos. Solo envias las propiedades que quieras actualizar.

---

### 5. Restaurar empleado
**Método:** `PATCH`  
**Endpoint:** `http://localhost:3000/api/trans/services/employee/restore/:id`  
**Headers:**
```
Authorization: Bearer {token}
```

**Parámetros URL:**
- `id` (integer): ID del empleado inactivo

**Ejemplo:**
```
PATCH http://localhost:3000/api/trans/services/employee/restore/1
```

---

## Módulo de Clientes
**Rol requerido:** Administrador

### 1. Crear cliente
**Método:** `POST`  
**Endpoint:** `http://localhost:3000/api/trans/services/clients`  
**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Body:**
```json
{
    "rif": "string",
    "name": "string",
    "contact": "string",
    "address": "string"
}
```

---

### 2. Obtener clientes
**Método:** `GET`  
**Endpoint:** `http://localhost:3000/api/trans/services/clients/:filter`  
**Headers:**
```
Authorization: Bearer {token}
```

**Parámetros URL:**
- `filter` (string): `all` | `name` | `rif`

**Ejemplo RIF:** `V-1234567-8`  
**Ejemplo endpoint:** `http://localhost:3000/api/trans/services/clients/search/all`

---

### 3. Actualizar cliente
**Método:** `PATCH`  
**Endpoint:** `http://localhost:3000/api/trans/services/clients/:id`  
**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Parámetros URL:**
- `id` (integer): ID del cliente

**Body:**
```json
{
    "rif": "string",
    "name": "string",
    "contact": "string",
    "address": "string"
}
```

**Ejemplo:**
```
PATCH http://localhost:3000/api/trans/services/clients/1
```

**Nota:** No es obligatorio enviar todos los campos. Solo envias las propiedades que quieras actualizar.

# Documentación de la API

## Módulo de Proveedores
**Rol requerido:** Administrador

### 1. Crear proveedor
**Método:** `POST`  
**Endpoint:** `http://localhost:3000/api/trans/services/provider`  
**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Distribuidora Lara",
  "rif": "J-11223344-5",
  "balance": 18000
}
```

---

### 2. Listar proveedores activos
**Método:** `GET`  
**Endpoint:** `http://localhost:3000/api/trans/services/providers`  
**Headers:**
```
Authorization: Bearer {token}
```

---

### 3. Buscar proveedor por nombre
**Método:** `GET`  
**Endpoint:** `http://localhost:3000/api/trans/services/provider/search/:name`  
**Headers:**
```
Authorization: Bearer {token}
```

**Parámetros URL:**
- `name` (string): Nombre o parte del nombre del proveedor

**Ejemplo:**
```
GET http://localhost:3000/api/trans/services/provider/search/Lara
```

---

### 4. Actualizar proveedor
**Método:** `PATCH`  
**Endpoint:** `http://localhost:3000/api/trans/services/provider/:id`  
**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Parámetros URL:**
- `id` (integer): ID del proveedor

**Body:**
```json
{
  "name": "Distribuidora Lara Actualizada",
  "rif": "J-11223344-5",
  "balance": 20000
}
```

**Ejemplo:**
```
PATCH http://localhost:3000/api/trans/services/provider/1
```

---

### 5. Eliminar proveedor (soft delete)
**Método:** `DELETE`  
**Endpoint:** `http://localhost:3000/api/trans/services/provider/:id`  
**Headers:**
```
Authorization: Bearer {token}
```

**Parámetros URL:**
- `id` (integer): ID del proveedor

**Ejemplo:**
```
DELETE http://localhost:3000/api/trans/services/provider/1
```

---

### 6. Restaurar proveedor eliminado
**Método:** `PUT`  
**Endpoint:** `http://localhost:3000/api/trans/services/provider/restore/:id`  
**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Parámetros URL:**
- `id` (integer): ID del proveedor eliminado

**Body:**
```json
{
  "rif": "J-11223344-5"
}
```

**Ejemplo:**
```
PUT http://localhost:3000/api/trans/services/provider/restore/1
```

---

### 7. Listar proveedores eliminados
**Método:** `GET`  
**Endpoint:** `http://localhost:3000/api/trans/services/providers-deleted`  
**Headers:**
```
Authorization: Bearer {token}
```

---

## Módulo de Facturas de Proveedores
**Rol requerido:** Administrador

### 1. Crear factura
**Método:** `POST`  
**Endpoint:** `http://localhost:3000/api/trans/services/provider-invoice/:provider_id`  
**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Parámetros URL:**
- `provider_id` (integer): ID del proveedor

**Body:**
```json
{
  "control_number": "CN-0001",
  "invoice_number": "INV-0001",
  "invoice_date": "2025-11-03",
  "total_amount": 1200
}
```

**Ejemplo:**
```
POST http://localhost:3000/api/trans/services/provider-invoice/1
```

---

### 2. Listar todas las facturas activas
**Método:** `GET`  
**Endpoint:** `http://localhost:3000/api/trans/services/provider-invoices`  
**Headers:**
```
Authorization: Bearer {token}
```

---

### 3. Listar facturas por proveedor
**Método:** `GET`  
**Endpoint:** `http://localhost:3000/api/trans/services/provider-invoices/:provider_id`  
**Headers:**
```
Authorization: Bearer {token}
```

**Parámetros URL:**
- `provider_id` (integer): ID del proveedor

**Ejemplo:**
```
GET http://localhost:3000/api/trans/services/provider-invoices/1
```

---

### 4. Buscar por número fiscal o control
**Método:** `GET`  
**Endpoint:** `http://localhost:3000/api/trans/services/provider-invoices/search/:term`  
**Headers:**
```
Authorization: Bearer {token}
```

**Parámetros URL:**
- `term` (string): Término de búsqueda (número fiscal o control)

**Ejemplo:**
```
GET http://localhost:3000/api/trans/services/provider-invoices/search/INV
```

---

### 5. Filtrar por rango de fechas
**Método:** `GET`  
**Endpoint:** `http://localhost:3000/api/trans/services/provider-invoices-range?start=YYYY-MM-DD&end=YYYY-MM-DD`  
**Headers:**
```
Authorization: Bearer {token}
```

**Parámetros Query:**
- `start` (string): Fecha de inicio (YYYY-MM-DD)
- `end` (string): Fecha de fin (YYYY-MM-DD)

**Ejemplo:**
```
GET http://localhost:3000/api/trans/services/provider-invoices-range?start=2025-11-01&end=2025-11-30
```

---

### 6. Eliminar factura (soft delete)
**Método:** `DELETE`  
**Endpoint:** `http://localhost:3000/api/trans/services/provider-invoice/:id`  
**Headers:**
```
Authorization: Bearer {token}
```

**Parámetros URL:**
- `id` (integer): ID de la factura

**Ejemplo:**
```
DELETE http://localhost:3000/api/trans/services/provider-invoice/1
```

---

### 7. Listar facturas eliminadas
**Método:** `GET`  
**Endpoint:** `http://localhost:3000/api/trans/services/provider-invoices-deleted`  
**Headers:**
```
Authorization: Bearer {token}
```

---

### 8. Restaurar factura eliminada
**Método:** `PUT`  
**Endpoint:** `http://localhost:3000/api/trans/services/provider-invoice/restore/:id`  
**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Parámetros URL:**
- `id` (integer): ID de la factura eliminada

**Body:**
```json
{
  "control_number": "CN-0001-R"
}
```

**Ejemplo:**
```
PUT http://localhost:3000/api/trans/services/provider-invoice/restore/1
```

---

## Módulo de Contactos de Proveedores
**Rol requerido:** Administrador

### 1. Crear contacto
**Método:** `POST`  
**Endpoint:** `http://localhost:3000/api/trans/services/provider-contact/:provider_id`  
**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Parámetros URL:**
- `provider_id` (integer): ID del proveedor

**Body:**
```json
{
  "contact_info": "04141234567"
}
```

**Nota:** El campo `contact_info` acepta números de teléfono o correos electrónicos válidos.

**Ejemplo con email:**
```json
{
  "contact_info": "correo@ejemplo.com"
}
```

---

### 2. Eliminar contacto
**Método:** `DELETE`  
**Endpoint:** `http://localhost:3000/api/trans/services/provider-contact/:contact_id`  
**Headers:**
```
Authorization: Bearer {token}
```

**Parámetros URL:**
- `contact_id` (integer): ID del contacto

**Ejemplo:**
```
DELETE http://localhost:3000/api/trans/services/provider-contact/1
```

---

### 3. Listar contactos por proveedor
**Método:** `GET`  
**Endpoint:** `http://localhost:3000/api/trans/services/provider-contact/:provider_id`  
**Headers:**
```
Authorization: Bearer {token}
```

**Parámetros URL:**
- `provider_id` (integer): ID del proveedor

**Ejemplo:**
```
GET http://localhost:3000/api/trans/services/provider-contact/1
```

## Módulo de Nomina

### 1. Crear una Nomina
**Método:** `POST`  
**Endpoint:** `http://localhost:3000/api/trans/services/payrolls`  
**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Parámetros del Body:**
- `employee_id` (integer): ID del empleado asociado a esta nómina
- `period_start` (date): Fecha de inicio del período de nómina
- `period_end` (date): Fecha de fin del período de nómina
- `daily_salary` (number): Salario base diario
- `total_days_paid` (number): Total de días pagados en el período
- `ivss` (number): Deducción por seguro social 
- `pie` (number): Deducción por paro forzoso
- `faov` (number): Aporte al fondo de ahorro

Las retenciones de seguro social, paro forzoso y aporte al fondo de... pueden estar en formato decimal o entero: 10.00, 2.23, 100, etc.

**Ejemplo de Body:**
```json
{
    "employee_id": "1",
    "period_start": "2025-11-03",
    "period_end": "2025-11-30",
    "daily_salary": "1200",
    "total_days_paid": "30",
    "ivss": "10",
    "pie": "10",
    "faov": "10"
}
```

**Respuesta:**
```json
{
    "success": true,
    "code": "REQUEST_SUCCESSFUL",
    "message": "The request was successful.",
    "details": {
        "id": 52,
        "status": "draft",
        "employee_id": 1,
        "period_start": "2024-04-01T00:00:00.000Z",
        "period_end": "2024-04-15T00:00:00.000Z",
        "daily_salary": "4.33",
        "total_days_paid": "15",
        "monthly_salary": "130",
        "integral_salary": "0",
        "annual_earnings": "0",
        "assements": "65",
        "ivss": "3.7",
        "pie": "0.46",
        "faov": "1",
        "total_deductions": "3.36",
        "net_salary": "61.64",
        "created_at": "2025-11-16T00:27:07.971Z",
        "employees": {
            "id": 1,
            "name": "Jesus",
            "lastname": "Cortez",
            "ci": "32137510",
            "rol": "Chofer",
            "is_active": true,
            "created_at": "2025-11-15T19:29:30.472Z"
        }
    }
}
```

---

### 2. Listar todas las Nominas 
**Método:** `GET`  
**Endpoint:** `http://localhost:3000/api/trans/services/payrolls/search`
**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Parámetros del Body:**
Por parametros de búsqueda puedes enviar o fechas o stados de las nominas.

Busqueda por fechas:
```json
    "filterSearch": {
        "dateStart": "2002-10-10",
        "dateEnd": "2002-10-10"
    }
```

Busqueda por estado:
```json
    "filterSearch": {
        "status": "draft"
    }
```

**Respuesta: Recibes todos las nominas que cumplen con los filtros.**
```json
{
    "success": true,
    "code": "REQUEST_SUCCESSFUL",
    "message": "The request was successful.",
    "details": [
        {
            "id": 52,
            "status": "draft",
            "employee": {
                "name": "Jesus",
                "ci": "32137510",
                "rol": "Chofer",
                "old_date": "Años 0 y Meses 0",
                "date_of_entry": "2025-11-15T19:29:30.472Z"
            },
            "Payment_period": {
                "from": "2024-04-01T00:00:00.000Z",
                "to": "2024-04-15T00:00:00.000Z"
            },
            "details": {
                "salary_daily": "4.33",
                "total_days_paid": "15",
                "integral_salary": "0",
                "annual_earnings": "0"
            },
            "description": {
                "salary_biweekly": "65",
                "monthly_salary": "130",
                "deductions": {
                    "ivss": "3.7",
                    "pie": "0.46",
                    "faov": "1"
                },
                "totalDeductions": "3.36",
                "net_salary": "61.64"
            }
        }
    ]
}
```

---

### 3. Actualizar el estado de una Nomina
**INPORTANTE**: Solo puedes actualizar el estado de una nomina si está en estado "draft".  
**Método:** `PATCH`  
**Endpoint:** `http://localhost:3000/api/trans/services/payrolls/:id/:status`
**Headers:**
```
Authorization: Bearer {token}
```

**Parámetros del URL:**
- `status` (string): Estado de la nomina: draft, cancelled o paid
- `id` (integer): ID de la nomina

**Ejemplo de URL:**
```
PATCH http://localhost:3000/api/trans/services/payrolls/1/paid
```

**Respuesta:**
```json
{
    "success": true,
    "code": "REQUEST_SUCCESSFUL",
    "message": "The request was successful.",
    "details": {
        "message": "payroll update succefully.",
        "data": {
            "id": 51,
            "status": "paid",
            "employee_id": 1,
            "period_start": "2024-04-01T00:00:00.000Z",
            "period_end": "2024-04-15T00:00:00.000Z",
            "daily_salary": "4.33",
            "total_days_paid": "15",
            "monthly_salary": "130",
            "integral_salary": "0",
            "annual_earnings": "0",
            "assements": "65",
            "ivss": "3.7",
            "pie": "0.46",
            "faov": "1",
            "total_deductions": "3.36",
            "net_salary": "61.64",
            "created_at": "2025-11-16T00:04:26.423Z"
        }
    }
}
```

---

### 4. Actualizar los datos de una Nomina
** IMPORTANTE **: Solo puedes actualizar los datos de una nomina si está en estado "draft". No se pueden actualizar los datos de una persona que esta en la nomina, solo se cambia las retenciones, salarios, etc. REVISE LOS OBJETOS QUE SE PUEDEN ENVIAR EN EL BODY DE LA REQUEST.
**Método:** `PATCH`  
**Endpoint:** `http://localhost:3000/api/trans/services/payrolls/:id`
**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Parámetros del URL:**
- `id` (integer): ID de la nomina

**Ejemplo de URL:**
```
PATCH http://localhost:3000/api/trans/services/payrolls/1
```

**Parámetros del Body:**
- `period_start` (date): Fecha de inicio del período de nómina
- `period_end` (date): Fecha de fin del período de nómina
- `daily_salary` (number): Salario base diario
- `total_days_paid` (number): Total de días pagados en el período
- `ivss` (number): Deducción por seguro social 
- `pie` (number): Deducción por paro forzoso
- `faov` (number): Aporte al fondo de ahorro

Las retenciones de seguro social, paro forzoso y aporte al fondo de... pueden estar en formato decimal o entero: 10.00, 2.23, 100, etc.

**Ejemplo de Body:**
```json
{
    "period_start": "2024-04-01",
    "period_end": "2024-04-15",
    "daily_salary": "4.33",
    "total_days_paid": "15",
    "ivss": "3.7",
    "pie": "0.46",
    "faov": "1"
}
```

**Respuesta:**
```json
{
    "success": true,
    "code": "REQUEST_SUCCESSFUL",
    "message": "The request was successful.",
    "details": {
        "message": "payroll update succefully.",
        "data": {
            "id": 52,
            "status": "draft",
            "employee_id": 1,
            "period_start": "2024-04-01T00:00:00.000Z",
            "period_end": "2024-04-15T00:00:00.000Z",
            "daily_salary": "4.33",
            "total_days_paid": "15",
            "monthly_salary": "130",
            "integral_salary": "0",
            "annual_earnings": "0",
            "assements": "65",
            "ivss": "3.7",
            "pie": "0.46",
            "faov": "1",
            "total_deductions": "3.36",
            "net_salary": "61.64",
            "created_at": "2025-11-16T00:27:07.971Z"
        }
    }
}
```

---

# Modulo de Reportes

## 1. Reporte de Gastos Anuales
**Rol requerido:**  Administrador o 

### 1. Obtener reporte de gastos anuales
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
            "Clientes": "Jesus",
            "Rif": "V-1234567-8",
            "Servicios Solicitados": 3
        },
        {
            "Clientes": "Jesus",
            "Rif": "V-1234567-8",
            "Servicios Solicitados": 2
        },
        {
            "Clientes": "Jesus",
            "Rif": "V-1234567-8",
            "Servicios Solicitados": 1
        }
    ]
}
```

---

## Módulo de Servicios
**Rol requerido:** Administrador o SuperUsuario

### 1. Crear servicio
**Método:** `POST`  
**Endpoint:** `http://localhost:3000/api/trans/services/offered/services`  
**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Parámetros URL:**
- `vehicle_id` (integer): ID del vehículo
- `client_id` (integer): ID del cliente
- `price` (number): Precio del servicio
- `start_date` (date): Fecha de inicio del servicio
- `end_date` (date): Fecha de fin del servicio
- `isrl` (number): Impuesto sobre la renta

**Ejemplo de Body:**
```json
{
    "vehicle_id": 1,
    "client_id": 1,
    "price": 1200,
    "start_date": "2025-11-03",
    "end_date": "2025-11-30",
    "isrl": 10
}
```

---

### 2. Listar todos los servicios
**Método:** `GET`  
**Endpoint:** `http://localhost:3000/api/trans/services/offered/services/search`
**Headers:**
```
Authorization: Bearer {token}
```

**Parámetros de Body:**
Puedes busar por fechas, estado de pago del servicio o por nombre del cliente.

Busqueda por fechas:
```json
    "filterSearch": {
        "dateStart": "2002-10-10",
        "dateEnd": "2002-10-10"
    }
```

Busqueda por estado:
```json
    "filterSearch": "paid"
```

Busqueda por nombre del cliente:
```json
    "filterSearch": "Jesus"
```

### 3. Actualizar el estado de pago de un servicio
** IMPORTANTE: Solo puedes actualizar el estado de pago de un servicio si está en estado "pending".**
**Método:** `PATCH`  
**Endpoint:** `http://localhost:3000/api/trans/services/offered/services/payment/:status/:id`  
**Headers:**
```
Authorization: Bearer {token}
```

**Parámetros URL:**
- `status` (string): Estado de pago: pending, paid, canceled
- `id` (integer): ID del servicio

**Ejemplo de URL:**
```
PATCH http://localhost:3000/api/trans/services/offered/services/payment/paid/1
```