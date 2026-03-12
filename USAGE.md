# 📖 Usage Guide

Detailed usage guides for Express-Prisma Starter Kit.

---

## Table of Contents

- [Auto-Generate Router](#auto-generate-router)
- [Manual Router with `createRouter`](#-manual-router-with-createrouter)
- [Full Manual Router](#full-manual-router-without-registerroutes)
- [FRGEN — CLI CRUD Generator](#-frgen--cli-crud-generator)

---

## Auto-Generate Router

The script `generate-router.ts` automatically scans all controller files inside `src/http/controller/` and generates `src/router.ts`, which is then loaded by `server.ts` via `registerRoutes`.

Run in watch mode alongside the dev server:

```bash
npm run dev
```

Or run the server only (skip auto-generate):

```bash
npm run dev:only
```

### File naming convention

| File | Auto-generated into `router.ts`? |
|------|:---:|
| `user.controller.ts` | ✅ |
| `UserController.ts` | ✅ |
| `_internal.controller.ts` | ❌ (prefix `_` is ignored) |
| `_PrivateController.ts` | ❌ (prefix `_` is ignored) |

> Files and directories prefixed with `_` are **always skipped** by `generate-router.ts`. Use this convention for controllers you want to register manually.

---

## 🔌 Manual Router with `createRouter`

In addition to auto-generate, you can register a controller manually using `createRouter` from `frexp/lib/Decorator`.

### When to use

- You don't want a controller detected automatically (use `_` prefix)
- You need a specific route registration order
- The route lives outside the `controller/` folder convention

### Usage

**1. Create the controller with a `_` prefix:**

```typescript
// src/http/controller/_internal.controller.ts
import { Controller, Get } from "frexp/lib/Decorator";
import { Request, Response, NextFunction } from "express";

@Controller("/internal")
export class InternalController {
  @Get("/health")
  async getHealth(req: Request, res: Response, next: NextFunction) {
    res.json({ status: "ok" });
  }
}
```

**2. Register it manually in `server.ts`:**

```typescript
import { createRouter } from "frexp/lib/Decorator";
import { InternalController } from "@controller/_internal.controller";

// After middleware, before registerRoutes:
app.use(createRouter(new InternalController()));
```

### Signature

```typescript
// createRouter(controller: any): express.Router
const router = createRouter(new MyController());
app.use(router);
```

---

## Full Manual Router (Without `registerRoutes`)

If you want full control over all routes and don't need `registerRoutes` or `generate-router.ts`, manage everything manually using `express.Router()`.

**1. Leave or empty `router.ts`** — simply don't import it.

**2. Register all routes manually in `server.ts`:**

```typescript
import express from "express";
import { createRouter } from "frexp/lib/Decorator";
import { AuthController } from "@controller/auth.controller";
import { UserController } from "@controller/user.controller";

const app = express();

// --- middleware ---
app.use(express.json());
app.use(RequestMiddleware);

// --- register routes manually ---
const apiRouter = express.Router();

apiRouter.use(createRouter(new AuthController()));
apiRouter.use(createRouter(new UserController()));
// apiRouter.use("/products", createRouter(new ProductController()));

app.use("/api", apiRouter);

// --- error handler must be last ---
app.use(ErrorHandler);
```

**3. The `_` prefix convention still applies** — files prefixed with `_` are always ignored by `generate-router.ts`, making them safe to use exclusively for manual registration.

### Mode Comparison

| Mode | `registerRoutes` | `generate-router.ts` | `router.ts` |
|------|:---:|:---:|:---:|
| Auto (default) | ✅ | ✅ | ✅ |
| Partial manual (`_` prefix) | ✅ | ✅ (`_` files skipped) | ✅ |
| Full manual | ❌ | ❌ not needed | ❌ not needed |

---

## 🧰 FRGEN — CLI CRUD Generator

`frgen` is a CLI tool that automatically generates boilerplate files — **controller**, **service**, **repository**, **validation**, **resource**, and **model** — based on your database table structure.

---

### ⚠️ Required Flags for This Project

This project uses **PostgreSQL** and **Prisma**, so these flags are **required** on every `frgen` command:

| Flag | Reason |
|------|--------|
| `--pg` | Use PostgreSQL as the database client |
| `--prisma` | Generate Prisma-compatible code (repository pattern) |
| `--path=src/http` | Output to the correct folder structure |

**Recommended: use the npm scripts** — they already include the correct flags:

```bash
npm run gen:crud          # full CRUD (model + controller + service + repository + validation + resource)
npm run gen:controller    # controller + service + repository + validation + resource
npm run gen:module        # module folder (controller + service + repository + validation) co-located
npm run gen:service       # service file only
npm run gen:repository    # repository file only (Prisma)
npm run gen:validation    # validation file only
npm run gen:resource      # resource file only
```

If you run `npx frgen` directly, always append the required flags:

```bash
npx frgen make:crud --pg --prisma --path=src/http
npx frgen make:controller --table=users --pg --prisma --path=src/http
npx frgen make:module --table=users --pg --prisma --path=src/http/module/user
npx frgen make:service --table=users --pg --prisma --path=src/http/service
npx frgen make:repository --table=users --pg --prisma --path=src/http/repository
npx frgen make:validation --table=users --pg --path=src/http/validation
npx frgen make:resource --table=users --pg --path=src/http/resource
```

---

### Architecture (Prisma mode)

When using `--prisma`, frgen follows a **repository pattern**:

```
controller  →  service  →  repository  →  prisma
```

- **Repository** — only layer that touches Prisma directly
- **Service** — delegates all DB operations to the repository
- **Controller** — calls service functions, handles HTTP request/response

---

### General Options

| Option | Description | Example |
|--------|-------------|---------|
| `--table=<name>` | Target table name | `--table=users` |
| `--schema=<name>` | Database schema (default: `public`) | `--schema=my_schema` |
| `--path=<folder>` | Output folder | `--path=src/http` |
| `--prisma` | Use Prisma ORM (repository pattern) | `--prisma` |
| `--pg` | Use PostgreSQL client | `--pg` |
| `--mysql` | Use MySQL client | `--mysql` |

---

### Available Actions

| Action | Generates | Default output |
|--------|-----------|----------------|
| `make:crud` | Model + Controller + Service + Repository + Validation + Resource | `src/app/http/` |
| `make:controller` | Controller + Service + Repository (if `--prisma`) + Validation + Resource | `src/app/http/controller/` |
| `make:module` | Controller + Service + Repository (if `--prisma`) + Validation — co-located | `src/http/module/<table-name>/` |
| `make:model` | Model file (Objection.js) | `src/app/model/` |
| `make:service` | Service file | `src/app/http/service/` |
| `make:repository` | Repository file (Prisma only) | `src/http/repository/` |
| `make:validation` | Validation file (Zod) | `src/app/http/validation/` |
| `make:resource` | Resource / DTO file | `src/app/http/resource/` |

> **`make:module`** generates all files inside a single folder instead of splitting them across separate directories. Imports between files use relative paths (`./`) instead of path aliases.

---

### Examples

```bash
# Recommended: use npm scripts (flags are pre-configured)
npm run gen:crud
npm run gen:controller

# Generate a self-contained module folder
npx frgen make:module --table=users --pg --prisma
# → src/http/module/user/user.controller.ts
# → src/http/module/user/user.service.ts
# → src/http/module/user/user.repository.ts
# → src/http/module/user/user.validation.ts

# Or run individual generators directly
npx frgen make:crud --pg --prisma --path=src/http
npx frgen make:controller --table=users --pg --prisma --path=src/http
npx frgen make:repository --table=products --pg --prisma --path=src/http/repository
npx frgen make:service --table=products --pg --prisma --path=src/http/service
```

---

### Error Reference

| Error Message | Cause |
|---------------|-------|
| `❌ action undefined.` | No command provided |
| `❌ table undefined.` | Table name not specified |
| `❌ ERROR:` | Internal error (e.g. DB connection failure) |
