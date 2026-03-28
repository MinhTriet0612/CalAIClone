import { OnboardingService, OnboardingData } from '../../../backend/src/onboarding/onboarding.service';

describe('OnboardingService', () => {
  let service: OnboardingService;

  beforeEach(() => {
    service = new OnboardingService();
  });

  describe('calculateRecommendations', () => {
    it('should calculate recommendations for a male maintenance goal', () => {
      const data: OnboardingData = {
        gender: 'male',
        height: 180,
        weight: 80,
        birthDate: '1994-01-01',
        workoutsPerWeek: 4,
        goal: 'maintenance',
      };

      const result = service.calculateRecommendations(data);

      expect(result.calories).toBeGreaterThan(0);
      expect(result.protein).toBeGreaterThan(0);
      expect(result.carbs).toBeGreaterThan(0);
      expect(result.fats).toBeGreaterThan(0);
      // Maintenance should be near TDEE
      expect(result.calories).toBeGreaterThan(2000);
    });

    it('should calculate lower calories for weight loss', () => {
      const baseData: OnboardingData = {
        gender: 'male',
        height: 180,
        weight: 80,
        birthDate: '1994-01-01',
        workoutsPerWeek: 4,
        goal: 'maintenance',
      };

      const lossData: OnboardingData = {
        ...baseData,
        goal: 'weight_loss',
      };

      const maintenance = service.calculateRecommendations(baseData);
      const weightLoss = service.calculateRecommendations(lossData);

      expect(weightLoss.calories).toBeLessThan(maintenance.calories);
      expect(maintenance.calories - weightLoss.calories).toBe(500);
    });

    it('should calculate higher calories for muscle gain', () => {
      const baseData: OnboardingData = {
        gender: 'male',
        height: 180,
        weight: 80,
        birthDate: '1994-01-01',
        workoutsPerWeek: 4,
        goal: 'maintenance',
      };

      const gainData: OnboardingData = {
        ...baseData,
        goal: 'muscle_gain',
      };

      const maintenance = service.calculateRecommendations(baseData);
      const muscleGain = service.calculateRecommendations(gainData);

      expect(muscleGain.calories).toBeGreaterThan(maintenance.calories);
      expect(muscleGain.calories - maintenance.calories).toBe(500);
    });

    it('should calculate higher protein for muscle gain', () => {
      const maintenanceData: OnboardingData = {
        gender: 'male',
        height: 180,
        weight: 80,
        birthDate: '1994-01-01',
        workoutsPerWeek: 4,
        goal: 'maintenance',
      };

      const gainData: OnboardingData = {
        ...maintenanceData,
        goal: 'muscle_gain',
      };

      const maintenance = service.calculateRecommendations(maintenanceData);
      const muscleGain = service.calculateRecommendations(gainData);

      // Muscle gain: 2.2g/kg, Maintenance: 1.8g/kg
      expect(muscleGain.protein).toBeGreaterThan(maintenance.protein);
      expect(muscleGain.protein).toBe(Math.round(80 * 2.2));
    });

    it('should handle female gender', () => {
      const data: OnboardingData = {
        gender: 'female',
        height: 165,
        weight: 60,
        birthDate: '1996-06-15',
        workoutsPerWeek: 3,
        goal: 'maintenance',
      };

      const result = service.calculateRecommendations(data);

      expect(result.calories).toBeGreaterThan(0);
      expect(result.calories).toBeLessThan(3000);
    });

    it('should handle "other" gender as average of male/female', () => {
      const maleData: OnboardingData = {
        gender: 'male',
        height: 175,
        weight: 70,
        birthDate: '1995-01-01',
        workoutsPerWeek: 3,
        goal: 'maintenance',
      };

      const femaleData: OnboardingData = { ...maleData, gender: 'female' };
      const otherData: OnboardingData = { ...maleData, gender: 'other' };

      const male = service.calculateRecommendations(maleData);
      const female = service.calculateRecommendations(femaleData);
      const other = service.calculateRecommendations(otherData);

      // "Other" should be between male and female
      expect(other.calories).toBeGreaterThanOrEqual(female.calories);
      expect(other.calories).toBeLessThanOrEqual(male.calories);
    });

    it('should map activity levels correctly from workouts per week', () => {
      const sedentary: OnboardingData = {
        gender: 'male',
        height: 180,
        weight: 80,
        birthDate: '1994-01-01',
        workoutsPerWeek: 1,
        goal: 'maintenance',
      };

      const active: OnboardingData = { ...sedentary, workoutsPerWeek: 7 };

      const sedentaryResult = service.calculateRecommendations(sedentary);
      const activeResult = service.calculateRecommendations(active);

      expect(activeResult.calories).toBeGreaterThan(sedentaryResult.calories);
    });

    it('should handle cutting goal same as weight loss', () => {
      const lossData: OnboardingData = {
        gender: 'male',
        height: 180,
        weight: 80,
        birthDate: '1994-01-01',
        workoutsPerWeek: 4,
        goal: 'weight_loss',
      };

      const cuttingData: OnboardingData = { ...lossData, goal: 'cutting' };

      const loss = service.calculateRecommendations(lossData);
      const cutting = service.calculateRecommendations(cuttingData);

      expect(cutting.calories).toBe(loss.calories);
    });
  });
});
