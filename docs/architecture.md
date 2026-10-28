# Architecture

## Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19 + Vite (JavaScript) |
| Backend | Node.js + Express (CommonJS) |
| Database | MySQL (schema not yet created) |

## High-level layout

```
.
├── frontend/    React SPA (Vite dev server, port 5173)
├── backend/     Express REST API (port 5000)
├── database/    schema.sql / seed.sql placeholders
├── docs/        Project documentation
├── .env.example Environment variable template
└── README.md    Setup and run instructions
```

## Backend layering

Requests flow through the backend in one direction:

```
routes/  →  controllers/  →  services/  →  models/  →  MySQL
              (HTTP glue)    (business      (data access)
                              logic)
```

- **config/** – environment and future DB/ORM configuration.
- **routes/** – URL → controller mapping only; no business logic.
- **controllers/** – parse the request, call a service, shape the HTTP response.
- **services/** – business logic, reusable across controllers.
- **models/** – queries and data access (MySQL).
- **middleware/** – cross-cutting concerns (logging, auth, validation, errors).
- **utils/** – small stateless helpers.

Empty folders are kept with a `.gitkeep` until they are used.

## Conventions

- JSON responses use a consistent envelope: `{ success, message, data }`.
- Secrets live only in `.env` (git-ignored); `.env.example` documents names.
- No feature code (auth, RBAC, reservations, AI chatbot) exists yet — it will
  be added phase by phase, following this structure.
