import { useEffect, useRef, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { supabase } from '@/integrations/supabase/client';
import { createBrainRenderer, REGIONS, COURSE_REGION_MAP } from './brain/brainRenderer';
import type { BrainRendererOptions } from './brain/brainRenderer';

export const HomeBrainCard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isPremium, showPaywall } = useSubscription();
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<ReturnType<typeof createBrainRenderer> | null>(null);

  const [activeRegions, setActiveRegions] = useState<Set<string>>(new Set());

  // Load progress data for authenticated users
  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      const regions = new Set<string>();

      // IQ test results → map category to brain region
      const { data: iqData } = await supabase
        .from('user_iq_profiles').select('*').eq('user_id', user.id).maybeSingle();
      
      if (iqData) {
        if (iqData.verbal_iq && iqData.verbal_iq > 90) { regions.add('wernicke'); regions.add('broca'); }
        if (iqData.logical_iq && iqData.logical_iq > 90) regions.add('prefrontal');
        if (iqData.numerical_iq && iqData.numerical_iq > 90) regions.add('leftParietal');
        if (iqData.spatial_iq && iqData.spatial_iq > 90) regions.add('rightParietal');
        if (iqData.memory_iq && iqData.memory_iq > 90) regions.add('leftTemporal');
        if (iqData.pattern_recognition_iq && iqData.pattern_recognition_iq > 90) regions.add('occipital');
      }

      // Lesson progress → map subject prefixes to brain regions
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

    // Slight delay to ensure mount is laid out
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

  // Get lit region labels for display
  const litRegionLabels = useMemo(() => {
    return Array.from(activeRegions).slice(0, 4).map(r => REGIONS[r]);
  }, [activeRegions]);

  const handleTap = () => {
    if (!user) navigate('/auth');
    else navigate('/iq-tests');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4"
    >
      <button
        onClick={handleTap}
        className="w-full bg-card border border-border rounded-2xl relative overflow-hidden text-left active:scale-[0.98] transition-transform"
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

          {/* 3D Brain container */}
          <div className="relative w-full flex justify-center">
            <div
              ref={mountRef}
              className="w-full pointer-events-auto cursor-grab active:cursor-grabbing"
              style={{ maxWidth: 480, height: 280 }}
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

          {/* CTA */}
          <div className="mt-1 flex items-center justify-center gap-2">
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
      </button>
    </motion.div>
  );
};
