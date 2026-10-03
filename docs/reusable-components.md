# Sprint 7 — Reusable UI Components

## Location

```text
client/src/components/ui/
```

## 1. Shared UI Components Folder

Create a dedicated `ui` folder inside `components`.

It stores reusable UI elements such as:

```text
ui/
├── Button.jsx
├── Card.jsx
├── PageTitle.jsx
└── Input.jsx
```

`Input.jsx` is identified for expansion in later sprints.

## 2. Button Component

Location:

```text
client/src/components/ui/Button.jsx
```

Requirements:
- Accept text through props.
- Support click events.
- Be reusable on multiple pages.
- Avoid hardcoding button labels inside individual pages.

## 3. Card Component

Location:

```text
client/src/components/ui/Card.jsx
```

The Card component should display:
- Title
- Description
- Child content

It should be usable wherever information needs to be grouped visually.

## 4. PageTitle Component

Location:

```text
client/src/components/ui/PageTitle.jsx
```

Purpose:
- Maintain consistent page headings.
- Display page titles using a consistent style.
- Replace manually written page headings with the reusable component.

## Reusability Verification

Verify that:
- Button works on multiple pages.
- Card displays different content correctly.
- PageTitle updates dynamically.
- Duplicate UI markup is reduced.
