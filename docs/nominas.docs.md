## Módulo de Nomina

### 1. Crear una Nomina
**Método:** `POST`  
**Endpoint:** `http://localhost:3000/api/trans/services/payrolls`  
**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Parámetros del Body:**
- `employee_id` (integer): ID del empleado asociado a esta nómina
- `period_start` (date): Fecha de inicio del período de nómina
- `period_end` (date): Fecha de fin del período de nómina

Las retenciones de seguro social, paro forzoso y aporte al fondo de... pueden estar en formato decimal o entero: 10.00, 2.23, 100, etc.

**Ejemplo de Body:**
```json
{
    "employee_id": "1",
    "period_start": "2025-11-03",
    "period_end": "2025-11-30",
}
```

**Respuesta:**
```json
{
    "success": true,
    "code": "REQUEST_SUCCESSFUL",
    "message": "The request was successful.",
    "details": {
        "id": 52,
        "status": "draft",
        "employee_id": 1,
        "period_start": "2024-04-01T00:00:00.000Z",
        "period_end": "2024-04-15T00:00:00.000Z",
        "daily_salary": "4.33",
        "total_days_paid": "15",
        "monthly_salary": "130",
        "integral_salary": "0",
        "annual_earnings": "0",
        "assements": "65",
        "sso": "3.7",
        "pie": "0.46",
        "faov": "1",
        "total_deductions": "3.36",
        "net_salary": "61.64",
        "created_at": "2025-11-16T00:27:07.971Z",
        "employees": {
            "id": 1,
            "name": "Jesus",
            "lastname": "Cortez",
            "ci": "32137510",
            "rol": "Chofer",
            "is_active": true,
            "created_at": "2025-11-15T19:29:30.472Z"
        }
    }
}
```

---

### 2. Listar todas las Nominas 
**Método:** `POST`. Es post para poder enviar el filtro de busqueda por el body.
**Endpoint:** `http://localhost:3000/api/trans/services/payrolls/search`
**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Parámetros del Body:**
Por parametros de búsqueda puedes enviar o fechas o stados de las nominas.

Obtener Todas las nominas:
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
    "filterSearch": {
        "status": "draft"
    }
```

**Respuesta: Recibes todos las nominas que cumplen con los filtros.**
```json
{
    "success": true,
    "code": "REQUEST_SUCCESSFUL",
    "message": "The request was successful.",
    "details": [
        {
            "id": 52,
            "status": "draft",
            "employee": {
                "name": "Jesus",
                "ci": "32137510",
                "rol": "Chofer",
                "old_date": "Años 0 y Meses 0",
                "date_of_entry": "2025-11-15T19:29:30.472Z"
            },
            "Payment_period": {
                "from": "2024-04-01T00:00:00.000Z",
                "to": "2024-04-15T00:00:00.000Z"
            },
            "details": {
                "salary_daily": "4.33",
                "total_days_paid": "15",
                "integral_salary": "0",
                "annual_earnings": "0"
            },
            "description": {
                "salary_biweekly": "65",
                "monthly_salary": "130",
                "deductions": {
                    "sso": "3.7",
                    "pie": "0.46",
                    "faov": "1"
                },
                "totalDeductions": "3.36",
                "net_salary": "61.64"
            }
        }
    ]
}
```

---

### 3. Actualizar el estado de una Nomina
**INPORTANTE**: Solo puedes actualizar el estado de una nomina si está en estado "draft".  
**Método:** `PATCH`  
**Endpoint:** `http://localhost:3000/api/trans/services/payrolls/:id/:status`
**Headers:**
```
Authorization: Bearer {token}
```

**Parámetros del URL:**
- `status` (string): Estado de la nomina: draft, cancelled o paid
- `id` (integer): ID de la nomina

**Ejemplo de URL:**
```
PATCH http://localhost:3000/api/trans/services/payrolls/1/paid
```

**Respuesta:**
```json
{
    "success": true,
    "code": "REQUEST_SUCCESSFUL",
    "message": "The request was successful.",
    "details": {
        "message": "payroll update succefully.",
        "data": {
            "id": 51,
            "status": "paid",
            "employee_id": 1,
            "period_start": "2024-04-01T00:00:00.000Z",
            "period_end": "2024-04-15T00:00:00.000Z",
            "daily_salary": "4.33",
            "total_days_paid": "15",
            "monthly_salary": "130",
            "integral_salary": "0",
            "annual_earnings": "0",
            "assements": "65",
            "ivss": "3.7",
            "pie": "0.46",
            "faov": "1",
            "total_deductions": "3.36",
            "net_salary": "61.64",
            "created_at": "2025-11-16T00:04:26.423Z"
        }
    }
}
```

---
