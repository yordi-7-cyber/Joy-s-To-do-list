# Joy's To-Do List - Full Stack Application

A production-ready full-stack task management application with authentication, built with React, Node.js, Express, and PostgreSQL.

## Features

- 🔐 User authentication with JWT
- ✅ Task CRUD operations with filtering
- 📁 Category management
- 📊 Dashboard with real-time statistics
- 🔍 Advanced search and filtering
- 🎨 Modern, responsive UI
- 🧪 Property-based testing
- 🔒 Rate limiting and security features

## Tech Stack

**Frontend:**
- React 18
- React Router
- Axios
- CSS3

**Backend:**
- Node.js & Express
- PostgreSQL
- JWT Authentication
- Bcrypt

## Quick Start

### Backend Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. Create database and run migrations:
```bash
createdb joys_todo
npm run db:migrate
```

4. Start the backend server:
```bash
npm run dev
```

Backend runs on http://localhost:3000

### Frontend Setup

1. Navigate to client folder:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend:
```bash
npm start
```

Frontend runs on http://localhost:3001

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Tasks (requires authentication)
- `GET /api/tasks` - Get all tasks (supports filtering)
- `POST /api/tasks` - Create task
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Categories (requires authentication)
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Dashboard (requires authentication)
- `GET /api/dashboard` - Get dashboard statistics

## Testing

Run tests:
```bash
npm test
```

## Project Structure

```
├── client/                    # React frontend
│   ├── public/
│   └── src/
│       ├── api/              # API configuration
│       ├── components/       # React components
│       ├── App.js
│       └── index.js
├── src/                      # Backend
│   ├── config/              # Database configuration
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Auth, validation, error handling
│   ├── repositories/        # Database operations
│   ├── routes/              # API routes
│   └── services/            # Business logic
├── tests/                   # Backend tests
└── 4-day-schedule.md        # Implementation schedule
```

## Screenshots

### Login & Register
Beautiful authentication pages with form validation

### Dashboard
Real-time statistics showing:
- Total tasks
- Completed tasks
- Pending tasks
- Overdue tasks
- Completion percentage

### Task Management
- Create, edit, and delete tasks
- Filter by status, priority
- Search functionality
- Category assignment
- Due date tracking

### Category Management
- Create custom categories
- Color-coded organization
- Task count per category

## License

MIT
