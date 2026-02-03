// The Complete Path of a Genius - Standalone Unified Course
// Based on John Stuart Mill's intensive education method + 10 historical geniuses

export interface PrimarySourceExcerpt {
  title: string;
  author: string;
  source: string; // e.g., "Project Gutenberg", "MIT Classics"
  sourceUrl: string;
  originalText?: string; // For Greek/Latin - the original language
  translatedText: string; // English translation or original if English
  context: string; // Why this passage matters
  discussionQuestions?: string[];
}

// Classical language connections that reinforce earlier Greek/Latin learning
// Inspired by J.S. Mill's method of integrating classical languages throughout education
export interface ClassicalConnection {
  term: string;
  language: 'Greek' | 'Latin' | 'Both';
  original: string;
  meaning: string;
  usage: string; // How this term appears in the current subject
}

export interface PathLesson {
  id: string;
  moduleId: string;
  title: string;
  order: number;
  overview: string;
  content: string;
  keyPoints: string[];
  estimatedMinutes: number;
  resources?: PathResource[];
  vocabularyTable?: VocabularyEntry[];
  exercises?: PathExercise[];
  primarySourceExcerpts?: PrimarySourceExcerpt[];
  classicalConnections?: ClassicalConnection[]; // Latin/Greek vocabulary reinforcement
}

export interface PathResource {
  type: 'video' | 'book' | 'article' | 'course' | 'tool';
  title: string;
  url: string;
  provider?: string;
  free?: boolean;
}

export interface VocabularyEntry {
  term: string;
  pronunciation?: string;
  meaning: string;
  derivatives?: string;
}

export interface PathExercise {
  instruction: string;
  type: 'practice' | 'translation' | 'writing' | 'reading';
}

export interface PathModule {
  id: string;
  name: string;
  description: string;
  icon: string;
  exerciseCount: string;
  premium: boolean;
  order: number;
  introText?: string;
  resources?: PathResource[];
}

// Module definitions - Restructured for simple→advanced progression + holistic education
// Based on Mill's education, Classical Trivium/Quadrivium, and 10 historical geniuses
export const pathModules: PathModule[] = [
  // === STAGE 1: FOUNDATIONS (Language & Logic) ===
  {
    id: 'ancient-greek',
    name: 'Ancient Greek',
    description: '8 Lessons • Alphabet to Herodotus',
    icon: '🏛️',
    exerciseCount: '8 lessons',
    premium: false,
    order: 1,
    introText: "Begin where Mill began at age 3. Through the 'Interruption Method'—asking for every unknown word immediately—you'll build vocabulary rapidly. Progress from the alphabet through Aesop's fables to reading Herodotus and Plutarch, exactly as Mill did by age 10.",
    resources: [
      { type: 'book', title: 'Athenaze: Introduction to Ancient Greek', url: 'https://www.amazon.com/Athenaze-Book-I-Introduction-Ancient/dp/0195149564', provider: 'Amazon', free: false },
      { type: 'book', title: 'Learn to Read Greek, Part 1 & 2', url: 'https://yalebooks.yale.edu/book/9780300115895/learn-to-read-greek', provider: 'Yale University Press', free: false },
      { type: 'book', title: "Smyth's Greek Grammar", url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.04.0007', provider: 'Perseus Digital Library', free: true },
      { type: 'book', title: "Mill's Autobiography (his education method)", url: 'https://www.gutenberg.org/ebooks/10378', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'Ancient Greek in Action - Complete Course', url: 'https://www.youtube.com/playlist?list=PLq5ea-jR9u2puDaLoRL-nBkpwrkURbLjT', provider: 'Brandeis University', free: true },
      { type: 'video', title: 'Greek Alphabet Tutorial', url: 'https://www.youtube.com/watch?v=ge-mq6ZnceU', provider: 'YouTube', free: true },
      { type: 'tool', title: 'Perseus Digital Library', url: 'https://www.perseus.tufts.edu/', provider: 'Tufts University', free: true },
      { type: 'tool', title: 'Logeion Dictionary', url: 'https://logeion.uchicago.edu/', provider: 'University of Chicago', free: true },
      { type: 'book', title: 'Loeb Classical Library (Greek-English)', url: 'https://www.loebclassics.com/', provider: 'Harvard University Press', free: false },
    ]
  },
  {
    id: 'logic',
    name: 'Logic & Critical Thinking',
    description: '4 Lessons • Syllogisms to Fallacies',
    icon: '🧠',
    exerciseCount: '4 lessons',
    premium: true,
    order: 2,
    introText: "Mill mastered formal logic at age 12, and it became his greatest strength. Learn the three laws of thought, construct valid syllogisms, and recognize fallacies. These thinking tools will serve you in every subject that follows.",
    resources: [
      { type: 'book', title: 'A System of Logic by J.S. Mill', url: 'https://www.gutenberg.org/ebooks/26495', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: "Aristotle's Organon (Categories)", url: 'https://www.gutenberg.org/ebooks/2412', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'Prior Analytics - Aristotle', url: 'http://classics.mit.edu/Aristotle/prior.html', provider: 'MIT Classics', free: true },
      { type: 'video', title: 'Introduction to Logic for Kids', url: 'https://www.youtube.com/watch?v=q8NVy00tfdI', provider: 'TED-Ed', free: true },
      { type: 'video', title: 'Philosophy - Crash Course', url: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtNgK6MZucdYldNkMybYIHKR', provider: 'Crash Course', free: true },
    ]
  },
  {
    id: 'latin',
    name: 'Latin',
    description: '5 Lessons • Vocabulary to Caesar',
    icon: '📜',
    exerciseCount: '5 lessons',
    premium: true,
    order: 3,
    introText: "Mill began Latin at age 8. The language of law, medicine, and science for two millennia. Learn declensions, then immediately read Caesar's clear military prose—perfect for beginners.",
    resources: [
      { type: 'book', title: "Wheelock's Latin", url: 'https://www.amazon.com/Wheelocks-Latin-7th/dp/0061997226', provider: 'Amazon', free: false },
      { type: 'book', title: 'Lingua Latina per se Illustrata', url: 'https://hackettpublishing.com/lingua-latina-per-se-illustrata-series/lingua-latina-pars-i-familia-romana', provider: 'Hackett', free: false },
      { type: 'tool', title: 'Latin Library', url: 'https://www.thelatinlibrary.com/', provider: 'The Latin Library', free: true },
      { type: 'tool', title: "Whitaker's Words", url: 'http://archives.nd.edu/words.html', provider: 'Notre Dame', free: true },
      { type: 'video', title: 'Latin Tutorial - Wheelock', url: 'https://www.youtube.com/c/LatinTutorial', provider: 'YouTube', free: true },
      { type: 'tool', title: 'Duolingo Latin', url: 'https://www.duolingo.com/course/la/en/Learn-Latin', provider: 'Duolingo', free: true },
    ]
  },

  // === STAGE 2: MATHEMATICAL ARTS (Quadrivium) ===
  {
    id: 'mathematics',
    name: 'Mathematics',
    description: '5 Lessons • Geometry & Algebra',
    icon: '📐',
    exerciseCount: '5 lessons',
    premium: true,
    order: 4,
    introText: "Einstein called Euclid his 'sacred little geometry book.' From the five postulates, derive all of plane geometry. Then master the Pythagorean theorem and algebraic reasoning that unlocked the secrets of the universe.",
    resources: [
      { type: 'book', title: "Euclid's Elements (Interactive)", url: 'https://mathcs.clarku.edu/~djoyce/elements/elements.html', provider: 'Clark University', free: true },
      { type: 'book', title: "Euclid's Elements (Gutenberg)", url: 'https://www.gutenberg.org/ebooks/21076', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: '3Blue1Brown - Essence of Calculus', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr', provider: '3Blue1Brown', free: true },
      { type: 'video', title: 'Khan Academy Geometry', url: 'https://www.khanacademy.org/math/geometry', provider: 'Khan Academy', free: true },
      { type: 'tool', title: 'GeoGebra', url: 'https://www.geogebra.org/', provider: 'GeoGebra', free: true },
      { type: 'tool', title: 'Euclidea Game', url: 'https://www.euclidea.xyz/', provider: 'Euclidea', free: true },
    ]
  },
  {
    id: 'physics',
    name: 'Natural Philosophy',
    description: '3 Lessons • Forces & Wonder',
    icon: '🔬',
    exerciseCount: '3 lessons',
    premium: true,
    order: 5,
    introText: "The methods of Newton, Einstein, and Archimedes. Master the experimental method and fundamental laws of nature through hands-on discovery. Apply your mathematical knowledge to understand how the universe works.",
    resources: [
      { type: 'book', title: "Newton's Principia Mathematica", url: 'https://www.gutenberg.org/ebooks/28233', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'The Works of Archimedes', url: 'https://archive.org/details/worksofarchimede00telerich', provider: 'Internet Archive', free: true },
      { type: 'book', title: 'Relativity by Einstein', url: 'https://www.gutenberg.org/ebooks/5001', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'Force and Motion | Science for Kids', url: 'https://www.youtube.com/watch?v=1R6MxJpEjfs', provider: 'Little School', free: true },
      { type: 'video', title: 'Physics - Crash Course', url: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtN0ge7yDk_UA0ldZJdhwkoV', provider: 'Crash Course', free: true },
      { type: 'video', title: 'The Feynman Lectures on Physics', url: 'https://www.feynmanlectures.caltech.edu/', provider: 'Caltech', free: true },
    ]
  },

  // === STAGE 3: NATURAL SCIENCES ===
  {
    id: 'chemistry',
    name: 'Chemistry',
    description: "3 Lessons • Curie's Method",
    icon: '⚗️',
    exerciseCount: '3 lessons',
    premium: true,
    order: 6,
    introText: "Marie Curie's father taught her systematic experimentation. Begin with the nature of matter—atoms, elements, and reactions. Perform safe home experiments that reveal chemistry's fundamental principles.",
    resources: [
      { type: 'book', title: 'The Discovery of Radium - Marie Curie (Nobel Lecture)', url: 'https://www.nobelprize.org/prizes/chemistry/1911/marie-curie/lecture/', provider: 'Nobel Prize', free: true },
      { type: 'book', title: 'Pierre Curie - A Biography by Marie Curie', url: 'https://www.gutenberg.org/ebooks/45795', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'Chemistry for Kids - Atoms & Molecules', url: 'https://www.youtube.com/watch?v=CW0_S5YpYVo', provider: 'Homeschool Pop', free: true },
      { type: 'video', title: 'Chemistry - Crash Course', url: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtPHzzYuWy6fYEaX9mQQ8oGr', provider: 'Crash Course', free: true },
      { type: 'video', title: 'MIT 5.111 Chemistry', url: 'https://www.youtube.com/playlist?list=PLUl4u3cNGP629dLy3p8L5XvkrBQrLQvKO', provider: 'MIT OpenCourseWare', free: true },
    ]
  },
  {
    id: 'natural-history',
    name: 'Natural History',
    description: '4 Lessons • Biology & Observation',
    icon: '🌿',
    exerciseCount: '4 lessons',
    premium: true,
    order: 7,
    introText: "Darwin, Aristotle, and Leonardo were all passionate naturalists. Learn to observe the living world with scientific precision—classification, ecosystems, adaptation, and the web of life that connects all creatures.",
    resources: [
      { type: 'book', title: 'On the Origin of Species - Darwin', url: 'https://www.gutenberg.org/ebooks/1228', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'History of Animals - Aristotle', url: 'http://classics.mit.edu/Aristotle/history_anim.html', provider: 'MIT Classics', free: true },
      { type: 'book', title: 'The Voyage of the Beagle - Darwin', url: 'https://www.gutenberg.org/ebooks/944', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'Biology - Crash Course', url: 'https://www.youtube.com/playlist?list=PL3EED4C1D684D3ADF', provider: 'Crash Course', free: true },
      { type: 'video', title: 'Life on Earth - David Attenborough', url: 'https://www.youtube.com/results?search_query=david+attenborough+life+on+earth', provider: 'BBC', free: false },
      { type: 'tool', title: 'iNaturalist', url: 'https://www.inaturalist.org/', provider: 'California Academy of Sciences', free: true },
    ]
  },

  // === STAGE 4: HUMANITIES ===
  {
    id: 'literature',
    name: 'Literature & Poetry',
    description: '7 Lessons • Great Books',
    icon: '📚',
    exerciseCount: '7 lessons',
    premium: true,
    order: 8,
    introText: "Mill read Homer at age 8, Robinson Crusoe for adventure, and Pope's Homer translation 20-30 times. Great literature teaches human nature through story. Start with accessible works like Crusoe and Quixote before progressing to epic poetry.",
    resources: [
      { type: 'book', title: 'The Iliad - Homer', url: 'https://www.gutenberg.org/ebooks/6130', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'The Odyssey - Homer', url: 'https://www.gutenberg.org/ebooks/1727', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'Robinson Crusoe - Daniel Defoe', url: 'https://www.gutenberg.org/ebooks/521', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'Don Quixote - Cervantes', url: 'https://www.gutenberg.org/ebooks/996', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'Complete Works of Shakespeare', url: 'https://www.gutenberg.org/ebooks/100', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'Arabian Nights', url: 'https://www.gutenberg.org/ebooks/128', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'Literature - Crash Course', url: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtOeEc9ME62zTfqc0h6Pe8vb', provider: 'Crash Course', free: true },
    ]
  },
  {
    id: 'history',
    name: 'History & Geography',
    description: '5 Lessons • World & Civilizations',
    icon: '🗺️',
    exerciseCount: '5 lessons',
    premium: true,
    order: 9,
    introText: "Mill studied ancient and modern history extensively. Understand how civilizations rise and fall, the geography that shapes nations, and the great turning points that created our modern world. History is philosophy teaching by examples.",
    resources: [
      { type: 'book', title: 'The History - Herodotus', url: 'https://www.gutenberg.org/ebooks/2707', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'History of the Peloponnesian War - Thucydides', url: 'https://www.gutenberg.org/ebooks/7142', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'The Decline and Fall of the Roman Empire - Gibbon', url: 'https://www.gutenberg.org/ebooks/25717', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'World History - Crash Course', url: 'https://www.youtube.com/playlist?list=PLBDA2E52FB1EF80C9', provider: 'Crash Course', free: true },
      { type: 'video', title: 'Geography Now', url: 'https://www.youtube.com/c/GeographyNow', provider: 'YouTube', free: true },
      { type: 'tool', title: 'Geacron World History Atlas', url: 'http://geacron.com/', provider: 'Geacron', free: true },
    ]
  },
  {
    id: 'ethics',
    name: 'Ethics & Moral Philosophy',
    description: '4 Lessons • Virtue & Conduct',
    icon: '⚖️',
    exerciseCount: '4 lessons',
    premium: true,
    order: 10,
    introText: "Mill wrote 'Utilitarianism,' one of the most influential works in moral philosophy. Study the great ethical traditions—virtue ethics, deontology, and consequentialism. Learn to reason about right and wrong with clarity and depth.",
    resources: [
      { type: 'book', title: 'Utilitarianism - J.S. Mill', url: 'https://www.gutenberg.org/ebooks/11224', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'Nicomachean Ethics - Aristotle', url: 'https://www.gutenberg.org/ebooks/8438', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'Meditations - Marcus Aurelius', url: 'https://www.gutenberg.org/ebooks/2680', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'Groundwork of the Metaphysics of Morals - Kant', url: 'https://www.gutenberg.org/ebooks/5682', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'Ethics - Crash Course', url: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtNgK6MZucdYldNkMybYIHKR', provider: 'Crash Course', free: true },
      { type: 'video', title: 'Justice with Michael Sandel', url: 'https://www.youtube.com/playlist?list=PL30C13C91CFFEFEA6', provider: 'Harvard', free: true },
    ]
  },

  // === STAGE 5: EXPRESSION ===
  {
    id: 'rhetoric',
    name: 'Rhetoric & Argumentation',
    description: '4 Lessons • Persuasive Expression',
    icon: '🎤',
    exerciseCount: '4 lessons',
    premium: true,
    order: 11,
    introText: "The ancient art of persuasion. Aristotle, Cicero, and the great orators mastered rhetoric—the ability to communicate ideas effectively. Learn the three appeals (ethos, pathos, logos) and craft arguments that move minds.",
    resources: [
      { type: 'book', title: 'Rhetoric - Aristotle', url: 'http://classics.mit.edu/Aristotle/rhetoric.html', provider: 'MIT Classics', free: true },
      { type: 'book', title: 'De Oratore - Cicero', url: 'https://www.gutenberg.org/ebooks/9776', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'On Liberty - J.S. Mill', url: 'https://www.gutenberg.org/ebooks/34901', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'The Art of Rhetoric', url: 'https://www.youtube.com/watch?v=3klMM9BkW5o', provider: 'TED-Ed', free: true },
      { type: 'video', title: 'Public Speaking - Crash Course', url: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtMGMdAqD3DrN1fmqn4F3wE-', provider: 'Crash Course', free: true },
    ]
  },
  {
    id: 'thought-experiments',
    name: 'Thought Experiments',
    description: "3 Lessons • Einstein's Method",
    icon: '💭',
    exerciseCount: '3 lessons',
    premium: true,
    order: 12,
    introText: "At age 16, Einstein imagined chasing a light beam. This led to special relativity. Thought experiments are the highest form of abstract reasoning—using imagination to explore ideas beyond physical limits.",
    resources: [
      { type: 'book', title: 'Relativity by Einstein', url: 'https://www.gutenberg.org/ebooks/5001', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'Ideas and Opinions by Einstein', url: 'https://archive.org/details/ideasopinions00eins', provider: 'Internet Archive', free: true },
      { type: 'video', title: "Einstein's General Relativity", url: 'https://www.youtube.com/watch?v=DYq774z4dws', provider: 'PBS Space Time', free: true },
      { type: 'video', title: 'Special Relativity Explained', url: 'https://www.youtube.com/watch?v=ajhFNcUTJI0', provider: 'Veritasium', free: true },
    ]
  },

  // === STAGE 6: APPLIED SCIENCES ===
  {
    id: 'engineering',
    name: 'Engineering & Design',
    description: "5 Lessons • Da Vinci's Method",
    icon: '⚙️',
    exerciseCount: '5 lessons',
    premium: true,
    order: 13,
    introText: "Leonardo da Vinci was the greatest engineer of the Renaissance. Learn his method: study ancient masters (Vitruvius, Archimedes, Hero), observe nature, experiment systematically, and iterate on designs.",
    resources: [
      { type: 'book', title: "Leonardo's Notebooks", url: 'https://www.gutenberg.org/ebooks/5000', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'De Architectura - Vitruvius', url: 'https://www.gutenberg.org/ebooks/20239', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'The Works of Archimedes', url: 'https://archive.org/details/worksofarchimede00telerich', provider: 'Internet Archive', free: true },
      { type: 'book', title: 'Pneumatics - Hero of Alexandria', url: 'https://archive.org/details/pneumaticsofhero00heron', provider: 'Internet Archive', free: true },
      { type: 'article', title: "Leonardo's Machines - Museo Galileo", url: 'https://www.museogalileo.it/en/explore/multimedia/leonardos-machines.html', provider: 'Museo Galileo', free: true },
      { type: 'video', title: 'Engineering An Empire - Da Vinci', url: 'https://www.youtube.com/watch?v=uVEaDUoforU', provider: 'History Channel', free: true },
    ]
  },
  {
    id: 'anatomy',
    name: 'Anatomy & Human Body',
    description: '5 Lessons • The Vitruvian Tradition',
    icon: '🫀',
    exerciseCount: '5 lessons',
    premium: true,
    order: 14,
    introText: "Leonardo performed over 30 dissections to understand the human body. His anatomical drawings remain among the finest ever made. Study the structure of the body—the ultimate machine—as the culmination of your scientific education.",
    resources: [
      { type: 'book', title: "Leonardo's Notebooks - Anatomy", url: 'https://www.gutenberg.org/ebooks/5000', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: "Gray's Anatomy (Classic Edition)", url: 'https://www.gutenberg.org/ebooks/1636', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'De Humani Corporis Fabrica - Vesalius', url: 'https://archive.org/details/dehumanicorporis00vesa', provider: 'Internet Archive', free: true },
      { type: 'video', title: 'Crash Course Anatomy', url: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtOAKed_MxxWBNaPno5h3Zs8', provider: 'Crash Course', free: true },
      { type: 'video', title: 'Leonardo: Anatomist - Nature Video', url: 'https://www.youtube.com/watch?v=J9xUL5Yi_8M', provider: 'Nature', free: true },
    ]
  },
];

// Greek Alphabet Vocabulary
const greekAlphabetVocabulary: VocabularyEntry[] = [
  { term: 'Α α', pronunciation: 'alpha', meaning: 'ah (as in father)', derivatives: 'alphabet, alpha' },
  { term: 'Β β', pronunciation: 'beta', meaning: 'b (as in boy)', derivatives: 'beta, alphabet' },
  { term: 'Γ γ', pronunciation: 'gamma', meaning: 'g (as in go)', derivatives: 'gamma rays' },
  { term: 'Δ δ', pronunciation: 'delta', meaning: 'd (as in dog)', derivatives: 'delta, deltoid' },
  { term: 'Ε ε', pronunciation: 'epsilon', meaning: 'eh (as in pet)', derivatives: 'epsilon' },
  { term: 'Ζ ζ', pronunciation: 'zeta', meaning: 'z/dz (as in wisdom)', derivatives: 'zeta' },
  { term: 'Η η', pronunciation: 'eta', meaning: 'ay (as in day)', derivatives: 'eta' },
  { term: 'Θ θ', pronunciation: 'theta', meaning: 'th (as in think)', derivatives: 'theta, theorem' },
  { term: 'Ι ι', pronunciation: 'iota', meaning: 'ee (as in see)', derivatives: 'iota' },
  { term: 'Κ κ', pronunciation: 'kappa', meaning: 'k (as in kite)', derivatives: 'kappa' },
  { term: 'Λ λ', pronunciation: 'lambda', meaning: 'l (as in lamp)', derivatives: 'lambda' },
  { term: 'Μ μ', pronunciation: 'mu', meaning: 'm (as in mother)', derivatives: 'mu' },
  { term: 'Ν ν', pronunciation: 'nu', meaning: 'n (as in never)', derivatives: 'nu' },
  { term: 'Ξ ξ', pronunciation: 'xi', meaning: 'x/ks (as in box)', derivatives: 'xi' },
  { term: 'Ο ο', pronunciation: 'omicron', meaning: 'oh (short, as in off)', derivatives: 'omicron' },
  { term: 'Π π', pronunciation: 'pi', meaning: 'p (as in pet)', derivatives: 'pi, peripheral' },
  { term: 'Ρ ρ', pronunciation: 'rho', meaning: 'r (rolled)', derivatives: 'rho, rhetoric' },
  { term: 'Σ σ/ς', pronunciation: 'sigma', meaning: 's (as in sit)', derivatives: 'sigma, sign' },
  { term: 'Τ τ', pronunciation: 'tau', meaning: 't (as in top)', derivatives: 'tau' },
  { term: 'Υ υ', pronunciation: 'upsilon', meaning: 'oo/u (as in soon)', derivatives: 'upsilon' },
  { term: 'Φ φ', pronunciation: 'phi', meaning: 'ph/f (as in phone)', derivatives: 'phi, philosophy' },
  { term: 'Χ χ', pronunciation: 'chi', meaning: 'kh (as in Bach)', derivatives: 'chi, chaos' },
  { term: 'Ψ ψ', pronunciation: 'psi', meaning: 'ps (as in lapse)', derivatives: 'psi, psychology' },
  { term: 'Ω ω', pronunciation: 'omega', meaning: 'oh (long, as in go)', derivatives: 'omega' },
];

// Core Greek Nouns Vocabulary
const greekNounsVocabulary: VocabularyEntry[] = [
  { term: 'ἄνθρωπος', pronunciation: 'ánthrōpos', meaning: 'human, person, man', derivatives: 'anthropology, misanthrope, philanthropy' },
  { term: 'λόγος', pronunciation: 'lógos', meaning: 'word, speech, reason, account', derivatives: 'logic, dialogue, biology, theology, prologue' },
  { term: 'θεός', pronunciation: 'theós', meaning: 'god, deity', derivatives: 'theology, atheist, polytheism, monotheism' },
  { term: 'δῶρον', pronunciation: 'dōron', meaning: 'gift, present', derivatives: 'Pandora, Theodore (gift of god)' },
  { term: 'οἶκος', pronunciation: 'oîkos', meaning: 'house, home, household', derivatives: 'economy, ecology, ecumenical' },
  { term: 'βίβλος', pronunciation: 'bíblos', meaning: 'book, scroll', derivatives: 'bible, bibliography, bibliophile' },
  { term: 'φίλος', pronunciation: 'phílos', meaning: 'friend, loved one', derivatives: 'philosophy, Philadelphia, philanthropy' },
  { term: 'ἔργον', pronunciation: 'érgon', meaning: 'work, deed, action', derivatives: 'energy, ergonomic, synergy' },
  { term: 'νόμος', pronunciation: 'nómos', meaning: 'law, custom, usage', derivatives: 'astronomy, autonomy, economy' },
  { term: 'κόσμος', pronunciation: 'kósmos', meaning: 'world, universe, order', derivatives: 'cosmos, cosmopolitan, cosmonaut' },
  { term: 'ψυχή', pronunciation: 'psykhḗ', meaning: 'soul, spirit, life, mind', derivatives: 'psychology, psyche, psychiatry' },
  { term: 'φωνή', pronunciation: 'phōnḗ', meaning: 'voice, sound', derivatives: 'telephone, phonetics, symphony' },
  { term: 'γῆ', pronunciation: 'gē', meaning: 'earth, land, ground', derivatives: 'geography, geology, geometry' },
  { term: 'ὕδωρ', pronunciation: 'hýdōr', meaning: 'water', derivatives: 'hydrogen, hydrant, dehydrate' },
  { term: 'πῦρ', pronunciation: 'pŷr', meaning: 'fire', derivatives: 'pyre, pyrotechnics, empyreal' },
  { term: 'ἀήρ', pronunciation: 'aḗr', meaning: 'air, mist', derivatives: 'aerobic, aerospace, aeronautics' },
  { term: 'χρόνος', pronunciation: 'khrónos', meaning: 'time', derivatives: 'chronology, chronic, synchronize' },
  { term: 'τέχνη', pronunciation: 'tékhnē', meaning: 'art, craft, skill', derivatives: 'technology, technique, polytechnic' },
  { term: 'ἀρχή', pronunciation: 'arkhḗ', meaning: 'beginning, origin, rule, power', derivatives: 'monarchy, archaeology, anarchy' },
  { term: 'τέλος', pronunciation: 'télos', meaning: 'end, purpose, goal', derivatives: 'teleology, telephone' },
  { term: 'φύσις', pronunciation: 'phýsis', meaning: 'nature', derivatives: 'physics, physical, physician' },
  { term: 'πόλις', pronunciation: 'pólis', meaning: 'city, city-state', derivatives: 'politics, metropolis, police' },
  { term: 'σοφία', pronunciation: 'sophía', meaning: 'wisdom', derivatives: 'philosophy, sophisticated, sophomore' },
  { term: 'ἀλήθεια', pronunciation: 'alḗtheia', meaning: 'truth', derivatives: 'Alethea (name)' },
  { term: 'δίκη', pronunciation: 'díkē', meaning: 'justice, lawsuit, trial', derivatives: 'syndicate, indicate, vindicate' },
];

// Greek Verbs Vocabulary
const greekVerbsVocabulary: VocabularyEntry[] = [
  { term: 'εἰμί', pronunciation: 'eimí', meaning: 'to be, exist', derivatives: 'εἰμι (I am)' },
  { term: 'λέγω', pronunciation: 'légō', meaning: 'to say, speak, tell', derivatives: 'λέγω (I say)' },
  { term: 'ἔχω', pronunciation: 'ékhō', meaning: 'to have, hold', derivatives: 'ἔχω (I have)' },
  { term: 'γράφω', pronunciation: 'gráphō', meaning: 'to write', derivatives: 'graphic, graph, biography' },
  { term: 'ποιέω', pronunciation: 'poiéō', meaning: 'to make, do', derivatives: 'poem, poetry, poetic' },
  { term: 'ὁράω', pronunciation: 'horáō', meaning: 'to see', derivatives: 'ὁρῶ (I see)' },
  { term: 'ἀκούω', pronunciation: 'akoúō', meaning: 'to hear', derivatives: 'acoustic' },
  { term: 'διδάσκω', pronunciation: 'didáskō', meaning: 'to teach', derivatives: 'didactic' },
  { term: 'μανθάνω', pronunciation: 'manthánō', meaning: 'to learn', derivatives: 'mathematics' },
  { term: 'γιγνώσκω', pronunciation: 'gignṓskō', meaning: 'to know', derivatives: 'diagnosis, gnostic' },
  { term: 'βαίνω', pronunciation: 'baínō', meaning: 'to go, walk', derivatives: 'βαίνω (I walk)' },
  { term: 'φέρω', pronunciation: 'phérō', meaning: 'to carry, bear', derivatives: 'metaphor, phosphorus' },
  { term: 'λαμβάνω', pronunciation: 'lambánō', meaning: 'to take, receive', derivatives: 'syllable' },
  { term: 'δίδωμι', pronunciation: 'dídōmi', meaning: 'to give', derivatives: 'δίδωμι (I give)' },
  { term: 'ἀγαπάω', pronunciation: 'agapáō', meaning: 'to love', derivatives: 'agape (love)' },
];

// Path Lessons - Complete content
export const pathLessons: PathLesson[] = [
  // ========== ANCIENT GREEK MODULE ==========
  {
    id: 'greek-alphabet',
    moduleId: 'ancient-greek',
    title: 'The Greek Alphabet',
    order: 1,
    overview: "Master the 24 letters of the Greek alphabet—the foundation of all Greek reading. Mill learned these at age 3 through daily practice and recitation.",
    content: `**Exercise 1.1: Master the Alphabet (24 letters)**

Learn to recognize, write, and pronounce each letter. Practice daily until automatic.

The Greek alphabet has 24 letters: 7 vowels (α, ε, η, ι, ο, υ, ω) and 17 consonants.

**Important Notes:**
- Sigma (σ) changes to (ς) at the end of words
- Eta (η) and Omega (ω) are long vowels
- Some letters look familiar but sound different

**Practice Exercise:**
Write the alphabet from memory 10 times. Say each letter aloud as you write it.`,
    keyPoints: [
      "Greek has 24 letters: 7 vowels and 17 consonants",
      "Sigma (σ) changes to (ς) at the end of words", 
      "Many letters look familiar but sounds may differ",
      "Practice writing each letter to build muscle memory"
    ],
    estimatedMinutes: 45,
    vocabularyTable: greekAlphabetVocabulary,
    resources: [
      { type: 'video', title: 'Greek Alphabet Tutorial', url: 'https://www.youtube.com/watch?v=ge-mq6ZnceU', provider: 'YouTube', free: true },
      { type: 'video', title: 'Greek Lesson 1: Alphabet', url: 'https://www.youtube.com/watch?v=ZsSUZfhQWeI', provider: 'Murray Vasser', free: true },
      { type: 'book', title: 'A Greek Primer for Beginners', url: 'https://www.gutenberg.org/ebooks/39292', provider: 'Project Gutenberg', free: true },
    ],
    exercises: [
      { instruction: 'Write the alphabet from memory 10 times', type: 'writing' },
      { instruction: 'Watch the Alpha with Angela video (15 minutes)', type: 'practice' },
      { instruction: 'Quiz yourself: cover the letter names and try to recall them', type: 'practice' },
    ]
  },
  {
    id: 'greek-nouns-50',
    moduleId: 'ancient-greek',
    title: 'Core Vocabulary: First 50 Nouns',
    order: 2,
    overview: "Learn the 50 most essential Greek nouns. Practice 10 words per day with writing and recitation for effective memorization.",
    content: `**Exercise 2.1: Essential Nouns (50 words)**

**Memorization Strategy:**
1. Learn 10 words per day
2. Write each word 5 times
3. Recite meanings aloud
4. Quiz yourself before bed
5. Review all words weekly

Focus on connecting Greek roots to English derivatives—this creates stronger memory connections.

**Example Connections:**
- θεός (god) → theology, atheist, monotheism
- φύσις (nature) → physics, physical, physiology  
- ψυχή (soul) → psychology, psychiatry, psyche`,
    keyPoints: [
      "Learn 10 new words per day for steady progress",
      "Greek roots appear in thousands of English words",
      "Writing words physically aids memorization",
      "Regular review prevents forgetting"
    ],
    estimatedMinutes: 90,
    vocabularyTable: greekNounsVocabulary,
    resources: [
      { type: 'tool', title: 'Logeion Dictionary', url: 'https://logeion.uchicago.edu/', provider: 'University of Chicago', free: true },
      { type: 'tool', title: 'Perseus Digital Library', url: 'https://www.perseus.tufts.edu/', provider: 'Tufts University', free: true },
    ],
    exercises: [
      { instruction: 'Write each word 5 times with its meaning', type: 'writing' },
      { instruction: 'Create flashcards for all 50 nouns', type: 'practice' },
      { instruction: 'Quiz: Match 10 Greek words to their English derivatives', type: 'practice' },
    ]
  },
  {
    id: 'greek-verbs-50',
    moduleId: 'ancient-greek',
    title: 'Core Vocabulary: Essential Verbs',
    order: 3,
    overview: "Master the 50 most common Greek verbs. These are the action words that will let you understand Greek sentences.",
    content: `**Exercise 2.2: Essential Verbs (50 words)**

Greek verbs carry more information than English verbs—they encode:
- Person (I, you, he/she/it, we, they)
- Number (singular or plural)
- Tense (when the action happens)
- Voice (active, middle, passive)
- Mood (statement, command, wish)

Start with the present tense, first person singular forms.

**Pattern Recognition:**
- -ω ending = "I [verb]"
- λέγω = I say, I speak
- γράφω = I write`,
    keyPoints: [
      "Greek verbs conjugate for person, number, tense, voice, and mood",
      "The -ω ending typically means 'I [verb]'",
      "Many verbs have English derivatives (graphic from γράφω)",
      "Learn the first person singular first, then expand"
    ],
    estimatedMinutes: 90,
    vocabularyTable: greekVerbsVocabulary,
    resources: [
      { type: 'video', title: 'Ancient Greek Verbs - Learn Greek', url: 'https://www.youtube.com/watch?v=L7PlW7OyKB8', provider: 'YouTube', free: true },
    ],
    exercises: [
      { instruction: 'Conjugate λέγω (to say) in all persons', type: 'writing' },
      { instruction: 'Match 15 Greek verbs to their English derivatives', type: 'practice' },
    ]
  },
  {
    id: 'greek-articles-cases',
    moduleId: 'ancient-greek',
    title: 'Grammar: Articles and Cases',
    order: 4,
    overview: "Greek nouns have gender and cases that show their role in sentences. The article 'the' changes form based on these factors.",
    content: `**The Greek Article "The" (ὁ, ἡ, τό)**

|          | Masculine | Feminine | Neuter |
|----------|-----------|----------|--------|
| Nominative | ὁ      | ἡ       | τό     |
| Genitive   | τοῦ    | τῆς     | τοῦ    |
| Dative     | τῷ     | τῇ      | τῷ     |
| Accusative | τόν    | τήν     | τό     |

**The Five Cases:**
1. **Nominative** — Subject (The man runs)
2. **Genitive** — Possession (of the man)
3. **Dative** — Indirect object (to/for the man)
4. **Accusative** — Direct object (I see the man)
5. **Vocative** — Address (O man!)

**Example:** λόγος (logos) = word/reason
• ὁ λόγος — the word (subject)
• τοῦ λόγου — of the word
• τῷ λόγῳ — to the word
• τὸν λόγον — the word (object)`,
    keyPoints: [
      "Three genders: masculine (ὁ), feminine (ἡ), neuter (τό)",
      "Five cases show the noun's role in the sentence",
      "Articles must agree with their nouns in gender, number, case",
      "Case endings tell you who does what to whom"
    ],
    estimatedMinutes: 120,
    resources: [
      { type: 'video', title: 'All About Greek Articles', url: 'https://www.youtube.com/watch?v=njnEl62WZuo', provider: 'Linguatree', free: true },
      { type: 'book', title: 'A Greek Primer for Beginners', url: 'https://www.gutenberg.org/ebooks/39292', provider: 'Project Gutenberg', free: true },
    ],
    exercises: [
      { instruction: 'Watch the "Greek Cases Made Simple" video first (10 min)', type: 'practice' },
      { instruction: 'Decline λόγος through all cases', type: 'writing' },
      { instruction: 'Identify the case of 10 Greek nouns in context', type: 'practice' },
    ]
  },
  {
    id: 'greek-translation-practice',
    moduleId: 'ancient-greek',
    title: 'Translation Practice: Simple Sentences',
    order: 5,
    overview: "Apply your vocabulary and grammar knowledge to translate simple Greek sentences. Start with subject-verb and subject-verb-object patterns.",
    content: `**Exercise 3.1: Simple Sentences (100 Translations)**

**Beginner Sentences (1-25): Subject + Verb or Subject + Verb + Object**

| # | Greek | English |
|---|-------|---------|
| 1 | ὁ ἄνθρωπος λέγει | the man speaks |
| 2 | ἡ γυνὴ γράφει | the woman writes |
| 3 | τὸ παιδίον μανθάνει | the child learns |
| 4 | οἱ φίλοι ἀκούουσι | the friends hear |
| 5 | ὁ διδάσκαλος διδάσκει | the teacher teaches |
| 6 | αἱ γυναῖκες ἔχουσι βιβλία | the women have books |
| 7 | ὁ θεὸς ποιεῖ τὸν κόσμον | god makes the world |
| 8 | ἡ ψυχὴ ζῇ | the soul lives |
| 9 | οἱ ἄνθρωποι φέρουσι δῶρα | the people carry gifts |
| 10 | ὁ ἥλιος φαίνει | the sun shines |

**Key Pattern:** Look for the article first, then the noun, then the verb. The case tells you the subject vs object.`,
    keyPoints: [
      "Start with simple subject-verb sentences",
      "The article (ὁ, ἡ, τό) marks the subject in nominative",
      "Accusative case marks the direct object",
      "Read each sentence 3 times: gist → vocabulary → fluency"
    ],
    estimatedMinutes: 90,
    resources: [
      { type: 'book', title: 'Three Hundred Aesop\'s Fables', url: 'https://www.gutenberg.org/ebooks/21', provider: 'Project Gutenberg', free: true },
    ],
    exercises: [
      { instruction: 'Translate sentences 1-10 from Greek to English', type: 'translation' },
      { instruction: 'Translate 5 simple sentences from English to Greek', type: 'translation' },
    ]
  },
  {
    id: 'greek-aesop',
    moduleId: 'ancient-greek',
    title: "Reading: Aesop's Fables",
    order: 6,
    overview: "Begin reading with Aesop's simple moral tales—exactly how Mill started at age 3. These short stories use basic vocabulary and teach timeless wisdom.",
    content: `**The Fox and the Grapes (Ἀλώπηξ καὶ Σταφυλή)**

Ἀλώπηξ λιμώττουσα, ὡς ἐθεάσατο ἀπό τινος ἀναδενδράδος βότρυας κρεμαμένους, ἠβουλήθη αὐτῶν περιγενέσθαι καὶ οὐκ ἠδύνατο. Ἀπαλλαττομένη δὲ πρὸς ἑαυτὴν εἶπεν· "Ὄμφακές εἰσιν."

**Translation:**
A hungry fox, when she saw grapes hanging from a vine, wished to get them but could not. As she went away, she said to herself: "They are sour grapes."

**Key Vocabulary:**
• ἀλώπηξ (alōpēx) = fox
• σταφυλή (staphylē) = grapes
• λιμώττουσα (limōttousa) = being hungry
• βότρυς (botrys) = grape cluster
• ὄμφαξ (omphax) = unripe grape

**The Moral:** It's easy to despise what you cannot have.`,
    keyPoints: [
      "Aesop's fables use simple, repetitive vocabulary",
      "Each fable teaches a moral lesson about human nature",
      "Start with 'The Fox and the Grapes' — only 30 words!",
      "Read each fable 3 times: gist → vocabulary → fluency"
    ],
    estimatedMinutes: 60,
    resources: [
      { type: 'book', title: "Aesop's Fables in Greek", url: 'https://www.gutenberg.org/ebooks/21', provider: 'Project Gutenberg', free: true },
    ],
    exercises: [
      { instruction: 'Read The Fox and the Grapes aloud 3 times', type: 'reading' },
      { instruction: 'Look up and memorize the 5 key vocabulary words', type: 'practice' },
      { instruction: 'Translate the fable without looking at the English', type: 'translation' },
    ],
    primarySourceExcerpts: [
      {
        title: 'The Fox and the Grapes',
        author: 'Aesop',
        source: 'Project Gutenberg',
        sourceUrl: 'https://www.gutenberg.org/ebooks/21',
        originalText: 'Ἀλώπηξ λιμώττουσα, ὡς ἐθεάσατο ἀπό τινος ἀναδενδράδος βότρυας κρεμαμένους, ἠβουλήθη αὐτῶν περιγενέσθαι καὶ οὐκ ἠδύνατο. Ἀπαλλαττομένη δὲ πρὸς ἑαυτὴν εἶπεν· "Ὄμφακές εἰσιν."',
        translatedText: 'A hungry fox, when she saw grapes hanging from a vine, wished to get them but could not. As she went away, she said to herself: "They are sour grapes."',
        context: 'This is one of the most famous of Aesop\'s 600+ fables. Mill began reading Aesop in Greek at age 3. The phrase "sour grapes" entered the English language from this fable, describing the tendency to disparage what we cannot obtain.',
        discussionQuestions: [
          'Why does the fox say the grapes are sour?',
          'Can you think of a time when you or someone else acted like the fox?',
          'What is the moral of this fable?'
        ]
      },
      {
        title: 'The Tortoise and the Hare',
        author: 'Aesop',
        source: 'Project Gutenberg',
        sourceUrl: 'https://www.gutenberg.org/ebooks/21',
        originalText: 'Χελώνη καὶ λαγωὸς περὶ τάχους ἤριζον. Καὶ δὴ προθεσμίαν στήσαντες καὶ τόπον ἀπηλλάγησαν. Ὁ μὲν οὖν λαγωὸς διὰ τὴν φυσικὴν ὠκύτητα ἀμελήσας τοῦ δρόμου, πεσὼν παρὰ τὴν ὁδόν, ἐκοιμήθη. Ἡ δὲ χελώνη συνειδυῖα ἑαυτῇ βραδυτῆτα, οὐ διέλιπε τρέχουσα καὶ οὕτω κοιμωμένου τοῦ λαγωοῦ παραδραμοῦσα ἐπὶ τὸ βραβεῖον ἀφίκετο τῆς νίκης.',
        translatedText: 'A tortoise and a hare were disputing about their speed. Having fixed a day and place for their race, they set off. The hare, because of his natural swiftness, neglected the race, and lying down by the roadside, fell asleep. But the tortoise, knowing her own slowness, did not stop running, and so, passing the sleeping hare, arrived at the goal of victory.',
        context: 'Another of Aesop\'s most beloved fables, teaching that steady persistence triumphs over natural talent squandered. This fable has been referenced by philosophers from Aristotle to modern psychologists studying grit and perseverance.',
        discussionQuestions: [
          'What caused the hare to lose the race?',
          'Is natural talent or hard work more important for success?',
          'How does this fable relate to learning Greek itself?'
        ]
      }
    ]
  },
  {
    id: 'greek-herodotus',
    moduleId: 'ancient-greek',
    title: 'Reading: Herodotus - The Histories',
    order: 7,
    overview: "Herodotus, the 'Father of History,' wrote in clear, engaging Greek. Mill read him at age 7. His stories of Greek victory over Persia are perfect intermediate reading.",
    content: `**Herodotus (c. 484-425 BCE)**

Cicero called him "the Father of History." Mill read Herodotus at age 7, finding his narrative style accessible and thrilling.

**Study Method (Daily Walk Review):**
Mill's father used the "Walk and Recite" method:
1. Read a section the day before, taking notes on slips of paper
2. During a morning walk, recite what you read from notes
3. Discuss connections to other subjects (geography, politics, morality)
4. Restate explanations in your own words

**The Histories - Structure:**
• **Books 1-4**: Geography, customs, and history of Persia, Egypt, Scythia
• **Books 5-9**: The Persian Wars against Greece

**Famous Passages for Beginners:**

**The Story of Croesus (Book 1.30-33):**
Croesus, the wealthy king, asks Solon: "Who is the happiest man?"
Key vocabulary: ὄλβιος (olbios) = blessed, prosperous

**Thermopylae (Book 7.219-228):**
The 300 Spartans defend the pass against Persia.
Key phrase: "Stranger, tell the Spartans that here we lie, obedient to their commands."

**Why Start with Herodotus:**
• Clear, narrative Greek—easier than Thucydides
• Stories are inherently interesting
• Vocabulary overlaps with what you've learned
• Short, memorable episodes`,
    keyPoints: [
      "Herodotus is the 'Father of History' - Mill read him at age 7",
      "Use the 'Daily Walk Review': read, take notes, recite next day",
      "Start with famous stories: Croesus, Thermopylae, Marathon",
      "His narrative style is clearer than later historians"
    ],
    estimatedMinutes: 90,
    vocabularyTable: [
      { term: 'ἱστορία', pronunciation: 'historía', meaning: 'inquiry, research, history', derivatives: 'history, story' },
      { term: 'βάρβαρος', pronunciation: 'bárbaros', meaning: 'foreigner, non-Greek speaker', derivatives: 'barbarian, barbaric' },
      { term: 'ὄλβιος', pronunciation: 'ólbios', meaning: 'blessed, happy, prosperous', derivatives: '(archaic) olibanum' },
      { term: 'βασιλεύς', pronunciation: 'basileús', meaning: 'king', derivatives: 'basilica, basil' },
      { term: 'νόμος', pronunciation: 'nómos', meaning: 'custom, law', derivatives: 'astronomy, economy, nomad' },
      { term: 'πόλεμος', pronunciation: 'pólemos', meaning: 'war', derivatives: 'polemic' },
      { term: 'θάλασσα', pronunciation: 'thálassa', meaning: 'sea', derivatives: 'thalassic, thalassotherapy' },
      { term: 'ἐλεύθερος', pronunciation: 'eleútheros', meaning: 'free', derivatives: 'eleutherophobia (fear of freedom)' },
    ],
    resources: [
      { type: 'book', title: 'The Histories - Herodotus (Greek-English Loeb)', url: 'https://www.amazon.com/Herodotus-Persian-Histories-Classical-Library/dp/0674996070', provider: 'Loeb Classical Library', free: false },
      { type: 'book', title: 'The Histories - Herodotus (English)', url: 'https://www.gutenberg.org/ebooks/2707', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'Herodotus Reader (Greek text with notes)', url: 'https://www.amazon.com/Herodotus-Reader-Annotated-Selections-Histories/dp/1585103233', provider: 'Amazon', free: false },
      { type: 'video', title: 'Herodotus - The First Historian', url: 'https://www.youtube.com/watch?v=0HQqLctHpGY', provider: 'Kings and Generals', free: true },
    ],
    exercises: [
      { instruction: 'Read Croesus and Solon (Book 1.30-33) in English. Take notes on slips of paper. Tomorrow, go for a walk and recite the story from your notes', type: 'reading' },
      { instruction: 'Vocabulary: Learn the 8 vocabulary words above. Write each 5 times. Find English derivatives for each', type: 'writing' },
      { instruction: 'Thermopylae: Read Book 7.219-228. Write a 1-page summary. What does "obedient to their commands" mean?', type: 'writing' },
      { instruction: 'Map Exercise: Draw a map of the Persian Wars. Label Marathon, Thermopylae, Salamis, Athens, Sparta, Persia', type: 'practice' },
    ],
    primarySourceExcerpts: [
      {
        title: 'Solon and Croesus: Who is Happiest?',
        author: 'Herodotus',
        source: 'The Histories, Book I',
        sourceUrl: 'https://www.gutenberg.org/ebooks/2707',
        translatedText: `Croesus asked Solon: "Stranger from Athens, we have heard much of your wisdom and travels. I am curious to know—who is the most blessed man you have ever seen?"

Croesus expected Solon to name him, the wealthiest king alive. But Solon answered: "Tellus of Athens."

Croesus was surprised: "How so? Why Tellus?"

"Tellus lived in a prosperous city, had fine sons who in turn had children, and he died gloriously in battle defending his country. The Athenians gave him a public funeral where he fell."

Croesus pressed: "And who is second?"

"Cleobis and Biton, two brothers who pulled their mother's cart to Hera's temple when the oxen didn't come. Their mother prayed for the gods to give them the best thing for mortals—and they died peacefully in their sleep. Call no man happy until he is dead."`,
        context: 'This story illustrates a key Greek belief: you cannot judge a life until it is complete. Croesus later lost his kingdom to Persia and remembered Solon\'s words. Mill read this at age 7, learning both Greek and moral philosophy together.',
        discussionQuestions: [
          'Why does Solon say we cannot call a man happy until he is dead?',
          'What does this story teach about wealth versus true happiness?',
          'How does this ancient wisdom apply to modern life?'
        ]
      },
      {
        title: 'The Epitaph at Thermopylae',
        author: 'Herodotus (quoting Simonides)',
        source: 'The Histories, Book VII',
        sourceUrl: 'https://www.gutenberg.org/ebooks/2707',
        originalText: 'Ὦ ξεῖν᾽, ἀγγέλλειν Λακεδαιμονίοις ὅτι τῇδε κείμεθα, τοῖς κείνων ῥήμασι πειθόμενοι.',
        translatedText: '"Stranger, tell the Spartans that here we lie, obedient to their commands."',
        context: 'This epitaph marks the grave of the 300 Spartans who died holding the pass at Thermopylae against the Persian army in 480 BCE. It is one of the most famous inscriptions in ancient history. The Greek is simple enough for intermediate students to parse.',
        discussionQuestions: [
          'What does "obedient to their commands" reveal about Spartan values?',
          'Why has this epitaph remained famous for 2,500 years?',
          'Try parsing the Greek: Ὦ (O), ξεῖν\' (stranger), ἀγγέλλειν (to announce), Λακεδαιμονίοις (to the Spartans)...'
        ]
      }
    ]
  },
  {
    id: 'greek-plutarch',
    moduleId: 'ancient-greek',
    title: "Reading: Plutarch's Lives",
    order: 8,
    overview: "Plutarch's parallel biographies of great Greeks and Romans were essential reading for Mill. Learn character through the lives of heroes.",
    content: `**Plutarch (c. 46-120 CE)**

Plutarch's Lives pairs Greek and Roman heroes to explore virtue and character. Mill read extensively from Plutarch, learning history, Greek, and moral philosophy simultaneously.

**The Parallel Lives Structure:**
Each pair compares a Greek and a Roman:
• Alexander & Julius Caesar (conquerors)
• Demosthenes & Cicero (orators)
• Theseus & Romulus (founders)
• Pericles & Fabius Maximus (statesmen)

**Study Method (Teaching to Learn):**
At age 8, Mill began teaching his younger siblings:
1. Learn the lesson yourself first
2. Immediately teach it to someone else
3. Explaining forces deeper understanding
4. You're accountable for their learning too

Try this with Plutarch: After reading a Life, explain it to someone.

**Why Plutarch is Perfect for Learners:**
• Clear, readable Greek prose
• Fascinating biographical stories
• Moral lessons embedded in narrative
• Shorter than full histories

**Recommended Lives for Beginners:**
1. **Alexander** - The conquerer's character
2. **Pericles** - Athens's golden age
3. **Themistocles** - Hero of Salamis
4. **Alcibiades** - Brilliant but flawed`,
    keyPoints: [
      "Plutarch pairs Greek and Roman heroes to explore virtue",
      "Use 'Teaching to Learn': explain each Life to someone else",
      "Start with Alexander, Pericles, or Themistocles",
      "Plutarch teaches character through biography"
    ],
    estimatedMinutes: 90,
    vocabularyTable: [
      { term: 'ἀρετή', pronunciation: 'aretḗ', meaning: 'virtue, excellence, moral goodness', derivatives: 'arete' },
      { term: 'βίος', pronunciation: 'bíos', meaning: 'life, way of living', derivatives: 'biology, biography, biopsy' },
      { term: 'ἦθος', pronunciation: 'ēthos', meaning: 'character, disposition', derivatives: 'ethics, ethos' },
      { term: 'δόξα', pronunciation: 'dóxa', meaning: 'opinion, reputation, glory', derivatives: 'doxology, orthodox, paradox' },
      { term: 'φιλοσοφία', pronunciation: 'philosophía', meaning: 'love of wisdom', derivatives: 'philosophy, philosopher' },
      { term: 'πράξις', pronunciation: 'prâxis', meaning: 'action, deed, practice', derivatives: 'praxis, practice' },
      { term: 'στρατηγός', pronunciation: 'stratēgós', meaning: 'general, military leader', derivatives: 'strategy, strategic' },
      { term: 'πολίτης', pronunciation: 'polítēs', meaning: 'citizen', derivatives: 'politics, polity, cosmopolitan' },
    ],
    resources: [
      { type: 'book', title: 'Plutarch\'s Lives (Greek-English Loeb)', url: 'https://www.amazon.com/Plutarch-Lives-Theseus-Classical-Library/dp/0674990528', provider: 'Loeb Classical Library', free: false },
      { type: 'book', title: 'Plutarch\'s Lives (English)', url: 'https://www.gutenberg.org/ebooks/674', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'Lives (Modern Library Classics)', url: 'https://www.amazon.com/Lives-Modern-Library-Classics/dp/0375756760', provider: 'Amazon', free: false },
      { type: 'video', title: 'Plutarch and Moral Philosophy', url: 'https://www.youtube.com/watch?v=2QDGxKGjqUo', provider: 'Philosophy Overdose', free: true },
    ],
    exercises: [
      { instruction: 'Read the Life of Alexander (first 10 chapters). Take notes on his character traits—good and bad', type: 'reading' },
      { instruction: 'Teaching Practice: Summarize Alexander\'s life to a family member or friend. Explain what made him great and what were his flaws', type: 'practice' },
      { instruction: 'Comparison: Read the Life of Pericles. Compare his leadership style to Alexander\'s. Who was the better leader? Why?', type: 'writing' },
      { instruction: 'Vocabulary: Learn the 8 vocabulary words. For each, find a quote from Plutarch where this concept appears', type: 'practice' },
      { instruction: 'Character Study: Choose one virtue (courage, wisdom, justice, temperance). Find examples of it across 3 different Lives', type: 'writing' },
    ],
    primarySourceExcerpts: [
      {
        title: 'Alexander Tames Bucephalus',
        author: 'Plutarch',
        source: 'Life of Alexander, Chapter 6',
        sourceUrl: 'https://www.gutenberg.org/ebooks/674',
        translatedText: `Philonicus the Thessalian brought the horse Bucephalas to sell to Philip for thirteen talents. They went down to the plain to try him, but he was wild and unmanageable—would not let any of Philip's attendants mount him.

Philip was angry and ordered the horse taken away as worthless. But Alexander, who was present, said: "What a horse they are losing, because they lack the skill and courage to manage him!"

Philip asked: "Do you find fault with your elders because you know more than they, or can manage a horse better?"

"This horse, at any rate," said Alexander, "I could manage better than others."

The boy ran to the horse, took the bridle, and turned him toward the sun—having noticed that the horse was shying at his own shadow. Then speaking gently, he calmed the horse, and when he saw Bucephalas was ready, Alexander leaped lightly on his back and rode him perfectly.

Philip wept with joy and said: "My son, seek out a kingdom worthy of yourself. Macedonia is too small for you."`,
        context: 'This story exemplifies Plutarch\'s method: reveal character through action. Alexander\'s observation (the shadow), courage (confronting what others feared), and skill (calming the horse) foreshadow his future greatness. Plutarch believed we learn virtue by studying great lives.',
        discussionQuestions: [
          'What qualities does Alexander show in this story?',
          'Why does Plutarch include this childhood episode?',
          'What does Philip\'s reaction tell us about recognizing greatness?'
        ]
      },
      {
        title: 'Plutarch on Why Biography Matters',
        author: 'Plutarch',
        source: 'Life of Alexander, Chapter 1',
        sourceUrl: 'https://www.gutenberg.org/ebooks/674',
        translatedText: `"It is not Histories that I am writing, but Lives. And it is not always in the most glorious deeds that virtue or vice is revealed—often a small thing, a phrase, or a jest, reveals character more clearly than battles with thousands slain, great campaigns, or sieges of cities.

Therefore, as portrait painters seek the likeness in the face and expression rather than in other parts of the body, so I must be permitted to penetrate more into the signs of the soul, and by these to portray the life of each man."`,
        context: 'This is Plutarch\'s manifesto for biography. He explains that character matters more than cataloguing events. This approach influenced all later biography and made Plutarch essential reading for educators like Mill\'s father.',
        discussionQuestions: [
          'Why does Plutarch focus on "small things" rather than great battles?',
          'How is biography different from history?',
          'What "small things" in your life reveal your character?'
        ]
      }
    ]
  },

  // ========== LOGIC MODULE ==========
  {
    id: 'logic-three-laws',
    moduleId: 'logic',
    title: 'The Three Laws of Thought',
    order: 1,
    overview: "The foundation of classical logic rests on three self-evident principles: identity, non-contradiction, and excluded middle. Mill mastered these at age 12.",
    content: `**The Three Fundamental Laws**

**1. Law of Identity**
A = A
"A thing is what it is."
• A cat is a cat
• If a statement is true, it is true

**2. Law of Non-Contradiction**
¬(A ∧ ¬A)
"Nothing can be both A and not-A at the same time and in the same respect."
• A cat cannot be a cat and not a cat simultaneously
• A statement cannot be both true and false

**3. Law of Excluded Middle**
A ∨ ¬A
"For any proposition, either it is true or its negation is true."
• Either it is raining or it is not raining
• There is no third option

**Why These Matter:**
All valid reasoning depends on these laws. If you catch someone violating them, their argument is necessarily flawed.

**Test Yourself:** Find the law violated:
"I always lie." (Hint: If this is true, then...)`,
    keyPoints: [
      "Law of Identity: A thing is what it is (A = A)",
      "Law of Non-Contradiction: Nothing can be both A and not-A",
      "Law of Excluded Middle: Everything is either A or not-A",
      "These laws underpin all valid reasoning"
    ],
    estimatedMinutes: 30,
    resources: [
      { type: 'book', title: 'A System of Logic by J.S. Mill', url: 'https://www.gutenberg.org/ebooks/26495', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'What is Philosophy? - Crash Course', url: 'https://www.youtube.com/watch?v=1A_CAkYt3GY', provider: 'Crash Course', free: true },
    ],
    exercises: [
      { instruction: 'Identify which law is violated in 5 paradoxes', type: 'practice' },
      { instruction: 'Write your own example of each law', type: 'writing' },
    ]
  },
  {
    id: 'logic-syllogisms',
    moduleId: 'logic',
    title: 'Understanding Syllogisms',
    order: 2,
    overview: "A syllogism is a form of reasoning where a conclusion follows from two premises. Mill studied these extensively through Aristotle's Organon.",
    content: `**The Classic Syllogism**

**Structure:**
• Major Premise: All M are P
• Minor Premise: All S are M
• Conclusion: Therefore, all S are P

**Example:**
1. All men are mortal. (Major premise)
2. Socrates is a man. (Minor premise)
3. ∴ Socrates is mortal. (Conclusion)

**The Four Figures of Syllogism:**
|        | Figure 1 | Figure 2 | Figure 3 | Figure 4 |
|--------|----------|----------|----------|----------|
| Major  | M-P      | P-M      | M-P      | P-M      |
| Minor  | S-M      | S-M      | M-S      | M-S      |
| Concl. | S-P      | S-P      | S-P      | S-P      |

**Mood:** The type of propositions (A, E, I, O)
• A: All S are P (universal affirmative)
• E: No S are P (universal negative)
• I: Some S are P (particular affirmative)
• O: Some S are not P (particular negative)

**Valid Syllogism in Figure 1:** Barbara (AAA)
All mammals are animals.
All dogs are mammals.
∴ All dogs are animals. ✓`,
    keyPoints: [
      "Major premise: All men are mortal",
      "Minor premise: Socrates is a man",
      "Conclusion: Therefore, Socrates is mortal",
      "Valid form ≠ true content—check both!"
    ],
    estimatedMinutes: 45,
    resources: [
      { type: 'video', title: 'How to Understand Syllogisms', url: 'https://www.youtube.com/watch?v=dRCS0CSwhsg', provider: 'DIVE Into Math', free: true },
      { type: 'book', title: 'The Categories by Aristotle', url: 'https://www.gutenberg.org/ebooks/2412', provider: 'Project Gutenberg', free: true },
    ],
    exercises: [
      { instruction: 'Watch the "What is a Syllogism?" video first (5 min)', type: 'practice' },
      { instruction: 'Create 3 valid syllogisms of your own', type: 'writing' },
      { instruction: 'Identify the figure and mood of 5 syllogisms', type: 'practice' },
    ],
    primarySourceExcerpts: [
      {
        title: 'Prior Analytics - The First Syllogism',
        author: 'Aristotle',
        source: 'MIT Classics',
        sourceUrl: 'http://classics.mit.edu/Aristotle/prior.html',
        originalText: 'Ὅταν οὖν ὅροι τρεῖς οὕτως ἔχωσι πρὸς ἀλλήλους ὥστε τὸν ἔσχατον ἐν ὅλῳ εἶναι τῷ μέσῳ καὶ τὸν μέσον ἐν ὅλῳ τῷ πρώτῳ ἢ εἶναι ἢ μὴ εἶναι, ἀνάγκη τῶν ἄκρων εἶναι συλλογισμὸν τέλειον.',
        translatedText: 'Whenever three terms are so related to one another that the last is contained in the middle as in a whole, and the middle is either contained in, or excluded from, the first as in or from a whole, the extremes must be related by a perfect syllogism.',
        context: 'This is the foundational passage from Aristotle\'s Prior Analytics where he defines the syllogism—the first formal system of logic in history. Aristotle invented the discipline of formal logic, and this work influenced all subsequent Western philosophy.',
        discussionQuestions: [
          'Why are exactly THREE terms needed for a syllogism?',
          'What does Aristotle mean by "contained in as a whole"?',
          'Why is this called a "perfect" syllogism?'
        ]
      },
      {
        title: 'A System of Logic - On Syllogisms',
        author: 'John Stuart Mill',
        source: 'Project Gutenberg',
        sourceUrl: 'https://www.gutenberg.org/ebooks/26495',
        translatedText: 'The syllogism is vicious as a mode of reasoning, but useful as a test of reasoning; not as a means by which we find the truth, but as a means of judging whether we have found it. It is a method of examining whether the truths at which we have arrived are true.',
        context: 'Mill, writing nearly 2,200 years after Aristotle, offers a nuanced critique: syllogisms don\'t discover new truths (the conclusion is already implicit in the premises), but they help us verify our reasoning. This shows how classical education builds critical thinkers.',
        discussionQuestions: [
          'What does Mill mean when he says syllogisms don\'t "find" truth?',
          'How can something be "vicious as reasoning but useful as a test"?',
          'Do you agree with Mill\'s critique?'
        ]
      }
    ]
  },
  {
    id: 'logic-fallacies',
    moduleId: 'logic',
    title: 'Logical Fallacies to Avoid',
    order: 3,
    overview: "Fallacies are errors in reasoning that seem valid but aren't. Recognizing them helps you think clearly and spot bad arguments in daily life.",
    content: `**12 Common Fallacies**

**Fallacies of Relevance:**
1. **Ad Hominem** — Attacking the person, not the argument
   "You can't trust his climate data—he's a liberal!"

2. **Appeal to Authority** — "Experts say" without evidence
   "This doctor says vaccines are bad, so they must be."

3. **Appeal to Emotion** — Using feelings instead of logic
   "Think of the children!"

**Fallacies of Ambiguity:**
4. **Equivocation** — Using a word with two meanings
   "The sign said 'fine for parking here,' so I parked."

5. **Straw Man** — Misrepresenting someone's argument
   "You want less military spending? So you want us defenseless!"

**Fallacies of Presumption:**
6. **False Dilemma** — Only two options when more exist
   "You're either with us or against us."

7. **Begging the Question** — Assuming what you're trying to prove
   "The Bible is true because it's the word of God."

8. **Slippery Slope** — A leads to B leads to disaster (without proof)
   "If we allow X, next thing you know we'll have Y!"

**Practice:** Spot fallacies in today's news headlines.`,
    keyPoints: [
      "Ad Hominem: Attacking the person, not the argument",
      "Straw Man: Misrepresenting someone's position to attack it",
      "Appeal to Authority: 'Experts say' isn't proof",
      "False Dilemma: Presenting only two options when more exist"
    ],
    estimatedMinutes: 40,
    resources: [
      { type: 'book', title: 'A System of Logic by J.S. Mill', url: 'https://www.gutenberg.org/ebooks/26495', provider: 'Project Gutenberg', free: true },
    ],
    exercises: [
      { instruction: 'Find 3 fallacies in today\'s news or social media', type: 'practice' },
      { instruction: 'Rewrite a fallacious argument correctly', type: 'writing' },
    ]
  },

  // ========== MATHEMATICS MODULE ==========
  {
    id: 'math-euclid-elements',
    moduleId: 'mathematics',
    title: "Euclid's Elements: Foundations",
    order: 1,
    overview: "Euclid's Elements has been the foundation of mathematical education for over 2,000 years. Newton, Leibniz, and Einstein all studied it.",
    content: `**The Five Postulates**

Euclid built all of geometry from just five postulates:

1. **A straight line can be drawn between any two points.**

2. **A straight line can be extended indefinitely.**

3. **A circle can be drawn with any center and radius.**

4. **All right angles are equal.**

5. **The Parallel Postulate:** If a line crosses two other lines and the interior angles on one side sum to less than two right angles, those lines will eventually meet on that side.

**Why It Matters:**
From these five simple statements, Euclid derived 465 propositions covering all of plane and solid geometry.

**First Propositions to Master:**
• Proposition 1: Construct an equilateral triangle
• Proposition 4: Side-Angle-Side congruence
• Proposition 47: The Pythagorean Theorem`,
    keyPoints: [
      "All of geometry derives from 5 simple postulates",
      "The parallel postulate (5th) is the most complex",
      "Proposition 47 is the Pythagorean Theorem",
      "Euclid's method: definitions → axioms → theorems"
    ],
    estimatedMinutes: 60,
    vocabularyTable: [
      { term: 'Point', pronunciation: 'σημεῖον (sēmeîon)', meaning: 'That which has no part; location without size', derivatives: 'pointer, pointillism' },
      { term: 'Line', pronunciation: 'γραμμή (grammḗ)', meaning: 'Breadthless length', derivatives: 'linear, lineage' },
      { term: 'Straight Line', pronunciation: 'εὐθεῖα (eutheia)', meaning: 'A line which lies evenly with the points on itself', derivatives: 'Euclidean' },
      { term: 'Surface', pronunciation: 'ἐπιφάνεια (epipháneia)', meaning: 'That which has length and breadth only', derivatives: 'superficial, surface' },
      { term: 'Plane', pronunciation: 'ἐπίπεδον (epípedon)', meaning: 'A flat surface that lies evenly with straight lines', derivatives: 'plane, planar' },
      { term: 'Angle', pronunciation: 'γωνία (gōnía)', meaning: 'The inclination of two lines to one another', derivatives: 'angle, angular, polygon' },
      { term: 'Circle', pronunciation: 'κύκλος (kýklos)', meaning: 'A plane figure with all points equidistant from center', derivatives: 'cycle, bicycle, encyclopedia' },
      { term: 'Radius', pronunciation: 'ἀκτίς (aktís)', meaning: 'Any straight line from center to circumference', derivatives: 'radius, radial, radiate' },
      { term: 'Diameter', pronunciation: 'διάμετρος (diámetros)', meaning: 'A straight line through center touching both sides', derivatives: 'diameter, metric' },
      { term: 'Triangle', pronunciation: 'τρίγωνον (trígōnon)', meaning: 'A figure contained by three straight lines', derivatives: 'triangle, trigonometry' },
      { term: 'Parallel', pronunciation: 'παράλληλος (parállēlos)', meaning: 'Lines in same plane that never meet', derivatives: 'parallel, parallelogram' },
      { term: 'Perpendicular', pronunciation: 'κάθετος (káthetos)', meaning: 'At right angles to', derivatives: 'perpendicular, catheter' },
    ],
    resources: [
      { type: 'book', title: "Euclid's Elements", url: 'https://www.gutenberg.org/ebooks/21076', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'Essence of Linear Algebra', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', provider: '3Blue1Brown', free: true },
      { type: 'book', title: "Euclid's Elements (Interactive)", url: 'https://mathcs.clarku.edu/~djoyce/elements/elements.html', provider: 'Clark University', free: true },
    ],
    exercises: [
      { instruction: 'Day 1: Copy the 5 postulates by hand 3 times, saying each aloud as you write', type: 'writing' },
      { instruction: 'Day 2: With compass and straightedge, construct an equilateral triangle (Proposition 1). Take a photo of your work', type: 'practice' },
      { instruction: 'Day 3: Bisect a given angle using only compass and straightedge (Proposition 9). Document each step', type: 'practice' },
      { instruction: 'Day 4: Define all 12 vocabulary terms in your own words without looking at notes', type: 'writing' },
      { instruction: 'Day 5: Draw and label 5 diagrams: point, line segment, ray, angle (acute/obtuse/right), circle with radius/diameter', type: 'practice' },
      { instruction: 'Weekly Review: Explain to someone (or record yourself) why exactly 5 postulates are needed—no more, no less', type: 'writing' },
    ],
    primarySourceExcerpts: [
      {
        title: 'The Five Postulates',
        author: 'Euclid',
        source: 'Project Gutenberg',
        sourceUrl: 'https://www.gutenberg.org/ebooks/21076',
        translatedText: 'Let the following be postulated:\n\n1. To draw a straight line from any point to any point.\n\n2. To produce a finite straight line continuously in a straight line.\n\n3. To describe a circle with any center and radius.\n\n4. That all right angles are equal to one another.\n\n5. That, if a straight line falling on two straight lines makes the interior angles on the same side less than two right angles, the two straight lines, if produced indefinitely, meet on that side on which are the angles less than the two right angles.',
        context: 'These five postulates are the foundation of all Euclidean geometry. From just these five assumptions, Euclid derived 465 propositions covering all of plane and solid geometry. Einstein called the Elements his "sacred little geometry book," and Newton, Leibniz, Pascal, and nearly every great mathematician studied it.',
        discussionQuestions: [
          'Why can\'t geometry work without these basic assumptions?',
          'The fifth postulate is much longer than the others. Why might this be significant?',
          'Can you think of a sixth postulate that might be needed?'
        ]
      },
      {
        title: 'Proposition 1: Constructing an Equilateral Triangle',
        author: 'Euclid',
        source: 'Clark University (Interactive)',
        sourceUrl: 'https://mathcs.clarku.edu/~djoyce/elements/bookI/propI1.html',
        translatedText: 'On a given finite straight line to construct an equilateral triangle.\n\nLet AB be the given finite straight line. It is required to construct an equilateral triangle on the straight line AB.\n\nDescribe the circle BCD with center A and radius AB. Again describe the circle ACE with center B and radius BA. Join the straight lines CA and CB from the point C at which the circles cut one another to the points A and B.\n\nNow, since the point A is the center of the circle CDB, therefore AC equals AB. Again, since the point B is the center of the circle CAE, therefore BC equals BA. But AC was proved equal to AB, therefore each of the straight lines AC and BC equals AB.\n\nTherefore the triangle ABC is equilateral, and it has been constructed on the given finite straight line AB. Q.E.D.',
        context: 'This is the very first proposition in the Elements—the simplest construction that demonstrates the method. Notice how Euclid only uses postulates 1 and 3, and proves each step rigorously. This style of proof influenced all of mathematics for 2,300 years.',
        discussionQuestions: [
          'What two postulates does this proof use?',
          'Why must point C exist where the circles intersect?',
          'What does Q.E.D. mean and why do mathematicians use it?'
        ]
      }
    ]
  },
  {
    id: 'math-pythagorean',
    moduleId: 'mathematics',
    title: 'The Pythagorean Theorem',
    order: 2,
    overview: "The most famous theorem in mathematics: a² + b² = c². Master multiple proofs and applications.",
    content: `**The Pythagorean Theorem**

In a right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides:

**a² + b² = c²**

**Proof 1: Rearrangement**
Create a large square with side (a+b). Inside, place four copies of the right triangle. The remaining space is c². Show this equals a² + b².

**Proof 2: Similar Triangles**
The altitude from the right angle to the hypotenuse creates two triangles similar to the original. Use proportions to derive a² + b² = c².

**Applications:**
• Distance formula: d = √[(x₂-x₁)² + (y₂-y₁)²]
• 3-4-5, 5-12-13, 8-15-17 Pythagorean triples
• Navigation, construction, physics`,
    keyPoints: [
      "a² + b² = c² for any right triangle",
      "There are over 400 known proofs",
      "Pythagorean triples: 3-4-5, 5-12-13, 8-15-17",
      "The distance formula is derived from this theorem"
    ],
    estimatedMinutes: 45,
    resources: [
      { type: 'video', title: 'Pythagorean Theorem Proofs', url: 'https://www.youtube.com/watch?v=YompsDlEdtc', provider: '3Blue1Brown', free: true },
    ],
    exercises: [
      { instruction: 'Proof Practice 1: Draw a square with side (a+b). Place 4 right triangles inside. Show the remaining area equals c²', type: 'practice' },
      { instruction: 'Proof Practice 2: Draw a right triangle. Drop altitude from right angle to hypotenuse. Label similar triangles and prove a²+b²=c² using proportions', type: 'practice' },
      { instruction: 'Calculation Set: Find the hypotenuse: (a) 3,4,? (b) 5,12,? (c) 8,15,? (d) 7,24,? Show all work', type: 'practice' },
      { instruction: 'Calculation Set: Find the missing leg: (a) 5,?,13 (b) ?,15,17 (c) 9,?,15. Show all work', type: 'practice' },
      { instruction: 'Application: Calculate the diagonal of a 6×8 rectangle. Then calculate how far you walk diagonally across a 100m × 100m field', type: 'practice' },
      { instruction: 'Research: Find and write out one more proof of the Pythagorean theorem (there are 400+). Explain it in your own words', type: 'writing' },
    ]
  },

  // ========== LATIN MODULE ==========
  {
    id: 'latin-first-declension',
    moduleId: 'latin',
    title: 'First Declension Nouns',
    order: 1,
    overview: "Latin nouns follow declension patterns. The first declension is mostly feminine nouns ending in -a. Learn 30 essential words.",
    content: `**First Declension (-a, -ae)**

Most first declension nouns are feminine. Learn the pattern:

| Case | Singular | Plural | Function |
|------|----------|--------|----------|
| Nominative | puell**a** | puell**ae** | Subject |
| Genitive | puell**ae** | puell**ārum** | Possession (of) |
| Dative | puell**ae** | puell**īs** | Indirect object (to/for) |
| Accusative | puell**am** | puell**ās** | Direct object |
| Ablative | puell**ā** | puell**īs** | By/with/from |

**Essential First Declension Nouns:**
• puella, -ae (f) = girl
• rosa, -ae (f) = rose  
• aqua, -ae (f) = water
• terra, -ae (f) = earth, land
• stella, -ae (f) = star
• silva, -ae (f) = forest
• via, -ae (f) = road, way
• vita, -ae (f) = life
• insula, -ae (f) = island
• poeta, -ae (m) = poet (masculine exception!)`,
    keyPoints: [
      "First declension nouns typically end in -a and are feminine",
      "The genitive singular (-ae) identifies the declension",
      "Poeta is masculine despite the -a ending",
      "Learn case endings to understand sentence structure"
    ],
    estimatedMinutes: 60,
    vocabularyTable: [
      { term: 'puella, -ae', meaning: 'girl (f)', derivatives: 'Puella in villa est' },
      { term: 'rosa, -ae', meaning: 'rose (f)', derivatives: 'Rosa est pulchra' },
      { term: 'aqua, -ae', meaning: 'water (f)', derivatives: 'aquatic, aquarium' },
      { term: 'terra, -ae', meaning: 'earth, land (f)', derivatives: 'terrain, territory' },
      { term: 'stella, -ae', meaning: 'star (f)', derivatives: 'stellar, constellation' },
      { term: 'silva, -ae', meaning: 'forest (f)', derivatives: 'sylvan, Pennsylvania' },
      { term: 'via, -ae', meaning: 'road, way (f)', derivatives: 'via, viaduct' },
      { term: 'vita, -ae', meaning: 'life (f)', derivatives: 'vital, vitamin' },
      { term: 'insula, -ae', meaning: 'island (f)', derivatives: 'insular, peninsula' },
      { term: 'poeta, -ae', meaning: 'poet (m)', derivatives: 'poet, poetic' },
    ],
    resources: [
      { type: 'video', title: 'Latin Tutorial - First Declension', url: 'https://www.youtube.com/watch?v=d_lxAjKQPsA', provider: 'Latin Tutorial', free: true },
      { type: 'tool', title: 'Wiktionary Latin Declension', url: 'https://en.wiktionary.org/wiki/Appendix:Latin_first_declension', provider: 'Wiktionary', free: true },
    ],
    exercises: [
      { instruction: 'Declension Drill: Write "rosa" through all 5 cases, singular and plural (10 forms total). Say each form aloud', type: 'writing' },
      { instruction: 'Declension Drill: Repeat for "aqua", "terra", "stella", "via" — 50 forms total', type: 'writing' },
      { instruction: 'Translation (L→E): Puella rosam amat / Stellae in caelo lucent / Aqua est clara / Poetae in silva ambulant', type: 'translation' },
      { instruction: 'Translation (E→L): The girl sees the stars / Water is in the forest / The road is long / The poet loves life', type: 'translation' },
      { instruction: 'Case Identification: For each noun in "Puella aquam silvae portat", identify the case and explain its function', type: 'practice' },
      { instruction: 'Vocabulary Quiz: Cover the meanings column. Write all 10 vocabulary words with meanings from memory', type: 'practice' },
    ]
  },
  {
    id: 'latin-second-declension',
    moduleId: 'latin',
    title: 'Second Declension Nouns',
    order: 2,
    overview: "The second declension includes masculine nouns ending in -us/-er and neuter nouns ending in -um.",
    content: `**Second Declension Masculine (-us, -i)**

| Case | Singular | Plural |
|------|----------|--------|
| Nominative | domin**us** | domin**ī** |
| Genitive | domin**ī** | domin**ōrum** |
| Dative | domin**ō** | domin**īs** |
| Accusative | domin**um** | domin**ōs** |
| Ablative | domin**ō** | domin**īs** |

**Second Declension Neuter (-um, -i)**

| Case | Singular | Plural |
|------|----------|--------|
| Nominative | bell**um** | bell**a** |
| Genitive | bell**ī** | bell**ōrum** |
| Dative | bell**ō** | bell**īs** |
| Accusative | bell**um** | bell**a** |
| Ablative | bell**ō** | bell**īs** |

**Key Rule:** Neuter nominative and accusative are always identical!`,
    keyPoints: [
      "Masculine second declension: -us, -i (dominus, domini)",
      "Neuter second declension: -um, -i (bellum, belli)",
      "Neuter nominative = accusative (always!)",
      "Some -er nouns keep the e (puer), some drop it (magister → magistri)"
    ],
    estimatedMinutes: 60,
    vocabularyTable: [
      { term: 'dominus, -ī', meaning: 'master, lord (m)', derivatives: 'dominate, dominion' },
      { term: 'servus, -ī', meaning: 'slave, servant (m)', derivatives: 'servant, service' },
      { term: 'amicus, -ī', meaning: 'friend (m)', derivatives: 'amicable' },
      { term: 'filius, -ī', meaning: 'son (m)', derivatives: 'filial' },
      { term: 'gladius, -ī', meaning: 'sword (m)', derivatives: 'gladiator' },
      { term: 'bellum, -ī', meaning: 'war (n)', derivatives: 'bellicose, antebellum' },
      { term: 'donum, -ī', meaning: 'gift (n)', derivatives: 'donate, donation' },
      { term: 'imperium, -ī', meaning: 'command, empire (n)', derivatives: 'imperial, emperor' },
    ],
    resources: [
      { type: 'video', title: 'Latin Tutorial - Second Declension', url: 'https://www.youtube.com/watch?v=1WT7HxLBHfE', provider: 'Latin Tutorial', free: true },
    ],
    exercises: [
      { instruction: 'Declension Drill: Write "dominus" through all 5 cases, singular and plural. Then do "bellum" (neuter)', type: 'writing' },
      { instruction: 'Compare & Contrast: Create a table showing how masculine (-us) and neuter (-um) endings differ in each case', type: 'writing' },
      { instruction: 'Translation (L→E): Dominus servum monet / Filii gladios habent / Bella sunt mala / Amici dona portant', type: 'translation' },
      { instruction: 'Translation (E→L): The master loves his son / The friends carry swords / War is evil / The empire is great', type: 'translation' },
      { instruction: 'Exception Practice: Decline "puer" (boy) and "magister" (teacher) — note which keeps the -e- and which drops it', type: 'writing' },
      { instruction: 'Vocabulary Quiz: Write all 8 vocabulary words with meanings and one English derivative each from memory', type: 'practice' },
    ]
  },
  {
    id: 'latin-basic-sentences',
    moduleId: 'latin',
    title: 'Basic Latin Sentences',
    order: 3,
    overview: "Practice translating simple Latin sentences. Learn to identify subject, verb, and object using case endings.",
    content: `**Latin Sentence Practice**

Latin word order is flexible because cases show function. Subject-Object-Verb is common:

**Beginner Sentences:**
1. Puella rosam amat. (The girl loves the rose.)
2. Dominus servum monet. (The master warns the slave.)
3. Bellum est malum. (War is evil.)
4. Servi laborant. (The slaves are working.)
5. Aqua est clara. (The water is clear.)
6. Poeta carmen cantat. (The poet sings a song.)
7. Magistri discipulos docent. (Teachers teach students.)
8. Vita est brevis, ars longa. (Life is short, art is long.)
9. Amicus verus est rarus. (A true friend is rare.)
10. Stellae nocte lucent. (Stars shine at night.)

**Parsing Example:**
| Word | Part of Speech | Case/Form | Translation |
|------|---------------|-----------|-------------|
| puella | noun | nom. sing. | the girl (subject) |
| rosam | noun | acc. sing. | the rose (object) |
| amat | verb | 3rd sing. | loves |`,
    keyPoints: [
      "Latin word order is flexible - cases tell you the function",
      "Nominative = subject, Accusative = direct object",
      "Verbs often come at the end in Latin",
      "Parse each word to understand the sentence"
    ],
    estimatedMinutes: 45,
    resources: [
      { type: 'tool', title: "Whitaker's Words", url: 'http://archives.nd.edu/words.html', provider: 'Notre Dame', free: true },
    ],
    exercises: [
      { instruction: 'Translation Set A: Translate sentences 1-5 from Latin to English. Write out each word with its case/function', type: 'translation' },
      { instruction: 'Translation Set B: Translate sentences 6-10 from Latin to English. Identify the subject and direct object in each', type: 'translation' },
      { instruction: 'Parsing Practice: For "Magistri discipulos docent" — identify: (a) case of each noun, (b) person/number of verb, (c) sentence structure', type: 'practice' },
      { instruction: 'Word Order Exercise: Rewrite 3 sentences with different word orders. Explain why meaning stays the same', type: 'writing' },
      { instruction: 'Create 5 Original Sentences: Using vocabulary from lessons 1-2, write 5 new Latin sentences with translations', type: 'writing' },
      { instruction: 'Oral Practice: Read all 10 sentences aloud 3 times. Record yourself and check pronunciation against videos', type: 'practice' },
    ]
  },
  {
    id: 'latin-famous-phrases',
    moduleId: 'latin',
    title: 'Famous Latin Phrases',
    order: 4,
    overview: "Learn 25 famous Latin phrases that have survived into modern usage. These provide cultural insight and vocabulary practice.",
    content: `**Famous Latin Phrases**

| Latin | English |
|-------|---------|
| Veni, vidi, vici | I came, I saw, I conquered |
| Carpe diem | Seize the day |
| Memento mori | Remember you must die |
| Per aspera ad astra | Through hardships to the stars |
| Amor vincit omnia | Love conquers all |
| Ars longa, vita brevis | Art is long, life is short |
| Cogito, ergo sum | I think, therefore I am |
| Ex nihilo nihil fit | Nothing comes from nothing |
| Fiat lux | Let there be light |
| In vino veritas | In wine, truth |
| Fortuna fortes adiuvat | Fortune favors the brave |
| Tempus fugit | Time flies |
| Errare humanum est | To err is human |
| Alea iacta est | The die is cast |
| Verba volant, scripta manent | Words fly, writings remain |

**Historical Context:**
Many of these phrases come from famous Romans: Caesar (Veni vidi vici, Alea iacta est), Virgil (Amor vincit omnia), Descartes (Cogito ergo sum), and Hippocrates (Ars longa vita brevis).`,
    keyPoints: [
      "Carpe diem (seize the day) - from Horace's Odes",
      "Cogito ergo sum - Descartes' famous philosophical statement",
      "Many legal and scientific terms come from Latin",
      "Learning phrases helps vocabulary stick"
    ],
    estimatedMinutes: 30,
    exercises: [
      { instruction: 'Flashcard Creation: Make flashcards for all 15 phrases (Latin on front, English + origin on back)', type: 'practice' },
      { instruction: 'Daily Practice: Learn 3 new phrases per day for 5 days. Quiz yourself each evening', type: 'practice' },
      { instruction: 'Grammar Analysis: For 5 phrases, identify the verb form and any noun cases present', type: 'practice' },
      { instruction: 'Writing Exercise: Use 5 different phrases in English sentences this week (e.g., "The meeting was a real carpe diem moment")', type: 'writing' },
      { instruction: 'Historical Research: Pick 3 phrases and research their origin story. Write a paragraph on each', type: 'writing' },
      { instruction: 'Pronunciation Practice: Record yourself saying all 15 phrases. Compare to Latin pronunciation videos', type: 'practice' },
    ]
  },
  {
    id: 'latin-caesar',
    moduleId: 'latin',
    title: 'Reading Caesar: Gallic Wars',
    order: 5,
    overview: "Caesar's clear military prose is perfect for intermediate readers. Begin with the famous opening lines of De Bello Gallico.",
    content: `**Caesar's Gallic Wars - Opening**

"Gallia est omnis divisa in partes tres..."
(All of Gaul is divided into three parts...)

| Latin | Literal | Smooth English |
|-------|---------|----------------|
| Gallia est omnis divisa | Gaul is all divided | All of Gaul is divided |
| in partes tres | into parts three | into three parts |
| quarum unam incolunt | of which one inhabit | one of which the Belgians inhabit |
| Belgae | Belgians | - |
| aliam Aquitani | another Aquitanians | another the Aquitani |
| tertiam qui ipsorum lingua | third who in their language | the third those who in their own language |
| Celtae, nostra Galli | Celts, in ours Gauls | are called Celts, in ours Gauls |
| appellantur | are called | - |

**Why Caesar for Beginners:**
- Clear, direct Attic style
- Short sentences
- Military vocabulary that repeats
- Exciting subject matter

**Daily Method:**
1. Prepare 10-15 lines per day
2. Write vocabulary list
3. Parse difficult constructions
4. Read aloud with translation`,
    keyPoints: [
      "Caesar writes in clear, direct Latin prose",
      "Gallic Wars describes his conquest of Gaul (58-50 BC)",
      "Military vocabulary repeats throughout",
      "Prepare passages independently, then discuss with mentor"
    ],
    estimatedMinutes: 90,
    resources: [
      { type: 'book', title: "Caesar's Gallic Wars (Latin)", url: 'https://www.thelatinlibrary.com/caesar.html', provider: 'Latin Library', free: true },
      { type: 'book', title: "Caesar's Gallic Wars (Gutenberg)", url: 'https://www.gutenberg.org/ebooks/10657', provider: 'Project Gutenberg', free: true },
    ],
    exercises: [
      { instruction: 'Day 1: Copy the opening passage by hand. Look up each word in Whitaker\'s Words dictionary', type: 'writing' },
      { instruction: 'Day 2: Create a vocabulary list of 15 words from the passage with definitions and derivatives', type: 'writing' },
      { instruction: 'Day 3: Parse each word — identify case, number, gender for nouns; person, number, tense for verbs', type: 'practice' },
      { instruction: 'Day 4: Translate the passage word-by-word literally, then smooth into natural English', type: 'translation' },
      { instruction: 'Day 5: Read the passage aloud 5 times. Aim for fluid pronunciation', type: 'practice' },
      { instruction: 'Weekly Challenge: Find and translate the next 5 lines of Caesar. Follow the same daily method', type: 'translation' },
    ]
  },

  // ========== ADDITIONAL MATHEMATICS LESSONS ==========
  {
    id: 'math-geometry-propositions',
    moduleId: 'mathematics',
    title: 'Euclid: First 10 Propositions',
    order: 3,
    overview: "Work through Euclid's first 10 propositions. Each builds on the previous, teaching you to think geometrically.",
    content: `**Euclid's Elements - Book 1, Propositions 1-10**

| Prop | Task | Difficulty |
|------|------|------------|
| 1 | Construct equilateral triangle on a given line | Easy |
| 2 | Place a line equal to given line at a given point | Easy |
| 3 | Cut off from greater line a part equal to lesser | Easy |
| 4 | Two triangles with two equal sides and equal angle are congruent | Medium |
| 5 | Angles at base of isosceles triangle are equal | Medium |
| 6 | If two angles equal, opposite sides are equal | Medium |
| 7 | On same line, can't have two equal triangles on same side | Medium |
| 8 | Two triangles with three equal sides are congruent | Medium |
| 9 | Bisect a given angle | Easy |
| 10 | Bisect a given line segment | Easy |

**Method for Each Proposition:**
1. Read and understand what's being proved
2. Draw the construction carefully
3. Follow the proof step by step
4. Explain the proof in your own words
5. Try a variation or extension`,
    keyPoints: [
      "Proposition 1: Equilateral triangle construction is the foundation",
      "Proposition 4 & 8: Triangle congruence theorems (SAS, SSS)",
      "Proposition 5: The famous 'bridge of asses' - isosceles triangle theorem",
      "Each proposition builds on previous ones"
    ],
    estimatedMinutes: 120,
    resources: [
      { type: 'book', title: "Euclid's Elements (Interactive)", url: 'https://mathcs.clarku.edu/~djoyce/elements/bookI/bookI.html', provider: 'Clark University', free: true },
    ],
    exercises: [
      { instruction: 'Proposition 1: Construct an equilateral triangle. Document each step with drawings. Explain why it works', type: 'practice' },
      { instruction: 'Proposition 2: Place a line equal to a given line at a given point. Draw the construction and explain', type: 'practice' },
      { instruction: 'Proposition 4 (SAS): Draw two triangles with two equal sides and the included angle equal. Prove they are congruent', type: 'practice' },
      { instruction: 'Proposition 5 ("Bridge of Asses"): Write out the full proof that base angles of an isosceles triangle are equal. Use your own words', type: 'writing' },
      { instruction: 'Proposition 9: Bisect a given angle using only compass and straightedge. Verify with a protractor', type: 'practice' },
      { instruction: 'Proposition 10: Bisect a given line segment. Verify by measuring both halves', type: 'practice' },
      { instruction: 'Extension Challenge: After mastering 1-10, attempt Proposition 47 (Pythagorean Theorem proof)', type: 'practice' },
    ]
  },
  {
    id: 'math-algebra-basics',
    moduleId: 'mathematics',
    title: 'Algebra: Solving Equations',
    order: 4,
    overview: "Pascal discovered mathematical truths through puzzles. Learn algebra through the same problem-solving approach.",
    content: `**Algebra as Puzzle-Solving**

**The Mystery Number Method:**
"I'm thinking of a number. Add 5 and you get 12. What's my number?"
- Let x = mystery number
- x + 5 = 12
- x = 7 ✓

**Practice Problems (Beginner):**
| # | Problem | Solution |
|---|---------|----------|
| 1 | x + 7 = 15 | x = 8 |
| 2 | 2x = 18 | x = 9 |
| 3 | x - 5 = 12 | x = 17 |
| 4 | 3x + 4 = 19 | x = 5 |
| 5 | 5x - 10 = 25 | x = 7 |
| 6 | 2x + 3 = 3x - 4 | x = 7 |
| 7 | 4(x + 2) = 20 | x = 3 |
| 8 | 6x + 12 = 2x + 32 | x = 5 |
| 9 | 3(2x - 1) = 21 | x = 4 |
| 10 | 5x/2 = 15 | x = 6 |

**Key Principle:** Whatever you do to one side of an equation, you must do to the other side.`,
    keyPoints: [
      "An equation is a balance - keep both sides equal",
      "Isolate the variable by inverse operations",
      "Check your answer by substituting back",
      "Word problems become equations"
    ],
    estimatedMinutes: 60,
    resources: [
      { type: 'video', title: 'Khan Academy Algebra', url: 'https://www.khanacademy.org/math/algebra', provider: 'Khan Academy', free: true },
    ],
    exercises: [
      { instruction: 'Problem Set A (Basic): Solve problems 1-5 showing every step. Write the inverse operation used at each step', type: 'practice' },
      { instruction: 'Problem Set B (Intermediate): Solve problems 6-10. Check each answer by substituting back into the original equation', type: 'practice' },
      { instruction: 'Word Problems: Convert these to equations and solve: (a) "A number plus 7 equals 23" (b) "Three times a number minus 4 equals 17"', type: 'practice' },
      { instruction: 'Create Your Own: Write 5 "mystery number" puzzles for a friend. Include the equation and solution for each', type: 'writing' },
      { instruction: 'Error Analysis: Here are 3 incorrect solutions. Find and explain each error. Then solve correctly', type: 'practice' },
      { instruction: 'Real-World Application: Write 3 real-life situations that could be modeled with linear equations. Set up and solve each', type: 'writing' },
    ]
  },
  {
    id: 'math-quadratics',
    moduleId: 'mathematics',
    title: 'Quadratic Equations',
    order: 5,
    overview: "Quadratic equations (x² terms) appear throughout mathematics and physics. Learn to solve them by factoring.",
    content: `**Quadratic Equations: ax² + bx + c = 0**

**Solving by Factoring:**
x² + 5x + 6 = 0
(x + 2)(x + 3) = 0
x = -2 or x = -3 ✓

**Practice Problems:**
| # | Problem | Hint | Solutions |
|---|---------|------|-----------|
| 1 | x² + 5x + 6 = 0 | (x+2)(x+3) | x = -2, -3 |
| 2 | x² - 7x + 12 = 0 | (x-3)(x-4) | x = 3, 4 |
| 3 | x² = 25 | Take square root | x = ±5 |
| 4 | x² + 4x + 4 = 0 | Perfect square | x = -2 |
| 5 | x² - 2x - 8 = 0 | (x-4)(x+2) | x = 4, -2 |
| 6 | x² + x - 12 = 0 | (x+4)(x-3) | x = -4, 3 |
| 7 | x² - 5x = 0 | Factor out x | x = 0, 5 |
| 8 | 4x² - 9 = 0 | Difference of squares | x = ±3/2 |

**The Quadratic Formula:**
x = (-b ± √(b² - 4ac)) / 2a

This works for ANY quadratic equation!`,
    keyPoints: [
      "Quadratic equations have the form ax² + bx + c = 0",
      "Factoring is fastest when possible",
      "The quadratic formula always works",
      "Most quadratics have two solutions"
    ],
    estimatedMinutes: 75,
    resources: [
      { type: 'video', title: 'Quadratic Equations - 3Blue1Brown', url: 'https://www.youtube.com/watch?v=XFDM1ip5HdU', provider: '3Blue1Brown', free: true },
    ],
    exercises: [
      { instruction: 'Factoring Practice: Solve problems 1-8 by factoring. Show the factored form before solving', type: 'practice' },
      { instruction: 'Quadratic Formula Practice: Solve these using the formula: (a) 2x²+3x-2=0 (b) x²-4x+1=0 (c) 3x²+x-5=0', type: 'practice' },
      { instruction: 'Method Comparison: Solve x²-5x+6=0 three ways: factoring, completing the square, and quadratic formula', type: 'practice' },
      { instruction: 'Discriminant Analysis: For each equation, calculate b²-4ac and predict: 2 real solutions, 1 solution, or no real solutions', type: 'practice' },
      { instruction: 'Graphing Connection: Graph y=x²+5x+6. Identify the x-intercepts. How do they relate to the solutions?', type: 'practice' },
      { instruction: 'Real-World Application: A ball is thrown upward. Its height h=16t-t². When is it at height 12? Set up and solve the quadratic', type: 'practice' },
    ]
  },

  // ========== PHYSICS MODULE ==========
  {
    id: 'physics-newton-laws',
    moduleId: 'physics',
    title: "Newton's Three Laws of Motion",
    order: 1,
    overview: "Newton's laws form the foundation of classical mechanics. Every engineering feat from bridges to rockets uses these principles.",
    content: `**The Three Laws**

**First Law (Inertia):**
An object at rest stays at rest, and an object in motion stays in motion with the same velocity, unless acted upon by a net force.
• A book on a table stays there until pushed
• A hockey puck slides until friction stops it

**Second Law (F = ma):**
The acceleration of an object is proportional to the net force and inversely proportional to its mass.
• Force = mass × acceleration
• Double the force → double the acceleration
• Double the mass → half the acceleration

**Third Law (Action-Reaction):**
For every action, there is an equal and opposite reaction.
• Rocket pushes exhaust down → exhaust pushes rocket up
• You push the floor → floor pushes you up`,
    keyPoints: [
      "First Law: Objects resist changes in motion (inertia)",
      "Second Law: F = ma (force equals mass times acceleration)",
      "Third Law: Every action has an equal and opposite reaction",
      "These laws govern all motion we experience daily"
    ],
    estimatedMinutes: 45,
    vocabularyTable: [
      { term: 'Force', pronunciation: 'F', meaning: 'A push or pull that can change motion; measured in Newtons (N)', derivatives: 'force, enforce, reinforce' },
      { term: 'Mass', pronunciation: 'm', meaning: 'Amount of matter in an object; measured in kilograms (kg)', derivatives: 'mass, massive, biomass' },
      { term: 'Acceleration', pronunciation: 'a', meaning: 'Rate of change of velocity; m/s²', derivatives: 'accelerate, decelerate' },
      { term: 'Velocity', pronunciation: 'v', meaning: 'Speed with direction; m/s', derivatives: 'velocity, velodrome' },
      { term: 'Inertia', pronunciation: 'from Latin iners', meaning: 'Resistance to changes in motion', derivatives: 'inert, inertia' },
      { term: 'Momentum', pronunciation: 'p = mv', meaning: 'Mass times velocity; conserved in collisions', derivatives: 'momentum, moment' },
      { term: 'Newton', pronunciation: 'N = kg·m/s²', meaning: 'SI unit of force (1N accelerates 1kg at 1m/s²)', derivatives: 'Newtonian' },
      { term: 'Friction', pronunciation: 'f', meaning: 'Force that opposes motion between surfaces', derivatives: 'friction, frictional' },
      { term: 'Weight', pronunciation: 'W = mg', meaning: 'Force of gravity on an object; W = mass × g', derivatives: 'weight, weighty' },
      { term: 'Equilibrium', pronunciation: 'ΣF = 0', meaning: 'State where all forces are balanced', derivatives: 'equilibrium, equalize' },
    ],
    resources: [
      { type: 'video', title: "Newton's Laws of Motion for Kids", url: 'https://www.youtube.com/watch?v=XP33o7EJxqg', provider: 'Homeschool Pop', free: true },
      { type: 'video', title: 'Why Do Moving Objects Stop? (Inertia)', url: 'https://www.youtube.com/watch?v=JGO_zDWmkvk', provider: 'SciShow Kids', free: true },
      { type: 'book', title: "Newton's Principia", url: 'https://www.gutenberg.org/ebooks/28233', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'Physics - Crash Course', url: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtN0ge7yDk_UA0ldZJdhwkoV', provider: 'Crash Course', free: true },
      { type: 'video', title: 'MIT 8.01 Classical Mechanics', url: 'https://www.youtube.com/playlist?list=PLyQSN7X0ro203puVhQsmCj9qciW_6NJnV', provider: 'MIT OpenCourseWare', free: true },
    ],
    exercises: [
      { instruction: 'Law Identification: Find 3 examples of each law in your daily life. Document with photos or drawings', type: 'practice' },
      { instruction: 'Calculation Set (F=ma): Solve these: (a) 2kg at 3m/s² = ?N (b) 10N on 5kg = ?m/s² (c) 15N causes 3m/s² = ?kg', type: 'practice' },
      { instruction: 'Calculation Set (Weight): Calculate your weight in Newtons (W=mg, g=9.8m/s²). Then calculate on Moon (g=1.6m/s²)', type: 'practice' },
      { instruction: 'Third Law Analysis: For a rocket launch, identify: (a) the action force, (b) the reaction force, (c) what each acts upon', type: 'writing' },
      { instruction: 'Vocabulary Mastery: Define all 10 terms from memory. Then use each in a sentence about a real situation', type: 'writing' },
      { instruction: 'Essay: Explain why seatbelts, airbags, and crumple zones all relate to Newton\'s Laws (300 words)', type: 'writing' },
    ],
    primarySourceExcerpts: [
      {
        title: 'The Three Laws of Motion',
        author: 'Isaac Newton',
        source: 'Philosophiæ Naturalis Principia Mathematica (1687)',
        sourceUrl: 'https://www.gutenberg.org/ebooks/28233',
        originalText: `LAW I.
Every body perseveres in its state of rest, or of uniform motion in a right line, unless it is compelled to change that state by forces impressed thereon.

LAW II.
The alteration of motion is ever proportional to the motive force impressed; and is made in the direction of the right line in which that force is impressed.

LAW III.
To every action there is always opposed an equal reaction: or the mutual actions of two bodies upon each other are always equal, and directed to contrary parts.`,
        translatedText: `LAW I (Inertia):
Every object continues in its state of rest or uniform straight-line motion unless acted upon by an external force.

LAW II (F=ma):
The change in motion is proportional to the force applied, and occurs in the direction of that force.

LAW III (Action-Reaction):
For every action, there is an equal and opposite reaction.`,
        context: 'The Principia, published in 1687, is considered one of the most important works in the history of science. These three laws formed the foundation of classical mechanics and remained unchallenged for over 200 years until Einstein\'s relativity. Newton wrote in Latin, the scientific language of his era.',
        discussionQuestions: [
          'Why do you think Newton wrote in Latin rather than English?',
          'How does the language of the 17th century differ from how we express these laws today?',
          'Can you think of everyday examples that demonstrate each law?',
          'Why is Law III sometimes the most surprising to people?'
        ]
      },
      {
        title: 'On the Shoulders of Giants',
        author: 'Isaac Newton',
        source: 'Letter to Robert Hooke (1675)',
        sourceUrl: 'https://www.gutenberg.org/ebooks/28233',
        translatedText: `"If I have seen further it is by standing on the shoulders of Giants."`,
        context: 'This famous quote from Newton\'s letter acknowledges the contributions of earlier scientists—Galileo, Kepler, Copernicus—whose work made his discoveries possible. It reflects the cumulative nature of scientific progress and the importance of learning from those who came before.',
        discussionQuestions: [
          'Who were the "giants" Newton was referring to?',
          'Why is intellectual humility important in science?',
          'How does this relate to your own learning journey?'
        ]
      }
    ]
  },
  {
    id: 'physics-invisible-forces',
    moduleId: 'physics',
    title: 'Invisible Forces: Magnetism & Gravity',
    order: 2,
    overview: "Einstein's fascination with a compass at age 5 sparked lifelong wonder. Explore the invisible forces that shape our universe.",
    content: `**The Compass Moment**

At age 5, Einstein received a compass. He was fascinated that an invisible force could move the needle. This wonder never left him.

**Experiments to Recreate Wonder:**

| Week | Experiment | Wonder Question | What to Observe |
|------|------------|-----------------|-----------------|
| 1 | Compass exploration | What makes it point north? | Test in different places |
| 2 | Magnet experiments | How do magnets push without touching? | Iron filings show field lines |
| 3 | Static electricity | What makes hair stand up? | Balloon on hair, paper bits |
| 4 | Gravity observations | Why does everything fall down? | Drop different objects |

**Einstein's Method:**
1. Observe phenomenon for 15 minutes (really look)
2. Ask: What makes this happen?
3. Draw what you see
4. Imagine possible explanations
5. Test your ideas with variations
6. Write 3 new questions for tomorrow`,
    keyPoints: [
      "Invisible forces (magnetism, gravity, electricity) act at a distance",
      "Curiosity about everyday phenomena leads to deep understanding",
      "Einstein's wonder as a child shaped his adult discoveries",
      "Observation comes before explanation"
    ],
    estimatedMinutes: 60,
    resources: [
      { type: 'video', title: 'How Does a Compass Work?', url: 'https://www.youtube.com/watch?v=lQ-voFsz6eU', provider: 'SciShow Kids', free: true },
      { type: 'video', title: 'Magnetism for Kids', url: 'https://www.youtube.com/watch?v=snNG481SYJw', provider: 'Homeschool Pop', free: true },
      { type: 'video', title: 'What is Gravity? (For Kids)', url: 'https://www.youtube.com/watch?v=EKxHvgCOu5I', provider: 'SciShow Kids', free: true },
    ],
    exercises: [
      { instruction: 'Compass Observation: Observe a compass for 15 minutes in 3 different locations. Write 5 questions that arise', type: 'practice' },
      { instruction: 'Magnetic Field Mapping: Use iron filings (or small compasses) to map the field around a bar magnet. Draw what you see', type: 'practice' },
      { instruction: 'Static Electricity Lab: Rub a balloon on hair. Test attraction to: paper, water stream, wall, salt. Record observations', type: 'practice' },
      { instruction: 'Gravity Experiment: Drop pairs of objects (heavy/light, big/small). Time their falls. What patterns emerge?', type: 'practice' },
      { instruction: 'Wonder Journal: For one week, write 3 "why" questions each day about invisible forces you notice', type: 'writing' },
      { instruction: 'Einstein Reflection: Write 1 page on how a simple observation (like a compass) could lead to a major discovery', type: 'writing' },
    ]
  },
  {
    id: 'physics-energy',
    moduleId: 'physics',
    title: 'Energy: Conservation & Transformation',
    order: 3,
    overview: "Energy cannot be created or destroyed, only transformed. This principle underlies all of physics.",
    content: `**The Law of Conservation of Energy**

Energy can change form but the total amount never changes:

**Forms of Energy:**
• Kinetic (motion): KE = ½mv²
• Potential (position): PE = mgh
• Thermal (heat)
• Chemical (bonds)
• Electrical
• Nuclear (E = mc²)

**Energy Transformations:**
• Falling ball: Potential → Kinetic
• Burning wood: Chemical → Thermal + Light
• Solar panel: Light → Electrical
• Battery: Chemical → Electrical → Motion

**Example: Pendulum**
At highest point: All potential energy (PE = mgh)
At lowest point: All kinetic energy (KE = ½mv²)
PE at top = KE at bottom (energy conserved!)

**Einstein's Famous Equation:**
E = mc²
Mass is a form of energy! A tiny amount of mass contains enormous energy.`,
    keyPoints: [
      "Energy is conserved - it transforms but doesn't disappear",
      "Kinetic energy depends on mass and velocity",
      "Potential energy depends on height in a gravity field",
      "E = mc² shows mass-energy equivalence"
    ],
    estimatedMinutes: 60,
    resources: [
      { type: 'video', title: 'What is Energy? (Simple Explanation)', url: 'https://www.youtube.com/watch?v=CW0_S5YpYVo', provider: 'Homeschool Pop', free: true },
      { type: 'video', title: 'Conservation of Energy Explained', url: 'https://www.youtube.com/watch?v=QM6FTHQ5yRQ', provider: 'FuseSchool', free: true },
      { type: 'video', title: 'Work and Energy - Crash Course', url: 'https://www.youtube.com/watch?v=w4QFJb9a8vo', provider: 'Crash Course', free: true },
    ],
    exercises: [
      { instruction: 'Bouncing Ball Lab: Drop a ball from 1m height. Measure bounce heights for 5 bounces. Calculate energy lost each time', type: 'practice' },
      { instruction: 'Energy Transformation Chart: Create a diagram showing 10 different energy transformations (e.g., eating → running)', type: 'writing' },
      { instruction: 'Calculation Set (KE): Find kinetic energy: (a) 2kg at 5m/s (b) 0.5kg at 10m/s (c) 1000kg at 20m/s. Use KE=½mv²', type: 'practice' },
      { instruction: 'Calculation Set (PE): Find potential energy: (a) 5kg at 10m (b) 2kg at 25m (c) 70kg at 3m. Use PE=mgh, g=9.8', type: 'practice' },
      { instruction: 'Pendulum Analysis: Describe energy transformations during one complete swing. Where is KE maximum? PE maximum?', type: 'writing' },
      { instruction: 'E=mc² Calculation: Calculate energy in 1kg of mass (c=3×10⁸ m/s). Compare to energy in 1 gallon of gasoline (120 MJ)', type: 'practice' },
    ],
    classicalConnections: [
      { term: 'Energy', language: 'Greek', original: 'ἐνέργεια (energeia)', meaning: 'activity, operation', usage: 'From ἐν (en, "in") + ἔργον (ergon, "work")—energy is "the work within" a system' },
      { term: 'Kinetic', language: 'Greek', original: 'κίνησις (kinesis)', meaning: 'motion, movement', usage: 'Kinetic energy is the energy of motion—from κινεῖν (kinein), "to move"' },
      { term: 'Potential', language: 'Latin', original: 'potentia', meaning: 'power, capability', usage: 'Potential energy is stored "power"—energy that could be released' },
      { term: 'Conservation', language: 'Latin', original: 'conservare', meaning: 'to keep, preserve', usage: 'Energy is "preserved"—it cannot be created or destroyed' },
      { term: 'Thermal', language: 'Greek', original: 'θερμός (thermos)', meaning: 'hot, warm', usage: 'Thermal energy relates to heat—like a thermos keeps things θερμός' },
    ]
  },

  // ========== CHEMISTRY MODULE ==========
  {
    id: 'chemistry-acids-bases',
    moduleId: 'chemistry',
    title: 'Acids and Bases',
    order: 1,
    overview: "Marie Curie's father taught her systematic experimentation. Start with testing pH of household substances.",
    content: `**Acids and Bases - pH Scale**

The pH scale measures how acidic or basic a substance is:
• pH 0-6: Acidic (more H⁺ ions)
• pH 7: Neutral
• pH 8-14: Basic/Alkaline (more OH⁻ ions)

**Household pH Experiment:**

| Substance | Predicted pH | Actual pH | Acid/Base |
|-----------|--------------|-----------|-----------|
| Lemon juice | | | |
| Vinegar | | | |
| Milk | | | |
| Water | | | |
| Baking soda | | | |
| Soap | | | |
| Ammonia | | | |

**Natural pH Indicator:**
Make red cabbage juice indicator:
1. Chop red cabbage
2. Boil in water for 10 minutes
3. Strain and cool
4. Add to test substances
5. Red = acid, Blue/Green = base

**Curie's Lab Notebook Format:**
- Date and time
- Hypothesis: What do I expect?
- Materials with exact quantities
- Procedure (numbered steps)
- Observations (specific!)
- Conclusion`,
    keyPoints: [
      "pH scale: 0-14, with 7 being neutral",
      "Acids taste sour, bases feel slippery",
      "Natural indicators (cabbage, turmeric) change color",
      "Always record observations systematically"
    ],
    estimatedMinutes: 60,
    vocabularyTable: [
      { term: 'Acid', pronunciation: 'from Latin acidus', meaning: 'Substance that donates H⁺ ions; pH < 7', derivatives: 'acid, acidic, acidity' },
      { term: 'Base', pronunciation: 'from Greek basis', meaning: 'Substance that accepts H⁺ ions; pH > 7', derivatives: 'base, basic, alkali' },
      { term: 'pH', pronunciation: 'potential of Hydrogen', meaning: 'Scale measuring acidity/basicity (0-14)', derivatives: 'pH scale, pH meter' },
      { term: 'Ion', pronunciation: 'from Greek ienai (to go)', meaning: 'Atom with net electric charge', derivatives: 'ion, ionic, ionize' },
      { term: 'H⁺', pronunciation: 'hydrogen ion', meaning: 'Proton; determines acidity', derivatives: 'hydronium' },
      { term: 'OH⁻', pronunciation: 'hydroxide ion', meaning: 'Determines basicity', derivatives: 'hydroxide' },
      { term: 'Neutral', pronunciation: 'pH = 7', meaning: 'Neither acidic nor basic', derivatives: 'neutral, neutralize' },
      { term: 'Indicator', pronunciation: 'from Latin indicare', meaning: 'Substance that changes color with pH', derivatives: 'indicator, indicate' },
      { term: 'Buffer', pronunciation: 'from Old French buffe', meaning: 'Solution that resists pH changes', derivatives: 'buffer, buffered' },
      { term: 'Titration', pronunciation: 'from French titre', meaning: 'Technique to determine concentration', derivatives: 'titrate, titration' },
    ],
    resources: [
      { type: 'video', title: 'Chemistry - Crash Course', url: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtPHzzYuWy6fYEaX9mQQ8oGr', provider: 'Crash Course', free: true },
      { type: 'video', title: 'Acids and Bases Explained', url: 'https://www.youtube.com/watch?v=ANi709MYnWg', provider: 'Bozeman Science', free: true },
    ],
    exercises: [
      { instruction: 'Day 1: Make red cabbage indicator. Document the process with photos and notes following Curie\'s format', type: 'practice' },
      { instruction: 'Day 2: Test 10 household substances. Record: substance, predicted pH, indicator color, actual pH, acid/base', type: 'practice' },
      { instruction: 'Day 3: Create a pH scale poster (0-14) with 2 examples at each level from your experiments', type: 'practice' },
      { instruction: 'Vocabulary Mastery: Define all 10 terms from memory. Write a sentence using each term correctly', type: 'writing' },
      { instruction: 'Neutralization Experiment: Mix vinegar (acid) and baking soda (base). Test pH before, during, after. What happens?', type: 'practice' },
      { instruction: 'Lab Report: Write a complete lab report on your pH experiments following Curie\'s notebook format', type: 'writing' },
    ],
    classicalConnections: [
      { term: 'Acid', language: 'Latin', original: 'acidus', meaning: 'sour, sharp', usage: 'Acids taste sour because "acidus" means sour in Latin' },
      { term: 'Base', language: 'Greek', original: 'βάσις (basis)', meaning: 'foundation, step', usage: 'Bases are the "foundation" for neutralization reactions' },
      { term: 'Ion', language: 'Greek', original: 'ἰόν (ion)', meaning: 'going, that which goes', usage: 'Ions are atoms that "go" (move) carrying electric charge—from ἰέναι (ienai), to go' },
      { term: 'Hydrogen', language: 'Greek', original: 'ὕδωρ + γεννάω (hydor + gennao)', meaning: 'water + to produce', usage: 'Hydrogen is "water-producer"—burning it makes water (H₂O)' },
      { term: 'Oxygen', language: 'Greek', original: 'ὀξύς + γεννάω (oxys + gennao)', meaning: 'sharp/acid + to produce', usage: 'Oxygen was wrongly thought to produce acids (oxy = acid-former)' },
    ],
    primarySourceExcerpts: [
      {
        title: 'On the Discovery of Radium',
        author: 'Marie Curie',
        source: 'Nobel Lecture, December 11, 1911',
        sourceUrl: 'https://www.nobelprize.org/prizes/chemistry/1911/marie-curie/lecture/',
        translatedText: `"I could tell you many things about radium and radioactivity and it would take a long time. But as we can not do that, I shall only give you a short account of my early work about radium.

I shall begin by recalling how it was that I came to take up this work. While working on my thesis I had to study the properties of certain minerals. I became interested in the rays of Becquerel..."`,
        context: 'Marie Curie became the first person to win Nobel Prizes in two different sciences (Physics 1903, Chemistry 1911). In this Nobel lecture, she describes the painstaking work of isolating radium from tons of pitchblende ore—work that eventually cost her life due to radiation exposure.',
        discussionQuestions: [
          'What does this passage reveal about how scientific discoveries are made?',
          'Why do you think Curie says she became "interested" in Becquerel\'s rays?',
          'How does curiosity drive scientific progress?'
        ]
      }
    ]
  },
  {
    id: 'chemistry-reactions',
    moduleId: 'chemistry',
    title: 'Chemical Reactions',
    order: 2,
    overview: "Observe how substances transform into entirely new substances with different properties.",
    content: `**Signs of a Chemical Reaction:**
• Color change
• Gas production (bubbles)
• Temperature change
• Precipitate forms
• Light or fire

**Classic Experiments:**

**1. Vinegar + Baking Soda**
CH₃COOH + NaHCO₃ → CO₂ + H₂O + NaCH₃COO

Observations:
- Bubbling (CO₂ gas)
- Feels cold (endothermic)
- Fizzing sound

**2. Elephant Toothpaste**
Hydrogen peroxide → Water + Oxygen (catalyzed by yeast)
2H₂O₂ → 2H₂O + O₂

**3. Rust Formation**
Iron + Oxygen + Water → Iron oxide (rust)
4Fe + 3O₂ + 6H₂O → 4Fe(OH)₃

**Law of Conservation of Mass:**
Atoms are not created or destroyed in a chemical reaction - they just rearrange. Total mass before = total mass after.`,
    keyPoints: [
      "Chemical reactions create new substances",
      "Signs: color change, gas, temperature change, precipitate",
      "Mass is conserved - atoms rearrange but don't disappear",
      "Catalysts speed up reactions without being consumed"
    ],
    estimatedMinutes: 75,
    exercises: [
      { instruction: 'Experiment 1 (Vinegar + Baking Soda): Measure exact amounts. Record: temperature before/after, volume of gas (balloon method), observations', type: 'practice' },
      { instruction: 'Experiment 2 (Rust): Set up 3 iron nails: (a) dry jar, (b) water only, (c) salt water. Observe daily for 1 week. Document with photos', type: 'practice' },
      { instruction: 'Equation Balancing: Balance these equations: (a) H₂ + O₂ → H₂O (b) Fe + O₂ → Fe₂O₃ (c) CH₄ + O₂ → CO₂ + H₂O', type: 'practice' },
      { instruction: 'Conservation of Mass: Weigh reactants before and products after the vinegar+baking soda reaction. Account for any mass difference', type: 'practice' },
      { instruction: 'Reaction Classification: For each experiment, identify: reaction type, energy change (endo/exothermic), signs of reaction', type: 'writing' },
      { instruction: 'Lab Report: Write a complete lab report comparing the 3 rust conditions. Include hypothesis, procedure, data table, conclusion', type: 'writing' },
    ]
  },
  {
    id: 'chemistry-elements',
    moduleId: 'chemistry',
    title: 'The Periodic Table',
    order: 3,
    overview: "The periodic table organizes all known elements by their properties. Curie discovered two new elements: polonium and radium.",
    content: `**The Periodic Table Structure**

**Groups (Columns):**
Elements in the same group have similar properties:
• Group 1: Alkali metals (reactive, soft)
• Group 2: Alkaline earth metals
• Groups 3-12: Transition metals
• Group 17: Halogens (reactive nonmetals)
• Group 18: Noble gases (unreactive)

**Periods (Rows):**
• Period number = number of electron shells
• Properties change across a period

**Elements to Know:**
| Symbol | Name | Atomic # | Fun Fact |
|--------|------|----------|----------|
| H | Hydrogen | 1 | Most abundant in universe |
| C | Carbon | 6 | Basis of all life |
| N | Nitrogen | 7 | 78% of air |
| O | Oxygen | 8 | 21% of air |
| Fe | Iron | 26 | Core of Earth |
| Au | Gold | 79 | Never corrodes |
| U | Uranium | 92 | Radioactive, nuclear fuel |

**Marie Curie's Discovery:**
Curie discovered polonium (84) and radium (88) - both radioactive elements she isolated through painstaking work.`,
    keyPoints: [
      "Elements are organized by atomic number (protons)",
      "Groups (columns) share similar chemical properties",
      "Noble gases are stable; alkali metals are highly reactive",
      "Marie Curie discovered polonium and radium"
    ],
    estimatedMinutes: 45,
    resources: [
      { type: 'tool', title: 'Interactive Periodic Table', url: 'https://ptable.com/', provider: 'Ptable', free: true },
    ],
    exercises: [
      { instruction: 'Element Memorization: Learn elements 1-20 in order. Use a mnemonic: "Hi He Lied Because Boron Could Not Oxidize Fluorine..."', type: 'practice' },
      { instruction: 'Daily Drill: Quiz yourself on elements 1-20 each morning for a week. Time yourself—aim for under 30 seconds', type: 'practice' },
      { instruction: 'Group Analysis: Compare properties of Group 1 (Li, Na, K) vs Group 18 (He, Ne, Ar). Why are their reactivities so different?', type: 'writing' },
      { instruction: 'Element Research Project: Choose one element. Write a 1-page report covering: discovery, properties, uses, interesting facts', type: 'writing' },
      { instruction: 'Curie Biography: Read about Marie Curie\'s discovery of polonium and radium. Write 5 key lessons from her method', type: 'writing' },
      { instruction: 'Periodic Trends: Create a diagram showing how atomic radius, electronegativity, and reactivity change across a period and down a group', type: 'practice' },
    ]
  },

  // ========== LOGIC MODULE ==========
  {
    id: 'logic-three-laws',
    moduleId: 'logic',
    title: 'The Three Laws of Thought',
    order: 1,
    overview: "The foundation of classical logic rests on three self-evident principles: identity, non-contradiction, and excluded middle.",
    content: `**The Three Fundamental Laws**

**1. Law of Identity**
A = A
"A thing is what it is."
• A cat is a cat
• If a statement is true, it is true

**2. Law of Non-Contradiction**
¬(A ∧ ¬A)
"Nothing can be both A and not-A at the same time and in the same respect."
• A cat cannot be a cat and not a cat simultaneously
• A statement cannot be both true and false

**3. Law of Excluded Middle**
A ∨ ¬A
"For any proposition, either it is true or its negation is true."
• Either it is raining or it is not raining
• There is no third option

**Why These Matter:**
All valid reasoning depends on these laws. If you catch someone violating them, their argument is necessarily flawed.

**Test Yourself:** 
"I always lie." (If this is true, then it's false. If false, then true. Paradox!)`,
    keyPoints: [
      "Law of Identity: A thing is what it is (A = A)",
      "Law of Non-Contradiction: Nothing can be both A and not-A",
      "Law of Excluded Middle: Everything is either A or not-A",
      "These laws underpin all valid reasoning"
    ],
    estimatedMinutes: 30,
    vocabularyTable: [
      { term: 'Proposition', pronunciation: 'from Latin propositio', meaning: 'A statement that is either true or false', derivatives: 'propose, proposition' },
      { term: 'Premise', pronunciation: 'from Latin praemissa', meaning: 'A statement assumed true for argument', derivatives: 'premise, premises' },
      { term: 'Conclusion', pronunciation: 'from Latin concludere', meaning: 'Statement that follows from premises', derivatives: 'conclude, conclusion' },
      { term: 'Valid', pronunciation: 'from Latin validus', meaning: 'Logically correct; conclusion follows from premises', derivatives: 'valid, validity, validate' },
      { term: 'Sound', pronunciation: 'from Latin sonus', meaning: 'Valid AND all premises are true', derivatives: 'sound, soundness' },
      { term: 'Negation', pronunciation: '¬ or ~', meaning: 'The opposite of a statement; "not A"', derivatives: 'negate, negative' },
      { term: 'Conjunction', pronunciation: '∧ or AND', meaning: 'Both statements are true; "A and B"', derivatives: 'conjoin, conjunction' },
      { term: 'Disjunction', pronunciation: '∨ or OR', meaning: 'At least one statement is true; "A or B"', derivatives: 'disjoint, disjunction' },
      { term: 'Implication', pronunciation: '→ or IF...THEN', meaning: 'If A is true, then B must be true', derivatives: 'imply, implication' },
      { term: 'Tautology', pronunciation: 'from Greek tauto (same)', meaning: 'Statement that is always true', derivatives: 'tautology, tautological' },
      { term: 'Contradiction', pronunciation: 'from Latin contra', meaning: 'Statement that is always false', derivatives: 'contradict, contradiction' },
      { term: 'Axiom', pronunciation: 'from Greek axios', meaning: 'Self-evident truth; starting point', derivatives: 'axiom, axiomatic' },
    ],
    resources: [
      { type: 'book', title: 'A System of Logic by J.S. Mill', url: 'https://www.gutenberg.org/ebooks/26495', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'What is Philosophy? - Crash Course', url: 'https://www.youtube.com/watch?v=1A_CAkYt3GY', provider: 'Crash Course', free: true },
      { type: 'video', title: 'Introduction to Logic', url: 'https://www.youtube.com/watch?v=NV0v7nzFLKM', provider: 'Khan Academy', free: true },
    ],
    exercises: [
      { instruction: 'Law Analysis: Find 5 paradoxes (Liar\'s, Ship of Theseus, etc.). Identify which law each violates and explain why', type: 'practice' },
      { instruction: 'Personal Examples: Write your own example of each law using situations from your daily life', type: 'writing' },
      { instruction: 'Vocabulary Mastery: Define all 12 terms from memory. Then create a concept map showing how they relate', type: 'writing' },
      { instruction: 'Symbolization Practice: Convert 10 English sentences to logical symbols using ∧, ∨, ¬, →. Example: "If it rains, the ground is wet" → R → W', type: 'practice' },
      { instruction: 'Truth Table Construction: Build truth tables for: (a) A ∧ B, (b) A ∨ B, (c) A → B, (d) ¬(A ∧ ¬A)', type: 'practice' },
      { instruction: 'Daily Logic Journal: For one week, record one argument you encounter daily. Identify its premises and conclusion', type: 'writing' },
    ]
  },
  {
    id: 'logic-syllogisms',
    moduleId: 'logic',
    title: 'Understanding Syllogisms',
    order: 2,
    overview: "A syllogism is a form of reasoning where a conclusion follows from two premises. Mill studied these through Aristotle's Organon.",
    content: `**The Classic Syllogism**

**Structure:**
• Major Premise: All M are P
• Minor Premise: All S are M
• Conclusion: Therefore, all S are P

**Example:**
1. All men are mortal. (Major premise)
2. Socrates is a man. (Minor premise)
3. ∴ Socrates is mortal. (Conclusion)

**Types of Propositions (A, E, I, O):**
• A: All S are P (universal affirmative)
• E: No S are P (universal negative)
• I: Some S are P (particular affirmative)
• O: Some S are not P (particular negative)

**Valid Syllogism Example - Barbara (AAA):**
All mammals are animals. (A)
All dogs are mammals. (A)
∴ All dogs are animals. (A) ✓

**Important:** Valid form ≠ true content
"All fish are mammals. All whales are fish. ∴ All whales are mammals."
(Valid form, but premise is false!)`,
    keyPoints: [
      "Major premise: All men are mortal",
      "Minor premise: Socrates is a man",
      "Conclusion: Therefore, Socrates is mortal",
      "Valid form ≠ true content—check both!"
    ],
    estimatedMinutes: 45,
    resources: [
      { type: 'video', title: 'What is a Syllogism? (Simple Explanation)', url: 'https://www.youtube.com/watch?v=3F1pP2LDxiI', provider: 'Wireless Philosophy', free: true },
      { type: 'video', title: 'Syllogisms for Beginners', url: 'https://www.youtube.com/watch?v=XYZqPGCv1g4', provider: 'TED-Ed', free: true },
      { type: 'book', title: 'The Categories by Aristotle', url: 'https://www.gutenberg.org/ebooks/2412', provider: 'Project Gutenberg', free: true },
    ],
    exercises: [
      { instruction: 'Create 5 Valid Syllogisms: Write syllogisms on topics like animals, school, sports. Label major premise, minor premise, conclusion', type: 'writing' },
      { instruction: 'Create 3 Invalid Syllogisms: Write syllogisms that LOOK valid but contain logical errors. Explain the flaw in each', type: 'writing' },
      { instruction: 'Proposition Types: Write 2 examples each of A, E, I, O propositions. Identify the subject and predicate in each', type: 'practice' },
      { instruction: 'Validity vs Soundness: Create 2 valid but unsound syllogisms (false premises, true form) and explain the difference', type: 'writing' },
      { instruction: 'Real-World Analysis: Find 3 arguments in news/speeches. Rewrite them as formal syllogisms. Are they valid? Sound?', type: 'practice' },
      { instruction: 'Venn Diagram Practice: Draw Venn diagrams for 5 syllogisms showing why the conclusion follows (or doesn\'t) from the premises', type: 'practice' },
    ]
  },
  {
    id: 'logic-fallacies',
    moduleId: 'logic',
    title: 'Logical Fallacies',
    order: 3,
    overview: "Mill wrote: 'The first intellectual operation in which I arrived at any proficiency was dissecting a bad argument.'",
    content: `**12 Common Fallacies**

**Fallacies of Relevance:**
1. **Ad Hominem** — Attacking the person, not the argument
   "You can't trust his climate data—he's a liberal!"

2. **Appeal to Authority** — "Experts say" without evidence
   "This doctor says vaccines are bad, so they must be."

3. **Appeal to Emotion** — Using feelings instead of logic
   "Think of the children!"

**Fallacies of Ambiguity:**
4. **Equivocation** — Using a word with two meanings
   "The sign said 'fine for parking here,' so I parked."

5. **Straw Man** — Misrepresenting someone's argument
   "You want less military spending? So you want us defenseless!"

**Fallacies of Presumption:**
6. **False Dilemma** — Only two options when more exist
   "You're either with us or against us."

7. **Begging the Question** — Assuming what you're trying to prove

8. **Slippery Slope** — A leads to B leads to disaster

9. **Hasty Generalization** — Too small a sample

10. **Post Hoc** — Correlation ≠ causation

**Practice:** Spot fallacies in today's news!`,
    keyPoints: [
      "Ad Hominem: Attacking the person, not the argument",
      "Straw Man: Misrepresenting someone's position",
      "Appeal to Authority: 'Experts say' isn't proof",
      "False Dilemma: Only two options when more exist"
    ],
    estimatedMinutes: 40,
    resources: [
      { type: 'video', title: 'Logical Fallacies Explained (Simple)', url: 'https://www.youtube.com/watch?v=k_KLX6WjFqg', provider: 'TED-Ed', free: true },
      { type: 'video', title: '10 Common Logical Fallacies', url: 'https://www.youtube.com/watch?v=eTvPw0VGhtQ', provider: 'Crash Course', free: true },
    ],
    exercises: [
      { instruction: 'Fallacy Hunt Day 1-3: Find 2 fallacies per day in news, ads, or social media. Screenshot and label each one', type: 'practice' },
      { instruction: 'Fallacy Flashcards: Create flashcards for all 12 fallacies with name, definition, and an original example on each', type: 'practice' },
      { instruction: 'Rewrite Exercise: Take 5 fallacious arguments and rewrite them as valid arguments. What information was missing?', type: 'writing' },
      { instruction: 'Self-Reflection: Identify 3 times you\'ve used fallacious reasoning in the past week. How could you have argued better?', type: 'writing' },
      { instruction: 'Debate Preparation: Pick a controversial topic. Write the strongest argument for each side WITHOUT using fallacies', type: 'writing' },
      { instruction: 'Teaching Exercise: Explain 3 fallacies to a friend or family member. Quiz them on identifying examples', type: 'practice' },
    ]
  },
  {
    id: 'logic-induction-deduction',
    moduleId: 'logic',
    title: 'Induction vs Deduction',
    order: 4,
    overview: "Mill's greatest contribution was his analysis of inductive reasoning—moving from observations to general laws.",
    content: `**Two Types of Reasoning**

**Deduction: General → Specific (Certain)**
• Premise: All swans are white
• Premise: This is a swan
• Conclusion: This swan is white
• If premises are true, conclusion MUST be true

**Induction: Specific → General (Probable)**
• Observation: Swan 1 is white
• Observation: Swan 2 is white
• Observation: Swan 3 is white
• Conclusion: All swans are white
• This is PROBABLE but not certain (black swans exist!)

**Mill's Five Methods of Induction:**

1. **Method of Agreement**
   If A occurs in all cases where X occurs, A may cause X.

2. **Method of Difference**
   If X occurs when A is present but not when A is absent, A causes X.

3. **Joint Method**
   Combine Agreement and Difference.

4. **Method of Residues**
   Subtract known causes; what remains causes what remains.

5. **Method of Concomitant Variation**
   If A varies when X varies, they're related.

**Science relies heavily on induction!**`,
    keyPoints: [
      "Deduction: General → specific (certain if premises true)",
      "Induction: Specific → general (probable, not certain)",
      "Science relies heavily on induction",
      "Mill's Methods help identify causal relationships"
    ],
    estimatedMinutes: 60,
    resources: [
      { type: 'book', title: 'A System of Logic by J.S. Mill', url: 'https://www.gutenberg.org/ebooks/26495', provider: 'Project Gutenberg', free: true },
    ],
    exercises: [
      { instruction: 'Deduction Examples: Write 5 deductive arguments. For each, show that if premises are true, conclusion MUST be true', type: 'writing' },
      { instruction: 'Induction Examples: Write 5 inductive arguments. For each, explain why the conclusion is probable but not certain', type: 'writing' },
      { instruction: 'Black Swan Exercise: Find 3 historical examples where inductive reasoning failed (like black swans disproving "all swans are white")', type: 'practice' },
      { instruction: 'Mill\'s Method of Difference: Design an experiment to test why plants need sunlight. What\'s your control? Variable? Prediction?', type: 'practice' },
      { instruction: 'Mill\'s Method of Agreement: List 5 things successful students do. What factor appears in ALL cases? Apply the method', type: 'practice' },
      { instruction: 'Scientific Method Analysis: Take a famous experiment (Galileo\'s falling objects, Pasteur\'s germ theory). Identify the inductive and deductive elements', type: 'writing' },
    ]
  },

  // ========== THOUGHT EXPERIMENTS MODULE ==========
  {
    id: 'thought-experiments-intro',
    moduleId: 'thought-experiments',
    title: "Einstein's Method: Gedankenexperiment",
    order: 1,
    overview: "Einstein's greatest discoveries came from thought experiments—mentally simulating scenarios impossible to test in a lab.",
    content: `**The Gedankenexperiment (Thought Experiment)**

Einstein discovered special relativity by imagining himself riding alongside a beam of light. This "thought experiment" method allows us to explore physics beyond what we can physically test.

**Famous Thought Experiments:**

**1. Chasing a Light Beam (Age 16)**
What would I see if I traveled at the speed of light alongside a light wave?
→ Led to special relativity

**2. The Elevator**
You're in a sealed elevator. Can you tell if you're:
a) At rest in a gravitational field, or
b) Accelerating upward in empty space?
→ Led to general relativity (equivalence principle)

**3. The Twin Paradox**
One twin travels near light speed, the other stays on Earth. Who ages more?
→ Time dilation is real and measurable

**The Method:**
1. Set up a simplified scenario
2. Apply known physics consistently
3. Follow logic to its conclusion
4. If the conclusion contradicts known physics, something fundamental must change`,
    keyPoints: [
      "Thought experiments test ideas impossible to realize physically",
      "Einstein's light beam chase led to special relativity",
      "The elevator thought experiment led to general relativity",
      "The method: simplify, apply physics, follow logic rigorously"
    ],
    estimatedMinutes: 45,
    vocabularyTable: [
      { term: 'Gedankenexperiment', pronunciation: 'German: thought experiment', meaning: 'Mental simulation of a physical scenario', derivatives: 'thought experiment' },
      { term: 'Relativity', pronunciation: 'from Latin relativus', meaning: 'Physical laws are same for all observers', derivatives: 'relative, relativistic' },
      { term: 'Speed of Light', pronunciation: 'c = 299,792,458 m/s', meaning: 'Ultimate speed limit in the universe', derivatives: 'light-speed, subluminal' },
      { term: 'Time Dilation', pronunciation: 'from Latin dilatare', meaning: 'Time passes slower at high speeds/gravity', derivatives: 'dilate, dilation' },
      { term: 'Length Contraction', pronunciation: 'Lorentz contraction', meaning: 'Objects appear shorter at high speeds', derivatives: 'contract, contraction' },
      { term: 'Equivalence Principle', pronunciation: 'Einstein 1907', meaning: 'Gravity and acceleration are indistinguishable', derivatives: 'equivalent, equivalence' },
      { term: 'Inertial Frame', pronunciation: 'from Latin inertia', meaning: 'Reference frame with no acceleration', derivatives: 'inertial, frame of reference' },
      { term: 'Spacetime', pronunciation: 'space + time', meaning: '4D fabric of the universe (3 space + 1 time)', derivatives: 'spacetime, space-time' },
      { term: 'Event Horizon', pronunciation: 'black hole boundary', meaning: 'Point of no return around a black hole', derivatives: 'horizon, event' },
      { term: 'Paradox', pronunciation: 'from Greek paradoxos', meaning: 'Seemingly contradictory but revealing truth', derivatives: 'paradox, paradoxical' },
    ],
    resources: [
      { type: 'video', title: 'What If You Could Travel at Light Speed?', url: 'https://www.youtube.com/watch?v=ACUuFg9Y9dY', provider: 'What If', free: true },
      { type: 'video', title: 'Einstein\'s Thought Experiments (Simple)', url: 'https://www.youtube.com/watch?v=rnzddQASCVY', provider: 'MinutePhysics', free: true },
      { type: 'book', title: 'Relativity by Einstein', url: 'https://www.gutenberg.org/ebooks/5001', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: "Einstein's General Relativity", url: 'https://www.youtube.com/watch?v=DYq774z4dws', provider: 'PBS Space Time', free: true },
      { type: 'video', title: 'Special Relativity Explained', url: 'https://www.youtube.com/watch?v=ajhFNcUTJI0', provider: 'Veritasium', free: true },
    ],
    exercises: [
      { instruction: 'Elevator Experiment: Write a 1-page explanation of the elevator thought experiment. Include: setup, question, reasoning, conclusion', type: 'writing' },
      { instruction: 'Light Beam Chase: Imagine you\'re 16-year-old Einstein. Write your reasoning about what you\'d see chasing a light beam', type: 'writing' },
      { instruction: 'Twin Paradox Diagram: Draw a spacetime diagram showing both twins\' worldlines. Label departure, journey, return, reunion', type: 'practice' },
      { instruction: 'Vocabulary Mastery: Define all 10 terms from memory. Use each in a sentence explaining a relativistic concept', type: 'writing' },
      { instruction: 'Video Study: Watch the PBS Space Time video on general relativity. Take notes on 5 key concepts. Summarize in your own words', type: 'practice' },
      { instruction: 'Design Your Own: Create an original thought experiment about time, space, or gravity. Follow Einstein\'s 4-step method', type: 'writing' },
    ]
  },
  {
    id: 'thought-experiments-practice',
    moduleId: 'thought-experiments',
    title: 'Weekly Thought Experiment Practice',
    order: 2,
    overview: "Practice 8 classic thought experiments. Each scenario reveals something profound about physics or philosophy.",
    content: `**8 Thought Experiments to Practice**

| Week | Scenario | Question to Explore |
|------|----------|---------------------|
| 1 | Elevator accelerating in space | Can you tell difference from gravity? |
| 2 | Twin paradox - one twin near light speed | Who ages more? |
| 3 | Shrinking to atomic size | What would matter look like? |
| 4 | If Earth suddenly stopped spinning | What would happen? |
| 5 | If gravity suddenly disappeared | What keeps planets in orbit? |
| 6 | Traveling backward in time | What paradoxes arise? |
| 7 | Universe with different speed of light | How would physics change? |
| 8 | Being inside a black hole | What do you experience? |

**Method for Each:**
1. Visualize the scenario vividly
2. Apply known physical laws
3. Find contradictions or surprises
4. Resolve through new principles
5. Express mathematically if possible

**Galileo's Ship:**
Classic thought experiment: Drop a ball in a ship moving smoothly. Does it fall straight down or behind you? (Answer: straight down - motion is relative!)`,
    keyPoints: [
      "Each thought experiment reveals deep physics insights",
      "The twin paradox shows time dilation is real",
      "Galileo's ship shows motion is relative",
      "Black hole thought experiments led to Hawking radiation"
    ],
    estimatedMinutes: 60,
    exercises: [
      { instruction: 'Week 1-2: Work through Experiments 1-2 (Elevator, Twin Paradox). Write 1 page each explaining your reasoning and conclusions', type: 'practice' },
      { instruction: 'Week 3-4: Work through Experiments 3-4 (Atomic size, Earth stops). For each, list 5 consequences and the physics behind them', type: 'practice' },
      { instruction: 'Week 5-6: Work through Experiments 5-6 (No gravity, Time travel). Identify the paradoxes that arise', type: 'practice' },
      { instruction: 'Week 7-8: Work through Experiments 7-8 (Different light speed, Black hole). Research real physics to support your conclusions', type: 'practice' },
      { instruction: 'Galileo\'s Ship Recreation: Describe this experiment in detail. Then design a modern version (plane? space station?) and predict results', type: 'writing' },
      { instruction: 'Journal Entry: Write as if you\'re Einstein age 16, having just conceived the light-chasing thought experiment. Express your wonder and confusion', type: 'writing' },
    ]
  },
  {
    id: 'thought-experiments-create',
    moduleId: 'thought-experiments',
    title: 'Creating Your Own Thought Experiments',
    order: 3,
    overview: "Learn to construct your own thought experiments to explore questions in physics, ethics, and philosophy.",
    content: `**How to Create a Thought Experiment**

**Step 1: Identify a Question**
What physical or philosophical principle do you want to explore?
Example: "Is consciousness necessary for observation in quantum mechanics?"

**Step 2: Set Up a Simplified Scenario**
Remove all complications except what you're studying.
Example: Schrödinger's cat - a single atom, a cat, a box.

**Step 3: Apply Known Laws Rigorously**
Follow the rules of physics (or ethics) as strictly as possible.

**Step 4: Find the Paradox or Insight**
What surprising conclusion does the logic lead to?

**Step 5: Resolve or Learn**
Either resolve the paradox or recognize new physics is needed.

**Famous Examples:**
• Schrödinger's Cat (quantum superposition)
• The Trolley Problem (ethics)
• Maxwell's Demon (thermodynamics)
• Zeno's Paradoxes (infinity and motion)
• Chinese Room (AI and consciousness)

**Your Turn:**
Create a thought experiment about one of these:
• What if you could teleport? (Are you the same person?)
• What if we could read minds?
• What if the universe is a simulation?`,
    keyPoints: [
      "Thought experiments simplify to isolate a principle",
      "Rigorously apply known laws to find paradoxes",
      "Famous examples: Schrödinger's cat, trolley problem",
      "Creating your own develops deep understanding"
    ],
    estimatedMinutes: 45,
    exercises: [
      { instruction: 'Teleportation Thought Experiment: If you teleport, is the "you" that arrives the same person? Write 2 pages exploring this with the 5-step method', type: 'writing' },
      { instruction: 'Maxwell\'s Demon Research: Read about Maxwell\'s Demon. Explain: (a) the setup, (b) the paradox, (c) how it was resolved, (d) what it teaches about entropy', type: 'writing' },
      { instruction: 'Trolley Problem Analysis: Describe the trolley problem and 3 variations. What ethical principle does each variation test?', type: 'writing' },
      { instruction: 'Chinese Room Exploration: Explain Searle\'s Chinese Room. Does it prove AI can\'t be conscious? Argue both sides', type: 'writing' },
      { instruction: 'Create 3 Original Thought Experiments: Choose 3 different domains (physics, ethics, consciousness). Follow the 5-step method for each', type: 'writing' },
      { instruction: 'Presentation: Prepare a 5-minute presentation on your best original thought experiment. Include visuals and explain your reasoning', type: 'practice' },
    ],
    classicalConnections: [
      { term: 'Paradox', language: 'Greek', original: 'παράδοξος (paradoxos)', meaning: 'contrary to expectation', usage: 'From παρά (para, against) + δόξα (doxa, opinion)—thought experiments often reveal "contrary" conclusions' },
      { term: 'Hypothesis', language: 'Greek', original: 'ὑπόθεσις (hypothesis)', meaning: 'a placing under, foundation', usage: 'From ὑπό (hypo, under) + θέσις (thesis, placing)—we "place under" an assumption to test it' },
      { term: 'Theory', language: 'Greek', original: 'θεωρία (theoria)', meaning: 'contemplation, speculation', usage: 'From θεωρεῖν (theorein), "to look at, observe"—theory comes from careful observation' },
      { term: 'Phenomenon', language: 'Greek', original: 'φαινόμενον (phainomenon)', meaning: 'that which appears', usage: 'From φαίνω (phaino), "to show"—phenomena are what "shows itself" to observation' },
      { term: 'Cosmos', language: 'Greek', original: 'κόσμος (kosmos)', meaning: 'order, world', usage: 'The universe is a κόσμος—an ordered whole, not chaos. You learned this in Greek vocabulary!' },
    ],
    primarySourceExcerpts: [
      {
        title: 'The Elevator Thought Experiment',
        author: 'Albert Einstein',
        source: 'The Meaning of Relativity (1922)',
        sourceUrl: 'https://www.gutenberg.org/ebooks/5001',
        translatedText: `"Let us imagine a portion of empty space far removed from stars and appreciable masses. We imagine a large box, in the form of a room, containing an observer with apparatus. A being is attached to the cover of the box, and begins pulling it with constant force. The box with the observer begins to move 'upward' with uniformly accelerated motion.

The observer notices that a body released from his hand falls to the floor with an accelerated motion. How does the man in the box interpret this? He says: 'the body falls because the whole box is in a gravitational field directed downward.' The man on the inside of the box cannot discover any difference between a gravitational field and an accelerated frame of reference."`,
        context: 'This thought experiment led Einstein to the equivalence principle—the foundation of general relativity. By imagining a situation that couldn\'t be tested in a lab, Einstein discovered that gravity and acceleration are indistinguishable.',
        discussionQuestions: [
          'Why can\'t the observer inside the box tell if he\'s in gravity or being accelerated?',
          'What does this tell us about the nature of gravity?',
          'How did imagining this scenario help Einstein discover something real about the universe?'
        ]
      }
    ]
  },

  // ========== ENGINEERING MODULE (DA VINCI'S METHOD) ==========
  {
    id: 'eng-mechanical-design',
    moduleId: 'engineering',
    title: 'Principles of Mechanical Design',
    order: 1,
    overview: "Leonardo was the greatest engineer of the Renaissance. He approached engineering by studying ancient masters, observing nature, and iterating through experimentation.",
    content: `**Leonardo the Engineer**

Leonardo wrote: "Mechanics is the paradise of mathematical sciences, because here we come to the fruits of mathematics."

**His Engineering Method:**

**1. Study Ancient Masters**
• Read Vitruvius on architecture
• Studied Archimedes on mechanics
• Built on Hero of Alexandria's automatons

**2. Observe Nature**
• How do birds fly?
• How do fish swim?
• How do plants grow?

**3. Experiment and Iterate**
• Build models
• Test ideas
• Revise based on results

**Key Mechanical Principles:**

**Leverage:**
A longer lever arm requires less force.
F₁ × d₁ = F₂ × d₂

**Pulleys:**
Each additional pulley halves the force needed.
Trade force for distance.

**Gears:**
Transfer and modify rotational motion.
Larger gear = more torque, less speed.

**Friction:**
Leonardo studied friction systematically.
First to note friction is proportional to load.`,
    keyPoints: [
      "Leonardo studied ancient engineers: Vitruvius, Archimedes, Hero of Alexandria",
      "Mastered leverage, pulleys, and gear mechanics",
      "First to systematically study friction",
      "Approach: observe, design, build, test, iterate"
    ],
    estimatedMinutes: 50,
    resources: [
      { type: 'book', title: 'De Architectura - Vitruvius', url: 'https://www.gutenberg.org/ebooks/20239', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'The Works of Archimedes', url: 'https://archive.org/details/worksofarchimede00telerich', provider: 'Internet Archive', free: true },
      { type: 'book', title: 'Pneumatics - Hero of Alexandria', url: 'https://archive.org/details/pneumaticsofhero00heron', provider: 'Internet Archive', free: true },
      { type: 'book', title: "Leonardo's Notebooks", url: 'https://www.gutenberg.org/ebooks/5000', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'How Archimedes Invented the Lever', url: 'https://www.youtube.com/watch?v=K9kLQ1j3yRY', provider: 'YouTube', free: true },
      { type: 'article', title: 'Leonardo\'s Machines - Interactive 3D', url: 'https://www.museogalileo.it/en/explore/multimedia/leonardos-machines.html', provider: 'Museo Galileo', free: true },
    ],
    exercises: [
      { instruction: 'Read Vitruvius: Find Book 10 of De Architectura (on machines). Read the section on lifting machines. Summarize 3 key principles', type: 'reading' },
      { instruction: 'Archimedes Study: Read "On the Lever". Calculate: if a 10kg weight is 2m from the fulcrum, where must a 5kg weight be placed to balance it?', type: 'practice' },
      { instruction: 'Hero\'s Devices: Read about the aeolipile (steam engine). Sketch how it works. What modern invention does it anticipate?', type: 'practice' },
      { instruction: 'Design Exercise: Create a simple machine to lift a heavy weight using levers, pulleys, or gears. Sketch from multiple angles', type: 'writing' },
      { instruction: 'Friction Experiment: Push objects on different surfaces. Rank by friction. What patterns do you notice about weight and friction?', type: 'practice' },
    ],
    classicalConnections: [
      { term: 'Mechanics', language: 'Greek', original: 'μηχανικός (mechanikos)', meaning: 'inventive, ingenious', usage: 'From μηχανή (mechane), a "device" or "contrivance"—the study of machines' },
      { term: 'Lever', language: 'Latin', original: 'levare', meaning: 'to raise, lift', usage: 'A lever "raises" heavy objects with less force' },
      { term: 'Torque', language: 'Latin', original: 'torquere', meaning: 'to twist', usage: 'Torque is the "twisting" force that causes rotation' },
      { term: 'Friction', language: 'Latin', original: 'fricare', meaning: 'to rub', usage: 'Friction comes from surfaces "rubbing" against each other' },
      { term: 'Architect', language: 'Greek', original: 'ἀρχιτέκτων (architekton)', meaning: 'master builder', usage: 'From ἀρχι (archi, "chief") + τέκτων (tekton, "builder")—Vitruvius was an architect' },
    ],
    primarySourceExcerpts: [
      {
        title: 'Give Me a Place to Stand',
        author: 'Archimedes (as quoted by Pappus)',
        source: 'Synagoge, Book VIII',
        sourceUrl: 'https://archive.org/details/worksofarchimede00telerich',
        originalText: 'Δός μοι ποῦ στῶ καὶ κινῶ τὴν γῆν',
        translatedText: `"Give me a place to stand and I will move the Earth."`,
        context: 'This famous quote illustrates Archimedes\' understanding of the lever principle. He realized that with a long enough lever arm and a firm fulcrum, any weight—even the Earth—could theoretically be moved. It captures both the power of mathematical principles and the imagination of a great scientist.',
        discussionQuestions: [
          'What does this quote reveal about the power of the lever?',
          'Is Archimedes speaking literally or using the Earth as a thought experiment?',
          'How does understanding mathematics give us power over the physical world?'
        ]
      },
      {
        title: 'On the Proportions of Architecture',
        author: 'Vitruvius',
        source: 'De Architectura, Book I, Chapter 2',
        sourceUrl: 'https://www.gutenberg.org/ebooks/20239',
        originalText: 'Architectura autem constat ex ordinatione, quae graece τάξις dicitur, et ex dispositione...',
        translatedText: `"Architecture depends on Order (τάξις in Greek), Arrangement, Proportion, Symmetry, Propriety, and Economy. Order gives due measure to the members of a work considered separately, and symmetry gives agreement to the proportions of the whole."`,
        context: 'Vitruvius (c. 80-15 BCE) was a Roman architect and engineer whose ten-volume work influenced Leonardo, Michelangelo, and all Renaissance engineering. Notice how he uses the Greek term "taxis" (τάξις), showing how Roman engineers built on Greek knowledge.',
        discussionQuestions: [
          'Why does Vitruvius include the Greek word τάξις alongside the Latin?',
          'How does "Order" in architecture relate to mathematical principles?',
          'Which of these six principles do you think is most important for engineering?'
        ]
      }
    ]
  },
  {
    id: 'eng-flying-machines',
    moduleId: 'engineering',
    title: 'Flying Machines: The Dream of Flight',
    order: 2,
    overview: "Leonardo spent decades designing flying machines, studying bird flight, and understanding aerodynamic principles centuries before powered flight.",
    content: `**The Quest for Flight**

Leonardo: "A bird is an instrument working according to mathematical law, which instrument it is within the capacity of man to reproduce."

**His Flying Machine Designs:**

**1. Ornithopter (Flapping Wings)**
• Pilot lies horizontal
• Operates wing flaps with arms and legs
• Problem: humans lack sufficient power

**2. Helical Screw (Aerial Screw)**
• Corkscrew shape rotates
• Compresses air beneath it
• Precursor to helicopter concept

**3. Glider**
• Fixed wings like modern hang glider
• More practical than flapping designs
• Used cambered (curved) wing shape

**What Leonardo Got Right:**
✓ Birds use wings to push air down → lift
✓ Wing shape matters (camber)
✓ Tail controls direction
✓ Need to study air resistance

**What He Got Wrong:**
✗ Human muscles can't power flapping flight
✗ Needed power source (engine)

**Key Insight:**
"The air next to a bird's wing is compressed...
this compression produces the force that lifts it."`,
    keyPoints: [
      "Designed ornithopters, aerial screw, and gliders",
      "Correctly understood lift from air compression",
      "Underestimated power needed for human flight",
      "Methods anticipated modern aeronautics"
    ],
    estimatedMinutes: 55,
    resources: [
      { type: 'book', title: "Leonardo's Notebooks - Flight", url: 'https://www.gutenberg.org/ebooks/5000', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: "Leonardo's Flying Machines", url: 'https://www.youtube.com/watch?v=K-rlHu7rRE0', provider: 'Science Channel', free: true },
      { type: 'article', title: 'Codex on the Flight of Birds', url: 'https://airandspace.si.edu/exhibitions/codex', provider: 'Smithsonian', free: true },
    ],
    exercises: [
      { instruction: 'Paper Airplane Lab: Build 3 paper airplanes with different wing shapes. Test flight distance and stability. Which flies best? Why?', type: 'practice' },
      { instruction: 'Bird Observation: Watch birds fly for 15 minutes. Sketch wing positions during takeoff, gliding, and landing. What patterns emerge?', type: 'practice' },
      { instruction: 'Helicopter Seed Study: Find maple seeds (helicopters). Drop from height. Time descent. Why do they spin? How does this relate to Leonardo\'s aerial screw?', type: 'practice' },
      { instruction: 'Leonardo Analysis: Why did the ornithopter fail? Calculate power needed to lift a human. Compare to human muscle output', type: 'writing' },
    ]
  },
  {
    id: 'eng-water-hydraulics',
    moduleId: 'engineering',
    title: 'Water Engineering and Hydraulics',
    order: 3,
    overview: "Leonardo was fascinated by water, designing canals, locks, dredging machines, and studying fluid dynamics with remarkable accuracy.",
    content: `**Leonardo and Water**

Leonardo: "Water is the driving force of all nature."

**His Water Studies:**

**1. Fluid Dynamics**
• Observed water flowing around obstacles
• Drew vortices and turbulence
• Noted that water moves fastest in narrow channels

**2. Canal Engineering**
• Designed canal lock systems
• Created dredging machines
• Planned to divert the Arno River

**3. Hydraulic Machines**
• Water pumps (Archimedes screw)
• Water-powered mills
• Irrigation systems

**Key Observations:**

**Continuity Principle:**
A₁v₁ = A₂v₂
Narrow channels = faster flow

**Vortex Formation:**
Water curls back on itself.
Leonardo drew these with stunning accuracy.

**His Canal Lock Design:**
• Miter gates (V-shaped, pointing upstream)
• Water pressure holds them closed
• Still used today!`,
    keyPoints: [
      "Leonardo studied fluid dynamics through observation",
      "Designed canal locks still used today",
      "Understood continuity principle (narrow = faster)",
      "Drew turbulence and vortices with great accuracy"
    ],
    estimatedMinutes: 45,
    resources: [
      { type: 'book', title: "Leonardo's Notebooks", url: 'https://www.gutenberg.org/ebooks/5000', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'On Floating Bodies - Archimedes', url: 'https://archive.org/details/worksofarchimede00telerich/page/252', provider: 'Internet Archive', free: true },
      { type: 'video', title: 'What Leonardo Teaches About Water', url: 'https://www.youtube.com/watch?v=dQc_QXAgmA4', provider: 'YouTube', free: true },
    ],
    exercises: [
      { instruction: 'Faucet Observation: Watch water flow from a faucet. Note how the stream narrows as it falls. Put finger in - observe turbulence. Sketch patterns', type: 'practice' },
      { instruction: 'Archimedes Screw: Research how an Archimedes screw works. Build one from a bottle and tube. Test lifting water', type: 'practice' },
      { instruction: 'Vortex Drawing: Create a vortex in water (stir a bowl). Observe and sketch. Compare to Leonardo\'s drawings', type: 'practice' },
      { instruction: 'Lock Design: Design a canal lock on paper. Explain how boats move between different water levels', type: 'writing' },
    ]
  },
  {
    id: 'eng-military',
    moduleId: 'engineering',
    title: 'Military Engineering',
    order: 4,
    overview: "Leonardo designed innovative weapons and fortifications. His letter to Ludovico Sforza offering military services is a masterclass in self-promotion.",
    content: `**Leonardo the Military Engineer**

In his famous letter to Ludovico Sforza (1482), Leonardo offered:
"I have plans for bridges, siege engines, cannon, armored vehicles..."

**His Military Designs:**

**1. Armored Fighting Vehicle**
• Covered in metal plates
• Cannons pointing in all directions
• Powered by men inside cranking gears
• Precursor to the tank!

**2. Giant Crossbow**
• 24 meters (78 feet) wide
• Designed for psychological impact
• May not have been practical

**3. Multi-Barrel Cannon**
• 33 barrels arranged in rows
• Rotate to fire in sequence
• Continuous fire capability

**4. Fortification Designs**
• Angled walls to deflect cannon fire
• Low, thick walls vs tall medieval towers
• Influenced modern star forts

**Ethical Considerations:**
Leonardo called war "beastly madness."
Yet continued designing for patrons.`,
    keyPoints: [
      "Designed tanks, multi-barrel guns, and giant crossbows",
      "Revolutionized fortification with angled walls",
      "Offered military services to gain patronage",
      "Was morally conflicted about weapons design"
    ],
    estimatedMinutes: 50,
    resources: [
      { type: 'book', title: "Leonardo's Notebooks", url: 'https://www.gutenberg.org/ebooks/5000', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'The Art of War - Sun Tzu', url: 'https://www.gutenberg.org/ebooks/132', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'Leonardo\'s War Machines', url: 'https://www.youtube.com/watch?v=Y0_htkvCVpE', provider: 'Simple History', free: true },
    ],
    exercises: [
      { instruction: 'Read Leonardo\'s Letter: Find the letter to Sforza online. List all 10 military capabilities Leonardo claims. Which seem realistic?', type: 'reading' },
      { instruction: 'Defense Design: Design a defensive structure for a location. Consider: threats, materials, geometry. Sketch top and side views', type: 'writing' },
      { instruction: 'Ethics Discussion: Write 1 page on whether scientists should work on weapons. Consider Leonardo\'s conflict', type: 'writing' },
    ]
  },
  {
    id: 'eng-automatons',
    moduleId: 'engineering',
    title: 'Automatons and Mechanical Marvels',
    order: 5,
    overview: "Leonardo designed robots and automatons, including a mechanical knight and a self-propelled cart—ancestors of modern robotics.",
    content: `**Leonardo's Robots**

**The Mechanical Knight (c. 1495)**

A suit of armor that could:
• Stand up
• Sit down
• Raise its arms
• Move its jaw

**How It Worked:**
• Pulleys and cables inside
• Operated by hand-cranked mechanism
• Used human anatomy as model
• First known humanoid robot design!

**The Self-Propelled Cart**

A programmable vehicle:
• Springs provided power (like clockwork)
• Cam wheels controlled steering
• Could be "programmed" for a specific route
• Ancestor of the automobile!

**Other Automatons:**
• Mechanical lion that walked and presented flowers
• Rotating stage for theatrical performances
• Water-powered clocks and fountains

**Why Automatons Matter:**
• Building machines that move teaches how movement works
• Same principles used in modern robotics:
  - Actuators (muscles/motors)
  - Linkages (bones/arms)
  - Programming (cam wheels/code)`,
    keyPoints: [
      "Designed mechanical knight—first humanoid robot",
      "Created programmable self-propelled cart",
      "Used human anatomy to understand mechanical motion",
      "Automatons were precursors to modern robotics"
    ],
    estimatedMinutes: 50,
    resources: [
      { type: 'book', title: "Leonardo's Notebooks", url: 'https://www.gutenberg.org/ebooks/5000', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'Automata - Hero of Alexandria', url: 'https://archive.org/details/heronisalexandri00hero', provider: 'Internet Archive', free: true },
      { type: 'video', title: 'Leonardo\'s Robot Knight', url: 'https://www.youtube.com/watch?v=_PUwtNxjfC0', provider: 'YouTube', free: true },
    ],
    exercises: [
      { instruction: 'Hero\'s Automata: Read about Hero\'s automatic doors and puppet theaters. How did they work? Sketch the mechanism', type: 'reading' },
      { instruction: 'Simple Automaton Design: Design a simple moving figure using cardboard, string, and a lever. What motion will it perform?', type: 'practice' },
      { instruction: 'Robot Comparison: Compare Leonardo\'s mechanical knight to a modern robot. What principles are the same? What\'s different?', type: 'writing' },
      { instruction: 'Build a Cam Mechanism: Create a simple cam from cardboard. Show how rotation creates up-down motion', type: 'practice' },
    ]
  },

  // ========== ANATOMY MODULE (LEONARDO'S ANATOMICAL STUDIES) ==========
  {
    id: 'anat-introduction',
    moduleId: 'anatomy',
    title: 'Leonardo\'s Anatomical Method',
    order: 1,
    overview: "Leonardo performed over 30 dissections to understand the human body. His anatomical drawings remain among the finest ever made.",
    content: `**Leonardo the Anatomist**

Leonardo: "The painter who has acquired knowledge of the nature of the sinews, muscles, and tendons will know exactly which sinew is the cause of each movement."

**His Method:**

**1. Dissection**
• Performed 30+ dissections
• Worked at night with corpses
• Drew immediately before decay

**2. Multi-View Drawing**
• Front, back, side views
• Cutaway views showing layers
• Cross-sections for internal structure

**3. Layer-by-Layer**
• Skin → muscles → bones → organs
• Drew each layer separately
• Then combined for understanding

**His Revolutionary Insights:**
• First accurate drawings of the spine
• Discovered how heart valves work
• Mapped blood vessels and nerves
• Showed fetus in womb

**Why Artists Study Anatomy:**
• Surface form follows inner structure
• Understanding creates convincing figures
• Muscles change shape with action`,
    keyPoints: [
      "Leonardo performed 30+ dissections for anatomical knowledge",
      "Used multi-view and layered drawing techniques",
      "Made discoveries in cardiology and neurology",
      "Anatomy knowledge essential for figure drawing"
    ],
    estimatedMinutes: 40,
    resources: [
      { type: 'book', title: "Leonardo's Notebooks", url: 'https://www.gutenberg.org/ebooks/5000', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'Gray\'s Anatomy', url: 'https://www.gutenberg.org/ebooks/1636', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'Leonardo: Anatomist', url: 'https://www.youtube.com/watch?v=J9xUL5Yi_8M', provider: 'Nature Video', free: true },
      { type: 'video', title: 'Crash Course Anatomy', url: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtOAKed_MxxWBNaPno5h3Zs8', provider: 'Crash Course', free: true },
    ],
    exercises: [
      { instruction: 'Multi-View Drawing: Draw your hand from 4 different angles. Note how the same bones and muscles look different in each view', type: 'practice' },
      { instruction: 'Layer Observation: Look at your forearm. Identify: (1) surface features, (2) visible veins, (3) feel for bones. Sketch each layer', type: 'practice' },
      { instruction: 'Leonardo Study: Find Leonardo\'s anatomical drawings online. Choose one. Write 1 page on what it teaches about the body', type: 'writing' },
    ],
    classicalConnections: [
      { term: 'Anatomy', language: 'Greek', original: 'ἀνατομή (anatome)', meaning: 'cutting up, dissection', usage: 'From ἀνά (ana, "up") + τέμνειν (temnein, "to cut")—knowledge through dissection' },
      { term: 'Dissection', language: 'Latin', original: 'dissecare', meaning: 'to cut apart', usage: 'From dis- (apart) + secare (to cut)—Leonardo performed 30+ dissections' },
      { term: 'Cadaver', language: 'Latin', original: 'cadere', meaning: 'to fall', usage: 'A body that has "fallen"—the fallen body used for study' },
      { term: 'Corpus', language: 'Latin', original: 'corpus', meaning: 'body', usage: 'The physical body—still used in "corpus callosum" and "habeas corpus"' },
    ]
  },
  {
    id: 'anat-skeleton',
    moduleId: 'anatomy',
    title: 'The Skeletal System',
    order: 2,
    overview: "The skeleton is the framework of the body. Leonardo meticulously drew every bone, understanding how they connect and move.",
    content: `**The Human Skeleton: 206 Bones**

**Major Divisions:**
• **Axial skeleton:** Skull, spine, ribs (80 bones)
• **Appendicular skeleton:** Arms, legs, pelvis, shoulders (126 bones)

**The Skull:**
• Cranium protects the brain
• Facial bones give structure
• Mandible (jaw) is only moveable skull bone

**The Spine:**
• 7 Cervical (neck)
• 12 Thoracic (ribcage)
• 5 Lumbar (lower back)
• Sacrum & Coccyx (fused)

**The Ribcage:**
• 12 pairs of ribs
• 7 "true ribs" connect to sternum
• 3 "false ribs" connect indirectly
• 2 "floating ribs" unattached in front

**Key Landmarks for Artists:**
• Clavicle (collarbone) - surface visible
• Scapula (shoulder blade) - moves with arm
• Pelvis - determines hip position

**Leonardo's Method:**
Drew bones accurately, then added muscles on top.
"The bones support the body as posts support a building."`,
    keyPoints: [
      "206 bones divided into axial and appendicular skeleton",
      "Spine has natural curves that affect posture",
      "Key surface landmarks: clavicle, scapula, pelvis",
      "Leonardo drew bones first, then layered muscles"
    ],
    estimatedMinutes: 60,
    resources: [
      { type: 'book', title: 'Gray\'s Anatomy - Osteology', url: 'https://www.gutenberg.org/ebooks/1636', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'The Skeletal System - Crash Course', url: 'https://www.youtube.com/watch?v=rDGqkMHPDqE', provider: 'Crash Course', free: true },
    ],
    exercises: [
      { instruction: 'Bone Memorization: Learn the major bones. Use the mnemonic: "Skull, spine, ribs (axial) plus arms and legs (appendicular)"', type: 'practice' },
      { instruction: 'Surface Landmarks: On yourself, find and mark: clavicle, sternum, spine, scapula, pelvis. Draw yourself with these visible', type: 'practice' },
      { instruction: 'Skeleton Sketch: Draw a full skeleton from reference. Focus on proportions and connections', type: 'practice' },
    ],
    classicalConnections: [
      { term: 'Skeleton', language: 'Greek', original: 'σκελετός (skeletos)', meaning: 'dried up, withered', usage: 'A dried-up body—bones remaining after flesh is gone' },
      { term: 'Cranium', language: 'Greek', original: 'κρανίον (kranion)', meaning: 'skull, head', usage: 'The bone structure protecting the brain' },
      { term: 'Vertebra', language: 'Latin', original: 'vertere', meaning: 'to turn', usage: 'The spine\'s bones allow us to "turn"—flexibility of the back' },
      { term: 'Clavicle', language: 'Latin', original: 'clavicula', meaning: 'little key', usage: 'Shaped like an ancient key—the collarbone' },
      { term: 'Pelvis', language: 'Latin', original: 'pelvis', meaning: 'basin, bowl', usage: 'The bowl-shaped bone structure of the hips' },
    ]
  },
  {
    id: 'anat-muscles',
    moduleId: 'anatomy',
    title: 'The Muscular System',
    order: 3,
    overview: "Muscles create movement and define the body's surface form. Leonardo drew muscles in layers, from deep to superficial.",
    content: `**Understanding Muscles**

Leonardo: "All muscles have their actions not in a straight line, but obliquely."

**How Muscles Work:**
• Muscles PULL, never push
• Work in pairs: agonist (contracts) vs antagonist (relaxes)
• Example: Bicep curls arm up, tricep extends it back

**Major Muscle Groups:**

**Upper Body:**
• Trapezius: Upper back, moves shoulders/neck
• Deltoid: Shoulder cap, raises arm
• Pectoralis major: Chest, pulls arm across body
• Biceps/Triceps: Upper arm flexion/extension

**Core:**
• Rectus abdominis: "Six-pack" muscles
• Obliques: Side twisting
• Erector spinae: Back straightening

**Lower Body:**
• Gluteus maximus: Buttocks, hip extension
• Quadriceps: Front thigh, knee extension
• Hamstrings: Back thigh, knee flexion
• Gastrocnemius: Calf, ankle flexion

**Leonardo's Observation:**
Muscles change shape dramatically when contracted.
Draw the ACTION, not just the resting shape.`,
    keyPoints: [
      "Muscles pull in pairs (agonist/antagonist)",
      "Surface form changes with muscle contraction",
      "Learn major muscle groups for figure drawing",
      "Draw muscles in action, not just at rest"
    ],
    estimatedMinutes: 60,
    resources: [
      { type: 'book', title: 'Gray\'s Anatomy - Myology', url: 'https://www.gutenberg.org/ebooks/1636', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'Muscles - Crash Course', url: 'https://www.youtube.com/watch?v=Ktv-CaOt6UQ', provider: 'Crash Course', free: true },
    ],
    exercises: [
      { instruction: 'Muscle Pairs: Flex and extend your arm. Identify bicep and tricep. Draw both states showing the shape change', type: 'practice' },
      { instruction: 'Surface Study: Look at fitness photos. Identify the major muscles visible. Label at least 10 muscles correctly', type: 'practice' },
      { instruction: 'Action Drawing: Draw an arm throwing a ball. Show which muscles are contracted (bulging) vs relaxed', type: 'practice' },
    ],
    classicalConnections: [
      { term: 'Muscle', language: 'Latin', original: 'musculus', meaning: 'little mouse', usage: 'Muscles under the skin looked like little mice running—diminutive of mus (mouse)' },
      { term: 'Biceps', language: 'Latin', original: 'bi- + caput', meaning: 'two heads', usage: 'The muscle has two attachment points (heads) at the top' },
      { term: 'Triceps', language: 'Latin', original: 'tri- + caput', meaning: 'three heads', usage: 'Three attachment points—tri (three) + ceps (head)' },
      { term: 'Deltoid', language: 'Greek', original: 'δέλτα (delta)', meaning: 'triangle', usage: 'The shoulder muscle is shaped like the Greek letter Δ (delta)' },
      { term: 'Pectoralis', language: 'Latin', original: 'pectus', meaning: 'breast, chest', usage: 'The chest muscles—pectoral fins on fish are in the same position' },
    ]
  },
  {
    id: 'anat-vitruvian',
    moduleId: 'anatomy',
    title: 'The Vitruvian Man: Perfect Proportions',
    order: 4,
    overview: "Leonardo's iconic Vitruvian Man demonstrates the mathematical harmony of the human body, combining art, anatomy, and geometry.",
    content: `**The Vitruvian Man (c. 1490)**

Based on the Roman architect Vitruvius's description of ideal human proportions.

**The Key Proportions:**

**Height = Wingspan**
Arms fully extended = height
This forms a perfect square around the body.

**Navel as Center:**
With arms and legs spread, the navel is the center of a circle.

**Specific Measurements (in head units):**
• Total height = 8 heads
• Face = 1/10 of height
• Hand = 1/10 of height
• Foot = 1/7 of height
• Cubit (elbow to fingertip) = 1/4 of height

**The Mathematical Harmony:**
Leonardo discovered the body exhibits the golden ratio (φ ≈ 1.618):
• Navel divides height at golden ratio
• Ratio of forearm to hand
• Ratio of face sections

**Why This Matters:**
• Universal proportions for figure drawing
• Reveals nature's mathematical order
• Renaissance ideal: human as microcosm of universe`,
    keyPoints: [
      "Height equals arm span (forms a square)",
      "Navel is center of a circle with limbs spread",
      "Body exhibits golden ratio proportions",
      "Use 8-head system for figure drawing"
    ],
    estimatedMinutes: 45,
    resources: [
      { type: 'book', title: 'De Architectura - Vitruvius', url: 'https://www.gutenberg.org/ebooks/20239', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'The Vitruvian Man - Great Art Explained', url: 'https://www.youtube.com/watch?v=aMsaFP3kgqQ', provider: 'YouTube', free: true },
    ],
    exercises: [
      { instruction: 'Proportion Measurement: Measure your own height and arm span. Calculate ratio. Compare to Vitruvian ideal', type: 'practice' },
      { instruction: 'Vitruvian Drawing: Draw a figure using the 8-head system. Check proportions with ruler', type: 'practice' },
      { instruction: 'Vitruvius Reading: Find Book 3, Chapter 1 of De Architectura. Read Vitruvius\'s original proportion rules. Summarize in your own words', type: 'reading' },
    ],
    classicalConnections: [
      { term: 'Proportion', language: 'Latin', original: 'proportio', meaning: 'comparative relation', usage: 'From pro- (for) + portio (share)—the correct "share" each part takes of the whole' },
      { term: 'Symmetry', language: 'Greek', original: 'συμμετρία', meaning: 'agreement in measure', usage: 'From σύν (syn, "together") + μέτρον (metron, "measure")—parts in harmony' },
      { term: 'Ratio', language: 'Latin', original: 'ratio', meaning: 'reckoning, reason', usage: 'Mathematical relationship—same root as "rational" and "reason"' },
      { term: 'Geometry', language: 'Greek', original: 'γεωμετρία', meaning: 'earth-measuring', usage: 'From γῆ (ge, "earth") + μέτρον (metron, "measure")—originally measuring land' },
    ]
  },
  {
    id: 'anat-comparative',
    moduleId: 'anatomy',
    title: 'Comparative Anatomy',
    order: 5,
    overview: "Leonardo compared human anatomy to animals, recognizing shared structures that would later inform evolutionary biology.",
    content: `**Comparative Anatomy**

Leonardo: "Man differs from animals only in what is accidental, and in this he is divine."

**Leonardo's Observations:**

**Homologous Structures:**
• Human arm = dog leg = bird wing = whale flipper
• Same bones, arranged differently
• Same blueprint, different functions

**Horse Studies:**
• Leonardo made extensive horse anatomy studies
• Compared horse legs to human arms
• Noted similar muscle arrangement

**Bear Foot Study:**
• Drew a bear's foot and compared to human
• Similar bone structure
• Bear walks on entire foot (plantigrade)
• Humans run on toes (digitigrade running)

**His Insight:**
"There is a great resemblance of bones and muscles... from man to horse."

This observation anticipated Darwin by 350 years!

**Why Comparative Anatomy Matters:**
• Reveals unity of life
• Shows how form follows function
• Helps artists draw animals accurately`,
    keyPoints: [
      "Homologous structures: same bones, different functions",
      "Leonardo compared human and animal anatomy",
      "Anticipated evolutionary insights by 350 years",
      "Comparative study improves animal drawing"
    ],
    estimatedMinutes: 50,
    resources: [
      { type: 'book', title: "Leonardo's Notebooks - Horse Studies", url: 'https://www.gutenberg.org/ebooks/5000', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'On the Origin of Species - Darwin', url: 'https://www.gutenberg.org/ebooks/1228', provider: 'Project Gutenberg', free: true },
    ],
    exercises: [
      { instruction: 'Homology Comparison: Draw a human arm, cat leg, bird wing, and whale flipper. Label the same bones in each (humerus, radius, ulna)', type: 'practice' },
      { instruction: 'Animal Observation: Observe a pet or animal closely. Identify: spine, shoulder blade, hip. Compare to human anatomy', type: 'practice' },
      { instruction: 'Darwin Connection: Read about homology in On the Origin of Species (Chapter 13). How did Darwin use comparative anatomy as evidence?', type: 'reading' },
    ]
  },

  // ========== NATURAL HISTORY MODULE (NEW) ==========
  {
    id: 'nathistory-observation',
    moduleId: 'natural-history',
    title: 'The Art of Scientific Observation',
    order: 1,
    overview: "Darwin, Aristotle, and Leonardo were all masters of observation. Learn to see the natural world with precision and document what you find systematically.",
    content: `**Observation: The Foundation of Natural Science**

Aristotle: "In all things of nature there is something of the marvelous."

**The Naturalist's Method:**

**1. Look Carefully**
• Spend 10 minutes observing before drawing conclusions
• Notice patterns, colors, behaviors, structures
• Ask: What is this? Why might it be this way?

**2. Record Everything**
• Sketch what you see (drawing focuses attention)
• Note date, time, location, weather
• Describe in detail: size, color, texture, smell

**3. Compare and Classify**
• How is this similar to other things?
• How is it different?
• What category does it belong to?

**Darwin's Practice:**
On the Beagle voyage, Darwin filled notebooks with:
• Detailed sketches of specimens
• Measurements and descriptions
• Questions and hypotheses
• Cross-references to other observations

**Start Your Nature Journal:**
Every great naturalist kept a journal. Begin yours today.`,
    keyPoints: [
      "Observation is the foundation of natural science",
      "Spend time looking before drawing conclusions",
      "Record date, location, sketches, and descriptions",
      "Compare specimens to find patterns and relationships"
    ],
    estimatedMinutes: 45,
    resources: [
      { type: 'book', title: 'The Voyage of the Beagle - Darwin', url: 'https://www.gutenberg.org/ebooks/944', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'How to Keep a Nature Journal', url: 'https://www.youtube.com/watch?v=RdLnV2RQSZ0', provider: 'John Muir Laws', free: true },
      { type: 'tool', title: 'iNaturalist', url: 'https://www.inaturalist.org/', provider: 'California Academy of Sciences', free: true },
    ],
    exercises: [
      { instruction: 'Nature Walk: Go outside for 30 minutes. Observe 5 different living things. For each, sketch it, describe it, and note where you found it', type: 'practice' },
      { instruction: 'Close Observation: Choose one plant or animal. Observe it for 15 minutes. Write 1 full page of detailed observations', type: 'writing' },
      { instruction: 'Start Your Journal: Create a nature journal. Record your first 3 entries with sketches and descriptions', type: 'practice' },
    ],
    classicalConnections: [
      { term: 'Nature', language: 'Latin', original: 'natura', meaning: 'birth, character', usage: 'From nasci (to be born)—an organism\'s nature is its inborn character' },
      { term: 'Biology', language: 'Greek', original: 'βίος + λόγος', meaning: 'life + study', usage: 'From βίος (bios, "life") + λόγος (logos, "study")—you know logos from Greek!' },
      { term: 'Organism', language: 'Greek', original: 'ὄργανον (organon)', meaning: 'tool, instrument', usage: 'A living thing with organized parts—like a complex, self-maintaining instrument' },
      { term: 'Species', language: 'Latin', original: 'species', meaning: 'appearance, kind', usage: 'From specere (to look)—organisms grouped by how they appear' },
      { term: 'Ecology', language: 'Greek', original: 'οἶκος + λόγος', meaning: 'house + study', usage: 'From οἶκος (oikos, "house/household")—study of nature\'s "household"' },
    ]
  },
  {
    id: 'nathistory-classification',
    moduleId: 'natural-history',
    title: 'Classification: Ordering the Living World',
    order: 2,
    overview: "Aristotle created the first classification system. Linnaeus perfected it. Learn the hierarchy of life and how scientists organize millions of species.",
    content: `**The Tree of Life**

**Aristotle's First System:**
• Divided animals into "blooded" (vertebrates) and "bloodless" (invertebrates)
• Further divided by habitat: land, water, air
• Grouped by method of reproduction

**Linnaeus's Hierarchy (1735):**
All living things are classified in ranks:

**Kingdom → Phylum → Class → Order → Family → Genus → Species**

Memory trick: "King Philip Came Over For Good Soup"

**Example: Human Classification**
• Kingdom: Animalia (animals)
• Phylum: Chordata (have a backbone)
• Class: Mammalia (mammals)
• Order: Primates (primates)
• Family: Hominidae (great apes)
• Genus: Homo (humans)
• Species: sapiens (wise)

**Binomial Nomenclature:**
Every species has a two-part Latin name:
• Homo sapiens (wise human)
• Canis familiaris (familiar dog)
• Quercus robur (strong oak)

**The Five Kingdoms:**
1. Animalia - Animals
2. Plantae - Plants
3. Fungi - Mushrooms, molds
4. Protista - Single-celled organisms
5. Monera - Bacteria`,
    keyPoints: [
      "Kingdom → Phylum → Class → Order → Family → Genus → Species",
      "Binomial nomenclature gives each species a unique Latin name",
      "Classification reflects evolutionary relationships",
      "Aristotle created the first systematic classification"
    ],
    estimatedMinutes: 50,
    resources: [
      { type: 'book', title: 'History of Animals - Aristotle', url: 'http://classics.mit.edu/Aristotle/history_anim.html', provider: 'MIT Classics', free: true },
      { type: 'video', title: 'Taxonomy - Crash Course Biology', url: 'https://www.youtube.com/watch?v=F38BmgPcZ_I', provider: 'Crash Course', free: true },
      { type: 'tool', title: 'Tree of Life Web Project', url: 'http://tolweb.org/', provider: 'University of Arizona', free: true },
    ],
    exercises: [
      { instruction: 'Classify 5 Animals: Look up and write the full classification (Kingdom to Species) for: dog, cat, eagle, frog, shark', type: 'practice' },
      { instruction: 'Classify 5 Plants: Look up and write the full classification for: oak tree, rose, grass, fern, moss', type: 'practice' },
      { instruction: 'Create a Dichotomous Key: Make a key to identify 8 common animals in your area (e.g., "Does it have fur? → Yes → Go to 2, No → Go to 5")', type: 'writing' },
    ]
  },
  {
    id: 'nathistory-evolution',
    moduleId: 'natural-history',
    title: 'Evolution: Darwin\'s Great Idea',
    order: 3,
    overview: "Darwin's theory of evolution by natural selection explains how all life is connected. Understand the evidence, the mechanism, and why it matters.",
    content: `**Evolution by Natural Selection**

Darwin: "There is grandeur in this view of life..."

**The Four Key Observations:**
1. **Variation** - Individuals differ from each other
2. **Inheritance** - Traits pass from parent to offspring
3. **Overproduction** - More offspring born than can survive
4. **Differential Survival** - Some traits help survival

**The Mechanism:**
• Individuals with helpful traits survive and reproduce more
• Their offspring inherit those traits
• Over generations, the population changes
• Given enough time, new species emerge

**Evidence for Evolution:**

**1. Fossil Record**
• Shows gradual changes over time
• Transitional forms (e.g., Archaeopteryx: dinosaur→bird)

**2. Comparative Anatomy**
• Homologous structures (same bones, different uses)
• Human arm = whale flipper = bat wing

**3. Embryology**
• All vertebrate embryos look similar early on
• Suggests common ancestry

**4. Biogeography**
• Similar environments have different species
• Islands have unique species from nearby mainland

**5. DNA Evidence**
• All life shares the same genetic code
• Similar species have similar DNA`,
    keyPoints: [
      "Variation + Inheritance + Overproduction + Selection = Evolution",
      "Natural selection acts on existing variation in populations",
      "Evidence: fossils, anatomy, embryology, DNA, biogeography",
      "All life shares common ancestry"
    ],
    estimatedMinutes: 60,
    resources: [
      { type: 'book', title: 'On the Origin of Species - Darwin', url: 'https://www.gutenberg.org/ebooks/1228', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'Natural Selection - Crash Course', url: 'https://www.youtube.com/watch?v=aTftyFboC_M', provider: 'Crash Course', free: true },
      { type: 'video', title: 'What is Evolution?', url: 'https://www.youtube.com/watch?v=GhHOjC4oxh8', provider: 'Stated Clearly', free: true },
    ],
    exercises: [
      { instruction: 'Natural Selection Simulation: Use 50 colored paper squares on grass. Have someone "hunt" for 30 seconds. Which colors survived? Why?', type: 'practice' },
      { instruction: 'Homology Drawing: Draw human arm, whale flipper, bat wing, dog leg side by side. Label the same bones in each', type: 'practice' },
      { instruction: 'Read Darwin: Read Chapter 4 of Origin of Species ("Natural Selection"). Summarize the main argument in your own words', type: 'reading' },
    ],
    primarySourceExcerpts: [
      {
        title: 'The Origin of Species - Opening',
        author: 'Charles Darwin',
        source: 'On the Origin of Species (1859)',
        sourceUrl: 'https://www.gutenberg.org/ebooks/1228',
        translatedText: `"When on board H.M.S. 'Beagle,' as naturalist, I was much struck with certain facts in the distribution of the inhabitants of South America, and in the geological relations of the present to the past inhabitants of that continent. These facts seemed to me to throw some light on the origin of species—that mystery of mysteries, as it has been called by one of our greatest philosophers."`,
        context: 'Darwin spent five years (1831-1836) aboard HMS Beagle, collecting specimens and making observations that would eventually lead to his theory of evolution. This opening passage reveals how his journey sparked the questions that would occupy him for the next 23 years before publishing.',
        discussionQuestions: [
          'What does Darwin mean by "the origin of species—that mystery of mysteries"?',
          'Why do you think Darwin waited 23 years after his voyage to publish his theory?',
          'How does careful observation over time lead to great scientific discoveries?'
        ]
      },
      {
        title: 'The Tree of Life',
        author: 'Charles Darwin',
        source: 'On the Origin of Species, Chapter IV (1859)',
        sourceUrl: 'https://www.gutenberg.org/ebooks/1228',
        translatedText: `"The affinities of all the beings of the same class have sometimes been represented by a great tree. I believe this simile largely speaks the truth. The green and budding twigs may represent existing species... As buds give rise by growth to fresh buds, and these, if vigorous, branch out and overtop on all sides many a feebler branch, so by generation I believe it has been with the great Tree of Life, which fills with its dead and broken branches the crust of the earth, and covers the surface with its ever branching and beautiful ramifications."`,
        context: 'Darwin\'s "Tree of Life" metaphor revolutionized how we understand the relationships between all living things. Instead of separate creations, all species are connected through common ancestry, branching like a great tree from simple origins.',
        discussionQuestions: [
          'Why is a tree such a powerful metaphor for evolution?',
          'What do the "dead and broken branches" represent?',
          'How does this view of life differ from earlier understanding of nature?'
        ]
      },
      {
        title: 'The Closing Passage',
        author: 'Charles Darwin',
        source: 'On the Origin of Species, Final Paragraph (1859)',
        sourceUrl: 'https://www.gutenberg.org/ebooks/1228',
        translatedText: `"There is grandeur in this view of life, with its several powers, having been originally breathed into a few forms or into one; and that, whilst this planet has gone cycling on according to the fixed law of gravity, from so simple a beginning endless forms most beautiful and most wonderful have been, and are being, evolved."`,
        context: 'These famous closing words show Darwin\'s sense of wonder at the natural world. Far from diminishing life\'s meaning, he saw evolution as adding "grandeur" to our understanding of nature. This passage has inspired scientists and philosophers for over 160 years.',
        discussionQuestions: [
          'What does Darwin mean by "grandeur in this view of life"?',
          'How does understanding evolution change how you see living things?',
          'Why might some people find this view inspiring, while others found it troubling?'
        ]
      }
    ]
  },
  {
    id: 'nathistory-ecosystems',
    moduleId: 'natural-history',
    title: 'Ecosystems: The Web of Life',
    order: 4,
    overview: "No organism lives alone. Understand food webs, energy flow, and the complex relationships that connect all living things in an ecosystem.",
    content: `**The Interconnected Living World**

**Key Concepts:**

**1. Food Chains and Webs**
Sun → Producers → Consumers → Decomposers

• **Producers** (plants): Make food from sunlight
• **Primary Consumers** (herbivores): Eat plants
• **Secondary Consumers** (carnivores): Eat herbivores
• **Tertiary Consumers** (apex predators): Top of chain
• **Decomposers** (fungi, bacteria): Break down dead matter

**2. Energy Flow**
• Only ~10% of energy transfers to next level
• This limits food chain length (usually 4-5 levels)
• Explains why there are fewer predators than prey

**3. Ecological Relationships**

**Symbiosis** (living together):
• **Mutualism** - Both benefit (bee & flower)
• **Parasitism** - One benefits, one harmed (tick & dog)
• **Commensalism** - One benefits, other unaffected (barnacle & whale)

**4. Keystone Species**
Some species have outsized effects:
• Sea otters control urchins → protect kelp forests
• Wolves control deer → allow forest regeneration

**5. Carrying Capacity**
Every environment can support a limited population.
Exceed it → resources deplete → population crashes.`,
    keyPoints: [
      "Energy flows: Sun → Producers → Consumers → Decomposers",
      "Only ~10% of energy transfers between trophic levels",
      "Symbiotic relationships: mutualism, parasitism, commensalism",
      "Keystone species have outsized effects on ecosystems"
    ],
    estimatedMinutes: 50,
    resources: [
      { type: 'video', title: 'Ecology - Crash Course', url: 'https://www.youtube.com/watch?v=sjE-Pkjp3u4', provider: 'Crash Course', free: true },
      { type: 'video', title: 'How Wolves Change Rivers', url: 'https://www.youtube.com/watch?v=ysa5OBhXz-Q', provider: 'Sustainable Human', free: true },
    ],
    exercises: [
      { instruction: 'Local Food Web: Create a food web for your local ecosystem. Include at least 10 organisms and show feeding relationships', type: 'practice' },
      { instruction: 'Energy Pyramid: Draw an energy pyramid. If producers have 10,000 units, how much reaches the apex predator?', type: 'practice' },
      { instruction: 'Symbiosis Hunt: Find 3 examples each of mutualism, parasitism, and commensalism in your environment or research', type: 'practice' },
    ],
    classicalConnections: [
      { term: 'Ecology', language: 'Greek', original: 'οἶκος + λόγος (oikos + logos)', meaning: 'house/home + study', usage: 'The "study of the home"—oikos is the household, so ecology studies Earth as our collective home' },
      { term: 'Symbiosis', language: 'Greek', original: 'σύν + βίος (syn + bios)', meaning: 'together + life', usage: 'Organisms "living together"—σύν means together, βίος is life' },
      { term: 'Parasite', language: 'Greek', original: 'παράσιτος (parasitos)', meaning: 'one who eats beside another', usage: 'From παρά (para, beside) + σῖτος (sitos, food)—parasites eat "beside" their host' },
      { term: 'Predator', language: 'Latin', original: 'praedator', meaning: 'plunderer', usage: 'From praeda (prey, booty)—predators "plunder" their prey' },
      { term: 'Herbivore', language: 'Latin', original: 'herba + vorare', meaning: 'plant + to devour', usage: 'Animals that "devour plants"—compare to Latin herba (herb) and vorax (greedy)' },
    ]
  },

  // ========== LITERATURE MODULE (NEW) ==========
  {
    id: 'lit-homer-iliad',
    moduleId: 'literature',
    title: 'Homer\'s Iliad: The Rage of Achilles',
    order: 1,
    overview: "The Iliad is the foundation of Western literature. This epic poem about the Trojan War explores honor, mortality, and the human cost of conflict.",
    content: `**The Iliad (c. 750 BCE)**

"Sing, O goddess, the rage of Achilles son of Peleus..."

**The Story:**
The Iliad covers just 52 days in the tenth year of the Trojan War, focusing on the conflict between Achilles and Agamemnon.

**Key Characters:**
• **Achilles** - Greatest Greek warrior, semi-divine
• **Agamemnon** - Greek king and commander
• **Hector** - Trojan prince and greatest defender
• **Priam** - Aged king of Troy
• **Paris** - Trojan prince who started the war
• **Helen** - "The face that launched a thousand ships"

**Major Themes:**

**1. Honor (Timē)**
• Achilles withdraws when his honor is insulted
• Heroes seek glory that outlasts death

**2. Mortality**
• Even Achilles must die
• Contrast between mortal struggle and divine indifference

**3. The Human Cost of War**
• Suffering on both sides
• Final scene: enemies share grief

**Famous Passages:**
• Book 1: The quarrel of Achilles and Agamemnon
• Book 6: Hector and Andromache's farewell
• Book 22: Death of Hector
• Book 24: Priam begs for his son's body`,
    keyPoints: [
      "The Iliad explores rage, honor, and mortality",
      "Covers only 52 days of the 10-year Trojan War",
      "Achilles vs. Agamemnon conflict drives the plot",
      "Ends with reconciliation between enemies (Priam and Achilles)"
    ],
    estimatedMinutes: 75,
    resources: [
      { type: 'book', title: 'The Iliad - Homer (Fagles translation)', url: 'https://www.gutenberg.org/ebooks/6130', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'The Iliad - Crash Course Literature', url: 'https://www.youtube.com/watch?v=ySvBBNx3wXE', provider: 'Crash Course', free: true },
      { type: 'video', title: 'The Iliad Summary', url: 'https://www.youtube.com/watch?v=faSrRHw6eZ8', provider: 'Course Hero', free: true },
    ],
    exercises: [
      { instruction: 'Read Book 1: Read the first book of the Iliad. What causes the conflict between Achilles and Agamemnon? Who is right?', type: 'reading' },
      { instruction: 'Character Analysis: Compare Achilles and Hector. How are they similar? Different? Who is the greater hero?', type: 'writing' },
      { instruction: 'Modern Parallels: How does the Iliad\'s portrayal of war compare to modern war stories? Write 1 page comparing to a modern film or book', type: 'writing' },
    ],
    classicalConnections: [
      { term: 'Epic', language: 'Greek', original: 'ἔπος (epos)', meaning: 'word, song, tale', usage: 'Long heroic poems like the Iliad were called "epe"—meant to be sung aloud' },
      { term: 'Muse', language: 'Greek', original: 'Μοῦσα (Mousa)', meaning: 'goddess of arts', usage: 'Homer invokes the Muse to inspire his song—root of "music" and "museum"' },
      { term: 'Hero', language: 'Greek', original: 'ἥρως (heros)', meaning: 'warrior, protector', usage: 'Originally meant demigod or exceptional warrior—Achilles is the archetype' },
      { term: 'Aristeia', language: 'Greek', original: 'ἀριστεία', meaning: 'excellence in battle', usage: 'A hero\'s finest hour in battle—from ἄριστος (aristos, "best")' },
      { term: 'Kleos', language: 'Greek', original: 'κλέος', meaning: 'glory, fame', usage: 'Achilles chooses κλέος (eternal glory) over a long, quiet life' },
    ],
    primarySourceExcerpts: [
      {
        title: 'The Wrath of Achilles',
        author: 'Homer',
        source: 'The Iliad, Book I, Opening Lines',
        sourceUrl: 'https://www.gutenberg.org/ebooks/6130',
        originalText: `Μῆνιν ἄειδε, θεά, Πηληϊάδεω Ἀχιλῆος
οὐλομένην, ἣ μυρί᾽ Ἀχαιοῖς ἄλγε᾽ ἔθηκε...`,
        translatedText: `"Sing, O goddess, the rage of Achilles son of Peleus, that destructive rage which brought countless sorrows upon the Achaeans, and sent many valiant souls of heroes down to the house of Hades, while their bodies became food for dogs and all manner of birds..."`,
        context: 'These are the most famous opening lines in Western literature. The first word—"Mēnin" (rage/wrath)—announces the poem\'s central theme. Homer calls upon the Muse (goddess of poetry) to help him tell the story, a convention that influenced all later epic poetry.',
        discussionQuestions: [
          'Why do you think Homer begins with the word "rage" rather than introducing the hero?',
          'What does it suggest that Achilles\' rage brings suffering to his own side (the Achaeans)?',
          'Why would a poet invoke a goddess to help them tell a story?'
        ]
      },
      {
        title: 'Hector\'s Farewell to Andromache',
        author: 'Homer',
        source: 'The Iliad, Book VI',
        sourceUrl: 'https://www.gutenberg.org/ebooks/6130',
        translatedText: `"Dear wife, I would not have you grieve beyond measure. No man shall send me to the house of Hades before my time. But as for fate—no mortal can escape it, neither coward nor brave man, once he is born."`,
        context: 'This tender scene between Hector and his wife Andromache is one of the most moving passages in the poem. While Achilles fights for glory, Hector fights to protect his family and city. The contrast between war\'s violence and domestic love makes this scene unforgettable.',
        discussionQuestions: [
          'How does Hector view fate differently than we might today?',
          'What makes this private moment so powerful in a poem about war?',
          'How does Homer show us Hector\'s humanity in this scene?'
        ]
      }
    ]
  },
  {
    id: 'lit-homer-odyssey',
    moduleId: 'literature',
    title: 'Homer\'s Odyssey: The Journey Home',
    order: 2,
    overview: "The Odyssey follows Odysseus's ten-year journey home from Troy. It's the archetypal adventure story and exploration of cunning vs. strength.",
    content: `**The Odyssey (c. 725 BCE)**

"Tell me, O Muse, of that ingenious hero who traveled far and wide..."

**The Structure:**
• **Books 1-4**: Telemachus searches for his father
• **Books 5-8**: Odysseus with Calypso and the Phaeacians
• **Books 9-12**: Odysseus narrates his adventures
• **Books 13-24**: Return to Ithaca and revenge

**Famous Episodes:**
• **Cyclops** - Odysseus blinds Polyphemus, escapes
• **Circe** - Witch turns men to pigs
• **Sirens** - Deadly singers, Odysseus tied to mast
• **Scylla & Charybdis** - Monster and whirlpool
• **Cattle of the Sun** - Crew's fatal disobedience
• **Suitors** - Odysseus's revenge at home

**Key Themes:**

**1. Cunning vs. Strength**
• Odysseus is "polytropos" (man of many turns)
• Wit defeats brute force

**2. Hospitality (Xenia)**
• Sacred duty to host strangers
• Suitors violate this law

**3. Home and Identity**
• Journey is both physical and spiritual
• What does it mean to return home?

**4. Loyalty**
• Penelope waits 20 years
• Faithful dog Argos dies seeing his master`,
    keyPoints: [
      "Odysseus embodies cunning (metis) over brute strength",
      "Hospitality (xenia) is a sacred law—violators are punished",
      "The journey home is physical and spiritual transformation",
      "Loyalty is tested: Penelope, Telemachus, even the dog Argos"
    ],
    estimatedMinutes: 75,
    resources: [
      { type: 'book', title: 'The Odyssey - Homer', url: 'https://www.gutenberg.org/ebooks/1727', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'The Odyssey - Crash Course Literature', url: 'https://www.youtube.com/watch?v=MS4jk5kavy4', provider: 'Crash Course', free: true },
    ],
    exercises: [
      { instruction: 'Read Book 9: Read the Cyclops episode. How does Odysseus defeat Polyphemus? What mistake does he make at the end?', type: 'reading' },
      { instruction: 'Hero Comparison: How does Odysseus differ from Achilles as a hero? Which type of heroism is more valuable? Write 1 page', type: 'writing' },
      { instruction: 'Map the Journey: Create a map of Odysseus\'s voyage, marking each major stop with a brief description', type: 'practice' },
    ],
    primarySourceExcerpts: [
      {
        title: 'The Opening Invocation',
        author: 'Homer',
        source: 'The Odyssey, Book I, Opening Lines',
        sourceUrl: 'https://www.gutenberg.org/ebooks/1727',
        originalText: `Ἄνδρα μοι ἔννεπε, μοῦσα, πολύτροπον, ὃς μάλα πολλὰ
πλάγχθη...`,
        translatedText: `"Tell me, O Muse, of that ingenious hero who traveled far and wide after he had sacked the famous town of Troy. Many cities did he visit, and many were the nations with whose manners and customs he was acquainted; moreover he suffered much by sea while trying to save his own life and bring his men safely home..."`,
        context: 'Unlike the Iliad\'s "rage," the Odyssey opens with "andra" (man)—specifically, a "polytropos" man, meaning "of many turns" or "many-minded." This word captures Odysseus\'s defining quality: his cunning intelligence and adaptability.',
        discussionQuestions: [
          'How does "polytropos" (man of many turns) differ from Achilles\' defining trait (rage)?',
          'Why might Homer emphasize Odysseus\'s suffering at the start?',
          'What does "many cities" and "many nations" suggest about the journey ahead?'
        ]
      },
      {
        title: 'Nobody\'s Trick',
        author: 'Homer',
        source: 'The Odyssey, Book IX',
        sourceUrl: 'https://www.gutenberg.org/ebooks/1727',
        translatedText: `"Cyclops," said I, "you ask my name and I will tell it you; give me, therefore, the present you promised me; my name is Nobody; my father and mother and all my friends call me Nobody."

Then he said: "I will eat Nobody last, and his companions before him."

...When the other Cyclopes heard his cry, they came running... "What ails you, Polyphemus?" they called. "Why do you wake us in the night? Is someone carrying off your sheep, or killing you by force or by craft?"

"Nobody is killing me by craft!" shouted Polyphemus.

"Then if nobody is attacking you, you must be ill..."`,
        context: 'This passage showcases Odysseus\'s defining cleverness. By calling himself "Nobody" (Outis in Greek), he ensures the other Cyclopes won\'t help Polyphemus. It\'s a wordplay that saves his life—cunning over brute strength.',
        discussionQuestions: [
          'Why is this trick so clever? What would have happened without it?',
          'What does this tell us about the Greek value of "metis" (cunning intelligence)?',
          'Can you think of other stories where the hero wins through wit rather than strength?'
        ]
      }
    ]
  },
  {
    id: 'lit-shakespeare',
    moduleId: 'literature',
    title: 'Shakespeare: The Bard of Avon',
    order: 3,
    overview: "Shakespeare's plays explore the full range of human experience. Study his language, themes, and enduring influence on literature and culture.",
    content: `**William Shakespeare (1564-1616)**

"All the world's a stage, and all the men and women merely players."

**His Works:**
• 37 plays (tragedies, comedies, histories)
• 154 sonnets
• Several longer poems

**Essential Plays:**

**Tragedies:**
• **Hamlet** - Revenge, madness, mortality
• **Macbeth** - Ambition, guilt, fate
• **Othello** - Jealousy, manipulation, race
• **King Lear** - Family, power, madness

**Comedies:**
• **A Midsummer Night's Dream** - Love, magic, transformation
• **Much Ado About Nothing** - Wit, deception, love
• **Twelfth Night** - Identity, desire, music

**Shakespeare's Language:**
• Invented 1,700+ words (lonely, assassination, bedroom)
• Iambic pentameter: da-DUM da-DUM da-DUM da-DUM da-DUM
• Blank verse for nobles, prose for commoners

**Key Techniques:**
• **Soliloquy** - Character speaks thoughts aloud
• **Dramatic Irony** - Audience knows what characters don't
• **Wordplay** - Puns, double meanings

**Why Shakespeare Matters:**
• Deepest exploration of human psychology
• Shaped the English language
• Stories retold endlessly in every medium`,
    keyPoints: [
      "Shakespeare wrote 37 plays covering tragedy, comedy, and history",
      "Invented 1,700+ English words still used today",
      "Iambic pentameter: 10 syllables, alternating stress",
      "Explores universal themes: ambition, love, jealousy, mortality"
    ],
    estimatedMinutes: 60,
    resources: [
      { type: 'book', title: 'Complete Works of Shakespeare', url: 'https://www.gutenberg.org/ebooks/100', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'Shakespeare - Crash Course Literature', url: 'https://www.youtube.com/watch?v=TN54JPYJ2Bk', provider: 'Crash Course', free: true },
      { type: 'tool', title: 'Shakespeare\'s Words', url: 'https://www.shakespeareswords.com/', provider: 'Shakespeare\'s Words', free: true },
    ],
    exercises: [
      { instruction: 'Read Hamlet Act 3 Scene 1: Read the "To be or not to be" soliloquy. Paraphrase each line in modern English', type: 'reading' },
      { instruction: 'Iambic Pentameter: Write 5 lines of your own iambic pentameter (da-DUM pattern, 10 syllables per line)', type: 'writing' },
      { instruction: 'Watch a Play: Watch a filmed Shakespeare performance (Hamlet, Macbeth, or A Midsummer Night\'s Dream). Write a 1-page reflection', type: 'practice' },
    ],
    classicalConnections: [
      { term: 'Tragedy', language: 'Greek', original: 'τραγῳδία (tragoidia)', meaning: 'goat-song', usage: 'From τράγος (tragos, "goat") + ᾠδή (oide, "song")—possibly from goat sacrifices at festivals' },
      { term: 'Comedy', language: 'Greek', original: 'κωμῳδία (komoidia)', meaning: 'revel-song', usage: 'From κῶμος (komos, "revel, procession") + ᾠδή—comedy arose from festive celebrations' },
      { term: 'Drama', language: 'Greek', original: 'δρᾶμα (drama)', meaning: 'deed, action', usage: 'From δράω (drao), "to do"—drama is action performed on stage' },
      { term: 'Scene', language: 'Greek', original: 'σκηνή (skene)', meaning: 'tent, stage building', usage: 'The skene was the backdrop building in Greek theater—now any "scene"' },
      { term: 'Protagonist', language: 'Greek', original: 'πρωταγωνιστής', meaning: 'first actor', usage: 'From πρῶτος (protos, "first") + ἀγωνιστής (agonistes, "actor, contestant")' },
    ],
    primarySourceExcerpts: [
      {
        title: 'To Be or Not To Be',
        author: 'William Shakespeare',
        source: 'Hamlet, Act III, Scene 1',
        sourceUrl: 'https://www.gutenberg.org/ebooks/100',
        translatedText: `"To be, or not to be, that is the question:
Whether 'tis nobler in the mind to suffer
The slings and arrows of outrageous fortune,
Or to take arms against a sea of troubles,
And by opposing end them? To die: to sleep;
No more; and by a sleep to say we end
The heart-ache and the thousand natural shocks
That flesh is heir to, 'tis a consummation
Devoutly to be wish'd."`,
        context: 'This is the most famous soliloquy in English literature. Hamlet contemplates suicide, weighing the pain of living against the fear of what comes after death. The speech reveals Shakespeare\'s ability to express universal human anxieties in unforgettable language.',
        discussionQuestions: [
          'What is Hamlet really asking in this speech?',
          'Why does he compare death to sleep? Is this comforting or frightening?',
          'What keeps people from taking "arms against a sea of troubles"?'
        ]
      },
      {
        title: 'Sonnet 18: Shall I Compare Thee',
        author: 'William Shakespeare',
        source: 'Sonnets',
        sourceUrl: 'https://www.gutenberg.org/ebooks/100',
        translatedText: `"Shall I compare thee to a summer's day?
Thou art more lovely and more temperate:
Rough winds do shake the darling buds of May,
And summer's lease hath all too short a date...

But thy eternal summer shall not fade
Nor lose possession of that fair thou owest;
Nor shall death brag thou wander'st in his shade,
When in eternal lines to time thou growest:
So long as men can breathe, or eyes can see,
So long lives this, and this gives life to thee."`,
        context: 'Shakespeare claims his poetry will make his beloved immortal—and he was right. This sonnet, written over 400 years ago, is still read today, proving his point that "eternal lines" can outlast death itself.',
        discussionQuestions: [
          'What advantage does the beloved have over a summer\'s day?',
          'How does Shakespeare claim to defeat death?',
          'Do you think poetry really can make someone immortal? How?'
        ]
      }
    ]
  },
  {
    id: 'lit-poetry',
    moduleId: 'literature',
    title: 'The Art of Poetry',
    order: 4,
    overview: "Learn to read and appreciate poetry. Understand meter, rhyme, imagery, and the techniques that make poems powerful and memorable.",
    content: `**Understanding Poetry**

Poetry is language at its most concentrated and musical.

**Key Elements:**

**1. Meter and Rhythm**
• **Iamb**: da-DUM (be-HOLD)
• **Trochee**: DUM-da (GAR-den)
• **Dactyl**: DUM-da-da (MER-ri-ly)
• **Anapest**: da-da-DUM (in-ter-VENE)

Common meters:
• **Iambic pentameter**: 5 iambs per line
• **Blank verse**: Unrhymed iambic pentameter
• **Free verse**: No regular meter

**2. Rhyme Schemes**
• **Couplet**: AA BB CC
• **Alternate**: ABAB CDCD
• **Enclosed**: ABBA
• **Sonnet**: ABAB CDCD EFEF GG (Shakespearean)

**3. Figurative Language**
• **Simile**: Comparison using "like" or "as"
• **Metaphor**: Direct comparison
• **Personification**: Giving human qualities to non-human
• **Imagery**: Vivid sensory description

**Essential Poets:**
• Homer, Sappho (Ancient Greek)
• Virgil, Ovid (Latin)
• Dante (Italian)
• Shakespeare, Milton, Keats, Dickinson, Frost`,
    keyPoints: [
      "Meter creates rhythm through stressed/unstressed syllables",
      "Rhyme schemes organize the sound patterns of poems",
      "Figurative language creates meaning beyond literal words",
      "Poetry compresses meaning into memorable, musical language"
    ],
    estimatedMinutes: 55,
    resources: [
      { type: 'book', title: 'Paradise Lost - Milton', url: 'https://www.gutenberg.org/ebooks/26', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'Poems of Emily Dickinson', url: 'https://www.gutenberg.org/ebooks/12242', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'How to Read a Poem', url: 'https://www.youtube.com/watch?v=HbbJhfByxmI', provider: 'Khan Academy', free: true },
    ],
    exercises: [
      { instruction: 'Scansion Practice: Mark the stressed and unstressed syllables in 5 lines of Shakespeare\'s sonnets', type: 'practice' },
      { instruction: 'Write a Sonnet: Compose a 14-line Shakespearean sonnet (ABAB CDCD EFEF GG) on any topic', type: 'writing' },
      { instruction: 'Memorize a Poem: Choose a poem of at least 14 lines. Memorize it completely. Recite it to someone', type: 'practice' },
    ]
  },
  {
    id: 'lit-great-books',
    moduleId: 'literature',
    title: 'The Great Books Tradition',
    order: 5,
    overview: "Explore the essential works that shaped Western civilization. From Plato to Tolstoy, these books have endured because they address eternal questions.",
    content: `**The Great Books Canon**

**Ancient World:**
• **Plato** - The Republic (justice, ideal society)
• **Aristotle** - Nicomachean Ethics (virtue, happiness)
• **Virgil** - The Aeneid (Rome's founding myth)
• **Marcus Aurelius** - Meditations (Stoic philosophy)

**Medieval:**
• **Augustine** - Confessions (spiritual autobiography)
• **Dante** - Divine Comedy (journey through afterlife)
• **Chaucer** - Canterbury Tales (medieval society)

**Renaissance & Early Modern:**
• **Machiavelli** - The Prince (power and politics)
• **Montaigne** - Essays (self-examination)
• **Cervantes** - Don Quixote (first modern novel)
• **Milton** - Paradise Lost (fall of humanity)

**Enlightenment & Modern:**
• **Goethe** - Faust (ambition, knowledge, redemption)
• **Austen** - Pride and Prejudice (society, love)
• **Dostoevsky** - Brothers Karamazov (faith, doubt)
• **Tolstoy** - War and Peace (history, free will)

**How to Read Great Books:**
1. Read with pen in hand - annotate!
2. Ask: What questions is the author addressing?
3. How does this connect to other great books?
4. What does this teach me about life?`,
    keyPoints: [
      "Great Books address eternal human questions",
      "Read actively with annotations and questions",
      "Connect books to each other—they're in dialogue",
      "Apply lessons to your own life and thinking"
    ],
    estimatedMinutes: 60,
    resources: [
      { type: 'book', title: 'The Republic - Plato', url: 'https://www.gutenberg.org/ebooks/1497', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'Meditations - Marcus Aurelius', url: 'https://www.gutenberg.org/ebooks/2680', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'Divine Comedy - Dante', url: 'https://www.gutenberg.org/ebooks/8800', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'How to Read a Book', url: 'https://www.youtube.com/watch?v=jU5NkT4zcFI', provider: 'Sprouts', free: true },
    ],
    exercises: [
      { instruction: 'Read Plato: Read Book 7 of The Republic (Allegory of the Cave). Summarize the allegory and its meaning', type: 'reading' },
      { instruction: 'Create a Reading List: Choose 10 Great Books you want to read. Order them by difficulty. Set a timeline', type: 'writing' },
      { instruction: 'Book Connection: After reading two Great Books, write 1 page on how they connect or disagree with each other', type: 'writing' },
    ]
  },
  {
    id: 'lit-robinson-crusoe',
    moduleId: 'literature',
    title: 'Robinson Crusoe: Survival and Self-Reliance',
    order: 6,
    overview: "Daniel Defoe's 1719 novel is often called the first English novel. Mill read it as a child—it's an accessible entry point that teaches resourcefulness and perseverance.",
    content: `**Robinson Crusoe (1719)**

Mill mentions reading Robinson Crusoe among the books he enjoyed as a child. This adventure story remains one of the most influential novels ever written.

**The Story:**
Robinson Crusoe is shipwrecked on a deserted island. For 28 years, he must survive alone—building shelter, growing food, and maintaining his humanity in isolation.

**Study Method (Reading with Favorites):**
Mill re-read Pope's Homer 20-30 times. For books you love:
1. Read for pleasure the first time
2. Re-read to notice details you missed
3. Each re-reading deepens understanding
4. Favorite passages become internalized

**Why Robinson Crusoe Matters:**

**1. The Birth of the Novel**
• One of the first realistic fiction narratives
• Written as though true (journal format)
• Psychological depth—we see inside Crusoe's mind

**2. Themes That Endure:**
• **Self-Reliance**: Crusoe must learn everything himself
• **Industry**: Hard work creates civilization from nothing
• **Providence**: Crusoe sees God's hand in events
• **Colonialism**: Friday's subjugation raises questions

**3. Practical Knowledge**
The novel teaches survival skills, agriculture, and craftsmanship.

**Famous Scenes:**
• The footprint in the sand
• Crusoe building his first shelter
• Meeting Friday
• The return to civilization`,
    keyPoints: [
      "One of the first English novels (1719)",
      "Teaches self-reliance, industry, and perseverance",
      "Re-read favorites to deepen understanding (Mill's method)",
      "Accessible entry point before more difficult literature"
    ],
    estimatedMinutes: 60,
    resources: [
      { type: 'book', title: 'Robinson Crusoe - Daniel Defoe', url: 'https://www.gutenberg.org/ebooks/521', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'Robinson Crusoe (Penguin Classics)', url: 'https://www.amazon.com/Robinson-Crusoe-Penguin-Classics/dp/0141439823', provider: 'Amazon', free: false },
      { type: 'video', title: 'Robinson Crusoe - Summary & Analysis', url: 'https://www.youtube.com/watch?v=zVCWgE8V2E0', provider: 'Course Hero', free: true },
      { type: 'video', title: 'Why Robinson Crusoe Matters', url: 'https://www.youtube.com/watch?v=dQPEO42qDq4', provider: 'Literature Devil', free: true },
    ],
    exercises: [
      { instruction: 'Read Part 1: Read the first 50 pages of Robinson Crusoe. Note how Defoe creates realism through detail', type: 'reading' },
      { instruction: 'Journal Entry: Write a journal entry as Crusoe on Day 1, Day 30, and Day 365 on the island. How does his mindset change?', type: 'writing' },
      { instruction: 'Survival List: If you were shipwrecked, list 10 things you would need to survive. How would you obtain each?', type: 'practice' },
      { instruction: 'Discussion: Is Crusoe a hero? Discuss his treatment of Friday and the moral complexity of colonialism', type: 'writing' },
    ],
    primarySourceExcerpts: [
      {
        title: 'The Footprint in the Sand',
        author: 'Daniel Defoe',
        source: 'Robinson Crusoe, Chapter 11',
        sourceUrl: 'https://www.gutenberg.org/ebooks/521',
        translatedText: `"It happened one day, about noon, going towards my boat, I was exceedingly surprised with the print of a man's naked foot on the shore, which was very plain to be seen on the sand. I stood like one thunderstruck, or as if I had seen an apparition.

I listened, I looked round me, but I could hear nothing, nor see anything. I went up to a rising ground to look farther; I went up the shore and down the shore, but it was all one; I could see no other impression but that one.

I went to it again to see if there were any more, and to observe if it might not be my fancy; but there was no room for that, for there was exactly the print of a foot—toes, heel, and every part of a foot."`,
        context: 'This is one of the most famous scenes in English literature. After years alone, Crusoe discovers evidence of another person. The passage brilliantly captures his psychological state—the terror of the unknown after complete solitude. It shows how the novel explores isolation\'s effects on the human mind.',
        discussionQuestions: [
          'Why is Crusoe terrified rather than relieved to find evidence of another person?',
          'What does this scene reveal about the effects of long isolation?',
          'How does Defoe create suspense through the narrator\'s thoughts and actions?'
        ]
      },
      {
        title: 'Crusoe Learns from Experience',
        author: 'Daniel Defoe',
        source: 'Robinson Crusoe',
        sourceUrl: 'https://www.gutenberg.org/ebooks/521',
        translatedText: `"By making this experiment, I learned that the rainy season and the dry season are not to be depended upon... By this experience I was made careful ever after to be furnished with provisions beforehand, that I might not be a slave to the weather.

This was the first year I was here, and in which I had a very difficult time. But I learned, and the second year I did better, and every year after that still better."`,
        context: 'Crusoe\'s survival depends on learning from experience—exactly Mill\'s approach to education. Notice how trial and error, reflection, and systematic improvement mirror scientific method. The novel champions practical learning over theoretical knowledge.',
        discussionQuestions: [
          'How does Crusoe apply the scientific method to survival?',
          'What does "I learned, and the second year I did better" teach about improvement?',
          'How is Crusoe\'s practical learning similar to how Mill was educated?'
        ]
      }
    ]
  },
  {
    id: 'lit-don-quixote',
    moduleId: 'literature',
    title: 'Don Quixote: The First Modern Novel',
    order: 7,
    overview: "Cervantes' masterpiece (1605/1615) invented the novel as we know it. Its exploration of reality, imagination, and idealism remains profoundly relevant.",
    content: `**Don Quixote (1605/1615)**

Miguel de Cervantes created what many consider the first modern novel. The story of a man who reads too many chivalric romances and goes mad—believing himself a knight—is both hilarious and deeply moving.

**Study Method (Critical Reading):**
Mill's father warned him about author biases before reading:
1. What is the author's perspective? What might they get wrong?
2. Read "against" the author when needed
3. Ask: Where might this argument fail?
4. Identify logical flaws and evaluate evidence

Apply this to Quixote: Is he mad, or does he see truths others miss?

**The Story:**
• Alonso Quixano reads too many chivalric romances
• He believes himself to be the knight "Don Quixote"
• He recruits Sancho Panza as his squire
• They have absurd adventures (windmills = giants)
• But through madness, they find genuine nobility

**Why It's Revolutionary:**

**1. Self-Consciousness**
The novel is aware it's a novel. In Part 2, characters have read Part 1!

**2. Ambiguity**
Is Quixote mad or wise? Is idealism foolish or noble?

**3. Compassion**
We laugh at Quixote, then come to love him.

**Famous Scenes:**
• Tilting at windmills
• Attacking the puppet show
• The Cave of Montesinos
• Quixote's death and final clarity`,
    keyPoints: [
      "Widely considered the first modern novel",
      "Explores the tension between reality and imagination",
      "Practice 'Critical Reading': read against the author's perspective",
      "Quixote embodies the question: Is idealism madness or wisdom?"
    ],
    estimatedMinutes: 75,
    resources: [
      { type: 'book', title: 'Don Quixote - Cervantes', url: 'https://www.gutenberg.org/ebooks/996', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'Don Quixote (Edith Grossman translation)', url: 'https://www.amazon.com/Quixote-Penguin-Classics-Deluxe/dp/0142437239', provider: 'Penguin Deluxe', free: false },
      { type: 'video', title: 'Don Quixote - Crash Course Literature', url: 'https://www.youtube.com/watch?v=9w6IKNR7xyM', provider: 'Crash Course', free: true },
      { type: 'video', title: 'The Ingenious Gentleman Don Quixote', url: 'https://www.youtube.com/watch?v=G9SZ1_LBH_c', provider: 'TED-Ed', free: true },
    ],
    exercises: [
      { instruction: 'Read Chapters 1-8: Cover the windmill scene. What makes Quixote\'s madness both funny and sympathetic?', type: 'reading' },
      { instruction: 'Critical Reading: Write 1 page arguing that Quixote is truly mad. Then write 1 page arguing he sees truths others miss', type: 'writing' },
      { instruction: 'Character Study: Compare Don Quixote and Sancho Panza. How do they change each other over the novel?', type: 'writing' },
      { instruction: 'Modern Quixote: Who is a "Don Quixote" in modern life—someone with idealistic visions others mock? Write 1 page', type: 'writing' },
    ],
    classicalConnections: [
      { term: 'Quixotic', language: 'Latin', original: 'via Spanish quijotesco', meaning: 'exceedingly idealistic, impractical', usage: 'From Don Quixote—his name became an adjective for foolish idealism' },
      { term: 'Romance', language: 'Latin', original: 'romanice', meaning: 'in the Roman manner (vernacular)', usage: 'Originally meant stories written in local languages, not Latin—ironic given Quixote\'s love of chivalric romances' },
      { term: 'Novel', language: 'Latin', original: 'novus', meaning: 'new', usage: 'Novels were literally "new" stories, distinguished from ancient epics' },
      { term: 'Chivalry', language: 'Latin', original: 'caballarius (horseman)', meaning: 'knightly code of conduct', usage: 'Quixote obsesses over chivalric romances, stories of knightly honor' },
    ],
    primarySourceExcerpts: [
      {
        title: 'Tilting at Windmills',
        author: 'Miguel de Cervantes',
        source: 'Don Quixote, Part I, Chapter VIII',
        sourceUrl: 'https://www.gutenberg.org/ebooks/996',
        translatedText: `"Look there, friend Sancho Panza, where thirty or more monstrous giants rise up, all of whom I mean to engage in battle and slay, and with whose spoils we shall begin to make our fortunes."

"What giants?" asked Sancho Panza.

"Those you see there," answered his master, "with the long arms, and some have them nearly two leagues long."

"Look, your worship," said Sancho, "what we see there are not giants but windmills, and what seem to be their arms are the sails that, turned by the wind, make the millstone go."

"It is easy to see," replied Don Quixote, "that you are not used to this business of adventures. Those are giants; and if you are afraid, away with you and betake yourself to prayer, while I engage them in fierce and unequal combat."

So saying, he spurred his steed Rocinante and charged at full gallop...`,
        context: 'This is the most famous scene in the novel and has given English the phrase "tilting at windmills," meaning to fight imaginary enemies or pursue hopeless causes. But is Quixote simply mad, or does his willingness to fight "giants" reveal something noble about the human spirit?',
        discussionQuestions: [
          'Is Don Quixote brave or foolish for charging the windmills?',
          'What does "tilting at windmills" mean in modern usage?',
          'Sancho sees reality, Quixote sees adventure. Whose view of life is better?'
        ]
      },
      {
        title: 'The Death of Don Quixote',
        author: 'Miguel de Cervantes',
        source: 'Don Quixote, Part II, Chapter LXXIV',
        sourceUrl: 'https://www.gutenberg.org/ebooks/996',
        translatedText: `"My reason is now free and clear, rid of the dark shadows of ignorance that my unhappy constant study of those detestable books of chivalry cast over it. Now I know their absurdities and deceits, and the only sorrow is that this discovery has come too late to allow me to make amends...

I was mad, now I am sane; I was Don Quixote of La Mancha, I am now Alonso Quixano the Good."

Sancho Panza wept and said: "Don't die, master! Take my advice and live many years; because the greatest madness a man can commit in this life is to let himself die without good reason."`,
        context: 'In his final moments, Quixote recovers his sanity—but is this victory or loss? Sancho, who spent the novel trying to make Quixote see reality, now begs him to remain the dreaming knight. This reversal shows how the novel has complicated our view: perhaps Quixote\'s "madness" contained wisdom.',
        discussionQuestions: [
          'Why does Sancho want Quixote to remain "mad"?',
          'Is Quixote\'s recovery of sanity a happy or sad ending?',
          'What does this scene say about the value of dreams and ideals?'
        ]
      }
    ]
  },

  // ========== HISTORY MODULE (NEW) ==========
  {
    id: 'hist-ancient-greece',
    moduleId: 'history',
    title: 'Ancient Greece: Birth of Democracy',
    order: 1,
    overview: "The Greeks invented democracy, philosophy, and science. Understand the city-states, wars, and ideas that shaped Western civilization.",
    content: `**Ancient Greece (c. 800-323 BCE)**

**The City-States (Poleis):**

**Athens:**
• Birthplace of democracy
• Great thinkers: Socrates, Plato, Aristotle
• Naval power, trade, culture

**Sparta:**
• Military state, all men soldiers
• Two kings, council of elders
• Women had more rights than elsewhere

**Key Events:**

**1. Persian Wars (499-449 BCE)**
• Marathon (490 BCE): Athenians defeat Persian invasion
• Thermopylae (480 BCE): 300 Spartans' famous stand
• Salamis (480 BCE): Greek naval victory

**2. Golden Age of Athens (461-429 BCE)**
• Pericles leads Athens
• Parthenon built
• Drama, philosophy flourish

**3. Peloponnesian War (431-404 BCE)**
• Athens vs. Sparta
• Athens defeated, never fully recovers
• Thucydides writes its history

**4. Alexander the Great (336-323 BCE)**
• Conquers Persian Empire
• Spreads Greek culture to Egypt, Persia, India
• Dies at 32, empire fragments

**Greek Legacy:**
Democracy, philosophy, theater, Olympics, science, architecture`,
    keyPoints: [
      "Athens: democracy, philosophy, culture",
      "Sparta: military discipline, oligarchy",
      "Persian Wars unified Greeks against common enemy",
      "Alexander spread Greek culture across the ancient world"
    ],
    estimatedMinutes: 60,
    resources: [
      { type: 'book', title: 'The History - Herodotus', url: 'https://www.gutenberg.org/ebooks/2707', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'History of the Peloponnesian War - Thucydides', url: 'https://www.gutenberg.org/ebooks/7142', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'Ancient Greece - Crash Course', url: 'https://www.youtube.com/watch?v=Q-mkVSasZIM', provider: 'Crash Course', free: true },
    ],
    exercises: [
      { instruction: 'Map Exercise: Draw a map of ancient Greece showing Athens, Sparta, Corinth, Thebes, and Delphi', type: 'practice' },
      { instruction: 'Compare: Write 1 page comparing Athenian democracy to Spartan society. Which would you prefer to live in?', type: 'writing' },
      { instruction: 'Read Thucydides: Read Pericles\' Funeral Oration (Book 2). What values does he praise? How does this compare to modern democracies?', type: 'reading' },
    ],
    classicalConnections: [
      { term: 'Democracy', language: 'Greek', original: 'δημοκρατία (demokratia)', meaning: 'rule of the people', usage: 'From δῆμος (demos, "people") + κράτος (kratos, "power")—the people hold power' },
      { term: 'Politics', language: 'Greek', original: 'πολιτικά (politika)', meaning: 'affairs of the city', usage: 'From πόλις (polis, "city-state")—politics concerns how we govern our communities' },
      { term: 'Oligarchy', language: 'Greek', original: 'ὀλιγαρχία (oligarchia)', meaning: 'rule by the few', usage: 'From ὀλίγος (oligos, "few") + ἀρχή (arche, "rule")—Sparta\'s system' },
      { term: 'Tyrant', language: 'Greek', original: 'τύραννος (tyrannos)', meaning: 'absolute ruler', usage: 'Originally neutral—just meant sole ruler. Later became pejorative' },
      { term: 'History', language: 'Greek', original: 'ἱστορία (historia)', meaning: 'inquiry, investigation', usage: 'From ἱστορεῖν (historein), "to inquire"—Herodotus "investigated" the Persian Wars' },
    ]
  },
  {
    id: 'hist-roman-empire',
    moduleId: 'history',
    title: 'Rome: Republic to Empire',
    order: 2,
    overview: "From a small city-state to the greatest empire of antiquity. Understand Rome's transformation from republic to empire and its lasting influence.",
    content: `**Rome (753 BCE - 476 CE)**

**Three Periods:**

**1. Kingdom (753-509 BCE)**
• Founded by Romulus (legend)
• Seven kings, last was tyrant
• Overthrown → Republic

**2. Republic (509-27 BCE)**
• Senate and elected magistrates
• Expansion across Mediterranean
• Civil wars destroy the system

**Key Republic Events:**
• Punic Wars vs. Carthage (264-146 BCE)
• Hannibal crosses the Alps
• Destruction of Carthage
• Julius Caesar crosses the Rubicon (49 BCE)
• Caesar assassinated (44 BCE)

**3. Empire (27 BCE - 476 CE)**
• Augustus becomes first emperor
• Pax Romana: 200 years of peace
• Christianity spreads
• Decline and fall to barbarians

**Roman Legacy:**
• Latin → French, Spanish, Italian, Portuguese, Romanian
• Law: innocent until proven guilty, legal codes
• Architecture: arches, domes, concrete
• Roads, aqueducts, engineering
• Calendar (Julian → Gregorian)`,
    keyPoints: [
      "Republic: elected officials, Senate, checks on power",
      "Empire: one-man rule, but initially peaceful and prosperous",
      "Rome's fall took centuries, not a single event",
      "Latin language and Roman law shaped all of Europe"
    ],
    estimatedMinutes: 60,
    resources: [
      { type: 'book', title: 'The Decline and Fall of the Roman Empire - Gibbon', url: 'https://www.gutenberg.org/ebooks/25717', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'Roman Empire - Crash Course', url: 'https://www.youtube.com/watch?v=oPf27gAup9U', provider: 'Crash Course', free: true },
    ],
    exercises: [
      { instruction: 'Timeline: Create a timeline of Roman history from founding (753 BCE) to fall (476 CE) with at least 15 major events', type: 'practice' },
      { instruction: 'Essay: Why did the Roman Republic fail? What lessons does this hold for modern democracies? (2 pages)', type: 'writing' },
      { instruction: 'Roman Influence: List 10 things in your daily life that come from Rome (language, law, architecture, etc.)', type: 'practice' },
    ],
    classicalConnections: [
      { term: 'Republic', language: 'Latin', original: 'res publica', meaning: 'public thing/affair', usage: 'From res (thing, affair) + publica (public)—government as a public concern, not private property' },
      { term: 'Senate', language: 'Latin', original: 'senatus', meaning: 'council of elders', usage: 'From senex (old man)—the wisdom of elders guiding the state' },
      { term: 'Emperor', language: 'Latin', original: 'imperator', meaning: 'commander', usage: 'From imperare (to command)—military title that became political' },
      { term: 'Province', language: 'Latin', original: 'provincia', meaning: 'conquered territory', usage: 'Roman administrative division—still used for Canadian and other provinces' },
      { term: 'Civilization', language: 'Latin', original: 'civilis', meaning: 'relating to citizens', usage: 'From civis (citizen)—being civilized meant living in cities with laws' },
    ]
  },
  {
    id: 'hist-middle-ages',
    moduleId: 'history',
    title: 'The Middle Ages: Faith and Feudalism',
    order: 3,
    overview: "A thousand years between Rome's fall and the Renaissance. Understand feudalism, the Church's power, and the foundations of modern Europe.",
    content: `**The Middle Ages (476-1453)**

**Early Middle Ages (476-1000):**
• "Dark Ages" - but not really dark
• Barbarian kingdoms replace Rome
• Church preserves learning
• Charlemagne's empire (800 CE)
• Viking, Magyar, Muslim invasions

**Feudal System:**
King → Lords → Knights → Peasants

• Land in exchange for military service
• Manors: self-sufficient estates
• Serfs: bound to the land

**High Middle Ages (1000-1300):**
• Population growth, new technology
• Crusades (1095-1291)
• Universities founded (Paris, Oxford, Bologna)
• Gothic cathedrals built
• Magna Carta (1215)

**Late Middle Ages (1300-1453):**
• Black Death kills 1/3 of Europe
• Hundred Years' War
• Peasant revolts
• Church schism and reform movements
• Fall of Constantinople (1453)

**Medieval Legacy:**
• Universities and scholarship
• Parliamentary traditions
• Gothic architecture
• Foundation of nation-states`,
    keyPoints: [
      "Feudalism: hierarchy of lords, vassals, and serfs",
      "The Church was the unifying force across Europe",
      "Crusades, universities, and cathedrals defined the High Middle Ages",
      "Black Death and wars transformed the Late Middle Ages"
    ],
    estimatedMinutes: 55,
    resources: [
      { type: 'video', title: 'Medieval Europe - Crash Course', url: 'https://www.youtube.com/watch?v=J4x2RZpnpDE', provider: 'Crash Course', free: true },
      { type: 'video', title: 'Feudalism - Extra History', url: 'https://www.youtube.com/watch?v=6zr_aDM1Lhk', provider: 'Extra Credits', free: true },
    ],
    exercises: [
      { instruction: 'Feudal Diagram: Draw a pyramid showing the feudal hierarchy with duties each level owes to others', type: 'practice' },
      { instruction: 'Cathedral Study: Research one Gothic cathedral (Notre-Dame, Chartres, etc.). What do its features symbolize?', type: 'practice' },
      { instruction: 'Black Death Impact: How did the Black Death change European society? (labor, religion, social structure)', type: 'writing' },
    ],
    classicalConnections: [
      { term: 'Feudal', language: 'Latin', original: 'feudum', meaning: 'fief, estate', usage: 'Land granted in exchange for loyalty and military service' },
      { term: 'Medieval', language: 'Latin', original: 'medium aevum', meaning: 'middle age', usage: 'The "middle" period between ancient Rome and the Renaissance' },
      { term: 'Cathedral', language: 'Greek', original: 'καθέδρα (kathedra)', meaning: 'seat, chair', usage: 'The bishop\'s seat—a cathedral is the bishop\'s church' },
      { term: 'Crusade', language: 'Latin', original: 'crux', meaning: 'cross', usage: 'Those who "took the cross"—wore crosses on their garments' },
      { term: 'University', language: 'Latin', original: 'universitas', meaning: 'whole, community', usage: 'A community of scholars and students—the first ones founded c. 1100' },
    ]
  },
  {
    id: 'hist-renaissance',
    moduleId: 'history',
    title: 'The Renaissance: Rebirth of Learning',
    order: 4,
    overview: "The rediscovery of classical learning sparked a revolution in art, science, and thought. Understand how the Renaissance created the modern world.",
    content: `**The Renaissance (c. 1350-1600)**

"Renaissance" = Rebirth (of classical learning)

**Why Italy First:**
• Wealthy city-states (Florence, Venice, Milan)
• Trade brought Greek manuscripts from Byzantium
• Patronage: Medici, popes, princes

**Key Ideas:**

**1. Humanism**
• Focus on human potential and achievement
• Study of Greek and Latin classics
• Education: grammar, rhetoric, history, poetry, moral philosophy

**2. Individualism**
• Celebration of individual genius
• Self-expression in art and writing
• Autobiographies, portraits

**3. Secularism**
• More focus on this world, not just afterlife
• But still deeply Christian

**Renaissance Giants:**
• **Leonardo da Vinci** - Painter, inventor, anatomist
• **Michelangelo** - Sculptor, painter, architect
• **Raphael** - Painter of ideal beauty
• **Machiavelli** - Political philosopher
• **Erasmus** - Christian humanist scholar

**Scientific Revolution Begins:**
• Copernicus: Sun-centered universe
• Galileo: Telescope, physics
• Printing press (1450): Knowledge spreads`,
    keyPoints: [
      "Humanism: study of classical texts, focus on human potential",
      "Patronage by wealthy families and Church funded the arts",
      "Printing press revolutionized spread of knowledge",
      "Renaissance laid groundwork for Scientific Revolution"
    ],
    estimatedMinutes: 55,
    resources: [
      { type: 'book', title: 'Lives of the Artists - Vasari', url: 'https://archive.org/details/livesofmostexcel01vasa', provider: 'Internet Archive', free: true },
      { type: 'video', title: 'Renaissance - Crash Course', url: 'https://www.youtube.com/watch?v=Vufba_ZDwxM', provider: 'Crash Course', free: true },
    ],
    exercises: [
      { instruction: 'Art Analysis: Choose one Renaissance painting. Describe its use of perspective, light, and human form', type: 'practice' },
      { instruction: 'Genius Biography: Research one Renaissance figure deeply. Write a 2-page biography focusing on their achievements', type: 'writing' },
      { instruction: 'Printing Press Impact: How did the printing press change society? List 5 major effects', type: 'writing' },
    ],
    classicalConnections: [
      { term: 'Renaissance', language: 'Latin', original: 're- + nasci', meaning: 'to be born again', usage: 'The "rebirth" of classical learning—Greek and Roman texts rediscovered' },
      { term: 'Humanism', language: 'Latin', original: 'humanitas', meaning: 'human nature, culture', usage: 'Cicero\'s term for the education that makes us fully human' },
      { term: 'Perspective', language: 'Latin', original: 'perspicere', meaning: 'to look through', usage: 'The technique of showing depth—looking "through" the canvas to a vanishing point' },
      { term: 'Patron', language: 'Latin', original: 'patronus', meaning: 'protector, defender', usage: 'From pater (father)—Medici "protected" artists like a father' },
    ]
  },
  {
    id: 'hist-world-geography',
    moduleId: 'history',
    title: 'World Geography: Understanding Our Planet',
    order: 5,
    overview: "Geography shapes history. Understand continents, climates, resources, and how physical features influence the rise and fall of civilizations.",
    content: `**Geography and History**

"Geography is destiny." - Napoleon

**Physical Geography:**

**Continents (7):**
Africa, Antarctica, Asia, Australia, Europe, North America, South America

**Major Geographic Features:**
• Mountain ranges: Himalayas, Alps, Andes, Rockies
• Rivers: Nile, Amazon, Yangtze, Mississippi, Ganges
• Deserts: Sahara, Arabian, Gobi
• Plains: Great Plains, Eurasian Steppe

**How Geography Shapes History:**

**1. Rivers and Civilization**
• Nile → Egypt
• Tigris/Euphrates → Mesopotamia
• Indus → India
• Yellow River → China

**2. Mountains as Barriers**
• Alps protected Italy
• Himalayas isolated India/China
• Andes divided South America

**3. Climate and Agriculture**
• Temperate zones: grain, livestock
• Mediterranean: olives, grapes, wheat
• Tropics: rice, spices, tropical fruits

**4. Resources and Power**
• Coal/iron → Industrial Revolution
• Oil → Modern geopolitics
• Precious metals → Exploration

**Map Skills:**
• Read latitude/longitude
• Understand scale and projection
• Identify political vs. physical features`,
    keyPoints: [
      "Rivers enabled the first civilizations",
      "Mountains and deserts create natural barriers",
      "Climate determines what food can be grown",
      "Natural resources shape economic and political power"
    ],
    estimatedMinutes: 50,
    resources: [
      { type: 'video', title: 'Geography Now', url: 'https://www.youtube.com/c/GeographyNow', provider: 'YouTube', free: true },
      { type: 'tool', title: 'Geacron World History Atlas', url: 'http://geacron.com/', provider: 'Geacron', free: true },
      { type: 'video', title: 'Why Geography Matters', url: 'https://www.youtube.com/watch?v=RMYeuqM21I4', provider: 'RealLifeLore', free: true },
    ],
    exercises: [
      { instruction: 'Map Quiz: On a blank world map, label all continents, major oceans, and 10 major rivers', type: 'practice' },
      { instruction: 'Geographic Determinism: Choose a civilization (Egypt, Rome, China, etc.). How did geography shape its development? (1 page)', type: 'writing' },
      { instruction: 'Modern Geopolitics: How does geography affect one current conflict or issue? (e.g., oil, water, trade routes)', type: 'writing' },
    ],
    classicalConnections: [
      { term: 'Geography', language: 'Greek', original: 'γεωγραφία (geographia)', meaning: 'earth-writing', usage: 'From γῆ (ge, "earth") + γράφειν (graphein, "to write")—describing/mapping the earth' },
      { term: 'Climate', language: 'Greek', original: 'κλίμα (klima)', meaning: 'inclination, slope', usage: 'The angle of the sun\'s rays—Greeks noticed climate changed with latitude' },
      { term: 'Continent', language: 'Latin', original: 'continere', meaning: 'to hold together', usage: 'Land that "holds together"—continuous landmass' },
      { term: 'Ocean', language: 'Greek', original: 'Ὠκεανός (Okeanos)', meaning: 'great river', usage: 'The Titan who personified the world-encircling river in Greek mythology' },
    ]
  },

  // ========== ETHICS MODULE (NEW) ==========
  {
    id: 'ethics-virtue',
    moduleId: 'ethics',
    title: 'Virtue Ethics: Aristotle\'s Good Life',
    order: 1,
    overview: "Aristotle asked: What does it mean to live well? His answer: develop virtues—excellent character traits—through practice and habit.",
    content: `**Aristotle's Ethics (384-322 BCE)**

"We are what we repeatedly do. Excellence, then, is not an act, but a habit."

**The Goal: Eudaimonia**
• Usually translated "happiness" but means more:
• Flourishing, well-being, living well
• Not just pleasure—fulfilling your potential

**The Virtues:**

**Moral Virtues (Character):**
• **Courage** - Mean between cowardice and recklessness
• **Temperance** - Mean between indulgence and insensibility
• **Justice** - Giving each their due
• **Generosity** - Mean between stinginess and wastefulness
• **Truthfulness** - Mean between boastfulness and self-deprecation

**Intellectual Virtues (Mind):**
• **Wisdom (Sophia)** - Understanding fundamental truths
• **Practical Wisdom (Phronesis)** - Knowing what to do in situations

**The Doctrine of the Mean:**
Every virtue is a balance between two extremes:

| Deficiency | Virtue | Excess |
|------------|--------|--------|
| Cowardice | Courage | Recklessness |
| Insensibility | Temperance | Indulgence |
| Stinginess | Generosity | Wastefulness |

**How to Become Virtuous:**
• Practice virtuous actions until they become habits
• Find good role models to imitate
• Develop practical wisdom to judge situations`,
    keyPoints: [
      "Eudaimonia: flourishing, not just pleasure",
      "Virtues are developed through practice and habit",
      "The Mean: virtue lies between excess and deficiency",
      "Practical wisdom (phronesis) is needed to apply virtues correctly"
    ],
    estimatedMinutes: 50,
    resources: [
      { type: 'book', title: 'Nicomachean Ethics - Aristotle', url: 'https://www.gutenberg.org/ebooks/8438', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'Aristotle & Virtue Ethics - Crash Course', url: 'https://www.youtube.com/watch?v=PrvtOWEXDIo', provider: 'Crash Course', free: true },
    ],
    exercises: [
      { instruction: 'Self-Assessment: For 5 virtues (courage, temperance, justice, generosity, truthfulness), rate yourself. Where do you tend toward excess or deficiency?', type: 'writing' },
      { instruction: 'Role Model: Identify someone you admire. What virtues do they embody? How do they demonstrate them?', type: 'writing' },
      { instruction: 'Practice Plan: Choose one virtue to work on this week. What specific actions will you take to practice it?', type: 'writing' },
    ],
    classicalConnections: [
      { term: 'Ethics', language: 'Greek', original: 'ἦθος (ethos)', meaning: 'character, custom', usage: 'The study of character—how we develop good habits and dispositions' },
      { term: 'Virtue', language: 'Latin', original: 'virtus', meaning: 'excellence, manliness', usage: 'From vir (man)—originally meant courage, then broadened to all excellences' },
      { term: 'Eudaimonia', language: 'Greek', original: 'εὐδαιμονία', meaning: 'good spirit, flourishing', usage: 'From εὖ (eu, "good") + δαίμων (daimon, "spirit")—having a good guiding spirit' },
      { term: 'Phronesis', language: 'Greek', original: 'φρόνησις', meaning: 'practical wisdom', usage: 'The wisdom to know what to do in each situation—key to Aristotle\'s ethics' },
      { term: 'Habit', language: 'Latin', original: 'habitus', meaning: 'condition, character', usage: 'From habere (to have)—what you "have" through repeated action becomes character' },
    ],
    primarySourceExcerpts: [
      {
        title: 'The Function Argument',
        author: 'Aristotle',
        source: 'Nicomachean Ethics, Book I, Chapter 7',
        sourceUrl: 'https://www.gutenberg.org/ebooks/8438',
        originalText: `τὸ δ᾽ ἀνθρώπινον ἀγαθὸν ψυχῆς ἐνέργεια γίνεται κατ᾽ ἀρετήν...`,
        translatedText: `"Human good turns out to be activity of the soul in accordance with virtue, and if there are more than one virtue, in accordance with the best and most complete.

But we must add 'in a complete life.' For one swallow does not make a summer, nor does one day; and so too one day, or a short time, does not make a man blessed and happy."`,
        context: 'Aristotle argues that just as a good knife cuts well (its function), a good human lives according to reason and virtue—our unique function. But he adds crucial nuance: happiness requires a lifetime, not a moment. A single good day doesn\'t make a happy life.',
        discussionQuestions: [
          'What is the "function" of a human being, according to Aristotle?',
          'Why does he say "one swallow does not make a summer"?',
          'How is this different from seeking momentary pleasure?'
        ]
      },
      {
        title: 'The Doctrine of the Mean',
        author: 'Aristotle',
        source: 'Nicomachean Ethics, Book II, Chapter 6',
        sourceUrl: 'https://www.gutenberg.org/ebooks/8438',
        translatedText: `"Virtue is a mean between two vices, that which depends on excess and that which depends on defect; and again it is a mean because the vices respectively fall short of or exceed what is right in both passions and actions, while virtue both finds and chooses that which is intermediate.

For instance, both fear and confidence and appetite and anger and pity and in general pleasure and pain may be felt both too much and too little, and in both cases not well; but to feel them at the right times, with reference to the right objects, towards the right people, with the right motive, and in the right way, is what is both intermediate and best, and this is characteristic of virtue."`,
        context: 'The "Golden Mean" is Aristotle\'s most famous ethical teaching. Courage isn\'t the absence of fear—it\'s the right amount of fear in the right circumstances. This requires practical wisdom (phronesis) to judge each situation.',
        discussionQuestions: [
          'Give an example of the "mean" for anger. When is anger appropriate?',
          'Why is finding the mean harder than simply following a rule?',
          'How do you develop the judgment to know what\'s "right" in each situation?'
        ]
      }
    ]
  },
  {
    id: 'ethics-stoicism',
    moduleId: 'ethics',
    title: 'Stoicism: Mastering What You Can Control',
    order: 2,
    overview: "The Stoics taught that happiness comes from focusing on what's in your control—your thoughts and actions—and accepting what isn't.",
    content: `**Stoic Philosophy**

"Make the best use of what is in your power, and take the rest as it happens."
— Epictetus

**The Core Stoic Teachings:**

**1. The Dichotomy of Control**
Things in our control:
• Our judgments, opinions, choices
• Our actions and responses

Things NOT in our control:
• Other people's actions
• Our reputation
• Health, wealth, circumstances
• The past and future

**2. Focus on Virtue**
• External goods (wealth, fame) are "indifferent"
• Only virtue is truly good
• Living according to reason and nature

**3. Negative Visualization**
• Imagine losing what you have
• Appreciate what you have now
• Prepare for misfortune

**Key Stoic Figures:**
• **Zeno of Citium** - Founded Stoicism (c. 300 BCE)
• **Epictetus** - Former slave, teacher (55-135 CE)
• **Seneca** - Roman statesman, writer (4 BCE-65 CE)
• **Marcus Aurelius** - Roman Emperor (121-180 CE)

**Daily Stoic Practice:**
• Morning: Prepare for difficulties
• Throughout day: Ask "Is this in my control?"
• Evening: Review actions, learn from mistakes`,
    keyPoints: [
      "Focus on what you can control (thoughts, actions); accept what you can't",
      "Virtue is the only true good; externals are 'indifferent'",
      "Negative visualization: imagine loss to appreciate the present",
      "Daily reflection: morning preparation, evening review"
    ],
    estimatedMinutes: 45,
    resources: [
      { type: 'book', title: 'Meditations - Marcus Aurelius', url: 'https://www.gutenberg.org/ebooks/2680', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'Enchiridion - Epictetus', url: 'https://www.gutenberg.org/ebooks/45109', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'Stoicism - Crash Course', url: 'https://www.youtube.com/watch?v=R9OCA6UFE-0', provider: 'Crash Course', free: true },
    ],
    exercises: [
      { instruction: 'Dichotomy Exercise: List 5 current worries. For each, identify what\'s in your control and what isn\'t. Focus only on the former', type: 'writing' },
      { instruction: 'Read Marcus Aurelius: Read 10 entries from Meditations. Choose 3 that resonate. Explain why', type: 'reading' },
      { instruction: 'Evening Review: For 7 days, review your day before bed. What went well? What would you do differently?', type: 'practice' },
    ],
    classicalConnections: [
      { term: 'Stoic', language: 'Greek', original: 'στοά (stoa)', meaning: 'porch, colonnade', usage: 'Zeno taught at the Στοὰ Ποικίλη (Painted Porch) in Athens—hence "Stoics"' },
      { term: 'Apathy', language: 'Greek', original: 'ἀπάθεια (apatheia)', meaning: 'without passion', usage: 'From α- (without) + πάθος (pathos, "passion")—freedom from destructive emotions (not indifference!)' },
      { term: 'Philosophy', language: 'Greek', original: 'φιλοσοφία', meaning: 'love of wisdom', usage: 'From φίλος (philos, "lover") + σοφία (sophia, "wisdom")—you learned these in Greek vocabulary!' },
      { term: 'Meditation', language: 'Latin', original: 'meditari', meaning: 'to think, contemplate', usage: 'Marcus Aurelius "thought through" his principles each day—training the mind' },
    ],
    primarySourceExcerpts: [
      {
        title: 'What Is In Your Power',
        author: 'Epictetus',
        source: 'Enchiridion (The Manual), Chapter 1',
        sourceUrl: 'https://www.gutenberg.org/ebooks/45109',
        translatedText: `"Some things are in our control and others not. Things in our control are opinion, pursuit, desire, aversion, and, in a word, whatever are our own actions. Things not in our control are body, property, reputation, command, and, in one word, whatever are not our own actions.

The things in our control are by nature free, unrestrained, unhindered; but those not in our control are weak, slavish, restrained, belonging to others. Remember, then, that if you suppose that things which are slavish by nature are also free, and that what belongs to others is your own, then you will be hindered."`,
        context: 'The opening of Epictetus\'s handbook captures the core Stoic insight: we suffer when we try to control what we cannot. Epictetus, born a slave, knew this truth deeply—he couldn\'t control his body or circumstances, but his mind remained free.',
        discussionQuestions: [
          'Why does Epictetus start with this distinction? Why is it so fundamental?',
          'How might a slave discover this truth more clearly than a free person?',
          'What would change in your life if you truly accepted this division?'
        ]
      },
      {
        title: 'The Emperor\'s Reflections',
        author: 'Marcus Aurelius',
        source: 'Meditations, Book II',
        sourceUrl: 'https://www.gutenberg.org/ebooks/2680',
        translatedText: `"Begin the morning by saying to thyself, I shall meet with the busybody, the ungrateful, arrogant, deceitful, envious, unsocial. All these things happen to them by reason of their ignorance of what is good and evil.

But I who have seen the nature of the good that it is beautiful, and of the bad that it is ugly, and the nature of him who does wrong, that it is akin to me... I can neither be injured by any of them, for no one can fix on me what is ugly, nor can I be angry with my kinsman, nor hate him."`,
        context: 'Marcus Aurelius was Roman Emperor (161-180 CE) yet wrote these private reflections to himself. This passage shows Stoicism in action: he prepares for difficult people by remembering they act from ignorance, not malice—and that getting angry only harms himself.',
        discussionQuestions: [
          'Why does Marcus prepare for difficulties each morning?',
          'How does seeing others as "kinsmen" change how you respond to them?',
          'What does it mean that "no one can fix on me what is ugly"?'
        ]
      },
      {
        title: 'On the Shortness of Time',
        author: 'Marcus Aurelius',
        source: 'Meditations, Book IV',
        sourceUrl: 'https://www.gutenberg.org/ebooks/2680',
        translatedText: `"Do not act as if thou wert going to live ten thousand years. Death hangs over thee. While thou livest, while it is in thy power, be good.

How much trouble he avoids who does not look to see what his neighbor says or does or thinks, but only to what he does himself, that it may be just and pure."`,
        context: 'The Stoics used "memento mori" (remember death) not to be morbid, but to clarify priorities. If you knew you had little time, would you waste it on gossip and envy? Marcus reminds himself to focus on his own character, not others\' opinions.',
        discussionQuestions: [
          'How does remembering death help us live better?',
          'Why is it so hard to stop comparing ourselves to others?',
          'What would you do differently if you truly acted on this advice?'
        ]
      }
    ]
  },
  {
    id: 'ethics-utilitarianism',
    moduleId: 'ethics',
    title: 'Utilitarianism: The Greatest Good',
    order: 3,
    overview: "Mill's utilitarianism judges actions by their consequences: the right action produces the greatest happiness for the greatest number.",
    content: `**Utilitarianism (J.S. Mill, 1806-1873)**

"Actions are right in proportion as they tend to promote happiness, wrong as they tend to produce the reverse of happiness."

**The Principle of Utility:**
An action is right if it produces the greatest good (happiness) for the greatest number of people.

**Key Concepts:**

**1. Consequentialism**
• Judge actions by their outcomes, not intentions
• Good consequences = right action

**2. Hedonism**
• Happiness = pleasure and absence of pain
• But Mill distinguished higher and lower pleasures
• "Better Socrates dissatisfied than a fool satisfied"

**3. Impartiality**
• Everyone's happiness counts equally
• Your own happiness is not more important

**Challenges to Utilitarianism:**

**The Trolley Problem:**
Should you kill one person to save five?
Utilitarian answer: Yes (5 > 1)
But does this feel right?

**Justice Concerns:**
Could utility justify punishing the innocent if it made many happy?
Mill: No—rules protecting rights maximize utility long-term

**Rule vs. Act Utilitarianism:**
• Act: Calculate utility for each action
• Rule: Follow rules that generally maximize utility`,
    keyPoints: [
      "Right actions produce the greatest happiness for the greatest number",
      "Higher pleasures (intellectual) are better than lower (physical)",
      "Everyone's happiness counts equally",
      "Rule utilitarianism: follow rules that generally maximize good"
    ],
    estimatedMinutes: 50,
    resources: [
      { type: 'book', title: 'Utilitarianism - J.S. Mill', url: 'https://www.gutenberg.org/ebooks/11224', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'Utilitarianism - Crash Course', url: 'https://www.youtube.com/watch?v=-a739VjqdSI', provider: 'Crash Course', free: true },
      { type: 'video', title: 'The Trolley Problem', url: 'https://www.youtube.com/watch?v=bOpf6KcWYyw', provider: 'TED-Ed', free: true },
    ],
    exercises: [
      { instruction: 'Trolley Problem: Would you pull the lever to save 5 and kill 1? Would you push someone off a bridge for the same outcome? Why different?', type: 'writing' },
      { instruction: 'Policy Analysis: Choose a real policy debate. Analyze it using utilitarian reasoning. What maximizes overall well-being?', type: 'writing' },
      { instruction: 'Higher Pleasures: Make a list of activities you enjoy. Rank them as "higher" or "lower" pleasures. Do you agree with Mill\'s distinction?', type: 'writing' },
    ],
    classicalConnections: [
      { term: 'Utility', language: 'Latin', original: 'utilitas', meaning: 'usefulness', usage: 'From uti (to use)—an action is good if it\'s "useful" for producing happiness' },
      { term: 'Consequence', language: 'Latin', original: 'consequi', meaning: 'to follow after', usage: 'From con- (with) + sequi (to follow)—what "follows" from an action determines its morality' },
      { term: 'Hedonism', language: 'Greek', original: 'ἡδονή (hedone)', meaning: 'pleasure', usage: 'The view that pleasure is the good—but Mill\'s hedonism includes intellectual pleasures' },
      { term: 'Calculate', language: 'Latin', original: 'calculus', meaning: 'pebble (used for counting)', usage: 'Utilitarians "calculate" happiness—add up the total good and harm' },
    ]
  },
  {
    id: 'ethics-duty',
    moduleId: 'ethics',
    title: 'Deontology: Kant\'s Moral Law',
    order: 4,
    overview: "Kant argued that morality is about duty, not consequences. Some actions are always wrong, regardless of their outcomes.",
    content: `**Kant's Deontological Ethics (1724-1804)**

"Act only according to that maxim whereby you can at the same time will that it should become a universal law."

**The Categorical Imperative:**

**Formulation 1: Universal Law**
• Before acting, ask: Could everyone do this?
• If not, the action is wrong
• Example: Lying fails—if everyone lied, trust would collapse

**Formulation 2: Humanity as End**
"Act so that you treat humanity, whether in your own person or in that of another, always as an end and never as a means only."
• Don't use people merely as tools
• Respect their dignity and autonomy

**Key Concepts:**

**1. Good Will**
• The only thing good without qualification
• Acting from duty, not inclination
• Shopkeeper who is honest from duty > honest for profit

**2. Duty vs. Inclination**
• Moral worth comes from acting from duty
• Helping others because you want to < helping from duty

**3. Perfect vs. Imperfect Duties**
• Perfect: Never lie, never murder (exceptionless)
• Imperfect: Help others, develop talents (some flexibility)

**Strengths and Challenges:**
• Strength: Absolute moral rules, human dignity
• Challenge: What about conflicts between duties?`,
    keyPoints: [
      "Categorical Imperative: Act only as you could will everyone to act",
      "Treat humanity always as an end, never merely as a means",
      "Good will is the only unconditionally good thing",
      "Some duties are absolute (perfect); others allow flexibility (imperfect)"
    ],
    estimatedMinutes: 50,
    resources: [
      { type: 'book', title: 'Groundwork of the Metaphysics of Morals - Kant', url: 'https://www.gutenberg.org/ebooks/5682', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'Kant & Deontology - Crash Course', url: 'https://www.youtube.com/watch?v=8bIys6JoEDw', provider: 'Crash Course', free: true },
    ],
    exercises: [
      { instruction: 'Universal Law Test: Apply the test to 5 actions: (1) stealing, (2) breaking promises, (3) cheating on tests, (4) charity, (5) developing talents', type: 'writing' },
      { instruction: 'Means vs. Ends: Think of situations where people are treated as "mere means." How could these be changed?', type: 'writing' },
      { instruction: 'Kant vs. Mill: On the trolley problem, what would Kant say? Compare to Mill\'s answer. Which is more compelling?', type: 'writing' },
    ],
    classicalConnections: [
      { term: 'Deontology', language: 'Greek', original: 'δέον (deon)', meaning: 'that which is binding, duty', usage: 'The study of duty—what we are obligated to do regardless of consequences' },
      { term: 'Categorical', language: 'Greek', original: 'κατηγορία (kategoria)', meaning: 'accusation, predication', usage: 'From Aristotle\'s categories—an absolute, unconditional command' },
      { term: 'Imperative', language: 'Latin', original: 'imperare', meaning: 'to command', usage: 'A command or order—what you "must" do, not what would be "nice" to do' },
      { term: 'Autonomy', language: 'Greek', original: 'αὐτονομία', meaning: 'self-law', usage: 'From αὐτός (autos, "self") + νόμος (nomos, "law")—giving yourself the moral law' },
      { term: 'Dignity', language: 'Latin', original: 'dignitas', meaning: 'worthiness', usage: 'Every person has inherent worth—cannot be used merely as a tool' },
    ]
  },

  // ========== RHETORIC MODULE (NEW) ==========
  {
    id: 'rhetoric-three-appeals',
    moduleId: 'rhetoric',
    title: 'The Three Appeals: Ethos, Pathos, Logos',
    order: 1,
    overview: "Aristotle identified three modes of persuasion: credibility, emotion, and logic. Master all three to communicate effectively.",
    content: `**Aristotle's Three Appeals**

"Of the modes of persuasion furnished by the spoken word there are three kinds."

**1. ETHOS (Credibility)**
The speaker's character and trustworthiness.

How to establish ethos:
• Demonstrate expertise and knowledge
• Show good character and intentions
• Connect with audience values
• Acknowledge other viewpoints fairly

Examples:
• "As a doctor with 20 years of experience..."
• "I share your concerns about..."

**2. PATHOS (Emotion)**
Putting the audience in a certain frame of mind.

How to use pathos:
• Tell stories that evoke feelings
• Use vivid, concrete language
• Appeal to shared values and identity
• Create urgency or hope

Examples:
• "Imagine a child who goes to bed hungry..."
• "Together, we can build a better future..."

**3. LOGOS (Logic)**
The argument itself—reasoning and evidence.

How to use logos:
• Clear, logical structure
• Evidence: facts, statistics, examples
• Sound reasoning without fallacies
• Anticipate and address counterarguments

Examples:
• "Studies show that 78% of..."
• "If A, then B. We have A. Therefore B."

**Balance All Three:**
The best arguments use ethos, pathos, and logos together.`,
    keyPoints: [
      "Ethos: Establish credibility through expertise and character",
      "Pathos: Connect emotionally through stories and vivid language",
      "Logos: Persuade through evidence and logical reasoning",
      "The most effective arguments combine all three appeals"
    ],
    estimatedMinutes: 45,
    resources: [
      { type: 'book', title: 'Rhetoric - Aristotle', url: 'http://classics.mit.edu/Aristotle/rhetoric.html', provider: 'MIT Classics', free: true },
      { type: 'video', title: 'The Art of Rhetoric - TED-Ed', url: 'https://www.youtube.com/watch?v=3klMM9BkW5o', provider: 'TED-Ed', free: true },
    ],
    exercises: [
      { instruction: 'Speech Analysis: Find a famous speech (MLK, Churchill, etc.). Identify examples of ethos, pathos, and logos', type: 'practice' },
      { instruction: 'Write Three Paragraphs: On a topic you care about, write one paragraph using only ethos, one using pathos, one using logos', type: 'writing' },
      { instruction: 'Advertisement Analysis: Analyze 3 advertisements. Which appeals do they use? Which is most effective?', type: 'practice' },
    ],
    classicalConnections: [
      { term: 'Rhetoric', language: 'Greek', original: 'ῥητορική (rhetorike)', meaning: 'art of the orator', usage: 'From ῥήτωρ (rhetor), "speaker, orator"—the τέχνη (techne, art) of public speaking' },
      { term: 'Ethos', language: 'Greek', original: 'ἦθος (ethos)', meaning: 'character, custom', usage: 'Persuasion through the speaker\'s character—also root of "ethics"' },
      { term: 'Pathos', language: 'Greek', original: 'πάθος (pathos)', meaning: 'suffering, experience, emotion', usage: 'Persuasion through emotion—also root of "sympathy," "pathetic," "empathy"' },
      { term: 'Logos', language: 'Greek', original: 'λόγος (logos)', meaning: 'word, reason, account', usage: 'Persuasion through logic—the same logos you learned in Greek vocabulary!' },
      { term: 'Persuasion', language: 'Latin', original: 'persuadere', meaning: 'to advise thoroughly', usage: 'From per- (through) + suadere (to advise)—"advising through" to change minds' },
    ],
    primarySourceExcerpts: [
      {
        title: 'The Three Modes of Persuasion',
        author: 'Aristotle',
        source: 'Rhetoric, Book I, Chapter 2',
        sourceUrl: 'http://classics.mit.edu/Aristotle/rhetoric.html',
        originalText: 'τῶν δὲ διὰ τοῦ λόγου πορισθεῖσαι πίστεων τρία εἴδη ἐστίν...',
        translatedText: `"Of the modes of persuasion furnished by the spoken word there are three kinds. The first kind depends on the personal character of the speaker [ethos]; the second on putting the audience into a certain frame of mind [pathos]; the third on the proof, or apparent proof, provided by the words of the speech itself [logos]."`,
        context: 'This passage from Aristotle\'s Rhetoric (c. 350 BCE) established the framework that still defines persuasion today. Notice how Aristotle analyzes persuasion systematically—this logical approach to understanding communication was revolutionary.',
        discussionQuestions: [
          'Why do you think Aristotle listed ethos first?',
          'What does "apparent proof" suggest about the difference between truth and persuasion?',
          'Which of the three appeals do you find most convincing? Why?'
        ]
      },
      {
        title: 'I Have a Dream - Analysis',
        author: 'Dr. Martin Luther King Jr.',
        source: 'March on Washington, August 28, 1963',
        sourceUrl: 'https://www.archives.gov/files/press/exhibits/dream-speech.pdf',
        translatedText: `"I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin but by the content of their character."

[ETHOS: King speaks as a father, minister, and leader of the civil rights movement]
[PATHOS: The image of "four little children" creates emotional connection]
[LOGOS: The logical principle that character matters more than skin color]`,
        context: 'This speech perfectly demonstrates all three appeals working together. King established ethos through his role as a minister and civil rights leader, created pathos through vivid imagery of children and dreams, and logos through the logical argument for equality.',
        discussionQuestions: [
          'How does King combine all three appeals in this single sentence?',
          'Why is the "dream" metaphor so powerful?',
          'How does King\'s use of repetition ("I have a dream...") affect the speech?'
        ]
      }
    ]
  },
  {
    id: 'rhetoric-structure',
    moduleId: 'rhetoric',
    title: 'Argument Structure: Building Your Case',
    order: 2,
    overview: "Learn to structure arguments effectively using classical and modern frameworks. A well-organized argument is far more persuasive.",
    content: `**Classical Argument Structure**

**The Six Parts (Cicero):**

**1. Exordium (Introduction)**
• Capture attention
• Establish ethos
• Preview your argument

**2. Narratio (Background)**
• Provide context
• Tell the story so far
• Frame the issue

**3. Partitio (Thesis/Preview)**
• State your main claim
• Preview your points
• Set up the argument

**4. Confirmatio (Proof)**
• Present your evidence
• Develop your reasoning
• The meat of your argument

**5. Refutatio (Counterargument)**
• Address opposing views
• Refute or accommodate them
• Show you've considered alternatives

**6. Peroratio (Conclusion)**
• Summarize key points
• Make emotional appeal
• Call to action

**Modern Simplified Structure:**

**1. Hook** - Grab attention
**2. Context** - Background information
**3. Thesis** - Your main claim
**4. Reasons + Evidence** - Support your thesis
**5. Counterargument** - Address opposition
**6. Conclusion** - Summarize and call to action

**Transitions Matter:**
• "Furthermore..." "However..." "Therefore..."
• Guide the reader through your logic`,
    keyPoints: [
      "Introduction: Hook attention and preview your argument",
      "Body: Provide evidence, anticipate counterarguments",
      "Conclusion: Summarize and call to action",
      "Transitions guide readers through your reasoning"
    ],
    estimatedMinutes: 50,
    resources: [
      { type: 'book', title: 'De Oratore - Cicero', url: 'https://www.gutenberg.org/ebooks/9776', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'How to Structure an Argument', url: 'https://www.youtube.com/watch?v=NKEhdsnKKHs', provider: 'TED-Ed', free: true },
    ],
    exercises: [
      { instruction: 'Outline Practice: Choose a topic. Create a full outline using the 6-part classical structure', type: 'writing' },
      { instruction: 'Analyze Structure: Find an op-ed or essay. Identify which parts correspond to the classical structure', type: 'practice' },
      { instruction: 'Write an Essay: Write a 5-paragraph persuasive essay on a topic you care about, using proper structure', type: 'writing' },
    ],
    classicalConnections: [
      { term: 'Exordium', language: 'Latin', original: 'exordiri', meaning: 'to begin weaving', usage: 'The introduction "weaves" the beginning of your argument—like starting a tapestry' },
      { term: 'Narratio', language: 'Latin', original: 'narrare', meaning: 'to tell, relate', usage: 'The background section "narrates" the story—same root as "narrative"' },
      { term: 'Confirmatio', language: 'Latin', original: 'confirmare', meaning: 'to strengthen', usage: 'Your evidence "strengthens" or "confirms" your thesis' },
      { term: 'Refutatio', language: 'Latin', original: 'refutare', meaning: 'to drive back', usage: 'You "drive back" or "refute" counterarguments' },
      { term: 'Peroratio', language: 'Latin', original: 'perorare', meaning: 'to speak through to the end', usage: 'The conclusion "speaks through" to finish the argument powerfully' },
    ],
    primarySourceExcerpts: [
      {
        title: 'The Duties of an Orator',
        author: 'Marcus Tullius Cicero',
        source: 'De Oratore, Book I',
        sourceUrl: 'https://www.gutenberg.org/ebooks/9776',
        originalText: 'Est enim eloquentia una quaedam de summis virtutibus...',
        translatedText: `"For eloquence is one of the supreme virtues... the orator must be equipped with the arts of Logic, Grammar, and Rhetoric. He must be familiar with all the emotions of the human mind, because the effect and force of speech must be directed toward moving the feelings of the audience."`,
        context: 'Cicero (106-43 BCE) was Rome\'s greatest orator and a model for Renaissance education. His works on rhetoric shaped how we teach persuasion today. Notice how he connects oratory to understanding human psychology—you cannot move people without understanding them.',
        discussionQuestions: [
          'Why does Cicero call eloquence a "supreme virtue"?',
          'How does understanding emotions help an orator be more effective?',
          'What subjects should a modern speaker study to be well-equipped?'
        ]
      },
      {
        title: 'The Five Canons of Rhetoric',
        author: 'Cicero / Anonymous',
        source: 'Rhetorica ad Herennium, Book I',
        sourceUrl: 'https://www.gutenberg.org/ebooks/9776',
        translatedText: `"The speaker, then, should possess the faculties of Invention [inventio], Arrangement [dispositio], Style [elocutio], Memory [memoria], and Delivery [pronuntiatio].

Invention is the discovery of valid arguments to render one's cause plausible. Arrangement is the ordering of arguments in the proper sequence. Style is the adaptation of suitable words to the invented matter. Memory is the firm retention in the mind of the matter, words, and arrangement. Delivery is the graceful regulation of voice, countenance, and gesture."`,
        context: 'These Five Canons have governed rhetoric education for over 2,000 years. Today\'s public speaking courses still follow this framework. Note that Memory was crucial before teleprompters—orators memorized entire speeches!',
        discussionQuestions: [
          'Which of the five canons do you think is most important? Why?',
          'How has technology changed the importance of Memory?',
          'What does "graceful regulation of voice, countenance, and gesture" look like in practice?'
        ]
      }
    ]
  },
  {
    id: 'rhetoric-style',
    moduleId: 'rhetoric',
    title: 'Style: The Power of Language',
    order: 3,
    overview: "How you say something is as important as what you say. Learn rhetorical devices that make language memorable and persuasive.",
    content: `**Rhetorical Devices**

**Sound Devices:**

**Alliteration** - Same consonant sounds
"Peter Piper picked a peck of pickled peppers"

**Assonance** - Same vowel sounds
"The rain in Spain falls mainly on the plain"

**Repetition Devices:**

**Anaphora** - Repeating words at the start of successive clauses
"We shall fight on the beaches, we shall fight on the landing grounds, we shall fight in the fields..."

**Epistrophe** - Repeating words at the end
"...government of the people, by the people, for the people"

**Tricolon** - Three parallel elements
"I came, I saw, I conquered"

**Contrast Devices:**

**Antithesis** - Contrasting ideas in parallel structure
"Ask not what your country can do for you—ask what you can do for your country"

**Other Powerful Devices:**

**Rhetorical Question** - Question for effect, not answer
"If not us, who? If not now, when?"

**Hyperbole** - Deliberate exaggeration
"I've told you a million times"

**Metaphor** - Implicit comparison
"Life is a journey"

**Simple Is Powerful:**
• Use short sentences for impact
• Vary sentence length for rhythm
• Prefer active voice`,
    keyPoints: [
      "Sound devices (alliteration, assonance) make language memorable",
      "Repetition devices (anaphora, tricolon) create rhythm and emphasis",
      "Antithesis creates powerful contrasts",
      "Simple, varied sentences have the most impact"
    ],
    estimatedMinutes: 45,
    resources: [
      { type: 'video', title: 'Rhetorical Devices - Crash Course', url: 'https://www.youtube.com/watch?v=cBMXGQIoFew', provider: 'Crash Course', free: true },
      { type: 'tool', title: 'Silva Rhetoricae - Rhetorical Figures', url: 'http://rhetoric.byu.edu/', provider: 'BYU', free: true },
    ],
    exercises: [
      { instruction: 'Device Identification: In a famous speech, identify at least 5 different rhetorical devices', type: 'practice' },
      { instruction: 'Write with Devices: Write a short persuasive paragraph using at least 3 different rhetorical devices', type: 'writing' },
      { instruction: 'Style Comparison: Take a plain paragraph. Rewrite it using more powerful language and rhetorical devices', type: 'writing' },
    ]
  },
  {
    id: 'rhetoric-debate',
    moduleId: 'rhetoric',
    title: 'Debate: The Art of Civil Disagreement',
    order: 4,
    overview: "Learn to argue fairly, address counterarguments, and change minds without creating enemies. Civil debate is essential for democracy.",
    content: `**The Art of Debate**

Mill: "He who knows only his own side of the case knows little of that."

**Principles of Good Debate:**

**1. Steelman, Don't Strawman**
• Strawman: Misrepresent opponent's position to attack it
• Steelman: Present the strongest version of their argument
• Then respond to the strongest version

**2. Find Common Ground**
• What do you both agree on?
• Build from shared values
• Shows good faith

**3. Separate Ideas from People**
• Attack arguments, not character
• "That argument fails because..." not "You're an idiot"
• Assume good intentions

**4. Acknowledge Uncertainty**
• "I could be wrong, but..."
• "The evidence suggests..."
• Intellectual humility invites dialogue

**Responding to Arguments:**

**4 Ways to Respond:**
1. **Deny the premise** - "That's not actually true..."
2. **Accept but distinguish** - "True, but that's different because..."
3. **Accept but minimize** - "True, but it doesn't matter much because..."
4. **Accept and redirect** - "True, and actually that supports my point..."

**Changing Minds:**
• People rarely change minds mid-argument
• Plant seeds, give time
• Model openness—they'll reciprocate`,
    keyPoints: [
      "Steelman: Present the strongest version of opposing views",
      "Separate ideas from people; attack arguments, not character",
      "Acknowledge uncertainty; intellectual humility invites dialogue",
      "Four response strategies: deny, distinguish, minimize, redirect"
    ],
    estimatedMinutes: 50,
    resources: [
      { type: 'book', title: 'On Liberty - J.S. Mill', url: 'https://www.gutenberg.org/ebooks/34901', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'How to Disagree Better', url: 'https://www.youtube.com/watch?v=QBxB_VXvMdw', provider: 'CGP Grey', free: true },
    ],
    exercises: [
      { instruction: 'Steelman Practice: Choose an opinion you disagree with. Write the strongest possible argument FOR that position', type: 'writing' },
      { instruction: 'Debate Prep: Choose a controversial topic. Write out arguments for BOTH sides, as fairly as possible', type: 'writing' },
      { instruction: 'Civil Disagreement: Have a respectful conversation with someone you disagree with. Practice the principles above. Reflect on how it went', type: 'practice' },
    ]
  },
];

// Helper functions
export function getPathModules(): PathModule[] {
  return pathModules.sort((a, b) => a.order - b.order);
}

export function getPathLessonsByModule(moduleId: string): PathLesson[] {
  return pathLessons.filter(l => l.moduleId === moduleId).sort((a, b) => a.order - b.order);
}

export function getPathLessonById(lessonId: string): PathLesson | undefined {
  return pathLessons.find(l => l.id === lessonId);
}

export function getAllPathLessons(): PathLesson[] {
  return pathLessons.sort((a, b) => {
    const moduleA = pathModules.find(m => m.id === a.moduleId);
    const moduleB = pathModules.find(m => m.id === b.moduleId);
    if (!moduleA || !moduleB) return 0;
    if (moduleA.order !== moduleB.order) return moduleA.order - moduleB.order;
    return a.order - b.order;
  });
}

export function getPathModuleById(moduleId: string): PathModule | undefined {
  return pathModules.find(m => m.id === moduleId);
}
