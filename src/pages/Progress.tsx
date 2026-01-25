import { motion } from 'framer-motion';
import { Flame, Clock, BookOpen, Trophy, Lock, Crown, Target, TrendingUp } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/cards/StatCard';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Simulated data
const achievements = [
  { id: '1', name: 'First Steps', description: 'Add your first subject', icon: '🎯', earned: true, date: 'Jan 10' },
  { id: '2', name: 'Polyglot Path', description: 'Study 2+ languages', icon: '🗣️', earned: true, date: 'Jan 15' },
  { id: '3', name: 'Renaissance Mind', description: 'Study 3+ disciplines', icon: '🎨', earned: false, progress: 2, max: 3 },
  { id: '4', name: 'Century Scholar', description: '100 hours total', icon: '📚', earned: false, progress: 24, max: 100 },
  { id: '5', name: 'Mill\'s Prodigy', description: 'Complete Mill\'s age 3-5 curriculum', icon: '🧒', earned: false },
  { id: '6', name: 'Consistency King', description: '30 day streak', icon: '👑', earned: false, progress: 7, max: 30 },
];

const heatmapData = Array.from({ length: 90 }, (_, i) => ({
  date: new Date(Date.now() - (89 - i) * 24 * 60 * 60 * 1000),
  intensity: Math.random() > 0.3 ? Math.floor(Math.random() * 4) : 0,
}));

const timeBySubject = [
  { name: 'Ancient Greek', hours: 12, color: 'bg-blue-500' },
  { name: 'Latin', hours: 8, color: 'bg-green-500' },
  { name: 'Logic', hours: 4, color: 'bg-purple-500' },
];

const Progress = () => {
  return (
    <AppLayout>
      <Header 
        title="Progress"
        rightActions={
          <Button variant="ghost" size="sm" className="text-xs text-secondary">
            This Week
          </Button>
        }
      />

      <div className="py-4 space-y-6">
        {/* Hero Stats */}
        <div className="px-4 grid grid-cols-3 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <StatCard icon={Flame} value="7" label="Day Streak" sublabel="Best: 12" variant="accent" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <StatCard icon={Clock} value="24.5" label="Total Hours" sublabel="This month" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StatCard icon={BookOpen} value="3/7" label="Subjects" sublabel="Complete" />
          </motion.div>
        </div>

        {/* Activity Heatmap */}
        <Section title="Study Activity">
          <div className="px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-xl border border-border p-4"
            >
              <p className="text-xs text-muted-foreground mb-3">Last 90 days</p>
              <div className="grid grid-cols-13 gap-1">
                {heatmapData.map((day, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-full aspect-square rounded-sm",
                      day.intensity === 0 && "bg-muted",
                      day.intensity === 1 && "bg-secondary/30",
                      day.intensity === 2 && "bg-secondary/60",
                      day.intensity >= 3 && "bg-secondary"
                    )}
                    title={`${day.date.toLocaleDateString()}: ${day.intensity} hours`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-end gap-2 mt-3 text-xs text-muted-foreground">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-sm bg-muted" />
                  <div className="w-3 h-3 rounded-sm bg-secondary/30" />
                  <div className="w-3 h-3 rounded-sm bg-secondary/60" />
                  <div className="w-3 h-3 rounded-sm bg-secondary" />
                </div>
                <span>More</span>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Time by Subject */}
        <Section title="Time by Subject">
          <div className="px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-xl border border-border p-4 space-y-3"
            >
              {timeBySubject.map((subject, i) => (
                <div key={subject.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{subject.name}</span>
                    <span className="font-mono text-muted-foreground">{subject.hours}h</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(subject.hours / 12) * 100}%` }}
                      transition={{ duration: 0.8, delay: i * 0.2 }}
                      className={cn("h-full rounded-full", subject.color)}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </Section>

        {/* Genius Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-border p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-secondary" />
            <h3 className="font-heading font-semibold text-foreground">Genius Comparison</h3>
          </div>
          <p className="text-sm text-foreground">You're studying like...</p>
          <p className="text-lg font-heading font-bold text-foreground mt-1">
            John Stuart Mill's age 8-10 curriculum
          </p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '73%' }}
                transition={{ duration: 1 }}
                className="h-full bg-secondary rounded-full"
              />
            </div>
            <span className="font-mono text-sm text-secondary font-bold">73%</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">match</p>
        </motion.div>

        {/* Achievements */}
        <Section title="Achievements">
          <div className="px-4 grid grid-cols-2 gap-3">
            {achievements.map((achievement, i) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "rounded-xl p-4 text-center relative overflow-hidden",
                  achievement.earned
                    ? "bg-secondary/10 border border-secondary/20"
                    : "bg-card border border-border"
                )}
              >
                {!achievement.earned && (
                  <div className="absolute top-2 right-2">
                    <Lock className="w-3 h-3 text-muted-foreground" />
                  </div>
                )}
                <span className="text-3xl">{achievement.icon}</span>
                <h4 className={cn(
                  "font-semibold text-sm mt-2",
                  achievement.earned ? "text-foreground" : "text-muted-foreground"
                )}>
                  {achievement.name}
                </h4>
                <p className="text-[10px] text-muted-foreground mt-1">{achievement.description}</p>
                {achievement.earned ? (
                  <p className="text-[10px] text-success mt-2">Earned {achievement.date}</p>
                ) : achievement.progress !== undefined ? (
                  <div className="mt-2">
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-secondary rounded-full"
                        style={{ width: `${(achievement.progress / achievement.max!) * 100}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {achievement.progress}/{achievement.max}
                    </p>
                  </div>
                ) : (
                  <p className="text-[10px] text-muted-foreground mt-2">Locked</p>
                )}
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Premium Upsell */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 gradient-premium rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-5 h-5 text-cream" />
            <span className="font-mono text-xs text-cream">PREMIUM</span>
          </div>
          <h3 className="font-heading font-semibold text-cream">Unlock Advanced Analytics</h3>
          <div className="mt-3 space-y-2 opacity-50">
            <div className="h-8 bg-cream/20 rounded" />
            <div className="h-8 bg-cream/20 rounded" />
          </div>
          <Button className="w-full mt-4 bg-secondary text-secondary-foreground hover:bg-gold-light">
            Upgrade to Premium
          </Button>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Progress;
