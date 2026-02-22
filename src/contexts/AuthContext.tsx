import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { identifyUser, resetUser } from '@/lib/posthog';
import { registerPushNotifications, unregisterPushNotifications } from '@/lib/pushNotifications';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string, displayName?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const initialSessionResolved = useRef(false);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        // Always handle SIGNED_IN and TOKEN_REFRESHED so OAuth callbacks
        // (which fire before getSession resolves) are never missed
        if (!initialSessionResolved.current && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
          setSession(newSession);
          setUser(newSession?.user ?? null);
          if (newSession?.user) {
            identifyUser(newSession.user.id, { email: newSession.user.email });
            registerPushNotifications(newSession.user.id);
          }
          setIsLoading(false);
          initialSessionResolved.current = true;
          return;
        }
        if (initialSessionResolved.current) {
          setSession(newSession);
          setUser(newSession?.user ?? null);
          if (event === 'SIGNED_IN' && newSession?.user) {
            registerPushNotifications(newSession.user.id);
          }
          setIsLoading(false);
        }
      }
    );

    // THEN check for existing session (single source of truth on boot)
    supabase.auth.getSession().then(({ data: { session: existingSession } }) => {
      if (!initialSessionResolved.current) {
        setSession(existingSession);
        setUser(existingSession?.user ?? null);
        if (existingSession?.user) {
          registerPushNotifications(existingSession.user.id);
        }
        setIsLoading(false);
        initialSessionResolved.current = true;
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, displayName?: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          display_name: displayName,
        },
      },
    });
    
    return { error: error as Error | null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    return { error: error as Error | null };
  };

  const signOut = async () => {
    if (user) await unregisterPushNotifications(user.id);
    resetUser();
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      isLoading,
      signUp,
      signIn,
      signOut,
    }}>
      {isLoading ? (
        <div className="min-h-screen bg-background" />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
