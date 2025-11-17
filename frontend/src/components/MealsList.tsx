import { useState } from 'react';
import { Meal } from '../../../shared/types';
import './MealsList.css';

interface MealsListProps {
  meals: Meal[];
}

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

function ImageModal({ imageUrl, onClose }: ImageModalProps) {
  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="image-modal-close" onClick={onClose}>×</button>
        <img src={imageUrl} alt="Meal" className="image-modal-image" />
      </div>
    </div>
  );
}

const getMealTime = (meal: Meal) => {
  const candidate = meal as unknown as Record<string, unknown>;
  const potentialKeys = ['loggedAt', 'time', 'recordedAt'];

  for (const key of potentialKeys) {
    const value = candidate[key];
    if (typeof value === 'string' && value.trim()) {
      return value;
    }
  }

  return undefined;
};

export function MealsList({ meals }: MealsListProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (meals.length === 0) {
    return (
      <div className="meals-list empty">
        <p>No meals logged today. Take a photo to get started!</p>
      </div>
    );
  }

  return (
    <>
      <div className="meals-list">
        <h3>Recently uploaded</h3>
        {meals.map((meal) => {
          const mealTime = getMealTime(meal);

          return (
            <article key={meal.id} className="meal-card">
              <div
                className={`meal-image${meal.imageUrl ? '' : ' meal-image--empty'}`}
                onClick={() => meal.imageUrl && setSelectedImage(meal.imageUrl)}
                role={meal.imageUrl ? 'button' : undefined}
                tabIndex={meal.imageUrl ? 0 : -1}
                aria-label={meal.imageUrl ? `View image of ${meal.name}` : undefined}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && meal.imageUrl) {
                    setSelectedImage(meal.imageUrl);
                  }
                }}
              >
                {meal.imageUrl ? (
                  <img
                    src={meal.imageUrl}
                    alt={meal.name}
                    onError={(event) => {
                      (event.target as HTMLImageElement).style.visibility = 'hidden';
                    }}
                  />
                ) : (
                  <span>Photo</span>
                )}
              </div>
              <div className="meal-details">
                <div className="meal-top-row">
                  <div className="meal-title-group">
                    <span className="meal-name" title={meal.name}>
                      {meal.name}
                    </span>
                    <div className="meal-subtitle-row">
                      {mealTime && <span className="meal-time">{mealTime}</span>}
                      {meal.healthScore !== undefined && (
                        <span className="meal-health-pill" title={`Health Score: ${meal.healthScore}/10`}>
                          ⭐ {meal.healthScore}/10
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="meal-calories-chip">🔥 {meal.calories} calories</span>
                </div>
                <p className="meal-items">{meal.foodItems.join(', ')}</p>
                <div className="meal-macro-row">
                  <span className="macro-chip protein">
                    <span className="macro-icon" aria-hidden="true">🍗</span>
                    {meal.protein}g
                  </span>
                  <span className="macro-chip carbs">
                    <span className="macro-icon" aria-hidden="true">🌾</span>
                    {meal.carbs}g
                  </span>
                  <span className="macro-chip fats">
                    <span className="macro-icon" aria-hidden="true">💧</span>
                    {meal.fats}g
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}

