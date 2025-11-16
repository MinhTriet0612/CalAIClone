# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Get Google AI API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### Step 2: Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:
```bash
echo "GOOGLE_AI_API_KEY=your_api_key_here" > .env
echo "PORT=3001" >> .env
```

Start backend:
```bash
npm run start:dev
```

Backend will run on `http://localhost:3001`

### Step 3: Setup Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:3000`

### Step 4: Test the App

1. Open `http://localhost:3000` in your browser
2. Click "📸 Take Photo & Analyze Meal"
3. Upload a food image
4. Review the AI analysis
5. Click "Confirm & Add Meal"
6. See your remaining calories update!

## 🐛 Troubleshooting

### Backend won't start
- Check if `.env` file exists in `backend/` directory
- Verify `GOOGLE_AI_API_KEY` is set correctly
- Make sure port 3001 is not in use

### Frontend can't connect to backend
- Ensure backend is running on port 3001
- Check browser console for CORS errors
- Verify proxy settings in `vite.config.ts`

### AI analysis fails
- Verify your Google AI API key is valid
- Check backend logs for error messages
- Make sure the image format is supported (jpg, png, webp)

## 📝 Next Steps

- Add user authentication
- Connect to a database (Firebase Firestore)
- Add personalized calorie targets
- Implement BMI calculation
- Add weight tracking

