import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { supabase } from '@/integrations/supabase/client';

let registered = false;

export async function registerPushNotifications(userId: string) {
  if (!Capacitor.isNativePlatform() || registered) return;

  const permResult = await PushNotifications.requestPermissions();
  if (permResult.receive !== 'granted') {
    console.log('Push notification permission not granted');
    return;
  }

  await PushNotifications.register();

  PushNotifications.addListener('registration', async (token) => {
    console.log('Push token:', token.value);
    registered = true;

    // Upsert the token into device_tokens
    const { error } = await supabase
      .from('device_tokens')
      .upsert(
        {
          user_id: userId,
          token: token.value,
          platform: 'ios',
        },
        { onConflict: 'user_id,token' }
      );

    if (error) {
      console.error('Failed to save push token:', error);
    }
  });

  PushNotifications.addListener('registrationError', (err) => {
    console.error('Push registration error:', err);
  });
}

export async function unregisterPushNotifications(userId: string) {
  if (!Capacitor.isNativePlatform()) return;

  // Remove all tokens for this user
  await supabase
    .from('device_tokens')
    .delete()
    .eq('user_id', userId);

  registered = false;
}
