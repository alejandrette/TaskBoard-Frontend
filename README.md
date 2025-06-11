# 🧩 TaskBoard - App de Gestión de Tareas

**TaskBoard** es una aplicación web para la organización de tareas personales o en equipo. Ofrece autenticación de usuarios, gestión de proyectos y tareas en columnas estilo Kanban, y una interfaz intuitiva y responsiva.

## 🚀 Demo en vivo

🔗 **Frontend**: [https://taskboard-frontend.vercel.app](https://taskboard-frontend.vercel.app)  
🔗 **Backend API**: [https://taskboard-backend-1.onrender.com/api](https://taskboard-backend-1.onrender.com/api)

---

## ✨ Características

- ✅ Registro y login de usuarios
- ✅ Confirmación de cuenta vía correo electrónico
- ✅ Recuperación y cambio de contraseña
- ✅ Creación de tableros y columnas (Kanban)
- ✅ Tareas con título, descripción y edición en línea
- ✅ Interfaz moderna y fácil de usar

---

## 🛠️ Tecnologías

### Frontend (Instalación)

- ⚛️ React + TypeScript
- 💨 Tailwind CSS
- 🍪 js-cookie
- 🔐 JWT Auth

### Backend (Instalación)

- 🧬 Node.js + Express
- 🗃️ MongoDB (Mongoose)
- ✉️ Nodemailer (con Mailtrap)
- 🔐 JSON Web Tokens
- 📩 CORS configurado dinámicamente
- 📦 Hospedado en Render

---

## 📦 Instalación local

### Backend

```bash
# Clona el repo
git clone https://github.com/tuusuario/TaskBoard-Backend
cd TaskBoard-Backend
```

### Instala dependencias

```bash
npm install
```

## Crea un archivo .env con tus variables

PORT=4000
FRONT_URL=`http://localhost:5173`
DATABASE_URL=mongodb+srv://...
JWT_SECRET=tu_clave_secreta
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=...
SMTP_PASS=...

## Ejecuta en desarrollo

```bash
npm run dev
```

### Frontend

```bash
## Clona el repo
git clone https://github.com/tuusuario/TaskBoard-Frontend
cd TaskBoard-Frontend
```

```bash
npm install
```

```bash
# Crea un archivo .env con:
VITE_API_URL=http://localhost:4000/api
```

```bash
# Ejecuta en desarrollo
npm run dev
```

## 📚 Aprendizajes

Este proyecto me permitió reforzar conceptos de:

- Manejo de autenticación segura con JWT
- Arquitectura cliente-servidor con APIs REST
- Gestión de estado y UX con React
- Buenas prácticas de despliegue en Render y Vercel

## 💡 Próximas mejoras

- Soporte multiusuario por tablero
- Drag and drop de tareas
- Notificaciones por email

## 🧑‍💻 Autor

Desarrollado por Alejandro
📫 Contacto: [Linkedin](https://www.linkedin.com/in/alejandro-casafer/)

## 📄 Licencia

Este proyecto está bajo la MIT License.
