# Frontend – BIT Central Library

React + Vite (JavaScript) single-page app for the **Digital Resource Access Control Matrix and
Seat Reservation Portal**. This is a **UI prototype**: every screen is rendered from mock data
and no API, authentication or persistence is connected.

```bash
npm install
npm run dev     # dev server (Vite)
npm run build   # production build
npm run lint    # oxlint
```

## Routes

| Route | Page |
| --- | --- |
| `/` | Landing / Home |
| `/login` | Login |
| `/register` | Registration |
| `/dashboard/student` | Student Dashboard |
| `/dashboard/faculty` | Faculty Dashboard |
| `/dashboard/librarian` | Librarian Dashboard |
| `/dashboard/admin` | Admin Dashboard |
| `/resources` | Digital Resources (search, category filters, cards) |
| `/resources/:id` | Resource Details (View / Download) |
| `/reserve` | Seat Reservation (slots + floors) |
| `/reserve/seat-map` | Seat Selection / Seat Map (male & female areas) |
| `/bookings` | My Bookings |
| `/profile` | Profile |
| `/assistant` | AI Library Assistant (chat page) |
| `/manage/users` | User Management |
| `/manage/resources` | Resource Management |
| `/manage/seats` | Seat Management |
| `/manage/reservations` | Reservation Management |
| `/access-control` | Access Control / Permissions matrix |
| `/settings` | Settings |
| `*` | 404 |

A floating **BIT Library Assistant** chatbot is available on every page except `/assistant`,
which renders the full panel.

## Structure

```
src/
├── components/
│   ├── ui/          Icon, Button, Badge, Card, DataTable, Modal, Alert, Form, Tabs,
│   │                PageHeader, Avatar        ← shared, reusable building blocks
│   ├── layout/      Sidebar, Topbar, DashboardLayout, PublicLayout (navbar + footer)
│   ├── dashboard/   BarChart, Breakdown
│   ├── seats/       ZonePanel (seat grid per zone)
│   ├── resource/    ResourceCard
│   └── chatbot/     ChatWindow, ChatWidget (floating launcher)
├── pages/           one component per screen
├── data/            mock data + demo "session" helpers (no backend)
├── context/         AuthContext — display-only role previewer
├── hooks/           useChat
└── styles/          tokens.css, base.css, components.css, layout.css + page styles
```

## Notes

- **Seat map:** 6 floors × 2 zones (Male Area / Female Area); seat states are available,
  selected, booked and disabled. Second Floor · Female Area is intentionally rendered fully
  booked so the "all seats booked" state is visible.
- **Time slots:** 08:45–10:25, 10:40–12:20, 01:30–03:10, 03:25–04:25.
- **Messages** for "available", "already booked", "all booked" and "overlapping booking"
  are sample UI states on `/reserve/seat-map` — no validation logic runs.
- **Role preview:** use the "Preview role" selector in the topbar to switch between the
  student / faculty / librarian / admin dashboards. It only changes what is displayed.
- Styling is plain CSS organised under `styles/`, imported once from `index.css`.

See the [root README](../README.md) for full-project setup and the [docs](../docs/README.md)
for architecture notes.