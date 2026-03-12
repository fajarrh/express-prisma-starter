---
name: new-feature
description: "Use when starting a new backend feature or domain from scratch. Guides through prisma schema → migration → CRUD layer generation (controller, service, repository, validation, resource) following the project SOP."
---

# New Feature Workflow

Gunakan skill ini saat memulai domain/fitur baru dari nol.

## Steps

### 1. Kumpulkan informasi
Tanyakan ke user:
- Nama domain (contoh: `product`, `order`, `category`)
- Field-field yang dibutuhkan beserta tipenya
- Relasi ke model lain jika ada

### 2. Buat Prisma schema
- Buat file `src/prisma/{domain}.prisma`
- Ikuti pola dari `src/prisma/user.prisma`
- Terapkan semua convention dari `.github/instructions/prisma.instructions.md`

### 3. Jalankan migrasi
```bash
npx prisma migrate dev --name add_{domain}
```
Jika Prisma MCP tersedia, jalankan via MCP. Jika tidak, instruksikan user jalankan manual.

### 4. Generate CRUD
Baca reference files terlebih dahulu:
- `src/http/controller/auth.controller.ts`
- `src/http/service/auth.service.ts`
- `src/http/repository/auth.repository.ts`
- `src/http/validation/auth.validation.ts`
- `src/http/resource/signin.resource.ts`

Lalu tulis langsung mengikuti pola yang ada:
- `src/http/validation/{domain}.validation.ts`
- `src/http/repository/{domain}.repository.ts`
- `src/http/service/{domain}.service.ts`
- `src/http/resource/{domain}.resource.ts`
- `src/http/controller/{domain}.controller.ts`

> Jika user meminta pakai frgen: `npm run gen:crud` lalu edit business logic manual.

### 5. Verifikasi
Pastikan:
- [ ] Layer tidak ada yang skip (controller → service → repository)
- [ ] Tidak ada import `prisma` langsung di service
- [ ] Response menggunakan `res.json(new {Domain}Resource(result, true))` atau `res.json({ data: ... })`
- [ ] Exception class yang tepat dilempar di service layer
- [ ] Semua import menggunakan path alias (`@controller/*`, `@service/*`, dll.)
