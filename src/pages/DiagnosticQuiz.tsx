import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle, XCircle, ArrowRight, Timer, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DiagnosticProgressBar } from '@/components/feed/DiagnosticProgressBar';

interface DiagnosticQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  regionKey: string;
  /** Optional: show a "memorize" prompt before the question */
  memoryPrompt?: string;
}

const QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag-phys',
    question: 'What fascinated 5-year-old Einstein and sparked his lifelong curiosity?',
    options: ['A telescope', 'A compass', 'A prism', 'A pendulum'],
    correctAnswer: 1,
    explanation: 'Einstein was amazed that an invisible force could move a compass needle — this wonder about invisible forces never left him.',
    regionKey: 'rightParietal',
  },
  {
    id: 'diag-mem-setup',
    question: 'Memorize these words: Apple, Chair, Cloud, Dog, Elephant. Which word came third?',
    options: ['Apple', 'Chair', 'Cloud', 'Dog'],
    correctAnswer: 2,
    explanation: 'Short-term memory is one of the strongest predictors of learning speed. You needed to hold 5 words and identify position.',
    regionKey: 'leftTemporal',
    memoryPrompt: 'Remember these 5 words:\n\nApple · Chair · Cloud · Dog · Elephant',
  },
  {
    id: 'diag-phil',
    question: 'What does the Greek word "philosophia" literally mean?',
    options: ['Study of nature', 'Love of wisdom', 'Art of thinking', 'Search for truth'],
    correctAnswer: 1,
    explanation: 'Philosophy comes from phílos (loving) + sophía (wisdom). The ancient Greeks believed the highest pursuit was the love of understanding itself.',
    regionKey: 'wernicke',
  },
  {
    id: 'diag-logic',
    question: '"I think, therefore I am" was said by which philosopher?',
    options: ['Aristotle', 'Descartes', 'Plato', 'Socrates'],
    correctAnswer: 1,
    explanation: 'René Descartes wrote "Cogito, ergo sum" in 1637 — the most famous sentence in philosophy.',
    regionKey: 'prefrontal',
  },
  {
    id: 'diag-math',
    question: 'Leonardo da Vinci filled his notebooks with mirror writing. Why?',
    options: ['To encrypt his ideas', 'He was left-handed', 'To practice calligraphy', 'It was faster to write'],
    correctAnswer: 1,
    explanation: 'Da Vinci was left-handed, and writing right-to-left prevented ink smudging. His 7,000+ notebook pages cover art, anatomy, engineering, and mathematics.',
    regionKey: 'leftParietal',
  },
  {
    id: 'diag-mem-recall',
    question: 'Going back — what was the 4th word you were asked to memorize?',
    options: ['Elephant', 'Cloud', 'Chair', 'Dog'],
    correctAnswer: 3,
    explanation: 'This tested delayed recall — your ability to retain information while processing other tasks. This activates your hippocampus and temporal lobes.',
    regionKey: 'cerebellum',
  },
  {
    id: 'diag-lit',
    question: 'Which Shakespeare play begins with "To be, or not to be"?',
    options: ['Macbeth', 'Hamlet', 'Othello', 'King Lear'],
    correctAnswer: 1,
    explanation: "Hamlet's soliloquy is the most famous speech in English literature. Shakespeare invented over 1,700 words we still use today.",
    regionKey: 'rightTemporal',
  },
  {
    id: 'diag-ethics',
    question: 'A friend asks you to lie to protect their feelings. What matters most?',
    options: ['Honesty is always right', 'Kindness matters more', 'It depends on context', 'Loyalty to your friend'],
    correctAnswer: 2,
    explanation: "There's no single right answer — that's the point. Moral reasoning activates your anterior cingulate cortex. Weighing competing values is a hallmark of higher cognition.",
    regionKey: 'anteriorCing',
  },
  {
    id: 'diag-eng',
    question: 'What supposedly fell on Newton\'s head, inspiring his theory of gravity?',
    options: ['A coconut', 'An apple', 'A pear', 'A walnut'],
    correctAnswer: 1,
    explanation: 'While the "falling on his head" part is likely myth, Newton did observe an apple falling at Woolsthorpe Manor in 1666.',
    regionKey: 'broca',
  },
];

const TOTAL = QUESTIONS.length;

const DiagnosticQuiz = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [activeRegions, setActiveRegions] = useState<Set<string>>(new Set());
  const [showMemoryPrompt, setShowMemoryPrompt] = useState(false);
  const [startTime] = useState(Date.now());
  const autoAdvanceRef = useRef<ReturnType<typeof setTimeout>>();
  const hasAdvancedRef = useRef(false);

  const question = QUESTIONS[currentIndex];

  // Check if we need to show memory prompt for this question
  useEffect(() => {
    if (question?.memoryPrompt && selected === null) {
      setShowMemoryPrompt(true);
    } else {
      setShowMemoryPrompt(false);
    }
  }, [currentIndex, question, selected]);

  const handleSelect = useCallback((optionIndex: number) => {
    if (selected !== null) return;
    setSelected(optionIndex);
    setShowExplanation(true);
    hasAdvancedRef.current = false;

    // Light up the brain region
    setActiveRegions(prev => new Set([...prev, question.regionKey]));

    // Auto-advance after 2.5s
    autoAdvanceRef.current = setTimeout(() => {
      if (!hasAdvancedRef.current) {
        hasAdvancedRef.current = true;
        advanceToNext();
      }
    }, 2500);
  }, [selected, question]);

  const advanceToNext = useCallback(() => {
    if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);

    if (currentIndex >= TOTAL - 1) {
      // Quiz complete
      localStorage.setItem('genius-academy-diagnostic-complete', 'true');
      localStorage.setItem('genius-academy-diagnostic-regions', JSON.stringify(Array.from(activeRegions)));
      navigate('/diagnostic-results');
      return;
    }

    setCurrentIndex(prev => prev + 1);
    setSelected(null);
    setShowExplanation(false);
  }, [currentIndex, activeRegions, navigate]);

  const handleNext = () => {
    if (selected === null) return;
    hasAdvancedRef.current = true;
    advanceToNext();
  };

  const elapsed = Math.floor((Date.now() - startTime) / 1000);

  return (
    <div className="min-h-screen bg-background flex flex-col" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
      {/* Top bar */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Timer className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-mono text-muted-foreground">{elapsed}s</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-secondary" />
            <span className="text-xs font-mono text-secondary">{activeRegions.size} regions</span>
          </div>
        </div>
        <DiagnosticProgressBar current={currentIndex} total={TOTAL} />
      </div>

      {/* Question area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {showMemoryPrompt && selected === null ? (
            /* Memory prompt overlay */
            <motion.div
              key={`mem-${currentIndex}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center max-w-sm"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-secondary/15 border border-secondary/25 flex items-center justify-center"
              >
                <Brain className="w-7 h-7 text-secondary" />
              </motion.div>
              <p className="text-[11px] font-mono uppercase tracking-widest text-secondary mb-4">Memory Test</p>
              <p className="text-xl font-heading font-bold text-foreground whitespace-pre-line mb-6 leading-relaxed">
                {question.memoryPrompt}
              </p>
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                onClick={() => setShowMemoryPrompt(false)}
                className="px-8 py-3 rounded-2xl bg-secondary text-secondary-foreground font-bold text-sm"
              >
                I've memorized them →
              </motion.button>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-[10px] text-muted-foreground mt-3"
              >
                Take your time — we'll test you on these later
              </motion.p>
            </motion.div>
          ) : (
            /* Question card */
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-sm"
            >
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center"
                >
                  <Brain className="w-6 h-6 text-secondary" />
                </motion.div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-secondary/70 mb-3">
                  Question {currentIndex + 1} of {TOTAL}
                </p>
                <h2 className="font-heading text-xl font-bold text-foreground leading-snug">
                  {question.question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {question.options.map((option, i) => {
                  const isSelected = selected === i;
                  const isCorrect = i === question.correctAnswer;
                  const showResult = selected !== null;

                  return (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.06 }}
                      onClick={() => handleSelect(i)}
                      disabled={selected !== null}
                      className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all ${
                        showResult
                          ? isCorrect
                            ? 'border-[hsl(var(--success))] bg-[hsl(var(--success))]/10 text-foreground'
                            : isSelected
                              ? 'border-destructive bg-destructive/10 text-foreground'
                              : 'border-border/20 text-muted-foreground/40'
                          : 'border-border/40 text-foreground hover:border-secondary/50 hover:bg-secondary/5 active:scale-[0.98]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-muted/50 flex items-center justify-center text-xs font-mono text-muted-foreground flex-shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="flex-1">{option}</span>
                        {showResult && isCorrect && (
                          <CheckCircle className="w-4 h-4 text-[hsl(var(--success))] flex-shrink-0" />
                        )}
                        {showResult && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 p-4 rounded-xl bg-card/60 border border-border/30">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {question.explanation}
                      </p>
                    </div>
                    <motion.button
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      onClick={handleNext}
                      className="w-full mt-3 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-secondary text-secondary-foreground font-bold text-sm active:scale-[0.97]"
                    >
                      {currentIndex < TOTAL - 1 ? 'Next Question' : 'See My Results'}
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom trust bar */}
      <div className="px-6 pb-6 text-center">
        <p className="text-[10px] text-muted-foreground">
          No signup required · Your brain analysis is calculated instantly
        </p>
      </div>
    </div>
  );
};

export default DiagnosticQuiz;
