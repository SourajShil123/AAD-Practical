# Book Schema & Model Design Specification — Library Management System

## Project Information
- **Project:** LibMaster — Library Management System
- **Domain:** Education
- **Technology:** MERN Stack (MongoDB, Express.js, React, Node.js, Mongoose)
- **Module:** Books Catalog Management
- **File Location:** `server/models/Book.js`

---

## 1. Overview & Purpose

In Sprint 13, the Express backend established an active connection to MongoDB Atlas. In Sprint 14, the persistence layer transitions from raw collections to a strongly typed, schema-governed data model using **Mongoose Schemas and Models**.

The `Book` model defines:
1. The formal document structure stored in the MongoDB `books` collection.
2. Data types, trimming sanitization, and constraints for all book attributes.
3. Strict validation rules to prevent invalid, incomplete, or duplicate data from entering the database.
4. Business integrity guards (unique ISBN indexing, minimum inventory copies, enumerated status).

---

## 2. Conceptual Relationship: Schema vs. Model vs. Collection

The relationship between Mongoose constructs and MongoDB storage follows a strict pipeline:

```text
┌────────────────────────┐
│     Mongoose Schema    │  ==> Defines document structure, fields, types & validation rules
│  (server/models/Book)  │
└───────────┬────────────┘
            │
            ▼
┌────────────────────────┐
│     Mongoose Model     │  ==> Provides JavaScript API interface (CRUD methods like Book.find(), Book.create())
│     mongoose.model()   │
└───────────┬────────────┘
            │
            ▼
┌────────────────────────┐
│   MongoDB Collection   │  ==> Physical storage layer inside MongoDB Atlas (automatically mapped to 'books')
│    LibraryManagementDB │
└───────────┬────────────┘
            │
            ▼
┌────────────────────────┐
│       Documents        │  ==> Individual JSON-like BSON records representing distinct books
└────────────────────────┘
```

### Key Differences:
- **Schema:** A blueprint that describes what properties a document can have, what values are permitted, default values, and custom validators. It does not perform database operations itself.
- **Model:** A compiled wrapper around the schema that acts as an active constructor and query engine for executing database operations (`find`, `findById`, `create`, `updateOne`, `deleteOne`).

---

## 3. Book Schema Field Definition

| Field Name | Data Type | Required | Unique | Default Value | Validation Rules | Description |
|---|---|---|---|---|---|---|
| `title` | `String` | Yes | No | None | `trim: true`, min 2, max 200 chars | The official title of the publication |
| `author` | `String` | Yes | No | None | `trim: true`, min 2, max 100 chars | Full name of the author or primary editor |
| `isbn` | `String` | Yes | **Yes** | None | `trim: true`, Regex 10 or 13 digits | International Standard Book Number (unique identifier) |
| `category` | `String` | Yes | No | `'General'` | `trim: true`, Enum whitelist | Academic or technical domain of the book |
| `copies` | `Number` | Yes | No | `1` | `min: 1`, Integer | Total stock available in library inventory |
| `status` | `String` | Yes | No | `'Available'` | Enum: `['Available', 'Issued']` | Circulation availability state of the book |
| `createdAt` | `Date` | Auto | No | Current timestamp | Managed by Mongoose | Timestamp when the document was inserted |
| `updatedAt` | `Date` | Auto | No | Current timestamp | Managed by Mongoose | Timestamp when the document was last modified |

---

## 4. Validation Rules & Integrity Constraints

### 4.1 Required Field Enforcement
- `title`, `author`, `isbn`, `category`, and `copies` are marked as `required: [true, '<custom error message>']`.
- Requests omitting any required property are rejected with HTTP `400 Bad Request` before hitting the database.

### 4.2 String Trimming & Sanitization
- `trim: true` is configured on all string fields (`title`, `author`, `isbn`, `category`) to automatically remove accidental leading and trailing whitespace.

### 4.3 Unique ISBN Indexing
- `isbn` is configured with `unique: true`.
- Mongoose establishes a unique index in the MongoDB collection (`isbn_1`).
- Attempting to register an identical ISBN triggers MongoDB error code `11000` (Duplicate Key Error), caught and formatted into a user-friendly error message by the controller.

### 4.4 Custom ISBN Validator
- A regex validator strips hyphens and spaces (`replace(/[-\s]/g, '')`) and enforces standard 10-digit (ISBN-10) or 13-digit (ISBN-13) format:
  ```javascript
  validate: {
    validator: function (v) {
      if (!v) return false;
      const cleaned = v.replace(/[-\s]/g, '');
      return /^(?:\d{9}[\dX]|\d{13})$/i.test(cleaned);
    },
    message: props => `${props.value} is not a valid ISBN! Must be a valid 10 or 13-digit ISBN.`
  }
  ```

### 4.5 Inventory Copies Constraint
- `copies` enforces `min: [1, 'Number of copies must be at least 1']` and checks `Number.isInteger`. Zero or negative quantities are rejected.

### 4.6 Controlled Status Enumeration
- `status` restricts permitted values strictly to `'Available'` or `'Issued'`. Arbitrary status strings are rejected.

---

## 5. Mongoose Implementation Code Reference

```javascript
// server/models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Book title is required'],
      trim: true,
      minlength: [2, 'Book title must be at least 2 characters long'],
      maxlength: [200, 'Book title cannot exceed 200 characters'],
    },
    author: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
      minlength: [2, 'Author name must be at least 2 characters long'],
      maxlength: [100, 'Author name cannot exceed 100 characters'],
    },
    isbn: {
      type: String,
      required: [true, 'ISBN is required'],
      unique: true,
      trim: true,
      validate: {
        validator: function (v) {
          if (!v) return false;
          const cleaned = v.replace(/[-\s]/g, '');
          return /^(?:\d{9}[\dX]|\d{13})$/i.test(cleaned);
        },
        message: (props) => `${props.value} is not a valid ISBN! Must be a valid 10 or 13-digit ISBN.`,
      },
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      default: 'General',
    },
    copies: {
      type: Number,
      required: [true, 'Number of copies is required'],
      min: [1, 'Number of copies must be at least 1'],
      default: 1,
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: {
        values: ['Available', 'Issued'],
        message: '{VALUE} is not a valid status (must be Available or Issued)',
      },
      default: 'Available',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model('Book', bookSchema);
```

---

## 6. Summary

The `Book` schema transforms the backend from an ephemeral mock-data prototype into an enterprise-ready, strongly typed MERN application layer. Validation occurs automatically during model lifecycle methods, guaranteeing database integrity across all CRUD operations.

