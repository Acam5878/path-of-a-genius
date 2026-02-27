import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, BookOpen, Lightbulb, Play, 
  Languages, Quote, ExternalLink, Video, Table, Puzzle,
  Trophy, Star, MessageCircle, Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PathLesson } from '@/data/pathCurriculum';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { normalizeExternalUrl } from '@/lib/externalLinks';
import { getPathInteractiveExercises } from '@/data/pathInteractiveExercises';
import { MatchingExercise, OrderingExercise, CalculatorExercise, StepByStepExercise } from '@/components/exercises';

export interface LessonCard {
  id: string;
  type: 'curiosity' | 'content' | 'keypoint' | 'vocabulary' | 'video' | 'source' | 'classical' | 'exercise' | 'interactive' | 'realworld';
  title: string;
  icon: React.ReactNode;
  accentColor: string; // tailwind color class for the card's accent
}

/**
 * Splits a lesson into digestible cards — 1 concept per card.
 * Content is chunked by markdown headings (## or ###) into separate cards.
 */
export function buildLessonCards(lesson: PathLesson): LessonCard[] {
  const cards: LessonCard[] = [];

  // 1. Curiosity hook
  if (lesson.overview) {
    cards.push({
      id: 'curiosity',
      type: 'curiosity',
      title: 'Did you know?',
      icon: <Lightbulb className="w-4 h-4" />,
      accentColor: 'secondary',
    });
  }

  // 2. Video resources (watch first)
  const videos = lesson.resources?.filter(r => r.type === 'video') || [];
  videos.forEach((v, i) => {
    cards.push({
      id: `video-${i}`,
      type: 'video',
      title: v.title || 'Watch & Learn',
      icon: <Video className="w-4 h-4" />,
      accentColor: 'destructive',
    });
  });

  // 3. Content chunks — split by ## or ### headings
  if (lesson.content) {
    const chunks = splitContentByHeadings(lesson.content);
    chunks.forEach((chunk, i) => {
      cards.push({
        id: `content-${i}`,
        type: 'content',
        title: chunk.heading || `Part ${i + 1}`,
        icon: <BookOpen className="w-4 h-4" />,
        accentColor: 'secondary',
      });
    });
  }

  // 4. Key takeaways (1 card, not per-point)
  if (lesson.keyPoints?.length) {
    cards.push({
      id: 'keypoints',
      type: 'keypoint',
      title: 'Key Takeaways',
      icon: <Star className="w-4 h-4" />,
      accentColor: 'accent',
    });
  }

  // 5. Vocabulary
  if (lesson.vocabularyTable?.length) {
    cards.push({
      id: 'vocabulary',
      type: 'vocabulary',
      title: `Vocabulary (${lesson.vocabularyTable.length} terms)`,
      icon: <Table className="w-4 h-4" />,
      accentColor: 'secondary',
    });
  }

  // 6. Primary sources
  lesson.primarySourceExcerpts?.forEach((excerpt, i) => {
    cards.push({
      id: `source-${i}`,
      type: 'source',
      title: excerpt.source || `Primary Source ${i + 1}`,
      icon: <Quote className="w-4 h-4" />,
      accentColor: 'accent',
    });
  });

  // 7. Classical connections
  if (lesson.classicalConnections?.length) {
    cards.push({
      id: 'classical',
      type: 'classical',
      title: `Classical Roots (${lesson.classicalConnections.length})`,
      icon: <Languages className="w-4 h-4" />,
      accentColor: 'secondary',
    });
  }

  // 8. Interactive exercises
  const interactiveExercises = getPathInteractiveExercises(lesson.id);
  const hasInteractive = interactiveExercises && (
    interactiveExercises.matching || interactiveExercises.ordering || 
    interactiveExercises.calculator || interactiveExercises.stepByStep
  );
  if (lesson.exercises?.length || hasInteractive) {
    cards.push({
      id: 'exercises',
      type: hasInteractive ? 'interactive' : 'exercise',
      title: 'Practice',
      icon: <Puzzle className="w-4 h-4" />,
      accentColor: 'secondary',
    });
  }

  // 9. Real-world use
  if (lesson.realWorldUse) {
    cards.push({
      id: 'realworld',
      type: 'realworld',
      title: 'Now You Can…',
      icon: <Trophy className="w-4 h-4" />,
      accentColor: 'accent',
    });
  }

  return cards;
}

// Split markdown content by ## or ### headings
export interface ContentChunk {
  heading: string | null;
  body: string;
}

function splitContentByHeadings(content: string): ContentChunk[] {
  const lines = content.split('\n');
  const chunks: ContentChunk[] = [];
  let currentHeading: string | null = null;
  let currentBody: string[] = [];

  for (const line of lines) {
    const headingMatch = line.match(/^#{2,3}\s+(.+)$/);
    if (headingMatch) {
      // Save previous chunk
      if (currentBody.length > 0 || currentHeading) {
        chunks.push({ heading: currentHeading, body: currentBody.join('\n').trim() });
      }
      currentHeading = headingMatch[1];
      currentBody = [];
    } else {
      currentBody.push(line);
    }
  }
  // Final chunk
  if (currentBody.length > 0 || currentHeading) {
    chunks.push({ heading: currentHeading, body: currentBody.join('\n').trim() });
  }

  // If no headings found, split by rough paragraph count (~150 words per card)
  if (chunks.length <= 1 && content.length > 600) {
    const paragraphs = content.split(/\n\n+/).filter(p => p.trim());
    const result: ContentChunk[] = [];
    let batch: string[] = [];
    let wordCount = 0;

    for (const para of paragraphs) {
      const words = para.split(/\s+/).length;
      if (wordCount + words > 150 && batch.length > 0) {
        result.push({ heading: null, body: batch.join('\n\n') });
        batch = [para];
        wordCount = words;
      } else {
        batch.push(para);
        wordCount += words;
      }
    }
    if (batch.length) result.push({ heading: null, body: batch.join('\n\n') });
    return result;
  }

  return chunks.filter(c => c.body.trim().length > 0 || c.heading);
}

// ─── Swipeable Card Flow Component ───

interface LessonCardFlowProps {
  lesson: PathLesson;
  onComplete: () => void;
  onAskTutor: () => void;
}

const SWIPE_THRESHOLD = 50;

export const LessonCardFlow = ({ lesson, onComplete, onAskTutor }: LessonCardFlowProps) => {
  const cards = useMemo(() => buildLessonCards(lesson), [lesson]);
  const contentChunks = useMemo(() => lesson.content ? splitContentByHeadings(lesson.content) : [], [lesson.content]);
  const interactiveExercises = useMemo(() => getPathInteractiveExercises(lesson.id), [lesson.id]);
  const videos = useMemo(() => lesson.resources?.filter(r => r.type === 'video') || [], [lesson.resources]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goNext = useCallback(() => {
    if (currentIndex < cards.length - 1) {
      setDirection(1);
      setCurrentIndex(i => i + 1);
    }
  }, [currentIndex, cards.length]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(i => i - 1);
    }
  }, [currentIndex]);

  const handleDragEnd = useCallback((_: any, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD && info.velocity.x < 0) goNext();
    else if (info.offset.x > SWIPE_THRESHOLD && info.velocity.x > 0) goPrev();
  }, [goNext, goPrev]);

  const card = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;
  const isLast = currentIndex === cards.length - 1;

  return (
    <div className="flex flex-col h-full">
      {/* Progress bar */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center gap-2 mb-1">
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-secondary rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="text-[10px] text-muted-foreground font-mono whitespace-nowrap">
            {currentIndex + 1}/{cards.length}
          </span>
        </div>
        {/* Card type pills */}
        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
          {cards.map((c, i) => (
            <button
              key={c.id}
              onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
              className={`shrink-0 w-2 h-2 rounded-full transition-all ${
                i === currentIndex ? 'bg-secondary w-6' : i < currentIndex ? 'bg-secondary/40' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Card content area */}
      <div className="flex-1 min-h-0 px-4 overflow-hidden relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={card.id}
            custom={direction}
            initial={{ x: direction > 0 ? 200 : -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -200 : 200, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="h-full overflow-y-auto overscroll-contain pb-4"
          >
            {/* Card header */}
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-8 h-8 rounded-lg bg-${card.accentColor}/20 text-${card.accentColor} flex items-center justify-center`}>
                {card.icon}
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  {card.type === 'content' ? 'Lesson' : card.type.replace('-', ' ')}
                </p>
                <h3 className="text-sm font-heading font-semibold text-foreground">{card.title}</h3>
              </div>
              <button
                onClick={onAskTutor}
                className="ml-auto shrink-0 flex items-center gap-1 px-2 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
              >
                <MessageCircle className="w-3 h-3 text-secondary" />
                <span className="text-[10px] text-secondary font-medium">Ask</span>
              </button>
            </div>

            {/* Card body based on type */}
            <CardBody
              card={card}
              lesson={lesson}
              contentChunks={contentChunks}
              interactiveExercises={interactiveExercises}
              videos={videos}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation footer */}
      <div className="px-4 py-3 border-t border-border bg-card flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="w-10 h-10 p-0"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          onClick={isLast ? onComplete : goNext}
          className={`flex-1 h-10 ${isLast ? 'bg-secondary text-secondary-foreground' : 'bg-secondary text-secondary-foreground'}`}
        >
          {isLast ? (
            <><Check className="w-4 h-4 mr-2" /> Mark Complete</>
          ) : (
            <>Continue <ChevronRight className="w-4 h-4 ml-1" /></>
          )}
        </Button>
      </div>
    </div>
  );
};

// ─── Card Body Renderer ───

function CardBody({ card, lesson, contentChunks, interactiveExercises, videos }: {
  card: LessonCard;
  lesson: PathLesson;
  contentChunks: ContentChunk[];
  interactiveExercises: ReturnType<typeof getPathInteractiveExercises>;
  videos: NonNullable<PathLesson['resources']>;
}) {
  switch (card.type) {
    case 'curiosity':
      return (
        <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/25 rounded-xl p-5">
          <p className="text-lg text-foreground leading-relaxed italic font-serif">
            "{lesson.overview?.split('.')[0]}."
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mt-3">
            {lesson.overview?.split('.').slice(1).join('.').trim()}
          </p>
        </div>
      );

    case 'video': {
      const videoIdx = parseInt(card.id.split('-')[1] || '0');
      const video = videos[videoIdx];
      if (!video) return null;
      return (
        <a
          href={normalizeExternalUrl(video.url)}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-destructive/5 border border-destructive/20 rounded-xl p-5 hover:bg-destructive/10 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-destructive/20 flex items-center justify-center">
              <Play className="w-7 h-7 text-destructive" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-base font-semibold text-foreground">{video.title}</h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                {video.provider && <span>{video.provider}</span>}
                {video.free && <span className="px-1.5 py-0.5 bg-green-500/10 text-green-400 rounded-full text-[10px] font-medium">Free</span>}
              </div>
              <p className="text-xs text-muted-foreground mt-2">Tap to watch in a new tab</p>
            </div>
            <ExternalLink className="w-5 h-5 text-destructive shrink-0" />
          </div>
        </a>
      );
    }

    case 'content': {
      const chunkIdx = parseInt(card.id.split('-')[1] || '0');
      const chunk = contentChunks[chunkIdx];
      if (!chunk) return null;
      return (
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => <h1 className="text-xl font-heading font-bold text-foreground mt-2 mb-3 pb-2 border-b border-secondary/20">{children}</h1>,
              h2: ({ children }) => <h2 className="text-lg font-heading font-semibold text-foreground mt-3 mb-2 flex items-center gap-2"><span className="w-1 h-5 bg-secondary rounded-full" />{children}</h2>,
              h3: ({ children }) => <h3 className="text-base font-heading font-medium text-foreground mt-3 mb-2">{children}</h3>,
              p: ({ children }) => <p className="text-sm text-muted-foreground leading-[1.8] mb-3">{children}</p>,
              strong: ({ children }) => <strong className="font-semibold text-foreground bg-secondary/10 px-1 rounded">{children}</strong>,
              ul: ({ children }) => <ul className="space-y-2 my-3 ml-1">{children}</ul>,
              ol: ({ children }) => <ol className="space-y-2 my-3 ml-1 list-none">{children}</ol>,
              li: ({ children }) => <li className="flex items-start gap-2 text-sm text-muted-foreground"><span className="text-secondary mt-0.5 shrink-0">•</span><span>{children}</span></li>,
              table: ({ children }) => <div className="overflow-x-auto my-3 rounded-lg border border-border"><table className="w-full text-xs border-collapse">{children}</table></div>,
              thead: ({ children }) => <thead className="bg-secondary/10">{children}</thead>,
              th: ({ children }) => <th className="px-3 py-2 text-left font-semibold text-foreground border-b border-border">{children}</th>,
              tbody: ({ children }) => <tbody className="divide-y divide-border">{children}</tbody>,
              tr: ({ children }) => <tr className="hover:bg-muted/30 transition-colors">{children}</tr>,
              td: ({ children }) => <td className="px-3 py-2 text-muted-foreground">{children}</td>,
              blockquote: ({ children }) => <blockquote className="border-l-3 border-secondary bg-secondary/5 pl-4 py-2 my-4 rounded-r-lg italic text-muted-foreground">{children}</blockquote>,
            }}
          >
            {chunk.body}
          </ReactMarkdown>
        </div>
      );
    }

    case 'keypoint':
      return (
        <div className="space-y-3">
          {lesson.keyPoints.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3 p-3 bg-accent/5 border border-accent/20 rounded-xl"
            >
              <div className="w-7 h-7 rounded-full bg-accent/20 text-accent text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                {i + 1}
              </div>
              <p className="text-sm text-foreground leading-relaxed">{point}</p>
            </motion.div>
          ))}
        </div>
      );

    case 'vocabulary':
      return (
        <div className="space-y-2">
          {lesson.vocabularyTable?.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-3 bg-card border border-border rounded-xl"
            >
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-heading font-bold text-foreground">{entry.term}</span>
                {entry.pronunciation && <span className="text-xs text-muted-foreground italic">[{entry.pronunciation}]</span>}
              </div>
              <p className="text-sm text-secondary font-medium mt-0.5">{entry.meaning}</p>
              {entry.greekRoot && <p className="text-xs text-muted-foreground mt-1">Greek: <span className="font-serif italic">{entry.greekRoot}</span></p>}
              {entry.latinRoot && <p className="text-xs text-muted-foreground">Latin: <span className="font-serif italic">{entry.latinRoot}</span></p>}
              {entry.derivatives && <p className="text-xs text-muted-foreground mt-1">→ {entry.derivatives}</p>}
            </motion.div>
          ))}
        </div>
      );

    case 'source': {
      const sourceIdx = parseInt(card.id.split('-')[1] || '0');
      const excerpt = lesson.primarySourceExcerpts?.[sourceIdx];
      if (!excerpt) return null;
      return (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Quote className="w-3 h-3" />
            <a href={normalizeExternalUrl(excerpt.sourceUrl)} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors flex items-center gap-1">
              {excerpt.source} <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          {excerpt.originalText && (
            <div className="p-4 bg-muted/50 rounded-xl border border-border">
              <p className="text-xs text-muted-foreground mb-1 font-medium">Original Text</p>
              <p className="text-sm text-foreground font-serif italic whitespace-pre-line leading-relaxed">{excerpt.originalText}</p>
            </div>
          )}
          <div className="p-4 bg-card rounded-xl border border-border">
            <p className="text-xs text-muted-foreground mb-1 font-medium">{excerpt.originalText ? 'Translation' : 'Text'}</p>
            <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{excerpt.translatedText}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1 font-medium flex items-center gap-1"><BookOpen className="w-3 h-3" /> Context</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{excerpt.context}</p>
          </div>
          {excerpt.discussionQuestions?.length ? (
            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2 font-medium">Discussion Questions</p>
              {excerpt.discussionQuestions.map((q, qi) => (
                <p key={qi} className="text-xs text-muted-foreground mb-1"><span className="text-accent font-bold">{qi + 1}.</span> {q}</p>
              ))}
            </div>
          ) : null}
        </div>
      );
    }

    case 'classical':
      return (
        <div className="space-y-3">
          {lesson.classicalConnections?.map((conn, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-xl p-4"
            >
              <div className="flex items-start gap-3">
                <div className={`shrink-0 w-12 h-12 rounded-lg flex flex-col items-center justify-center ${
                  conn.language === 'Greek' ? 'bg-blue-900/30' : conn.language === 'Latin' ? 'bg-purple-900/30' : 'bg-indigo-900/30'
                }`}>
                  <span className="text-lg">{conn.language === 'Greek' ? '🏛️' : '📜'}</span>
                  <span className="text-[8px] font-bold uppercase tracking-wide text-muted-foreground">{conn.language}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap mb-1">
                    <span className="font-heading font-bold text-foreground">{conn.term}</span>
                    <span className="text-muted-foreground">←</span>
                    <span className="font-serif italic text-secondary">{conn.original}</span>
                  </div>
                  <p className="text-xs font-medium text-secondary">"{conn.meaning}"</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{conn.usage}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      );

    case 'exercise':
      return (
        <div className="space-y-2">
          {lesson.exercises?.map((exercise, i) => {
            const cleanInstruction = exercise.instruction
              .replace(/^(Day \d+|Proposition \d+|Step \d+|Experiment \d+|Problem Set [A-Z](\s*\([^)]*\))?|Set [A-Z](\s*\([^)]*\))?|Translation Set [A-Z]|Flashcard Creation|Daily (Practice|Drill|Logic Journal)|Oral Practice|Pronunciation Practice|Historical Research|Fallacy Hunt Day \d+-\d+|Grammar Analysis|Writing Exercise|Vocabulary( Mastery)?|Case (Identification|Matching)|Word Order Exercise|Weekly Challenge|Neutralization Experiment|Lab Report|Element (Memorization|Research Project)|Group Analysis|Curie Biography|Periodic Trends|Teaching Exercise|Self-Reflection|Debate Preparation|Rewrite Exercise|Fallacy Flashcards|Calculation Set(\s*\([^)]*\))?|Third Law Analysis|Law (Analysis|Identification)|Extension Challenge|Method Comparison|Discriminant Analysis|Graphing Connection|Real-World Application|Error Analysis|Create Your Own|Deduction Examples|Induction Examples|Black Swan Exercise|Scientific Method Analysis|Compare & Contrast|Exception Practice|Parsing Practice|Declension Drill|Elevator Experiment|Light Beam Chase|Twin Paradox Diagram|Video Study|Design Your Own)\s*:\s*/, '');
            return (
              <div key={i} className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl">
                <div className="w-7 h-7 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-secondary">{i + 1}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{cleanInstruction}</p>
              </div>
            );
          })}
        </div>
      );

    case 'interactive':
      return (
        <div className="space-y-4">
          {interactiveExercises?.matching && (
            <MatchingExercise pairs={interactiveExercises.matching.pairs} instruction={interactiveExercises.matching.instruction} onComplete={() => {}} />
          )}
          {interactiveExercises?.ordering && (
            <OrderingExercise items={interactiveExercises.ordering.items} instruction={interactiveExercises.ordering.instruction} onComplete={() => {}} />
          )}
          {interactiveExercises?.stepByStep && (
            <StepByStepExercise title="Practice" problem="" steps={interactiveExercises.stepByStep.steps} onComplete={() => {}} />
          )}
          {interactiveExercises?.calculator && (
            <CalculatorExercise
              title="Calculate"
              instruction={interactiveExercises.calculator.instruction || ''}
              formula={interactiveExercises.calculator.formula}
              formulaDisplay={interactiveExercises.calculator.formulaDisplay}
              variables={interactiveExercises.calculator.variables}
              targetQuestion={interactiveExercises.calculator.targetQuestion}
              targetAnswer={interactiveExercises.calculator.targetAnswer}
              onComplete={() => {}}
            />
          )}
        </div>
      );

    case 'realworld':
      return (
        <div className="bg-gradient-to-br from-green-500/10 to-accent/5 border border-green-500/25 rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-3 right-4 text-3xl opacity-15">🎉</div>
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
              <Trophy className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-green-400 mb-2 flex items-center gap-1">
                <Star className="w-3 h-3" /> Now You Can…
              </p>
              <p className="text-base text-foreground leading-relaxed font-medium">
                {lesson.realWorldUse}
              </p>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
