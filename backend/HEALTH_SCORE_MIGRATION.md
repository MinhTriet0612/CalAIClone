# Health Score Migration Guide

## Overview

Added health score (1-10) feature to track meal and daily health quality across all APIs.

## Database Changes

### New Columns

1. **`meals.healthScore`** (INTEGER, nullable)
   - Health score from 1-10 for individual meals
   - Auto-calculated if not provided
   - Can be set manually when logging meals

2. **`daily_targets.healthScore`** (INTEGER, nullable)
   - Daily health score from 1-10
   - Can be set manually or calculated from meal averages

## Migration Scripts

### Option 1: Using Prisma Migrate (Recommended)

```bash
cd backend
npx prisma migrate dev --name add_health_score
npx prisma generate
```

### Option 2: Manual SQL Migration

Run the SQL script directly:

```bash
cd backend
psql $DATABASE_URL -f prisma/migrations/add_health_score.sql
npx prisma generate
```

Or use the provided shell script:

```bash
cd backend
./prisma/migrations/migrate_health_score.sh
```

### Option 3: Direct psql Command

```bash
# Connect to your database
psql -U your_username -d cal_ai

# Run the migration
ALTER TABLE "meals" ADD COLUMN IF NOT EXISTS "healthScore" INTEGER;
ALTER TABLE "daily_targets" ADD COLUMN IF NOT EXISTS "healthScore" INTEGER;

# Exit psql
\q

# Regenerate Prisma client
cd backend
npx prisma generate
```

## Health Score Calculation

### Meal Health Score

Automatically calculated based on:
- **Protein ratio**: Higher protein (25%+ of calories) = +1.5 points
- **Fat ratio**: Moderate fat (20-35% of calories) = +1 point, too much (>50%) = -1 point
- **Calorie density**: Light meals (<300 cal) = +0.5, heavy meals (>1000 cal) = -0.5
- **Base score**: 5 points

**Formula:**
```
score = 5 (base)
+ protein_bonus (0 to +1.5)
+ fat_bonus (-1 to +1)
+ calorie_bonus (-0.5 to +0.5)
= clamped to 1-10
```

### Daily Health Score

Calculated as **average of all meal health scores** for that day.

```
daily_health_score = average(meal1.healthScore, meal2.healthScore, ...)
```

## API Changes

### Meals API

**POST `/api/meals/log`**
- Now accepts optional `healthScore` (1-10)
- If not provided, auto-calculates based on nutritional values
- Returns meal with `healthScore` included

**GET `/api/meals/daily-summary`**
- Now includes `healthScore` in response (average of meals)
- Example response:
```json
{
  "date": "2024-01-15",
  "targets": {...},
  "consumed": {...},
  "remaining": {...},
  "meals": [...],
  "healthScore": 7.5
}
```

**GET `/api/meals/today`**
- Meals now include `healthScore` field

### Daily Targets API

**PUT `/api/daily-targets?date=YYYY-MM-DD`**
- Now accepts optional `healthScore` in request body
- Can set daily health score manually

**GET `/api/daily-targets?date=YYYY-MM-DD`**
- Returns daily targets (health score stored but not returned in MacroTargets)

## Frontend Changes

### MacroTargetsCard
- Displays daily health score badge
- Color-coded: Green (8+), Orange (6-7), Red (<6)
- Shows score value and label (Excellent/Good/Fair/Poor)

### MealsList
- Each meal shows health score with star icon
- Color-coded based on score
- Tooltip shows full score

## Example Usage

### Log Meal with Manual Health Score

```bash
POST /api/meals/log
{
  "name": "Grilled Chicken Salad",
  "foodItems": ["chicken", "lettuce", "tomatoes"],
  "calories": 350,
  "protein": 40,
  "carbs": 20,
  "fats": 12,
  "healthScore": 9  // Optional: manual override
}
```

### Set Daily Health Score

```bash
PUT /api/daily-targets?date=2024-01-15
{
  "calories": 2000,
  "protein": 150,
  "carbs": 250,
  "fats": 65,
  "healthScore": 8  // Optional: set daily score
}
```

## Health Score Ranges

- **9-10**: Excellent - Very healthy, balanced meals
- **7-8**: Good - Healthy choices with minor improvements possible
- **5-6**: Fair - Moderate healthiness, room for improvement
- **1-4**: Poor - Unhealthy choices, significant improvements needed

## Testing

1. **Run migration:**
   ```bash
   cd backend
   npx prisma migrate dev --name add_health_score
   ```

2. **Log a meal:**
   ```bash
   POST /api/meals/log
   # Health score will be auto-calculated
   ```

3. **Check daily summary:**
   ```bash
   GET /api/meals/daily-summary
   # Should include healthScore field
   ```

4. **View in frontend:**
   - Health score badge should appear in MacroTargetsCard
   - Each meal should show health score

## Notes

- Health scores are optional (nullable)
- Auto-calculation happens when logging meals
- Daily score is average of meal scores
- Users can override scores manually
- Scores are validated to be between 1-10

