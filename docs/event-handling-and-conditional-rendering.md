# Event Handling and Conditional Rendering Guide

## Overview

In Sprint 9 of the Library Management System, user interaction and dynamic rendering were introduced via React Synthetic Events and Conditional Rendering patterns.

---

## 1. Event Handling in React

React uses a synthetic event wrapper to provide unified, cross-browser event handling. Event attributes use camelCase syntax (e.g., `onClick`, `onChange`, `onSubmit`).

### A. Button Click Events (`onClick`)

In `client/src/components/ui/Button.jsx`, the reusable button forwards synthetic event listeners directly:

```jsx
<button
  type={type}
  onClick={onClick}
  disabled={disabled}
  className={`btn btn-${variant} ${active ? 'btn-active' : ''}`}
>
  {children}
</button>
```

#### Counter Actions (Increment, Decrement, Reset)

```jsx
// Increment circulation counter
<Button size="sm" variant="primary" icon={Plus} onClick={() => setCounter(c => c + 1)}>
  +1 Issue
</Button>

// Decrement circulation counter with floor guard
<Button size="sm" variant="secondary" icon={Minus} onClick={() => setCounter(c => Math.max(0, c - 1))}>
  -1
</Button>

// Reset circulation counter to zero
<Button size="sm" variant="ghost" icon={RotateCcw} onClick={() => setCounter(0)}>
  Reset
</Button>
```

#### Settling Overdue Fines in `Fines.jsx`

```jsx
const settleFine = (id) => {
  setFinesList(
    finesList.map((f) => (f.id === id ? { ...f, status: 'Paid' } : f))
  );
};

// Attached to button in table row:
<Button size="sm" variant="primary" onClick={() => settleFine(f.id)}>
  Mark as Paid
</Button>
```

---

### B. User Input Events (`onChange`)

Input elements capture keystrokes using the synthetic `onChange` event, reading `e.target.value`:

```jsx
// Real-time operator name updates
<Input
  placeholder="Type operator name..."
  value={operatorName}
  onChange={(e) => setOperatorName(e.target.value)}
/>

// Instant table search filtering
<Input
  placeholder="Search transactions..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  icon={Search}
/>
```

---

## 2. Conditional Rendering Patterns

React evaluates JavaScript expressions inline to render different visual branches according to application state.

### Pattern 1: Authentication State Guard (Inline Ternary / Logical AND)

```jsx
{!isLoggedIn && (
  <div className="warning-banner">
    <AlertTriangle size={20} />
    <span>Guest Mode: Read-only access enabled. Please sign in to issue circulation records.</span>
    <Button size="sm" onClick={() => setIsLoggedIn(true)}>Log In Now</Button>
  </div>
)}
```

### Pattern 2: Dynamic Empty States vs. Data Tables

```jsx
{filteredTransactions.length > 0 ? (
  <div className="table-container">
    <table className="data-table">
      {/* Table rows */}
    </table>
  </div>
) : (
  <div className="empty-state-card">
    <AlertTriangle size={36} />
    <h4>No Transactions Found</h4>
    <p>No circulation records match your search criteria.</p>
    <Button size="sm" onClick={() => setSearchQuery('')}>Clear Search</Button>
  </div>
)}
```

### Pattern 3: Dynamic Notification Alert Drawer

```jsx
{showNotifications && (
  <div className="alert-drawer">
    {notificationsCount > 0 ? (
      <>
        <span>{notificationsCount} overdue books need follow-up reminders.</span>
        <Button size="sm" onClick={() => setNotificationsCount(c => c - 1)}>Dismiss Alert</Button>
      </>
    ) : (
      <>
        <span>All caught up! No pending overdue notices.</span>
        <Button size="sm" onClick={() => setNotificationsCount(2)}>Reset Alerts</Button>
      </>
    )}
  </div>
)}
```
