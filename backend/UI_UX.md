## Backend UI/UX (API & DX)

### API Design Principles
- Consistent resource paths, nouns, plural (`/api/products`).
- Use standard HTTP verbs; meaningful status codes and error messages.
- Pagination with `page` and `limit`; filtering with query params.

### Error Format
```json
{ "message": "Human‑readable error", "code": "OPTIONAL_CODE" }
```

### Auth UX
- JWT in `Authorization: Bearer <token>`; 401 on missing/expired, 403 on forbidden.

### Orders UX
- Return `{ id }` on create; clients fetch detail if needed.
- Do not block on email; best‑effort delivery.

### Admin Analytics UX
- Always return arrays; handle empty datasets gracefully.
- Timestamps in ISO 8601.


