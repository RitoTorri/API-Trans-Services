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