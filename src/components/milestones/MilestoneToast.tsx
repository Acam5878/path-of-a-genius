import { motion } from 'framer-motion';
import { Trophy, Star, Flame, BookOpen, Brain, Award, Zap } from 'lucide-react';
import { toast } from 'sonner';

export type MilestoneType = 
  | 'first_lesson' 
  | 'first_iq_test' 
  | 'week_streak' 
  | 'five_lessons' 
  | 'ten_lessons'
  | 'month_streak'
  | 'first_subject_complete';

interface MilestoneConfig {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

const milestoneConfigs: Record<MilestoneType, MilestoneConfig> = {
  first_lesson: {
    icon: BookOpen,
    title: "First Steps!",
    description: "You completed your first lesson. The journey begins!",
    color: "text-secondary",
    bgColor: "bg-secondary/20",
  },
  first_iq_test: {
    icon: Brain,
    title: "Mind Measured!",
    description: "You completed your first IQ test. Keep training!",
    color: "text-accent",
    bgColor: "bg-accent/20",
  },
  week_streak: {
    icon: Flame,
    title: "7-Day Streak!",
    description: "A full week of learning. You're building momentum!",
    color: "text-orange-500",
    bgColor: "bg-orange-500/20",
  },
  month_streak: {
    icon: Star,
    title: "30-Day Legend!",
    description: "A month of daily learning. You're unstoppable!",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/20",
  },
  five_lessons: {
    icon: Zap,
    title: "Knowledge Seeker!",
    description: "5 lessons completed. Your mind is expanding!",
    color: "text-primary",
    bgColor: "bg-primary/20",
  },
  ten_lessons: {
    icon: Award,
    title: "Dedicated Scholar!",
    description: "10 lessons mastered. Impressive dedication!",
    color: "text-secondary",
    bgColor: "bg-secondary/20",
  },
  first_subject_complete: {
    icon: Trophy,
    title: "Subject Mastery!",
    description: "You completed an entire subject. Outstanding!",
    color: "text-secondary",
    bgColor: "bg-secondary/20",
  },
};

const MilestoneContent = ({ type }: { type: MilestoneType }) => {
  const config = milestoneConfigs[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex items-center gap-4"
    >
      <motion.div
        initial={{ rotate: -180, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        className={`p-3 rounded-xl ${config.bgColor}`}
      >
        <Icon className={`w-6 h-6 ${config.color}`} />
      </motion.div>
      <div>
        <p className="font-heading font-semibold text-foreground">{config.title}</p>
        <p className="text-sm text-muted-foreground">{config.description}</p>
      </div>
    </motion.div>
  );
};

export const showMilestoneToast = (type: MilestoneType) => {
  toast.custom(
    () => <MilestoneContent type={type} />,
    {
      duration: 5000,
      position: 'top-center',
      style: {
        background: 'hsl(var(--card))',
        border: '1px solid hsl(var(--border))',
        borderRadius: '16px',
        padding: '16px',
        boxShadow: '0 10px 40px -10px hsl(var(--primary) / 0.3)',
      },
    }
  );
};

// Check and trigger milestones based on user progress
export const checkMilestones = (
  completedLessonsCount: number,
  completedTestsCount: number,
  currentStreak: number,
  completedSubjectsCount: number,
  previousState: {
    lessons: number;
    tests: number;
    streak: number;
    subjects: number;
  }
) => {
  // First lesson
  if (completedLessonsCount === 1 && previousState.lessons === 0) {
    showMilestoneToast('first_lesson');
    return 'first_lesson';
  }
  
  // First IQ test
  if (completedTestsCount === 1 && previousState.tests === 0) {
    showMilestoneToast('first_iq_test');
    return 'first_iq_test';
  }
  
  // 5 lessons
  if (completedLessonsCount >= 5 && previousState.lessons < 5) {
    showMilestoneToast('five_lessons');
    return 'five_lessons';
  }
  
  // 10 lessons
  if (completedLessonsCount >= 10 && previousState.lessons < 10) {
    showMilestoneToast('ten_lessons');
    return 'ten_lessons';
  }
  
  // Week streak
  if (currentStreak >= 7 && previousState.streak < 7) {
    showMilestoneToast('week_streak');
    return 'week_streak';
  }
  
  // Month streak
  if (currentStreak >= 30 && previousState.streak < 30) {
    showMilestoneToast('month_streak');
    return 'month_streak';
  }
  
  // First subject complete
  if (completedSubjectsCount >= 1 && previousState.subjects === 0) {
    showMilestoneToast('first_subject_complete');
    return 'first_subject_complete';
  }
  
  return null;
};
