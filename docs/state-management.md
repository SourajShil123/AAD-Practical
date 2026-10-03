# Sprint 9 — State Management with useState

## Location

```text
client/src/pages/Dashboard/
client/src/pages/Books/
client/src/pages/Members/
client/src/pages/Fines/
```

## 1. Managing Component State

State is implemented using the `useState` Hook:

- `counter`: Tracks walk-in circulation activity.
- `timeframe`: Controls metric filters (`today`, `week`, `month`, `all`).
- `notificationsCount`: Tracks unread alert notifications.
- `operatorName`: Stores operator identity for dynamic greetings.
- `isLoggedIn`: Simulates authenticated administrator vs. guest mode.

## 2. State Updating Flow

When a state updater function is invoked:
1. React records the updated value.
2. The component schedules a re-render.
3. The virtual DOM diffs and updates modified elements.

## 3. Verification Checklist

- [ ] State updates trigger automatic re-renders.
- [ ] State is not mutated directly.
- [ ] Initial state values are defined properly.
- [ ] Dependent components reflect updated state.
