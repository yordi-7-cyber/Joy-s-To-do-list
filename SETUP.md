# Setup Guide for Joy's To-Do List

## Prerequisites

1. **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
2. **PostgreSQL** (v12 or higher) - [Download here](https://www.postgresql.org/download/)

## Step 1: Install PostgreSQL

### Windows
1. Download PostgreSQL installer from https://www.postgresql.org/download/windows/
2. Run the installer and follow the setup wizard
3. Remember the password you set for the `postgres` user
4. Default port is 5432 (keep it)

### Mac
```bash
brew install postgresql
brew services start postgresql
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

## Step 2: Create Database

### Option A: Using psql command line

1. Open terminal/command prompt
2. Connect to PostgreSQL:
```bash
psql -U postgres
```
(Enter your postgres password when prompted)

3. Create the database:
```sql
CREATE DATABASE joys_todo;
```

4. Exit psql:
```sql
\q
```

### Option B: Using pgAdmin (GUI)

1. Open pgAdmin (installed with PostgreSQL)
2. Connect to your PostgreSQL server
3. Right-click on "Databases" → "Create" → "Database"
4. Name it: `joys_todo`
5. Click "Save"

## Step 3: Configure Environment Variables

1. Navigate to the project folder:
```bash
cd Joy-s-To-do-list
```

2. Copy the example environment file:
```bash
copy .env.example .env
```

3. Edit `.env` file with your database credentials:
```env
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=joys_todo
DB_USER=postgres
DB_PASSWORD=your_actual_password_here

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Important:** Replace `your_actual_password_here` with your PostgreSQL password!

## Step 4: Install Dependencies

### Backend
```bash
npm install
```

### Frontend
```bash
cd client
npm install
cd ..
```

Or install both at once:
```bash
npm run install-all
```

## Step 5: Run Database Migrations

This will create all the necessary tables:

```bash
npm run db:migrate
```

You should see: `✅ Database tables created successfully`

## Step 6: Start the Application

### Option A: Run both frontend and backend together
```bash
npm run dev-all
```

### Option B: Run separately

Terminal 1 (Backend):
```bash
npm run dev
```

Terminal 2 (Frontend):
```bash
cd client
npm start
```

## Access the Application

- **Frontend:** http://localhost:3001
- **Backend API:** http://localhost:3000
- **Health Check:** http://localhost:3000/health

## Verify Setup

1. Open http://localhost:3001
2. Click "Create Account"
3. Register a new user
4. You should be redirected to the dashboard

## Troubleshooting

### Database Connection Error
- Check if PostgreSQL is running
- Verify credentials in `.env` file
- Make sure database `joys_todo` exists

### Port Already in Use
- Change PORT in `.env` to another port (e.g., 3001)
- Or stop the process using that port

### Module Not Found
- Run `npm install` in root directory
- Run `npm install` in client directory

### Migration Fails
- Check database credentials
- Ensure PostgreSQL is running
- Try connecting manually with psql first

## Testing

Run backend tests:
```bash
npm test
```

## Next Steps

1. Create your first task
2. Add categories
3. Explore the dashboard
4. Try filtering and searching

Enjoy using Joy's To-Do List! 🚀
