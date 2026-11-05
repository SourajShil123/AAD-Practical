# Sprint 14 — Mongoose Schemas and Models

## Project Information
- **Project:** LibMaster — Library Management System
- **Domain:** Education
- **Technology Stack:** MongoDB, Express.js, React.js, Node.js (MERN)
- **Sprint:** 14
- **Sprint Number:** 14
- **Type:** Guided Practical
- **Difficulty Level:** Beginner to Intermediate

---

## 1. Aim
To design, implement, and verify a strongly typed Mongoose Schema and Model for the primary **Book** entity, establishing formal validation rules and connecting Express.js business controllers directly to the MongoDB Atlas database.

---

## 2. Learning Objectives
1. Understand the architectural distinction and purpose of a Mongoose Schema vs. a Mongoose Model.
2. Define explicit field structures, data types, and default values for application entities.
3. Implement basic and custom validation rules (required fields, string trimming, min/max length, regex validators, numeric ranges, and enums).
4. Enforce business rules such as unique indexing (preventing duplicate ISBN registrations).
5. Organize Mongoose models correctly inside the modular `server/models/` folder.
6. Refactor Express controllers (`server/controllers/bookController.js`) to perform real asynchronous database queries using the compiled Mongoose Model.
7. Test and verify API endpoints and database integrity using Postman and MongoDB Compass.

---

## 3. Conceptual Relationship: Schema vs. Model vs. Collection

| Layer | Component | Role | File / Target |
|---|---|---|---|
| **Structure** | **Schema** | Blueprint specifying fields, data types, validation constraints, and options. | `server/models/Book.js` (`bookSchema`) |
| **Interface** | **Model** | Active JavaScript constructor providing CRUD query methods (`find`, `create`, etc.). | `const Book = mongoose.model('Book', bookSchema)` |
| **Storage** | **Collection** | Physical container inside MongoDB Atlas storing documents. | MongoDB `books` collection |
| **Record** | **Document** | Individual BSON document record storing a single book's data. | E.g., `{ _id: ..., title: 'Clean Code', ... }` |

---

## 4. Book Schema Specification Table

| Field | Data Type | Required | Unique | Validation Rules & Defaults | Description |
|---|---|---|---|---|---|
| `title` | `String` | Yes | No | `trim: true`, min 2, max 200 | Title of the publication |
| `author` | `String` | Yes | No | `trim: true`, min 2, max 100 | Full name of the author |
| `isbn` | `String` | **Yes** | **Yes** | `trim: true`, 10 or 13 digit regex | Unique International Standard Book Number |
| `category` | `String` | Yes | No | `default: 'General'`, Enum whitelist | Educational/academic domain |
| `copies` | `Number` | Yes | No | `min: 1`, `default: 1`, Integer | Available inventory count |
| `status` | `String` | Yes | No | `enum: ['Available', 'Issued']`, default: `'Available'` | Circulation state |
| `createdAt` | `Date` | Auto | No | Managed by `{ timestamps: true }` | Timestamp of creation |
| `updatedAt` | `Date` | Auto | No | Managed by `{ timestamps: true }` | Timestamp of last update |

---

## 5. Implementation Procedure

### Step 1: Create the Mongoose Model (`server/models/Book.js`)
- Initialized `bookSchema` with types, constraints, and custom ISBN format validator.
- Configured `{ timestamps: true }` and virtual `id` mapping.
- Compiled and exported the `Book` model: `module.exports = mongoose.model('Book', bookSchema)`.

### Step 2: Database Connection Review (`server/config/database.js`)
- Ensured Mongoose cleanly connects to the Atlas cluster URI defined in `.env`.
- Handled success and error events cleanly without leaking credentials.
- Updated `server/.env.example` with safe placeholder variable names.

### Step 3: Controller Refactoring (`server/controllers/bookController.js`)
- Replaced in-memory mock array storage with asynchronous Mongoose queries:
  - `getAllBooks`: `await Book.find().sort({ createdAt: -1 })`
  - `getBookById`: `await Book.findById(id)` (with fallback for ISBN search)
  - `createBook`: `await Book.create({ ... })`
  - `updateBook`: `await Book.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })`
  - `deleteBook`: `await Book.findByIdAndDelete(id)`
- Added error handling for Mongoose validation errors (`error.name === 'ValidationError'`) and duplicate keys (`error.code === 11000`).

---

## 6. Verification and Testing Results

### 6.1 Database Connection Verification
- Server successfully boots and binds to port `5000`.
- MongoDB Atlas connection establishes cleanly without warnings.
- Output log:
  ```text
  MongoDB connected successfully
  Server running on port 5000
  ```

### 6.2 Schema Validation Tests
| Test Case | Payload / Condition | Expected Behavior | Actual Result | Status |
|---|---|---|---|---|
| **Create Valid Book** | Valid title, author, unique ISBN, copies = 5 | Document created in MongoDB with generated `_id` | `201 Created` with full book JSON | Passed |
| **Duplicate ISBN** | Identical ISBN already in database | Rejection with HTTP 400 Duplicate Entry | `400 Bad Request` (`code: 11000`) | Passed |
| **Invalid Copies** | `copies: 0` | Validation error: minimum 1 copy required | `400 Bad Request` (`min: 1`) | Passed |
| **Missing Title** | Title omitted from POST body | Validation error: Book title is required | `400 Bad Request` | Passed |
| **Invalid Status** | `status: "Archived"` | Rejection: not in `['Available', 'Issued']` | `400 Bad Request` | Passed |
| **Retrieve All Books** | `GET /api/books` | Returns all records from MongoDB Atlas | `200 OK`, JSON array with active count | Passed |
| **Retrieve By ID** | `GET /api/books/:id` | Returns single book matching MongoDB `_id` | `200 OK`, matching document | Passed |

---

## 7. Required Practical Submission Screenshots

### Screenshot 1 — Book Schema and Model
- **File:** `server/models/Book.js` open in VS Code editor.
- **Content:** Shows `mongoose.Schema`, field definitions (`title`, `author`, `isbn`, `category`, `copies`, `status`), validation rules, and model export.

### Screenshot 2 — MongoDB Database in MongoDB Compass
- **Target:** MongoDB Compass connected to Atlas Cluster0.
- **Content:** `LibraryManagementDB` database visible with the `books` collection selected and inserted book documents displayed in list view.

### Screenshot 3 — Database Connection & Server
- **File:** `server/config/database.js` open in VS Code.
- **Terminal:** PowerShell terminal showing `node server.js` output:
  ```text
  Server running on port 5000
  MongoDB connected successfully
  ```

---

## 8. Conclusion
In Sprint 14, the Library Management System successfully implemented a robust Mongoose Schema and Model layer for the Book entity. With comprehensive schema validations, unique indexing, and controller integration, all business operations now persist reliably in MongoDB Atlas with complete data integrity.

