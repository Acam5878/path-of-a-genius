// Maps feed content categories/topics to Path module IDs for "Learn More" navigation

import { pathModules } from '@/data/pathCurriculum';

/**
 * Maps a feed item's topic/category to the most relevant Path module ID.
 * Returns null if no relevant module is found.
 */
export function getRelevantModuleId(item: { type: string; data: any }): string | null {
  switch (item.type) {
    case 'insight': {
      const cat = (item.data.category || '').toLowerCase();
      if (cat.includes('math') || cat.includes('computing') || cat.includes('number')) return 'mathematics';
      if (cat.includes('language') || cat.includes('latin') || cat.includes('greek')) return 'ancient-greek';
      if (cat.includes('physics') || cat.includes('force') || cat.includes('energy')) return 'physics';
      if (cat.includes('engineering') || cat.includes('design')) return 'engineering';
      if (cat.includes('science') || cat.includes('chemistry')) return 'chemistry';
      if (cat.includes('philosophy') || cat.includes('ethics')) return 'ethics';
      if (cat.includes('art') || cat.includes('music') || cat.includes('literature')) return 'literature';
      if (cat.includes('learning') || cat.includes('education') || cat.includes('reading')) return 'reading';
      if (cat.includes('logic') || cat.includes('reasoning')) return 'logic';
      if (cat.includes('natural') || cat.includes('biology')) return 'natural-history';
      return 'reading'; // default
    }

    case 'whyStudy': {
      const subject = (item.data.subject || '').toLowerCase();
      const module = pathModules.find(m => m.name.toLowerCase() === subject);
      if (module) return module.id;
      if (subject.includes('greek')) return 'ancient-greek';
      if (subject.includes('latin')) return 'latin';
      if (subject.includes('math') || subject.includes('geometry') || subject.includes('algebra')) return 'mathematics';
      if (subject.includes('logic')) return 'logic';
      if (subject.includes('physic') || subject.includes('natural phil')) return 'physics';
      if (subject.includes('chemi')) return 'chemistry';
      if (subject.includes('ethic')) return 'ethics';
      if (subject.includes('rheto')) return 'rhetoric';
      if (subject.includes('engineer')) return 'engineering';
      if (subject.includes('anatom')) return 'anatomy';
      if (subject.includes('literat')) return 'literature';
      if (subject.includes('histor')) return 'history';
      if (subject.includes('language') || subject.includes('french')) return 'languages';
      if (subject.includes('thought') || subject.includes('einstein')) return 'thought-experiments';
      return null;
    }

    case 'story': {
      const genius = (item.data.genius || '').toLowerCase();
      if (genius.includes('mill')) return 'ancient-greek';
      if (genius.includes('newton')) return 'physics';
      if (genius.includes('einstein')) return 'thought-experiments';
      if (genius.includes('curie')) return 'chemistry';
      if (genius.includes('tesla')) return 'engineering';
      if (genius.includes('vinci') || genius.includes('leonardo')) return 'engineering';
      if (genius.includes('aristotle')) return 'logic';
      if (genius.includes('pascal')) return 'mathematics';
      if (genius.includes('leibniz')) return 'mathematics';
      if (genius.includes('goethe')) return 'literature';
      return null;
    }

    case 'connection': {
      const origin = (item.data.origin || '').toLowerCase();
      if (origin.includes('greek')) return 'ancient-greek';
      if (origin.includes('latin')) return 'latin';
      if (origin.includes('french')) return 'languages';
      return 'ancient-greek'; // etymology defaults to Greek
    }

    case 'quote': {
      const field = (item.data.field || '').toLowerCase();
      if (field.includes('physics')) return 'physics';
      if (field.includes('math')) return 'mathematics';
      if (field.includes('philosophy')) return 'ethics';
      if (field.includes('literature')) return 'literature';
      if (field.includes('engineer')) return 'engineering';
      return null;
    }

    default:
      return null;
  }
}

/**
 * Returns the Path module name for display in the "Learn More" button
 */
export function getModuleName(moduleId: string): string {
  const module = pathModules.find(m => m.id === moduleId);
  return module?.name || moduleId;
}
