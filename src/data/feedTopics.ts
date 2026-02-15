// Feed topic definitions and content tagging

import { FeedItem } from './feedContent';

export interface FeedTopic {
  id: string;
  label: string;
  icon: string;
  description: string;
}

export const FEED_TOPICS: FeedTopic[] = [
  { id: 'etymology', label: 'Etymology', icon: '🔤', description: 'Word origins & connections' },
  { id: 'languages', label: 'Languages & Latin', icon: '🌍', description: 'Latin, Greek & French' },
  { id: 'mathematics', label: 'Mathematics', icon: '📐', description: 'Numbers, geometry & logic puzzles' },
  { id: 'physics', label: 'Physics', icon: '⚡', description: 'Forces, energy & the universe' },
  { id: 'philosophy', label: 'Philosophy', icon: '🏛️', description: 'Ideas, ethics & reasoning' },
  { id: 'science', label: 'Science & Engineering', icon: '🔬', description: 'Discovery & invention' },
  { id: 'history', label: 'History & Stories', icon: '📖', description: 'Tales of genius lives' },
  { id: 'art', label: 'Art & Literature', icon: '🎨', description: 'Creativity & expression' },
  { id: 'learning', label: 'Learning Methods', icon: '🧠', description: 'How to study effectively' },
];

// Map a FeedItem to one or more topic IDs
export function getItemTopics(item: FeedItem): string[] {
  switch (item.type) {
    case 'connection':
      return ['etymology'];

    case 'quote': {
      const field = item.data.field.toLowerCase();
      if (field.includes('physics')) return ['physics'];
      if (field.includes('math')) return ['mathematics'];
      if (field.includes('philosophy')) return ['philosophy'];
      if (field.includes('engineer')) return ['science'];
      if (field.includes('science') || field.includes('art')) return ['art', 'science'];
      if (field.includes('literature')) return ['art'];
      return ['philosophy']; // default for quotes
    }

    case 'insight': {
      const cat = item.data.category.toLowerCase();
      if (cat.includes('learning') || cat.includes('education')) return ['learning'];
      if (cat.includes('math') || cat.includes('computing')) return ['mathematics'];
      if (cat.includes('language')) return ['languages'];
      if (cat.includes('physics')) return ['physics'];
      if (cat.includes('engineering')) return ['science'];
      if (cat.includes('science')) return ['science'];
      if (cat.includes('philosophy')) return ['philosophy'];
      if (cat.includes('art') || cat.includes('curiosity') || cat.includes('music')) return ['art'];
      return ['learning'];
    }

    case 'story':
      return ['history'];

    case 'whyStudy': {
      const subject = item.data.subject.toLowerCase();
      if (subject.includes('math') || subject.includes('arith') || subject.includes('geo')) return ['mathematics'];
      if (subject.includes('latin') || subject.includes('lang') || subject.includes('french')) return ['languages'];
      if (subject.includes('logic') || subject.includes('rhet') || subject.includes('philos')) return ['philosophy'];
      if (subject.includes('physic') || subject.includes('astro')) return ['physics'];
      if (subject.includes('music') || subject.includes('art')) return ['art'];
      return ['learning'];
    }

    case 'excerpt': {
      const author = item.data.author.toLowerCase();
      if (author.includes('newton') || author.includes('einstein') || author.includes('curie')) return ['physics', 'science'];
      if (author.includes('mill') || author.includes('aristotle') || author.includes('pascal')) return ['philosophy'];
      if (author.includes('tesla')) return ['science'];
      if (author.includes('vinci') || author.includes('goethe')) return ['art'];
      if (author.includes('leibniz')) return ['mathematics'];
      return ['philosophy'];
    }

    case 'quiz': {
      const id = item.data.id;
      if (id.startsWith('fq-math')) return ['mathematics'];
      if (id.startsWith('fq-latin')) return ['languages'];
      if (id.startsWith('fq-greek')) return ['languages', 'etymology'];
      if (id.startsWith('fq-sci')) return ['science', 'physics'];
      // Lesson quizzes - try to categorise by id
      if (id.includes('logic') || id.includes('rhetoric') || id.includes('philos')) return ['philosophy'];
      if (id.includes('math') || id.includes('arith') || id.includes('geo') || id.includes('euclid')) return ['mathematics'];
      if (id.includes('latin') || id.includes('lang') || id.includes('french')) return ['languages'];
      if (id.includes('phys') || id.includes('newton') || id.includes('einstein')) return ['physics'];
      return ['learning'];
    }

    default:
      return ['learning'];
  }
}

// Filter feed items by selected topics
export function filterByTopics(items: FeedItem[], selectedTopics: string[]): FeedItem[] {
  if (selectedTopics.length === 0) return items; // no filter = show all
  return items.filter(item => {
    const topics = getItemTopics(item);
    return topics.some(t => selectedTopics.includes(t));
  });
}
