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
        <h3>Meals Logged Today</h3>
        {meals.map((meal) => {
          const getHealthScoreColor = (score?: number) => {
            if (!score) return '#999';
            if (score >= 8) return '#4CAF50';
            if (score >= 6) return '#FF9800';
            return '#F44336';
          };

          return (
            <div key={meal.id} className="meal-item">
              <div className="meal-content">
                <div className="meal-info">
                  <div className="meal-header">
                    <span className="meal-name">{meal.name}</span>
                    <div className="meal-header-right">
                      {meal.healthScore !== undefined && (
                        <span 
                          className="meal-health-score"
                          style={{ color: getHealthScoreColor(meal.healthScore) }}
                          title={`Health Score: ${meal.healthScore}/10`}
                        >
                          ⭐ {meal.healthScore}
                        </span>
                      )}
                      <span className="meal-calories">{meal.calories} cal</span>
                    </div>
                  </div>
                  <div className="meal-items">
                    {meal.foodItems.join(', ')}
                  </div>
                  <div className="meal-macros">
                    <span>{meal.protein}g P</span>
                    <span>{meal.carbs}g C</span>
                    <span>{meal.fats}g F</span>
                  </div>
                </div>
                {meal.imageUrl && (
                  <div 
                    className="meal-image-thumbnail"
                    onClick={() => setSelectedImage(meal.imageUrl || null)}
                  >
                    <img 
                      src={meal.imageUrl} 
                      alt={meal.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
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

