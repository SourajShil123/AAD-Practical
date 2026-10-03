# Sprint 6 — Routing Structure

## Route List

| Route | Purpose |
|---|---|
| `/books` | Book Management |
| `/members` | Member Management |
| `/borrowing` | Book Borrowing |
| `/returns` | Book Return |
| `/fines` | Fine Management |
| `*` | NotFound page |

## Example React Router Structure

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/members" element={<Members />} />
        <Route path="/borrowing" element={<Borrowing />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/fines" element={<Fines />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

The exact component imports and project file locations can be adjusted to match the existing frontend structure.

## Verification Checklist

- [ ] React Router installed
- [ ] BrowserRouter configured
- [ ] Books route tested
- [ ] Members route tested
- [ ] Borrowing route tested
- [ ] Returns route tested
- [ ] Fines route tested
- [ ] NotFound route tested
- [ ] No console errors
- [ ] Navigation verified in browser
