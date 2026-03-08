import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Brain, ArrowRight, TrendingUp, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { REGIONS } from '@/components/home/brain/brainRegions';

const DISMISSED_KEY = 'genius-welcome-profile-dismissed';

const REGION_STRENGTHS: Record<string, string> = {
  prefrontal: 'Critical thinking',
  broca: 'Communication',
  wernicke: 'Comprehension',
  leftParietal: 'Math reasoning',
  rightParietal: 'Spatial intuition',
  leftTemporal: 'Verbal memory',
  rightTemporal: 'Creative thinking',
  occipital: 'Pattern recognition',
  anteriorCing: 'Moral reasoning',
  rightFrontal: 'Abstract thinking',
  somatosensory: 'Body awareness',
  cerebellum: 'Procedural skill',
};

/**
 * Contextual banner for users who completed the diagnostic.
 * Connects their results to the recommended next action.
 */
export const WelcomeProfileCard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [displayName, setDisplayName] = useState('');

  const diagnosticRegions: string[] = JSON.parse(localStorage.getItem('genius-academy-diagnostic-regions') || '[]');
  const hasDiagnostic = diagnosticRegions.length > 0;
  const estimatedIQ = 90 + diagnosticRegions.length * 3;
  const projectedIQ = estimatedIQ + 15;
  const topStrengths = diagnosticRegions.slice(0, 3).map(r => REGION_STRENGTHS[r]).filter(Boolean);

  useEffect(() => {
    if (!user) return;
    if (localStorage.getItem(DISMISSED_KEY)) return;

    // Only show for accounts created in the last 48 hours
    const createdAt = new Date(user.created_at);
    const hoursSinceCreation = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60);
    if (hoursSinceCreation > 48) {
      localStorage.setItem(DISMISSED_KEY, 'true');
      return;
    }

    setShow(true);

    supabase.from('profiles').select('display_name').eq('user_id', user.id).maybeSingle()
      .then(({ data }) => {
        if (data?.display_name) setDisplayName(data.display_name.split(' ')[0]);
      });
  }, [user]);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem(DISMISSED_KEY, 'true');
  };

  if (!show || !user) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="mx-4 mb-4"
      >
        <div className="relative bg-gradient-to-br from-[hsl(259,56%,25%)] to-[hsl(240,40%,18%)] border border-secondary/20 rounded-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

          <div className="relative p-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-secondary">
                    {hasDiagnostic ? 'Your Brain Profile' : 'Welcome'}
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {displayName ? `${displayName}, here's your plan` : 'Your personalised plan'}
                  </p>
                </div>
              </div>
              <button onClick={dismiss} className="text-white/30 hover:text-white/60 text-xs px-2 py-1">✕</button>
            </div>

            {/* Diagnostic summary — only if they did the diagnostic */}
            {hasDiagnostic && (
              <div className="bg-white/5 rounded-xl p-3 mb-4 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-3 h-3 text-secondary/60" />
                    <p className="text-[10px] text-white/40 uppercase tracking-wider">IQ Projection</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-white/50">{estimatedIQ}</span>
                    <ArrowRight className="w-3 h-3 text-secondary/40" />
                    <span className="font-mono text-sm font-bold text-secondary">{projectedIQ}</span>
                  </div>
                </div>
                {topStrengths.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {topStrengths.map((s, i) => (
                      <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] bg-secondary/10 text-secondary border border-secondary/20">
                        <Zap className="w-2.5 h-2.5" />
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Recommended next action */}
            <div className="space-y-2">
              <Button
                onClick={() => { dismiss(); navigate('/iq-tests?start=verbal'); }}
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-5 rounded-xl font-bold text-sm"
              >
                <Brain className="w-4 h-4 mr-2" />
                {hasDiagnostic ? 'Take Your Full IQ Test' : 'Measure Your IQ'}
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              <button
                onClick={() => { dismiss(); navigate('/the-path'); }}
                className="w-full text-center text-xs text-white/40 hover:text-white/60 py-1"
              >
                <Target className="w-3 h-3 inline mr-1" />
                Or start the structured curriculum
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
