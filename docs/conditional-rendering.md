# Sprint 9 — Conditional Rendering

## Location

```text
client/src/pages/Dashboard/
client/src/pages/Books/
client/src/pages/Members/
client/src/pages/Fines/
```

## 1. Authentication View Guard

Conditional display based on `isLoggedIn` state:

- Logged In: Displays full operational dashboard and active management buttons.
- Logged Out: Displays guest notification banner with read-only view.

## 2. Dynamic Notification Alert Drawer

Conditional display based on `notificationsCount`:

- Count > 0: Displays warning alert with pending notices.
- Count = 0: Displays "All caught up!" confirmation state.

## 3. Data Available vs. Empty State

Conditional display based on search/filter results:

- Data Found: Renders full data tables with interactive rows.
- No Data: Renders an alert message indicating no records matched with a reset button.

## 4. Verification Checklist

- [ ] Conditional elements render according to state.
- [ ] Empty states appear when search results yield zero items.
- [ ] Authentication banners toggle correctly.
- [ ] Latest Sprint 9 changes are pushed to GitHub.
