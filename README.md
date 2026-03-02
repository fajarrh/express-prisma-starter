# (Express - Prisma - Postgres) - Starter Kit

A robust starter kit for building RESTful APIs using **Express.js**, **Prisma** as an ORM, **Yup** for validation, and **PostgreSQL** for database management.

## Features

- 🌟 **Express.js**: Fast and minimalist web framework.
- 🗃 **PostgreSQL**: High-performance relational database.
- 🔷 **Prisma**: Type-safe ORM with auto-generated client.
- ✅ **Yup**: Schema-based request validation.
- 📄 **Environment Variables**: Managed with `.env` using `dotenv`.
- 🛡 **Error Handling**: Centralized error management.
- 🚦 **Auto Router**: Controllers auto-registered via `generate-router.ts`.

---

## Getting Started

### Prerequisites

- **Node.js**: >= 16.x
- **npm** or **yarn**
- **PostgreSQL**: Ensure PostgreSQL is installed and running.
- **Redis**: Ensure Redis is installed and running.

### Installation

```bash
git clone https://github.com/fajarrh/express-prisma-starter.git
cd express-prisma-starter
npm install
```

---

## Environment Setup

Create a `.env` file in the root directory:

```env
NODE_ENV=dev

APP_URL="http://localhost:3000"
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=
DB_NAME=
DB_SCHEMA=public
DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=${DB_SCHEMA}

JWT_SECRET=12345

REDIS_PORT=6379
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=

CORS_ORIGIN=*
CORS_CREDENTIALS=true
CORS_ALLOW_METHODS="GET,POST,PUT,DELETE,PATCH"
CORS_ALLOW_HEADERS="Origin,Authorization,Content-Type,Accept"
```

### Variable Reference

| Variable | Description |
|----------|-------------|
| `NODE_ENV` | Environment mode (`dev` / `production`) |
| `PORT` | Port the server listens on |
| `DB_HOST` / `DB_PORT` / `DB_USER` / `DB_PASSWORD` / `DB_NAME` | PostgreSQL connection config |
| `DB_SCHEMA` | Database schema (default: `public`) |
| `DATABASE_URL` | Full Prisma connection string (auto-built from above) |
| `JWT_SECRET` | Secret key for signing JWT tokens — keep this secure |
| `REDIS_HOST` / `REDIS_PORT` / `REDIS_PASSWORD` | Redis connection config |
| `CORS_ORIGIN` | Allowed origin(s), comma-separated for multiple |
| `CORS_CREDENTIALS` | Allow cookies/credentials in cross-origin requests |
| `CORS_ALLOW_METHODS` | Allowed HTTP methods |
| `CORS_ALLOW_HEADERS` | Allowed HTTP headers |

> Keep `.env` in `.gitignore` to avoid exposing credentials.

---

## Database Migration

Run Prisma migration before starting the server:

```bash
npx prisma migrate dev
```

---

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server + auto-generate router (watch mode) |
| `npm run dev:only` | Start dev server **without** auto-generating router |
| `npm run build` | Build for production |
| `npm run prod` | Run production build |
| `npm run lint` | Run ESLint with auto-fix |
| `npm run format` | Format code with Prettier |
| `npm run gen:crud` | Generate full CRUD boilerplate |
| `npm run gen:controller` | Generate controller + service + validation + resource |
| `npm run gen:service` | Generate service file |
| `npm run gen:validation` | Generate validation file |
| `npm run gen:resource` | Generate resource file |

---

## 📖 Documentation

See [USAGE.md](./USAGE.md) for detailed usage guides:
- Auto-generate router & the `_` prefix convention
- Adding routes manually with `createRouter`
- Full manual router (without `registerRoutes`)
- FRGEN CLI — CRUD code generator

---

## License

ISC — internal & open for customization.
