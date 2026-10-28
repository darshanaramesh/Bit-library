# API

Base URL (local): `http://localhost:5000/api`

## Conventions

- All endpoints are prefixed with `/api`.
- Requests and responses are JSON (`Content-Type: application/json`).
- Success responses use `{ "success": true, "message": string, "data": ... }`.
- Errors use an appropriate HTTP status with `{ "success": false, "message": string }`.
- Authentication/authorization headers are not implemented yet.

## Endpoints

### `GET /api/health`

Liveness check for the API server.

**200 OK**

```json
{
  "status": "ok",
  "service": "bit-central-library-api",
  "timestamp": "2026-10-28T00:00:00.000Z",
  "uptime": 12.345
}
```

---

*No other endpoints exist yet. Resource, reservation, RBAC, and chatbot
endpoints will be documented here as they are implemented.*
