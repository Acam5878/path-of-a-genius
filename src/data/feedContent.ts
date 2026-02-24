// Feed content data - fetched from database with local fallbacks

import { geniuses } from '@/data/geniuses';
import { pathModules } from '@/data/pathCurriculum';
import { QuizQuestion } from '@/data/quizzes';
import { supabase } from '@/integrations/supabase/client';

// ── Types ────────────────────────────────────────────────────────────────

export type FeedItem =
  | { type: 'quote'; data: { text: string; author: string; field: string } }
  | { type: 'insight'; data: { title: string; body: string; category: string; icon: string } }
  | { type: 'story'; data: { headline: string; body: string; genius: string } }
  | { type: 'connection'; data: { term: string; origin: string; meaning: string; modern: string } }
  | { type: 'whyStudy'; data: { subject: string; text: string; icon: string } }
  | { type: 'excerpt'; data: { text: string; workTitle: string; author: string; year: string | number; url: string } }
  | { type: 'quiz'; data: QuizQuestion & { clue?: string } }
  | { type: 'flashcard'; data: { front: string; back: string; moduleId: string; moduleName: string; cardId: string; options?: string[]; correctAnswer?: number } }
  | { type: 'brainComparison'; data: Record<string, never> };

// ── Genius quotes (derived from geniuses data, always local) ────────────

const geniusQuotes: FeedItem[] = geniuses.map(g => ({
  type: 'quote' as const,
  data: { text: g.famousQuote, author: g.name, field: g.field },
}));

// ── Why Study items (derived from path modules, always local) ───────────

export const whyStudyItems: FeedItem[] = pathModules.slice(0, 8).map(m => ({
  type: 'whyStudy' as const,
  data: { subject: m.name, text: m.whyStudy || m.introText || '', icon: m.icon },
}));

// ── IQ Training questions (lazy-loaded from IQ bank) ──

let iqFeedQuestionsCache: FeedItem[] | null = null;

async function getIqFeedQuestions(): Promise<FeedItem[]> {
  if (iqFeedQuestionsCache) return iqFeedQuestionsCache;
  const { verbalQuestionBank, logicalQuestionBank, patternQuestionBank, spatialQuestionBank } = await import('@/data/iqQuestionBank');
  
  function iqToFeedQuiz(questions: typeof verbalQuestionBank, limit: number): FeedItem[] {
    return questions
      .filter(q => q.options && q.options.length >= 2)
      .slice(0, limit)
      .map(q => ({
        type: 'quiz' as const,
        data: {
          id: `iq-${q.id}`,
          question: q.question,
          options: q.options!,
          correctAnswer: q.options!.indexOf(String(q.correctAnswer)),
          explanation: q.explanation || 'Great cognitive exercise!',
        },
      }));
  }
  
  iqFeedQuestionsCache = [
    ...iqToFeedQuiz(verbalQuestionBank, 8),
    ...iqToFeedQuiz(logicalQuestionBank, 8),
    ...iqToFeedQuiz(patternQuestionBank, 5),
    ...iqToFeedQuiz(spatialQuestionBank, 4),
  ];
  return iqFeedQuestionsCache;
}

// ── Literature quotes (always local) ────────────────────────────────────

const literatureQuotes: FeedItem[] = [
  { type: 'quote' as const, data: { text: 'The only way to do great work is to love what you do.', author: 'Leonardo da Vinci', field: 'Art & Literature' } },
  { type: 'quote' as const, data: { text: 'In the middle of difficulty lies opportunity.', author: 'Albert Einstein', field: 'Physics & Literature' } },
  { type: 'quote' as const, data: { text: 'The unexamined life is not worth living.', author: 'Socrates', field: 'Philosophy & Literature' } },
  { type: 'quote' as const, data: { text: 'I think, therefore I am.', author: 'René Descartes', field: 'Philosophy & Literature' } },
  { type: 'quote' as const, data: { text: 'To be, or not to be, that is the question.', author: 'William Shakespeare', field: 'Literature' } },
  { type: 'quote' as const, data: { text: 'The mind is not a vessel to be filled, but a fire to be kindled.', author: 'Plutarch', field: 'Literature & Philosophy' } },
  { type: 'quote' as const, data: { text: 'One cannot step twice in the same river.', author: 'Heraclitus', field: 'Philosophy & Literature' } },
  { type: 'quote' as const, data: { text: 'Imagination is more important than knowledge.', author: 'Albert Einstein', field: 'Physics & Literature' } },
  { type: 'quote' as const, data: { text: 'The only true wisdom is in knowing you know nothing.', author: 'Socrates', field: 'Philosophy & Literature' } },
  { type: 'quote' as const, data: { text: 'Education is the most powerful weapon which you can use to change the world.', author: 'Nelson Mandela', field: 'Literature & Education' } },
  { type: 'quote' as const, data: { text: 'A room without books is like a body without a soul.', author: 'Marcus Tullius Cicero', field: 'Literature' } },
  { type: 'quote' as const, data: { text: 'It is the mark of an educated mind to be able to entertain a thought without accepting it.', author: 'Aristotle', field: 'Philosophy & Literature' } },
  { type: 'quote' as const, data: { text: 'Man is born free, and everywhere he is in chains.', author: 'Jean-Jacques Rousseau', field: 'Literature & Philosophy' } },
  { type: 'quote' as const, data: { text: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.', author: 'Aristotle', field: 'Philosophy & Literature' } },
  { type: 'quote' as const, data: { text: 'The pen is mightier than the sword.', author: 'Edward Bulwer-Lytton', field: 'Literature' } },
];

// ── Curriculum knowledge quizzes ────────────────────────────────────────

const curriculumQuizzes: FeedItem[] = [
  // Latin Cases & Grammar
  { type: 'quiz' as const, data: { id: 'fq-lat-1', question: 'Which Latin case marks the subject of a sentence?', options: ['Accusative', 'Nominative', 'Genitive', 'Ablative'], correctAnswer: 1, explanation: 'The nominative case always marks the subject — the one doing the action.' } },
  { type: 'quiz' as const, data: { id: 'fq-lat-2', question: 'What does "puellam" mean, and what case is it?', options: ['Girl (nominative)', 'Girl (accusative)', 'Girls (genitive)', 'Of the girl'], correctAnswer: 1, explanation: 'The -am ending marks the accusative (direct object). Puellam = "the girl" receiving the action.' } },
  { type: 'quiz' as const, data: { id: 'fq-lat-3', question: 'Which declension are nouns ending in -a (like rosa, puella)?', options: ['Second', 'Third', 'First', 'Fourth'], correctAnswer: 2, explanation: 'First declension nouns typically end in -a and are mostly feminine.' } },
  { type: 'quiz' as const, data: { id: 'fq-lat-4', question: '"Carpe diem" translates to…', options: ['Remember death', 'Seize the day', 'Fortune favors the brave', 'I came, I saw'], correctAnswer: 1, explanation: 'Carpe diem — "seize the day" — comes from the Roman poet Horace.' } },
  { type: 'quiz' as const, data: { id: 'fq-lat-5', question: 'In Latin, why can word order be flexible?', options: ['Latin has no grammar rules', 'Case endings show word function', 'All words sound the same', 'Latin reads right to left'], correctAnswer: 1, explanation: 'Case endings (not word order) tell you each word\'s role — subject, object, etc.' } },
  { type: 'quiz' as const, data: { id: 'fq-lat-6', question: 'What is special about neuter nouns in Latin?', options: ['They have no plural', 'Nominative = accusative always', 'They are always third declension', 'They have no genitive'], correctAnswer: 1, explanation: 'For neuter nouns, the nominative and accusative forms are always identical.' } },
  { type: 'quiz' as const, data: { id: 'fq-lat-7', question: '"Veni, vidi, vici" was said by…', options: ['Cicero', 'Augustus', 'Julius Caesar', 'Virgil'], correctAnswer: 2, explanation: 'Julius Caesar said "I came, I saw, I conquered" after a quick military victory in 47 BC.' } },
  { type: 'quiz' as const, data: { id: 'fq-lat-8', question: 'What does the genitive case express?', options: ['Direct object', 'Subject', 'Possession (of)', 'Location'], correctAnswer: 2, explanation: 'The genitive shows possession or origin — like "of the girl" (puellae).' } },

  // Chemistry
  { type: 'quiz' as const, data: { id: 'fq-chem-1', question: 'What pH value is neutral?', options: ['0', '5', '7', '14'], correctAnswer: 2, explanation: 'pH 7 is neutral — pure water. Below 7 is acidic, above 7 is basic.' } },
  { type: 'quiz' as const, data: { id: 'fq-chem-2', question: 'Which element did Marie Curie discover?', options: ['Uranium', 'Radium', 'Plutonium', 'Thorium'], correctAnswer: 1, explanation: 'Marie Curie discovered both radium (88) and polonium (84) through painstaking work.' } },
  { type: 'quiz' as const, data: { id: 'fq-chem-3', question: 'What is the most abundant element in the universe?', options: ['Oxygen', 'Carbon', 'Helium', 'Hydrogen'], correctAnswer: 3, explanation: 'Hydrogen makes up about 75% of all normal matter in the universe.' } },
  { type: 'quiz' as const, data: { id: 'fq-chem-4', question: 'In a chemical reaction, what is conserved?', options: ['Color', 'Temperature', 'Mass', 'Volume'], correctAnswer: 2, explanation: 'The Law of Conservation of Mass: atoms rearrange but total mass stays the same.' } },
  { type: 'quiz' as const, data: { id: 'fq-chem-5', question: 'Red cabbage juice can be used as a…', options: ['Fuel source', 'pH indicator', 'Preservative', 'Catalyst'], correctAnswer: 1, explanation: 'Red cabbage juice changes color based on pH: red in acid, blue/green in base.' } },

  // Physics
  { type: 'quiz' as const, data: { id: 'fq-phys-1', question: 'Newton\'s First Law is also called the law of…', options: ['Gravity', 'Inertia', 'Energy', 'Thermodynamics'], correctAnswer: 1, explanation: 'Inertia — objects resist changes in their state of motion.' } },
  { type: 'quiz' as const, data: { id: 'fq-phys-2', question: 'What does F = ma mean?', options: ['Frequency = mass × area', 'Force = mass × acceleration', 'Friction = motion × angle', 'Flow = matter × action'], correctAnswer: 1, explanation: 'Newton\'s Second Law: Force equals mass times acceleration.' } },
  { type: 'quiz' as const, data: { id: 'fq-phys-3', question: 'E = mc² means that…', options: ['Energy equals mass times the speed of light squared', 'Electricity equals magnetism times charge squared', 'Entropy equals matter times constant squared', 'Energy equals momentum times capacity squared'], correctAnswer: 0, explanation: 'Einstein\'s famous equation shows mass and energy are equivalent — a tiny amount of mass contains enormous energy.' } },
  { type: 'quiz' as const, data: { id: 'fq-phys-4', question: 'What fascinated 5-year-old Einstein and sparked his lifelong curiosity?', options: ['A telescope', 'A compass', 'A prism', 'A pendulum'], correctAnswer: 1, explanation: 'Einstein was amazed that an invisible force could move a compass needle — this wonder about invisible forces never left him.' } },
  { type: 'quiz' as const, data: { id: 'fq-phys-5', question: 'At the lowest point of a pendulum swing, energy is mostly…', options: ['Potential', 'Thermal', 'Kinetic', 'Chemical'], correctAnswer: 2, explanation: 'At the bottom of the swing, all potential energy has converted to kinetic energy (energy of motion).' } },

  // Logic
  { type: 'quiz' as const, data: { id: 'fq-logic-1', question: 'What is an "Ad Hominem" fallacy?', options: ['Attacking the argument', 'Attacking the person instead of their argument', 'Using emotional appeals', 'Presenting only two options'], correctAnswer: 1, explanation: 'Ad Hominem attacks the person making the argument rather than the argument itself.' } },
  { type: 'quiz' as const, data: { id: 'fq-logic-2', question: 'In a syllogism, what follows from the premises?', options: ['A hypothesis', 'A question', 'A conclusion', 'A premise'], correctAnswer: 2, explanation: 'A syllogism draws a conclusion that logically follows from two premises.' } },
  { type: 'quiz' as const, data: { id: 'fq-logic-3', question: 'The Law of Non-Contradiction states that…', options: ['Everything is relative', 'Nothing can be both true and false at the same time', 'Truth is subjective', 'All arguments are valid'], correctAnswer: 1, explanation: 'A thing cannot be both A and not-A simultaneously — this is fundamental to all reasoning.' } },
  { type: 'quiz' as const, data: { id: 'fq-logic-4', question: 'Deductive reasoning moves from…', options: ['Specific to general', 'General to specific', 'Effect to cause', 'Past to future'], correctAnswer: 1, explanation: 'Deduction: start with a general rule, apply to a specific case, get a certain conclusion.' } },

  // Greek
  { type: 'quiz' as const, data: { id: 'fq-grk-1', question: 'The Greek word "φιλοσοφία" (philosophia) literally means…', options: ['Study of nature', 'Love of wisdom', 'Art of speaking', 'Science of mind'], correctAnswer: 1, explanation: 'From φίλος (philos, love) + σοφία (sophia, wisdom) — philosophy is literally "love of wisdom."' } },
  { type: 'quiz' as const, data: { id: 'fq-grk-2', question: 'How many letters are in the Greek alphabet?', options: ['22', '24', '26', '28'], correctAnswer: 1, explanation: 'The Greek alphabet has 24 letters: 7 vowels and 17 consonants.' } },
  { type: 'quiz' as const, data: { id: 'fq-grk-3', question: 'The Greek word "δημοκρατία" gives us which English word?', options: ['Democrat', 'Democracy', 'Demographic', 'All of these'], correctAnswer: 3, explanation: 'From δῆμος (demos, people) + κράτος (kratos, power) — all three derive from this root.' } },

  // Math
  { type: 'quiz' as const, data: { id: 'fq-math-1', question: 'How many postulates did Euclid start with?', options: ['3', '5', '7', '10'], correctAnswer: 1, explanation: 'Euclid built all of geometry from just 5 postulates (self-evident starting assumptions).' } },
  { type: 'quiz' as const, data: { id: 'fq-math-2', question: 'The Pythagorean theorem states that a² + b² = …', options: ['c', 'c²', '2c', 'c³'], correctAnswer: 1, explanation: 'In a right triangle, the square of the hypotenuse (c²) equals the sum of the squares of the other two sides.' } },
  { type: 'quiz' as const, data: { id: 'fq-math-3', question: 'What is a "postulate" in mathematics?', options: ['A proven fact', 'A self-evident truth accepted without proof', 'A formula', 'A type of equation'], correctAnswer: 1, explanation: 'A postulate (axiom) is a starting assumption accepted as true without proof — the foundation of mathematical systems.' } },
];

// ── Etymology connections ───────────────────────────────────────────────

const etymologyConnections: FeedItem[] = [
  { type: 'connection' as const, data: { term: 'Democracy', origin: 'Greek: δῆμος (demos) + κράτος (kratos)', meaning: 'People + Power', modern: 'A system of government by the people — from the Greek words for "people" and "power."' } },
  { type: 'connection' as const, data: { term: 'Inertia', origin: 'Latin: iners (idle, sluggish)', meaning: 'Sluggishness, idleness', modern: 'Newton used this Latin word to describe an object\'s resistance to changes in motion.' } },
  { type: 'connection' as const, data: { term: 'Hydrogen', origin: 'Greek: ὕδωρ (hydor) + γεννάω (gennao)', meaning: 'Water-producer', modern: 'Named because burning hydrogen produces water (H₂O). The Greek roots are everywhere in chemistry.' } },
  { type: 'connection' as const, data: { term: 'Syllogism', origin: 'Greek: συλλογισμός (syllogismos)', meaning: 'Reasoning together', modern: 'From σύν (syn, together) + λόγος (logos, reason). Aristotle formalized this method of logical deduction.' } },
  { type: 'connection' as const, data: { term: 'Accusative', origin: 'Latin: accusativus', meaning: 'Relating to accusation', modern: 'The grammatical case for the direct object — the thing that "receives" the action.' } },
  { type: 'connection' as const, data: { term: 'Geometry', origin: 'Greek: γῆ (ge) + μέτρον (metron)', meaning: 'Earth-measurement', modern: 'Originally the science of measuring land — Euclid transformed it into pure mathematical reasoning.' } },
  { type: 'connection' as const, data: { term: 'Kinetic', origin: 'Greek: κίνησις (kinesis)', meaning: 'Motion, movement', modern: 'Kinetic energy is the energy of motion — from κινεῖν (kinein), "to move."' } },
  { type: 'connection' as const, data: { term: 'Equilibrium', origin: 'Latin: aequus (equal) + libra (balance)', meaning: 'Equal balance', modern: 'When all forces are balanced — from the Latin for "equal" and "scales."' } },
];

// ── Curriculum insights ─────────────────────────────────────────────────

const curriculumInsights: FeedItem[] = [
  { type: 'insight' as const, data: { title: 'Why Cases Matter', body: 'English uses word order to show meaning. Latin uses word endings (cases). That\'s why Roman poets could arrange words for beauty and emphasis — the endings told you the grammar.', category: 'Latin', icon: '📜' } },
  { type: 'insight' as const, data: { title: 'The pH of Your Body', body: 'Your blood maintains a pH of exactly 7.35-7.45. Even a small change can be life-threatening. Your body uses chemical buffers to keep this balance — the chemistry you\'re learning in action.', category: 'Chemistry', icon: '⚗️' } },
  { type: 'insight' as const, data: { title: 'Newton\'s Laws in Sports', body: 'Every sport demonstrates Newton\'s laws. A baseball bat transfers force (F=ma), a goalkeeper uses inertia, and a swimmer pushes water backward to move forward (action-reaction).', category: 'Physics', icon: '🔬' } },
  { type: 'insight' as const, data: { title: 'Fallacies in Advertising', body: 'Next time you see an ad, look for logical fallacies: celebrity endorsements (appeal to authority), fear-based messaging (appeal to emotion), and "everyone\'s buying it" (bandwagon).', category: 'Logic', icon: '🧠' } },
  { type: 'insight' as const, data: { title: 'Greek in Medicine', body: 'Almost every medical term comes from Greek: cardiology (καρδία, heart), dermatology (δέρμα, skin), neurology (νεῦρον, nerve). Learning Greek roots means medical terminology makes instant sense.', category: 'Greek', icon: '🏛️' } },
  { type: 'insight' as const, data: { title: 'Euclid\'s Lasting Impact', body: 'Abraham Lincoln studied Euclid\'s Elements to sharpen his legal reasoning. The method of building complex truths from simple axioms is used in law, computer science, and philosophy.', category: 'Mathematics', icon: '📐' } },
  { type: 'insight' as const, data: { title: 'Latin in Law', body: 'Courts worldwide use Latin daily: habeas corpus (produce the body), pro bono (for the good), subpoena (under penalty). Every law student encounters the Latin you\'re learning.', category: 'Latin', icon: '📜' } },
  { type: 'insight' as const, data: { title: 'Einstein\'s Compass Moment', body: 'At age 5, Einstein received a compass and was mesmerized that an invisible force moved the needle. This single moment of wonder launched a lifetime of questioning invisible forces.', category: 'Physics', icon: '🔬' } },
];

// ── Latin translation sentences ─────────────────────────────────────────

const latinTranslations: FeedItem[] = [
  { type: 'insight' as const, data: { title: '"Puella rosam amat"', body: 'Translation: "The girl loves the rose." Notice how puella (nominative) is the subject and rosam (accusative, -am ending) is the object. You could rearrange these words in any order and the meaning stays the same — that\'s the power of cases.', category: 'Latin Translation', icon: '📜' } },
  { type: 'insight' as const, data: { title: '"Agricola filiam vocat"', body: 'Translation: "The farmer calls his daughter." Agricola is first declension masculine (one of the rare -a ending males). Filiam has the -am accusative ending — she\'s receiving the action of being called.', category: 'Latin Translation', icon: '📜' } },
  { type: 'insight' as const, data: { title: '"Poeta puellae rosam dat"', body: 'Translation: "The poet gives a rose to the girl." Three cases in one sentence: poeta (nominative — who gives), rosam (accusative — what\'s given), puellae (dative — to whom).', category: 'Latin Translation', icon: '📜' } },
  { type: 'insight' as const, data: { title: '"Stellas in caelo videmus"', body: 'Translation: "We see the stars in the sky." Stellas (accusative plural) — the stars are what we see. In caelo uses the ablative case with the preposition "in" to show location.', category: 'Latin Translation', icon: '📜' } },
  { type: 'insight' as const, data: { title: '"Magister discipulos docet"', body: 'Translation: "The teacher teaches the students." Magister (nominative) does the teaching. Discipulos (accusative plural, -os ending) are the ones being taught. Our word "disciple" comes from discipulus.', category: 'Latin Translation', icon: '📜' } },
];

// ── Greek translation sentences ─────────────────────────────────────────

const greekTranslations: FeedItem[] = [
  { type: 'insight' as const, data: { title: '"ὁ ἄνθρωπος σοφός ἐστιν"', body: 'Translation: "The man is wise." ὁ (ho) is the definite article "the", ἄνθρωπος (anthropos) gives us "anthropology", σοφός (sophos) gives us "philosophy" — love of wisdom. Every word lives on in English.', category: 'Greek Translation', icon: '🏛️' } },
  { type: 'insight' as const, data: { title: '"γνῶθι σεαυτόν"', body: 'Translation: "Know thyself." Inscribed at the Temple of Apollo at Delphi, this was the foundational principle of Greek philosophy. Socrates made it the starting point of all wisdom.', category: 'Greek Translation', icon: '🏛️' } },
  { type: 'insight' as const, data: { title: '"ἡ ψυχή ἐστιν ἀθάνατος"', body: 'Translation: "The soul is immortal." From Plato\'s Phaedo. ψυχή (psyche) gives us "psychology", and ἀθάνατος (athanatos, deathless) combines ἀ- (not) + θάνατος (thanatos, death).', category: 'Greek Translation', icon: '🏛️' } },
  { type: 'insight' as const, data: { title: '"πάντα ῥεῖ"', body: 'Translation: "Everything flows." Attributed to Heraclitus — the idea that change is the only constant. ῥεῖ (rhei, to flow) gives us "rheumatism" and "rhythm" — things that flow and move.', category: 'Greek Translation', icon: '🏛️' } },
  { type: 'insight' as const, data: { title: '"ἄριστον μὲν ὕδωρ"', body: 'Translation: "Water is best." The opening line of Pindar\'s first Olympian Ode. ἄριστον (ariston, best) gives us "aristocracy" — rule by the best. ὕδωρ (hydor, water) gives us "hydrate."', category: 'Greek Translation', icon: '🏛️' } },
];

// ── Everyday Latin phrases you already use ──────────────────────────────

const everydayLatinPhrases: FeedItem[] = [
  { type: 'connection' as const, data: { term: 'Ad hoc', origin: 'Latin: ad (to) + hoc (this)', meaning: 'For this specific purpose', modern: 'You say "ad hoc meeting" without realising it\'s pure Latin. It means something arranged for one particular occasion, not planned in advance.' } },
  { type: 'connection' as const, data: { term: 'Bona fide', origin: 'Latin: bona (good) + fide (faith)', meaning: 'In good faith; genuine', modern: '"A bona fide expert" — you\'re speaking Latin! It means genuine and sincere, from the ablative of fides (faith).' } },
  { type: 'connection' as const, data: { term: 'Vice versa', origin: 'Latin: vice (in place of) + versa (turned)', meaning: 'The other way around', modern: 'Literally "the position being turned." You probably use this weekly without knowing it\'s a Latin ablative absolute construction.' } },
  { type: 'connection' as const, data: { term: 'Per se', origin: 'Latin: per (through) + se (itself)', meaning: 'By itself; intrinsically', modern: '"It\'s not illegal per se" — straight from Roman legal language. It means something considered in its own nature, without external factors.' } },
  { type: 'connection' as const, data: { term: 'Status quo', origin: 'Latin: status (state) + quo (in which)', meaning: 'The existing state of affairs', modern: 'Politicians love this phrase. It\'s Latin for "the state in which things are" — the current situation unchanged.' } },
  { type: 'connection' as const, data: { term: 'Alma mater', origin: 'Latin: alma (nourishing) + mater (mother)', meaning: 'Nourishing mother', modern: 'Your university is your "nourishing mother." Medieval students called their university this because it fed their minds.' } },
  { type: 'connection' as const, data: { term: 'Alibi', origin: 'Latin: alibi (elsewhere)', meaning: 'In another place', modern: '"He has an alibi" — pure Latin meaning "elsewhere." In law, it means proving you were somewhere else when the crime happened.' } },
  { type: 'connection' as const, data: { term: 'Agenda', origin: 'Latin: agenda (things to be done)', meaning: 'Things that must be acted upon', modern: 'Every meeting has one. It\'s actually a Latin gerundive plural — literally "things needing to be done." The singular would be agendum.' } },
];

// ── Literature quiz questions ───────────────────────────────────────────

const literatureFeedQuizzes: FeedItem[] = [
  { type: 'quiz' as const, data: { id: 'fq-lit-1', question: 'Who wrote "The Republic"?', options: ['Socrates', 'Plato', 'Aristotle', 'Homer'], correctAnswer: 1, explanation: 'Plato wrote The Republic, exploring justice, the ideal state, and the philosopher-king.' } },
  { type: 'quiz' as const, data: { id: 'fq-lit-2', question: 'Which ancient work begins with "Sing, O goddess, the anger of Achilles"?', options: ['The Odyssey', 'The Iliad', 'The Aeneid', 'Metamorphoses'], correctAnswer: 1, explanation: 'The Iliad by Homer begins with this famous invocation about the wrath of Achilles.' } },
  { type: 'quiz' as const, data: { id: 'fq-lit-3', question: '"Cogito, ergo sum" was written by which philosopher?', options: ['Spinoza', 'Leibniz', 'Descartes', 'Locke'], correctAnswer: 2, explanation: '"I think, therefore I am" is the foundational statement by René Descartes in his Meditations.' } },
  { type: 'quiz' as const, data: { id: 'fq-lit-4', question: 'Who wrote "Principia Mathematica" (1687)?', options: ['Leibniz', 'Newton', 'Galileo', 'Euler'], correctAnswer: 1, explanation: 'Isaac Newton\'s Principia laid the foundations of classical mechanics and universal gravitation.' } },
  { type: 'quiz' as const, data: { id: 'fq-lit-5', question: 'Which Shakespeare play features the line "All the world\'s a stage"?', options: ['Hamlet', 'Macbeth', 'As You Like It', 'The Tempest'], correctAnswer: 2, explanation: 'The famous monologue appears in As You Like It, spoken by the character Jaques.' } },
  { type: 'quiz' as const, data: { id: 'fq-lit-6', question: '"Pensées" is a collection of fragments by which thinker?', options: ['Montaigne', 'Pascal', 'Voltaire', 'Rousseau'], correctAnswer: 1, explanation: 'Blaise Pascal\'s Pensées is a defence of the Christian religion, left incomplete at his death.' } },
  { type: 'quiz' as const, data: { id: 'fq-lit-7', question: 'Who wrote "Faust", considered one of the greatest works of German literature?', options: ['Schiller', 'Goethe', 'Hegel', 'Kant'], correctAnswer: 1, explanation: 'Johann Wolfgang von Goethe wrote Faust over the course of almost 60 years.' } },
  { type: 'quiz' as const, data: { id: 'fq-lit-8', question: 'The term "Utopia" was coined by which writer?', options: ['Plato', 'Thomas More', 'Francis Bacon', 'Machiavelli'], correctAnswer: 1, explanation: 'Thomas More coined "Utopia" in his 1516 book describing an ideal island society.' } },
  { type: 'quiz' as const, data: { id: 'fq-lit-9', question: 'Who wrote "On Liberty" (1859)?', options: ['John Locke', 'John Stuart Mill', 'Thomas Hobbes', 'Adam Smith'], correctAnswer: 1, explanation: 'John Stuart Mill\'s On Liberty is a foundational text on individual freedom and the limits of authority.' } },
  { type: 'quiz' as const, data: { id: 'fq-lit-10', question: '"Eureka!" is attributed to which ancient thinker?', options: ['Pythagoras', 'Archimedes', 'Euclid', 'Thales'], correctAnswer: 1, explanation: 'Archimedes reportedly shouted "Eureka!" upon discovering the principle of buoyancy while bathing.' } },
];

// ── Fetch content from database ─────────────────────────────────────────

// Fisher-Yates shuffle
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// In-memory cache — avoids re-fetching on every Feed mount
let cachedDbItems: { type: string; data: any }[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes


export async function fetchFeedContent(): Promise<{
  allQuotes: FeedItem[];
  insights: FeedItem[];
  stories: FeedItem[];
  connections: FeedItem[];
  excerpts: FeedItem[];
  feedQuizQuestions: FeedItem[];
}> {
  try {
    // Start IQ questions loading in parallel with DB fetch
    const iqPromise = getIqFeedQuestions();
    let items: { type: string; data: any }[];

    // Use cached data if fresh enough
    if (cachedDbItems && Date.now() - cacheTimestamp < CACHE_TTL_MS) {
      items = cachedDbItems;
    } else {
      const { data, error } = await supabase
        .from('feed_content')
        .select('type, data')
        .eq('is_active', true);

      if (error || !data || data.length === 0) {
        console.warn('Failed to fetch feed content from DB, using empty arrays:', error);
        const iqItems = await iqPromise;
        return {
          allQuotes: shuffle([...geniusQuotes, ...literatureQuotes]),
          insights: [],
          stories: [],
          connections: [],
          excerpts: [],
          feedQuizQuestions: shuffle([...iqItems, ...literatureFeedQuizzes]),
        };
      }

      items = data as { type: string; data: any }[];
      cachedDbItems = items;
      cacheTimestamp = Date.now();
    }
    
    
    const dbQuotes: FeedItem[] = items
      .filter(i => i.type === 'quote')
      .map(i => ({ type: 'quote' as const, data: i.data }));

    const insights: FeedItem[] = items
      .filter(i => i.type === 'insight')
      .map(i => ({ type: 'insight' as const, data: i.data }));

    const stories: FeedItem[] = items
      .filter(i => i.type === 'story')
      .map(i => ({ type: 'story' as const, data: i.data }));

    const connections: FeedItem[] = items
      .filter(i => i.type === 'connection')
      .map(i => ({ type: 'connection' as const, data: i.data }));

    const excerpts: FeedItem[] = items
      .filter(i => i.type === 'excerpt')
      .map(i => ({ type: 'excerpt' as const, data: i.data }));

    const feedQuizQuestions: FeedItem[] = items
      .filter(i => i.type === 'quiz')
      .map(i => ({ type: 'quiz' as const, data: i.data }));

    const iqItems = await iqPromise;

    return {
      allQuotes: shuffle([...geniusQuotes, ...literatureQuotes, ...dbQuotes]),
      insights: shuffle([...curriculumInsights, ...latinTranslations, ...greekTranslations, ...insights]),
      stories: shuffle(stories),
      connections: shuffle([...etymologyConnections, ...everydayLatinPhrases, ...connections]),
      excerpts: shuffle(excerpts),
      feedQuizQuestions: shuffle([...iqItems, ...literatureFeedQuizzes, ...curriculumQuizzes, ...feedQuizQuestions]),
    };
  } catch (err) {
    console.error('Error fetching feed content:', err);
    const iqItems = await getIqFeedQuestions().catch(() => [] as FeedItem[]);
    return {
      allQuotes: shuffle([...geniusQuotes, ...literatureQuotes]),
      insights: [],
      stories: [],
      connections: [],
      excerpts: [],
      feedQuizQuestions: shuffle([...iqItems, ...literatureFeedQuizzes]),
    };
  }
}

// ── Quiz clues ──────────────────────────────────────────────────────────

export const quizClues: Record<string, string> = {
  'mill-greek': '"By age 3, Mill was reading Aesop\'s Fables in the original Greek..." — from his Autobiography',
  'mill-latin': '"I learnt Latin... at the same time with a considerable number of Greek authors." — Mill, Autobiography',
  'mill-logic': '"The purpose of logic is to show us the way to truth." — Mill on Aristotle\'s system',
  'euclid': '"A point is that which has no part. A line is breadthless length." — Euclid, Elements, Book I',
  'newton': '"Every body continues in its state of rest unless compelled to change..." — Newton, Principia',
  'einstein': '"The most incomprehensible thing about the world is that it is comprehensible." — Einstein',
  'tesla': '"I do not think there is any thrill like that felt by the inventor..." — Tesla, My Inventions',
  'curie': '"Nothing in life is to be feared, it is only to be understood." — Marie Curie',
  'davinci': '"Study painting and you study anatomy, optics, geometry, and history." — Da Vinci, Notebooks',
  'pascal': '"Man is but a reed, the most feeble thing in nature; but he is a thinking reed." — Pascal, Pensées',
  'leibniz': '"Music is the pleasure the human mind experiences from counting without being aware." — Leibniz',
  'aristotle': '"The unexamined life is not worth living." — derived from Aristotle',
  'goethe': '"Whatever you can do, or dream you can, begin it." — attributed to Goethe',
};

export function getClueForQuiz(lessonId: string): string | undefined {
  for (const [key, clue] of Object.entries(quizClues)) {
    if (lessonId.toLowerCase().includes(key)) return clue;
  }
  return undefined;
}

// Background gradients per card type
export const cardGradients: Record<string, string> = {
  quote: 'from-[hsl(217,30%,12%)] to-[hsl(217,30%,20%)]',
  insight: 'from-[hsl(217,30%,14%)] to-[hsl(217,25%,20%)]',
  story: 'from-[hsl(345,30%,15%)] to-[hsl(345,20%,22%)]',
  connection: 'from-[hsl(43,40%,18%)] to-[hsl(43,30%,12%)]',
  whyStudy: 'from-[hsl(152,30%,14%)] to-[hsl(152,20%,20%)]',
  excerpt: 'from-[hsl(259,25%,14%)] to-[hsl(259,20%,22%)]',
  quiz: 'from-[hsl(217,30%,12%)] to-[hsl(217,25%,18%)]',
  flashcard: 'from-[hsl(210,35%,14%)] to-[hsl(210,25%,22%)]',
};

export const darkTypes = new Set(['quote', 'story', 'connection', 'whyStudy', 'excerpt', 'flashcard', 'insight', 'quiz']);
