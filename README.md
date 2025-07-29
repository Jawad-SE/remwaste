# remwaste

# Patient Management System

A full-stack web application:

- **Backend:** Node.js + Express + PostgreSQL (Prisma ORM)
- **Frontend:** Next.js 14 App Router (React 19, Tailwind CSS)
- **Testing:** Jest, Supertest, Playwright
- **Dockerized** for quick setup
- **CI:** Automated tests, code coverage, and visual regression with GitHub Actions

---

## Features

- User registration, login, and logout with JWT (cookies)
- Role-based access: Admin/User
- Patient CRUD (Create, Read, Update, Delete)
- Search, sort, and pagination for patients
- Animated modals and modern responsive UI
- Unit, integration, E2E, and visual regression tests

---

## Quick Start with Docker

**Requirements:** Docker & Docker Compose

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/patient-management-system.git
cd patient-management-system

Frontend: http://localhost:3000

Backend API: http://localhost:3001

PostgreSQL: accessible at localhost:5432



## 🚀 Stop all services

```bash
docker-compose down
---

## 📝 Local Development (without Docker)

### Backend

```bash
cd backend
cp .env.example .env       # Update DB connection & secrets
npm install
npx prisma migrate dev
npm run dev
```
Runs at [http://localhost:3001](http://localhost:3001)

---

### Frontend

```bash
cd frontend
cp .env.local.example .env.local  # Set API URL
npm install
npm run dev
```
Runs at [http://localhost:3000](http://localhost:3000)

---

## 🧪 Running Tests

### Backend

```bash
cd backend
npm test                # Unit & integration tests
npm run test:coverage   # Code coverage
```

### Frontend

```bash
cd frontend
npm test                # Unit & integration tests
npx playwright test     # E2E & visual regression tests
```

---

## 🐳 Docker Compose Overview

- **postgres:** PostgreSQL 16 with persistent storage  
- **backend:** Express API (auto-migrates DB, Prisma, port 3001)  
- **frontend:** Next.js 14 (port 3000)  
- Environment variables are pre-configured for local development

---

## 🔄 Continuous Integration (CI)

GitHub Actions automatically:

- Runs on every push and pull request
- Spins up a PostgreSQL service for integration testing
- Installs, lints, and tests both backend and frontend
- Collects and uploads code coverage reports
- Runs Playwright E2E and visual regression tests
- Saves all reports as workflow artifacts

Workflow config is in `.github/workflows/ci.yml`.

---

## 📚 Documentation

- **Backend API docs:** Swagger at `/api-docs` ([http://localhost:8001/api-docs](http://localhost:3001/api-docs))
- **Frontend:** [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Tech Stack

- Node.js, Express, Prisma, PostgreSQL
- Next.js 14, React 19, Tailwind CSS
- Jest, Supertest, Playwright, React Testing Library
- Docker, GitHub Actions
