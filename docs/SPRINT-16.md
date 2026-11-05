# Sprint 16 — Connecting React Frontend with REST APIs

## Project Information
- **Project:** LibMaster — Library Management System
- **Domain:** Education
- **Technology Stack:** MongoDB, Express.js, React.js 19, Node.js (MERN)
- **Sprint:** 16
- **Sprint Number:** 16
- **Type:** Guided Practical
- **Difficulty Level:** Beginner to Intermediate

---

## 1. Aim
To connect the React frontend application (client) with the Express REST API and MongoDB Atlas database (server) for the Books module, transitioning from static mock data to dynamic full-stack CRUD operations executed through a dedicated frontend API service layer.

---

## 2. Learning Objectives
By completing this sprint, the following technical objectives were accomplished:
1. Connect a modern React client with an Express REST API backend over HTTP.
2. Structure a dedicated frontend service layer (`client/src/services/bookService.js`) to decouple network logic from UI components.
3. Make asynchronous `GET` requests from React using Axios and display real database records in the user interface.
4. Connect the controlled React book registration form to the `POST /api/books` API endpoint.
5. Connect record updating to the `PUT /api/books/:id` endpoint.
6. Connect document deletion to the `DELETE /api/books/:id` endpoint with user confirmation dialogs.
7. Implement user-friendly loading states and defensive error-handling banners to ensure graceful degradation when network issues occur.
8. Configure Cross-Origin Resource Sharing (CORS) on Express to allow requests from the React development server (`localhost:5173`).
9. Verify end-to-end data persistence between React actions and MongoDB Atlas.

---

## 3. End-to-End MERN Data Flow

In Sprint 16, the LibMaster system connects the presentation layer to the database through the following complete lifecycle:

```
                      User Action (Click / Form Submit)
                                      │
                                      ▼
                      React UI View (`client/src/pages/Books/Books.jsx`)
                                      │
                                      ▼
                      Frontend Service Layer (`client/src/services/bookService.js`)
                                      │
                                      ▼  HTTP Request (Axios: localhost:5000/api/books)
                      Express Middleware (CORS & Request Logger in `server/app.js`)
                                      │
                                      ▼
                      Express Router (`server/routes/bookRoutes.js`)
                                      │
                                      ▼
                      Book Controller (`server/controllers/bookController.js`)
                                      │
                                      ▼  Mongoose Model Query (`find`, `create`, `update`, `delete`)
                      Mongoose Model (`server/models/Book.js`)
                                      │
                                      ▼  BSON Query
                      MongoDB Atlas Cloud Database (`LibraryManagementDB` → `books` collection)
                                      │
                                      ▼  JSON Response ({ success: true, data: ... })
                      React Component State Update (`setBooksList`, `setSuccessMessage`)
                                      │
                                      ▼
                      Updated UI Rendered on Screen
```

---

## 4. Frontend Service Layer (`bookService.js`)

Instead of writing raw `fetch` or `axios` calls directly inside React components, all API communication is organized within `client/src/services/bookService.js` using the configured base Axios instance (`client/src/services/api.js`):

| Service Method | HTTP Verb | Backend Endpoint | Functionality |
|---|---|---|---|
| `bookService.getAllBooks()` | `GET` | `/api/books` | Fetches all book documents from MongoDB |
| `bookService.getBookById(id)` | `GET` | `/api/books/:id` | Fetches a single book by ID or ISBN |
| `bookService.createBook(data)` | `POST` | `/api/books` | Creates a new book document in MongoDB |
| `bookService.updateBook(id, data)` | `PUT` | `/api/books/:id` | Updates fields for an existing book |
| `bookService.deleteBook(id)` | `DELETE` | `/api/books/:id` | Removes a book document from the database |

---

## 5. UI Integration & State Management in `Books.jsx`

### 1. Read / Display Operation (`GET`)
- On initial mount, `useEffect` triggers asynchronous retrieval via `bookService.getAllBooks()`.
- Data received from the backend is stored in `booksList` state and dynamically rendered in the catalog table.
- A **Refresh** button allows users to re-fetch live database records on demand.

### 2. Loading State Indicator
- When `loading` is `true`, a spinner and informative status banner ("Loading books from MongoDB Atlas...") are displayed.
- Prevents UI layout shifts and informs the user that a network request is in flight.

### 3. Error Handling Banner
- If the backend server is stopped, offline, or returns an error, an alert banner is displayed with clear feedback and a "Retry" button.
- The interface does not crash or remain blank on network failure.

### 4. Create Operation (`POST`)
- Clicking "Register New Book" opens the controlled form.
- Form inputs are validated against schema rules (title, author, valid ISBN regex, copies >= 1).
- On submit, `bookService.createBook(payload)` sends a `POST` request to Express.
- Upon receiving `201 Created`, the local list is refreshed, the form resets, and a success banner confirms persistence.

### 5. Update Operation (`PUT`)
- Each book row includes an **Edit** button (Pencil icon).
- Clicking "Edit" pre-populates the form with existing values and switches the form to "Edit Book" mode.
- Submitting the form calls `bookService.updateBook(id, payload)`.
- Upon receiving `200 OK`, the list re-syncs with MongoDB, and a success message confirms the update.

### 6. Delete Operation (`DELETE`)
- Each book row includes a **Delete** button (Trash icon).
- To prevent accidental deletion, a confirmation prompt is shown:  
  `window.confirm("Are you sure you want to delete <Title> by <Author>?")`.
- On confirmation, `bookService.deleteBook(id)` is executed.
- On success, the book is removed from MongoDB and the local state updates immediately.

---

## 6. CORS Configuration (`server/app.js`)

Because the React development client runs on `http://localhost:5173` and the Express backend runs on `http://localhost:5000`, browser security policies require Cross-Origin Resource Sharing (CORS) headers.

The Express backend enables CORS safely via the `cors` middleware:
```javascript
const cors = require('cors');

// Allow cross-origin requests from React frontend
app.use(cors());
```
This enables all standard verbs (`GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`) and JSON headers without requiring insecure browser workarounds.

---

## 7. Common Errors & Troubleshooting

| Problem | Root Cause | Solution |
|---|---|---|
| **React cannot reach backend** | Express server is stopped or port mismatch | Start the backend (`npm run dev` in `server/`) and verify `http://localhost:5000/api/books`. |
| **CORS policy error in console** | Missing CORS headers on server | Ensure `app.use(cors())` is declared before route registrations in `server/app.js`. |
| **POST fails with 400 Bad Request** | Schema validation failed or duplicate ISBN | Verify input format in React and inspect backend response message in error toast. |
| **Delete button does not update UI** | State not refreshed after deletion | Re-fetch via `loadBooks()` or filter local state array after successful `DELETE`. |
| **Update overwrites wrong record** | Document `_id` was not passed correctly | Pass `book._id || book.id` as the URL parameter to `PUT /api/books/:id`. |
| **Loading indicator hangs** | Missing `finally` block in async function | Always invoke `setLoading(false)` inside a `finally` block in API handlers. |

---

## 8. Conclusion

In Sprint 16, the Library Management System achieved full frontend-backend integration. The React application now completely consumes the Express and MongoDB REST API via a clean, reusable service architecture (`bookService.js`). All four CRUD actions—reading catalog holdings, registering new titles, modifying existing entries, and deleting retired records—are operational directly from the browser with proper loading states, confirmation dialogs, and error recovery. This marks a critical milestone: LibMaster is now a fully functional, end-to-end MERN application.

