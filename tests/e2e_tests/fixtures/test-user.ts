export const TEST_USER = {
  email: `e2e-test-${Date.now()}@example.com`,
  password: 'TestPassword123!',
};

export const ONBOARDING_DATA = {
  gender: 'male' as const,
  height: 180,
  weight: 80,
  birthDate: '1994-06-15',
  workoutsPerWeek: 4,
  goal: 'maintenance' as const,
};
