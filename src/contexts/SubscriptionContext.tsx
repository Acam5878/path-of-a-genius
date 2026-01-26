import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type SubscriptionTier = 'free' | 'monthly' | 'lifetime';

export interface SubscriptionState {
  tier: SubscriptionTier;
  isActive: boolean;
  expiresAt?: string;
  trialEndsAt?: string;
}

interface SubscriptionContextType {
  subscription: SubscriptionState;
  isPremium: boolean;
  isTrialing: boolean;
  canAccessGenius: (geniusId: string) => boolean;
  showPaywall: () => void;
  hidePaywall: () => void;
  isPaywallVisible: boolean;
  // These will connect to RevenueCat later
  restorePurchases: () => Promise<void>;
  setSubscription: (sub: SubscriptionState) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

const STORAGE_KEY = 'genius-academy-subscription';
const FREE_GENIUS_IDS = ['john-stuart-mill']; // Only Mill is free

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [subscription, setSubscriptionState] = useState<SubscriptionState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      tier: 'free',
      isActive: false,
    };
  });

  const [isPaywallVisible, setIsPaywallVisible] = useState(false);

  // Persist subscription state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subscription));
  }, [subscription]);

  const isPremium = subscription.tier !== 'free' && subscription.isActive;
  
  const isTrialing = Boolean(
    subscription.trialEndsAt && 
    new Date(subscription.trialEndsAt) > new Date()
  );

  const canAccessGenius = (geniusId: string): boolean => {
    // Free geniuses are always accessible
    if (FREE_GENIUS_IDS.includes(geniusId)) {
      return true;
    }
    // Premium content requires active subscription
    return isPremium || isTrialing;
  };

  const showPaywall = () => setIsPaywallVisible(true);
  const hidePaywall = () => setIsPaywallVisible(false);

  const restorePurchases = async () => {
    // This will be implemented with RevenueCat SDK later
    // For now, it's a placeholder that checks localStorage
    console.log('Restore purchases - will connect to RevenueCat');
  };

  const setSubscription = (sub: SubscriptionState) => {
    setSubscriptionState(sub);
  };

  return (
    <SubscriptionContext.Provider value={{
      subscription,
      isPremium,
      isTrialing,
      canAccessGenius,
      showPaywall,
      hidePaywall,
      isPaywallVisible,
      restorePurchases,
      setSubscription,
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
