import { Purchases, LOG_LEVEL, PURCHASES_ERROR_CODE, PurchasesOffering, CustomerInfo } from '@revenuecat/purchases-capacitor';
import { Capacitor } from '@capacitor/core';

const REVENUECAT_API_KEY = 'test_uXWRzmpuBOCtlcxKMSwvqSHoIyn';
const ENTITLEMENT_ID = 'Path Of A Genius Pro';

let isConfigured = false;

/**
 * Initialize RevenueCat SDK - call this once on app startup
 */
export async function initializeRevenueCat(): Promise<void> {
  if (!Capacitor.isNativePlatform()) {
    console.log('RevenueCat: Skipping initialization on web');
    return;
  }

  if (isConfigured) {
    console.log('RevenueCat: Already configured');
    return;
  }

  try {
    await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });
    await Purchases.configure({
      apiKey: REVENUECAT_API_KEY,
    });
    isConfigured = true;
    console.log('RevenueCat: Configured successfully');
  } catch (error) {
    console.error('RevenueCat: Configuration failed', error);
  }
}

/**
 * Check if user has active premium entitlement
 */
export async function checkPremiumStatus(): Promise<{
  isPremium: boolean;
  isTrialing: boolean;
  expiresAt?: string;
}> {
  if (!Capacitor.isNativePlatform()) {
    return { isPremium: false, isTrialing: false };
  }

  try {
    const { customerInfo } = await Purchases.getCustomerInfo();
    const entitlement = customerInfo.entitlements.active[ENTITLEMENT_ID];
    
    if (entitlement) {
      return {
        isPremium: true,
        isTrialing: entitlement.periodType === 'TRIAL',
        expiresAt: entitlement.expirationDate || undefined,
      };
    }
    
    return { isPremium: false, isTrialing: false };
  } catch (error) {
    console.error('RevenueCat: Failed to check premium status', error);
    return { isPremium: false, isTrialing: false };
  }
}

/**
 * Get available offerings/packages
 */
export async function getOfferings(): Promise<PurchasesOffering | null> {
  if (!Capacitor.isNativePlatform()) {
    return null;
  }

  try {
    const offerings = await Purchases.getOfferings();
    return offerings.current || null;
  } catch (error) {
    console.error('RevenueCat: Failed to get offerings', error);
    return null;
  }
}

/**
 * Purchase a subscription or lifetime access
 */
export async function purchasePackage(
  tierId: 'monthly' | 'lifetime'
): Promise<{ success: boolean; customerInfo?: CustomerInfo; error?: string }> {
  if (!Capacitor.isNativePlatform()) {
    return { success: false, error: 'Purchases only available on iOS/Android' };
  }

  try {
    const offerings = await Purchases.getOfferings();
    const currentOffering = offerings.current;
    
    if (!currentOffering) {
      return { success: false, error: 'No offerings available' };
    }

    // Find the right package
    let packageToPurchase;
    if (tierId === 'monthly') {
      packageToPurchase = currentOffering.monthly || 
        currentOffering.availablePackages.find(p => p.identifier.includes('monthly'));
    } else {
      packageToPurchase = currentOffering.lifetime || 
        currentOffering.availablePackages.find(p => p.identifier.includes('lifetime'));
    }

    if (!packageToPurchase) {
      return { success: false, error: `Package not found: ${tierId}` };
    }

    const result = await Purchases.purchasePackage({
      aPackage: packageToPurchase,
    });

    // Check if purchase was successful
    const entitlement = result.customerInfo.entitlements.active[ENTITLEMENT_ID];
    if (entitlement) {
      return { success: true, customerInfo: result.customerInfo };
    }

    return { success: false, error: 'Purchase completed but entitlement not found' };
  } catch (error: any) {
    // Handle user cancellation gracefully
    if (error.code === PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR) {
      return { success: false, error: 'cancelled' };
    }
    
    console.error('RevenueCat: Purchase failed', error);
    return { success: false, error: error.message || 'Purchase failed' };
  }
}

/**
 * Restore previous purchases
 */
export async function restorePurchases(): Promise<{
  success: boolean;
  isPremium: boolean;
  error?: string;
}> {
  if (!Capacitor.isNativePlatform()) {
    return { success: false, isPremium: false, error: 'Restore only available on iOS/Android' };
  }

  try {
    const { customerInfo } = await Purchases.restorePurchases();
    const entitlement = customerInfo.entitlements.active[ENTITLEMENT_ID];
    
    return {
      success: true,
      isPremium: !!entitlement,
    };
  } catch (error: any) {
    console.error('RevenueCat: Restore failed', error);
    return { success: false, isPremium: false, error: error.message || 'Restore failed' };
  }
}

/**
 * Check if running on native platform
 * Uses multiple checks to handle hot-reload scenarios
 */
export function isNativePlatform(): boolean {
  // Check both isNativePlatform and getPlatform for hot-reload compatibility
  const platform = Capacitor.getPlatform();
  const isNative = Capacitor.isNativePlatform();
  
  console.log('Capacitor platform check:', { platform, isNative });
  
  // Consider native if platform is ios/android OR if isNativePlatform returns true
  return isNative || platform === 'ios' || platform === 'android';
}
