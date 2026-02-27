import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Avatar description prompts for each opponent type
const avatarPrompts: Record<string, string> = {
  'bot-high-school': 'Create a stylized anime/cartoon avatar of a young male student around 18 years old with messy brown hair, wearing a graduation cap slightly tilted, casual hoodie, confident smirk. Upper body portrait, vibrant colors, clean background, gaming art style.',
  'bot-undergrad': 'Create a stylized anime/cartoon avatar of a focused female university student around 22, glasses, neat ponytail, holding a thick textbook, wearing a college sweater. Upper body portrait, vibrant colors, clean background, gaming art style.',
  'bot-masters': 'Create a stylized anime/cartoon avatar of a serious male researcher around 28, short neat hair, lab coat over smart casual clothes, holding a tablet with data charts. Upper body portrait, vibrant colors, clean background, gaming art style.',
  'bot-ivy-league': 'Create a stylized anime/cartoon avatar of a distinguished female professor around 50, silver-streaked hair in an elegant bun, wearing a tweed blazer with elbow patches, wise confident expression. Upper body portrait, vibrant colors, clean background, gaming art style.',
  'john-stuart-mill': 'Create a stylized anime/cartoon avatar of John Stuart Mill as a distinguished 19th century philosopher, mutton chops sideburns, high collar, intense thoughtful gaze, holding a quill pen. Upper body portrait, vibrant colors, clean background, gaming art style.',
  'marie-curie': 'Create a stylized anime/cartoon avatar of Marie Curie, early 1900s clothing, dark hair pinned up, holding a glowing radium vial, determined expression, subtle green glow effect. Upper body portrait, vibrant colors, clean background, gaming art style.',
  'nikola-tesla': 'Create a stylized anime/cartoon avatar of Nikola Tesla, dark slicked hair, elegant mustache, formal suit, electricity crackling around his fingers, intense visionary eyes. Upper body portrait, vibrant colors, clean background, gaming art style.',
  'aristotle': 'Create a stylized anime/cartoon avatar of Aristotle the Greek philosopher, draped toga, curly beard, laurel wreath, holding a scroll, wise contemplative expression. Upper body portrait, vibrant colors, clean background, gaming art style.',
  'blaise-pascal': 'Create a stylized anime/cartoon avatar of Blaise Pascal, 17th century French clothing, long curly wig, thin face, holding a mechanical calculator, sharp calculating eyes. Upper body portrait, vibrant colors, clean background, gaming art style.',
  'albert-einstein': 'Create a stylized anime/cartoon avatar of Albert Einstein, wild white hair, bushy mustache, casual sweater, chalkboard with E=mc² behind him, playful genius expression. Upper body portrait, vibrant colors, clean background, gaming art style.',
  'leonardo-da-vinci': 'Create a stylized anime/cartoon avatar of Leonardo da Vinci, Renaissance clothing, long flowing hair and beard, holding paintbrush in one hand and mechanical gear in other, Renaissance genius. Upper body portrait, vibrant colors, clean background, gaming art style.',
  'isaac-newton': 'Create a stylized anime/cartoon avatar of Isaac Newton, 17th century wig, formal coat, holding an apple, prism with rainbow light, serious dignified expression. Upper body portrait, vibrant colors, clean background, gaming art style.',
  'gottfried-leibniz': 'Create a stylized anime/cartoon avatar of Gottfried Leibniz, large dark curly wig, formal 17th century attire, holding binary code tablet, scholarly expression. Upper body portrait, vibrant colors, clean background, gaming art style.',
  'goethe': 'Create a stylized anime/cartoon avatar of Johann Wolfgang von Goethe, elegant Romantic era clothing, swept-back hair, holding a book of poetry, noble contemplative expression. Upper body portrait, vibrant colors, clean background, gaming art style.',
};

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

export function useOpponentAvatar(opponentId: string, opponentName: string) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local cache first
    const cached = getCache()[opponentId];
    if (cached) {
      setAvatarUrl(cached);
      setLoading(false);
      return;
    }

    // Check if avatar exists in storage already
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/avatars/opponents/${opponentId}.png`;
    
    // Try fetching from storage first
    fetch(publicUrl, { method: 'HEAD' })
      .then(res => {
        if (res.ok) {
          setAvatarUrl(publicUrl);
          setCache(opponentId, publicUrl);
          setLoading(false);
        } else {
          // Generate via edge function
          return generateAvatar();
        }
      })
      .catch(() => generateAvatar());

    async function generateAvatar() {
      try {
        const { data, error } = await supabase.functions.invoke('generate-avatar', {
          body: {
            opponentId,
            name: opponentName,
            description: avatarPrompts[opponentId] || undefined,
          },
        });

        if (!error && data?.avatarUrl) {
          setAvatarUrl(data.avatarUrl);
          setCache(opponentId, data.avatarUrl);
        }
      } catch (e) {
        console.error('Avatar generation failed:', e);
      } finally {
        setLoading(false);
      }
    }
  }, [opponentId, opponentName]);

  return { avatarUrl, loading };
}

// Generate user avatar
export function useUserAvatar() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = getCache()['user-avatar'];
    if (cached) {
      setAvatarUrl(cached);
      setLoading(false);
      return;
    }

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/avatars/opponents/user-avatar.png`;
    
    fetch(publicUrl, { method: 'HEAD' })
      .then(res => {
        if (res.ok) {
          setAvatarUrl(publicUrl);
          setCache('user-avatar', publicUrl);
          setLoading(false);
        } else {
          return generateUserAvatar();
        }
      })
      .catch(() => generateUserAvatar());

    async function generateUserAvatar() {
      try {
        const { data, error } = await supabase.functions.invoke('generate-avatar', {
          body: {
            opponentId: 'user-avatar',
            name: 'Player',
            description: 'Create a stylized anime/cartoon avatar of a confident young intellectual challenger, modern casual-smart clothing, determined expression, ready for a quiz battle. Gender-neutral appearance, cool hairstyle, slight glow effect. Upper body portrait, vibrant colors, clean background, gaming art style.',
          },
        });

        if (!error && data?.avatarUrl) {
          setAvatarUrl(data.avatarUrl);
          setCache('user-avatar', data.avatarUrl);
        }
      } catch (e) {
        console.error('User avatar generation failed:', e);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  return { avatarUrl, loading };
}
