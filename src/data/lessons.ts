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
  videoUrl?: string; // Link to relevant YouTube video or other resource
  videoTitle?: string;
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
    fullTextUrl: "https://www.gutenberg.org/ebooks/39292",
    fullTextTitle: "A Greek Primer for Beginners (Gutenberg)",
    videoUrl: "https://www.youtube.com/watch?v=3yBYi0xyFvE",
    videoTitle: "Learn the Greek Alphabet in 10 Minutes",
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
    fullTextUrl: "https://www.gutenberg.org/ebooks/21",
    fullTextTitle: "Three Hundred Aesop's Fables (Gutenberg)",
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
    fullTextUrl: "https://www.gutenberg.org/ebooks/39292",
    fullTextTitle: "A Greek Primer for Beginners (Gutenberg)",
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
    fullTextUrl: "https://www.gutenberg.org/ebooks/1642",
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
    videoUrl: "https://www.youtube.com/watch?v=z8WlNmFEJoI",
    videoTitle: "Introduction to Logic - Crash Course Philosophy",
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
    fullTextUrl: "https://www.gutenberg.org/ebooks/2412",
    fullTextTitle: "The Categories by Aristotle (Gutenberg)",
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

// Mill's Latin Lessons
const millLatinLessons: Lesson[] = [
  {
    id: 'mill-latin-1',
    subjectId: 'mill-latin',
    title: 'The Latin Alphabet & Pronunciation',
    order: 1,
    overview: "Latin uses the same alphabet as English (minus J, U, W in classical form). Mastering pronunciation is essential for reading aloud and memorizing texts.",
    content: `**The Latin Alphabet (23 Letters)**

Classical Latin used 23 letters:
A B C D E F G H I K L M N O P Q R S T V X Y Z

• I served as both vowel and consonant (like our J)
• V served as both vowel and consonant (like our U/W)
• K, Y, Z were used only in Greek loanwords

**Pronunciation Guide:**

**Vowels (pure, not diphthongs):**
• A = "ah" as in father
• E = "eh" as in pet
• I = "ee" as in machine
• O = "oh" as in note
• U = "oo" as in rude

**Consonants (mostly like English, but):**
• C = always hard "k" (Caesar = KAI-sar)
• G = always hard (Gallia = GAL-lee-ah)
• V = "w" sound (veni = WEN-ee)
• R = rolled/trilled

**Diphthongs:**
• AE = "eye" (Caesar = KAI-sar)
• OE = "oy" (poena = POY-nah)
• AU = "ow" (laudō = LOW-doh)

**Practice Phrase:**
"Vēnī, vīdī, vīcī" = WEH-nee, WEE-dee, WEE-kee
"I came, I saw, I conquered" — Julius Caesar`,
    keyPoints: [
      "Classical Latin has 23 letters (no J, U, W)",
      "C is always hard (like K), never soft",
      "V sounds like W in classical pronunciation",
      "AE makes an 'eye' sound, not 'ee'"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/18251",
    fullTextTitle: "Latin for Beginners (Gutenberg)",
    estimatedMinutes: 30
  },
  {
    id: 'mill-latin-2',
    subjectId: 'mill-latin',
    title: 'First Declension Nouns',
    order: 2,
    overview: "Latin nouns change endings based on their role in a sentence (case). The first declension contains mostly feminine nouns ending in -a.",
    content: `**The Five Cases (What Nouns Do)**

1. **Nominative** — Subject (The girl runs)
2. **Genitive** — Possession (of the girl)
3. **Dative** — Indirect object (to/for the girl)
4. **Accusative** — Direct object (I see the girl)
5. **Ablative** — Various (by/with/from the girl)

**First Declension: puella, puellae (f.) = girl**

|          | Singular | Plural   |
|----------|----------|----------|
| Nom.     | puella   | puellae  |
| Gen.     | puellae  | puellārum|
| Dat.     | puellae  | puellīs  |
| Acc.     | puellam  | puellās  |
| Abl.     | puellā   | puellīs  |

**Common First Declension Nouns:**
• aqua, aquae — water
• terra, terrae — earth, land
• via, viae — road, way
• patria, patriae — fatherland
• poēta, poētae — poet (masculine!)
• agricola, agricolae — farmer (masculine!)

**Example Sentences:**
• Puella cantat. = The girl sings.
• Aquam bibō. = I drink water.
• Via longa est. = The road is long.
• Poēta fābulam narrat. = The poet tells a story.

**Memory Tip:** Most -a nouns are feminine, but "poet" and "farmer" are exceptions.`,
    keyPoints: [
      "First declension nouns typically end in -a (nominative singular)",
      "Most are feminine, but poēta and agricola are masculine",
      "Case endings show the noun's role in the sentence",
      "Learn the chant: -a, -ae, -ae, -am, -ā (singular)"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/18251",
    fullTextTitle: "Latin for Beginners (Gutenberg)",
    estimatedMinutes: 45
  },
  {
    id: 'mill-latin-3',
    subjectId: 'mill-latin',
    title: 'Present Tense Verbs: First Conjugation',
    order: 3,
    overview: "Latin verbs conjugate (change endings) based on person and number. The first conjugation features verbs with stems ending in -ā-.",
    content: `**Latin Verb Basics**

Every verb has:
• Person: 1st (I), 2nd (you), 3rd (he/she/it)
• Number: singular or plural
• Tense: when (present, past, future, etc.)
• Voice: active or passive
• Mood: indicative, subjunctive, imperative

**First Conjugation: amō, amāre = to love**

| Person | Singular    | Plural       |
|--------|-------------|--------------|
| 1st    | amō (I love)| amāmus (we love)|
| 2nd    | amās (you love)| amātis (y'all love)|
| 3rd    | amat (he loves)| amant (they love)|

**Personal Endings (Active Present):**
• -ō (I)
• -s (you)
• -t (he/she/it)
• -mus (we)
• -tis (you pl.)
• -nt (they)

**Common First Conjugation Verbs:**
• vocō, vocāre — to call
• portō, portāre — to carry
• laudō, laudāre — to praise
• laborō, laborāre — to work
• ambulō, ambulāre — to walk
• pugnō, pugnāre — to fight

**Example Sentences:**
• Agricola laborat. = The farmer works.
• Puellae cantant. = The girls sing.
• Aquam portāmus. = We carry water.
• Quid vocās? = What are you calling?`,
    keyPoints: [
      "First conjugation verbs have -ā- before the endings",
      "Six endings: -ō, -s, -t, -mus, -tis, -nt",
      "Subject pronouns are often omitted (the ending tells you)",
      "Infinitive (to ___) ends in -āre for first conjugation"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/18251",
    fullTextTitle: "Latin for Beginners (Gutenberg)",
    estimatedMinutes: 45
  },
  {
    id: 'mill-latin-4',
    subjectId: 'mill-latin',
    title: "Reading Virgil: The Aeneid Opening",
    order: 4,
    overview: "Mill read Virgil's Aeneid, Rome's national epic. The opening lines are among the most famous in world literature—let's parse them together.",
    content: `**Aeneid, Book I, Lines 1-7**

"Arma virumque canō, Troiae quī prīmus ab ōrīs
Ītaliam, fātō profugus, Lāvīniaque vēnit
lītora..."

**Word-by-Word Translation:**

**Arma** = arms, weapons (accusative, direct object)
**virumque** = and the man (vir + que "and")
**canō** = I sing (present active indicative, 1st person)
**Troiae** = of Troy, from Troy (genitive)
**quī** = who (relative pronoun)
**prīmus** = first
**ab ōrīs** = from the shores
**Ītaliam** = Italy (accusative, destination)
**fātō** = by fate (ablative of means)
**profugus** = exile, fugitive
**Lāvīnia lītora** = Lavinian shores (accusative)
**vēnit** = he came

**Translation:**
"I sing of arms and the man, who first from the shores of Troy, an exile by fate, came to Italy and the Lavinian shores..."

**Literary Analysis:**
• "Arma virumque" echoes Homer's Iliad (arms) and Odyssey (the man)
• Virgil claims to combine both epics in one
• Aeneas is "fātō profugus" — fate drives him, not personal choice
• This establishes Roman destiny as divinely ordained

**Study Method:**
1. Read aloud in Latin
2. Parse each word (case, number, tense)
3. Read aloud again with understanding`,
    keyPoints: [
      "'Arma virumque cano' — I sing of arms and the man",
      "Virgil intentionally echoes Homer's two epics",
      "Parse every word: case, gender, number, tense, mood",
      "Read aloud repeatedly to internalize the rhythm"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/228",
    fullTextTitle: "The Aeneid by Virgil (Gutenberg)",
    estimatedMinutes: 60
  }
];

// Mill's Arithmetic Lessons
const millArithmeticLessons: Lesson[] = [
  {
    id: 'mill-arith-1',
    subjectId: 'mill-arithmetic',
    title: 'Mental Arithmetic: Addition & Subtraction',
    order: 1,
    overview: "Mill learned arithmetic through daily mental exercises. Fast mental math builds number sense and frees the mind for higher-level thinking.",
    content: `**Mental Addition Strategies**

**1. Left-to-Right Addition**
Instead of right-to-left (like on paper), add from the left:
• 47 + 36: (40+30) + (7+6) = 70 + 13 = 83

**2. Making Tens**
• 8 + 7: Think 8 + 2 = 10, then +5 = 15
• 47 + 36: 47 + 3 = 50, then +33 = 83

**3. Compensation**
• 99 + 47: Think 100 + 47 - 1 = 146
• 198 + 56: 200 + 56 - 2 = 254

**Mental Subtraction Strategies**

**1. Counting Up (for close numbers)**
• 83 - 47: Count from 47 to 83
  47 + 3 = 50, 50 + 30 = 80, 80 + 3 = 83
  Total: 3 + 30 + 3 = 36

**2. Same-Change Method**
Add the same to both numbers:
• 83 - 47: Add 3 to both: 86 - 50 = 36

**3. Subtraction by Parts**
• 83 - 47: 83 - 40 = 43, then 43 - 7 = 36

**Daily Drill:**
Calculate in your head (time yourself!):
1. 28 + 45 = ?
2. 67 + 88 = ?
3. 123 + 89 = ?
4. 91 - 37 = ?
5. 145 - 68 = ?

Answers: 73, 155, 212, 54, 77

**Mill's Method:** Practice 10 minutes every morning.`,
    keyPoints: [
      "Work left-to-right for mental math (opposite of paper)",
      "Round to friendly numbers, then compensate",
      "For subtraction of close numbers, count up instead",
      "Practice 10 minutes daily for fluency"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/35754",
    fullTextTitle: "Mental Arithmetic (Gutenberg)",
    estimatedMinutes: 25
  },
  {
    id: 'mill-arith-2',
    subjectId: 'mill-arithmetic',
    title: 'Multiplication Tables & Tricks',
    order: 2,
    overview: "Instant recall of multiplication facts through 12×12 is essential. Beyond memorization, learn patterns that make mental multiplication fast.",
    content: `**The Times Tables (Commit to Memory!)**

Quick patterns to spot:
• 9s: Digits always sum to 9 (9, 18, 27, 36, 45...)
• 5s: End in 0 or 5, are half of the 10s
• 11s through 9: Double the digit (11×4 = 44)

**Mental Multiplication Tricks**

**Multiplying by 5:**
• n × 5 = n × 10 ÷ 2
• 48 × 5 = 480 ÷ 2 = 240

**Multiplying by 9:**
• n × 9 = n × 10 - n
• 7 × 9 = 70 - 7 = 63
• 23 × 9 = 230 - 23 = 207

**Multiplying by 11:**
• For two-digit numbers: sum the digits in the middle
• 34 × 11: 3_4, middle = 3+4 = 7, answer = 374
• 72 × 11: 7_2, middle = 9, answer = 792
• 85 × 11: 8_5, middle = 13 (carry!): 935

**Squaring Numbers Ending in 5:**
• n5² = n×(n+1) followed by 25
• 35² = 3×4 = 12, then 25: 1225
• 75² = 7×8 = 56, then 25: 5625
• 125² = 12×13 = 156, then 25: 15625

**Multiplying Two-Digit Numbers:**
Use FOIL (First, Outer, Inner, Last):
• 23 × 14 = (20+3)(10+4)
• = 20×10 + 20×4 + 3×10 + 3×4
• = 200 + 80 + 30 + 12 = 322

**Daily Practice:** Do 5 random multiplications mentally each day.`,
    keyPoints: [
      "Memorize tables through 12×12 for instant recall",
      "Multiply by 5: halve, then add a zero",
      "Multiply by 9: times 10 minus the number",
      "Squares ending in 5: multiply n by (n+1), append 25"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/35754",
    fullTextTitle: "Mental Arithmetic (Gutenberg)",
    estimatedMinutes: 30
  },
  {
    id: 'mill-arith-3',
    subjectId: 'mill-arithmetic',
    title: 'Fractions, Decimals & Percentages',
    order: 3,
    overview: "Understanding the relationship between fractions, decimals, and percentages is essential for everyday math and later algebraic thinking.",
    content: `**The Big Three Are One Thing**

| Fraction | Decimal | Percent |
|----------|---------|---------|
| 1/2      | 0.5     | 50%     |
| 1/4      | 0.25    | 25%     |
| 1/5      | 0.2     | 20%     |
| 1/8      | 0.125   | 12.5%   |
| 1/3      | 0.333...| 33.3%   |
| 2/3      | 0.666...| 66.7%   |
| 3/4      | 0.75    | 75%     |
| 1/10     | 0.1     | 10%     |

**Converting Between Forms:**

**Fraction → Decimal:** Divide numerator by denominator
• 3/4 = 3 ÷ 4 = 0.75

**Decimal → Percent:** Multiply by 100 (move decimal 2 places right)
• 0.75 = 75%

**Percent → Fraction:** Put over 100, simplify
• 75% = 75/100 = 3/4

**Mental Percentage Tricks:**

**Finding 10%:** Move decimal one place left
• 10% of 350 = 35

**Finding 5%:** Half of 10%
• 5% of 350 = 17.5

**Finding 15%:** 10% + 5%
• 15% of 350 = 35 + 17.5 = 52.5

**Finding 1%:** Move decimal two places left
• 1% of 350 = 3.5

**Finding 25%:** Divide by 4
• 25% of 80 = 20

**Word Problem:**
"A $80 item is 25% off. What's the price?"
• 25% of 80 = 20
• 80 - 20 = $60`,
    keyPoints: [
      "Fractions, decimals, and percentages are three forms of the same concept",
      "To find 10%, move the decimal point one place left",
      "To find 1%, move two places left",
      "Build other percentages from 10%, 5%, and 1%"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/35754",
    fullTextTitle: "Mental Arithmetic (Gutenberg)",
    estimatedMinutes: 35
  }
];

// Mill's History Lessons  
const millHistoryLessons: Lesson[] = [
  {
    id: 'mill-history-1',
    subjectId: 'mill-history',
    title: "Plutarch's Lives: Learning from Great Men",
    order: 1,
    overview: "Mill read Plutarch's parallel biographies of Greek and Roman heroes. Plutarch doesn't just tell what happened—he shows character in action.",
    content: `**Plutarch's Parallel Lives**

**What It Is:**
Plutarch (c. 46–120 AD) paired Greek and Roman leaders to compare their virtues and vices. Each pair explores a theme: ambition, justice, courage.

**Famous Pairs:**
• Alexander the Great & Julius Caesar (Ambition)
• Demosthenes & Cicero (Oratory)
• Theseus & Romulus (Founders)
• Pericles & Fabius Maximus (Statesmanship)

**The Life of Alexander (Excerpts):**

"When Philonicus the Thessalian brought the horse Bucephalas to sell to Philip for thirteen talents, the horse seemed wild and unmanageable. Alexander, then a boy, said: 'What a horse they are losing, for lack of skill and boldness to manage him!' Philip was silent. Alexander approached the horse, turned him toward the sun (noticing the horse feared his own shadow), spoke gently, and mounted him. Philip wept with joy and said: 'My son, seek a kingdom worthy of you. Macedonia is too small.'"

**Plutarch's Method:**
• Character is revealed in small moments, not just great battles
• Virtue and vice are choices, not fate
• History teaches by example—positive and negative

**Why Mill Read This:**
• Models of excellence to emulate
• Warnings about corruption of character
• Training in moral reasoning through narrative

**Discussion Question:**
What does the Bucephalas story reveal about Alexander's character?`,
    keyPoints: [
      "Plutarch pairs Greek and Roman leaders to compare character",
      "Small anecdotes reveal character as much as great deeds",
      "History is moral education through example",
      "Ask: What virtue or vice does this story illustrate?"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/674",
    fullTextTitle: "Plutarch's Lives (Gutenberg)",
    estimatedMinutes: 45
  },
  {
    id: 'mill-history-2',
    subjectId: 'mill-history',
    title: "Gibbon's Decline & Fall: Why Empires Collapse",
    order: 2,
    overview: "Edward Gibbon's masterpiece traces Rome's fall from the height of the Antonines to 1453. Mill studied this to understand how civilizations decay.",
    content: `**The Decline and Fall of the Roman Empire**

**The Central Question:**
How did the greatest empire in history fall? 

**Gibbon's Thesis:**
Rome fell from internal decay, not external pressure alone.

**The Five Causes (Gibbon's Analysis):**

**1. Loss of Civic Virtue**
"The Roman legions were now composed of mercenaries who had no country to defend."
Citizens became passive consumers rather than active defenders.

**2. Christianity (Controversially)**
Gibbon argued Christianity diverted energies from civic life to the afterlife. "The clergy successfully preached the doctrines of patience and pusillanimity."

**3. Overextension**
The empire grew too large to defend. Resources stretched thin.

**4. Economic Decay**
• Debasement of currency (inflation)
• Crushing taxation
• Collapse of trade

**5. Barbarian Pressure**
Not the cause, but the final blow. The Visigoths, Vandals, and Huns exploited Roman weakness.

**Famous Passage:**
"The decline of Rome was the natural and inevitable effect of immoderate greatness. Prosperity ripened the principle of decay; the causes of destruction multiplied with the extent of conquest."

**Lesson for Mill (and Us):**
Every civilization carries seeds of its own destruction. Vigilance is eternal.

**Discussion:** Which factor seems most relevant to modern nations?`,
    keyPoints: [
      "Rome fell from internal decay, not just barbarian invasion",
      "Key factors: loss of civic virtue, overextension, economic decay",
      "Gibbon's controversial claim: Christianity weakened civic spirit",
      "Every civilization must guard against complacency"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/25717",
    fullTextTitle: "Decline and Fall of the Roman Empire (Gutenberg)",
    estimatedMinutes: 60
  },
  {
    id: 'mill-history-3',
    subjectId: 'mill-history',
    title: 'The English Revolution: Constitutional Government',
    order: 3,
    overview: "Mill studied English history to understand how constitutional liberty developed. The struggles of the 17th century shaped modern democracy.",
    content: `**The English Revolution (1640-1689)**

**The Big Question:**
Who rules—the King or Parliament?

**Key Events:**

**1. The English Civil War (1642-1651)**
• Charles I vs. Parliament
• Issue: Could the King rule without Parliament's consent?
• Oliver Cromwell's New Model Army defeats the Royalists
• 1649: Charles I executed—first time a king tried and killed by his own people

**2. The Commonwealth (1649-1660)**
• England briefly a republic under Cromwell
• Failed experiment: Cromwell became a dictator in all but name
• After his death, monarchy restored

**3. The Glorious Revolution (1688)**
• James II (Catholic) vs. Protestant Parliament
• Parliament invites William of Orange to invade
• James flees; William and Mary become monarchs
• Bloodless transfer of power

**4. The Bill of Rights (1689)**
Key provisions:
• No taxation without Parliament
• No standing army without consent
• Free elections and free speech in Parliament
• No cruel and unusual punishment
• Right to petition the King

**Why This Matters:**
These principles directly influenced the American Revolution and U.S. Constitution.

**Mill's Lesson:**
Liberty is not given; it is won through struggle and maintained through institutions.`,
    keyPoints: [
      "The English Civil War established Parliament's supremacy over the King",
      "The Glorious Revolution (1688) was bloodless—power transferred by consent",
      "The Bill of Rights (1689) enshrined key liberties",
      "These ideas directly shaped American democracy"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/23949",
    fullTextTitle: "Hume's History of England (Gutenberg)",
    estimatedMinutes: 50
  },
  {
    id: 'mill-history-4',
    subjectId: 'mill-history',
    title: 'The French Revolution: Liberty and Terror',
    order: 4,
    overview: "The French Revolution promised liberty, equality, fraternity—but descended into the Terror. Mill analyzed why revolutions can devour their children.",
    content: `**The French Revolution (1789-1799)**

**The Promise:**
"Liberté, Égalité, Fraternité"

**The Timeline:**

**1789: The Beginning**
• Storming of the Bastille (July 14)
• Declaration of the Rights of Man
• End of feudalism, noble privileges abolished

**1791: Constitutional Monarchy**
• King Louis XVI accepts a constitution
• Limited monarchy with elected legislature
• Seemed like peaceful reform was possible

**1792: War and Radicalization**
• War with Austria and Prussia
• Sans-culottes (radical Paris crowd) rise
• King imprisoned; monarchy abolished
• The Republic proclaimed

**1793-1794: The Terror**
• Louis XVI executed (January 1793)
• Committee of Public Safety under Robespierre
• 17,000 officially executed, perhaps 40,000 total
• "Terror is the order of the day"
• Even revolutionaries guillotined each other

**1794: Thermidor**
• Robespierre arrested and executed
• Terror ends; moderate republic follows
• Eventually Napoleon takes power (1799)

**Mill's Analysis:**
Why did liberty lead to terror?
• Utopian aims + unlimited power = disaster
• No institutional checks on revolutionary government
• Mob passion replaced reasoned deliberation

**Key Quote (Burke):**
"Those who don't know history are destined to repeat it."`,
    keyPoints: [
      "The Revolution began with liberal ideals (1789)",
      "Radicalization led to the Terror (1793-94) and mass executions",
      "Even revolutionary leaders were consumed by the guillotine",
      "Lesson: Liberty without constitutional limits leads to tyranny"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/1301",
    fullTextTitle: "The French Revolution by Carlyle (Gutenberg)",
    estimatedMinutes: 55
  }
];

// Marie Curie Chemistry Lessons
const curieChemistryLessons: Lesson[] = [
  {
    id: 'curie-chem-1',
    subjectId: 'curie-chemistry',
    title: 'Atomic Structure & The Periodic Table',
    order: 1,
    overview: "Understanding atoms and Mendeleev's periodic table was essential to Curie's discoveries. The table organizes elements by atomic properties.",
    content: `**The Building Blocks of Matter**

**Atomic Structure:**
• **Protons** — Positive charge, in nucleus
• **Neutrons** — No charge, in nucleus
• **Electrons** — Negative charge, orbit nucleus

**Atomic Number** = Number of protons (defines the element)
**Atomic Mass** = Protons + Neutrons

**The Periodic Table (Mendeleev, 1869):**
Elements organized by atomic number and properties.
• Rows (Periods): Electron shells
• Columns (Groups): Similar chemical properties

**Key Groups:**
• Group 1: Alkali metals (highly reactive)
• Group 17: Halogens (reactive nonmetals)
• Group 18: Noble gases (inert)

**Curie's Context:**
When Curie began her work, radioactivity was unknown. She would discover two new elements: Polonium (84) and Radium (88).`,
    keyPoints: [
      "Atoms consist of protons, neutrons, and electrons",
      "Atomic number = number of protons",
      "Periodic table organizes elements by atomic properties",
      "Curie discovered Polonium and Radium"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/61622",
    fullTextTitle: "The Discovery of Radium by Marie Curie (Gutenberg)",
    videoUrl: "https://www.youtube.com/watch?v=rz4Dd1I_fX0",
    videoTitle: "The Periodic Table - Crash Course Chemistry",
    estimatedMinutes: 45
  },
  {
    id: 'curie-chem-2',
    subjectId: 'curie-chemistry',
    title: 'Chemical Bonds & Reactions',
    order: 2,
    overview: "Chemical bonds hold atoms together, and reactions rearrange these bonds. Understanding bonding is essential for all chemistry.",
    content: `**Types of Chemical Bonds**

**1. Ionic Bonds**
Transfer of electrons between atoms.
• Metal + Nonmetal
• Example: NaCl (table salt)
• Na gives electron to Cl

**2. Covalent Bonds**
Sharing of electrons between atoms.
• Nonmetal + Nonmetal
• Example: H₂O (water)
• Oxygen shares electrons with 2 hydrogens

**3. Metallic Bonds**
Sea of shared electrons among metals.
• Creates conductivity and malleability

**Chemical Reactions:**
• Reactants → Products
• Conservation of mass: atoms rearranged, not created/destroyed
• Energy can be absorbed (endothermic) or released (exothermic)

**Curie's Work:**
Marie Curie performed countless chemical separations to isolate radium from pitchblende—painstaking reactions with tons of ore.`,
    keyPoints: [
      "Ionic bonds: electron transfer between metals and nonmetals",
      "Covalent bonds: electron sharing between nonmetals",
      "Chemical reactions rearrange atoms but conserve mass",
      "Curie isolated radium through laborious chemical separations"
    ],
    estimatedMinutes: 50
  },
  {
    id: 'curie-chem-3',
    subjectId: 'curie-chemistry',
    title: 'Laboratory Techniques',
    order: 3,
    overview: "Curie's discoveries required mastering laboratory techniques: crystallization, precipitation, and spectroscopy to identify new elements.",
    content: `**Essential Lab Techniques**

**Separation Methods:**
• **Filtration** — Separating solids from liquids
• **Crystallization** — Purifying by forming crystals
• **Distillation** — Separating by boiling points
• **Precipitation** — Causing solids to form from solution

**Curie's Method:**
1. Dissolve pitchblende ore in acid
2. Precipitate different compounds
3. Test each fraction for radioactivity
4. Repeat separation on active fractions
5. Continue until pure element obtained

**Spectroscopy:**
Each element emits unique light wavelengths when heated.
This "fingerprint" identifies elements.

**Curie's Achievement:**
From 8 tons of pitchblende, she isolated 0.1 gram of radium chloride—confirming radium as a new element by its spectral lines.`,
    keyPoints: [
      "Filtration, crystallization, distillation separate substances",
      "Curie used repeated precipitation to isolate radioactive elements",
      "Spectroscopy identifies elements by their light signatures",
      "8 tons of ore yielded just 0.1 gram of radium"
    ],
    estimatedMinutes: 40
  }
];

// Marie Curie Physics Lessons
const curiePhysicsLessons: Lesson[] = [
  {
    id: 'curie-phys-1',
    subjectId: 'curie-physics',
    title: 'Discovery of Radioactivity',
    order: 1,
    overview: "Becquerel discovered radioactivity in 1896. Marie Curie systematically studied it and coined the term 'radioactivity.'",
    content: `**The Discovery (1896)**

**Henri Becquerel's Accident:**
Studying phosphorescence, Becquerel stored uranium salts with photographic plates in a drawer. The plates developed—without light exposure!

Something was radiating from the uranium itself.

**Marie Curie's Systematic Study (1897):**
• Tested all known elements for "Becquerel rays"
• Found thorium was also radioactive
• Measured radioactivity quantitatively
• Coined the term "radioactivity"

**Key Insight:**
Radioactivity comes from within the atom itself—not from chemical reactions. This suggested atoms weren't indivisible after all.

**Curie's Discovery:**
Pitchblende ore was MORE radioactive than pure uranium. This meant unknown, highly radioactive elements must exist!

This led to discovering Polonium and Radium.`,
    keyPoints: [
      "Becquerel discovered uranium emits radiation in 1896",
      "Curie systematically studied radioactivity across elements",
      "Radioactivity comes from within atoms—not chemical reactions",
      "Pitchblende's excess radioactivity led to discovering new elements"
    ],
    fullTextUrl: "https://www.nobelprize.org/prizes/physics/1903/marie-curie/lecture/",
    fullTextTitle: "Marie Curie's Nobel Lecture (1903)",
    estimatedMinutes: 45
  },
  {
    id: 'curie-phys-2',
    subjectId: 'curie-physics',
    title: 'Types of Radiation',
    order: 2,
    overview: "Radioactive decay produces three types of radiation: alpha, beta, and gamma. Each has different properties and penetrating power.",
    content: `**The Three Types of Radiation**

**Alpha Particles (α)**
• 2 protons + 2 neutrons (helium nucleus)
• +2 charge, heavy
• Stopped by paper or skin
• Most ionizing, least penetrating

**Beta Particles (β)**
• Electrons or positrons
• Light, fast
• Stopped by aluminum foil
• Moderate ionizing and penetrating

**Gamma Rays (γ)**
• Pure energy (electromagnetic radiation)
• No mass, no charge
• Requires lead or concrete to stop
• Least ionizing, most penetrating

**Rutherford's Experiments (1899-1903):**
Used magnetic fields to separate radiation types.
• Alpha: curved one way
• Beta: curved opposite way (lighter)
• Gamma: not deflected (no charge)

**Safety Implications:**
Curie worked without protection—both she and Pierre suffered radiation burns. She died of aplastic anemia caused by radiation exposure.`,
    keyPoints: [
      "Alpha: helium nuclei, stopped by paper",
      "Beta: electrons, stopped by aluminum",
      "Gamma: electromagnetic waves, need lead shielding",
      "Curie died from radiation exposure—safety was unknown then"
    ],
    estimatedMinutes: 50
  },
  {
    id: 'curie-phys-3',
    subjectId: 'curie-physics',
    title: 'Half-Life & Decay',
    order: 3,
    overview: "Radioactive decay follows predictable statistics. Half-life is the time for half of a sample to decay.",
    content: `**Half-Life: The Decay Clock**

**Definition:**
Half-life (t½) = time for half of radioactive atoms to decay

**Examples:**
• Radium-226: 1,600 years
• Carbon-14: 5,730 years
• Polonium-218: 3 minutes
• Uranium-238: 4.5 billion years

**Decay Equation:**
N = N₀ × (1/2)^(t/t½)

Where:
• N = remaining atoms
• N₀ = initial atoms
• t = elapsed time
• t½ = half-life

**Applications:**
• Carbon dating (archaeology)
• Medical tracers (short half-life)
• Nuclear power (controlled decay)
• Smoke detectors (Americium-241)

**Curie's Contribution:**
Precise measurement of radioactivity enabled determining half-lives—essential for understanding nuclear physics.`,
    keyPoints: [
      "Half-life: time for half of sample to decay",
      "Each isotope has a characteristic half-life",
      "Decay is statistical—individual atoms unpredictable",
      "Half-life enables carbon dating and nuclear applications"
    ],
    estimatedMinutes: 45
  }
];

// Marie Curie Mathematics Lessons
const curieMathLessons: Lesson[] = [
  {
    id: 'curie-math-1',
    subjectId: 'curie-mathematics',
    title: 'Exponential Functions in Physics',
    order: 1,
    overview: "Radioactive decay follows exponential mathematics. Understanding exponentials is essential for physics and many sciences.",
    content: `**The Exponential Function**

**What Makes It Special:**
The derivative of e^x is e^x itself!

d/dx(e^x) = e^x

**Natural Decay:**
N(t) = N₀ × e^(-λt)

Where:
• N(t) = amount at time t
• N₀ = initial amount
• λ = decay constant
• e ≈ 2.71828...

**Relationship to Half-Life:**
t½ = ln(2)/λ ≈ 0.693/λ

**Why Exponential?**
The rate of decay is proportional to how much remains:
dN/dt = -λN

This differential equation has solution N = N₀e^(-λt)

**Applications Beyond Physics:**
• Population growth: P = P₀e^(rt)
• Compound interest: A = Pe^(rt)
• Cooling: T = T_env + (T₀-T_env)e^(-kt)`,
    keyPoints: [
      "Exponential functions describe growth and decay",
      "e^x is its own derivative—a unique property",
      "Radioactive decay: N = N₀e^(-λt)",
      "Exponentials appear in finance, biology, and physics"
    ],
    estimatedMinutes: 55
  }
];

// Tesla Electricity Lessons
const teslaElectricityLessons: Lesson[] = [
  {
    id: 'tesla-elec-1',
    subjectId: 'tesla-electricity',
    title: 'Fundamentals of Electricity',
    order: 1,
    overview: "Electricity is the flow of electrons. Understanding voltage, current, and resistance is fundamental to all electrical engineering.",
    content: `**The Three Fundamentals**

**Current (I)**
• Flow of electric charge
• Measured in Amperes (A)
• Like water flow through a pipe

**Voltage (V)**
• Electrical pressure/potential difference
• Measured in Volts (V)
• Like water pressure

**Resistance (R)**
• Opposition to current flow
• Measured in Ohms (Ω)
• Like pipe friction

**Ohm's Law:**
V = I × R

• More voltage → more current
• More resistance → less current

**Power (P):**
P = V × I = I²R = V²/R
Measured in Watts (W)

**Tesla's Insight:**
Tesla understood that AC (alternating current) could transmit power more efficiently than DC over long distances—the foundation of modern power grids.`,
    keyPoints: [
      "Current (I): flow of electrons, measured in Amperes",
      "Voltage (V): electrical pressure, measured in Volts",
      "Resistance (R): opposition to flow, measured in Ohms",
      "Ohm's Law: V = I × R"
    ],
    videoUrl: "https://www.youtube.com/watch?v=mc979OhitAg",
    videoTitle: "Electricity Explained - Physics",
    estimatedMinutes: 40
  },
  {
    id: 'tesla-elec-2',
    subjectId: 'tesla-electricity',
    title: 'AC vs DC: The War of Currents',
    order: 2,
    overview: "Tesla championed AC power while Edison promoted DC. The 'War of Currents' determined how we transmit electricity today.",
    content: `**Direct Current (DC)**
• Electrons flow in one direction
• Constant voltage level
• Used in batteries, electronics
• Edison's system

**Alternating Current (AC)**
• Electrons oscillate back and forth
• Voltage follows a sine wave
• 60 Hz in US (50 Hz in Europe)
• Tesla's system

**Why AC Won:**

**1. Transformers Work Only with AC**
Can step voltage up or down easily.

**2. High Voltage = Efficient Transmission**
P = I²R means reducing current reduces losses.
High voltage allows low current for same power.

**3. Long-Distance Power**
AC at high voltage (hundreds of kV) loses little energy over miles.
DC at low voltage would require thick cables or many power plants.

**Tesla's Polyphase System:**
Multiple AC waves offset in time enable smooth, efficient motors—the basis of industrial machinery.`,
    keyPoints: [
      "DC: electrons flow one direction (Edison)",
      "AC: electrons oscillate back and forth (Tesla)",
      "AC can use transformers to change voltage",
      "High voltage AC transmits power efficiently over distance"
    ],
    estimatedMinutes: 50
  },
  {
    id: 'tesla-elec-3',
    subjectId: 'tesla-electricity',
    title: 'Electric Motors & Generators',
    order: 3,
    overview: "Tesla invented the AC induction motor—still used in most appliances and electric vehicles. Motors and generators are inverse devices.",
    content: `**Electromagnetic Induction**

**Faraday's Discovery (1831):**
Moving a magnet through a coil induces electric current.
Moving current through a coil creates a magnetic field.

**Generators (Mechanical → Electrical)**
1. Spinning coil in magnetic field
2. Changing magnetic flux induces voltage
3. Continuous rotation = alternating current

**Motors (Electrical → Mechanical)**
1. Current in coil creates magnetic field
2. Magnetic field interacts with permanent magnet
3. Coil rotates = mechanical power

**Tesla's Induction Motor (1888):**
• No brushes or commutator needed
• Rotating magnetic field from polyphase AC
• Robust, reliable, efficient
• Powers 90% of industrial motors today

**How It Works:**
Stator creates rotating magnetic field.
Rotor "chases" the field, slightly behind.
The "slip" induces current in rotor, creating motion.`,
    keyPoints: [
      "Generators convert mechanical energy to electrical",
      "Motors convert electrical energy to mechanical",
      "Tesla's AC induction motor needs no brushes",
      "Induction motors power most industrial equipment today"
    ],
    estimatedMinutes: 55
  }
];

// Tesla Physics Lessons
const teslaPhysicsLessons: Lesson[] = [
  {
    id: 'tesla-phys-1',
    subjectId: 'tesla-physics',
    title: "Maxwell's Equations",
    order: 1,
    overview: "Maxwell unified electricity and magnetism into electromagnetism. His four equations describe all classical electromagnetic phenomena.",
    content: `**The Four Maxwell Equations (Simplified)**

**1. Gauss's Law (Electric)**
∇·E = ρ/ε₀
Electric charges create electric fields.
Field lines start on + charges, end on – charges.

**2. Gauss's Law (Magnetic)**
∇·B = 0
No magnetic monopoles exist.
Magnetic field lines always form closed loops.

**3. Faraday's Law**
∇×E = -∂B/∂t
Changing magnetic fields create electric fields.
This is how generators work!

**4. Ampère-Maxwell Law**
∇×B = μ₀J + μ₀ε₀∂E/∂t
Electric currents and changing electric fields create magnetic fields.

**The Great Unification:**
Maxwell showed light is an electromagnetic wave!
c = 1/√(μ₀ε₀) ≈ 3×10⁸ m/s

**Tesla's Application:**
Tesla used these principles to design AC systems, wireless transmission, and the Tesla coil.`,
    keyPoints: [
      "Maxwell unified electricity and magnetism",
      "Changing magnetic fields create electric fields (and vice versa)",
      "Light is an electromagnetic wave",
      "These equations underpin all electrical engineering"
    ],
    estimatedMinutes: 60
  }
];

// Tesla Languages Lessons
const teslaLanguagesLessons: Lesson[] = [
  {
    id: 'tesla-lang-1',
    subjectId: 'tesla-languages',
    title: 'The Power of Multilingualism',
    order: 1,
    overview: "Tesla spoke 8 languages fluently. Language learning develops cognitive flexibility and opens access to global knowledge.",
    content: `**Tesla's Languages**
• Serbian (native)
• German
• French
• English
• Italian
• Latin
• Hungarian
• Czech

**Why Languages Mattered to Tesla:**
1. Read scientific papers in original languages
2. Worked in multiple countries
3. Communicated with scientists worldwide
4. Read literature for relaxation

**Cognitive Benefits:**
• Enhanced memory and attention
• Better problem-solving
• Delayed cognitive decline
• Greater mental flexibility

**Tesla's Method:**
• Immersive reading of literature
• Memorization of poetry and texts
• Learning through usage, not just grammar

**Quote from Tesla:**
"I must have read thousands of books in many languages... reading strengthened the mind."`,
    keyPoints: [
      "Tesla spoke 8 languages fluently",
      "Multilingualism enhances cognitive abilities",
      "Reading in original languages was essential for science",
      "Tesla learned through literature, not just textbooks"
    ],
    estimatedMinutes: 30
  }
];

// Einstein Physics Lessons
const einsteinPhysicsLessons: Lesson[] = [
  {
    id: 'einstein-phys-1',
    subjectId: 'einstein-physics',
    title: 'Special Relativity: Foundations',
    order: 1,
    overview: "Einstein's Special Relativity (1905) revolutionized physics. It starts from two simple postulates and leads to profound conclusions.",
    content: `**The Two Postulates**

**1. Principle of Relativity**
The laws of physics are the same in all inertial reference frames.
No experiment can detect absolute motion.

**2. Constancy of Light Speed**
The speed of light (c ≈ 3×10⁸ m/s) is the same for all observers.
Regardless of their motion or the source's motion.

**Consequences:**

**Time Dilation**
Moving clocks run slower.
t' = t/√(1 - v²/c²)
At 99% of c, 7 years on ship = 50 years on Earth.

**Length Contraction**
Moving objects are shorter in direction of motion.
L' = L√(1 - v²/c²)

**Relativity of Simultaneity**
Events simultaneous in one frame may not be in another.

**The Speed Limit**
Nothing with mass can reach or exceed c.
As v→c, energy required→infinity.`,
    keyPoints: [
      "Laws of physics same in all inertial frames",
      "Speed of light is constant for all observers",
      "Time slows down at high speeds (time dilation)",
      "Nothing with mass can travel at light speed"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/36114",
    fullTextTitle: "Relativity: The Special and General Theory (Gutenberg)",
    videoUrl: "https://www.youtube.com/watch?v=yuD34tEpRFw",
    videoTitle: "Special Relativity - Crash Course Physics",
    estimatedMinutes: 60
  },
  {
    id: 'einstein-phys-2',
    subjectId: 'einstein-physics',
    title: 'E = mc²',
    order: 2,
    overview: "The most famous equation in physics shows mass and energy are equivalent. This insight enables nuclear power and explains stellar energy.",
    content: `**Mass-Energy Equivalence**

**The Equation:**
E = mc²

Where:
• E = energy
• m = mass
• c = speed of light (3×10⁸ m/s)

**What It Means:**
Mass IS energy in a different form.
A small amount of mass = enormous energy.

**Example:**
1 gram of matter fully converted:
E = 0.001 kg × (3×10⁸)² = 9×10¹³ Joules
= 21 kilotons of TNT (Hiroshima bomb)

**Applications:**

**1. Nuclear Fission**
Heavy atoms split → products weigh slightly less
Mass difference → energy release

**2. Nuclear Fusion**
Light atoms combine → product weighs less
Powers the Sun and hydrogen bombs

**3. Particle Physics**
Energy creates matter-antimatter pairs
Particle accelerators convert energy to mass

**Einstein's Insight (1905):**
Derived from special relativity: if momentum and energy are conserved, mass must be equivalent to energy.`,
    keyPoints: [
      "E = mc² means mass and energy are equivalent",
      "c² is enormous: small mass = huge energy",
      "Nuclear reactions convert mass to energy",
      "This powers the Sun, nuclear plants, and explains particle physics"
    ],
    estimatedMinutes: 45
  },
  {
    id: 'einstein-phys-3',
    subjectId: 'einstein-physics',
    title: 'General Relativity: Gravity as Geometry',
    order: 3,
    overview: "General Relativity (1915) explains gravity as the curvature of spacetime caused by mass. It predicts black holes, gravitational waves, and GPS corrections.",
    content: `**The Key Insight**

**Equivalence Principle:**
Gravity and acceleration are indistinguishable.
In a falling elevator, you feel weightless.
In an accelerating rocket, you feel "gravity."

**Gravity Is Not a Force:**
Mass curves spacetime.
Objects follow straight paths (geodesics) in curved spacetime.
These paths look curved in 3D space.

**The Rubber Sheet Analogy:**
Place a bowling ball on a stretched rubber sheet.
It creates a "dip"—marbles nearby roll toward it.
Not because of a "force," but because the surface is curved.

**Predictions Confirmed:**

**1. Light Bending (1919)**
Starlight bends around the Sun—confirmed during eclipse.

**2. Time Runs Slower in Gravity**
Clocks at sea level are slightly slower than mountain clocks.
GPS satellites must correct for this!

**3. Gravitational Waves (2015)**
Ripples in spacetime detected by LIGO.
Caused by merging black holes.

**4. Black Holes**
Extreme spacetime curvature where nothing escapes.`,
    keyPoints: [
      "Gravity and acceleration are equivalent",
      "Mass curves spacetime; objects follow curved paths",
      "Light bends around massive objects",
      "GPS requires relativistic corrections to work"
    ],
    estimatedMinutes: 65
  }
];

// Einstein Mathematics Lessons
const einsteinMathLessons: Lesson[] = [
  {
    id: 'einstein-math-1',
    subjectId: 'einstein-mathematics',
    title: 'Tensor Calculus Basics',
    order: 1,
    overview: "Einstein needed tensor mathematics to formulate General Relativity. Tensors generalize vectors and matrices to describe spacetime.",
    content: `**What Are Tensors?**

**Scalars (Rank 0):**
Single numbers. Same in all coordinate systems.
Example: Temperature, mass.

**Vectors (Rank 1):**
Numbers with direction. Transform predictably.
Example: Velocity, force.

**Tensors (Rank 2+):**
Generalization to multiple indices.
Example: Stress tensor, metric tensor.

**The Metric Tensor (g_μν):**
Describes spacetime geometry.
ds² = g_μν dx^μ dx^ν

In flat spacetime: diagonal (-1, 1, 1, 1)
Near masses: more complex

**Einstein's Field Equations:**
G_μν = (8πG/c⁴) T_μν

Left side: Spacetime curvature
Right side: Matter/energy distribution

"Matter tells spacetime how to curve; spacetime tells matter how to move."

**Einstein's Challenge:**
Spent years learning differential geometry from mathematician friends before completing General Relativity.`,
    keyPoints: [
      "Tensors generalize scalars and vectors",
      "The metric tensor describes spacetime geometry",
      "Einstein's equations relate curvature to mass/energy",
      "Einstein had to learn advanced math to express his ideas"
    ],
    estimatedMinutes: 60
  }
];

// Einstein Philosophy Lessons
const einsteinPhilosophyLessons: Lesson[] = [
  {
    id: 'einstein-phil-1',
    subjectId: 'einstein-philosophy',
    title: 'Philosophy of Space and Time',
    order: 1,
    overview: "Einstein's work was deeply influenced by philosophy, especially questions about the nature of space, time, and measurement.",
    content: `**Philosophical Influences on Einstein**

**Ernst Mach (1838-1916):**
• Critiqued Newton's "absolute space"
• Knowledge must come from observation
• Influenced Einstein's rejection of unobservable entities

**David Hume (1711-1776):**
• Skepticism about causation
• Knowledge limited to experience
• Helped Einstein question assumed truths

**Immanuel Kant (1724-1804):**
• Space and time as forms of intuition
• Einstein: Are they really fundamental?

**Einstein's Key Philosophical Moves:**

**1. Operational Definitions**
What does "simultaneous" mean?
Define it by how you measure it.
Result: Relativity of simultaneity!

**2. Thought Experiments**
Imagine chasing a light beam...
Imagine a falling elevator...
Reasoning from simple principles to conclusions.

**3. Aesthetic Criteria**
"A theory should be as simple as possible, but no simpler."
Beauty and elegance guide theory selection.

**Einstein's View:**
"Epistemology without contact with science becomes an empty scheme. Science without epistemology is primitive and muddled."`,
    keyPoints: [
      "Mach's critique of absolute space influenced Einstein",
      "Operational definitions: meaning through measurement",
      "Thought experiments: Einstein's reasoning tool",
      "Philosophy and physics are deeply intertwined"
    ],
    estimatedMinutes: 50
  }
];

// Aristotle Logic Lessons
const aristotleLogicLessons: Lesson[] = [
  {
    id: 'aristotle-log-1',
    subjectId: 'aristotle-logic',
    title: 'The Categories: Organizing Thought',
    order: 1,
    overview: "Aristotle's Categories classifies all things that can be said about existence. It's the first systematic attempt to organize concepts.",
    content: `**The Ten Categories**

Aristotle asked: What kinds of things are there?

**1. Substance (οὐσία)**
What something IS. Primary reality.
Example: "Socrates," "this horse"

**2. Quantity (ποσόν)**
How much or how many.
Example: "five feet tall," "three"

**3. Quality (ποιόν)**
What kind or what like.
Example: "white," "educated"

**4. Relation (πρός τι)**
In reference to something else.
Example: "taller than," "double"

**5. Place (ποῦ)**
Where something is.
Example: "in the marketplace"

**6. Time (πότε)**
When something is.
Example: "yesterday," "in 399 BC"

**7. Position (κεῖσθαι)**
How something is arranged.
Example: "sitting," "lying down"

**8. State/Having (ἔχειν)**
What something has.
Example: "armed," "shod"

**9. Action (ποιεῖν)**
What something does.
Example: "cutting," "burning"

**10. Passion (πάσχειν)**
What is done to something.
Example: "being cut," "being burned"`,
    keyPoints: [
      "Categories classify everything that can be said about existence",
      "Substance is primary—what something IS",
      "Other categories (quality, quantity, etc.) are attributes",
      "This framework influenced all subsequent philosophy"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/2412",
    fullTextTitle: "The Categories by Aristotle (Gutenberg)",
    estimatedMinutes: 45
  },
  {
    id: 'aristotle-log-2',
    subjectId: 'aristotle-logic',
    title: 'The Syllogism',
    order: 2,
    overview: "Aristotle invented the syllogism—the first formal system of deductive logic. It remained the foundation of logic for 2,000 years.",
    content: `**The Structure of Syllogism**

A syllogism has exactly:
• Two premises
• One conclusion
• Three terms (each appearing twice)

**Example (Barbara):**
Major Premise: All mammals are animals.
Minor Premise: All dogs are mammals.
Conclusion: All dogs are animals.

**The Three Terms:**
• Major term (P): appears in conclusion predicate
• Minor term (S): appears in conclusion subject
• Middle term (M): links premises, not in conclusion

**Valid Moods:**
Aristotle identified 19 valid syllogism patterns.
Names like Barbara, Celarent, Darii, Ferio encode:
• A = All S are P
• E = No S are P
• I = Some S are P
• O = Some S are not P

**Why It Matters:**
• First formal logic system
• Shows valid inference forms
• Basis for mathematical proof
• Led to modern symbolic logic`,
    keyPoints: [
      "Syllogisms have two premises and one conclusion",
      "Three terms: major, minor, and middle",
      "Aristotle identified 19 valid patterns",
      "First formal system of deductive logic"
    ],
    estimatedMinutes: 50
  }
];

// Aristotle Ethics Lessons
const aristotleEthicsLessons: Lesson[] = [
  {
    id: 'aristotle-eth-1',
    subjectId: 'aristotle-ethics',
    title: 'Eudaimonia: The Good Life',
    order: 1,
    overview: "For Aristotle, the goal of life is eudaimonia—human flourishing. This is achieved through virtue and living well.",
    content: `**What Is Eudaimonia?**

Often translated as "happiness," but means more:
• Living well and doing well
• Flourishing as a human being
• Fulfilling your nature/potential

**Why Eudaimonia Is the Ultimate Good:**
• Every action aims at some good
• Goods form a hierarchy (means to ends)
• There must be a highest good (or infinite regress)
• This is eudaimonia—desired for its own sake

**What Eudaimonia Requires:**

**1. Virtue (Arete)**
Excellence of character and intellect.

**2. Activity**
Not just having virtue, but exercising it.
"One swallow does not make a summer."

**3. A Complete Life**
Needs sufficient time and resources.
"Call no man happy until he is dead."

**4. External Goods**
Some luck required: health, friends, moderate wealth.

**The Human Function (Ergon):**
What makes humans unique? Reason.
Eudaimonia = activity of soul in accordance with virtue.`,
    keyPoints: [
      "Eudaimonia means human flourishing, not just pleasure",
      "It's the ultimate good—desired for its own sake",
      "Achieved through virtuous activity over a lifetime",
      "Human function is to live according to reason"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/8438",
    fullTextTitle: "Nicomachean Ethics (Gutenberg)",
    estimatedMinutes: 55
  },
  {
    id: 'aristotle-eth-2',
    subjectId: 'aristotle-ethics',
    title: 'The Doctrine of the Mean',
    order: 2,
    overview: "Virtue lies between extremes. Courage is the mean between cowardice and recklessness. This practical wisdom guides ethical action.",
    content: `**Virtue as a Mean**

Every virtue lies between two vices:
• Excess (too much)
• Deficiency (too little)

**Examples:**

**Courage**
• Deficiency: Cowardice
• Mean: Courage
• Excess: Recklessness

**Generosity**
• Deficiency: Stinginess
• Mean: Generosity
• Excess: Prodigality

**Temperance**
• Deficiency: Insensibility
• Mean: Temperance
• Excess: Self-indulgence

**Finding the Mean:**

**1. Relative to the Person**
What's moderate for an athlete differs from a sedentary person.

**2. Relative to the Situation**
Sometimes more anger is appropriate, sometimes less.

**3. Requires Practical Wisdom (Phronesis)**
No simple formula—judgment develops through experience.

**The Mean Is NOT Mediocrity:**
The mean is an extreme in excellence.
"In terms of what is best and right, it is an extreme."`,
    keyPoints: [
      "Virtue is a mean between excess and deficiency",
      "Courage lies between cowardice and recklessness",
      "The mean is relative to person and situation",
      "Practical wisdom (phronesis) helps find the mean"
    ],
    estimatedMinutes: 45
  }
];

// Aristotle Biology Lessons
const aristotleBiologyLessons: Lesson[] = [
  {
    id: 'aristotle-bio-1',
    subjectId: 'aristotle-biology',
    title: 'The First Systematic Biologist',
    order: 1,
    overview: "Aristotle conducted systematic biological research, classifying over 500 species through direct observation.",
    content: `**Aristotle's Biological Method**

**Direct Observation:**
• Dissected over 50 species
• Studied marine life on Lesbos
• Recorded embryological development

**His Classification System:**

**Blooded Animals (Vertebrates):**
• Viviparous quadrupeds (mammals)
• Oviparous quadrupeds (reptiles/amphibians)
• Birds
• Fish
• Whales (correctly classified!)

**Bloodless Animals (Invertebrates):**
• Cephalopods (octopus, squid)
• Crustaceans
• Insects
• Shellfish

**Key Observations:**
• Described placental vs. egg development
• Noted whale breathing → not fish
• Observed octopus mating (doubted for millennia, later confirmed!)
• Described bee colony organization

**Lasting Impact:**
His biological works remained authoritative until the 1800s. Darwin called him "one of the greatest observers."`,
    keyPoints: [
      "Aristotle dissected and classified 500+ species",
      "First systematic classification of animals",
      "Correctly identified whales as non-fish",
      "His biology remained authoritative for 2,000 years"
    ],
    estimatedMinutes: 45
  }
];

// Pascal Geometry Lessons
const pascalGeometryLessons: Lesson[] = [
  {
    id: 'pascal-geo-1',
    subjectId: 'pascal-geometry',
    title: "Pascal's Theorem: A 16-Year-Old's Discovery",
    order: 1,
    overview: "At just 16, Pascal discovered a remarkable theorem about hexagons inscribed in conic sections, still bearing his name today.",
    content: `**Pascal's Theorem (1639)**

**The Setup:**
Take any conic section (circle, ellipse, parabola, hyperbola).
Inscribe a hexagon (6-sided polygon) in it.

**The Theorem:**
Extend the three pairs of opposite sides.
The three points where they intersect are ALWAYS collinear (lie on a straight line)!

**Opposite sides of hexagon ABCDEF:**
• AB and DE → intersect at point P
• BC and EF → intersect at point Q  
• CD and FA → intersect at point R

**Pascal's Line:** P, Q, and R lie on a single line.

**Why It's Remarkable:**
• Works for ANY hexagon on ANY conic section
• Discovered by a 16-year-old!
• Leads to over 400 related theorems
• Foundation of projective geometry

**Pascal's Context:**
His father initially forbade him from studying math (to avoid intellectual strain). Pascal secretly taught himself geometry from age 11, discovering this theorem at 16.`,
    keyPoints: [
      "Hexagon inscribed in a conic section",
      "Opposite sides extended meet at collinear points",
      "Discovered by Pascal at age 16",
      "Foundation of projective geometry"
    ],
    estimatedMinutes: 50
  }
];

// Pascal Probability Lessons
const pascalProbabilityLessons: Lesson[] = [
  {
    id: 'pascal-prob-1',
    subjectId: 'pascal-probability',
    title: 'The Birth of Probability Theory',
    order: 1,
    overview: "Pascal and Fermat founded probability theory through letters about gambling problems. This mathematics underlies all statistics and AI.",
    content: `**The Problem of Points (1654)**

**The Question:**
Two players are in a game of chance.
The game is interrupted before either wins.
How should the stakes be divided fairly?

**Example:**
First to win 3 rounds takes all.
Player A has won 2, Player B has won 1.
How to divide the pot?

**Pascal's Solution:**
Count all possible ways the game could end.
Assign shares based on probability of winning.

Remaining scenarios:
• A wins next → A wins (1/2 of cases)
• B wins next, A wins after → A wins (1/4)
• B wins next two → B wins (1/4)

A should get 3/4 of the pot!

**Pascal's Triangle:**
Each number is the sum of two numbers above it.

       1
      1 1
     1 2 1
    1 3 3 1
   1 4 6 4 1

Row n gives coefficients of (a+b)^n
Also counts combinations: C(n,k)

**Impact:**
This correspondence founded probability theory—the basis of statistics, actuarial science, and machine learning.`,
    keyPoints: [
      "Problem of Points: how to fairly divide interrupted games",
      "Probability = favorable outcomes / total outcomes",
      "Pascal's Triangle gives combination counts",
      "This correspondence founded probability theory"
    ],
    estimatedMinutes: 55
  }
];

// Pascal Philosophy Lessons
const pascalPhilosophyLessons: Lesson[] = [
  {
    id: 'pascal-phil-1',
    subjectId: 'pascal-philosophy',
    title: "Pascal's Wager",
    order: 1,
    overview: "Pascal's Wager applies probability to the question of God's existence—an early example of decision theory.",
    content: `**The Argument**

**Setup:**
Either God exists or doesn't.
You must choose to believe or not (you can't abstain).
What's the rational choice?

**The Payoff Matrix:**

|              | God Exists | God Doesn't |
|--------------|------------|-------------|
| Believe      | Infinite gain (heaven) | Small loss (some pleasures) |
| Don't Believe| Infinite loss (hell) | Small gain (some pleasures) |

**Pascal's Reasoning:**
• If God exists and you believe: infinite gain
• If God exists and you don't: infinite loss
• Finite gains/losses are negligible vs. infinity

**Expected Value:**
Even if probability of God is tiny,
∞ × (tiny probability) = ∞
Belief is the rational choice!

**Objections:**
• Which god? (many-gods objection)
• Can you choose to believe? (doxastic voluntarism)
• Does God reward calculated belief?

**Pascal's Deeper Point:**
Heart has reasons that reason doesn't know.
Faith isn't just intellectual assent.`,
    keyPoints: [
      "Pascal's Wager applies decision theory to belief in God",
      "Infinite stakes make even small probabilities significant",
      "Early example of expected value reasoning",
      "Pascal acknowledged faith involves more than calculation"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/18269",
    fullTextTitle: "Pascal's Pensées (Gutenberg)",
    estimatedMinutes: 45
  }
];

// Leibniz Calculus Lessons
const leibnizCalculusLessons: Lesson[] = [
  {
    id: 'leibniz-calc-1',
    subjectId: 'leibniz-calculus',
    title: 'Leibniz Notation: The Power of Symbols',
    order: 1,
    overview: "Leibniz invented the notation we still use for calculus: dx, dy, ∫. His symbols make calculus intuitive and computational.",
    content: `**Leibniz vs. Newton Notation**

**Newton:**
ẋ (x-dot) for derivatives
Fluents and fluxions

**Leibniz:**
dy/dx for derivatives
∫ for integrals
Much more powerful!

**Why Leibniz Notation Won:**

**1. Suggestive of Operations**
dy/dx "looks like" a fraction.
Chain rule: dy/dx = dy/du × du/dx
(Cancel the du's!)

**2. Integration**
∫ f(x) dx
The dx tells you the variable of integration.

**3. Differentials**
dx and dy as infinitesimals
dy = f'(x)dx works intuitively.

**Key Rules in Leibniz Notation:**

**Differentiation:**
d/dx(x^n) = nx^(n-1)
d/dx(sin x) = cos x
d/dx(e^x) = e^x

**Integration:**
∫ x^n dx = x^(n+1)/(n+1) + C
∫ cos x dx = sin x + C

**Leibniz's Vision:**
Create symbols that "do the thinking for us."
Good notation makes hard problems routine.`,
    keyPoints: [
      "Leibniz invented dy/dx and ∫ notation",
      "His symbols suggest correct manipulations",
      "Chain rule looks like fraction cancellation",
      "We still use Leibniz notation today"
    ],
    estimatedMinutes: 50
  }
];

// Leibniz Logic Lessons
const leibnizLogicLessons: Lesson[] = [
  {
    id: 'leibniz-log-1',
    subjectId: 'leibniz-logic',
    title: 'The Calculus of Reason',
    order: 1,
    overview: "Leibniz dreamed of a 'calculus of reason'—reducing all arguments to calculation. This vision anticipated computers and formal logic.",
    content: `**Leibniz's Vision**

**Two Key Ideas:**

**1. Characteristica Universalis**
A universal symbolic language for all knowledge.
Every concept assigned a symbol.
Complex ideas built from simple ones.

**2. Calculus Ratiocinator**
A calculation method for reasoning.
Disputes settled by computing!

"Let us calculate, sir!" 
— Leibniz imagined philosophers saying

**How It Would Work:**

**1. Assign Numbers to Concepts**
• Human = 6
• Rational = 2
• Animal = 3
(where 6 = 2 × 3)

**2. Test Relationships**
"All humans are animals"
Check: Is 6 divisible by 3? Yes! ✓

**3. Detect Invalid Reasoning**
Invalid arguments produce numerical contradictions.

**The Legacy:**
• Anticipated Boolean algebra
• Inspired Frege's formal logic
• Influenced Gödel and Turing
• Foundation of computer science

Leibniz even designed a mechanical calculator and envisioned machines that reason!`,
    keyPoints: [
      "Universal language to express all knowledge",
      "Calculation method to settle all disputes",
      "Anticipated computer science by 200 years",
      "Influenced formal logic and AI"
    ],
    estimatedMinutes: 45
  }
];

// Leibniz Philosophy Lessons
const leibnizPhilosophyLessons: Lesson[] = [
  {
    id: 'leibniz-phil-1',
    subjectId: 'leibniz-philosophy',
    title: 'Monads: The Building Blocks of Reality',
    order: 1,
    overview: "Leibniz's Monadology proposes that reality consists of simple, immaterial substances called monads—each reflecting the universe from its perspective.",
    content: `**What Are Monads?**

**Basic Properties:**
• Simple (no parts)
• Immaterial (not physical)
• Indivisible (can't be destroyed naturally)
• Each unique

**Key Claim:**
Monads are "windowless"—they don't interact causally with each other!

**So How Does the World Seem Unified?**

**Pre-Established Harmony:**
God created all monads to be synchronized.
Like clocks set to the same time—they match without affecting each other.

**Perception:**
Each monad perceives the entire universe from its perspective.
Higher monads (souls) have clearer perception.
God = the supreme monad with perfect perception.

**Why This View?**

**Problem with Matter:**
If matter is infinitely divisible, what are the ultimate parts?
Answer: Not material—monads!

**Mind-Body Problem:**
If mind and body are different, how do they interact?
Answer: They don't—pre-established harmony!

**Leibniz's Optimism:**
This is "the best of all possible worlds"—God chose the maximum perfection compatible with existence.`,
    keyPoints: [
      "Monads: simple, immaterial substances",
      "Each monad reflects the whole universe",
      "Pre-established harmony instead of causal interaction",
      "Reality consists of perspectives, not matter"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/39441",
    fullTextTitle: "Monadology (Gutenberg)",
    estimatedMinutes: 55
  }
];

// Goethe Literature Lessons
const goetheLiteratureLessons: Lesson[] = [
  {
    id: 'goethe-lit-1',
    subjectId: 'goethe-literature',
    title: 'Faust: The Masterpiece',
    order: 1,
    overview: "Goethe's Faust is one of the greatest works of world literature—a drama about knowledge, ambition, and the human condition.",
    content: `**The Story of Faust**

**Part I: The Bargain**
Dr. Faust is a brilliant scholar—but dissatisfied.
He's mastered all knowledge, yet feels empty.

Mephistopheles (the devil) offers a deal:
• Faust gets whatever he desires
• If Faust ever says "Stay, moment, you are fair!"
• Mephistopheles gets his soul

**The Tragedy of Gretchen:**
Faust falls for innocent Gretchen.
His passion leads to her destruction:
• Her mother dies
• Her brother dies
• Her child dies
• She is condemned to death

**Part II: The Redemption**
Written over 60 years, completed just before Goethe's death.

Faust seeks meaning through:
• Art and beauty (Helen of Troy)
• Power and politics
• Creating land from the sea

**The Final Scene:**
Working to create a free community,
Faust finally says the fateful words...
But he's saved! Mephistopheles loses.

"Whoever strives with all their might, that person we can save."`,
    keyPoints: [
      "Faust sells his soul for experience and knowledge",
      "Part I: tragedy of Gretchen",
      "Part II: Faust's search for meaning",
      "Redemption through striving, not perfection"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/14591",
    fullTextTitle: "Faust Part One (Gutenberg)",
    estimatedMinutes: 60
  }
];

// Goethe Science Lessons
const goetheScienceLessons: Lesson[] = [
  {
    id: 'goethe-sci-1',
    subjectId: 'goethe-science',
    title: 'Theory of Colours',
    order: 1,
    overview: "Goethe challenged Newton's optics with his own color theory, emphasizing perception and psychology of color.",
    content: `**Goethe vs. Newton**

**Newton's View (1704):**
White light is composite—split by prism into spectrum.
Color is physics: different wavelengths.
The eye is a passive detector.

**Goethe's View (1810):**
Color arises from interaction of light and dark.
Color is experience: eye is active participant.
Psychology and physiology matter!

**Goethe's Observations:**

**1. Afterimages**
Stare at red, then look at white.
You see green (complementary color).
The eye creates color!

**2. Colored Shadows**
Shadow of object lit by colored light appears complementary.

**3. Turbid Media**
Light through haze appears yellow/red.
Light against dark background appears blue.
(Explains sky blue, sunsets!)

**4. Color Harmony**
Complementary colors (red-green, blue-orange) create pleasing combinations.

**Legacy:**
• Influenced artists (Turner, Kandinsky)
• Anticipated color psychology
• Highlighted observer in perception
• Wrong about physics, insightful about perception`,
    keyPoints: [
      "Goethe emphasized perception, not just physics",
      "Afterimages show eye actively creates color",
      "Turbid media explain sky and sunset colors",
      "Wrong about physics, but pioneered color psychology"
    ],
    fullTextUrl: "https://www.gutenberg.org/ebooks/50572",
    fullTextTitle: "Theory of Colours (Gutenberg)",
    estimatedMinutes: 50
  }
];

// Goethe Languages Lessons  
const goetheLanguagesLessons: Lesson[] = [
  {
    id: 'goethe-lang-1',
    subjectId: 'goethe-languages',
    title: 'The Polyglot Poet',
    order: 1,
    overview: "Goethe mastered six languages by age 16, giving him unparalleled access to world literature and thought.",
    content: `**Goethe's Languages**

By age 16:
• German (native)
• Latin
• Greek
• French
• Italian
• English

Later added Hebrew for biblical studies.

**How He Learned:**

**Intensive Early Education:**
Private tutors from age 6.
Daily lessons in multiple languages.
Reading literature in original, not translation.

**The Novel Method:**
As a child, wrote a novel with characters from different nations—each speaking their own language!
Motivated learning through storytelling.

**Immersive Reading:**
Read Homer in Greek.
Read Dante in Italian.
Read Shakespeare in English.

**World Literature (Weltliteratur):**
Goethe coined this term.
National literatures are giving way to world literature.
We must read beyond our own language.

**His Advice:**
"Those who know nothing of foreign languages know nothing of their own."

Languages open windows to other cultures, other ways of thinking.`,
    keyPoints: [
      "Goethe mastered 6 languages by age 16",
      "Read great literature in original languages",
      "Coined the term 'world literature' (Weltliteratur)",
      "'Those who know no foreign language know nothing of their own'"
    ],
    estimatedMinutes: 40
  }
];

// Combine all lessons
export const lessons: Lesson[] = [
  ...millGreekLessons,
  ...millLogicLessons,
  ...millPoliticalEconomyLessons,
  ...millLatinLessons,
  ...millArithmeticLessons,
  ...millHistoryLessons,
  ...davinciDrawingLessons,
  ...newtonCalculusLessons,
  ...newtonPhysicsLessons,
  ...newtonGeometryLessons,
  ...curieChemistryLessons,
  ...curiePhysicsLessons,
  ...curieMathLessons,
  ...teslaElectricityLessons,
  ...teslaPhysicsLessons,
  ...teslaLanguagesLessons,
  ...einsteinPhysicsLessons,
  ...einsteinMathLessons,
  ...einsteinPhilosophyLessons,
  ...aristotleLogicLessons,
  ...aristotleEthicsLessons,
  ...aristotleBiologyLessons,
  ...pascalGeometryLessons,
  ...pascalProbabilityLessons,
  ...pascalPhilosophyLessons,
  ...leibnizCalculusLessons,
  ...leibnizLogicLessons,
  ...leibnizPhilosophyLessons,
  ...goetheLiteratureLessons,
  ...goetheScienceLessons,
  ...goetheLanguagesLessons
];

export const getLessonsBySubjectId = (subjectId: string): Lesson[] => {
  return lessons.filter(l => l.subjectId === subjectId).sort((a, b) => a.order - b.order);
};

export const getLessonById = (lessonId: string): Lesson | undefined => {
  return lessons.find(l => l.id === lessonId);
};
