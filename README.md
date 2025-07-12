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


### Generator

#### Resource
- make:resource "className" "tableName"

```bash
npx frgen make:resource UserResource users
```
- shema --schema=schemaName
```bash
npx frgen make:resource UserResource users --schema=other_schema
```

#### Controller
- make:controller "className" "tableName"

```bash
npx frgen make:controller UserController users --prisma
```
- shema --schema=schemaName
```bash
npx frgen make:controller UserController users --schema=other_schema --prisma
```
- path --path=/directory/.../target
```bash
npx frgen make:controller UserController users --path=/directory/.../target --prisma
```

#### Service
- make:service "ServiceName" "tableName"

```bash
npx frgen make:service user.service users --prisma
```
- shema --schema=schemaName
```bash
npx frgen make:service user.service users --schema=other_schema --prisma
```
- path --path=/directory/.../target
```bash
npx frgen make:service user.service users --path=/directory/.../target --prisma
```

#### Validation
- make:validation "ValidationName" "tableName"

```bash
npx frgen make:validation user.validation users
```
- shema --schema=schemaName
```bash
npx frgen make:validation user.validation users --schema=other_schema
```

#### ALL
- make:crud "className" "tableName"

```bash
npx frgen make:crud --prisma
```
- shema --schema=schemaName
```bash
npx frgen make:crud --schema=other_schema --prisma
```

- **Create a Controller**:

    Use the `@Controller` decorator to define the base path for your controller. Methods inside the controller can then be decorated with HTTP method decorators like `@Get`, `@Post`, etc.

    ```typescript
    import { Controller, Get } from "@lib/Decorators"; // Adjust based on your file structure
    import { Request, Response, NextFunction } from "express";

    @Controller("/users") // Define controller's base path
    export class UserController {

        @Get("/") // Define GET method for /users route
        async getAllUsers(req: Request, res: Response, next: NextFunction) {
            try {
                res.json({ message: "All Users" });
            } catch (error) {
                next(error);
            }
        }

        @Get("/:id") // Define GET method for /users/:id route
        async getUserById(req: Request, res: Response, next: NextFunction) {
            try {
                const userId = req.params.id;
                res.json({ message: `User ID: ${userId}` });
            } catch (error) {
                next(error);
            }
        }
    }

- **Middleware**:

    You can apply middleware at both the controller and method levels. This is useful for tasks like authentication or logging.

    ```typescript
    import { Middleware, Controller, Get } from "@lib/Decorators";
    import { Request, Response, NextFunction } from "express";

    function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
        console.log(`Request made to: ${req.originalUrl}`);
        next();
    }

    @Controller("/users")
    @Middleware([loggerMiddleware]) // Apply middleware to all routes in the controller
    export class UserController {

        @Get("/")
        @Middleware([loggerMiddleware]) // Apply middleware to this specific method
        async getAllUsers(req: Request, res: Response, next: NextFunction) {
            try {
                res.json({ message: "All Users" });
            } catch (error) {
                next(error);
            }
        }
    }
    ```

## Decorators

### `@Controller(prefix: string)`

Define the base route prefix for the controller.

- **Parameters**: `prefix` - The base path for all routes in the controller.

```typescript
@Controller("/users")
```

### `@Get(path: string)`

Map a method to the HTTP GET request for the given path.

- **Parameters**: `path` - The route path for the GET request.

```typescript
@Get("/:id")
```

### `@Post(path: string)`

Map a method to the HTTP POST request for the given path.

- **Parameters**: `path` - The route path for the POST request.

```typescript
@Post("/")
```

### `@Put(path: string)`

Map a method to the HTTP PUT request for the given path.

- **Parameters**: `path` - The route path for the PUT request.

```typescript
@Put("/:id")
```

### `@Delete(path: string)`

Map a method to the HTTP DELETE request for the given path.

- **Parameters**: `path` - The route path for the DELETE request.

```typescript
@Delete("/:id")
```

### `@Patch(path: string)`

Map a method to the HTTP PATCH request for the given path.

- **Parameters**: `path` - The route path for the PATCH request.

```typescript
@Patch("/:id")
```

### `@Middleware(middleware: Array<Function>)`

Apply middleware at the controller or method level.

- **Parameters**: `middleware` - An array of middleware functions to apply.

```typescript
@Middleware([loggerMiddleware]) // Apply middleware to all methods in the controller
```

---

## Example Usage

### Controller Example

```typescript
import { Controller, Get, Post } from "@lib/Decorators"; // Adjust based on your file structure
import { Request, Response, NextFunction } from "express";

@Controller("/products")
export class ProductController {

    @Get("/")
    async getAllProducts(req: Request, res: Response, next: NextFunction) {
        try {
            res.json({ message: "All Products" });
        } catch (error) {
            next(error);
        }
    }

    @Post("/")
    async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            res.json({ message: "Product Created" });
        } catch (error) {
            next(error);
        }
    }
}
```

### Middleware Example

```typescript
import { Middleware } from "@lib/Decorators";
import { Request, Response, NextFunction } from "express";

function authMiddleware(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
}

@Controller("/secure")
@Middleware([authMiddleware]) // Apply middleware to all routes in the controller
export class SecureController {
    
    @Get("/profile")
    async getProfile(req: Request, res: Response, next: NextFunction) {
        try {
            res.json({ message: "Secure Profile" });
        } catch (error) {
            next(error);
        }
    }
}
```

---

## Conclusion

This library allows you to write cleaner and more expressive code by leveraging TypeScript decorators for routing and middleware in Express.js. It simplifies route creation, middleware assignment, and controller organization, making your server code more modular and easier to maintain.

