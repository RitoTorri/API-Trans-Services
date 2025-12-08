# Módulo Facturas (Provider Invoices)

## Descripción general
El módulo Provider Invoices gestiona las facturas de proveedores: creación con IVA automático desde el catálogo, cálculo de totales, asociación automática de gastos al marcar como "pagado", búsquedas y filtros, cambio de estado, eliminación lógica (soft delete) y restauración. Todos los endpoints están protegidos con token y autorización de roles: Administrador y SuperUsuario.

## Modelo de datos (según schema)
### Tabla provider_invoices:
- id (PK)
- provider_id (FK → providers.id)
- control_number (string, ≤30)
- invoice_date (date)
- subtotal (decimal, 10,2)
- total_amount (decimal, 10,2)
- status (enum: pendiente, cancelado, pagado)
- description (string, ≤255, opcional)
- created_at (timestamp)

### Tabla invoice_taxes:
- id (PK)
- provider_invoice_id (FK → provider_invoices.id)
- tax_code (string, referencia a tax_parameters.code)
- amount (decimal, 10,2)
- created_at (timestamp)

### Tabla expenses:
- id (PK)
- id_expense_type (FK → expense_types.id)
- description (string, ≤255)
- total (decimal, 10,2)
- created_at (timestamp)

### Tabla tax_parameters (catálogo de impuestos/retenciones):
- code (PK, string)
- name (string)
- percentage (decimal, 10,2)
- description (string)
- created_at (timestamp)

### Tabla expense_types (catálogo de tipos de gasto):
- id (PK)
- name (string, único)
- description (string)
- created_at (timestamp)

## Validaciones
### Middleware (request):
- provider_id numérico válido (en URL).
- Campos obligatorios: invoice_date, subtotal.
- Formato: provider_id válido, invoice_date fecha válida.
- Numéricos: subtotal tipo number y ≥ 0.

### Service (negocio):
- Proveedor debe existir.
- description (si viene): texto válido, no vacío, ≤255, caracteres permitidos (letras, números, espacios, puntos, comas, paréntesis).
- IVA: se obtiene de tax_parameters (code = "iva") y se aplica al subtotal.
- Transiciones de estado: pendiente → pagado (genera gasto automático), pendiente → cancelado. No se permite modificar una factura en estado pagado o cancelado.

## Autenticación y autorización
- Header requerido: Authorization: Bearer <token>.
- Autorización de roles: Administrador, SuperUsuario.

## Endpoints

### Crear factura con IVA automático (estado inicial pendiente)
URL: POST /api/trans/services/provider-invoice/:provider_id
Headers: Authorization: Bearer <token>
Content-Type: application/json
Body:
{
  "invoice_date": "2025-12-01",
  "subtotal": 1200,
  "description": "Factura por compra de repuestos (motor)"
}

### Listar todas las facturas activas
URL: GET /api/trans/services/provider-invoices
Headers: Authorization: Bearer <token>

### Listar facturas por proveedor
URL: GET /api/trans/services/provider-invoices/provider/:provider_id
Headers: Authorization: Bearer <token>

### Filtrar facturas por rango de fechas
URL: GET /api/trans/services/provider-invoices-range?start=YYYY-MM-DD&end=YYYY-MM-DD
Headers: Authorization: Bearer <token>

### Buscar por número de control
URL: GET /api/trans/services/provider-invoices/search/:value
Headers: Authorization: Bearer <token>

### Listar facturas eliminadas (soft deleted)
URL: GET /api/trans/services/provider-invoices-deleted
Headers: Authorization: Bearer <token>

### Restaurar factura eliminada
URL: PUT /api/trans/services/provider-invoice/restore/:id
Headers: Authorization: Bearer <token>

### Soft delete: marcar factura como eliminada
URL: DELETE /api/trans/services/provider-invoice/:id
Headers: Authorization: Bearer <token>

### Cambiar estado de una factura
URL: PATCH /api/trans/services/provider-invoice/:id/status
Headers: Authorization: Bearer <token>
Content-Type: application/json
Body:
{
  "status": "pagado"
}

### Consultar factura completa con impuestos y gasto (si existe)
URL: GET /api/trans/services/provider-invoices/:id/full
Headers: Authorization: Bearer <token>

## Flujo recomendado de pruebas
1. Crear factura con IVA (estado inicial pendiente).
2. Listar facturas y verificar creación (subtotal, total_amount, IVA en invoice_taxes).
3. Cambiar estado a "pagado" y confirmar creación de gasto automático en expenses (tipo "compras").
4. Consultar factura completa (:id/full) para ver impuestos y gasto asociado.
5. Probar búsqueda por número de control y por rango de fechas.
6. Eliminar factura (soft delete) y verificar en listado de eliminadas.
7. Restaurar factura eliminada y confirmar en listado general.

## Respuestas y errores comunes
- Proveedor no encontrado. → al crear si el proveedor no existe.
- Factura no encontrada. → id inexistente en consulta/eliminar/restaurar.
- La factura no está marcada como eliminada. → al restaurar una factura que no está eliminada.
- Falta fecha de inicio o fin. → en filtros por rango de fechas sin parámetros.
- ID de factura inválido. → id inválido en delete/restore o :id/full.
- No se puede modificar una factura con estado 'pagado' o 'cancelado'. → restricción de transición.
- Transición inválida: pendiente solo puede pasar a pagado o cancelado. → validación de estado.
- IVA no está definido en el catálogo de impuestos. → al crear si falta tax_parameters "iva".

## Notas de implementación
- control_number se genera automáticamente de forma consecutiva (prefijo CN- y padding).
- invoice_date se convierte a Date en el controller antes de crear.
- IVA y total_amount se calculan desde tax_parameters (code "iva") en el service/model.
- Al cambiar a "pagado", se crea un gasto en expenses con expense_types "compras" (si no existe, se crea) y descripción basada en la factura.
- Unicidad práctica del gasto: se usa la descripción con el control_number para evitar duplicados sin cambios de schema.
- Soft delete: se marca control_number con prefijo deleted_<timestamp> y se excluye de listados activos.
- Seguridad: validateTokenAccess y authorization(['Administrador', 'SuperUsuario']) aplicados en todas las rutas.
