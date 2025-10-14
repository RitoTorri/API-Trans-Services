# 🚚 API Trans-Services - Proyecto 4to Semestre

API para gestión de servicios de transporte desarrollada como proyecto universitario del cuarto semestre.

---

## ⚠️ IMPORTANTE

**Si vas a realizar cambios, por favor hazlo en otra rama aparte de la principal.**

```bash
# Crear y cambiar a nueva rama
git checkout -b nombre-de-tu-rama

# Subir cambios a la nueva rama
git push origin nombre-de-tu-rama
```

---

## 🚀 Instalación y Configuración

### Prerrequisitos
<div align="center">

**Tecnologías Requeridas**  
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)
![XAMPP](https://img.shields.io/badge/XAMPP-FB7A24?style=for-the-badge&logo=xampp&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)

</div>

### 📥 Instalación del Proyecto

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

### 1. Configuración de Base de Datos
1. Iniciar Apache y MySQL en XAMPP
2. Crear una base de datos MySQL con el nombre de tu preferencia

### 2. Variables de Entorno
Crear un archivo `.env` en la raíz del proyecto:

```env
# Conexión a la base de datos
DATABASE_URL="mysql://root:@localhost:3306/trans_services"

# Llave secreta para JWT
SECRET_KEY=AJuanLeGustanLasTrans
```

**Nota:** Ajusta las credenciales según tu configuración de MySQL:
- Usuario por defecto: `root`
- Contraseña: (vacía por defecto en XAMPP)
- Puerto: `3306`
- Nombre de BD: `trans_services` (o el que hayas creado)

---

## 🗃️ Configuración de la Base de Datos

### Migraciones con Prisma

```bash
# Generar el cliente de Prisma
npx prisma generate

# Crear las tablas en la base de datos
npx prisma migrate dev

# (Opcional) Visualizar la BD con Prisma Studio
npx prisma studio
```

### 🗂️ Estructura de la Base de Datos

El sistema maneja las siguientes entidades principales:

---

## 🎯 Ejecución del Servidor

```bash
# Modo desarrollo (con hot-reload)
yarn dev

# Modo producción
yarn start

```

---

## 📊 Estado del Proyecto

![Estado](https://img.shields.io/badge/Estado-En%20Desarrollo-yellow)
![Versión](https://img.shields.io/badge/Versión-1.0.0-blue)

---
