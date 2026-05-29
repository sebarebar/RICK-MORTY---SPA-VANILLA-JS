# 🛸 Rick and Morty SPA

A Single Page Application (SPA) built with Vanilla JavaScript that consumes the [Rick and Morty API](https://rickandmortyapi.com/) and allows users to explore characters, episodes, and locations from the Rick and Morty universe.

---

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

## Font Emojis

-https://html-css-js.com/html/character-codes/
