# Database Structure — Library Management System

## Database
**MongoDB**

## Collections

| Collection | Purpose | Main Fields |
|---|---|---|
| Users | User authentication and management | userId, name, email, password, role |
| Members | Library member records | memberId, name, contact, email |
| Books | Book catalogue and availability | bookId, title, author, categoryId, ISBN, status |
| Categories | Book categories | categoryId, categoryName |
| Borrowings | Book issue records | borrowingId, memberId, bookId, issueDate, dueDate, status |
| Returns | Returned book records | returnId, borrowingId, returnDate, condition |
| Fines | Overdue fine records | fineId, borrowingId, amount, status |
| Notifications | User notifications | notificationId, userId, message, status |

## Relationships

- One category can contain multiple books.
- A member can have multiple borrowing records.
- A book can appear in multiple borrowing records over time.
- A borrowing record can have a return record.
- A borrowing record can have a fine record.
- A user can have multiple notifications.

## Basic Entity Relationship View

```text
Categories 1 -------- * Books

Members    1 -------- * Borrowings * -------- 1 Books

Borrowings 1 -------- * Returns

Borrowings 1 -------- * Fines

Users      1 -------- * Notifications
```

## Notes

The database model is designed around the project's core modules: users, members, books, borrowing, returns, fines, categories, and notifications.
