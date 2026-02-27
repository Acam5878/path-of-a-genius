import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Brain, BookOpen, ArrowRight, Sparkles, Target, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { getUserType } from '@/components/onboarding/OnboardingModal';

const DISMISSED_KEY = 'genius-welcome-profile-dismissed';

/**
 * Shows a personalized "Your Learning Profile" card to newly signed-up users.
 * Displays their IQ teaser result (if available) + recommended first lesson.
 * Only shown once per account creation, dismissed after CTA click or close.
 */
export const WelcomeProfileCard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [lessonsCompleted, setLessonsCompleted] = useState(0);

  useEffect(() => {
    if (!user) return;
    if (localStorage.getItem(DISMISSED_KEY)) return;

    // Only show for accounts created in the last 24 hours
    const createdAt = new Date(user.created_at);
    const hoursSinceCreation = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60);
    if (hoursSinceCreation > 24) {
      localStorage.setItem(DISMISSED_KEY, 'true');
      return;
    }

    setShow(true);

    // Fetch profile data
    supabase.from('profiles').select('display_name').eq('user_id', user.id).maybeSingle()
      .then(({ data }) => {
        if (data?.display_name) setDisplayName(data.display_name.split(' ')[0]);
      });

    // Fetch lesson count
    supabase.from('user_progress').select('id', { count: 'exact', head: true })
      .eq('user_id', user.id).eq('completed', true)
      .then(({ count }) => setLessonsCompleted(count ?? 0));
  }, [user]);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem(DISMISSED_KEY, 'true');
  };

  if (!show || !user) return null;

  const cognitiveAreas = [
    { label: 'Pattern Recognition', level: 3, max: 5 },
    { label: 'Logical Reasoning', level: 2, max: 5 },
    { label: 'Verbal Intelligence', level: 1, max: 5 },
  ];

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
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          
          <div className="relative p-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-secondary">Your Learning Profile</p>
                  <p className="text-sm font-semibold text-white">
                    {displayName ? `Welcome, ${displayName}` : 'Welcome aboard'}
                  </p>
                </div>
              </div>
              <button onClick={dismiss} className="text-white/30 hover:text-white/60 text-xs px-2 py-1">✕</button>
            </div>

            {/* Cognitive areas - unlockable teaser */}
            <div className="bg-white/5 rounded-xl p-3 mb-4 border border-white/10">
              <p className="text-[10px] text-white/50 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Target className="w-3 h-3" /> Cognitive Baseline
              </p>
              <div className="space-y-2">
                {cognitiveAreas.map((area) => (
                  <div key={area.label} className="flex items-center justify-between">
                    <span className="text-xs text-white/70">{area.label}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: area.max }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-4 h-1.5 rounded-full ${
                            i < area.level ? 'bg-secondary' : 'bg-white/10'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-secondary/80 mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Take the full IQ test to get your real scores
              </p>
            </div>

            {/* Recommended first action — personalised by user type */}
            {(() => {
              const userType = getUserType();
              
              if (userType === 'parent') {
                return (
                  <div className="space-y-2">
                    <Button
                      onClick={() => { dismiss(); navigate('/iq-tests'); }}
                      className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-5 rounded-xl font-bold text-sm"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      See Children's IQ Tests
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Button>
                    <button
                      onClick={() => { dismiss(); navigate('/the-path'); }}
                      className="w-full text-center text-xs text-white/40 hover:text-white/60 py-1"
                    >
                      <BookOpen className="w-3 h-3 inline mr-1" />
                      Or explore the curriculum
                    </button>
                  </div>
                );
              }
              
              if (userType === 'self-improver') {
                return (
                  <div className="space-y-2">
                    <Button
                      onClick={() => { dismiss(); navigate('/iq-tests?start=verbal'); }}
                      className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-5 rounded-xl font-bold text-sm"
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      Take Your IQ Test Now
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Button>
                    <button
                      onClick={() => { dismiss(); navigate('/the-path'); }}
                      className="w-full text-center text-xs text-white/40 hover:text-white/60 py-1"
                    >
                      <Sparkles className="w-3 h-3 inline mr-1" />
                      Or start a structured learning path
                    </button>
                  </div>
                );
              }
              
              if (userType === 'curious-learner') {
                return (
                  <div className="space-y-2">
                    <Button
                      onClick={() => { dismiss(); navigate('/feed'); }}
                      className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-5 rounded-xl font-bold text-sm"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Explore Your Feed
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Button>
                    <button
                      onClick={() => { dismiss(); navigate('/iq-tests'); }}
                      className="w-full text-center text-xs text-white/40 hover:text-white/60 py-1"
                    >
                      <Brain className="w-3 h-3 inline mr-1" />
                      Or test your IQ first
                    </button>
                  </div>
                );
              }
              
              // Default: student or unknown
              return (
                <div className="space-y-2">
                  {lessonsCompleted === 0 ? (
                    <Button
                      onClick={() => { dismiss(); navigate('/the-path'); }}
                      className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-5 rounded-xl font-bold text-sm"
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Start Your First Lesson
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => { dismiss(); navigate('/iq-tests'); }}
                      className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-5 rounded-xl font-bold text-sm"
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      Take Full IQ Assessment
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Button>
                  )}
                  <button
                    onClick={() => { dismiss(); navigate('/iq-tests'); }}
                    className="w-full text-center text-xs text-white/40 hover:text-white/60 py-1"
                  >
                    <Sparkles className="w-3 h-3 inline mr-1" />
                    Or test your IQ first
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
