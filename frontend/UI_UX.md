## UI/UX Specification — MiraHub (Full‑Stack)

### Brand & Tone
- Modern, clean, trustworthy. Minimalist use of color with emphasis states.
- Primary color: Blue (existing Tailwind config); Accent: lighter blue shades.
- Currency and content localized for Nigeria (₦, Nigerian phone/address formats).

### Typography
- Use system or Tailwind defaults (e.g., Inter if configured). Hierarchy:
  - H1: 32–40px, bold; H2: 24–28px, semibold; H3: 18–20px.
  - Body: 14–16px, normal; Caption: 12–13px.
- Line length ~60–80 chars for readability.

### Spacing & Layout
- 8px spacing scale; generous whitespace.
- Container widths: max‑w‑7xl; gutters on mobile.
- Breakpoints: Tailwind defaults (sm, md, lg, xl, 2xl).

### Color & States
- Buttons: primary (blue) and secondary (neutral). Disabled with reduced opacity.
- Focus states: visible outlines; meet WCAG AA contrast ratios.
- Feedback: success (green), warning (amber), error (red) with toasts.

### Navigation
- `Navbar` with active link highlighting and cart badge.
- Mobile menu: slide/expand, closes on link click.
- `Footer` shows Nigerian contact: `+234 801 234 5678`, `hello@mirahub.ng`, Lagos, Nigeria.

### Components
- HeroBanner: large headline, subcopy, CTA to `/shop`.
- ProductCard: image, title, price (₦), add‑to‑cart; hover lift.
- FilterSidebar: checkboxes/toggles, price range slider; sticky on desktop.
- CartSidebar: slide‑over with quantities, subtotals (₦), order button.
- Forms: stacked labels, helper/error text; input masks for +234 phone.
- Tables (Admin): sticky header, zebra rows, responsive overflow.
- Charts (Admin): simple bar/line charts for weekly/monthly orders.

### Authentication Screens
- `/signup`: full name, email, phone (+234), address (street/city/state), password.
- `/login`: email, password; link to signup; remember me (optional).
- Error summaries above forms; inline field errors.

### Backend‑Aware UX
- Auth states: show loading/spinners during API calls; friendly errors for network/server (avoid leaking specifics).
- Token expiry: show session timeout messaging and redirect to `/login` while preserving intended route.
- Orders: after placing an order, display confirmation with next steps for manual payment; show server‑returned order reference.
- Email notifications: surface a non‑blocking toast "Admin has been notified" upon successful order creation.
- Admin analytics: charts handle empty data (new store) and loading states; tooltips show values with ₦ and date ranges.
- Error handling: standardized error component with retry, support link, and error codes for admin view.

### Operational UX (Admin)
- Data refresh: manual refresh button and auto‑refresh every 60s on orders list (configurable).
- Status updates: optimistic UI with rollback on failure; confirm dialogs for destructive actions (delete product).
- Pagination & filters: persist in URL query string for shareable admin views.
- Export: provide CSV export button for orders list (if enabled in backend).

### Admin UX
- `/admin/login` separate from user login.
- `/admin` dashboard: KPIs (total orders, pending, weekly, monthly, revenue ₦).
- Orders: list with filters (status/date), detail drawer, status updates.
- Users: list/search, enable/disable.
- Products: CRUD forms; image URL input; category selection; confirm before delete.

### Accessibility
- Keyboard navigable menus and sidebars; focus trapped in overlays.
- ARIA roles for dialogs and navigation.
- Form labels tied to inputs; descriptive button text.

### Performance
- Lazy‑load admin routes and heavy components.
- Use image dimensions to avoid CLS; serve appropriately sized images.

### Empty & Error States
- Shop empty: friendly message and clear reset filters action.
- Cart empty: illustration and CTA to `/shop`.
- Network errors: retry actions and support links.

### Content Guidelines
- Prices always prefixed with ₦ and formatted with thousands separators.
- Phone numbers displayed in `+234 XXX XXX XXXX` format.
- Address displayed as `Street, City, State, Nigeria`.


