import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLearnerCount } from '@/hooks/useLearnerCount';

import feedGoals from '@/assets/screenshots/feed-goals.png';
import feedTopics from '@/assets/screenshots/feed-topics.png';
import feedQuiz from '@/assets/screenshots/feed-quiz.png';
import feedBrainQuiz from '@/assets/screenshots/feed-brain-quiz.png';
import arenaSelect from '@/assets/screenshots/arena-select.png';
import arenaMatchup from '@/assets/screenshots/arena-matchup.png';
import arenaBlitz from '@/assets/screenshots/arena-blitz.png';
import arenaResults from '@/assets/screenshots/arena-results.png';
import pathWelcome from '@/assets/screenshots/path-welcome.png';
import pathQuiz from '@/assets/screenshots/path-quiz.png';
import pathVocabulary from '@/assets/screenshots/path-vocabulary.png';
import pathConnected from '@/assets/screenshots/path-connected.png';
import iqCognitiveProfile from '@/assets/screenshots/iq-cognitive-profile.png';
import iqBrainMap from '@/assets/screenshots/iq-brain-map.png';
import iqResults from '@/assets/screenshots/iq-results.png';
import iqTestQuestion from '@/assets/screenshots/iq-test-question.png';

/* ── Phone Mockup ─────────────────────────────────────── */
const PhoneMockup = ({ src, alt, className = '' }: { src: string; alt: string; className?: string }) => (
  <div className={`flex-shrink-0 ${className}`} style={{ width: 200 }}>
    <div className="rounded-[2rem] border-[2.5px] border-white/[0.1] bg-[hsl(220,30%,6%)] p-1.5 shadow-2xl shadow-black/40">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-[hsl(220,30%,6%)] rounded-b-xl z-10" />
      <div className="rounded-[1.6rem] overflow-hidden">
        <img src={src} alt={alt} className="w-full h-auto" loading="lazy" />
      </div>
    </div>
  </div>
);

/* ── Horizontal Phone Row ─────────────────────────────── */
const PhoneRow = ({ screenshots }: { screenshots: { src: string; alt: string }[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[hsl(220,40%,4%)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[hsl(220,40%,4%)] to-transparent z-10 pointer-events-none" />
      
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-8 py-4 snap-x snap-mandatory justify-center"
        style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
      >
        {screenshots.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="snap-center"
          >
            <PhoneMockup src={s.src} alt={s.alt} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ── Feature Section ──────────────────────────────────── */
const FeatureSection = ({
  label,
  title,
  description,
  screenshots,
}: {
  label: string;
  title: string;
  description: string;
  screenshots: { src: string; alt: string }[];
}) => (
  <section className="py-16">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className="text-center mb-8 px-6"
    >
      <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 mb-3">{label}</p>
      <h2 className="font-heading text-[1.65rem] md:text-[2rem] font-bold text-white leading-tight mb-3 max-w-md mx-auto">{title}</h2>
      <p className="text-sm text-white/40 leading-relaxed max-w-sm mx-auto">{description}</p>
    </motion.div>

    <PhoneRow screenshots={screenshots} />
  </section>
);


/* ── Main Component ───────────────────────────────────── */
export const PostFeedLanding = () => {
  const navigate = useNavigate();
  const { formatted: learnerCount } = useLearnerCount();

  const features = [
    {
      label: 'Step 1 · The Curriculum',
      title: 'Learn what the geniuses learned',
      description: 'We\'ve synthesised the key disciplines that Newton, Da Vinci, and Einstein all mastered — logic, language, spatial reasoning, memory — into structured, modern lessons.',
      screenshots: [
        { src: pathWelcome, alt: 'Welcome to your first lesson' },
        { src: pathQuiz, alt: 'Interactive quiz with instant feedback' },
        { src: pathVocabulary, alt: 'Vocabulary cards with etymology' },
        { src: pathConnected, alt: 'Connected knowledge web' },
      ],
    },
    {
      label: 'Step 2 · The Daily Feed',
      title: 'Turn your scrolling into knowledge that lasts',
      description: 'You don\'t have hours to study. The Feed delivers bite-sized, personalised questions that train your brain in the gaps between life.',
      screenshots: [
        { src: feedGoals, alt: 'Pick your cognitive goals' },
        { src: feedTopics, alt: 'Personalised topic selection' },
        { src: feedQuiz, alt: 'Interactive quiz with brain mapping' },
        { src: feedBrainQuiz, alt: 'Brain quiz with 3D visualisation' },
      ],
    },
    {
      label: 'Step 3 · Measure',
      title: 'Know exactly where you stand',
      description: 'Real cognitive assessments across six dimensions. Watch your brain map light up, track your IQ over time, and see precisely where to focus next.',
      screenshots: [
        { src: iqTestQuestion, alt: 'IQ test question with brain region mapping' },
        { src: iqCognitiveProfile, alt: 'Your cognitive profile radar chart' },
        { src: iqBrainMap, alt: 'Interactive brain map with active regions' },
        { src: iqResults, alt: 'IQ results with population distribution' },
      ],
    },
    {
      label: 'Step 4 · Stay Sharp',
      title: 'Learning should feel like a game',
      description: 'Challenge real opponents in 60-second IQ blitzes. Build combos, climb the leaderboard, and prove your progress — because growth needs to be fun to last.',
      screenshots: [
        { src: arenaSelect, alt: 'Choose your opponent' },
        { src: arenaMatchup, alt: 'Match preview with fighter cards' },
        { src: arenaBlitz, alt: '60-second IQ blitz gameplay' },
        { src: arenaResults, alt: 'Post-match cognitive breakdown' },
      ],
    },
  ];

  return (
    <div className="min-h-[100dvh] bg-[hsl(220,40%,4%)] text-white overflow-y-auto">

      {/* ── HERO ── */}
      <section className="relative px-6 pt-20 pb-14 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 max-w-lg mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-[2rem] md:text-4xl font-bold leading-[1.1] mb-4"
          >
            Every genius in history
            <br />
            <span className="text-secondary">studied the same things.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/45 text-[15px] leading-relaxed mb-8 max-w-sm mx-auto"
          >
            We build your Intelligence Plan in 60 seconds. A personalised curriculum built around the way your brain works.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-xs mx-auto mb-6"
          >
            <button
              onClick={() => navigate('/diagnostic')}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-secondary text-secondary-foreground font-bold text-base shadow-lg shadow-secondary/20 hover:bg-secondary/90 transition-colors active:scale-[0.97]"
            >
              Get My Intelligence Plan (Free)
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-3 text-white/30 mt-2"
          >
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span className="text-[11px]">{learnerCount} learners assessed this month</span>
            </div>
            <div className="w-px h-3 bg-white/10" />
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="text-[11px]">100% free</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── MISSION STATEMENT ── */}
      <section className="px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <p className="text-[15px] text-white/40 leading-relaxed mb-4">
            Logic. Language. Spatial reasoning. Memory. Pattern recognition. The same five disciplines — from Ancient Greece to the Enlightenment.
          </p>
          <p className="text-[15px] text-white/40 leading-relaxed mb-4">
            We've rebuilt that curriculum for the modern brain. Here's how it works:
          </p>
        </motion.div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* ── FEATURE SECTIONS ── */}
      {features.map((f, i) => (
        <div key={i}>
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          <FeatureSection {...f} />
        </div>
      ))}

      {/* ── Divider ── */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* ── BOTTOM CTA ── */}
      <section className="px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-sm mx-auto text-center"
        >
          <h2 className="font-heading text-2xl font-bold text-white mb-2">You're 60 seconds away from changing your life.</h2>
          <p className="text-sm text-white/35 mb-8">Ready to start? No credit card required.</p>

          <button
            onClick={() => navigate('/diagnostic')}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-secondary text-secondary-foreground font-bold text-base shadow-lg shadow-secondary/20 hover:bg-secondary/90 transition-colors active:scale-[0.97]"
          >
            Get My Intelligence Plan (Free)
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </section>
    </div>
  );
};
