import React, { useState, useEffect } from 'react';
import { dailyTargetsApi } from '../services/api';
import type { MacroTargets } from '../../../shared/types';
import './DailyTargetModal.css';

interface DailyTargetModalProps {
  date: string;
  currentKcal: number;
  initialTargets: MacroTargets;
  onClose: () => void;
  onUpdated: (newTargets: MacroTargets) => void;
}

export const DailyTargetModal: React.FC<DailyTargetModalProps> = ({
  date,
  currentKcal,
  initialTargets,
  onClose,
  onUpdated,
}) => {
  const [formData, setFormData] = useState<MacroTargets>(initialTargets);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field: keyof MacroTargets, value: string) => {
    const numValue = parseInt(value) || 0;
    setFormData((prev) => ({ ...prev, [field]: numValue }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError('');
      await dailyTargetsApi.setTargets(date, formData);
      onUpdated(formData);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update daily targets');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Reset to your global default targets?')) return;
    try {
      setLoading(true);
      setError('');
      await dailyTargetsApi.deleteTargets(date);
      // After delete, the API will fall back to defaults. 
      // We should probably fetch the defaults or just notify the parent to refresh
      window.location.reload(); // Simplest way to refresh all components
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to reset daily targets');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="daily-modal-overlay" onClick={onClose}>
      <div className="daily-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Target for {date}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {error && <div className="modal-alert error">{error}</div>}

        <div className="modal-body">
          <p className="hint">Overrides your global plan for this date only.</p>
          
          <div className="target-input-group">
            <label>Calories (kcal)</label>
            <input 
              type="number" 
              value={formData.calories} 
              onChange={(e) => handleInputChange('calories', e.target.value)}
            />
          </div>

          <div className="macros-input-grid">
            <div className="target-input-group">
              <label>Protein (g)</label>
              <input 
                type="number" 
                value={formData.protein} 
                onChange={(e) => handleInputChange('protein', e.target.value)}
              />
            </div>
            <div className="target-input-group">
              <label>Carbs (g)</label>
              <input 
                type="number" 
                value={formData.carbs} 
                onChange={(e) => handleInputChange('carbs', e.target.value)}
              />
            </div>
            <div className="target-input-group">
              <label>Fats (g)</label>
              <input 
                type="number" 
                value={formData.fats} 
                onChange={(e) => handleInputChange('fats', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-reset" onClick={handleReset} disabled={loading}>
            Reset to Default
          </button>
          <div className="right-btns">
            <button className="btn-cancel" onClick={onClose}>Cancel</button>
            <button className="btn-save" onClick={handleSave} disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
