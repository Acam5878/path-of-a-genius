export interface Work {
  id: string;
  geniusId: string;
  title: string;
  year: number | string;
  description: string;
  impact: string;
  amazonUrl: string;
  coverImage?: string;
}

export const works: Work[] = [
  // John Stuart Mill
  {
    id: 'mill-on-liberty',
    geniusId: 'john-stuart-mill',
    title: 'On Liberty',
    year: 1859,
    description: 'A foundational philosophical work arguing for the protection of individual freedom against societal and governmental tyranny.',
    impact: 'Established the harm principle and became the cornerstone of liberal political philosophy. Its ideas on free speech and individual rights continue to influence legal and political debates worldwide.',
    amazonUrl: 'https://www.amazon.com/dp/0486421309',
  },
  {
    id: 'mill-utilitarianism',
    geniusId: 'john-stuart-mill',
    title: 'Utilitarianism',
    year: 1863,
    description: 'A philosophical defense of utilitarianism as an ethical theory, arguing that actions are right if they promote happiness.',
    impact: 'Refined Bentham\'s utilitarianism by distinguishing between higher and lower pleasures. Remains the most accessible introduction to utilitarian ethics.',
    amazonUrl: 'https://www.amazon.com/dp/087220605X',
  },
  {
    id: 'mill-subjection-women',
    geniusId: 'john-stuart-mill',
    title: 'The Subjection of Women',
    year: 1869,
    description: 'A powerful argument for legal and social equality between the sexes, co-authored with Harriet Taylor Mill.',
    impact: 'A foundational text of the women\'s suffrage movement. Its arguments for gender equality were revolutionary and remain relevant today.',
    amazonUrl: 'https://www.amazon.com/dp/0486296016',
  },
  {
    id: 'mill-system-logic',
    geniusId: 'john-stuart-mill',
    title: 'A System of Logic',
    year: 1843,
    description: 'A comprehensive treatise on the principles of evidence and the methods of scientific investigation.',
    impact: 'Established Mill as a leading philosopher of science. His "Methods of Induction" remain foundational in scientific methodology.',
    amazonUrl: 'https://www.amazon.com/dp/1602063494',
  },

  // Leonardo da Vinci
  {
    id: 'davinci-notebooks',
    geniusId: 'leonardo-da-vinci',
    title: 'The Notebooks of Leonardo da Vinci',
    year: '1478-1519',
    description: 'A collection of his legendary journals containing drawings, scientific diagrams, and observations on art, science, and nature.',
    impact: 'Revealed the mind of history\'s greatest polymath. Contains revolutionary ideas on anatomy, engineering, and art technique centuries ahead of their time.',
    amazonUrl: 'https://www.amazon.com/dp/0486225720',
  },
  {
    id: 'davinci-treatise-painting',
    geniusId: 'leonardo-da-vinci',
    title: 'A Treatise on Painting',
    year: 1651,
    description: 'A compilation of Leonardo\'s writings on the theory and practice of painting, published posthumously.',
    impact: 'Became the foundation of academic art education for centuries. His techniques like sfumato transformed Western painting.',
    amazonUrl: 'https://www.amazon.com/dp/0486441555',
  },

  // Isaac Newton
  {
    id: 'newton-principia',
    geniusId: 'isaac-newton',
    title: 'Principia Mathematica',
    year: 1687,
    description: 'Mathematical Principles of Natural Philosophy—the work that defined classical mechanics and universal gravitation.',
    impact: 'Perhaps the most important scientific book ever written. Unified celestial and terrestrial mechanics and laid the foundation for physics for 200+ years.',
    amazonUrl: 'https://www.amazon.com/dp/0520088174',
  },
  {
    id: 'newton-opticks',
    geniusId: 'isaac-newton',
    title: 'Opticks',
    year: 1704,
    description: 'A treatise on the behavior of light, including experiments with prisms and the nature of color.',
    impact: 'Founded the field of optics and demonstrated that white light is composed of a spectrum of colors. Influenced both physics and art.',
    amazonUrl: 'https://www.amazon.com/dp/1591020956',
  },

  // Marie Curie
  {
    id: 'curie-radioactive-substances',
    geniusId: 'marie-curie',
    title: 'Radioactive Substances',
    year: 1904,
    description: 'Her Nobel Prize-winning doctoral thesis on the properties of radioactive materials.',
    impact: 'Introduced the concept of radioactivity and discovered two new elements (polonium and radium). Revolutionized physics and medicine.',
    amazonUrl: 'https://www.amazon.com/dp/1107615615',
  },
  {
    id: 'curie-pierre-biography',
    geniusId: 'marie-curie',
    title: 'Pierre Curie: With Autobiographical Notes',
    year: 1923,
    description: 'A biography of her husband and scientific partner, with personal reflections on their work together.',
    impact: 'Offers rare insight into the mind of a pioneering woman scientist and the collaborative nature of their groundbreaking research.',
    amazonUrl: 'https://www.amazon.com/dp/0486201996',
  },

  // Nikola Tesla
  {
    id: 'tesla-inventions',
    geniusId: 'nikola-tesla',
    title: 'My Inventions: The Autobiography of Nikola Tesla',
    year: 1919,
    description: 'Tesla\'s own account of his life, methods of invention, and visionary ideas for the future.',
    impact: 'Reveals the creative process of one of history\'s greatest inventors. His predictions about wireless technology proved remarkably accurate.',
    amazonUrl: 'https://www.amazon.com/dp/1614270147',
  },
  {
    id: 'tesla-lectures',
    geniusId: 'nikola-tesla',
    title: 'The Inventions, Researches and Writings of Nikola Tesla',
    year: 1894,
    description: 'A comprehensive collection of Tesla\'s patents, lectures, and technical writings on alternating current and wireless transmission.',
    impact: 'Documents the technical genius behind modern electrical systems. Essential for understanding the AC revolution.',
    amazonUrl: 'https://www.amazon.com/dp/1491095490',
  },

  // Albert Einstein
  {
    id: 'einstein-relativity',
    geniusId: 'albert-einstein',
    title: 'Relativity: The Special and General Theory',
    year: 1916,
    description: 'Einstein\'s own accessible explanation of his revolutionary theories of special and general relativity.',
    impact: 'Made relativity comprehensible to non-physicists. Changed our understanding of space, time, gravity, and the universe itself.',
    amazonUrl: 'https://www.amazon.com/dp/0486417149',
  },
  {
    id: 'einstein-physics',
    geniusId: 'albert-einstein',
    title: 'The Evolution of Physics',
    year: 1938,
    description: 'Co-authored with Leopold Infeld, a popular science book tracing the development of physical ideas from early concepts to relativity.',
    impact: 'One of the best popular science books ever written. Shows Einstein\'s gift for explaining complex ideas simply.',
    amazonUrl: 'https://www.amazon.com/dp/0671201565',
  },

  // Aristotle
  {
    id: 'aristotle-ethics',
    geniusId: 'aristotle',
    title: 'Nicomachean Ethics',
    year: '-350',
    description: 'The foundational work on virtue ethics, examining the nature of happiness and moral character.',
    impact: 'The most influential work in Western ethics. Its concept of eudaimonia (flourishing) remains central to moral philosophy.',
    amazonUrl: 'https://www.amazon.com/dp/0199213615',
  },
  {
    id: 'aristotle-politics',
    geniusId: 'aristotle',
    title: 'Politics',
    year: '-350',
    description: 'A systematic examination of the state, citizenship, and the best forms of government.',
    impact: 'Founded political science as a discipline. Influenced every major political philosopher from Aquinas to the American founders.',
    amazonUrl: 'https://www.amazon.com/dp/0199538735',
  },
  {
    id: 'aristotle-metaphysics',
    geniusId: 'aristotle',
    title: 'Metaphysics',
    year: '-350',
    description: 'Investigations into the nature of being, causation, and first principles.',
    impact: 'Defined metaphysics as a field of inquiry. His concepts of substance, form, and actuality shaped philosophy for millennia.',
    amazonUrl: 'https://www.amazon.com/dp/0140446192',
  },

  // Blaise Pascal
  {
    id: 'pascal-pensees',
    geniusId: 'blaise-pascal',
    title: 'Pensées',
    year: 1670,
    description: 'A collection of fragments on religion, philosophy, and human nature, published posthumously.',
    impact: 'Contains the famous "Pascal\'s Wager" and profound meditations on faith and reason. A masterpiece of French literature.',
    amazonUrl: 'https://www.amazon.com/dp/0140446451',
  },
  {
    id: 'pascal-provincial-letters',
    geniusId: 'blaise-pascal',
    title: 'The Provincial Letters',
    year: 1657,
    description: 'A series of satirical letters attacking Jesuit moral theology and casuistry.',
    impact: 'A landmark in polemical writing and French prose. Voltaire called them "the first book of genius in prose."',
    amazonUrl: 'https://www.amazon.com/dp/0872206912',
  },

  // Gottfried Leibniz
  {
    id: 'leibniz-monadology',
    geniusId: 'gottfried-leibniz',
    title: 'Monadology',
    year: 1714,
    description: 'A compact exposition of Leibniz\'s mature metaphysical system based on simple substances called monads.',
    impact: 'Offered a competing worldview to Newtonian mechanics. Influenced German idealism and modern logic.',
    amazonUrl: 'https://www.amazon.com/dp/0822602105',
  },
  {
    id: 'leibniz-new-essays',
    geniusId: 'gottfried-leibniz',
    title: 'New Essays on Human Understanding',
    year: 1765,
    description: 'A detailed response to Locke\'s Essay, defending innate ideas and rationalist epistemology.',
    impact: 'One of the great works of rationalist philosophy. His critique of empiricism influenced Kant\'s critical philosophy.',
    amazonUrl: 'https://www.amazon.com/dp/0521576601',
  },

  // Goethe
  {
    id: 'goethe-faust',
    geniusId: 'goethe',
    title: 'Faust',
    year: '1808/1832',
    description: 'The legendary drama of a scholar who makes a pact with the devil in search of knowledge and experience.',
    impact: 'Considered the greatest work of German literature. The "Faust" archetype has influenced countless works across all art forms.',
    amazonUrl: 'https://www.amazon.com/dp/0140449019',
  },
  {
    id: 'goethe-sorrows-werther',
    geniusId: 'goethe',
    title: 'The Sorrows of Young Werther',
    year: 1774,
    description: 'An epistolary novel about unrequited love that sparked the Romantic movement.',
    impact: 'Caused a cultural phenomenon across Europe. Napoleon claimed to have read it seven times.',
    amazonUrl: 'https://www.amazon.com/dp/0812969901',
  },
  {
    id: 'goethe-theory-colors',
    geniusId: 'goethe',
    title: 'Theory of Colours',
    year: 1810,
    description: 'Goethe\'s systematic study of color perception and its psychological effects.',
    impact: 'Though scientifically superseded, it influenced artists, designers, and philosophers including Wittgenstein and Kandinsky.',
    amazonUrl: 'https://www.amazon.com/dp/0262570211',
  },
];

export const getWorksByGeniusId = (geniusId: string): Work[] => {
  return works.filter(work => work.geniusId === geniusId);
};
