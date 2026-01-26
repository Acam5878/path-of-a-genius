// Exercise types and data for each lesson

export interface Exercise {
  id: string;
  type: 'fill-blank' | 'matching' | 'ordering' | 'short-answer';
  instruction: string;
  content: string;
  answer: string;
  hint?: string;
}

export interface LessonExercises {
  lessonId: string;
  exercises: Exercise[];
}

export const lessonExercises: LessonExercises[] = [
  // Mill's Greek Lessons
  {
    lessonId: 'mill-greek-1',
    exercises: [
      {
        id: 'mill-greek-1-ex1',
        type: 'fill-blank',
        instruction: 'Fill in the missing Greek letter name:',
        content: 'The letter Θ is called _____ and sounds like "th" in "think".',
        answer: 'Theta',
        hint: 'It sounds like the "th" in "thick"'
      },
      {
        id: 'mill-greek-1-ex2',
        type: 'fill-blank',
        instruction: 'Complete the statement:',
        content: 'The Greek alphabet has _____ letters in total.',
        answer: '24',
        hint: 'More than 20 but less than 30'
      },
      {
        id: 'mill-greek-1-ex3',
        type: 'short-answer',
        instruction: 'Answer the question:',
        content: 'Which Greek letter changes form at the end of words?',
        answer: 'Sigma',
        hint: 'It becomes ς at word endings'
      }
    ]
  },
  {
    lessonId: 'mill-greek-2',
    exercises: [
      {
        id: 'mill-greek-2-ex1',
        type: 'fill-blank',
        instruction: 'Translate to English:',
        content: 'ἀλώπηξ means _____ in English.',
        answer: 'fox',
        hint: 'A clever red animal'
      },
      {
        id: 'mill-greek-2-ex2',
        type: 'short-answer',
        instruction: 'Answer the question:',
        content: 'What is the moral of "The Fox and the Grapes"?',
        answer: 'It is easy to despise what you cannot have',
        hint: 'Think about sour grapes...'
      }
    ]
  },
  {
    lessonId: 'mill-greek-3',
    exercises: [
      {
        id: 'mill-greek-3-ex1',
        type: 'fill-blank',
        instruction: 'Complete the statement:',
        content: 'Greek has _____ grammatical cases.',
        answer: 'five',
        hint: 'Nominative, Genitive, Dative, Accusative, and Vocative'
      },
      {
        id: 'mill-greek-3-ex2',
        type: 'fill-blank',
        instruction: 'Identify the article:',
        content: 'The feminine singular nominative article for "the" is _____.',
        answer: 'ἡ',
        hint: 'Different from ὁ (masculine) and τό (neuter)'
      }
    ]
  },
  // Mill's Logic Lessons
  {
    lessonId: 'mill-logic-1',
    exercises: [
      {
        id: 'mill-logic-1-ex1',
        type: 'fill-blank',
        instruction: 'State the law:',
        content: 'The Law of _____ states that A = A.',
        answer: 'Identity',
        hint: 'A thing is what it is'
      },
      {
        id: 'mill-logic-1-ex2',
        type: 'short-answer',
        instruction: 'Apply the Law of Non-Contradiction:',
        content: 'Can a cat be both alive and not alive at the same time?',
        answer: 'No',
        hint: 'Nothing can be both A and not-A simultaneously'
      }
    ]
  },
  {
    lessonId: 'mill-logic-2',
    exercises: [
      {
        id: 'mill-logic-2-ex1',
        type: 'fill-blank',
        instruction: 'Complete the syllogism:',
        content: 'All men are mortal. Socrates is a man. Therefore, Socrates is _____.',
        answer: 'mortal',
        hint: 'What follows logically?'
      },
      {
        id: 'mill-logic-2-ex2',
        type: 'fill-blank',
        instruction: 'Identify the term:',
        content: 'The _____ term connects the two premises but does not appear in the conclusion.',
        answer: 'middle',
        hint: 'It links the major and minor premises'
      }
    ]
  },
  {
    lessonId: 'mill-logic-3',
    exercises: [
      {
        id: 'mill-logic-3-ex1',
        type: 'short-answer',
        instruction: 'Identify the fallacy:',
        content: '"You can\'t trust his argument—he\'s a politician!" This is an example of which fallacy?',
        answer: 'Ad Hominem',
        hint: 'Attacking the person, not the argument'
      },
      {
        id: 'mill-logic-3-ex2',
        type: 'fill-blank',
        instruction: 'Name the fallacy:',
        content: '"You\'re either with us or against us" is an example of a _____ fallacy.',
        answer: 'False Dilemma',
        hint: 'Only two options presented when more exist'
      }
    ]
  },
  // Einstein Physics
  {
    lessonId: 'einstein-phys-1',
    exercises: [
      {
        id: 'einstein-phys-1-ex1',
        type: 'fill-blank',
        instruction: 'Complete the statement:',
        content: 'The speed of _____ is constant for all observers.',
        answer: 'light',
        hint: 'About 300,000 km/s'
      },
      {
        id: 'einstein-phys-1-ex2',
        type: 'short-answer',
        instruction: 'Answer the question:',
        content: 'What happens to time as you approach the speed of light?',
        answer: 'It slows down',
        hint: 'Time dilation...'
      }
    ]
  },
  {
    lessonId: 'einstein-phys-2',
    exercises: [
      {
        id: 'einstein-phys-2-ex1',
        type: 'fill-blank',
        instruction: 'Complete the famous equation:',
        content: 'E = mc___',
        answer: '²',
        hint: 'Energy equals mass times the speed of light...'
      },
      {
        id: 'einstein-phys-2-ex2',
        type: 'short-answer',
        instruction: 'Explain:',
        content: 'What does E = mc² tell us about mass and energy?',
        answer: 'They are equivalent',
        hint: 'Mass can be converted to energy and vice versa'
      }
    ]
  },
  // Curie Chemistry
  {
    lessonId: 'curie-chem-1',
    exercises: [
      {
        id: 'curie-chem-1-ex1',
        type: 'fill-blank',
        instruction: 'Complete the statement:',
        content: 'The atomic number equals the number of _____ in an atom.',
        answer: 'protons',
        hint: 'Positively charged particles in the nucleus'
      },
      {
        id: 'curie-chem-1-ex2',
        type: 'short-answer',
        instruction: 'Answer the question:',
        content: 'Which element did Curie name after her homeland Poland?',
        answer: 'Polonium',
        hint: 'Named in 1898'
      }
    ]
  },
  // Tesla Electricity
  {
    lessonId: 'tesla-elec-1',
    exercises: [
      {
        id: 'tesla-elec-1-ex1',
        type: 'fill-blank',
        instruction: 'State Ohm\'s Law:',
        content: 'V = I × _____',
        answer: 'R',
        hint: 'Resistance is measured in Ohms'
      },
      {
        id: 'tesla-elec-1-ex2',
        type: 'fill-blank',
        instruction: 'Complete the statement:',
        content: 'Current is measured in _____ (A).',
        answer: 'Amperes',
        hint: 'Named after André-Marie Ampère'
      }
    ]
  },
  {
    lessonId: 'tesla-elec-2',
    exercises: [
      {
        id: 'tesla-elec-2-ex1',
        type: 'short-answer',
        instruction: 'Answer the question:',
        content: 'Which type of current did Tesla champion: AC or DC?',
        answer: 'AC',
        hint: 'Alternating Current'
      },
      {
        id: 'tesla-elec-2-ex2',
        type: 'fill-blank',
        instruction: 'Complete the statement:',
        content: '_____ allow AC voltage to be stepped up or down efficiently.',
        answer: 'Transformers',
        hint: 'They only work with alternating current'
      }
    ]
  },
  // Aristotle Logic
  {
    lessonId: 'aristotle-log-1',
    exercises: [
      {
        id: 'aristotle-log-1-ex1',
        type: 'fill-blank',
        instruction: 'Complete the statement:',
        content: 'Aristotle identified _____ categories of being.',
        answer: '10',
        hint: 'Ten types of things that can be said about existence'
      },
      {
        id: 'aristotle-log-1-ex2',
        type: 'short-answer',
        instruction: 'Answer the question:',
        content: 'Which category is primary—the one that tells us WHAT something is?',
        answer: 'Substance',
        hint: 'οὐσία in Greek'
      }
    ]
  },
  // Pascal Probability
  {
    lessonId: 'pascal-prob-1',
    exercises: [
      {
        id: 'pascal-prob-1-ex1',
        type: 'fill-blank',
        instruction: 'Complete the statement:',
        content: 'Pascal\'s _____ gives the binomial coefficients.',
        answer: 'Triangle',
        hint: 'Each number is the sum of the two above'
      },
      {
        id: 'pascal-prob-1-ex2',
        type: 'short-answer',
        instruction: 'Answer the question:',
        content: 'Who was Pascal\'s correspondent on probability?',
        answer: 'Fermat',
        hint: 'Pierre de _____'
      }
    ]
  },
  // Leibniz Calculus
  {
    lessonId: 'leibniz-calc-1',
    exercises: [
      {
        id: 'leibniz-calc-1-ex1',
        type: 'fill-blank',
        instruction: 'Identify the notation:',
        content: 'Leibniz used _____ to denote the derivative.',
        answer: 'dy/dx',
        hint: 'Looks like a fraction'
      },
      {
        id: 'leibniz-calc-1-ex2',
        type: 'fill-blank',
        instruction: 'Complete the statement:',
        content: 'The integral sign ∫ was invented by _____.',
        answer: 'Leibniz',
        hint: 'Not Newton!'
      }
    ]
  },
  // Goethe Literature
  {
    lessonId: 'goethe-lit-1',
    exercises: [
      {
        id: 'goethe-lit-1-ex1',
        type: 'fill-blank',
        instruction: 'Complete the statement:',
        content: 'Faust makes a deal with _____, the devil.',
        answer: 'Mephistopheles',
        hint: 'Also known as Mephisto'
      },
      {
        id: 'goethe-lit-1-ex2',
        type: 'short-answer',
        instruction: 'Answer the question:',
        content: 'Is Faust ultimately saved or damned at the end of the story?',
        answer: 'Saved',
        hint: 'Through striving, not perfection'
      }
    ]
  },
  // Da Vinci Drawing Lessons
  {
    lessonId: 'davinci-draw-1',
    exercises: [
      {
        id: 'davinci-draw-1-ex1',
        type: 'fill-blank',
        instruction: 'Complete the statement:',
        content: 'In contour drawing, you look only at the _____, not at your paper.',
        answer: 'object',
        hint: 'Focus on what you are drawing, not your hand'
      },
      {
        id: 'davinci-draw-1-ex2',
        type: 'short-answer',
        instruction: 'Answer the question:',
        content: 'What is "negative space" in drawing?',
        answer: 'The shapes around and between objects',
        hint: 'It\'s not the object itself...'
      }
    ]
  },
  {
    lessonId: 'davinci-draw-2',
    exercises: [
      {
        id: 'davinci-draw-2-ex1',
        type: 'fill-blank',
        instruction: 'List the four fundamental forms:',
        content: 'All objects can be broken down into: sphere, _____, cube, and cone.',
        answer: 'cylinder',
        hint: 'Think of arms, legs, tree trunks...'
      },
      {
        id: 'davinci-draw-2-ex2',
        type: 'short-answer',
        instruction: 'Answer the question:',
        content: 'What is "core shadow" on a sphere?',
        answer: 'The darkest part of the object itself',
        hint: 'Not the cast shadow on the table...'
      }
    ]
  },
  {
    lessonId: 'davinci-draw-3',
    exercises: [
      {
        id: 'davinci-draw-3-ex1',
        type: 'fill-blank',
        instruction: 'Complete the proportion:',
        content: 'The idealized human body is approximately _____ heads tall.',
        answer: '8',
        hint: 'Use the head as a unit of measurement'
      },
      {
        id: 'davinci-draw-3-ex2',
        type: 'fill-blank',
        instruction: 'State the proportion:',
        content: 'In the Vitruvian Man, arm span equals _____.',
        answer: 'height',
        hint: 'It forms a perfect square'
      }
    ]
  },
  {
    lessonId: 'davinci-draw-4',
    exercises: [
      {
        id: 'davinci-draw-4-ex1',
        type: 'fill-blank',
        instruction: 'Define the technique:',
        content: 'Sfumato means "vanished like _____".',
        answer: 'smoke',
        hint: 'Think of something that fades gradually'
      },
      {
        id: 'davinci-draw-4-ex2',
        type: 'short-answer',
        instruction: 'Answer the question:',
        content: 'How many layers did Leonardo use on faces in his paintings?',
        answer: '20-30 layers',
        hint: 'He was very patient with glazes'
      }
    ]
  },
  // Newton Calculus Lessons
  {
    lessonId: 'newton-calc-1',
    exercises: [
      {
        id: 'newton-calc-1-ex1',
        type: 'fill-blank',
        instruction: 'Name the branch:',
        content: '_____ calculus deals with rates of change (derivatives).',
        answer: 'Differential',
        hint: 'It\'s about differences between values'
      },
      {
        id: 'newton-calc-1-ex2',
        type: 'short-answer',
        instruction: 'Answer the question:',
        content: 'If velocity is the derivative of position, what is the derivative of velocity?',
        answer: 'Acceleration',
        hint: 'How fast is velocity changing?'
      }
    ]
  },
  {
    lessonId: 'newton-calc-2',
    exercises: [
      {
        id: 'newton-calc-2-ex1',
        type: 'fill-blank',
        instruction: 'Evaluate the limit:',
        content: 'lim(x→3) (x + 2) = _____',
        answer: '5',
        hint: 'Just substitute x = 3'
      },
      {
        id: 'newton-calc-2-ex2',
        type: 'fill-blank',
        instruction: 'Complete the famous limit:',
        content: 'lim(x→0) sin(x)/x = _____',
        answer: '1',
        hint: 'This fundamental limit equals exactly 1'
      }
    ]
  },
  {
    lessonId: 'newton-calc-3',
    exercises: [
      {
        id: 'newton-calc-3-ex1',
        type: 'fill-blank',
        instruction: 'Apply the power rule:',
        content: 'd/dx(x³) = _____',
        answer: '3x²',
        hint: 'Bring down the exponent, reduce by 1'
      },
      {
        id: 'newton-calc-3-ex2',
        type: 'fill-blank',
        instruction: 'Find the derivative:',
        content: 'If f(x) = 5x², then f\'(x) = _____',
        answer: '10x',
        hint: '5 × 2 = 10, and reduce the exponent by 1'
      }
    ]
  },
  {
    lessonId: 'newton-calc-4',
    exercises: [
      {
        id: 'newton-calc-4-ex1',
        type: 'fill-blank',
        instruction: 'Apply the power rule for integration:',
        content: '∫x² dx = _____ + C',
        answer: 'x³/3',
        hint: 'Add 1 to exponent, divide by new exponent'
      },
      {
        id: 'newton-calc-4-ex2',
        type: 'short-answer',
        instruction: 'Answer the question:',
        content: 'Why do we add "+ C" to indefinite integrals?',
        answer: 'Many functions have the same derivative',
        hint: 'The derivative of x² + 5 and x² + 100 are both 2x'
      }
    ]
  },
  // Newton Physics Lessons
  {
    lessonId: 'newton-phys-1',
    exercises: [
      {
        id: 'newton-phys-1-ex1',
        type: 'fill-blank',
        instruction: 'Define the term:',
        content: '_____ is the tendency of objects to resist changes in motion.',
        answer: 'Inertia',
        hint: 'More mass means more of this property'
      },
      {
        id: 'newton-phys-1-ex2',
        type: 'short-answer',
        instruction: 'Answer the question:',
        content: 'Why do objects appear to naturally stop on Earth?',
        answer: 'Friction and air resistance',
        hint: 'In space, things keep moving forever'
      }
    ]
  },
  {
    lessonId: 'newton-phys-2',
    exercises: [
      {
        id: 'newton-phys-2-ex1',
        type: 'fill-blank',
        instruction: 'State the law:',
        content: 'F = m × _____',
        answer: 'a',
        hint: 'Force equals mass times...'
      },
      {
        id: 'newton-phys-2-ex2',
        type: 'fill-blank',
        instruction: 'Calculate:',
        content: 'If F = 20 N and m = 4 kg, then a = _____ m/s²',
        answer: '5',
        hint: 'a = F/m = 20/4'
      }
    ]
  },
  {
    lessonId: 'newton-phys-3',
    exercises: [
      {
        id: 'newton-phys-3-ex1',
        type: 'fill-blank',
        instruction: 'Complete the law:',
        content: 'For every action, there is an equal and _____ reaction.',
        answer: 'opposite',
        hint: 'The forces point in different directions'
      },
      {
        id: 'newton-phys-3-ex2',
        type: 'short-answer',
        instruction: 'Answer the question:',
        content: 'How do rockets work in the vacuum of space?',
        answer: 'They push exhaust down, exhaust pushes them up',
        hint: 'Action-reaction pairs act on different objects'
      }
    ]
  },
  {
    lessonId: 'newton-phys-4',
    exercises: [
      {
        id: 'newton-phys-4-ex1',
        type: 'fill-blank',
        instruction: 'Complete the equation:',
        content: 'F = G(m₁m₂)/r_____',
        answer: '²',
        hint: 'Inverse SQUARE law'
      },
      {
        id: 'newton-phys-4-ex2',
        type: 'short-answer',
        instruction: 'Answer the question:',
        content: 'Why doesn\'t the Moon fall to Earth?',
        answer: 'It IS falling, but moving sideways fast enough to miss',
        hint: 'Orbit = perpetual falling around Earth'
      }
    ]
  },
  // Newton Geometry Lessons
  {
    lessonId: 'newton-geo-1',
    exercises: [
      {
        id: 'newton-geo-1-ex1',
        type: 'fill-blank',
        instruction: 'State the theorem:',
        content: 'In a right triangle: a² + b² = _____',
        answer: 'c²',
        hint: 'The Pythagorean theorem'
      },
      {
        id: 'newton-geo-1-ex2',
        type: 'fill-blank',
        instruction: 'Complete Euclid\'s postulate:',
        content: 'A straight line can be drawn between any _____ points.',
        answer: 'two',
        hint: 'The first postulate'
      }
    ]
  },
  {
    lessonId: 'newton-geo-2',
    exercises: [
      {
        id: 'newton-geo-2-ex1',
        type: 'fill-blank',
        instruction: 'Name the criterion:',
        content: 'If two sides and the included angle match, the triangles are congruent by _____.',
        answer: 'SAS',
        hint: 'Side-Angle-Side'
      },
      {
        id: 'newton-geo-2-ex2',
        type: 'short-answer',
        instruction: 'Answer the question:',
        content: 'Does AAA (Angle-Angle-Angle) prove triangles are congruent?',
        answer: 'No, only similar',
        hint: 'Same shape, but possibly different size'
      }
    ]
  },
  {
    lessonId: 'newton-geo-3',
    exercises: [
      {
        id: 'newton-geo-3-ex1',
        type: 'fill-blank',
        instruction: 'State the theorem:',
        content: 'A tangent line is _____ to the radius at the point of contact.',
        answer: 'perpendicular',
        hint: 'Forms a 90° angle'
      },
      {
        id: 'newton-geo-3-ex2',
        type: 'fill-blank',
        instruction: 'Complete Thales\' theorem:',
        content: 'An angle inscribed in a semicircle is always _____ degrees.',
        answer: '90',
        hint: 'A right angle'
      }
    ]
  },
  // Mill Latin Lessons
  {
    lessonId: 'mill-latin-1',
    exercises: [
      {
        id: 'mill-latin-1-ex1',
        type: 'fill-blank',
        instruction: 'Pronounce correctly:',
        content: 'In classical Latin, the letter C is always pronounced like _____.',
        answer: 'K',
        hint: 'Caesar = KAI-sar'
      },
      {
        id: 'mill-latin-1-ex2',
        type: 'fill-blank',
        instruction: 'Pronounce the diphthong:',
        content: 'The Latin diphthong AE sounds like "_____".',
        answer: 'eye',
        hint: 'As in Caesar = KAI-sar'
      }
    ]
  },
  {
    lessonId: 'mill-latin-2',
    exercises: [
      {
        id: 'mill-latin-2-ex1',
        type: 'fill-blank',
        instruction: 'Decline the noun:',
        content: 'The genitive singular of "puella" (girl) is _____.',
        answer: 'puellae',
        hint: 'First declension genitive ends in -ae'
      },
      {
        id: 'mill-latin-2-ex2',
        type: 'short-answer',
        instruction: 'Translate:',
        content: 'What does "aqua" mean?',
        answer: 'water',
        hint: 'Think aquarium, aquatic...'
      }
    ]
  },
  // Mill Political Economy (additional)
  {
    lessonId: 'mill-econ-2',
    exercises: [
      {
        id: 'mill-econ-2-ex1',
        type: 'fill-blank',
        instruction: 'Complete the relationship:',
        content: 'When demand increases, price _____.',
        answer: 'rises',
        hint: 'More people want it = higher price'
      },
      {
        id: 'mill-econ-2-ex2',
        type: 'short-answer',
        instruction: 'Explain the paradox:',
        content: 'Why do diamonds cost more than water despite water being essential?',
        answer: 'Marginal utility - water is abundant',
        hint: 'The next glass of water has little extra value'
      }
    ]
  },
  {
    lessonId: 'mill-econ-3',
    exercises: [
      {
        id: 'mill-econ-3-ex1',
        type: 'fill-blank',
        instruction: 'Define the principle:',
        content: 'Utilitarianism: maximize the greatest _____ for the greatest number.',
        answer: 'happiness',
        hint: 'Also called "the good"'
      },
      {
        id: 'mill-econ-3-ex2',
        type: 'short-answer',
        instruction: 'Answer the question:',
        content: 'How did Mill differ from Bentham on pleasures?',
        answer: 'Quality matters, not just quantity',
        hint: 'Higher vs lower pleasures'
      }
    ]
  },
  // Curie Chemistry (additional)
  {
    lessonId: 'curie-chem-2',
    exercises: [
      {
        id: 'curie-chem-2-ex1',
        type: 'fill-blank',
        instruction: 'Complete the equation:',
        content: 'N(t) = N₀ × (1/2)^(t/___)',
        answer: 'T½',
        hint: 'Half-life is in the exponent denominator'
      },
      {
        id: 'curie-chem-2-ex2',
        type: 'short-answer',
        instruction: 'Answer the question:',
        content: 'What is the half-life of Carbon-14?',
        answer: '5,730 years',
        hint: 'Used for archaeological dating'
      }
    ]
  },
  // Aristotle Logic (additional)
  {
    lessonId: 'aristotle-log-2',
    exercises: [
      {
        id: 'aristotle-log-2-ex1',
        type: 'fill-blank',
        instruction: 'Complete the syllogism:',
        content: 'All men are mortal. Socrates is a man. Therefore, Socrates is _____.',
        answer: 'mortal',
        hint: 'The classic example'
      },
      {
        id: 'aristotle-log-2-ex2',
        type: 'short-answer',
        instruction: 'Answer the question:',
        content: 'What figure of syllogism is Barbara?',
        answer: 'Figure 1',
        hint: 'AAA in Figure 1'
      }
    ]
  },
  // Pascal Probability (additional)
  {
    lessonId: 'pascal-prob-2',
    exercises: [
      {
        id: 'pascal-prob-2-ex1',
        type: 'fill-blank',
        instruction: 'Calculate:',
        content: 'The probability of rolling a 6 on a fair die is 1/_____.',
        answer: '6',
        hint: 'Six equally likely outcomes'
      },
      {
        id: 'pascal-prob-2-ex2',
        type: 'fill-blank',
        instruction: 'Apply the addition rule:',
        content: 'P(A or B) = P(A) + P(B) - P(A _____ B)',
        answer: 'and',
        hint: 'Subtract the overlap to avoid double counting'
      }
    ]
  },
  // Leibniz Calculus (additional)
  {
    lessonId: 'leibniz-calc-2',
    exercises: [
      {
        id: 'leibniz-calc-2-ex1',
        type: 'fill-blank',
        instruction: 'Apply the power rule:',
        content: 'd/dx(x⁴) = _____',
        answer: '4x³',
        hint: 'Bring down the 4, reduce exponent by 1'
      },
      {
        id: 'leibniz-calc-2-ex2',
        type: 'fill-blank',
        instruction: 'Find the derivative:',
        content: 'If y = 3x² + 2x, then dy/dx = _____',
        answer: '6x + 2',
        hint: 'Apply power rule to each term'
      }
    ]
  },
  // Goethe Literature (additional)
  {
    lessonId: 'goethe-lit-2',
    exercises: [
      {
        id: 'goethe-lit-2-ex1',
        type: 'fill-blank',
        instruction: 'Identify the work:',
        content: 'The Sorrows of Young _____ caused a wave of copycat suicides in 18th century Europe.',
        answer: 'Werther',
        hint: 'Goethe\'s most controversial novel'
      },
      {
        id: 'goethe-lit-2-ex2',
        type: 'short-answer',
        instruction: 'Answer the question:',
        content: 'What is Sturm und Drang?',
        answer: 'Storm and Stress - a German literary movement emphasizing emotion',
        hint: 'Goethe was a key figure in this movement'
      }
    ]
  },
  // Einstein Physics (additional)
  {
    lessonId: 'einstein-phys-3',
    exercises: [
      {
        id: 'einstein-phys-3-ex1',
        type: 'fill-blank',
        instruction: 'Complete the statement:',
        content: 'Time _____ occurs when moving at high speeds relative to an observer.',
        answer: 'dilation',
        hint: 'Time appears to slow down'
      },
      {
        id: 'einstein-phys-3-ex2',
        type: 'fill-blank',
        instruction: 'State the effect:',
        content: 'Length _____ makes objects appear shorter in the direction of motion.',
        answer: 'contraction',
        hint: 'The opposite of dilation for length'
      }
    ]
  }
];

export const getExercisesByLessonId = (lessonId: string): LessonExercises | undefined => {
  return lessonExercises.find(e => e.lessonId === lessonId);
};
