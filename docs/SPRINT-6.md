# Sprint 6 — React Router Navigation

## Project Information
- **Project:** Library Management System
- **Domain:** Education
- **Technology:** MERN Stack
- **Sprint:** 6
- **Focus:** Client-side navigation using React Router

## Aim

To implement client-side navigation in the React frontend so users can move between the main pages of the Library Management System without full-page browser reloads.

## 1. Install React Router

The frontend uses React Router for client-side navigation.

```bash
npm install react-router-dom
```

## 2. Create the Routes Folder

Create the following file:

```text
client/src/routes/AppRoutes.jsx
```

This file contains the application's route definitions.

## 3. Define Application Routes

The main application routes include:

| Path | Page |
|---|---|
| `/` | Home |
| `/login` | Login |
| `/dashboard` | Dashboard |
| `/profile` | Profile |
| `/books` | Books |
| `/members` | Members |
| `/borrowing` | Borrowing |
| `/returns` | Returns |
| `/fines` | Fines |
| `*` | NotFound |

The `*` route handles invalid URLs and displays the NotFound page.

## 4. Use BrowserRouter

The React application should use `BrowserRouter` so navigation works through the browser URL.

The route configuration is connected to the main application entry point and rendered through the application component.

## 5. Navigation Links

The Navigation Bar provides links to the application's main pages.

Users can navigate between:

- Home
- Dashboard
- Books
- Members
- Borrowing
- Returns
- Fines
- Profile

Navigation is handled on the client side.

## 6. Login Page Navigation

The Login page is included as a separate route.

After the login interface is displayed, navigation can be extended later when authentication and backend functionality are implemented.

## 7. NotFound Route

A `NotFound` page is configured for invalid routes.

Example:

```text
http://localhost:5173/invalid-page
```

The application displays the 404/Not Found page instead of a blank screen.

## 8. Test Navigation

Verify that:

- Home page opens correctly.
- Login page opens correctly.
- Dashboard page opens correctly.
- Books page opens correctly.
- Members page opens correctly.
- Borrowing page opens correctly.
- Returns page opens correctly.
- Fines page opens correctly.
- Profile page opens correctly.
- Invalid URLs display the NotFound page.
- Browser navigation works correctly.
- No console errors occur.

## 9. Verify the Application

Run the React development server:

```bash
npm run dev
```

Open the application in the browser and test every route through the navigation bar and URL.

## 10. Version Control

Review the completed routing work, commit the Sprint 6 changes using a meaningful commit message, and push the updated project to GitHub.

## Result

Client-side navigation was established using React Router. The Library Management System now has defined routes for the main application pages, including Books, Members, Borrowing, Returns, Fines, Dashboard, Profile, Login, and a NotFound page. Navigation was tested and the application structure is ready for reusable components and further frontend development.
