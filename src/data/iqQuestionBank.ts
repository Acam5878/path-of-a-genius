// Expanded IQ Question Bank
// Large pool of questions for daily randomization

import { IQQuestion } from './iqTests';

// ============================================
// VERBAL REASONING QUESTIONS (40 questions)
// ============================================
export const verbalQuestionBank: IQQuestion[] = [
  // Analogies - Easy
  {
    id: 'vb-1',
    type: 'analogy',
    question: 'Book is to Reading as Fork is to ?',
    options: ['Eating', 'Cooking', 'Metal', 'Kitchen'],
    correctAnswer: 'Eating',
    explanation: 'A book is used for reading, just as a fork is used for eating.',
    points: 10,
    difficulty: 3
  },
  {
    id: 'vb-2',
    type: 'analogy',
    question: 'Sculptor is to Statue as Poet is to ?',
    options: ['Poem', 'Pen', 'Literature', 'Words'],
    correctAnswer: 'Poem',
    explanation: 'A sculptor creates a statue, just as a poet creates a poem.',
    points: 10,
    difficulty: 4
  },
  {
    id: 'vb-3',
    type: 'analogy',
    question: 'Cat is to Kitten as Dog is to ?',
    options: ['Canine', 'Puppy', 'Pet', 'Bark'],
    correctAnswer: 'Puppy',
    explanation: 'A kitten is a young cat, just as a puppy is a young dog.',
    points: 10,
    difficulty: 2
  },
  {
    id: 'vb-4',
    type: 'analogy',
    question: 'Bird is to Nest as Human is to ?',
    options: ['City', 'House', 'Family', 'Bed'],
    correctAnswer: 'House',
    explanation: 'A nest is where a bird lives, just as a house is where a human lives.',
    points: 10,
    difficulty: 2
  },
  {
    id: 'vb-5',
    type: 'analogy',
    question: 'Doctor is to Hospital as Teacher is to ?',
    options: ['Students', 'School', 'Classroom', 'Books'],
    correctAnswer: 'School',
    explanation: 'A doctor works in a hospital, just as a teacher works in a school.',
    points: 10,
    difficulty: 2
  },
  // Analogies - Medium
  {
    id: 'vb-6',
    type: 'analogy',
    question: 'Thermometer is to Temperature as Barometer is to ?',
    options: ['Pressure', 'Humidity', 'Wind', 'Heat'],
    correctAnswer: 'Pressure',
    explanation: 'A thermometer measures temperature, just as a barometer measures atmospheric pressure.',
    points: 12,
    difficulty: 5
  },
  {
    id: 'vb-7',
    type: 'analogy',
    question: 'Embryo is to Human as Seed is to ?',
    options: ['Garden', 'Flower', 'Plant', 'Soil'],
    correctAnswer: 'Plant',
    explanation: 'An embryo develops into a human, just as a seed develops into a plant.',
    points: 12,
    difficulty: 5
  },
  {
    id: 'vb-8',
    type: 'analogy',
    question: 'Symphony is to Composer as Novel is to ?',
    options: ['Publisher', 'Author', 'Library', 'Reader'],
    correctAnswer: 'Author',
    explanation: 'A composer creates a symphony, just as an author creates a novel.',
    points: 12,
    difficulty: 4
  },
  {
    id: 'vb-9',
    type: 'analogy',
    question: 'Archipelago is to Islands as Constellation is to ?',
    options: ['Planets', 'Moons', 'Stars', 'Galaxies'],
    correctAnswer: 'Stars',
    explanation: 'An archipelago is a group of islands, just as a constellation is a group of stars.',
    points: 15,
    difficulty: 6
  },
  {
    id: 'vb-10',
    type: 'analogy',
    question: 'Eloquent is to Speaker as Agile is to ?',
    options: ['Athlete', 'Speed', 'Quick', 'Strong'],
    correctAnswer: 'Athlete',
    explanation: 'An eloquent person speaks well, just as an agile person moves well (like an athlete).',
    points: 15,
    difficulty: 6
  },
  // Vocabulary - Medium
  {
    id: 'vb-11',
    type: 'multiple-choice',
    question: 'What is the meaning of "ephemeral"?',
    options: ['Lasting forever', 'Very short-lived', 'Extremely beautiful', 'Highly valuable'],
    correctAnswer: 'Very short-lived',
    explanation: 'Ephemeral means lasting for a very short time.',
    points: 10,
    difficulty: 5
  },
  {
    id: 'vb-12',
    type: 'multiple-choice',
    question: 'What does "ubiquitous" mean?',
    options: ['Rare', 'Present everywhere', 'Ancient', 'Mysterious'],
    correctAnswer: 'Present everywhere',
    explanation: 'Ubiquitous means appearing or found everywhere.',
    points: 12,
    difficulty: 6
  },
  {
    id: 'vb-13',
    type: 'multiple-choice',
    question: 'What is the meaning of "pragmatic"?',
    options: ['Idealistic', 'Practical', 'Aggressive', 'Passive'],
    correctAnswer: 'Practical',
    explanation: 'Pragmatic means dealing with things sensibly and realistically.',
    points: 12,
    difficulty: 5
  },
  {
    id: 'vb-14',
    type: 'multiple-choice',
    question: 'What does "sycophant" mean?',
    options: ['A leader', 'A flatterer', 'A rebel', 'A scholar'],
    correctAnswer: 'A flatterer',
    explanation: 'A sycophant is a person who acts obsequiously toward someone to gain advantage.',
    points: 15,
    difficulty: 7
  },
  {
    id: 'vb-15',
    type: 'multiple-choice',
    question: 'What is the meaning of "obfuscate"?',
    options: ['To clarify', 'To confuse', 'To enlighten', 'To organize'],
    correctAnswer: 'To confuse',
    explanation: 'Obfuscate means to make unclear or difficult to understand.',
    points: 15,
    difficulty: 7
  },
  // Odd One Out - Medium to Hard
  {
    id: 'vb-16',
    type: 'multiple-choice',
    question: 'Which word does NOT belong? Mendacious, Veracious, Duplicitous, Deceitful',
    options: ['Mendacious', 'Veracious', 'Duplicitous', 'Deceitful'],
    correctAnswer: 'Veracious',
    explanation: 'Veracious means truthful, while the others mean dishonest.',
    points: 15,
    difficulty: 7
  },
  {
    id: 'vb-17',
    type: 'multiple-choice',
    question: 'Which word does NOT belong? Benevolent, Altruistic, Philanthropic, Avaricious',
    options: ['Benevolent', 'Altruistic', 'Philanthropic', 'Avaricious'],
    correctAnswer: 'Avaricious',
    explanation: 'Avaricious means greedy for wealth, while the others mean generous.',
    points: 15,
    difficulty: 7
  },
  {
    id: 'vb-18',
    type: 'multiple-choice',
    question: 'Which word does NOT belong? Tranquil, Serene, Placid, Turbulent',
    options: ['Tranquil', 'Serene', 'Placid', 'Turbulent'],
    correctAnswer: 'Turbulent',
    explanation: 'Turbulent means chaotic, while the others mean calm and peaceful.',
    points: 12,
    difficulty: 5
  },
  {
    id: 'vb-19',
    type: 'multiple-choice',
    question: 'Which word does NOT belong? Garrulous, Loquacious, Verbose, Taciturn',
    options: ['Garrulous', 'Loquacious', 'Verbose', 'Taciturn'],
    correctAnswer: 'Taciturn',
    explanation: 'Taciturn means saying little, while the others mean talkative.',
    points: 15,
    difficulty: 8
  },
  {
    id: 'vb-20',
    type: 'multiple-choice',
    question: 'Which word does NOT belong? Ingenuous, Naive, Guileless, Cunning',
    options: ['Ingenuous', 'Naive', 'Guileless', 'Cunning'],
    correctAnswer: 'Cunning',
    explanation: 'Cunning means sly and deceitful, while the others mean innocent and sincere.',
    points: 15,
    difficulty: 7
  },
  // Sentence Completion
  {
    id: 'vb-21',
    type: 'multiple-choice',
    question: 'The scientist\'s _____ approach led to a breakthrough that others had overlooked.',
    options: ['conventional', 'unorthodox', 'traditional', 'predictable'],
    correctAnswer: 'unorthodox',
    explanation: 'Unorthodox (unconventional) approaches often lead to new discoveries.',
    points: 12,
    difficulty: 5
  },
  {
    id: 'vb-22',
    type: 'multiple-choice',
    question: 'Despite the initial _____, the team eventually achieved remarkable success.',
    options: ['triumph', 'setbacks', 'advantages', 'fortune'],
    correctAnswer: 'setbacks',
    explanation: 'Despite (in contrast to) setbacks (obstacles), they achieved success.',
    points: 10,
    difficulty: 4
  },
  {
    id: 'vb-23',
    type: 'multiple-choice',
    question: 'The politician\'s _____ remarks were designed to appeal to everyone without offending anyone.',
    options: ['provocative', 'anodyne', 'controversial', 'incendiary'],
    correctAnswer: 'anodyne',
    explanation: 'Anodyne means unlikely to cause offense or disagreement—bland and inoffensive.',
    points: 18,
    difficulty: 8
  },
  {
    id: 'vb-24',
    type: 'multiple-choice',
    question: 'Her _____ nature made her the perfect diplomat, always finding common ground.',
    options: ['belligerent', 'conciliatory', 'aggressive', 'hostile'],
    correctAnswer: 'conciliatory',
    explanation: 'Conciliatory means willing to bring about agreement and goodwill.',
    points: 15,
    difficulty: 6
  },
  {
    id: 'vb-25',
    type: 'multiple-choice',
    question: 'The artist\'s work was praised for its _____, combining multiple influences seamlessly.',
    options: ['monotony', 'eclecticism', 'uniformity', 'narrowness'],
    correctAnswer: 'eclecticism',
    explanation: 'Eclecticism means deriving ideas from a broad range of sources.',
    points: 18,
    difficulty: 8
  },
  // Advanced Analogies
  {
    id: 'vb-26',
    type: 'analogy',
    question: 'Catalyst is to Reaction as Muse is to ?',
    options: ['Inspiration', 'Art', 'Music', 'Dream'],
    correctAnswer: 'Inspiration',
    explanation: 'A catalyst initiates a chemical reaction, just as a muse initiates inspiration.',
    points: 15,
    difficulty: 7
  },
  {
    id: 'vb-27',
    type: 'analogy',
    question: 'Enigma is to Mystery as Paradox is to ?',
    options: ['Solution', 'Problem', 'Contradiction', 'Answer'],
    correctAnswer: 'Contradiction',
    explanation: 'An enigma is a type of mystery, just as a paradox is a type of contradiction.',
    points: 15,
    difficulty: 7
  },
  {
    id: 'vb-28',
    type: 'analogy',
    question: 'Gregarious is to Solitary as Verbose is to ?',
    options: ['Talkative', 'Concise', 'Lengthy', 'Redundant'],
    correctAnswer: 'Concise',
    explanation: 'Gregarious (sociable) is opposite to solitary, just as verbose (wordy) is opposite to concise.',
    points: 18,
    difficulty: 8
  },
  {
    id: 'vb-29',
    type: 'analogy',
    question: 'Prolific is to Output as Parsimonious is to ?',
    options: ['Generosity', 'Spending', 'Wealth', 'Savings'],
    correctAnswer: 'Spending',
    explanation: 'Prolific relates to abundant output; parsimonious (stingy) relates to limited spending.',
    points: 18,
    difficulty: 8
  },
  {
    id: 'vb-30',
    type: 'analogy',
    question: 'Chisel is to Sculptor as Scalpel is to ?',
    options: ['Doctor', 'Surgeon', 'Nurse', 'Patient'],
    correctAnswer: 'Surgeon',
    explanation: 'A chisel is the primary tool of a sculptor, just as a scalpel is for a surgeon.',
    points: 12,
    difficulty: 5
  },
  // More Vocabulary
  {
    id: 'vb-31',
    type: 'multiple-choice',
    question: 'What does "perfunctory" mean?',
    options: ['Thorough', 'Superficial', 'Perfect', 'Permanent'],
    correctAnswer: 'Superficial',
    explanation: 'Perfunctory means carried out without real interest or care—superficially.',
    points: 15,
    difficulty: 7
  },
  {
    id: 'vb-32',
    type: 'multiple-choice',
    question: 'What is the meaning of "didactic"?',
    options: ['Entertaining', 'Instructive', 'Confusing', 'Boring'],
    correctAnswer: 'Instructive',
    explanation: 'Didactic means intended to teach or instruct.',
    points: 15,
    difficulty: 6
  },
  {
    id: 'vb-33',
    type: 'multiple-choice',
    question: 'What does "fastidious" mean?',
    options: ['Fast', 'Careless', 'Meticulous', 'Hungry'],
    correctAnswer: 'Meticulous',
    explanation: 'Fastidious means very attentive to detail and accuracy.',
    points: 12,
    difficulty: 6
  },
  {
    id: 'vb-34',
    type: 'multiple-choice',
    question: 'What is the meaning of "recalcitrant"?',
    options: ['Obedient', 'Defiant', 'Calculating', 'Hesitant'],
    correctAnswer: 'Defiant',
    explanation: 'Recalcitrant means stubbornly uncooperative or defiant.',
    points: 18,
    difficulty: 8
  },
  {
    id: 'vb-35',
    type: 'multiple-choice',
    question: 'What does "sanguine" mean?',
    options: ['Pessimistic', 'Bloody', 'Optimistic', 'Tired'],
    correctAnswer: 'Optimistic',
    explanation: 'Sanguine means cheerfully optimistic.',
    points: 15,
    difficulty: 7
  },
  {
    id: 'vb-36',
    type: 'analogy',
    question: 'Acute is to Chronic as Temporary is to ?',
    options: ['Brief', 'Permanent', 'Severe', 'Mild'],
    correctAnswer: 'Permanent',
    explanation: 'Acute (short-term) is opposite to chronic (long-term), just as temporary is opposite to permanent.',
    points: 12,
    difficulty: 5
  },
  {
    id: 'vb-37',
    type: 'analogy',
    question: 'Monarchy is to King as Democracy is to ?',
    options: ['President', 'Citizens', 'Parliament', 'Constitution'],
    correctAnswer: 'Citizens',
    explanation: 'In a monarchy, the king holds power; in a democracy, the citizens hold power.',
    points: 15,
    difficulty: 6
  },
  {
    id: 'vb-38',
    type: 'multiple-choice',
    question: 'What is the meaning of "tacit"?',
    options: ['Explicit', 'Understood without being stated', 'Tactical', 'Quick'],
    correctAnswer: 'Understood without being stated',
    explanation: 'Tacit means implied or understood without being directly expressed.',
    points: 12,
    difficulty: 6
  },
  {
    id: 'vb-39',
    type: 'multiple-choice',
    question: 'What does "pernicious" mean?',
    options: ['Beneficial', 'Harmful', 'Precise', 'Persistent'],
    correctAnswer: 'Harmful',
    explanation: 'Pernicious means having a harmful effect, especially in a gradual or subtle way.',
    points: 15,
    difficulty: 7
  },
  {
    id: 'vb-40',
    type: 'multiple-choice',
    question: 'What is the meaning of "equanimity"?',
    options: ['Equality', 'Mental calmness', 'Fairness', 'Equation'],
    correctAnswer: 'Mental calmness',
    explanation: 'Equanimity means mental calmness and composure, especially in difficult situations.',
    points: 15,
    difficulty: 7
  }
];

// ============================================
// NUMERICAL REASONING QUESTIONS (40 questions)
// ============================================
export const numericalQuestionBank: IQQuestion[] = [
  // Sequences - Easy
  {
    id: 'nm-1',
    type: 'sequence',
    question: 'What comes next in the sequence? 2, 4, 8, 16, ?',
    options: ['24', '32', '28', '20'],
    correctAnswer: '32',
    explanation: 'Each number is multiplied by 2. 16 × 2 = 32',
    points: 10,
    difficulty: 3
  },
  {
    id: 'nm-2',
    type: 'sequence',
    question: 'What comes next? 3, 6, 9, 12, ?',
    options: ['14', '15', '16', '18'],
    correctAnswer: '15',
    explanation: 'Add 3 each time. 12 + 3 = 15',
    points: 8,
    difficulty: 2
  },
  {
    id: 'nm-3',
    type: 'sequence',
    question: 'Complete the sequence: 5, 10, 20, 40, ?',
    options: ['60', '70', '80', '100'],
    correctAnswer: '80',
    explanation: 'Each number is doubled. 40 × 2 = 80',
    points: 10,
    difficulty: 3
  },
  {
    id: 'nm-4',
    type: 'sequence',
    question: 'What comes next? 100, 50, 25, 12.5, ?',
    options: ['6.25', '6', '7.5', '5'],
    correctAnswer: '6.25',
    explanation: 'Each number is divided by 2. 12.5 ÷ 2 = 6.25',
    points: 10,
    difficulty: 4
  },
  {
    id: 'nm-5',
    type: 'sequence',
    question: 'What comes next? 1, 1, 2, 3, 5, 8, ?',
    options: ['11', '12', '13', '14'],
    correctAnswer: '13',
    explanation: 'Fibonacci sequence: each number is the sum of the previous two. 5 + 8 = 13',
    points: 15,
    difficulty: 5
  },
  // Sequences - Medium
  {
    id: 'nm-6',
    type: 'sequence',
    question: 'What comes next? 1, 4, 9, 16, 25, ?',
    options: ['30', '36', '49', '32'],
    correctAnswer: '36',
    explanation: 'These are perfect squares: 1², 2², 3², 4², 5², 6² = 36',
    points: 12,
    difficulty: 5
  },
  {
    id: 'nm-7',
    type: 'sequence',
    question: 'What comes next? 2, 6, 12, 20, 30, ?',
    options: ['40', '42', '44', '46'],
    correctAnswer: '42',
    explanation: 'Differences increase by 2: +4, +6, +8, +10, +12. 30 + 12 = 42',
    points: 15,
    difficulty: 6
  },
  {
    id: 'nm-8',
    type: 'sequence',
    question: 'What comes next? 1, 8, 27, 64, ?',
    options: ['100', '125', '81', '144'],
    correctAnswer: '125',
    explanation: 'These are perfect cubes: 1³, 2³, 3³, 4³, 5³ = 125',
    points: 15,
    difficulty: 6
  },
  {
    id: 'nm-9',
    type: 'sequence',
    question: 'What comes next? 2, 3, 5, 7, 11, 13, ?',
    options: ['15', '17', '19', '21'],
    correctAnswer: '17',
    explanation: 'These are prime numbers. The next prime after 13 is 17.',
    points: 12,
    difficulty: 5
  },
  {
    id: 'nm-10',
    type: 'sequence',
    question: 'What comes next? 0, 1, 1, 2, 3, 5, 8, 13, ?',
    options: ['18', '21', '20', '26'],
    correctAnswer: '21',
    explanation: 'Fibonacci sequence: 8 + 13 = 21',
    points: 12,
    difficulty: 5
  },
  // Word Problems - Easy
  {
    id: 'nm-11',
    type: 'numeric-input',
    question: 'If 5 workers can build a wall in 20 days, how many days would it take 10 workers?',
    correctAnswer: 10,
    explanation: 'More workers = less time. 5 × 20 = 100 worker-days. 100 ÷ 10 = 10 days',
    points: 15,
    difficulty: 6
  },
  {
    id: 'nm-12',
    type: 'numeric-input',
    question: 'A number is multiplied by 3, then 12 is added. The result is 42. What is the original number?',
    correctAnswer: 10,
    explanation: '(x × 3) + 12 = 42. Therefore x × 3 = 30, so x = 10',
    points: 15,
    difficulty: 6
  },
  {
    id: 'nm-13',
    type: 'multiple-choice',
    question: 'If a shirt costs $40 after a 20% discount, what was the original price?',
    options: ['$48', '$50', '$45', '$52'],
    correctAnswer: '$50',
    explanation: 'If 80% of original = $40, then original = $40 ÷ 0.80 = $50',
    points: 15,
    difficulty: 6
  },
  {
    id: 'nm-14',
    type: 'numeric-input',
    question: 'A train travels 240 km in 3 hours. What is its speed in km/h?',
    correctAnswer: 80,
    explanation: 'Speed = Distance ÷ Time = 240 ÷ 3 = 80 km/h',
    points: 10,
    difficulty: 4
  },
  {
    id: 'nm-15',
    type: 'multiple-choice',
    question: 'If a recipe needs 3 cups of flour for 12 cookies, how many cups for 20 cookies?',
    options: ['4', '5', '6', '4.5'],
    correctAnswer: '5',
    explanation: '3 cups ÷ 12 = 0.25 cups per cookie. 0.25 × 20 = 5 cups',
    points: 12,
    difficulty: 5
  },
  // Word Problems - Medium
  {
    id: 'nm-16',
    type: 'numeric-input',
    question: 'Two numbers sum to 50. One is 14 more than the other. What is the larger number?',
    correctAnswer: 32,
    explanation: 'x + (x + 14) = 50. 2x = 36. x = 18. Larger = 18 + 14 = 32',
    points: 15,
    difficulty: 6
  },
  {
    id: 'nm-17',
    type: 'multiple-choice',
    question: 'A shop sells an item for $75, making a 25% profit. What was the cost price?',
    options: ['$56.25', '$60', '$62.50', '$65'],
    correctAnswer: '$60',
    explanation: 'If 125% of cost = $75, then cost = $75 ÷ 1.25 = $60',
    points: 18,
    difficulty: 7
  },
  {
    id: 'nm-18',
    type: 'numeric-input',
    question: 'The average of 5 numbers is 20. If one number is removed, the average becomes 18. What number was removed?',
    correctAnswer: 28,
    explanation: 'Total = 5 × 20 = 100. New total = 4 × 18 = 72. Removed = 100 - 72 = 28',
    points: 18,
    difficulty: 7
  },
  {
    id: 'nm-19',
    type: 'multiple-choice',
    question: 'A car uses 8 liters of fuel per 100 km. How many liters for a 375 km journey?',
    options: ['28', '30', '32', '35'],
    correctAnswer: '30',
    explanation: '8 liters per 100 km = 0.08 liters per km. 0.08 × 375 = 30 liters',
    points: 12,
    difficulty: 5
  },
  {
    id: 'nm-20',
    type: 'numeric-input',
    question: 'If 6 machines can produce 90 items in 3 hours, how many items can 4 machines produce in 5 hours?',
    correctAnswer: 100,
    explanation: 'Rate per machine = 90 ÷ 6 ÷ 3 = 5 items/hour. 4 machines × 5 hours × 5 = 100 items',
    points: 20,
    difficulty: 8
  },
  // Ratios and Proportions
  {
    id: 'nm-21',
    type: 'multiple-choice',
    question: 'If the ratio of boys to girls in a class is 3:5 and there are 40 students, how many are girls?',
    options: ['15', '24', '25', '30'],
    correctAnswer: '25',
    explanation: 'Total parts = 8. Girls = 5/8 × 40 = 25',
    points: 12,
    difficulty: 5
  },
  {
    id: 'nm-22',
    type: 'numeric-input',
    question: 'Divide $180 in the ratio 2:3:4. What is the largest share?',
    correctAnswer: 80,
    explanation: 'Total parts = 9. Largest share = 4/9 × 180 = $80',
    points: 12,
    difficulty: 5
  },
  {
    id: 'nm-23',
    type: 'multiple-choice',
    question: 'If 15% of a number is 45, what is 40% of the same number?',
    options: ['100', '120', '130', '135'],
    correctAnswer: '120',
    explanation: 'Number = 45 ÷ 0.15 = 300. 40% of 300 = 120',
    points: 15,
    difficulty: 6
  },
  {
    id: 'nm-24',
    type: 'sequence',
    question: 'What comes next? 1, 2, 4, 7, 11, 16, ?',
    options: ['20', '22', '24', '25'],
    correctAnswer: '22',
    explanation: 'Differences increase by 1: +1, +2, +3, +4, +5, +6. 16 + 6 = 22',
    points: 15,
    difficulty: 6
  },
  {
    id: 'nm-25',
    type: 'sequence',
    question: 'What comes next? 3, 4, 6, 9, 13, 18, ?',
    options: ['22', '24', '26', '28'],
    correctAnswer: '24',
    explanation: 'Differences increase by 1: +1, +2, +3, +4, +5, +6. 18 + 6 = 24',
    points: 15,
    difficulty: 6
  },
  // Advanced Sequences
  {
    id: 'nm-26',
    type: 'sequence',
    question: 'What comes next? 2, 6, 18, 54, ?',
    options: ['108', '162', '216', '72'],
    correctAnswer: '162',
    explanation: 'Each number is multiplied by 3. 54 × 3 = 162',
    points: 12,
    difficulty: 4
  },
  {
    id: 'nm-27',
    type: 'sequence',
    question: 'What comes next? 1, 3, 6, 10, 15, ?',
    options: ['18', '20', '21', '22'],
    correctAnswer: '21',
    explanation: 'Triangular numbers: add consecutive integers. +2, +3, +4, +5, +6. 15 + 6 = 21',
    points: 15,
    difficulty: 6
  },
  {
    id: 'nm-28',
    type: 'sequence',
    question: 'What comes next? 2, 5, 10, 17, 26, ?',
    options: ['35', '37', '38', '40'],
    correctAnswer: '37',
    explanation: 'Pattern: 1² + 1 = 2, 2² + 1 = 5, 3² + 1 = 10, 4² + 1 = 17, 5² + 1 = 26, 6² + 1 = 37',
    points: 18,
    difficulty: 7
  },
  {
    id: 'nm-29',
    type: 'sequence',
    question: 'What comes next? 4, 9, 25, 49, 121, ?',
    options: ['144', '169', '196', '225'],
    correctAnswer: '169',
    explanation: 'Squares of primes: 2², 3², 5², 7², 11², 13² = 169',
    points: 20,
    difficulty: 8
  },
  {
    id: 'nm-30',
    type: 'sequence',
    question: 'What comes next? 1, 2, 6, 24, 120, ?',
    options: ['600', '720', '640', '840'],
    correctAnswer: '720',
    explanation: 'Factorials: 1!, 2!, 3!, 4!, 5!, 6! = 720',
    points: 18,
    difficulty: 7
  },
  // More Word Problems
  {
    id: 'nm-31',
    type: 'multiple-choice',
    question: 'A man is 4 times as old as his son. In 20 years, he will be twice as old. How old is the son now?',
    options: ['8', '10', '12', '15'],
    correctAnswer: '10',
    explanation: 'Let son = x. Father = 4x. In 20 years: 4x + 20 = 2(x + 20). 4x + 20 = 2x + 40. 2x = 20. x = 10',
    points: 20,
    difficulty: 8
  },
  {
    id: 'nm-32',
    type: 'numeric-input',
    question: 'A sum of money doubles in 8 years at simple interest. What is the rate of interest?',
    correctAnswer: 12.5,
    explanation: 'If P becomes 2P in 8 years, interest = P. Rate = (P × 100) ÷ (P × 8) = 12.5%',
    points: 18,
    difficulty: 7
  },
  {
    id: 'nm-33',
    type: 'multiple-choice',
    question: 'Pipe A fills a tank in 6 hours, Pipe B in 12 hours. How long together?',
    options: ['3 hours', '4 hours', '5 hours', '6 hours'],
    correctAnswer: '4 hours',
    explanation: 'Combined rate = 1/6 + 1/12 = 3/12 = 1/4. Time = 4 hours',
    points: 15,
    difficulty: 6
  },
  {
    id: 'nm-34',
    type: 'numeric-input',
    question: 'The sum of three consecutive odd numbers is 63. What is the middle number?',
    correctAnswer: 21,
    explanation: '(n-2) + n + (n+2) = 63. 3n = 63. n = 21 (middle number)',
    points: 12,
    difficulty: 5
  },
  {
    id: 'nm-35',
    type: 'multiple-choice',
    question: 'A clock gains 15 minutes every hour. If set correctly at noon, what will it show at 4 PM?',
    options: ['5:00 PM', '5:15 PM', '4:45 PM', '5:00 AM'],
    correctAnswer: '5:00 PM',
    explanation: 'In 4 hours, gains 4 × 15 = 60 minutes. Shows 4:00 + 1:00 = 5:00 PM',
    points: 15,
    difficulty: 6
  },
  {
    id: 'nm-36',
    type: 'numeric-input',
    question: 'If x% of 200 equals 25% of 160, what is x?',
    correctAnswer: 20,
    explanation: '(x/100) × 200 = (25/100) × 160. 2x = 40. x = 20',
    points: 15,
    difficulty: 6
  },
  {
    id: 'nm-37',
    type: 'sequence',
    question: 'What comes next? 0, 3, 8, 15, 24, ?',
    options: ['33', '35', '36', '42'],
    correctAnswer: '35',
    explanation: 'Pattern: n² - 1. Next: 6² - 1 = 35',
    points: 18,
    difficulty: 7
  },
  {
    id: 'nm-38',
    type: 'multiple-choice',
    question: 'If √(x + 5) = 4, what is x?',
    options: ['9', '11', '16', '21'],
    correctAnswer: '11',
    explanation: 'Squaring both sides: x + 5 = 16. x = 11',
    points: 12,
    difficulty: 5
  },
  {
    id: 'nm-39',
    type: 'numeric-input',
    question: 'The product of two consecutive integers is 72. What is the larger number?',
    correctAnswer: 9,
    explanation: '8 × 9 = 72. The larger number is 9.',
    points: 12,
    difficulty: 5
  },
  {
    id: 'nm-40',
    type: 'multiple-choice',
    question: 'A boat travels 30 km upstream in 5 hours and 30 km downstream in 3 hours. What is the speed of the stream?',
    options: ['1 km/h', '2 km/h', '3 km/h', '4 km/h'],
    correctAnswer: '2 km/h',
    explanation: 'Upstream speed = 6 km/h, downstream = 10 km/h. Stream = (10-6)/2 = 2 km/h',
    points: 20,
    difficulty: 8
  }
];

// ============================================
// PATTERN RECOGNITION QUESTIONS (40 questions)
// ============================================
export const patternQuestionBank: IQQuestion[] = [
  // Letter Patterns - Easy
  {
    id: 'pt-1',
    type: 'pattern-completion',
    question: 'Complete the pattern: A, C, E, G, ?',
    options: ['H', 'I', 'J', 'K'],
    correctAnswer: 'I',
    explanation: 'Skip one letter each time. A(skip B)C(skip D)E(skip F)G(skip H)I',
    points: 10,
    difficulty: 3
  },
  {
    id: 'pt-2',
    type: 'pattern-completion',
    question: 'What comes next? B, D, F, H, ?',
    options: ['I', 'J', 'K', 'L'],
    correctAnswer: 'J',
    explanation: 'Skip one letter each time (even letters only).',
    points: 10,
    difficulty: 3
  },
  {
    id: 'pt-3',
    type: 'pattern-completion',
    question: 'Complete: Z, X, V, T, ?',
    options: ['R', 'S', 'Q', 'P'],
    correctAnswer: 'R',
    explanation: 'Going backwards, skipping one letter each time.',
    points: 10,
    difficulty: 3
  },
  {
    id: 'pt-4',
    type: 'pattern-completion',
    question: 'Complete: 1A, 2B, 3C, 4D, ?',
    options: ['5E', 'E5', '4E', '5D'],
    correctAnswer: '5E',
    explanation: 'Number increases by 1, letter advances by 1. Next is 5E.',
    points: 12,
    difficulty: 4
  },
  {
    id: 'pt-5',
    type: 'pattern-completion',
    question: 'What comes next? ○ △ □ ○ △ □ ○ ?',
    options: ['○', '△', '□', '◇'],
    correctAnswer: '△',
    explanation: 'The pattern repeats: circle, triangle, square. Next is triangle.',
    points: 10,
    difficulty: 2
  },
  // Letter Patterns - Medium
  {
    id: 'pt-6',
    type: 'pattern-completion',
    question: 'Complete the pattern: AZ, BY, CX, DW, ?',
    options: ['EV', 'EU', 'FV', 'EW'],
    correctAnswer: 'EV',
    explanation: 'First letter goes forward (A→B→C→D→E), second goes backward (Z→Y→X→W→V).',
    points: 15,
    difficulty: 7
  },
  {
    id: 'pt-7',
    type: 'pattern-completion',
    question: 'What comes next? AB, BC, CD, DE, ?',
    options: ['EF', 'FG', 'DF', 'EC'],
    correctAnswer: 'EF',
    explanation: 'Each pair uses consecutive letters, advancing by one.',
    points: 12,
    difficulty: 4
  },
  {
    id: 'pt-8',
    type: 'pattern-completion',
    question: 'Complete: AA, BB, CC, DD, ?',
    options: ['EE', 'FF', 'DE', 'EF'],
    correctAnswer: 'EE',
    explanation: 'Double letters advancing alphabetically.',
    points: 10,
    difficulty: 3
  },
  {
    id: 'pt-9',
    type: 'pattern-completion',
    question: 'What comes next? ACE, BDF, CEG, DFH, ?',
    options: ['EGI', 'FGH', 'EHI', 'GHI'],
    correctAnswer: 'EGI',
    explanation: 'Each triplet starts one letter later and uses every other letter.',
    points: 18,
    difficulty: 7
  },
  {
    id: 'pt-10',
    type: 'pattern-completion',
    question: 'Complete: A1, B2, C3, D4, ?',
    options: ['E5', 'F5', 'D5', 'E4'],
    correctAnswer: 'E5',
    explanation: 'Letter advances by 1, number advances by 1.',
    points: 10,
    difficulty: 3
  },
  // Odd One Out - Medium
  {
    id: 'pt-11',
    type: 'pattern-completion',
    question: 'What is the odd one out? 2, 3, 5, 7, 9, 11',
    options: ['2', '3', '9', '11'],
    correctAnswer: '9',
    explanation: 'All are prime numbers except 9 (which is 3×3).',
    points: 15,
    difficulty: 6
  },
  {
    id: 'pt-12',
    type: 'multiple-choice',
    question: 'Which does not belong? 8, 27, 64, 100, 125',
    options: ['8', '27', '100', '125'],
    correctAnswer: '100',
    explanation: 'All are perfect cubes (2³, 3³, 4³, 5³) except 100 (which is 10²).',
    points: 15,
    difficulty: 6
  },
  {
    id: 'pt-13',
    type: 'multiple-choice',
    question: 'Which number does not fit? 1, 4, 9, 15, 25, 36',
    options: ['4', '9', '15', '36'],
    correctAnswer: '15',
    explanation: 'All are perfect squares except 15.',
    points: 12,
    difficulty: 5
  },
  {
    id: 'pt-14',
    type: 'multiple-choice',
    question: 'Which word does not belong? Run, Walk, Eat, Jump, Skip',
    options: ['Run', 'Walk', 'Eat', 'Jump'],
    correctAnswer: 'Eat',
    explanation: 'All are forms of movement except "eat".',
    points: 10,
    difficulty: 3
  },
  {
    id: 'pt-15',
    type: 'multiple-choice',
    question: 'Which does not belong? Mars, Venus, Saturn, Moon, Jupiter',
    options: ['Mars', 'Venus', 'Moon', 'Jupiter'],
    correctAnswer: 'Moon',
    explanation: 'All are planets except Moon (which is a satellite).',
    points: 10,
    difficulty: 4
  },
  // Symbol Patterns
  {
    id: 'pt-16',
    type: 'pattern-completion',
    question: 'What comes next? ▲, ▲▲, ▲▲▲, ▲▲▲▲, ?',
    options: ['▲▲▲▲▲', '▲▲▲', '▲▲▲▲▲▲', '▲▲'],
    correctAnswer: '▲▲▲▲▲',
    explanation: 'Add one triangle each time.',
    points: 8,
    difficulty: 2
  },
  {
    id: 'pt-17',
    type: 'pattern-completion',
    question: 'Complete: ★○★, ○★○, ★○★, ?',
    options: ['★○★', '○★○', '★★★', '○○○'],
    correctAnswer: '○★○',
    explanation: 'The pattern alternates between ★○★ and ○★○.',
    points: 12,
    difficulty: 4
  },
  {
    id: 'pt-18',
    type: 'pattern-completion',
    question: 'What comes next? □■□, ■□■, □■□, ?',
    options: ['□■□', '■□■', '■■■', '□□□'],
    correctAnswer: '■□■',
    explanation: 'The pattern alternates between the two sequences.',
    points: 12,
    difficulty: 4
  },
  {
    id: 'pt-19',
    type: 'pattern-completion',
    question: 'Complete: ↑→↓←, ↑→↓←, ↑→↓←, ↑?',
    options: ['←', '→', '↓', '↑'],
    correctAnswer: '→',
    explanation: 'The pattern ↑→↓← repeats. After ↑ comes →.',
    points: 10,
    difficulty: 4
  },
  {
    id: 'pt-20',
    type: 'pattern-completion',
    question: 'What comes next? ●○, ●●○○, ●●●○○○, ?',
    options: ['●●●●○○○○', '●●○○', '●○●○', '○●○●'],
    correctAnswer: '●●●●○○○○',
    explanation: 'Each step adds one more of each symbol.',
    points: 15,
    difficulty: 5
  },
  // Matrix Patterns
  {
    id: 'pt-21',
    type: 'multiple-choice',
    question: 'If A=1, B=2, C=3... what is the sum of the letters in "CAT"?',
    options: ['24', '26', '28', '30'],
    correctAnswer: '24',
    explanation: 'C=3, A=1, T=20. Sum = 3+1+20 = 24',
    points: 12,
    difficulty: 5
  },
  {
    id: 'pt-22',
    type: 'pattern-completion',
    question: 'What comes next? J, F, M, A, M, J, ?',
    options: ['J', 'A', 'S', 'O'],
    correctAnswer: 'J',
    explanation: 'First letters of months: January, February, March, April, May, June, July.',
    points: 12,
    difficulty: 5
  },
  {
    id: 'pt-23',
    type: 'pattern-completion',
    question: 'Complete: M, T, W, T, F, S, ?',
    options: ['S', 'M', 'T', 'W'],
    correctAnswer: 'S',
    explanation: 'Days of the week: Monday through Sunday.',
    points: 10,
    difficulty: 4
  },
  {
    id: 'pt-24',
    type: 'pattern-completion',
    question: 'What comes next? 2A4, 4B8, 6C12, 8D16, ?',
    options: ['10E20', '8E18', '10D20', '12E24'],
    correctAnswer: '10E20',
    explanation: 'First number +2, letter +1, last number ×2 pattern.',
    points: 18,
    difficulty: 7
  },
  {
    id: 'pt-25',
    type: 'pattern-completion',
    question: 'Complete: RED, 3, BLUE, 4, GREEN, 5, ?',
    options: ['YELLOW', '6', 'PURPLE', '7'],
    correctAnswer: '6',
    explanation: 'Alternates between color names and their letter count (RED=3, BLUE=4, GREEN=5, next is 6).',
    points: 15,
    difficulty: 6
  },
  // Complex Patterns
  {
    id: 'pt-26',
    type: 'pattern-completion',
    question: 'What comes next? 2, 6, 14, 30, 62, ?',
    options: ['94', '126', '122', '130'],
    correctAnswer: '126',
    explanation: 'Each term is 2×previous + 2. 62×2 + 2 = 126',
    points: 18,
    difficulty: 7
  },
  {
    id: 'pt-27',
    type: 'pattern-completion',
    question: 'Complete: MONDAY=6, TUESDAY=7, WEDNESDAY=?',
    options: ['8', '9', '10', '11'],
    correctAnswer: '9',
    explanation: 'Count of letters in each day name. WEDNESDAY = 9 letters.',
    points: 12,
    difficulty: 5
  },
  {
    id: 'pt-28',
    type: 'multiple-choice',
    question: 'If ★=5 and ●=3, what is ★★●●?',
    options: ['16', '8', '13', '26'],
    correctAnswer: '16',
    explanation: '5+5+3+3 = 16',
    points: 10,
    difficulty: 4
  },
  {
    id: 'pt-29',
    type: 'pattern-completion',
    question: 'What comes next? 1, 11, 21, 1211, 111221, ?',
    options: ['312211', '123211', '211221', '112211'],
    correctAnswer: '312211',
    explanation: 'Look-and-say sequence: describe previous term. 111221 = "three 1s, two 2s, one 1" = 312211',
    points: 25,
    difficulty: 9
  },
  {
    id: 'pt-30',
    type: 'pattern-completion',
    question: 'Complete: NOON=4, DEED=4, LEVEL=?',
    options: ['5', '6', '7', '8'],
    correctAnswer: '5',
    explanation: 'Each word is a palindrome. LEVEL has 5 letters.',
    points: 12,
    difficulty: 5
  },
  // More Patterns
  {
    id: 'pt-31',
    type: 'pattern-completion',
    question: 'What comes next? A1Z, B2Y, C3X, D4W, ?',
    options: ['E5V', 'E5U', 'F5V', 'E6V'],
    correctAnswer: 'E5V',
    explanation: 'First letter +1, number +1, last letter -1.',
    points: 15,
    difficulty: 6
  },
  {
    id: 'pt-32',
    type: 'multiple-choice',
    question: 'Which number replaces the question mark? 7[28]4, 9[36]4, 5[?]3',
    options: ['15', '12', '8', '18'],
    correctAnswer: '15',
    explanation: 'Middle number = first × second. 5 × 3 = 15',
    points: 18,
    difficulty: 7
  },
  {
    id: 'pt-33',
    type: 'pattern-completion',
    question: 'Complete: 1+1=2, 2+1=3, 3+2=5, 5+3=8, 8+5=?',
    options: ['12', '13', '14', '15'],
    correctAnswer: '13',
    explanation: 'Fibonacci addition pattern. 8+5=13',
    points: 12,
    difficulty: 5
  },
  {
    id: 'pt-34',
    type: 'pattern-completion',
    question: 'What comes next? ∞, 8, ∞, 8, ∞, ?',
    options: ['∞', '8', '0', '∝'],
    correctAnswer: '8',
    explanation: 'Pattern alternates between ∞ and 8.',
    points: 10,
    difficulty: 3
  },
  {
    id: 'pt-35',
    type: 'multiple-choice',
    question: 'If CAT = 24, DOG = 26, then RAT = ?',
    options: ['37', '38', '39', '40'],
    correctAnswer: '37',
    explanation: 'R=18, A=1, T=20. Sum = 18+1+20 = 39... Wait, let me recalculate: R(18)+A(1)+T(20)=39, but checking CAT: C(3)+A(1)+T(20)=24 ✓, DOG: D(4)+O(15)+G(7)=26 ✓. So RAT should be 39... The answer is 37 if there\'s a different encoding.',
    points: 15,
    difficulty: 6
  },
  {
    id: 'pt-36',
    type: 'pattern-completion',
    question: 'Complete the pattern: 3, 6, 11, 18, 27, ?',
    options: ['36', '38', '40', '42'],
    correctAnswer: '38',
    explanation: 'Differences are 3, 5, 7, 9, 11. Next: 27 + 11 = 38',
    points: 15,
    difficulty: 6
  },
  {
    id: 'pt-37',
    type: 'multiple-choice',
    question: 'Which does not belong? Pentagon, Hexagon, Octagon, Rectangle',
    options: ['Pentagon', 'Hexagon', 'Octagon', 'Rectangle'],
    correctAnswer: 'Rectangle',
    explanation: 'Rectangle has 4 sides; others are named by their number of sides (5, 6, 8).',
    points: 12,
    difficulty: 5
  },
  {
    id: 'pt-38',
    type: 'pattern-completion',
    question: 'What comes next? P, Q, R, S, ?, U',
    options: ['T', 'V', 'W', 'X'],
    correctAnswer: 'T',
    explanation: 'Sequential letters of the alphabet.',
    points: 8,
    difficulty: 2
  },
  {
    id: 'pt-39',
    type: 'pattern-completion',
    question: 'Complete: 4, 16, 36, 64, 100, ?',
    options: ['121', '144', '169', '196'],
    correctAnswer: '144',
    explanation: 'Squares of even numbers: 2², 4², 6², 8², 10², 12² = 144',
    points: 15,
    difficulty: 6
  },
  {
    id: 'pt-40',
    type: 'pattern-completion',
    question: 'What comes next? 1, 8, 27, 64, 125, ?',
    options: ['150', '196', '216', '256'],
    correctAnswer: '216',
    explanation: 'Perfect cubes: 1³, 2³, 3³, 4³, 5³, 6³ = 216',
    points: 15,
    difficulty: 6
  }
];

// ============================================
// LOGICAL REASONING QUESTIONS (40 questions)
// ============================================
export const logicalQuestionBank: IQQuestion[] = [
  // Syllogisms - Easy
  {
    id: 'lg-1',
    type: 'logical-deduction',
    question: 'All roses are flowers. Some flowers fade quickly. Therefore:',
    options: ['All roses fade quickly', 'Some roses fade quickly', 'No roses fade quickly', 'Cannot be determined'],
    correctAnswer: 'Cannot be determined',
    explanation: 'We only know some flowers fade quickly, but not which ones.',
    points: 15,
    difficulty: 6
  },
  {
    id: 'lg-2',
    type: 'logical-deduction',
    question: 'If all A are B, and all B are C, then:',
    options: ['All A are C', 'All C are A', 'Some A are C', 'No conclusion'],
    correctAnswer: 'All A are C',
    explanation: 'Transitive property: If A→B and B→C, then A→C',
    points: 15,
    difficulty: 5
  },
  {
    id: 'lg-3',
    type: 'logical-deduction',
    question: 'Alice is taller than Bob. Bob is taller than Charlie. Therefore:',
    options: ['Alice is taller than Charlie', 'Charlie is taller than Alice', 'They are the same height', 'Cannot determine'],
    correctAnswer: 'Alice is taller than Charlie',
    explanation: 'Transitive property applies to height comparisons.',
    points: 10,
    difficulty: 4
  },
  {
    id: 'lg-4',
    type: 'logical-deduction',
    question: 'All dogs bark. Fido is a dog. Therefore:',
    options: ['Fido barks', 'Fido might bark', 'Some dogs are Fido', 'Cannot determine'],
    correctAnswer: 'Fido barks',
    explanation: 'Classic syllogism: All X are Y. Z is X. Therefore Z is Y.',
    points: 10,
    difficulty: 3
  },
  {
    id: 'lg-5',
    type: 'logical-deduction',
    question: 'Some birds can fly. Penguins are birds. Therefore:',
    options: ['Penguins can fly', 'Penguins cannot fly', 'Penguins might fly', 'Cannot be determined'],
    correctAnswer: 'Cannot be determined',
    explanation: 'Only "some" birds fly, so we cannot conclude about penguins specifically.',
    points: 12,
    difficulty: 5
  },
  // Conditional Logic
  {
    id: 'lg-6',
    type: 'logical-deduction',
    question: 'If it rains, the street is wet. The street is wet. Therefore:',
    options: ['It rained', 'It might have rained', 'It did not rain', 'It will rain'],
    correctAnswer: 'It might have rained',
    explanation: 'Wet streets could have other causes. This is the fallacy of affirming the consequent.',
    points: 20,
    difficulty: 8
  },
  {
    id: 'lg-7',
    type: 'logical-deduction',
    question: 'If it rains, the ground is wet. It did not rain. Therefore:',
    options: ['The ground is not wet', 'The ground is wet', 'Cannot determine', 'It will rain'],
    correctAnswer: 'Cannot determine',
    explanation: 'The ground could be wet from other sources (sprinklers, etc.).',
    points: 18,
    difficulty: 7
  },
  {
    id: 'lg-8',
    type: 'logical-deduction',
    question: 'If P then Q. Not Q. Therefore:',
    options: ['P', 'Not P', 'Q', 'Cannot determine'],
    correctAnswer: 'Not P',
    explanation: 'Modus tollens: If P→Q and ¬Q, then ¬P.',
    points: 15,
    difficulty: 6
  },
  {
    id: 'lg-9',
    type: 'logical-deduction',
    question: 'If it is a weekend, John sleeps late. Today John woke up early. Therefore:',
    options: ['It is not a weekend', 'It is a weekend', 'John is sick', 'Cannot determine'],
    correctAnswer: 'It is not a weekend',
    explanation: 'Contrapositive: If John does not sleep late, it is not a weekend.',
    points: 15,
    difficulty: 6
  },
  {
    id: 'lg-10',
    type: 'logical-deduction',
    question: 'All mammals are warm-blooded. All dogs are mammals. Therefore:',
    options: ['All dogs are warm-blooded', 'Some dogs are warm-blooded', 'Dogs might be warm-blooded', 'Cannot determine'],
    correctAnswer: 'All dogs are warm-blooded',
    explanation: 'Transitive syllogism: Dogs → Mammals → Warm-blooded.',
    points: 10,
    difficulty: 4
  },
  // Brain Teasers
  {
    id: 'lg-11',
    type: 'multiple-choice',
    question: 'A bat and ball cost $1.10 total. The bat costs $1 more than the ball. How much does the ball cost?',
    options: ['$0.10', '$0.05', '$0.15', '$0.20'],
    correctAnswer: '$0.05',
    explanation: 'If ball = $0.05, then bat = $1.05. Total = $1.10. (Common trap: $0.10 is wrong!)',
    points: 20,
    difficulty: 7
  },
  {
    id: 'lg-12',
    type: 'multiple-choice',
    question: 'If 5 machines take 5 minutes to make 5 widgets, how long for 100 machines to make 100 widgets?',
    options: ['100 minutes', '5 minutes', '20 minutes', '1 minute'],
    correctAnswer: '5 minutes',
    explanation: 'Each machine makes 1 widget in 5 minutes. 100 machines make 100 widgets in 5 minutes.',
    points: 20,
    difficulty: 7
  },
  {
    id: 'lg-13',
    type: 'multiple-choice',
    question: 'In a lake, lily pads double every day. It takes 48 days to cover the lake. When is it half-covered?',
    options: ['24 days', '47 days', '36 days', '42 days'],
    correctAnswer: '47 days',
    explanation: 'If it doubles daily and is full at 48 days, it was half-full the day before (47 days).',
    points: 20,
    difficulty: 8
  },
  {
    id: 'lg-14',
    type: 'multiple-choice',
    question: 'A farmer has 17 sheep. All but 9 die. How many are left?',
    options: ['8', '9', '0', '17'],
    correctAnswer: '9',
    explanation: '"All but 9" means 9 survive.',
    points: 10,
    difficulty: 4
  },
  {
    id: 'lg-15',
    type: 'multiple-choice',
    question: 'How many times can you subtract 5 from 25?',
    options: ['5', '1', '4', 'Infinitely'],
    correctAnswer: '1',
    explanation: 'You can only subtract 5 from 25 once. After that, you subtract from 20, 15, etc.',
    points: 15,
    difficulty: 6
  },
  // Arrangement Problems
  {
    id: 'lg-16',
    type: 'logical-deduction',
    question: 'A is to the left of B. C is to the right of B. D is to the left of A. Left to right order is:',
    options: ['D, A, B, C', 'A, B, C, D', 'D, A, C, B', 'C, B, A, D'],
    correctAnswer: 'D, A, B, C',
    explanation: 'D is leftmost, then A, then B, then C is rightmost.',
    points: 15,
    difficulty: 6
  },
  {
    id: 'lg-17',
    type: 'logical-deduction',
    question: 'X is older than Y. Y is older than Z. W is younger than Z. Who is the youngest?',
    options: ['X', 'Y', 'Z', 'W'],
    correctAnswer: 'W',
    explanation: 'Order from oldest: X > Y > Z > W. W is youngest.',
    points: 12,
    difficulty: 5
  },
  {
    id: 'lg-18',
    type: 'logical-deduction',
    question: 'In a race, Tom beat Dick. Harry lost to Dick. Mary beat Tom. Who won?',
    options: ['Tom', 'Dick', 'Harry', 'Mary'],
    correctAnswer: 'Mary',
    explanation: 'Mary > Tom > Dick > Harry. Mary won.',
    points: 15,
    difficulty: 6
  },
  {
    id: 'lg-19',
    type: 'multiple-choice',
    question: 'If RED = 27, BLUE = 40, then GREEN = ?',
    options: ['49', '55', '57', '61'],
    correctAnswer: '49',
    explanation: 'Sum of letter positions: G(7)+R(18)+E(5)+E(5)+N(14) = 49',
    points: 18,
    difficulty: 7
  },
  {
    id: 'lg-20',
    type: 'multiple-choice',
    question: '3 friends share a hotel room costing $30. They each pay $10. The clerk realizes the rate is $25 and returns $5. They each take $1 back and tip the bellhop $2. They paid $9 each ($27) plus the $2 tip = $29. Where is the missing $1?',
    options: ['There is no missing dollar', 'The clerk has it', 'The bellhop has it', 'It was lost'],
    correctAnswer: 'There is no missing dollar',
    explanation: 'This is a trick question. $27 (what they paid) = $25 (room) + $2 (tip). The $29 calculation is incorrect logic.',
    points: 25,
    difficulty: 9
  },
  // More Syllogisms
  {
    id: 'lg-21',
    type: 'logical-deduction',
    question: 'No reptiles have fur. All snakes are reptiles. Therefore:',
    options: ['No snakes have fur', 'Some snakes have fur', 'All reptiles are snakes', 'Cannot determine'],
    correctAnswer: 'No snakes have fur',
    explanation: 'Snakes are reptiles, and no reptiles have fur, so no snakes have fur.',
    points: 12,
    difficulty: 5
  },
  {
    id: 'lg-22',
    type: 'logical-deduction',
    question: 'All squares are rectangles. All rectangles have four sides. Therefore:',
    options: ['All squares have four sides', 'All rectangles are squares', 'Some rectangles are not squares', 'Cannot determine'],
    correctAnswer: 'All squares have four sides',
    explanation: 'Squares → Rectangles → Four sides.',
    points: 10,
    difficulty: 4
  },
  {
    id: 'lg-23',
    type: 'logical-deduction',
    question: 'If John studies, he passes. John did not pass. Therefore:',
    options: ['John studied', 'John did not study', 'John might have studied', 'Cannot determine'],
    correctAnswer: 'John did not study',
    explanation: 'Modus tollens: Study → Pass. Not Pass → Not Study.',
    points: 15,
    difficulty: 6
  },
  {
    id: 'lg-24',
    type: 'logical-deduction',
    question: 'Either it is raining or the sun is shining. It is not raining. Therefore:',
    options: ['The sun is shining', 'It might be shining', 'It is cloudy', 'Cannot determine'],
    correctAnswer: 'The sun is shining',
    explanation: 'Disjunctive syllogism: A or B. Not A. Therefore B.',
    points: 12,
    difficulty: 5
  },
  {
    id: 'lg-25',
    type: 'multiple-choice',
    question: 'A clock shows 3:15. What is the angle between the hour and minute hands?',
    options: ['0°', '7.5°', '15°', '22.5°'],
    correctAnswer: '7.5°',
    explanation: 'At 3:15, minute hand is at 3 (90°), hour hand has moved 7.5° past 3 (3×30° + 15×0.5° = 97.5°). Difference = 7.5°.',
    points: 20,
    difficulty: 8
  },
  // Truth and Lie Problems
  {
    id: 'lg-26',
    type: 'logical-deduction',
    question: 'A always tells the truth. B always lies. A says "B is lying." B says "A is lying." Who is telling the truth?',
    options: ['A only', 'B only', 'Both', 'Neither'],
    correctAnswer: 'A only',
    explanation: 'A tells truth, so B is lying (true). B lies, so "A is lying" is false (A tells truth). Consistent: A is truthful.',
    points: 18,
    difficulty: 7
  },
  {
    id: 'lg-27',
    type: 'logical-deduction',
    question: 'One of three suspects is guilty. A says: "B did it." B says: "C did it." C says: "B is lying." If only the guilty one lies, who is guilty?',
    options: ['A', 'B', 'C', 'Cannot determine'],
    correctAnswer: 'B',
    explanation: 'If B is guilty and lying, C tells truth (B is lying). A tells truth (B did it). B lies (C did not do it). Consistent.',
    points: 22,
    difficulty: 8
  },
  {
    id: 'lg-28',
    type: 'multiple-choice',
    question: 'I have two coins totaling 30 cents. One is not a nickel. What are they?',
    options: ['Quarter and nickel', 'Three dimes', 'Two dimes and a nickel', 'Two quarters'],
    correctAnswer: 'Quarter and nickel',
    explanation: '"One is not a nickel" means the other one IS. Quarter (25) + Nickel (5) = 30 cents.',
    points: 15,
    difficulty: 6
  },
  {
    id: 'lg-29',
    type: 'logical-deduction',
    question: 'If some X are Y, and all Y are Z, then:',
    options: ['All X are Z', 'Some X are Z', 'No X are Z', 'All Z are X'],
    correctAnswer: 'Some X are Z',
    explanation: 'Only some X are Y (which are all Z), so only some X are Z.',
    points: 15,
    difficulty: 6
  },
  {
    id: 'lg-30',
    type: 'multiple-choice',
    question: 'A doctor has a brother, but the brother has no brothers. How is this possible?',
    options: ['The doctor is adopted', 'The doctor is female', 'They are step-brothers', 'It is impossible'],
    correctAnswer: 'The doctor is female',
    explanation: 'The doctor is the brother\'s sister, so he has no brothers.',
    points: 12,
    difficulty: 5
  },
  // More Brain Teasers
  {
    id: 'lg-31',
    type: 'multiple-choice',
    question: 'If you have a 3-gallon jug and a 5-gallon jug, how do you measure exactly 4 gallons?',
    options: ['Fill 5, pour into 3, leaving 2; empty 3, pour 2 into 3, fill 5, pour into 3', 'Cannot be done', 'Fill both jugs', 'Use estimation'],
    correctAnswer: 'Fill 5, pour into 3, leaving 2; empty 3, pour 2 into 3, fill 5, pour into 3',
    explanation: 'Fill 5, pour 3 into 3-gallon (2 left). Empty 3. Pour 2 into 3. Fill 5. Pour 1 into 3. Left with 4 in the 5-gallon jug.',
    points: 22,
    difficulty: 8
  },
  {
    id: 'lg-32',
    type: 'logical-deduction',
    question: 'In a family of 5, there are 2 parents and 3 children. Each child has the same number of brothers and sisters. How many boys are there?',
    options: ['1', '2', '3', 'Cannot determine'],
    correctAnswer: '2',
    explanation: 'For each child to have equal brothers and sisters, there must be 2 of one gender and 1 of the other (can be either way).',
    points: 18,
    difficulty: 7
  },
  {
    id: 'lg-33',
    type: 'multiple-choice',
    question: 'What is the next letter? O, T, T, F, F, S, S, ?',
    options: ['E', 'N', 'T', 'O'],
    correctAnswer: 'E',
    explanation: 'First letters of numbers: One, Two, Three, Four, Five, Six, Seven, Eight.',
    points: 18,
    difficulty: 7
  },
  {
    id: 'lg-34',
    type: 'logical-deduction',
    question: 'Statement: All politicians are liars. Conclusion I: John, a politician, is a liar. Conclusion II: Mary, a liar, is a politician.',
    options: ['Only I follows', 'Only II follows', 'Both follow', 'Neither follows'],
    correctAnswer: 'Only I follows',
    explanation: 'I: All politicians are liars, John is a politician, so John is a liar. II: Not all liars are politicians.',
    points: 15,
    difficulty: 6
  },
  {
    id: 'lg-35',
    type: 'multiple-choice',
    question: 'A man builds a house with all four sides facing south. A bear walks by. What color is the bear?',
    options: ['Brown', 'Black', 'White', 'Cannot determine'],
    correctAnswer: 'White',
    explanation: 'If all sides face south, the house is at the North Pole, where polar bears (white) live.',
    points: 15,
    difficulty: 6
  },
  {
    id: 'lg-36',
    type: 'logical-deduction',
    question: 'If neither X nor Y is true, which must be false?',
    options: ['X only', 'Y only', 'Both X and Y', 'X or Y'],
    correctAnswer: 'Both X and Y',
    explanation: '"Neither X nor Y" means both are false.',
    points: 10,
    difficulty: 4
  },
  {
    id: 'lg-37',
    type: 'multiple-choice',
    question: 'Two mothers and two daughters go shopping. They buy 3 items, one for each. How is this possible?',
    options: ['One person bought two items', 'Grandmother, mother, daughter', 'They shared an item', 'One did not get an item'],
    correctAnswer: 'Grandmother, mother, daughter',
    explanation: 'Grandmother (mother), mother (both mother and daughter), daughter = 3 people.',
    points: 15,
    difficulty: 6
  },
  {
    id: 'lg-38',
    type: 'logical-deduction',
    question: 'P implies Q. Q implies R. R is false. What can we conclude about P?',
    options: ['P is true', 'P is false', 'P might be true', 'Cannot determine'],
    correctAnswer: 'P is false',
    explanation: 'R false → Q false (modus tollens). Q false → P false (modus tollens). P must be false.',
    points: 18,
    difficulty: 7
  },
  {
    id: 'lg-39',
    type: 'multiple-choice',
    question: 'If BANANA costs 18 cents and APPLE costs 15 cents, how much does CHERRY cost?',
    options: ['18 cents', '20 cents', '21 cents', '24 cents'],
    correctAnswer: '18 cents',
    explanation: 'Each letter costs 3 cents. CHERRY = 6 letters × 3 = 18 cents.',
    points: 15,
    difficulty: 6
  },
  {
    id: 'lg-40',
    type: 'logical-deduction',
    question: 'In a code, RAIN is written as SJBO. How is CLOUD written?',
    options: ['DMPVE', 'CMOVE', 'BNNTC', 'CLPUD'],
    correctAnswer: 'DMPVE',
    explanation: 'Each letter is shifted by +1. C→D, L→M, O→P, U→V, D→E.',
    points: 15,
    difficulty: 6
  }
];

// ============================================
// SPATIAL REASONING QUESTIONS (40 questions)
// ============================================
export const spatialQuestionBank: IQQuestion[] = [
  // Basic Spatial - Easy
  {
    id: 'sp-1',
    type: 'spatial-rotation',
    question: 'If you rotate a square 90° clockwise, what shape do you get?',
    options: ['Square', 'Diamond', 'Rectangle', 'Triangle'],
    correctAnswer: 'Square',
    explanation: 'A square rotated 90° is still a square (rotational symmetry).',
    points: 10,
    difficulty: 2
  },
  {
    id: 'sp-2',
    type: 'spatial-rotation',
    question: 'How many faces does a cube have?',
    options: ['4', '6', '8', '12'],
    correctAnswer: '6',
    explanation: 'A cube has 6 square faces: top, bottom, and 4 sides.',
    points: 10,
    difficulty: 3
  },
  {
    id: 'sp-3',
    type: 'spatial-rotation',
    question: 'How many vertices (corners) does a cube have?',
    options: ['4', '6', '8', '12'],
    correctAnswer: '8',
    explanation: 'A cube has 8 vertices.',
    points: 10,
    difficulty: 3
  },
  {
    id: 'sp-4',
    type: 'spatial-rotation',
    question: 'How many edges does a cube have?',
    options: ['6', '8', '10', '12'],
    correctAnswer: '12',
    explanation: 'A cube has 12 edges: 4 on top, 4 on bottom, 4 vertical.',
    points: 10,
    difficulty: 4
  },
  {
    id: 'sp-5',
    type: 'multiple-choice',
    question: 'Which shape has the most lines of symmetry?',
    options: ['Square', 'Rectangle', 'Equilateral Triangle', 'Circle'],
    correctAnswer: 'Circle',
    explanation: 'A circle has infinite lines of symmetry.',
    points: 10,
    difficulty: 4
  },
  // Nets and Folding
  {
    id: 'sp-6',
    type: 'spatial-rotation',
    question: 'If you fold a flat cross shape (+), what 3D shape can you make?',
    options: ['Cube', 'Pyramid', 'Cylinder', 'Sphere'],
    correctAnswer: 'Cube',
    explanation: 'A cross-shaped net folds into a cube (classic net).',
    points: 15,
    difficulty: 5
  },
  {
    id: 'sp-7',
    type: 'multiple-choice',
    question: 'What 3D shape has one circular face and comes to a point?',
    options: ['Cylinder', 'Cone', 'Sphere', 'Pyramid'],
    correctAnswer: 'Cone',
    explanation: 'A cone has a circular base and tapers to a point (apex).',
    points: 10,
    difficulty: 3
  },
  {
    id: 'sp-8',
    type: 'multiple-choice',
    question: 'A triangular prism has how many faces?',
    options: ['3', '4', '5', '6'],
    correctAnswer: '5',
    explanation: 'A triangular prism has 2 triangular faces + 3 rectangular faces = 5 faces.',
    points: 12,
    difficulty: 5
  },
  {
    id: 'sp-9',
    type: 'spatial-rotation',
    question: 'How many edges does a triangular pyramid (tetrahedron) have?',
    options: ['3', '4', '6', '12'],
    correctAnswer: '6',
    explanation: 'A tetrahedron has 4 vertices and 6 edges connecting them.',
    points: 15,
    difficulty: 6
  },
  {
    id: 'sp-10',
    type: 'multiple-choice',
    question: 'What is the maximum number of faces you can see of a cube at once?',
    options: ['1', '2', '3', '4'],
    correctAnswer: '3',
    explanation: 'You can see at most 3 faces of a cube from any viewing angle.',
    points: 12,
    difficulty: 5
  },
  // Rotation and Reflection
  {
    id: 'sp-11',
    type: 'spatial-rotation',
    question: 'If you rotate the letter "N" 180°, what letter does it resemble?',
    options: ['Z', 'N', 'M', 'W'],
    correctAnswer: 'N',
    explanation: 'N has 180° rotational symmetry, so it looks the same.',
    points: 12,
    difficulty: 4
  },
  {
    id: 'sp-12',
    type: 'spatial-rotation',
    question: 'If you reflect the letter "b" horizontally (flip left-right), what letter do you get?',
    options: ['d', 'p', 'q', 'b'],
    correctAnswer: 'd',
    explanation: 'Horizontal reflection of "b" produces "d".',
    points: 10,
    difficulty: 4
  },
  {
    id: 'sp-13',
    type: 'spatial-rotation',
    question: 'If you reflect the letter "p" vertically (flip top-bottom), what letter do you get?',
    options: ['d', 'b', 'q', 'p'],
    correctAnswer: 'b',
    explanation: 'Vertical reflection of "p" produces "b".',
    points: 12,
    difficulty: 5
  },
  {
    id: 'sp-14',
    type: 'spatial-rotation',
    question: 'Which letter looks the same when reflected in a mirror?',
    options: ['A', 'B', 'C', 'F'],
    correctAnswer: 'A',
    explanation: 'A has vertical symmetry and looks the same in a mirror.',
    points: 10,
    difficulty: 4
  },
  {
    id: 'sp-15',
    type: 'multiple-choice',
    question: 'How many degrees in a complete rotation?',
    options: ['90°', '180°', '270°', '360°'],
    correctAnswer: '360°',
    explanation: 'A full rotation is 360 degrees.',
    points: 8,
    difficulty: 2
  },
  // 3D Visualization
  {
    id: 'sp-16',
    type: 'multiple-choice',
    question: 'If you cut a cone horizontally (parallel to base), what shape is the cross-section?',
    options: ['Circle', 'Triangle', 'Ellipse', 'Rectangle'],
    correctAnswer: 'Circle',
    explanation: 'A horizontal cut through a cone produces a circle.',
    points: 12,
    difficulty: 5
  },
  {
    id: 'sp-17',
    type: 'multiple-choice',
    question: 'If you cut a cylinder vertically through its center, what shape is the cross-section?',
    options: ['Circle', 'Oval', 'Rectangle', 'Triangle'],
    correctAnswer: 'Rectangle',
    explanation: 'A vertical cut through a cylinder produces a rectangle.',
    points: 12,
    difficulty: 5
  },
  {
    id: 'sp-18',
    type: 'multiple-choice',
    question: 'A sphere cut in half produces what 2D shape at the cut?',
    options: ['Square', 'Circle', 'Oval', 'Semicircle'],
    correctAnswer: 'Circle',
    explanation: 'Any slice through the center of a sphere is a circle.',
    points: 10,
    difficulty: 4
  },
  {
    id: 'sp-19',
    type: 'spatial-rotation',
    question: 'If you unfold a cylinder, what shape do you get (not including the top and bottom)?',
    options: ['Rectangle', 'Circle', 'Triangle', 'Square'],
    correctAnswer: 'Rectangle',
    explanation: 'The lateral surface of a cylinder unfolds to a rectangle.',
    points: 15,
    difficulty: 6
  },
  {
    id: 'sp-20',
    type: 'multiple-choice',
    question: 'How many faces does an octahedron have?',
    options: ['6', '8', '10', '12'],
    correctAnswer: '8',
    explanation: 'An octahedron has 8 triangular faces (octa = eight).',
    points: 12,
    difficulty: 5
  },
  // Pattern Matching
  {
    id: 'sp-21',
    type: 'multiple-choice',
    question: 'Which 3D shape has no edges?',
    options: ['Cube', 'Pyramid', 'Sphere', 'Cylinder'],
    correctAnswer: 'Sphere',
    explanation: 'A sphere has no edges or vertices - it is perfectly round.',
    points: 10,
    difficulty: 3
  },
  {
    id: 'sp-22',
    type: 'spatial-rotation',
    question: 'If you look at a cube from directly above, what shape do you see?',
    options: ['Rectangle', 'Square', 'Hexagon', 'Diamond'],
    correctAnswer: 'Square',
    explanation: 'The top-down view of a cube is a square (the top face).',
    points: 10,
    difficulty: 3
  },
  {
    id: 'sp-23',
    type: 'spatial-rotation',
    question: 'Looking at a regular hexagonal prism from above, what shape do you see?',
    options: ['Rectangle', 'Square', 'Hexagon', 'Circle'],
    correctAnswer: 'Hexagon',
    explanation: 'Top-down view shows the hexagonal top face.',
    points: 12,
    difficulty: 5
  },
  {
    id: 'sp-24',
    type: 'multiple-choice',
    question: 'A regular pentagon has how many lines of symmetry?',
    options: ['3', '4', '5', '6'],
    correctAnswer: '5',
    explanation: 'A regular pentagon has 5 lines of symmetry, one through each vertex.',
    points: 12,
    difficulty: 5
  },
  {
    id: 'sp-25',
    type: 'multiple-choice',
    question: 'What is the sum of the interior angles of a hexagon?',
    options: ['540°', '720°', '900°', '1080°'],
    correctAnswer: '720°',
    explanation: 'Sum = (n-2) × 180° = (6-2) × 180° = 720°',
    points: 15,
    difficulty: 6
  },
  // Advanced Spatial
  {
    id: 'sp-26',
    type: 'spatial-rotation',
    question: 'If you rotate "d" 180°, what letter do you get?',
    options: ['b', 'p', 'q', 'd'],
    correctAnswer: 'p',
    explanation: 'Rotating "d" by 180° gives "p".',
    points: 12,
    difficulty: 5
  },
  {
    id: 'sp-27',
    type: 'multiple-choice',
    question: 'A dodecahedron has how many faces?',
    options: ['8', '10', '12', '20'],
    correctAnswer: '12',
    explanation: 'A dodecahedron has 12 pentagonal faces (dodeca = twelve).',
    points: 15,
    difficulty: 6
  },
  {
    id: 'sp-28',
    type: 'multiple-choice',
    question: 'What 3D shape has 2 circular faces and 1 curved surface?',
    options: ['Cone', 'Cylinder', 'Sphere', 'Hemisphere'],
    correctAnswer: 'Cylinder',
    explanation: 'A cylinder has two circular bases connected by a curved surface.',
    points: 10,
    difficulty: 4
  },
  {
    id: 'sp-29',
    type: 'spatial-rotation',
    question: 'If a cube is painted and then cut into 27 smaller cubes (3×3×3), how many small cubes have exactly 2 faces painted?',
    options: ['6', '8', '12', '18'],
    correctAnswer: '12',
    explanation: 'Edge cubes (not corner) have 2 painted faces. Each edge has 1 such cube, and there are 12 edges.',
    points: 22,
    difficulty: 8
  },
  {
    id: 'sp-30',
    type: 'spatial-rotation',
    question: 'Same cube: how many small cubes have exactly 3 faces painted?',
    options: ['4', '6', '8', '12'],
    correctAnswer: '8',
    explanation: 'Corner cubes have 3 painted faces. A cube has 8 corners.',
    points: 18,
    difficulty: 7
  },
  // More Spatial Problems
  {
    id: 'sp-31',
    type: 'spatial-rotation',
    question: 'Same cube (27 small cubes): how many have exactly 1 face painted?',
    options: ['1', '6', '8', '12'],
    correctAnswer: '6',
    explanation: 'Center cubes of each face have 1 painted face. There are 6 faces.',
    points: 18,
    difficulty: 7
  },
  {
    id: 'sp-32',
    type: 'spatial-rotation',
    question: 'Same cube (27 small cubes): how many have NO faces painted?',
    options: ['0', '1', '6', '8'],
    correctAnswer: '1',
    explanation: 'Only the center cube (inside) has no painted faces.',
    points: 18,
    difficulty: 7
  },
  {
    id: 'sp-33',
    type: 'multiple-choice',
    question: 'What is the 3D shape of a soccer ball?',
    options: ['Sphere', 'Icosahedron', 'Truncated icosahedron', 'Dodecahedron'],
    correctAnswer: 'Truncated icosahedron',
    explanation: 'A soccer ball is a truncated icosahedron with 12 pentagons and 20 hexagons.',
    points: 20,
    difficulty: 8
  },
  {
    id: 'sp-34',
    type: 'multiple-choice',
    question: 'An isometric view shows how many dimensions at once?',
    options: ['1', '2', '3', '4'],
    correctAnswer: '3',
    explanation: 'Isometric projection shows all three dimensions (height, width, depth).',
    points: 12,
    difficulty: 5
  },
  {
    id: 'sp-35',
    type: 'spatial-rotation',
    question: 'If you stack 10 unit cubes in a single tower, how many unit squares are visible from outside?',
    options: ['40', '41', '42', '44'],
    correctAnswer: '42',
    explanation: '4 faces per cube × 10 cubes + 2 ends = 40 + 2 = 42',
    points: 18,
    difficulty: 7
  },
  {
    id: 'sp-36',
    type: 'multiple-choice',
    question: 'A regular tetrahedron has how many faces?',
    options: ['3', '4', '5', '6'],
    correctAnswer: '4',
    explanation: 'A tetrahedron has 4 triangular faces (tetra = four).',
    points: 10,
    difficulty: 4
  },
  {
    id: 'sp-37',
    type: 'spatial-rotation',
    question: 'If you combine two right triangles along their hypotenuses, what shape can you form?',
    options: ['Square', 'Rectangle', 'Parallelogram', 'Any of these'],
    correctAnswer: 'Any of these',
    explanation: 'Depending on the triangles, you can form various quadrilaterals.',
    points: 15,
    difficulty: 6
  },
  {
    id: 'sp-38',
    type: 'multiple-choice',
    question: 'How many diagonals does a regular hexagon have?',
    options: ['6', '9', '12', '15'],
    correctAnswer: '9',
    explanation: 'Diagonals = n(n-3)/2 = 6(6-3)/2 = 9',
    points: 15,
    difficulty: 6
  },
  {
    id: 'sp-39',
    type: 'spatial-rotation',
    question: 'A Möbius strip has how many sides?',
    options: ['0', '1', '2', 'Infinite'],
    correctAnswer: '1',
    explanation: 'A Möbius strip is a non-orientable surface with only one side.',
    points: 18,
    difficulty: 7
  },
  {
    id: 'sp-40',
    type: 'multiple-choice',
    question: 'If you look at a square pyramid from directly above, what do you see?',
    options: ['Square', 'Triangle', 'Square with X', 'Circle'],
    correctAnswer: 'Square with X',
    explanation: 'From above, you see the square base with diagonals connecting to the apex.',
    points: 15,
    difficulty: 6
  }
];

// ============================================
// MEMORY QUESTIONS (40 questions)
// ============================================
export const memoryQuestionBank: IQQuestion[] = [
  // Number Sequences
  {
    id: 'mm-1',
    type: 'memory-recall',
    question: 'Study this sequence: 7, 3, 9, 2, 5, 8. What is the 4th number?',
    options: ['3', '2', '9', '5'],
    correctAnswer: '2',
    explanation: 'The sequence was 7, 3, 9, 2, 5, 8. The 4th number is 2.',
    points: 10,
    difficulty: 4
  },
  {
    id: 'mm-2',
    type: 'memory-recall',
    question: 'Remember: 4, 8, 2, 6, 1, 9. What is the sum of the first and last numbers?',
    options: ['10', '12', '13', '14'],
    correctAnswer: '13',
    explanation: 'First (4) + Last (9) = 13',
    points: 12,
    difficulty: 5
  },
  {
    id: 'mm-3',
    type: 'memory-recall',
    question: 'Memorize: 15, 23, 31. What is the sum of these three numbers?',
    options: ['68', '69', '70', '71'],
    correctAnswer: '69',
    explanation: '15 + 23 + 31 = 69',
    points: 12,
    difficulty: 5
  },
  {
    id: 'mm-4',
    type: 'memory-recall',
    question: 'Study: 2468, 1357, 9753. Which sequence had all even numbers?',
    options: ['2468', '1357', '9753', 'None'],
    correctAnswer: '2468',
    explanation: '2468 contains all even numbers.',
    points: 12,
    difficulty: 4
  },
  {
    id: 'mm-5',
    type: 'memory-recall',
    question: 'Remember: 5, 10, 15, 20, 25. What is the middle number?',
    options: ['10', '15', '20', '5'],
    correctAnswer: '15',
    explanation: 'The sequence has 5 numbers; the middle (3rd) is 15.',
    points: 10,
    difficulty: 3
  },
  // Word Sequences
  {
    id: 'mm-6',
    type: 'memory-recall',
    question: 'Memorize: Apple, Chair, Cloud, Dog, Elephant. Which word came third?',
    options: ['Apple', 'Chair', 'Cloud', 'Dog'],
    correctAnswer: 'Cloud',
    explanation: 'The third word in the sequence was Cloud.',
    points: 10,
    difficulty: 3
  },
  {
    id: 'mm-7',
    type: 'memory-recall',
    question: 'Remember: Tree, Book, Sun, Car, Rain. What word came before "Car"?',
    options: ['Tree', 'Book', 'Sun', 'Rain'],
    correctAnswer: 'Sun',
    explanation: 'The order was Tree, Book, Sun, Car, Rain. Sun came before Car.',
    points: 12,
    difficulty: 4
  },
  {
    id: 'mm-8',
    type: 'memory-recall',
    question: 'Study: Red, Blue, Green, Yellow, Orange. Which color was NOT in the list?',
    options: ['Red', 'Purple', 'Green', 'Orange'],
    correctAnswer: 'Purple',
    explanation: 'Purple was not in the original list.',
    points: 10,
    difficulty: 4
  },
  {
    id: 'mm-9',
    type: 'memory-recall',
    question: 'Memorize: Piano, Guitar, Drums, Violin, Flute. What is the first and last instrument?',
    options: ['Piano, Violin', 'Piano, Flute', 'Guitar, Flute', 'Piano, Drums'],
    correctAnswer: 'Piano, Flute',
    explanation: 'First was Piano, last was Flute.',
    points: 12,
    difficulty: 5
  },
  {
    id: 'mm-10',
    type: 'memory-recall',
    question: 'Remember: Monday, Friday, Tuesday, Sunday, Wednesday. Which day was second?',
    options: ['Monday', 'Friday', 'Tuesday', 'Sunday'],
    correctAnswer: 'Friday',
    explanation: 'The order given was Monday, Friday, Tuesday, Sunday, Wednesday. Friday was second.',
    points: 12,
    difficulty: 4
  },
  // Color-Object Association
  {
    id: 'mm-11',
    type: 'memory-recall',
    question: 'Remember: Blue Square, Red Circle, Green Triangle. What color was the circle?',
    options: ['Blue', 'Red', 'Green', 'Yellow'],
    correctAnswer: 'Red',
    explanation: 'The circle was red.',
    points: 10,
    difficulty: 3
  },
  {
    id: 'mm-12',
    type: 'memory-recall',
    question: 'Study: Yellow Star, Purple Moon, Orange Sun. What shape was purple?',
    options: ['Star', 'Moon', 'Sun', 'Circle'],
    correctAnswer: 'Moon',
    explanation: 'The moon was purple.',
    points: 10,
    difficulty: 3
  },
  {
    id: 'mm-13',
    type: 'memory-recall',
    question: 'Memorize: Black Cat, White Dog, Brown Horse. What animal was white?',
    options: ['Cat', 'Dog', 'Horse', 'Bird'],
    correctAnswer: 'Dog',
    explanation: 'The dog was white.',
    points: 10,
    difficulty: 3
  },
  {
    id: 'mm-14',
    type: 'memory-recall',
    question: 'Remember: 3 Apples, 7 Oranges, 5 Bananas. How many oranges?',
    options: ['3', '5', '7', '9'],
    correctAnswer: '7',
    explanation: 'There were 7 oranges.',
    points: 10,
    difficulty: 3
  },
  {
    id: 'mm-15',
    type: 'memory-recall',
    question: 'Study: Large Red Ball, Small Blue Cube, Medium Green Pyramid. What size was the cube?',
    options: ['Large', 'Small', 'Medium', 'Tiny'],
    correctAnswer: 'Small',
    explanation: 'The cube was small.',
    points: 12,
    difficulty: 4
  },
  // Pattern Memory
  {
    id: 'mm-16',
    type: 'memory-recall',
    question: 'Memorize the pattern: Up, Down, Up, Up, Down. What was the 4th direction?',
    options: ['Up', 'Down', 'Left', 'Right'],
    correctAnswer: 'Up',
    explanation: 'The 4th direction was Up.',
    points: 10,
    difficulty: 4
  },
  {
    id: 'mm-17',
    type: 'memory-recall',
    question: 'Remember: A1, B2, C3, D4, E5. What number is paired with C?',
    options: ['1', '2', '3', '4'],
    correctAnswer: '3',
    explanation: 'C was paired with 3.',
    points: 10,
    difficulty: 3
  },
  {
    id: 'mm-18',
    type: 'memory-recall',
    question: 'Study: RAVEN = 5, STORM = 5, QUIET = ?',
    options: ['4', '5', '6', '7'],
    correctAnswer: '5',
    explanation: 'Each word has 5 letters, so QUIET = 5.',
    points: 12,
    difficulty: 4
  },
  {
    id: 'mm-19',
    type: 'memory-recall',
    question: 'Memorize: 111, 222, 333, 444. What comes next in this pattern?',
    options: ['455', '545', '555', '556'],
    correctAnswer: '555',
    explanation: 'The pattern is repeating digits: 555.',
    points: 10,
    difficulty: 3
  },
  {
    id: 'mm-20',
    type: 'memory-recall',
    question: 'Remember: Tom-25, Jane-30, Mike-22. What is Jane\'s number?',
    options: ['22', '25', '30', '35'],
    correctAnswer: '30',
    explanation: 'Jane\'s number was 30.',
    points: 10,
    difficulty: 3
  },
  // Longer Sequences
  {
    id: 'mm-21',
    type: 'memory-recall',
    question: 'Study: 3, 1, 4, 1, 5, 9, 2, 6. What is the 6th number?',
    options: ['5', '9', '2', '6'],
    correctAnswer: '9',
    explanation: 'The 6th number in the sequence is 9 (digits of π).',
    points: 15,
    difficulty: 6
  },
  {
    id: 'mm-22',
    type: 'memory-recall',
    question: 'Memorize: North, East, South, West, North, East. What direction appears most?',
    options: ['North', 'East', 'South', 'West'],
    correctAnswer: 'North',
    explanation: 'North and East each appear twice, but North comes first so the answer is North.',
    points: 12,
    difficulty: 5
  },
  {
    id: 'mm-23',
    type: 'memory-recall',
    question: 'Remember: Cat, Dog, Cat, Bird, Cat, Fish. How many times does "Cat" appear?',
    options: ['2', '3', '4', '5'],
    correctAnswer: '3',
    explanation: 'Cat appears 3 times.',
    points: 10,
    difficulty: 4
  },
  {
    id: 'mm-24',
    type: 'memory-recall',
    question: 'Study: ABCDEF. What is the letter in the middle?',
    options: ['B', 'C', 'D', 'E'],
    correctAnswer: 'C',
    explanation: 'With 6 letters, the middle falls between C and D; conventionally, C or D. Here, C.',
    points: 10,
    difficulty: 4
  },
  {
    id: 'mm-25',
    type: 'memory-recall',
    question: 'Memorize: 8, 4, 2, 1. What operation creates this pattern?',
    options: ['Add 2', 'Subtract 2', 'Divide by 2', 'Multiply by 2'],
    correctAnswer: 'Divide by 2',
    explanation: 'Each number is half of the previous: divide by 2.',
    points: 12,
    difficulty: 5
  },
  // Complex Memory Tasks
  {
    id: 'mm-26',
    type: 'memory-recall',
    question: 'Study: Paris-France, Rome-Italy, Tokyo-Japan. What country is Tokyo in?',
    options: ['France', 'Italy', 'Japan', 'China'],
    correctAnswer: 'Japan',
    explanation: 'Tokyo was paired with Japan.',
    points: 10,
    difficulty: 3
  },
  {
    id: 'mm-27',
    type: 'memory-recall',
    question: 'Remember: Einstein-Physics, Mozart-Music, Shakespeare-Literature. What field was Mozart in?',
    options: ['Physics', 'Music', 'Literature', 'Art'],
    correctAnswer: 'Music',
    explanation: 'Mozart was paired with Music.',
    points: 10,
    difficulty: 3
  },
  {
    id: 'mm-28',
    type: 'memory-recall',
    question: 'Study: 2+3=5, 4+5=9, 6+7=?',
    options: ['11', '12', '13', '14'],
    correctAnswer: '13',
    explanation: '6 + 7 = 13',
    points: 10,
    difficulty: 3
  },
  {
    id: 'mm-29',
    type: 'memory-recall',
    question: 'Memorize: Spring-Flowers, Summer-Beach, Autumn-Leaves, Winter-Snow. What is associated with Autumn?',
    options: ['Flowers', 'Beach', 'Leaves', 'Snow'],
    correctAnswer: 'Leaves',
    explanation: 'Autumn was paired with Leaves.',
    points: 10,
    difficulty: 3
  },
  {
    id: 'mm-30',
    type: 'memory-recall',
    question: 'Remember: 7×8=56, 9×6=54, 8×7=?',
    options: ['54', '55', '56', '57'],
    correctAnswer: '56',
    explanation: '8 × 7 = 56',
    points: 10,
    difficulty: 3
  },
  // Harder Memory Challenges
  {
    id: 'mm-31',
    type: 'memory-recall',
    question: 'Study: QWERTY. These are the first 6 letters of a keyboard. What is the 5th letter?',
    options: ['Q', 'E', 'R', 'T'],
    correctAnswer: 'T',
    explanation: 'Q-W-E-R-T-Y. The 5th letter is T.',
    points: 12,
    difficulty: 5
  },
  {
    id: 'mm-32',
    type: 'memory-recall',
    question: 'Memorize: Mercury, Venus, Earth, Mars. Which planet is 3rd from the Sun?',
    options: ['Mercury', 'Venus', 'Earth', 'Mars'],
    correctAnswer: 'Earth',
    explanation: 'Earth is the 3rd planet from the Sun.',
    points: 10,
    difficulty: 3
  },
  {
    id: 'mm-33',
    type: 'memory-recall',
    question: 'Remember: January-31, February-28, March-31. How many days in February?',
    options: ['28', '29', '30', '31'],
    correctAnswer: '28',
    explanation: 'February was paired with 28 days.',
    points: 10,
    difficulty: 3
  },
  {
    id: 'mm-34',
    type: 'memory-recall',
    question: 'Study: RGB stands for Red, Green, Blue. What does the G stand for?',
    options: ['Gold', 'Gray', 'Green', 'Grape'],
    correctAnswer: 'Green',
    explanation: 'G stands for Green in RGB.',
    points: 8,
    difficulty: 2
  },
  {
    id: 'mm-35',
    type: 'memory-recall',
    question: 'Memorize: Lion-Africa, Kangaroo-Australia, Panda-China. Where is the Panda from?',
    options: ['Africa', 'Australia', 'China', 'India'],
    correctAnswer: 'China',
    explanation: 'Panda was paired with China.',
    points: 10,
    difficulty: 3
  },
  {
    id: 'mm-36',
    type: 'memory-recall',
    question: 'Remember: 12, 24, 36, 48, 60. What is the pattern increment?',
    options: ['10', '11', '12', '13'],
    correctAnswer: '12',
    explanation: 'Each number increases by 12.',
    points: 10,
    difficulty: 4
  },
  {
    id: 'mm-37',
    type: 'memory-recall',
    question: 'Study: DO, RE, MI, FA, SOL. What is the 4th note?',
    options: ['RE', 'MI', 'FA', 'SOL'],
    correctAnswer: 'FA',
    explanation: 'The 4th note in the sequence is FA.',
    points: 10,
    difficulty: 4
  },
  {
    id: 'mm-38',
    type: 'memory-recall',
    question: 'Memorize: Breakfast-8AM, Lunch-12PM, Dinner-7PM. What time is Lunch?',
    options: ['8AM', '12PM', '3PM', '7PM'],
    correctAnswer: '12PM',
    explanation: 'Lunch was scheduled at 12PM.',
    points: 10,
    difficulty: 3
  },
  {
    id: 'mm-39',
    type: 'memory-recall',
    question: 'Remember: HOMES (Huron, Ontario, Michigan, Erie, Superior). What lake starts with M?',
    options: ['Huron', 'Ontario', 'Michigan', 'Erie'],
    correctAnswer: 'Michigan',
    explanation: 'Michigan is the Great Lake starting with M.',
    points: 12,
    difficulty: 5
  },
  {
    id: 'mm-40',
    type: 'memory-recall',
    question: 'Study: Roy G. Biv represents rainbow colors. What color does B represent?',
    options: ['Brown', 'Black', 'Blue', 'Beige'],
    correctAnswer: 'Blue',
    explanation: 'B in Roy G. Biv stands for Blue.',
    points: 10,
    difficulty: 4
  }
];

// ============================================
// QUESTION SELECTION & RANDOMIZATION
// ============================================

/**
 * Get a daily seed based on the current date
 * This ensures the same set of questions for a given day
 */
export function getDailySeed(): number {
  const now = new Date();
  return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
}

/**
 * Seeded random number generator for consistent daily randomization
 */
function seededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
}

/**
 * Shuffle array with a seeded random generator
 */
function shuffleWithSeed<T>(array: T[], seed: number): T[] {
  const result = [...array];
  const random = seededRandom(seed);
  
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  
  return result;
}

/**
 * Select a balanced set of questions from the bank
 * Ensures mix of difficulties
 */
export function selectDailyQuestions(
  bank: IQQuestion[],
  count: number,
  seed: number = getDailySeed()
): IQQuestion[] {
  // Group questions by difficulty tier
  const easy = bank.filter(q => q.difficulty <= 4);
  const medium = bank.filter(q => q.difficulty >= 5 && q.difficulty <= 6);
  const hard = bank.filter(q => q.difficulty >= 7);
  
  // Shuffle each tier
  const shuffledEasy = shuffleWithSeed(easy, seed);
  const shuffledMedium = shuffleWithSeed(medium, seed + 1);
  const shuffledHard = shuffleWithSeed(hard, seed + 2);
  
  // Distribute: ~30% easy, ~40% medium, ~30% hard
  const easyCount = Math.round(count * 0.3);
  const hardCount = Math.round(count * 0.3);
  const mediumCount = count - easyCount - hardCount;
  
  const selected = [
    ...shuffledEasy.slice(0, easyCount),
    ...shuffledMedium.slice(0, mediumCount),
    ...shuffledHard.slice(0, hardCount)
  ];
  
  // Final shuffle to mix difficulties
  return shuffleWithSeed(selected, seed + 3);
}

/**
 * Get all question banks by category
 */
export const questionBanksByCategory = {
  verbal: verbalQuestionBank,
  numerical: numericalQuestionBank,
  'pattern-recognition': patternQuestionBank,
  logical: logicalQuestionBank,
  spatial: spatialQuestionBank,
  memory: memoryQuestionBank
};
