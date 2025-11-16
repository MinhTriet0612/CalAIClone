# Daily Targets Migration Guide

## Overview

The system now supports **per-day custom targets**. Users can set different calorie and macro targets for each day, allowing for flexible meal planning.

## What Changed

### Database Schema

Added new `DailyTarget` model:
- Stores custom targets for specific dates
- One target per user per date (unique constraint)
- Falls back to user's default targets if no daily target exists

### Calculation Logic

**Before:**
- Always used user's default targets
- Same targets for every day

**Now:**
- Checks for daily target first
- Falls back to user defaults if no daily target
- Calculates remaining calories based on the specific day's target

## Migration Steps

### 1. Run Database Migration

```bash
cd backend
npx prisma migrate dev --name add_daily_targets
npx prisma generate
```

This will:
- Create `daily_targets` table
- Add unique constraint on `userId` + `date`
- Add indexes for performance

### 2. Restart Backend

```bash
npm run start:dev
```

## New API Endpoints

### 1. Get Daily Targets
**GET** `/api/daily-targets?date=YYYY-MM-DD`

Returns targets for a specific date. If no daily target exists, returns user's default targets.

**Response:**
```json
{
  "calories": 2200,
  "protein": 160,
  "carbs": 270,
  "fats": 70
}
```

### 2. Set Daily Targets
**PUT** `/api/daily-targets?date=YYYY-MM-DD`

Set custom targets for a specific day.

**Request Body:**
```json
{
  "calories": 2200,
  "protein": 160,
  "carbs": 270,
  "fats": 70
}
```

**Response:**
```json
{
  "message": "Daily targets updated successfully"
}
```

### 3. Delete Daily Targets
**DELETE** `/api/daily-targets?date=YYYY-MM-DD`

Remove custom daily targets (revert to user defaults).

**Response:**
```json
{
  "message": "Daily targets deleted successfully"
}
```

### 4. Get Daily Targets Range
**GET** `/api/daily-targets/range?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`

Get all custom daily targets within a date range.

**Response:**
```json
[
  {
    "date": "2024-01-15",
    "targets": {
      "calories": 2200,
      "protein": 160,
      "carbs": 270,
      "fats": 70
    }
  }
]
```

## How It Works

### Target Resolution Priority

1. **Daily Target** (if exists for the date)
2. **User Default Targets** (from user profile)
3. **System Defaults** (2000 cal, 150g protein, 250g carbs, 65g fats)

### Example Flow

1. User has default targets: 2000 cal/day
2. User sets custom target for Jan 15: 2200 cal
3. When viewing Jan 15 summary:
   - Uses 2200 cal target
   - Calculates remaining based on 2200 cal
4. When viewing Jan 16 summary:
   - Uses 2000 cal (default, no daily target)
   - Calculates remaining based on 2000 cal

### Calculation

```typescript
// Get target for specific date
targets = getDailyTarget(date) || getUserDefaults() || systemDefaults

// Calculate remaining
remaining = max(0, targets - consumed)
```

## Updated Endpoints

### Daily Summary
**GET** `/api/meals/daily-summary?date=YYYY-MM-DD`

Now uses the specific day's target for calculation:
- If daily target exists → uses daily target
- Otherwise → uses user defaults
- Calculates remaining based on that day's target

## Benefits

1. **Flexibility**: Different targets for different days
2. **No Breaking Changes**: Falls back to defaults if no daily target
3. **Easy Adjustment**: Users can customize without affecting other days
4. **Accurate Calculations**: Remaining calories calculated based on that day's target

## Example Use Cases

### Use Case 1: Weekend Adjustments
- Weekdays: 2000 cal (default)
- Saturday: 2500 cal (custom daily target)
- Sunday: 1800 cal (custom daily target)

### Use Case 2: Training Days
- Rest days: 2000 cal (default)
- Training days: 2500 cal (custom daily target)

### Use Case 3: Special Events
- Normal days: 2000 cal (default)
- Birthday: 3000 cal (custom daily target)
- After event: Delete custom target to revert

## Testing

1. Set a daily target:
   ```bash
   PUT /api/daily-targets?date=2024-01-15
   Body: { "calories": 2200, "protein": 160, "carbs": 270, "fats": 70 }
   ```

2. Get daily summary:
   ```bash
   GET /api/meals/daily-summary?date=2024-01-15
   ```
   Should show targets: 2200 cal

3. Delete daily target:
   ```bash
   DELETE /api/daily-targets?date=2024-01-15
   ```

4. Get daily summary again:
   ```bash
   GET /api/meals/daily-summary?date=2024-01-15
   ```
   Should show user's default targets

## Notes

- Daily targets are stored per date (YYYY-MM-DD)
- Dates are stored in UTC to avoid timezone issues
- Unique constraint prevents duplicate targets per user per date
- Deleting a daily target reverts to user defaults
- All calculations use the specific day's target

