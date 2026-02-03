import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PenLine, Save, ChevronDown, ChevronUp, 
  Sparkles, Loader2, MessageCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useTutor } from '@/contexts/TutorContext';
import { cn } from '@/lib/utils';

interface LessonNotesSectionProps {
  localContent: string;
  isLoading: boolean;
  isSaving: boolean;
  hasUnsavedChanges: boolean;
  onUpdateContent: (content: string) => void;
  onSave: () => void;
  lessonTitle: string;
}

export const LessonNotesSection = ({
  localContent,
  isLoading,
  isSaving,
  hasUnsavedChanges,
  onUpdateContent,
  onSave,
  lessonTitle,
}: LessonNotesSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { openTutor, sendMessage, isLoading: tutorLoading } = useTutor();

  const handleAskTutorToSummarize = async () => {
    openTutor();
    await sendMessage(
      `Please summarize the key points from "${lessonTitle}" that I should add to my notes. Format them as bullet points I can copy.`
    );
  };

  const handleAskTutorToExplain = async () => {
    const selectedText = window.getSelection()?.toString();
    if (selectedText) {
      openTutor();
      await sendMessage(
        `Please explain this concept from my notes in more detail: "${selectedText}"`
      );
    } else {
      openTutor();
      await sendMessage(
        `I'm studying "${lessonTitle}". What are the most important concepts I should understand and note down?`
      );
    }
  };

  if (isLoading) {
    return (
      <div className="border border-border rounded-xl overflow-hidden">
        <div className="p-4 flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="border border-emerald-200 dark:border-emerald-800 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-50/50 to-teal-50/30 dark:from-emerald-950/20 dark:to-teal-950/10">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between gap-2 p-3 hover:bg-emerald-100/50 dark:hover:bg-emerald-900/20 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
            <PenLine className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-left">
            <span className="font-semibold text-sm text-foreground">My Notes</span>
            {localContent && (
              <span className="ml-2 text-xs text-muted-foreground">
                ({localContent.split(/\s+/).filter(Boolean).length} words)
              </span>
            )}
          </div>
          {hasUnsavedChanges && (
            <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-[10px] font-medium">
              Unsaved
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {/* Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-3 pt-0 space-y-3">
              {/* Textarea */}
              <Textarea
                value={localContent}
                onChange={(e) => onUpdateContent(e.target.value)}
                placeholder="Take notes on this lesson... Your notes are synced across devices and visible to the AI Tutor for personalized help."
                className={cn(
                  "min-h-[120px] resize-none",
                  "bg-white/80 dark:bg-card/80 border-emerald-200 dark:border-emerald-800",
                  "focus:border-emerald-400 focus:ring-emerald-400/20",
                  "placeholder:text-muted-foreground/60"
                )}
              />

              {/* Actions */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {/* Ask Tutor buttons */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAskTutorToSummarize}
                    disabled={tutorLoading}
                    className="text-xs gap-1.5 border-secondary/30 hover:border-secondary hover:bg-secondary/10"
                  >
                    <Sparkles className="w-3 h-3" />
                    Summarize Key Points
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAskTutorToExplain}
                    disabled={tutorLoading}
                    className="text-xs gap-1.5 border-secondary/30 hover:border-secondary hover:bg-secondary/10"
                  >
                    <MessageCircle className="w-3 h-3" />
                    Ask Tutor
                  </Button>
                </div>

                {/* Save button */}
                <Button
                  onClick={onSave}
                  disabled={isSaving || !hasUnsavedChanges}
                  size="sm"
                  className={cn(
                    "gap-1.5",
                    hasUnsavedChanges 
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {isSaving ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Save className="w-3 h-3" />
                  )}
                  Save
                </Button>
              </div>

              {/* Tip */}
              <p className="text-[10px] text-muted-foreground/70 italic">
                💡 Tip: The AI Tutor can see your notes and provide personalized guidance based on what you've written.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
