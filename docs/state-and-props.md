# State and Props Implementation Guide

## Overview

In Sprint 9 of the Library Management System, we transitioned the frontend from a static presentation layer to a reactive, dynamic architecture by systematically integrating **Props** and **State**.

---

## 1. React Props Architecture

Props (short for *properties*) represent read-only inputs passed from a parent component down into child components. Props enable component reusability and adhere to React's unidirectional data flow principle.

### Dynamic `Welcome` Component (`client/src/components/ui/Welcome.jsx`)

The `Welcome` component exemplifies complete prop-driven rendering. It contains **no hardcoded strings** or fixed user data:

```jsx
<Welcome
  userName={operatorName}
  role={operatorRole}
  projectName="Library Management System"
  organizationName="Apex Central University Library"
  dashboardTitle="Central Operational Hub & Analytics"
  message={`Currently tracking ${currentStats[2].value} active borrowings and ${counter} on-desk manual circulations.`}
  lastLogin="Today at 00:30 AM"
  isLoggedIn={isLoggedIn}
  badge={isLoggedIn ? 'Active Administrator' : 'Visitor Mode'}
  actions={<Button ...>Action</Button>}
/>
```

#### Prop Types and Fallbacks

| Prop Name | Type | Purpose | Default |
|---|---|---|---|
| `userName` | `string` | Display name of the active librarian or patron | `'Guest User'` |
| `projectName` | `string` | Title of the application | `'Library Management System'` |
| `organizationName` | `string` | Hosting educational institution | `'Central University Library'` |
| `dashboardTitle` | `string` | Section or dashboard title | `'System Overview'` |
| `role` | `string` | Access tier (e.g., Head Librarian, Student) | `'Operator'` |
| `isLoggedIn` | `boolean` | Flag driving authenticated banner vs public prompt | `true` |
| `badge` | `string` | Visual status pill | `undefined` |
| `actions` | `ReactNode` | Action buttons rendered on the right corner | `undefined` |

---

## 2. React Component State (`useState`)

State represents mutable component memory that persists across renders and triggers automatic UI updates upon change.

### State Implementations in `Dashboard.jsx`

```jsx
// 1. Operator identity state (drives Welcome component props)
const [operatorName, setOperatorName] = useState('Souraj Shil');
const [operatorRole, setOperatorRole] = useState('Head Librarian');

// 2. Metric timeframe filter state ('today' | 'week' | 'month' | 'all')
const [timeframe, setTimeframe] = useState('week');

// 3. Walk-in circulation counter state
const [counter, setCounter] = useState(14);

// 4. Session authentication simulation state
const [isLoggedIn, setIsLoggedIn] = useState(true);

// 5. Unread notification alerts counter state
const [notificationsCount, setNotificationsCount] = useState(2);
const [showNotifications, setShowNotifications] = useState(true);

// 6. Search query and status filter state for table
const [searchQuery, setSearchQuery] = useState('');
const [statusFilter, setStatusFilter] = useState('All');
```

---

## 3. Comparison: Props vs. State

| Feature | Props | State |
|---|---|---|
| **Origin** | Passed down from a parent component | Managed internally within the component |
| **Mutability** | **Read-only** (immutable by the receiver) | **Mutable** via the updater function |
| **Trigger** | Parent re-render or new props passed | Invoking `setState(newValue)` |
| **Purpose** | Configure child components and pass callbacks | Maintain component memory and interactive state |
| **Scope** | Cross-component (Parent &rarr; Child) | Local to the component (unless lifted) |

---

## 4. One-Way Data Flow Diagram

```text
[ Dashboard (Parent Component) ]
       │
       ├── state: operatorName ("Souraj Shil")
       ├── state: counter (14)
       ├── state: timeframe ("week")
       │
       ▼ (passes values down via Props)
 ┌────────────────────────────────────────────────────────┐
 │ <Welcome userName={operatorName} ... /> (Child)        │
 │ <PageTitle subtitle={`... ${counter} circulations`} /> │
 │ <Card badge={`Filter: ${timeframe.toUpperCase()}`} />  │
 └────────────────────────────────────────────────────────┘
```
