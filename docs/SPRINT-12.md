# Sprint 12 — Express Routing and Middleware

## Project Information
- Project: Library Management System
- Domain: Education
- Technology: MERN Stack
- Sprint: 12
- Type: Guided Practical
- Difficulty: Beginner

## Sprint Overview

In this sprint, the routing structure and custom middleware of the Express.js backend are developed for the Library Management System.

Sprint 11 established the server architecture. Sprint 12 utilizes that structure to implement project-specific REST API endpoints for the **Books** module, decouples routing definitions from business controller logic, implements route parameters for entity lookup, and introduces custom request logger middleware that inspects and logs incoming HTTP requests using `next()`.

## Learning Objectives

- Understand routing in Express.js.
- Create REST-style API endpoints (`GET`, `POST`, `PUT`, `DELETE`).
- Separate routes from controller logic.
- Understand the purpose and lifecycle of Express middleware.
- Create and use custom middleware with `next()`.
- Process HTTP request and response objects.
- Organize backend routes and controllers following MVC principles.
- Test backend endpoints using Postman or browser clients.

## Prerequisites

Sprint 1 through Sprint 11 should be completed before starting this sprint.

## Software and Tools

- Visual Studio Code
- Node.js
- npm
- Express.js
- Postman / Chrome Browser
- Git
- GitHub

## Concepts Covered

- Express Router (`express.Router()`)
- Route Parameters (`:id`)
- HTTP Methods (`GET`, `POST`, `PUT`, `DELETE`)
- REST API Conventions
- Controller Logic Separation
- Express Middleware Pipeline
- Request (`req`) and Response (`res`) Objects
- The `next()` Callback
- Route Organization & Modular Architecture

## Practical Tasks

1. Understand the Express request flow (`Client → Request → App → Middleware → Route → Controller → Response → Client`).
2. Create project-specific route file (`server/routes/bookRoutes.js`).
3. Create corresponding controller file (`server/controllers/bookController.js`).
4. Connect route handlers to controller methods.
5. Register routes in `server/app.js` under `/api/books`.
6. Implement multiple REST endpoints (`GET /api/books`, `POST /api/books`, `GET /api/books/:id`, `PUT /api/books/:id`, `DELETE /api/books/:id`).
7. Use route parameter `:id` in controllers to read requested book identifiers.
8. Create custom logger middleware (`server/middleware/requestLogger.js`) to log HTTP method, URL, and timestamp.
9. Apply `next()` to ensure uninterrupted request processing.
10. Test all endpoints and inspect status codes (`200 OK`, `201 Created`, `404 Not Found`).
11. Push the completed sprint to GitHub.

## Result

The Library Management System backend includes a clean, modular routing system for the Books module with full REST endpoint support, controller separation, and active request logging middleware, verified and ready for database integration.
