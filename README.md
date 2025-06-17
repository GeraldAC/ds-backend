# Backend de Gestión de Emprendimientos

Este proyecto es un backend desarrollado con **Node.js**, **Express** y **MySQL**. Permite gestionar usuarios, productores, emprendimientos, productos y reseñas. Incluye autenticación mediante **JWT** y sigue una estructura limpia basada en el patrón **Modelo-Vista-Controlador (MVC)**.

## 🚀 Tecnologías

- Node.js
- Express
- MySQL
- JWT (JSON Web Token)
- dotenv

## 📁 Estructura del proyecto

```bash
src/
├── config/        # Configuración de la base de datos y variables de entorno
├── controllers/   # Lógica de negocio y manipulación de datos
├── models/        # Definición de modelos de datos (ORM / consultas SQL)
├── routes/        # Definición de rutas y endpoints de la API
├── middlewares/   # Middlewares para validaciones y seguridad
├── services/      # Servicios externos y funciones auxiliares
├── app.js         # Configuración principal de Express
└── server.js      # Inicialización del servidor
```

## ✅ Funcionalidades

- Registro y login de usuarios
- Gestión de productores y emprendimientos
- CRUD de productos
- Publicación y consulta de reseñas
- Middleware de autenticación
