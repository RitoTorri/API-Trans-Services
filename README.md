# Proyecto-4to-Semestre
Proyecto de 4to semestre de la universidad. API de Trans-Services

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/RitoTorri/API-Trans-Services

# Navegar al directorio del proyecto
cd API-Trans-Services

# Instalar las dependencias
yarn install

```

# Configuración del Proyecto

**IMPORTANTE**: Es necesario tener instalado en su computadora:

### 🔹 Node.js
- Descargar e instalar desde: [https://nodejs.org/es/download/](https://nodejs.org/es/download/)

### 🔹 Yarn
- Instalar siguiendo las instrucciones: [https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)

## Configuración de Base de Datos

1. Crear la base de datos en XAMPP con el nombre que desee.

2. Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```bash
# Conexion a la base de datos
DATABASE_URL="mysql://root:password@localhost:3306/nombre_base_datos"

# Llave secreta para el token de autenticación, puede ser cualquier cadena
SECRET_KEY=AJuanLeGustanLasTrans
```

**Nota**: Ajustar el usuario y contraseña según tu configuración de XAMPP. Por defecto, usuario es `root` sin contraseña.

## Comandos de Prisma

Ejecutar en orden después de configurar el archivo `.env`:

```bash
# Generar el cliente de Prisma
npx prisma generate

# Crear las tablas en la base de datos
npx prisma migrate dev
```

## Estructura de la Base de Datos

El sistema incluye las siguientes tablas principales:
- users (Usuarios del sistema)
- employees (Empleados)
- roles (Roles de usuarios)
- payrolls (Nóminas)
- vehicles (Vehículos)
- clients (Clientes)
- providers (Proveedores)
- invoices_providers (Facturas de proveedores)

Todas las relaciones y constraints están definidas en el schema de Prisma.

## Ejecución del Servidor

```bash
# Ejecutar el servidor de producción
yarn start

# Ejecutar el servidor de desarrollo
yarn dev
```
