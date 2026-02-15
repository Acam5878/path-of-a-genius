import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FEED_TOPICS, FeedTopic } from '@/data/feedTopics';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface FeedTopicSetupProps {
  onComplete: (selectedTopics: string[]) => void;
  initialTopics?: string[];
}

export const FeedTopicSetup = ({ onComplete, initialTopics = [] }: FeedTopicSetupProps) => {
  const { user } = useAuth();
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

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-[hsl(217,30%,10%)] to-[hsl(217,30%,18%)] flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 pt-[env(safe-area-inset-top)] px-6 pt-8 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-3"
        >
          <div className="p-2 rounded-xl bg-secondary/20">
            <Sparkles className="w-5 h-5 text-secondary" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-white">Customise Your Feed</h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-white/50"
        >
          Select the topics you're interested in. Your feed will focus on these areas.
        </motion.p>
      </div>

      {/* Topic grid */}
      <div className="flex-1 overflow-y-auto px-6 pb-4">
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
              delay={0.05 * i}
            />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="flex-shrink-0 px-6 pb-[env(safe-area-inset-bottom)] pb-6">
        <Button
          onClick={handleContinue}
          disabled={selected.size === 0}
          className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 text-base font-semibold rounded-xl"
        >
          {selected.size === 0
            ? 'Select at least one topic'
            : `Start Feed (${selected.size} topic${selected.size !== 1 ? 's' : ''})`}
        </Button>
        <button
          onClick={() => onComplete([])}
          className="w-full mt-3 text-xs text-white/40 hover:text-white/60 transition-colors"
        >
          Skip — show me everything
        </button>
      </div>
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
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, type: 'spring', stiffness: 400, damping: 25 }}
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
