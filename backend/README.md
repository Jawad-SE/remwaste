# 🏥 Patient Management Backend API

A modern Node.js + Express backend using PostgreSQL (via Prisma ORM) for Patient Management. Features a full Patient CRUD API, user authentication, role-based authorization, and rich automated API docs with Swagger. Well-tested with Supertest & Jest.

---

## 🚀 Features

- **Authentication:** Register & Login (JWT)
- **Role-based Access Control:** Admin/User permissions
- **Patient CRUD:** Create, Read, Update, Delete patients
- **Security:** Helmet, CORS, rate limiting, bcrypt password hashing
- **API Docs:** Interactive Swagger (OpenAPI)
- **Testing:** Automated with Jest & Supertest

---

## 🛠️ Tech Stack

- **Node.js** + **Express**
- **PostgreSQL** with [Prisma ORM](https://www.prisma.io/)
- **Swagger** (API documentation)
- **Jest** & **Supertest** (testing)
- **JWT** (authentication)
- **bcryptjs** (password hashing)

---

## 🏁 Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL database

### Installation

1. **Clone the repository**
    ```bash
    git clone <your-repo-url>
    cd backend
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Configure environment variables**

    Create a `.env` file in the root:
    ```
    DATABASE_URL=postgresql://<user>:<password>@localhost:5432/<db>
    JWT_SECRET=your_jwt_secret
    PORT=3001
    ```

4. **Run database migrations**
    ```bash
    npx prisma migrate dev --name init
    ```

5. **Start the server**
    ```bash
    npm run dev
    ```
    The API will run at [http://localhost:3001](http://localhost:3001)

---

## 📚 API Documentation

Interactive Swagger docs are available at:  
[http://localhost:3001/api-docs](http://localhost:3001/api-docs)

---

## 💻 Useful Scripts

- `npm run dev` — Start in development mode (hot reload)
- `npm run build` — Compile TypeScript to JavaScript
- `npm start` — Run in production mode
- `npm test` — Run tests (Jest + Supertest)
- `npm run test:coverage` — Test coverage report

---

## 🧪 Testing

Run all tests:

```bash
npm test


