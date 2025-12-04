# Módulo de Tipos de Vehículos (types_of_vehicles)

**Rol requerido: Administrador**

### 1. Crear Tipo de Vehículo
**Método:** POST  
**Endpoint:** `http://localhost:3000/api/trans/services/createType`  
**Headers:** `Content-Type: application/json`  
**Body:**
```json
{
    "type_name": "string",
    "description": "string"
}
```

### 2. Obtener Tipos de Vehículos (Todos)
**Método:** GET  
**Endpoint:** `http://localhost:3000/api/trans/services/list`  
**Headers:** `Authorization: Bearer {token}`  

**Response (200 OK):**
```json
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
    }
  ]
}
```

### 3. Obtener Tipo de Vehículo por Nombre
**Método:** GET  
**Endpoint:** `/api/trans/services/by_name/camion`  

**Response:**
```json
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
```

### 4. Actualizar Tipo de Vehículo (PATCH)
**Detalle:**  
**Método:** PUT  
**Endpoint:** `/api/trans/services/updateTypeId/8`  
**Cuerpo (JSON):** `{"type_name": "Remolque Pequeño"}`  
**Resultado Esperado:** 200 OK  

### 5. Eliminar Tipo de Vehículo (DELETE)
**Detalle:**  
**Método:** DELETE  
**Endpoint:** `/api/trans/services/deleteTypeId/6`  
**Prueba con ID 6:** `/api/trans/services/deleteTypeId/6`  
**Resultado Esperado:** 200 OK  

# Módulo de Vehículos (vehicles)  

**Rol requerido: Administrador**

### 1. Crear / Registrar Vehículo
**Método:** POST  
**Endpoint:** `http://localhost:3000/api/trans/services/vehicles/registerVehicle`  
**Headers:**
- `Authorization: Bearer {token}`
- `Content-Type: application/json`

**Body:**
```json
{
    "driver_id": "integer (ID del conductor)",
    "model": "string",
    "license_plate": "string (única)",
    "total_seats": "integer",
    "vehicle_type_id": "integer (ID del tipo de vehículo)"
}
```

### 1.5. Listar Todos los Vehículos Activos
**Método:** GET  
**Endpoint:** `http://localhost:3000/api/trans/services/findAll`  
**Headers:** `Authorization: Bearer {token}`  

**Response (200 OK):**
```json
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
```

**Response (404 Not Found - Sin registros):**
```json
{
  "success": false,
  "code": "ITEM_NOT_FOUND",
  "message": "The item was not found.",
  "details": "No hay vehículos registrados."
}
```

### 2. Obtener Vehículo por Placa
**Método:** GET  
**Endpoint:** `http://localhost:3000/api/trans/services/vehicles/:license_plate`  
**Headers:** `Authorization: Bearer {token}`  
**Parámetros URL:** `license_plate (string): Placa única del vehículo (ej: XYA-987).`

**Ejemplo:** `GET http://localhost:3000/api/trans/services/vehicles/XYA-987`

### 3. Actualizar Vehículo por Placa
**Método:** PUT  
**Endpoint:** `http://localhost:3000/api/trans/services/vehicles/updateVehicle/:license_plate`  
**Headers:**
- `Authorization: Bearer {token}`
- `Content-Type: application/json`

**Parámetros URL:** `license_plate (string): Placa única del vehículo a actualizar.`

**Body:**
```json
{
    "driver_id": "integer (opcional)",
    "model": "string (opcional)",
    "total_seats": "integer (opcional)",
    "is_active": "boolean (opcional)"
}
```

### 4. Desactivar Vehículo (Soft Delete)
**Método:** DELETE  
**Endpoint:** `http://localhost:3000/api/trans/services/vehicles/deleteVehicle/:license_plate`  
**Headers:** `Authorization: Bearer {token}`  
**Parámetros URL:** `license_plate (string): Placa única del vehículo a desactivar.`

**Ejemplo:** `DELETE http://localhost:3000/api/trans/services/vehicles/deleteVehicle/XYA-987`

**Nota:** Esta operación marca el campo `is_active` del vehículo como `false`.

### 5. Reactivar Vehículo por Placa
**Método:** PUT  
**Endpoint:** `http://localhost:3000/api/trans/services/reactivate/:license_plate`  
**Headers:** `Authorization: Bearer {token}`  
**Parámetros URL:** `license_plate (string): Placa única del vehículo a reactivar (ej: XYA-987).`

**Ejemplo:** `PUT http://localhost:3000/api/trans/services/reactivate/XYA-987`

**Body:**
Esta ruta no requiere un cuerpo de petición (Body).

**Resultado Esperado (200 OK - Reactivado):**
```json
{
  "success": true,
  "code": "REQUEST_SUCCESSFUL",
  "message": "The request was successful.",
  "details": {
    "message": "El vehículo con placa XYA-987 ha sido reactivado exitosamente.",
    "is_active": true
  }
}

**Resultado Esperado (409 Conflict - Ya Activo):**

{
  "success": false,
  "code": "VEHICLE_ALREADY_ACTIVE",
  "message": "Internal error.",
  "details": {
    "error": "VEHICLE_ALREADY_ACTIVE",
    "message": "El vehículo con placa XYA-987 ya estaba activo."
  }
}