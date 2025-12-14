# 📦 Catálogo: Modelos de Vehículos (Vehicle Models)

## URL Base: /api/trans/services

---

### 1. Listar Todos los Modelos

* **Endpoint:** GET /listModel
* **Acceso:** Auth Required
* **Body (Solicitud):** N/A
* **Respuesta Exitosa (200 OK):**
    ```json
    {
      "success": true,
      "code": "REQUEST_SUCCESSFUL",
      "message": "The request was successful.",
      "details": [
        {
          "id": 2,
          "name": "Ford Transit"
        },
        {
          "id": 4,
          "name": "Mercedes Benz Sprinter"
        }
      ]
    }
    ```

---

### 2. Registrar Nuevo Modelo

* **Endpoint:** POST /registerModel
* **Acceso:** Auth Required (Rol Administrativo)
* **Body (Solicitud):**
    | Campo | Tipo | Requerido | Descripción |
    | :--- | :--- | :--- | :--- |
    | name | string | Sí | Nombre único del modelo de vehículo (ej: "Toyota Corolla"). |
* **Respuesta Exitosa (201 Created):**
    ```json
    {
      "success": true,
      "code": "ITEM_CREATED",
      "message": "The item was created successfully.",
      "details": {
        "model": {
          "id": 7,
          "name": "Chevrolet Captiva"
        },
        "message": "Modelo de vehículo registrado exitosamente."
      }
    }
    ```
* **Respuesta Fallida (409 Conflict):**
    ```json
    {
      "success": false,
      "code": "RESOURCE_CONFLICT",
      "message": "The resource already exists or conflicts with existing data.",
      "details": {
        "error": "MODEL_NAME_ALREADY_EXISTS",
        "message": "El nombre del modelo 'Chevrolet Captiva' ya existe."
      }
    }
    ```

---

### 3. Actualizar Modelo

* **Endpoint:** PUT /updateModel/{id}
* **Acceso:** Auth Required (Rol Administrativo)
* **Path Parameter (Parámetro de Ruta):**
    | Parámetro | Tipo | Descripción |
    | :--- | :--- | :--- |
    | id | number | ID del modelo a actualizar. |
* **Body (Solicitud):**
    | Campo | Tipo | Requerido | Descripción |
    | :--- | :--- | :--- | :--- |
    | name | string | Sí | El nuevo nombre para el modelo. |
* **Respuesta Exitosa (200 OK):**
    ```json
    {
      "success": true,
      "code": "REQUEST_SUCCESSFUL",
      "message": "The request was successful.",
      "details": {
        "model": {
          "id": 7,
          "name": "Chevrolet Equinox"
        },
        "message": "Modelo de vehículo actualizado exitosamente."
      }
    }
    ```

---

### 4. Eliminar Modelo

* **Endpoint:** DELETE /deleteModel/{id}
* **Acceso:** Auth Required (Rol Administrativo)
* **Path Parameter (Parámetro de Ruta):**
    | Parámetro | Tipo | Descripción |
    | :--- | :--- | :--- |
    | id | number | ID del modelo a eliminar. |
* **Respuesta Exitosa (200 OK):**
    ```json
    {
      "success": true,
      "code": "REQUEST_SUCCESSFUL",
      "message": "The request was successful.",
      "details": {
        "message": "Modelo de vehículo eliminado exitosamente."
      }
    }
    ```
* **Respuesta Fallida (409 Conflict - Llave Foránea):**
    ```json
    {
      "success": false,
      "code": "RESOURCE_CONFLICT",
      "message": "The resource already exists or conflicts with existing data.",
      "details": {
        "error": "MODEL_IN_USE",
        "message": "No se puede eliminar el modelo. Está asociado a vehículos activos en la flota."
      }
    }
    ```