import { useRef, useState } from 'react';
import { mealsApi } from '../services/api';
import { MealAnalysis } from '../../../shared/types';
import './AddMealButton.css';

interface AddMealButtonProps {
  onMealAnalyzed: (analysis: MealAnalysis, file: File) => void;
}

export function AddMealButton({ onMealAnalyzed }: AddMealButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const analysis = await mealsApi.analyzeMeal(file);
      onMealAnalyzed(analysis, file);
    } catch (error) {
      console.error('Error analyzing meal:', error);
      alert('Failed to analyze meal image. Please try again.');
    } finally {
      setLoading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
      <button
        className="add-meal-button"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? 'Analyzing...' : '📸 Take Photo & Analyze Meal'}
      </button>
    </>
  );
}

