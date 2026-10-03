# System Design — Library Management System

## Architecture

```text
+----------------------+
|      User/Browser    |
+----------+-----------+
           |
           v
+----------------------+
|    React Frontend    |
|  Pages / Components  |
+----------+-----------+
           |
           v
+----------------------+
| Node.js + Express.js |
|     Backend/API      |
+----------+-----------+
           |
           v
+----------------------+
|       MongoDB        |
|      Collections     |
+----------------------+
```

## Application Modules

- Authentication & User Management
- Book Management
- Member Management
- Book Borrowing
- Book Return
- Fine Management
- Search & Filter
- Reports & Analytics
- Dashboard
- Notifications

## Navigation

```text
Login
  |
  +--> Dashboard
        |
        +--> Books
        +--> Members
        +--> Borrowing
        +--> Returns
        +--> Fines
        +--> Reports & Analytics
        +--> Notifications
        +--> User Management
```

## UI Pages

1. Login
2. Dashboard
3. Books
4. Members
5. Borrowing
6. Returns
7. Fines
8. Reports & Analytics
9. Notifications
10. User Management

## Design Goal

The design separates the frontend, backend, and database responsibilities and provides a clear structure for the development sprints that follow.
