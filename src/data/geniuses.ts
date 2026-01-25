export interface StudyResource {
  id: string;
  title: string;
  author: string;
  type: 'book' | 'course' | 'article' | 'video';
  url: string;
  price?: string;
  coverImage?: string;
  provider?: string;
  description: string;
}

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
  resources: StudyResource[];
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
    whyItMatters: "Greek unlocks the foundations of Western philosophy, democracy, and scientific thinking directly from source texts.",
    resources: [
      {
        id: 'greek-1',
        title: "Greek: An Intensive Course",
        author: "Hardy Hansen & Gerald Quinn",
        type: 'book',
        url: "https://amazon.com/dp/0823216632",
        price: "$45.00",
        description: "The gold standard for learning Ancient Greek, used at major universities."
      },
      {
        id: 'greek-2',
        title: "Athenaze: An Introduction to Ancient Greek",
        author: "Maurice Balme",
        type: 'book',
        url: "https://amazon.com/dp/0190607661",
        price: "$65.00",
        description: "Learn Greek through engaging stories set in ancient Athens."
      },
      {
        id: 'greek-3',
        title: "Ancient Greek for Everyone",
        author: "Wilfred Major",
        type: 'course',
        url: "https://ancientgreek.pressbooks.com/",
        price: "Free",
        provider: "Open Textbook",
        description: "Free comprehensive online textbook for self-learners."
      }
    ]
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
    whyItMatters: "Latin provides the foundation for Romance languages and access to centuries of philosophical and scientific texts.",
    resources: [
      {
        id: 'latin-1',
        title: "Wheelock's Latin",
        author: "Frederic M. Wheelock",
        type: 'book',
        url: "https://amazon.com/dp/0061997226",
        price: "$24.99",
        description: "The classic Latin textbook used in universities for over 60 years."
      },
      {
        id: 'latin-2',
        title: "Lingua Latina per se Illustrata",
        author: "Hans Ørberg",
        type: 'book',
        url: "https://amazon.com/dp/1585104205",
        price: "$35.00",
        description: "Learn Latin naturally through immersive reading—entirely in Latin."
      },
      {
        id: 'latin-3',
        title: "Latin 101: Learning a Classical Language",
        author: "The Great Courses",
        type: 'course',
        url: "https://www.thegreatcourses.com/courses/latin-101",
        price: "$199.95",
        provider: "The Great Courses",
        description: "36-lecture video course for beginners to intermediate learners."
      }
    ]
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
    whyItMatters: "Logic is the foundation of clear thinking, valid argumentation, and avoiding common reasoning errors.",
    resources: [
      {
        id: 'logic-1',
        title: "An Introduction to Logic",
        author: "Irving Copi",
        type: 'book',
        url: "https://amazon.com/dp/0205820379",
        price: "$120.00",
        description: "The definitive textbook on formal and informal logic."
      },
      {
        id: 'logic-2',
        title: "A System of Logic",
        author: "John Stuart Mill",
        type: 'book',
        url: "https://amazon.com/dp/1602063494",
        price: "$15.99",
        description: "Mill's own masterwork on logic and scientific reasoning."
      },
      {
        id: 'logic-3',
        title: "Introduction to Logic",
        author: "Stanford University",
        type: 'course',
        url: "https://www.coursera.org/learn/logic-introduction",
        price: "Free",
        provider: "Coursera",
        description: "Free online course covering propositional and first-order logic."
      }
    ]
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
    whyItMatters: "Understanding economic principles is essential for informed citizenship and policy analysis.",
    resources: [
      {
        id: 'econ-1',
        title: "The Wealth of Nations",
        author: "Adam Smith",
        type: 'book',
        url: "https://amazon.com/dp/0553585975",
        price: "$9.99",
        description: "The foundational text of modern economics."
      },
      {
        id: 'econ-2',
        title: "Principles of Political Economy",
        author: "John Stuart Mill",
        type: 'book',
        url: "https://amazon.com/dp/1514347695",
        price: "$12.99",
        description: "Mill's comprehensive treatise on economics."
      },
      {
        id: 'econ-3',
        title: "Economics for Everyone",
        author: "Khan Academy",
        type: 'course',
        url: "https://www.khanacademy.org/economics-finance-domain",
        price: "Free",
        provider: "Khan Academy",
        description: "Free comprehensive economics curriculum from basics to advanced."
      }
    ]
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
    whyItMatters: "Strong arithmetic foundations enable faster learning of advanced mathematics.",
    resources: [
      {
        id: 'arith-1',
        title: "The Art of Problem Solving: Prealgebra",
        author: "Richard Rusczyk",
        type: 'book',
        url: "https://amazon.com/dp/1934124214",
        price: "$59.00",
        description: "Challenging math curriculum that builds deep understanding."
      },
      {
        id: 'arith-2',
        title: "Mental Math: Tricks To Become A Human Calculator",
        author: "Abhishek VR",
        type: 'book',
        url: "https://amazon.com/dp/1799248437",
        price: "$9.99",
        description: "Develop lightning-fast mental calculation abilities."
      }
    ]
  },
  {
    id: 'mill-history',
    geniusId: 'john-stuart-mill',
    subjectName: 'History',
    category: 'philosophy',
    ageStarted: 6,
    ageCompleted: 12,
    difficulty: 'Intermediate',
    timeInvestment: '1 hour daily',
    specificTexts: ["Plutarch's Lives", "Gibbon's Decline and Fall", "Hume's History of England"],
    learningMethod: "Reading historical narratives and discussing lessons with emphasis on understanding causation.",
    whyItMatters: "History teaches pattern recognition, human nature, and the consequences of ideas.",
    resources: [
      {
        id: 'hist-1',
        title: "Plutarch's Lives",
        author: "Plutarch",
        type: 'book',
        url: "https://amazon.com/dp/0375756779",
        price: "$18.00",
        description: "Parallel biographies of Greek and Roman leaders—essential classical reading."
      },
      {
        id: 'hist-2',
        title: "The Decline and Fall of the Roman Empire",
        author: "Edward Gibbon",
        type: 'book',
        url: "https://amazon.com/dp/0140437649",
        price: "$20.00",
        description: "The masterpiece of historical writing Mill studied intensively."
      }
    ]
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
    whyItMatters: "Drawing trains observation skills and the ability to communicate ideas visually.",
    resources: [
      {
        id: 'draw-1',
        title: "Drawing on the Right Side of the Brain",
        author: "Betty Edwards",
        type: 'book',
        url: "https://amazon.com/dp/1585429201",
        price: "$22.99",
        description: "The classic guide to learning to draw through perceptual training."
      },
      {
        id: 'draw-2',
        title: "Keys to Drawing",
        author: "Bert Dodson",
        type: 'book',
        url: "https://amazon.com/dp/0891343377",
        price: "$24.99",
        description: "Practical exercises for developing observational drawing skills."
      },
      {
        id: 'draw-3',
        title: "Proko Figure Drawing Fundamentals",
        author: "Stan Prokopenko",
        type: 'course',
        url: "https://www.proko.com/",
        price: "$99.00",
        provider: "Proko",
        description: "Professional-grade video lessons on figure and anatomy drawing."
      }
    ]
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
    whyItMatters: "Understanding human anatomy deepens appreciation for biology and medical science.",
    resources: [
      {
        id: 'anat-1',
        title: "Gray's Anatomy for Students",
        author: "Richard Drake",
        type: 'book',
        url: "https://amazon.com/dp/0323393047",
        price: "$85.00",
        description: "The modern standard for learning human anatomy."
      },
      {
        id: 'anat-2',
        title: "Anatomy for Artists",
        author: "Barrington Barber",
        type: 'book',
        url: "https://amazon.com/dp/1784042994",
        price: "$14.99",
        description: "Anatomy specifically for artists, following Leonardo's tradition."
      },
      {
        id: 'anat-3',
        title: "Anatomy Specialization",
        author: "University of Michigan",
        type: 'course',
        url: "https://www.coursera.org/specializations/anatomy",
        price: "$49/month",
        provider: "Coursera",
        description: "Comprehensive anatomy course with interactive 3D models."
      }
    ]
  },
  {
    id: 'davinci-engineering',
    geniusId: 'leonardo-da-vinci',
    subjectName: 'Mechanical Engineering',
    category: 'science',
    ageStarted: 20,
    ageCompleted: 67,
    difficulty: 'Advanced',
    timeInvestment: '3 hours daily',
    specificTexts: ["Vitruvius", "Archimedes", "Personal experimentation"],
    learningMethod: "Study of ancient engineers combined with practical invention and prototyping.",
    whyItMatters: "Engineering thinking combines creativity with practical problem-solving.",
    resources: [
      {
        id: 'eng-1',
        title: "Leonardo da Vinci's Notebooks",
        author: "Leonardo da Vinci",
        type: 'book',
        url: "https://amazon.com/dp/1579128165",
        price: "$25.00",
        description: "Study the master's own sketches and engineering designs."
      },
      {
        id: 'eng-2',
        title: "The Art of Construction",
        author: "Mario Salvadori",
        type: 'book',
        url: "https://amazon.com/dp/1556520808",
        price: "$19.95",
        description: "Learn structural engineering principles through visual examples."
      }
    ]
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
    whyItMatters: "Geometry develops spatial reasoning and logical proof construction.",
    resources: [
      {
        id: 'geo-1',
        title: "Euclid's Elements",
        author: "Euclid (Green Lion Press edition)",
        type: 'book',
        url: "https://amazon.com/dp/1888009195",
        price: "$24.95",
        description: "The original geometry textbook that trained Newton."
      },
      {
        id: 'geo-2',
        title: "Geometry: A Comprehensive Course",
        author: "Dan Pedoe",
        type: 'book',
        url: "https://amazon.com/dp/0486658120",
        price: "$16.95",
        description: "Dover classic covering Euclidean and projective geometry."
      },
      {
        id: 'geo-3',
        title: "High School Geometry",
        author: "Khan Academy",
        type: 'course',
        url: "https://www.khanacademy.org/math/geometry",
        price: "Free",
        provider: "Khan Academy",
        description: "Complete geometry curriculum with practice problems."
      }
    ]
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
    whyItMatters: "Calculus is fundamental to understanding physics, engineering, and modern science.",
    resources: [
      {
        id: 'calc-1',
        title: "Calculus",
        author: "Michael Spivak",
        type: 'book',
        url: "https://amazon.com/dp/0914098918",
        price: "$95.00",
        description: "Rigorous calculus that builds deep mathematical understanding."
      },
      {
        id: 'calc-2',
        title: "Calculus Made Easy",
        author: "Silvanus Thompson",
        type: 'book',
        url: "https://amazon.com/dp/0312185480",
        price: "$16.99",
        description: "Classic accessible introduction, still relevant after 100+ years."
      },
      {
        id: 'calc-3',
        title: "Single Variable Calculus",
        author: "MIT OpenCourseWare",
        type: 'course',
        url: "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/",
        price: "Free",
        provider: "MIT",
        description: "Full MIT calculus course with lectures, problems, and exams."
      }
    ]
  },
  {
    id: 'newton-physics',
    geniusId: 'isaac-newton',
    subjectName: 'Natural Philosophy (Physics)',
    category: 'science',
    ageStarted: 19,
    ageCompleted: 45,
    difficulty: 'Advanced',
    timeInvestment: '4 hours daily',
    specificTexts: ["Galileo's works", "Kepler's Astronomy", "Original experiments"],
    learningMethod: "Combination of reading prior work and conducting original experiments with prisms, pendulums, etc.",
    whyItMatters: "Physics reveals the fundamental laws governing our universe.",
    resources: [
      {
        id: 'phys-1',
        title: "The Principia",
        author: "Isaac Newton",
        type: 'book',
        url: "https://amazon.com/dp/0520290747",
        price: "$24.95",
        description: "Newton's masterwork—study physics from the source."
      },
      {
        id: 'phys-2',
        title: "The Feynman Lectures on Physics",
        author: "Richard Feynman",
        type: 'book',
        url: "https://www.feynmanlectures.caltech.edu/",
        price: "Free Online",
        description: "The legendary physics course, freely available online."
      },
      {
        id: 'phys-3',
        title: "Classical Mechanics",
        author: "MIT OpenCourseWare",
        type: 'course',
        url: "https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/",
        price: "Free",
        provider: "MIT",
        description: "MIT's introductory physics course with full materials."
      }
    ]
  },
  {
    id: 'newton-optics',
    geniusId: 'isaac-newton',
    subjectName: 'Optics',
    category: 'science',
    ageStarted: 23,
    ageCompleted: 30,
    difficulty: 'Intermediate',
    timeInvestment: '2 hours daily',
    specificTexts: ["Original prism experiments", "Opticks (his own work)"],
    learningMethod: "Hands-on experimentation with light, prisms, and lenses.",
    whyItMatters: "Optics demonstrates the power of experimental method and reveals light's nature.",
    resources: [
      {
        id: 'opt-1',
        title: "Opticks",
        author: "Isaac Newton",
        type: 'book',
        url: "https://amazon.com/dp/1420956671",
        price: "$12.99",
        description: "Newton's accessible masterpiece on light and color."
      },
      {
        id: 'opt-2',
        title: "Optics",
        author: "Eugene Hecht",
        type: 'book',
        url: "https://amazon.com/dp/0133977226",
        price: "$180.00",
        description: "The modern standard textbook for optics."
      }
    ]
  }
];

export const getGeniusById = (id: string): Genius | undefined => {
  return geniuses.find(g => g.id === id);
};

export const getSubjectsByGeniusId = (geniusId: string): Subject[] => {
  return subjects.filter(s => s.geniusId === geniusId);
};

export const getSubjectById = (id: string): Subject | undefined => {
  return subjects.find(s => s.id === id);
};

export const getFreeGeniuses = (): Genius[] => {
  return geniuses.filter(g => !g.isPremium);
};

export const getPremiumGeniuses = (): Genius[] => {
  return geniuses.filter(g => g.isPremium);
};
