# Sprint 4 — Development Environment

## Frontend

The project uses a React client created with Vite.

```text
client/
├── public/
├── src/
├── package.json
└── ...
```

### Commands

```bash
npm create vite@latest client
cd client
npm install
npm install react-router-dom
npm install axios
npm run dev
```

## Backend

The backend is planned as a Node.js and Express.js server.

```text
server/
├── src/
├── package.json
└── server.js
```

The backend will provide APIs for authentication, books, members, borrowing, returns, fines, reports, and notifications.

## Database Planning

MongoDB collections:

- Users
- Members
- Books
- Categories
- Borrowings
- Returns
- Fines
- Notifications

## Sprint Verification

The environment is considered ready when:

- React client starts successfully.
- Required frontend dependencies are installed.
- Backend folder is initialized.
- MongoDB collection plan is documented.
- Application navigation flow is documented.
- Basic UI wireframes are prepared.
