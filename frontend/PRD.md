## Product Requirements Document (PRD) — MiraHub (Full‑Stack)

### 1. Overview
MiraHub is a modern, responsive e‑commerce clothing storefront. The frontend delivers product discovery, cart interactions, and content pages using React, TypeScript, Vite, Tailwind CSS, and React Router. The backend is built with Node.js (Express) and MongoDB, providing authentication, products, orders, admin analytics, and email notifications. This PRD defines goals, scope, requirements, flows, and acceptance criteria for the full‑stack application.

### 2. Goals
- Provide a fast, mobile‑first shopping experience.
- Enable users to browse, filter, and add products to a cart.
- Offer clear navigation (Home, Shop, About, Contact) and a persistent cart.
- Maintain accessible UI with consistent styling and UX patterns.
- Support user authentication (signup/login) to enable ordering.
- Use Nigerian context by default: NGN currency (₦), Nigerian phone formats, and address.

### 3. Non‑Goals
- Payment processing and checkout (out of scope for this frontend milestone).
- Inventory management and admin CMS.
- Authentication and user accounts.
  - UPDATE: Basic authentication is now in scope for MVP (email/password). Full account management (password reset emails, 2FA) remains out of scope.

### 4. Target Users
- Shoppers browsing clothing products on mobile and desktop.
- Prospective customers arriving via direct links or marketing landing pages.

### 5. Success Metrics
- Time to interactive < 2s on modern mobile devices (good network).
- Core navigation (Home → Shop) < 1s route transition.
- Add‑to‑cart action completes in < 150ms (UI feedback).
- Lighthouse performance ≥ 90, accessibility ≥ 90 on key pages.
- Currency formatting uses NGN (₦) consistently across UI.

### 6. Tech Stack
- Frontend
  - React 18 + TypeScript (Vite)
  - Styling: Tailwind CSS
  - Icons: Lucide React
  - Routing: React Router DOM
  - State: React Context for cart (`CartContext`)
- Backend
  - Node.js + Express
  - MongoDB (Mongoose ODM)
  - Auth: JWT (access + optional refresh)
  - Email: Nodemailer (SMTP) or transactional provider

### 7. Information Architecture
- Global: `Navbar` (logo, navigation, cart icon) and `Footer`.
- Routes:
  - `/` Home: hero banner, featured products, promos.
  - `/shop` Shop: product grid, filters, sorting.
  - `/about` About: brand story, values, imagery.
  - `/contact` Contact: form and company contact info.
- Auth:
  - `/signup` User registration.
  - `/login` User login.
- Admin:
  - `/admin/login` Admin login (separate from user login).
  - `/admin` Admin dashboard (protected).
- Overlays: `CartSidebar` (slide‑over panel).

### 8. Functional Requirements

#### 8.1 Navigation & Layout
- Navbar shows logo (MiraHub), primary links, and cart icon with badge.
- Active route styling is applied to current page links.
- Mobile: hamburger menu toggles the navigation list.
- Footer appears on all pages with basic links and brand info.

Nigeria Context in Footer
- Display business phone in Nigerian format (e.g., +234 801 234 5678) and physical address (e.g., Lagos, Nigeria). Use mailto and tel links.

Acceptance
- Active link style matches design (highlight + subtle background).
- Mobile menu opens/closes with animation and closes on link tap.

#### 8.2 Home Page
- Displays hero banner with primary CTA linking to `/shop`.
- Shows a curated set of featured products.

Acceptance
- Hero renders on all breakpoints without layout shift.
- CTA navigates to `/shop` reliably.

#### 8.3 Shop Page
- Product Grid: Renders a list of products using `ProductCard` (image, title, price, add‑to‑cart).
- Filters: `FilterSidebar` supports category, price range, and other available filters.
- Sorting (if provided by data): price asc/desc, newest, popularity.
- Empty states: show friendly message when no products match filters.

Acceptance
- Toggling filters updates the grid instantly.
- Add‑to‑cart on any `ProductCard` updates cart count and sidebar.

Currency
- Prices display as NGN with symbol ₦ and thousands separators (e.g., ₦12,500).

#### 8.4 Cart Sidebar
- Opens from the right; shows line items with name, price, quantity, subtotal.
- Controls: increment/decrement quantity, remove item, clear all.
- Shows cart totals (items count and subtotal).

Acceptance
- Quantity updates reflect immediately and persist while navigating routes.
- Removing last item shows empty‑cart state with link back to `/shop`.

Auth‑Aware Behavior
- If a non‑authenticated user clicks "Order", prompt to login or signup; preserve cart state through auth flow.

#### 8.5 About Page
- Brand story, mission/values, imagery/illustrations.

Acceptance
- Content is readable and responsive across breakpoints.

#### 8.6 Contact Page
- Contact information and a basic contact form (non‑submitting demo OK for MVP).

Acceptance
- Form fields validate required input on blur/submit with inline messaging.

Nigerian Details
- Pre‑fill example contact details with Nigerian phone and address.

#### 8.7 Authentication (User)
- Signup: email, password, full name, phone (Nigerian format), address (street/city/state, Nigeria).
- Login: email + password.
- Persist auth session (token in memory; optional localStorage refresh token if implemented on backend).
- Logged‑in users can place orders.

Acceptance
- Form validation for email, strong password rules (min length 8).
- Error states for invalid credentials.
- Redirect to intended page after login (cart/checkout order action).

#### 8.8 Orders (Frontend Flow)
- Order action initiated from cart sidebar or a dedicated order page.
- On "Order" click (authenticated): send order request to backend, show success state, and clear cart on success.
- Admin notification: backend triggers email to admin and records order for dashboard.

Acceptance
- Success toast/confirmation view appears within 500ms of response.
- Cart is cleared only after confirmed order creation.

### 9. Non‑Functional Requirements
- Performance: Lazy‑load non‑critical routes/components when feasible.
- Accessibility: Semantic HTML, focus management for overlays, visible focus states, color contrast meeting WCAG AA.
- Responsiveness: Layouts optimized for 320px → 1440px+.
- Reliability: No runtime errors in console during core flows.
- SEO: Descriptive titles/meta per route (SPA norms), logical headings.
- Localization: Currency and address formats are Nigeria‑specific in MVP.

### 10. Data Model (Frontend Assumptions)
- Product
  - id: string
  - name: string
  - price: number
  - imageUrl: string
  - category: string
  - description?: string

- CartItem
  - productId: string
  - quantity: number

- User (frontend shape)
  - id: string
  - fullName: string
  - email: string
  - phone: string (+234 format)
  - address: {
    - street: string
    - city: string
    - state: string
    - country: 'Nigeria'
  }
  - role: 'user' | 'admin'

- Order (frontend shape)
  - id: string
  - userId: string
  - items: Array<{ productId: string; quantity: number; priceAtOrder: number }>
  - subtotal: number
  - status: 'pending' | 'processing' | 'completed' | 'cancelled'
  - createdAt: string

### 11. User Flows

#### 11.1 Browse and Add to Cart
1) User lands on `/` and clicks Shop CTA.
2) On `/shop`, applies filters and selects a product.
3) Clicks Add to Cart; cart badge increments; sidebar can open to confirm.

Edge Cases
- Adding the same product increases quantity.
- Attempting to decrement quantity at 1 prompts removal or disables decrement.

#### 11.2 Manage Cart
1) Open cart via navbar icon.
2) Increment/decrement quantity or remove items.
3) Close cart and continue browsing.

Edge Cases
- Empty cart displays illustration/message and a button to go to `/shop`.

#### 11.3 Signup/Login
1) User opens `/signup` or `/login`.
2) Completes form; on success, token saved; user redirected to intended route.
3) Cart state is preserved across auth.

Edge Cases
- Duplicate email shows clear error.
- Failed logins show non‑revealing error messages.

#### 11.4 Place Order (Manual Payment)
1) Authenticated user clicks Order in cart.
2) Frontend posts order to backend; backend emails admin and logs order.
3) Frontend shows confirmation with instructions: "Your order has been placed. Our team will contact you for manual payment."
4) Admin follows up via email/phone.

### 12. Routing & States
- Routes use React Router with active link detection.
- Cart state persisted in memory via React Context; optional localStorage persistence can be added later.
- Mobile nav and cart use internal component state for open/close.
- Protected routes for `/admin` require admin auth; redirect to `/admin/login` if unauthenticated.

### 13. Error & Empty States
- Network/data empty: Render friendly empty state on `/shop`.
- Invalid route: Redirect to `/` or render a simple Not Found page (stretch).

### 14. Analytics (Optional/Future)
- Track page views per route and add‑to‑cart events.
- Admin dashboard shows weekly/monthly order counts and revenue subtotal (₦).

### 15. Security & Privacy
- No PII collection beyond optional contact form fields (frontend‑only).
- Sanitize form inputs client‑side; no storage beyond session context.
- Protect admin routes and components; hide admin UI for non‑admin roles.

### 16. Dependencies
- `react`, `react-dom`, `react-router-dom`
- `lucide-react`
- `tailwindcss`, `postcss`, `autoprefixer`
- Tooling: `vite`, `typescript`, `eslint`

### 17. Deployment
- Built with `npm run build` (Vite).
- Deployed to Vercel using `vercel.json` for SPA rewrites if configured.

### 18. Acceptance Criteria (MVP)
- Navigation works on desktop and mobile; active link styling present.
- Home hero CTA routes to Shop.
- Shop displays products, supports filtering, and add‑to‑cart.
- Cart sidebar shows items, supports quantity changes and removal.
- About and Contact pages render static content without layout issues.
- Lighthouse scores ≥ 90 for performance and accessibility on `/` and `/shop`.
- Signup and login function with validation and redirect.
- Order action requires auth and creates an order; UI confirmation displayed.
- Prices display as ₦ and footer shows Nigerian contact details.
- Admin login protects dashboard; non‑admin users cannot access.

### 19. Open Questions
- Will product data be fetched from an API or remain static for MVP?
- Should cart persist to localStorage between sessions?
- Do we need basic sorting on the Shop page for MVP or post‑MVP?
- Which email provider will be used for admin notifications (e.g., SMTP/Nodemailer vs. transactional service)?
- Should admin be able to export orders (CSV) in MVP?

### 20. Future Enhancements (Post‑MVP)
- Product details page (`/product/:id`).
- Authentication, wishlist, and order history.
- Checkout and payments integration.
- Real search with debounce and highlighting.
- Multi‑admin roles and permissions.
- Address book and delivery options localized for Nigeria.

### 21. Admin Portal (MVP)
- Separate route space (`/admin`) with dedicated login (`/admin/login`).
- Dashboard widgets: total orders, pending orders, weekly and monthly trends (charts), revenue subtotal (₦).
- Orders management: list, search/filter (status/date/user), view details, update status.
- Users management: list users, search, view profile basics (name, email, phone), disable/enable user.
- Products management: create, update, delete products; support images and categories; filtering and search.

Acceptance
- Non‑admin access to `/admin` redirects to `/admin/login`.
- Order list updates after status changes without full reload.

### 22. Backend Specification (Node.js + Express + MongoDB)

Auth
- POST `/api/auth/signup` — create user (role=user).
- POST `/api/auth/login` — authenticate, return JWT access token (+ optional refresh).

Users (admin‑only where noted)
- GET `/api/users` (admin) — list users (query: search, page, limit).
- GET `/api/users/:id` (admin) — get user.s
- PATCH `/api/users/:id` (admin) — update user (limited fields, e.g., role/status).

Products
- GET `/api/products` — list with filters (category, q, minPrice, maxPrice, sort, page, limit).
- GET `/api/products/:id` — product details.
- POST `/api/products` (admin) — create product.
- PATCH `/api/products/:id` (admin) — update product.
- DELETE `/api/products/:id` (admin) — delete product.

Orders
- POST `/api/orders` (auth) — create order from cart items; backend computes totals, sets status=pending; send email to admin.
- GET `/api/orders` (admin) — list orders with filters (status, date range, user).
- GET `/api/orders/:id` (admin or owner) — order detail.
- PATCH `/api/orders/:id` (admin) — update status.

Analytics (admin)
- GET `/api/analytics/orders/summary` — totals and counts.
- GET `/api/analytics/orders/weekly` — last 8 weeks series.
- GET `/api/analytics/orders/monthly` — last 12 months series.

Notifications
- Email: use Nodemailer (SMTP) or provider (e.g., SendGrid) to email admin on new orders.

Security
- JWT auth middleware; role‑based access control (admin vs user).
- Input validation with JOI/Zod; sanitize inputs.
- Rate limiting and CORS configuration for frontend origin.

Data Models (MongoDB - Mongoose)
- User: fullName, email (unique), passwordHash, phone, address { street, city, state, country='Nigeria' }, role ('user'|'admin'), status ('active'|'disabled'), createdAt, updatedAt.
- Product: name, price (number, NGN), imageUrl, category, description, stock(optional), createdAt, updatedAt.
- Order: userId (ref User), items [{ productId ref Product, quantity, priceAtOrder }], subtotal, status, contactSnapshot { fullName, email, phone, address }, createdAt, updatedAt.

Environment
- ENV: `JWT_SECRET`, `MONGO_URI`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `ADMIN_EMAIL`, `CLIENT_URL`.

Acceptance (Backend)
- Protected routes enforce roles; unauthorized requests return 401/403.
- Creating an order persists to DB and sends an email to `ADMIN_EMAIL` in < 2s.
- Analytics endpoints return accurate aggregates for weekly and monthly periods.


