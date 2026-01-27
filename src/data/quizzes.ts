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
  },
  // Marie Curie Chemistry Quizzes
  {
    lessonId: 'curie-chem-1',
    questions: [
      {
        id: 'curie-chem-1-q1',
        question: 'What defines an element (its atomic number)?',
        options: ['Number of electrons', 'Number of protons', 'Number of neutrons', 'Total mass'],
        correctAnswer: 1,
        explanation: 'The atomic number equals the number of protons, which defines the element.'
      },
      {
        id: 'curie-chem-1-q2',
        question: 'Which two elements did Marie Curie discover?',
        options: ['Uranium and Thorium', 'Polonium and Radium', 'Plutonium and Radium', 'Helium and Neon'],
        correctAnswer: 1,
        explanation: 'Curie discovered Polonium (named after Poland) and Radium.'
      },
      {
        id: 'curie-chem-1-q3',
        question: 'Who created the periodic table in 1869?',
        options: ['Marie Curie', 'Dmitri Mendeleev', 'Isaac Newton', 'Antoine Lavoisier'],
        correctAnswer: 1,
        explanation: 'Mendeleev organized elements by atomic properties in 1869.'
      }
    ]
  },
  {
    lessonId: 'curie-chem-2',
    questions: [
      {
        id: 'curie-chem-2-q1',
        question: 'What type of bond involves sharing electrons?',
        options: ['Ionic', 'Covalent', 'Metallic', 'Hydrogen'],
        correctAnswer: 1,
        explanation: 'Covalent bonds form when atoms share electrons.'
      },
      {
        id: 'curie-chem-2-q2',
        question: 'In chemical reactions, what is conserved?',
        options: ['Energy only', 'Mass only', 'Both mass and energy', 'Neither'],
        correctAnswer: 0,
        explanation: 'In ordinary chemical reactions, mass is conserved—atoms are rearranged, not created or destroyed.'
      },
      {
        id: 'curie-chem-2-q3',
        question: 'What type of bond typically forms between metals and nonmetals?',
        options: ['Covalent', 'Ionic', 'Metallic', 'Van der Waals'],
        correctAnswer: 1,
        explanation: 'Ionic bonds form through electron transfer between metals and nonmetals.'
      }
    ]
  },
  {
    lessonId: 'curie-chem-3',
    questions: [
      {
        id: 'curie-chem-3-q1',
        question: 'How much radium did Curie isolate from 8 tons of pitchblende?',
        options: ['1 kilogram', '10 grams', '0.1 gram', '1 ton'],
        correctAnswer: 2,
        explanation: 'Curie isolated just 0.1 gram of radium from 8 tons of ore—incredibly painstaking work.'
      },
      {
        id: 'curie-chem-3-q2',
        question: 'What technique identifies elements by their light signatures?',
        options: ['Filtration', 'Crystallization', 'Spectroscopy', 'Distillation'],
        correctAnswer: 2,
        explanation: 'Spectroscopy identifies elements by the unique wavelengths of light they emit.'
      },
      {
        id: 'curie-chem-3-q3',
        question: 'Which separation method purifies substances by forming crystals?',
        options: ['Filtration', 'Distillation', 'Crystallization', 'Precipitation'],
        correctAnswer: 2,
        explanation: 'Crystallization purifies by dissolving substances and allowing pure crystals to form.'
      }
    ]
  },
  // Marie Curie Physics Quizzes
  {
    lessonId: 'curie-phys-1',
    questions: [
      {
        id: 'curie-phys-1-q1',
        question: 'Who discovered radioactivity in 1896?',
        options: ['Marie Curie', 'Pierre Curie', 'Henri Becquerel', 'Ernest Rutherford'],
        correctAnswer: 2,
        explanation: 'Becquerel discovered radioactivity accidentally while studying uranium.'
      },
      {
        id: 'curie-phys-1-q2',
        question: 'Who coined the term "radioactivity"?',
        options: ['Henri Becquerel', 'Marie Curie', 'Ernest Rutherford', 'Wilhelm Röntgen'],
        correctAnswer: 1,
        explanation: 'Marie Curie coined the term "radioactivity" during her systematic studies.'
      },
      {
        id: 'curie-phys-1-q3',
        question: 'Why was pitchblende more radioactive than pure uranium?',
        options: ['It was older', 'It contained unknown radioactive elements', 'It was heated', 'It was contaminated'],
        correctAnswer: 1,
        explanation: 'The excess radioactivity came from unknown elements—Polonium and Radium.'
      }
    ]
  },
  {
    lessonId: 'curie-phys-2',
    questions: [
      {
        id: 'curie-phys-2-q1',
        question: 'Which type of radiation is most penetrating?',
        options: ['Alpha', 'Beta', 'Gamma', 'They are equal'],
        correctAnswer: 2,
        explanation: 'Gamma rays are most penetrating—they require lead or concrete to stop.'
      },
      {
        id: 'curie-phys-2-q2',
        question: 'What are alpha particles?',
        options: ['Electrons', 'Photons', 'Helium nuclei', 'Neutrons'],
        correctAnswer: 2,
        explanation: 'Alpha particles are helium nuclei (2 protons + 2 neutrons).'
      },
      {
        id: 'curie-phys-2-q3',
        question: 'What caused Marie Curie\'s death?',
        options: ['Old age', 'Radiation exposure', 'Laboratory accident', 'Infection'],
        correctAnswer: 1,
        explanation: 'Curie died of aplastic anemia caused by chronic radiation exposure.'
      }
    ]
  },
  {
    lessonId: 'curie-phys-3',
    questions: [
      {
        id: 'curie-phys-3-q1',
        question: 'What is half-life?',
        options: ['Time to fully decay', 'Time for half the sample to decay', 'Half the energy released', 'Half the mass'],
        correctAnswer: 1,
        explanation: 'Half-life is the time for half of radioactive atoms to decay.'
      },
      {
        id: 'curie-phys-3-q2',
        question: 'What is the half-life of Carbon-14?',
        options: ['3 minutes', '1,600 years', '5,730 years', '4.5 billion years'],
        correctAnswer: 2,
        explanation: 'Carbon-14 has a half-life of 5,730 years—used for archaeological dating.'
      },
      {
        id: 'curie-phys-3-q3',
        question: 'What uses the half-life of Carbon-14?',
        options: ['Nuclear power', 'Carbon dating', 'Smoke detectors', 'Medical imaging'],
        correctAnswer: 1,
        explanation: 'Carbon dating uses C-14 decay to determine ages of organic materials.'
      }
    ]
  },
  // Tesla Electricity Quizzes
  {
    lessonId: 'tesla-elec-1',
    questions: [
      {
        id: 'tesla-elec-1-q1',
        question: 'What is Ohm\'s Law?',
        options: ['P = IV', 'V = IR', 'E = mc²', 'F = ma'],
        correctAnswer: 1,
        explanation: 'Ohm\'s Law: Voltage = Current × Resistance (V = IR).'
      },
      {
        id: 'tesla-elec-1-q2',
        question: 'What is current measured in?',
        options: ['Volts', 'Ohms', 'Amperes', 'Watts'],
        correctAnswer: 2,
        explanation: 'Current is measured in Amperes (A).'
      },
      {
        id: 'tesla-elec-1-q3',
        question: 'What type of current did Tesla champion?',
        options: ['DC (Direct Current)', 'AC (Alternating Current)', 'Static electricity', 'None'],
        correctAnswer: 1,
        explanation: 'Tesla championed AC, which proved more efficient for power transmission.'
      }
    ]
  },
  {
    lessonId: 'tesla-elec-2',
    questions: [
      {
        id: 'tesla-elec-2-q1',
        question: 'Why did AC win the "War of Currents"?',
        options: ['Safer', 'Transformers can change voltage', 'Edison preferred it', 'It was cheaper'],
        correctAnswer: 1,
        explanation: 'AC can use transformers to step voltage up/down, enabling efficient long-distance transmission.'
      },
      {
        id: 'tesla-elec-2-q2',
        question: 'In the US, what frequency is AC power?',
        options: ['50 Hz', '60 Hz', '100 Hz', '120 Hz'],
        correctAnswer: 1,
        explanation: 'The US uses 60 Hz AC power (Europe uses 50 Hz).'
      },
      {
        id: 'tesla-elec-2-q3',
        question: 'Why is high voltage better for transmission?',
        options: ['More power', 'Lower current means less energy loss', 'Safer', 'Brighter lights'],
        correctAnswer: 1,
        explanation: 'Power loss = I²R. Higher voltage means lower current for same power, reducing losses.'
      }
    ]
  },
  {
    lessonId: 'tesla-elec-3',
    questions: [
      {
        id: 'tesla-elec-3-q1',
        question: 'What did Faraday discover in 1831?',
        options: ['Electricity', 'Electromagnetic induction', 'The electron', 'Radio waves'],
        correctAnswer: 1,
        explanation: 'Faraday discovered electromagnetic induction—moving magnets create current.'
      },
      {
        id: 'tesla-elec-3-q2',
        question: 'What was special about Tesla\'s induction motor?',
        options: ['Used DC', 'Had no brushes', 'Was very small', 'Used magnets'],
        correctAnswer: 1,
        explanation: 'Tesla\'s AC induction motor has no brushes or commutator, making it robust and efficient.'
      },
      {
        id: 'tesla-elec-3-q3',
        question: 'What percentage of industrial motors use Tesla\'s design?',
        options: ['10%', '50%', '90%', '100%'],
        correctAnswer: 2,
        explanation: 'About 90% of industrial motors are AC induction motors based on Tesla\'s design.'
      }
    ]
  },
  // Tesla Physics Quiz
  {
    lessonId: 'tesla-phys-1',
    questions: [
      {
        id: 'tesla-phys-1-q1',
        question: 'Who unified electricity and magnetism?',
        options: ['Faraday', 'Maxwell', 'Tesla', 'Edison'],
        correctAnswer: 1,
        explanation: 'James Clerk Maxwell unified electricity and magnetism with his four equations.'
      },
      {
        id: 'tesla-phys-1-q2',
        question: 'What did Maxwell\'s equations predict light is?',
        options: ['Particles', 'An electromagnetic wave', 'Sound', 'Fluid'],
        correctAnswer: 1,
        explanation: 'Maxwell showed light is an electromagnetic wave traveling at c.'
      },
      {
        id: 'tesla-phys-1-q3',
        question: 'What creates a magnetic field according to Ampère\'s Law?',
        options: ['Static charges', 'Electric currents', 'Heat', 'Gravity'],
        correctAnswer: 1,
        explanation: 'Electric currents (and changing electric fields) create magnetic fields.'
      }
    ]
  },
  // Einstein Physics Quizzes
  {
    lessonId: 'einstein-phys-1',
    questions: [
      {
        id: 'einstein-phys-1-q1',
        question: 'What is constant for all observers according to Special Relativity?',
        options: ['Time', 'Length', 'Speed of light', 'Mass'],
        correctAnswer: 2,
        explanation: 'The speed of light is the same for all observers, regardless of motion.'
      },
      {
        id: 'einstein-phys-1-q2',
        question: 'What happens to time at very high speeds?',
        options: ['Speeds up', 'Slows down', 'Stays the same', 'Stops completely'],
        correctAnswer: 1,
        explanation: 'Time dilation: moving clocks run slower relative to stationary ones.'
      },
      {
        id: 'einstein-phys-1-q3',
        question: 'Can anything with mass travel at light speed?',
        options: ['Yes, with enough energy', 'No, it would require infinite energy', 'Only photons can', 'Only in a vacuum'],
        correctAnswer: 1,
        explanation: 'As velocity approaches c, required energy approaches infinity.'
      }
    ]
  },
  {
    lessonId: 'einstein-phys-2',
    questions: [
      {
        id: 'einstein-phys-2-q1',
        question: 'What does E = mc² mean?',
        options: ['Energy equals mass', 'Mass and energy are equivalent', 'Light has mass', 'Energy is constant'],
        correctAnswer: 1,
        explanation: 'Mass and energy are equivalent—they can be converted into each other.'
      },
      {
        id: 'einstein-phys-2-q2',
        question: 'Why does a small amount of mass release huge energy?',
        options: ['c is small', 'c² is enormous', 'Mass is heavy', 'Energy is light'],
        correctAnswer: 1,
        explanation: 'c² ≈ 9×10¹⁶—multiplying even tiny mass by this gives enormous energy.'
      },
      {
        id: 'einstein-phys-2-q3',
        question: 'What powers the Sun?',
        options: ['Chemical burning', 'Nuclear fission', 'Nuclear fusion', 'Electricity'],
        correctAnswer: 2,
        explanation: 'The Sun fuses hydrogen into helium—the mass difference becomes energy via E = mc².'
      }
    ]
  },
  {
    lessonId: 'einstein-phys-3',
    questions: [
      {
        id: 'einstein-phys-3-q1',
        question: 'According to General Relativity, what is gravity?',
        options: ['A force', 'Curvature of spacetime', 'Magnetic attraction', 'An illusion'],
        correctAnswer: 1,
        explanation: 'Gravity is the curvature of spacetime caused by mass.'
      },
      {
        id: 'einstein-phys-3-q2',
        question: 'What was confirmed during the 1919 eclipse?',
        options: ['Time dilation', 'Light bending around the Sun', 'Black holes', 'Gravitational waves'],
        correctAnswer: 1,
        explanation: 'Starlight bending around the Sun confirmed General Relativity.'
      },
      {
        id: 'einstein-phys-3-q3',
        question: 'What technology requires relativistic corrections?',
        options: ['Television', 'GPS', 'Radio', 'Telephone'],
        correctAnswer: 1,
        explanation: 'GPS satellites must correct for time dilation due to their speed and weaker gravity.'
      }
    ]
  },
  // Aristotle Quizzes
  {
    lessonId: 'aristotle-log-1',
    questions: [
      {
        id: 'aristotle-log-1-q1',
        question: 'Which category answers "What is it?"',
        options: ['Quality', 'Quantity', 'Substance', 'Relation'],
        correctAnswer: 2,
        explanation: 'Substance is the primary category—what something fundamentally IS.'
      },
      {
        id: 'aristotle-log-1-q2',
        question: 'How many categories did Aristotle identify?',
        options: ['5', '8', '10', '12'],
        correctAnswer: 2,
        explanation: 'Aristotle identified 10 categories: substance, quantity, quality, relation, etc.'
      },
      {
        id: 'aristotle-log-1-q3',
        question: '"In the marketplace" is an example of which category?',
        options: ['Time', 'Place', 'Position', 'State'],
        correctAnswer: 1,
        explanation: 'Place (ποῦ) refers to where something is located.'
      }
    ]
  },
  {
    lessonId: 'aristotle-log-2',
    questions: [
      {
        id: 'aristotle-log-2-q1',
        question: 'How many terms does a syllogism have?',
        options: ['Two', 'Three', 'Four', 'Five'],
        correctAnswer: 1,
        explanation: 'A syllogism has exactly three terms: major, minor, and middle.'
      },
      {
        id: 'aristotle-log-2-q2',
        question: 'What is the middle term in a syllogism?',
        options: ['The conclusion', 'The term linking premises but not in conclusion', 'The subject', 'The predicate'],
        correctAnswer: 1,
        explanation: 'The middle term connects the premises but doesn\'t appear in the conclusion.'
      },
      {
        id: 'aristotle-log-2-q3',
        question: 'How many valid syllogism patterns did Aristotle identify?',
        options: ['4', '12', '19', '256'],
        correctAnswer: 2,
        explanation: 'Aristotle identified 19 valid syllogism patterns (moods).'
      }
    ]
  },
  {
    lessonId: 'aristotle-eth-1',
    questions: [
      {
        id: 'aristotle-eth-1-q1',
        question: 'What does "eudaimonia" mean?',
        options: ['Pleasure', 'Human flourishing', 'Wealth', 'Fame'],
        correctAnswer: 1,
        explanation: 'Eudaimonia means human flourishing—living and doing well.'
      },
      {
        id: 'aristotle-eth-1-q2',
        question: 'What is the human function (ergon) according to Aristotle?',
        options: ['Physical strength', 'Reason and virtue', 'Reproduction', 'Survival'],
        correctAnswer: 1,
        explanation: 'The uniquely human function is rational activity in accordance with virtue.'
      },
      {
        id: 'aristotle-eth-1-q3',
        question: 'Why does Aristotle say "call no man happy until he is dead"?',
        options: ['Death is the goal', 'Eudaimonia requires a complete life', 'Happiness is an illusion', 'Only death brings peace'],
        correctAnswer: 1,
        explanation: 'Eudaimonia requires a complete life—fortunes can change until the end.'
      }
    ]
  },
  {
    lessonId: 'aristotle-eth-2',
    questions: [
      {
        id: 'aristotle-eth-2-q1',
        question: 'Courage is the mean between what two extremes?',
        options: ['Pride and humility', 'Cowardice and recklessness', 'Anger and passivity', 'Greed and generosity'],
        correctAnswer: 1,
        explanation: 'Courage lies between cowardice (deficiency) and recklessness (excess).'
      },
      {
        id: 'aristotle-eth-2-q2',
        question: 'What helps us find the mean?',
        options: ['Mathematical calculation', 'Divine revelation', 'Practical wisdom (phronesis)', 'Following rules'],
        correctAnswer: 2,
        explanation: 'Practical wisdom (phronesis) develops through experience and helps find the mean.'
      },
      {
        id: 'aristotle-eth-2-q3',
        question: 'Is the mean the same for everyone?',
        options: ['Yes, always', 'No, it varies by person and situation', 'Only for physical virtues', 'Only for intellectual virtues'],
        correctAnswer: 1,
        explanation: 'The mean is relative to the person and situation—not a fixed point.'
      }
    ]
  },
  {
    lessonId: 'aristotle-bio-1',
    questions: [
      {
        id: 'aristotle-bio-1-q1',
        question: 'How many species did Aristotle classify?',
        options: ['50', '100', '500+', '1000+'],
        correctAnswer: 2,
        explanation: 'Aristotle classified over 500 species through direct observation.'
      },
      {
        id: 'aristotle-bio-1-q2',
        question: 'What did Aristotle correctly identify about whales?',
        options: ['They are fish', 'They are mammals (not fish)', 'They lay eggs', 'They are reptiles'],
        correctAnswer: 1,
        explanation: 'Aristotle correctly noted whales breathe air and are not fish.'
      },
      {
        id: 'aristotle-bio-1-q3',
        question: 'Who called Aristotle "one of the greatest observers"?',
        options: ['Newton', 'Darwin', 'Einstein', 'Curie'],
        correctAnswer: 1,
        explanation: 'Darwin praised Aristotle\'s observational skills in biology.'
      }
    ]
  },
  // Pascal Quizzes
  {
    lessonId: 'pascal-geo-1',
    questions: [
      {
        id: 'pascal-geo-1-q1',
        question: 'At what age did Pascal discover his famous theorem?',
        options: ['11', '14', '16', '20'],
        correctAnswer: 2,
        explanation: 'Pascal discovered his theorem about hexagons at age 16.'
      },
      {
        id: 'pascal-geo-1-q2',
        question: 'What does Pascal\'s Theorem involve?',
        options: ['Triangles in circles', 'Hexagons in conic sections', 'Squares in cubes', 'Pentagons in spheres'],
        correctAnswer: 1,
        explanation: 'Pascal\'s Theorem concerns hexagons inscribed in conic sections.'
      },
      {
        id: 'pascal-geo-1-q3',
        question: 'What are the points of intersection called?',
        options: ['Pascal\'s Triangle', 'Pascal\'s Line', 'Pascal\'s Circle', 'Pascal\'s Point'],
        correctAnswer: 1,
        explanation: 'The three intersection points lie on a single line—Pascal\'s Line.'
      }
    ]
  },
  {
    lessonId: 'pascal-prob-1',
    questions: [
      {
        id: 'pascal-prob-1-q1',
        question: 'What problem founded probability theory?',
        options: ['The Lottery Problem', 'The Problem of Points', 'The Gambler\'s Ruin', 'The Birthday Problem'],
        correctAnswer: 1,
        explanation: 'The Problem of Points (dividing stakes in interrupted games) founded probability theory.'
      },
      {
        id: 'pascal-prob-1-q2',
        question: 'Who was Pascal\'s correspondent on probability?',
        options: ['Descartes', 'Leibniz', 'Fermat', 'Newton'],
        correctAnswer: 2,
        explanation: 'Pascal corresponded with Pierre de Fermat about probability in 1654.'
      },
      {
        id: 'pascal-prob-1-q3',
        question: 'What does row n of Pascal\'s Triangle give?',
        options: ['Prime numbers', 'Fibonacci sequence', 'Coefficients of (a+b)^n', 'Powers of 2'],
        correctAnswer: 2,
        explanation: 'Row n gives the binomial coefficients for expanding (a+b)^n.'
      }
    ]
  },
  {
    lessonId: 'pascal-phil-1',
    questions: [
      {
        id: 'pascal-phil-1-q1',
        question: 'What does Pascal\'s Wager apply probability to?',
        options: ['Gambling', 'Stock markets', 'Belief in God', 'Scientific theories'],
        correctAnswer: 2,
        explanation: 'Pascal\'s Wager applies decision theory to the question of God\'s existence.'
      },
      {
        id: 'pascal-phil-1-q2',
        question: 'Why does Pascal say belief is rational?',
        options: ['We know God exists', 'Infinite stakes make any positive probability significant', 'Pascal had proof', 'Everyone believes'],
        correctAnswer: 1,
        explanation: 'Even tiny probability × infinite reward = infinite expected value.'
      },
      {
        id: 'pascal-phil-1-q3',
        question: 'What did Pascal say the heart has?',
        options: ['Blood', 'Reasons that reason doesn\'t know', 'Muscles', 'Certainty'],
        correctAnswer: 1,
        explanation: '"The heart has its reasons which reason knows nothing of."'
      }
    ]
  },
  // Leibniz Quizzes
  {
    lessonId: 'leibniz-calc-1',
    questions: [
      {
        id: 'leibniz-calc-1-q1',
        question: 'What notation did Leibniz invent for derivatives?',
        options: ['ẋ', 'dy/dx', 'f\'(x)', 'Δy/Δx'],
        correctAnswer: 1,
        explanation: 'Leibniz invented the dy/dx notation still used today.'
      },
      {
        id: 'leibniz-calc-1-q2',
        question: 'What symbol did Leibniz use for integration?',
        options: ['Σ', '∫', 'Δ', '∂'],
        correctAnswer: 1,
        explanation: 'The integral sign ∫ (elongated S for "sum") was Leibniz\'s invention.'
      },
      {
        id: 'leibniz-calc-1-q3',
        question: 'Why did Leibniz notation win over Newton\'s?',
        options: ['It was older', 'It suggests correct manipulations', 'Newton died first', 'It was simpler'],
        correctAnswer: 1,
        explanation: 'Leibniz notation is "suggestive"—it looks like fractions and guides operations.'
      }
    ]
  },
  {
    lessonId: 'leibniz-log-1',
    questions: [
      {
        id: 'leibniz-log-1-q1',
        question: 'What was Leibniz\'s "Characteristica Universalis"?',
        options: ['A dictionary', 'A universal symbolic language', 'A mathematical proof', 'A philosophy book'],
        correctAnswer: 1,
        explanation: 'Leibniz envisioned a universal language to express all knowledge symbolically.'
      },
      {
        id: 'leibniz-log-1-q2',
        question: 'What did Leibniz imagine philosophers would say?',
        options: ['"Let us debate"', '"Let us pray"', '"Let us calculate"', '"Let us observe"'],
        correctAnswer: 2,
        explanation: 'Leibniz imagined settling disputes by calculation: "Let us calculate!"'
      },
      {
        id: 'leibniz-log-1-q3',
        question: 'What did Leibniz anticipate by 200 years?',
        options: ['Electricity', 'Computer science', 'Relativity', 'Evolution'],
        correctAnswer: 1,
        explanation: 'Leibniz\'s vision of mechanical reasoning anticipated computers.'
      }
    ]
  },
  {
    lessonId: 'leibniz-phil-1',
    questions: [
      {
        id: 'leibniz-phil-1-q1',
        question: 'What are monads?',
        options: ['Atoms', 'Simple, immaterial substances', 'Mathematical points', 'Physical particles'],
        correctAnswer: 1,
        explanation: 'Monads are simple, immaterial, indivisible substances—the building blocks of reality.'
      },
      {
        id: 'leibniz-phil-1-q2',
        question: 'Why did Leibniz say monads are "windowless"?',
        options: ['They are dark', 'They don\'t causally interact', 'They are closed', 'They reflect nothing'],
        correctAnswer: 1,
        explanation: 'Monads don\'t causally affect each other—they are synchronized by pre-established harmony.'
      },
      {
        id: 'leibniz-phil-1-q3',
        question: 'What did Leibniz say about our world?',
        options: ['It is evil', 'It is the best of all possible worlds', 'It is an illusion', 'It is infinite'],
        correctAnswer: 1,
        explanation: 'Leibniz argued God chose this as the best of all possible worlds.'
      }
    ]
  },
  // Goethe Quizzes
  {
    lessonId: 'goethe-lit-1',
    questions: [
      {
        id: 'goethe-lit-1-q1',
        question: 'What deal does Faust make with Mephistopheles?',
        options: ['Wealth for service', 'Soul if he ever says "Stay, moment"', 'Knowledge for youth', 'Power for obedience'],
        correctAnswer: 1,
        explanation: 'If Faust ever finds a moment worth preserving, Mephistopheles gets his soul.'
      },
      {
        id: 'goethe-lit-1-q2',
        question: 'What happens to Gretchen in Part I?',
        options: ['She becomes queen', 'She is destroyed by Faust\'s passion', 'She defeats Mephistopheles', 'She marries Faust'],
        correctAnswer: 1,
        explanation: 'Gretchen is destroyed: her family dies, and she is condemned to death.'
      },
      {
        id: 'goethe-lit-1-q3',
        question: 'Is Faust ultimately saved or damned?',
        options: ['Damned', 'Saved', 'Neither', 'It is unclear'],
        correctAnswer: 1,
        explanation: '"Whoever strives with all their might, that person we can save." Faust is redeemed.'
      }
    ]
  },
  {
    lessonId: 'goethe-sci-1',
    questions: [
      {
        id: 'goethe-sci-1-q1',
        question: 'What did Goethe emphasize about color that Newton didn\'t?',
        options: ['Wavelength', 'Perception and psychology', 'Brightness', 'Speed'],
        correctAnswer: 1,
        explanation: 'Goethe emphasized how the eye and mind perceive color—its psychological aspects.'
      },
      {
        id: 'goethe-sci-1-q2',
        question: 'Staring at red then looking at white shows what color?',
        options: ['Red', 'Blue', 'Green', 'Yellow'],
        correctAnswer: 2,
        explanation: 'You see green—the complementary color. This shows the eye creates color.'
      },
      {
        id: 'goethe-sci-1-q3',
        question: 'Was Goethe right about the physics of color?',
        options: ['Yes, completely', 'No, but he pioneered color psychology', 'He never studied it', 'Newton agreed with him'],
        correctAnswer: 1,
        explanation: 'Goethe was wrong about physics but insightful about perception and psychology.'
      }
    ]
  },
  {
    lessonId: 'goethe-lang-1',
    questions: [
      {
        id: 'goethe-lang-1-q1',
        question: 'How many languages did Goethe master by age 16?',
        options: ['3', '4', '6', '8'],
        correctAnswer: 2,
        explanation: 'Goethe mastered 6 languages by 16: German, Latin, Greek, French, Italian, English.'
      },
      {
        id: 'goethe-lang-1-q2',
        question: 'What term did Goethe coin?',
        options: ['Renaissance', 'Romanticism', 'Weltliteratur (World Literature)', 'Bildungsroman'],
        correctAnswer: 2,
        explanation: 'Goethe coined "Weltliteratur" to describe the emerging global literary culture.'
      },
      {
        id: 'goethe-lang-1-q3',
        question: 'What did Goethe say about those who know no foreign language?',
        options: ['They are wise', 'They know nothing of their own', 'They are fortunate', 'They are pure'],
        correctAnswer: 1,
        explanation: '"Those who know nothing of foreign languages know nothing of their own."'
      }
    ]
  },
  // Einstein Math Quiz
  {
    lessonId: 'einstein-math-1',
    questions: [
      {
        id: 'einstein-math-1-q1',
        question: 'What type of mathematics did Einstein need for General Relativity?',
        options: ['Algebra', 'Calculus', 'Tensor calculus and differential geometry', 'Statistics'],
        correctAnswer: 2,
        explanation: 'Einstein needed tensor calculus and Riemannian geometry for General Relativity.'
      },
      {
        id: 'einstein-math-1-q2',
        question: 'What does the metric tensor describe?',
        options: ['Mass distribution', 'Spacetime geometry', 'Electric fields', 'Velocity'],
        correctAnswer: 1,
        explanation: 'The metric tensor g_μν describes the geometry of spacetime.'
      },
      {
        id: 'einstein-math-1-q3',
        question: 'What do Einstein\'s field equations relate?',
        options: ['Mass and velocity', 'Spacetime curvature and matter/energy', 'Light and gravity', 'Time and space'],
        correctAnswer: 1,
        explanation: 'G_μν = (8πG/c⁴)T_μν relates curvature to matter/energy distribution.'
      }
    ]
  },
  // Einstein Philosophy Quiz
  {
    lessonId: 'einstein-phil-1',
    questions: [
      {
        id: 'einstein-phil-1-q1',
        question: 'Which philosopher influenced Einstein\'s rejection of absolute space?',
        options: ['Kant', 'Hume', 'Mach', 'Descartes'],
        correctAnswer: 2,
        explanation: 'Ernst Mach\'s critique of Newton\'s absolute space influenced Einstein.'
      },
      {
        id: 'einstein-phil-1-q2',
        question: 'What are operational definitions?',
        options: ['Definitions from dictionaries', 'Defining concepts by how they are measured', 'Mathematical formulas', 'Philosophical axioms'],
        correctAnswer: 1,
        explanation: 'Operational definitions define concepts by measurement procedures.'
      },
      {
        id: 'einstein-phil-1-q3',
        question: 'What did Einstein use to develop relativity?',
        options: ['Complex experiments', 'Thought experiments', 'Computer simulations', 'Divine inspiration'],
        correctAnswer: 1,
        explanation: 'Einstein used thought experiments—like imagining chasing a light beam.'
      }
    ]
  },
  // Tesla Languages Quiz
  {
    lessonId: 'tesla-lang-1',
    questions: [
      {
        id: 'tesla-lang-1-q1',
        question: 'How many languages did Tesla speak?',
        options: ['3', '5', '8', '12'],
        correctAnswer: 2,
        explanation: 'Tesla spoke 8 languages fluently.'
      },
      {
        id: 'tesla-lang-1-q2',
        question: 'How did Tesla learn languages?',
        options: ['Grammar drills', 'Reading literature immersively', 'Language classes', 'Memorizing dictionaries'],
        correctAnswer: 1,
        explanation: 'Tesla learned through immersive reading of literature in original languages.'
      },
      {
        id: 'tesla-lang-1-q3',
        question: 'What cognitive benefit does multilingualism provide?',
        options: ['Better memory only', 'Enhanced problem-solving and mental flexibility', 'Faster reading only', 'None proven'],
        correctAnswer: 1,
        explanation: 'Research shows multilingualism enhances memory, attention, problem-solving, and delays cognitive decline.'
      }
    ]
  },
  // Curie Math Quiz
  {
    lessonId: 'curie-math-1',
    questions: [
      {
        id: 'curie-math-1-q1',
        question: 'What mathematical function describes radioactive decay?',
        options: ['Linear', 'Quadratic', 'Exponential', 'Logarithmic'],
        correctAnswer: 2,
        explanation: 'Radioactive decay follows an exponential function: N = N₀e^(-λt).'
      },
      {
        id: 'curie-math-1-q2',
        question: 'What is special about the derivative of e^x?',
        options: ['It equals zero', 'It equals e^x itself', 'It equals x', 'It equals 1'],
        correctAnswer: 1,
        explanation: 'The derivative of e^x is e^x—it\'s its own derivative!'
      },
      {
        id: 'curie-math-1-q3',
        question: 'What is the relationship between half-life and decay constant?',
        options: ['t½ = λ', 't½ = 1/λ', 't½ = ln(2)/λ', 't½ = 2λ'],
        correctAnswer: 2,
        explanation: 'Half-life t½ = ln(2)/λ ≈ 0.693/λ.'
      }
    ]
  },
  // Da Vinci Anatomy Quizzes
  {
    lessonId: 'davinci-anat-1',
    questions: [
      {
        id: 'davinci-anat-1-q1',
        question: 'How many human dissections did Leonardo perform?',
        options: ['About 10', 'Over 30', 'Over 100', 'None'],
        correctAnswer: 1,
        explanation: 'Leonardo performed over 30 human dissections to understand anatomy firsthand.'
      },
      {
        id: 'davinci-anat-1-q2',
        question: 'Why did Leonardo study anatomy?',
        options: ['For medical practice', 'To draw the human form convincingly', 'For philosophical reasons', 'As a hobby'],
        correctAnswer: 1,
        explanation: 'Leonardo believed artists must know anatomy to draw the human form convincingly.'
      },
      {
        id: 'davinci-anat-1-q3',
        question: 'How did Leonardo view the human body?',
        options: ['As a spiritual vessel', 'As a machine designed by nature', 'As beyond understanding', 'As purely artistic subject'],
        correctAnswer: 1,
        explanation: 'Leonardo viewed the body as a machine designed by nature, understanding function to understand form.'
      }
    ]
  },
  {
    lessonId: 'davinci-anat-2',
    questions: [
      {
        id: 'davinci-anat-2-q1',
        question: 'How many bones are in the human skeleton?',
        options: ['106', '156', '206', '256'],
        correctAnswer: 2,
        explanation: 'The human skeleton consists of 206 bones divided into axial and appendicular skeletons.'
      },
      {
        id: 'davinci-anat-2-q2',
        question: 'Which is the only moveable bone in the skull?',
        options: ['Frontal bone', 'Temporal bone', 'Mandible (jaw)', 'Nasal bone'],
        correctAnswer: 2,
        explanation: 'The mandible (jawbone) is the only moveable bone in the skull.'
      },
      {
        id: 'davinci-anat-2-q3',
        question: 'How many vertebrae are in the cervical (neck) spine?',
        options: ['5', '7', '12', '15'],
        correctAnswer: 1,
        explanation: 'There are 7 cervical vertebrae in the neck region of the spine.'
      }
    ]
  },
  {
    lessonId: 'davinci-anat-3',
    questions: [
      {
        id: 'davinci-anat-3-q1',
        question: 'Do muscles push or pull?',
        options: ['Only push', 'Only pull', 'Both push and pull', 'Neither'],
        correctAnswer: 1,
        explanation: 'Muscles only pull—they never push. This is why they work in opposing pairs.'
      },
      {
        id: 'davinci-anat-3-q2',
        question: 'What is the opposing muscle to the biceps?',
        options: ['Deltoid', 'Triceps', 'Pectoralis', 'Trapezius'],
        correctAnswer: 1,
        explanation: 'The triceps extends the arm while the biceps flexes it—they work as opposing pairs.'
      },
      {
        id: 'davinci-anat-3-q3',
        question: 'Which muscle group gives the "six-pack" appearance?',
        options: ['Obliques', 'Rectus abdominis', 'Erector spinae', 'Latissimus dorsi'],
        correctAnswer: 1,
        explanation: 'The rectus abdominis creates the "six-pack" appearance when well-defined.'
      }
    ]
  },
  {
    lessonId: 'davinci-anat-4',
    questions: [
      {
        id: 'davinci-anat-4-q1',
        question: 'According to Vitruvian proportions, height equals what?',
        options: ['Leg length × 2', 'Arm span', 'Head × 10', 'Torso × 4'],
        correctAnswer: 1,
        explanation: 'Height equals arm span, forming a perfect square around the body.'
      },
      {
        id: 'davinci-anat-4-q2',
        question: 'When arms and legs are spread, what is the center of the circle?',
        options: ['The heart', 'The navel', 'The sternum', 'The hips'],
        correctAnswer: 1,
        explanation: 'With arms and legs spread, the navel becomes the center of a circle.'
      },
      {
        id: 'davinci-anat-4-q3',
        question: 'What mathematical ratio does the body exhibit?',
        options: ['Pi', 'The golden ratio', 'Square root of 2', 'Euler\'s number'],
        correctAnswer: 1,
        explanation: 'The body exhibits the golden ratio (φ ≈ 1.618) in many proportions.'
      }
    ]
  },
  {
    lessonId: 'davinci-anat-5',
    questions: [
      {
        id: 'davinci-anat-5-q1',
        question: 'What are "homologous structures"?',
        options: ['Identical organs', 'Same basic structure adapted differently', 'Structures that look the same', 'Vestigial organs'],
        correctAnswer: 1,
        explanation: 'Homologous structures share the same basic blueprint but are adapted for different functions.'
      },
      {
        id: 'davinci-anat-5-q2',
        question: 'Leonardo\'s comparative anatomy anticipated which later theory?',
        options: ['Germ theory', 'Evolution', 'Cell theory', 'Quantum mechanics'],
        correctAnswer: 1,
        explanation: 'Leonardo\'s recognition of shared anatomy across species anticipated ideas central to evolution.'
      },
      {
        id: 'davinci-anat-5-q3',
        question: 'Which animal did Leonardo study extensively for comparison?',
        options: ['Dogs', 'Cats', 'Horses', 'Birds'],
        correctAnswer: 2,
        explanation: 'Leonardo made extensive horse anatomy studies, comparing horse legs to human arms.'
      }
    ]
  },
  // Da Vinci Engineering Quizzes
  {
    lessonId: 'davinci-eng-1',
    questions: [
      {
        id: 'davinci-eng-1-q1',
        question: 'Who was the ancient engineer Leonardo studied?',
        options: ['Plato', 'Archimedes', 'Socrates', 'Hippocrates'],
        correctAnswer: 1,
        explanation: 'Leonardo studied Archimedes on mechanics, among other ancient engineers.'
      },
      {
        id: 'davinci-eng-1-q2',
        question: 'What was Leonardo first to systematically study?',
        options: ['Gravity', 'Friction', 'Magnetism', 'Sound'],
        correctAnswer: 1,
        explanation: 'Leonardo was the first to systematically study friction, noting it\'s proportional to load.'
      },
      {
        id: 'davinci-eng-1-q3',
        question: 'What does each additional pulley do to the force needed?',
        options: ['Doubles it', 'Halves it', 'No change', 'Triples it'],
        correctAnswer: 1,
        explanation: 'Each additional pulley halves the force needed, trading force for distance.'
      }
    ]
  },
  {
    lessonId: 'davinci-eng-2',
    questions: [
      {
        id: 'davinci-eng-2-q1',
        question: 'What flying machine used flapping wings?',
        options: ['Glider', 'Ornithopter', 'Aerial screw', 'Balloon'],
        correctAnswer: 1,
        explanation: 'The ornithopter was designed with flapping wings operated by the pilot\'s arms and legs.'
      },
      {
        id: 'davinci-eng-2-q2',
        question: 'Why couldn\'t Leonardo\'s flapping machines work?',
        options: ['Wrong materials', 'Humans lack sufficient power', 'Air was too thin', 'No wind'],
        correctAnswer: 1,
        explanation: 'Human muscles simply cannot produce enough power to sustain flapping flight.'
      },
      {
        id: 'davinci-eng-2-q3',
        question: 'Which Leonardo design was most practical?',
        options: ['Ornithopter', 'Aerial screw', 'Glider', 'Rocket'],
        correctAnswer: 2,
        explanation: 'The glider with fixed wings was most practical and similar to modern hang gliders.'
      }
    ]
  },
  {
    lessonId: 'davinci-eng-3',
    questions: [
      {
        id: 'davinci-eng-3-q1',
        question: 'What happens to water speed in a narrow channel?',
        options: ['Slows down', 'Speeds up', 'Stays the same', 'Stops'],
        correctAnswer: 1,
        explanation: 'The continuity principle: A₁v₁ = A₂v₂. Narrow channels mean faster flow.'
      },
      {
        id: 'davinci-eng-3-q2',
        question: 'What canal lock design did Leonardo create that\'s still used?',
        options: ['Circular gates', 'Miter gates (V-shaped)', 'Sliding gates', 'Rotating drums'],
        correctAnswer: 1,
        explanation: 'Leonardo\'s miter gates (V-shaped, pointing upstream) are still used in canals today.'
      },
      {
        id: 'davinci-eng-3-q3',
        question: 'What drew Leonardo\'s famous vortex studies?',
        options: ['Wind', 'Water', 'Sand', 'Smoke'],
        correctAnswer: 1,
        explanation: 'Leonardo drew stunning studies of water vortices and turbulence patterns.'
      }
    ]
  },
  {
    lessonId: 'davinci-eng-4',
    questions: [
      {
        id: 'davinci-eng-4-q1',
        question: 'What was Leonardo\'s armored vehicle a precursor to?',
        options: ['Airplane', 'Submarine', 'Tank', 'Motorcycle'],
        correctAnswer: 2,
        explanation: 'Leonardo\'s covered armored vehicle with cannons was a precursor to the modern tank.'
      },
      {
        id: 'davinci-eng-4-q2',
        question: 'How did Leonardo describe war?',
        options: ['Glorious', 'Necessary evil', 'Beastly madness', 'Divine duty'],
        correctAnswer: 2,
        explanation: 'Despite designing weapons, Leonardo called war "beastly madness."'
      },
      {
        id: 'davinci-eng-4-q3',
        question: 'Why did Leonardo design angled fortress walls?',
        options: ['For aesthetics', 'To deflect cannon fire', 'Easier to build', 'Better visibility'],
        correctAnswer: 1,
        explanation: 'Angled walls deflected cannon fire better than tall medieval towers.'
      }
    ]
  },
  {
    lessonId: 'davinci-eng-5',
    questions: [
      {
        id: 'davinci-eng-5-q1',
        question: 'What could Leonardo\'s mechanical knight do?',
        options: ['Walk independently', 'Stand, sit, raise arms, move jaw', 'Speak', 'Fight'],
        correctAnswer: 1,
        explanation: 'The mechanical knight could stand up, sit down, raise its arms, and move its jaw.'
      },
      {
        id: 'davinci-eng-5-q2',
        question: 'What powered Leonardo\'s self-propelled cart?',
        options: ['Steam', 'Springs', 'Electricity', 'Wind'],
        correctAnswer: 1,
        explanation: 'The self-propelled cart was powered by springs, like a clockwork mechanism.'
      },
      {
        id: 'davinci-eng-5-q3',
        question: 'How was the self-propelled cart\'s route controlled?',
        options: ['Remote control', 'Cam wheels (programming)', 'Magnets', 'Tracks'],
        correctAnswer: 1,
        explanation: 'Cam wheels controlled the steering, allowing the route to be "programmed" in advance.'
      }
    ]
  },
  // Newton Optics Quizzes
  {
    lessonId: 'newton-opt-1',
    questions: [
      {
        id: 'newton-opt-1-q1',
        question: 'What did Newton prove about white light?',
        options: ['It has no color', 'It\'s a mixture of all colors', 'It\'s pure energy', 'It travels in particles only'],
        correctAnswer: 1,
        explanation: 'Newton\'s prism experiments proved white light is a mixture of all colors.'
      },
      {
        id: 'newton-opt-1-q2',
        question: 'Which color bends most when passing through a prism?',
        options: ['Red', 'Yellow', 'Green', 'Violet'],
        correctAnswer: 3,
        explanation: 'Violet bends the most (highest refraction), while red bends the least.'
      },
      {
        id: 'newton-opt-1-q3',
        question: 'What happens when you pass a single color through a second prism?',
        options: ['It splits further', 'It remains unchanged', 'It becomes white', 'It disappears'],
        correctAnswer: 1,
        explanation: 'A single color passed through a second prism doesn\'t split—it\'s already "pure."'
      }
    ]
  },
  {
    lessonId: 'newton-opt-2',
    questions: [
      {
        id: 'newton-opt-2-q1',
        question: 'What problem do lens telescopes have?',
        options: ['Too heavy', 'Chromatic aberration (color fringes)', 'Break easily', 'Too expensive'],
        correctAnswer: 1,
        explanation: 'Lenses refract different colors at different angles, causing color fringes around objects.'
      },
      {
        id: 'newton-opt-2-q2',
        question: 'How did Newton solve the chromatic aberration problem?',
        options: ['Better glass', 'Used mirrors instead of lenses', 'Smaller lenses', 'Filters'],
        correctAnswer: 1,
        explanation: 'Mirrors reflect all colors equally, eliminating chromatic aberration.'
      },
      {
        id: 'newton-opt-2-q3',
        question: 'What type of telescope uses mirrors?',
        options: ['Refracting', 'Reflecting', 'Radio', 'X-ray'],
        correctAnswer: 1,
        explanation: 'Reflecting telescopes use mirrors and include most modern research telescopes.'
      }
    ]
  },
  {
    lessonId: 'newton-opt-3',
    questions: [
      {
        id: 'newton-opt-3-q1',
        question: 'What creates Newton\'s rings?',
        options: ['Dust particles', 'Interference between reflected light', 'Chemical reaction', 'Heat'],
        correctAnswer: 1,
        explanation: 'Newton\'s rings form from interference between light reflecting from two surfaces.'
      },
      {
        id: 'newton-opt-3-q2',
        question: 'Did Newton believe light was a wave or particle?',
        options: ['Wave only', 'Particle (corpuscle)', 'Both equally', 'Neither'],
        correctAnswer: 1,
        explanation: 'Newton favored the particle (corpuscle) theory, despite observing wave-like interference.'
      },
      {
        id: 'newton-opt-3-q3',
        question: 'What do we now know about light\'s nature?',
        options: ['Pure wave', 'Pure particle', 'Both wave and particle', 'Neither'],
        correctAnswer: 2,
        explanation: 'Modern physics shows light exhibits both wave and particle properties (wave-particle duality).'
      }
    ]
  },
  {
    lessonId: 'newton-opt-4',
    questions: [
      {
        id: 'newton-opt-4-q1',
        question: 'What does the law of reflection state?',
        options: ['Angle in = angle out', 'Light always bends', 'All light is absorbed', 'Light speeds up'],
        correctAnswer: 0,
        explanation: 'The law of reflection: angle of incidence equals angle of reflection (θᵢ = θᵣ).'
      },
      {
        id: 'newton-opt-4-q2',
        question: 'What is the refractive index of air?',
        options: ['0', 'Approximately 1.00', 'Approximately 1.5', '2.0'],
        correctAnswer: 1,
        explanation: 'Air has a refractive index of approximately 1.00.'
      },
      {
        id: 'newton-opt-4-q3',
        question: 'What technology uses total internal reflection?',
        options: ['Television', 'Fiber optics', 'Microwave ovens', 'Radio'],
        correctAnswer: 1,
        explanation: 'Fiber optic cables use total internal reflection to transmit light signals.'
      }
    ]
  }
];

export const getQuizByLessonId = (lessonId: string): LessonQuiz | undefined => {
  return lessonQuizzes.find(q => q.lessonId === lessonId);
};
