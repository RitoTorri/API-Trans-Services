# Módulo de Usuarios
**Rol requerido:** SuperUsuario

### 1. Crear usuario
**Método:** `POST`  
**Endpoint:** `http://localhost:3000/api/trans/services/users`
**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Parámetros URL:**
- `username` (string): Nombre de usuario
- `password` (string): Contraseña
- `rol` (string): Rol del usuario

**Ejemplo de Body:**
```json
    "username": "Jesus",
    "password": "123456",
    "rol": "SuperUsuario" o "Administrador" o "Invitado"
```

**Respuesta:**
```json
{
    "success": true,
    "code": "REQUEST_SUCCESSFUL",
    "message": "The request was successful.",
    "details": {
        "id": 280,
        "username": "jesus",
        "rol": "Invitado"
    }
}
```

### 2.  Listar todos los usuarios
**Método:** `GET`  
**Endpoint:** `http://localhost:3000/api/trans/services/users`
**Headers:**
```
Authorization: Bearer {token}
```

**Respuesta:**
```json
    "success": true,
    "code": "REQUEST_SUCCESSFUL",
    "message": "The request was successful.",
    "details": [
        {
            "id": 1,
            "username": "Jesus",
            "rol": "SuperUsuario",
            "created_at": "2025-11-18T19:30:22.048Z"
        },
        {
            "id": 2,
            "username": "Jesus2",
            "rol": "Administrador",
            "created_at": "2025-11-18T19:30:22.048Z"
        }
    ]
```

### 3. Eliminar usuario
**Método:** `DELETE`  
**Endpoint:** `http://localhost:3000/api/trans/services/users/:id`
**Headers:**
```
Authorization: Bearer {token}
```

**Parámetros URL:**
- `id` (integer): ID del usuario

**Respuesta:**
```json
{
    "success": true,
    "code": "REQUEST_SUCCESSFUL",
    "message": "The request was successful.",
    "details": {
        "message": "User deleted successfully.",
        "result": {
            "id": 6,
            "rol": "SuperUsuario",
            "username": "lol",
            "password": "$2b$10$DO0QHDUVvvtuZLBbaAXL..rfQPr0WkA.9IS3Hqs4HDq0SIz00XByq",
            "created_at": "2025-12-13T19:55:00.642Z"
        }
    }
}
```

---

### 4. Actualizar usuario
**NOTA:** Solo debes de mandar los datos que deseas actualizar.
**Método:** `PATCH`  
**Endpoint:** `http://localhost:3000/api/trans/services/users/:id`
**Headers:**
```
Authorization: Bearer {token}
```

**Parámetros URL:**
- `id` (integer): ID del usuario
- `username` (string): Nombre de usuario
- `password` (string) : Contraseña de usuario
- `rol` (string): Rol del usuario

**Ejemplo de Body:**
```json
    "username": "Jesus",
    "password": "123456",
    "rol": "SuperUsuario" o "Administrador" o "Invitado"
```

**Respuesta:**
```json
{
    "success": true,
    "code": "REQUEST_SUCCESSFUL",
    "message": "The request was successful.",
    "details": {
        "message": "User updated successfully.",
        "result": {
            "id": 6,
            "username": "lol",
            "rol": "SuperUsuario",
            "created_at": "2025-12-13T19:55:00.642Z"
        }
    }
}
``` 