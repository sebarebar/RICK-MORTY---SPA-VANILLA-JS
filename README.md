# 🛸 Rick and Morty SPA

A Single Page Application (SPA) built with Vanilla JavaScript that consumes the [Rick and Morty API](https://rickandmortyapi.com/) and allows users to explore characters, episodes, and locations from the Rick and Morty universe.

---



**📊 Diagrama de Flujo**
```mermaid
flowchart TD
    A[Inicio] --> B[DOMContentLoaded]
    B --> C[Inicializar Router]
    C --> D[Configurar Hash Routing]
    D --> E[Detectar hash actual]
    E --> F{¿Existe ruta?}
    F -->|Sí| G[Ruta encontrada]
    F -->|No| H[404 - Página no encontrada]
    G --> I[Importar vista dinámica]
    I --> J[Renderizar contenido en #app]
    I --> K[Ejecutar lógica de la vista (Home, Contacts, About)]
    J --> L[Renderizar Navbar]
    L --> M[Eventos: Navegación + Interacción con personajes]
    M --> N[Home: Fetch personajes + Cards dinámicas]
    M --> O[Contacts: Manejo de formulario]
    M --> P[About: Contenido estático]
    K --> Q[Fin de la interacción]
    A --> R[Salida / Cierre de navegador]

    style A fill:#ef4444,stroke:#b91c1c,stroke-width:4px,color:#ffffff,stroke-dasharray:5,5
    style Q fill:#f87171,stroke:#991b1b
```
## 🚀 Technologies

- JavaScript Vanilla (ES6+)
- Vite
- Axios
- Rick and Morty API
- LocalStorage

---

## 📁 Project Structure

```
example-spa/
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── img/
│   │   └── R&M.png
│   └── js/
│       ├── components/
│       │   ├── characterCard.js     # Character card component
│       │   ├── episodesCard.js      # Episode card component
│       │   ├── locationsCard.js     # Location card component
│       │   └── navbar.js            # Navigation bar component
│       ├── pages/
│       │   ├── about.js             # About view
│       │   ├── contacts.js          # Contacts view
│       │   ├── episodes.js          # Episodes view
│       │   ├── feedback.js          # Feedback view
│       │   ├── home.js              # Home view (characters)
│       │   └── locations.js         # Locations view
│       ├── services/
│       │   ├── api.js               # API consumption
│       │   ├── httpClient.js        # HTTP client with Axios
│       │   └── storage.js           # localStorage and sessionStorage handler
│       ├── utils/
│       │   ├── errorHandler.js      # Global error handler
│       │   └── helpers.js           # Reusable utility functions
│       ├── views/
│       │   ├── about.html
│       │   ├── contacts.html
│       │   ├── episodes.html
│       │   ├── feedback.html
│       │   ├── home.html
│       │   └── locations.html
│       ├── app.js                   # Main entry point
│       └── router.js                # SPA Router
├── index.html
├── package.json
└── README.md
```

---

## ⚙️ Installation and Usage

**1. Clone the repository:**

```bash
git clone <repository-url>
cd example-spa
```

**2. Install dependencies:**

```bash
npm install
```

**3. Start the development server:**

```bash
npm run dev
```

**4. Open in browser:**

```
http://localhost:5173
```

---

## 📄 Available Scripts

| Command           | Description                   |
| ----------------- | ----------------------------- |
| `npm run dev`     | Starts the development server |
| `npm run build`   | Builds the app for production |
| `npm run preview` | Previews the production build |

---

## 🧩 Features

### Characters (Home)

- List of characters fetched from the API
- localStorage cache to avoid unnecessary API calls
- Create custom local characters
- Edit name, species and status of any character
- Delete characters with confirmation dialog

### SPA Navigation

- Client-side routing without page reloads using `history.pushState`
- Browser back/forward button support
- 404 page for unknown routes

### Persistence

- Characters are saved in localStorage
- Changes (create, edit, delete) persist between sessions

---

## 🗂️ Architecture

The project follows a modular architecture divided into layers:

**`services/`** — handles API communication and storage. No DOM knowledge.

**`components/`** — functions that generate HTML as strings. No event handling.

**`pages/`** — render full views, handle events, and coordinate services.

**`utils/`** — reusable functions with no business logic dependencies.

**`router.js`** — maps URL paths to render functions.

**`app.js`** — entry point that initializes the router and SPA navigation.

---

## 🌐 API Reference

[Rick and Morty API](https://rickandmortyapi.com/) — free public API with information about characters, episodes, and locations from the show.

| Endpoint     | Description        |
| ------------ | ------------------ |
| `/character` | List of characters |
| `/episode`   | List of episodes   |
| `/location`  | List of locations  |

---

## 📋 Requirements

- Node.js >= 18.0.0
- npm

## Emojis source
source where the emojis were implemented:
-https://html-css-js.com/html/character-codes/


## Architectural Design

**Question 1:**

How will you manage the state of locally created characters?
A: For state management, a two-tier architecture has been defined: a global in-memory array (currentCharacters) will serve as the single source of truth during the session, synchronized bidirectionally with localStorage under the key ‘my_characters’. The startup flow will prioritize reading from local storage to ensure immediate persistence, resorting to the API only if the local data is empty; any write operation (create, edit, delete) will atomically update both layers to avoid inconsistencies.

**Question 2:**

How will you differentiate between original characters and fictional characters?
A/Entity differentiation will be resolved through a naming convention in the identifiers: while original characters will retain their numerical IDs from the API, local records will be generated with a ‘local-’ prefix followed by a unique timestamp. This structure will allow the rendering component (characterCard) to determine the data’s origin through a simple string check (startsWith) and dynamically assign the visual label “Fictitious” or “Real” without the need for additional metadata.

**Question 3**
How will you synchronize:
•API
•DOM
•localStorage
•SPA rendering

 The system’s synchronization will strictly follow a unidirectional data flow pattern (API → Memory → Persistence → DOM), eliminating direct manipulation of the DOM. It has been established that rendering will be reactive: any data mutation will first trigger an update to the in-memory array, then its persistence in localStorage, and finally a complete re-rendering of the HTML container based on the new state, all orchestrated by the SPA router to maintain consistency with every view change.

**Question 4**
How will you avoid duplication of logic?
A/To avoid duplication of logic, the architecture will be based on centralization: repetitive storage and loading operations will be encapsulated in single utility modules (storage.js, helpers.js), and standardized card components will be used for HTML generation. A single re-rendering block will be implemented and invoked after any user action, ensuring that the interface update logic is written only once and remains consistent for creating, editing, or deleting elements.





**Question 5**
Which components can be reused?
A: To avoid duplication of logic, the architecture will be based on centralization: repetitive storage and loading operations will be encapsulated in single utility modules (storage.js, helpers.js), and standardized card components will be used for HTML generation. A single re-rendering block will be implemented and invoked after any user action, ensuring that the interface update logic is written only once and remains consistent for creating, editing, or deleting elements.


