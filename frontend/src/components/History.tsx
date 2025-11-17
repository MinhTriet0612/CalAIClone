import { useState, useEffect, useMemo } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { mealsApi } from '../services/api';
import type { DailySummary } from '../../../shared/types';
import './History.css';

const TABS = [
  { id: 'history', label: 'History' },
  { id: 'analytics', label: 'Analytics' },
];

const RANGE_OPTIONS = [
  { label: '1 Week', value: 7 },
  { label: '2 Week', value: 14 },
  { label: '3 Week', value: 21 },
  { label: '1 Month', value: 30 },
];

const MACRO_CALORIES = {
  protein: 4,
  carbs: 4,
  fats: 9,
};

export function History() {
  const [history, setHistory] = useState<DailySummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<string>(TABS[0].id);
  const [chartRange, setChartRange] = useState(RANGE_OPTIONS[0].value);
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

  const sortedHistory = useMemo(
    () =>
      [...history].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      ),
    [history]
  );

  const totalDaysAvailable = sortedHistory.length;

  useEffect(() => {
    if (!totalDaysAvailable) return;
    if (chartRange > totalDaysAvailable) {
      const fallback =
        [...RANGE_OPTIONS]
          .reverse()
          .find((option) => option.value <= totalDaysAvailable)?.value ||
        RANGE_OPTIONS[0].value;
      setChartRange(fallback);
    }
  }, [chartRange, totalDaysAvailable]);

  const chartHistory = useMemo(
    () => sortedHistory.slice(-chartRange),
    [sortedHistory, chartRange]
  );

  const chartStacks = useMemo(() => {
    return chartHistory.map((summary) => {
      const proteinCalories = summary.consumed.protein * MACRO_CALORIES.protein;
      const carbsCalories = summary.consumed.carbs * MACRO_CALORIES.carbs;
      const fatsCalories = summary.consumed.fats * MACRO_CALORIES.fats;
      const total = proteinCalories + carbsCalories + fatsCalories;
      return {
        date: summary.date,
        proteinCalories,
        carbsCalories,
        fatsCalories,
        totalCalories: total || summary.consumed.calories,
      };
    });
  }, [chartHistory]);

  const maxStackCalories =
    chartStacks.reduce(
      (max, stack) => Math.max(max, stack.totalCalories),
      0
    ) || 1;

  const chartMax = Math.max(
    500,
    Math.ceil(maxStackCalories / 100) * 100
  );

  const chartDataset = useMemo(
    () =>
      chartStacks.map((stack) => {
        const date = new Date(stack.date);
        const weekday = date.toLocaleDateString('en-US', {
          weekday: 'short',
        });
        const monthDay = date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        });
        return {
          axisLabel: `${weekday} ${monthDay}`,
          protein: Math.round(stack.proteinCalories),
          carbs: Math.round(stack.carbsCalories),
          fats: Math.round(stack.fatsCalories),
        };
      }),
    [chartStacks]
  );

  const chartSeries = useMemo(
    () => [
      {
        dataKey: 'protein',
        label: 'Protein',
        stack: 'macros',
        color: '#f87171',
        valueFormatter: (value: number | null) =>
          value ? `${value.toLocaleString()} cal` : '0 cal',
      },
      {
        dataKey: 'carbs',
        label: 'Carbs',
        stack: 'macros',
        color: '#f97316',
        valueFormatter: (value: number | null) =>
          value ? `${value.toLocaleString()} cal` : '0 cal',
      },
      {
        dataKey: 'fats',
        label: 'Fats',
        stack: 'macros',
        color: '#60a5fa',
        valueFormatter: (value: number | null) =>
          value ? `${value.toLocaleString()} cal` : '0 cal',
      },
    ],
    []
  );

  const totalCalories = chartHistory.reduce(
    (sum, summary) => sum + summary.consumed.calories,
    0
  );

  const avgCalories = chartHistory.length
    ? Math.round(totalCalories / chartHistory.length)
    : 0;

  const avgTargetCalories = chartHistory.length
    ? Math.round(
      chartHistory.reduce(
        (sum, summary) => sum + summary.targets.calories,
        0
      ) / chartHistory.length
    )
    : 0;

  const adherencePercent =
    avgTargetCalories > 0
      ? Math.min(200, Math.max(0, Math.round((avgCalories / avgTargetCalories) * 100)))
      : 0;

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
        <div className="history-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`history-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
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
          <button onClick={loadHistory} className="load-button" disabled={loading}
            style={{
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            Load
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {activeTab === 'analytics' && (
        <div className="history-stats-panel">
          <div className="stats-header">
            <div>
              <p className="stats-title">Nutritions</p>
              <span className="stats-subtitle">
                {avgTargetCalories > 0
                  ? `${adherencePercent}% vs target`
                  : 'Awaiting target data'}
              </span>
            </div>
            <div className="stats-range-tabs">
              {RANGE_OPTIONS.map((option) => {
                const disabled =
                  option.value !== RANGE_OPTIONS[0].value &&
                  option.value > totalDaysAvailable;
                return (
                  <button
                    key={option.value}
                    className={`range-tab ${chartRange === option.value ? 'active' : ''
                      }`}
                    disabled={disabled}
                    onClick={() => setChartRange(option.value)}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="stats-summary-row">
            <div className="summary-card">
              <p>Total calories</p>
              <strong>{totalCalories.toLocaleString()}</strong>
              <span>Selected range</span>
            </div>
            <div className="summary-card">
              <p>Daily avg.</p>
              <strong>{avgCalories.toLocaleString()}</strong>
              <span>vs {avgTargetCalories || 0} target</span>
            </div>
          </div>

          <div className="macro-chart">
            {chartDataset.length === 0 ? (
              <div className="chart-empty">No nutrition data in this range.</div>
            ) : (
              <BarChart
                dataset={chartDataset}
                xAxis={[
                  {
                    dataKey: 'axisLabel',
                    scaleType: 'band',
                    tickLabelStyle: { fontSize: 12 },
                  },
                ]}
                yAxis={[
                  {
                    max: chartMax,
                    valueFormatter: (value: number) =>
                      `${value.toLocaleString()} cal`,
                  },
                ]}
                series={chartSeries}
                height={320}
                margin={{ top: 20, bottom: 30, left: 60, right: 12 }}
              />
            )}
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <>
          {
            loading && history.length === 0 ? (
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
                  );
                })}
              </div>
            )
          }
        </>
      )}
    </div >
  );
}

