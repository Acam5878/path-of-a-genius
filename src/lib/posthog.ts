import posthog from 'posthog-js';

const POSTHOG_KEY = 'phc_7MLKdX13nF1o3clnk40nN6XBfVwqIyNE7yeav6kB1Id';
const POSTHOG_HOST = 'https://us.i.posthog.com';

let initialized = false;

export const initPostHog = () => {
  if (initialized) return;
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
  });
  initialized = true;
};

/** Identify a logged-in user so events are tied to their account */
export const identifyUser = (userId: string, traits?: Record<string, unknown>) => {
  posthog.identify(userId, traits);
};

/** Reset identity on sign-out */
export const resetUser = () => {
  posthog.reset();
};

// ── Funnel events ──────────────────────────────────────
export const trackHeroCompleted = () => posthog.capture('hero_completed');
export const trackAuthPageViewed = (view: 'login' | 'signup' | 'forgot') =>
  posthog.capture('auth_page_viewed', { view });
export const trackSignupCompleted = () => posthog.capture('signup_completed');
export const trackLoginCompleted = () => posthog.capture('login_completed');
export const trackFirstLessonStarted = (lessonId: string) =>
  posthog.capture('first_lesson_started', { lesson_id: lessonId });
export const trackLessonCompleted = (lessonId: string) =>
  posthog.capture('lesson_completed', { lesson_id: lessonId });

export default posthog;
