# Sprint 8 — Component Communication

## Overview

Component communication in React follows unidirectional (one-way) data flow from parent to child.

## 1. Parent-to-Child Communication

Data flows downward through props:

- Parents define and manage the data.
- Children receive data as arguments.
- Children render according to received props.

## 2. Using the Children Prop

Container components accept nested content via `props.children`:

- `Card.jsx`: Wraps and displays arbitrary child elements.
- `MainLayout.jsx`: Injects page content into the main content area using `<Outlet />`.
- `Button.jsx`: Wraps text and icon elements.

## 3. Verification Checklist

- [ ] Data flows unidirectionally from parent to child.
- [ ] Child components do not modify incoming props.
- [ ] Reusable components work on all routes with distinct props.
- [ ] Latest Sprint 8 changes are committed to GitHub.
