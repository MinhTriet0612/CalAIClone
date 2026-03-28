import * as Sentry from '@sentry/react';

/**
 * Initialize Sentry/GlitchTip monitoring for the frontend.
 *
 * GlitchTip is compatible with the Sentry SDK.
 * Set VITE_SENTRY_DSN in your .env file pointing to your GlitchTip instance.
 *
 * Example:
 *   VITE_SENTRY_DSN=https://your-key@glitchtip.yourdomain.com/1
 */
export function initMonitoring() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;

  if (!dsn) {
    console.warn('[Monitoring] VITE_SENTRY_DSN not set — skipping Sentry/GlitchTip init');
    return;
  }

  Sentry.init({
    dsn,
    environment: import.meta.env.VITE_ENVIRONMENT || 'development',
    release: import.meta.env.VITE_APP_VERSION || '1.0.0',

    // Performance monitoring
    tracesSampleRate: import.meta.env.PROD ? 0.2 : 1.0,

    // Session replay (Sentry-only; GlitchTip ignores this gracefully)
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],

    // Scrub sensitive data before sending
    beforeSend(event) {
      if (event.request?.headers) {
        delete event.request.headers['Authorization'];
      }
      return event;
    },

    // Ignore common non-actionable errors
    ignoreErrors: [
      'ResizeObserver loop',
      'Network request failed',
      'Load failed',
      'AbortError',
    ],
  });
}

/**
 * Set user context after login
 */
export function setMonitoringUser(user: { id: string; email: string }) {
  Sentry.setUser({ id: user.id, email: user.email });
}

/**
 * Clear user context on logout
 */
export function clearMonitoringUser() {
  Sentry.setUser(null);
}

/**
 * Capture a custom error with context
 */
export function captureError(error: unknown, context?: Record<string, unknown>) {
  Sentry.captureException(error, {
    extra: context,
  });
}

/**
 * Add breadcrumb for tracking user actions
 */
export function addBreadcrumb(
  category: string,
  message: string,
  data?: Record<string, unknown>,
) {
  Sentry.addBreadcrumb({
    category,
    message,
    data,
    level: 'info',
  });
}

/**
 * Wrap a React component tree with Sentry error boundary
 */
export const ErrorBoundary = Sentry.ErrorBoundary;
