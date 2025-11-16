# Cal AI - Calorie Tracker App

A full-stack calorie tracking application built with React, NestJS, and Google AI (Gemini) for intelligent meal recognition.

## 🚀 Features

- **AI-Powered Meal Recognition**: Take a photo of your meal and get instant nutritional analysis
- **Real-time Calorie Tracking**: See your daily targets, consumed calories, and remaining macros
- **Macro Tracking**: Track protein, carbs, and fats with visual progress bars
- **Daily Summary**: View all your meals and progress for the day

## 📁 Project Structure

```
cal-ai/
├── backend/          # NestJS backend API
│   ├── src/
│   │   ├── ai/       # Google AI integration
│   │   ├── meals/    # Meals module (controller, service, DTOs)
│   │   └── config/   # Configuration module
│   └── .env          # Environment variables
├── frontend/         # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   └── services/    # API service
│   └── package.json
└── shared/           # Shared TypeScript types
    └── types.ts
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Google AI Studio API key ([Get it here](https://aistudio.google.com/app/apikey))

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Add your Google AI API key to `.env`:
```
GOOGLE_AI_API_KEY=your_api_key_here
PORT=3001
```

5. Start the backend server:
```bash
npm run start:dev
```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📡 API Endpoints

### GET `/api/meals/daily-summary`
Get today's summary including targets, consumed, remaining, and meals.

**Query Parameters:**
- `date` (optional): Date in YYYY-MM-DD format

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

### POST `/api/meals/analyze`
Analyze a meal image using Google AI.

**Request:**
- Form data with `image` file

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

### POST `/api/meals/log`
Log a meal to the daily summary.

**Request Body:**
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

**Response:** Updated daily summary

## 🎯 Usage

1. **Start both servers** (backend on port 3001, frontend on port 3000)
2. **Open the app** in your browser at `http://localhost:3000`
3. **View your daily targets** - See calories, protein, carbs, and fats goals
4. **Take a photo** - Click "Take Photo & Analyze Meal" button
5. **Review analysis** - The AI will analyze your meal and show nutritional breakdown
6. **Confirm meal** - Review the projected remaining calories and confirm to add the meal
7. **Track progress** - See your remaining calories and macros update in real-time

## 🔧 Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Backend**: NestJS, TypeScript
- **AI**: Google Gemini Pro Vision API
- **State Management**: React Hooks
- **HTTP Client**: Axios

## 📝 Notes

- Currently uses in-memory storage (meals are lost on server restart)
- Default user is "default-user" (authentication not implemented yet)
- Default targets are 2000 calories, 150g protein, 250g carbs, 65g fats
- For production, replace in-memory storage with a database (Firebase Firestore, PostgreSQL, etc.)

## 🚧 Future Enhancements

- User authentication (Firebase Auth)
- Database integration (Firebase Firestore)
- User profile and personalized targets
- BMI calculation and goal-based recommendations
- Weight tracking
- Historical data and charts
- Barcode scanning
- Meal plan suggestions

## 📄 License

MIT

