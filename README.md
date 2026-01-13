# Task Management System

A full-stack MERN application for managing tasks and projects.

## Features
- User authentication (register/login)
- Create, read, update, delete projects
- Create, read, update, delete tasks within projects
- Task status and priority management
- Dashboard with project list and task statistics
- User profile view

## Tech Stack
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt
- Frontend: React (Vite), Tailwind CSS, Axios, React Router

## Setup
1. Clone the repo.
2. Backend: `cd backend && npm install && npm start` (set .env with MONGO_URI and JWT_SECRET).
3. Frontend: `cd frontend && npm install && npm run dev`.
4. Open http://localhost:5173 for frontend, backend on http://localhost:5000.

## API Endpoints
- POST /api/auth/register - Register user
- POST /api/auth/login - Login user
- GET /api/auth/profile - Get user profile
- GET /api/projects - Get user's projects
- POST /api/projects - Create project
- PUT /api/projects/:id - Update project
- DELETE /api/projects/:id - Delete project
- GET /api/tasks/:projectId - Get tasks for project
- POST /api/tasks - Create task
- PUT /api/tasks/:id - Update task
- DELETE /api/tasks/:id - Delete task

## Usage
- Register or login.
- View dashboard with projects and stats.
- Manage projects and tasks.
- Logout from profile.
