import React from 'react';
import { useState, useEffect, useMemo, useRef } from 'react';
import { Capacitor } from '@capacitor/core';
import { useNavigate } from 'react-router-dom';

import { motion, AnimatePresence } from 'framer-motion';
import { FirstLessonWelcome } from './FirstLessonWelcome';
import { GreekAlphabetFlashcards } from './GreekAlphabetFlashcards';
import { 
  X, Check, BookOpen, Video, ExternalLink, 
  Play, ClipboardList, Table, ChevronDown, ChevronUp,
  Link2, ListOrdered, Sparkles, Quote, MessageCircle, Scroll, Languages,
  Puzzle, GitBranch, Calculator, LogIn, Trophy, Flame, Star, Target, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PathLesson } from '@/data/pathCurriculum';
import { getPathInteractiveExercises } from '@/data/pathInteractiveExercises';
import { cn } from '@/lib/utils';
import { normalizeExternalUrl } from '@/lib/externalLinks';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LessonNotesSection } from './LessonNotesSection';
import { useLessonNotes } from '@/hooks/useLessonNotes';
import { useTutor } from '@/contexts/TutorContext';
import { useAuth } from '@/contexts/AuthContext';
import { MatchingExercise, OrderingExercise, CalculatorExercise, StepByStepExercise } from '@/components/exercises';
import { LessonPreviewCards } from './LessonPreviewCards';
import { BrainRegionCard } from '@/components/brain/BrainRegionCard';
import { LessonCardFlow } from './LessonCardFlow';

interface PathLessonDetailModalProps {
  lesson: PathLesson | null;
  moduleId?: string;
  moduleName?: string;
  moduleIcon?: string;
  isOpen: boolean;
  onClose: () => void;
  isCompleted: boolean;
  onToggleComplete: (lessonId: string) => void;
}

// Helper to generate a recommended learning flow based on lesson content
const generateLearningFlow = (lesson: PathLesson) => {
  const steps: { step: number; action: string; icon: 'video' | 'book' | 'content' | 'vocab' | 'exercise' | 'notes' | 'tutor' }[] = [];
  let stepNum = 1;

  const videos = lesson.resources?.filter(r => r.type === 'video') || [];
  if (videos.length > 0) {
    steps.push({ step: stepNum++, action: `Watch the video${videos.length > 1 ? 's' : ''} below to get started`, icon: 'video' });
  }

  steps.push({ step: stepNum++, action: 'Read through the lesson content', icon: 'content' });

  if (lesson.vocabularyTable && lesson.vocabularyTable.length > 0) {
    steps.push({ step: stepNum++, action: `Study the ${lesson.vocabularyTable.length} vocabulary terms`, icon: 'vocab' });
  }

  if (lesson.exercises && lesson.exercises.length > 0) {
    steps.push({ step: stepNum++, action: `Complete the ${lesson.exercises.length} exercises`, icon: 'exercise' });
  }

  // Always include notes and tutor steps
  steps.push({ step: stepNum++, action: 'Make notes as you go', icon: 'notes' });
  steps.push({ step: stepNum++, action: 'Ask the Tutor for help at any point', icon: 'tutor' });

  const books = lesson.resources?.filter(r => r.type === 'book' || r.type === 'article') || [];
  if (books.length > 0) {
    steps.push({ step: stepNum++, action: 'Explore additional reading for deeper understanding', icon: 'book' });
  }

  return steps;
};

export const PathLessonDetailModal = ({
  lesson,
  moduleId,
  moduleName,
  moduleIcon,
  isOpen,
  onClose,
  isCompleted,
  onToggleComplete
}: PathLessonDetailModalProps) => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [showCompletionCelebration, setShowCompletionCelebration] = useState(false);
  const prevCompleted = useRef(isCompleted);
  
  const { setLessonContext, openTutor } = useTutor();
  
  // Notes hook
  const {
    localContent: notesContent,
  } = useLessonNotes(lesson?.id, moduleId);

  // Show welcome/flashcard screen when opening a first lesson (order === 1) for the first time
  useEffect(() => {
    if (lesson && isOpen) {
      const storageKey = `first-lesson-seen-${lesson.id}`;
      const hasSeen = localStorage.getItem(storageKey);
      if (lesson.order === 1 && !hasSeen && !isCompleted) {
        setShowWelcome(true);
        setShowFlashcards(false);
      } else {
        setShowWelcome(false);
        setShowFlashcards(false);
      }
    }
  }, [lesson?.id, isOpen]);

  // Detect when lesson is first marked complete → trigger celebration
  useEffect(() => {
    if (isCompleted && !prevCompleted.current && isOpen) {
      setShowCompletionCelebration(true);
    }
    prevCompleted.current = isCompleted;
  }, [isCompleted, isOpen]);

  // Update tutor context with notes
  useEffect(() => {
    if (lesson && isOpen) {
      setLessonContext({
        geniusId: moduleId || 'path',
        geniusName: moduleName || 'The Path',
        subjectId: moduleId || 'general',
        subjectName: moduleName || 'General Studies',
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        lessonContent: lesson.content,
        userNotes: notesContent,
      });
    }
  }, [lesson, isOpen, moduleId, moduleName, notesContent, setLessonContext]);

  if (!lesson) return null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      modal={false}
    >
      <DialogContent
        className="no-default-close max-w-2xl lg:max-w-5xl xl:max-w-6xl max-h-[90vh] p-0 gap-0 overflow-hidden z-50 flex flex-col"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        onFocusOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="p-4 pb-2 border-b border-border bg-card shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <DialogTitle className="font-heading text-lg font-semibold text-foreground pr-2">
                  {lesson.title}
                </DialogTitle>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openTutor();
                  }}
                  className="shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-secondary hover:scale-105 transition-transform"
                  aria-label="Ask AI Tutor about this lesson"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-secondary-foreground" />
                  <span className="text-[10px] font-medium text-secondary-foreground whitespace-nowrap">Ask if unsure</span>
                </button>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs text-muted-foreground">
                  {lesson.estimatedMinutes} min
                </p>
                {isCompleted && (
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-success/10 text-success flex items-center gap-1">
                    <Check className="w-3 h-3" /> Done
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
              aria-label="Close lesson"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </DialogHeader>

        <LessonErrorBoundary>
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain relative">
          {/* Completion Celebration Overlay */}
          <AnimatePresence>
            {showCompletionCelebration && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 flex flex-col items-center justify-center text-center p-8 bg-card/95 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                  className="text-7xl mb-4"
                >
                  🏆
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-3 max-w-xs"
                >
                  <div className="flex justify-center gap-1 mb-2">
                    {[0, 1, 2, 3, 4].map(i => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
                        className="text-2xl"
                      >⭐</motion.span>
                    ))}
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-foreground">
                    Lesson Complete!
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    You've taken a real step on the path. Every genius started exactly where you are — one lesson at a time.
                  </p>

                  {/* Feed unlock nudge */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-gradient-to-r from-secondary/15 to-accent/10 border border-secondary/30 rounded-xl p-3 text-left"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-lg flex-shrink-0">📰</span>
                      <div>
                        <p className="text-xs font-semibold text-foreground mb-0.5">
                          Unlocked in your Daily Feed
                        </p>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                          This topic now appears in your personalised feed. Every lesson you complete builds your unique intellectual newspaper.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <div className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-xl p-3">
                    <p className="text-xs text-foreground font-medium">
                      <span className="text-secondary">💡 Remember:</span> Just 10 minutes a day compounds into extraordinary knowledge. Mill did it. Einstein did it. You're doing it.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-6"
                >
                  <Button
                    onClick={() => setShowCompletionCelebration(false)}
                    className="bg-secondary text-secondary-foreground h-12 px-8 rounded-xl font-semibold"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Keep Going →
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* First lesson welcome screen */}
          {showWelcome ? (
            <FirstLessonWelcome
              lesson={lesson}
              moduleName={moduleName || lesson.moduleId}
              moduleIcon={moduleIcon || '📚'}
              onContinue={() => {
                if (lesson.id === 'greek-alphabet') {
                  setShowWelcome(false);
                  setShowFlashcards(true);
                } else {
                  localStorage.setItem(`first-lesson-seen-${lesson.id}`, 'true');
                  setShowWelcome(false);
                }
              }}
            />
          ) : showFlashcards ? (
            <GreekAlphabetFlashcards
              onComplete={() => {
                localStorage.setItem(`first-lesson-seen-${lesson.id}`, 'true');
                setShowFlashcards(false);
              }}
            />
          ) : (
          <LessonCardFlow
              lesson={lesson}
              onComplete={() => {
                try { navigator.vibrate?.(40); } catch {}
                onToggleComplete(lesson.id);
              }}
              onAskTutor={openTutor}
            />
          )}
        </div>
        </LessonErrorBoundary>
      </DialogContent>
    </Dialog>
  );
};
// Lesson Footer with auth-aware Mark Complete button
const LessonFooter = ({
  lessonId,
  isCompleted,
  onToggleComplete,
  onClose,
}: {
  lessonId: string;
  isCompleted: boolean;
  onToggleComplete: (id: string) => void;
  onClose: () => void;
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="p-4 border-t border-border bg-card flex items-center justify-between gap-3 shrink-0">
      <Button variant="outline" onClick={onClose} className="flex-1">
        Close
      </Button>
      {user ? (
        <Button
          onClick={() => {
            // Haptic feedback: native vibration API (works on iOS/Android via Capacitor WebView)
            try { navigator.vibrate?.(40); } catch {}
            onToggleComplete(lessonId);
          }}
          className={cn(
            "flex-1",
            isCompleted
              ? "bg-success text-success-foreground hover:bg-success/90"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
          )}
        >
          {isCompleted ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Completed
            </>
          ) : (
            'Mark Complete'
          )}
        </Button>
      ) : (
        <Button
          onClick={() => navigate('/auth')}
          className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
        >
          <LogIn className="w-4 h-4 mr-2" />
          Sign in to save progress
        </Button>
      )}
    </div>
  );
};

// Collapsible Section Component
const CollapsibleSection = ({ 
  title, 
  icon, 
  isExpanded, 
  onToggle, 
  children 
}: { 
  title: string; 
  icon: React.ReactNode; 
  isExpanded: boolean; 
  onToggle: () => void;
  children: React.ReactNode;
}) => (
  <div className="border border-border rounded-xl overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between gap-2 p-3 bg-muted/30 hover:bg-muted/50 transition-colors"
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-semibold text-sm text-foreground">{title}</span>
      </div>
      {isExpanded ? (
        <ChevronUp className="w-4 h-4 text-muted-foreground" />
      ) : (
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      )}
    </button>
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="p-3 pt-0">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// Error boundary to prevent white screens from crashing the entire app
class LessonErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    console.error('Lesson content render error:', error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">Something went wrong loading this content.</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="text-sm text-secondary underline"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
