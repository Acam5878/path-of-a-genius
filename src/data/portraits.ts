// Portrait images for geniuses - ES6 imports
import millPortrait from '@/assets/geniuses/mill-portrait.jpg';
import davinciPortrait from '@/assets/geniuses/davinci-portrait.jpg';
import newtonPortrait from '@/assets/geniuses/newton-portrait.jpg';

export const geniusPortraits: Record<string, string> = {
  'john-stuart-mill': millPortrait,
  'leonardo-da-vinci': davinciPortrait,
  'isaac-newton': newtonPortrait,
};

export const getGeniusPortrait = (geniusId: string): string | undefined => {
  return geniusPortraits[geniusId];
};
