# Sprint 3 — System Design & Database Modeling

## Project
**Library Management System**

**Domain:** Education  
**Technology Stack:** MERN (MongoDB, Express.js, React.js, Node.js)

## Aim
Design the system architecture, database structure, navigation flow, and initial UI/wireframe for the Library Management System.

## 1. System Architecture

The application follows a MERN-based web application architecture:

- **Frontend:** React.js
- **Backend:** Node.js with Express.js
- **Database:** MongoDB
- **Communication:** REST-style API between frontend and backend

### High-Level Flow

```text
User
  |
  v
React Frontend
  |
  v
Express.js / Node.js Backend
  |
  v
MongoDB Database
```

## 2. Main Modules

1. Authentication & User Management
2. Book Management
3. Member Management
4. Book Borrowing
5. Book Return
6. Fine Management
7. Search & Filter
8. Reports & Analytics
9. Dashboard
10. Notifications

## 3. Database Modeling

The database is planned using MongoDB collections.

### Collections

- **Users** — stores login and user-management information.
- **Members** — stores library member information.
- **Books** — stores book details and availability.
- **Categories** — stores book categories.
- **Borrowings** — stores book issue/borrowing records.
- **Returns** — stores returned-book records.
- **Fines** — stores fine information for overdue returns.
- **Notifications** — stores application notifications.

## 4. Entities and Relationships

### Users
- userId
- name
- email
- password
- role

### Members
- memberId
- name
- contact
- email
- membership details

### Books
- bookId
- title
- author
- categoryId
- ISBN
- availability/status

### Categories
- categoryId
- categoryName

### Borrowings
- borrowingId
- memberId
- bookId
- issueDate
- dueDate
- status

### Returns
- returnId
- borrowingId
- returnDate
- condition

### Fines
- fineId
- borrowingId
- amount
- status

### Notifications
- notificationId
- userId
- message
- status

### Main Relationships

```text
Users --------< Notifications

Categories ---< Books

Members ------< Borrowings >------ Books

Borrowings ---< Returns

Borrowings ---< Fines
```

## 5. Navigation Flow

```text
Login
  |
  v
Dashboard
  |
  +--> Books
  |      +--> Add Book
  |      +--> Edit Book
  |      +--> Search / Filter
  |
  +--> Members
  |      +--> Add Member
  |      +--> Edit Member
  |
  +--> Borrowing
  |      +--> Issue Book
  |
  +--> Returns
  |      +--> Return Book
  |
  +--> Fines
  |      +--> View / Manage Fine
  |
  +--> Reports & Analytics
  |
  +--> Notifications
  |
  +--> User Management
```

## 6. UI / Wireframe Plan

The initial interface is planned around:

- Login page
- Dashboard
- Book management page
- Member management page
- Borrowing page
- Returns page
- Fines page
- Reports & Analytics page
- Notifications
- User management

The dashboard acts as the main navigation point after login.

## 7. Design Considerations

- Keep navigation simple and consistent.
- Separate major modules into dedicated pages.
- Use forms for adding and editing records.
- Provide search and filtering for books and members.
- Display borrowing, return, and fine information clearly.
- Keep the design suitable for future React component reuse.

## 8. Sprint Result

The system architecture, database collections, entities and relationships, navigation flow, and initial UI structure were planned for the Library Management System.

This design provides the foundation for the project scaffolding and development work in the following sprints.
