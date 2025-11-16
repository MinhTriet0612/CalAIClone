# How to See HTTP Requests in Browser Network Tab (F12)

## ✅ Current Setup

Your API is now configured to make direct requests to `http://localhost:3001/api`, which will show up in the Network tab.

## Steps to View Requests

### 1. Open Browser DevTools
- Press **F12** (or right-click → Inspect)
- Go to the **Network** tab

### 2. Clear Previous Requests (Optional)
- Click the **Clear** button (🚫) to start fresh

### 3. Filter Requests
- In the filter box, type: `localhost:3001` or `api`
- Or select **XHR** or **Fetch** filter to see only API calls

### 4. Make a Request
- Login to the app
- The app will automatically make a request to `/api/meals/daily-summary`
- You should see it appear in the Network tab

## What You Should See

### In Network Tab:
- **Name**: `daily-summary` or `meals/daily-summary`
- **Method**: `GET` or `POST`
- **Status**: `200` (success) or error code
- **Type**: `xhr` or `fetch`
- **URL**: `http://localhost:3001/api/meals/daily-summary`

### Click on a Request to See:
- **Headers**: Request and Response headers
- **Payload**: Request body (for POST requests)
- **Response**: Server response data
- **Preview**: Formatted response

## Troubleshooting

### If requests don't show:

1. **Check if backend is running:**
   ```bash
   cd backend
   npm run start:dev
   ```
   Should see: `🚀 Backend running on http://localhost:3001`

2. **Check if frontend is running:**
   ```bash
   cd frontend
   npm run dev
   ```
   Should be on: `http://localhost:3000`

3. **Check CORS errors:**
   - Look in Console tab for CORS errors
   - Backend CORS is configured for `http://localhost:3000`

4. **Check Network tab filter:**
   - Make sure "All" is selected, not just "JS" or "CSS"
   - Try typing `localhost` in the filter box

5. **Check if you're logged in:**
   - Requests require authentication
   - Make sure you see `🔑 Auth token set` in console

6. **Hard refresh:**
   - Press `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
   - This clears cache and reloads

### Common Issues:

**CORS Error:**
```
Access to XMLHttpRequest at 'http://localhost:3001/api/...' from origin 'http://localhost:3000' has been blocked by CORS policy
```
- Solution: Backend CORS is already configured, but make sure backend is running

**401 Unauthorized:**
- Solution: Make sure you're logged in and token is set

**Network Error / Failed to fetch:**
- Solution: Backend might not be running on port 3001

## Console Logs

You'll also see detailed logs in the **Console** tab:
- `🚀 API Request` - Before request is sent
- `✅ API Response` - After successful response
- `❌ Response Error` - If request fails

These logs show the full URL, method, headers, and response data.

## Testing Manually

You can also test the API directly in the browser console:

```javascript
// Get auth token from Firebase
const user = firebase.auth().currentUser;
const token = await user.getIdToken();

// Make a test request
fetch('http://localhost:3001/api/meals/daily-summary', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(r => r.json())
.then(console.log);
```

This will also show up in the Network tab!

