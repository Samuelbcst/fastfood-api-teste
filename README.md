# API Scaffold – Tech Challenge Fase 01

## 📋 Project Overview

This project is a backend system for a fast-food self-service kiosk, designed to streamline order management, product administration, and customer identification for a growing neighborhood snack bar. The system is built using a hexagonal architecture (ports & adapters), TypeScript, Express, TypeORM, and PostgreSQL, and is fully containerized with Docker.

---

## 🚀 Features

- **Order Management**: Place, track, and update orders with status progression.
- **Product & Category Management**: CRUD operations for products and fixed categories (Lanche, Acompanhamento, Bebida, Sobremesa).
- **Client Management**: Register and identify clients via CPF.
- **Fake Checkout**: Simulate payment and order queueing.
- **Admin Panel (API)**: Endpoints for managing products, clients, and monitoring orders.
- **API Documentation**: Swagger UI available for all endpoints.
- **Dockerized**: Easy setup with Docker Compose for both app and database.

---

## 🏗️ Architecture

- **Hexagonal (Ports & Adapters)**
- **Domain-Driven Design (DDD)**
- **TypeORM for persistence**
- **Express for HTTP API**

---

## 📝 Event Storming & DDD

  - Order and payment flow
  - Preparation and delivery flow

---

## 🧑‍💻 Getting Started

### Prerequisites

- Docker & Docker Compose
- Node.js (for local development)

### Running with Docker Compose

```bash
yarn compose
```

- The API will be available at `http://localhost:3000`
- Swagger UI: `http://localhost:3000/swagger`

### Environment Variables

Copy `.env.sample` to `.env` and adjust as needed.

---

## 🧪 Running Tests

```bash
yarn test
```

---

## 🗂️ Endpoints Checklist

### Client

- [ ] `POST /clients` – Register client
- [ ] `GET /clients/:cpf` – Identify client by CPF
- [ ] `GET /clients` – List all clients (admin)
- [ ] `PUT /clients/:id` – Update client (optional)
- [ ] `DELETE /clients/:id` – Delete client (optional)

### Product & Category

- [ ] `POST /products` – Create product
- [ ] `PUT /products/:id` – Edit product
- [ ] `DELETE /products/:id` – Remove product
- [ ] `GET /products` – List all products
- [ ] `GET /products/category/:category` – List products by category
- [ ] `GET /categories` – List all categories

### Order

- [ ] `POST /orders` – Create order (checkout/fake payment)
- [ ] `GET /orders` – List all orders (admin)
- [ ] `GET /orders/:id` – Get order by ID
- [ ] `PUT /orders/:id/status` – Update order status (kitchen/admin)
- [ ] `GET /orders/client/:clientId` – List orders for a client

### Order Tracking

- [ ] `GET /orders/:id/status` – Get order status (for client display)

### Payment (Fake/MVP)

- [ ] `POST /payments` – Simulate payment (if separated)

### Swagger

- [ ] `GET /api-docs` – API documentation

---

## 🛠️ Database & Migrations Strategy

### Database Setup
- PostgreSQL (via Docker)
- TypeORM migrations auto-run on container start

### Why Database Tools Are Not Committed in Docker Images

The `database-tools` directory contains migration files and database configuration that are **intentionally not built into the Docker image**. Instead, they are mounted as volumes during container runtime. 

#### ✅ **Advantages:**

1. **Separation of Concerns**: Database schema changes are separated from application code, allowing independent versioning and deployment
2. **Flexibility**: Migrations can be updated without rebuilding the entire application image
3. **Environment-Specific Configurations**: Different environments can have different migration sets or database configurations
4. **Security**: Database credentials and connection details remain external to the image
5. **Development Efficiency**: Developers can modify migrations during development without container rebuilds
6. **Production Safety**: Migration execution is controlled at runtime, allowing for better rollback strategies

- Docker Compose mounts the necessary database-tools files as read-only volumes:
  ```yaml
  volumes:
    - ./dist/database-tools/index.js:/database-tools/index.js:ro
    - ./database-tools/migrations/typeorm:/database-tools/migrations/typeorm:ro
    - ./dist/database-tools/env-variables.js:/database-tools/env-variables.js:ro
  ```
- Migrations run automatically on container start via the `CMD` instruction

---

## 📜 Available Scripts

### Development Scripts
- **`yarn dev`** - Starts the development server with hot reload using nodemon
  - Watches `src` directory for `.ts` and `.js` file changes
  - Automatically restarts the server when files change
  - Uses `ts-node` to run TypeScript directly without compilation

### Production Scripts
- **`yarn start`** - Starts the production server from compiled JavaScript
  - Runs the compiled code from `dist/adapter/driver/http/express/index.js`
  - Used in Docker containers and production environments

### Build Scripts
- **`yarn build`** - Compiles TypeScript to JavaScript
  - Removes existing `dist` directory
  - Compiles all TypeScript files using `tsc`

### Database Scripts
- **`yarn migration:run`** - Runs TypeORM migrations in development
  - Uses TypeScript files directly via `ts-node`
  - Points to `database-tools/index.ts` configuration

- **`yarn migration:docker:run`** - Runs TypeORM migrations in Docker
  - Uses compiled JavaScript files
  - Points to `database-tools/index.js` configuration

### Testing Scripts
- **`yarn test`** - Runs all tests once using Vitest
- **`yarn test:watch`** - Runs tests in watch mode for development
- **`yarn e2etest`** - Runs end-to-end tests
  - Starts database container with `docker compose up -d db`
  - Runs specific E2E test file

### Docker Compose Scripts
- **`yarn compose`** - Complete Docker deployment workflow
  - Stops existing containers (`yarn compose:down`)
  - Builds the application (`yarn build`)
  - Starts all services (`yarn compose:up`)

- **`yarn compose:up`** - Starts all Docker services with build
- **`yarn compose:down`** - Stops all Docker services and removes volumes

### Code Quality Scripts
- **`yarn format`** - Formats code using Prettier
  - Applies consistent code formatting across the project

---

## 🛡️ Security & Best Practices

- Environment variables managed via `.env`
- Sensitive files ignored via `.gitignore`
- No secrets committed to the repository

---

## 📚 How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/feature-name`)
3. Commit your changes
4. Push to the branch
5. Open a pull request

---

## 📄 License

MIT
