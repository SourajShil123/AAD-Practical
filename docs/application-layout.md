# Sprint 7 — Application Layout

## Existing Layout Components

```text
client/src/components/layout/
├── Navbar.jsx
├── Footer.jsx
└── Sidebar.jsx
```

## Navigation Bar

Location:

```text
client/src/components/layout/Navbar.jsx
```

Improve the Navigation Bar by including:
- Application Logo or Name
- Navigation Links
- Active Link Highlighting
- Basic Responsive Menu Structure

The Navigation Bar should provide consistent navigation across the application.

## Footer

Location:

```text
client/src/components/layout/Footer.jsx
```

Create a consistent footer shared across application pages.

Include:
- Project Name
- Copyright
- Current Year
- Developer/Group Name (optional)

## Existing Page Layout

The application continues to use:

```text
layouts/
├── MainLayout.jsx
└── AuthLayout.jsx
```

Navbar and Footer should remain shared through the application layout.

## Update Existing Pages

Update pages under:

```text
client/src/pages/
```

Use:
- PageTitle
- Button
- Card

Avoid duplicating the same HTML/interface markup across pages.

## Verification

Check that:
- Navbar remains consistent.
- Footer remains consistent.
- Application layout is unchanged.
- Reusable components work correctly across pages.
