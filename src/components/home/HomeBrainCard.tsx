import { useEffect, useRef, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ArrowRight, Brain, Sparkles, X, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { supabase } from '@/integrations/supabase/client';
import { createBrainRenderer, REGIONS, COURSE_REGION_MAP } from './brain/brainRenderer';
import type { BrainRendererOptions } from './brain/brainRenderer';

// Module data for the grid below the brain
const MODULES = [
  { id: 'greek', icon: 'α', label: 'Ancient Greek', region: 'wernicke', pathSlug: 'ancient-greek', desc: 'Studying Ancient Greek activates Wernicke\'s Area — the brain\'s language comprehension centre. Decoding grammar & meaning builds deep linguistic neural pathways.' },
  { id: 'latin', icon: 'SPQR', label: 'Latin', region: 'broca', pathSlug: 'latin', desc: 'Latin engages Broca\'s Area — responsible for speech production and grammatical structure. Mastering inflection strengthens your language production circuits.' },
  { id: 'mathematics', icon: '∑', label: 'Mathematics', region: 'leftParietal', pathSlug: 'mathematics', desc: 'Mathematics activates the Left Parietal Lobe — the seat of numerical reasoning and quantitative logic. Every equation strengthens this region.' },
  { id: 'physics', icon: '⚛', label: 'Physics', region: 'rightParietal', pathSlug: 'physics', desc: 'Physics engages the Right Parietal Lobe — where spatial modelling and physical intuition reside. Visualising forces builds powerful spatial reasoning.' },
  { id: 'chemistry', icon: '⚗', label: 'Chemistry', region: 'occipital', pathSlug: 'chemistry', desc: 'Chemistry activates the Occipital Lobe — your visual pattern recognition centre. Molecular structures and reaction patterns sharpen this region.' },
  { id: 'logic', icon: '∴', label: 'Logic', region: 'prefrontal', pathSlug: 'logic', desc: 'Logic & Critical Thinking engage the Prefrontal Cortex — the brain\'s executive reasoning hub. Syllogisms and deduction build your highest-order thinking.' },
  { id: 'naturalphil', icon: '☯', label: 'Philosophy', region: 'rightFrontal', pathSlug: 'natural-philosophy', desc: 'Philosophy activates the Right Frontal Lobe — the seat of abstract thought and wonder. Contemplating existence builds philosophical neural networks.' },
  { id: 'literature', icon: '✦', label: 'Literature', region: 'rightTemporal', pathSlug: 'literature', desc: 'Literature & Poetry engage the Right Temporal Lobe — where narrative, metaphor, and emotional language are processed. Stories reshape your brain.' },
  { id: 'ethics', icon: '⚖', label: 'Ethics', region: 'anteriorCing', pathSlug: 'ethics', desc: 'Ethics activates the Anterior Cingulate — your brain\'s moral reasoning and empathy centre. Weighing right and wrong builds moral cognition.' },
  { id: 'rhetoric', icon: '◈', label: 'Rhetoric', region: 'broca', pathSlug: 'rhetoric', desc: 'Rhetoric engages Broca\'s Area — the centre of persuasion and articulate speech production. Mastering argument strengthens communication circuits.' },
  { id: 'engineering', icon: '⚙', label: 'Engineering', region: 'cerebellum', pathSlug: 'engineering', desc: 'Engineering activates the Cerebellum — governing procedural skill and precise design execution. Building things creates deep motor-cognitive links.' },
  { id: 'anatomy', icon: '♡', label: 'Anatomy', region: 'somatosensory', pathSlug: 'anatomy', desc: 'Anatomy engages the Somatosensory Cortex — where your brain maps the body. Understanding physical form strengthens bodily awareness.' },
  { id: 'reading', icon: '📖', label: 'Reading', region: 'leftTemporal', pathSlug: 'reading', desc: 'Deep Reading activates the Left Temporal Lobe — your verbal memory and linguistic detail centre. Sustained reading builds lasting neural connections.' },
];

export const HomeBrainCard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isPremium, showPaywall } = useSubscription();
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<ReturnType<typeof createBrainRenderer> | null>(null);

  const [activeRegions, setActiveRegions] = useState<Set<string>>(new Set());
  const [iqTestCount, setIqTestCount] = useState(0);
  const [selectedModule, setSelectedModule] = useState<typeof MODULES[0] | null>(null);

  // Load progress data for authenticated users
  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      const regions = new Set<string>();

      const { data: iqData } = await supabase
        .from('user_iq_profiles').select('*').eq('user_id', user.id).maybeSingle();
      
      if (iqData) {
        setIqTestCount(iqData.total_tests_taken);
        if (iqData.verbal_iq && iqData.verbal_iq > 90) { regions.add('wernicke'); regions.add('broca'); }
        if (iqData.logical_iq && iqData.logical_iq > 90) regions.add('prefrontal');
        if (iqData.numerical_iq && iqData.numerical_iq > 90) regions.add('leftParietal');
        if (iqData.spatial_iq && iqData.spatial_iq > 90) regions.add('rightParietal');
        if (iqData.memory_iq && iqData.memory_iq > 90) regions.add('leftTemporal');
        if (iqData.pattern_recognition_iq && iqData.pattern_recognition_iq > 90) regions.add('occipital');
      }

      const { data: progressData } = await supabase
        .from('user_progress').select('subject_id').eq('user_id', user.id).eq('completed', true);
      
      if (progressData) {
        const completedPrefixes = new Set<string>();
        progressData.forEach(row => {
          const prefix = row.subject_id.split('-')[0].toLowerCase();
          completedPrefixes.add(prefix);
        });
        completedPrefixes.forEach(prefix => {
          const region = COURSE_REGION_MAP[prefix];
          if (region) regions.add(region);
        });
      }

      setActiveRegions(regions);
    };

    loadData();
  }, [user]);

  // Initialize Three.js renderer
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const timer = setTimeout(() => {
      if (mount.clientWidth === 0) return;
      rendererRef.current = createBrainRenderer(mount);
    }, 100);

    return () => {
      clearTimeout(timer);
      rendererRef.current?.dispose();
      rendererRef.current = null;
    };
  }, []);

  // Update renderer with current state
  useEffect(() => {
    rendererRef.current?.updateOptions({
      activeRegions,
      isLocked: !user,
    });
  }, [activeRegions, user]);

  const litCount = activeRegions.size;
  const totalRegions = Object.keys(REGIONS).length;
  const pctLit = Math.round((litCount / totalRegions) * 100);

  const litRegionLabels = useMemo(() => {
    return Array.from(activeRegions).slice(0, 4).map(r => REGIONS[r]);
  }, [activeRegions]);

  const handleTap = () => {
    if (rendererRef.current?.hasDragged) return;
    if (!user) navigate('/auth');
    else navigate('/iq-tests');
  };

  const handleModuleClick = (mod: typeof MODULES[0], e: React.MouseEvent) => {
    e.stopPropagation();
    // Fire the region intensely
    rendererRef.current?.triggerRegionFire(mod.region, 1.0);
    // Fire again after a beat for dramatic glow
    setTimeout(() => rendererRef.current?.triggerRegionFire(mod.region, 0.8), 300);
    setTimeout(() => rendererRef.current?.triggerRegionFire(mod.region, 0.6), 600);
    setSelectedModule(mod);
  };

  const needsBrainAssessment = user && iqTestCount < 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4"
    >
      <div
        className="w-full bg-card border border-border rounded-2xl relative overflow-hidden text-left"
      >
        {/* Deep ambient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,40%,4%)] to-[hsl(220,30%,8%)] rounded-2xl" />

        <div className="relative z-10 p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-secondary" />
              <span className="text-xs font-mono text-secondary uppercase tracking-widest">Your Brain</span>
            </div>
            {user && (
              <span className="text-[10px] text-muted-foreground font-mono">
                {litCount}/{totalRegions} regions · {pctLit}%
              </span>
            )}
          </div>

          {/* Brain assessment teaser for new users */}
          {needsBrainAssessment && (
            <div
              onClick={() => navigate('/iq-tests')}
              className="mb-2 bg-secondary/10 border border-secondary/20 rounded-xl px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-secondary/15 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-secondary flex-shrink-0" />
              <span className="text-xs text-secondary">
                Complete {5 - iqTestCount} more quiz{5 - iqTestCount !== 1 ? 'zes' : ''} to unlock your full brain assessment
              </span>
            </div>
          )}

          {/* 3D Brain container */}
          <div className="relative w-full flex justify-center">
            <div
              ref={mountRef}
              className="w-full pointer-events-auto cursor-grab active:cursor-grabbing"
              style={{ maxWidth: 480, height: 280 }}
              onClick={(e) => e.stopPropagation()}
              onMouseUp={() => {
                if (!rendererRef.current?.hasDragged) {
                  handleTap();
                }
              }}
            />
            
            {/* Locked overlay for unauthenticated */}
            {!user && (
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-4 pointer-events-none">
                <div
                  onClick={() => navigate('/auth')}
                  className="flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-secondary/30 rounded-xl px-4 py-2.5 pointer-events-auto cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-semibold text-foreground">Sign up to see your brain</span>
                  <ArrowRight className="w-4 h-4 text-secondary" />
                </div>
              </div>
            )}
          </div>

          {/* Active region labels — tappable to show info */}
          {user && litRegionLabels.length > 0 && (
            <div className="flex gap-1.5 flex-wrap justify-center mt-1 mb-1">
              {litRegionLabels.map(r => {
                const regionKey = Object.entries(REGIONS).find(([, v]) => v.label === r.label)?.[0];
                const linkedModule = regionKey ? MODULES.find(m => m.region === regionKey) : null;
                const isSelected = selectedModule && regionKey && selectedModule.region === regionKey;
                return (
                  <button
                    key={r.label}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (linkedModule) {
                        handleModuleClick(linkedModule, e);
                      }
                    }}
                    className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    style={{
                      color: r.glowColor,
                      borderColor: isSelected ? `${r.glowColor}88` : `${r.glowColor}44`,
                      textShadow: `0 0 8px ${r.glowColor}55`,
                      background: isSelected ? `${r.glowColor}20` : 'transparent',
                      boxShadow: isSelected ? `0 0 12px ${r.glowColor}33` : 'none',
                    }}
                  >
                    {r.label}
                  </button>
                );
              })}
              {activeRegions.size > 4 && (
                <span className="text-[9px] font-mono text-muted-foreground">
                  +{activeRegions.size - 4} more
                </span>
              )}
            </div>
          )}

          {/* Selected Module Info Card */}
          <AnimatePresence>
            {selectedModule && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="mt-2 mb-2 rounded-xl border p-3 relative"
                style={{
                  background: `linear-gradient(135deg, ${REGIONS[selectedModule.region].glowColor}12 0%, ${REGIONS[selectedModule.region].glowColor}06 100%)`,
                  borderColor: `${REGIONS[selectedModule.region].glowColor}44`,
                }}
              >
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedModule(null); }}
                  className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-lg" style={{ color: REGIONS[selectedModule.region].glowColor, textShadow: `0 0 12px ${REGIONS[selectedModule.region].glowColor}` }}>
                    {selectedModule.icon}
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-foreground block">{selectedModule.label}</span>
                    <span
                      className="text-[9px] font-mono uppercase tracking-wider"
                      style={{ color: REGIONS[selectedModule.region].glowColor }}
                    >
                      ↳ {REGIONS[selectedModule.region].label}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed mb-2.5">
                  {selectedModule.desc}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/the-path?module=${selectedModule.pathSlug}`);
                  }}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                  style={{
                    background: `${REGIONS[selectedModule.region].glowColor}22`,
                    color: REGIONS[selectedModule.region].glowColor,
                    border: `1px solid ${REGIONS[selectedModule.region].glowColor}33`,
                  }}
                >
                  <BookOpen className="w-3 h-3" />
                  Go to {selectedModule.label}
                  <ArrowRight className="w-3 h-3" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Module Grid */}
          {user && (
            <div className="grid grid-cols-4 gap-1.5 mt-3">
              {MODULES.slice(0, 8).map(mod => {
                const isActive = activeRegions.has(mod.region);
                const isSelected = selectedModule?.id === mod.id;
                const reg = REGIONS[mod.region];
                return (
                  <div
                    key={mod.id}
                    onClick={(e) => handleModuleClick(mod, e)}
                    className="rounded-lg px-1.5 py-2 text-center border transition-all cursor-pointer hover:scale-[1.03] active:scale-[0.97]"
                    style={{
                      background: isSelected
                        ? `${reg.glowColor}25`
                        : isActive ? `${reg.glowColor}12` : 'rgba(255,255,255,0.02)',
                      borderColor: isSelected
                        ? `${reg.glowColor}88`
                        : isActive ? `${reg.glowColor}44` : 'rgba(255,255,255,0.06)',
                      boxShadow: isSelected ? `0 0 16px ${reg.glowColor}33` : 'none',
                    }}
                  >
                    <span
                      className="text-sm block mb-0.5"
                      style={{
                        color: isSelected ? reg.glowColor : isActive ? reg.glowColor : 'rgba(255,255,255,0.2)',
                        textShadow: isSelected ? `0 0 14px ${reg.glowColor}` : isActive ? `0 0 8px ${reg.glowColor}` : 'none',
                      }}
                    >
                      {mod.icon}
                    </span>
                    <span className="text-[8px] font-mono uppercase tracking-wider block"
                      style={{ color: isSelected || isActive ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)' }}
                    >
                      {mod.label}
                    </span>
                    {(isActive || isSelected) && (
                      <span className="text-[7px] font-mono uppercase block mt-0.5"
                        style={{ color: `${reg.glowColor}88` }}
                      >
                        ↳ {reg.label.split(' ')[0]}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* CTA */}
          <div className="mt-2 flex items-center justify-center gap-2">
            {!user ? (
              <div className="flex items-center gap-1.5 text-secondary text-xs font-medium">
                <span>Each lesson & test illuminates a new region</span>
              </div>
            ) : litCount === 0 ? (
              <div className="flex items-center gap-1.5 text-secondary text-xs font-medium">
                <Brain className="w-3.5 h-3.5" />
                <span>Complete lessons & IQ tests to illuminate regions</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                <span>Tap a module to explore · Drag brain to rotate</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
