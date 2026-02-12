import { motion } from 'framer-motion';
import { Sparkles, BookOpen, ArrowRight, Users, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { usePathProgress } from '@/contexts/PathProgressContext';
import { getAllPathLessons } from '@/data/pathCurriculum';

export const PathHeroCard = () => {
  const navigate = useNavigate();
  const { getCompletedCount } = usePathProgress();
  
  const allLessons = getAllPathLessons();
  const completedCount = getCompletedCount();
  const progressPercent = allLessons.length > 0 
    ? Math.round((completedCount / allLessons.length) * 100) 
    : 0;

  const benefits = [
    { icon: Users, text: "For adults & children (ages 5+)" },
    { icon: BookOpen, text: "200+ lessons with primary sources" },
    { icon: Bot, text: "AI tutor for guided assistance" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4 relative overflow-hidden rounded-2xl"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-accent/80" />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/30 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/30 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative p-6 text-primary-foreground">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1.5 bg-secondary/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-xs font-mono font-semibold text-secondary">THE PATH</span>
          </div>
        </div>

        {/* Main headline */}
        <h2 className="font-heading text-2xl font-bold leading-tight mb-2">
          Master What History's
          <br />
          <span className="text-secondary">Greatest Minds</span> Learned
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-cream/80 mb-5 leading-relaxed">
          A classical curriculum distilled from the education of Newton, Einstein, 
          da Vinci, and more — structured for modern learners.
        </p>

        {/* Benefits */}
        <div className="space-y-2 mb-5">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-center gap-2"
            >
              <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center">
                <benefit.icon className="w-3.5 h-3.5 text-secondary" />
              </div>
              <span className="text-sm text-cream/90">{benefit.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Progress bar (only show if started) */}
        {completedCount > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-cream/70">Your Progress</span>
              <span className="font-mono text-secondary font-semibold">{progressPercent}%</span>
            </div>
            <div className="h-2 bg-cream/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full bg-secondary rounded-full"
              />
            </div>
            <p className="text-[10px] text-cream/50 mt-1">
              {completedCount} of {allLessons.length} lessons complete
            </p>
          </div>
        )}

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-5 py-3 border-y border-cream/10">
          <div className="text-center">
            <div className="font-mono text-xl font-bold text-secondary">8</div>
            <div className="text-[10px] text-cream/60 uppercase tracking-wide">Stages</div>
          </div>
          <div className="text-center border-x border-cream/10">
            <div className="font-mono text-xl font-bold text-secondary">50+</div>
            <div className="text-[10px] text-cream/60 uppercase tracking-wide">Modules</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-xl font-bold text-secondary">∞</div>
            <div className="text-[10px] text-cream/60 uppercase tracking-wide">Mastery</div>
          </div>
        </div>

        {/* CTA */}
        <Button 
          onClick={() => navigate('/the-path')}
          className="w-full bg-secondary text-secondary-foreground hover:bg-gold-light font-semibold"
          size="lg"
        >
          {completedCount > 0 ? 'Continue The Path' : 'Begin The Path'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>

        {/* Bottom note */}
        <p className="text-center text-[11px] text-cream/50 mt-3">
          Curated from historical biographies & primary sources
        </p>
      </div>
    </motion.div>
  );
};
