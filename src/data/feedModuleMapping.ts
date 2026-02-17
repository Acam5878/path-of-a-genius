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
      if (cat.includes('math') || cat.includes('computing') || cat.includes('number') || cat.includes('geometry') || cat.includes('algebra')) return 'mathematics';
      if (cat.includes('latin')) return 'latin';
      if (cat.includes('language') || cat.includes('greek') || cat.includes('french')) return 'ancient-greek';
      if (cat.includes('physics') || cat.includes('force') || cat.includes('energy') || cat.includes('mechanics') || cat.includes('optics')) return 'physics';
      if (cat.includes('engineering') || cat.includes('design') || cat.includes('invention')) return 'engineering';
      if (cat.includes('science') || cat.includes('chemistry') || cat.includes('element')) return 'chemistry';
      if (cat.includes('philosophy') || cat.includes('ethics') || cat.includes('moral')) return 'ethics';
      if (cat.includes('art') || cat.includes('music') || cat.includes('literature') || cat.includes('poetry')) return 'literature';
      if (cat.includes('learning') || cat.includes('education') || cat.includes('reading') || cat.includes('trivium') || cat.includes('liberal')) return 'reading';
      if (cat.includes('logic') || cat.includes('reasoning') || cat.includes('fallac')) return 'logic';
      if (cat.includes('natural') || cat.includes('biology') || cat.includes('botan')) return 'natural-history';
      if (cat.includes('histor')) return 'history';
      if (cat.includes('rhetor') || cat.includes('persuasi')) return 'rhetoric';
      if (cat.includes('anatom') || cat.includes('medical')) return 'anatomy';
      if (cat.includes('thought') || cat.includes('gedanken')) return 'thought-experiments';
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
      if (genius.includes('archimedes')) return 'mathematics';
      if (genius.includes('euclid')) return 'mathematics';
      if (genius.includes('galileo')) return 'physics';
      if (genius.includes('descartes')) return 'ethics';
      if (genius.includes('socrates') || genius.includes('plato')) return 'ethics';
      if (genius.includes('cicero')) return 'rhetoric';
      if (genius.includes('shakespeare')) return 'literature';
      if (genius.includes('lavoisier')) return 'chemistry';
      // Fallback: search headline/body for subject clues
      const text = ((item.data.headline || '') + ' ' + (item.data.body || '')).toLowerCase();
      if (text.includes('greek')) return 'ancient-greek';
      if (text.includes('latin')) return 'latin';
      if (text.includes('math') || text.includes('calcul')) return 'mathematics';
      if (text.includes('physic')) return 'physics';
      if (text.includes('logic')) return 'logic';
      if (text.includes('literat') || text.includes('poetry') || text.includes('writing')) return 'literature';
      return null;
    }

    case 'connection': {
      const origin = (item.data.origin || '').toLowerCase();
      if (origin.includes('greek')) return 'ancient-greek';
      if (origin.includes('latin')) return 'latin';
      if (origin.includes('french')) return 'languages';
      if (origin.includes('arabic') || origin.includes('persian')) return 'mathematics';
      return 'ancient-greek'; // etymology defaults to Greek
    }

    case 'quote': {
      const field = (item.data.field || '').toLowerCase();
      if (field.includes('physics')) return 'physics';
      if (field.includes('math')) return 'mathematics';
      if (field.includes('philosophy')) return 'ethics';
      if (field.includes('literature') || field.includes('poetry')) return 'literature';
      if (field.includes('engineer')) return 'engineering';
      if (field.includes('logic')) return 'logic';
      if (field.includes('education') || field.includes('learning')) return 'reading';
      if (field.includes('chemistry') || field.includes('science')) return 'chemistry';
      if (field.includes('art')) return 'literature';
      if (field.includes('rhetoric')) return 'rhetoric';
      // Fallback by author
      const author = (item.data.author || '').toLowerCase();
      if (author.includes('newton')) return 'physics';
      if (author.includes('einstein')) return 'thought-experiments';
      if (author.includes('aristotle')) return 'logic';
      if (author.includes('euclid') || author.includes('pascal') || author.includes('leibniz')) return 'mathematics';
      if (author.includes('curie') || author.includes('lavoisier')) return 'chemistry';
      if (author.includes('tesla') || author.includes('vinci')) return 'engineering';
      if (author.includes('goethe') || author.includes('shakespeare') || author.includes('cicero')) return 'literature';
      if (author.includes('socrates') || author.includes('plato') || author.includes('descartes')) return 'ethics';
      if (author.includes('mill')) return 'ancient-greek';
      if (author.includes('mandela') || author.includes('plutarch')) return 'reading';
      return 'reading'; // default for quotes
    }

    case 'excerpt': {
      const author = (item.data.author || '').toLowerCase();
      const title = (item.data.workTitle || '').toLowerCase();
      if (author.includes('euclid')) return 'mathematics';
      if (author.includes('newton')) return 'physics';
      if (author.includes('aristotle')) return 'logic';
      if (author.includes('pascal')) return 'mathematics';
      if (author.includes('descartes')) return 'ethics';
      if (author.includes('cicero')) return 'rhetoric';
      if (author.includes('plato')) return 'ethics';
      if (author.includes('lavoisier')) return 'chemistry';
      if (author.includes('einstein')) return 'thought-experiments';
      if (author.includes('goethe') || author.includes('shakespeare') || author.includes('homer')) return 'literature';
      if (author.includes('ovid') || author.includes('virgil') || author.includes('horace')) return 'latin';
      if (title.includes('element') && !title.includes('chemi')) return 'mathematics';
      if (title.includes('principia')) return 'physics';
      if (title.includes('republic') || title.includes('meditat')) return 'ethics';
      if (title.includes('iliad') || title.includes('odyssey') || title.includes('faust')) return 'literature';
      if (title.includes('pensée')) return 'mathematics';
      return 'reading'; // default for excerpts
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
