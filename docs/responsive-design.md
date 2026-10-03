# Sprint 8 — Responsive UI Design & Media Queries

## Location

```text
client/src/assets/styles/
client/src/layouts/
```

## 1. Responsive Layout Breakpoints

The application defines standardized breakpoints for modern device viewports:

- **Desktop (Large Displays):** `> 1024px`
- **Tablet / Small Laptops:** `<= 1024px`
- **Mobile (Tablets in Portrait & Phones):** `<= 768px`
- **Small Mobile Devices:** `<= 480px`

## 2. CSS Grid Implementation

Metric cards and multi-column forms utilize CSS Grid with auto-fit:

```css
.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}
```

Columns adjust dynamically according to available container width.

## 3. CSS Flexbox Alignment

Flexbox is used for 1D alignments in:
- Navigation bar brand, links, and action buttons.
- Card headers and toolbars.
- Input groups and filter buttons.

## 4. Media Queries (`@media`)

CSS Media Queries adapt layout structures:
- Tablet (`max-width: 1024px`): Two-column dashboard grids wrap into single column.
- Mobile (`max-width: 768px`): Sidebar hides or docks into bottom drawer, navigation links compress, and content padding reduces.
- Small Mobile (`max-width: 480px`): Full-width button actions and stacked table cards.

## 5. Verification Checklist

- [ ] Layout wraps cleanly on tablet viewports.
- [ ] Mobile viewports have no horizontal scrollbar overflow.
- [ ] Tables scroll horizontally within their containers on mobile.
- [ ] Navigation remains accessible across screen resolutions.
- [ ] Latest Sprint 8 changes are committed and pushed to GitHub.
