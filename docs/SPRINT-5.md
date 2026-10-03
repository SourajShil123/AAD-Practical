# Sprint 5 — Building the Frontend Foundation with React

## Project Information
- **Project:** Library Management System
- **Domain:** Education
- **Technology:** MERN Stack
- **Sprint:** 5
- **Focus:** React frontend foundation

## Aim

To establish a clean and scalable React frontend structure by creating reusable layouts, components, pages, assets, and global styling.

## 1. Organize the Assets Folder

Create the following folders inside `client/src/assets/`:

```text
assets/
├── images/
├── icons/
├── fonts/
└── styles/
```

These folders organize static resources used by the application.

## 2. Create Layout Components

Create reusable layout files inside `client/src/layouts/`:

```text
layouts/
├── MainLayout.jsx
└── AuthLayout.jsx
```

These layouts provide common structures that can be reused across pages.

## 3. Create Common Layout Components

Inside `client/src/components/layout/`, create:

```text
Navbar.jsx
Footer.jsx
Sidebar.jsx
```

These components define common sections of the Library Management System interface.

## 4. Create Reusable UI Components

Inside `client/src/components/common/`, create:

```text
Button.jsx
Card.jsx
Loader.jsx
```

These components are designed to be reused throughout the application.

## 5. Create Page Components

Create placeholder pages for the main application areas:

```text
pages/
├── Dashboard/
│   └── Dashboard.jsx
├── Home/
│   └── Home.jsx
├── Login/
│   └── Login.jsx
├── NotFound/
│   └── NotFound.jsx
└── Profile/
    └── Profile.jsx
```

The pages provide the initial frontend structure. Full navigation is implemented in a later sprint.

## 6. Organize Supporting Folders

The frontend should also contain folders for:

```text
hooks/
routes/
services/
utils/
```

These folders provide organized locations for future application logic.

## 7. Create Global Styles

Inside `client/src/assets/styles/`, create:

```text
global.css
variables.css
```

Global styles provide centralized styling and help maintain consistency throughout the application.

## 8. Assemble the Main Layout

The `MainLayout.jsx` should combine the common interface components:

```text
MainLayout
├── Navbar
├── Main Content
└── Footer
```

A sidebar can be included as part of the application layout where required.

## 9. Test the Frontend

Run the React development server and verify:

- The application starts successfully.
- The main layout is displayed.
- There are no compilation errors.
- The browser console contains no errors.

## 10. Version Control

Review the project structure, commit the completed Sprint 5 work with a meaningful commit message, and push the latest version to GitHub.

## Result

A professional React frontend foundation was created for the Library Management System with organized assets, reusable layouts, common components, placeholder pages, centralized styles, and supporting folders. The application is ready for client-side navigation and further development in upcoming sprints.
