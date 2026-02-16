import React, { createContext, useContext, useState, useEffect, useRef, ReactNode, useCallback } from 'react';
import { 
  initializeRevenueCat, 
  checkPremiumStatus, 
  purchasePackage as rcPurchasePackage, 
  restorePurchases as rcRestorePurchases,
  isNativePlatform,
  getLocalizedPrices,
  LocalizedPrices,
} from '@/lib/revenuecat';
import {
  initializeWebPurchases,
  checkWebPremiumStatus,
  purchaseWebPackage,
  getWebLocalizedPrices,
  resetWebPurchases,
} from '@/lib/revenuecatWeb';
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
  prices: LocalizedPrices;
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
  
  const [prices, setPrices] = useState<LocalizedPrices>({
    monthlyPrice: 'US$19.95',
    lifetimePrice: 'US$89.95',
  });

  const lastFetchedUserId = useRef<string | null>(null);

  // Initialize RevenueCat (native only — web is deferred to user login)
  useEffect(() => {
    if (isNativePlatform()) {
      initializeRevenueCat().then(() => {
        syncSubscriptionStatus();
        getLocalizedPrices().then(setPrices);
      });
    }
  }, []);

  // Persist subscription state to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subscription));
  }, [subscription]);

  // Fetch subscription from database when user logs in, reset when logged out
  // Guarded to prevent duplicate fetches from double user-state emissions
  useEffect(() => {
    if (user) {
      if (lastFetchedUserId.current === user.id) return;
      lastFetchedUserId.current = user.id;

      if (!isNativePlatform()) {
        initializeWebPurchases(user.id);
        // Fetch DB subscription, web premium status, and prices in parallel
        Promise.all([
          fetchSubscriptionFromDB(),
          checkWebPremiumStatus(),
          getWebLocalizedPrices(),
        ]).then(([, status, webPrices]) => {
          if (status.isPremium) {
            setSubscriptionState({
              tier: status.expiresAt ? 'monthly' : 'lifetime',
              isActive: true,
              expiresAt: status.expiresAt,
              trialEndsAt: status.isTrialing ? status.expiresAt : undefined,
            });
          }
          setPrices(webPrices);
        });
      } else {
        fetchSubscriptionFromDB();
      }
    } else {
      lastFetchedUserId.current = null;
      setSubscriptionState({
        tier: 'free',
        isActive: false,
        expiresAt: undefined,
        trialEndsAt: undefined,
      });
      localStorage.removeItem(STORAGE_KEY);
      resetWebPurchases();
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

  const showPaywall = useCallback(async () => {
    // Check live session instead of potentially stale `user` from closure
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      toast.info('Please sign in first to unlock premium features');
      window.location.href = '/auth';
      return;
    }
    setIsPaywallVisible(true);
  }, []);
  const hidePaywall = () => setIsPaywallVisible(false);

  const purchaseSubscription = useCallback(async (tierId: 'monthly' | 'lifetime'): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      let success = false;

      if (isNativePlatform()) {
        const result = await rcPurchasePackage(tierId);
        if (result.success) {
          success = true;
        } else if (result.error === 'cancelled') {
          return false;
        } else {
          toast.error(result.error || 'Purchase failed. Please try again.');
          return false;
        }
      } else {
        // Use supabase session check instead of stale closure
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          toast.info('Please sign in first to unlock premium features');
          window.location.href = '/auth';
          return false;
        }

        const result = await purchaseWebPackage(tierId);
        if (result.success) {
          success = true;
        } else if (result.error === 'cancelled') {
          return false;
        } else {
          toast.error(result.error || 'Purchase failed. Please try again.');
          return false;
        }
      }

      if (success) {
        const newSubscription: SubscriptionState = {
          tier: tierId,
          isActive: true,
          expiresAt: tierId === 'monthly' ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : undefined,
        };
        setSubscriptionState(newSubscription);
        await syncSubscriptionToDB(newSubscription);
        toast.success('Welcome to Premium! 🎉');
        hidePaywall();
        return true;
      }

      return false;
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
        // On web, check entitlement status directly (web SDK handles restore via Stripe)
        if (user) {
          const status = await checkWebPremiumStatus();
          if (status.isPremium) {
            setSubscriptionState({
              tier: status.expiresAt ? 'monthly' : 'lifetime',
              isActive: true,
              expiresAt: status.expiresAt,
            });
            toast.success('Purchases restored successfully!');
            hidePaywall();
          } else {
            toast.info('No previous purchases found');
          }
        } else {
          toast.info('Please log in to restore purchases');
        }
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
      prices,
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
