import { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { createBrainRenderer, REGIONS, COURSE_REGION_MAP } from './brain/brainRenderer';
import { useState } from 'react';

// Da Vinci's neural profile
const DAVINCI_REGIONS = new Set([
  'occipital', 'rightParietal', 'cerebellum', 'somatosensory', 'rightFrontal',
  'prefrontal', 'leftParietal', 'rightTemporal',
]);

export const BrainComparisonCard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userMountRef = useRef<HTMLDivElement>(null);
  const davinciMountRef = useRef<HTMLDivElement>(null);
  const userRendererRef = useRef<ReturnType<typeof createBrainRenderer> | null>(null);
  const davinciRendererRef = useRef<ReturnType<typeof createBrainRenderer> | null>(null);
  const [activeRegions, setActiveRegions] = useState<Set<string>>(new Set());

  // Load user progress
  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const regions = new Set<string>();
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
      const { data: progressData } = await supabase
        .from('user_progress').select('subject_id').eq('user_id', user.id).eq('completed', true);
      if (progressData) {
        const prefixes = new Set<string>();
        progressData.forEach(row => prefixes.add(row.subject_id.split('-')[0].toLowerCase()));
        prefixes.forEach(p => { const r = COURSE_REGION_MAP[p]; if (r) regions.add(r); });
      }
      setActiveRegions(regions);
    };
    load();
  }, [user]);

  // Init both renderers
  useEffect(() => {
    const userMount = userMountRef.current;
    const davinciMount = davinciMountRef.current;
    if (!userMount || !davinciMount) return;

    const timer = setTimeout(() => {
      if (userMount.clientWidth === 0) return;
      userRendererRef.current = createBrainRenderer(userMount);
      davinciRendererRef.current = createBrainRenderer(davinciMount);
      davinciRendererRef.current.updateOptions({ activeRegions: DAVINCI_REGIONS, isLocked: false });
    }, 150);

    return () => {
      clearTimeout(timer);
      userRendererRef.current?.dispose();
      davinciRendererRef.current?.dispose();
      userRendererRef.current = null;
      davinciRendererRef.current = null;
    };
  }, []);

  // Update user brain
  useEffect(() => {
    userRendererRef.current?.updateOptions({ activeRegions, isLocked: !user });
  }, [activeRegions, user]);

  const userLit = activeRegions.size;
  const davinciLit = DAVINCI_REGIONS.size;
  const totalRegions = Object.keys(REGIONS).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4"
    >
      <div
        onClick={() => navigate(user ? '/iq-tests' : '/auth')}
        className="w-full bg-card border border-border rounded-2xl relative overflow-hidden cursor-pointer active:scale-[0.99] transition-transform"
      >
        {/* Deep background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,40%,4%)] to-[hsl(220,30%,8%)] rounded-2xl" />

        <div className="relative z-10 p-4">
          {/* Header */}
          <div className="text-center mb-2">
            <span className="text-[10px] font-mono text-secondary uppercase tracking-widest">Neural Comparison</span>
            <h3 className="text-sm font-semibold text-foreground mt-0.5">Your Brain vs Da Vinci's</h3>
          </div>

          {/* Side-by-side brains */}
          <div className="grid grid-cols-2 gap-2">
            {/* Your brain */}
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground mb-1">You</span>
              <div
                ref={userMountRef}
                className="w-full pointer-events-auto cursor-grab active:cursor-grabbing rounded-xl overflow-hidden"
                style={{ height: 150 }}
                onClick={(e) => e.stopPropagation()}
              />
              <div className="mt-1 flex items-center gap-1">
                <span className="text-xs font-mono font-bold text-secondary">{userLit}</span>
                <span className="text-[9px] text-muted-foreground">/ {totalRegions}</span>
              </div>
              <span className="text-[8px] text-muted-foreground">regions active</span>
            </div>

            {/* Da Vinci's brain */}
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground mb-1">Da Vinci</span>
              <div
                ref={davinciMountRef}
                className="w-full pointer-events-auto cursor-grab active:cursor-grabbing rounded-xl overflow-hidden"
                style={{ height: 150 }}
                onClick={(e) => e.stopPropagation()}
              />
              <div className="mt-1 flex items-center gap-1">
                <span className="text-xs font-mono font-bold" style={{ color: '#00F0AA' }}>{davinciLit}</span>
                <span className="text-[9px] text-muted-foreground">/ {totalRegions}</span>
              </div>
              <span className="text-[8px] text-muted-foreground">regions active</span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-3 flex items-center justify-center gap-1.5 text-secondary text-xs">
            <span>Complete lessons & IQ tests to close the gap</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
