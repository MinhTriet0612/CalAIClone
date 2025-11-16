import { useState, useEffect } from 'react';
import { mealsApi } from '../services/api';
import type { DailySummary } from '../../../shared/types';
import './History.css';

export function History() {
  const [history, setHistory] = useState<DailySummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 7); // Default to last 7 days
    return date.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  const loadHistory = async () => {
    if (!startDate || !endDate) return;

    setLoading(true);
    setError('');
    try {
      const data = await mealsApi.getHistory(startDate, endDate);
      setHistory(data);
    } catch (err: any) {
      console.error('Error loading history:', err);
      if (err.response?.status === 401) {
        return; // Interceptor will handle redirect
      }
      setError(err.response?.data?.message || 'Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCalorieStatus = (target: number, consumed: number) => {
    const percentage = (consumed / target) * 100;
    if (percentage >= 100) return 'over';
    if (percentage >= 80) return 'good';
    return 'low';
  };

  return (
    <div className="history-container">
      <div className="history-header">
        <h2>History</h2>
        <div className="history-filters">
          <div className="filter-group">
            <label>From</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={endDate}
            />
          </div>
          <div className="filter-group">
            <label>To</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
          <button onClick={loadHistory} className="load-button" disabled={loading}>
            {loading ? 'Loading...' : 'Load'}
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading && history.length === 0 ? (
        <div className="loading">Loading history...</div>
      ) : history.length === 0 ? (
        <div className="empty-history">
          <p>No data found for the selected date range.</p>
        </div>
      ) : (
        <div className="history-list">
          {history.map((summary) => {
            const calorieStatus = getCalorieStatus(summary.targets.calories, summary.consumed.calories);
            const isToday = summary.date === new Date().toISOString().split('T')[0];

            return (
              <div key={summary.date} className={`history-item ${isToday ? 'today' : ''}`}>
                <div className="history-date">
                  {formatDate(summary.date)}
                  {isToday && <span className="today-badge">Today</span>}
                </div>
                <div className="history-stats">
                  <div className="stat-row">
                    <span className="stat-label">Target:</span>
                    <span className="stat-value">{summary.targets.calories} cal</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Consumed:</span>
                    <span className={`stat-value ${calorieStatus}`}>
                      {summary.consumed.calories} cal
                    </span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Remaining:</span>
                    <span className={`stat-value ${summary.remaining.calories < 0 ? 'over' : ''}`}>
                      {summary.remaining.calories} cal
                    </span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Meals:</span>
                    <span className="stat-value">{summary.meals.length}</span>
                  </div>
                </div>
                <div className="history-progress">
                  <div className="progress-bar-container">
                    <div 
                      className={`progress-bar consumed ${calorieStatus}`}
                      style={{ 
                        width: summary.targets.calories > 0 
                          ? `${Math.min(100, Math.max(0, (summary.consumed.calories / summary.targets.calories) * 100))}%` 
                          : '0%'
                      }}
                    />
                    {summary.remaining.calories > 0 && (
                      <div 
                        className="progress-bar remaining"
                        style={{ 
                          width: summary.targets.calories > 0 
                            ? `${Math.min(100, Math.max(0, (summary.remaining.calories / summary.targets.calories) * 100))}%` 
                            : '0%'
                        }}
                      />
                    )}
                  </div>
                  <span className="progress-text">
                    {summary.targets.calories > 0 
                      ? `${Math.round((summary.consumed.calories / summary.targets.calories) * 100)}%`
                      : '0%'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

