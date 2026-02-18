import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FEED_TOPICS, FeedTopic } from '@/data/feedTopics';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const feedValuePoints = [
  {
    emoji: '📱',
    stat: '2+ hours',
    statLabel: 'average daily scroll time',
    body: "Most of it leaves nothing behind. Your attention is the most valuable thing you have — and the default feed is designed to consume it.",
  },
  {
    emoji: '⚡',
    stat: '1 scroll session',
    statLabel: 'can rewire how you think',
    body: "Every card here is a micro-insight from philosophy, science, history, or language. Designed to stick. Designed to compound. Same habit — completely different outcome.",
  },
  {
    emoji: '🧠',
    stat: '300+ ideas',
    statLabel: 'across every subject',
    body: "Curated from history's greatest thinkers. Short enough to read in 30 seconds. Deep enough to change your perspective. This is social media — but for your brain.",
  },
];

interface FeedTopicSetupProps {
  onComplete: (selectedTopics: string[]) => void;
  initialTopics?: string[];
}

type SetupPhase = 'intro' | 'topics';

export const FeedTopicSetup = ({ onComplete, initialTopics = [] }: FeedTopicSetupProps) => {
  const { user } = useAuth();
  const [phase, setPhase] = useState<SetupPhase>('intro');
  const [introStep, setIntroStep] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set(initialTopics));

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selected.size === FEED_TOPICS.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(FEED_TOPICS.map(t => t.id)));
    }
  };

  const handleContinue = async () => {
    const topics = Array.from(selected);
    if (user) {
      await supabase.from('user_feed_preferences').upsert({
        user_id: user.id,
        selected_topics: topics,
      }, { onConflict: 'user_id' });
    }
    onComplete(topics);
  };

  const handleIntroNext = () => {
    if (introStep < feedValuePoints.length - 1) {
      setIntroStep(prev => prev + 1);
    } else {
      setPhase('topics');
    }
  };

  const isLastIntroStep = introStep === feedValuePoints.length - 1;
  const currentPoint = feedValuePoints[introStep];

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-[hsl(217,30%,10%)] to-[hsl(217,30%,18%)] flex flex-col">
      <AnimatePresence mode="wait">

        {/* ── PHASE 1: Feed value intro ── */}
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col flex-1"
          >
            {/* Progress dots */}
            <div
              className="flex-shrink-0 flex justify-center gap-2 px-6"
              style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 20px)', paddingBottom: '12px' }}
            >
              {feedValuePoints.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === introStep ? 'w-8 bg-secondary' : i < introStep ? 'w-4 bg-secondary/50' : 'w-4 bg-white/15'
                  }`}
                />
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={introStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.1 }}
                    className="text-6xl mb-6 block"
                  >
                    {currentPoint.emoji}
                  </motion.span>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-3"
                  >
                    <span className="font-heading text-4xl font-bold text-secondary">{currentPoint.stat}</span>
                    <p className="text-xs font-mono text-white/40 uppercase tracking-widest mt-1">{currentPoint.statLabel}</p>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="text-white/70 text-base leading-relaxed max-w-xs"
                  >
                    {currentPoint.body}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* CTA */}
            <div
              className="flex-shrink-0 px-6"
              style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)' }}
            >
              <Button
                onClick={handleIntroNext}
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-14 text-base font-semibold rounded-xl"
              >
                {isLastIntroStep ? (
                  <>Personalise my feed <Sparkles className="w-4 h-4 ml-2" /></>
                ) : (
                  <>Next <ArrowRight className="w-4 h-4 ml-2" /></>
                )}
              </Button>
              <button
                onClick={() => setPhase('topics')}
                className="w-full mt-3 text-xs text-white/30 hover:text-white/50 transition-colors"
              >
                Skip — go straight to topics
              </button>
            </div>
          </motion.div>
        )}

        {/* ── PHASE 2: Topic picker ── */}
        {phase === 'topics' && (
          <motion.div
            key="topics"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col flex-1"
          >
            {/* Header */}
            <div
              className="flex-shrink-0 px-6 pb-4"
              style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 24px)' }}
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-3"
              >
                <div className="p-2 rounded-xl bg-secondary/20">
                  <Sparkles className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h1 className="text-xl font-heading font-bold text-white">Personalise Your Feed</h1>
                  <p className="text-xs text-white/40">Pick what you want to think about</p>
                </div>
              </motion.div>
            </div>

            {/* Topic grid */}
            <div className="flex-1 min-h-0 overflow-y-auto px-6 pb-4">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                onClick={selectAll}
                className="text-xs font-medium text-secondary mb-4 hover:underline"
              >
                {selected.size === FEED_TOPICS.length ? 'Deselect all' : 'Select all'}
              </motion.button>

              <div className="grid grid-cols-2 gap-3">
                {FEED_TOPICS.map((topic, i) => (
                  <TopicCard
                    key={topic.id}
                    topic={topic}
                    isSelected={selected.has(topic.id)}
                    onToggle={() => toggle(topic.id)}
                    delay={0.04 * i}
                  />
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div
              className="flex-shrink-0 px-6"
              style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)' }}
            >
              <Button
                onClick={handleContinue}
                disabled={selected.size === 0}
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 text-base font-semibold rounded-xl"
              >
                {selected.size === 0
                  ? 'Select at least one topic'
                  : `Start Feed — ${selected.size} topic${selected.size !== 1 ? 's' : ''} selected`}
              </Button>
              <button
                onClick={async () => {
                  if (user) {
                    await supabase.from('user_feed_preferences').upsert({
                      user_id: user.id,
                      selected_topics: [],
                    }, { onConflict: 'user_id' });
                  }
                  onComplete([]);
                }}
                className="w-full mt-3 text-xs text-white/40 hover:text-white/60 transition-colors"
              >
                Skip — show me everything
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TopicCard = ({
  topic,
  isSelected,
  onToggle,
  delay,
}: {
  topic: FeedTopic;
  isSelected: boolean;
  onToggle: () => void;
  delay: number;
}) => (
  <motion.button
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.2 }}
    whileTap={{ scale: 0.96 }}
    onClick={onToggle}
    className={cn(
      "relative p-4 rounded-2xl border-2 transition-all text-left",
      isSelected
        ? "border-secondary bg-secondary/15"
        : "border-white/10 bg-white/5 hover:border-white/20"
    )}
  >
    {isSelected && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute top-2 right-2 w-5 h-5 rounded-full bg-secondary flex items-center justify-center"
      >
        <Check className="w-3 h-3 text-secondary-foreground" />
      </motion.div>
    )}
    <span className="text-2xl mb-2 block">{topic.icon}</span>
    <h3 className="text-sm font-semibold text-white mb-0.5">{topic.label}</h3>
    <p className="text-[10px] text-white/40 leading-tight">{topic.description}</p>
  </motion.button>
);
