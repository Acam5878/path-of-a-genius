import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const ONBOARDING_COMPLETE_KEY = 'genius-academy-onboarding-complete';

export const useOnboarding = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { user, isLoading } = useAuth();

  useEffect(() => {
    // Wait for auth to finish loading
    if (isLoading) return;

    const isComplete = localStorage.getItem(ONBOARDING_COMPLETE_KEY);
    
    // If onboarding already completed locally, don't show
    if (isComplete) return;

    // If user is logged in, check if they're a returning user
    if (user) {
      const createdAt = new Date(user.created_at);
      const now = new Date();
      const minutesSinceCreation = (now.getTime() - createdAt.getTime()) / (1000 * 60);
      
      // If account was created more than 5 minutes ago, they're returning
      // Skip onboarding and mark as complete
      if (minutesSinceCreation > 5) {
        localStorage.setItem(ONBOARDING_COMPLETE_KEY, 'true');
        return;
      }
    }
    
    // Show onboarding for new users (not logged in or just created account)
    const timer = setTimeout(() => {
      setShowOnboarding(true);
    }, 500);
    return () => clearTimeout(timer);
  }, [user, isLoading]);

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
