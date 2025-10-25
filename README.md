
# 🚚 API Trans-Services - Proyecto 4to Semestre

## 📋 Descripción del Proyecto
API para gestión de servicios de transporte desarrollada como proyecto universitario del cuarto semestre. Esta solución proporciona un backend robusto para administrar operaciones logísticas y de transporte.

---

## ⚠️ AVISO IMPORTANTE

### Política de Ramas
Si vas a realizar cambios, por favor hazlo en otra rama aparte de la main. Esto mantiene nuestro código organizado y estable. Si vas a hacer fusiones recuerda avisarle al team.

### Comandos Esenciales de Git
```bash
# Crear una nueva rama
git branch nombre-de-tu-rama

# Cambiar a la nueva rama
git checkout nombre-de-tu-rama

# Subir cambios a la nueva rama
git push origin nombre-de-tu-rama
```

---

## 🚀 Instalación

<div align="center">

### Tecnologías Requeridas
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

</div>

### Proceso de Instalación
```bash
# Clonar el repositorio
git clone https://github.com/RitoTorri/API-Trans-Services

# Navegar al directorio del proyecto
cd API-Trans-Services

# Instalar las dependencias
yarn install
```

---

## ⚙️ Configuración del Entorno

### Configuración de Base de Datos

**Pasos a seguir:**
1. **Crear Base de Datos**: Debes crear una base de datos en PostgreSQL sin tablas, solo la base de datos
2. **Configurar Credenciales**: Asegúrate de tener acceso con usuario y contraseña

### Variables de Entorno
Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
# Conexión a la base de datos
DATABASE_URL="postgresql://postgres:password@localhost:5432/nombre-de-la-base-de-datos"

# Llave secreta para JWT
SECRET_KEY=AJuanLeGustanLasTrans
```

### Notas de Configuración
Ajusta las credenciales según tu configuración de PostgreSQL:

- **Usuario por defecto**: Se utiliza `postgres` como usuario principal para la conexión
- **Contraseña**: Debes ingresar la contraseña que estableciste durante la instalación de PostgreSQL
- **Puerto**: El puerto predeterminado es `5432`, que es el estándar para conexiones PostgreSQL
- **Nombre de BD**: Puedes usar `trans_services` o cualquier otro nombre que hayas definido para tu base de datos

---

## 🗃️ Configuración de la Base de Datos

Una vez configurado tu entorno de desarrollo, ejecuta los siguientes comandos en la terminal, ubicándote en el directorio donde se encuentra la API.

### Migraciones con Prisma
```bash
# Aplicar migraciones existentes
npx prisma migrate deploy

# Generar/actualizar cliente Prisma (por si hay cambios)
npx prisma generate

# (Opcional) Visualizar la BD con Prisma Studio
npx prisma studio
```

---

## 🎯 Ejecución del Servidor

### Comandos de Ejecución
```bash
# Modo desarrollo (con hot-reload)
yarn dev

# Modo producción
yarn start
```

---

## 📊 Estado del Proyecto

### Metadatos del Proyecto
![Estado](https://img.shields.io/badge/Estado-En%20Desarrollo-yellow)
![Versión](https://img.shields.io/badge/Versión-1.0.0-blue)

---
