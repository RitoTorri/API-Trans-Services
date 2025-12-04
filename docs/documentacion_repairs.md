# Módulo de Reparaciones (Repair Management)

## URL Base: /api/trans/services/repairs

---

### 1. Registrar Nueva Reparación

* **Endpoint:** POST /api/trans/services/repairs/registerRepair
* **Acceso:** Auth Required (Rol Administrativo/Taller)
* **Body (Solicitud):**
    | Campo | Tipo | Requerido | Descripción |
    | :--- | :--- | :--- | :--- |
    | vehicleId | number | Sí | ID del vehículo (debe estar activo). |
    | description | string | Sí | Descripción detallada de la reparación. |
    | estimatedCost | number | Sí | Costo estimado de la reparación. |

* **Respuesta Exitosa (201 Created):**
    ```json
    {
      "success": true,
      "code": "ITEM_CREATED",
      "details": {
        "id": 1,
        "status": "Pending",
        "vehicleId": 3,
        "estimatedCost": 300
      }
    }
    ```

---

### 2. Listar Todas las Reparaciones

* **Endpoint:** GET /api/trans/services/repairs/all
* **Acceso:** Auth Required
* **Respuesta Exitosa (200 OK):**
    ```json
    {
      "success": true,
      "code": "REQUEST_SUCCESSFUL",
      "details": [
        {
          "id": 1,
          "description": "Revisión general...",
          "status": "Pending",
          "vehicle": {
            "license_plate": "XYA-987"
          }
        }
      ]
    }
    ```

---

### 3. Consultar por Rango de Fechas

* **Endpoint:** GET /api/trans/services/repairs/byDateRange
* **Acceso:** Auth Required
* **Query Parameters (Parámetros de Consulta):**
    | Parámetro | Tipo | Requerido | Descripción |
    | :--- | :--- | :--- | :--- |
    | startDate | string | Sí | Fecha de inicio del rango (YYYY-MM-DD). |
    | endDate | string | Sí | Fecha de fin del rango (YYYY-MM-DD). |
* **Ejemplo de Uso:** /api/trans/services/repairs/byDateRange?startDate=2025-12-01&endDate=2025-12-02
* **Respuesta Exitosa (200 OK):** (Retorna la lista filtrada)

---

### 4. Actualizar/Finalizar Reparación

* **Endpoint:** PUT /api/trans/services/repairs/update/{repairId}
* **Acceso:** Auth Required (Rol Administrativo/Taller)
* **Path Parameter (Parámetro de Ruta):**
    | Parámetro | Tipo | Descripción |
    | :--- | :--- | :--- |
    | repairId | number | ID de la reparación a actualizar. |
* **Body (Solicitud):**
    | Campo | Tipo | Requerido | Descripción |
    | :--- | :--- | :--- | :--- |
    | status | string | No | Nuevo estado (ej: "Completed"). |
    | finalCost | number | No | Costo final real de la reparación. |
    | endDate | string | No | Fecha de finalización (Formato ISO 8601). |

* **Respuesta Exitosa (200 OK):**
    ```json
    {
      "success": true,
      "code": "REQUEST_SUCCESSFUL",
      "details": {
        "id": 1,
        "status": "Completed",
        "finalCost": 350
      }
    }
    ```