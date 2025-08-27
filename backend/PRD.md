## Backend PRD — MiraHub API

### Scope
Implements authentication, products, orders, admin analytics, and notifications to support the full‑stack PRD.

### Endpoints
- Auth: POST `/api/auth/signup`, POST `/api/auth/login`
- Users (admin): GET `/api/users`, GET `/api/users/:id`, PATCH `/api/users/:id`
- Products: GET `/api/products`, GET `/api/products/:id`, POST `/api/products`, PATCH `/api/products/:id`, DELETE `/api/products/:id`
- Orders: POST `/api/orders`, GET `/api/orders`, GET `/api/orders/:id`, PATCH `/api/orders/:id`
- Analytics: GET `/api/analytics/summary`, `/weekly`, `/monthly`

### Models
- User: fullName, email, passwordHash, phone, address, role, status
- Product: name, price (NGN), imageUrl, category, description, stock
- Order: userId, items[{ productId, quantity, priceAtOrder }], subtotal, status, contactSnapshot

### Security
- JWT auth; admin role required for admin routes. Rate limit, CORS.

### Notifications
- Nodemailer email to admin on new order.

### Acceptance
- Orders created in < 200ms on average; email queued/sent without blocking response.


