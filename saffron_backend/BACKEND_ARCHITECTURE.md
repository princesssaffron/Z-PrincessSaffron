# 🏗️ Z-Princess Saffron: Backend Architecture & Workflow

This document provides a comprehensive overview of the backend logic, technology stack, and directory workflow for the Z-Princess Saffron e-commerce platform.

---

## 🛠️ Technology Stack

The backend is built using a modern, scalable JavaScript stack (MERN-lite):
- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Framework**: [Express.js](https://expressjs.com/) (Web server and routing)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) (Object Data Modeling)
- **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/) & [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
- **Security**: [Bcryptjs](https://www.npmjs.com/package/bcryptjs) (Password hashing)
- **Payment Gateway**: [Razorpay](https://razorpay.com/)
- **Documentation**: [Swagger / OpenAPI 3.0](https://swagger.io/)
- **Tooling**: [Nodemon](https://nodemon.io/) (Dev environment), [Morgan](https://www.npmjs.com/package/morgan) (Logging), [Dotenv](https://www.npmjs.com/package/dotenv) (Environment variables)

---

## 📂 Folder Structure & Workflow

The project follows a clean, modular **MVC-inspired architecture**:

```text
saffron_backend/src/
├── config/             # Database connection & third-party initializations (JWT, Swagger)
├── models/             # Mongoose schemas (Data structure and validation)
├── controllers/        # Business logic (Processes requests, interacts with models)
├── routes/             # API endpoints (Maps URLs to controllers)
├── middleware/         # Security & Helpers (Auth guards, error handling)
├── app.js              # Express app configuration & middleware pipeline
└── server.js           # Entry point (Starts the server and connects to DB)
```

### Request Lifecycle Workflow:
1. **Request** hits `server.js` -> `app.js`.
2. **Routes** (`routes/`) match the URL and method.
3. **Middleware** (`middleware/authMiddleware.js`) verifies the user's token/permissions.
4. **Controller** (`controllers/`) executes the logic (e.g., `createOrder`).
5. **Model** (`models/`) performs DB operations with built-in validation.
6. **Response** is sent back to the client.

---

## 🧠 Core Business Logic

### 1. Authentication & Security
- **JWT Protection**: High-level `protect` middleware extracts and verifies the bearer token from headers.
- **Admin Guard**: Specialized `admin` middleware restricts access to sensitive routes (e.g., stock updates, sales reports).
- **Google Auth**: Hybrid support for both ID tokens and Access tokens for seamless frontend integration.

### 2. Inventory & Product Management
- **Atomic Stock Control**: Stock is validated immediately before order creation to prevent over-selling.
- **Automated Tagging**: A Mongoose `pre('save')` hook automatically marks products as "Out of Stock" when `stock === 0`.
- **Bulk Management**: Specialized endpoints allow for rapid stock and price updates across the entire catalog.

### 3. Order & Stock Orchestration
- **Circular Integrity**: 
  - **Ordering**: Validates stock -> Reduces inventory -> Creates order.
  - **Cancellation**: Identifies original items -> Restores exact quantities to inventory -> Updates status.
- **Status Management**: Supports `pending`, `confirmed`, `processing`, `shipped`, `delivered`, and `cancelled`.

### 4. Admin Analytics (Aggregation)
- Uses **MongoDB Aggregation Pipelines** for high-performance calculations:
  - **Revenue**: Sums totals of all valid orders (filtering out `cancelled` and `pending`).
  - **Sales Trends**: Groups orders by Date or Month for visual charts.
  - **Low Stock Alerts**: Automatically identifies products with stock below threshold levels.

### 5. Review & Rating System
- **Verified Purchase**: Only users with a `delivered`, `shipped`, or `paid` order for a specific product can leave a review.
- **Dynamic Averaging**: Automatically recalculates the product's overall rating and review count whenever a new review is added.

---

## 🚦 Getting Started (Backend)

1. **Environment**: Create a `.env` file with `MONGO_URI`, `JWT_SECRET`, and `GOOGLE_CLIENT_ID`.
2. **Install**: `npm install`
3. **Run**: `npm run dev` (Nodemon) or `npm start` (Node).
4. **API Docs**: Visit `http://localhost:5000/api-docs` to view full Swagger documentation.
