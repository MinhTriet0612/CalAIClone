import { MacroTargets } from '../../../shared/types';
import './MacroTargetsCard.css';

interface MacroTargetsCardProps {
  date: string;
  targets: MacroTargets;
  consumed: MacroTargets;
  remaining: MacroTargets;
  onPrevDate?: () => void;
  onNextDate?: () => void;
}

export function MacroTargetsCard({ 
  date, 
  targets, 
  consumed, 
  remaining, 
  onPrevDate,
  onNextDate
}: MacroTargetsCardProps) {

  const formatDateLabel = (dateStr: string) => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (dateStr === today) return 'Today';
    if (dateStr === yesterdayStr) return 'Yesterday';

    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
        <div className="date-navigator">
          <button className="nav-btn" onClick={onPrevDate} aria-label="Previous Day">
            ❮
          </button>
          <div className="date-display">
            <h2>{formatDateLabel(date)}</h2>
            <p>{date}</p>
          </div>
          <button className="nav-btn" onClick={onNextDate} aria-label="Next Day">
            ❯
          </button>
        </div>
        
        <div className="header-actions">
        </div>
      </div>

      <MacroBar
        label="Calories"
        target={targets.calories}
        consumed={consumed.calories}
        remaining={remaining.calories}
        unit="cal"
        color="blue"
      />

      <div className="macros-grid">
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
    </div>
  );
}

