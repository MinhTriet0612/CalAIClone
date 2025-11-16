# Cal AI API Documentation

## 📚 Swagger UI

The API documentation is available at: **http://localhost:3001/api-docs**

After starting the backend server, open this URL in your browser to access the interactive API documentation.

## 🔐 Authentication

All API endpoints (except documentation) require authentication using Firebase ID tokens.

### How to Get a Token

1. **From Frontend**: After logging in, the token is automatically stored in `localStorage` as `firebase_id_token`
2. **From Browser Console**:
   ```javascript
   // If using Firebase Auth in browser
   const user = firebase.auth().currentUser;
   const token = await user.getIdToken();
   console.log(token);
   ```

### Using the Token in Swagger

1. Open Swagger UI: http://localhost:3001/api-docs
2. Click the **Authorize** button (🔒) at the top
3. Enter your Firebase ID token in the `JWT-auth` field
4. Click **Authorize**
5. Now you can test all endpoints!

## 📋 API Endpoints

### Authentication (`/api/auth`)

#### `POST /api/auth/verify`
Verify if the authentication token is valid.

**Headers:**
- `Authorization: Bearer <firebase_id_token>`

**Response:**
```json
{
  "valid": true,
  "user": {
    "uid": "user123",
    "email": "user@example.com",
    "role": "user"
  }
}
```

---

### Users (`/api/users`)

#### `GET /api/users/me`
Get current authenticated user's information.

**Headers:**
- `Authorization: Bearer <firebase_id_token>`

**Response:**
```json
{
  "uid": "user123",
  "email": "user@example.com",
  "role": "user",
  "profile": { ... },
  "targets": { ... }
}
```

#### `PUT /api/users/profile`
Update user profile (age, height, weight, goals, etc.).

**Headers:**
- `Authorization: Bearer <firebase_id_token>`
- `Content-Type: application/json`

**Body:**
```json
{
  "age": 30,
  "gender": "male",
  "height": 175,
  "weight": 70,
  "activityLevel": "moderate",
  "goal": "weight_loss",
  "targetWeight": 65,
  "dietaryPreferences": ["vegetarian"]
}
```

#### `PUT /api/users/targets`
Update daily calorie and macro targets.

**Headers:**
- `Authorization: Bearer <firebase_id_token>`
- `Content-Type: application/json`

**Body:**
```json
{
  "calories": 2000,
  "protein": 150,
  "carbs": 250,
  "fats": 65
}
```

#### `PUT /api/users/role` (Admin only)
Update a user's role. Requires admin privileges.

**Headers:**
- `Authorization: Bearer <admin_firebase_id_token>`
- `Content-Type: application/json`

**Body:**
```json
{
  "uid": "user123",
  "role": "admin"
}
```

---

### Meals (`/api/meals`)

#### `GET /api/meals/daily-summary?date=YYYY-MM-DD`
Get daily calorie summary with targets, consumed, remaining, and meals.

**Headers:**
- `Authorization: Bearer <firebase_id_token>`

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

#### `POST /api/meals/analyze`
Analyze a meal image using AI to get nutritional information.

**Headers:**
- `Authorization: Bearer <firebase_id_token>`
- `Content-Type: multipart/form-data`

**Body:**
- `image`: Image file (jpg, png, webp)

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

#### `POST /api/meals/log`
Log a meal to the daily summary.

**Headers:**
- `Authorization: Bearer <firebase_id_token>`
- `Content-Type: application/json`

**Body:**
```json
{
  "name": "Grilled Chicken with Rice",
  "foodItems": ["grilled chicken", "rice"],
  "calories": 650,
  "protein": 45,
  "carbs": 60,
  "fats": 20
}
```

**Response:** Updated daily summary (same format as `GET /api/meals/daily-summary`)

---

## 🧪 Testing in Swagger UI

### Step 1: Get Your Token

1. Login to the frontend app
2. Open browser DevTools (F12)
3. Go to Console tab
4. Run:
   ```javascript
   localStorage.getItem('firebase_id_token')
   ```
5. Copy the token

### Step 2: Authorize in Swagger

1. Open http://localhost:3001/api-docs
2. Click **Authorize** button
3. Paste your token
4. Click **Authorize**

### Step 3: Test Endpoints

1. Expand any endpoint
2. Click **Try it out**
3. Fill in parameters (if needed)
4. Click **Execute**
5. See the response below

## 📝 Example Requests

### Using cURL

```bash
# Get daily summary
curl -X GET "http://localhost:3001/api/meals/daily-summary" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Log a meal
curl -X POST "http://localhost:3001/api/meals/log" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Grilled Chicken",
    "foodItems": ["chicken", "rice"],
    "calories": 650,
    "protein": 45,
    "carbs": 60,
    "fats": 20
  }'

# Analyze meal image
curl -X POST "http://localhost:3001/api/meals/analyze" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "image=@/path/to/image.jpg"
```

## 🔒 Security Notes

- All endpoints require valid Firebase ID tokens
- Tokens expire after 1 hour (Firebase default)
- Invalid tokens will return 401 Unauthorized
- Admin-only endpoints require `role: "admin"` in user document

## 📖 More Information

For detailed endpoint documentation with request/response schemas, visit:
**http://localhost:3001/api-docs**

The Swagger UI provides:
- Interactive API testing
- Request/response examples
- Schema definitions
- Authentication testing
- Try it out functionality

