# Sprint 11 — Setting Up the Backend with Node.js and Express.js

## Project Information
- Project: Library Management System
- Domain: Education
- Technology: MERN Stack
- Sprint: 11
- Type: Guided Practical
- Difficulty: Beginner

## Sprint Overview

In this sprint, the backend foundation for the Library Management System is established by configuring an Express.js application running on the Node.js runtime environment.

Rather than writing business APIs immediately, this sprint establishes an industry-standard, scalable backend architecture. The server project is structured with modular folders, essential middleware is configured for JSON parsing and CORS, `app.js` is cleanly decoupled from `server.js`, and a functional test route is created and verified.

## Learning Objectives

- Understand the role of Node.js and Express.js in the MERN Stack.
- Create and configure a backend project using Express.js.
- Organize backend folders following industry standards.
- Configure middleware for handling incoming HTTP requests.
- Start and test an Express server.
- Maintain backend code using Git and GitHub.

## Prerequisites

Sprint 1 through Sprint 10 should be completed before starting this sprint.

## Software and Tools

- Visual Studio Code
- Node.js
- npm
- Express.js
- Git
- GitHub
- Chrome Browser / Postman

## Concepts Covered

- Node.js Runtime
- Express.js Framework
- Backend Project Structure (MVC / Layered Architecture)
- npm Packages and `package.json`
- Express Middleware
- HTTP Server Lifecycle
- Request–Response Model
- Decoupling `app.js` and `server.js`

## Practical Tasks

1. Initialize the Node.js backend project with `package.json`.
2. Install and configure Express.js and supporting dependencies.
3. Create the standard backend folder structure (`config`, `controllers`, `middleware`, `models`, `routes`, `services`, `utils`, `uploads`, `public`).
4. Configure the Express application in `server/app.js` with JSON and CORS middleware.
5. Configure the server entry point in `server/server.js`.
6. Create and mount a test route (`/api/test`) with controller logic.
7. Verify backend server functionality and API responses.
8. Connect frontend awareness for future client-server integration.
9. Push the completed sprint to GitHub.

## Result

The Library Management System backend is successfully initialized with an industry-standard Express.js architecture, cleanly separated configuration and entry points, functional test endpoints, and full version control readiness.
