// The Complete Path of a Genius - Standalone Unified Course
// Based on John Stuart Mill's intensive education method + 10 historical geniuses

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

// Module definitions - Exercise counts now reflect actual lesson content
export const pathModules: PathModule[] = [
  {
    id: 'ancient-greek',
    name: 'Ancient Greek',
    description: '6 Lessons • Alphabet to Aesop',
    icon: '🏛️',
    exerciseCount: '6 lessons',
    premium: false,
    order: 1,
    introText: "This module follows John Stuart Mill's intensive method. Mill began Greek at age 3 and achieved fluency through systematic vocabulary drilling, immediate translation practice, and daily oral recitation.",
    resources: [
      { type: 'book', title: 'Athenaze: Introduction to Ancient Greek', url: 'https://www.amazon.com/Athenaze-Book-I-Introduction-Ancient/dp/0195149564', provider: 'Amazon', free: false },
      { type: 'book', title: 'Learn to Read Greek, Part 1 & 2', url: 'https://yalebooks.yale.edu/book/9780300115895/learn-to-read-greek', provider: 'Yale University Press', free: false },
      { type: 'book', title: 'Reading Greek: Grammar and Exercises', url: 'https://www.cambridge.org/us/academic/subjects/classical-studies/classical-languages/reading-greek-grammar-and-exercises-2nd-edition', provider: 'Cambridge/JACT', free: false },
      { type: 'book', title: "Smyth's Greek Grammar", url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.04.0007', provider: 'Perseus Digital Library', free: true },
      { type: 'video', title: 'Ancient Greek in Action - Complete Course', url: 'https://www.youtube.com/playlist?list=PLq5ea-jR9u2puDaLoRL-nBkpwrkURbLjT', provider: 'Brandeis University', free: true },
      { type: 'video', title: 'Alpha with Angela - Greek Alphabet', url: 'https://www.youtube.com/watch?v=0gG4Wd5J_Pw', provider: 'YouTube', free: true },
      { type: 'tool', title: 'Perseus Digital Library', url: 'https://www.perseus.tufts.edu/', provider: 'Tufts University', free: true },
      { type: 'tool', title: 'Logeion Dictionary', url: 'https://logeion.uchicago.edu/', provider: 'University of Chicago', free: true },
    ]
  },
  {
    id: 'latin',
    name: 'Latin',
    description: '5 Lessons • Vocabulary to Caesar',
    icon: '📜',
    exerciseCount: '5 lessons',
    premium: true,
    order: 2,
    introText: "Mill began Latin at age 8. Basic vocabulary and grammar first, then immediate reading of Caesar. His clear military prose is perfect for beginners.",
    resources: [
      { type: 'book', title: "Wheelock's Latin", url: 'https://www.amazon.com/Wheelocks-Latin-7th/dp/0061997226', provider: 'Amazon', free: false },
      { type: 'book', title: 'Lingua Latina per se Illustrata', url: 'https://hackettpublishing.com/lingua-latina-per-se-illustrata-series/lingua-latina-pars-i-familia-romana', provider: 'Hackett', free: false },
      { type: 'book', title: 'Cambridge Latin Course', url: 'https://www.cambridge.org/us/cambridgelatincourse', provider: 'Cambridge', free: false },
      { type: 'tool', title: 'Latin Library', url: 'https://www.thelatinlibrary.com/', provider: 'The Latin Library', free: true },
      { type: 'tool', title: "Whitaker's Words", url: 'http://archives.nd.edu/words.html', provider: 'Notre Dame', free: true },
      { type: 'video', title: 'Latin Tutorial - Wheelock', url: 'https://www.youtube.com/c/LatinTutorial', provider: 'YouTube', free: true },
      { type: 'video', title: 'LatinPerDiem', url: 'https://www.youtube.com/c/LatinPerDiem', provider: 'YouTube', free: true },
      { type: 'tool', title: 'Duolingo Latin', url: 'https://www.duolingo.com/course/la/en/Learn-Latin', provider: 'Duolingo', free: true },
    ]
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    description: '5 Lessons • Geometry & Algebra',
    icon: '📐',
    exerciseCount: '5 lessons',
    premium: true,
    order: 3,
    introText: "From Euclidean geometry to algebraic problem-solving. Einstein called Euclid his 'sacred little geometry book.' Pascal discovered geometry through visual exploration.",
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
    name: 'Physics',
    description: '3 Lessons • Forces & Wonder',
    icon: '🔬',
    exerciseCount: '3 lessons',
    premium: true,
    order: 4,
    introText: "The methods of Newton, Einstein, and Curie. Master the experimental method and fundamental laws of nature through hands-on discovery.",
    resources: [
      { type: 'book', title: "Newton's Principia", url: 'https://www.gutenberg.org/ebooks/28233', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'Physics - Crash Course', url: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtN0ge7yDk_UA0ldZJdhwkoV', provider: 'Crash Course', free: true },
      { type: 'video', title: 'MIT 8.01 Classical Mechanics', url: 'https://www.youtube.com/playlist?list=PLyQSN7X0ro203puVhQsmCj9qciW_6NJnV', provider: 'MIT OpenCourseWare', free: true },
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    description: '3 Lessons • Curie\'s Method',
    icon: '⚗️',
    exerciseCount: '3 lessons',
    premium: true,
    order: 5,
    introText: "Marie Curie's father taught her systematic experimentation. Begin with home laboratory experiments that reveal the nature of matter.",
    resources: [
      { type: 'video', title: 'Chemistry - Crash Course', url: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtPHzzYuWy6fYEaX9mQQ8oGr', provider: 'Crash Course', free: true },
      { type: 'video', title: 'MIT 5.111 Chemistry', url: 'https://www.youtube.com/playlist?list=PLUl4u3cNGP629dLy3p8L5XvkrBQrLQvKO', provider: 'MIT OpenCourseWare', free: true },
    ]
  },
  {
    id: 'logic',
    name: 'Logic & Critical Thinking',
    description: '4 Lessons • Syllogisms to Fallacies',
    icon: '🧠',
    exerciseCount: '4 lessons',
    premium: true,
    order: 6,
    introText: "Mill's System of Logic revolutionized inductive reasoning. At age 12, Mill began formal logic and it became his greatest strength.",
    resources: [
      { type: 'book', title: 'A System of Logic by J.S. Mill', url: 'https://www.gutenberg.org/ebooks/26495', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: "Aristotle's Organon", url: 'https://www.gutenberg.org/ebooks/2412', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'Philosophy - Crash Course', url: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtNgK6MZucdYldNkMybYIHKR', provider: 'Crash Course', free: true },
    ]
  },
  {
    id: 'thought-experiments',
    name: 'Thought Experiments',
    description: '3 Lessons • Einstein\'s Method',
    icon: '💭',
    exerciseCount: '3 lessons',
    premium: true,
    order: 7,
    introText: "At age 16, Einstein imagined chasing a light beam. This led to special relativity. Practice mental experimentation systematically.",
    resources: [
      { type: 'book', title: 'Relativity by Einstein', url: 'https://www.gutenberg.org/ebooks/5001', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: "Einstein's General Relativity", url: 'https://www.youtube.com/watch?v=DYq774z4dws', provider: 'PBS Space Time', free: true },
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
      { type: 'video', title: 'Alpha with Angela - Greek Alphabet', url: 'https://www.youtube.com/watch?v=0gG4Wd5J_Pw', provider: 'YouTube', free: true },
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
    overview: "Learn the 50 most essential Greek nouns. Mill Method: Learn 10 words per day. Write each word 5 times. Recite meanings aloud.",
    content: `**Exercise 2.1: Essential Nouns (50 words)**

Mill Method for memorization:
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
      { type: 'video', title: 'Ancient Greek Verb Conjugation', url: 'https://www.youtube.com/watch?v=1cQWOJlwvuo', provider: 'YouTube', free: true },
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
      { type: 'book', title: 'A Greek Primer for Beginners', url: 'https://www.gutenberg.org/ebooks/39292', provider: 'Project Gutenberg', free: true },
    ],
    exercises: [
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
      { type: 'book', title: 'The Categories by Aristotle', url: 'https://www.gutenberg.org/ebooks/2412', provider: 'Project Gutenberg', free: true },
    ],
    exercises: [
      { instruction: 'Create 3 valid syllogisms of your own', type: 'writing' },
      { instruction: 'Identify the figure and mood of 5 syllogisms', type: 'practice' },
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
      { type: 'video', title: 'Work and Energy - Crash Course', url: 'https://www.youtube.com/watch?v=w4QFJb9a8vo', provider: 'Crash Course', free: true },
    ],
    exercises: [
      { instruction: 'Bouncing Ball Lab: Drop a ball from 1m height. Measure bounce heights for 5 bounces. Calculate energy lost each time', type: 'practice' },
      { instruction: 'Energy Transformation Chart: Create a diagram showing 10 different energy transformations (e.g., eating → running)', type: 'writing' },
      { instruction: 'Calculation Set (KE): Find kinetic energy: (a) 2kg at 5m/s (b) 0.5kg at 10m/s (c) 1000kg at 20m/s. Use KE=½mv²', type: 'practice' },
      { instruction: 'Calculation Set (PE): Find potential energy: (a) 5kg at 10m (b) 2kg at 25m (c) 70kg at 3m. Use PE=mgh, g=9.8', type: 'practice' },
      { instruction: 'Pendulum Analysis: Describe energy transformations during one complete swing. Where is KE maximum? PE maximum?', type: 'writing' },
      { instruction: 'E=mc² Calculation: Calculate energy in 1kg of mass (c=3×10⁸ m/s). Compare to energy in 1 gallon of gasoline (120 MJ)', type: 'practice' },
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
