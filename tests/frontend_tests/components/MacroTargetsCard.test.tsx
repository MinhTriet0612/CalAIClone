import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

// Mock MUI components to avoid complex setup
vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material');
  return {
    ...actual,
  };
});

import { MacroTargetsCard } from '../../../frontend/src/components/MacroTargetsCard';

describe('MacroTargetsCard Component', () => {
  const defaultProps = {
    targets: { calories: 2000, protein: 150, carbs: 250, fats: 65 },
    consumed: { calories: 1200, protein: 90, carbs: 150, fats: 40 },
    remaining: { calories: 800, protein: 60, carbs: 100, fats: 25 },
  };

  it('should render without crashing', () => {
    const { container } = render(<MacroTargetsCard {...defaultProps} />);
    expect(container).toBeDefined();
  });

  it('should display calorie information', () => {
    render(<MacroTargetsCard {...defaultProps} />);

    // Check that calorie numbers appear in the document
    const content = document.body.textContent || '';
    expect(content).toContain('1200');
    expect(content).toContain('2000');
  });

  it('should display macro nutrients', () => {
    render(<MacroTargetsCard {...defaultProps} />);

    const content = document.body.textContent || '';
    // Should show protein, carbs, fats info
    expect(content).toContain('90');
    expect(content).toContain('150');
    expect(content).toContain('40');
  });

  it('should handle zero consumed values', () => {
    const zeroProps = {
      targets: { calories: 2000, protein: 150, carbs: 250, fats: 65 },
      consumed: { calories: 0, protein: 0, carbs: 0, fats: 0 },
      remaining: { calories: 2000, protein: 150, carbs: 250, fats: 65 },
    };

    const { container } = render(<MacroTargetsCard {...zeroProps} />);
    expect(container).toBeDefined();
  });

  it('should handle over-consumed values', () => {
    const overProps = {
      targets: { calories: 2000, protein: 150, carbs: 250, fats: 65 },
      consumed: { calories: 2500, protein: 180, carbs: 300, fats: 90 },
      remaining: { calories: 0, protein: 0, carbs: 0, fats: 0 },
    };

    const { container } = render(<MacroTargetsCard {...overProps} />);
    expect(container).toBeDefined();
  });

  it('should display health score when provided', () => {
    const propsWithScore = {
      ...defaultProps,
      healthScore: 7,
    };

    render(<MacroTargetsCard {...propsWithScore} />);

    const content = document.body.textContent || '';
    expect(content).toContain('7');
  });
});
