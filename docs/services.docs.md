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

**Ejemplo de Body:**
```json
    "services": [
        {
            "vehicle_id": 1,
            "client_id": 1,
            "price": 1200,
            "start_date": "2025-11-03",
            "end_date": "2025-11-30"
        },
        {
            "vehicle_id": 1,
            "client_id": 1,
            "price": 1200,
            "start_date": "2025-11-03",
            "end_date": "2025-11-30"
        }
    ]
```
**Nota:** Se debe de mandar un arreglo llamado services, este contendra los objetos de los servicios que se van a crear. No es obligatorio enviar multriples objetos, por lo menos se requiere 1.
---

### 2. Listar todos los servicios
**Método:** `POST`. Es post para poder enviar el filtro de busqueda por el body.  
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
    "filterSearch": "pagado" o "pendiente" o "cancelado"
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
            "vehicle": {
                "license_plate": "xxxx"
                "name_driver": "Jesus",
                "lastname_driver": "Cortez"
            },
            "totalAmount": 12740.88
            "totalAmountBs": 12740.88
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
