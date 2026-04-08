import { Injectable } from '@nestjs/common';

@Injectable()
export class ScientificService {
  /**
   * Calculate Exponential Moving Average (EMA) for weight smoothing.
   * Formula: W_trend_t = alpha * W_actual_t + (1 - alpha) * W_trend_t_minus_1
   * @param actual Current scale weight
   * @param previousTrend Previous trend weight (defaults to actual if null)
   * @param alpha Smoothing factor (default 0.1 for ~14-day window)
   */
  calculateEMA(actual: number, previousTrend: number | null, alpha = 0.1): number {
    if (previousTrend === null) return actual;
    return alpha * actual + (1 - alpha) * previousTrend;
  }

  /**
   * Calculate Adaptive TDEE using Reverse Induction.
   * Based on Hall KD (NIH) model and Wishnofsky's Rule.
   * @param avgIntake Average calorie intake over the window
   * @param weightChange Change in trend weight over the window
   * @param days Length of the observation window in days
   * @param rho Energy density constant (default 7700 kcal/kg)
   */
  calculateAdaptiveTDEE(
    avgIntake: number,
    weightChange: number,
    days: number,
    rho = 7700,
  ): number {
    if (days <= 0) return avgIntake;
    const offset = (weightChange * rho) / days;
    return avgIntake - offset;
  }

  /**
   * Predict if a metabolic plateau has been reached.
   * A plateau is defined by deficit erosion: loss of weight stops when the
   * gap between metabolic burn (TDEE) and energy intake (Target) is too small.
   * @param currentTDEE Measured adaptive TDEE
   * @param dailyIntake Average daily calorie intake (or user target)
   * @param threshold Deficit threshold below which loss stalls (default 100 kcal)
   * @returns boolean
   */
  predictPlateau(currentTDEE: number, dailyIntake: number, threshold = 100): boolean {
    const deficit = currentTDEE - dailyIntake;
    // Plateau occurs when the deficit is too small to drive meaningful weight loss
    return deficit <= threshold;
  }

  /**
   * Calculate Weight Trajectory Projection with metabolic slowdown.
   * As weight decreases, TDEE also decreases due to smaller body mass
   * and adaptive thermogenesis (~22 kcal per kg of weight lost).
   * @param currentWeight Starting trend weight
   * @param targetDailyCalories Macro target calories
   * @param realTDEE Adaptive TDEE at the start
   * @param days Number of days to project
   * @param decayFactor Metabolic slowdown factor (default 22 kcal/kg)
   */
  getTrajectory(
    currentWeight: number,
    targetDailyCalories: number,
    realTDEE: number,
    days = 30,
    decayFactor = 22,
  ): { day: number; weight: number }[] {
    const trajectory: { day: number; weight: number }[] = [];
    let movingWeight = currentWeight;
    const initialWeight = currentWeight;

    for (let i = 0; i <= days; i++) {
      // Calculate dynamic TDEE based on weight lost
      const weightLost = initialWeight - movingWeight;
      const dynamicTDEE = realTDEE - weightLost * decayFactor;
      const dailyDeficit = dynamicTDEE - targetDailyCalories;

      trajectory.push({
        day: i,
        weight: Number(movingWeight.toFixed(2)),
      });

      // Weight change = deficit / 7700
      movingWeight -= dailyDeficit / 7700;
    }

    return trajectory;
  }
}
