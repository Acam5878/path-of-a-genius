import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

const REMINDER_DISMISSED_KEY = 'genius-academy-reminder-dismissed';
const REMINDER_SET_KEY = 'genius-academy-reminder-time';
const REMINDER_PROMPT_DELAY = 3; // days after first use

interface ReminderPromptProps {
  open: boolean;
  onClose: () => void;
}

const reminderTimes = [
  { label: "Morning (9:00 AM)", value: "09:00" },
  { label: "Afternoon (2:00 PM)", value: "14:00" },
  { label: "Evening (7:00 PM)", value: "19:00" },
  { label: "Night (9:00 PM)", value: "21:00" },
];

export const ReminderPrompt = ({ open, onClose }: ReminderPromptProps) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleSetReminder = () => {
    if (selectedTime) {
      localStorage.setItem(REMINDER_SET_KEY, selectedTime);
      toast.success('Daily reminder set!', {
        description: `We'll remind you to learn at ${reminderTimes.find(t => t.value === selectedTime)?.label.split(' (')[0]}`,
      });
      onClose();
    }
  };

  const handleDismiss = () => {
    localStorage.setItem(REMINDER_DISMISSED_KEY, 'true');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleDismiss()}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-secondary/20">
              <Bell className="w-5 h-5 text-secondary" />
            </div>
            <DialogTitle className="font-heading text-xl">Daily Learning Reminder</DialogTitle>
          </div>
        </DialogHeader>

        <p className="text-muted-foreground text-sm mb-4">
          Consistent practice builds genius. Choose a time for your daily learning reminder.
        </p>

        <div className="grid grid-cols-2 gap-2 mb-6">
          {reminderTimes.map((time) => (
            <motion.button
              key={time.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedTime(time.value)}
              className={`p-3 rounded-xl border transition-all text-left ${
                selectedTime === time.value
                  ? 'border-secondary bg-secondary/10 text-foreground'
                  : 'border-border bg-muted/50 text-muted-foreground hover:border-muted-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">{time.label.split(' (')[0]}</span>
              </div>
              <span className="text-xs opacity-70">{time.label.match(/\((.*?)\)/)?.[1]}</span>
            </motion.button>
          ))}
        </div>

        <div className="flex gap-3">
          <Button
            variant="ghost"
            onClick={handleDismiss}
            className="flex-1 text-muted-foreground"
          >
            Not now
          </Button>
          <Button
            onClick={handleSetReminder}
            disabled={!selectedTime}
            className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            Set Reminder
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Hook to check if reminder prompt should be shown
export const useReminderPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(REMINDER_DISMISSED_KEY);
    const alreadySet = localStorage.getItem(REMINDER_SET_KEY);
    const firstVisit = localStorage.getItem('genius-academy-first-visit');

    if (dismissed || alreadySet) {
      return;
    }

    // Set first visit if not set
    if (!firstVisit) {
      localStorage.setItem('genius-academy-first-visit', new Date().toISOString());
      return;
    }

    // Check if enough days have passed
    const firstVisitDate = new Date(firstVisit);
    const daysSinceFirstVisit = Math.floor(
      (Date.now() - firstVisitDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceFirstVisit >= REMINDER_PROMPT_DELAY) {
      // Small delay to not show immediately
      const timer = setTimeout(() => setShowPrompt(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return { showPrompt, setShowPrompt };
};
