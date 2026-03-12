# Express-Prisma Starter Kit — Copilot Instructions

## Project Context

This is a **starter kit / boilerplate**. Files that currently exist in `src/http/` are **pattern references only** — they demonstrate the correct SOP, layer structure, and code style for this project.

| File | Role |
|---|---|
| `src/http/controller/auth.controller.ts` | Contoh pola Controller |
| `src/http/service/auth.service.ts` | Contoh pola Service |
| `src/http/repository/auth.repository.ts` | Contoh pola Repository |
| `src/http/validation/auth.validation.ts` | Contoh pola Validation |
| `src/http/resource/signin.resource.ts` | Contoh pola Resource |
| `src/prisma/user.prisma` | Contoh pola Prisma schema |

When asked to build a new feature: **read these reference files first** to understand the existing pattern, then generate new code that follows the same structure. Do not assume auth is the only domain — new domains are added on top of this boilerplate.

## Stack

Node.js, Express 5, Prisma 7, PostgreSQL, Redis (ioredis), TypeScript (strict), Zod 4, frexp, frgen.

## Architecture

Strict layered architecture. **NEVER skip a layer or merge responsibilities across layers.**

```
Controller → Service → Repository → Prisma
```

| Layer | Responsibility |
|---|---|
| **Controller** | HTTP request/response only. Validates input, calls service, returns response. |
| **Service** | Business logic only. Calls repository. Never imports `prisma` directly. |
| **Repository** | The **only** layer that imports and uses `prisma` from `@config/db`. No business logic. |
| **Validation** | Zod schemas + inferred types. |
| **Resource** | Response DTO. Extends `frexp/lib/Resource`. |

## Folder Structure (Flat — Default)

```
src/http/
  controller/     # @controller/*
  service/        # @service/*
  repository/     # @repository/*
  validation/     # @validation/*
  resource/       # @resource/*
  middleware/     # @middleware/*
  module/         # co-located layout — only when explicitly requested
src/exception/    # @exception/*
src/config/       # @config/*
src/utils/        # @utils/*
src/constant/     # @constant/*
src/prisma/       # Prisma schema files (one model per file)
src/generated/    # Prisma client output — NEVER edit manually
```

Always use **path aliases**, never relative paths (except inside `module/` co-located files).

## Response Format

**Success — with Resource:**
```typescript
res.json(new FooResource(result, true))  // Resource wraps { data } internally
```

**Success — without Resource (plain):**
```typescript
res.json({ data: { message: "success" } })
```

**Validation / Zod error** — handled automatically by `ErrorHandler`:
```json
{
  "code": "VALIDATION_ERROR",
  "message": "...",
  "error": [{ "path": "fieldName", "type": "invalid_type", "message": "..." }]
}
```

**Other errors** — throw the appropriate Exception class, `ErrorHandler` handles the rest.

## Exceptions

| Class | HTTP | ErrorCode | When to throw |
|---|---|---|---|
| `AuthorizationException` | 401 | `UNAUTHORIZED` | Invalid/missing token, wrong credentials |
| `ForbiddenException` | 403 | `FORBIDDEN` | Valid token but insufficient permission |
| `NotFoundException` | 404 | `NOT_FOUND` | Record not found |
| `BadRequestException` | 400 | `BAD_REQUEST` | Malformed request, business rule rejection |
| `UnprocessableException` | 422 | `UNPROCESSABLE` | Failed business validation (not Zod) |

Import from `@exception/*`. All are caught automatically by `ErrorHandler` middleware.

## Generating Code with frgen

frgen adalah **tool pembantu opsional** untuk generate boilerplate CRUD awal. Gunakan jika membantu, tapi jika sudah paham polanya langsung tulis manual mengikuti pattern yang ada.

**Rules:**
- frgen hanya relevan jika file target **belum ada**
- frgen tidak generate business logic — guard, kondisi, custom query tetap ditulis manual
- Jika sudah paham pola dari reference files, langsung generate manual tanpa frgen
- Jika ingin pakai frgen, tanyakan ke user terlebih dahulu

Npm scripts (flags pre-configured):

```bash
npm run gen:crud          # controller + service + repository + validation + resource
npm run gen:controller    # controller + service + repository + validation + resource
npm run gen:service       # service only
npm run gen:repository    # repository only (Prisma)
npm run gen:validation    # validation only
npm run gen:resource      # resource only
npm run gen:module        # co-located module folder (controller + service + repository + validation)
```

Direct invocation — always append `--pg --prisma --path=src/http`:
```bash
npx frgen make:crud --table=products --pg --prisma --path=src/http
npx frgen make:module --table=products --pg --prisma --path=src/http/module/product  # co-located only
```

## frexp Decorators

Import from `frexp/lib/Decorator`. Requires `experimentalDecorators` + `emitDecoratorMetadata` (already set in tsconfig).

```typescript
import { Controller, Get, Post, Put, Delete } from "frexp/lib/Decorator";

@Controller("/products")
export class ProductController { ... }
```

**Auto-registration:** `generate-router.ts` scans `src/http/controller/` automatically on `npm run dev`.
**Skip auto-registration:** prefix filename with `_` (e.g. `_internal.controller.ts`) for manual-only routes.

## Naming Conventions

| File | Filename | Export |
|---|---|---|
| Controller | `{domain}.controller.ts` | `class {Domain}Controller` |
| Service | `{domain}.service.ts` | named functions: `handle{Action}` |
| Repository | `{domain}.repository.ts` | named functions: `get{Entity}`, `create{Entity}`, `update{Entity}`, `delete{Entity}` |
| Validation | `{domain}.validation.ts` | `{action}Schema` + `type {Action}Schema` |
| Resource | `{domain}.resource.ts` | `default class {Domain}Resource` |

## References

- Layer patterns → `.github/instructions/backend-layer.instructions.md`
- Prisma schema conventions → `.github/instructions/prisma.instructions.md`
- frgen usage → `USAGE.md`
