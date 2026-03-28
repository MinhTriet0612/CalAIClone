import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MetricsService } from './metrics.service';

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  constructor(private readonly metricsService: MetricsService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const startTime = process.hrtime.bigint();

    res.on('finish', () => {
      const endTime = process.hrtime.bigint();
      const durationSeconds = Number(endTime - startTime) / 1e9;

      const route = this.normalizeRoute(req.route?.path || req.path);
      const method = req.method;
      const statusCode = String(res.statusCode);

      // Record request duration
      this.metricsService.httpRequestDuration
        .labels(method, route, statusCode)
        .observe(durationSeconds);

      // Increment request counter
      this.metricsService.httpRequestTotal
        .labels(method, route, statusCode)
        .inc();

      // Track errors
      if (res.statusCode >= 400) {
        this.metricsService.httpRequestErrors
          .labels(method, route, statusCode)
          .inc();
      }
    });

    next();
  }

  /**
   * Normalize route to avoid high-cardinality label values.
   * Replaces path parameters (UUIDs, numbers) with placeholders.
   */
  private normalizeRoute(path: string): string {
    return path
      .replace(
        /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi,
        ':id',
      )
      .replace(/\/\d+/g, '/:id');
  }
}
