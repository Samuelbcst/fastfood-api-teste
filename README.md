# API Scaffold – Tech Challenge Fase 02

## 📋 Project Overview

This project is a backend system for a fast-food self-service kiosk, designed to streamline order management, product administration, and customer identification for a growing neighborhood snack bar. The system is built using Clean Architecture, Clean Code principles, TypeScript, Express, TypeORM, and PostgreSQL, and is fully containerized with Docker and deployable on Kubernetes.

---

## 🚀 Features

- **Order Management**: Place, track, and update orders with status progression.
- **Product & Category Management**: CRUD operations for products and fixed categories (Lanche, Acompanhamento, Bebida, Sobremesa).
- **Client Management**: Register and identify clients via CPF.
- **Checkout & Payment**: Simulate or integrate Mercado Pago QRCode payment, with webhook for payment confirmation.
- **Order Tracking**: Real-time order status for clients (Recebido, Em preparação, Pronto, Finalizado).
- **Admin Panel (API)**: Endpoints for managing products, clients, and monitoring orders.
- **API Documentation**: Swagger UI available for all endpoints.
- **Dockerized & Kubernetes-ready**: Easy setup with Docker Compose or Kubernetes manifests for scalable deployment.

---

## 🏗️ Architecture

- **Clean Architecture**
- **Domain-Driven Design (DDD)**
- **TypeORM for persistence**
- **Express for HTTP API**
- **Kubernetes manifests for scalable, secure deployment**
- **ConfigMap and Secrets for sensitive configuration**

---

## 🧑‍💻 Getting Started

### Prerequisites

- Docker & Docker Compose
- Node.js (for local development)
- Kubernetes 

### Running with Docker Compose

```bash
yarn compose
```

- The API will be available at `http://localhost:3000/api/v1`
- Swagger UI: `https://localhost:3000/api-docs`

### Running on Kubernetes

1. Apply the manifests in the `k8s/` directory:
   ```bash
   kubectl apply -f k8s/
   ```
2. Ensure your cluster supports HPA (Horizontal Pod Autoscaler).
3. Use `kubectl get svc` to find the API endpoint.

### Environment Variables

Copy `.env.sample` to `.env` and adjust as needed. For Kubernetes, sensitive values are managed via Secrets and ConfigMaps.

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

- [ ] `POST /orders/checkout` – Checkout order, receive order ID
- [ ] `GET /orders/:id/payment-status` – Check payment status
- [ ] `POST /webhook/payment` – Webhook for payment confirmation (approved/declined)
- [ ] `GET /orders` – List all orders (admin, ordered: Pronto > Em Preparação > Recebido, oldest first, excludes Finalizado)
- [ ] `GET /orders/:id` – Get order by ID
- [ ] `PUT /orders/:id/status` – Update order status (kitchen/admin)
- [ ] `GET /orders/client/:clientId` – List orders for a client

### Order Tracking

- [ ] `GET /orders/:id/status` – Get order status (for client display)

### Payment (MVP)

- [ ] `POST /payments` – Simulate payment or generate Mercado Pago QRCode (if integrated)

### Swagger

- [ ] `GET /api-docs` – API documentation

---

## 🛠️ Database

- PostgreSQL (via Docker or Kubernetes)
- TypeORM migrations auto-run on container start

---

## ☸️ Kubernetes & Infrastructure

- **Deployment**: All services are defined as Deployments and exposed via Services.
- **Scalability**: HPA (Horizontal Pod Autoscaler) enabled for API pods.
- **Security**: Sensitive values managed via ConfigMap and Secrets.
- **Manifests**: All Kubernetes YAML files are in the `k8s/` directory.
- **Cloud/Local**: Can be deployed on Minikube, Kind, or any cloud Kubernetes provider.

---

## 🛡️ Security & Best Practices

- Environment variables managed via `.env` (Docker) or Secrets/ConfigMap (K8s)
- Sensitive files ignored via `.gitignore`
- No secrets committed to the repository

---

## 🖼️ Architecture Diagram

> **[Insert your architecture diagram here: include all services, HPA, ConfigMap, Secrets, and flow for order/payment/notification. Describe how the system handles performance and reliability.]**

---

## 📚 API Documentation

- **Swagger UI**: [https://localhost:3000/api-docs](https://localhost:3000/api-docs)

---

## 📝 Execution Guide

1. **Clone the repository**
2. **Configure environment variables** (`.env` for Docker, Secrets/ConfigMap for K8s)
3. **Start with Docker Compose or Kubernetes**
4. **Run migrations (auto-run)**
5. **Access API and Swagger UI**
6. **Follow the order of API calls as per the business flow:**
   - Register/identify client
   - Create order (checkout)
   - Simulate or process payment
   - Track order status
   - Update order status (admin/kitchen)
   - Finalize order

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
