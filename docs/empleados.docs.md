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
    "salary_biweekly": "Float",
    "date_of_entry": "Date",
    "contacts": [
        {
            "contact_info": "string",
        },
        {
            "contact_info": "string",
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
    "salary_biweekly": "Float",
    "date_of_entry": "Date",
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