---
description: "Use when creating or editing Prisma schema files, adding new models, modifying database structure, or writing database migrations. Covers model naming, field mapping, column conventions and schema organization."
applyTo: "src/prisma/**"
---

# Prisma Schema Conventions

## Schema Organization

- Main `schema.prisma` contains **only** the `generator` and `datasource` blocks
- Each model lives in its **own file**: `src/prisma/{model-name}.prisma`
- Prisma client output goes to `src/generated/prisma` — **never edit generated files manually**

**Read this file to understand the pattern:** `src/prisma/user.prisma`

## Model Naming & Mapping Rules

| Item | Convention | Example |
|---|---|---|
| Model name | PascalCase singular | `Product`, `OrderItem` |
| Table name | snake_case plural via `@@map` | `@@map("products")` |
| Field name | camelCase | `phoneNumber`, `createdAt` |
| Column name | snake_case via `@map` | `@map("phone_number")` |

## Field Rules

- String fields: always specify `@db.VarChar` or `@db.VarChar(n)`
- Password fields: `@db.VarChar(255)`
- Phone numbers: `@db.VarChar(16)`
- Timestamps: always use `DateTime?` (nullable), add `@map` and `@db.Timestamp(6)`
- `createdAt`: `@default(now()) @map("created_at") @db.Timestamp(6)`
- `updatedAt`: `@updatedAt @map("updated_at")`
- Unique fields: use `@unique`
- Auto-increment PK: `@id @default(autoincrement())`

## Relations

Foreign key field: camelCase + `@map("snake_case")`. Always follow the same timestamp + `@@map` rules.

## Prisma Input Types in Repository

Always use generated Prisma types — never define manual input types in repository.

Use `Prisma.{Model}UncheckedCreateInput` for create, `Prisma.{Model}UncheckedUpdateInput` for update.

**Read this file to understand the pattern:** `src/http/repository/auth.repository.ts`

## After Adding a New Model

1. Create `src/prisma/{model-name}.prisma` with the model definition
2. Run Prisma migration: `npx prisma migrate dev --name <migration-name>`
3. Generate CRUD boilerplate: langsung tulis manual mengikuti pola reference files, atau gunakan frgen jika user meminta (`npm run gen:crud`)
