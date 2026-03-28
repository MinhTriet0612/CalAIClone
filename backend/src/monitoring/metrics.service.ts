import { Injectable, OnModuleInit } from '@nestjs/common';
import { collectDefaultMetrics, Registry, Counter, Histogram, Gauge } from 'prom-client';

@Injectable()
export class MetricsService implements OnModuleInit {
  readonly registry: Registry;

  // HTTP request metrics
  readonly httpRequestDuration: Histogram;
  readonly httpRequestTotal: Counter;
  readonly httpRequestErrors: Counter;

  // Business metrics
  readonly mealsLogged: Counter;
  readonly mealAnalysisTotal: Counter;
  readonly mealAnalysisDuration: Histogram;
  readonly chatMessagesTotal: Counter;
  readonly activeUsers: Gauge;

  // Auth metrics
  readonly authAttempts: Counter;
  readonly registrations: Counter;

  constructor() {
    this.registry = new Registry();

    // Default Node.js metrics (CPU, memory, event loop, etc.)
    collectDefaultMetrics({ register: this.registry });

    // HTTP metrics
    this.httpRequestDuration = new Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'route', 'status_code'],
      buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5],
      registers: [this.registry],
    });

    this.httpRequestTotal = new Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status_code'],
      registers: [this.registry],
    });

    this.httpRequestErrors = new Counter({
      name: 'http_request_errors_total',
      help: 'Total number of HTTP request errors (4xx and 5xx)',
      labelNames: ['method', 'route', 'status_code'],
      registers: [this.registry],
    });

    // Business metrics
    this.mealsLogged = new Counter({
      name: 'meals_logged_total',
      help: 'Total number of meals logged',
      registers: [this.registry],
    });

    this.mealAnalysisTotal = new Counter({
      name: 'meal_analysis_total',
      help: 'Total number of meal image analyses',
      labelNames: ['is_food'],
      registers: [this.registry],
    });

    this.mealAnalysisDuration = new Histogram({
      name: 'meal_analysis_duration_seconds',
      help: 'Duration of meal image analysis in seconds',
      buckets: [0.5, 1, 2, 5, 10, 20],
      registers: [this.registry],
    });

    this.chatMessagesTotal = new Counter({
      name: 'chat_messages_total',
      help: 'Total number of chat messages sent',
      registers: [this.registry],
    });

    this.activeUsers = new Gauge({
      name: 'active_users',
      help: 'Number of users active in the last 24 hours',
      registers: [this.registry],
    });

    // Auth metrics
    this.authAttempts = new Counter({
      name: 'auth_attempts_total',
      help: 'Total number of authentication attempts',
      labelNames: ['type', 'result'],
      registers: [this.registry],
    });

    this.registrations = new Counter({
      name: 'registrations_total',
      help: 'Total number of user registrations',
      registers: [this.registry],
    });
  }

  onModuleInit() {
    // Metrics are initialized in constructor
  }

  async getMetrics(): Promise<string> {
    return this.registry.metrics();
  }

  getContentType(): string {
    return this.registry.contentType;
  }
}
