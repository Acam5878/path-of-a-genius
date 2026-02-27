import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Sparkles, GraduationCap, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const USER_TYPE_KEY = 'genius-academy-user-type';

interface SegmentConfig {
  userType: string;
  emoji: string;
  headline: string;
  subheadline: string;
  icon: typeof Brain;
  benefits: string[];
  cta: string;
  ctaRoute: string;
  gradient: string;
}

const segments: Record<string, SegmentConfig> = {
  'get-smarter': {
    userType: 'self-improver',
    emoji: '🧠',
    headline: 'Raise your IQ. Seriously.',
    subheadline: 'Take a free IQ test, discover your cognitive strengths, and follow a science-backed plan to get measurably smarter.',
    icon: Brain,
    benefits: [
      'Free IQ assessment across 6 intelligence types',
      'Personalised brain training plan',
      'Average improvement: 12 IQ points in 90 days',
      'Track your progress with real metrics',
    ],
    cta: 'Take My Free IQ Test',
    ctaRoute: '/iq-tests?start=verbal',
    gradient: 'from-blue-600/20 to-purple-600/20',
  },
  learn: {
    userType: 'curious-learner',
    emoji: '✨',
    headline: 'Stop scrolling. Start thinking.',
    subheadline: 'Bite-sized lessons from Einstein, Da Vinci, and history\'s greatest minds. Replace your doom-scroll with ideas that actually matter.',
    icon: Sparkles,
    benefits: [
      '2-minute lessons from genius thinkers',
      'Philosophy, science, mathematics & art',
      'Swipe-through discovery feed',
      '3× better knowledge retention',
    ],
    cta: 'Start Exploring',
    ctaRoute: '/feed',
    gradient: 'from-amber-600/20 to-orange-600/20',
  },
  study: {
    userType: 'student',
    emoji: '📚',
    headline: 'Learn what the greats learned.',
    subheadline: 'Ancient Greek, Logic, Mathematics, Natural Philosophy — the foundations that Newton, Einstein, and Da Vinci built their genius on.',
    icon: GraduationCap,
    benefits: [
      '200+ structured lessons across 8 stages',
      'Classical curriculum used by history\'s geniuses',
      'Interactive exercises & spaced repetition',
      'AI tutor for personalised guidance',
    ],
    cta: 'Start The Path',
    ctaRoute: '/the-path',
    gradient: 'from-emerald-600/20 to-teal-600/20',
  },
  'for-parents': {
    userType: 'parent',
    emoji: '👨‍👩‍👧',
    headline: 'Give your child an unfair advantage.',
    subheadline: 'Age-appropriate IQ tests and a structured learning path designed by cognitive scientists. Safe, ad-free, and actually educational.',
    icon: Users,
    benefits: [
      'Children\'s IQ tests designed for ages 6-14',
      'Safe, ad-free learning environment',
      '+22% problem-solving improvement in 30 days',
      'Builds genuine reasoning skills, not just memorisation',
    ],
    cta: "See Children's Tests",
    ctaRoute: '/iq-tests',
    gradient: 'from-pink-600/20 to-rose-600/20',
  },
};

const SegmentLanding = () => {
  const { segment } = useParams<{ segment: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const config = segment ? segments[segment] : null;

  useEffect(() => {
    if (!config) {
      navigate('/', { replace: true });
      return;
    }
    // Pre-set user type for personalisation downstream
    localStorage.setItem(USER_TYPE_KEY, config.userType);
  }, [config, navigate]);

  if (!config) return null;

  const Icon = config.icon;

  const handleCta = () => {
    if (user) {
      navigate(config.ctaRoute);
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero */}
      <div className={`relative flex-1 flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-br ${config.gradient}`}>
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
          className="text-6xl mb-6"
        >
          {config.emoji}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-heading text-3xl sm:text-4xl font-bold text-foreground text-center max-w-lg leading-tight"
        >
          {config.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground text-center max-w-md mt-4 text-base leading-relaxed"
        >
          {config.subheadline}
        </motion.p>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 space-y-3 w-full max-w-sm"
        >
          {config.benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-start gap-3"
            >
              <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">{benefit}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-10 w-full max-w-sm"
        >
          <Button
            onClick={handleCta}
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-14 text-base font-semibold rounded-2xl"
          >
            {config.cta}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <p className="text-center text-xs text-muted-foreground mt-3">
            Free to start · No credit card required
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SegmentLanding;
