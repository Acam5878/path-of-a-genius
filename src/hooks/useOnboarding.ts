import { useState, useEffect } from 'react';

const ONBOARDING_COMPLETE_KEY = 'genius-academy-onboarding-complete';

export const useOnboarding = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const isComplete = localStorage.getItem(ONBOARDING_COMPLETE_KEY);
    
    if (!isComplete) {
      // Small delay to let the app render first
      const timer = setTimeout(() => {
        setShowOnboarding(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem(ONBOARDING_COMPLETE_KEY, 'true');
    setShowOnboarding(false);
  };

  const resetOnboarding = () => {
    localStorage.removeItem(ONBOARDING_COMPLETE_KEY);
  };

  return {
    showOnboarding,
    completeOnboarding,
    resetOnboarding,
  };
};
