// Quiz types and data for each lesson

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation: string;
}

export interface LessonQuiz {
  lessonId: string;
  questions: QuizQuestion[];
}

export const lessonQuizzes: LessonQuiz[] = [
  // Mill's Greek Lessons
  {
    lessonId: 'mill-greek-1',
    questions: [
      {
        id: 'mill-greek-1-q1',
        question: 'How many letters are in the Greek alphabet?',
        options: ['22', '24', '26', '28'],
        correctAnswer: 1,
        explanation: 'The Greek alphabet has exactly 24 letters: 7 vowels and 17 consonants.'
      },
      {
        id: 'mill-greek-1-q2',
        question: 'Which letter makes the "th" sound as in "think"?',
        options: ['Tau (Τ)', 'Theta (Θ)', 'Phi (Φ)', 'Chi (Χ)'],
        correctAnswer: 1,
        explanation: 'Theta (Θ/θ) produces the "th" sound as in "think." Tau is just "t."'
      },
      {
        id: 'mill-greek-1-q3',
        question: 'What is special about the letter Sigma (Σ)?',
        options: ['It has no lowercase form', 'It changes form at word endings (ς)', 'It is always silent', 'It represents two sounds'],
        correctAnswer: 1,
        explanation: 'Sigma changes to ς (final sigma) when it appears at the end of a word.'
      }
    ]
  },
  {
    lessonId: 'mill-greek-2',
    questions: [
      {
        id: 'mill-greek-2-q1',
        question: "What is the moral of 'The Fox and the Grapes'?",
        options: ['Patience wins the race', 'It\'s easy to despise what you cannot have', 'Never give up', 'Look before you leap'],
        correctAnswer: 1,
        explanation: 'The fox, unable to reach the grapes, declares them sour—showing how we dismiss what we cannot obtain.'
      },
      {
        id: 'mill-greek-2-q2',
        question: 'What does "ἀλώπηξ" (alōpēx) mean?',
        options: ['Grapes', 'Fox', 'Hungry', 'Vine'],
        correctAnswer: 1,
        explanation: 'ἀλώπηξ (alōpēx) is the Greek word for fox.'
      },
      {
        id: 'mill-greek-2-q3',
        question: 'At what age did Mill begin reading Aesop\'s Fables in Greek?',
        options: ['Age 3', 'Age 5', 'Age 7', 'Age 10'],
        correctAnswer: 0,
        explanation: 'Mill began learning Greek at the remarkably young age of 3, starting with Aesop\'s Fables.'
      }
    ]
  },
  {
    lessonId: 'mill-greek-3',
    questions: [
      {
        id: 'mill-greek-3-q1',
        question: 'How many grammatical cases does Greek have?',
        options: ['Three', 'Four', 'Five', 'Six'],
        correctAnswer: 2,
        explanation: 'Greek has five cases: nominative, genitive, dative, accusative, and vocative.'
      },
      {
        id: 'mill-greek-3-q2',
        question: 'What is the feminine singular article for "the"?',
        options: ['ὁ', 'ἡ', 'τό', 'οἱ'],
        correctAnswer: 1,
        explanation: 'ἡ is the feminine singular nominative article. ὁ is masculine, τό is neuter.'
      },
      {
        id: 'mill-greek-3-q3',
        question: 'Which case indicates possession (like "of the...")?',
        options: ['Nominative', 'Genitive', 'Dative', 'Accusative'],
        correctAnswer: 1,
        explanation: 'The genitive case shows possession, similar to "of" in English.'
      }
    ]
  },
  {
    lessonId: 'mill-greek-4',
    questions: [
      {
        id: 'mill-greek-4-q1',
        question: 'What does "Anabasis" mean?',
        options: ['The retreat', 'The march up-country', 'The battle', 'The journey home'],
        correctAnswer: 1,
        explanation: '"Anabasis" literally means "a going up" or "march inland/up-country."'
      },
      {
        id: 'mill-greek-4-q2',
        question: 'Who wrote the Anabasis?',
        options: ['Plato', 'Aristotle', 'Xenophon', 'Herodotus'],
        correctAnswer: 2,
        explanation: 'Xenophon wrote the Anabasis about his experience with the Ten Thousand Greek mercenaries.'
      },
      {
        id: 'mill-greek-4-q3',
        question: 'Why is Xenophon\'s Greek good for learners?',
        options: ['It uses only 100 words', 'It is clear and direct', 'It has no grammar', 'It includes translations'],
        correctAnswer: 1,
        explanation: 'Xenophon writes in clear, direct Attic Greek with short sentences and exciting action.'
      }
    ]
  },
  {
    lessonId: 'mill-greek-5',
    questions: [
      {
        id: 'mill-greek-5-q1',
        question: 'What question does Socrates ask in Euthyphro?',
        options: ['What is truth?', 'What is piety?', 'What is justice?', 'What is beauty?'],
        correctAnswer: 1,
        explanation: 'In Euthyphro, Socrates asks "τί ἐστι τὸ ὅσιον;" — "What is piety/holiness?"'
      },
      {
        id: 'mill-greek-5-q2',
        question: 'What is the Euthyphro Dilemma?',
        options: ['Whether gods exist', 'Whether something is good because God commands it, or commanded because it\'s good', 'Whether Socrates is guilty', 'Whether piety is useful'],
        correctAnswer: 1,
        explanation: 'The Euthyphro Dilemma asks: Is something good because God commands it, or does God command it because it\'s good?'
      },
      {
        id: 'mill-greek-5-q3',
        question: 'What is the Socratic method?',
        options: ['Lecturing for hours', 'Asking questions to expose contradictions', 'Reading silently', 'Memorizing texts'],
        correctAnswer: 1,
        explanation: 'The Socratic method uses questions to expose contradictions and lead to deeper understanding.'
      }
    ]
  },
  // Mill's Logic Lessons
  {
    lessonId: 'mill-logic-1',
    questions: [
      {
        id: 'mill-logic-1-q1',
        question: 'What does the Law of Non-Contradiction state?',
        options: ['A = A', 'Nothing can be both A and not-A simultaneously', 'Everything is either A or not-A', 'All things are equal'],
        correctAnswer: 1,
        explanation: 'The Law of Non-Contradiction: Nothing can be both A and not-A at the same time and in the same respect.'
      },
      {
        id: 'mill-logic-1-q2',
        question: 'Which law does "A thing is what it is" represent?',
        options: ['Law of Identity', 'Law of Non-Contradiction', 'Law of Excluded Middle', 'Law of Causation'],
        correctAnswer: 0,
        explanation: 'The Law of Identity states that A = A, or "a thing is what it is."'
      },
      {
        id: 'mill-logic-1-q3',
        question: 'According to the Law of Excluded Middle, what options exist for any proposition?',
        options: ['True, false, or maybe', 'Only true', 'True or false (no third option)', 'Multiple possibilities'],
        correctAnswer: 2,
        explanation: 'The Law of Excluded Middle: For any proposition, either it is true or its negation is true. No third option.'
      }
    ]
  },
  {
    lessonId: 'mill-logic-2',
    questions: [
      {
        id: 'mill-logic-2-q1',
        question: 'In a syllogism, what follows from "All men are mortal" and "Socrates is a man"?',
        options: ['Socrates might be mortal', 'Socrates is mortal', 'Some men are Socrates', 'Mortality is human'],
        correctAnswer: 1,
        explanation: 'The conclusion necessarily follows: Socrates is mortal.'
      },
      {
        id: 'mill-logic-2-q2',
        question: 'What type of proposition is "All S are P"?',
        options: ['Universal negative (E)', 'Particular affirmative (I)', 'Universal affirmative (A)', 'Particular negative (O)'],
        correctAnswer: 2,
        explanation: '"All S are P" is a universal affirmative proposition, labeled A in traditional logic.'
      },
      {
        id: 'mill-logic-2-q3',
        question: 'Can a syllogism with a valid form have a false conclusion?',
        options: ['No, never', 'Yes, if premises are false', 'Only in mathematics', 'Only for negatives'],
        correctAnswer: 1,
        explanation: 'Valid form ≠ true conclusion. If the premises are false, the conclusion can be false even with valid form.'
      }
    ]
  },
  {
    lessonId: 'mill-logic-3',
    questions: [
      {
        id: 'mill-logic-3-q1',
        question: 'What fallacy attacks the person rather than their argument?',
        options: ['Straw Man', 'Ad Hominem', 'False Dilemma', 'Begging the Question'],
        correctAnswer: 1,
        explanation: 'Ad Hominem attacks the person making the argument rather than addressing the argument itself.'
      },
      {
        id: 'mill-logic-3-q2',
        question: '"You\'re either with us or against us" is an example of which fallacy?',
        options: ['Ad Hominem', 'Straw Man', 'False Dilemma', 'Appeal to Authority'],
        correctAnswer: 2,
        explanation: 'This is a False Dilemma—presenting only two options when more exist.'
      },
      {
        id: 'mill-logic-3-q3',
        question: 'What is a Straw Man fallacy?',
        options: ['Using emotional appeals', 'Misrepresenting someone\'s position to attack it', 'Attacking someone\'s character', 'Assuming what you\'re trying to prove'],
        correctAnswer: 1,
        explanation: 'A Straw Man misrepresents or oversimplifies an opponent\'s argument to make it easier to attack.'
      }
    ]
  },
  {
    lessonId: 'mill-logic-4',
    questions: [
      {
        id: 'mill-logic-4-q1',
        question: 'Which type of reasoning goes from specific observations to general rules?',
        options: ['Deduction', 'Induction', 'Abduction', 'Reduction'],
        correctAnswer: 1,
        explanation: 'Induction moves from specific observations to general rules or laws.'
      },
      {
        id: 'mill-logic-4-q2',
        question: 'Which of Mill\'s Methods compares cases where X occurs and doesn\'t occur?',
        options: ['Method of Agreement', 'Method of Difference', 'Method of Residues', 'Method of Concomitant Variation'],
        correctAnswer: 1,
        explanation: 'The Method of Difference: If X occurs when A is present but not when A is absent, A causes X.'
      },
      {
        id: 'mill-logic-4-q3',
        question: 'Is inductive reasoning certain or probable?',
        options: ['Always certain', 'Probable (not certain)', 'Only certain in science', 'Neither'],
        correctAnswer: 1,
        explanation: 'Induction yields probable conclusions, not certain ones. (Remember the black swans!)'
      }
    ]
  },
  // Mill's Political Economy
  {
    lessonId: 'mill-econ-1',
    questions: [
      {
        id: 'mill-econ-1-q1',
        question: 'What concept describes markets coordinating activity through self-interest?',
        options: ['The visible hand', 'The invisible hand', 'The guiding hand', 'The helping hand'],
        correctAnswer: 1,
        explanation: 'Adam Smith\'s "invisible hand" describes how markets coordinate economic activity through individuals pursuing self-interest.'
      },
      {
        id: 'mill-econ-1-q2',
        question: 'In the pin factory example, what increases productivity dramatically?',
        options: ['Longer hours', 'Division of labor', 'Higher wages', 'Better tools'],
        correctAnswer: 1,
        explanation: 'Division of labor—workers each doing one step—increased production from 20 pins to 48,000 pins per day.'
      },
      {
        id: 'mill-econ-1-q3',
        question: 'When was "The Wealth of Nations" published?',
        options: ['1676', '1776', '1876', '1900'],
        correctAnswer: 1,
        explanation: 'Adam Smith published "The Wealth of Nations" in 1776, the same year as American independence.'
      }
    ]
  },
  {
    lessonId: 'mill-econ-2',
    questions: [
      {
        id: 'mill-econ-2-q1',
        question: 'When demand increases (all else equal), what happens to price?',
        options: ['Price falls', 'Price rises', 'Price stays the same', 'Price becomes zero'],
        correctAnswer: 1,
        explanation: 'When demand increases and supply stays constant, price rises.'
      },
      {
        id: 'mill-econ-2-q2',
        question: 'What is "equilibrium" in economics?',
        options: ['Maximum profit', 'Where supply meets demand', 'Zero price', 'Minimum cost'],
        correctAnswer: 1,
        explanation: 'Equilibrium is the point where supply equals demand—no shortage or surplus.'
      },
      {
        id: 'mill-econ-2-q3',
        question: 'Why do diamonds cost more than water despite water being essential?',
        options: ['Diamonds are harder', 'Marginal utility—water is abundant', 'Water is renewable', 'Diamonds last longer'],
        correctAnswer: 1,
        explanation: 'Marginal utility: Water is abundant, so the next glass has little extra value. Diamonds are scarce.'
      }
    ]
  },
  {
    lessonId: 'mill-econ-3',
    questions: [
      {
        id: 'mill-econ-3-q1',
        question: 'What is the core principle of utilitarianism?',
        options: ['Maximize wealth', 'Maximize happiness', 'Maximize power', 'Maximize freedom'],
        correctAnswer: 1,
        explanation: 'Utilitarianism: Actions are right if they promote happiness, wrong if they produce the reverse.'
      },
      {
        id: 'mill-econ-3-q2',
        question: 'How did Mill differ from Bentham on pleasures?',
        options: ['Mill rejected all pleasure', 'Mill said quality matters, not just quantity', 'Mill said only physical pleasures count', 'Mill ignored pleasure entirely'],
        correctAnswer: 1,
        explanation: 'Mill argued that the quality of pleasures matters—"Better to be Socrates dissatisfied than a fool satisfied."'
      },
      {
        id: 'mill-econ-3-q3',
        question: 'What economic reform did Mill advocate for?',
        options: ['Abolishing all markets', 'Worker cooperatives', 'Ending trade', 'Monarchy'],
        correctAnswer: 1,
        explanation: 'Mill advocated for worker cooperatives—workers owning their businesses.'
      }
    ]
  },
  // Da Vinci Drawing
  {
    lessonId: 'davinci-draw-1',
    questions: [
      {
        id: 'davinci-draw-1-q1',
        question: 'In contour drawing, where should you look?',
        options: ['Only at your paper', 'Only at the object (not paper)', 'Alternating quickly', 'At neither'],
        correctAnswer: 1,
        explanation: 'In contour drawing, you look only at the object—not at your paper—to train your observation skills.'
      },
      {
        id: 'davinci-draw-1-q2',
        question: 'What is "negative space"?',
        options: ['Dark shadows', 'The shapes around and between objects', 'Empty paper', 'The background color'],
        correctAnswer: 1,
        explanation: 'Negative space is the shapes around and between objects—drawing these helps you see more accurately.'
      },
      {
        id: 'davinci-draw-1-q3',
        question: 'What did Leonardo carry with him everywhere?',
        options: ['Paintbrushes', 'A notebook for sketching', 'Oil paints', 'A camera obscura'],
        correctAnswer: 1,
        explanation: 'Leonardo carried notebooks everywhere, constantly sketching faces, machines, and nature.'
      }
    ]
  },
  {
    lessonId: 'davinci-draw-2',
    questions: [
      {
        id: 'davinci-draw-2-q1',
        question: 'What are the four fundamental forms in drawing?',
        options: ['Circle, triangle, square, star', 'Sphere, cylinder, cube, cone', 'Line, dot, plane, curve', 'Head, body, arms, legs'],
        correctAnswer: 1,
        explanation: 'Every object can be broken down into sphere, cylinder, cube (box), and cone.'
      },
      {
        id: 'davinci-draw-2-q2',
        question: 'What is "core shadow" on a sphere?',
        options: ['The shadow cast on the surface below', 'The darkest part of the object itself', 'The highlight', 'The background'],
        correctAnswer: 1,
        explanation: 'Core shadow is the darkest part of the object itself, where light transitions to shadow.'
      },
      {
        id: 'davinci-draw-2-q3',
        question: 'What does "light reveals form" mean?',
        options: ['Light makes things visible', 'Shadows show 3D shape and volume', 'Forms create light', 'Light is the most important element'],
        correctAnswer: 1,
        explanation: 'Without shadows created by light, a sphere looks like a flat circle. Light and shadow reveal 3D form.'
      }
    ]
  },
  {
    lessonId: 'davinci-draw-3',
    questions: [
      {
        id: 'davinci-draw-3-q1',
        question: 'According to classical proportions, how many "heads tall" is the human body?',
        options: ['6 heads', '7 heads', '8 heads', '10 heads'],
        correctAnswer: 2,
        explanation: 'The idealized human body is approximately 8 heads tall.'
      },
      {
        id: 'davinci-draw-3-q2',
        question: 'In the Vitruvian Man, what equals the person\'s height?',
        options: ['Leg length × 2', 'Arm span', 'Head × 6', 'Torso × 3'],
        correctAnswer: 1,
        explanation: 'The arm span equals the height, forming a square around the figure.'
      },
      {
        id: 'davinci-draw-3-q3',
        question: 'Where is the halfway point of the human body?',
        options: ['At the navel', 'At the hips/groin', 'At the chest', 'At the knees'],
        correctAnswer: 1,
        explanation: 'The halfway point of the body is at the hips/groin area.'
      }
    ]
  },
  {
    lessonId: 'davinci-draw-4',
    questions: [
      {
        id: 'davinci-draw-4-q1',
        question: 'What does "sfumato" mean?',
        options: ['Smoke effect', 'Vanished like smoke', 'Sharp lines', 'Bold colors'],
        correctAnswer: 1,
        explanation: 'Sfumato means "vanished like smoke"—the technique of softening edges gradually.'
      },
      {
        id: 'davinci-draw-4-q2',
        question: 'How did Leonardo achieve the Mona Lisa\'s mysterious smile?',
        options: ['Bright colors', 'Blurring the corners of her mouth (sfumato)', 'Sharp definition', 'Multiple expressions painted over each other'],
        correctAnswer: 1,
        explanation: 'Leonardo blurred the corners of her mouth using sfumato, making her expression ambiguous.'
      },
      {
        id: 'davinci-draw-4-q3',
        question: 'How many layers might Leonardo apply to a face using sfumato?',
        options: ['1-2 layers', '5-10 layers', '20-30 layers', 'Over 100 layers'],
        correctAnswer: 2,
        explanation: 'Leonardo used 20-30 thin, translucent layers (glazes) to achieve sfumato effects.'
      }
    ]
  },
  // Newton Calculus
  {
    lessonId: 'newton-calc-1',
    questions: [
      {
        id: 'newton-calc-1-q1',
        question: 'What branch of calculus deals with rates of change?',
        options: ['Integral calculus', 'Differential calculus', 'Linear algebra', 'Statistics'],
        correctAnswer: 1,
        explanation: 'Differential calculus deals with derivatives—rates of change and slopes.'
      },
      {
        id: 'newton-calc-1-q2',
        question: 'If position is the original quantity, what is velocity?',
        options: ['The integral of position', 'The derivative of position', 'Position squared', 'The same as position'],
        correctAnswer: 1,
        explanation: 'Velocity is the derivative of position—how fast position is changing.'
      },
      {
        id: 'newton-calc-1-q3',
        question: 'Why did Newton invent calculus?',
        options: ['For accounting', 'To describe planetary motion', 'For architecture', 'For gambling'],
        correctAnswer: 1,
        explanation: 'Newton needed calculus to mathematically describe planetary motion and gravitational physics.'
      }
    ]
  },
  {
    lessonId: 'newton-calc-2',
    questions: [
      {
        id: 'newton-calc-2-q1',
        question: 'What is lim(x→1) (x² - 1)/(x - 1)?',
        options: ['0', '1', '2', 'Undefined'],
        correctAnswer: 2,
        explanation: 'Factor: (x²-1)/(x-1) = (x+1)(x-1)/(x-1) = x+1. As x→1, this approaches 2.'
      },
      {
        id: 'newton-calc-2-q2',
        question: 'Can a limit exist at a point where the function is undefined?',
        options: ['No, never', 'Yes, the limit can still exist', 'Only for polynomials', 'Only for negative x'],
        correctAnswer: 1,
        explanation: 'Yes! A limit describes what a function approaches, not what it equals at that point.'
      },
      {
        id: 'newton-calc-2-q3',
        question: 'What does lim(x→0⁺) mean?',
        options: ['Approaching 0 from the left', 'Approaching 0 from the right (positive side)', 'Approaching positive infinity', 'The limit is positive'],
        correctAnswer: 1,
        explanation: 'The superscript + means approaching from the right (positive) side.'
      }
    ]
  },
  {
    lessonId: 'newton-calc-3',
    questions: [
      {
        id: 'newton-calc-3-q1',
        question: 'What is the derivative of x³?',
        options: ['x²', '3x²', '3x³', 'x⁴/4'],
        correctAnswer: 1,
        explanation: 'Using the power rule: d/dx(xⁿ) = nxⁿ⁻¹, so d/dx(x³) = 3x².'
      },
      {
        id: 'newton-calc-3-q2',
        question: 'What is the derivative of a constant (like 5)?',
        options: ['5', '1', '0', 'x'],
        correctAnswer: 2,
        explanation: 'The derivative of any constant is 0—constants don\'t change!'
      },
      {
        id: 'newton-calc-3-q3',
        question: 'What did Newton call derivatives?',
        options: ['Fluxions', 'Infinitesimals', 'Velocities', 'Moments'],
        correctAnswer: 0,
        explanation: 'Newton called derivatives "fluxions"—rates of flux or flow.'
      }
    ]
  },
  {
    lessonId: 'newton-calc-4',
    questions: [
      {
        id: 'newton-calc-4-q1',
        question: 'What is ∫x² dx?',
        options: ['2x', 'x³/3 + C', 'x³', '2x + C'],
        correctAnswer: 1,
        explanation: 'Using the power rule for integration: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C, so ∫x² dx = x³/3 + C.'
      },
      {
        id: 'newton-calc-4-q2',
        question: 'Why do we add "+ C" to indefinite integrals?',
        options: ['Convention only', 'Because many functions have the same derivative', 'C stands for calculus', 'It\'s optional'],
        correctAnswer: 1,
        explanation: 'Many functions (like x² + 5 and x² + 100) have the same derivative. C accounts for this constant.'
      },
      {
        id: 'newton-calc-4-q3',
        question: 'What does a definite integral ∫[a to b] f(x)dx represent geometrically?',
        options: ['The slope at a point', 'The area under the curve from a to b', 'The maximum value', 'The average value'],
        correctAnswer: 1,
        explanation: 'A definite integral gives the area under the curve between the limits a and b.'
      }
    ]
  },
  // Newton Physics
  {
    lessonId: 'newton-phys-1',
    questions: [
      {
        id: 'newton-phys-1-q1',
        question: 'What is inertia?',
        options: ['A type of force', 'The tendency to resist changes in motion', 'Acceleration', 'Friction'],
        correctAnswer: 1,
        explanation: 'Inertia is the tendency of objects to resist changes in their state of motion.'
      },
      {
        id: 'newton-phys-1-q2',
        question: 'Why do objects on Earth appear to "naturally" stop moving?',
        options: ['They run out of motion', 'Inertia wears off', 'Friction and air resistance slow them', 'Gravity pulls them down'],
        correctAnswer: 2,
        explanation: 'Friction and air resistance are forces that slow objects down. In space, objects keep moving.'
      },
      {
        id: 'newton-phys-1-q3',
        question: 'According to Newton\'s First Law, what happens to an object with no net force acting on it?',
        options: ['It accelerates', 'It stops', 'It continues at constant velocity', 'It reverses direction'],
        correctAnswer: 2,
        explanation: 'With no net force, an object at rest stays at rest; an object moving continues at constant velocity.'
      }
    ]
  },
  {
    lessonId: 'newton-phys-2',
    questions: [
      {
        id: 'newton-phys-2-q1',
        question: 'In F = ma, if you double the force while mass stays constant, what happens to acceleration?',
        options: ['Halves', 'Stays the same', 'Doubles', 'Quadruples'],
        correctAnswer: 2,
        explanation: 'F = ma → a = F/m. Double F means double a (acceleration doubles).'
      },
      {
        id: 'newton-phys-2-q2',
        question: 'What is the SI unit for force?',
        options: ['Joule', 'Watt', 'Newton', 'Pascal'],
        correctAnswer: 2,
        explanation: 'Force is measured in Newtons (N). 1 Newton = 1 kg·m/s².'
      },
      {
        id: 'newton-phys-2-q3',
        question: 'What is the difference between mass and weight?',
        options: ['None, they are the same', 'Mass is constant; weight depends on gravity', 'Weight is constant; mass depends on gravity', 'Mass is for large objects only'],
        correctAnswer: 1,
        explanation: 'Mass is constant (amount of matter). Weight = mg, so it depends on local gravity.'
      }
    ]
  },
  {
    lessonId: 'newton-phys-3',
    questions: [
      {
        id: 'newton-phys-3-q1',
        question: 'When you walk, what pushes you forward?',
        options: ['Your leg muscles directly', 'The ground pushing back on your foot', 'Air pressure', 'Gravity'],
        correctAnswer: 1,
        explanation: 'You push the ground backward; the ground pushes you forward (Newton\'s Third Law).'
      },
      {
        id: 'newton-phys-3-q2',
        question: 'How do rockets work in the vacuum of space?',
        options: ['They push against air', 'They push exhaust backward; exhaust pushes them forward', 'They use magnets', 'They cannot work in vacuum'],
        correctAnswer: 1,
        explanation: 'Rockets push exhaust backward; by Newton\'s Third Law, the exhaust pushes the rocket forward.'
      },
      {
        id: 'newton-phys-3-q3',
        question: 'Do action-reaction forces cancel out?',
        options: ['Yes, always', 'No, because they act on different objects', 'Only for small forces', 'Only at rest'],
        correctAnswer: 1,
        explanation: 'Action-reaction pairs act on different objects, so they don\'t cancel each other.'
      }
    ]
  },
  {
    lessonId: 'newton-phys-4',
    questions: [
      {
        id: 'newton-phys-4-q1',
        question: 'If you double the distance between two masses, what happens to gravitational force?',
        options: ['Halves', 'Doubles', 'Becomes 1/4', 'Becomes 4×'],
        correctAnswer: 2,
        explanation: 'Gravity follows inverse square law: F ∝ 1/r². Double r → force becomes 1/4.'
      },
      {
        id: 'newton-phys-4-q2',
        question: 'Why doesn\'t the Moon fall to Earth?',
        options: ['It\'s too far away', 'It IS falling—but moving sideways fast enough to keep missing', 'The Sun pulls it away', 'There\'s no gravity in space'],
        correctAnswer: 1,
        explanation: 'The Moon is constantly falling toward Earth, but its sideways motion keeps it in orbit.'
      },
      {
        id: 'newton-phys-4-q3',
        question: 'What was revolutionary about Newton\'s theory of gravity?',
        options: ['It explained only Earth', 'It unified terrestrial and celestial physics', 'It replaced all other physics', 'It proved gravity doesn\'t exist'],
        correctAnswer: 1,
        explanation: 'Newton showed the same force that drops an apple also governs planetary motion—unifying physics.'
      }
    ]
  },
  // Newton Geometry
  {
    lessonId: 'newton-geo-1',
    questions: [
      {
        id: 'newton-geo-1-q1',
        question: 'How many postulates does Euclid have?',
        options: ['Three', 'Five', 'Seven', 'Ten'],
        correctAnswer: 1,
        explanation: 'Euclid\'s Elements is built on exactly 5 postulates.'
      },
      {
        id: 'newton-geo-1-q2',
        question: 'What is Proposition I.47 in Euclid?',
        options: ['The definition of a circle', 'The Pythagorean theorem', 'The parallel postulate', 'The sum of angles in a triangle'],
        correctAnswer: 1,
        explanation: 'Proposition I.47 is Euclid\'s proof of the Pythagorean theorem: a² + b² = c².'
      },
      {
        id: 'newton-geo-1-q3',
        question: 'According to Euclid, what is a point?',
        options: ['A small circle', 'That which has no part', 'The intersection of two lines', 'A unit of measurement'],
        correctAnswer: 1,
        explanation: 'Euclid defines a point as "that which has no part"—it has position but no size.'
      }
    ]
  },
  {
    lessonId: 'newton-geo-2',
    questions: [
      {
        id: 'newton-geo-2-q1',
        question: 'What does SAS stand for in triangle congruence?',
        options: ['Side-Angle-Side', 'Sum-Angle-Sum', 'Similar-And-Same', 'Standard-Angle-Standard'],
        correctAnswer: 0,
        explanation: 'SAS = Side-Angle-Side. Two sides and the included angle determine congruence.'
      },
      {
        id: 'newton-geo-2-q2',
        question: 'Does AAA (Angle-Angle-Angle) prove congruence?',
        options: ['Yes', 'No, only similarity', 'Only for right triangles', 'Only for isosceles triangles'],
        correctAnswer: 1,
        explanation: 'AAA proves triangles have the same shape (similar), but they could be different sizes.'
      },
      {
        id: 'newton-geo-2-q3',
        question: 'If △ABC ≅ △DEF, which vertex corresponds to A?',
        options: ['D', 'E', 'F', 'Could be any'],
        correctAnswer: 0,
        explanation: 'In congruence notation, vertices are listed in corresponding order: A↔D, B↔E, C↔F.'
      }
    ]
  },
  {
    lessonId: 'newton-geo-3',
    questions: [
      {
        id: 'newton-geo-3-q1',
        question: 'What is the relationship between a tangent line and the radius at the point of contact?',
        options: ['Parallel', 'Perpendicular (90°)', 'At 45°', 'No specific relationship'],
        correctAnswer: 1,
        explanation: 'A tangent to a circle is perpendicular to the radius at the point of tangency.'
      },
      {
        id: 'newton-geo-3-q2',
        question: 'An angle inscribed in a semicircle is always...',
        options: ['30°', '45°', '60°', '90°'],
        correctAnswer: 3,
        explanation: 'Thales\' Theorem: Any angle inscribed in a semicircle is a right angle (90°).'
      },
      {
        id: 'newton-geo-3-q3',
        question: 'If a central angle is 80°, what is an inscribed angle subtending the same arc?',
        options: ['80°', '40°', '160°', '20°'],
        correctAnswer: 1,
        explanation: 'An inscribed angle is always half the central angle for the same arc: 80° ÷ 2 = 40°.'
      }
    ]
  },
  // Mill's Latin Quizzes
  {
    lessonId: 'mill-latin-1',
    questions: [
      {
        id: 'mill-latin-1-q1',
        question: 'How many letters are in the classical Latin alphabet?',
        options: ['21', '23', '26', '28'],
        correctAnswer: 1,
        explanation: 'Classical Latin used 23 letters. J, U, and W were not used (I and V served double duty).'
      },
      {
        id: 'mill-latin-1-q2',
        question: 'How is the letter C always pronounced in classical Latin?',
        options: ['Soft, like "s"', 'Hard, like "k"', 'Silent', 'Like "ch"'],
        correctAnswer: 1,
        explanation: 'In classical Latin, C is always hard like "k". Caesar was pronounced "KAI-sar".'
      },
      {
        id: 'mill-latin-1-q3',
        question: 'What sound does the Latin letter V make?',
        options: ['V as in "victory"', 'W as in "water"', 'U as in "up"', 'F as in "favor"'],
        correctAnswer: 1,
        explanation: 'In classical Latin, V sounds like our W. "Veni" is pronounced "WEN-ee".'
      }
    ]
  },
  {
    lessonId: 'mill-latin-2',
    questions: [
      {
        id: 'mill-latin-2-q1',
        question: 'Which case shows possession (like "of the girl")?',
        options: ['Nominative', 'Genitive', 'Dative', 'Accusative'],
        correctAnswer: 1,
        explanation: 'The genitive case shows possession, similar to "of" or apostrophe-s in English.'
      },
      {
        id: 'mill-latin-2-q2',
        question: 'What gender are most first declension nouns?',
        options: ['Masculine', 'Feminine', 'Neuter', 'Common'],
        correctAnswer: 1,
        explanation: 'Most first declension (-a) nouns are feminine, though poeta and agricola are masculine exceptions.'
      },
      {
        id: 'mill-latin-2-q3',
        question: 'What is the accusative singular ending for first declension nouns?',
        options: ['-a', '-ae', '-am', '-ā'],
        correctAnswer: 2,
        explanation: 'First declension accusative singular ends in -am (e.g., puellam = "the girl" as direct object).'
      }
    ]
  },
  {
    lessonId: 'mill-latin-3',
    questions: [
      {
        id: 'mill-latin-3-q1',
        question: 'What are the six personal endings for active present tense verbs?',
        options: ['-a, -ae, -am, -as, -at, -ant', '-ō, -s, -t, -mus, -tis, -nt', '-us, -i, -o, -um, -e, -is', '-or, -ris, -tur, -mur, -mini, -ntur'],
        correctAnswer: 1,
        explanation: 'Active present endings: -ō (I), -s (you), -t (he), -mus (we), -tis (y\'all), -nt (they).'
      },
      {
        id: 'mill-latin-3-q2',
        question: 'What does "amāre" mean?',
        options: ['He loves', 'To love', 'They loved', 'Love! (command)'],
        correctAnswer: 1,
        explanation: 'The infinitive form "-āre" means "to ___". Amāre = to love.'
      },
      {
        id: 'mill-latin-3-q3',
        question: 'Why are subject pronouns often omitted in Latin?',
        options: ['They didn\'t exist', 'The verb ending tells you the subject', 'It was considered rude', 'Only in poetry'],
        correctAnswer: 1,
        explanation: 'Verb endings indicate the subject: amō = I love, amās = you love, amat = he loves.'
      }
    ]
  },
  {
    lessonId: 'mill-latin-4',
    questions: [
      {
        id: 'mill-latin-4-q1',
        question: 'What does "Arma virumque canō" mean?',
        options: ['I arm the man and sing', 'I sing of arms and the man', 'The armed man sings', 'Arms and a man I carry'],
        correctAnswer: 1,
        explanation: '"Arma virumque canō" = "I sing of arms and the man" — the famous opening of the Aeneid.'
      },
      {
        id: 'mill-latin-4-q2',
        question: 'Which two Homeric epics does Virgil echo in the Aeneid?',
        options: ['Theogony and Works and Days', 'The Iliad and the Odyssey', 'The Argonautica and Metamorphoses', 'The Republic and Symposium'],
        correctAnswer: 1,
        explanation: '"Arms" evokes the Iliad (war), "the man" evokes the Odyssey (wandering hero). Virgil combines both.'
      },
      {
        id: 'mill-latin-4-q3',
        question: 'What does "fātō profugus" mean?',
        options: ['Famous prophet', 'Exile by fate', 'Fatal profession', 'Faithful fugitive'],
        correctAnswer: 1,
        explanation: '"Fātō profugus" = "exile by fate" — Aeneas is driven by destiny, not personal choice.'
      }
    ]
  },
  // Mill's Arithmetic Quizzes
  {
    lessonId: 'mill-arith-1',
    questions: [
      {
        id: 'mill-arith-1-q1',
        question: 'What is 47 + 36 using mental math (left-to-right)?',
        options: ['73', '83', '93', '82'],
        correctAnswer: 1,
        explanation: 'Left-to-right: (40+30) + (7+6) = 70 + 13 = 83.'
      },
      {
        id: 'mill-arith-1-q2',
        question: 'To subtract 83 - 47 by "counting up," you get:',
        options: ['46', '36', '34', '44'],
        correctAnswer: 1,
        explanation: 'Count up from 47: +3 to 50, +30 to 80, +3 to 83. Total: 3+30+3 = 36.'
      },
      {
        id: 'mill-arith-1-q3',
        question: 'Using compensation, what is 99 + 47?',
        options: ['146', '145', '156', '147'],
        correctAnswer: 0,
        explanation: 'Compensation: 99 + 47 = 100 + 47 - 1 = 146.'
      }
    ]
  },
  {
    lessonId: 'mill-arith-2',
    questions: [
      {
        id: 'mill-arith-2-q1',
        question: 'What is 48 × 5 using the "halve then add zero" trick?',
        options: ['200', '240', '250', '280'],
        correctAnswer: 1,
        explanation: '48 × 5 = 48 × 10 ÷ 2 = 480 ÷ 2 = 240.'
      },
      {
        id: 'mill-arith-2-q2',
        question: 'What is 35²  using the "squaring numbers ending in 5" trick?',
        options: ['1025', '1125', '1225', '1325'],
        correctAnswer: 2,
        explanation: 'n5² = n×(n+1) then 25. So 35² = 3×4 = 12, append 25: 1225.'
      },
      {
        id: 'mill-arith-2-q3',
        question: 'What is 72 × 11 using the "sum the digits in the middle" trick?',
        options: ['782', '792', '772', '812'],
        correctAnswer: 1,
        explanation: 'For 72 × 11: put 7_2, middle = 7+2 = 9, answer = 792.'
      }
    ]
  },
  {
    lessonId: 'mill-arith-3',
    questions: [
      {
        id: 'mill-arith-3-q1',
        question: 'What is 3/4 as a percentage?',
        options: ['25%', '50%', '75%', '80%'],
        correctAnswer: 2,
        explanation: '3/4 = 0.75 = 75%.'
      },
      {
        id: 'mill-arith-3-q2',
        question: 'What is 10% of 350?',
        options: ['3.5', '35', '350', '3500'],
        correctAnswer: 1,
        explanation: 'To find 10%, move the decimal one place left: 350 → 35.'
      },
      {
        id: 'mill-arith-3-q3',
        question: 'An $80 item is 25% off. What is the sale price?',
        options: ['$55', '$60', '$65', '$70'],
        correctAnswer: 1,
        explanation: '25% of 80 = 20. Sale price = 80 - 20 = $60.'
      }
    ]
  },
  // Mill's History Quizzes
  {
    lessonId: 'mill-history-1',
    questions: [
      {
        id: 'mill-history-1-q1',
        question: 'What is unique about Plutarch\'s "Parallel Lives"?',
        options: ['It\'s written in verse', 'It pairs Greek and Roman leaders', 'It only covers battles', 'It\'s a work of fiction'],
        correctAnswer: 1,
        explanation: 'Plutarch pairs Greek and Roman leaders (e.g., Alexander & Caesar) to compare their characters.'
      },
      {
        id: 'mill-history-1-q2',
        question: 'In the Bucephalas story, why did the horse seem wild?',
        options: ['It was hungry', 'It feared its own shadow', 'It was too young', 'It was injured'],
        correctAnswer: 1,
        explanation: 'Alexander noticed the horse was afraid of its own shadow and turned it toward the sun.'
      },
      {
        id: 'mill-history-1-q3',
        question: 'According to Plutarch, what reveals character best?',
        options: ['Great battles only', 'Small moments and anecdotes', 'Family lineage', 'Wealth and status'],
        correctAnswer: 1,
        explanation: 'Plutarch believed small moments and anecdotes reveal character as much as great deeds.'
      }
    ]
  },
  {
    lessonId: 'mill-history-2',
    questions: [
      {
        id: 'mill-history-2-q1',
        question: 'According to Gibbon, did Rome fall primarily from external attack?',
        options: ['Yes, barbarian invasions caused the fall', 'No, internal decay was the primary cause', 'Only military defeat mattered', 'Natural disasters caused it'],
        correctAnswer: 1,
        explanation: 'Gibbon argued Rome fell from internal decay—loss of civic virtue, economic problems—not just external pressure.'
      },
      {
        id: 'mill-history-2-q2',
        question: 'What controversial factor did Gibbon include in Rome\'s decline?',
        options: ['Climate change', 'Christianity', 'Plagues', 'Earthquakes'],
        correctAnswer: 1,
        explanation: 'Gibbon controversially argued that Christianity diverted civic energies to otherworldly concerns.'
      },
      {
        id: 'mill-history-2-q3',
        question: 'What economic problem contributed to Rome\'s fall?',
        options: ['Too much gold', 'Currency debasement and inflation', 'Lack of trade routes', 'Over-saving by citizens'],
        correctAnswer: 1,
        explanation: 'Debasing the currency (adding base metals to coins) caused inflation and economic collapse.'
      }
    ]
  },
  {
    lessonId: 'mill-history-3',
    questions: [
      {
        id: 'mill-history-3-q1',
        question: 'What happened to King Charles I in 1649?',
        options: ['He fled to France', 'He was executed', 'He converted to Catholicism', 'He won the war'],
        correctAnswer: 1,
        explanation: 'Charles I was tried and executed in 1649—the first time a king was killed by his own people.'
      },
      {
        id: 'mill-history-3-q2',
        question: 'Why is the 1688 revolution called "Glorious"?',
        options: ['It was the bloodiest', 'It was bloodless—power transferred peacefully', 'The king survived', 'It lasted the longest'],
        correctAnswer: 1,
        explanation: 'The "Glorious Revolution" was bloodless—James II fled, and William & Mary took the throne peacefully.'
      },
      {
        id: 'mill-history-3-q3',
        question: 'What document from 1689 enshrined key liberties?',
        options: ['Magna Carta', 'The Bill of Rights', 'The Petition of Right', 'The Declaration of Independence'],
        correctAnswer: 1,
        explanation: 'The English Bill of Rights (1689) established parliamentary supremacy and key individual rights.'
      }
    ]
  },
  {
    lessonId: 'mill-history-4',
    questions: [
      {
        id: 'mill-history-4-q1',
        question: 'When was the Storming of the Bastille?',
        options: ['July 4, 1776', 'July 14, 1789', 'January 1, 1793', 'October 5, 1789'],
        correctAnswer: 1,
        explanation: 'The Bastille was stormed on July 14, 1789—still celebrated as France\'s national day.'
      },
      {
        id: 'mill-history-4-q2',
        question: 'What was "The Terror" (1793-94)?',
        options: ['A foreign invasion', 'Mass executions by the revolutionary government', 'A plague outbreak', 'An economic crisis'],
        correctAnswer: 1,
        explanation: 'The Terror was a period of mass executions (about 17,000 officially) under Robespierre\'s Committee of Public Safety.'
      },
      {
        id: 'mill-history-4-q3',
        question: 'What happened to Robespierre in 1794?',
        options: ['He became king', 'He was arrested and executed', 'He fled to England', 'He died of illness'],
        correctAnswer: 1,
        explanation: 'Robespierre was arrested during "Thermidor" and guillotined the next day—the Terror consumed its own leader.'
      }
    ]
  }
];

export const getQuizByLessonId = (lessonId: string): LessonQuiz | undefined => {
  return lessonQuizzes.find(q => q.lessonId === lessonId);
};
