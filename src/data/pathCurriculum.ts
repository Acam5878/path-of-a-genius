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
    description: 'Coming Soon',
    icon: '📜',
    exerciseCount: '0 lessons',
    premium: true,
    order: 2,
    introText: "Latin was the second classical language Mill mastered. This module builds Latin proficiency from alphabet to reading Virgil and Cicero in the original.",
    resources: [
      { type: 'book', title: 'Wheelock\'s Latin', url: 'https://www.amazon.com/Wheelocks-Latin-7th/dp/0061997226', provider: 'Amazon', free: false },
      { type: 'book', title: 'Lingua Latina per se Illustrata', url: 'https://hackettpublishing.com/lingua-latina-per-se-illustrata-series/lingua-latina-pars-i-familia-romana', provider: 'Hackett', free: false },
      { type: 'tool', title: 'Latin Library', url: 'https://www.thelatinlibrary.com/', provider: 'The Latin Library', free: true },
      { type: 'video', title: 'Latin for Beginners', url: 'https://www.youtube.com/playlist?list=PLI7aXwN6XRgv3n4K3Brf1LKvCOcKJHVAj', provider: 'YouTube', free: true },
    ]
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    description: '2 Lessons • Euclid & Pythagoras',
    icon: '📐',
    exerciseCount: '2 lessons',
    premium: true,
    order: 3,
    introText: "From Euclidean geometry to Newtonian calculus. This module traces the mathematical journey of Newton, Leibniz, and Pascal.",
    resources: [
      { type: 'book', title: "Euclid's Elements", url: 'https://www.gutenberg.org/ebooks/21076', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: 'Principia Mathematica', url: 'https://www.gutenberg.org/ebooks/28233', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'Essence of Calculus', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr', provider: '3Blue1Brown', free: true },
      { type: 'video', title: 'Essence of Linear Algebra', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', provider: '3Blue1Brown', free: true },
    ]
  },
  {
    id: 'physics',
    name: 'Physics',
    description: '1 Lesson • Newton\'s Laws',
    icon: '🔬',
    exerciseCount: '1 lesson',
    premium: true,
    order: 4,
    introText: "The methods of Newton, Einstein, and Tesla. Master the experimental method and fundamental laws of nature.",
    resources: [
      { type: 'book', title: "Newton's Principia", url: 'https://www.gutenberg.org/ebooks/28233', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'Physics - Crash Course', url: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtN0ge7yDk_UA0ldZJdhwkoV', provider: 'Crash Course', free: true },
      { type: 'video', title: 'MIT 8.01 Classical Mechanics', url: 'https://www.youtube.com/playlist?list=PLyQSN7X0ro203puVhQsmCj9qciW_6NJnV', provider: 'MIT OpenCourseWare', free: true },
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    description: 'Coming Soon',
    icon: '⚗️',
    exerciseCount: '0 lessons',
    premium: true,
    order: 5,
    introText: "Follow Marie Curie's rigorous experimental approach to understanding matter and its transformations.",
    resources: [
      { type: 'video', title: 'Chemistry - Crash Course', url: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtPHzzYuWy6fYEaX9mQQ8oGr', provider: 'Crash Course', free: true },
      { type: 'video', title: 'MIT 5.111 Principles of Chemistry', url: 'https://www.youtube.com/playlist?list=PLUl4u3cNGP629dLy3p8L5XvkrBQrLQvKO', provider: 'MIT OpenCourseWare', free: true },
    ]
  },
  {
    id: 'logic',
    name: 'Logic & Critical Thinking',
    description: '3 Lessons • Syllogisms & Fallacies',
    icon: '🧠',
    exerciseCount: '3 lessons',
    premium: true,
    order: 6,
    introText: "Mill's System of Logic revolutionized inductive reasoning. Master syllogisms, fallacies, and scientific method.",
    resources: [
      { type: 'book', title: 'A System of Logic by J.S. Mill', url: 'https://www.gutenberg.org/ebooks/26495', provider: 'Project Gutenberg', free: true },
      { type: 'book', title: "Aristotle's Organon", url: 'https://www.gutenberg.org/ebooks/2412', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'Philosophy - Crash Course', url: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtNgK6MZucdYldNkMybYIHKR', provider: 'Crash Course', free: true },
    ]
  },
  {
    id: 'thought-experiments',
    name: 'Thought Experiments',
    description: '1 Lesson • Einstein\'s Method',
    icon: '💭',
    exerciseCount: '1 lesson',
    premium: true,
    order: 7,
    introText: "Einstein's greatest discoveries came from thought experiments. Train your mind to explore hypotheticals systematically.",
    resources: [
      { type: 'book', title: 'Relativity: The Special and General Theory', url: 'https://www.gutenberg.org/ebooks/5001', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'Einstein\'s General Relativity', url: 'https://www.youtube.com/watch?v=DYq774z4dws', provider: 'PBS Space Time', free: true },
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
    resources: [
      { type: 'book', title: "Euclid's Elements", url: 'https://www.gutenberg.org/ebooks/21076', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'Essence of Linear Algebra', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', provider: '3Blue1Brown', free: true },
    ],
    exercises: [
      { instruction: 'Memorize the 5 postulates', type: 'practice' },
      { instruction: 'Construct an equilateral triangle with compass and straightedge', type: 'practice' },
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
      { instruction: 'Work through both proofs step by step', type: 'practice' },
      { instruction: 'Calculate the diagonal of a 6×8 rectangle', type: 'practice' },
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
    resources: [
      { type: 'book', title: "Newton's Principia", url: 'https://www.gutenberg.org/ebooks/28233', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: 'Physics - Crash Course', url: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtN0ge7yDk_UA0ldZJdhwkoV', provider: 'Crash Course', free: true },
    ],
    exercises: [
      { instruction: 'Identify each law in 3 everyday situations', type: 'practice' },
      { instruction: 'Calculate: A 2kg object accelerates at 3m/s². What force is applied?', type: 'practice' },
    ]
  },

  // ========== THOUGHT EXPERIMENTS MODULE ==========
  {
    id: 'thought-experiments-intro',
    moduleId: 'thought-experiments',
    title: "Einstein's Method: Gedankenexperiment",
    order: 1,
    overview: "Einstein's greatest discoveries came from thought experiments—mentally simulating scenarios impossible to test in a lab. Learn his method.",
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
    resources: [
      { type: 'book', title: 'Relativity by Einstein', url: 'https://www.gutenberg.org/ebooks/5001', provider: 'Project Gutenberg', free: true },
      { type: 'video', title: "Einstein's General Relativity", url: 'https://www.youtube.com/watch?v=DYq774z4dws', provider: 'PBS Space Time', free: true },
    ],
    exercises: [
      { instruction: 'Explain the elevator thought experiment in your own words', type: 'writing' },
      { instruction: 'Design your own thought experiment about time or space', type: 'writing' },
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
