// Children's IQ Question Bank
// Age-appropriate cognitive assessments for children

import { IQQuestion, IQTest } from './iqTests';

// ============================================
// AGES 5-8: YOUNG CHILDREN QUESTIONS
// Visual, simple patterns, basic counting
// ============================================

export const youngChildrenQuestions: IQQuestion[] = [
  // Simple Pattern Recognition
  {
    id: 'yc-1',
    type: 'pattern-completion',
    question: 'What shape comes next? ⭐ ⭐ 🌙 ⭐ ⭐ 🌙 ⭐ ⭐ ?',
    options: ['⭐', '🌙', '☀️', '🌈'],
    correctAnswer: '🌙',
    explanation: 'The pattern repeats: two stars, then a moon. So the moon comes next!',
    points: 8,
    difficulty: 2
  },
  {
    id: 'yc-2',
    type: 'pattern-completion',
    question: 'What color comes next? 🔴 🔵 🔴 🔵 🔴 ?',
    options: ['🔴', '🔵', '🟢', '🟡'],
    correctAnswer: '🔵',
    explanation: 'Red and blue take turns. Red, blue, red, blue, red... blue comes next!',
    points: 8,
    difficulty: 1
  },
  {
    id: 'yc-3',
    type: 'pattern-completion',
    question: 'What comes next? 🍎 🍊 🍋 🍎 🍊 🍋 🍎 🍊 ?',
    options: ['🍎', '🍊', '🍋', '🍇'],
    correctAnswer: '🍋',
    explanation: 'Apple, orange, lemon keeps repeating. After orange comes lemon!',
    points: 8,
    difficulty: 2
  },
  {
    id: 'yc-4',
    type: 'pattern-completion',
    question: 'Which animal comes next? 🐕 🐈 🐕 🐈 🐕 ?',
    options: ['🐕', '🐈', '🐦', '🐰'],
    correctAnswer: '🐈',
    explanation: 'Dog and cat take turns. After dog comes cat!',
    points: 8,
    difficulty: 1
  },
  {
    id: 'yc-5',
    type: 'pattern-completion',
    question: 'What comes next? ⬆️ ➡️ ⬇️ ⬅️ ⬆️ ➡️ ⬇️ ?',
    options: ['⬆️', '➡️', '⬇️', '⬅️'],
    correctAnswer: '⬅️',
    explanation: 'The arrow goes up, right, down, left and repeats. Left comes next!',
    points: 10,
    difficulty: 3
  },
  
  // Simple Counting
  {
    id: 'yc-6',
    type: 'numeric-input',
    question: 'Count the stars: ⭐ ⭐ ⭐ ⭐ ⭐ How many are there?',
    correctAnswer: 5,
    explanation: 'There are 5 stars when you count them one by one.',
    points: 8,
    difficulty: 1
  },
  {
    id: 'yc-7',
    type: 'sequence',
    question: 'What number comes next? 1, 2, 3, 4, ?',
    options: ['5', '6', '4', '3'],
    correctAnswer: '5',
    explanation: 'We count up by 1 each time: 1, 2, 3, 4, 5!',
    points: 8,
    difficulty: 1
  },
  {
    id: 'yc-8',
    type: 'sequence',
    question: 'What number comes next? 2, 4, 6, 8, ?',
    options: ['9', '10', '11', '12'],
    correctAnswer: '10',
    explanation: 'We skip count by 2: 2, 4, 6, 8, 10!',
    points: 10,
    difficulty: 2
  },
  {
    id: 'yc-9',
    type: 'multiple-choice',
    question: 'Which group has MORE? Group A: 🍎🍎🍎 or Group B: 🍎🍎🍎🍎🍎',
    options: ['Group A (3 apples)', 'Group B (5 apples)', 'They are the same'],
    correctAnswer: 'Group B (5 apples)',
    explanation: 'Group B has 5 apples, which is more than Group A with 3 apples.',
    points: 8,
    difficulty: 1
  },
  {
    id: 'yc-10',
    type: 'sequence',
    question: 'What comes next? 5, 10, 15, 20, ?',
    options: ['21', '25', '30', '22'],
    correctAnswer: '25',
    explanation: 'We count by 5s: 5, 10, 15, 20, 25!',
    points: 10,
    difficulty: 3
  },

  // Simple Matching & Odd One Out
  {
    id: 'yc-11',
    type: 'multiple-choice',
    question: 'Which one is different? 🐕 🐈 🐦 🚗',
    options: ['Dog', 'Cat', 'Bird', 'Car'],
    correctAnswer: 'Car',
    explanation: 'Dog, cat, and bird are all animals. Car is not an animal!',
    points: 8,
    difficulty: 2
  },
  {
    id: 'yc-12',
    type: 'multiple-choice',
    question: 'Which one does NOT belong? 🍎 🍊 🥕 🍋',
    options: ['Apple', 'Orange', 'Carrot', 'Lemon'],
    correctAnswer: 'Carrot',
    explanation: 'Apple, orange, and lemon are fruits. Carrot is a vegetable!',
    points: 10,
    difficulty: 2
  },
  {
    id: 'yc-13',
    type: 'multiple-choice',
    question: 'Which one is different? ✏️ 📝 🖍️ 🎾',
    options: ['Pencil', 'Paper', 'Crayon', 'Tennis ball'],
    correctAnswer: 'Tennis ball',
    explanation: 'Pencil, paper, and crayon are for drawing. Tennis ball is for playing!',
    points: 10,
    difficulty: 2
  },
  {
    id: 'yc-14',
    type: 'multiple-choice',
    question: 'Which one does NOT fly? 🦅 🛩️ 🐘 🦋',
    options: ['Eagle', 'Airplane', 'Elephant', 'Butterfly'],
    correctAnswer: 'Elephant',
    explanation: 'Eagles, airplanes, and butterflies can fly. Elephants cannot fly!',
    points: 8,
    difficulty: 2
  },
  {
    id: 'yc-15',
    type: 'multiple-choice',
    question: 'Which shape is different? ⬜ ⬜ ⬜ ⚪',
    options: ['First shape', 'Second shape', 'Third shape', 'Fourth shape'],
    correctAnswer: 'Fourth shape',
    explanation: 'The first three are squares. The fourth is a circle!',
    points: 8,
    difficulty: 1
  },

  // Simple Analogies
  {
    id: 'yc-16',
    type: 'analogy',
    question: 'Day is to Light as Night is to ?',
    options: ['Moon', 'Dark', 'Stars', 'Sleep'],
    correctAnswer: 'Dark',
    explanation: 'Day time has light. Night time has dark!',
    points: 10,
    difficulty: 3
  },
  {
    id: 'yc-17',
    type: 'analogy',
    question: 'Bird is to Fly as Fish is to ?',
    options: ['Walk', 'Run', 'Swim', 'Jump'],
    correctAnswer: 'Swim',
    explanation: 'Birds fly in the air. Fish swim in the water!',
    points: 10,
    difficulty: 2
  },
  {
    id: 'yc-18',
    type: 'analogy',
    question: 'Big is to Small as Hot is to ?',
    options: ['Warm', 'Fire', 'Cold', 'Summer'],
    correctAnswer: 'Cold',
    explanation: 'Big is the opposite of small. Hot is the opposite of cold!',
    points: 10,
    difficulty: 3
  },
  {
    id: 'yc-19',
    type: 'analogy',
    question: 'Puppy is to Dog as Kitten is to ?',
    options: ['Puppy', 'Cat', 'Mouse', 'Fur'],
    correctAnswer: 'Cat',
    explanation: 'A puppy grows up to be a dog. A kitten grows up to be a cat!',
    points: 10,
    difficulty: 2
  },
  {
    id: 'yc-20',
    type: 'analogy',
    question: 'Hand is to Glove as Foot is to ?',
    options: ['Leg', 'Sock', 'Shoe', 'Toe'],
    correctAnswer: 'Sock',
    explanation: 'A glove covers your hand. A sock covers your foot!',
    points: 10,
    difficulty: 3
  },

  // Size & Order
  {
    id: 'yc-21',
    type: 'multiple-choice',
    question: 'Which is the BIGGEST animal?',
    options: ['Mouse 🐭', 'Cat 🐈', 'Dog 🐕', 'Elephant 🐘'],
    correctAnswer: 'Elephant 🐘',
    explanation: 'Elephants are much bigger than dogs, cats, or mice!',
    points: 8,
    difficulty: 1
  },
  {
    id: 'yc-22',
    type: 'multiple-choice',
    question: 'Which is SMALLER: a car or a bicycle?',
    options: ['Car', 'Bicycle'],
    correctAnswer: 'Bicycle',
    explanation: 'A bicycle is smaller than a car.',
    points: 8,
    difficulty: 1
  },
  {
    id: 'yc-23',
    type: 'multiple-choice',
    question: 'What time comes FIRST: breakfast or dinner?',
    options: ['Breakfast', 'Dinner'],
    correctAnswer: 'Breakfast',
    explanation: 'Breakfast is in the morning, dinner is at night. Morning comes first!',
    points: 8,
    difficulty: 2
  },
  {
    id: 'yc-24',
    type: 'multiple-choice',
    question: 'Which season comes after Winter?',
    options: ['Summer', 'Fall', 'Spring', 'Winter'],
    correctAnswer: 'Spring',
    explanation: 'After Winter comes Spring, then Summer, then Fall!',
    points: 10,
    difficulty: 3
  },
  {
    id: 'yc-25',
    type: 'multiple-choice',
    question: 'What day comes after Monday?',
    options: ['Sunday', 'Tuesday', 'Wednesday', 'Friday'],
    correctAnswer: 'Tuesday',
    explanation: 'The days go: Monday, Tuesday, Wednesday...',
    points: 10,
    difficulty: 2
  }
];

// ============================================
// AGES 8-12: OLDER CHILDREN QUESTIONS
// Word puzzles, math sequences, logic
// ============================================

export const olderChildrenQuestions: IQQuestion[] = [
  // Word Analogies
  {
    id: 'oc-1',
    type: 'analogy',
    question: 'Author is to Book as Painter is to ?',
    options: ['Brush', 'Canvas', 'Painting', 'Art'],
    correctAnswer: 'Painting',
    explanation: 'An author creates a book. A painter creates a painting.',
    points: 12,
    difficulty: 4
  },
  {
    id: 'oc-2',
    type: 'analogy',
    question: 'Bee is to Hive as Bird is to ?',
    options: ['Tree', 'Nest', 'Feather', 'Sky'],
    correctAnswer: 'Nest',
    explanation: 'A bee lives in a hive. A bird lives in a nest.',
    points: 10,
    difficulty: 3
  },
  {
    id: 'oc-3',
    type: 'analogy',
    question: 'Inch is to Length as Ounce is to ?',
    options: ['Height', 'Weight', 'Size', 'Volume'],
    correctAnswer: 'Weight',
    explanation: 'An inch measures length. An ounce measures weight.',
    points: 12,
    difficulty: 4
  },
  {
    id: 'oc-4',
    type: 'analogy',
    question: 'Library is to Books as Orchard is to ?',
    options: ['Trees', 'Fruit', 'Garden', 'Farm'],
    correctAnswer: 'Trees',
    explanation: 'A library contains books. An orchard contains trees (fruit trees).',
    points: 12,
    difficulty: 4
  },
  {
    id: 'oc-5',
    type: 'analogy',
    question: 'Telescope is to Stars as Microscope is to ?',
    options: ['Cells', 'Science', 'Laboratory', 'Glass'],
    correctAnswer: 'Cells',
    explanation: 'A telescope helps us see stars. A microscope helps us see tiny cells.',
    points: 12,
    difficulty: 5
  },

  // Math Sequences
  {
    id: 'oc-6',
    type: 'sequence',
    question: 'What comes next? 3, 6, 12, 24, ?',
    options: ['36', '48', '30', '32'],
    correctAnswer: '48',
    explanation: 'Each number is doubled: 3×2=6, 6×2=12, 12×2=24, 24×2=48',
    points: 12,
    difficulty: 4
  },
  {
    id: 'oc-7',
    type: 'sequence',
    question: 'What comes next? 1, 4, 9, 16, 25, ?',
    options: ['30', '36', '49', '32'],
    correctAnswer: '36',
    explanation: 'These are square numbers: 1², 2², 3², 4², 5², 6²=36',
    points: 15,
    difficulty: 5
  },
  {
    id: 'oc-8',
    type: 'sequence',
    question: 'What comes next? 2, 5, 10, 17, 26, ?',
    options: ['35', '37', '38', '40'],
    correctAnswer: '37',
    explanation: 'Differences increase by 2: +3, +5, +7, +9, +11. 26+11=37',
    points: 15,
    difficulty: 5
  },
  {
    id: 'oc-9',
    type: 'sequence',
    question: 'What comes next? 1, 1, 2, 3, 5, 8, 13, ?',
    options: ['18', '20', '21', '15'],
    correctAnswer: '21',
    explanation: 'Add the last two numbers: 8+13=21 (Fibonacci sequence)',
    points: 15,
    difficulty: 6
  },
  {
    id: 'oc-10',
    type: 'sequence',
    question: 'What comes next? 100, 95, 90, 85, ?',
    options: ['75', '80', '82', '78'],
    correctAnswer: '80',
    explanation: 'Subtract 5 each time: 100-5=95, 95-5=90, 90-5=85, 85-5=80',
    points: 10,
    difficulty: 3
  },

  // Logic Problems
  {
    id: 'oc-11',
    type: 'logical-deduction',
    question: 'All dogs have tails. Max is a dog. What can we conclude?',
    options: ['Max likes bones', 'Max has a tail', 'Max is brown', 'Max can fly'],
    correctAnswer: 'Max has a tail',
    explanation: 'If all dogs have tails and Max is a dog, then Max must have a tail.',
    points: 12,
    difficulty: 4
  },
  {
    id: 'oc-12',
    type: 'logical-deduction',
    question: 'Amy is taller than Beth. Beth is taller than Carol. Who is the shortest?',
    options: ['Amy', 'Beth', 'Carol', 'Cannot tell'],
    correctAnswer: 'Carol',
    explanation: 'Amy > Beth > Carol in height, so Carol is shortest.',
    points: 12,
    difficulty: 4
  },
  {
    id: 'oc-13',
    type: 'logical-deduction',
    question: 'If it rains, the grass gets wet. The grass is wet. What can we say?',
    options: ['It definitely rained', 'It might have rained', 'It did not rain', 'The sun is out'],
    correctAnswer: 'It might have rained',
    explanation: 'Rain makes grass wet, but other things can too (sprinkler, dew). So maybe it rained.',
    points: 15,
    difficulty: 5
  },
  {
    id: 'oc-14',
    type: 'logical-deduction',
    question: 'Tom has more marbles than Jack. Jack has more marbles than Sam. Who has the most marbles?',
    options: ['Tom', 'Jack', 'Sam', 'They have equal amounts'],
    correctAnswer: 'Tom',
    explanation: 'Tom > Jack > Sam, so Tom has the most.',
    points: 10,
    difficulty: 3
  },
  {
    id: 'oc-15',
    type: 'logical-deduction',
    question: 'No cats can fly. Whiskers is a cat. Can Whiskers fly?',
    options: ['Yes', 'No', 'Maybe', 'Only sometimes'],
    correctAnswer: 'No',
    explanation: 'No cats can fly, and Whiskers is a cat, so Whiskers cannot fly.',
    points: 10,
    difficulty: 3
  },

  // Word Problems
  {
    id: 'oc-16',
    type: 'numeric-input',
    question: 'Sarah has 12 candies. She gives 5 to her friend. How many does Sarah have left?',
    correctAnswer: 7,
    explanation: '12 - 5 = 7 candies remaining.',
    points: 10,
    difficulty: 3
  },
  {
    id: 'oc-17',
    type: 'numeric-input',
    question: 'A baker makes 24 cookies and puts them equally into 4 boxes. How many cookies per box?',
    correctAnswer: 6,
    explanation: '24 ÷ 4 = 6 cookies in each box.',
    points: 12,
    difficulty: 4
  },
  {
    id: 'oc-18',
    type: 'numeric-input',
    question: 'If 3 pencils cost 9 cents, how much does 1 pencil cost?',
    correctAnswer: 3,
    explanation: '9 ÷ 3 = 3 cents per pencil.',
    points: 12,
    difficulty: 4
  },
  {
    id: 'oc-19',
    type: 'numeric-input',
    question: 'A train leaves at 2:00 PM and arrives at 5:00 PM. How many hours is the trip?',
    correctAnswer: 3,
    explanation: 'From 2:00 PM to 5:00 PM is 3 hours.',
    points: 10,
    difficulty: 3
  },
  {
    id: 'oc-20',
    type: 'numeric-input',
    question: 'There are 4 teams in a tournament. Each team plays every other team once. How many games total?',
    correctAnswer: 6,
    explanation: 'Team 1 plays 3 games, Team 2 plays 2 new games, Team 3 plays 1 new game = 3+2+1 = 6',
    points: 15,
    difficulty: 6
  },

  // Vocabulary & Odd One Out
  {
    id: 'oc-21',
    type: 'multiple-choice',
    question: 'Which word does NOT belong? Sparrow, Robin, Eagle, Ant',
    options: ['Sparrow', 'Robin', 'Eagle', 'Ant'],
    correctAnswer: 'Ant',
    explanation: 'Sparrow, Robin, and Eagle are birds. Ant is an insect.',
    points: 10,
    difficulty: 3
  },
  {
    id: 'oc-22',
    type: 'multiple-choice',
    question: 'Which one does NOT belong? Mercury, Venus, Saturn, Moon',
    options: ['Mercury', 'Venus', 'Saturn', 'Moon'],
    correctAnswer: 'Moon',
    explanation: 'Mercury, Venus, and Saturn are planets. Moon is a natural satellite.',
    points: 12,
    difficulty: 4
  },
  {
    id: 'oc-23',
    type: 'multiple-choice',
    question: 'Which word means the same as "happy"?',
    options: ['Sad', 'Angry', 'Joyful', 'Tired'],
    correctAnswer: 'Joyful',
    explanation: 'Joyful means feeling great happiness—the same as happy.',
    points: 10,
    difficulty: 3
  },
  {
    id: 'oc-24',
    type: 'multiple-choice',
    question: 'Which word means the opposite of "brave"?',
    options: ['Strong', 'Cowardly', 'Fast', 'Angry'],
    correctAnswer: 'Cowardly',
    explanation: 'Brave means not afraid. Cowardly means easily scared—the opposite.',
    points: 10,
    difficulty: 3
  },
  {
    id: 'oc-25',
    type: 'multiple-choice',
    question: 'Which number does NOT belong? 2, 4, 6, 9, 10',
    options: ['2', '6', '9', '10'],
    correctAnswer: '9',
    explanation: '2, 4, 6, and 10 are even numbers. 9 is odd.',
    points: 10,
    difficulty: 3
  }
];

// ============================================
// CHILDREN'S TESTS DEFINITIONS
// ============================================

export const youngChildrenTest: IQTest = {
  id: 'young-children-test',
  name: 'Junior IQ Test',
  description: 'Fun cognitive puzzles for ages 5-8: patterns, counting, and matching',
  category: 'comprehensive',
  difficulty: 'beginner',
  timeLimit: 90, // More time per question for young children
  estimatedMinutes: 15,
  questions: youngChildrenQuestions
};

export const olderChildrenTest: IQTest = {
  id: 'older-children-test',
  name: 'Youth IQ Test',
  description: 'Age-appropriate challenges for ages 8-12: logic, math sequences, and word puzzles',
  category: 'comprehensive',
  difficulty: 'intermediate',
  timeLimit: 75,
  estimatedMinutes: 20,
  questions: olderChildrenQuestions
};
