// Interactive exercise configurations for enhanced learning

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

export interface OrderingItem {
  id: string;
  content: string;
  correctPosition: number;
}

export interface CalculatorConfig {
  title: string;
  instruction: string;
  formula: string;
  formulaDisplay: string;
  variables: {
    id: string;
    label: string;
    unit?: string;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
  }[];
  targetQuestion: string;
  targetAnswer: number;
  tolerance?: number;
}

export interface StepByStepConfig {
  title: string;
  problem: string;
  steps: {
    id: string;
    instruction: string;
    hint?: string;
    workedExample?: string;
    expectedAnswer: string;
    acceptableAnswers?: string[];
  }[];
}

export interface InteractiveExercise {
  lessonId: string;
  matching?: { instruction: string; pairs: MatchingPair[] };
  ordering?: { instruction: string; items: OrderingItem[] };
  calculator?: CalculatorConfig;
  stepByStep?: StepByStepConfig;
}

export const interactiveExercises: InteractiveExercise[] = [
  // Mill's Greek - Match letters to sounds
  {
    lessonId: 'mill-greek-1',
    matching: {
      instruction: 'Match each Greek letter to its English name:',
      pairs: [
        { id: 'alpha', left: 'Α α', right: 'Alpha' },
        { id: 'beta', left: 'Β β', right: 'Beta' },
        { id: 'gamma', left: 'Γ γ', right: 'Gamma' },
        { id: 'delta', left: 'Δ δ', right: 'Delta' },
        { id: 'theta', left: 'Θ θ', right: 'Theta' },
      ]
    },
    ordering: {
      instruction: 'Put the first five Greek letters in alphabetical order:',
      items: [
        { id: '1', content: 'Alpha (Α)', correctPosition: 1 },
        { id: '2', content: 'Beta (Β)', correctPosition: 2 },
        { id: '3', content: 'Gamma (Γ)', correctPosition: 3 },
        { id: '4', content: 'Delta (Δ)', correctPosition: 4 },
        { id: '5', content: 'Epsilon (Ε)', correctPosition: 5 },
      ]
    }
  },

  // Mill's Logic - Syllogism builder
  {
    lessonId: 'mill-logic-2',
    matching: {
      instruction: 'Match the syllogism terms to their definitions:',
      pairs: [
        { id: 'major', left: 'Major Premise', right: 'The general statement (All men are mortal)' },
        { id: 'minor', left: 'Minor Premise', right: 'The specific statement (Socrates is a man)' },
        { id: 'conclusion', left: 'Conclusion', right: 'What follows logically (Socrates is mortal)' },
        { id: 'middle', left: 'Middle Term', right: 'Connects premises but absent from conclusion' },
      ]
    },
    stepByStep: {
      title: 'Build a Valid Syllogism',
      problem: 'Complete this syllogism step by step:',
      steps: [
        {
          id: 'step1',
          instruction: 'Major Premise: All mammals are _____.',
          hint: 'What do all mammals have in common with regards to body temperature?',
          expectedAnswer: 'warm-blooded',
          acceptableAnswers: ['warm blooded', 'warmblooded']
        },
        {
          id: 'step2',
          instruction: 'Minor Premise: A whale is a _____.',
          hint: 'What category does a whale belong to?',
          expectedAnswer: 'mammal'
        },
        {
          id: 'step3',
          instruction: 'Conclusion: Therefore, a whale is _____.',
          workedExample: 'From "All A are B" and "C is A", we conclude "C is B"',
          expectedAnswer: 'warm-blooded',
          acceptableAnswers: ['warm blooded', 'warmblooded']
        }
      ]
    }
  },

  // Einstein Physics - E=mc² Calculator
  {
    lessonId: 'einstein-phys-2',
    calculator: {
      title: 'Mass-Energy Calculator',
      instruction: 'Use E = mc² to calculate the energy equivalent of different masses. The speed of light (c) is approximately 3 × 10⁸ m/s.',
      formula: 'mass * Math.pow(299792458, 2)',
      formulaDisplay: 'E = mc²',
      variables: [
        {
          id: 'mass',
          label: 'Mass',
          unit: 'kg',
          min: 0.001,
          max: 1,
          step: 0.001,
          defaultValue: 0.001
        }
      ],
      targetQuestion: 'What is the energy (in Joules) if mass = 1 kg? (Write in scientific notation, e.g., 9e16)',
      targetAnswer: 8.99e16,
      tolerance: 10
    },
    ordering: {
      instruction: 'Order these from slowest to fastest:',
      items: [
        { id: '1', content: 'Sound in air (~343 m/s)', correctPosition: 1 },
        { id: '2', content: 'Fastest human sprint (~12 m/s)', correctPosition: 2 },
        { id: '3', content: 'Earth orbiting Sun (~30,000 m/s)', correctPosition: 3 },
        { id: '4', content: 'Speed of light (~300,000,000 m/s)', correctPosition: 4 },
      ]
    }
  },

  // Newton Physics - F=ma Calculator
  {
    lessonId: 'newton-phys-1',
    calculator: {
      title: 'Force Calculator',
      instruction: "Use Newton's Second Law (F = ma) to explore how force, mass, and acceleration relate.",
      formula: 'mass * acceleration',
      formulaDisplay: 'F = m × a',
      variables: [
        {
          id: 'mass',
          label: 'Mass',
          unit: 'kg',
          min: 1,
          max: 100,
          step: 1,
          defaultValue: 10
        },
        {
          id: 'acceleration',
          label: 'Acceleration',
          unit: 'm/s²',
          min: 1,
          max: 20,
          step: 0.5,
          defaultValue: 9.8
        }
      ],
      targetQuestion: 'What force (in Newtons) accelerates a 50 kg mass at 2 m/s²?',
      targetAnswer: 100,
      tolerance: 1
    },
    stepByStep: {
      title: 'Solve a Motion Problem',
      problem: 'A 10 kg box is pushed with a force of 50 N. Find its acceleration.',
      steps: [
        {
          id: 'step1',
          instruction: "Write the formula we'll use (Newton's Second Law):",
          expectedAnswer: 'F = ma',
          acceptableAnswers: ['f=ma', 'F=m×a', 'F=m*a']
        },
        {
          id: 'step2',
          instruction: 'Rearrange to solve for acceleration: a = ?',
          hint: 'Divide both sides by m',
          expectedAnswer: 'F/m',
          acceptableAnswers: ['F ÷ m', 'F divided by m']
        },
        {
          id: 'step3',
          instruction: 'Substitute the values: a = 50 / 10 = ? m/s²',
          workedExample: '50 N ÷ 10 kg = 5 m/s²',
          expectedAnswer: '5',
          acceptableAnswers: ['5 m/s²', '5 m/s^2']
        }
      ]
    }
  },

  // Tesla Electricity - Ohm's Law
  {
    lessonId: 'tesla-elec-1',
    calculator: {
      title: "Ohm's Law Calculator",
      instruction: 'Explore the relationship between Voltage (V), Current (I), and Resistance (R).',
      formula: 'current * resistance',
      formulaDisplay: 'V = I × R',
      variables: [
        {
          id: 'current',
          label: 'Current',
          unit: 'A (Amperes)',
          min: 0.1,
          max: 10,
          step: 0.1,
          defaultValue: 2
        },
        {
          id: 'resistance',
          label: 'Resistance',
          unit: 'Ω (Ohms)',
          min: 1,
          max: 100,
          step: 1,
          defaultValue: 12
        }
      ],
      targetQuestion: 'What voltage is needed to push 3 A through 4 Ω of resistance?',
      targetAnswer: 12,
      tolerance: 1
    },
    matching: {
      instruction: 'Match the electrical unit to what it measures:',
      pairs: [
        { id: 'volt', left: 'Volt (V)', right: 'Electrical pressure / potential difference' },
        { id: 'amp', left: 'Ampere (A)', right: 'Flow of electrical current' },
        { id: 'ohm', left: 'Ohm (Ω)', right: 'Resistance to current flow' },
        { id: 'watt', left: 'Watt (W)', right: 'Power / rate of energy transfer' },
      ]
    }
  },

  // Curie Chemistry - Atomic Structure
  {
    lessonId: 'curie-chem-1',
    matching: {
      instruction: 'Match the subatomic particle to its properties:',
      pairs: [
        { id: 'proton', left: 'Proton', right: 'Positive charge, in nucleus' },
        { id: 'neutron', left: 'Neutron', right: 'No charge, in nucleus' },
        { id: 'electron', left: 'Electron', right: 'Negative charge, orbits nucleus' },
      ]
    },
    stepByStep: {
      title: 'Determine Atomic Composition',
      problem: 'Carbon-12 has an atomic number of 6. Find its subatomic particles.',
      steps: [
        {
          id: 'step1',
          instruction: 'The atomic number equals the number of _____.',
          hint: 'These determine the element identity',
          expectedAnswer: 'protons',
          acceptableAnswers: ['proton']
        },
        {
          id: 'step2',
          instruction: 'So Carbon has _____ protons.',
          expectedAnswer: '6',
          acceptableAnswers: ['six']
        },
        {
          id: 'step3',
          instruction: 'In a neutral atom, protons = electrons. So Carbon has _____ electrons.',
          expectedAnswer: '6',
          acceptableAnswers: ['six']
        },
        {
          id: 'step4',
          instruction: 'Mass number (12) = protons + neutrons. Neutrons = 12 - 6 = ?',
          workedExample: 'Mass number − Atomic number = Neutrons',
          expectedAnswer: '6',
          acceptableAnswers: ['six']
        }
      ]
    }
  },

  // Pascal Probability
  {
    lessonId: 'pascal-prob-1',
    ordering: {
      instruction: "Order the rows of Pascal's Triangle from top to bottom:",
      items: [
        { id: '1', content: '1', correctPosition: 1 },
        { id: '2', content: '1  1', correctPosition: 2 },
        { id: '3', content: '1  2  1', correctPosition: 3 },
        { id: '4', content: '1  3  3  1', correctPosition: 4 },
        { id: '5', content: '1  4  6  4  1', correctPosition: 5 },
      ]
    },
    stepByStep: {
      title: 'Calculate a Probability',
      problem: 'What is the probability of getting exactly 2 heads when flipping 4 coins?',
      steps: [
        {
          id: 'step1',
          instruction: 'Total possible outcomes for 4 coin flips = 2⁴ = ?',
          hint: 'Each coin has 2 outcomes, so multiply: 2×2×2×2',
          expectedAnswer: '16',
          acceptableAnswers: ['sixteen']
        },
        {
          id: 'step2',
          instruction: "From Pascal's Triangle row 5 (1 4 6 4 1), the number of ways to get exactly 2 heads is:",
          workedExample: 'Row n+1 gives coefficients for n flips. Position 3 = ways to get 2 heads.',
          expectedAnswer: '6',
          acceptableAnswers: ['six']
        },
        {
          id: 'step3',
          instruction: 'Probability = favorable/total = 6/16 = ? (simplify as fraction)',
          expectedAnswer: '3/8',
          acceptableAnswers: ['6/16', '0.375']
        }
      ]
    }
  },

  // Leibniz Calculus - Derivative rules
  {
    lessonId: 'leibniz-calc-1',
    matching: {
      instruction: 'Match each function to its derivative:',
      pairs: [
        { id: 'd1', left: 'f(x) = x²', right: "f'(x) = 2x" },
        { id: 'd2', left: 'f(x) = x³', right: "f'(x) = 3x²" },
        { id: 'd3', left: 'f(x) = 5x', right: "f'(x) = 5" },
        { id: 'd4', left: 'f(x) = 7', right: "f'(x) = 0" },
      ]
    },
    stepByStep: {
      title: 'Apply the Power Rule',
      problem: 'Find the derivative of f(x) = 4x³ + 2x² - 5x + 1',
      steps: [
        {
          id: 'step1',
          instruction: 'Power Rule: d/dx(xⁿ) = n·xⁿ⁻¹. Apply to 4x³:',
          hint: 'Multiply 4 by the exponent 3, then reduce exponent by 1',
          expectedAnswer: '12x²',
          acceptableAnswers: ['12x^2']
        },
        {
          id: 'step2',
          instruction: 'Apply to 2x²:',
          expectedAnswer: '4x',
          acceptableAnswers: ['4x^1']
        },
        {
          id: 'step3',
          instruction: 'Apply to -5x:',
          workedExample: '-5x¹ → -5·1·x⁰ = -5',
          expectedAnswer: '-5',
        },
        {
          id: 'step4',
          instruction: 'The derivative of the constant 1 is:',
          expectedAnswer: '0',
        },
        {
          id: 'step5',
          instruction: "Combine: f'(x) = ?",
          expectedAnswer: '12x² + 4x - 5',
          acceptableAnswers: ['12x^2 + 4x - 5', '12x²+4x-5']
        }
      ]
    }
  },

  // Da Vinci Proportions
  {
    lessonId: 'davinci-draw-3',
    ordering: {
      instruction: 'Order these body parts by their proportional length (shortest to longest) in the idealized human figure:',
      items: [
        { id: '1', content: 'Hand (wrist to fingertip)', correctPosition: 1 },
        { id: '2', content: 'Head (chin to crown)', correctPosition: 2 },
        { id: '3', content: 'Forearm (elbow to wrist)', correctPosition: 3 },
        { id: '4', content: 'Upper arm (shoulder to elbow)', correctPosition: 4 },
        { id: '5', content: 'Leg (hip to ankle)', correctPosition: 5 },
      ]
    },
    matching: {
      instruction: 'Match the proportion to its ratio in the Vitruvian Man:',
      pairs: [
        { id: 'p1', left: 'Arm span : Height', right: '1 : 1 (equal)' },
        { id: 'p2', left: 'Height : Head length', right: '8 : 1' },
        { id: 'p3', left: 'Hand : Face length', right: '1 : 1 (equal)' },
        { id: 'p4', left: 'Foot : Forearm', right: '1 : 1 (equal)' },
      ]
    }
  },

  // Newton Calculus Limits
  {
    lessonId: 'newton-calc-2',
    stepByStep: {
      title: 'Evaluate a Limit',
      problem: 'Find lim(x→2) (x² - 4)/(x - 2)',
      steps: [
        {
          id: 'step1',
          instruction: 'First, try direct substitution. What do you get for the numerator when x = 2?',
          hint: '2² - 4 = ?',
          expectedAnswer: '0',
        },
        {
          id: 'step2',
          instruction: 'What do you get for the denominator when x = 2?',
          expectedAnswer: '0',
        },
        {
          id: 'step3',
          instruction: '0/0 is indeterminate. Factor the numerator x² - 4 as a difference of squares:',
          workedExample: 'a² - b² = (a+b)(a-b), so x² - 4 = (x+2)(x-2)',
          expectedAnswer: '(x+2)(x-2)',
          acceptableAnswers: ['(x-2)(x+2)']
        },
        {
          id: 'step4',
          instruction: 'Cancel (x-2) from numerator and denominator. What remains?',
          expectedAnswer: 'x+2',
          acceptableAnswers: ['(x+2)']
        },
        {
          id: 'step5',
          instruction: 'Now substitute x = 2 into (x + 2). The limit equals:',
          expectedAnswer: '4',
        }
      ]
    }
  }
];

// Helper to get interactive exercises for a lesson
export const getInteractiveExercises = (lessonId: string): InteractiveExercise | undefined => {
  return interactiveExercises.find(ex => ex.lessonId === lessonId);
};
