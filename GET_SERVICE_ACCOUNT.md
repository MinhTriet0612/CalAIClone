# How to Get Firebase Service Account Key (Backend)

The configuration you provided is for the **frontend**. For the **backend**, you need a **Service Account Key**.

## Step-by-Step Guide

### Step 1: Go to Firebase Console
1. Open [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **nextapp-77286**

### Step 2: Navigate to Service Accounts
1. Click the **gear icon** (⚙️) next to "Project Overview"
2. Select **Project settings**
3. Go to the **Service accounts** tab

### Step 3: Generate New Private Key
1. You'll see a section titled "Firebase Admin SDK"
2. Click **Generate new private key** button
3. A dialog will appear - click **Generate key**
4. A JSON file will download automatically (e.g., `nextapp-77286-firebase-adminsdk-xxxxx.json`)

### Step 4: Extract Values from JSON
Open the downloaded JSON file. It will look like this:

```json
{
  "type": "service_account",
  "project_id": "nextapp-77286",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@nextapp-77286.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "..."
}
```

### Step 5: Configure Backend .env

Create or update `backend/.env` file with these values:

```bash
# Firebase Service Account (Option 1: Use individual values - RECOMMENDED)
FIREBASE_PROJECT_ID=nextapp-77286
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@nextapp-77286.iam.gserviceaccount.com

# OR Option 2: Use entire JSON as string (escape newlines)
# FIREBASE_SERVICE_ACCOUNT='{"type":"service_account","project_id":"nextapp-77286",...}'

# Other config
GOOGLE_AI_API_KEY=your_google_ai_key_here
PORT=3001
```

**Important Notes:**
- Copy the `private_key` value from JSON (keep the quotes and `\n` characters)
- Copy the `client_email` value from JSON
- The `project_id` is already `nextapp-77286` (from your frontend config)

### Step 6: Enable Required Firebase Services

Before testing, make sure these are enabled:

1. **Authentication:**
   - Go to **Authentication** > **Get started**
   - Enable **Email/Password** provider
   - (Optional) Enable **Google** provider

2. **Firestore Database:**
   - Go to **Firestore Database** > **Create database**
   - Start in **test mode** (for development)
   - Choose a location

### Step 7: Test the Setup

1. Start backend: `cd backend && npm run start:dev`
2. Start frontend: `cd frontend && npm run dev`
3. Try signing up with email/password
4. Check Firestore - you should see a new user document

## Security Warning

⚠️ **NEVER commit the service account JSON file or .env files to git!**

The `.gitignore` should already exclude `.env` files, but double-check:
- `backend/.env` should be in `.gitignore`
- `frontend/.env` should be in `.gitignore`
- Never share your private key publicly

## Troubleshooting

### "Firebase configuration is missing"
- Make sure `backend/.env` exists
- Check that all three values are set: `FIREBASE_PROJECT_ID`, `FIREBASE_PRIVATE_KEY`, `FIREBASE_CLIENT_EMAIL`
- Restart the backend server after changing `.env`

### "Invalid token" errors
- Make sure Authentication is enabled in Firebase Console
- Check that Email/Password provider is enabled
- Verify the frontend `.env` is configured correctly

### "Permission denied" in Firestore
- Make sure Firestore is created
- Check Firestore security rules (start with test mode for development)

