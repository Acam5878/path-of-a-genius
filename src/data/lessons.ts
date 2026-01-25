// Lightweight lesson system with brief overviews and links to full texts

export interface Lesson {
  id: string;
  subjectId: string;
  title: string;
  order: number;
  overview: string; // Brief 2-3 sentence overview
  keyPoints: string[]; // 3-5 bullet points
  fullTextUrl?: string; // Link to full text (Project Gutenberg, etc.)
  fullTextTitle?: string;
  estimatedMinutes: number;
  completed?: boolean;
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  completedDate?: string;
  notes?: string;
}

// Mill's Greek Lessons
const millGreekLessons: Lesson[] = [
  {
    id: 'mill-greek-1',
    subjectId: 'mill-greek',
    title: 'The Greek Alphabet',
    order: 1,
    overview: "Master the 24 letters of the Greek alphabet, the foundation of all Greek reading. Mill learned these at age 3 through exposure to simple fables.",
    keyPoints: [
      "Greek has 24 letters: 7 vowels and 17 consonants",
      "Many letters look familiar (A, B, E) but some sounds differ",
      "Lowercase letters are more commonly used in texts",
      "Practice writing each letter to build recognition"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/36247",
    fullTextTitle: "A First Greek Reader (Gutenberg)",
    estimatedMinutes: 45
  },
  {
    id: 'mill-greek-2',
    subjectId: 'mill-greek',
    title: "Aesop's Fables in Greek",
    order: 2,
    overview: "Begin reading with Aesop's simple moral tales—exactly how Mill started at age 3. These short stories use basic vocabulary and teach timeless wisdom.",
    keyPoints: [
      "Aesop's fables use simple, repetitive vocabulary",
      "Each fable teaches a moral lesson",
      "Start with 'The Fox and the Grapes' and 'The Tortoise and the Hare'",
      "Read each fable 3 times: first for gist, then vocabulary, then fluency"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/28747",
    fullTextTitle: "Aesop's Fables in Greek (Gutenberg)",
    estimatedMinutes: 60
  },
  {
    id: 'mill-greek-3',
    subjectId: 'mill-greek',
    title: 'Basic Greek Grammar: Nouns & Articles',
    order: 3,
    overview: "Greek nouns have gender (masculine, feminine, neuter) and cases that show their role in sentences. The article 'the' changes form based on these factors.",
    keyPoints: [
      "Three genders: masculine, feminine, neuter",
      "Five cases: nominative, genitive, dative, accusative, vocative",
      "Articles (ὁ, ἡ, τό) must agree with their nouns",
      "Case endings tell you who does what to whom"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/36247",
    fullTextTitle: "A First Greek Reader (Gutenberg)",
    estimatedMinutes: 90
  },
  {
    id: 'mill-greek-4',
    subjectId: 'mill-greek',
    title: 'Reading Xenophon: Anabasis',
    order: 4,
    overview: "Mill progressed to Xenophon's Anabasis—an adventure story of Greek soldiers. The prose is clear and action-packed, perfect for intermediate readers.",
    keyPoints: [
      "Xenophon wrote in clear, direct Attic Greek",
      "The Anabasis describes a military expedition into Persia",
      "Focus on Books 1-2 for the most accessible sections",
      "Use a parallel Greek-English text for support"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/1170",
    fullTextTitle: "Anabasis by Xenophon (Gutenberg)",
    estimatedMinutes: 120
  },
  {
    id: 'mill-greek-5',
    subjectId: 'mill-greek',
    title: "Plato's Dialogues: Introduction",
    order: 5,
    overview: "Mill read Plato by age 8. Start with shorter dialogues like Euthyphro or Crito which explore justice and piety through Socratic questioning.",
    keyPoints: [
      "Plato writes in dialogue form—conversations with Socrates",
      "Start with Euthyphro (What is piety?) or Crito (Duty to the state)",
      "The Socratic method asks questions to expose contradictions",
      "Take notes on the arguments being made"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/1656",
    fullTextTitle: "Euthyphro by Plato (Gutenberg)",
    estimatedMinutes: 150
  }
];

// Mill's Logic Lessons
const millLogicLessons: Lesson[] = [
  {
    id: 'mill-logic-1',
    subjectId: 'mill-logic',
    title: 'The Three Laws of Thought',
    order: 1,
    overview: "The foundation of classical logic rests on three self-evident principles: identity, non-contradiction, and excluded middle. Mill mastered these at age 12.",
    keyPoints: [
      "Law of Identity: A thing is what it is (A = A)",
      "Law of Non-Contradiction: Nothing can be both A and not-A",
      "Law of Excluded Middle: Everything is either A or not-A",
      "These laws underpin all valid reasoning"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/26495",
    fullTextTitle: "A System of Logic by J.S. Mill (Gutenberg)",
    estimatedMinutes: 30
  },
  {
    id: 'mill-logic-2',
    subjectId: 'mill-logic',
    title: 'Understanding Syllogisms',
    order: 2,
    overview: "A syllogism is a form of reasoning where a conclusion follows from two premises. Mill studied these extensively through Aristotle's Organon.",
    keyPoints: [
      "Major premise: All men are mortal",
      "Minor premise: Socrates is a man",
      "Conclusion: Therefore, Socrates is mortal",
      "Valid form ≠ true content—check both"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/46424",
    fullTextTitle: "Prior Analytics by Aristotle (Gutenberg)",
    estimatedMinutes: 45
  },
  {
    id: 'mill-logic-3',
    subjectId: 'mill-logic',
    title: 'Logical Fallacies to Avoid',
    order: 3,
    overview: "Fallacies are errors in reasoning that seem valid but aren't. Recognizing them helps you think clearly and spot bad arguments in daily life.",
    keyPoints: [
      "Ad Hominem: Attacking the person, not the argument",
      "Straw Man: Misrepresenting someone's position",
      "Appeal to Authority: 'Experts say' isn't proof",
      "False Dilemma: Presenting only two options when more exist"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/26495",
    fullTextTitle: "A System of Logic by J.S. Mill (Gutenberg)",
    estimatedMinutes: 40
  },
  {
    id: 'mill-logic-4',
    subjectId: 'mill-logic',
    title: 'Induction vs Deduction',
    order: 4,
    overview: "Mill's greatest contribution was his analysis of inductive reasoning—moving from observations to general laws. This contrasts with deductive logic.",
    keyPoints: [
      "Deduction: General rule → specific conclusion (certain)",
      "Induction: Specific observations → general rule (probable)",
      "Science relies heavily on induction",
      "Mill's Methods: Agreement, Difference, Residues, Concomitant Variation"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/26495",
    fullTextTitle: "A System of Logic by J.S. Mill (Gutenberg)",
    estimatedMinutes: 60
  }
];

// Mill's Political Economy Lessons
const millPoliticalEconomyLessons: Lesson[] = [
  {
    id: 'mill-econ-1',
    subjectId: 'mill-political-economy',
    title: 'The Wealth of Nations: Core Ideas',
    order: 1,
    overview: "Adam Smith's 1776 masterpiece founded modern economics. Mill read this at 13 and later expanded on its ideas in his own work.",
    keyPoints: [
      "Division of labor increases productivity dramatically",
      "The 'invisible hand' of markets coordinates economic activity",
      "Self-interest, properly channeled, benefits society",
      "Free trade generally benefits all nations"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/3300",
    fullTextTitle: "Wealth of Nations by Adam Smith (Gutenberg)",
    estimatedMinutes: 90
  },
  {
    id: 'mill-econ-2',
    subjectId: 'mill-political-economy',
    title: 'Supply, Demand, and Value',
    order: 2,
    overview: "Understanding how prices are determined through the interaction of supply and demand is fundamental to economic reasoning.",
    keyPoints: [
      "Demand increases → price rises (all else equal)",
      "Supply increases → price falls (all else equal)",
      "Equilibrium: where supply meets demand",
      "Value vs Price: use value differs from exchange value"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/30107",
    fullTextTitle: "Principles of Political Economy by Mill (Gutenberg)",
    estimatedMinutes: 45
  },
  {
    id: 'mill-econ-3',
    subjectId: 'mill-political-economy',
    title: "Mill's Utilitarianism and Economics",
    order: 3,
    overview: "Mill connected his ethical philosophy (the greatest good for the greatest number) with economic policy, advocating for reforms that benefit society broadly.",
    keyPoints: [
      "Actions should maximize overall happiness",
      "Quality of pleasures matters, not just quantity",
      "Economic policy should promote general welfare",
      "Mill advocated for worker cooperatives and women's rights"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/11224",
    fullTextTitle: "Utilitarianism by J.S. Mill (Gutenberg)",
    estimatedMinutes: 60
  }
];

// Da Vinci Drawing Lessons
const davinciDrawingLessons: Lesson[] = [
  {
    id: 'davinci-draw-1',
    subjectId: 'davinci-drawing',
    title: 'Learning to See: Observation Skills',
    order: 1,
    overview: "Leonardo's genius began with intense observation. Before you draw, you must learn to truly see—examining light, shadow, proportion, and form.",
    keyPoints: [
      "Spend 5 minutes looking before drawing anything",
      "Notice where light falls and shadows form",
      "See shapes, not labels ('circle' not 'eye')",
      "Leonardo filled notebooks with observations daily"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/5000",
    fullTextTitle: "Leonardo's Notebooks (Gutenberg)",
    estimatedMinutes: 30
  },
  {
    id: 'davinci-draw-2',
    subjectId: 'davinci-drawing',
    title: 'Basic Forms: Sphere, Cylinder, Cube',
    order: 2,
    overview: "All complex objects can be broken down into simple geometric forms. Leonardo understood this and built complex scenes from basic shapes.",
    keyPoints: [
      "Every object is made of spheres, cylinders, cubes, or cones",
      "Practice shading these forms to show volume",
      "Light source determines where highlights and shadows fall",
      "Start loose, then refine details"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/5000",
    fullTextTitle: "Leonardo's Notebooks (Gutenberg)",
    estimatedMinutes: 60
  },
  {
    id: 'davinci-draw-3',
    subjectId: 'davinci-drawing',
    title: 'Human Proportions: The Vitruvian Man',
    order: 3,
    overview: "Leonardo's famous Vitruvian Man illustrates ideal human proportions. Understanding these ratios helps you draw figures that look natural.",
    keyPoints: [
      "Body is approximately 8 heads tall",
      "Arms span equals height",
      "Halfway point is at the hips",
      "Study your own proportions in a mirror"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/5000",
    fullTextTitle: "Leonardo's Notebooks (Gutenberg)",
    estimatedMinutes: 45
  },
  {
    id: 'davinci-draw-4',
    subjectId: 'davinci-drawing',
    title: 'Sfumato: The Art of Soft Edges',
    order: 4,
    overview: "Leonardo invented sfumato—the technique of softening edges to create lifelike depth. This is how the Mona Lisa's mysterious smile was achieved.",
    keyPoints: [
      "Sfumato means 'vanished like smoke'",
      "Blend edges gradually, not with hard lines",
      "Use multiple thin layers rather than heavy shading",
      "Practice with charcoal or soft pencil"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/7785",
    fullTextTitle: "Treatise on Painting by Da Vinci (Gutenberg)",
    estimatedMinutes: 60
  }
];

// Newton Calculus Lessons
const newtonCalculusLessons: Lesson[] = [
  {
    id: 'newton-calc-1',
    subjectId: 'newton-calculus',
    title: 'What is Calculus? The Big Picture',
    order: 1,
    overview: "Newton invented calculus to solve physics problems—describing motion and change. It answers: how fast is something changing, and what's the total change?",
    keyPoints: [
      "Differential calculus: rates of change (derivatives)",
      "Integral calculus: accumulation of quantities",
      "Newton needed this to describe planetary motion",
      "Calculus connects position, velocity, and acceleration"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/33283",
    fullTextTitle: "Calculus Made Easy (Gutenberg)",
    estimatedMinutes: 30
  },
  {
    id: 'newton-calc-2',
    subjectId: 'newton-calculus',
    title: 'Limits: The Foundation',
    order: 2,
    overview: "Before derivatives, you need limits—what value does a function approach as you get infinitely close to a point? This concept makes calculus rigorous.",
    keyPoints: [
      "A limit is what f(x) approaches as x approaches a value",
      "Limits can exist even when the function is undefined",
      "Notation: lim(x→a) f(x) = L",
      "Practice: What does (x²-1)/(x-1) approach as x→1?"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/33283",
    fullTextTitle: "Calculus Made Easy (Gutenberg)",
    estimatedMinutes: 45
  },
  {
    id: 'newton-calc-3',
    subjectId: 'newton-calculus',
    title: 'Derivatives: Measuring Change',
    order: 3,
    overview: "The derivative tells you the instantaneous rate of change—the slope of the curve at any point. Newton called these 'fluxions.'",
    keyPoints: [
      "Derivative = slope of the tangent line",
      "Power rule: d/dx(xⁿ) = nxⁿ⁻¹",
      "Velocity is the derivative of position",
      "Acceleration is the derivative of velocity"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/33283",
    fullTextTitle: "Calculus Made Easy (Gutenberg)",
    estimatedMinutes: 60
  },
  {
    id: 'newton-calc-4',
    subjectId: 'newton-calculus',
    title: 'Integrals: Accumulating Change',
    order: 4,
    overview: "Integration is the reverse of differentiation—it finds the total accumulation. Newton used this to calculate areas, volumes, and total distances.",
    keyPoints: [
      "Integral = area under the curve",
      "Fundamental Theorem: integration and differentiation are inverses",
      "∫xⁿ dx = xⁿ⁺¹/(n+1) + C",
      "Distance = integral of velocity over time"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/33283",
    fullTextTitle: "Calculus Made Easy (Gutenberg)",
    estimatedMinutes: 60
  }
];

// Newton Physics Lessons
const newtonPhysicsLessons: Lesson[] = [
  {
    id: 'newton-phys-1',
    subjectId: 'newton-physics',
    title: "Newton's First Law: Inertia",
    order: 1,
    overview: "An object at rest stays at rest, and an object in motion stays in motion—unless acted upon by a force. This was revolutionary in Newton's time.",
    keyPoints: [
      "Objects resist changes to their motion",
      "This contradicted Aristotle's view that motion requires continuous force",
      "Galileo first proposed this; Newton formalized it",
      "Friction is why things appear to 'naturally' stop"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/28233",
    fullTextTitle: "Principia Mathematica by Newton (Gutenberg)",
    estimatedMinutes: 30
  },
  {
    id: 'newton-phys-2',
    subjectId: 'newton-physics',
    title: "Newton's Second Law: F = ma",
    order: 2,
    overview: "Force equals mass times acceleration—the most famous equation in classical physics. It quantifies how forces cause motion to change.",
    keyPoints: [
      "F = ma (Force = mass × acceleration)",
      "More mass → more force needed for same acceleration",
      "Force and acceleration are in the same direction",
      "Weight = mass × gravity (W = mg)"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/28233",
    fullTextTitle: "Principia Mathematica by Newton (Gutenberg)",
    estimatedMinutes: 45
  },
  {
    id: 'newton-phys-3',
    subjectId: 'newton-physics',
    title: "Newton's Third Law: Action-Reaction",
    order: 3,
    overview: "For every action, there is an equal and opposite reaction. This explains everything from walking to rocket propulsion.",
    keyPoints: [
      "Forces always come in pairs",
      "The pairs act on different objects",
      "You push Earth when you walk; Earth pushes you back",
      "Rockets push exhaust down; exhaust pushes rocket up"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/28233",
    fullTextTitle: "Principia Mathematica by Newton (Gutenberg)",
    estimatedMinutes: 30
  },
  {
    id: 'newton-phys-4',
    subjectId: 'newton-physics',
    title: 'Universal Gravitation',
    order: 4,
    overview: "Newton's greatest insight: the same force that drops an apple pulls the Moon toward Earth. Gravity acts between all masses in the universe.",
    keyPoints: [
      "F = G(m₁m₂)/r² — gravitational force equation",
      "Force decreases with the square of distance",
      "The Moon is constantly 'falling' toward Earth",
      "This unified terrestrial and celestial physics"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/28233",
    fullTextTitle: "Principia Mathematica by Newton (Gutenberg)",
    estimatedMinutes: 60
  }
];

// Newton Geometry Lessons
const newtonGeometryLessons: Lesson[] = [
  {
    id: 'newton-geo-1',
    subjectId: 'newton-geometry',
    title: "Euclid's Elements: Book I Foundations",
    order: 1,
    overview: "Newton began with Euclid's Elements—the geometry textbook used for 2000 years. Book I establishes definitions, postulates, and the first theorems.",
    keyPoints: [
      "Start with definitions: point, line, angle, circle",
      "Five postulates form the foundation (including the parallel postulate)",
      "Proofs build from simple to complex",
      "Proposition 47: The Pythagorean theorem"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/21076",
    fullTextTitle: "Euclid's Elements (Gutenberg)",
    estimatedMinutes: 60
  },
  {
    id: 'newton-geo-2',
    subjectId: 'newton-geometry',
    title: 'Triangles and Congruence',
    order: 2,
    overview: "Understanding when triangles are identical (congruent) is fundamental. Euclid proves this with the SAS, ASA, and SSS criteria.",
    keyPoints: [
      "SAS: Two sides and included angle match",
      "ASA: Two angles and included side match",
      "SSS: All three sides match",
      "Congruent triangles are identical in shape and size"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/21076",
    fullTextTitle: "Euclid's Elements (Gutenberg)",
    estimatedMinutes: 45
  },
  {
    id: 'newton-geo-3',
    subjectId: 'newton-geometry',
    title: 'Circles and Their Properties',
    order: 3,
    overview: "Book III of Euclid explores circles—their tangents, chords, and inscribed angles. These properties are essential for advanced geometry.",
    keyPoints: [
      "Tangent line touches circle at exactly one point",
      "Inscribed angle is half the central angle",
      "Chord properties relate to distances from center",
      "Circles can be inscribed in or circumscribed around triangles"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/21076",
    fullTextTitle: "Euclid's Elements (Gutenberg)",
    estimatedMinutes: 60
  }
];

// Combine all lessons
export const lessons: Lesson[] = [
  ...millGreekLessons,
  ...millLogicLessons,
  ...millPoliticalEconomyLessons,
  ...davinciDrawingLessons,
  ...newtonCalculusLessons,
  ...newtonPhysicsLessons,
  ...newtonGeometryLessons
];

export const getLessonsBySubjectId = (subjectId: string): Lesson[] => {
  return lessons.filter(l => l.subjectId === subjectId).sort((a, b) => a.order - b.order);
};

export const getLessonById = (lessonId: string): Lesson | undefined => {
  return lessons.find(l => l.id === lessonId);
};
