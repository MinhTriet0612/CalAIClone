import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import { OnboardingFlow } from './components/OnboardingFlow';
import { MacroTargetsCard } from './components/MacroTargetsCard';
import { MealsList } from './components/MealsList';
import { History } from './components/History';
import { AddMealButton } from './components/AddMealButton';
import { MealAnalysisModal } from './components/MealAnalysisModal';
import { MeatChat } from './components/MeatChat';
import { Settings } from './components/Settings';
import { mealsApi, usersApi } from './services/api';
import { DailySummary, MealAnalysis } from '../../shared/types';
import './App.css';

function AppContent() {
  const { currentUser, logout, token } = useAuth();
  const [dailySummary, setDailySummary] = useState<DailySummary | null>(null);
  const [pendingMeal, setPendingMeal] = useState<MealAnalysis | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState<boolean | null>(null);
  const [currentDate, setCurrentDate] = useState(() => new Date().toISOString().split('T')[0]);

  useEffect(() => {
    // Check if user needs onboarding
    if (currentUser && token) {
      checkOnboardingStatus();
    }
  }, [currentUser, token]);

  const checkOnboardingStatus = async () => {
    try {
      const userData = await usersApi.getCurrentUser();
      // Check if user has default targets (means onboarding not completed)
      const hasCustomTargets = userData.targetCalories !== 2000 || 
                                userData.targetProtein !== 150 ||
                                userData.targetCarbs !== 250 ||
                                userData.targetFats !== 65;
      setNeedsOnboarding(!hasCustomTargets);
      
      if (hasCustomTargets) {
        loadDailySummary();
      }
    } catch (error: any) {
      console.error('Error checking onboarding status:', error);
      if (error.response?.status === 401) {
        return; // Interceptor will handle redirect
      }
      setNeedsOnboarding(true); // Default to showing onboarding on error
    } finally {
      setLoading(false);
    }
  };

  const loadDailySummary = async (date?: string) => {
    try {
      setLoading(true);
      const targetDate = date || currentDate;
      console.log(`📊 Loading daily summary for ${targetDate}...`);
      const summary = await mealsApi.getDailySummary(targetDate);
      console.log('✅ Daily summary loaded:', summary);
      setDailySummary(summary);
    } catch (error: any) {
      console.error('❌ Error loading daily summary:', error);
      
      // If it's a 401 error, the interceptor will handle redirect
      // Don't show alert for 401 as user will be redirected
      if (error.response?.status === 401) {
        console.log('🔄 401 error - redirecting to login...');
        return; // Interceptor will handle the redirect
      }
      
      // For other errors, show message
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
      alert(`Failed to load daily summary: ${errorMessage}\n\nCheck console for details.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (needsOnboarding === false && token) {
      loadDailySummary(currentDate);
    }
  }, [currentDate, needsOnboarding, token]);

  const handleDateChange = (days: number) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + days);
    setCurrentDate(date.toISOString().split('T')[0]);
  };

  const handleMealAnalyzed = (analysis: MealAnalysis, file?: File) => {
    if (!analysis.isFood) {
      alert('⚠️ No food detected in the image. Please upload an image of a meal or food items.');
      return;
    }
    setPendingMeal(analysis);
    if (file) {
      setPendingFile(file);
    }
  };

  const handleReAnalyze = async () => {
    if (!pendingFile) {
      // If no file saved, just close modal and let user select new file
      setPendingMeal(null);
      return;
    }

    setAnalyzing(true);
    try {
      const analysis = await mealsApi.analyzeMeal(pendingFile);
      if (!analysis.isFood) {
        alert('⚠️ No food detected in the image. Please upload an image of a meal or food items.');
        setPendingMeal(null);
        setPendingFile(null);
        return;
      }
      setPendingMeal(analysis);
    } catch (error: any) {
      console.error('Error re-analyzing meal:', error);
      
      if (error.response?.status === 401) {
        return; // Interceptor will handle the redirect
      }
      
      alert('Failed to re-analyze meal image. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleConfirmMeal = async () => {
    if (!pendingMeal) return;

    try {
      const mealData = {
        name: pendingMeal.foodItems.join(', '),
        foodItems: pendingMeal.foodItems,
        calories: pendingMeal.calories,
        protein: pendingMeal.protein,
        carbs: pendingMeal.carbs,
        fats: pendingMeal.fats,
        healthScore: pendingMeal.healthScore,
        imageUrl: pendingMeal.imageUrl,
        date: currentDate, // Use the current dashboard date
      };

      const updatedSummary = await mealsApi.logMeal(mealData);
      setDailySummary(updatedSummary);
      setPendingMeal(null);
      setPendingFile(null);
    } catch (error: any) {
      console.error('Error logging meal:', error);
      
      // If it's a 401 error, the interceptor will handle redirect
      if (error.response?.status === 401) {
        return; // Interceptor will handle the redirect
      }
      
      alert('Failed to log meal. Please try again.');
    }
  };

  if (!currentUser) {
    return <Login />;
  }

  if (loading || needsOnboarding === null) {
    return (
      <div className="App">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (needsOnboarding) {
    return (
      <OnboardingFlow
        onComplete={() => {
          setNeedsOnboarding(false);
          loadDailySummary();
        }}
      />
    );
  }

  if (!dailySummary) {
    return (
      <div className="App">
        <div className="error">Failed to load data. Please check backend connection.</div>
      </div>
    );
  }

  const dashboard = (
    <div className="dashboard">
      <MacroTargetsCard
        date={dailySummary.date}
        targets={dailySummary.targets}
        consumed={dailySummary.consumed}
        remaining={dailySummary.remaining}
        onPrevDate={() => handleDateChange(-1)}
        onNextDate={() => handleDateChange(1)}
      />

      <MealsList meals={dailySummary.meals} />

      <History />

      <AddMealButton onMealAnalyzed={handleMealAnalyzed} />

      {pendingMeal && (
        <MealAnalysisModal
          meal={pendingMeal}
          currentRemaining={dailySummary.remaining}
          onConfirm={handleConfirmMeal}
          onCancel={() => {
            setPendingMeal(null);
            setPendingFile(null);
          }}
          onReAnalyze={handleReAnalyze}
          analyzing={analyzing}
        />
      )}
    </div>
  );

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <div>
            <h1>Cal AI - Calorie Tracker</h1>
            <p>Track your meals and reach your goals</p>
          </div>
          <div className="user-info">
            <span>{currentUser.email}</span>
            <button onClick={logout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      <nav className="app-nav">
        <NavLink to="/" end>
          Dashboard
        </NavLink>
        <NavLink to="/chat">Meat Chat</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </nav>

      <main className="app-content">
        <Routes>
          <Route path="/" element={dashboard} />
          <Route path="/chat" element={<MeatChat />} />
          <Route
            path="/settings"
            element={
              <Settings
                onTargetsUpdated={async () => {
                  await loadDailySummary();
                }}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

