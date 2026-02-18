import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Trophy, ChevronRight, Zap, Brain, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PathLesson } from '@/data/pathCurriculum';
import { cn } from '@/lib/utils';

interface FirstLessonWelcomeProps {
  lesson: PathLesson;
  moduleName: string;
  moduleIcon: string;
  onContinue: () => void;
}

// A quick interactive "taste" quiz with instant positive feedback
const QUICK_QUESTIONS: Record<string, { question: string; options: string[]; correctIndex: number; fact: string }> = {
  'ancient-greek': {
    question: 'Which Greek letter (π) gave us the word "peripheral"?',
    options: ['Alpha (α)', 'Pi (π)', 'Sigma (σ)', 'Omega (ω)'],
    correctIndex: 1,
    fact: '🎯 Exactly! Pi (π) is also the ratio of a circle\'s circumference to its diameter — used by every mathematician on earth.'
  },
  'logic': {
    question: 'If all humans are mortal, and Socrates is human — is Socrates mortal?',
    options: ['Yes, definitely', 'No', 'Maybe', 'Not enough info'],
    correctIndex: 0,
    fact: '🎯 You just used a syllogism — the same logic Aristotle invented 2,400 years ago. You\'re already thinking like a philosopher!'
  },
  'latin': {
    question: 'The Latin word "aqua" means water. What English word does it give us?',
    options: ['Air', 'Aquarium', 'Fire', 'Earth'],
    correctIndex: 1,
    fact: '🎯 Aquarium comes directly from Latin! You already know Latin words — you just didn\'t know it yet.'
  },
  'mathematics': {
    question: 'Einstein said his "sacred little geometry book" changed his life. Who wrote it?',
    options: ['Newton', 'Pythagoras', 'Euclid', 'Archimedes'],
    correctIndex: 2,
    fact: '🎯 Euclid\'s Elements — written 2,300 years ago — is still the basis of modern geometry. You\'re starting where Einstein started!'
  },
  'physics': {
    question: 'Newton discovered gravity when an apple fell. What force keeps the Moon in orbit?',
    options: ['A different force', 'The exact same gravity', 'Magnetic force', 'Centrifugal force'],
    correctIndex: 1,
    fact: '🎯 The same gravity pulling apples down keeps the Moon in orbit — Newton\'s breakthrough was realising they\'re the same force!'
  },
  'chemistry': {
    question: 'Marie Curie won the Nobel Prize TWICE. In which fields?',
    options: ['Chemistry & Biology', 'Physics & Chemistry', 'Medicine & Physics', 'Physics only'],
    correctIndex: 1,
    fact: '🎯 Marie Curie is still the only person to win Nobel Prizes in two different sciences. You\'re learning from the best!'
  },
  'literature': {
    question: 'Which epic poem begins "Sing, O goddess, the anger of Achilles"?',
    options: ['The Odyssey', 'The Aeneid', 'The Iliad', 'Paradise Lost'],
    correctIndex: 2,
    fact: '🎯 Homer\'s Iliad — written ~850 BC — is still one of the most gripping war stories ever told. You\'re about to read what Mill read at age 8!'
  },
  'history': {
    question: '"History is philosophy teaching by examples." Who said this?',
    options: ['Aristotle', 'Dionysius of Halicarnassus', 'Thucydides', 'Herodotus'],
    correctIndex: 1,
    fact: '🎯 Great historians believed studying the past gives us a playbook for the present — that\'s exactly what this module teaches!'
  },
  'ethics': {
    question: 'Aristotle said the goal of life is "eudaimonia." What does this mean?',
    options: ['Pleasure', 'Wealth', 'Flourishing / deep wellbeing', 'Power'],
    correctIndex: 2,
    fact: '🎯 Eudaimonia — flourishing — is about living your full potential. That\'s what this entire curriculum is about!'
  },
  'rhetoric': {
    question: 'Aristotle identified 3 modes of persuasion. Which one is about the speaker\'s credibility?',
    options: ['Pathos (emotion)', 'Logos (logic)', 'Ethos (credibility)', 'Kairos (timing)'],
    correctIndex: 2,
    fact: '🎯 Ethos — your credibility and character — is often the most powerful persuader. You now have a word for what the best leaders naturally project!'
  },
  'natural-history': {
    question: 'Darwin spent 5 years on which famous voyage that led to his theory of evolution?',
    options: ['The Beagle', 'The Endeavour', 'The Discovery', 'The Victory'],
    correctIndex: 0,
    fact: '🎯 The HMS Beagle voyage changed science forever. Darwin\'s secret weapon was patient, careful observation — exactly what this module teaches!'
  },
  'languages': {
    question: 'What percentage of English words have Latin or Greek roots?',
    options: ['Around 20%', 'Around 35%', 'Around 60%', 'Over 80%'],
    correctIndex: 2,
    fact: '🎯 Over 60% of English comes from Latin and Greek! You\'ve already been learning these languages without knowing it.'
  },
  'engineering': {
    question: 'Leonardo da Vinci designed a flying machine 400 years before the Wright Brothers. What did he call it?',
    options: ['The Ornithopter', 'The Glider', 'The Aero', 'The Avion'],
    correctIndex: 0,
    fact: '🎯 Leonardo\'s ornithopter — inspired by bird wings — showed his genius for observation. You\'ll learn his exact design methods!'
  },
  'anatomy': {
    question: 'Leonardo da Vinci performed over 30 human dissections to understand the body. In which century?',
    options: ['12th century', '14th century', '15th-16th century', '17th century'],
    correctIndex: 2,
    fact: '🎯 In the 1490s-1510s! Leonardo\'s anatomical drawings were so accurate they\'re still used in medical education today!'
  },
  'reading': {
    question: 'J.S. Mill read Herodotus\' Histories in Ancient Greek. At what age?',
    options: ['Age 15', 'Age 12', 'Age 8', 'Age 6'],
    correctIndex: 2,
    fact: '🎯 Age 8! Mill\'s method of reading great books early — and often — is the foundation of genius. This module recreates that exact reading list!'
  },
};

const DEFAULT_QUESTION = {
  question: 'Great minds share one habit above all others. What is it?',
  options: ['Natural talent', 'Daily reading & study', 'Formal schooling', 'Rich parents'],
  correctIndex: 1,
  fact: '🎯 Every genius in this curriculum — Mill, Einstein, Curie, Da Vinci — was a voracious reader and daily studier. That\'s exactly what you\'re starting today!'
};

export const FirstLessonWelcome = ({ lesson, moduleName, moduleIcon, onContinue }: FirstLessonWelcomeProps) => {
  const [phase, setPhase] = useState<'welcome' | 'quiz' | 'celebration'>('welcome');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const quiz = QUICK_QUESTIONS[lesson.moduleId] || DEFAULT_QUESTION;

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setIsCorrect(index === quiz.correctIndex);
    setTimeout(() => setPhase('celebration'), 1800);
  };

  return (
    <div className="min-h-[60vh] flex flex-col">
      <AnimatePresence mode="wait">
        {/* Phase 1: Welcome */}
        {phase === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-6"
          >
            {/* Module icon + sparkle */}
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary/30 to-accent/20 border border-secondary/30 flex items-center justify-center text-4xl shadow-lg">
                {moduleIcon}
              </div>
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-secondary flex items-center justify-center"
              >
                <Sparkles className="w-4 h-4 text-secondary-foreground" />
              </motion.div>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <p className="text-xs font-mono uppercase tracking-widest text-secondary">First Lesson</p>
              <h2 className="font-heading text-2xl font-bold text-foreground leading-tight">
                Welcome to {moduleName}!
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                This is your first step. In just <strong className="text-foreground">5 minutes</strong> you'll unlock something that changes how you see the world.
              </p>
            </div>

            {/* Stats row */}
            <div className="flex gap-4 w-full max-w-xs">
              <div className="flex-1 bg-secondary/10 border border-secondary/20 rounded-xl p-3 text-center">
                <Clock className="w-4 h-4 text-secondary mx-auto mb-1" />
                <p className="font-mono text-sm font-bold text-foreground">{lesson.estimatedMinutes}min</p>
                <p className="text-[10px] text-muted-foreground">to complete</p>
              </div>
              <div className="flex-1 bg-accent/10 border border-accent/20 rounded-xl p-3 text-center">
                <Brain className="w-4 h-4 text-accent mx-auto mb-1" />
                <p className="font-mono text-sm font-bold text-foreground">+IQ</p>
                <p className="text-[10px] text-muted-foreground">potential boost</p>
              </div>
              <div className="flex-1 bg-success/10 border border-success/20 rounded-xl p-3 text-center">
                <Star className="w-4 h-4 text-success mx-auto mb-1" />
                <p className="font-mono text-sm font-bold text-foreground">Free</p>
                <p className="text-[10px] text-muted-foreground">no paywall</p>
              </div>
            </div>

            {/* Encouragement */}
            <div className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-xl p-4 text-left w-full max-w-xs">
              <p className="text-xs text-foreground leading-relaxed">
                <span className="text-secondary font-semibold">💡 Quick fact:</span> J.S. Mill began this exact subject and went on to become one of the most influential thinkers in history. You're starting the same journey.
              </p>
            </div>

            <Button
              onClick={() => setPhase('quiz')}
              className="w-full max-w-xs h-12 bg-secondary text-secondary-foreground font-semibold text-base rounded-xl"
            >
              <Zap className="w-4 h-4 mr-2" />
              Quick warm-up first!
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        )}

        {/* Phase 2: Quick Quiz */}
        {phase === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="flex-1 flex flex-col p-6 space-y-6"
          >
            <div className="text-center">
              <p className="text-[10px] font-mono uppercase tracking-widest text-secondary mb-2">30-Second Challenge</p>
              <h3 className="font-heading text-lg font-semibold text-foreground leading-snug">
                {quiz.question}
              </h3>
            </div>

            <div className="space-y-2.5">
              {quiz.options.map((option, i) => {
                const isSelected = selectedAnswer === i;
                const isRight = i === quiz.correctIndex;
                const showResult = selectedAnswer !== null;

                return (
                  <motion.button
                    key={i}
                    whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={selectedAnswer !== null}
                    className={cn(
                      "w-full text-left p-3.5 rounded-xl border transition-all text-sm font-medium",
                      !showResult && "bg-card border-border hover:border-secondary/50 hover:bg-secondary/5 text-foreground",
                      showResult && isRight && "bg-success/20 border-success text-success",
                      showResult && isSelected && !isRight && "bg-destructive/20 border-destructive text-destructive",
                      showResult && !isSelected && !isRight && "bg-card border-border text-muted-foreground opacity-60"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span className={cn(
                        "w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0",
                        !showResult && "border-border text-muted-foreground",
                        showResult && isRight && "border-success bg-success text-white",
                        showResult && isSelected && !isRight && "border-destructive bg-destructive text-white",
                        showResult && !isSelected && !isRight && "border-muted text-muted-foreground"
                      )}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      {option}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {selectedAnswer !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "rounded-xl p-4 text-sm leading-relaxed",
                  isCorrect 
                    ? "bg-success/10 border border-success/30 text-foreground"
                    : "bg-secondary/10 border border-secondary/30 text-foreground"
                )}
              >
                {quiz.fact}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Phase 3: Celebration */}
        {phase === 'celebration' && (
          <motion.div
            key="celebration"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-6"
          >
            {/* Trophy */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary/40 to-accent/30 border-2 border-secondary flex items-center justify-center"
            >
              <Trophy className="w-10 h-10 text-secondary" />
            </motion.div>

            {/* Stars */}
            <motion.div
              className="flex gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
                >
                  <Star className="w-6 h-6 text-secondary fill-secondary" />
                </motion.div>
              ))}
            </motion.div>

            <div className="space-y-2">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                {isCorrect ? "You're a natural!" : "You're already learning!"}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                {isCorrect
                  ? "Getting that right on your first attempt? That's the start of something remarkable. The geniuses who studied this started just like you."
                  : "That's perfectly fine — that's exactly why you're here. By the end of this module, questions like that will be effortless."}
              </p>
            </div>

            <div className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-xl p-4 w-full max-w-xs">
              <p className="text-xs text-foreground leading-relaxed text-center">
                <span className="font-semibold text-secondary">Just 10 minutes a day</span> of consistent study is enough to transform your thinking over months. You've already started.
              </p>
            </div>

            <Button
              onClick={onContinue}
              className="w-full max-w-xs h-12 bg-secondary text-secondary-foreground font-semibold text-base rounded-xl"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Start the Lesson
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
