import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const AVATAR_CACHE_KEY = 'opponent-avatar-cache';

function getCache(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(AVATAR_CACHE_KEY) || '{}');
  } catch { return {}; }
}

function setCache(id: string, url: string) {
  const cache = getCache();
  cache[id] = url;
  localStorage.setItem(AVATAR_CACHE_KEY, JSON.stringify(cache));
}

// Avatar prompts for each opponent
const avatarPrompts: Record<string, string> = {
  'bot-high-school': 'Stylized anime avatar of a young male student, 18, messy brown hair, graduation cap, hoodie, confident smirk. Upper body, vibrant colors, clean background, gaming art style.',
  'bot-undergrad': 'Stylized anime avatar of a focused female university student, 22, glasses, ponytail, college sweater. Upper body, vibrant colors, clean background, gaming art style.',
  'bot-masters': 'Stylized anime avatar of a serious male researcher, 28, short neat hair, lab coat. Upper body, vibrant colors, clean background, gaming art style.',
  'bot-ivy-league': 'Stylized anime avatar of a distinguished female professor, 50, silver-streaked hair in bun, tweed blazer. Upper body, vibrant colors, clean background, gaming art style.',
  'john-stuart-mill': 'Stylized anime avatar of John Stuart Mill, 19th century philosopher, mutton chops, high collar, quill pen. Upper body, vibrant colors, clean background, gaming art style.',
  'marie-curie': 'Stylized anime avatar of Marie Curie, dark hair pinned up, holding glowing radium vial. Upper body, vibrant colors, clean background, gaming art style.',
  'nikola-tesla': 'Stylized anime avatar of Nikola Tesla, slicked hair, mustache, suit, electricity crackling. Upper body, vibrant colors, clean background, gaming art style.',
  'aristotle': 'Stylized anime avatar of Aristotle, toga, curly beard, laurel wreath, scroll. Upper body, vibrant colors, clean background, gaming art style.',
  'blaise-pascal': 'Stylized anime avatar of Blaise Pascal, 17th century French, curly wig, mechanical calculator. Upper body, vibrant colors, clean background, gaming art style.',
  'albert-einstein': 'Stylized anime avatar of Albert Einstein, wild white hair, mustache, sweater, E=mc². Upper body, vibrant colors, clean background, gaming art style.',
  'leonardo-da-vinci': 'Stylized anime avatar of Leonardo da Vinci, Renaissance clothing, long hair and beard, paintbrush. Upper body, vibrant colors, clean background, gaming art style.',
  'isaac-newton': 'Stylized anime avatar of Isaac Newton, 17th century wig, formal coat, apple, prism. Upper body, vibrant colors, clean background, gaming art style.',
  'gottfried-leibniz': 'Stylized anime avatar of Gottfried Leibniz, large dark curly wig, formal attire. Upper body, vibrant colors, clean background, gaming art style.',
  'goethe': 'Stylized anime avatar of Goethe, Romantic era clothing, swept-back hair, book of poetry. Upper body, vibrant colors, clean background, gaming art style.',
  'user-avatar': 'Stylized anime avatar of a confident young intellectual challenger, modern smart-casual, cool hairstyle, determined expression, slight glow. Upper body, vibrant colors, clean background, gaming art style.',
};

/** Returns cached avatar instantly, or null. Triggers background generation if not cached. */
export function useOpponentAvatar(opponentId: string, opponentName: string) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(() => getCache()[opponentId] || null);
  const [loading] = useState(false); // Never show loading — use fallback

  useEffect(() => {
    if (avatarUrl) return; // Already cached

    // Check storage (fast) then trigger generation in background
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/avatars/opponents/${opponentId}.png`;

    fetch(publicUrl, { method: 'HEAD' })
      .then(res => {
        if (res.ok) {
          setAvatarUrl(publicUrl);
          setCache(opponentId, publicUrl);
        } else {
          // Fire-and-forget background generation for next time
          triggerBackgroundGeneration(opponentId, opponentName);
        }
      })
      .catch(() => {
        triggerBackgroundGeneration(opponentId, opponentName);
      });
  }, [opponentId, opponentName, avatarUrl]);

  return { avatarUrl, loading };
}

export function useUserAvatar() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(() => getCache()['user-avatar'] || null);
  const [loading] = useState(false);

  useEffect(() => {
    if (avatarUrl) return;

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/avatars/opponents/user-avatar.png`;

    fetch(publicUrl, { method: 'HEAD' })
      .then(res => {
        if (res.ok) {
          setAvatarUrl(publicUrl);
          setCache('user-avatar', publicUrl);
        } else {
          triggerBackgroundGeneration('user-avatar', 'Player');
        }
      })
      .catch(() => {
        triggerBackgroundGeneration('user-avatar', 'Player');
      });
  }, [avatarUrl]);

  return { avatarUrl, loading };
}

// Background generation — doesn't block UI
const generatingSet = new Set<string>();

function triggerBackgroundGeneration(opponentId: string, name: string) {
  if (generatingSet.has(opponentId)) return;
  generatingSet.add(opponentId);

  supabase.functions.invoke('generate-avatar', {
    body: {
      opponentId,
      name,
      description: avatarPrompts[opponentId] || undefined,
    },
  }).then(({ data }) => {
    if (data?.avatarUrl) {
      setCache(opponentId, data.avatarUrl);
    }
  }).catch(e => {
    console.error('Background avatar generation failed:', e);
  }).finally(() => {
    generatingSet.delete(opponentId);
  });
}

/** Pre-generate all avatars in the background (call from Challenge page mount) */
export function preGenerateAvatars(opponentIds: { id: string; name: string }[]) {
  for (const { id, name } of opponentIds) {
    const cached = getCache()[id];
    if (!cached) {
      // Stagger requests to avoid rate limiting
      setTimeout(() => triggerBackgroundGeneration(id, name), Math.random() * 5000);
    }
  }
}
