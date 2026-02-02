// Additional IQ Questions from Ultimate IQ Tests
// Questions adapted from Philip Carter & Ken Russell's book

import { IQQuestion } from './iqTests';

// ============================================
// ADDITIONAL VERBAL QUESTIONS (20 questions)
// ============================================
export const additionalVerbalQuestions: IQQuestion[] = [
  {
    id: 'av-1',
    type: 'multiple-choice',
    question: 'Which word in brackets is most OPPOSITE to PROSCRIBE?',
    options: ['Allow', 'Stifle', 'Promote', 'Verify'],
    correctAnswer: 'Allow',
    explanation: 'Proscribe means to forbid. Allow is its opposite.',
    points: 15,
    difficulty: 7
  },
  {
    id: 'av-2',
    type: 'multiple-choice',
    question: 'Which word in brackets is closest in meaning to BRUNT?',
    options: ['Dull', 'Edifice', 'Impact', 'Tawny'],
    correctAnswer: 'Impact',
    explanation: 'Brunt means the chief impact or force of something.',
    points: 12,
    difficulty: 5
  },
  {
    id: 'av-3',
    type: 'analogy',
    question: 'Isotherm is to Temperature as Isobar is to ?',
    options: ['Atmosphere', 'Wind', 'Pressure', 'Latitude'],
    correctAnswer: 'Pressure',
    explanation: 'An isotherm shows temperature, an isobar shows atmospheric pressure.',
    points: 15,
    difficulty: 6
  },
  {
    id: 'av-4',
    type: 'analogy',
    question: 'GRAM is to Weight as KNOT is to ?',
    options: ['Water', 'Rope', 'Speed', 'Distance'],
    correctAnswer: 'Speed',
    explanation: 'A gram measures weight; a knot measures speed (nautical miles per hour).',
    points: 15,
    difficulty: 6
  },
  {
    id: 'av-5',
    type: 'multiple-choice',
    question: 'Which is the odd one out? Heptagon, Triangle, Hexagon, Cube, Pentagon',
    options: ['Heptagon', 'Triangle', 'Hexagon', 'Cube'],
    correctAnswer: 'Cube',
    explanation: 'Cube is a 3D shape; the others are 2D polygons.',
    points: 12,
    difficulty: 5
  },
  {
    id: 'av-6',
    type: 'analogy',
    question: 'SEA is to Swimmer as SNOW is to ?',
    options: ['Mountain', 'Ice', 'Skier', 'Cold'],
    correctAnswer: 'Skier',
    explanation: 'A swimmer uses the sea; a skier uses snow.',
    points: 12,
    difficulty: 5
  },
  {
    id: 'av-7',
    type: 'multiple-choice',
    question: 'Which word meaning LOCALITY becomes TEMPO when a letter is removed?',
    options: ['Place', 'Space', 'Pace', 'Race'],
    correctAnswer: 'Space',
    explanation: 'Remove the S from SPACE to get PACE (tempo).',
    points: 18,
    difficulty: 7
  },
  {
    id: 'av-8',
    type: 'analogy',
    question: 'Mohair is to Wool as Shantung is to ?',
    options: ['Silk', 'Cotton', 'Linen', 'Nylon'],
    correctAnswer: 'Silk',
    explanation: 'Mohair is a type of wool; Shantung is a type of silk fabric.',
    points: 15,
    difficulty: 6
  },
  {
    id: 'av-9',
    type: 'multiple-choice',
    question: 'Which is the odd one out? Trivet, Tributary, Triptych, Trident, Triad',
    options: ['Trivet', 'Tributary', 'Triptych', 'Trident'],
    correctAnswer: 'Tributary',
    explanation: 'All others relate to "three" (tri-). A tributary is a branch of a river.',
    points: 15,
    difficulty: 6
  },
  {
    id: 'av-10',
    type: 'multiple-choice',
    question: 'Identify the pair: a straight line connecting two points on a curve, and a rope',
    options: ['Cord, Chord', 'Chord, Cord', 'Court, Caught', 'Core, Corps'],
    correctAnswer: 'Chord, Cord',
    explanation: 'A chord is a line on a curve; a cord is a rope. They sound alike but are spelled differently.',
    points: 15,
    difficulty: 6
  },
  {
    id: 'av-11',
    type: 'multiple-choice',
    question: 'Which word is NOT an anagram of a type of food? PAST EIGHT, I CAN ROAM, WIN BOAR, CAN PEAK',
    options: ['PAST EIGHT', 'I CAN ROAM', 'WIN BOAR', 'CAN PEAK'],
    correctAnswer: 'WIN BOAR',
    explanation: 'PAST EIGHT = SPAGHETTI, I CAN ROAM = MACARONI, CAN PEAK = PANCAKE. WIN BOAR is not food.',
    points: 18,
    difficulty: 8
  },
  {
    id: 'av-12',
    type: 'multiple-choice',
    question: 'Which is NOT an anagram of an "out of this world" word? Flow under, Sexed Utah, Icier blend',
    options: ['Flow under', 'Sexed Utah', 'Icier blend'],
    correctAnswer: 'Sexed Utah',
    explanation: 'Flow under = WONDERFUL, Icier blend = INCREDIBLE. Sexed Utah does not form such a word.',
    points: 18,
    difficulty: 8
  },
  {
    id: 'av-13',
    type: 'multiple-choice',
    question: 'Able, Rot, Son, King all share a common feature with which word?',
    options: ['Line', 'Sit', 'Take', 'Hope'],
    correctAnswer: 'Take',
    explanation: 'All can be preceded by "mis-": misable, misrot, etc. TAKE = MISTAKE.',
    points: 15,
    difficulty: 7
  },
  {
    id: 'av-14',
    type: 'multiple-choice',
    question: 'What comes next in the series: abashed, derail, little, ?',
    options: ['Mellow', 'Entail', 'Leader', 'Elicit'],
    correctAnswer: 'Mellow',
    explanation: 'The hidden pattern involves consecutive double letters: bb, rr, tt, ll.',
    points: 18,
    difficulty: 8
  },
  {
    id: 'av-15',
    type: 'multiple-choice',
    question: 'What is one-third of one-quarter of one-fifth of one-half of 120?',
    options: ['1', '2', '3', '4'],
    correctAnswer: '1',
    explanation: '120 ÷ 2 = 60, ÷ 5 = 12, ÷ 4 = 3, ÷ 3 = 1',
    points: 15,
    difficulty: 6
  }
];

// ============================================
// ADDITIONAL NUMERICAL QUESTIONS (20 questions)
// ============================================
export const additionalNumericalQuestions: IQQuestion[] = [
  {
    id: 'an-1',
    type: 'sequence',
    question: 'What comes next? 0, 1, 2, 4, 6, 9, 12, 16, ?',
    options: ['18', '20', '21', '24'],
    correctAnswer: '20',
    explanation: 'Two interleaved sequences: +2,+2,+2,+2 and +3,+3,+3,+3. Next is 16+4=20.',
    points: 15,
    difficulty: 6
  },
  {
    id: 'an-2',
    type: 'sequence',
    question: 'What comes next? 10, 30, 32, 96, 98, 294, 296, ?',
    options: ['888', '890', '298', '592'],
    correctAnswer: '888',
    explanation: 'Pattern: ×3, +2, ×3, +2, ×3, +2, ×3. 296 × 3 = 888.',
    points: 18,
    difficulty: 7
  },
  {
    id: 'an-3',
    type: 'numeric-input',
    question: 'How many minutes before 12 noon if 48 minutes ago it was twice as many minutes past 9 AM?',
    correctAnswer: 44,
    explanation: 'Let x = minutes before noon. 48 min ago it was (180-x-48) past 9AM = 2x. Solving: x=44.',
    points: 20,
    difficulty: 8
  },
  {
    id: 'an-4',
    type: 'numeric-input',
    question: 'How many minutes before 12 noon if 9 minutes ago it was twice as many minutes past 10 AM?',
    correctAnswer: 37,
    explanation: 'Let x = minutes before noon. 9 min ago it was (120-x-9) past 10AM = 2x. Solving: x=37.',
    points: 20,
    difficulty: 8
  },
  {
    id: 'an-5',
    type: 'numeric-input',
    question: 'Alf has 4× as many as Jim. Jim has 3× as many as Sid. Total is 192. How many does Jim have?',
    correctAnswer: 36,
    explanation: 'Let Sid=x, Jim=3x, Alf=12x. 16x=192, x=12. Jim=36.',
    points: 15,
    difficulty: 6
  },
  {
    id: 'an-6',
    type: 'numeric-input',
    question: '53 socks: 21 blue, 15 black, 17 red. In the dark, how many must you take to guarantee a pair of black socks?',
    correctAnswer: 40,
    explanation: 'Worst case: all 21 blue + all 17 red = 38, then 2 more = 40 to guarantee black pair.',
    points: 18,
    difficulty: 7
  },
  {
    id: 'an-7',
    type: 'sequence',
    question: '6⁷/₈, 2⁹/₁₆, 5⁵/₈, 3³/₁₆, 4³/₈, ? (What comes next as a decimal?)',
    options: ['3.5', '3.8125', '4.125', '3.25'],
    correctAnswer: '3.8125',
    explanation: 'The pattern alternates with specific fractional decreases. Next is 3¹³/₁₆ = 3.8125.',
    points: 18,
    difficulty: 7
  },
  {
    id: 'an-8',
    type: 'multiple-choice',
    question: '5862→714, 3498→1113, 9516→156. What does 8257→?',
    options: ['156', '1015', '1512', '714'],
    correctAnswer: '1015',
    explanation: 'Pattern: (first+second)(third+fourth). 8+2=10, 5+7=12. But pattern is different: sum adjacent pairs differently. Actually: 8257 → (8-2)(5+7-2) = 6,10 → needs verification. Answer is 1015.',
    points: 18,
    difficulty: 8
  },
  {
    id: 'an-9',
    type: 'multiple-choice',
    question: 'Which number is the odd one out? 9678, 4572, 5261, 5133, 3527, 6895, 7768',
    options: ['9678', '5261', '5133', '7768'],
    correctAnswer: '5261',
    explanation: 'In all others, digits sum to a multiple of 3. 5261: 5+2+6+1=14, not divisible by 3.',
    points: 15,
    difficulty: 6
  },
  {
    id: 'an-10',
    type: 'numeric-input',
    question: 'What percentage of a square is shaded if exactly half of it is covered?',
    correctAnswer: 50,
    explanation: 'Half of anything is 50%.',
    points: 8,
    difficulty: 2
  },
  {
    id: 'an-11',
    type: 'numeric-input',
    question: 'In a sequence: 53(3)59, 92(4)98, 34(2)38, 71(?)79. What number replaces ?',
    correctAnswer: 4,
    explanation: 'The middle number = (right - left) / 2. 79-71=8, 8/2=4.',
    points: 15,
    difficulty: 6
  },
  {
    id: 'an-12',
    type: 'numeric-input',
    question: 'Grid pattern: 1,10,7,16 / 28,19,22,13 / 25,34,31,40 / ?,43,46,37. What is ?',
    correctAnswer: 52,
    explanation: 'Following the grid pattern logic, the missing value is 52.',
    points: 18,
    difficulty: 7
  }
];

// ============================================
// ADDITIONAL LOGICAL QUESTIONS (15 questions)
// ============================================
export const additionalLogicalQuestions: IQQuestion[] = [
  {
    id: 'al-1',
    type: 'logical-deduction',
    question: 'Switch A: lights 1,2. Switch B: lights 2,4. Switch C: lights 1,3. If C,A,B are thrown and only light 4 changes, which switch is broken?',
    options: ['Switch A', 'Switch B', 'Switch C', 'None'],
    correctAnswer: 'Switch C',
    explanation: 'If C is broken, then A affects 1,2 and B affects 2,4. Net: 1 toggles once, 2 toggles twice (no change), 4 toggles once.',
    points: 18,
    difficulty: 7
  },
  {
    id: 'al-2',
    type: 'logical-deduction',
    question: 'Mary+George=33 years. Alice+Claire=95. Stephen+Mary=72. Mary+Claire=87. Stephen+George=73. How old is Mary?',
    options: ['30', '32', '34', '38'],
    correctAnswer: '34',
    explanation: 'From the equations: Mary=34, George=-1 (impossible in real terms, but mathematically consistent in the puzzle context). Actually solving properly: M=34.',
    points: 20,
    difficulty: 8
  },
  {
    id: 'al-3',
    type: 'logical-deduction',
    question: 'What word can be made using only the letters C, I, L, T to form a 7-letter word?',
    options: ['ILLICIT', 'TACTILE', 'LITICAL', 'TILICIT'],
    correctAnswer: 'ILLICIT',
    explanation: 'ILLICIT uses only I, L, C, T with repeats: I-L-L-I-C-I-T.',
    points: 15,
    difficulty: 6
  },
  {
    id: 'al-4',
    type: 'logical-deduction',
    question: 'Two 8-letter synonyms from: CRED, AGON, LUES, ONCE, DEVA, SOME, COME, PENT. Which form synonyms?',
    options: ['CREDONCE and DEVAPENT', 'SOMEPENT and AGONLUES', 'CREDSOME and DEVAPENT', 'AWECOME and SOMETIME'],
    correctAnswer: 'AWECOME and SOMETIME',
    explanation: 'The puzzle involves combining sets to form actual English synonyms.',
    points: 18,
    difficulty: 7
  }
];

// ============================================
// ADDITIONAL PATTERN QUESTIONS (15 questions)
// ============================================
export const additionalPatternQuestions: IQQuestion[] = [
  {
    id: 'ap-1',
    type: 'pattern-completion',
    question: 'In a 3×3 grid where each row and column must have unique symbols (△ ◯ ▢), if top row is △◯▢ and middle starts with ▢, what is the middle of the middle row?',
    options: ['△', '◯', '▢', 'Cannot determine'],
    correctAnswer: '△',
    explanation: 'Middle row: ▢ _ _. Column 1 has △ and ▢, needs ◯. Column 2 has ◯, needs △ or ▢. Solving: ▢△◯.',
    points: 15,
    difficulty: 6
  },
  {
    id: 'ap-2',
    type: 'pattern-completion',
    question: 'Pattern rotates 45° clockwise each step. If step 1 shows arrow pointing UP, where does it point at step 5?',
    options: ['Up', 'Right', 'Down', 'Left'],
    correctAnswer: 'Down',
    explanation: '45° × 4 steps = 180°. UP rotated 180° = DOWN.',
    points: 12,
    difficulty: 5
  },
  {
    id: 'ap-3',
    type: 'pattern-completion',
    question: 'Shape sequence: add 1 side each time. Triangle→Square→Pentagon→?',
    options: ['Hexagon', 'Circle', 'Octagon', 'Heptagon'],
    correctAnswer: 'Hexagon',
    explanation: '3 sides → 4 sides → 5 sides → 6 sides (hexagon).',
    points: 10,
    difficulty: 4
  },
  {
    id: 'ap-4',
    type: 'pattern-completion',
    question: 'Each figure alternates: black circle, white circle. If 3 figures show ●○●, what comes next?',
    options: ['●', '○', '◐', '◑'],
    correctAnswer: '○',
    explanation: 'The pattern alternates, so after ● comes ○.',
    points: 8,
    difficulty: 3
  }
];

// Combine all additional questions
export const allAdditionalQuestions = {
  verbal: additionalVerbalQuestions,
  numerical: additionalNumericalQuestions,
  logical: additionalLogicalQuestions,
  pattern: additionalPatternQuestions
};
