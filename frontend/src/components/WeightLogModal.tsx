import React, { useState } from 'react';
import './WeightLogModal.css';
import { weightLogsApi } from '../services/api';

interface WeightLogModalProps {
  onClose: () => void;
  onSuccess: (newTrend: number) => void;
}

const WeightLogModal: React.FC<WeightLogModalProps> = ({ onClose, onSuccess }) => {
  const [weight, setWeight] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const weightNum = parseFloat(weight);
    
    if (isNaN(weightNum) || weightNum <= 0) {
      setError('Please enter a valid weight');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await weightLogsApi.logWeight(weightNum);
      onSuccess(result.trendWeight);
      onClose();
    } catch (err) {
      console.error('Error logging weight:', err);
      setError('Failed to log weight. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="weight-log-modal">
        <div className="modal-header">
          <h2>Log Scale Weight</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="weight">Daily Weight (kg)</label>
            <input
              type="number"
              id="weight"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g. 75.5"
              autoFocus
            />
          </div>

          {error && <p className="error-message">{error}</p>}
          
          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Saving...' : 'Save & Calculate Trend'}
            </button>
          </div>
        </form>

        <div className="scientific-note">
          <p>
            <strong>Note:</strong> We apply an Exponential Moving Average (EMA) to your entries 
            to filter out daily water weight fluctuations, providing a more accurate trend for coaching.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeightLogModal;
