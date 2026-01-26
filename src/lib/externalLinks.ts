/**
 * Normalize 3rd-party links so they open in a stable, readable format.
 *
 * Project Gutenberg:
 * - The /ebooks/<id> page is a landing page that can vary; the cached HTML is more stable.
 */
export function normalizeExternalUrl(url: string): string {
  // Project Gutenberg: https://www.gutenberg.org/ebooks/39292
  const gutenbergMatch = url.match(/^https?:\/\/(?:www\.)?gutenberg\.org\/ebooks\/(\d+)(?:[/?#].*)?$/i);
  if (gutenbergMatch) {
    const id = gutenbergMatch[1];
    return `https://www.gutenberg.org/cache/epub/${id}/pg${id}-images.html`;
  }

  return url;
}

/**
 * Opens the App Store subscription management page.
 * On iOS, this deep-links to Settings > Subscriptions.
 * On web, opens Apple's subscription management page.
 */
export function openAppStoreSubscriptions(): void {
  // iOS deep link to subscription management
  const iosDeepLink = 'itms-apps://apps.apple.com/account/subscriptions';
  // Web fallback
  const webFallback = 'https://apps.apple.com/account/subscriptions';
  
  // Try iOS deep link first, fall back to web
  try {
    window.location.href = iosDeepLink;
    // If we're still here after a short delay, open web fallback
    setTimeout(() => {
      window.open(webFallback, '_blank');
    }, 500);
  } catch {
    window.open(webFallback, '_blank');
  }
}
