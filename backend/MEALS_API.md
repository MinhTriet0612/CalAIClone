# Meals API Documentation

## Endpoints

### 1. Get Daily Summary
**GET** `/api/meals/daily-summary?date=YYYY-MM-DD`

Returns today's targets, consumed calories, remaining macros, and all meals logged for the day.

**Query Parameters:**
- `date` (optional): Date in YYYY-MM-DD format (defaults to today)

**Response:**
```json
{
  "date": "2024-01-15",
  "targets": {
    "calories": 2000,
    "protein": 150,
    "carbs": 250,
    "fats": 65
  },
  "consumed": {
    "calories": 500,
    "protein": 45,
    "carbs": 60,
    "fats": 20
  },
  "remaining": {
    "calories": 1500,
    "protein": 105,
    "carbs": 190,
    "fats": 45
  },
  "meals": [...]
}
```

**Features:**
- Automatically calculates consumed totals from all meals for the day
- Calculates remaining calories/macros (targets - consumed, minimum 0)
- Returns all meals logged for the specified date

---

### 2. Get Today's Meals
**GET** `/api/meals/today`

Returns all meals logged for today.

**Response:**
```json
{
  "date": "2024-01-15",
  "meals": [
    {
      "id": "meal123",
      "name": "Grilled Chicken with Rice",
      "foodItems": ["chicken", "rice"],
      "calories": 650,
      "protein": 45,
      "carbs": 60,
      "fats": 20,
      "date": "2024-01-15T12:00:00Z",
      "createdAt": "2024-01-15T12:00:00Z"
    }
  ]
}
```

---

### 3. Log a Meal
**POST** `/api/meals/log`

Add a meal to the daily log and return updated daily summary with recalculated remaining calories.

**Request Body:**
```json
{
  "name": "Grilled Chicken with Rice",
  "foodItems": ["grilled chicken", "rice"],
  "calories": 650,
  "protein": 45,
  "carbs": 60,
  "fats": 20,
  "imageUrl": "https://example.com/image.jpg" // optional
}
```

**Response:**
Returns updated `DailySummary` with recalculated remaining calories.

**Features:**
- Automatically sets meal date to current date/time
- Immediately recalculates daily summary
- Returns updated remaining calories after logging

---

### 4. Recalculate Daily Summary
**GET** `/api/meals/recalculate?date=YYYY-MM-DD`

Force recalculation of consumed and remaining calories for a specific date.

**Query Parameters:**
- `date` (optional): Date in YYYY-MM-DD format (defaults to today)

**Response:**
Returns recalculated `DailySummary` with fresh data.

**Use Cases:**
- Refresh data after manual database changes
- Verify calculations are correct
- Get updated summary after external changes

---

### 5. Analyze Meal Image
**POST** `/api/meals/analyze`

Upload a meal image and get AI-powered nutritional analysis.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `image` (file)

**Response:**
```json
{
  "foodItems": ["grilled chicken", "rice", "vegetables"],
  "calories": 650,
  "protein": 45,
  "carbs": 60,
  "fats": 20,
  "confidence": 0.85
}
```

---

## Remaining Calories Calculation

The remaining calories are calculated as:

```
remaining = max(0, targets - consumed)
```

Where:
- `targets`: User's daily calorie/macro targets from profile
- `consumed`: Sum of all meals logged for the day
- `remaining`: Cannot be negative (minimum 0)

### Calculation Details

1. **Consumed Calculation:**
   - Sums all meals for the specified date
   - Adds up: calories, protein, carbs, fats separately
   - Uses `Number()` to ensure proper numeric addition

2. **Remaining Calculation:**
   - Subtracts consumed from targets
   - Uses `Math.max(0, ...)` to prevent negative values
   - Calculated for each macro separately

3. **Date Handling:**
   - Uses UTC dates to avoid timezone issues
   - Properly handles date ranges (00:00:00 to 23:59:59)
   - Defaults to today if no date specified

---

## Example Flow

1. **User logs a meal:**
   ```
   POST /api/meals/log
   → Meal saved with current date/time
   → Daily summary recalculated
   → Returns updated remaining calories
   ```

2. **User views today's meals:**
   ```
   GET /api/meals/today
   → Returns all meals logged today
   ```

3. **User checks remaining calories:**
   ```
   GET /api/meals/daily-summary
   → Returns targets, consumed, remaining, meals
   ```

4. **User wants to refresh data:**
   ```
   GET /api/meals/recalculate
   → Forces fresh calculation
   → Returns updated summary
   ```

---

## Notes

- All endpoints require JWT authentication
- Date format: `YYYY-MM-DD` (e.g., "2024-01-15")
- Meal dates are stored in UTC
- Remaining calories update automatically when meals are logged
- Calculations are done server-side for accuracy

