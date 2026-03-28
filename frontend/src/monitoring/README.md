# Frontend Monitoring (Sentry / GlitchTip)

## Setup

1. Install the Sentry SDK:
   ```bash
   cd frontend
   npm install @sentry/react
   ```

2. Add environment variables to `.env`:
   ```env
   VITE_SENTRY_DSN=https://your-key@glitchtip.yourdomain.com/1
   VITE_ENVIRONMENT=production
   VITE_APP_VERSION=1.0.0
   ```

3. Initialize in `main.tsx`:
   ```typescript
   import { initMonitoring } from './monitoring/sentry';
   initMonitoring();
   ```

4. Wrap your App with ErrorBoundary:
   ```typescript
   import { ErrorBoundary } from './monitoring/sentry';

   <ErrorBoundary fallback={<p>Something went wrong</p>}>
     <App />
   </ErrorBoundary>
   ```

5. Set user context after login:
   ```typescript
   import { setMonitoringUser, clearMonitoringUser } from './monitoring/sentry';

   // After login
   setMonitoringUser({ id: user.id, email: user.email });

   // On logout
   clearMonitoringUser();
   ```

## GlitchTip Deployment

GlitchTip is a self-hosted, Sentry-compatible error tracker.

```bash
# docker-compose.yml for GlitchTip
# See: https://glitchtip.com/documentation/install
docker compose up -d
```

The Sentry SDK works out of the box with GlitchTip. Just point `VITE_SENTRY_DSN` to your GlitchTip instance.

## What Gets Tracked

- **Unhandled errors** - Automatic capture of JS exceptions
- **Performance** - Page load times, API call durations
- **User context** - Who experienced the error (after login)
- **Breadcrumbs** - User actions leading up to an error
- **Session replay** - Visual replay of error sessions (Sentry only)
