# SPA Vanilla JavaScript - Rick and Morty

## Descripción

Este proyecto es un ejemplo de cómo construir una SPA (Single Page Application) utilizando únicamente JavaScript Vanilla, sin frameworks ni librerías externas.

La aplicación implementa:

- Routing básico SPA
- Renderizado dinámico de vistas
- Arquitectura modular
- Consumo de APIs REST
- Componentización
- Separación de responsabilidades
- Carga dinámica de archivos HTML
- Buenas prácticas de documentación con JSDoc

---

# Características

## Home

- Consume la API pública de Rick and Morty
- Obtiene personajes dinámicamente
- Renderiza cards reutilizables

## Contactos

- Formulario desacoplado
- Manejo de eventos JavaScript

## Quiénes Somos

- Página estática modular

## Arquitectura SPA

- Navegación sin recargar la página
- Hash Routing
- Carga dinámica de vistas

---

# Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript ES6+
- Axios API
- ES Modules

---

# Estructura del proyecto

```txt
spa-rick-morty/
│
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   │
│   └── js/
│       ├── app.js
│       ├── router.js
│       │
│       ├── services/
│       │   └── api.js
│       │
│       ├── utils/
│       │   └── helpers.js
│       │
│       ├── components/
│       │   ├── navbar.js
│       │   └── characterCard.js
│       │
│       ├── pages/
│       │   ├── home.js
│       │   ├── contacts.js
│       │   └── about.js
│       │
│       └── views/
│           ├── home.html
│           ├── contacts.html
│           └── about.html
│
└── README.md
```

# Ejecución del proyecto

## Crear un archivo .env

```bash
VITE_API_URL=https://rickandmortyapi.com/api
VITE_CONTENT_TYPE=application/json
VITE_TIME_OUT=5000
```

## Ejecutar el proyecto

Para ejecutar el proyecto, primero se debe instalar las dependencias y luego realizar el run del proyecto

```bash
npm install
npm run dev
```
