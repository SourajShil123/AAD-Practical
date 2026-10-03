# Sprint 8 — Component Props

## Location

```text
client/src/components/ui/
client/src/pages/
```

## 1. Passing Props in React

Props are used to pass data from parent components to child components:

- Passed down hierarchically.
- Read-only within the receiving component.
- Used to configure component display and behavior.

## 2. Parameterizing UI Components

The following components receive dynamic props:

- `Welcome.jsx`: Receives `userName`, `role`, `organizationName`, and `projectName`.
- `PageTitle.jsx`: Receives `title`, `subtitle`, `badge`, and `icon`.
- `Card.jsx`: Receives `title`, `subtitle`, `badge`, and `action`.
- `Button.jsx`: Receives `variant`, `size`, `icon`, and `disabled`.

## 3. Dynamic Rendering Across Pages

Verify that:
- Components receive distinct data on different routes.
- No static values are hardcoded in reusable components.
- Components re-render correctly when props change.
