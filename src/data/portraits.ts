// Portrait images for geniuses - ES6 imports
import millPortrait from '@/assets/geniuses/mill-portrait.jpg';
import davinciPortrait from '@/assets/geniuses/davinci-portrait.jpg';
import newtonPortrait from '@/assets/geniuses/newton-portrait.jpg';
import curiePortrait from '@/assets/geniuses/curie-portrait.jpg';
import teslaPortrait from '@/assets/geniuses/tesla-portrait.jpg';
import einsteinPortrait from '@/assets/geniuses/einstein-portrait.jpg';
import aristotlePortrait from '@/assets/geniuses/aristotle-portrait.jpg';
import pascalPortrait from '@/assets/geniuses/pascal-portrait.jpg';
import leibnizPortrait from '@/assets/geniuses/leibniz-portrait.jpg';
import goethePortrait from '@/assets/geniuses/goethe-portrait.jpg';

export const geniusPortraits: Record<string, string> = {
  'john-stuart-mill': millPortrait,
  'leonardo-da-vinci': davinciPortrait,
  'isaac-newton': newtonPortrait,
  'marie-curie': curiePortrait,
  'nikola-tesla': teslaPortrait,
  'albert-einstein': einsteinPortrait,
  'aristotle': aristotlePortrait,
  'blaise-pascal': pascalPortrait,
  'gottfried-leibniz': leibnizPortrait,
  'goethe': goethePortrait,
};

export const getGeniusPortrait = (geniusId: string): string | undefined => {
  return geniusPortraits[geniusId];
};
