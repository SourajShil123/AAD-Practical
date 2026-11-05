# Sprint 15 — Implementing CRUD REST APIs with MongoDB

## Project Information
- **Project:** LibMaster — Library Management System
- **Domain:** Education
- **Technology Stack:** MongoDB, Express.js, React.js, Node.js (MERN)
- **Sprint:** 15
- **Sprint Number:** 15
- **Type:** Guided Practical
- **Difficulty Level:** Beginner to Intermediate

---

## 1. Aim
To implement a complete, database-driven CRUD REST API for the Books module of the Library Management System using Express.js and Mongoose, connecting existing routes and controllers to MongoDB Atlas, implementing proper HTTP status codes, and handling edge-case errors without crashing the server.

---

## 2. Learning Objectives
By completing this sprint, the following objectives were accomplished:
1. Understand the core principles of CRUD operations within a database-driven web application.
2. Structure RESTful API endpoints adhering to standard HTTP methods and URL conventions.
3. Perform persistent database queries using Mongoose ODM methods (`create`, `find`, `findById`, `findByIdAndUpdate`, `findByIdAndDelete`).
4. Implement input parsing from `req.body` and route parameters from `req.params`.
5. Return semantically accurate HTTP status codes (`200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`).
6. Implement defensive error handling for invalid ObjectIds, validation failures, and duplicate index conflicts.
7. Verify all CRUD endpoints independently using Postman and live MongoDB Atlas collections.

---

## 3. Architecture & Request Flow

In Sprint 15, the LibMaster backend replaces all temporary in-memory responses with an enterprise layered flow connecting the client to the database:

```
+-------------------------------------------------------------+
|                     Client / Postman                        |
+-------------------------------------------------------------+
                              |
                     HTTP Request (JSON)
                              v
+-------------------------------------------------------------+
|                Express Router (`bookRoutes.js`)             |
|              Routes incoming verbs and paths                |
+-------------------------------------------------------------+
                              |
                      Dispatches to
                              v
+-------------------------------------------------------------+
|            Book Controller (`bookController.js`)            |
|       Validates params, handles business logic & errors     |
+-------------------------------------------------------------+
                              |
                     Invokes ODM methods
                              v
+-------------------------------------------------------------+
|              Mongoose Model (`models/Book.js`)              |
|        Enforces schema types, rules, and timestamps         |
+-------------------------------------------------------------+
                              |
                      Executes BSON wire ops
                              v
+-------------------------------------------------------------+
|           MongoDB Atlas Database (`LibraryManagementDB`)    |
|                Stores documents in `books` collection       |
+-------------------------------------------------------------+
```

---

## 4. CRUD Operations & HTTP Method Mapping

| Operation | HTTP Verb | Endpoint | Controller Handler | Mongoose ODM Method | Purpose |
|---|---|---|---|---|---|
| **Create** | `POST` | `/api/books` | `createBook` | `Book.create()` | Inserts a new book into MongoDB |
| **Read (All)** | `GET` | `/api/books` | `getAllBooks` | `Book.find().sort()` | Retrieves all stored books |
| **Read (One)** | `GET` | `/api/books/:id` | `getBookById` | `Book.findById()` | Retrieves single book by ObjectId or ISBN |
| **Update** | `PUT` | `/api/books/:id` | `updateBook` | `Book.findByIdAndUpdate()` | Modifies fields of an existing book |
| **Delete** | `DELETE` | `/api/books/:id` | `deleteBook` | `Book.findByIdAndDelete()` | Removes a book document from the database |

---

## 5. HTTP Status Codes and Design Strategy

LibMaster strictly avoids returning generic `200 OK` responses for every scenario:

| Status Code | Label | When Used | Example Scenario |
|---|---|---|---|
| **200** | OK | Successful GET, PUT, or DELETE | Book retrieved, updated, or deleted successfully |
| **201** | Created | Successful POST creation | New book record inserted and returned |
| **400** | Bad Request | Validation failure or duplicate constraint | Missing required fields (`title`), or duplicate ISBN |
| **404** | Not Found | Resource not found | No document exists with the provided ID, or invalid ID |
| **500** | Internal Server Error | Unexpected backend or database failure | Database connection dropped unexpectedly |

---

## 6. Detailed API Endpoint Specifications

### 1. Create a Book
- **Method & Route:** `POST /api/books`
- **Request Body (JSON):**
  ```json
  {
    "title": "Clean Architecture: A Craftsman's Guide",
    "author": "Robert C. Martin",
    "isbn": "978-0134494164",
    "category": "Software Engineering",
    "copies": 5,
    "status": "Available"
  }
  ```
- **Response Status:** `201 Created`
- **Response Body:**
  ```json
  {
    "success": true,
    "message": "Book registered successfully",
    "data": {
      "_id": "673f4e21a8b9c1d2e3f4a5b6",
      "title": "Clean Architecture: A Craftsman's Guide",
      "author": "Robert C. Martin",
      "isbn": "978-0134494164",
      "category": "Software Engineering",
      "copies": 5,
      "status": "Available",
      "createdAt": "2026-11-05T18:30:00.000Z",
      "updatedAt": "2026-11-05T18:30:00.000Z"
    }
  }
  ```

### 2. Retrieve All Books
- **Method & Route:** `GET /api/books`
- **Response Status:** `200 OK`
- **Response Body:**
  ```json
  {
    "success": true,
    "count": 4,
    "data": [
      {
        "_id": "673f4e21a8b9c1d2e3f4a5b6",
        "title": "Clean Architecture: A Craftsman's Guide",
        "author": "Robert C. Martin",
        "isbn": "978-0134494164",
        "category": "Software Engineering",
        "copies": 5,
        "status": "Available"
      }
    ]
  }
  ```

### 3. Retrieve Single Book by ID
- **Method & Route:** `GET /api/books/:id`
- **Response Status:** `200 OK` (or `404 Not Found` if ID does not exist)
- **Response Body:**
  ```json
  {
    "success": true,
    "data": {
      "_id": "673f4e21a8b9c1d2e3f4a5b6",
      "title": "Clean Architecture: A Craftsman's Guide",
      "author": "Robert C. Martin",
      "isbn": "978-0134494164",
      "category": "Software Engineering",
      "copies": 5,
      "status": "Available"
    }
  }
  ```

### 4. Update an Existing Book
- **Method & Route:** `PUT /api/books/:id`
- **Request Body (JSON):**
  ```json
  {
    "copies": 7,
    "status": "Available"
  }
  ```
- **Response Status:** `200 OK`
- **Response Body:**
  ```json
  {
    "success": true,
    "message": "Book with ID 673f4e21a8b9c1d2e3f4a5b6 updated successfully",
    "data": {
      "_id": "673f4e21a8b9c1d2e3f4a5b6",
      "title": "Clean Architecture: A Craftsman's Guide",
      "copies": 7,
      "status": "Available"
    }
  }
  ```

### 5. Delete a Book
- **Method & Route:** `DELETE /api/books/:id`
- **Response Status:** `200 OK` (or `404 Not Found`)
- **Response Body:**
  ```json
  {
    "success": true,
    "message": "Book with ID 673f4e21a8b9c1d2e3f4a5b6 deleted successfully",
    "data": {
      "_id": "673f4e21a8b9c1d2e3f4a5b6",
      "title": "Clean Architecture: A Craftsman's Guide"
    }
  }
  ```

---

## 7. Error Handling and Defensive Programming

The `bookController.js` includes defensive checks for all common failure modes:

1. **Invalid MongoDB ObjectId format:**
   - Validated using `mongoose.Types.ObjectId.isValid(id)`.
   - Prevents CastError exceptions and returns a controlled `404 Not Found` instead of crashing the process.
2. **Schema Validation Errors (`error.name === 'ValidationError'`):**
   - Extracts all individual validation failure messages from `error.errors`.
   - Returns a structured `400 Bad Request` payload with user-friendly error messages.
3. **Duplicate ISBN Index Violations (`error.code === 11000`):**
   - Catches MongoDB duplicate key collisions on the unique `isbn` index.
   - Returns a clear `400 Bad Request` informing the client that the book is already registered.
4. **Mongoose 9.x API Modernization:**
   - Uses `{ returnDocument: 'after', runValidators: true }` in `findByIdAndUpdate` instead of deprecated `{ new: true }`.

---

## 8. Verification and Testing Results

| Test Case | Method & Endpoint | Input / Condition | Expected HTTP | Actual Status | Result |
|---|---|---|---|---|---|
| TC-15-01 | `POST /api/books` | Valid new book payload | 201 Created | 201 Created | **PASS** |
| TC-15-02 | `GET /api/books` | Request all documents | 200 OK | 200 OK (count > 0) | **PASS** |
| TC-15-03 | `GET /api/books/:id` | Valid document ID | 200 OK | 200 OK | **PASS** |
| TC-15-04 | `PUT /api/books/:id` | Valid updated fields | 200 OK | 200 OK | **PASS** |
| TC-15-05 | `DELETE /api/books/:id` | Valid document ID | 200 OK | 200 OK | **PASS** |
| TC-15-06 | `GET /api/books/:id` | Deleted document ID | 404 Not Found | 404 Not Found | **PASS** |
| TC-15-07 | `POST /api/books` | Duplicate ISBN | 400 Bad Request | 400 Bad Request | **PASS** |
| TC-15-08 | `GET /api/books/invalid-id` | Malformed string | 404 Not Found | 404 Not Found | **PASS** |

---

## 9. Reflection & Viva Solutions

### Reflection Questions
1. **What is CRUD and why is it important in database applications?**
   - CRUD stands for Create, Read, Update, and Delete. It constitutes the core lifecycle of data persistence, allowing users to register, query, modify, and retire information in any real-world production system.
2. **Why does the controller use the Mongoose model instead of communicating directly with MongoDB?**
   - The Mongoose model provides schema enforcement, automatic validation, middleware hooks, casting, and type safety before requests reach MongoDB, preventing corrupted data from entering the database.
3. **What is the difference between GET, POST, PUT, and DELETE?**
   - `GET` is safe and idempotent for retrieving data; `POST` creates new resources and is non-idempotent; `PUT` updates or replaces existing resources (idempotent); `DELETE` removes resources (idempotent).
4. **Why should an API return different HTTP status codes for different situations?**
   - Meaningful HTTP status codes provide standardized, programmatic clarity to frontend applications and API clients so they can distinguish between client-side input errors (`400`), missing items (`404`), server failures (`500`), and successful actions (`200`/`201`).
5. **Why is it useful to test an API independently using Postman before connecting it to React?**
   - Decoupled testing isolates backend and database issues from frontend UI/state bugs, ensuring that data contracts, validations, and status codes work reliably before introducing UI complexity.

### Viva Questions
1. **What is CRUD?**
   - The four fundamental operations of persistent storage: Create (POST), Read (GET), Update (PUT), and Delete (DELETE).
2. **What is a REST API?**
   - An architectural style for networked applications using standard HTTP methods, stateless requests, resource-based URLs, and standard payload formats (typically JSON).
3. **What is the purpose of the POST method?**
   - To submit data to be processed and stored as a new document or resource in the database.
4. **What is the difference between PUT and POST?**
   - `POST` creates a new resource where the server assigns the ID and URI. `PUT` modifies or replaces an existing resource at an identified URI.
5. **What is the purpose of the GET method?**
   - To retrieve data representation from the server without modifying server or database state.
6. **What does DELETE do?**
   - Removes the specified resource document from the database collection.
7. **What is a route parameter?**
   - A variable part of the URL path prefixed with a colon (e.g., `:id` in `/api/books/:id`), accessed through `req.params`.
8. **Why do we use Mongoose for CRUD operations?**
   - Mongoose provides structured schemas, validation, type casting, default values, query building, and promises, making database interactions safer and cleaner.
9. **What does HTTP status code 201 mean?**
   - Created: indicates that the request succeeded and resulted in the creation of a new resource.
10. **What does HTTP status code 404 mean?**
    - Not Found: indicates that the requested resource could not be found on the server.
11. **Why should an API handle invalid requests instead of allowing the server to crash?**
    - Unhandled exceptions terminate the Node.js event loop, taking down the entire service for all active users. Defensive error handling ensures continuous service uptime and sends helpful diagnostic feedback.
12. **What is the difference between retrieving all documents and retrieving one document by ID?**
    - `find()` returns an array containing all matching documents (or empty array `[]`), whereas `findById(id)` queries by primary key `_id` and returns either a single document object or `null`.

---

## 10. Sprint Outcome
The LibMaster backend is now fully operational with an enterprise-grade CRUD REST API connected directly to MongoDB Atlas. All five primary operations (`POST`, `GET`, `GET /:id`, `PUT`, `DELETE`) are verified, resilient to malformed inputs, and adhere to RESTful conventions.

