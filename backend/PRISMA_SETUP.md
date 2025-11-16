# Prisma + PostgreSQL Setup Guide

## Prerequisites

1. PostgreSQL installed and running
2. Database created

## Setup Steps

### 1. Configure Database Connection

Add to `backend/.env`:

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/cal_ai?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
```

Replace:
- `username`: Your PostgreSQL username
- `password`: Your PostgreSQL password
- `localhost:5432`: Your PostgreSQL host and port
- `cal_ai`: Your database name

### 2. Run Database Migrations

```bash
cd backend
npx prisma migrate dev --name init
```

This will:
- Create the database schema
- Generate Prisma Client
- Create migration files

### 3. Generate Prisma Client

```bash
npx prisma generate
```

### 4. (Optional) View Database in Prisma Studio

```bash
npx prisma studio
```

Opens a GUI to view and edit your database at http://localhost:5555

## Database Schema

### User Model
- `id`: Unique identifier (CUID)
- `email`: Unique email address
- `password`: Hashed password (bcrypt)
- `role`: "user" or "admin"
- Profile fields: age, gender, height, weight, activityLevel, goal, etc.
- Target fields: targetCalories, targetProtein, targetCarbs, targetFats
- Relations: meals (one-to-many)

### Meal Model
- `id`: Unique identifier (CUID)
- `userId`: Foreign key to User
- `name`: Meal name
- `foodItems`: Array of food items
- `calories`, `protein`, `carbs`, `fats`: Nutritional values
- `imageUrl`: Optional image URL
- `date`: Meal date/time
- Indexed on `userId` and `date` for efficient queries

## API Changes from Firebase

### Authentication

**Before (Firebase):**
- Used Firebase ID tokens
- Frontend handled Firebase Auth

**Now (JWT):**
- Email/password authentication
- JWT tokens issued by backend
- Endpoints:
  - `POST /api/auth/register` - Register new user
  - `POST /api/auth/login` - Login user
  - `POST /api/auth/verify` - Verify JWT token

### User ID

**Before:** `user.uid` (Firebase UID)
**Now:** `user.id` (Prisma CUID)

All endpoints now use `user.id` instead of `user.uid`.

## Environment Variables

Required in `backend/.env`:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/cal_ai?schema=public"

# JWT
JWT_SECRET="your-secret-key-here"

# Google AI (unchanged)
GOOGLE_AI_API_KEY="your-google-ai-key"
```

## Migration Commands

```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations in production
npx prisma migrate deploy

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# View database
npx prisma studio
```

## Troubleshooting

### Connection Error
- Check PostgreSQL is running: `sudo systemctl status postgresql`
- Verify DATABASE_URL in .env
- Check database exists: `psql -U username -l`

### Migration Errors
- Make sure database is empty or use `--force` flag
- Check Prisma schema syntax

### Prisma Client Not Found
- Run `npx prisma generate` after schema changes

