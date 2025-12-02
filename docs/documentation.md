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


## Módulo de Tipos de Vehículos (types_of_vehicles)

** Rol requerido: Administrador **

** 1. Crear Tipo de Vehículo **
** Método: POST **
** Endpoint: http://localhost:3000/api/trans/services/createType **
** Headers: Content-Type: application/json **
** Body: **

{
    "type_name": "string",
    "description": "string"
}
---

**2. Obtener Tipos de Vehículos (Todos)**

**Método: GET**

**Endpoint:http://localhost:3000/api/trans/services/list**

**Headers:Authorization: Bearer {token}**

{
  "success": true,
  "code": "REQUEST_SUCCESSFUL",
  "message": "The request was successful.",
  "details": [
    {
      "id": 2,
      "type_name": "Motocicleta",
      "description": "Vehículo de dos o tres ruedas, motorizado, ideal para reparto o movimientos rápidos.",
      "created_at": "2025-11-11T00:27:27.905Z"
    },
    {
      "id": 3,
      "type_name": "Camioneta",
      "description": "Vehículo tipo pick-up o SUV...",
      "created_at": "2025-11-11T00:29:02.561Z"
    },
    
  ]
}

**Endpoint Tentativo:,/api/trans/services/by_name/camion**

**reponse**
{
  "success": true,
  "code": "REQUEST_SUCCESSFUL",
  "message": "The request was successful.",
  "details": {
    "id": 4,
    "type_name": "Camion",
    "description": "Vehículo pesado diseñado para el transporte...",
    "created_at": "2025-11-11T00:29:19.402Z"
  }
}

--- 
**4. Actualizar Tipo de Vehículo (PATCH)**
Detalle,Valor a Probar
Método:,put
Endpoint Tentativo:,/api/trans/services/updateTypeId/8
Cuerpo (JSON):,"{""type_name"": ""Remolque Pequeño""}"
Resultado Esperado:,200 OK
---
** 5. Eliminar Tipo de Vehículo (DELETE)**
Detalle,Valor a Probar
Método:,DELETE
Endpoint Tentativo:,/api/trans/services/deleteTypeId/6
Prueba con ID 6:,/api/trans/services/deleteTypeId/6
Resultado Esperado:,200 OK 

---

## Módulo de Vehículos (vehicles)

**Rol requerido: Administrador**

**1. Crear / Registrar Vehículo**

**Método: POST**

**Endpoint: http://localhost:3000/api/trans/services/vehicles/registerVehicle**

**Headers:**

**Authorization: Bearer {token}**
**Content-Type: application/json**

**Body:**

{
    "driver_id": "integer (ID del conductor)",
    "model": "string",
    "license_plate": "string (única)",
    "total_seats": "integer",
    "vehicle_type_id": "integer (ID del tipo de vehículo)"
}
---
**1.5. Listar Todos los Vehículos Activos**

**Método: GET**

**Endpoint: http://localhost:3000/api/trans/services/findAll**

**Headers:**

**Authorization: Bearer {token}**

**Response (200 OK):**

{
  "success": true,
  "code": "REQUEST_SUCCESSFUL",
  "message": "The request was successful.",
  "details": [
    {
      "id": 4,
      "driver_id": 2,
      "model": "Ford F-150",
      "license_plate": "ABC-123",
      "total_seats": 4,
      "vehicle_type_id": 1,
      "is_active": true,
      "created_at": "2025-11-20T10:00:00.000Z"
    }
  ]
}

---
**Response (404 Not Found - Sin registros):**

**Endpoint: http://localhost:3000/api/trans/services/findAll**

**Response:**

{
  "success": false,
  "code": "ITEM_NOT_FOUND",
  "message": "The item was not found.",
  "details": "No hay vehículos registrados."
}
---
**2. Obtener Vehículo por Placa**

**Método: GET**

**Endpoint: http://localhost:3000/api/trans/services/vehicles/:license_plate**

**Headers:**

**Authorization: Bearer {token}**

**Parámetros URL:**

**license_plate (string): Placa única del vehículo (ej: XYA-987).**

**Ejemplo:**

**GET http://localhost:3000/api/trans/services/vehicles/XYA-987**

---
**3. Actualizar Vehículo por Placa**

**Método: PUT**

**Endpoint: http://localhost:3000/api/trans/services/vehicles/updateVehicle/:license_plate**

**Headers:**

**Authorization: Bearer {token}**
**Content-Type: application/json**

**Parámetros URL:**

**license_plate (string): Placa única del vehículo a actualizar.**

**Body:**
{
    "driver_id": "integer (opcional)",
    "model": "string (opcional)",
    "total_seats": "integer (opcional)",
    "is_active": "boolean (opcional)" 
}

---

**4. Desactivar Vehículo (Soft Delete)**

**Método: DELETE**

**Endpoint: http://localhost:3000/api/trans/services/vehicles/deleteVehicle/:license_plate**

**Headers:**

**Authorization: Bearer {token}**

**Parámetros URL:**

    **license_plate (string): Placa única del vehículo a desactivar.**

**Ejemplo:**

**DELETE http://localhost:3000/api/trans/services/vehicles/deleteVehicle/XYA-987**

**Nota: Esta operación marca el campo is_active del vehículo como false.**