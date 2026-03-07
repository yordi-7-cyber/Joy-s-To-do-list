# Joy's To-Do List API

A production-ready RESTful API for task management with authentication, built with Node.js, Express, and PostgreSQL.

## Features

- User authentication with JWT
- Task CRUD operations with filtering
- Category management
- Dashboard with statistics
- Property-based testing
- Rate limiting and security features

## Quick Start

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

4. Start the server:
```bash
npm run dev
```

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
src/
├── config/          # Database configuration
├── controllers/     # Request handlers
├── middleware/      # Auth, validation, error handling
├── repositories/    # Database operations
├── routes/          # API routes
└── services/        # Business logic
```

## License

MIT
