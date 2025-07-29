# Patient Management Frontend

A Next.js 14 App Router project for managing patients with authentication and CRUD operations with unit, integration and e2e Testing.

## 🚀 Features

* **Register / Login / Logout** using JWT stored in cookies
* **Patient CRUD** with prefilled edit forms
* **Search, Sort & Pagination** for patient lists
* **Country-code phone input** using `react-phone-input-2`
* **Animated Modals** with a gradient UI

## ⚙️ Getting Started

### Prerequisites

* Node.js >= 18
* npm or yarn

### Install dependencies

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```ini
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Run in Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run the container

```bash
docker compose up --build
```

## Available Scripts

npm run dev: Start development server

npm run build: Build for production

npm run start: Start production server

## Project Structure

## Running Tests
### Unit and Integration Tests

npm test

```
src/
├── app/
│   ├── (auth)/       # Authentication routes and pages
│   └── (dashboard)/  # Protected dashboard pages
├── components/       # Reusable React components
├── hooks/            # Custom React hooks
├── types/            # TypeScript type definitions

```

## 🧑‍💻 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
