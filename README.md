# PizzaHub

PizzaHub is a full-stack pizza ordering and delivery platform where customers browse approved menu items, place delivery orders, and track order status. Vendors manage menu items, customer orders, and Premium subscriptions. Admins manage users, menu approvals, and verified Stripe transactions.

## Important Features

- **Role-based platform**: customer, vendor, and admin dashboards with protected routes and server-side role verification.
- **Authentication**: Better Auth email/password and Google sign-in. Public registration allows only customer/vendor roles; admin access is assigned securely.
- **Browse menu**: public approved/active menu listing with search, category, location, and sort.
- **Order management**: customers place orders with delivery date/address/message, view status, and cancel pending orders. Vendors accept/reject pending orders only once.
- **Vendor menu management**: vendors create/update/delete own items. Item images are uploaded as files through ImgBB. New items default to pending admin review.
- **Subscription/payments**: vendors upgrade to Premium through Stripe Checkout. Premium is activated only after verified Stripe webhook events; transactions are stored server-side.
- **Admin controls**: manage users, block/unblock users, review/approve/reject/delete menu items, and view read-only transactions.
- **Security**: env-based secrets, server-side validation, JWT-based backend authorization, origin checks, ownership checks, and no frontend-trusted premium activation.

## Technology Stack

### Client (`pizzaHub-client`)
- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4, shadcn/base-ui components, Lucide icons
- Better Auth client + Mongo adapter
- Stripe.js / Stripe checkout redirect

### Server (`backend`)
- Node.js, Express 5
- MongoDB Node driver
- Stripe webhooks/checkout verification
- JOSE/JWKS JWT verification against Better Auth

## Installation

### 1. Clone repositories

```bash
git clone <client-repo-url>
git clone <server-repo-url>
```

### 2. Install dependencies

```bash
cd pizzaHub-client && npm install
cd ../backend && npm install
```

### 3. Configure environment variables

Create `.env` files from the examples below. Do not commit real secrets.

## Environment Variables

### `pizzaHub-client/.env`

```env
MONGO_DB_URI=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5050

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

IMGBB_API_KEY=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

### `backend/.env`

```env
PORT=5050
MONGO_DB_URI=
BETTER_AUTH_URL=http://localhost:3000
CORS_ORIGINS=http://localhost:3000

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

## Run Locally

Start backend first:

```bash
cd backend
npm run dev
```

Start client in another terminal:

```bash
cd pizzaHub-client
npm run dev
```

Client: `http://localhost:3000`  
Backend: `http://localhost:5050`

## Stripe Webhook (Local)

Use Stripe CLI to forward webhooks to the backend:

```bash
stripe listen --forward-to localhost:5050/webhooks/stripe
```

Set the printed webhook signing secret as `STRIPE_WEBHOOK_SECRET` in both client/backend env files where required.

## Deployment Checklist

- Set production env vars in hosting platform (no `.env` committed).
- Set `BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_API_URL`, and `CORS_ORIGINS` to production URLs.
- Configure Stripe webhook endpoint to `https://<backend-domain>/webhooks/stripe`.
- Verify Stripe Checkout success/cancel URLs and webhook signature.
- Confirm protected route reloads work and logged-in users are not redirected to sign-in.
- Confirm admin credentials work on live site.

## Links

- Live Website: <add-live-url>
- Client Repository: <add-client-repo-url>
- Server Repository: <add-server-repo-url>
