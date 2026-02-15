import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useTutor } from '@/contexts/TutorContext';
import { cn } from '@/lib/utils';

interface TutorButtonProps {
  className?: string;
}

export const TutorButton = ({ className }: TutorButtonProps) => {
  const { openTutor, lessonContext } = useTutor();
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const onFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        setKeyboardOpen(true);
      }
    };
    const onFocusOut = () => setKeyboardOpen(false);
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);
    return () => {
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
    };
  }, []);

  if (keyboardOpen) return null;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={(e) => {
        e.stopPropagation();
        openTutor();
      }}
      className={cn(
        "fixed bottom-36 right-4 z-[57] w-14 h-14 rounded-full",
        "bg-secondary shadow-lg",
        "flex items-center justify-center",
        className
      )}
      aria-label="Open AI Tutor"
    >
      <MessageCircle className="w-7 h-7 text-secondary-foreground" />
      {lessonContext && (
        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-success rounded-full ring-2 ring-background animate-pulse" />
      )}
    </motion.button>
  );
};
