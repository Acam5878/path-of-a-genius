import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, ArrowRight, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FEED_TOPICS, FeedTopic, DEFAULT_TOPIC_IDS } from '@/data/feedTopics';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { createBrainRenderer, REGIONS } from '@/components/home/brain/brainRenderer';

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

const BRAIN_MODULES = [
  { id: 'greek', icon: 'α', label: 'Ancient Greek', region: 'wernicke', desc: 'Language comprehension' },
  { id: 'latin', icon: 'SPQR', label: 'Latin', region: 'broca', desc: 'Grammar & speech' },
  { id: 'mathematics', icon: '∑', label: 'Mathematics', region: 'leftParietal', desc: 'Numerical reasoning' },
  { id: 'physics', icon: '⚛', label: 'Physics', region: 'rightParietal', desc: 'Spatial modelling' },
  { id: 'chemistry', icon: '⚗', label: 'Chemistry', region: 'occipital', desc: 'Visual patterns' },
  { id: 'logic', icon: '∴', label: 'Logic', region: 'prefrontal', desc: 'Executive reasoning' },
  { id: 'philosophy', icon: '☯', label: 'Philosophy', region: 'rightFrontal', desc: 'Abstract thought' },
  { id: 'literature', icon: '✦', label: 'Literature', region: 'rightTemporal', desc: 'Narrative & metaphor' },
  { id: 'ethics', icon: '⚖', label: 'Ethics', region: 'anteriorCing', desc: 'Moral reasoning' },
  { id: 'engineering', icon: '⚙', label: 'Engineering', region: 'cerebellum', desc: 'Procedural skill' },
  { id: 'anatomy', icon: '♡', label: 'Anatomy', region: 'somatosensory', desc: 'Body schema' },
  { id: 'reading', icon: '📖', label: 'Reading', region: 'leftTemporal', desc: 'Verbal memory' },
];

// Interactive brain slide for the intro flow
const BrainIntroSlide = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<ReturnType<typeof createBrainRenderer> | null>(null);
  const [activeRegions, setActiveRegions] = useState<Set<string>>(new Set());
  const [litModules, setLitModules] = useState<Set<string>>(new Set());

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const timer = setTimeout(() => {
      if (mount.clientWidth === 0) return;
      rendererRef.current = createBrainRenderer(mount);
      rendererRef.current.updateOptions({ activeRegions: new Set(), isLocked: false });
    }, 150);

    return () => {
      clearTimeout(timer);
      rendererRef.current?.dispose();
      rendererRef.current = null;
    };
  }, []);

  useEffect(() => {
    rendererRef.current?.updateOptions({ activeRegions, isLocked: false });
  }, [activeRegions]);

  const handleModuleTap = (mod: typeof BRAIN_MODULES[0]) => {
    setLitModules(prev => {
      const next = new Set(prev);
      if (next.has(mod.id)) next.delete(mod.id); else next.add(mod.id);
      return next;
    });
    setActiveRegions(prev => {
      const next = new Set(prev);
      if (next.has(mod.region)) next.delete(mod.region); else next.add(mod.region);
      return next;
    });
    rendererRef.current?.triggerRegionFire(mod.region, 1.0);
  };

  const litCount = activeRegions.size;

  return (
    <div className="flex flex-col items-center h-full">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-2"
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <Brain className="w-5 h-5 text-secondary" />
          <span className="font-heading text-lg font-bold text-white">Your Neural Map</span>
        </div>
        <p className="text-xs text-white/40 max-w-xs mx-auto">
          Each discipline illuminates a real brain region. Tap to explore.
        </p>
      </motion.div>

      {litCount > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex gap-4 items-center px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-1"
        >
          <div className="text-center">
            <span className="text-sm font-bold text-secondary font-mono">{litCount}</span>
            <span className="text-[8px] text-white/40 uppercase tracking-wider block">Regions</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="text-center">
            <span className="text-sm font-bold text-white/80 font-mono">{Math.round((litCount / 12) * 100)}%</span>
            <span className="text-[8px] text-white/40 uppercase tracking-wider block">Mapped</span>
          </div>
        </motion.div>
      )}

      <div
        ref={mountRef}
        className="w-full cursor-grab active:cursor-grabbing flex-shrink-0"
        style={{ maxWidth: 380, height: 200 }}
      />

      {litCount > 0 && (
        <div className="flex gap-1 flex-wrap justify-center mb-1 px-4">
          {Array.from(activeRegions).slice(0, 5).map(r => (
            <span
              key={r}
              className="text-[7px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-full border"
              style={{
                color: REGIONS[r].glowColor,
                borderColor: `${REGIONS[r].glowColor}33`,
                textShadow: `0 0 6px ${REGIONS[r].glowColor}44`,
              }}
            >
              {REGIONS[r].label}
            </span>
          ))}
        </div>
      )}

      <div className="grid grid-cols-4 gap-1.5 px-4 w-full max-w-md overflow-y-auto flex-1 min-h-0 pb-2">
        {BRAIN_MODULES.map((mod, i) => {
          const isLit = litModules.has(mod.id);
          const reg = REGIONS[mod.region];
          return (
            <motion.button
              key={mod.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              onClick={(e) => { e.stopPropagation(); handleModuleTap(mod); }}
              onPointerDown={(e) => e.stopPropagation()}
              onPointerUp={(e) => e.stopPropagation()}
              className="rounded-lg px-1 py-2 text-center border transition-all"
              style={{
                background: isLit ? `${reg.glowColor}15` : 'rgba(255,255,255,0.03)',
                borderColor: isLit ? `${reg.glowColor}55` : 'rgba(255,255,255,0.08)',
              }}
            >
              <span
                className="text-base block mb-0.5"
                style={{
                  color: isLit ? reg.glowColor : 'rgba(255,255,255,0.25)',
                  textShadow: isLit ? `0 0 10px ${reg.glowColor}` : 'none',
                }}
              >
                {mod.icon}
              </span>
              <span
                className="text-[7px] font-mono uppercase tracking-wider block leading-tight"
                style={{ color: isLit ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.35)' }}
              >
                {mod.label}
              </span>
              {isLit && (
                <span
                  className="text-[6px] font-mono uppercase block mt-0.5"
                  style={{ color: `${reg.glowColor}88` }}
                >
                  ↳ {reg.label.split(' ')[0]}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

interface FeedTopicSetupProps {
  onComplete: (selectedTopics: string[]) => void;
  initialTopics?: string[];
}

type SetupPhase = 'intro' | 'topics';

export const FeedTopicSetup = ({ onComplete, initialTopics = [] }: FeedTopicSetupProps) => {
  const { user } = useAuth();
  // Skip intro slides for authenticated users — go straight to topic picker
  const [phase, setPhase] = useState<SetupPhase>(user ? 'topics' : 'intro');
  const [introStep, setIntroStep] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(
    new Set(initialTopics.length > 0 ? initialTopics : DEFAULT_TOPIC_IDS)
  );

  // Brain renderer for topic picker
  const brainMountRef = useRef<HTMLDivElement>(null);
  const brainRendererRef = useRef<ReturnType<typeof createBrainRenderer> | null>(null);

  // Compute active brain regions from selected topics
  const activeRegionsFromTopics = useMemo(() => {
    const regions = new Set<string>();
    selected.forEach(topicId => {
      const mapping = TOPIC_BRAIN_REGION[topicId];
      if (mapping) regions.add(mapping.key);
    });
    return regions;
  }, [selected]);

  const totalIntroSteps = feedValuePoints.length + 1;
  const isBrainSlide = introStep === feedValuePoints.length;
  const isLastIntroStep = introStep === totalIntroSteps - 1;

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    // Fire brain region pulse
    const mapping = TOPIC_BRAIN_REGION[id];
    if (mapping && brainRendererRef.current) {
      brainRendererRef.current.triggerRegionFire(mapping.key, 1.0);
    }
  };

  // Init brain renderer for topic picker
  useEffect(() => {
    if (phase !== 'topics') return;
    const mount = brainMountRef.current;
    if (!mount) return;
    const timer = setTimeout(() => {
      if (mount.clientWidth === 0) return;
      brainRendererRef.current = createBrainRenderer(mount);
      brainRendererRef.current.updateOptions({ activeRegions: activeRegionsFromTopics, isLocked: false });
    }, 150);
    return () => {
      clearTimeout(timer);
      brainRendererRef.current?.dispose();
      brainRendererRef.current = null;
    };
  }, [phase]);

  // Update brain regions when selection changes
  useEffect(() => {
    brainRendererRef.current?.updateOptions({ activeRegions: activeRegionsFromTopics, isLocked: false });
  }, [activeRegionsFromTopics]);

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
    if (introStep < totalIntroSteps - 1) {
      setIntroStep(prev => prev + 1);
    } else {
      setPhase('topics');
    }
  };

  const currentPoint = !isBrainSlide ? feedValuePoints[introStep] : null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[hsl(217,30%,10%)] to-[hsl(217,30%,18%)]" style={{ height: '100dvh' }}>
      <AnimatePresence mode="wait">

        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0 flex flex-col"
          >
            <div
              className="flex-shrink-0 flex justify-center gap-2 px-6"
              style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 20px)', paddingBottom: '12px' }}
            >
              {Array.from({ length: totalIntroSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === introStep ? 'w-8 bg-secondary' : i < introStep ? 'w-4 bg-secondary/50' : 'w-4 bg-white/15'
                  }`}
                />
              ))}
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-8 text-center min-h-0">
              <AnimatePresence mode="wait">
                {isBrainSlide ? (
                  <motion.div
                    key="brain-slide"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex flex-col"
                  >
                    <BrainIntroSlide />
                  </motion.div>
                ) : (
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
                      {currentPoint!.emoji}
                    </motion.span>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mb-3"
                    >
                      <span className="font-heading text-4xl font-bold text-secondary">{currentPoint!.stat}</span>
                      <p className="text-xs font-mono text-white/40 uppercase tracking-widest mt-1">{currentPoint!.statLabel}</p>
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.35 }}
                      className="text-white/70 text-base leading-relaxed max-w-xs"
                    >
                      {currentPoint!.body}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
                ) : isBrainSlide ? (
                  <>I want this <ArrowRight className="w-4 h-4 ml-2" /></>
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

        {phase === 'topics' && (
          <motion.div
            key="topics"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col"
          >
            <div
              className="flex-shrink-0 px-5 pb-1"
              style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 12px)' }}
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <h1 className="text-lg font-heading font-bold text-white mb-0.5">What lights up your brain?</h1>
                <p className="text-[11px] text-white/35">Each topic activates a real neural region</p>
              </motion.div>

              {/* 3D Brain */}
              <div
                ref={brainMountRef}
                className="w-full cursor-grab active:cursor-grabbing mx-auto"
                style={{ maxWidth: 340, height: 160 }}
              />

              {/* Region stats */}
              {activeRegionsFromTopics.size > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex gap-4 items-center justify-center px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mx-auto w-fit mb-2"
                >
                  <div className="text-center">
                    <span className="text-sm font-bold text-secondary font-mono">{activeRegionsFromTopics.size}</span>
                    <span className="text-[8px] text-white/40 uppercase tracking-wider block">Regions</span>
                  </div>
                  <div className="w-px h-4 bg-white/10" />
                  <div className="text-center">
                    <span className="text-sm font-bold text-white/80 font-mono">{Math.round((activeRegionsFromTopics.size / 12) * 100)}%</span>
                    <span className="text-[8px] text-white/40 uppercase tracking-wider block">Lit</span>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto px-5 pb-4">
              <div className="flex items-center justify-between mb-3">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  onClick={selectAll}
                  className="text-xs font-semibold text-secondary hover:text-secondary/80 transition-colors px-3 py-1.5 rounded-full border border-secondary/20 hover:border-secondary/40"
                >
                  {selected.size === FEED_TOPICS.length ? '✗ Deselect all' : '✓ Select all'}
                </motion.button>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[11px] text-white/30 font-mono"
                >
                  {selected.size}/{FEED_TOPICS.length}
                </motion.span>
              </div>

              <div className="grid grid-cols-3 gap-2">
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

            <div
              className="flex-shrink-0 px-6 pt-2"
              style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 20px)' }}
            >
              <Button
                onClick={handleContinue}
                disabled={selected.size === 0}
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-13 text-base font-bold rounded-2xl shadow-lg shadow-secondary/20 transition-all"
              >
                {selected.size === 0
                  ? 'Pick at least one'
                  : `Let's go — ${selected.size} topic${selected.size !== 1 ? 's' : ''}`}
                {selected.size > 0 && <ArrowRight className="w-4 h-4 ml-2" />}
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
                className="w-full mt-2.5 text-xs text-white/30 hover:text-white/50 transition-colors"
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

// ─── Topic Card (brain-region glow style) ───

const TOPIC_GLOW: Record<string, string> = {
  'iq-training':     '#a78bfa', // violet
  'content-review':  '#2dd4bf', // teal
  'literature':      '#fbbf24', // amber
  'etymology':       '#34d399', // emerald
  'languages':       '#60a5fa', // blue
  'mathematics':     '#f472b6', // pink
  'physics':         '#facc15', // yellow
  'philosophy':      '#818cf8', // indigo
  'science':         '#22d3ee', // cyan
  'history':         '#fb923c', // orange
  'art':             '#e879f9', // fuchsia
  'learning':        '#38bdf8', // sky
};

// Map topics to brain region keys, display labels, function, and relatable daily struggle
const TOPIC_BRAIN_REGION: Record<string, { key: string; label: string; function: string; struggle: string }> = {
  'iq-training':     { key: 'prefrontal',    label: 'Prefrontal Cortex',   function: 'Executive reasoning & focus',     struggle: 'Struggle to concentrate or think under pressure?' },
  'content-review':  { key: 'leftTemporal',  label: 'Hippocampus',         function: 'Memory consolidation',            struggle: "Forget what you read within a day?" },
  'literature':      { key: 'rightTemporal', label: 'Right Temporal',      function: 'Narrative & metaphor',            struggle: "Find it hard to explain ideas with vivid language?" },
  'etymology':       { key: 'wernicke',      label: "Wernicke's Area",     function: 'Language comprehension',          struggle: "Hear big words and blank on what they mean?" },
  'languages':       { key: 'broca',         label: "Broca's Area",        function: 'Grammar & speech production',     struggle: "Struggle to express yourself clearly?" },
  'mathematics':     { key: 'leftParietal',  label: 'Left Parietal',       function: 'Numerical reasoning',             struggle: "Freeze when splitting a bill or doing mental maths?" },
  'physics':         { key: 'rightParietal', label: 'Right Parietal',      function: 'Spatial modelling',               struggle: "Bad at estimating distances or reading maps?" },
  'philosophy':      { key: 'rightFrontal',  label: 'Right Frontal',       function: 'Abstract thought',                struggle: "Find it hard to see both sides of an argument?" },
  'science':         { key: 'cerebellum',    label: 'Cerebellum',          function: 'Procedural & systematic thinking',struggle: "Struggle to follow complex instructions step by step?" },
  'history':         { key: 'leftTemporal',  label: 'Left Temporal',       function: 'Verbal memory & context',         struggle: "Forget people's names moments after meeting them?" },
  'art':             { key: 'occipital',     label: 'Occipital Lobe',      function: 'Visual pattern recognition',      struggle: "Miss visual details others notice instantly?" },
  'learning':        { key: 'anteriorCing',  label: 'Anterior Cingulate',  function: 'Error detection & motivation',    struggle: "Give up on new skills before they stick?" },
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
}) => {
  const glow = TOPIC_GLOW[topic.id] || '#ffffff';
  const region = TOPIC_BRAIN_REGION[topic.id];

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.96 }}
      onClick={onToggle}
      className="relative rounded-xl px-3 py-3 text-left border transition-all overflow-hidden"
      style={{
        background: isSelected ? `${glow}15` : 'rgba(255,255,255,0.03)',
        borderColor: isSelected ? `${glow}55` : 'rgba(255,255,255,0.08)',
        boxShadow: isSelected ? `0 0 20px ${glow}15, inset 0 1px 0 ${glow}10` : 'none',
      }}
    >
      {/* Checkmark */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ background: glow }}
        >
          <Check className="w-3 h-3 text-black" />
        </motion.div>
      )}

      <span
        className="text-xl block mb-1"
        style={{
          filter: isSelected ? `drop-shadow(0 0 8px ${glow})` : 'none',
        }}
      >
        {topic.icon}
      </span>
      <h3
        className="text-[12px] font-bold block leading-tight"
        style={{ color: isSelected ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)' }}
      >
        {topic.label}
      </h3>
      {region && (
        <>
          <span
            className="text-[7px] font-mono uppercase tracking-wider block mt-0.5"
            style={{ color: isSelected ? `${glow}cc` : 'rgba(255,255,255,0.2)' }}
          >
            🧠 {region.label}
          </span>
          <span
            className="text-[8px] block mt-0.5 leading-snug"
            style={{ color: isSelected ? `${glow}88` : 'rgba(255,255,255,0.15)' }}
          >
            {region.function}
          </span>
          <p
            className="text-[9px] block mt-1.5 leading-snug italic"
            style={{ color: isSelected ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.2)' }}
          >
            {region.struggle}
          </p>
        </>
      )}
    </motion.button>
  );
};
