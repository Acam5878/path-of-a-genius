// Interactive exercises specifically for The Path curriculum lessons
// These complement the text-based PathExercise items with hands-on components

import { InteractiveExercise } from './interactiveExercises';

export const pathInteractiveExercises: InteractiveExercise[] = [
  // ========== ANCIENT GREEK ==========
  {
    lessonId: 'greek-alphabet',
    matching: {
      instruction: 'Match each Greek letter to its English sound:',
      pairs: [
        { id: 'a', left: 'Α α (Alpha)', right: 'ah — as in "father"' },
        { id: 'b', left: 'Β β (Beta)', right: 'b — as in "boy"' },
        { id: 'g', left: 'Γ γ (Gamma)', right: 'g — as in "go"' },
        { id: 'd', left: 'Δ δ (Delta)', right: 'd — as in "dog"' },
        { id: 'th', left: 'Θ θ (Theta)', right: 'th — as in "think"' },
      ]
    },
    ordering: {
      instruction: 'Put these Greek letters in alphabetical order:',
      items: [
        { id: '1', content: 'Alpha (Α)', correctPosition: 1 },
        { id: '2', content: 'Beta (Β)', correctPosition: 2 },
        { id: '3', content: 'Gamma (Γ)', correctPosition: 3 },
        { id: '4', content: 'Delta (Δ)', correctPosition: 4 },
        { id: '5', content: 'Epsilon (Ε)', correctPosition: 5 },
      ]
    }
  },
  {
    lessonId: 'greek-nouns-50',
    matching: {
      instruction: 'Match the Greek noun to its English meaning:',
      pairs: [
        { id: '1', left: 'ἄνθρωπος (anthropos)', right: 'human, person' },
        { id: '2', left: 'λόγος (logos)', right: 'word, reason' },
        { id: '3', left: 'θεός (theos)', right: 'god, deity' },
        { id: '4', left: 'κόσμος (kosmos)', right: 'world, order' },
        { id: '5', left: 'ψυχή (psyche)', right: 'soul, mind' },
      ]
    },
    stepByStep: {
      title: 'English Derivatives',
      problem: 'Identify the Greek root in these English words:',
      steps: [
        { id: '1', instruction: 'The word "anthropology" comes from the Greek word meaning "human": _____', expectedAnswer: 'anthropos', acceptableAnswers: ['ἄνθρωπος', 'anthropos'] },
        { id: '2', instruction: 'The word "psychology" comes from the Greek word meaning "soul/mind": _____', expectedAnswer: 'psyche', acceptableAnswers: ['ψυχή', 'psyche'] },
        { id: '3', instruction: 'The word "theology" comes from the Greek word meaning "god": _____', expectedAnswer: 'theos', acceptableAnswers: ['θεός', 'theos'] },
        { id: '4', instruction: 'The word "cosmopolitan" comes from the Greek word meaning "world": _____', expectedAnswer: 'kosmos', acceptableAnswers: ['κόσμος', 'kosmos'] },
      ]
    }
  },
  {
    lessonId: 'greek-verbs-50',
    matching: {
      instruction: 'Match the Greek verb to its English meaning:',
      pairs: [
        { id: '1', left: 'γράφω (grapho)', right: 'to write' },
        { id: '2', left: 'λέγω (lego)', right: 'to say, speak' },
        { id: '3', left: 'ἀκούω (akouo)', right: 'to hear' },
        { id: '4', left: 'διδάσκω (didasko)', right: 'to teach' },
        { id: '5', left: 'μανθάνω (manthano)', right: 'to learn' },
      ]
    }
  },
  {
    lessonId: 'greek-articles-cases',
    matching: {
      instruction: 'Match the Greek case to its function:',
      pairs: [
        { id: '1', left: 'Nominative', right: 'Subject — "the man runs"' },
        { id: '2', left: 'Genitive', right: 'Possession — "of the man"' },
        { id: '3', left: 'Dative', right: 'Indirect object — "to the man"' },
        { id: '4', left: 'Accusative', right: 'Direct object — "I see the man"' },
        { id: '5', left: 'Vocative', right: 'Address — "O man!"' },
      ]
    },
    ordering: {
      instruction: 'Order the Greek cases in their traditional sequence:',
      items: [
        { id: '1', content: 'Nominative (Subject)', correctPosition: 1 },
        { id: '2', content: 'Genitive (Possession)', correctPosition: 2 },
        { id: '3', content: 'Dative (Indirect object)', correctPosition: 3 },
        { id: '4', content: 'Accusative (Direct object)', correctPosition: 4 },
        { id: '5', content: 'Vocative (Address)', correctPosition: 5 },
      ]
    }
  },

  // ========== LOGIC ==========
  {
    lessonId: 'logic-three-laws',
    matching: {
      instruction: 'Match each law of thought to its principle:',
      pairs: [
        { id: '1', left: 'Law of Identity', right: 'A = A (a thing is what it is)' },
        { id: '2', left: 'Law of Non-Contradiction', right: 'Nothing can be A and not-A simultaneously' },
        { id: '3', left: 'Law of Excluded Middle', right: 'Everything is either A or not-A' },
      ]
    },
    stepByStep: {
      title: 'Identify the Violated Law',
      problem: 'Which law of thought is violated in each statement?',
      steps: [
        { id: '1', instruction: '"This statement is false" violates the Law of _____', hint: 'If it\'s true, then it\'s false... and vice versa', expectedAnswer: 'Non-Contradiction', acceptableAnswers: ['non-contradiction', 'non contradiction'] },
        { id: '2', instruction: '"A triangle has four sides" violates the Law of _____', hint: 'A triangle IS a three-sided figure', expectedAnswer: 'Identity', acceptableAnswers: ['identity'] },
        { id: '3', instruction: '"The cat is partly alive and partly dead" (in classical logic) violates the Law of _____', hint: 'Classical logic says it must be one or the other', expectedAnswer: 'Excluded Middle', acceptableAnswers: ['excluded middle'] },
      ]
    }
  },
  {
    lessonId: 'logic-syllogisms',
    matching: {
      instruction: 'Match each syllogism term to its definition:',
      pairs: [
        { id: '1', left: 'Major Premise', right: 'General statement (All men are mortal)' },
        { id: '2', left: 'Minor Premise', right: 'Specific statement (Socrates is a man)' },
        { id: '3', left: 'Conclusion', right: 'What follows (Socrates is mortal)' },
        { id: '4', left: 'Middle Term', right: 'Connects premises, absent from conclusion' },
      ]
    },
    stepByStep: {
      title: 'Build a Valid Syllogism',
      problem: 'Complete this syllogism about whales:',
      steps: [
        { id: '1', instruction: 'Major Premise: All mammals are _____', hint: 'What characteristic do mammals share?', expectedAnswer: 'warm-blooded', acceptableAnswers: ['warm blooded'] },
        { id: '2', instruction: 'Minor Premise: A whale is a _____', expectedAnswer: 'mammal' },
        { id: '3', instruction: 'Therefore, a whale is _____', workedExample: 'If All A are B, and C is A, then C is B', expectedAnswer: 'warm-blooded', acceptableAnswers: ['warm blooded'] },
      ]
    }
  },
  {
    lessonId: 'logic-fallacies',
    matching: {
      instruction: 'Match the fallacy to its example:',
      pairs: [
        { id: '1', left: 'Ad Hominem', right: '"Don\'t trust his data — he\'s biased"' },
        { id: '2', left: 'Straw Man', right: '"So you want us completely defenseless?"' },
        { id: '3', left: 'False Dilemma', right: '"You\'re either with us or against us"' },
        { id: '4', left: 'Slippery Slope', right: '"If we allow X, next thing it\'s total chaos"' },
        { id: '5', left: 'Post Hoc', right: '"I wore lucky socks and we won"' },
      ]
    }
  },

  // ========== LATIN ==========
  {
    lessonId: 'latin-first-declension',
    matching: {
      instruction: 'Match the Latin case ending to its case (1st declension -a):',
      pairs: [
        { id: '1', left: '-a', right: 'Nominative singular (subject)' },
        { id: '2', left: '-ae', right: 'Genitive singular (of)' },
        { id: '3', left: '-ae', right: 'Dative singular (to/for)' },
        { id: '4', left: '-am', right: 'Accusative singular (object)' },
        { id: '5', left: '-ā', right: 'Ablative singular (by/with)' },
      ]
    }
  },
  {
    lessonId: 'latin-famous-phrases',
    matching: {
      instruction: 'Match the Latin phrase to its English translation:',
      pairs: [
        { id: '1', left: 'Cogito ergo sum', right: 'I think, therefore I am' },
        { id: '2', left: 'Carpe diem', right: 'Seize the day' },
        { id: '3', left: 'Veni, vidi, vici', right: 'I came, I saw, I conquered' },
        { id: '4', left: 'E pluribus unum', right: 'Out of many, one' },
        { id: '5', left: 'Memento mori', right: 'Remember you must die' },
      ]
    }
  },

  // ========== MATHEMATICS ==========
  {
    lessonId: 'math-euclid-elements',
    ordering: {
      instruction: "Order Euclid's five postulates from first to last:",
      items: [
        { id: '1', content: 'A straight line can be drawn between any two points', correctPosition: 1 },
        { id: '2', content: 'A straight line can be extended infinitely', correctPosition: 2 },
        { id: '3', content: 'A circle can be drawn with any center and radius', correctPosition: 3 },
        { id: '4', content: 'All right angles are equal', correctPosition: 4 },
        { id: '5', content: 'Parallel lines never meet (parallel postulate)', correctPosition: 5 },
      ]
    },
    matching: {
      instruction: 'Match the geometric term to its definition:',
      pairs: [
        { id: '1', left: 'Point', right: 'That which has no part' },
        { id: '2', left: 'Line', right: 'Breadthless length' },
        { id: '3', left: 'Surface', right: 'That which has length and breadth only' },
        { id: '4', left: 'Angle', right: 'Inclination of two lines meeting at a point' },
      ]
    }
  },
  {
    lessonId: 'math-pythagorean',
    stepByStep: {
      title: 'Apply the Pythagorean Theorem',
      problem: 'A right triangle has legs of 3 and 4. Find the hypotenuse.',
      steps: [
        { id: '1', instruction: 'Write the formula: a² + b² = _____', expectedAnswer: 'c²', acceptableAnswers: ['c^2', 'c squared'] },
        { id: '2', instruction: 'Substitute: 3² + 4² = c². Calculate 3²:', expectedAnswer: '9' },
        { id: '3', instruction: 'Calculate 4²:', expectedAnswer: '16' },
        { id: '4', instruction: '9 + 16 = c². So c² =', expectedAnswer: '25' },
        { id: '5', instruction: 'c = √25 =', expectedAnswer: '5' },
      ]
    }
  },

  // ========== PHYSICS ==========
  {
    lessonId: 'physics-newtons-laws',
    matching: {
      instruction: "Match Newton's Laws to their descriptions:",
      pairs: [
        { id: '1', left: 'First Law (Inertia)', right: 'Objects stay at rest or in motion unless acted upon' },
        { id: '2', left: 'Second Law (F=ma)', right: 'Force equals mass times acceleration' },
        { id: '3', left: 'Third Law (Action-Reaction)', right: 'Every action has an equal and opposite reaction' },
      ]
    },
    calculator: {
      title: 'Force Calculator (F = ma)',
      instruction: "Use Newton's Second Law to calculate force.",
      formula: 'mass * acceleration',
      formulaDisplay: 'F = m × a',
      variables: [
        { id: 'mass', label: 'Mass', unit: 'kg', min: 1, max: 100, step: 1, defaultValue: 10 },
        { id: 'acceleration', label: 'Acceleration', unit: 'm/s²', min: 1, max: 20, step: 0.5, defaultValue: 9.8 },
      ],
      targetQuestion: 'What force accelerates a 50 kg mass at 2 m/s²?',
      targetAnswer: 100,
      tolerance: 1
    }
  },

  // ========== CHEMISTRY ==========
  {
    lessonId: 'chem-atoms-elements',
    matching: {
      instruction: 'Match the subatomic particle to its properties:',
      pairs: [
        { id: '1', left: 'Proton', right: 'Positive charge, in nucleus' },
        { id: '2', left: 'Neutron', right: 'No charge, in nucleus' },
        { id: '3', left: 'Electron', right: 'Negative charge, orbits nucleus' },
      ]
    },
    stepByStep: {
      title: 'Determine Atomic Composition',
      problem: 'Oxygen-16 has an atomic number of 8. Find its subatomic particles.',
      steps: [
        { id: '1', instruction: 'Atomic number = number of _____', hint: 'These define which element it is', expectedAnswer: 'protons' },
        { id: '2', instruction: 'Oxygen has _____ protons', expectedAnswer: '8' },
        { id: '3', instruction: 'In a neutral atom, protons = electrons. Oxygen has _____ electrons', expectedAnswer: '8' },
        { id: '4', instruction: 'Neutrons = mass number - atomic number = 16 - 8 = _____', expectedAnswer: '8' },
      ]
    }
  },

  // ========== NATURAL HISTORY ==========
  {
    lessonId: 'bio-classification',
    ordering: {
      instruction: 'Order the taxonomic ranks from broadest to most specific:',
      items: [
        { id: '1', content: 'Kingdom', correctPosition: 1 },
        { id: '2', content: 'Phylum', correctPosition: 2 },
        { id: '3', content: 'Class', correctPosition: 3 },
        { id: '4', content: 'Order', correctPosition: 4 },
        { id: '5', content: 'Family', correctPosition: 5 },
        { id: '6', content: 'Genus', correctPosition: 6 },
      ]
    }
  },

  // ========== LITERATURE ==========
  {
    lessonId: 'lit-homer-iliad',
    matching: {
      instruction: 'Match the character to their role in The Iliad:',
      pairs: [
        { id: '1', left: 'Achilles', right: 'Greek warrior whose rage drives the plot' },
        { id: '2', left: 'Hector', right: 'Noble Trojan prince and hero' },
        { id: '3', left: 'Agamemnon', right: 'Greek commander who insults Achilles' },
        { id: '4', left: 'Patroclus', right: 'Achilles\' beloved companion' },
        { id: '5', left: 'Helen', right: 'Cause of the Trojan War' },
      ]
    }
  },
  {
    lessonId: 'lit-homer-odyssey',
    ordering: {
      instruction: 'Order these events in The Odyssey:',
      items: [
        { id: '1', content: 'Odysseus leaves Troy', correctPosition: 1 },
        { id: '2', content: 'Encounter with the Cyclops', correctPosition: 2 },
        { id: '3', content: 'Circe transforms crew into pigs', correctPosition: 3 },
        { id: '4', content: 'Journey to the Underworld', correctPosition: 4 },
        { id: '5', content: 'Return to Ithaca in disguise', correctPosition: 5 },
      ]
    }
  },
  {
    lessonId: 'lit-shakespeare',
    matching: {
      instruction: 'Match the Shakespeare play to its genre:',
      pairs: [
        { id: '1', left: 'Hamlet', right: 'Tragedy' },
        { id: '2', left: 'A Midsummer Night\'s Dream', right: 'Comedy' },
        { id: '3', left: 'Henry V', right: 'History' },
        { id: '4', left: 'The Tempest', right: 'Romance / Late Play' },
      ]
    }
  },

  // ========== HISTORY ==========
  {
    lessonId: 'hist-ancient-greece',
    ordering: {
      instruction: 'Order these events in ancient Greek history:',
      items: [
        { id: '1', content: 'First Olympic Games (776 BC)', correctPosition: 1 },
        { id: '2', content: 'Battle of Marathon (490 BC)', correctPosition: 2 },
        { id: '3', content: 'Golden Age of Athens (461 BC)', correctPosition: 3 },
        { id: '4', content: 'Death of Socrates (399 BC)', correctPosition: 4 },
        { id: '5', content: 'Alexander conquers Persia (331 BC)', correctPosition: 5 },
      ]
    }
  },

  // ========== ETHICS ==========
  {
    lessonId: 'ethics-virtue',
    matching: {
      instruction: 'Match the ethical tradition to its core principle:',
      pairs: [
        { id: '1', left: 'Virtue Ethics (Aristotle)', right: 'Character and excellence lead to flourishing' },
        { id: '2', left: 'Utilitarianism (Mill)', right: 'Greatest happiness for the greatest number' },
        { id: '3', left: 'Deontology (Kant)', right: 'Act only according to universal moral rules' },
        { id: '4', left: 'Stoicism (Marcus Aurelius)', right: 'Focus on what you can control; accept the rest' },
      ]
    }
  },

  // ========== RHETORIC ==========
  {
    lessonId: 'rhetoric-three-appeals',
    matching: {
      instruction: 'Match the rhetorical appeal to its definition:',
      pairs: [
        { id: '1', left: 'Ethos', right: 'Credibility and character of the speaker' },
        { id: '2', left: 'Pathos', right: 'Appeal to emotion and feeling' },
        { id: '3', left: 'Logos', right: 'Logical argument and evidence' },
      ]
    }
  },

  // ========== THOUGHT EXPERIMENTS ==========
  {
    lessonId: 'thought-chasing-light',
    ordering: {
      instruction: 'Order the key insights from Einstein\'s light beam thought experiment:',
      items: [
        { id: '1', content: 'Einstein imagines riding alongside a light beam at age 16', correctPosition: 1 },
        { id: '2', content: 'If you match light\'s speed, it should appear frozen', correctPosition: 2 },
        { id: '3', content: 'But Maxwell\'s equations forbid stationary light waves', correctPosition: 3 },
        { id: '4', content: 'Therefore, the speed of light must be constant for all observers', correctPosition: 4 },
        { id: '5', content: 'This leads to the theory of Special Relativity (1905)', correctPosition: 5 },
      ]
    }
  },

  // ========== ENGINEERING ==========
  {
    lessonId: 'eng-ancient-machines',
    matching: {
      instruction: 'Match the simple machine to its example:',
      pairs: [
        { id: '1', left: 'Lever', right: 'Seesaw, crowbar, scissors' },
        { id: '2', left: 'Pulley', right: 'Flagpole, crane, elevator' },
        { id: '3', left: 'Inclined Plane', right: 'Ramp, stairs, hillside road' },
        { id: '4', left: 'Wheel and Axle', right: 'Doorknob, bicycle, steering wheel' },
        { id: '5', left: 'Screw', right: 'Jar lid, bolt, spiral staircase' },
      ]
    }
  },

  // ========== ANATOMY ==========
  {
    lessonId: 'anat-skeletal',
    matching: {
      instruction: 'Match the bone to its location:',
      pairs: [
        { id: '1', left: 'Femur', right: 'Upper leg (thigh)' },
        { id: '2', left: 'Humerus', right: 'Upper arm' },
        { id: '3', left: 'Cranium', right: 'Skull' },
        { id: '4', left: 'Sternum', right: 'Breastbone (chest)' },
        { id: '5', left: 'Patella', right: 'Kneecap' },
      ]
    },
    ordering: {
      instruction: 'Order these bones from top to bottom of the body:',
      items: [
        { id: '1', content: 'Cranium (skull)', correctPosition: 1 },
        { id: '2', content: 'Clavicle (collarbone)', correctPosition: 2 },
        { id: '3', content: 'Sternum (breastbone)', correctPosition: 3 },
        { id: '4', content: 'Femur (thigh bone)', correctPosition: 4 },
        { id: '5', content: 'Tibia (shinbone)', correctPosition: 5 },
      ]
    }
  },
];

// Helper to get interactive exercises for a Path lesson
export const getPathInteractiveExercises = (lessonId: string): InteractiveExercise | undefined => {
  return pathInteractiveExercises.find(ex => ex.lessonId === lessonId);
};
