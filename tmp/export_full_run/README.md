# BIT Central Library

**Digital Resource Access Control Matrix and Seat Reservation Portal**

A web portal for the BIT Central Library covering digital resource access
control (an access control matrix over resources and roles) and library seat
reservation.## Status

**Done — foundation:** workspace, tooling, folder structure, environment template and a
`/api/health` endpoint.

**Done — frontend UI (prototype):** all 20 portal screens are built with React Router, a shared
component library and mock data — landing, auth, dashboards (student / faculty / librarian /
admin), digital resources, seat reservation + seat map, bookings, profile, settings, the four
management screens, the access control matrix and the AI assistant.

**Not built yet (by design):** backend APIs, MySQL schema, authentication/JWT, RBAC enforcement,
real booking / overlap / gender validation, file storage and a real AI provider. The UI makes no
network calls and persists nothing.

**Sign-in email rule:** only `@bitsathy.ac.in` institutional addresses are accepted on the login
screen (frontend validation, exact message shown on rejection). When authentication is
implemented the **backend must enforce the same domain rule** — reject any request whose email is
not `@bitsathy.ac.in`, so the restriction cannot be bypassed by editing the input or calling the
API directly.

### Frontend routes

| Route | Page |
| --- | --- |
| `/` | Landing / Home |
| `/login`, `/register` | Log in, Registration |
| `/resources`, `/resources/:id` | Digital Resources, Resource Details |
| `/reserve`, `/reserve/seat-map` | Seat Reservation, Seat Selection / Seat Map |
| `/bookings` | My Bookings |
| `/profile`, `/settings` | Profile, Settings |
| `/assistant` | AI Library Assistant |
| `/dashboard/student` · `/faculty` · `/librarian` · `/admin` | Role dashboards |
| `/manage/users` · `/resources` · `/seats` · `/reservations` | Management screens |
| `/access-control` | Access Control Matrix |
| anything else | 404 page |

## Tech stack

- **Frontend:** React + Vite (JavaScript)
- **Backend:** Node.js + Express
- **Database:** MySQL (schema placeholder only)

## Project structure

```
.
├── frontend/            React + Vite app (UI prototype)
│   └── src/
│       ├── components/  ui/ · layout/ · seats/ · resource/ · chatbot/ · dashboard/
│       ├── pages/       one file per screen (20 pages + 404)
│       ├── data/        mock data: resources, seats, bookings, users, chat, nav
│       ├── context/     demo role/auth context (display only)
│       ├── hooks/       useChat (mock assistant state)
│       └── styles/      design tokens + component / layout / page CSS
├── backend/             Express API
│   └── src/
│       ├── config/      Environment / future DB config
│       ├── controllers/ Request handlers
│       ├── middleware/  Cross-cutting middleware
│       ├── models/      Data access
│       ├── routes/      URL routing
│       ├── services/    Business logic
│       ├── utils/       Helpers
│       ├── app.js       Express app
│       └── server.js    Entry point
├── database/            schema.sql, seed.sql (placeholders)
├── docs/                Documentation
├── .env.example         Environment variable template
└── README.md
```

## Prerequisites

- Node.js 20+ (tested on Node 24)
- npm 10+
- MySQL 8+ (only needed once the schema is implemented)

## Setup

```bash
# 1. Clone and enter the project
git clone <repo-url>
cd BIT-Central-Library

# 2. Configure environment
cp .env.example .env      # then fill in your values

# 3. Install dependencies
cd frontend && npm install && cd ..
cd backend  && npm install && cd ..
```

## Running

**Terminal 1 – backend API (http://localhost:5000)**

```bash
cd backend
npm run dev      # or: npm start
```

**Terminal 2 – frontend dev server (http://localhost:5173)**

```bash
cd frontend
npm run dev
```

### Verify

```bash
curl http://localhost:5000/api/health
# {"status":"ok","service":"bit-central-library-api",...}
```

## Useful scripts

| Where | Command | Purpose |
| --- | --- | --- |
| `backend` | `npm run dev` | Start API with automatic reload |
| `backend` | `npm start` | Start API |
| `frontend` | `npm run dev` | Start Vite dev server |
| `frontend` | `npm run build` | Production build |
| `frontend` | `npm run lint` | Lint with oxlint |

## Environment variables

See [.env.example](./.env.example) — covers general settings, MySQL
connection, JWT, AI, and the Vite API base URL. Real values live in `.env`,
which is git-ignored.

## Documentation

See [docs/](./docs/README.md) for architecture, API, and database notes.
