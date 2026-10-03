# Sprint 9 — Working with React State, Props, and Event Handling

## Project Information
- **Project Name:** Library Management System
- **Domain:** Education
- **Technology Stack:** MERN Stack (MongoDB, Express.js, React.js, Node.js)
- **Sprint Number:** 9
- **Duration:** 120 Minutes
- **Type:** Guided Practical
- **Difficulty Level:** Beginner

---

## Sprint Overview

In this sprint, the Library Management System frontend transitions from displaying static visual content into an interactive, reactive web application by implementing **Props**, **State**, and **Event Handling**. 

Up to this point, the application primarily displayed static content with routing and reusable components. Students now implement:
- Dynamic parent-to-child data flow using **React Props**.
- Reactive component state management using the **`useState` Hook**.
- Interactive user event handling (button clicks, input keystrokes, filter toggles).
- **Conditional rendering** based on component and application state (authentication state, notification states, and search results/empty states).
- Systematic enhancement of reusable UI components (`Welcome`, `PageTitle`, `Card`, `Button`, `Input`).

---

## Learning Objectives

After completing this sprint, students are able to:
1. **Understand the purpose of Props and State in React:** Differentiate between immutable external configuration (`props`) and mutable internal data (`state`).
2. **Pass data between parent and child components using Props:** Build flexible components without hardcoded content.
3. **Manage component state using the `useState` Hook:** Store and update dynamic runtime information.
4. **Handle user events:** Wire `onClick` and `onChange` event listeners to update component state.
5. **Display dynamic content based on state changes:** Re-render UI dynamically when state variables update.
6. **Apply React's one-way data flow:** Pass state down to child components as props to synchronize the user interface.
7. **Implement conditional rendering:** Render alternative UI elements based on boolean conditions or collection lengths.

---

## Software & Tools Required

- Visual Studio Code
- React 19 & Vite
- Node.js & npm
- Chrome Browser
- Git & GitHub

---

## Concepts Covered

- **Props (Properties):** Unidirectional data passing from parent to child components.
- **State:** Component-level memory that persists values across renders.
- **`useState` Hook:** React hook to declare state variables and update functions.
- **Event Handling:** Synthetic events (`onClick`, `onChange`, `onSubmit`).
- **Parent-to-Child Communication:** Passing state down to child components via props.
- **Dynamic Rendering:** Re-rendering views automatically as data changes.
- **Conditional Rendering:** Displaying conditional elements using ternary operators, logical `&&`, and guard conditions.

---

## Guided Practical Exercises Completed

### Exercise 1: Create a Dynamic Welcome Component
- **Location:** `client/src/components/ui/Welcome.jsx`
- **Purpose:** Display dynamic information received through props from parent components without hardcoding.
- **Implementation:**
  - Accepts dynamic props: `userName`, `role`, `organizationName`, `projectName`, `dashboardTitle`, `message`, `lastLogin`, `isLoggedIn`, `badge`, and `actions`.
  - Zero hardcoded data inside the component.
  - Used dynamically across both `Dashboard.jsx` and `Home.jsx` with distinct data payloads.

### Exercise 2: Display Dynamic Page Information
- **Location:** `client/src/pages/`
- **Purpose:** Use props to render distinct titles, subtitles, badges, and actions across multiple pages reusing `PageTitle`.
- **Implementation:**
  - Enhanced `PageTitle.jsx` to receive dynamic `title`, `subtitle`, `badge`, `icon`, `breadcrumbs`, and `children` action buttons.
  - Deployed across `Dashboard`, `Books`, `Members`, `Borrowing`, `Returns`, `Fines`, and `Profile`.

### Exercise 3: Implement State using `useState`
- **Location:** `client/src/pages/Dashboard/Dashboard.jsx`
- **Purpose:** Understand how component state stores and updates runtime information.
- **Implementation:**
  - `counter`: Live Walk-in Circulation Counter tracking daily on-desk book issues.
  - `timeframe`: Filter state (`'today' | 'week' | 'month' | 'all'`) dynamically recalculating KPI metrics cards.
  - `notificationsCount`: Active alert notifications count.
  - `operatorName` & `operatorRole`: Live operator credentials dynamically updating the `Welcome` banner.
  - `isLoggedIn`: Session state for simulating authenticated administrator vs. public guest mode.

### Exercise 4: Handle Button Click Events
- **Location:** `client/src/components/ui/Button.jsx`, `Dashboard.jsx`, `Fines.jsx`, `Books.jsx`
- **Purpose:** Respond to user actions using event handling.
- **Implementation:**
  - Enhanced `Button.jsx` with `onClick`, active state styling, variants (`primary`, `secondary`, `outline`, `ghost`, `danger`, `success`), and disabled handling.
  - Counter increment (`+1 Issue`), decrement (`-1`), and reset (`Reset`) button handlers in `Dashboard.jsx`.
  - Timeframe filter buttons (`Today`, `This Week`, `This Month`, `All-Time`).
  - Alert notification dismissal button (`Dismiss Alert`).
  - Session toggle button (`Simulate Log In` / `Simulate Log Out`).
  - Fine settlement button (`Mark as Paid`) in `Fines.jsx` that updates payment status and recalculates outstanding balances.

### Exercise 5: Handle User Input Events
- **Location:** `client/src/pages/Dashboard/Dashboard.jsx`, `Books.jsx`, `Members.jsx`, `Borrowing.jsx`
- **Purpose:** Capture user input dynamically on every keystroke.
- **Implementation:**
  - Live operator name and role text inputs in `Dashboard.jsx` using `onChange={(e) => setOperatorName(e.target.value)}`. Every keystroke updates the parent state and flows into the `Welcome` component via props.
  - Real-time search filter input for the recent transactions table.
  - Search inputs on `Books.jsx` and `Members.jsx` filtering tabular data instantly.

### Exercise 6: Display Content Conditionally
- **Location:** Throughout `Dashboard.jsx`, `Books.jsx`, `Members.jsx`, `Fines.jsx`
- **Purpose:** Render dynamic UI branches based on application state.
- **Implementation:**
  - **Authenticated vs Guest View:** When logged out, an alert banner informs the user of read-only mode and action buttons are disabled; when logged in, full administrative permissions are active.
  - **Alerts Drawer:** Displays notification counter when `notificationsCount > 0`, or switches to "All caught up!" when empty.
  - **Data Available vs Empty State:** When table search queries produce zero matches, an empty state card with a "Clear Search & Filter" button is conditionally displayed.

### Exercise 7: Update Existing Components
- **Location:** `client/src/components/ui/`
- **Implementation:**
  - `Button.jsx`: Added `active` prop, additional semantic color variants, and micro-interactions.
  - `Card.jsx`: Added configurable `badge`, `footer`, and optional `collapsible` accordion behavior powered by internal `useState`.
  - `PageTitle.jsx`: Enhanced with dynamic status badges, icon renderers, and responsive flex layout.
  - Created central barrel export at `client/src/components/ui/index.js`.

### Exercise 8: Test the Application
- Tested all interactive elements in Vite development environment.
- Verified zero compilation, linting, or console errors (`oxlint` passed with 0 errors/0 warnings; Vite build passed in <500ms).
- Verified dynamic rendering, state updates, and event callbacks.

### Exercise 9: Commit and Push the Project
- Reviewed all files, verified code style and architecture.
- Committed all sprint changes with descriptive Git messages and pushed to the repository.

---

## Deliverables & Submission Data

### 1. Explanation of Props and State Usage (100–150 Words)
> In this sprint, **Props** and **State** were used to establish React's one-way data flow across the Library Management System. Reusable UI components such as `Welcome`, `PageTitle`, `Card`, and `Button` receive dynamic data exclusively via **props**, eliminating hardcoded values and allowing the same components to present distinct titles, badges, and metrics across the Dashboard, Books, and Members pages. Component **state** was implemented using the `useState` hook in `Dashboard.jsx` to track the walk-in circulation counter, active timeframe filter, notification alerts, and operator credentials. Button click events (`onClick`) update these state variables, and real-time text inputs (`onChange`) immediately reflect typed values in parent state. As state updates, React automatically re-renders dependent child components and drives **conditional rendering**, toggling authenticated banners, alert drawers, and empty search states seamlessly.

### 2. Required Submission Screenshots Guide
- **Screenshot 1 — Dynamic Data Passed Through Props:**
  - View: Dashboard page showing the `<Welcome>` component rendered with dynamic props (`userName`, `role`, `organizationName`, `projectName`) passed from the parent state.
- **Screenshot 2 — Component Updated Using useState:**
  - View: The Interactive State Controls card showing the walk-in circulation counter incremented, and the KPI stats grid updated upon switching timeframe tabs.
- **Screenshot 3 — Event Handling (Button Click):**
  - View: Clicking `+1 Issue` or `Mark as Paid` on the Fines page, demonstrating immediate state change and UI badge transition from "Pending" to "Paid".
- **Screenshot 4 — Conditional Rendering:**
  - View: The Dashboard in "Guest Mode" showing the read-only alert banner, or the Books table displaying the "No Matching Books Found" alert when a non-matching search term is entered.

---

## Reflection Questions & Answers

### 1. Why are Props considered read-only in React?
Props represent incoming data passed from a parent component to a child component. React enforces props as read-only (immutable) to guarantee pure component behavior, deterministic rendering, and unidirectional data flow. If child components could mutate their own props, data dependencies would become unpredictable, causing difficult-to-trace state synchronization bugs.

### 2. When should State be used instead of Props?
State should be used when data needs to change over time within a component as a result of user interaction, network responses, timers, or form inputs. Props should be used when data is owned and supplied by an ancestor component. If a component needs to retain and update its own internal values (e.g. form inputs, toggles, counters), `useState` is required.

### 3. How does `useState` help build interactive applications?
`useState` allows functional React components to persist stateful values between render cycles. Calling the updater function returned by `useState` schedules a re-render of the component with the new state, causing the virtual DOM to update and synchronize the browser interface automatically without manual DOM manipulation.

### 4. Why is one-way data flow important in React?
Unidirectional (one-way) data flow ensures that data travels down the component hierarchy from parents to children via props. This architecture makes data flow transparent and predictable: state is managed in a single source of truth, and changes trigger downward updates, simplifying debugging and testing.

### 5. How does component reusability improve application quality?
Reusable components eliminate duplicated code (DRY principle), establish visual and behavioral consistency across pages, reduce bug surfaces, and accelerate development. A single well-tested component (e.g., `Button`, `Card`, `PageTitle`) can serve multiple application workflows while accepting configurable props.

---

## Viva Questions & Answers

1. **What are Props in React?**
   Props (short for properties) are read-only inputs passed from a parent component to a child component to customize its rendering and behavior.
2. **What is the purpose of State?**
   State is a built-in object/hook used by a component to store and track mutable data that can change over the lifecycle of the component and trigger UI updates upon modification.
3. **What is the `useState` Hook?**
   `useState` is a React Hook that declares a state variable in a functional component. It returns a tuple: `[currentState, updaterFunction]`.
4. **What is the difference between Props and State?**
   Props are immutable, external configurations passed into a component from its parent; State is mutable, internal data managed directly within the component itself.
5. **What is event handling in React?**
   Event handling is the mechanism by which React captures user actions (e.g., clicks, typing, form submissions) using camelCase synthetic event listeners (e.g., `onClick`, `onChange`) that execute callback functions.
6. **What is conditional rendering?**
   Conditional rendering is the technique of rendering different JSX elements or components based on specific conditions (such as boolean flags, state values, or array lengths).
7. **Why should React components be reusable?**
   Reusable components enhance modularity, reduce code duplication, ensure visual consistency, and make maintenance and unit testing straightforward.
8. **How does React update the UI when State changes?**
   When a state updater function is invoked, React schedules a re-render of that component and its children. It diffs the newly created virtual DOM with the previous snapshot and updates only the altered DOM nodes.
9. **Why should State never be modified directly?**
   Modifying state directly (e.g., `state.count = 5`) does not notify React of the change, so no re-render will be scheduled, leaving the UI out of sync with the underlying data.
10. **How do Props help reduce code duplication?**
    Props allow a single generic component layout (like a Card, Table, or Title banner) to be instantiated repeatedly across the application with different contents, parameters, and callback actions.
