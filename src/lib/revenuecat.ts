import { Purchases, LOG_LEVEL, PURCHASES_ERROR_CODE, PurchasesOffering, CustomerInfo } from '@revenuecat/purchases-capacitor';
import { Capacitor } from '@capacitor/core';

const REVENUECAT_API_KEY = 'appl_lrNzQdrgQRxgSmiIDmlMsvJGNbX';
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

export interface LocalizedPrices {
  monthlyPrice: string;
  lifetimePrice: string;
}

const DEFAULT_PRICES: LocalizedPrices = {
  monthlyPrice: 'US$19.95',
  lifetimePrice: 'US$89.95',
};

/**
 * Get localized prices from RevenueCat offerings
 */
export async function getLocalizedPrices(): Promise<LocalizedPrices> {
  if (!Capacitor.isNativePlatform()) {
    return DEFAULT_PRICES;
  }

  try {
    const offering = await getOfferings();
    if (!offering) return DEFAULT_PRICES;

    const monthly = offering.monthly || offering.availablePackages.find(p => p.identifier.includes('monthly'));
    const lifetime = offering.lifetime || offering.availablePackages.find(p => p.identifier.includes('lifetime'));

    return {
      monthlyPrice: monthly?.product?.priceString || DEFAULT_PRICES.monthlyPrice,
      lifetimePrice: lifetime?.product?.priceString || DEFAULT_PRICES.lifetimePrice,
    };
  } catch (error) {
    console.error('RevenueCat: Failed to get localized prices', error);
    return DEFAULT_PRICES;
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
    // Ensure RevenueCat is configured before purchasing
    if (!isConfigured) {
      console.log('RevenueCat: Not configured, initializing...');
      await initializeRevenueCat();
    }

    const offerings = await Purchases.getOfferings();
    const currentOffering = offerings.current;
    
    if (!currentOffering) {
      console.error('RevenueCat: No offerings available', offerings);
      return { success: false, error: 'Unable to load subscription options. Please try again later.' };
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
      console.error('RevenueCat: Package not found', { tierId, availablePackages: currentOffering.availablePackages });
      return { success: false, error: 'Selected plan is temporarily unavailable. Please try again.' };
    }

    console.log('RevenueCat: Purchasing package', packageToPurchase.identifier);

    const result = await Purchases.purchasePackage({
      aPackage: packageToPurchase,
    });

    console.log('RevenueCat: Purchase result', result);

    // Check if purchase was successful
    const entitlement = result.customerInfo.entitlements.active[ENTITLEMENT_ID];
    if (entitlement) {
      return { success: true, customerInfo: result.customerInfo };
    }

    // Check if any entitlement was granted (in case of entitlement ID mismatch)
    const activeEntitlements = Object.keys(result.customerInfo.entitlements.active);
    if (activeEntitlements.length > 0) {
      console.log('RevenueCat: Found active entitlements', activeEntitlements);
      return { success: true, customerInfo: result.customerInfo };
    }

    console.error('RevenueCat: No entitlement granted after purchase');
    return { success: false, error: 'Purchase completed but access not granted. Please restore purchases.' };
  } catch (error: any) {
    // Handle user cancellation gracefully
    if (error.code === PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR) {
      return { success: false, error: 'cancelled' };
    }
    
    // Handle specific error codes with user-friendly messages
    console.error('RevenueCat: Purchase failed', { code: error.code, message: error.message, error });
    
    // Common RevenueCat error codes
    if (error.code === PURCHASES_ERROR_CODE.NETWORK_ERROR) {
      return { success: false, error: 'Network error. Please check your connection and try again.' };
    }
    if (error.code === PURCHASES_ERROR_CODE.PRODUCT_NOT_AVAILABLE_FOR_PURCHASE_ERROR) {
      return { success: false, error: 'This product is not available for purchase at this time.' };
    }
    if (error.code === PURCHASES_ERROR_CODE.PURCHASE_NOT_ALLOWED_ERROR) {
      return { success: false, error: 'Purchases are not allowed on this device.' };
    }
    if (error.code === PURCHASES_ERROR_CODE.STORE_PROBLEM_ERROR) {
      return { success: false, error: 'App Store error. Please try again later.' };
    }
    
    return { success: false, error: error.message || 'Purchase failed. Please try again.' };
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
