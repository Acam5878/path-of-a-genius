import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Users, Quote } from 'lucide-react';
import jamesPhoto from '@/assets/testimonials/james-t.jpg';
import priyaPhoto from '@/assets/testimonials/priya-k.jpg';
import marcusPhoto from '@/assets/testimonials/marcus-l.jpg';
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
import diagnosticMemory from '@/assets/screenshots/diagnostic-memory.png';
import diagnosticQuestion from '@/assets/screenshots/diagnostic-question.png';
import diagnosticResults from '@/assets/screenshots/diagnostic-results.png';
import geniusesGrid from '@/assets/screenshots/geniuses-grid.png';
import diagnosticResults2 from '@/assets/screenshots/diagnostic-results-2.png';
import geniusDavinci from '@/assets/screenshots/genius-davinci.png';
import geniusDavinciCurriculum from '@/assets/screenshots/genius-davinci-curriculum.png';
import geniusLesson from '@/assets/screenshots/genius-lesson.png';

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
  cta,
}: {
  label: string;
  title: string;
  description: string;
  screenshots: { src: string; alt: string }[];
  cta?: React.ReactNode;
}) => (
  <section className="py-16">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className="text-center mb-8 px-6"
    >
      <p className="text-sm font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">{label}</p>
      <h2 className="font-heading text-[1.65rem] md:text-[2rem] font-bold text-white leading-tight mb-3 max-w-md mx-auto">{title}</h2>
      <p className="text-sm text-white/40 leading-relaxed max-w-sm mx-auto">{description}</p>
    </motion.div>

    <PhoneRow screenshots={screenshots} />

    {cta && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="px-6 mt-6"
      >
        {cta}
      </motion.div>
    )}
  </section>
);

/* ── Testimonial Card ─────────────────────────────────── */
const testimonials = [
  {
    quote: "I scored 112 on my first diagnostic. Six weeks later I retested at 128. The spatial reasoning module alone changed how I think about problems at work.",
    name: "James T.",
    detail: "Software engineer, London",
    metric: "+16 IQ points",
    photo: jamesPhoto,
  },
  {
    quote: "I'd tried Lumosity, Brilliant, all of them. This is the first app that actually explained why I was training what I was training. The brain map made it click.",
    name: "Priya K.",
    detail: "Medical student, Melbourne",
    metric: "Top 4% verbal reasoning",
    photo: priyaPhoto,
  },
  {
    quote: "I use the Feed for 10 minutes on my commute. My memory recall in exams has noticeably improved — my tutor even commented on it.",
    name: "Marcus L.",
    detail: "A-level student, Manchester",
    metric: "92% memory retention",
    photo: marcusPhoto,
  },
];

const TestimonialSection = () => (
  <section className="py-16 px-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className="text-center mb-10"
    >
      <p className="text-sm font-mono uppercase tracking-[0.2em] text-secondary/70 mb-3">Real Results</p>
      <h2 className="font-heading text-[1.65rem] md:text-[2rem] font-bold text-white leading-tight max-w-md mx-auto">
        People like you are already getting smarter.
      </h2>
    </motion.div>

    <div className="flex flex-col gap-4 max-w-md mx-auto">
      {testimonials.map((t, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5"
        >
          <Quote className="w-5 h-5 text-secondary/40 mb-3" />
          <p className="text-[14px] text-white/70 leading-relaxed mb-4 italic">"{t.quote}"</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={t.photo} alt={t.name} className="w-9 h-9 rounded-full object-cover" loading="lazy" />
              <div>
                <p className="text-sm font-medium text-white/90">{t.name}</p>
                <p className="text-[11px] text-white/30">{t.detail}</p>
              </div>
            </div>
            <span className="text-[11px] font-mono font-bold text-secondary bg-secondary/10 px-2.5 py-1 rounded-full">
              {t.metric}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);


/* ── Main Component ───────────────────────────────────── */
export const PostFeedLanding = () => {
  const navigate = useNavigate();
  const { formatted: learnerCount } = useLearnerCount();

  const features = [
    {
      label: 'Step 1 · Your Intelligence Plan',
      title: 'See your IQ projection in 60 seconds — free',
      description: 'Answer 10 quick questions. We map your brain across 12 regions, show you your estimated IQ and where you could be in 2 weeks — before you even sign up.',
      screenshots: [
        { src: diagnosticMemory, alt: '60-second diagnostic memory test' },
        { src: diagnosticQuestion, alt: 'Diagnostic quiz question' },
        { src: diagnosticResults, alt: 'Your brain map results' },
        { src: diagnosticResults2, alt: 'Strengths and areas to improve' },
      ],
      cta: (
        <div className="max-w-xs mx-auto">
          <button
            onClick={() => navigate('/diagnostic')}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-secondary text-secondary-foreground font-bold text-base shadow-lg shadow-secondary/20 hover:bg-secondary/90 transition-colors active:scale-[0.97]"
          >
            Get My Intelligence Plan (Free)
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      ),
    },
    {
      label: 'Step 2 · The Curriculum',
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
      label: 'Step 3 · The Daily Feed',
      title: 'Your phone is already in your hand. Make it count.',
      description: 'Five minutes between meetings. Three minutes on the train. The Feed turns those dead moments into compound learning — personalised to your weak spots.',
      screenshots: [
        { src: feedGoals, alt: 'Pick your cognitive goals' },
        { src: feedTopics, alt: 'Personalised topic selection' },
        { src: feedQuiz, alt: 'Interactive quiz with brain mapping' },
        { src: feedBrainQuiz, alt: 'Brain quiz with 3D visualisation' },
      ],
    },
    {
      label: 'Step 4 · Measure',
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
      label: 'Step 5 · Stay Sharp',
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
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-white/50 text-[15px] leading-relaxed mb-4 max-w-sm mx-auto"
          >
            You're not less intelligent.
            <br />
            You just never learned what they learned.
          </motion.p>

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
            transition={{ delay: 0.15 }}
            className="text-white/40 text-[15px] leading-relaxed mb-2 max-w-sm mx-auto"
          >
            Logic. Language. Spatial reasoning. Memory. Pattern recognition. The same five disciplines — from Ancient Greece to the Enlightenment.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-[15px] leading-relaxed mb-8 max-w-sm mx-auto font-medium"
          >
            We've rebuilt that curriculum for the modern brain. Here's how it works:
          </motion.p>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
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

      {/* ── GENIUSES SHOWCASE ── */}
      <section className="px-6 pb-8">
        <PhoneRow screenshots={[
          { src: geniusesGrid, alt: 'The geniuses who mastered these disciplines' },
          { src: geniusDavinci, alt: 'Leonardo da Vinci genius profile' },
          { src: geniusDavinciCurriculum, alt: 'Da Vinci curriculum and achievements' },
          { src: geniusLesson, alt: 'Interactive genius lesson' },
        ]} />
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* ── FEATURE SECTIONS (Steps 1 & 2) ── */}
      {features.slice(0, 2).map((f, i) => (
        <div key={i}>
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          <FeatureSection {...f} />
        </div>
      ))}

      {/* ── SOCIAL PROOF ── */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <TestimonialSection />

      {/* ── FEATURE SECTIONS (Steps 3–5) ── */}
      {features.slice(2).map((f, i) => (
        <div key={i + 2}>
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
          <h2 className="font-heading text-2xl font-bold text-white mb-2">
            The geniuses weren't born different.
            <br />
            <span className="text-secondary">They were taught different.</span>
          </h2>
          <p className="text-sm text-white/35 mb-8">Now it's your turn.</p>

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
