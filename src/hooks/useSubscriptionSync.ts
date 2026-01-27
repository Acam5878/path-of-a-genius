import { useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { SubscriptionState } from '@/contexts/SubscriptionContext';

export const useSubscriptionSync = (
  subscription: SubscriptionState,
  setSubscription: (sub: SubscriptionState) => void
) => {
  const { user } = useAuth();

  // Fetch subscription from database on login
  const fetchSubscription = useCallback(async () => {
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
      setSubscription({
        tier: data.tier as 'free' | 'monthly' | 'lifetime',
        isActive: data.is_active,
        expiresAt: data.expires_at || undefined,
        trialEndsAt: data.trial_ends_at || undefined,
      });
    }
  }, [user, setSubscription]);

  // Sync subscription to database after purchase
  const syncSubscription = useCallback(async (newSubscription: SubscriptionState) => {
    if (!user) return { error: 'Not authenticated' };

    const { error } = await supabase
      .from('subscriptions')
      .update({
        tier: newSubscription.tier,
        is_active: newSubscription.isActive,
        expires_at: newSubscription.expiresAt || null,
        trial_ends_at: newSubscription.trialEndsAt || null,
      })
      .eq('user_id', user.id);

    if (error) {
      console.error('Failed to sync subscription:', error);
      return { error: error.message };
    }

    return { error: null };
  }, [user]);

  // Fetch subscription when user logs in
  useEffect(() => {
    if (user) {
      fetchSubscription();
    }
  }, [user, fetchSubscription]);

  return {
    fetchSubscription,
    syncSubscription,
  };
};
