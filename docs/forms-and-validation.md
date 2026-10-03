# Sprint 10 — Controlled Forms and Client-Side Validation

## Location

```text
client/src/pages/Books/Books.jsx
client/src/pages/Members/Members.jsx
client/src/components/ui/Input.jsx
```

## 1. Controlled Components

Every form input element binds its displayed value to React component state and updates state via `onChange`:

- State is the single source of truth for all form values.
- Form fields are initialized with clean default values.
- Inputs clear field-level errors as the user edits.

## 2. Validation Rules (Book Registration)

- **Title:** Required; minimum 3 characters.
- **Author:** Required; minimum 3 characters.
- **ISBN:** Required; must match 10 or 13-digit format (e.g. `978-0132350884`).
- **Copies:** Required; positive integer between 1 and 100.
- **Publication Year:** Required; valid year between 1450 and current calendar year.

## 3. Form Submission & Reset

- `e.preventDefault()` stops default browser page reloads.
- Submissions trigger the validator; if errors exist, messages display beneath invalid fields.
- Valid submissions log payload to console and insert new items into live catalog state.
- Form fields and error states reset upon successful submission or when clicking the Reset button.

## 4. Verification Checklist

- [ ] All inputs are controlled via React State.
- [ ] Submitting empty form displays field-level error messages.
- [ ] Submitting invalid ISBN or copies highlights the faulty input.
- [ ] Submitting valid data adds the book to the catalog table.
- [ ] Reset button clears all inputs and error messages.
- [ ] No browser reload occurs during submission.
- [ ] Sprint 10 changes are committed and pushed to GitHub.
