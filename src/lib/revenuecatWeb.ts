import { Purchases } from '@revenuecat/purchases-js';

const REVENUECAT_WEB_API_KEY = 'rcb_fMqJBrznAlciPIzzCAEyEvpBrlCd';
const ENTITLEMENT_ID = 'Path Of A Genius Pro';

let purchasesInstance: Purchases | null = null;

/**
 * Initialize RevenueCat Web SDK with a user ID
 */
export function initializeWebPurchases(appUserId: string): Purchases {
  if (purchasesInstance) {
    return purchasesInstance;
  }
  
  purchasesInstance = Purchases.configure(REVENUECAT_WEB_API_KEY, appUserId);
  console.log('RevenueCat Web: Configured successfully');
  return purchasesInstance;
}

/**
 * Get the current Purchases instance
 */
export function getWebPurchases(): Purchases | null {
  return purchasesInstance;
}

/**
 * Check premium status on web
 */
export async function checkWebPremiumStatus(): Promise<{
  isPremium: boolean;
  isTrialing: boolean;
  expiresAt?: string;
}> {
  if (!purchasesInstance) {
    return { isPremium: false, isTrialing: false };
  }

  try {
    const customerInfo = await purchasesInstance.getCustomerInfo();
    const entitlement = customerInfo.entitlements.active[ENTITLEMENT_ID];
    
    if (entitlement) {
      return {
        isPremium: true,
        isTrialing: entitlement.periodType === 'trial',
        expiresAt: entitlement.expirationDate?.toISOString() || undefined,
      };
    }
    
    return { isPremium: false, isTrialing: false };
  } catch (error) {
    console.error('RevenueCat Web: Failed to check premium status', error);
    return { isPremium: false, isTrialing: false };
  }
}

/**
 * Get web offerings
 */
export async function getWebOfferings() {
  if (!purchasesInstance) return null;
  
  try {
    const offerings = await purchasesInstance.getOfferings();
    return offerings.current || null;
  } catch (error) {
    console.error('RevenueCat Web: Failed to get offerings', error);
    return null;
  }
}

/**
 * Get localized prices from web offerings
 */
export async function getWebLocalizedPrices(): Promise<{
  monthlyPrice: string;
  lifetimePrice: string;
}> {
  const DEFAULT_PRICES = {
    monthlyPrice: 'US$19.95',
    lifetimePrice: 'US$89.95',
  };

  try {
    const offering = await getWebOfferings();
    if (!offering) return DEFAULT_PRICES;

    const monthly = offering.monthly || offering.availablePackages.find(p => p.identifier.includes('monthly'));
    const lifetime = offering.lifetime || offering.availablePackages.find(p => p.identifier.includes('lifetime'));

    return {
      monthlyPrice: monthly?.rcBillingProduct?.currentPrice?.formattedPrice || DEFAULT_PRICES.monthlyPrice,
      lifetimePrice: lifetime?.rcBillingProduct?.currentPrice?.formattedPrice || DEFAULT_PRICES.lifetimePrice,
    };
  } catch (error) {
    console.error('RevenueCat Web: Failed to get localized prices', error);
    return DEFAULT_PRICES;
  }
}

/**
 * Purchase a package on web
 */
export async function purchaseWebPackage(
  tierId: 'monthly' | 'lifetime',
  htmlTarget?: HTMLElement
): Promise<{ success: boolean; error?: string }> {
  if (!purchasesInstance) {
    return { success: false, error: 'RevenueCat Web not initialized' };
  }

  try {
    const offerings = await purchasesInstance.getOfferings();
    const currentOffering = offerings.current;
    
    if (!currentOffering) {
      return { success: false, error: 'No offerings available. Please try again later.' };
    }

    let packageToPurchase;
    if (tierId === 'monthly') {
      packageToPurchase = currentOffering.monthly || 
        currentOffering.availablePackages.find(p => p.identifier.includes('monthly'));
    } else {
      packageToPurchase = currentOffering.lifetime || 
        currentOffering.availablePackages.find(p => p.identifier.includes('lifetime'));
    }

    if (!packageToPurchase) {
      return { success: false, error: 'Selected plan is temporarily unavailable.' };
    }

    console.log('RevenueCat Web: Purchasing package', packageToPurchase.identifier);

    const { customerInfo } = await purchasesInstance.purchase({
      rcPackage: packageToPurchase,
      ...(htmlTarget ? { htmlTarget } : {}),
    });

    // Check if entitlement was granted
    const entitlement = customerInfo.entitlements.active[ENTITLEMENT_ID];
    if (entitlement) {
      return { success: true };
    }

    const activeEntitlements = Object.keys(customerInfo.entitlements.active);
    if (activeEntitlements.length > 0) {
      return { success: true };
    }

    return { success: false, error: 'Purchase completed but access not granted. Please try again.' };
  } catch (error: any) {
    if (error?.errorCode === 'UserCancelledError' || error?.message?.includes('cancel')) {
      return { success: false, error: 'cancelled' };
    }
    
    console.error('RevenueCat Web: Purchase failed', error);
    return { success: false, error: error.message || 'Purchase failed. Please try again.' };
  }
}

/**
 * Reset the web purchases instance (for logout)
 */
export function resetWebPurchases() {
  purchasesInstance = null;
}
