import { MealAnalysis, MacroTargets } from '../../../shared/types';
import './MealAnalysisModal.css';

export interface MealAnalysisModalProps {
  meal: MealAnalysis;
  currentRemaining: MacroTargets;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
  onReAnalyze?: () => void | Promise<void>;
  analyzing?: boolean;
}

export function MealAnalysisModal({
  meal,
  currentRemaining,
  onConfirm,
  onCancel,
  onReAnalyze,
  analyzing = false,
}: MealAnalysisModalProps) {
  // Calculate projected remaining after this meal
  const projectedRemaining: MacroTargets = {
    calories: currentRemaining.calories - meal.calories,
    protein: currentRemaining.protein - meal.protein,
    carbs: currentRemaining.carbs - meal.carbs,
    fats: currentRemaining.fats - meal.fats,
  };

  if (!meal.isFood) {
    return (
      <div className="modal-overlay" onClick={onCancel}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h3>⚠️ No Food Detected</h3>
          <p style={{ color: '#e74c3c', margin: '20px 0' }}>
            The image does not appear to contain food items. Please upload an image of a meal or food.
          </p>
          <div className="modal-actions">
            <button onClick={onCancel} className="cancel-btn">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={analyzing ? undefined : onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {analyzing ? (
          <>
            <h3>Re-analyzing Meal...</h3>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div className="loading">Analyzing image...</div>
            </div>
          </>
        ) : (
          <>
            <h3>Meal Detected</h3>

            {meal.imageUrl && (
              <div className="meal-image-container">
                <img 
                  src={meal.imageUrl} 
                  alt="Meal" 
                  className="meal-image"
                  onError={(e) => {
                    // Hide image if it fails to load
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}

        <div className="detected-items">
          <h4>Food Items:</h4>
          <ul>
            {meal.foodItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="meal-breakdown">
          <h4>Nutritional Breakdown:</h4>
          <div className="meal-macros">
            <div>
              Calories: <strong>{meal.calories} cal</strong>
            </div>
            <div>
              Protein: <strong>{meal.protein} g</strong>
            </div>
            <div>
              Carbs: <strong>{meal.carbs} g</strong>
            </div>
            <div>
              Fats: <strong>{meal.fats} g</strong>
            </div>
            {meal.healthScore !== undefined && (
              <div style={{ 
                marginTop: '10px', 
                padding: '8px', 
                backgroundColor: meal.healthScore >= 7 ? '#d4edda' : meal.healthScore >= 5 ? '#fff3cd' : '#f8d7da',
                borderRadius: '4px'
              }}>
                Health Score: <strong>{meal.healthScore}/10</strong>
              </div>
            )}
          </div>
        </div>

        <div className="projected-remaining">
          <h4>After adding this meal, you'll have:</h4>
          <div className="remaining-macros">
            <div className={projectedRemaining.calories < 0 ? 'negative' : ''}>
              Calories: <strong>{projectedRemaining.calories} cal</strong>
            </div>
            <div className={projectedRemaining.protein < 0 ? 'negative' : ''}>
              Protein: <strong>{projectedRemaining.protein} g</strong>
            </div>
            <div className={projectedRemaining.carbs < 0 ? 'negative' : ''}>
              Carbs: <strong>{projectedRemaining.carbs} g</strong>
            </div>
            <div className={projectedRemaining.fats < 0 ? 'negative' : ''}>
              Fats: <strong>{projectedRemaining.fats} g</strong>
            </div>
          </div>
        </div>

            <div className="modal-actions">
              <button 
                onClick={onReAnalyze || onCancel} 
                className="cancel-btn"
                disabled={analyzing}
              >
                Re-analyze
              </button>
              <button 
                onClick={onConfirm} 
                className="confirm-btn"
                disabled={analyzing}
              >
                Confirm & Add Meal
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

