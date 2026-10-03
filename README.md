# Library Management System

The Library Management System is a full-stack MERN web application designed to manage books, members, borrowing, returns, and fines through a centralized, reactive platform.

## Project Information
- **Domain:** Education
- **Technology Stack:** MongoDB, Express.js, React.js 19, Node.js (Vite frontend)

---

## Sprints Summary

- **Sprint 1 — Project Foundation & Development Environment:** Workspace initialization, Git version control, software setup.
- **Sprint 2 — Requirements Analysis:** User roles, functional & non-functional requirements.
- **Sprint 3 — System Design & Database Modeling:** Entity-Relationship diagrams, schema definitions.
- **Sprint 4 — Project Scaffolding & Development Environment:** Client and Server scaffolding, environment variables.
- **Sprint 5 — Frontend Foundation with React:** Component setup, base styling with modern CSS variables.
- **Sprint 6 — React Router Navigation:** Multi-page client-side routing, protected and public layouts.
- **Sprint 7 — Reusable Components and Application Layout:** Core UI components (`Button`, `Card`, `PageTitle`), Main & Auth layouts.
- **Sprint 9 — Working with React State, Props, and Event Handling:** Dynamic data flow via Props, component state with `useState`, user event handling (`onClick`, `onChange`), dynamic rendering, and conditional UI branches.

---

## Sprint 9 Overview & Highlights

- **Dynamic Welcome Component (`Welcome.jsx`):** Reusable banner accepting configurable props (`userName`, `role`, `organizationName`, `projectName`, `isLoggedIn`, etc.) with zero hardcoded strings.
- **State Management (`useState`):** Live walk-in circulation counter, dynamic metric timeframe filter ('today', 'week', 'month', 'all'), active notification badges, and live operator name binding.
- **Event Handling:** Button click handlers (`onClick`) for counter manipulation, timeframe filters, notification dismissal, and fine settlements; real-time input event listeners (`onChange`) for live text updates and table searching.
- **Conditional Rendering:** Authenticated administrator mode vs. guest view banners, alert drawer toggling, and contextual empty-state messages for zero-result table queries.
- **Component Enhancements:** Extended `Button.jsx`, `Card.jsx`, and `PageTitle.jsx` with active states, collapsibility, badges, and responsive layouts.

Detailed documentation for Sprint 9 is available in:
- [`docs/SPRINT-9.md`](./docs/SPRINT-9.md)
- [`docs/state-and-props.md`](./docs/state-and-props.md)
- [`docs/event-handling-and-conditional-rendering.md`](./docs/event-handling-and-conditional-rendering.md)

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

# Run high-speed static analysis / linter
npm run lint --prefix client
```
