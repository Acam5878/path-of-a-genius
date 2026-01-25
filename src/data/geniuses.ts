export interface Genius {
  id: string;
  name: string;
  iqMin: number;
  iqMax: number;
  field: string;
  birthYear: number;
  deathYear: number;
  biography: string;
  portraitUrl: string;
  famousQuote: string;
  achievements: string[];
  isPremium: boolean;
  era: string;
  hook: string;
}

export interface Subject {
  id: string;
  geniusId: string;
  subjectName: string;
  category: 'language' | 'math' | 'science' | 'philosophy' | 'arts';
  ageStarted: number;
  ageCompleted?: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeInvestment: string;
  specificTexts: string[];
  learningMethod: string;
  whyItMatters: string;
}

export const geniuses: Genius[] = [
  {
    id: 'john-stuart-mill',
    name: 'John Stuart Mill',
    iqMin: 180,
    iqMax: 200,
    field: 'Philosophy',
    birthYear: 1806,
    deathYear: 1873,
    biography: "John Stuart Mill was a British philosopher, political economist, and civil servant. One of the most influential thinkers in the history of classical liberalism, he contributed widely to social theory, political theory, and political economy. He is considered the most influential English-speaking philosopher of the nineteenth century.",
    portraitUrl: '/geniuses/mill.jpg',
    famousQuote: "The only freedom which deserves the name is that of pursuing our own good in our own way.",
    achievements: [
      "Published 'On Liberty' - foundational text of liberalism",
      "Developed Utilitarianism philosophy",
      "First MP to propose women's suffrage",
      "Mastered Greek by age 3, Latin by 8"
    ],
    isPremium: false,
    era: 'Modern',
    hook: 'Reading Greek at age 3'
  },
  {
    id: 'leonardo-da-vinci',
    name: 'Leonardo da Vinci',
    iqMin: 180,
    iqMax: 220,
    field: 'Arts & Science',
    birthYear: 1452,
    deathYear: 1519,
    biography: "Leonardo da Vinci was an Italian polymath of the High Renaissance who was active as a painter, draughtsman, engineer, scientist, theorist, sculptor, and architect. While his fame initially rested on his achievements as a painter, he also became known for his notebooks, in which he made drawings and notes on a variety of subjects.",
    portraitUrl: '/geniuses/davinci.jpg',
    famousQuote: "Learning never exhausts the mind.",
    achievements: [
      "Painted the Mona Lisa and The Last Supper",
      "Designed flying machines centuries ahead of time",
      "Made groundbreaking anatomical studies",
      "Pioneered techniques in painting and engineering"
    ],
    isPremium: false,
    era: 'Renaissance',
    hook: 'The original Renaissance man'
  },
  {
    id: 'isaac-newton',
    name: 'Isaac Newton',
    iqMin: 190,
    iqMax: 200,
    field: 'Physics & Mathematics',
    birthYear: 1643,
    deathYear: 1727,
    biography: "Sir Isaac Newton was an English mathematician, physicist, astronomer, alchemist, theologian, and author widely recognised as one of the greatest mathematicians and physicists and among the most influential scientists of all time. He was a key figure in the philosophical revolution known as the Enlightenment.",
    portraitUrl: '/geniuses/newton.jpg',
    famousQuote: "If I have seen further it is by standing on the shoulders of Giants.",
    achievements: [
      "Developed laws of motion and universal gravitation",
      "Co-invented calculus independently",
      "Built the first practical reflecting telescope",
      "Discovered the composition of white light"
    ],
    isPremium: false,
    era: 'Enlightenment',
    hook: 'Invented calculus and physics'
  },
  {
    id: 'marie-curie',
    name: 'Marie Curie',
    iqMin: 175,
    iqMax: 200,
    field: 'Physics & Chemistry',
    birthYear: 1867,
    deathYear: 1934,
    biography: "Marie Skłodowska Curie was a Polish and naturalized-French physicist and chemist who conducted pioneering research on radioactivity. She was the first woman to win a Nobel Prize, the first person and the only woman to win the Nobel Prize twice, and the only person to win the Nobel Prize in two scientific fields.",
    portraitUrl: '/geniuses/curie.jpg',
    famousQuote: "Nothing in life is to be feared, it is only to be understood.",
    achievements: [
      "Discovered polonium and radium",
      "First woman to win a Nobel Prize",
      "Only person to win Nobel in two sciences",
      "Pioneer of mobile X-ray units in WWI"
    ],
    isPremium: true,
    era: 'Modern',
    hook: 'First woman Nobel laureate'
  },
  {
    id: 'nikola-tesla',
    name: 'Nikola Tesla',
    iqMin: 160,
    iqMax: 200,
    field: 'Engineering',
    birthYear: 1856,
    deathYear: 1943,
    biography: "Nikola Tesla was a Serbian-American inventor, electrical engineer, mechanical engineer, and futurist best known for his contributions to the design of the modern alternating current electricity supply system.",
    portraitUrl: '/geniuses/tesla.jpg',
    famousQuote: "If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.",
    achievements: [
      "Invented alternating current (AC) system",
      "Developed the Tesla coil",
      "Pioneered wireless transmission",
      "Held over 300 patents"
    ],
    isPremium: true,
    era: 'Modern',
    hook: 'Father of modern electricity'
  },
  {
    id: 'albert-einstein',
    name: 'Albert Einstein',
    iqMin: 160,
    iqMax: 190,
    field: 'Physics',
    birthYear: 1879,
    deathYear: 1955,
    biography: "Albert Einstein was a German-born theoretical physicist who developed the theory of relativity, one of the two pillars of modern physics. His work is also known for its influence on the philosophy of science.",
    portraitUrl: '/geniuses/einstein.jpg',
    famousQuote: "Imagination is more important than knowledge.",
    achievements: [
      "Developed theory of relativity",
      "Nobel Prize in Physics 1921",
      "Discovered the photoelectric effect",
      "E=mc² mass-energy equivalence"
    ],
    isPremium: true,
    era: 'Modern',
    hook: 'Revolutionized physics forever'
  },
  {
    id: 'aristotle',
    name: 'Aristotle',
    iqMin: 180,
    iqMax: 200,
    field: 'Philosophy',
    birthYear: -384,
    deathYear: -322,
    biography: "Aristotle was a Greek philosopher and polymath during the Classical period in Ancient Greece. Taught by Plato, he was the founder of the Lyceum, the Peripatetic school of philosophy, and the Aristotelian tradition.",
    portraitUrl: '/geniuses/aristotle.jpg',
    famousQuote: "The more you know, the more you realize you don't know.",
    achievements: [
      "Founded formal logic",
      "Tutored Alexander the Great",
      "Founded the Lyceum school",
      "Wrote on physics, biology, ethics, politics"
    ],
    isPremium: true,
    era: 'Ancient',
    hook: 'The father of Western philosophy'
  },
  {
    id: 'blaise-pascal',
    name: 'Blaise Pascal',
    iqMin: 185,
    iqMax: 195,
    field: 'Mathematics & Philosophy',
    birthYear: 1623,
    deathYear: 1662,
    biography: "Blaise Pascal was a French mathematician, physicist, inventor, philosopher, writer, and Catholic theologian. A child prodigy, Pascal wrote a significant treatise on projective geometry at the age of 16.",
    portraitUrl: '/geniuses/pascal.jpg',
    famousQuote: "The heart has its reasons which reason knows nothing of.",
    achievements: [
      "Invented mechanical calculator at 19",
      "Founded probability theory",
      "Pascal's Triangle in mathematics",
      "Wrote the influential 'Pensées'"
    ],
    isPremium: true,
    era: 'Enlightenment',
    hook: 'Built a calculator at age 19'
  },
  {
    id: 'gottfried-leibniz',
    name: 'Gottfried Leibniz',
    iqMin: 190,
    iqMax: 205,
    field: 'Mathematics & Philosophy',
    birthYear: 1646,
    deathYear: 1716,
    biography: "Gottfried Wilhelm Leibniz was a German polymath active as a mathematician, philosopher, scientist, and diplomat. He is credited, independently of Newton, with developing calculus.",
    portraitUrl: '/geniuses/leibniz.jpg',
    famousQuote: "Music is the pleasure the human mind experiences from counting without being aware that it is counting.",
    achievements: [
      "Co-invented calculus independently",
      "Invented binary number system",
      "Designed first mass-produced calculator",
      "Pioneered symbolic logic"
    ],
    isPremium: true,
    era: 'Enlightenment',
    hook: 'Invented binary and calculus'
  },
  {
    id: 'goethe',
    name: 'Johann Wolfgang von Goethe',
    iqMin: 180,
    iqMax: 210,
    field: 'Literature & Science',
    birthYear: 1749,
    deathYear: 1832,
    biography: "Johann Wolfgang von Goethe was a German writer, poet, and polymath. His works include novels, poetry, drama, and scientific treatises. His magnum opus, Faust, is considered one of the greatest works of German literature.",
    portraitUrl: '/geniuses/goethe.jpg',
    famousQuote: "Knowing is not enough; we must apply. Willing is not enough; we must do.",
    achievements: [
      "Wrote Faust, masterpiece of world literature",
      "Developed color theory",
      "Influenced Romanticism movement",
      "Mastered 6 languages by age 16"
    ],
    isPremium: true,
    era: 'Enlightenment',
    hook: 'Germany\'s Shakespeare'
  }
];

export const subjects: Subject[] = [
  // John Stuart Mill subjects
  {
    id: 'mill-greek',
    geniusId: 'john-stuart-mill',
    subjectName: 'Ancient Greek',
    category: 'language',
    ageStarted: 3,
    ageCompleted: 10,
    difficulty: 'Advanced',
    timeInvestment: '2-3 hours daily',
    specificTexts: ["Aesop's Fables", "Xenophon's Anabasis", "Herodotus", "Plato's dialogues"],
    learningMethod: "Direct reading of original texts with father's guidance. Started with simple fables and progressed to complex philosophy.",
    whyItMatters: "Greek unlocks the foundations of Western philosophy, democracy, and scientific thinking directly from source texts."
  },
  {
    id: 'mill-latin',
    geniusId: 'john-stuart-mill',
    subjectName: 'Latin',
    category: 'language',
    ageStarted: 8,
    ageCompleted: 14,
    difficulty: 'Intermediate',
    timeInvestment: '1-2 hours daily',
    specificTexts: ["Virgil's Aeneid", "Horace", "Cicero's Orations", "Livy's History of Rome"],
    learningMethod: "Grammar-translation method combined with extensive reading of classical texts.",
    whyItMatters: "Latin provides the foundation for Romance languages and access to centuries of philosophical and scientific texts."
  },
  {
    id: 'mill-logic',
    geniusId: 'john-stuart-mill',
    subjectName: 'Logic',
    category: 'philosophy',
    ageStarted: 12,
    ageCompleted: 14,
    difficulty: 'Advanced',
    timeInvestment: '1 hour daily',
    specificTexts: ["Aristotle's Organon", "School Logic", "Mill's own 'System of Logic'"],
    learningMethod: "Systematic study of syllogisms, fallacies, and argumentation through ancient texts.",
    whyItMatters: "Logic is the foundation of clear thinking, valid argumentation, and avoiding common reasoning errors."
  },
  {
    id: 'mill-political-economy',
    geniusId: 'john-stuart-mill',
    subjectName: 'Political Economy',
    category: 'philosophy',
    ageStarted: 13,
    ageCompleted: 16,
    difficulty: 'Advanced',
    timeInvestment: '2 hours daily',
    specificTexts: ["Adam Smith's Wealth of Nations", "Ricardo's Principles", "Say's Treatise"],
    learningMethod: "Reading primary texts followed by discussion and written summaries with his father.",
    whyItMatters: "Understanding economic principles is essential for informed citizenship and policy analysis."
  },
  {
    id: 'mill-arithmetic',
    geniusId: 'john-stuart-mill',
    subjectName: 'Arithmetic',
    category: 'math',
    ageStarted: 3,
    ageCompleted: 6,
    difficulty: 'Beginner',
    timeInvestment: '30 minutes daily',
    specificTexts: ["Basic calculation exercises", "Mental arithmetic drills"],
    learningMethod: "Daily practice and mental calculation exercises integrated into daily activities.",
    whyItMatters: "Strong arithmetic foundations enable faster learning of advanced mathematics."
  },
  // Leonardo da Vinci subjects
  {
    id: 'davinci-drawing',
    geniusId: 'leonardo-da-vinci',
    subjectName: 'Drawing & Observation',
    category: 'arts',
    ageStarted: 14,
    ageCompleted: 67,
    difficulty: 'Beginner',
    timeInvestment: '4+ hours daily',
    specificTexts: ["Nature observation", "Anatomical studies", "Mechanical drawings"],
    learningMethod: "Apprenticeship under Verrocchio, constant practice from life, and detailed observation.",
    whyItMatters: "Drawing trains observation skills and the ability to communicate ideas visually."
  },
  {
    id: 'davinci-anatomy',
    geniusId: 'leonardo-da-vinci',
    subjectName: 'Human Anatomy',
    category: 'science',
    ageStarted: 35,
    ageCompleted: 67,
    difficulty: 'Advanced',
    timeInvestment: '2-3 hours daily',
    specificTexts: ["Direct dissection studies", "Galen's texts", "Medieval anatomy books"],
    learningMethod: "Hands-on dissection combined with detailed drawings and notes.",
    whyItMatters: "Understanding human anatomy deepens appreciation for biology and medical science."
  },
  // Isaac Newton subjects
  {
    id: 'newton-geometry',
    geniusId: 'isaac-newton',
    subjectName: 'Euclidean Geometry',
    category: 'math',
    ageStarted: 18,
    ageCompleted: 22,
    difficulty: 'Intermediate',
    timeInvestment: '3 hours daily',
    specificTexts: ["Euclid's Elements", "Descartes' Geometry"],
    learningMethod: "Self-study through intense reading and problem-solving at Cambridge.",
    whyItMatters: "Geometry develops spatial reasoning and logical proof construction."
  },
  {
    id: 'newton-calculus',
    geniusId: 'isaac-newton',
    subjectName: 'Calculus (Fluxions)',
    category: 'math',
    ageStarted: 22,
    ageCompleted: 26,
    difficulty: 'Advanced',
    timeInvestment: '4+ hours daily',
    specificTexts: ["Self-developed methods", "Barrow's lectures"],
    learningMethod: "Original invention driven by need to solve physics problems.",
    whyItMatters: "Calculus is fundamental to understanding physics, engineering, and modern science."
  }
];

export const getGeniusById = (id: string): Genius | undefined => {
  return geniuses.find(g => g.id === id);
};

export const getSubjectsByGeniusId = (geniusId: string): Subject[] => {
  return subjects.filter(s => s.geniusId === geniusId);
};

export const getFreeGeniuses = (): Genius[] => {
  return geniuses.filter(g => !g.isPremium);
};

export const getPremiumGeniuses = (): Genius[] => {
  return geniuses.filter(g => g.isPremium);
};
