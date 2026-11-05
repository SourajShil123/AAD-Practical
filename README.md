# Library Management System (LibMaster)

The Library Management System is a full-stack MERN web application designed to manage books, members, borrowing, returns, and fines through a centralized, reactive platform.

## Project Information
- **Project:** LibMaster — Library Management System
- **Domain:** Education
- **Technology Stack:** MongoDB, Express.js, React.js 19, Node.js (Vite frontend)

---

## Sprints Summary (Sprint 1 to 15)

- **Sprint 1 — Project Foundation & Development Environment:** Workspace initialization, Git version control, software setup.
- **Sprint 2 — Requirements Analysis:** User roles, functional & non-functional requirements.
- **Sprint 3 — System Design & Database Modeling:** Entity-Relationship diagrams, schema definitions.
- **Sprint 4 — Project Scaffolding & Development Environment:** Client and Server scaffolding, environment variables.
- **Sprint 5 — Frontend Foundation with React:** Component setup, base styling with modern CSS variables.
- **Sprint 6 — React Router Navigation:** Multi-page client-side routing, protected and public layouts.
- **Sprint 7 — Reusable Components and Application Layout:** Core UI components (`Button`, `Card`, `PageTitle`), Main & Auth layouts.
- **Sprint 8 — Responsive UI using CSS, Flexbox, Grid, and Media Queries:** Responsive multi-column grid layouts, flexible containers, and media query breakpoints for desktop, tablet, and mobile.
- **Sprint 9 — Working with React State, Props, and Event Handling:** Dynamic data flow via Props, component state with `useState`, user event handling (`onClick`, `onChange`), dynamic rendering, and conditional UI branches.
- **Sprint 10 — Building Forms, Controlled Components, and Client-Side Validation:** Controlled form components, form state synchronization, client-side validation rules, user feedback, and form resetting.
- **Sprint 11 — Setting Up the Backend with Node.js and Express.js:** Express server initialization, layered modular architecture (`config`, `controllers`, `middleware`, `models`, `routes`, `services`, `utils`, `uploads`, `public`), decoupling `app.js` and `server.js`, and test API endpoints.
- **Sprint 12 — Express Routing and Middleware:** RESTful routing for the Books module (`GET`, `POST`, `PUT`, `DELETE`), route parameters (`:id`), controller separation, custom request logger middleware, and `next()` pipeline control.
- **Sprint 13 — MongoDB Setup and Backend Database Connection:** Cloud MongoDB Atlas provision (`LibraryManagementDB`), `books` collection, Mongoose ODM installation, `.env` configuration, database connection module (`server/config/database.js`), and REST API verification.
- **Sprint 14 — Mongoose Schemas and Models:** Mongoose Schema and Model creation for the Book entity (`server/models/Book.js`), field validation rules, unique ISBN indexing, controller integration, and live database persistence.
- **Sprint 15 — Implementing CRUD REST APIs with MongoDB:** Full database-driven CRUD operations for books (`POST`, `GET`, `GET /:id`, `PUT /:id`, `DELETE /:id`) connected to MongoDB Atlas with Mongoose methods, semantic HTTP status codes (`200`, `201`, `400`, `404`, `500`), and defensive error handling.

---

## Detailed Sprint Documentation

Complete documentation, guides, and practical specifications for all sprints are available in the `docs/` directory:

- [Sprint 1: Project Foundation](./docs/SPRINT-1.md)
- [Sprint 2: Requirements Analysis](./docs/SPRINT-2.md) & [Requirements Specification](./docs/requirements.md)
- [Sprint 3: Database & System Design](./docs/SPRINT-3.md), [Database Design](./docs/database-design.md) & [System Design](./docs/system-design.md)
- [Sprint 4: Development Environment & Scaffolding](./docs/SPRINT-4.md) & [Dev Environment](./docs/development-environment.md)
- [Sprint 5: Frontend Foundation with React](./docs/SPRINT-5.md) & [Frontend Structure](./docs/frontend-folder-structure.md)
- [Sprint 6: React Router Navigation](./docs/SPRINT-6.md), [Routing Structure](./docs/routing-structure.md) & [Routing Design](./docs/routing-design.md)
- [Sprint 7: Reusable Components & Layout](./docs/SPRINT-7.md), [Application Layout](./docs/application-layout.md) & [Reusable Components](./docs/reusable-components.md)
- [Sprint 8: Responsive Design](./docs/SPRINT-8.md) & [Responsive Design Guide](./docs/responsive-design.md)
- [Sprint 9: React State, Props & Event Handling](./docs/SPRINT-9.md), [State Management](./docs/state-management.md) & [Event Handling](./docs/event-handling.md)
- [Sprint 10: Forms & Validation](./docs/SPRINT-10.md) & [Forms and Validation](./docs/forms-and-validation.md)
- [Sprint 11: Backend Architecture & Express Setup](./docs/SPRINT-11.md) & [Backend Architecture](./docs/backend-architecture.md)
- [Sprint 12: Express Routing & Middleware](./docs/SPRINT-12.md) & [Routing and Middleware](./docs/routing-and-middleware.md)
- [Sprint 13: MongoDB Setup & Database Connection](./docs/SPRINT-13.md)
- [Sprint 14: Mongoose Schemas & Models](./docs/SPRINT-14.md) & [Book Schema Design](./docs/book-schema-design.md)
- [Sprint 15: Implementing CRUD REST APIs with MongoDB](./docs/SPRINT-15.md)

---

## How to Run the Project

### Option 1: Run Both from Root (Recommended)

1. **Install dependencies:**
   ```bash
   npm run install:all
   ```

2. **Start both frontend and backend concurrently:**
   ```bash
   npm run dev
   ```

- **Frontend (Client):** [http://localhost:5173](http://localhost:5173)
- **Backend (Server):** [http://localhost:5000](http://localhost:5000)

### Option 2: Run Separately

**Frontend (Client):**
```bash
cd client
npm install
npm run dev
```

**Backend (Server):**
```bash
cd server
npm install
npm run dev
```

### Production Build & Linting

```bash
# Build the client bundle
npm run build --prefix client

# Run static analysis / linter
npm run lint --prefix client
```
