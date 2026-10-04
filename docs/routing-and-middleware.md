# Express Routing and Middleware Architecture

## Request-Response Lifecycle
In the Library Management System Express backend, every incoming HTTP request passes through a defined lifecycle pipeline:

```text
Client Request
      │
      ▼
Express Application (`app.js`)
      │
      ▼
Application Middleware (`requestLogger`, `cors`, `express.json`)
      │  (calls next())
      ▼
Module Router (`routes/bookRoutes.js`)
      │  (matches endpoint & HTTP method)
      ▼
Controller Function (`controllers/bookController.js`)
      │  (processes params, query, body)
      ▼
HTTP Response (`res.status().json()`)
      │
      ▼
Client Browser / Postman
```

## Configured Endpoints (`/api/books`)

| Method | Endpoint | Description | Status Code | Route Parameter / Body |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/books` | Retrieve all catalog books | `200 OK` | None |
| `GET` | `/api/books/:id` | Retrieve single book by ID | `200 OK` / `404 Not Found` | `req.params.id` |
| `POST` | `/api/books` | Register a new book | `201 Created` | `req.body` (`title`, `author`, `isbn`, `copies`) |
| `PUT` | `/api/books/:id` | Update book details | `200 OK` / `404 Not Found` | `req.params.id`, `req.body` |
| `DELETE` | `/api/books/:id` | Delete book from catalog | `200 OK` / `404 Not Found` | `req.params.id` |

## Middleware Implementation
The custom `requestLogger` middleware inspects every incoming HTTP request:
- Captures: `req.method`, `req.originalUrl`, `timestamp`.
- Prints formatted trace to standard output.
- Calls `next()` to pass control forward without halting the execution pipeline.
