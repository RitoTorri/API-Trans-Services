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
    "rol": "string"
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