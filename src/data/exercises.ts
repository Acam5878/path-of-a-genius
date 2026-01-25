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
  }
];

export const getExercisesByLessonId = (lessonId: string): LessonExercises | undefined => {
  return lessonExercises.find(e => e.lessonId === lessonId);
};
