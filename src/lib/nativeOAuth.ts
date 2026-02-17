import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';
import { App as CapApp } from '@capacitor/app';
import { supabase } from '@/integrations/supabase/client';

const PUBLISHED_URL = 'https://erudite-journey.lovable.app';

/**
 * Handle OAuth sign-in on native Capacitor platforms.
 * Opens the OAuth URL in an in-app browser, listens for
 * the deep-link callback, and sets the Supabase session.
 */
export async function nativeOAuthSignIn(
  provider: 'google' | 'apple'
): Promise<{ error?: string }> {
  if (!Capacitor.isNativePlatform()) {
    return { error: 'Not a native platform' };
  }

  try {
    // 1. Get the OAuth URL from Supabase without auto-redirecting
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: PUBLISHED_URL,
        skipBrowserRedirect: true,
      },
    });

    if (error || !data?.url) {
      console.error('Native OAuth: Failed to get URL', error);
      return { error: error?.message || 'Failed to start sign-in' };
    }

    console.log('Native OAuth: Opening browser for', provider);

    // 2. Set up the deep-link listener BEFORE opening the browser
    const sessionPromise = new Promise<{ error?: string }>((resolve) => {
      let listenerHandle: { remove: () => void } | null = null;

      const timeout = setTimeout(() => {
        listenerHandle?.remove();
        resolve({ error: undefined }); // Don't error on timeout — user may have cancelled
      }, 120_000); // 2 minute timeout

      CapApp.addListener('appUrlOpen', async ({ url }) => {
        console.log('Native OAuth: App URL opened', url);

        // Check if this is our OAuth callback
        if (!url.startsWith(PUBLISHED_URL)) return;

        clearTimeout(timeout);
        listenerHandle?.remove();

        try {
          // Extract tokens from the URL fragment (#access_token=...&refresh_token=...)
          const hashPart = url.includes('#') ? url.split('#')[1] : '';
          const params = new URLSearchParams(hashPart);
          const access_token = params.get('access_token');
          const refresh_token = params.get('refresh_token');

          if (access_token && refresh_token) {
            const { error: sessionError } = await supabase.auth.setSession({
              access_token,
              refresh_token,
            });
            if (sessionError) {
              console.error('Native OAuth: Failed to set session', sessionError);
              resolve({ error: sessionError.message });
            } else {
              console.log('Native OAuth: Session set successfully');
              resolve({});
            }
          } else {
            // Might be an error or code-based flow
            const errorDesc = params.get('error_description') || params.get('error');
            resolve({ error: errorDesc || 'No tokens received from sign-in' });
          }
        } catch (e: any) {
          console.error('Native OAuth: Error processing callback', e);
          resolve({ error: e.message || 'Failed to process sign-in' });
        }

        // Close the in-app browser
        try {
          await Browser.close();
        } catch {
          // Browser might already be closed
        }
      }).then(handle => { listenerHandle = handle; });
    });

    // 3. Open the OAuth URL in the in-app browser
    await Browser.open({ url: data.url, windowName: '_self' });

    // 4. Wait for the callback
    return await sessionPromise;
  } catch (e: any) {
    console.error('Native OAuth: Unexpected error', e);
    return { error: e.message || 'Sign-in failed' };
  }
}
