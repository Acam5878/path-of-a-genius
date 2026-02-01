import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { 
  initializeRevenueCat, 
  checkPremiumStatus, 
  purchasePackage as rcPurchasePackage, 
  restorePurchases as rcRestorePurchases,
  isNativePlatform 
} from '@/lib/revenuecat';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

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
  restorePurchases: () => Promise<void>;
  setSubscription: (sub: SubscriptionState) => void;
  purchaseSubscription: (tierId: 'monthly' | 'lifetime') => Promise<boolean>;
  isLoading: boolean;
}

export const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

const STORAGE_KEY = 'genius-academy-subscription';
const FREE_GENIUS_IDS = ['john-stuart-mill']; // Only Mill is free

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  
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
  const [isLoading, setIsLoading] = useState(false);

  // Initialize RevenueCat and check premium status on mount
  useEffect(() => {
    const init = async () => {
      await initializeRevenueCat();
      await syncSubscriptionStatus();
    };
    init();
  }, []);

  // Persist subscription state to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subscription));
  }, [subscription]);

  // Fetch subscription from database when user logs in, reset when logged out
  useEffect(() => {
    if (user) {
      fetchSubscriptionFromDB();
    } else {
      // Reset subscription state when user logs out
      setSubscriptionState({
        tier: 'free',
        isActive: false,
        expiresAt: undefined,
        trialEndsAt: undefined,
      });
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const fetchSubscriptionFromDB = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Failed to fetch subscription:', error);
      return;
    }

    if (data) {
      const dbSubscription: SubscriptionState = {
        tier: data.tier as 'free' | 'monthly' | 'lifetime',
        isActive: data.is_active,
        expiresAt: data.expires_at || undefined,
        trialEndsAt: data.trial_ends_at || undefined,
      };
      setSubscriptionState(dbSubscription);
    }
  };

  const syncSubscriptionToDB = async (newSubscription: SubscriptionState) => {
    if (!user) return;

    await supabase
      .from('subscriptions')
      .update({
        tier: newSubscription.tier,
        is_active: newSubscription.isActive,
        expires_at: newSubscription.expiresAt || null,
        trial_ends_at: newSubscription.trialEndsAt || null,
      })
      .eq('user_id', user.id);
  };

  const syncSubscriptionStatus = useCallback(async () => {
    if (!isNativePlatform()) return;
    
    try {
      const status = await checkPremiumStatus();
      if (status.isPremium) {
        setSubscriptionState({
          tier: status.expiresAt ? 'monthly' : 'lifetime',
          isActive: true,
          expiresAt: status.expiresAt,
          trialEndsAt: status.isTrialing ? status.expiresAt : undefined,
        });
      }
    } catch (error) {
      console.error('Failed to sync subscription status:', error);
    }
  }, []);

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

  const showPaywall = () => {
    if (!user) {
      // Redirect to auth if not logged in
      toast.info('Please create an account first to unlock premium features');
      window.location.href = '/auth';
      return;
    }
    setIsPaywallVisible(true);
  };
  const hidePaywall = () => setIsPaywallVisible(false);

  const purchaseSubscription = useCallback(async (tierId: 'monthly' | 'lifetime'): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      if (!isNativePlatform()) {
        // On web, just simulate success for testing
        toast.info('Purchases are only available in the iOS app');
        return false;
      }

      const result = await rcPurchasePackage(tierId);
      
      if (result.success) {
        const newSubscription: SubscriptionState = {
          tier: tierId,
          isActive: true,
          expiresAt: tierId === 'monthly' ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : undefined,
        };
        setSubscriptionState(newSubscription);
        // Sync to database
        await syncSubscriptionToDB(newSubscription);
        toast.success('Welcome to Premium! 🎉');
        hidePaywall();
        return true;
      } else if (result.error === 'cancelled') {
        // User cancelled - no error message needed
        return false;
      } else {
        toast.error(result.error || 'Purchase failed. Please try again.');
        return false;
      }
    } catch (error: any) {
      console.error('Purchase error:', error);
      toast.error('Something went wrong. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const restorePurchases = useCallback(async () => {
    setIsLoading(true);
    
    try {
      if (!isNativePlatform()) {
        toast.info('Restore is only available in the iOS app');
        return;
      }

      const result = await rcRestorePurchases();
      
      if (result.success && result.isPremium) {
        await syncSubscriptionStatus();
        toast.success('Purchases restored successfully!');
        hidePaywall();
      } else if (result.success) {
        toast.info('No previous purchases found');
      } else {
        toast.error(result.error || 'Restore failed. Please try again.');
      }
    } catch (error: any) {
      console.error('Restore error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [syncSubscriptionStatus]);

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
      purchaseSubscription,
      isLoading,
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
