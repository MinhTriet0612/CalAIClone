# Backend Monitoring (Prometheus + Grafana)

## Setup

1. Install prom-client:
   ```bash
   cd backend
   npm install prom-client
   ```

2. The `MonitoringModule` is already imported in `AppModule`.

3. Start monitoring stack:
   ```bash
   cd monitoring
   docker compose up -d
   ```

## Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /metrics` | Prometheus metrics (scraped by Prometheus) |
| `GET /health` | Health check (uptime, status) |
| `GET /health/ready` | Readiness probe |

## Available Metrics

### HTTP Metrics
- `http_requests_total` - Total requests by method/route/status
- `http_request_duration_seconds` - Request latency histogram
- `http_request_errors_total` - 4xx/5xx error count

### Business Metrics
- `meals_logged_total` - Meals logged
- `meal_analysis_total` - AI meal analyses (by is_food label)
- `meal_analysis_duration_seconds` - AI analysis latency
- `chat_messages_total` - Chat messages sent
- `active_users` - Active users gauge

### Auth Metrics
- `auth_attempts_total` - Login/register attempts (by type/result)
- `registrations_total` - New user registrations

### Node.js Metrics (auto-collected)
- `process_cpu_seconds_total` - CPU usage
- `process_resident_memory_bytes` - Memory usage
- `nodejs_heap_size_used_bytes` - Heap usage
- `nodejs_eventloop_lag_seconds` - Event loop lag

## Dashboards

Access Grafana at http://localhost:3002 (admin/admin).

The `CalAI Backend` dashboard is auto-provisioned with panels for:
- Request rate and error rate
- Response time percentiles (p50/p95/p99)
- Meals logged and chat messages rate
- AI analysis duration
- Auth attempts
- Process memory and uptime

## Alerts

Prometheus alert rules are configured in `monitoring/prometheus/alert-rules.yml`:
- **HighErrorRate** - Error rate > 5% for 5 minutes
- **HighResponseTime** - p95 latency > 2s for 5 minutes
- **ServiceDown** - Backend unreachable for 1 minute
- **HighMemoryUsage** - Memory > 512MB for 5 minutes
- **AIAnalysisFailureRate** - Elevated AI analysis failures

## Instrumenting Business Logic

Use `MetricsService` in your services:

```typescript
constructor(private readonly metrics: MetricsService) {}

// Increment counter
this.metrics.mealsLogged.inc();

// Record histogram
const timer = this.metrics.mealAnalysisDuration.startTimer();
// ... do work ...
timer();

// Set gauge
this.metrics.activeUsers.set(count);
```
