import { useEffect, useMemo, useState } from 'react';
import { onboardingApi, usersApi, type OnboardingData } from '../services/api';
import type { MacroTargets } from '../../../shared/types';
import './Settings.css';

interface SettingsProps {
  onTargetsUpdated: () => Promise<void> | void;
}

export function Settings({ onTargetsUpdated }: SettingsProps) {
  const defaultBirthDate = useMemo(
    () => new Date(new Date().setFullYear(new Date().getFullYear() - 28)).toISOString().split('T')[0],
    [],
  );

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentTargets, setCurrentTargets] = useState<MacroTargets | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [recommendations, setRecommendations] = useState<MacroTargets | null>(null);
  const [formData, setFormData] = useState<OnboardingData>({
    gender: 'male',
    height: 175,
    weight: 70,
    birthDate: defaultBirthDate,
    workoutsPerWeek: 3,
    goal: 'maintenance',
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const profile = await usersApi.getCurrentUser();
        setCurrentTargets({
          calories: profile.targetCalories,
          protein: profile.targetProtein,
          carbs: profile.targetCarbs,
          fats: profile.targetFats,
        });
      } catch (err: any) {
        console.error('Failed to load profile', err);
        setError(err.response?.data?.message || 'Unable to load user profile');
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleInputChange = <K extends keyof OnboardingData>(field: K, value: OnboardingData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRecommend = async () => {
    setError('');
    setSuccess('');
    setRecommendations(null);
    try {
      setLoading(true);
      const recs = await onboardingApi.calculateRecommendations(formData);
      setRecommendations(recs);
      setShowModal(true);
    } catch (err: any) {
      console.error('Failed to calculate recommendations', err);
      setError(err.response?.data?.message || 'Unable to generate a new recommendation');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!recommendations) return;
    try {
      setSaving(true);
      setError('');
      await onboardingApi.approveRecommendations(recommendations);
      setSuccess('Daily targets updated!');
      setCurrentTargets(recommendations);
      setShowModal(false);
      await onTargetsUpdated();
    } catch (err: any) {
      console.error('Failed to save recommendations', err);
      setError(err.response?.data?.message || 'Unable to save new targets');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="settings-container">
      <header className="settings-header">
        <div>
          <h2>Settings</h2>
          <p>Fine-tune your daily calorie and macro goals</p>
        </div>
        <div className="ai-hint">AI Planning powered by Cal AI</div>
      </header>

      {error && <div className="settings-alert error">{error}</div>}
      {success && <div className="settings-alert success">{success}</div>}

      <section className="settings-section">
        <h3>Current Targets</h3>
        {currentTargets ? (
          <div className="target-grid">
            <div className="target-card">
              <span>Calories</span>
              <strong>{currentTargets.calories} cal</strong>
            </div>
            <div className="target-card">
              <span>Protein</span>
              <strong>{currentTargets.protein} g</strong>
            </div>
            <div className="target-card">
              <span>Carbs</span>
              <strong>{currentTargets.carbs} g</strong>
            </div>
            <div className="target-card">
              <span>Fats</span>
              <strong>{currentTargets.fats} g</strong>
            </div>
          </div>
        ) : (
          <p className="muted">Loading current targets...</p>
        )}
      </section>

      <section className="settings-section">
        <h3>Customize Your Plan</h3>
        <p className="section-desc">
          Update your body metrics and goals. Cal AI reuses the onboarding formula to refresh your plan.
        </p>

        <div className="settings-form">
          <div className="form-row">
            <label>Gender</label>
            <div className="pill-group">
              {['male', 'female', 'other'].map((gender) => (
                <button
                  key={gender}
                  type="button"
                  className={`pill ${formData.gender === gender ? 'active' : ''}`}
                  onClick={() => handleInputChange('gender', gender as OnboardingData['gender'])}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label>Height (cm)</label>
              <input
                type="number"
                value={formData.height}
                min={120}
                max={250}
                onChange={(e) => handleInputChange('height', Number(e.target.value))}
              />
            </div>
            <div className="form-field">
              <label>Weight (kg)</label>
              <input
                type="number"
                value={formData.weight}
                min={35}
                max={250}
                onChange={(e) => handleInputChange('weight', Number(e.target.value))}
              />
            </div>
          </div>

          <div className="form-row">
            <label>Birth date</label>
            <input
              type="date"
              value={formData.birthDate}
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => handleInputChange('birthDate', e.target.value)}
            />
          </div>

          <div className="form-row">
            <label>Workouts / week</label>
            <div className="pill-group">
              {[
                { label: '0-2', value: 1 },
                { label: '3-5', value: 4 },
                { label: '6+', value: 6 },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`pill ${formData.workoutsPerWeek === option.value ? 'active' : ''}`}
                  onClick={() => handleInputChange('workoutsPerWeek', option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="form-row">
            <label>Goal</label>
            <div className="pill-group">
              {[
                { label: 'Lose weight', value: 'weight_loss' },
                { label: 'Maintain', value: 'maintenance' },
                { label: 'Gain weight', value: 'muscle_gain' },
                { label: 'Cutting', value: 'cutting' },
                { label: 'Health', value: 'health' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`pill ${formData.goal === option.value ? 'active' : ''}`}
                  onClick={() => handleInputChange('goal', option.value as OnboardingData['goal'])}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <button className="recommend-button" onClick={handleRecommend} disabled={loading}>
            {loading ? 'Calculating...' : 'Generate Recommendation'}
          </button>
        </div>
      </section>

      {showModal && recommendations && (
        <div className="settings-modal-overlay" onClick={() => !saving && setShowModal(false)}>
          <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => !saving && setShowModal(false)}>
              ×
            </button>
            <h3>AI Recommendation</h3>
            <p>Recommendation based on your updated inputs:</p>
            <div className="recommendation-grid">
              <div>
                <span>Calories</span>
                <strong>{recommendations.calories} cal</strong>
              </div>
              <div>
                <span>Protein</span>
                <strong>{recommendations.protein} g</strong>
              </div>
              <div>
                <span>Carbs</span>
                <strong>{recommendations.carbs} g</strong>
              </div>
              <div>
                <span>Fats</span>
                <strong>{recommendations.fats} g</strong>
              </div>
            </div>
            <p className="modal-hint">Approve to immediately update your dashboard targets.</p>
            <button className="approve-button" onClick={handleApprove} disabled={saving}>
              {saving ? 'Saving...' : 'Approve'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


