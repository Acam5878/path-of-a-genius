import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Sparkles, Volume2, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FlashcardData {
  letter: string;
  name: string;
  sound: string;
  emoji: string;
  example: string;
  englishWord: string;
  funFact?: string;
}

const GREEK_CARDS: FlashcardData[] = [
  { letter: 'Α α', name: 'Alpha', sound: 'ah (like "father")', emoji: '🅰️', example: 'ἄνθρωπος', englishWord: 'Alphabet, Alphanumeric', funFact: 'Alpha & Beta = Alphabet! The first two Greek letters gave us the word.' },
  { letter: 'Β β', name: 'Beta', sound: 'b (like "boy")', emoji: '🐝', example: 'βίβλος (book)', englishWord: 'Bible, Beta testing', funFact: 'Software "beta" versions are named after this letter — the second stage of testing.' },
  { letter: 'Γ γ', name: 'Gamma', sound: 'g (like "go")', emoji: '☢️', example: 'γῆ (earth)', englishWord: 'Gamma rays, Geometry', funFact: 'Gamma rays are the most energetic radiation in the universe — named by Ernest Rutherford.' },
  { letter: 'Δ δ', name: 'Delta', sound: 'd (like "dog")', emoji: '✈️', example: 'δῶρον (gift)', englishWord: 'Delta, Deltoid muscle', funFact: 'A river "delta" is shaped like this triangle letter — the Nile delta, Mississippi delta.' },
  { letter: 'Ε ε', name: 'Epsilon', sound: 'eh (like "pet")', emoji: '✏️', example: 'ἔργον (work)', englishWord: 'Epsilon, Epidermis', funFact: 'Epsilon means "bare E" — the ancient Greeks loved naming their short vowels "bare" to distinguish them.' },
  { letter: 'Ζ ζ', name: 'Zeta', sound: 'z or dz (like "wisdom")', emoji: '⚡', example: 'ζωή (life)', englishWord: 'Zero (via Arabic)', funFact: 'In ancient Greek it sounded like "dz" — like saying "adze" (a woodcutting tool) quickly.' },
  { letter: 'Η η', name: 'Eta', sound: 'ay (like "day") — long!', emoji: '🌅', example: 'ἥλιος (sun)', englishWord: 'Eta (physics unit)', funFact: 'Eta is the long version of epsilon. Greeks were very precise — they had separate letters for long and short "e"!' },
  { letter: 'Θ θ', name: 'Theta', sound: 'th (like "think")', emoji: '🎯', example: 'θεός (god)', englishWord: 'Theology, Theatre, Theorem', funFact: 'Theta was used in ancient times to mark a death sentence in court records — it stood for θάνατος (death).' },
  { letter: 'Ι ι', name: 'Iota', sound: 'ee (like "see")', emoji: '💡', example: 'ἰχθύς (fish)', englishWord: '"Not one iota" — meaning a tiny amount', funFact: 'English phrase "not one iota" comes from this letter — it\'s the smallest letter in Greek, just like the dot on an "i".' },
  { letter: 'Κ κ', name: 'Kappa', sound: 'k (like "kite")', emoji: '🪁', example: 'κόσμος (cosmos)', englishWord: 'Karate, Kilometre', funFact: 'Fraternities and sororities love kappa — it\'s why you see it on college campuses worldwide.' },
  { letter: 'Λ λ', name: 'Lambda', sound: 'l (like "lamp")', emoji: '🔬', example: 'λόγος (word, reason)', englishWord: 'Lambda (computer science)', funFact: 'Lambda functions in programming — used in Python, JavaScript, and more — are named after this letter.' },
  { letter: 'Μ μ', name: 'Mu', sound: 'm (like "mother")', emoji: '🎵', example: 'μουσική (music)', englishWord: 'Music, Museum, Muse', funFact: 'The Greek word for music comes from the Muses — the nine goddesses who inspired art, science, and literature.' },
  { letter: 'Ν ν', name: 'Nu', sound: 'n (like "never")', emoji: '🔢', example: 'νόμος (law)', englishWord: 'Nu (physics: frequency)', funFact: 'In physics, the Greek letter ν (nu) represents frequency — how many waves pass per second.' },
  { letter: 'Ξ ξ', name: 'Xi', sound: 'x or ks (like "box")', emoji: '📦', example: 'ξύλον (wood)', englishWord: 'Xi (rarely used in English)', funFact: 'Xi is rare in Greek words but very useful — it packs the "ks" sound into one elegant letter.' },
  { letter: 'Ο ο', name: 'Omicron', sound: 'oh, short (like "off")', emoji: '🔵', example: 'οἶκος (house)', englishWord: 'Economy, Ecology, Ecumenical', funFact: 'Omicron means "little O" — the short "o". COVID\'s omicron variant was named after this letter.' },
  { letter: 'Π π', name: 'Pi', sound: 'p (like "pet")', emoji: '🥧', example: 'πόλις (city)', englishWord: 'Pi (3.14159…), Peripheral', funFact: 'Every circle on Earth uses this letter — the ratio of circumference to diameter is π = 3.14159…, discovered by the Greeks!' },
  { letter: 'Ρ ρ', name: 'Rho', sound: 'r, slightly rolled', emoji: '🌀', example: 'ῥήτωρ (orator)', englishWord: 'Rhetoric, Rhythm, Rhapsody', funFact: 'The word "rhetoric" — the art of persuasion — comes directly from Greek ῥήτωρ via this letter.' },
  { letter: 'Σ σ/ς', name: 'Sigma', sound: 's (like "sit")', emoji: '🔣', example: 'σοφία (wisdom)', englishWord: 'Sigma (sum in maths)', funFact: 'Two forms: σ in the middle of words, ς at the end. Mathematicians use Σ to mean "sum of" — add everything up!' },
  { letter: 'Τ τ', name: 'Tau', sound: 't (like "top")', emoji: '⚕️', example: 'τέχνη (skill, art)', englishWord: 'Technology, Technique', funFact: 'The Tau cross (T-shaped) is one of the oldest Christian symbols. The word "technology" comes from τέχνη (skill).' },
  { letter: 'Υ υ', name: 'Upsilon', sound: 'oo or u (like "soon")', emoji: '🎓', example: 'ὕδωρ (water)', englishWord: 'Hydrogen, Hydrant (via ὕδωρ)', funFact: 'Upsilon means "bare U" — it looks like our letter Y, which actually descended from it!' },
  { letter: 'Φ φ', name: 'Phi', sound: 'ph or f (like "phone")', emoji: '✨', example: 'φίλος (friend)', englishWord: 'Philosophy, Philadelphia, Phone', funFact: 'φίλος (love) + σοφία (wisdom) = φιλοσοφία = Philosophy! "Love of wisdom" — the word Mill lived by.' },
  { letter: 'Χ χ', name: 'Chi', sound: 'kh (like "Bach")', emoji: '🎭', example: 'χρόνος (time)', englishWord: 'Chaos, Chronicle, Chemistry', funFact: 'χ (chi) + ρ (rho) = ☧ — the Chi-Rho, one of the earliest Christian symbols, made from Jesus\'s name in Greek: Χριστός.' },
  { letter: 'Ψ ψ', name: 'Psi', sound: 'ps (like "lapse")', emoji: '🧠', example: 'ψυχή (soul, mind)', englishWord: 'Psychology, Psyche, Psychiatry', funFact: 'ψυχή means soul or mind — giving us psychology (study of the mind). Ancient Greeks believed the soul was the life-force.' },
  { letter: 'Ω ω', name: 'Omega', sound: 'oh, long (like "go")', emoji: '⚡', example: 'ὥρα (hour, season)', englishWord: 'Omega (Ohm in physics)', funFact: 'Alpha and Omega = beginning and end. Omega means "big O" — the long "o", the final letter, the ultimate.' },
];

interface GreekAlphabetFlashcardsProps {
  onComplete: () => void;
}

export const GreekAlphabetFlashcards = ({ onComplete }: GreekAlphabetFlashcardsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<number>>(new Set());
  const [direction, setDirection] = useState<1 | -1>(1);
  const [showComplete, setShowComplete] = useState(false);

  const card = GREEK_CARDS[currentIndex];
  const progress = ((currentIndex + 1) / GREEK_CARDS.length) * 100;

  const goNext = () => {
    if (currentIndex < GREEK_CARDS.length - 1) {
      setDirection(1);
      setFlipped(false);
      setTimeout(() => setCurrentIndex(i => i + 1), 50);
    } else {
      setShowComplete(true);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setFlipped(false);
      setTimeout(() => setCurrentIndex(i => i - 1), 50);
    }
  };

  const markKnown = () => {
    setKnown(prev => new Set([...prev, currentIndex]));
    goNext();
  };

  if (showComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center p-8 space-y-6 min-h-[50vh]"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary/40 to-accent/30 border-2 border-secondary flex items-center justify-center text-4xl"
        >
          🏛️
        </motion.div>
        <div className="space-y-2">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            You know the Greek alphabet!
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            All 24 letters reviewed. You recognised <strong className="text-foreground">{known.size} of {GREEK_CARDS.length}</strong> immediately — that's {Math.round((known.size / GREEK_CARDS.length) * 100)}% mastery on your first pass.
          </p>
          <p className="text-xs text-secondary font-medium mt-2">Mill learned these at age 3. You just did it in minutes. 🎯</p>
        </div>
        <Button
          onClick={onComplete}
          className="w-full max-w-xs h-12 bg-secondary text-secondary-foreground font-semibold text-base rounded-xl"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Continue to Lesson
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-medium">Letter {currentIndex + 1} of {GREEK_CARDS.length}</span>
          <span className="text-secondary font-medium">{known.size} known ✓</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-secondary to-accent rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentIndex}-${flipped}`}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-sm"
          >
            <button
              onClick={() => setFlipped(f => !f)}
              className="w-full"
            >
              <div className={cn(
                "rounded-2xl border-2 p-6 text-center transition-all min-h-[220px] flex flex-col items-center justify-center space-y-3 cursor-pointer",
                flipped
                  ? "bg-gradient-to-br from-secondary/20 to-accent/10 border-secondary/40"
                  : "bg-card border-border hover:border-secondary/30"
              )}>
                {!flipped ? (
                  /* Front: the letter */
                  <>
                    <div className="text-6xl font-bold text-foreground leading-none">{card.letter}</div>
                    <p className="text-xs text-muted-foreground">Tap to reveal</p>
                  </>
                ) : (
                  /* Back: name, sound, example */
                  <>
                    <div className="text-3xl font-bold text-foreground">{card.letter}</div>
                    <div className="space-y-1">
                      <p className="text-lg font-bold text-secondary">{card.name}</p>
                      <div className="flex items-center justify-center gap-1.5">
                        <Volume2 className="w-3.5 h-3.5 text-muted-foreground" />
                        <p className="text-sm text-foreground">{card.sound}</p>
                      </div>
                    </div>
                    <div className="bg-secondary/10 rounded-xl px-4 py-2 text-center">
                      <p className="text-xs text-muted-foreground mb-0.5">Example word:</p>
                      <p className="text-sm font-semibold text-foreground">{card.example}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[11px] text-accent font-medium">In English: {card.englishWord}</p>
                    </div>
                  </>
                )}
              </div>
            </button>

            {/* Fun fact */}
            {flipped && card.funFact && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-3 bg-accent/10 border border-accent/20 rounded-xl p-3 flex items-start gap-2"
              >
                <Lightbulb className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                <p className="text-xs text-foreground/80 leading-relaxed">{card.funFact}</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <div className="space-y-2 pb-2">
        {flipped && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2"
          >
            <Button
              onClick={goNext}
              variant="outline"
              className="flex-1 h-11 rounded-xl border-border text-sm"
            >
              Still learning
            </Button>
            <Button
              onClick={markKnown}
              className="flex-1 h-11 bg-success text-white rounded-xl text-sm font-semibold"
            >
              <Check className="w-4 h-4 mr-1" />
              Got it! ✓
            </Button>
          </motion.div>
        )}

        <div className="flex items-center justify-between gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="rounded-xl"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
          {!flipped && (
            <Button
              onClick={() => setFlipped(true)}
              className="flex-1 h-11 bg-secondary text-secondary-foreground rounded-xl text-sm font-semibold"
            >
              Reveal →
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={goNext}
            className="rounded-xl"
          >
            Skip
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
