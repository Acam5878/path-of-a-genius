import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ShieldCheck, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLearnerCount } from '@/hooks/useLearnerCount';
import { createBrainRenderer, REGIONS } from '@/components/home/brain/brainRenderer';

export const PostFeedLanding = () => {
  const navigate = useNavigate();
  const { formatted: learnerCount } = useLearnerCount();
  const handleCTA = () => navigate('/auth');

  // Brain refs
  const nowMountRef = useRef<HTMLDivElement>(null);
  const futureMountRef = useRef<HTMLDivElement>(null);
  const nowRendererRef = useRef<ReturnType<typeof createBrainRenderer> | null>(null);
  const futureRendererRef = useRef<ReturnType<typeof createBrainRenderer> | null>(null);

  // Get diagnostic results from localStorage
  const diagnosticRegions = (() => {
    try {
      const stored = localStorage.getItem('genius-academy-diagnostic-regions');
      return stored ? new Set<string>(JSON.parse(stored)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  })();

  useEffect(() => {
    const nowMount = nowMountRef.current;
    const futureMount = futureMountRef.current;
    if (!nowMount || !futureMount) return;

    const timer = setTimeout(() => {
      if (nowMount.clientWidth === 0) return;
      
      // "Your Brain Now" — show diagnostic results (partial)
      nowRendererRef.current = createBrainRenderer(nowMount);
      nowRendererRef.current.updateOptions({ activeRegions: diagnosticRegions, isLocked: false });
      
      // "Your Brain in Two Weeks" — fully lit
      futureRendererRef.current = createBrainRenderer(futureMount);
      const allRegions = new Set(Object.keys(REGIONS));
      futureRendererRef.current.updateOptions({ activeRegions: allRegions, isLocked: false });
      
      // Stagger fire on future brain
      Object.keys(REGIONS).forEach((r, i) => {
        setTimeout(() => futureRendererRef.current?.triggerRegionFire(r, 1.0), i * 100);
      });
    }, 300);

    return () => {
      clearTimeout(timer);
      nowRendererRef.current?.dispose();
      futureRendererRef.current?.dispose();
      nowRendererRef.current = null;
      futureRendererRef.current = null;
    };
  }, []);

  const nowCount = diagnosticRegions.size;
  const totalRegions = Object.keys(REGIONS).length;

  return (
    <div className="min-h-[100dvh] bg-[hsl(220,40%,4%)] text-white overflow-y-auto">
      
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-16 pb-10 overflow-hidden">
        {/* Subtle gradient orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-secondary/8 blur-[120px] pointer-events-none" />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-heading text-3xl md:text-4xl font-bold leading-tight max-w-sm mb-3"
        >
          Think deeper.{' '}
          <span className="text-secondary">Learn faster.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-white/50 text-sm max-w-xs mb-8 leading-relaxed"
        >
          Join {learnerCount} people training their minds with history's greatest thinkers.
        </motion.p>
      </section>

      {/* ── Brain Comparison ─────────────────────────────────── */}
      <section className="px-6 pb-10">
        <div className="max-w-sm mx-auto">
          <div className="grid grid-cols-2 gap-4">
            {/* Your Brain Now */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center"
            >
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">Your Brain Now</p>
              <div
                ref={nowMountRef}
                className="w-full rounded-xl overflow-hidden"
                style={{ height: 160 }}
              />
              <div className="mt-2 flex items-center gap-1">
                <span className="text-sm font-mono font-bold text-secondary">{nowCount}</span>
                <span className="text-[10px] text-white/30">/ {totalRegions} active</span>
              </div>
            </motion.div>

            {/* Your Brain in Two Weeks */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col items-center"
            >
              <p className="text-[10px] font-mono uppercase tracking-widest text-secondary mb-2">In Two Weeks</p>
              <div
                ref={futureMountRef}
                className="w-full rounded-xl overflow-hidden"
                style={{ height: 160 }}
              />
              <div className="mt-2 flex items-center gap-1">
                <span className="text-sm font-mono font-bold" style={{ color: '#00F0AA' }}>{totalRegions}</span>
                <span className="text-[10px] text-white/30">/ {totalRegions} active</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="px-6 pb-8 flex flex-col items-center">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          onClick={handleCTA}
          className="w-full max-w-sm flex items-center justify-center gap-2 bg-secondary text-secondary-foreground rounded-2xl py-4 text-base font-bold shadow-xl shadow-secondary/20 hover:bg-secondary/90 transition-colors"
        >
          Find out how smart you are
          <ArrowRight className="w-4 h-4" />
        </motion.button>

        {/* Star rating */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex items-center gap-2 mt-4"
        >
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-secondary fill-secondary" />
            ))}
          </div>
          <span className="text-[11px] text-white/40">4.8 on the App Store</span>
        </motion.div>
      </section>

      {/* ── Social proof ─────────────────────────────────────── */}
      <section className="px-6 pb-8">
        <div className="max-w-sm mx-auto space-y-2.5">
          {[
            { text: 'I replaced my doomscrolling with this.', name: 'Alex', city: 'London' },
            { text: 'My kids love the IQ tests.', name: 'Sarah', city: 'Sydney' },
            { text: 'Finally, an app that makes me feel smarter.', name: 'Marco', city: 'Berlin' },
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -15 : 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-start gap-3"
            >
              <span className="text-secondary text-lg mt-0.5">"</span>
              <div>
                <p className="text-sm text-white/80 leading-snug">{t.text}</p>
                <p className="text-[11px] text-white/30 mt-1">{t.name}, {t.city}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Trust bar + App Store ────────────────────────────── */}
      <section className="px-6 pt-4 pb-12 flex flex-col items-center gap-5">
        <div className="flex items-center gap-4 text-white/30">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="text-[10px]">No credit card</span>
          </div>
          <div className="w-px h-3 bg-white/10" />
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            <span className="text-[10px]">{learnerCount} learners</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 pt-4 border-t border-white/10 w-full max-w-sm">
          <p className="text-[10px] text-white/20 uppercase tracking-wider font-mono">Available on</p>
          <a
            href="https://apps.apple.com/au/app/path-of-a-genius/id6758322387"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white/10 text-white rounded-xl px-5 py-3 hover:bg-white/15 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <div className="text-left">
              <p className="text-[10px] leading-tight opacity-50">Download on the</p>
              <p className="text-sm font-semibold leading-tight">App Store</p>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
};
