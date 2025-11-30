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
Content-Type: application/json
```

**Parámetros de Body:**
Puedes buscar todos los servicios, buscar por fechas, estado de pago del servicio o por nombre del cliente.

Obtener todos los servicios:
```json
    "filterSearch": { } 
```

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

**Respuesta:**
```json
    "success": true,
    "code": "REQUEST_SUCCESSFUL",
    "message": "The request was successful.",
    "details": [
        {
            "services": {
                "id": 13,
                "star_date": "2025-12-01T04:00:00.000Z",
                "end_date": "2025-12-02T04:00:00.000Z",
                "price": "13000.9",
                "invoice_number": "TRS-2025-2",
                "invoice_date": "2025-11-18T19:30:22.048Z",
                "payment_status": "paid"
            },
            "client": {
                "name": "Richard",
                "rif": "V-1234567-0"
            },
            "retentions": {
                "code_retention": "isrl",
                "rate_retention": "2",
                "total_retention": "260.02"
            },
            "vehicle": {
                "license_plate": "xxxx"
            },
            "totalAmount": 12740.88
        }
```


### 3. Actualizar el estado de pago de un servicio
**IMPORTANTE**: Solo puedes actualizar el estado de pago de un servicio si está en estado "pending". No se actualizan los datos del servicio. Solo se cambia el estado de pago.  
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
