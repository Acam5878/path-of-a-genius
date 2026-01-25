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
