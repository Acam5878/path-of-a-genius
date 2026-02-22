import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, BookOpen, Eye, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface PremiumLessonPreviewProps {
  /** First ~100 chars of the lesson content to show */
  previewText: string;
  lessonTitle: string;
  geniusName: string;
  onUpgrade: () => void;
}

/**
 * Shows a blurred preview of premium lesson content with a clear upgrade CTA.
 * Used when free users tap on a premium genius's lesson.
 */
export const PremiumLessonPreview = ({
  previewText,
  lessonTitle,
  geniusName,
  onUpgrade,
}: PremiumLessonPreviewProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {/* Visible preview */}
      <div className="bg-muted/30 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Eye className="w-4 h-4 text-secondary" />
          <span className="text-xs font-mono uppercase tracking-wider text-secondary">Lesson Preview</span>
        </div>
        <p className="text-sm text-foreground leading-relaxed">
          {previewText}
        </p>
      </div>

      {/* Blurred content teaser */}
      <div className="relative">
        <div className="blur-[6px] select-none pointer-events-none bg-muted/20 rounded-xl p-4 space-y-2">
          <p className="text-sm text-foreground leading-relaxed">
            The deeper principles behind this concept reveal connections to mathematics, philosophy, and the natural sciences that {geniusName} spent decades mastering...
          </p>
          <p className="text-sm text-foreground leading-relaxed">
            Key insight: The relationship between theoretical understanding and practical application was central to {geniusName}'s methodology...
          </p>
          <div className="flex gap-2 mt-3">
            <div className="h-8 bg-muted/40 rounded-lg flex-1" />
            <div className="h-8 bg-muted/40 rounded-lg flex-1" />
          </div>
        </div>
        
        {/* Overlay CTA */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-background/95 backdrop-blur-sm border border-secondary/30 rounded-2xl p-5 text-center max-w-xs mx-4 shadow-xl"
          >
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-secondary/15 flex items-center justify-center">
              <Lock className="w-5 h-5 text-secondary" />
            </div>
            <p className="text-sm font-semibold text-foreground mb-1">
              Continue with Premium
            </p>
            <p className="text-xs text-muted-foreground mb-3">
              Unlock {geniusName}'s full curriculum — all lessons, exercises & quizzes
            </p>
            <Button
              onClick={onUpgrade}
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-xl font-bold text-sm py-4"
            >
              <Sparkles className="w-4 h-4 mr-1.5" />
              Unlock Full Lesson
            </Button>
            {!user && (
              <button
                onClick={() => navigate('/auth')}
                className="w-full text-center text-xs text-muted-foreground hover:text-foreground mt-2 py-1"
              >
                Or create a free account first
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
