# Backend Architecture and Folder Responsibilities

The Library Management System backend follows a layered, modular architecture built on Node.js and Express.js. Each major folder serves a dedicated single responsibility:

- **`config/`**: Manages environment configurations, port definitions, and database connection settings.
- **`routes/`**: Defines API endpoints and maps incoming HTTP request paths and methods to their respective controller handlers.
- **`controllers/`**: Handles incoming HTTP requests, processes request parameters and bodies, coordinates business logic, and returns formatted JSON responses.
- **`models/`**: Defines database schemas and data representations (e.g., Books, Members, Transactions) ensuring schema-level validation and data integrity.
- **`middleware/`**: Contains intermediate request functions such as JSON body parsing, CORS policies, authentication guards, and global error handling before requests reach controllers.
- **`services/`**: Encapsulates reusable business logic, complex data calculations, and external service integrations away from HTTP-specific controller code.
- **`utils/`**: Houses shared utility functions, formatters, and custom response helpers.
- **`uploads/` & `public/`**: Stores static assets and user-uploaded media files securely.
