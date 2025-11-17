import { MacroTargets } from '../../../shared/types';
import './MacroTargetsCard.css';

interface MacroTargetsCardProps {
  targets: MacroTargets;
  consumed: MacroTargets;
  remaining: MacroTargets;
  healthScore?: number;
}

export function MacroTargetsCard({ targets, consumed, remaining, healthScore }: MacroTargetsCardProps) {
  const getHealthScoreColor = (score?: number) => {
    if (!score) return '#999';
    if (score >= 8) return '#4CAF50'; // Green
    if (score >= 6) return '#FF9800'; // Orange
    return '#F44336'; // Red
  };

  const getHealthScoreLabel = (score?: number) => {
    if (!score) return 'N/A';
    if (score >= 9) return 'Excellent';
    if (score >= 7) return 'Good';
    if (score >= 5) return 'Fair';
    return 'Poor';
  };
  const MacroBar = ({ 
    label, 
    target, 
    consumed, 
    remaining, 
    unit, 
    color 
  }: { 
    label: string; 
    target: number; 
    consumed: number; 
    remaining: number; 
    unit: string; 
    color: string;
  }) => {
    const percentage = (consumed / target) * 100;
    const isOver = consumed > target;
    const overAmount = Math.max(0, consumed - target);
    const remainingText = isOver ? `${overAmount} ${unit} over` : `${remaining} ${unit} left`;

    return (
      <div className="macro-bar">
        <div className="macro-header">
          <span className="label">{label}</span>
          <span className={`remaining ${isOver ? 'over' : ''}`}>{remainingText}</span>
        </div>

        <div className={`progress-bar ${isOver ? 'over' : ''}`}>
          <div
            className={`progress-fill ${color} ${isOver ? 'over' : ''}`}
            style={{ width: `${Math.min(100, percentage)}%` }}
          />
        </div>

        <div className="macro-numbers">
          <span>{consumed}</span>
          <span>/</span>
          <span>{target} {unit}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="macro-targets-card">
      <div className="card-header">
        <h2>Today's Goals</h2>
        {healthScore !== undefined && (
          <div className="health-score-badge" style={{ backgroundColor: getHealthScoreColor(healthScore) }}>
            <span className="health-score-value">{healthScore.toFixed(1)}</span>
            <span className="health-score-label">{getHealthScoreLabel(healthScore)}</span>
          </div>
        )}
      </div>

      <MacroBar
        label="Calories"
        target={targets.calories}
        consumed={consumed.calories}
        remaining={remaining.calories}
        unit="cal"
        color="blue"
      />

      <MacroBar
        label="Protein"
        target={targets.protein}
        consumed={consumed.protein}
        remaining={remaining.protein}
        unit="g"
        color="purple"
      />

      <MacroBar
        label="Carbs"
        target={targets.carbs}
        consumed={consumed.carbs}
        remaining={remaining.carbs}
        unit="g"
        color="yellow"
      />

      <MacroBar
        label="Fats"
        target={targets.fats}
        consumed={consumed.fats}
        remaining={remaining.fats}
        unit="g"
        color="green"
      />
    </div>
  );
}

