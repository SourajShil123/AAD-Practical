# Sprint 4 — Project Scaffolding & Development Environment

## Project Information
- **Project:** Library Management System
- **Domain:** Education
- **Technology:** MERN Stack
- **Sprint:** 4
- **Focus:** Project scaffolding and development environment initialization

## Aim
To initialize and set up the frontend and backend development environment for the Library Management System.

## 1. Initialize the Frontend

The React frontend is created inside the `client` folder.

### Create React Client
```bash
npm create vite@latest client
```

Select React when prompted.

Then move into the client folder:

```bash
cd client
```

## 2. Install Required Frontend Dependencies

Install the required packages:

```bash
npm install
npm install react-router-dom
npm install axios
```

- **React Router DOM:** Used for client-side navigation.
- **Axios:** Used for communication with the backend API.

## 3. Run the Frontend

Start the React development server:

```bash
npm run dev
```

The development server provides a local URL that can be opened in the browser to verify that the frontend is running.

## 4. Initialize the Backend

Create the backend server inside the `server` folder.

The backend will be developed using Node.js and Express.js and will later communicate with MongoDB.

Basic backend setup:

```text
server/
├── src/
├── package.json
└── server.js
```

## 5. MongoDB Collections Required

The planned database collections for the Library Management System are:

1. Users
2. Members
3. Books
4. Categories
5. Borrowings
6. Returns
7. Fines
8. Notifications

## 6. Application Navigation Flow

The application will follow this general flow:

```text
User
  ↓
Login / Authentication
  ↓
Dashboard
  ├── Books
  ├── Members
  ├── Borrowings
  ├── Returns
  ├── Fines
  ├── Reports
  └── Notifications
```

## 7. Application Wireframe / UI Planning

Basic wireframes are planned for the main application screens, including:

- Login
- Dashboard
- Book Management
- Member Management
- Book Borrowing
- Book Return
- Fine Management
- Reports
- Notifications

## Result

The frontend and backend development environment for the Library Management System was initialized. Required frontend dependencies were identified and installed, the React development server was tested, and the planned MongoDB collections, navigation flow, and basic wireframes were documented.

This sprint provides the development foundation for the React frontend and Node.js/Express backend that will be expanded in the following sprints.
