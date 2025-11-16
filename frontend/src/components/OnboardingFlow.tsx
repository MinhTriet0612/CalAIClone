import { useState } from 'react';
import { onboardingApi, type OnboardingData } from '../services/api';
import type { MacroTargets } from '../../../shared/types';
import './OnboardingFlow.css';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recommendations, setRecommendations] = useState<MacroTargets | null>(null);

  const [formData, setFormData] = useState<OnboardingData>({
    gender: 'male',
    height: 175,
    weight: 70,
    birthDate: new Date(new Date().setFullYear(new Date().getFullYear() - 30)).toISOString().split('T')[0],
    workoutsPerWeek: 3,
    goal: 'weight_loss',
  });

  const handleNext = async () => {
    if (step === 5) {
      // Calculate recommendations
      setLoading(true);
      setError('');
      try {
        const recs = await onboardingApi.calculateRecommendations(formData);
        setRecommendations(recs);
        setStep(6);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to calculate recommendations');
      } finally {
        setLoading(false);
      }
    } else {
      setStep(step + 1);
    }
  };

  const handleApprove = async () => {
    if (!recommendations) return;

    setLoading(true);
    setError('');
    try {
      await onboardingApi.approveRecommendations(recommendations);
      onComplete();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save recommendations');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-card">
        {error && <div className="error-message">{error}</div>}

        {/* Step 1: Gender */}
        {step === 1 && (
          <div className="onboarding-step">
            <h2>Choose your Gender</h2>
            <p className="subtitle">This will be used to calibrate your custom plan.</p>
            <div className="option-list">
              {['male', 'female', 'other'].map((gender) => (
                <button
                  key={gender}
                  className={`option-button ${formData.gender === gender ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, gender: gender as any })}
                >
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Height & Weight */}
        {step === 2 && (
          <div className="onboarding-step">
            <h2>Height & Weight</h2>
            <p className="subtitle">This will be used to calibrate your custom plan.</p>
            <div className="form-group">
              <label>Height (cm)</label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) || 0 })}
                min="100"
                max="250"
              />
            </div>
            <div className="form-group">
              <label>Weight (kg)</label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) || 0 })}
                min="30"
                max="300"
              />
            </div>
          </div>
        )}

        {/* Step 3: Birth Date */}
        {step === 3 && (
          <div className="onboarding-step">
            <h2>When were you born?</h2>
            <p className="subtitle">This will be used to calibrate your custom plan.</p>
            <div className="form-group">
              <label>Birth Date</label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        )}

        {/* Step 4: Workouts per week */}
        {step === 4 && (
          <div className="onboarding-step">
            <h2>How many workouts do you do per week?</h2>
            <p className="subtitle">This will be used to calibrate your custom plan.</p>
            <div className="option-list">
              {[
                { label: '0-2 Workouts / week', value: 1 },
                { label: '3-5 Workouts / week', value: 3 },
                { label: '6+ Dedicated athlete', value: 6 },
              ].map((option) => (
                <button
                  key={option.value}
                  className={`option-button ${formData.workoutsPerWeek === option.value ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, workoutsPerWeek: option.value })}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Goal */}
        {step === 5 && (
          <div className="onboarding-step">
            <h2>What is your goal?</h2>
            <p className="subtitle">This helps us generate a plan for your calorie intake.</p>
            <div className="option-list">
              {[
                { label: 'Lose weight', value: 'weight_loss' },
                { label: 'Maintain', value: 'maintenance' },
                { label: 'Gain weight', value: 'muscle_gain' },
              ].map((option) => (
                <button
                  key={option.value}
                  className={`option-button ${formData.goal === option.value ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, goal: option.value as any })}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 6: Recommendations */}
        {step === 6 && recommendations && (
          <div className="onboarding-step">
            <h2>Your Custom Plan is Ready!</h2>
            <p className="subtitle">Here are your daily recommendations:</p>
            <div className="recommendations-card">
              <div className="recommendation-item">
                <span className="label">Calories</span>
                <span className="value">{recommendations.calories} cal</span>
              </div>
              <div className="recommendation-item">
                <span className="label">Protein</span>
                <span className="value">{recommendations.protein}g</span>
              </div>
              <div className="recommendation-item">
                <span className="label">Carbs</span>
                <span className="value">{recommendations.carbs}g</span>
              </div>
              <div className="recommendation-item">
                <span className="label">Fats</span>
                <span className="value">{recommendations.fats}g</span>
              </div>
            </div>
            <p className="info-text">Click "Approve" to save these recommendations and start tracking!</p>
          </div>
        )}

        {/* Navigation */}
        <div className="onboarding-navigation">
          {step > 1 && step < 6 && (
            <button onClick={handleBack} className="back-button" disabled={loading}>
              Back
            </button>
          )}
          {step < 6 ? (
            <button onClick={handleNext} className="continue-button" disabled={loading}>
              {loading ? 'Calculating...' : 'Continue'}
            </button>
          ) : (
            <button onClick={handleApprove} className="approve-button" disabled={loading || !recommendations}>
              {loading ? 'Saving...' : 'Approve & Start'}
            </button>
          )}
        </div>

        {/* Progress indicator */}
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(step / 6) * 100}%` }} />
        </div>
      </div>
    </div>
  );
}

