import { useState, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { lessonQuizzes, QuizQuestion } from '@/data/quizzes';
import { Brain, Quote, Lightbulb, BookOpen, Sparkles, CheckCircle, XCircle, ArrowRight, ChevronUp, GraduationCap, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { geniuses } from '@/data/geniuses';
import { pathModules } from '@/data/pathCurriculum';

// ── Feed item types ──────────────────────────────────────────────────────

type FeedItem =
  | { type: 'quote'; data: { text: string; author: string; field: string } }
  | { type: 'insight'; data: { title: string; body: string; category: string; icon: string } }
  | { type: 'story'; data: { headline: string; body: string; genius: string } }
  | { type: 'connection'; data: { term: string; origin: string; meaning: string; modern: string } }
  | { type: 'whyStudy'; data: { subject: string; text: string; icon: string } }
  | { type: 'quiz'; data: QuizQuestion };

// ── Content pools ────────────────────────────────────────────────────────

const quotes: FeedItem[] = geniuses.map(g => ({
  type: 'quote' as const,
  data: { text: g.famousQuote, author: g.name, field: g.field },
}));

const insights: FeedItem[] = [
  { type: 'insight', data: { title: 'The Interruption Method', body: "Mill's father never said \"look it up.\" When young John encountered an unknown Greek word, he asked immediately. This constant interruption forced active engagement — the vocabulary stuck because it was tied to the frustration and relief of a real reading moment, not an abstract flashcard.", category: 'Learning', icon: '🧠' } },
  { type: 'insight', data: { title: 'Why Euclid Still Matters', body: "Einstein kept a copy of Euclid's Elements on his desk his entire life. He called it his \"holy little geometry book.\" The reason? Euclid doesn't just teach geometry — he teaches you how to think from first principles. Every proof builds on the last, like a chain of certainty.", category: 'Mathematics', icon: '📐' } },
  { type: 'insight', data: { title: 'The Power of Back-Translation', body: "Mill would translate a passage from Greek to English, set it aside for a week, then translate his English back into Greek — and compare it to the original. The gaps revealed what he truly understood versus what he merely recognised. This technique works for any language.", category: 'Languages', icon: '🌍' } },
  { type: 'insight', data: { title: "Tesla's Mental Workshop", body: "Tesla didn't sketch prototypes. He built complete machines in his imagination, let them run for weeks, then checked for wear on the imaginary parts. When he finally built the real thing, it worked on the first try. He called this mental engineering.", category: 'Engineering', icon: '⚡' } },
  { type: 'insight', data: { title: "Newton's Plague Year", body: "When Cambridge closed for plague in 1665, 23-year-old Newton went home and had the most productive 18 months in scientific history. He developed calculus, the theory of colour, and began work on gravity \u2014 all while the world was locked down.", category: 'Physics', icon: '🍎' } },
  { type: 'insight', data: { title: "Curie's Glowing Notebooks", body: "Marie Curie's personal notebooks from the 1890s are still so radioactive that they are kept in lead-lined boxes at the Bibliotheque nationale de France. To read them, you must sign a liability waiver and wear protective clothing.", category: 'Science', icon: '☢️' } },
  { type: 'insight', data: { title: 'The Trivium & Quadrivium', body: "The classical education model has three stages: Grammar (learning facts), Logic (connecting ideas), and Rhetoric (expressing wisdom). Then four mathematical arts: Arithmetic, Geometry, Music, and Astronomy. This 1,500-year-old framework is the backbone of this curriculum.", category: 'Education', icon: '🏛️' } },
  { type: 'insight', data: { title: "Leonardo's Mirror Writing", body: "Da Vinci wrote over 7,000 pages of notes \u2014 all backwards, readable only in a mirror. Theories range from secrecy to left-handedness to simply avoiding smudging ink. Whatever the reason, his notebooks remain one of history's greatest records of curiosity.", category: 'Art', icon: '🪞' } },
  { type: 'insight', data: { title: "Pascal's Wager", body: "At 19, Pascal built the first mechanical calculator for his tax-collector father. But his most famous argument is philosophical: if God exists and you believe, you gain everything. If God doesn't exist and you believe, you lose nothing. Therefore, belief is the rational bet. Agree or not, the logic is fascinating.", category: 'Philosophy', icon: '🎲' } },
  { type: 'insight', data: { title: 'Binary: From Leibniz to Your Phone', body: "Leibniz invented binary (0 and 1) in 1703, inspired by the Chinese I Ching. He saw it as proof of divine creation \u2014 something from nothing. Three centuries later, every computer on Earth runs on his system. He had no idea.", category: 'Computing', icon: '💻' } },
  { type: 'insight', data: { title: "Goethe's Colour Theory", body: "Goethe challenged Newton's optics \u2014 and was mostly wrong scientifically. But his insights about how humans perceive colour were revolutionary. His colour wheel influenced painters, and modern psychology confirms many of his observations about the emotional effects of colour.", category: 'Science', icon: '🎨' } },
  { type: 'insight', data: { title: 'Aristotle Walked While Teaching', body: "Aristotle's school was called the Peripatetic school \u2014 from the Greek peripatetikos meaning walking about. He gave lectures while strolling through the Lyceum's covered walkways. Modern research confirms: walking genuinely improves creative thinking.", category: 'Philosophy', icon: '🚶' } },
];

const stories: FeedItem[] = [
  { type: 'story', data: { headline: 'The Boy Who Read Greek at Three', body: "James Mill decided his son would receive the greatest education in history. By age 3, John Stuart Mill was reading Aesop's Fables in the original Greek. By 8, he had read all of Herodotus. By 12, he had mastered formal logic. By 14, he had completed a university-level education. He later said his father's method proved that ordinary children could achieve extraordinary things with the right approach.", genius: 'John Stuart Mill' } },
  { type: 'story', data: { headline: 'Einstein Failed No Exams', body: "The myth that Einstein failed maths is entirely false. He scored top marks in mathematics and physics throughout school. What he did struggle with was the rigid, authoritarian style of German education. He called it mechanical drilling that killed curiosity. His theory of relativity came from years of daydreaming about what it would be like to ride a beam of light.", genius: 'Albert Einstein' } },
  { type: 'story', data: { headline: 'The War of the Currents', body: "Edison launched a propaganda campaign against Tesla's AC power, publicly electrocuting animals to prove AC was dangerous. Tesla responded by running AC current through his own body at the 1893 World's Fair, lighting bulbs in his hands. AC won. Today, every power grid on Earth uses Tesla's system.", genius: 'Nikola Tesla' } },
  { type: 'story', data: { headline: "Marie Curie's Mobile X-Rays", body: "When WWI broke out, Curie converted her car into a mobile X-ray unit, drove it to the front lines, and trained women to operate the equipment. She called them petites Curies. She personally drove through battlefields to help surgeons locate bullets and shrapnel. She was 47.", genius: 'Marie Curie' } },
  { type: 'story', data: { headline: 'Da Vinci Bought Caged Birds', body: "Leonardo regularly visited markets in Florence, bought caged birds, and immediately set them free. He was a vegetarian in an era when that was almost unheard of. He believed the time would come when people would look upon the killing of animals as they looked upon the killing of men.", genius: 'Leonardo da Vinci' } },
  { type: 'story', data: { headline: 'Goethe Spent 60 Years on One Play', body: "Goethe began Faust at age 21 and did not finish Part Two until he was 82, months before his death. The play spans heaven and hell, love and war, classical Greece and medieval Germany. His final words were reportedly Mehr Licht! \u2014 More light!", genius: 'Johann Wolfgang von Goethe' } },
];

const connections: FeedItem[] = [
  { type: 'connection', data: { term: 'Philosophy', origin: 'Greek: φιλοσοφία (philosophia)', meaning: 'Love of wisdom', modern: "From 'philos' (love) + 'sophia' (wisdom). Every time you say 'philosophy' you're speaking Ancient Greek." } },
  { type: 'connection', data: { term: 'Calculus', origin: 'Latin: calculus', meaning: 'Small pebble (used for counting)', modern: "Romans counted with pebbles. Newton and Leibniz named the mathematics of change after them." } },
  { type: 'connection', data: { term: 'Atom', origin: 'Greek: ἄτομος (atomos)', meaning: 'Uncuttable', modern: "The Greeks imagined the smallest possible particle. We kept the name — even after we split it." } },
  { type: 'connection', data: { term: 'Democracy', origin: 'Greek: δημοκρατία (dēmokratia)', meaning: 'Power of the people', modern: "From 'demos' (people) + 'kratos' (power). The Athenians invented both the word and the system." } },
  { type: 'connection', data: { term: 'Electricity', origin: 'Greek: ἤλεκτρον (elektron)', meaning: 'Amber', modern: "The Greeks noticed that rubbed amber attracted feathers. 2,400 years later, Tesla harnessed the same force to light cities." } },
  { type: 'connection', data: { term: 'Gravity', origin: 'Latin: gravitas', meaning: 'Weight, heaviness, seriousness', modern: "The same Latin root gives us 'grave', 'gravity', and 'gravitas'. Newton formalised the concept; the Romans gave it its name." } },
];

const whyStudyItems: FeedItem[] = pathModules.slice(0, 8).map(m => ({
  type: 'whyStudy' as const,
  data: { subject: m.name, text: m.whyStudy || m.introText || '', icon: m.icon },
}));

// ── Helpers ──────────────────────────────────────────────────────────────

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Card components ─────────────────────────────────────────────────────

const QuoteCard = ({ item }: { item: FeedItem & { type: 'quote' } }) => (
  <div className="flex flex-col items-center justify-center h-full px-6 py-10">
    <Quote className="w-8 h-8 text-secondary/40 mb-4" />
    <blockquote className="text-2xl font-serif italic text-foreground text-center leading-relaxed max-w-md mb-6">
      "{item.data.text}"
    </blockquote>
    <div className="text-center">
      <p className="font-semibold text-foreground">{item.data.author}</p>
      <p className="text-sm text-muted-foreground">{item.data.field}</p>
    </div>
  </div>
);

const InsightCard = ({ item }: { item: FeedItem & { type: 'insight' } }) => (
  <div className="flex flex-col items-center justify-center h-full px-6 py-10">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-2xl">{item.data.icon}</span>
      <span className="text-xs font-semibold uppercase tracking-wider text-secondary">{item.data.category}</span>
    </div>
    <h2 className="text-xl font-bold text-foreground text-center mb-4 max-w-md">{item.data.title}</h2>
    <p className="text-base text-muted-foreground text-center leading-relaxed max-w-sm">{item.data.body}</p>
  </div>
);

const StoryCard = ({ item }: { item: FeedItem & { type: 'story' } }) => (
  <div className="flex flex-col items-center justify-center h-full px-6 py-10">
    <div className="flex items-center gap-2 mb-2">
      <BookOpen className="w-4 h-4 text-primary" />
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">{item.data.genius}</span>
    </div>
    <h2 className="text-xl font-bold text-foreground text-center mb-4 max-w-md">{item.data.headline}</h2>
    <div className="bg-card border border-border rounded-2xl p-5 max-w-sm">
      <p className="text-sm text-muted-foreground leading-relaxed">{item.data.body}</p>
    </div>
  </div>
);

const ConnectionCard = ({ item }: { item: FeedItem & { type: 'connection' } }) => (
  <div className="flex flex-col items-center justify-center h-full px-6 py-10">
    <div className="flex items-center gap-2 mb-4">
      <Globe className="w-4 h-4 text-secondary" />
      <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Word Origin</span>
    </div>
    <h2 className="text-3xl font-bold text-foreground mb-2">{item.data.term}</h2>
    <p className="text-sm font-medium text-secondary mb-1">{item.data.origin}</p>
    <p className="text-sm italic text-muted-foreground mb-6">"{item.data.meaning}"</p>
    <div className="bg-gradient-to-br from-secondary/10 to-primary/5 border border-secondary/20 rounded-2xl p-5 max-w-sm">
      <p className="text-sm text-foreground leading-relaxed">{item.data.modern}</p>
    </div>
  </div>
);

const WhyStudyCard = ({ item }: { item: FeedItem & { type: 'whyStudy' } }) => (
  <div className="flex flex-col items-center justify-center h-full px-6 py-10">
    <span className="text-3xl mb-2">{item.data.icon}</span>
    <div className="flex items-center gap-2 mb-4">
      <GraduationCap className="w-4 h-4 text-secondary" />
      <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Why Study This?</span>
    </div>
    <h2 className="text-xl font-bold text-foreground text-center mb-4">{item.data.subject}</h2>
    <p className="text-sm text-muted-foreground text-center leading-relaxed max-w-sm">{item.data.text}</p>
  </div>
);

const QuizCard = ({ item, onNext }: { item: FeedItem & { type: 'quiz' }; onNext: () => void }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const q = item.data;
  const isCorrect = selected === q.correctAnswer;

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-10">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="w-5 h-5 text-secondary" />
        <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Quick Quiz</span>
      </div>
      <h2 className="text-lg font-bold text-foreground text-center mb-6 leading-relaxed max-w-md">{q.question}</h2>
      <div className="w-full max-w-sm space-y-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => selected === null && setSelected(i)}
            disabled={selected !== null}
            className={cn(
              "w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 font-medium text-sm",
              selected === null && "border-border bg-card hover:border-secondary hover:bg-secondary/5",
              selected !== null && i === q.correctAnswer && "border-green-500 bg-green-500/10",
              selected !== null && i === selected && i !== q.correctAnswer && "border-red-400 bg-red-400/10",
              selected !== null && i !== q.correctAnswer && i !== selected && "border-border/50 opacity-50",
            )}
          >
            {opt}
          </button>
        ))}
      </div>
      {selected !== null && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 w-full max-w-sm">
          <div className={cn(
            "flex items-start gap-2 px-4 py-3 rounded-xl text-xs",
            isCorrect ? "bg-green-500/10" : "bg-red-400/10"
          )}>
            {isCorrect ? <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-600" /> : <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-500" />}
            <span className="text-muted-foreground">{q.explanation}</span>
          </div>
          <Button onClick={onNext} className="w-full mt-3" variant="secondary" size="sm">
            Next <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

// ── Main Feed ───────────────────────────────────────────────────────────

const Feed = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const feedItems: FeedItem[] = useMemo(() => {
    // ~70% content, ~30% quizzes
    const contentItems: FeedItem[] = [
      ...shuffleArray(insights).slice(0, 8),
      ...shuffleArray(stories).slice(0, 4),
      ...shuffleArray(quotes).slice(0, 5),
      ...shuffleArray(connections).slice(0, 4),
      ...shuffleArray(whyStudyItems).slice(0, 3),
    ];

    const quizItems: FeedItem[] = shuffleArray(
      lessonQuizzes.flatMap(lq => lq.questions.map(q => ({ type: 'quiz' as const, data: q })))
    ).slice(0, 8);

    // Interleave: ~2-3 content cards per quiz
    const result: FeedItem[] = [];
    const content = shuffleArray(contentItems);
    let ci = 0, qi = 0;
    while (ci < content.length || qi < quizItems.length) {
      // Add 2-3 content items
      const batch = 2 + Math.floor(Math.random() * 2);
      for (let j = 0; j < batch && ci < content.length; j++) {
        result.push(content[ci++]);
      }
      // Then one quiz
      if (qi < quizItems.length) {
        result.push(quizItems[qi++]);
      }
    }
    return result;
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(prev + 1, feedItems.length - 1));
  }, [feedItems.length]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.y < -50) goNext();
    else if (info.offset.y > 50 && currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const currentItem = feedItems[currentIndex];
  if (!currentItem) return null;

  return (
    <AppLayout>
      <div className="relative h-[calc(100vh-8rem)] overflow-hidden" ref={containerRef}>
        {/* Progress */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="text-xs font-medium text-muted-foreground bg-card/80 backdrop-blur-sm px-3 py-1 rounded-full border border-border">
            {currentIndex + 1} / {feedItems.length}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={handleDragEnd}
            className="h-full cursor-grab active:cursor-grabbing"
          >
            {currentItem.type === 'quote' && <QuoteCard item={currentItem as any} />}
            {currentItem.type === 'insight' && <InsightCard item={currentItem as any} />}
            {currentItem.type === 'story' && <StoryCard item={currentItem as any} />}
            {currentItem.type === 'connection' && <ConnectionCard item={currentItem as any} />}
            {currentItem.type === 'whyStudy' && <WhyStudyCard item={currentItem as any} />}
            {currentItem.type === 'quiz' && <QuizCard item={currentItem as any} onNext={goNext} />}
          </motion.div>
        </AnimatePresence>

        {/* Swipe hint */}
        {currentItem.type !== 'quiz' && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <button onClick={goNext} className="flex flex-col items-center gap-0.5 text-muted-foreground/60 hover:text-muted-foreground transition-colors">
              <ChevronUp className="w-4 h-4 animate-bounce" />
              <span className="text-[10px]">Swipe or tap</span>
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Feed;
