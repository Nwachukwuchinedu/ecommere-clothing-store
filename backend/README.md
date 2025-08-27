# MiraHub Backend

Node.js + Express + MongoDB API for authentication, products, orders, admin analytics, and email notifications.

## Setup

1. `cd backend && npm install`
2. Create `.env` with:
```
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/mirahub
JWT_SECRET=change_me
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=mailer@example.com
SMTP_PASS=secret
ADMIN_EMAIL=admin@example.com
CLIENT_URL=http://localhost:5173
```
3. `npm run dev`

## Endpoints
- Auth: `/api/auth/signup`, `/api/auth/login`
- Users (admin): `/api/users`
- Products: `/api/products`
- Orders: `/api/orders`
- Analytics (admin): `/api/analytics/*`


