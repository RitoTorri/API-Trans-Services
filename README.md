# API Trans-Services

## 📋 Descripción  

APIREST del Sistema Contable para Trans Services C.A. Backend especializado que gestiona y automatiza todos los procesos del área financiera y contable de la empresa.

## 🛠 Stack Tecnológico

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)](https://yarnpkg.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)

</div>

## 👥 Roles de la API

**Importante:** La API tiene un `SuperUsuario` creado por defecto. Por ende, al inicar sesión debes de mandar los siguientes datos para entrar como el Super Usuario:

- **Usuario**: `super`
- **Contraseña**: `super`

| Rol | Permisos | Descripción |
|-----|----------|-------------|
| **SuperUsuario** | 🔓 **Acceso Total** | Control completo sobre todas las funcionalidades del sistema |
| **Administrador** | 📊 **Gestión Limitada** | Permisos para crear y consultar registros contables |
| **Invitado** | 👁️ **Solo Lectura** | Visualización exclusiva de datos públicos |

## ⚠️ Lineamientos de Desarrollo

1. **🔀 Gestión de Ramas**  
   Realiza cambios en ramas separadas. Notifica al equipo antes de fusionar.

2. **📁 Estructura Modular**  
   Nuevos módulos deben seguir la arquitectura establecida para mantener consistencia.

## 📥 Instalación y Configuración

### Pre-requisitos

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Yarn](https://img.shields.io/badge/Yarn-1.22+-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)](https://yarnpkg.com/)

</div>

### Instalación del Proyecto

```bash
# 1. Clonar repositorio
git clone https://github.com/RitoTorri/API-Trans-Services
cd API-Trans-Services

# 2. Instalar dependencias
yarn install
```

### Configuración de Base de Datos

Crea un archivo `.env` en la raíz del proyecto con:

```env
# 🔗 Conexión a PostgreSQL
DATABASE_URL="postgresql://USUARIO:CONTRASEÑA@localhost:5432/NOMBRE_BD"

# 🔐 Llave secreta para JWT
SECRET_KEY=tu_llave_secreta_aqui

# 🌐 Puerto de la API
PORT=3000
```

**Explicación de DATABASE_URL:**
- **USUARIO**: `postgres` (usuario por defecto)
- **CONTRASEÑA**: Contraseña de tu PostgreSQL
- **localhost**: Host de la base de datos
- **5432**: Puerto predeterminado de PostgreSQL
- **NOMBRE_BD**: Nombre de tu base de datos creada

### Configuración de Prisma

```bash
# Genera el cliente de Prisma
npx prisma generate

# Sincroniza el esquema con la base de datos
npx prisma db push
```

### Ejecución del Servidor

```bash
# 🧪 Modo Desarrollo (con recarga automática)
yarn dev

# 🚀 Modo Producción
yarn start
```