# (Express - Prisma - Postgres) - Stater Kit

A robust starter kit for building RESTful APIs using **Express.js**, **Prisma** as an ORM, **Yup** for as an validation and **PostgreSQL** for database management.

## Features

- 🌟 **Express.js**: Fast and minimalist web framework.
- 🗃 **PostgreSQL**: High-performance relational database.
- 📄 **Environment Variables**: Managed with `.env` using `dotenv`.
- 🛡 **Error Handling**: Centralized error management.

---

## Getting Started

### Prerequisites

- **Node.js**: >= 16.x
- **npm** or **yarn**
- **PostgreSQL**: Ensure PostgreSQL is installed and running.

---

### Installation

- Clone the repository:

```bash
   git clone https://github.com/fajarrh/express-prisma-starter.git
   cd express-prisma-starter
```

# Environment Configuration for Development

This document provides instructions on how to configure the environment variables for running the application in the development environment.

## Environment File Setup

Create a `.env` file in the root directory of the project and populate it with the following variables:

```env

HOSTNAME=localhost
PORT=8001
ADDR="http://localhost:8001"

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=
DB_NAME=db_report
DB_SCHEMA=public

JWT_SECRET=12345

REDIS_PORT=6379
REDIS_HOST=127.0.0.1

CORS_ORIGIN=http://localhost:3002
CORS_CREDENTIALS=true
CORS_ALLOW_METHODS="GET,POST,PUT,DELETE"
CORS_ALLOW_HEADERS="Origin,Authorization,Content-Type,Accept"
```

### Description of Variables

#### General Configuration

- **`NODE_ENV`**: Specifies the environment mode. For development, set this to `development`.
- **`HOSTNAME`**: The hostname where the application will run.
- **`PORT`**: The port where the application will listen.
- **`ADDR`**: The full address (hostname + port) for accessing the application.

#### Database Configuration

- **`DB_HOST`**: Hostname for the database server.
- **`DB_PORT`**: Port number for the database server.
- **`DB_USER`**: Username for the database.
- **`DB_PASSWORD`**: Password for the database.
- **`DB_NAME`**: Name of the database to connect to.
- **`DB_SCHEMA`**: (Optional) Database schema to use.

#### Authentication

- **`JWT_SECRET`**: Secret key used for signing JWT tokens. This should be kept secure.

#### Redis Configuration

- **`REDIS_PORT`**: Port number for the Redis server.
- **`REDIS_HOST`**: Hostname for the Redis server.

#### CORS Configuration

- **`CORS_ORIGIN`**: The origin(s) allowed to access the application. Use a comma-separated list for multiple origins.
- **`CORS_CREDENTIALS`**: Specifies whether cookies and credentials are allowed in cross-origin requests. Set this to `true` or `false`.
- **`CORS_ALLOW_METHODS`**: HTTP methods allowed for CORS requests.
- **`CORS_ALLOW_HEADERS`**: HTTP headers allowed for CORS requests.

### Notes

- Ensure the `.env` file is included in `.gitignore` to prevent exposing sensitive information in version control.
- Customize the variables based on your development environment setup.

For further assistance, consult the project documentation or reach out to the development team.

### Prisma
- first migrate prisma.schema first `npx prisma migrate dev`


# 🧰 FRGEN — CLI CRUD Generator

`frgen` is a **Command Line Tool** that automatically generates boilerplate files such as **models**, **controllers**, **services**, **validations**, and **resources** based on your database table structure.

---

## 📦 Installation

If published on npm, you can run it directly using:

```bash
npx frgen <action> [options...]
```

Example:
```bash
npx frgen make:controller --table=users --path=modules/users
```

Or install it globally (optional):

```bash
npm install frgen --save-dev
npx frgen make:crud --pg
```

---

## ⚙️ General Options

| Option | Description | Example |
|--------|--------------|----------|
| `--table=<table_name>` | The table name used as the generation base | `--table=users` |
| `--schema=<schema_name>` | (Optional) Database schema, default `public` | `--schema=my_schema` |
| `--path=<output_folder>` | (Optional) Output file path | `--path=modules/user` |
| `--prisma` | Use Prisma ORM | `--prisma` |
| `--pg` | Use PostgreSQL client | `--pg` |
| `--mysql` | Use MySQL client | `--mysql` |

---

## 🧩 Available Actions

### 1. `make:model`
Generates a **model** file based on the database table structure.

```bash
npx frgen make:model --table=users --schema=public
```

**Process:**
- Reads the table structure from the database
- Generates a PascalCase model name  
- Saves it in the default path or the specified `--path`

---

### 2. `make:resource`
Generates a **resource** file (usually a DTO or response mapper).

```bash
npx frgen make:resource --table=products
```

---

### 3. `make:controller`
Generates a complete set of files including:
- Controller
- Service
- Validation
- Resource

```bash
npx frgen make:controller --table=users --path=modules/users
```

**Steps performed:**
1. `generateController()`
2. `generateService()`
3. `generateValidation()`
4. `generateContent()`

---

### 4. `make:crud`
Generates a full CRUD structure at once, including:
- Model  
- Controller  
- Service  
- Validation  
- Resource  

```bash
npx frgen make:crud --pg --schema=public
```

**Use this to generate the full CRUD boilerplate automatically.**

---

### 5. `make:validation`
Generates an automatic **validation** file based on table structure.

```bash
npx frgen make:validation --table=orders
```

---

### 6. `make:service`
Generates a **service layer** file for business logic.

```bash
npx frgen make:service --table=users --path=modules/users
```

---

## 🧠 Internal Explanation

### Key Variables

| Variable | Description |
|-----------|--------------|
| `action` | Main command (`make:model`, `make:crud`, etc.) |
| `tableName` | Target table name |
| `_path` | Output path for generated files |
| `schema` | Database schema (default: `public`) |
| `client` | Database client (`pg` or `mysql`) |
| `prisma` | Boolean, whether Prisma ORM is used |
| `pool` | Active database connection |

---

### Execution Flow of `frgen`

1. Parse CLI arguments  
2. Set `DB_CLIENT` according to the option (`pg` or `mysql`)  
3. Create a database connection using `db.createPool()`  
4. Check database connectivity with `checkDatabaseConnection()`  
5. Execute action based on the command:
   - `make:model` → `generateModelContent()`
   - `make:controller` → `generateController()`, `generateService()`, etc.
   - `make:crud` → `generateAll()`  
6. Close the database connection (`pool.end()` / `pool.releaseConnection()`)  

---

## 💡 Full Examples

### PostgreSQL
```bash
npx frgen make:controller --table=users --schema=public --pg --path=modules/users
```

### MySQL
```bash
npx frgen make:crud --mysql --path=modules/user
```

### With Prisma
```bash
npx frgen make:service --table=products --path=modules/products --prisma
```

---

## 🧱 Internal Dependencies

| File | Description |
|------|--------------|
| `./db.js` | Database connection utility |
| `./utils.js` | Utility functions: `checkDatabaseConnection`, `removePluralSuffix`, `toPascalCase` |
| `./make:model.js` | Model generator |
| `./make:controller.js` | Controller generator |
| `./make:service.js` | Service generator |
| `./make:validation.js` | Validation generator |
| `./make:resource.js` | Resource generator |
| `./make:crud.js` | Full CRUD generator |

---

## 🧨 Error Handling

| Error Message | Cause |
|----------------|--------|
| `❌ action undefined.` | No command provided |
| `❌ table undefined.` | Table name missing |
| `❌ ERROR:` | Internal error (e.g. DB connection failure) |

---

## 🧾 License

This script is **internal & open for customization**, and can be modified freely for project needs.
