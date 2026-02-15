// Feed content data - expanded content pools for the mindful scrolling feed

import { geniuses } from '@/data/geniuses';
import { pathModules } from '@/data/pathCurriculum';
import { QuizQuestion } from '@/data/quizzes';

// ── Types ────────────────────────────────────────────────────────────────

export type FeedItem =
  | { type: 'quote'; data: { text: string; author: string; field: string } }
  | { type: 'insight'; data: { title: string; body: string; category: string; icon: string } }
  | { type: 'story'; data: { headline: string; body: string; genius: string } }
  | { type: 'connection'; data: { term: string; origin: string; meaning: string; modern: string } }
  | { type: 'whyStudy'; data: { subject: string; text: string; icon: string } }
  | { type: 'excerpt'; data: { text: string; workTitle: string; author: string; year: string | number; url: string } }
  | { type: 'quiz'; data: QuizQuestion & { clue?: string } };

// ── Quotes ──────────────────────────────────────────────────────────────

const geniusQuotes: FeedItem[] = geniuses.map(g => ({
  type: 'quote' as const,
  data: { text: g.famousQuote, author: g.name, field: g.field },
}));

const extraQuotes: FeedItem[] = [
  { type: 'quote', data: { text: 'The only true wisdom is in knowing you know nothing.', author: 'Aristotle', field: 'Philosophy' } },
  { type: 'quote', data: { text: 'In the middle of difficulty lies opportunity.', author: 'Albert Einstein', field: 'Physics' } },
  { type: 'quote', data: { text: 'Nothing in life is to be feared, it is only to be understood.', author: 'Marie Curie', field: 'Science' } },
  { type: 'quote', data: { text: 'Simplicity is the ultimate sophistication.', author: 'Leonardo da Vinci', field: 'Art & Science' } },
  { type: 'quote', data: { text: 'The present is theirs; the future, for which I really worked, is mine.', author: 'Nikola Tesla', field: 'Engineering' } },
  { type: 'quote', data: { text: 'Knowing is not enough; we must apply. Willing is not enough; we must do.', author: 'Johann Wolfgang von Goethe', field: 'Literature' } },
  { type: 'quote', data: { text: 'Men are not born equal, but they are born free.', author: 'John Stuart Mill', field: 'Philosophy' } },
  { type: 'quote', data: { text: 'The heart has its reasons which reason knows nothing of.', author: 'Blaise Pascal', field: 'Philosophy' } },
  { type: 'quote', data: { text: 'It is undesirable to believe a proposition when there is no ground whatsoever for supposing it is true.', author: 'Isaac Newton', field: 'Physics' } },
  { type: 'quote', data: { text: 'Music is the pleasure the human mind experiences from counting without being aware that it is counting.', author: 'Gottfried Leibniz', field: 'Mathematics' } },
  { type: 'quote', data: { text: 'Give me a lever long enough and a fulcrum on which to place it, and I shall move the world.', author: 'Archimedes', field: 'Mathematics' } },
  { type: 'quote', data: { text: 'The measure of intelligence is the ability to change.', author: 'Albert Einstein', field: 'Physics' } },
  { type: 'quote', data: { text: 'I think, therefore I am.', author: 'René Descartes', field: 'Philosophy' } },
  { type: 'quote', data: { text: 'The only way to do great work is to love what you do.', author: 'Leonardo da Vinci', field: 'Art & Science' } },
  { type: 'quote', data: { text: 'Nature does nothing in vain.', author: 'Aristotle', field: 'Philosophy' } },
];

export const allQuotes: FeedItem[] = [...geniusQuotes, ...extraQuotes];

// ── Insights ────────────────────────────────────────────────────────────

export const insights: FeedItem[] = [
  { type: 'insight', data: { title: 'The Interruption Method', body: "Mill's father never said \"look it up.\" When young John encountered an unknown Greek word, he asked immediately. This constant interruption forced active engagement — the vocabulary stuck because it was tied to the frustration and relief of a real reading moment, not an abstract flashcard.", category: 'Learning', icon: '🧠' } },
  { type: 'insight', data: { title: 'Why Euclid Still Matters', body: "Einstein kept a copy of Euclid's Elements on his desk his entire life. He called it his \"holy little geometry book.\" The reason? Euclid doesn't just teach geometry — he teaches you how to think from first principles.", category: 'Mathematics', icon: '📐' } },
  { type: 'insight', data: { title: 'The Power of Back-Translation', body: "Mill would translate a passage from Greek to English, set it aside for a week, then translate his English back into Greek — and compare it to the original. The gaps revealed what he truly understood versus what he merely recognised.", category: 'Languages', icon: '🌍' } },
  { type: 'insight', data: { title: "Tesla's Mental Workshop", body: "Tesla didn't sketch prototypes. He built complete machines in his imagination, let them run for weeks, then checked for wear on the imaginary parts. When he finally built the real thing, it worked on the first try.", category: 'Engineering', icon: '⚡' } },
  { type: 'insight', data: { title: "Newton's Plague Year", body: "When Cambridge closed for plague in 1665, 23-year-old Newton went home and had the most productive 18 months in scientific history. He developed calculus, the theory of colour, and began work on gravity.", category: 'Physics', icon: '🍎' } },
  { type: 'insight', data: { title: "Curie's Glowing Notebooks", body: "Marie Curie's personal notebooks from the 1890s are still so radioactive that they are kept in lead-lined boxes. To read them, you must sign a liability waiver and wear protective clothing.", category: 'Science', icon: '☢️' } },
  { type: 'insight', data: { title: 'The Trivium & Quadrivium', body: "The classical education model has three stages: Grammar, Logic, and Rhetoric. Then four mathematical arts: Arithmetic, Geometry, Music, and Astronomy. This 1,500-year-old framework is the backbone of this curriculum.", category: 'Education', icon: '🏛️' } },
  { type: 'insight', data: { title: "Leonardo's Mirror Writing", body: "Da Vinci wrote over 7,000 pages of notes — all backwards, readable only in a mirror. Whatever the reason, his notebooks remain one of history's greatest records of curiosity.", category: 'Art', icon: '🪞' } },
  { type: 'insight', data: { title: "Pascal's Wager", body: "At 19, Pascal built the first mechanical calculator. But his most famous argument is philosophical: if God exists and you believe, you gain everything. If not, you lose nothing. The logic is fascinating regardless.", category: 'Philosophy', icon: '🎲' } },
  { type: 'insight', data: { title: 'Binary: From Leibniz to Your Phone', body: "Leibniz invented binary (0 and 1) in 1703, inspired by the Chinese I Ching. Three centuries later, every computer on Earth runs on his system. He had no idea.", category: 'Computing', icon: '💻' } },
  { type: 'insight', data: { title: "Goethe's Colour Theory", body: "Goethe challenged Newton's optics — and was mostly wrong scientifically. But his insights about how humans perceive colour were revolutionary. Modern psychology confirms many of his observations.", category: 'Science', icon: '🎨' } },
  { type: 'insight', data: { title: 'Aristotle Walked While Teaching', body: "Aristotle's school was called the Peripatetic school — from the Greek meaning walking about. Modern research confirms: walking genuinely improves creative thinking.", category: 'Philosophy', icon: '🚶' } },
  { type: 'insight', data: { title: 'The Method of Loci', body: "Ancient Greek orators memorised entire speeches by imagining walking through a familiar building, placing each point in a room. This 'memory palace' technique is still used by world memory champions today.", category: 'Learning', icon: '🏰' } },
  { type: 'insight', data: { title: 'Einstein Played Violin', body: "Einstein was an accomplished violinist who said: 'Life without playing music is inconceivable for me.' He believed his musical training helped him think about physics — the patterns in Mozart were patterns in nature.", category: 'Music', icon: '🎻' } },
  { type: 'insight', data: { title: 'The Feynman Technique', body: "Richard Feynman's learning method: explain a concept in plain language as if teaching a child. If you can't, you don't understand it. The geniuses in this curriculum all practised variants of this instinctively.", category: 'Learning', icon: '📝' } },
  { type: 'insight', data: { title: "Da Vinci's To-Do Lists", body: "Leonardo's to-do lists included items like 'Describe the tongue of the woodpecker' and 'Obtain a skull.' His curiosity was systematic — he didn't just wonder, he wrote questions down and pursued answers.", category: 'Curiosity', icon: '📋' } },
  { type: 'insight', data: { title: 'Newton Invented the Cat Flap', body: "Legend has it Newton cut two holes in his door — one for his cat and one for her kittens. Whether true or not, it captures his tendency to solve practical problems with elegant (if unnecessary) engineering.", category: 'Physics', icon: '🐱' } },
  { type: 'insight', data: { title: 'Spaced Repetition Works', body: "Hermann Ebbinghaus discovered the forgetting curve in 1885: we lose 70% of new information within 24 hours. But reviewing at increasing intervals can make memories nearly permanent. That's why this app uses it.", category: 'Learning', icon: '📈' } },
  { type: 'insight', data: { title: 'Roman Numerals Are Everywhere', body: "Super Bowls, clock faces, movie credits — Roman numerals persist 2,000 years later. I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000. Learning them unlocks a hidden layer of everyday life.", category: 'Mathematics', icon: '🔢' } },
  { type: 'insight', data: { title: 'Latin Is Not Dead', body: "Latin is the direct ancestor of Italian, Spanish, French, Portuguese, and Romanian. Over 60% of English words have Latin roots. Learning even basic Latin dramatically improves your vocabulary in all these languages.", category: 'Languages', icon: '📜' } },
  { type: 'insight', data: { title: 'The Golden Ratio', body: "The number φ (phi) ≈ 1.618 appears in sunflowers, shells, galaxies, and the Parthenon. The Greeks considered it the most aesthetically perfect proportion. Da Vinci used it extensively in his art.", category: 'Mathematics', icon: '🌻' } },
  { type: 'insight', data: { title: 'Zero Changed Everything', body: "The concept of zero was revolutionary. The Romans had no zero — try doing long division with Roman numerals. Indian mathematicians formalised zero around 500 AD, and it reached Europe via Arabic scholars. Modern maths is impossible without it.", category: 'Mathematics', icon: '0️⃣' } },
];

// ── Stories ──────────────────────────────────────────────────────────────

export const stories: FeedItem[] = [
  { type: 'story', data: { headline: 'The Boy Who Read Greek at Three', body: "James Mill decided his son would receive the greatest education in history. By age 3, John Stuart Mill was reading Aesop's Fables in the original Greek. By 14, he had completed a university-level education. He later said his father's method proved that ordinary children could achieve extraordinary things.", genius: 'John Stuart Mill' } },
  { type: 'story', data: { headline: 'Einstein Failed No Exams', body: "The myth that Einstein failed maths is entirely false. He scored top marks throughout school. What he struggled with was the rigid, authoritarian style of German education. His theory of relativity came from years of daydreaming about what it would be like to ride a beam of light.", genius: 'Albert Einstein' } },
  { type: 'story', data: { headline: 'The War of the Currents', body: "Edison launched a propaganda campaign against Tesla's AC power, publicly electrocuting animals to prove AC was dangerous. Tesla responded by running AC current through his own body at the 1893 World's Fair. AC won. Every power grid on Earth uses Tesla's system.", genius: 'Nikola Tesla' } },
  { type: 'story', data: { headline: "Marie Curie's Mobile X-Rays", body: "When WWI broke out, Curie converted her car into a mobile X-ray unit, drove it to the front lines, and trained women to operate the equipment. She personally drove through battlefields to help surgeons locate bullets and shrapnel. She was 47.", genius: 'Marie Curie' } },
  { type: 'story', data: { headline: 'Da Vinci Bought Caged Birds', body: "Leonardo regularly visited markets in Florence, bought caged birds, and immediately set them free. He was a vegetarian in an era when that was almost unheard of. He believed the time would come when people would look upon the killing of animals as they looked upon the killing of men.", genius: 'Leonardo da Vinci' } },
  { type: 'story', data: { headline: 'Goethe Spent 60 Years on One Play', body: "Goethe began Faust at age 21 and did not finish Part Two until he was 82, months before his death. The play spans heaven and hell, love and war, classical Greece and medieval Germany.", genius: 'Johann Wolfgang von Goethe' } },
  { type: 'story', data: { headline: "Newton's Secret Alchemy", body: "Newton spent more time on alchemy than physics. He wrote over a million words on transmuting metals and the philosopher's stone. He kept it secret — it would have ruined his reputation. His alchemical thinking may have inspired his idea of invisible forces like gravity.", genius: 'Isaac Newton' } },
  { type: 'story', data: { headline: 'Aristotle Tutored Alexander the Great', body: "At age 13, Alexander of Macedon was given the greatest philosopher alive as his personal tutor. Aristotle taught him medicine, philosophy, morals, and literature. Alexander later conquered the known world — and always carried a copy of the Iliad annotated by Aristotle.", genius: 'Aristotle' } },
  { type: 'story', data: { headline: "Pascal's Midnight Revelation", body: "On November 23, 1654, Pascal had an intense religious experience that lasted two hours. He wrote a brief ecstatic text on a piece of parchment, which he sewed into his coat lining. It was found only after his death. He wore it every day for eight years.", genius: 'Blaise Pascal' } },
  { type: 'story', data: { headline: 'Leibniz Never Published His Best Work', body: "Leibniz developed calculus independently of Newton, but his notation was so much better that we still use it today. The dx/dy you see in every calculus textbook? That's Leibniz, not Newton.", genius: 'Gottfried Leibniz' } },
  { type: 'story', data: { headline: "Curie's Two Nobel Prizes", body: "Marie Curie remains the only person to win Nobel Prizes in two different sciences — Physics (1903) and Chemistry (1911). The committee initially tried to leave her name off the Physics prize. Her husband Pierre insisted she be included.", genius: 'Marie Curie' } },
  { type: 'story', data: { headline: 'Tesla Predicted the Smartphone', body: "In 1926, Tesla told a journalist: 'When wireless is perfectly applied, the whole earth will be converted into a huge brain... We shall be able to communicate with one another instantly, irrespective of distance.' He described a device that would fit in a vest pocket.", genius: 'Nikola Tesla' } },
  { type: 'story', data: { headline: 'Euclid Told a King There Is No Royal Road', body: "When King Ptolemy asked if there was a shortcut to learning geometry, Euclid replied: 'There is no royal road to geometry.' The phrase has endured for 2,300 years — a reminder that mastery demands effort, no matter your status.", genius: 'Aristotle' } },
  { type: 'story', data: { headline: 'Mill Had a Breakdown at 20', body: "After his intense childhood education, Mill experienced a severe mental crisis at age 20. He found recovery through poetry — particularly Wordsworth. He later argued that emotions and beauty are as essential as logic. His breakdown made his philosophy more human.", genius: 'John Stuart Mill' } },
];

// ── Word Origins / Connections ───────────────────────────────────────────

export const connections: FeedItem[] = [
  // Original 10
  { type: 'connection', data: { term: 'Philosophy', origin: 'φιλοσοφία (philosophia)', meaning: 'Love of wisdom', modern: "From philos (love) + sophia (wisdom). Every time you say philosophy you are speaking Ancient Greek." } },
  { type: 'connection', data: { term: 'Calculus', origin: 'Latin: calculus', meaning: 'Small pebble', modern: "Romans counted with pebbles. Newton and Leibniz named the mathematics of change after them." } },
  { type: 'connection', data: { term: 'Atom', origin: 'ἄτομος (atomos)', meaning: 'Uncuttable', modern: "The Greeks imagined the smallest possible particle. We kept the name — even after we split it." } },
  { type: 'connection', data: { term: 'Democracy', origin: 'δημοκρατία', meaning: 'Power of the people', modern: "From demos (people) + kratos (power). The Athenians invented both the word and the system." } },
  { type: 'connection', data: { term: 'Electricity', origin: 'ἤλεκτρον (elektron)', meaning: 'Amber', modern: "The Greeks noticed that rubbed amber attracted feathers. 2,400 years later, Tesla harnessed the same force to light cities." } },
  { type: 'connection', data: { term: 'Gravity', origin: 'Latin: gravitas', meaning: 'Weight, seriousness', modern: "The same root gives us grave, gravity, and gravitas. Newton formalised the concept; the Romans named it." } },
  { type: 'connection', data: { term: 'Eureka', origin: 'εὕρηκα (heurēka)', meaning: 'I have found it', modern: "Archimedes shouted it in his bath when he discovered displacement. Scientists have been having bath-time epiphanies ever since." } },
  { type: 'connection', data: { term: 'Logarithm', origin: 'λόγος + ἀριθμός', meaning: 'Ratio number', modern: "From logos (ratio) + arithmos (number). Napier coined the term in 1614, but the Greek roots go back millennia." } },
  { type: 'connection', data: { term: 'Hypothesis', origin: 'ὑπόθεσις (hypothesis)', meaning: 'A placing under', modern: "From hypo (under) + thesis (placing). A foundation you place under your argument — to be tested, not assumed." } },
  { type: 'connection', data: { term: 'Energy', origin: 'ἐνέργεια (energeia)', meaning: 'Activity, operation', modern: "Aristotle coined it to mean 'being at work.' Modern physics kept the word but transformed the concept entirely." } },

  // ── NEW word origins ──────────────────────────────────────────────────
  { type: 'connection', data: { term: 'Algebra', origin: 'Arabic: al-jabr', meaning: 'The reunion of broken parts', modern: "From al-Khwarizmi's 9th-century book. 'Al-jabr' meant restoring broken parts of an equation — balancing both sides." } },
  { type: 'connection', data: { term: 'Geometry', origin: 'γεωμετρία (geometria)', meaning: 'Earth measurement', modern: "From geo (earth) + metron (measure). The Egyptians invented it to resurvey fields after the Nile flooded each year." } },
  { type: 'connection', data: { term: 'Algorithm', origin: 'al-Khwārizmī', meaning: 'From the mathematician\'s name', modern: "Named after the Persian mathematician al-Khwārizmī (c. 780–850). His name referred to his birthplace, Khwarezm. Every app on your phone runs on his legacy." } },
  { type: 'connection', data: { term: 'Muscle', origin: 'Latin: musculus', meaning: 'Little mouse', modern: "Romans thought a flexing bicep looked like a mouse running under the skin. The same root gives us 'mussel' — the shellfish resembles a little mouse too." } },
  { type: 'connection', data: { term: 'Capital', origin: 'Latin: caput', meaning: 'Head', modern: "Caput (head) gave us capital (head city), captain (head person), chapter (head of a section), and even cattle (head of livestock, counted per head)." } },
  { type: 'connection', data: { term: 'Disaster', origin: 'Latin: dis + astrum', meaning: 'Bad star', modern: "The ancients believed catastrophes were caused by unfavourable star alignments. Dis (bad) + astrum (star). We still say things are 'star-crossed.'" } },
  { type: 'connection', data: { term: 'Trivial', origin: 'Latin: trivium', meaning: 'Three roads / crossroads', modern: "A trivium was where three roads met — a public place for common talk. Things discussed at crossroads were considered unimportant: trivial." } },
  { type: 'connection', data: { term: 'Salary', origin: 'Latin: salarium', meaning: 'Salt money', modern: "Roman soldiers were sometimes paid in salt — or given money to buy it. Salt was so valuable it was literally worth its weight in gold. Hence 'worth his salt.'" } },
  { type: 'connection', data: { term: 'Gymnasium', origin: 'γυμνάσιον (gymnasion)', meaning: 'Place to exercise naked', modern: "From gymnos (naked). Greeks exercised without clothes. The word survived; the dress code, thankfully, did not." } },
  { type: 'connection', data: { term: 'School', origin: 'σχολή (scholē)', meaning: 'Leisure', modern: "The Greeks believed true learning happened in leisure time, not labour. School originally meant 'free time for thinking.' The irony is not lost on students." } },
  { type: 'connection', data: { term: 'Sincere', origin: 'Latin: sine cera', meaning: 'Without wax', modern: "Roman sculptors allegedly filled cracks in marble with wax. Honest sellers advertised their work as sine cera — without wax. A flawless piece. Genuine." } },
  { type: 'connection', data: { term: 'Companion', origin: 'Latin: com + panis', meaning: 'With bread', modern: "A companion is literally someone you share bread with. The French compagnon and Spanish compañero carry the same meaning. Breaking bread = making friends." } },
  { type: 'connection', data: { term: 'Planet', origin: 'πλανήτης (planētēs)', meaning: 'Wanderer', modern: "The Greeks noticed some 'stars' moved across the sky while others stayed fixed. They called the movers 'wanderers.' We still do." } },
  { type: 'connection', data: { term: 'Virus', origin: 'Latin: virus', meaning: 'Poison, slimy liquid', modern: "The Romans used it for any noxious substance. In 1898, Martinus Beijerinck applied it to infectious agents smaller than bacteria. The digital sense came in the 1970s." } },
  { type: 'connection', data: { term: 'Mathematics', origin: 'μάθημα (mathēma)', meaning: 'That which is learned', modern: "From manthanein (to learn). For the Greeks, mathematics wasn't a subject — it was the act of learning itself. The ultimate discipline of the mind." } },
  { type: 'connection', data: { term: 'Doctor', origin: 'Latin: docēre', meaning: 'To teach', modern: "A doctor was originally a teacher — someone who had learned enough to instruct others. The medical meaning came later. PhD holders preserve the original sense." } },
  { type: 'connection', data: { term: 'Candidate', origin: 'Latin: candidatus', meaning: 'Clothed in white', modern: "Roman politicians seeking office wore bright white togas (candidus = white) to symbolise purity. The whiter the toga, the more trustworthy the candidate. Allegedly." } },
  { type: 'connection', data: { term: 'Alphabet', origin: 'ἄλφα + βῆτα', meaning: 'Alpha + Beta', modern: "The first two letters of the Greek alphabet gave us the word itself. Alpha came from the Phoenician 'aleph' (ox) and beta from 'beth' (house)." } },
  { type: 'connection', data: { term: 'Logic', origin: 'λογική (logikē)', meaning: 'Of reason', modern: "From logos (word, reason). Aristotle formalised logic as a discipline — the art of correct reasoning. Every argument you construct uses his framework." } },
  { type: 'connection', data: { term: 'Lunatic', origin: 'Latin: lunaticus', meaning: 'Moon-struck', modern: "The Romans believed the full moon could cause madness. Luna (moon) gave us lunatic, lunar, and even lune (a crescent shape in geometry)." } },
  { type: 'connection', data: { term: 'Nostalgia', origin: 'νόστος + ἄλγος', meaning: 'Homecoming pain', modern: "From nostos (return home) + algos (pain). Coined in 1688 by a Swiss doctor to describe soldiers' homesickness. Odysseus's entire journey is a nostos." } },
  { type: 'connection', data: { term: 'Pencil', origin: 'Latin: penicillus', meaning: 'Little tail', modern: "Penicillus meant a small brush (literally 'little tail'). The same root gives us penicillin — Fleming named his mould-derived medicine after the brush-like shape of the mould." } },
  { type: 'connection', data: { term: 'Horizon', origin: 'ὁρίζων (horizōn)', meaning: 'Bounding, limiting', modern: "From horizein (to bound). The horizon is the boundary of your vision — where earth and sky appear to meet. It literally defines the limit of your world." } },
  { type: 'connection', data: { term: 'Decimal', origin: 'Latin: decimus', meaning: 'Tenth', modern: "From decem (ten). The decimal system is base-10 because humans have 10 fingers. The Latin root also gives us decade, December (originally the 10th month), and decimate (kill one in ten)." } },
  { type: 'connection', data: { term: 'Radius', origin: 'Latin: radius', meaning: 'Ray, spoke of a wheel', modern: "A radius was a spoke — a line from the centre of a wheel to its edge. Mathematicians adopted it for circles. The same root gives us 'radio' (sending rays of sound)." } },
];

// ── Excerpts ────────────────────────────────────────────────────────────

export const excerpts: FeedItem[] = [
  { type: 'excerpt', data: { text: "The liberty of the individual must be thus far limited; he must not make himself a nuisance to other people.", workTitle: 'On Liberty', author: 'John Stuart Mill', year: 1859, url: 'https://www.amazon.com/dp/0140432078' } },
  { type: 'excerpt', data: { text: "It is better to be a human being dissatisfied than a pig satisfied; better to be Socrates dissatisfied than a fool satisfied.", workTitle: 'Utilitarianism', author: 'John Stuart Mill', year: 1863, url: 'https://www.amazon.com/dp/019875163X' } },
  { type: 'excerpt', data: { text: "I do not know what I may appear to the world, but to myself I seem to have been only like a boy playing on the sea-shore, and diverting myself in now and then finding a smoother pebble or a prettier shell than ordinary, whilst the great ocean of truth lay all undiscovered before me.", workTitle: 'Principia Mathematica', author: 'Isaac Newton', year: 1687, url: 'https://www.amazon.com/dp/0520290747' } },
  { type: 'excerpt', data: { text: "Every body continues in its state of rest, or of uniform motion in a right line, unless it is compelled to change that state by forces impressed upon it.", workTitle: 'Principia Mathematica', author: 'Isaac Newton', year: 1687, url: 'https://www.amazon.com/dp/0520290747' } },
  { type: 'excerpt', data: { text: "Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.", workTitle: 'Relativity: The Special and General Theory', author: 'Albert Einstein', year: 1916, url: 'https://www.amazon.com/dp/048641714X' } },
  { type: 'excerpt', data: { text: "The most incomprehensible thing about the world is that it is comprehensible.", workTitle: 'The Evolution of Physics', author: 'Albert Einstein', year: 1938, url: 'https://www.amazon.com/dp/0671201565' } },
  { type: 'excerpt', data: { text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", workTitle: 'The Evolution of Physics', author: 'Albert Einstein', year: 1938, url: 'https://www.amazon.com/dp/0671201565' } },
  { type: 'excerpt', data: { text: "Man is but a reed, the most feeble thing in nature; but he is a thinking reed.", workTitle: 'Pensées', author: 'Blaise Pascal', year: 1670, url: 'https://www.amazon.com/dp/0140446451' } },
  { type: 'excerpt', data: { text: "The eternal silence of these infinite spaces frightens me.", workTitle: 'Pensées', author: 'Blaise Pascal', year: 1670, url: 'https://www.amazon.com/dp/0140446451' } },
  { type: 'excerpt', data: { text: "We are so accustomed to disguise ourselves to others, that in the end we become disguised to ourselves.", workTitle: 'Pensées', author: 'Blaise Pascal', year: 1670, url: 'https://www.amazon.com/dp/0140446451' } },
  { type: 'excerpt', data: { text: "The unexamined life is not worth living.", workTitle: 'Nicomachean Ethics', author: 'Aristotle', year: '-350', url: 'https://www.amazon.com/dp/0199213615' } },
  { type: 'excerpt', data: { text: "Happiness depends upon ourselves. It is not something ready-made; it comes from your own actions.", workTitle: 'Nicomachean Ethics', author: 'Aristotle', year: '-350', url: 'https://www.amazon.com/dp/0199213615' } },
  { type: 'excerpt', data: { text: "Man is by nature a political animal.", workTitle: 'Politics', author: 'Aristotle', year: '-350', url: 'https://www.amazon.com/dp/0199538735' } },
  { type: 'excerpt', data: { text: "The instinct of nearly all societies is to lock up anybody who is truly free. First, society begins by trying to beat you up. If this fails, they try to poison you. If this fails too, they finish by loading honours on your head.", workTitle: 'My Inventions', author: 'Nikola Tesla', year: 1919, url: 'https://www.amazon.com/dp/0910077002' } },
  { type: 'excerpt', data: { text: "I do not think there is any thrill that can go through the human heart like that felt by the inventor as he sees some creation of the brain unfolding to success.", workTitle: 'My Inventions', author: 'Nikola Tesla', year: 1919, url: 'https://www.amazon.com/dp/0910077002' } },
  { type: 'excerpt', data: { text: "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.", workTitle: 'Pierre Curie: With Autobiographical Notes', author: 'Marie Curie', year: 1923, url: 'https://www.amazon.com/dp/0486201996' } },
  { type: 'excerpt', data: { text: "Study painting and you study anatomy, optics, geometry, and history.", workTitle: 'The Notebooks of Leonardo da Vinci', author: 'Leonardo da Vinci', year: '1478-1519', url: 'https://www.amazon.com/dp/0486225720' } },
  { type: 'excerpt', data: { text: "I have been impressed with the urgency of doing. Knowing is not enough; we must apply. Being willing is not enough; we must do.", workTitle: 'Faust: Part One', author: 'Johann Wolfgang von Goethe', year: 1808, url: 'https://www.amazon.com/dp/0140449019' } },
  { type: 'excerpt', data: { text: "Whatever you can do, or dream you can, begin it. Boldness has genius, power, and magic in it.", workTitle: 'Faust: Part One', author: 'Johann Wolfgang von Goethe', year: 1808, url: 'https://www.amazon.com/dp/0140449019' } },
  { type: 'excerpt', data: { text: "This is the best of all possible worlds.", workTitle: 'Monadology', author: 'Gottfried Leibniz', year: 1714, url: 'https://www.amazon.com/dp/0822602105' } },
];

// ── Feed-specific quiz questions (easy math, Latin, general) ────────────

export const feedQuizQuestions: FeedItem[] = [
  // ── Easy Math ─────────────────────────────────────────────────────────
  { type: 'quiz', data: { id: 'fq-math-1', question: 'What is 7 × 8?', options: ['54', '56', '58', '64'], correctAnswer: 1, explanation: '7 × 8 = 56. A classic multiplication fact.', clue: 'Multiplication is repeated addition.' } },
  { type: 'quiz', data: { id: 'fq-math-2', question: 'What is 144 ÷ 12?', options: ['10', '11', '12', '14'], correctAnswer: 2, explanation: '144 ÷ 12 = 12. 144 is 12 squared.', clue: '12 × 12 = ?' } },
  { type: 'quiz', data: { id: 'fq-math-3', question: 'What is 15% of 200?', options: ['15', '25', '30', '35'], correctAnswer: 2, explanation: '15% of 200 = 0.15 × 200 = 30.', clue: '10% of 200 is 20. Add half of that.' } },
  { type: 'quiz', data: { id: 'fq-math-4', question: 'What is the square root of 81?', options: ['7', '8', '9', '10'], correctAnswer: 2, explanation: '√81 = 9, because 9 × 9 = 81.', clue: 'Which number multiplied by itself gives 81?' } },
  { type: 'quiz', data: { id: 'fq-math-5', question: 'What is 3² + 4²?', options: ['20', '24', '25', '49'], correctAnswer: 2, explanation: '3² + 4² = 9 + 16 = 25. This is the famous 3-4-5 Pythagorean triple.', clue: 'Think of a right triangle with sides 3, 4, and 5.' } },
  { type: 'quiz', data: { id: 'fq-math-6', question: 'How many degrees are in a triangle?', options: ['90°', '180°', '270°', '360°'], correctAnswer: 1, explanation: 'The interior angles of any triangle always sum to 180°.', clue: 'Euclid proved this in the Elements, Book I.' } },
  { type: 'quiz', data: { id: 'fq-math-7', question: 'What is 2 to the power of 10?', options: ['512', '1000', '1024', '2048'], correctAnswer: 2, explanation: '2¹⁰ = 1024. This is why 1 KB ≈ 1024 bytes.', clue: 'Double 2 ten times: 2, 4, 8, 16, 32...' } },
  { type: 'quiz', data: { id: 'fq-math-8', question: 'What is 1/4 + 1/2?', options: ['1/6', '2/4', '3/4', '1/3'], correctAnswer: 2, explanation: '1/4 + 1/2 = 1/4 + 2/4 = 3/4.', clue: 'Convert to the same denominator first.' } },
  { type: 'quiz', data: { id: 'fq-math-9', question: 'What is the next prime number after 7?', options: ['8', '9', '10', '11'], correctAnswer: 3, explanation: '11 is the next prime after 7. 8, 9, and 10 are all composite.', clue: 'A prime has exactly two factors: 1 and itself.' } },
  { type: 'quiz', data: { id: 'fq-math-10', question: 'How many sides does a hexagon have?', options: ['5', '6', '7', '8'], correctAnswer: 1, explanation: 'A hexagon has 6 sides. From the Greek hex (six).', clue: 'The prefix "hex-" means six in Greek.' } },
  { type: 'quiz', data: { id: 'fq-math-11', question: 'What is 0.5 × 0.5?', options: ['0.1', '0.25', '0.5', '1.0'], correctAnswer: 1, explanation: '0.5 × 0.5 = 0.25. Half of a half is a quarter.', clue: 'Half times half equals...' } },
  { type: 'quiz', data: { id: 'fq-math-12', question: 'What is the value of π (pi) rounded to two decimal places?', options: ['3.12', '3.14', '3.16', '3.18'], correctAnswer: 1, explanation: 'π ≈ 3.14159... rounded to two decimal places is 3.14.', clue: 'The ratio of a circle\'s circumference to its diameter.' } },
  { type: 'quiz', data: { id: 'fq-math-13', question: 'What is 25% expressed as a fraction?', options: ['1/3', '1/4', '1/5', '2/5'], correctAnswer: 1, explanation: '25% = 25/100 = 1/4.', clue: 'Per cent means "per hundred."' } },
  { type: 'quiz', data: { id: 'fq-math-14', question: 'If a rectangle is 5cm by 3cm, what is its area?', options: ['8 cm²', '15 cm²', '16 cm²', '30 cm²'], correctAnswer: 1, explanation: 'Area = length × width = 5 × 3 = 15 cm².', clue: 'Area of a rectangle = length × width.' } },
  { type: 'quiz', data: { id: 'fq-math-15', question: 'What is the Roman numeral for 50?', options: ['C', 'D', 'L', 'X'], correctAnswer: 2, explanation: 'L = 50 in Roman numerals. C = 100, D = 500, X = 10.', clue: 'I=1, V=5, X=10, L=?, C=100.' } },
  { type: 'quiz', data: { id: 'fq-math-16', question: 'What number does the Roman numeral XIV represent?', options: ['4', '11', '14', '16'], correctAnswer: 2, explanation: 'XIV = 10 + (5-1) = 14. IV means 4 (one before five).', clue: 'X=10, I before V means subtract.' } },
  { type: 'quiz', data: { id: 'fq-math-17', question: 'What is the sum of the first 5 natural numbers (1+2+3+4+5)?', options: ['10', '12', '15', '20'], correctAnswer: 2, explanation: '1+2+3+4+5 = 15. Gauss famously solved this type of problem as a child.', clue: 'Pair the numbers: 1+5=6, 2+4=6, plus 3.' } },
  { type: 'quiz', data: { id: 'fq-math-18', question: 'What is 10! (10 factorial) divided by 9!?', options: ['1', '9', '10', '90'], correctAnswer: 2, explanation: '10! / 9! = 10. Factorial division simplifies: n! / (n-1)! = n.', clue: '10! = 10 × 9!, so the 9! cancels out.' } },

  // ── Easy Latin ────────────────────────────────────────────────────────
  { type: 'quiz', data: { id: 'fq-latin-1', question: 'What does "aqua" mean in Latin?', options: ['Fire', 'Earth', 'Water', 'Air'], correctAnswer: 2, explanation: 'Aqua = water. It gives us aquatic, aquarium, and aqueduct.', clue: 'Think of aquarium — a tank for water creatures.' } },
  { type: 'quiz', data: { id: 'fq-latin-2', question: 'What does "et" mean in Latin?', options: ['Or', 'But', 'And', 'Not'], correctAnswer: 2, explanation: '"Et" means "and." The ampersand symbol (&) is a ligature of the letters E and T.', clue: 'The symbol & is literally E+T joined together.' } },
  { type: 'quiz', data: { id: 'fq-latin-3', question: 'What does "veni, vidi, vici" mean?', options: ['Live, laugh, love', 'I came, I saw, I conquered', 'Truth, justice, honour', 'Mind, body, soul'], correctAnswer: 1, explanation: 'Julius Caesar\'s famous declaration after a swift victory: "I came, I saw, I conquered."', clue: 'Caesar said this after defeating Pharnaces in just five days.' } },
  { type: 'quiz', data: { id: 'fq-latin-4', question: 'What does "terra" mean in Latin?', options: ['Star', 'Sky', 'Earth', 'Sea'], correctAnswer: 2, explanation: 'Terra = earth/land. It gives us terrain, territory, terrace, and Mediterranean (middle of the earth).', clue: 'Terra firma = solid ground.' } },
  { type: 'quiz', data: { id: 'fq-latin-5', question: 'What is the Latin word for "book"?', options: ['Liber', 'Lectus', 'Lapis', 'Lupus'], correctAnswer: 0, explanation: 'Liber = book. It gives us library, libretto, and liberal (education through books).', clue: 'Where do you borrow books? A _____ary.' } },
  { type: 'quiz', data: { id: 'fq-latin-6', question: 'What does "carpe diem" mean?', options: ['Beware the dog', 'Seize the day', 'Love conquers all', 'Know thyself'], correctAnswer: 1, explanation: '"Carpe diem" from Horace\'s Odes means "seize the day" — make the most of the present.', clue: 'Horace urged living in the moment.' } },
  { type: 'quiz', data: { id: 'fq-latin-7', question: 'What does "luna" mean in Latin?', options: ['Sun', 'Moon', 'Star', 'Light'], correctAnswer: 1, explanation: 'Luna = moon. It gives us lunar, lunatic (moon-struck), and lunate (crescent-shaped).', clue: 'A ___ eclipse happens when Earth blocks sunlight to the moon.' } },
  { type: 'quiz', data: { id: 'fq-latin-8', question: 'What does "magnus" mean in Latin?', options: ['Small', 'Great', 'Strong', 'Wise'], correctAnswer: 1, explanation: 'Magnus = great/large. Alexander "the Great" = Alexander Magnus. Also: magnify, magnificent, magnitude.', clue: 'To magnify is to make something appear ___.' } },
  { type: 'quiz', data: { id: 'fq-latin-9', question: 'What does the Latin prefix "sub-" mean?', options: ['Above', 'Below', 'Around', 'Through'], correctAnswer: 1, explanation: 'Sub = under/below. Submarine (under the sea), subway (under the way), subtract (draw from below).', clue: 'A submarine goes _____ the water.' } },
  { type: 'quiz', data: { id: 'fq-latin-10', question: 'What does "anno Domini" (A.D.) literally mean?', options: ['After death', 'Ancient date', 'In the year of the Lord', 'At the dawn'], correctAnswer: 2, explanation: '"Anno Domini" = "In the year of the Lord." A common misconception is that A.D. means "after death."', clue: 'Anno = year, Domini = of the Lord.' } },
  { type: 'quiz', data: { id: 'fq-latin-11', question: 'Which Latin word means "star"?', options: ['Sol', 'Stella', 'Silva', 'Saxum'], correctAnswer: 1, explanation: 'Stella = star. It gives us stellar, constellation (group of stars), and the name Stella itself.', clue: 'A con____ation is a pattern of stars.' } },
  { type: 'quiz', data: { id: 'fq-latin-12', question: 'What does "e pluribus unum" mean?', options: ['In God we trust', 'Out of many, one', 'Liberty and justice', 'We the people'], correctAnswer: 1, explanation: '"E pluribus unum" = "Out of many, one." The original motto of the United States.', clue: 'It\'s on every US coin and refers to the states forming one nation.' } },
  { type: 'quiz', data: { id: 'fq-latin-13', question: 'What does "video" literally mean in Latin?', options: ['I watch', 'I see', 'I show', 'I play'], correctAnswer: 1, explanation: '"Video" is the first person singular of vidēre: "I see." We use it for things we watch — but the Latin is about seeing.', clue: 'The Latin verb vidēre means "to see."' } },
  { type: 'quiz', data: { id: 'fq-latin-14', question: 'What does "bonus" mean in Latin?', options: ['Extra', 'Good', 'Big', 'Free'], correctAnswer: 1, explanation: 'Bonus = good. In English, a bonus is something extra/good. The feminine form "bona" gives us "bona fide" (in good faith).', clue: 'Bona fide means in ___ faith.' } },

  // ── Easy Greek / General Knowledge ────────────────────────────────────
  { type: 'quiz', data: { id: 'fq-greek-1', question: 'What is the first letter of the Greek alphabet?', options: ['Beta', 'Gamma', 'Alpha', 'Delta'], correctAnswer: 2, explanation: 'Alpha (Α, α) is the first letter. It comes from the Phoenician "aleph" meaning ox.', clue: 'The ___bet is named after the first two Greek letters.' } },
  { type: 'quiz', data: { id: 'fq-greek-2', question: 'What does "micro" mean in Greek?', options: ['Large', 'Small', 'Many', 'Few'], correctAnswer: 1, explanation: 'Mikros (μικρός) = small. Microscope = small + see. Microphone = small + sound.', clue: 'A ___scope helps you see very small things.' } },
  { type: 'quiz', data: { id: 'fq-greek-3', question: 'In Greek mythology, who is the king of the gods?', options: ['Poseidon', 'Hades', 'Apollo', 'Zeus'], correctAnswer: 3, explanation: 'Zeus is the king of the Olympian gods, ruler of the sky and thunder.', clue: 'He wields lightning bolts from Mount Olympus.' } },
  { type: 'quiz', data: { id: 'fq-greek-4', question: 'What does "auto" mean in Greek?', options: ['Fast', 'Self', 'New', 'Other'], correctAnswer: 1, explanation: 'Auto (αὐτός) = self. Automobile = self-moving. Autobiography = self-life-writing. Autonomous = self-governing.', clue: 'An auto___graphy is a book you write about your___.' } },
  { type: 'quiz', data: { id: 'fq-greek-5', question: 'How many letters are in the Greek alphabet?', options: ['22', '24', '26', '28'], correctAnswer: 1, explanation: 'The Greek alphabet has 24 letters, from Alpha to Omega.', clue: '"From Alpha to Omega" means from beginning to end.' } },
  { type: 'quiz', data: { id: 'fq-greek-6', question: 'What does "poly" mean in Greek?', options: ['One', 'Two', 'Many', 'All'], correctAnswer: 2, explanation: 'Poly (πολύ) = many. Polygon = many angles. Polyglot = many tongues/languages. Polychrome = many colours.', clue: 'A ___gon has many sides and angles.' } },
  { type: 'quiz', data: { id: 'fq-greek-7', question: 'What is the Greek word for "love" used in philosophy?', options: ['Eros', 'Agape', 'Philia', 'Philos'], correctAnswer: 3, explanation: 'Philos (φίλος) = loving/dear. It\'s in philosophy (love of wisdom), philanthropy (love of humanity), and Philadelphia (city of brotherly love).', clue: '___osophy = love of wisdom.' } },

  // ── History of Science ────────────────────────────────────────────────
  { type: 'quiz', data: { id: 'fq-sci-1', question: 'Who is considered the "father of geometry"?', options: ['Pythagoras', 'Archimedes', 'Euclid', 'Aristotle'], correctAnswer: 2, explanation: 'Euclid wrote "The Elements" around 300 BC — the most influential mathematics textbook ever written, used for over 2,000 years.', clue: 'His textbook "The Elements" was used until the 20th century.' } },
  { type: 'quiz', data: { id: 'fq-sci-2', question: 'What force did Newton describe with falling apples?', options: ['Magnetism', 'Friction', 'Gravity', 'Electricity'], correctAnswer: 2, explanation: 'Newton\'s law of universal gravitation describes how all objects attract each other. The apple story (likely embellished) illustrates this.', clue: 'What goes up must come down.' } },
  { type: 'quiz', data: { id: 'fq-sci-3', question: 'What element did Marie Curie discover?', options: ['Uranium', 'Radium', 'Plutonium', 'Hydrogen'], correctAnswer: 1, explanation: 'Marie Curie discovered both polonium (named after Poland) and radium (named for its radioactivity) in 1898.', clue: 'She named one element after her homeland, and the other after its glow.' } },
  { type: 'quiz', data: { id: 'fq-sci-4', question: 'What is Einstein\'s famous equation?', options: ['F = ma', 'E = mc²', 'a² + b² = c²', 'PV = nRT'], correctAnswer: 1, explanation: 'E = mc². Energy equals mass times the speed of light squared. It shows mass and energy are interchangeable.', clue: 'Energy, mass, and the speed of light squared.' } },
];

// ── Why Study items ─────────────────────────────────────────────────────

export const whyStudyItems: FeedItem[] = pathModules.slice(0, 8).map(m => ({
  type: 'whyStudy' as const,
  data: { subject: m.name, text: m.whyStudy || m.introText || '', icon: m.icon },
}));

// ── Quiz clues ──────────────────────────────────────────────────────────

export const quizClues: Record<string, string> = {
  'mill-greek': '"By age 3, Mill was reading Aesop\'s Fables in the original Greek..." — from his Autobiography',
  'mill-latin': '"I learnt Latin... at the same time with a considerable number of Greek authors." — Mill, Autobiography',
  'mill-logic': '"The purpose of logic is to show us the way to truth." — Mill on Aristotle\'s system',
  'euclid': '"A point is that which has no part. A line is breadthless length." — Euclid, Elements, Book I',
  'newton': '"Every body continues in its state of rest unless compelled to change..." — Newton, Principia',
  'einstein': '"The most incomprehensible thing about the world is that it is comprehensible." — Einstein',
  'tesla': '"I do not think there is any thrill like that felt by the inventor..." — Tesla, My Inventions',
  'curie': '"Nothing in life is to be feared, it is only to be understood." — Marie Curie',
  'davinci': '"Study painting and you study anatomy, optics, geometry, and history." — Da Vinci, Notebooks',
  'pascal': '"Man is but a reed, the most feeble thing in nature; but he is a thinking reed." — Pascal, Pensées',
  'leibniz': '"Music is the pleasure the human mind experiences from counting without being aware." — Leibniz',
  'aristotle': '"The unexamined life is not worth living." — derived from Aristotle',
  'goethe': '"Whatever you can do, or dream you can, begin it." — attributed to Goethe',
};

export function getClueForQuiz(lessonId: string): string | undefined {
  for (const [key, clue] of Object.entries(quizClues)) {
    if (lessonId.toLowerCase().includes(key)) return clue;
  }
  return undefined;
}

// Background gradients per card type
export const cardGradients: Record<string, string> = {
  quote: 'from-[hsl(217,30%,12%)] to-[hsl(217,30%,20%)]',
  insight: 'from-[hsl(40,33%,90%)] to-[hsl(40,25%,85%)]',
  story: 'from-[hsl(345,30%,15%)] to-[hsl(345,20%,22%)]',
  connection: 'from-[hsl(43,40%,18%)] to-[hsl(43,30%,12%)]',
  whyStudy: 'from-[hsl(152,30%,14%)] to-[hsl(152,20%,20%)]',
  excerpt: 'from-[hsl(259,25%,14%)] to-[hsl(259,20%,22%)]',
  quiz: 'from-[hsl(40,33%,92%)] to-[hsl(40,25%,88%)]',
};

export const darkTypes = new Set(['quote', 'story', 'connection', 'whyStudy', 'excerpt']);
