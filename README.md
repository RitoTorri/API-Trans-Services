# API Trans-Services

### IMPORTANTE  

1. Si vas a hacer cambios recuerda en hacerlo en ramas distintas. Si vas a fusionar avisale al team.
2. Debes de tener instalado PostgreSQL, Yarn, Node.js.
3. Si vas a hacer un nuevo modulo debes de seguir la misma arquitectura de archivos que los demas modulos.

---

### INSTALACIÓN DEL PROYECTO

Ejecuta los siguentes comandos para instalar el proyecto:
```bash
# Clonas el repositorio
git clone https://github.com/RitoTorri/API-Trans-Services

# instala las dependencias
yarn install 
```
---

### CONFIGURAR LA BASE DE DATOS

AL ya haber instalado el proyecto debes de crear un archivo `.env` para guardar datos sensibles. El `.env` tendra:
1. **DATABASE_URL:**  
    `postgres`: El usuario de tu deb, por defecto es postgres.
   
    `password`: Va la contraseña que te pide postgre al ejecutar o abrir el server.
   
    `localhost`: Host de tu base de datos.
   
    `5432`: Puerto de la db.
   
    `nombre-de-la-base-de-datos`: Va el nombre que le colocaste a la bases de datos al crearla en PostgreSQL.
   
2. **SECRET_KEY:** Es la clave/llave que contienen los tokens de acceso.

3. **PORT:** Que es el puerto de ejecución de la API.

```bash
# Conexión a la base de datos
DATABASE_URL="postgresql://postgres:password@localhost:5432/nombre-de-la-base-de-datos"

# Llave secreta para JWT
secret_key=LlaveSecreta

# Puerto
PORT:3000
```
---

### CONFIGURACIÓN DE PRISMA

Luego de crear el `.env` ejecuta los siguientes comandos para la configuracion de prisma:
```bash
# Genera el cliente de prisma
npx prisma generate

# Lleva el chema de prisma a la base de datos
npx prisma db push
```
---

### EJECUCIÓN DEL SERVIDOR

Para ejecutar el server usa los comandos:
```bash
# Desarrollo
yarn dev

# Producción
yarn start
```
---
