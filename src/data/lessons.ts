// Lightweight lesson system with brief overviews, actual content, and links to full texts

export interface Lesson {
  id: string;
  subjectId: string;
  title: string;
  order: number;
  overview: string; // Brief 2-3 sentence overview
  content: string; // Actual lesson content (short and snappy)
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
    content: `**The 24 Greek Letters**

**Uppercase | Lowercase | Name | Sound**
Α α - Alpha (a as in "father")
Β β - Beta (b)
Γ γ - Gamma (g as in "go")
Δ δ - Delta (d)
Ε ε - Epsilon (e as in "pet")
Ζ ζ - Zeta (dz or z)
Η η - Eta (ey as in "hey")
Θ θ - Theta (th as in "think")
Ι ι - Iota (ee as in "see")
Κ κ - Kappa (k)
Λ λ - Lambda (l)
Μ μ - Mu (m)
Ν ν - Nu (n)
Ξ ξ - Xi (ks)
Ο ο - Omicron (o as in "pot")
Π π - Pi (p)
Ρ ρ - Rho (r, rolled)
Σ σ/ς - Sigma (s) — ς used at word end
Τ τ - Tau (t)
Υ υ - Upsilon (oo or ü)
Φ φ - Phi (f)
Χ χ - Chi (kh, like Scottish "loch")
Ψ ψ - Psi (ps)
Ω ω - Omega (oh as in "go")

**Practice Exercise:** Write out the alphabet 3 times from memory.`,
    keyPoints: [
      "Greek has 24 letters: 7 vowels (α, ε, η, ι, ο, υ, ω) and 17 consonants",
      "Sigma (σ) changes to (ς) at the end of words",
      "Many letters look familiar but sounds may differ",
      "Practice writing each letter to build muscle memory"
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
    content: `**The Fox and the Grapes (Ἀλώπηξ καὶ Σταφυλή)**

Ἀλώπηξ λιμώττουσα, ὡς ἐθεάσατο ἀπό τινος ἀναδενδράδος βότρυας κρεμαμένους, ἠβουλήθη αὐτῶν περιγενέσθαι καὶ οὐκ ἠδύνατο. Ἀπαλλαττομένη δὲ πρὸς ἑαυτὴν εἶπεν· "Ὄμφακές εἰσιν."

**Translation:**
A hungry fox, when she saw grapes hanging from a vine, wished to get them but could not. As she went away, she said to herself: "They are sour grapes."

**Key Vocabulary:**
• ἀλώπηξ (alōpēx) = fox
• σταφυλή (staphylē) = grapes
• λιμώττουσα (limōttousa) = being hungry
• βότρυς (botrys) = grape cluster
• ὄμφαξ (omphax) = unripe grape

**The Moral:** It's easy to despise what you cannot have.`,
    keyPoints: [
      "Aesop's fables use simple, repetitive vocabulary",
      "Each fable teaches a moral lesson about human nature",
      "Start with 'The Fox and the Grapes' — only 30 words!",
      "Read each fable 3 times: gist → vocabulary → fluency"
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
    content: `**The Greek Article "The" (ὁ, ἡ, τό)**

|          | Masc. | Fem. | Neuter |
|----------|-------|------|--------|
| Nom.     | ὁ     | ἡ    | τό     |
| Gen.     | τοῦ   | τῆς  | τοῦ    |
| Dat.     | τῷ    | τῇ   | τῷ     |
| Acc.     | τόν   | τήν  | τό     |

**The Five Cases:**
1. **Nominative** — Subject (The man runs)
2. **Genitive** — Possession (of the man)
3. **Dative** — Indirect object (to/for the man)
4. **Accusative** — Direct object (I see the man)
5. **Vocative** — Address (O man!)

**Example:** λόγος (logos) = word/reason
• ὁ λόγος — the word (subject)
• τοῦ λόγου — of the word
• τῷ λόγῳ — to the word
• τὸν λόγον — the word (object)`,
    keyPoints: [
      "Three genders: masculine (ὁ), feminine (ἡ), neuter (τό)",
      "Five cases show the noun's role in the sentence",
      "Articles must agree with their nouns in gender, number, case",
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
    content: `**Anabasis Opening (Book 1, Chapter 1)**

"Δαρείου καὶ Παρυσάτιδος γίγνονται παῖδες δύο, πρεσβύτερος μὲν Ἀρταξέρξης, νεώτερος δὲ Κῦρος."

**Translation:**
"Of Darius and Parysatis were born two sons, the elder Artaxerxes, the younger Cyrus."

**What You're Reading:**
The Anabasis ("The March Up-Country") tells the true story of 10,000 Greek mercenaries who marched into Persia, fought in a civil war, and then had to find their way home after their Persian employers were killed.

**Key Vocabulary:**
• ἀνάβασις (anabasis) = march inland/up
• στρατιώτης (stratiōtēs) = soldier
• βασιλεύς (basileus) = king
• πολέμιος (polemios) = enemy

**Why It's Good for Learners:**
Xenophon writes in clear, direct Attic Greek. His sentences are short and the action is exciting.`,
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
    content: `**The Euthyphro Question**

Socrates asks: "τί ἐστι τὸ ὅσιον;" 
("What is piety/holiness?")

**The Socratic Method in Action:**

1. Euthyphro claims to know what piety is
2. Socrates asks him to define it
3. Euthyphro: "Piety is what the gods love"
4. Socrates: "Do the gods love it *because* it's pious, or is it pious *because* they love it?"
5. This question remains one of the most important in philosophy

**The Euthyphro Dilemma:**
Is something good because God commands it, or does God command it because it's good?

**Key Greek Terms:**
• τί ἐστι (ti esti) = what is
• ὅσιον (hosion) = piety, holiness
• θεοφιλές (theophiles) = god-loved
• δίκαιον (dikaion) = justice

**Reading Tip:** Plato's dialogues are meant to be puzzles. Don't rush to find "the answer."`,
    keyPoints: [
      "Plato writes in dialogue form—conversations with Socrates",
      "Start with Euthyphro (What is piety?) or Crito (Duty to law)",
      "The Socratic method exposes contradictions through questions",
      "These dialogues are short (20-30 pages) and self-contained"
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
    content: `**The Three Fundamental Laws**

**1. Law of Identity**
A = A
"A thing is what it is."
• A cat is a cat
• If a statement is true, it is true

**2. Law of Non-Contradiction**
¬(A ∧ ¬A)
"Nothing can be both A and not-A at the same time and in the same respect."
• A cat cannot be a cat and not a cat simultaneously
• A statement cannot be both true and false

**3. Law of Excluded Middle**
A ∨ ¬A
"For any proposition, either it is true or its negation is true."
• Either it is raining or it is not raining
• There is no third option

**Why These Matter:**
All valid reasoning depends on these laws. If you catch someone violating them, their argument is necessarily flawed.

**Test Yourself:** Find the law violated:
"I always lie." (Hint: If this is true, then...)`,
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
    content: `**The Classic Syllogism**

**Structure:**
• Major Premise: All M are P
• Minor Premise: All S are M
• Conclusion: Therefore, all S are P

**Example:**
1. All men are mortal. (Major premise)
2. Socrates is a man. (Minor premise)
3. ∴ Socrates is mortal. (Conclusion)

**The Four Figures of Syllogism:**
|        | Figure 1 | Figure 2 | Figure 3 | Figure 4 |
|--------|----------|----------|----------|----------|
| Major  | M-P      | P-M      | M-P      | P-M      |
| Minor  | S-M      | S-M      | M-S      | M-S      |
| Concl. | S-P      | S-P      | S-P      | S-P      |

**Mood:** The type of propositions (A, E, I, O)
• A: All S are P (universal affirmative)
• E: No S are P (universal negative)
• I: Some S are P (particular affirmative)
• O: Some S are not P (particular negative)

**Valid Syllogism in Figure 1:** Barbara (AAA)
All mammals are animals.
All dogs are mammals.
∴ All dogs are animals. ✓`,
    keyPoints: [
      "Major premise: All men are mortal",
      "Minor premise: Socrates is a man",
      "Conclusion: Therefore, Socrates is mortal",
      "Valid form ≠ true content—check both!"
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
    content: `**12 Common Fallacies**

**Fallacies of Relevance:**
1. **Ad Hominem** — Attacking the person, not the argument
   "You can't trust his climate data—he's a liberal!"

2. **Appeal to Authority** — "Experts say" without evidence
   "This doctor says vaccines are bad, so they must be."

3. **Appeal to Emotion** — Using feelings instead of logic
   "Think of the children!"

**Fallacies of Ambiguity:**
4. **Equivocation** — Using a word with two meanings
   "The sign said 'fine for parking here,' so I parked."

5. **Straw Man** — Misrepresenting someone's argument
   "You want less military spending? So you want us defenseless!"

**Fallacies of Presumption:**
6. **False Dilemma** — Only two options when more exist
   "You're either with us or against us."

7. **Begging the Question** — Assuming what you're trying to prove
   "The Bible is true because it's the word of God."

8. **Slippery Slope** — A leads to B leads to disaster (without proof)
   "If we allow X, next thing you know we'll have Y!"

**Fallacies of Induction:**
9. **Hasty Generalization** — Too small a sample
   "I met two rude New Yorkers; they're all rude."

10. **Post Hoc** — Correlation ≠ causation
    "I wore my lucky socks and we won!"

**Practice:** Spot fallacies in today's news headlines.`,
    keyPoints: [
      "Ad Hominem: Attacking the person, not the argument",
      "Straw Man: Misrepresenting someone's position to attack it",
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
    content: `**Two Types of Reasoning**

**Deduction: General → Specific (Certain)**
• Premise: All swans are white
• Premise: This is a swan
• Conclusion: This swan is white
• If premises are true, conclusion MUST be true

**Induction: Specific → General (Probable)**
• Observation: Swan 1 is white
• Observation: Swan 2 is white
• Observation: Swan 3 is white
• Conclusion: All swans are white
• This is PROBABLE but not certain (black swans exist!)

**Mill's Five Methods of Induction:**

1. **Method of Agreement**
   If A occurs in all cases where X occurs, A may cause X.

2. **Method of Difference**
   If X occurs when A is present but not when A is absent, A causes X.

3. **Joint Method**
   Combine Agreement and Difference.

4. **Method of Residues**
   Subtract known causes; what remains is the cause of what remains.

5. **Method of Concomitant Variation**
   If A varies when X varies, they're related.

**Example (Difference):**
• Plants with fertilizer grow tall
• Plants without fertilizer don't
• Conclusion: Fertilizer causes growth`,
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
    content: `**Adam Smith's Key Insights (1776)**

**1. Division of Labor**
One worker making pins alone: ~20 pins/day
Ten workers, each doing one step: ~48,000 pins/day

"The greatest improvement in the productive powers of labour... seem to have been the effects of the division of labour."

**2. The Invisible Hand**
"By pursuing his own interest, [man] frequently promotes that of the society more effectually than when he really intends to promote it."

Bakers don't make bread because they love you—they do it for profit. Yet you get bread.

**3. Free Trade Benefits All**
If Portugal makes wine better and England makes cloth better, both gain by trading rather than making both themselves.

**4. Self-Interest ≠ Greed**
Smith was a moral philosopher first. Self-interest channeled through markets and competition benefits society. Monopoly and cronyism do not.

**Key Quote:**
"It is not from the benevolence of the butcher, the brewer, or the baker that we expect our dinner, but from their regard to their own interest."`,
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
    content: `**The Laws of Supply and Demand**

**Demand: The Buyer's Side**
• Price ↑ → Quantity demanded ↓
• Price ↓ → Quantity demanded ↑

**Supply: The Seller's Side**
• Price ↑ → Quantity supplied ↑
• Price ↓ → Quantity supplied ↓

**Equilibrium**
Where supply and demand meet. At this price:
• Buyers want exactly what sellers offer
• No shortage, no surplus

**Shifts in Demand:**
More demand (curve shifts right): new technology, rising incomes, trends
Less demand (curve shifts left): substitute goods, changing tastes

**Shifts in Supply:**
More supply: better technology, lower costs, more producers
Less supply: natural disasters, regulations, fewer producers

**Value Paradox:**
Why do diamonds cost more than water, when water is essential for life?

Answer: Marginal utility. Water is abundant; the *next* glass has little extra value. Diamonds are scarce; each one is precious.

**Price = Marginal Value = Point where supply meets demand**`,
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
    content: `**The Utilitarian Principle**

"Actions are right in proportion as they tend to promote happiness, wrong as they tend to produce the reverse of happiness."
— J.S. Mill, Utilitarianism

**Mill's Refinement of Bentham:**
Bentham: All pleasures are equal; count the quantity
Mill: Quality matters. "Better to be Socrates dissatisfied than a fool satisfied."

**Higher vs Lower Pleasures:**
• Lower: bodily pleasures, simple entertainment
• Higher: intellectual pursuits, art, moral satisfaction
• Those who've experienced both prefer higher pleasures

**Applying Utilitarianism to Economics:**

1. **Progressive Taxation**
   The marginal utility of $1 is higher for a poor person than a rich one.

2. **Worker Cooperatives**
   Mill advocated for workers owning their businesses—more people share the gains.

3. **Women's Economic Rights**
   Mill was the first MP to propose women's suffrage. Excluding half the population from economic participation hurts everyone.

4. **Public Education**
   An educated populace makes better decisions, benefiting all of society.

**Key Question:** What maximizes total happiness?`,
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
    content: `**The Artist's Way of Seeing**

Leonardo wrote: "The painter who draws merely by practice and by eye, without any reason, is like a mirror which copies everything placed in front of it without being conscious of their existence."

**Exercise 1: Contour Drawing (10 min)**
1. Place an object before you (hand, cup, plant)
2. Put pencil on paper
3. Look ONLY at the object—not your paper
4. Draw the outline slowly, following edges with your eyes
5. Your drawing will look strange. That's fine.

**Exercise 2: Negative Space (15 min)**
Don't draw the chair—draw the shapes *around* the chair.
• The triangle between the legs
• The rectangle behind the back
• Your brain stops labeling; you start seeing

**Exercise 3: Value Study (15 min)**
Squint at a scene. Notice:
• Where is the brightest bright?
• Where is the darkest dark?
• Everything else is middle gray
• Sketch in 3 values only: light, medium, dark

**Leonardo's Daily Practice:**
He carried a notebook everywhere. Every face, every machine, every plant got sketched. Do the same—draw for 10 minutes daily.`,
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
    content: `**The Four Fundamental Forms**

Everything you'll ever draw is made of:
• **Sphere** — heads, fruits, balls
• **Cylinder** — arms, legs, trees, bottles
• **Cube/Box** — buildings, furniture, books
• **Cone** — noses, hats, mountains

**Shading the Sphere:**
\`\`\`
        highlight
           ↓
    🔴   ← core shadow
   midtone →  ← reflected light
        cast shadow
\`\`\`
1. Highlight: brightest point, facing light
2. Midtone: gradual transition
3. Core shadow: darkest part of the object itself
4. Reflected light: light bouncing from surface below
5. Cast shadow: shadow the object throws

**Exercise: Draw a Sphere**
1. Draw a circle
2. Mark your light source (top left)
3. Leave a white spot for highlight
4. Shade gradually darker toward the right
5. Add a cast shadow (elongated oval)
6. Soften the core shadow's edge with reflected light

**The Form Principle:**
Light reveals form. Without shadow, a sphere looks like a flat circle.`,
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
    content: `**The Canon of Proportions**

Leonardo's Vitruvian Man (c. 1490) shows:

**Head as Unit of Measurement:**
• Total height = 8 heads
• Shoulder width = 2 heads
• Torso = 3 heads
• Legs = 4 heads

**Key Proportions:**
• Arms span = height (forms a square)
• Navel is the center when arms/legs spread (forms a circle)
• Elbow = waist height
• Wrist = hip/groin height
• Hands = face length
• Foot = forearm length

**The 8-Head Figure:**
\`\`\`
Head 1: Top of head to chin
Head 2: Chin to nipple line
Head 3: Nipples to navel
Head 4: Navel to groin
Head 5: Groin to mid-thigh
Head 6: Mid-thigh to below knee
Head 7: Below knee to mid-calf
Head 8: Mid-calf to floor
\`\`\`

**Exercise:**
1. Measure your own proportions
2. Draw a stick figure using the 8-head system
3. Build forms (cylinders for limbs) around it

Note: Real people vary! These are idealized proportions.`,
    keyPoints: [
      "Body is approximately 8 heads tall",
      "Arms span equals height",
      "Halfway point is at the hips/groin",
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
    content: `**Sfumato: "Vanished Like Smoke"**

The Mona Lisa's smile is ambiguous because Leonardo blurred the corners of her mouth. Your brain can't pin down her expression.

**The Technique:**

Traditional approach: Hard edges
Leonardo's approach: No lines, only gradual transitions

**How to Achieve Sfumato:**

1. **Build in Layers**
   Apply thin, translucent layers (glazes)
   Each layer slightly modifies what's beneath
   Leonardo used 20-30 layers on faces

2. **Blend Continuously**
   Don't leave visible brushstrokes
   Use soft brushes, fingers, or cloth

3. **Edge Control**
   • Hard edges draw attention: eyes, jewelry
   • Soft edges recede: background, shadows
   • Lost edges: where form meets shadow

**Pencil Exercise:**
1. Draw two overlapping circles
2. Shade one with hard edges (stay in the lines)
3. Shade the other with sfumato (blend beyond edges)
4. Notice which looks more 3D

**With Charcoal:**
1. Apply charcoal broadly
2. Use a blending stump to soften
3. Lift highlights with an eraser
4. Build up darks gradually

Leonardo: "Shadows and lights should blend without lines or borders, in the manner of smoke."`,
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
    content: `**Calculus: The Mathematics of Change**

Newton's question: How do I describe the motion of planets mathematically?

**The Two Branches:**

**1. Differential Calculus (Derivatives)**
How fast is something changing *right now*?

Your car's speedometer shows the derivative of your position.
• Position: where you are
• Velocity: derivative of position (how fast position changes)
• Acceleration: derivative of velocity (how fast velocity changes)

**2. Integral Calculus (Integrals)**
What's the *total* change over time?

If you know your speed at every moment, integrating gives total distance.
• Velocity × time = distance (for constant speed)
• ∫ velocity dt = distance (for changing speed)

**The Fundamental Insight:**
Differentiation and integration are *inverses*.

Take a function → differentiate → integrate → get original function back

**Real-World Examples:**
• Biology: rate of population growth
• Economics: marginal cost/revenue
• Physics: motion, electricity, waves
• Engineering: optimization, control systems

**Newton's Notation:**
ẋ (x-dot) = derivative of x with respect to time
We'll use Leibniz notation: dx/dt`,
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
    content: `**Limits: What Happens as We Get Close?**

**Definition:**
lim(x→a) f(x) = L

"As x approaches a, f(x) approaches L"

**Example 1: Simple**
lim(x→3) (x + 2) = 5
Just plug in: 3 + 2 = 5

**Example 2: Interesting**
lim(x→1) (x² - 1)/(x - 1)

If we plug in x = 1: (1-1)/(1-1) = 0/0 ← undefined!

But factor: (x² - 1)/(x - 1) = (x+1)(x-1)/(x-1) = x + 1

lim(x→1) (x + 1) = 2

The limit exists even though f(1) doesn't!

**Example 3: The Famous One**
lim(x→0) sin(x)/x = 1

This limit is fundamental to all of trigonometry in calculus.

**One-Sided Limits:**
lim(x→0⁺) means approaching from the right (positive side)
lim(x→0⁻) means approaching from the left (negative side)

**When Limits Don't Exist:**
• Left limit ≠ right limit
• Function oscillates wildly
• Function goes to infinity

**Exercise:**
Find lim(x→2) (x² - 4)/(x - 2)
Hint: Factor the numerator.`,
    keyPoints: [
      "A limit is what f(x) approaches as x approaches a value",
      "Limits can exist even when the function is undefined",
      "Notation: lim(x→a) f(x) = L",
      "Practice: lim(x→1) (x²-1)/(x-1) = 2"
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
    content: `**The Derivative**

**Definition:**
f'(x) = lim(h→0) [f(x+h) - f(x)] / h

This is the slope of the tangent line at point x.

**Basic Rules:**

**Power Rule:** d/dx(xⁿ) = nxⁿ⁻¹
• d/dx(x²) = 2x
• d/dx(x³) = 3x²
• d/dx(x¹⁰) = 10x⁹
• d/dx(x) = 1
• d/dx(constant) = 0

**Sum Rule:** d/dx(f + g) = f' + g'
• d/dx(x² + 3x) = 2x + 3

**Constant Multiple:** d/dx(c·f) = c·f'
• d/dx(5x²) = 5(2x) = 10x

**Product Rule:** d/dx(f·g) = f'g + fg'
**Quotient Rule:** d/dx(f/g) = (f'g - fg')/g²
**Chain Rule:** d/dx(f(g(x))) = f'(g(x))·g'(x)

**Example:**
f(x) = 3x² + 2x - 7
f'(x) = 6x + 2

At x = 2: f'(2) = 6(2) + 2 = 14
The function is increasing at rate 14 when x = 2.

**Physical Meaning:**
• Position s(t) → Velocity v(t) = s'(t)
• Velocity v(t) → Acceleration a(t) = v'(t)`,
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
    content: `**Integration: The Reverse of Differentiation**

**Indefinite Integral:**
∫f(x)dx = F(x) + C

where F'(x) = f(x)

**Power Rule for Integration:**
∫xⁿ dx = xⁿ⁺¹/(n+1) + C  (when n ≠ -1)

• ∫x² dx = x³/3 + C
• ∫x dx = x²/2 + C
• ∫1 dx = x + C
• ∫x⁻² dx = -x⁻¹ + C = -1/x + C

**Why +C?**
d/dx(x² + 5) = 2x
d/dx(x² + 100) = 2x
Many functions have the same derivative!

**Definite Integral:**
∫[a to b] f(x)dx = F(b) - F(a)

This gives the *area under the curve* from a to b.

**Fundamental Theorem of Calculus:**
d/dx ∫[a to x] f(t)dt = f(x)

Integration and differentiation are inverses!

**Example: Distance from Velocity**
v(t) = 3t² (velocity in m/s)

Distance from t=0 to t=2:
∫[0 to 2] 3t² dt = [t³]₀² = 2³ - 0³ = 8 meters

**Physical Meaning:**
• ∫ velocity dt = displacement
• ∫ acceleration dt = velocity change
• ∫ force × distance = work`,
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
    content: `**Newton's First Law of Motion**

**Statement:**
"Every body perseveres in its state of rest, or of uniform motion in a right line, unless it is compelled to change that state by forces impressed thereon."
— Principia Mathematica (1687)

**In Modern Terms:**
An object at rest stays at rest. An object in motion stays in motion at constant velocity. Unless a net force acts on it.

**Why This Was Revolutionary:**
Aristotle taught: Objects naturally stop. Motion requires continuous force.
Newton showed: Objects naturally continue. Stopping requires force!

**Inertia:**
The tendency of objects to resist changes in motion.
• More mass = more inertia
• A bowling ball is harder to start moving than a tennis ball
• A bowling ball is also harder to stop

**Examples:**
1. **Car brakes suddenly** → You keep moving forward (seatbelt saves you)
2. **Tablecloth trick** → Plates have inertia; cloth moves, plates stay
3. **Space probe** → Once moving, travels forever without fuel

**Why Things Stop on Earth:**
Friction and air resistance are forces that slow things down. In space, there's (almost) no friction—objects keep moving indefinitely.

**Exercise:** Drop a book and a feather in air vs. in a vacuum. In vacuum, they fall together—air resistance was the difference!`,
    keyPoints: [
      "Objects resist changes to their motion (inertia)",
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
    content: `**Newton's Second Law: F = ma**

**Statement:**
"The alteration of motion is ever proportional to the motive force impressed."

**The Equation:**
**F = ma**
or equivalently: **a = F/m**

Force (N) = mass (kg) × acceleration (m/s²)

**Units:**
• Force: Newton (N) = kg·m/s²
• 1 Newton ≈ force to hold a small apple

**What It Means:**
• More force → more acceleration
• More mass → less acceleration (for same force)
• Force and acceleration point in the same direction

**Examples:**

**1. Pushing a Shopping Cart**
• Empty cart (10 kg), push with 20 N
• a = F/m = 20/10 = 2 m/s²

• Full cart (40 kg), same 20 N push
• a = 20/40 = 0.5 m/s²

**2. Weight vs. Mass**
Weight = mass × gravity
W = mg
where g ≈ 9.8 m/s² on Earth

Your mass is constant; your weight depends on local gravity.
• On Moon (g = 1.6): You weigh 1/6 as much
• In space (g ≈ 0): You're weightless, not massless!

**3. Free Fall**
F = mg, a = F/m = mg/m = g
Everything falls at the same rate (ignoring air)!`,
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
    content: `**Newton's Third Law**

**Statement:**
"To every action there is always opposed an equal reaction."

**The Rule:**
When object A exerts a force on object B, object B simultaneously exerts an equal and opposite force on object A.

**F_AB = -F_BA**

**Key Points:**
1. Forces always come in pairs
2. The pair acts on *different* objects
3. They're equal in magnitude, opposite in direction
4. They happen simultaneously

**Examples:**

**Walking:**
• Your foot pushes backward on the ground
• Ground pushes forward on your foot
• You move forward!

**Swimming:**
• Your hand pushes water backward
• Water pushes your hand forward

**Rockets:**
• Rocket pushes exhaust gases down
• Exhaust pushes rocket up
• Works in space (no air needed to push against!)

**Gun Recoil:**
• Bullet pushed forward
• Gun pushed backward (recoil)
• Same force, different masses → different accelerations

**Common Misconception:**
"If forces are equal, why doesn't a horse and cart cancel out?"

The forces act on *different objects*!
• Horse pulls cart forward
• Cart pulls horse backward
• But horse also pushes ground backward; ground pushes horse forward
• Net force on horse-cart system: forward`,
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
    content: `**Newton's Law of Universal Gravitation**

**The Legend:**
Did an apple really fall on Newton's head? Probably not. But he did wonder: if gravity pulls apples down, does it reach the Moon?

**The Equation:**
**F = G(m₁m₂)/r²**

• F = gravitational force between two masses
• G = gravitational constant = 6.674 × 10⁻¹¹ N·m²/kg²
• m₁, m₂ = the two masses
• r = distance between their centers

**Key Features:**

**1. Inverse Square Law:**
Double the distance → force becomes 1/4
Triple the distance → force becomes 1/9
Force drops off rapidly with distance.

**2. Universal:**
Every mass attracts every other mass.
You attract the person next to you (but very weakly).

**3. Action at a Distance:**
Gravity works across empty space.
(Einstein later explained this as curved spacetime.)

**Why the Moon Doesn't Fall:**
It IS falling! But it's also moving sideways fast enough that it keeps missing Earth. The Moon is perpetually falling around us.

**Calculating g:**
At Earth's surface:
g = GM_Earth / r²_Earth
g ≈ 9.8 m/s²

This is why everything falls at the same rate!

**Newton's Triumph:**
The same equation explains:
• Falling apples
• Ocean tides
• Planetary orbits
• Comets' paths`,
    keyPoints: [
      "F = G(m₁m₂)/r² — gravitational force equation",
      "Force decreases with the square of distance",
      "The Moon is constantly 'falling' toward Earth (in orbit)",
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
    content: `**Euclid's Elements, Book I**

**The Definitions (Key Ones):**
1. A point is that which has no part.
2. A line is breadthless length.
3. A straight line lies evenly with its points.
4. A plane surface lies evenly with its lines.
15. A circle is a plane figure bounded by one line such that all straight lines from the center are equal.
23. Parallel lines never meet, no matter how far extended.

**The Five Postulates:**
1. A straight line can be drawn between any two points.
2. A straight line can be extended indefinitely.
3. A circle can be drawn with any center and radius.
4. All right angles are equal.
5. **(The Parallel Postulate):** If a line crosses two others and the interior angles on one side sum to less than 180°, the lines meet on that side.

**Common Notions (Axioms):**
1. Things equal to the same thing are equal.
2. Equals added to equals are equal.
3. Equals subtracted from equals are equal.
4. Things that coincide are equal.
5. The whole is greater than the part.

**Proposition I.47 (Pythagorean Theorem):**
In a right triangle, the square on the hypotenuse equals the sum of the squares on the other two sides.

**a² + b² = c²**

Newton mastered this at Cambridge before moving to calculus.`,
    keyPoints: [
      "Start with definitions: point, line, angle, circle",
      "Five postulates form the foundation",
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
    content: `**Triangle Congruence**

Two triangles are **congruent** if they have the same shape and size—one can be placed exactly on top of the other.

**The Four Congruence Criteria:**

**1. SAS (Side-Angle-Side)**
If two sides and the included angle of one triangle equal those of another, the triangles are congruent.

**2. ASA (Angle-Side-Angle)**
If two angles and the included side of one triangle equal those of another, the triangles are congruent.

**3. SSS (Side-Side-Side)**
If all three sides of one triangle equal the corresponding sides of another, the triangles are congruent.

**4. AAS (Angle-Angle-Side)**
If two angles and a non-included side match, congruent.

**What DOESN'T Work: AAA**
Same angles = same shape, but possibly different size.
That's similarity, not congruence.

**Notation:**
△ABC ≅ △DEF means:
• A corresponds to D
• B corresponds to E
• C corresponds to F

**Proof Example (Euclid I.4, SAS):**
Given: AB = DE, AC = DF, ∠BAC = ∠EDF
Place △ABC on △DEF so A coincides with D
AB falls along DE (same length), so B = E
AC falls along DF (same angle, same length), so C = F
Therefore BC = EF, and all angles match.
△ABC ≅ △DEF ∎`,
    keyPoints: [
      "SAS: Two sides and included angle match → congruent",
      "ASA: Two angles and included side match → congruent",
      "SSS: All three sides match → congruent",
      "AAA only proves similarity, not congruence"
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
    content: `**Circle Geometry (Euclid Book III)**

**Key Terms:**
• **Radius:** line from center to circle
• **Diameter:** line through center, touching both sides (= 2 × radius)
• **Chord:** any line segment with both endpoints on the circle
• **Tangent:** line that touches circle at exactly one point
• **Secant:** line that crosses the circle at two points
• **Arc:** portion of the circumference
• **Central angle:** vertex at center
• **Inscribed angle:** vertex on circle

**Major Theorems:**

**1. Tangent Perpendicular to Radius (III.18)**
A tangent to a circle is perpendicular to the radius at the point of contact.

**2. Inscribed Angle Theorem (III.20)**
An inscribed angle is half the central angle that subtends the same arc.

If central angle = 60°, inscribed angle = 30°

**3. Thales' Theorem (III.31)**
An angle inscribed in a semicircle is a right angle (90°).

**4. Chord Properties:**
• Equal chords are equidistant from the center
• A radius perpendicular to a chord bisects it

**5. Intersecting Chords (III.35)**
If two chords intersect inside a circle:
AE × EB = CE × ED

**Inscribed/Circumscribed:**
• A circle *inscribed* in a triangle touches all three sides
• A circle *circumscribed* around a triangle passes through all vertices

Every triangle has exactly one of each!`,
    keyPoints: [
      "Tangent line is perpendicular to radius at contact point",
      "Inscribed angle = half the central angle (same arc)",
      "Angle in a semicircle = 90° (Thales)",
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
