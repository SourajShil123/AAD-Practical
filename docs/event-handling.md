# Sprint 9 — Event Handling

## Location

```text
client/src/components/ui/Button.jsx
client/src/components/ui/Input.jsx
client/src/pages/
```

## 1. Button Click Events (`onClick`)

Buttons handle user clicks using synthetic events:

- Increment/decrement circulation counter.
- Switch metric timeframe tabs.
- Settle overdue fine records (`Mark as Paid`).
- Toggle notification alert banners.
- Toggle simulated user login.

## 2. User Input Events (`onChange`)

Input fields capture keystrokes dynamically:

- Text input updates operator name in real time.
- Search input filters transaction table records.
- Catalog input filters book listings by title, author, or ISBN.

## 3. Verification Checklist

- [ ] `onClick` events trigger state update functions.
- [ ] `onChange` events capture typed input values.
- [ ] Event listeners do not cause runtime errors.
- [ ] All interactive buttons respond promptly to user actions.
