# Sprint 6 — Routing Design

## Route Structure

```text
App
└── BrowserRouter
    └── AppRoutes
        ├── /                 → Home
        ├── /login            → Login
        ├── /dashboard        → Dashboard
        ├── /profile          → Profile
        ├── /books            → Books
        ├── /members          → Members
        ├── /borrowing        → Borrowing
        ├── /returns          → Returns
        ├── /fines            → Fines
        └── *                 → NotFound
```

## Purpose of Each Route

- `/` — Main landing page.
- `/login` — User login interface.
- `/dashboard` — Main library dashboard.
- `/profile` — User profile.
- `/books` — Book management interface.
- `/members` — Member management interface.
- `/borrowing` — Book borrowing/issue interface.
- `/returns` — Book return interface.
- `/fines` — Fine management interface.
- `*` — Handles invalid URLs.

## Verification Checklist

- [x] React Router dependency identified.
- [x] `AppRoutes.jsx` planned.
- [x] BrowserRouter planned for the application.
- [x] Main application routes defined.
- [x] Navigation links planned.
- [x] NotFound route included.
- [x] Navigation and invalid-route testing documented.
- [x] GitHub commit/push step documented.
