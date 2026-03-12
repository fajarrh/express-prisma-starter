---
description: "Use when creating or editing controller, service, repository, validation, or resource files. Covers layer patterns, frexp decorators, Zod schemas, Prisma repository pattern, Resource DTOs, and error handling for the Express-Prisma stack."
applyTo: "src/http/**"
---

# Backend Layer Patterns

## Controller

- Use `@Controller` + method decorators from `frexp/lib/Decorator`
- Only handles: validate input → call service → return response
- Always wrap in try/catch, pass errors to `next(error)`
- Use `req.validation(schema)` to validate (injected by `RequestMiddleware`)
- Never import `prisma` or call repository directly

**Read this file to understand the pattern:** `src/http/controller/auth.controller.ts`

## Service

- Plain exported `async` functions — no class
- Business logic only — calls repository functions
- **Never** imports `prisma` directly
- Throws Exception classes for business rule violations

**Read this file to understand the pattern:** `src/http/service/auth.service.ts`

## Repository

- Plain exported `async` functions — no class
- **The only layer** that imports and uses `prisma` from `@config/db`
- No business logic — only DB operations
- Use `Prisma.{Model}UncheckedCreateInput` / `Prisma.{Model}UncheckedUpdateInput` for input types

**Read this file to understand the pattern:** `src/http/repository/auth.repository.ts`

## Validation (Zod)

- Import with `import * as zod from "zod"`
- Export schema (`{action}Schema`) and inferred type (`type {Action}Schema`) for every operation
- Types are used as parameter types in service functions

**Read this file to understand the pattern:** `src/http/validation/auth.validation.ts`

## Resource (Response DTO)

- `default export` class, extends `Resource` from `frexp/lib/Resource`
- Override `toArray()` to define the response shape
- Access fields via `this.{fieldName}` (from the data passed to constructor)
- Resource wraps `{ data }` internally — usage in controller: `res.json(new FooResource(result, true))`
- For plain response without Resource: `res.json({ data: { message: "success" } })`

**Read this file to understand the pattern:** `src/http/resource/signin.resource.ts`

## Exception Usage

Throw in **service layer** only. Never throw in repository.

| Exception | When |
|---|---|
| `AuthorizationException` | Invalid credentials / missing token |
| `ForbiddenException` | Valid token, insufficient permission |
| `NotFoundException` | Record not found in DB |
| `BadRequestException` | Business rule rejection |
| `UnprocessableException` | Failed business validation (not Zod) |

Import from `@exception/*`.

## Protected Routes (AuthMiddleware)

Apply `AuthMiddleware` to endpoints requiring authentication. `req.user` will be injected (session payload).

**Read this file to understand the pattern:** `src/http/middleware/auth.middleware.ts`

## Pagination

`RequestMiddleware` auto-converts `?page=0&perPage=10` to `req.query.skip` and `req.query.take`.

**Read this file to understand the pattern:** `src/http/middleware/request.middleware.ts`
