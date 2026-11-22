# PizzaHub

PizzaHub is a responsive pizza ordering platform where customers can browse local restaurant menus and place orders, vendors can manage their menus and incoming orders, and administrators can review platform activity.

## Project links

- Client repository: <https://github.com/Shafi8844/PizzaHub-Client>
- Server repository: <https://github.com/Shafi8844/PizzaHub-server>
- Live website: not configured yet

## Features

- Better Auth email, password, and Google sign-in with customer and vendor registration
- Role-specific customer, vendor, and admin dashboards
- Searchable menu browsing and vendor menu management
- Menu image uploads to ImgBB with file type and size validation
- Customer order submission and vendor order status management
- Stripe Checkout for the monthly Premium vendor plan ($19/month)
- Stripe webhook verification for subscription activation and cancellation
- Responsive PizzaHub interface built with Tailwind CSS and reusable UI components

## Technology

**Client:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Base UI, Lucide React, Better Auth, Stripe SDK.

**Server:** Node.js, Express 5, MongoDB, Stripe SDK.

## Run locally

Use Node.js 20 or newer. The client and server are separate Git repositories and must be installed and started independently.

### 1. Configure the client

```bash
cd pizzaHub-client
npm install
cp .env.example .env
```

Set these values in `pizzaHub-client/.env`:

| Variable | Purpose |
| --- | --- |
| `MONGO_DB_URI` | MongoDB connection string |
| `BETTER_AUTH_SECRET` | Secret used by Better Auth; use a long random value |
| `BETTER_AUTH_URL` | Client origin, usually `http://localhost:3000` |
| `GOOGLE_CLIENT_ID` | Google OAuth web client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth web client secret |
| `NEXT_PUBLIC_APP_URL` | Public client URL used for Stripe redirects |
| `NEXT_PUBLIC_API_URL` | Backend URL, usually `http://localhost:5050` |
| `STRIPE_SECRET_KEY` | Stripe secret key; use a test key locally |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `IMGBB_API_KEY` | Server-only API key for menu image uploads |

### 2. Configure the backend

```bash
cd backend
npm install
cp .env.example .env
```

Set these values in `backend/.env`:

| Variable | Purpose |
| --- | --- |
| `MONGO_DB_URI` | MongoDB connection string for the same PizzaHub database |
| `BETTER_AUTH_URL` | Client origin used to retrieve Better Auth's JWKS, usually `http://localhost:3000` |
| `STRIPE_SECRET_KEY` | Stripe secret key matching the client environment |
| `STRIPE_WEBHOOK_SECRET` | Signing secret for the Stripe webhook endpoint |
| `PORT` | Backend port; defaults to `5050` |
| `CORS_ORIGINS` | Comma-separated allowed frontend origins, e.g. `http://localhost:3000` |

### 3. Start both services

In one terminal, from `backend/`:

```bash
npm run dev
```

In another terminal, from `pizzaHub-client/`:

```bash
npm run dev
```

Open <http://localhost:3000>.

For local Stripe webhook delivery, install the Stripe CLI and run:

```bash
stripe listen --forward-to localhost:5050/webhooks/stripe
```

Copy the printed `whsec_...` value to `STRIPE_WEBHOOK_SECRET` in `backend/.env`, then restart the backend. In production, register `https://YOUR_API_HOST/webhooks/stripe` in Stripe and subscribe to `checkout.session.completed`, `customer.subscription.updated`, and `customer.subscription.deleted`.

## Useful commands

Run client commands from `pizzaHub-client/`:

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
```

Run backend commands from `backend/`:

```bash
npm run dev
npm start
```

## Environment and deployment notes

- Never commit `.env` files or paste live credentials into source code.
- Stripe secret and webhook keys belong on the server only. Rotate any key that has been exposed.
- Google OAuth uses `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` from the client `.env` file. Add `http://localhost:3000/api/auth/callback/google` to the Google OAuth client's authorized redirect URIs; production needs its own callback URL.
- A live website URL and production deployment configuration have not been supplied.
- Express data endpoints verify short-lived Better Auth JWTs against the client's JWKS. Roles and record ownership are checked against the current MongoDB user record on each protected request.
- Admin access must be provisioned securely and never through the public sign-up form.

## Menu search and sorting

The Express menu endpoint accepts `search`, `category`, `location`, `status`, and `sort` query parameters. `sort` supports `newest`, `price-asc`, and `price-desc`; the public browse page always requests `status=approved`. Search text is treated literally so characters in a query are not interpreted as regular-expression operators.

## API authentication

The Next.js server reads the Better Auth session cookie and requests a five-minute JWT from Better Auth. Browser mutations go through the same-origin `/api/backend/*` proxy, which attaches the token server-side. Express verifies the token signature using the public keys at `BETTER_AUTH_URL/api/auth/jwks`, then reloads the user from MongoDB so current role and blocked status are authoritative. Public menu reads remain available without a token and return approved items only. Protected routes return `401` for missing or invalid authentication and `403` for a valid user without the required role or ownership.

## Repository layout

```text
assignment-9/
├── pizzaHub-client/   # Next.js app and Better Auth configuration
└── backend/           # Express API and Stripe webhook
```
