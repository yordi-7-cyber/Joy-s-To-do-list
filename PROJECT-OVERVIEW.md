# Joy's To-Do List - 4-Day Implementation Project

A comprehensive task management system built with Node.js, Express, and PostgreSQL. This project includes a detailed 4-day implementation schedule with authentication, task management, categories, and dashboard features.

## Project Overview

This repository contains a complete implementation plan for building a production-ready to-do list application from scratch in just 4 days. The schedule breaks down every phase of development into manageable tasks with clear deliverables.

## Features

### Core Functionality
- **User Authentication**: Secure registration and login with JWT tokens and bcrypt password hashing
- **Task Management**: Full CRUD operations for tasks with status tracking
- **Category System**: Organize tasks into custom categories
- **Dashboard**: Real-time statistics and task overview
- **Advanced Filtering**: Search and filter tasks by status, priority, date range, and keywords

### Technical Features
- RESTful API design with consistent response formats
- Property-based testing for robust validation
- Database optimization with indexes and connection pooling
- Security features including rate limiting and CORS
- Comprehensive input validation and sanitization

## Technology Stack

- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (jsonwebtoken) + bcrypt
- **Testing**: Jest + Supertest + fast-check (property-based testing)
- **Validation**: express-validator
- **Development**: nodemon, dotenv

## Project Structure

```
├── src/
│   ├── models/          # Data models and interfaces
│   ├── repositories/    # Database access layer
│   ├── services/        # Business logic
│   ├── controllers/     # API endpoints
│   ├── middleware/      # Authentication, validation, error handling
│   └── config/          # Configuration files
├── tests/               # Unit and integration tests
├── config/              # Database and environment configuration
└── 4-day-schedule.md    # Detailed implementation schedule
```

## Implementation Schedule

The project is designed to be completed in 4 days:

- **Day 1**: Foundation & Authentication (6-8 hours)
- **Day 2**: Task Management & Testing (6-8 hours)
- **Day 3**: Categories, Dashboard & Advanced Features (6-8 hours)
- **Day 4**: Security, Testing & Deployment (6-8 hours)

See [4-day-schedule.md](4-day-schedule.md) for the complete breakdown with checkboxes and detailed tasks.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/Joy-s-To-do-list.git
cd Joy-s-To-do-list
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your database credentials and JWT secret
```

4. Set up the database
```bash
npm run db:migrate
```

5. Start the development server
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token

### Tasks
- `GET /api/tasks` - Get all tasks (with filtering)
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a new category
- `PUT /api/categories/:id` - Update a category
- `DELETE /api/categories/:id` - Delete a category

### Dashboard
- `GET /api/dashboard` - Get dashboard statistics

## Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## Success Metrics

- ✅ Day 1: Can register users and authenticate
- ✅ Day 2: Can create, read, update, delete tasks
- ✅ Day 3: Can manage categories and view dashboard
- ✅ Day 4: Production-ready with security and tests

## Contributing

This is a personal project schedule, but feel free to fork and adapt it for your own use!

## License

This project is licensed under the MIT License - see the [LICENSE](Joy-s-To-do-list/LICENSE) file for details.

## Acknowledgments

- Built as a 4-day sprint challenge
- Designed with property-based testing principles
- Focused on production-ready code quality

---

**Happy Coding!** 🚀
