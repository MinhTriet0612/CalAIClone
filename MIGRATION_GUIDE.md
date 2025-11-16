# Migration from Firebase to PostgreSQL + Prisma

## Summary

The application has been migrated from Firebase/Firestore to PostgreSQL + Prisma with JWT authentication.

## Major Changes

### Backend

1. **Database**: Firebase Firestore → PostgreSQL
2. **Authentication**: Firebase Auth → JWT (email/password)
3. **ORM**: Direct Firestore calls → Prisma ORM
4. **User ID**: Firebase UID → Prisma CUID

### Frontend

1. **Authentication**: Firebase Auth SDK → JWT tokens
2. **Token Storage**: `firebase_id_token` → `jwt_token`
3. **API Calls**: No Firebase SDK needed

## Setup Instructions

### 1. Backend Setup

#### Install PostgreSQL

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### Create Database

```bash
sudo -u postgres psql
CREATE DATABASE cal_ai;
CREATE USER cal_ai_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE cal_ai TO cal_ai_user;
\q
```

#### Configure Environment

Add to `backend/.env`:

```bash
DATABASE_URL="postgresql://cal_ai_user:your_password@localhost:5432/cal_ai?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
GOOGLE_AI_API_KEY="your-google-ai-key"
```

#### Run Migrations

```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
```

### 2. Frontend Setup

No changes needed - the frontend will automatically use the new JWT authentication.

## API Changes

### Authentication Endpoints

**New Endpoints:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify` - Verify JWT token

**Removed:**
- Firebase authentication (handled by frontend SDK)

### Request/Response Format

**Register/Login Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "clx123...",
    "email": "user@example.com",
    "role": "user"
  }
}
```

### User ID Changes

**Before:** `user.uid` (Firebase UID)
**Now:** `user.id` (Prisma CUID)

All endpoints now use `user.id` instead of `user.uid`.

## Database Schema

### User Table
- `id` (CUID, primary key)
- `email` (unique)
- `password` (bcrypt hashed)
- `role` ("user" | "admin")
- Profile fields: age, gender, height, weight, etc.
- Target fields: targetCalories, targetProtein, targetCarbs, targetFats

### Meal Table
- `id` (CUID, primary key)
- `userId` (foreign key)
- `name`, `foodItems`, `calories`, `protein`, `carbs`, `fats`
- `imageUrl` (optional)
- `date`, `createdAt`, `updatedAt`

## Migration Steps for Existing Data

If you have existing Firebase data, you'll need to:

1. Export data from Firestore
2. Transform data format (UID → CUID, date formats, etc.)
3. Import into PostgreSQL using Prisma

## Testing

1. Start PostgreSQL
2. Run migrations: `npx prisma migrate dev`
3. Start backend: `npm run start:dev`
4. Start frontend: `npm run dev`
5. Register a new user
6. Login and test all features

## Troubleshooting

### Database Connection Error
- Check PostgreSQL is running: `sudo systemctl status postgresql`
- Verify DATABASE_URL in .env
- Check database exists and user has permissions

### Migration Errors
- Make sure database is empty or use `--force` flag
- Check Prisma schema syntax

### Authentication Errors
- Verify JWT_SECRET is set in .env
- Check token is being sent in Authorization header
- Token expires after 7 days (configurable in auth.module.ts)

