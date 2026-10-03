# Sprint 5 — Frontend Folder Structure

The frontend structure created for the Library Management System is:

```text
client/
├── public/
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── icons/
│   │   ├── images/
│   │   └── styles/
│   │       ├── global.css
│   │       └── variables.css
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   └── Loader.jsx
│   │   ├── forms/
│   │   ├── layout/
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   └── ui/
│   │
│   ├── hooks/
│   ├── layouts/
│   │   ├── AuthLayout.jsx
│   │   └── MainLayout.jsx
│   │
│   ├── pages/
│   │   ├── Dashboard/
│   │   │   └── Dashboard.jsx
│   │   ├── Home/
│   │   │   └── Home.jsx
│   │   ├── Login/
│   │   │   └── Login.jsx
│   │   ├── NotFound/
│   │   │   └── NotFound.jsx
│   │   └── Profile/
│   │       └── Profile.jsx
│   │
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
└── package.json
```

## Purpose

- **assets:** Static images, icons, fonts, and styles.
- **components:** Reusable interface components.
- **layouts:** Common page structures.
- **pages:** Application page components.
- **hooks:** Custom React hooks for future use.
- **routes:** Client-side route definitions for later sprints.
- **services:** API and application services for later development.
- **utils:** Utility functions.

This structure follows the Sprint 5 practical requirements and prepares the frontend for the navigation and interactive features developed in later sprints.
