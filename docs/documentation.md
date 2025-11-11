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

**Nota:** No es obligatorio enviar todos los campos.

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

**Nota:** No es obligatorio enviar todos los campos.