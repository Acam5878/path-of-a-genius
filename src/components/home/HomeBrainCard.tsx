import { useEffect, useRef, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, Brain, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { supabase } from '@/integrations/supabase/client';
import { createBrainRenderer, REGIONS, COURSE_REGION_MAP } from './brain/brainRenderer';
import type { BrainRendererOptions } from './brain/brainRenderer';

// Module data for the grid below the brain
const MODULES = [
  { id: 'greek', icon: 'α', label: 'Ancient Greek', region: 'wernicke' },
  { id: 'latin', icon: 'SPQR', label: 'Latin', region: 'broca' },
  { id: 'mathematics', icon: '∑', label: 'Mathematics', region: 'leftParietal' },
  { id: 'physics', icon: '⚛', label: 'Physics', region: 'rightParietal' },
  { id: 'chemistry', icon: '⚗', label: 'Chemistry', region: 'occipital' },
  { id: 'logic', icon: '∴', label: 'Logic', region: 'prefrontal' },
  { id: 'naturalphil', icon: '☯', label: 'Philosophy', region: 'rightFrontal' },
  { id: 'literature', icon: '✦', label: 'Literature', region: 'rightTemporal' },
  { id: 'ethics', icon: '⚖', label: 'Ethics', region: 'anteriorCing' },
  { id: 'rhetoric', icon: '◈', label: 'Rhetoric', region: 'broca' },
  { id: 'engineering', icon: '⚙', label: 'Engineering', region: 'cerebellum' },
  { id: 'anatomy', icon: '♡', label: 'Anatomy', region: 'somatosensory' },
  { id: 'reading', icon: '📖', label: 'Reading', region: 'leftTemporal' },
];

export const HomeBrainCard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isPremium, showPaywall } = useSubscription();
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<ReturnType<typeof createBrainRenderer> | null>(null);

  const [activeRegions, setActiveRegions] = useState<Set<string>>(new Set());
  const [iqTestCount, setIqTestCount] = useState(0);

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
    // Don't navigate if user was dragging the brain
    if (rendererRef.current?.hasDragged) return;
    if (!user) navigate('/auth');
    else navigate('/iq-tests');
  };

  const needsBrainAssessment = user && iqTestCount < 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4"
    >
      <div
        onClick={handleTap}
        className="w-full bg-card border border-border rounded-2xl relative overflow-hidden text-left cursor-pointer active:scale-[0.99] transition-transform"
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
            <div className="mb-2 bg-secondary/10 border border-secondary/20 rounded-xl px-3 py-2 flex items-center gap-2">
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
              onMouseUp={(e) => {
                if (!rendererRef.current?.hasDragged) {
                  // Allow click-through only if not dragged
                  handleTap();
                }
              }}
            />
            
            {/* Locked overlay for unauthenticated */}
            {!user && (
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-4 pointer-events-none">
                <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-secondary/30 rounded-xl px-4 py-2.5 pointer-events-auto">
                  <Lock className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-semibold text-foreground">Sign up to see your brain</span>
                  <ArrowRight className="w-4 h-4 text-secondary" />
                </div>
              </div>
            )}
          </div>

          {/* Active region labels */}
          {user && litRegionLabels.length > 0 && (
            <div className="flex gap-1.5 flex-wrap justify-center mt-1 mb-1">
              {litRegionLabels.map(r => (
                <span
                  key={r.label}
                  className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border"
                  style={{
                    color: r.glowColor,
                    borderColor: `${r.glowColor}44`,
                    textShadow: `0 0 8px ${r.glowColor}55`,
                  }}
                >
                  {r.label}
                </span>
              ))}
              {activeRegions.size > 4 && (
                <span className="text-[9px] font-mono text-muted-foreground">
                  +{activeRegions.size - 4} more
                </span>
              )}
            </div>
          )}

          {/* Module Grid */}
          {user && (
            <div className="grid grid-cols-4 gap-1.5 mt-3">
              {MODULES.slice(0, 8).map(mod => {
                const isActive = activeRegions.has(mod.region);
                const reg = REGIONS[mod.region];
                return (
                  <div
                    key={mod.id}
                    className="rounded-lg px-1.5 py-2 text-center border transition-colors"
                    style={{
                      background: isActive ? `${reg.glowColor}12` : 'rgba(255,255,255,0.02)',
                      borderColor: isActive ? `${reg.glowColor}44` : 'rgba(255,255,255,0.06)',
                    }}
                  >
                    <span
                      className="text-sm block mb-0.5"
                      style={{
                        color: isActive ? reg.glowColor : 'rgba(255,255,255,0.2)',
                        textShadow: isActive ? `0 0 8px ${reg.glowColor}` : 'none',
                      }}
                    >
                      {mod.icon}
                    </span>
                    <span className="text-[8px] font-mono uppercase tracking-wider block"
                      style={{ color: isActive ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)' }}
                    >
                      {mod.label}
                    </span>
                    {isActive && (
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
                <span>Tap to take an IQ test · Drag to rotate</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
