# Sprint 17 — Building a Second CRUD Module

## Project Information
- **Project:** LibMaster — Library Management System
- **Domain:** Education
- **Technology Stack:** MongoDB, Express.js, React.js 19, Node.js (MERN)
- **Sprint:** 17
- **Sprint Number:** 17
- **Type:** Guided Practical
- **Difficulty Level:** Beginner to Intermediate

---

## 1. Aim
To extend the Library Management System into a scalable multi-module application by implementing a second complete CRUD module—the **Member Management Module**—reusing the established full-stack MERN architecture across the database schema, Express REST API, frontend service layer, and React UI.

---

## 2. Learning Objectives
By completing this sprint, the following technical objectives were accomplished:
1. Identify and design the second major entity (**Member**) from project domain requirements.
2. Formulate a strongly typed Mongoose Schema and Model (`server/models/Member.js`) with validations, enum constraints, unique indices, and timestamps.
3. Implement a dedicated Express controller (`server/controllers/memberController.js`) providing all five CRUD operations.
4. Establish clean RESTful routes (`server/routes/memberRoutes.js`) and mount them under `/api/members` in `server/app.js`.
5. Create a modular frontend API service (`client/src/services/memberService.js`) using Axios.
6. Connect the React member management page (`client/src/pages/Members/Members.jsx`) to perform live data fetching, creation, editing, and deletion against MongoDB Atlas.
7. Verify multi-module coexistence, ensuring operations on Members do not interfere with Books.
8. Maintain a consistent design system and folder convention without duplicating architectural boilerplate.

---

## 3. Reusable Multi-Module MERN Architecture

Sprint 17 demonstrates the power of architectural reusability. Both core modules share identical communication layers while maintaining independent database collections, controllers, routes, and views:

```
                          LibMaster Full-Stack Application
                                         │
        ┌────────────────────────────────┴────────────────────────────────┐
        │                                                                 │
  Module 1: Books                                                   Module 2: Members
  (Catalog & Inventory)                                             (Patrons & Cardholders)
        │                                                                 │
  React Page (`Books.jsx`)                                          React Page (`Members.jsx`)
        ↓                                                                 ↓
  React Service (`bookService.js`)                                  React Service (`memberService.js`)
        ↓  (HTTP: /api/books)                                             ↓  (HTTP: /api/members)
  Express Router (`bookRoutes.js`)                                  Express Router (`memberRoutes.js`)
        ↓                                                                 ↓
  Controller (`bookController.js`)                                  Controller (`memberController.js`)
        ↓                                                                 ↓
  Mongoose Model (`Book.js`)                                        Mongoose Model (`Member.js`)
        ↓                                                                 ↓
  MongoDB Atlas: `books` collection                                 MongoDB Atlas: `members` collection
```

---

## 4. Member Entity Schema Specification

The Member data structure was designed in `server/models/Member.js`:

| Field | Data Type | Required | Unique | Validation / Enum Rules | Description |
|---|---|---|---|---|---|
| `membershipId` | `String` | Yes | **Yes** | `trim: true`, uppercase, auto-assigned format | Unique cardholder identifier (e.g., `MEM-001`) |
| `name` | `String` | Yes | No | `trim: true`, min 2, max 100 characters | Full legal name of the library patron |
| `email` | `String` | Yes | **Yes** | `trim: true`, lowercase, regex email format | University email address |
| `department` | `String` | Yes | No | `trim: true` | Academic school or department |
| `role` | `String` | Yes | No | `enum: ['Student', 'Faculty', 'Staff', 'Researcher']` | Patron category |
| `phone` | `String` | No | No | `trim: true` | Contact phone number |
| `borrowedCount`| `Number` | No | No | `min: 0`, integer, default: `0` | Active circulating loans |
| `status` | `String` | Yes | No | `enum: ['Active', 'Suspended', 'Expired']`, default: `'Active'` | Account circulation eligibility |
| `createdAt` | `Date` | Auto | No | Managed by `{ timestamps: true }` | Member registration date |
| `updatedAt` | `Date` | Auto | No | Managed by `{ timestamps: true }` | Last profile update timestamp |

---

## 5. Member Module REST API Endpoints

| HTTP Verb | Endpoint | Handler | Mongoose Query | Status Codes | Purpose |
|---|---|---|---|---|---|
| `GET` | `/api/members` | `getAllMembers` | `Member.find().sort({ createdAt: -1 })` | `200`, `500` | Fetch all registered library members |
| `GET` | `/api/members/:id` | `getMemberById` | `Member.findById()` or `findOne({ membershipId })` | `200`, `404`, `500` | Fetch a single member by MongoDB ID or card ID |
| `POST` | `/api/members` | `createMember` | `Member.create(req.body)` | `201`, `400`, `500` | Register a new member with unique constraints |
| `PUT` | `/api/members/:id` | `updateMember` | `Member.findByIdAndUpdate(..., { returnDocument: 'after' })` | `200`, `400`, `404`, `500` | Update member department, role, status, or contact |
| `DELETE` | `/api/members/:id` | `deleteMember` | `Member.findByIdAndDelete(id)` | `200`, `404`, `500` | Remove member document from database |

---

## 6. Frontend Integration & Service Layer

All communication between the React presentation components and the Express backend is isolated inside `client/src/services/memberService.js`:

```javascript
import api from './api';

export const memberService = {
  getAllMembers: () => api.get('/members').then(res => res.data),
  getMemberById: (id) => api.get(`/members/${id}`).then(res => res.data),
  createMember: (data) => api.post('/members', data).then(res => res.data),
  updateMember: (id, data) => api.put(`/members/${id}`, data).then(res => res.data),
  deleteMember: (id) => api.delete(`/members/${id}`).then(res => res.data),
};
```

In `client/src/pages/Members/Members.jsx`:
- **Live Streamed Data:** Renders active members directly from MongoDB Atlas on initial load.
- **Controlled Forms:** Includes full client-side validation before dispatching `POST` (new member) or `PUT` (edit member).
- **Graceful Feedback:** Features an asynchronous loading indicator and a connection error alert with a "Retry" trigger.
- **Safe Deletion:** Displays an explicit browser confirmation dialog before triggering `DELETE /api/members/:id`.
- **Search & Filter:** Allows filtering by academic role (`Student`, `Faculty`, `Staff`, `Researcher`) and live substring search across names, emails, and IDs.

---

## 7. Verification and Testing Results

| Test Case | Module | Method & Endpoint | Payload / Condition | Expected HTTP | Actual Status | Result |
|---|---|---|---|---|---|---|
| TC-17-01 | Members | `POST /api/members` | Valid member payload | 201 Created | 201 Created | **PASS** |
| TC-17-02 | Members | `GET /api/members` | Request all members | 200 OK | 200 OK | **PASS** |
| TC-17-03 | Members | `GET /api/members/:id` | Valid member `_id` | 200 OK | 200 OK | **PASS** |
| TC-17-04 | Members | `PUT /api/members/:id` | Update department & role | 200 OK | 200 OK | **PASS** |
| TC-17-05 | Members | `DELETE /api/members/:id`| Valid member `_id` | 200 OK | 200 OK | **PASS** |
| TC-17-06 | Members | `POST /api/members` | Duplicate email address | 400 Bad Request | 400 Bad Request | **PASS** |
| TC-17-07 | Books | `GET /api/books` | Re-verify first module | 200 OK | 200 OK | **PASS** |
| TC-17-08 | Full App | React Navigation | Switch between `/books` & `/members` | Clean render | Active route rendered | **PASS** |

---

## 8. Common Errors & Troubleshooting

| Problem | Root Cause | Solution |
|---|---|---|
| **Second API returns 404** | Route not registered in `server/app.js` | Mount route explicitly: `app.use('/api/members', memberRoutes)`. |
| **Second collection not visible in MongoDB** | No documents written yet | Mongoose creates collections lazily upon first document insertion via `create()` or `insertMany()`. |
| **Second module affects the first module** | Shared state or overlapping route paths | Keep routes distinct (`/api/books` vs `/api/members`) and maintain dedicated controllers and service files. |
| **Duplicate key error code 11000** | Attempted to insert duplicate email or membershipId | Check MongoDB index constraints and provide informative `400 Bad Request` messages to the user. |
| **Component duplication** | Re-implementing buttons or cards from scratch | Import existing shared components from `client/src/components/ui/` (`Button`, `Card`, `Input`, `PageTitle`). |

---

## 9. Conclusion

In Sprint 17, the Library Management System successfully expanded into a full multi-module architecture by implementing the Member Management module. Reusing the battle-tested MERN patterns established in earlier sprints, the new module provides an independent database collection (`members`), robust Mongoose validations, full CRUD REST API endpoints, a clean Axios service layer, and a rich interactive React interface. Both Books and Members operate harmoniously within the same application, proving that LibMaster has achieved a clean, maintainable, and enterprise-grade software architecture.
