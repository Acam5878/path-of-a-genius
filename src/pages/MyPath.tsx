import { motion } from 'framer-motion';
import { Plus, BookOpen, Target, Award, Crown, ArrowUpDown, FolderOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { SubjectCard } from '@/components/cards/SubjectCard';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { getSubjectById } from '@/data/geniuses';
import { useLearningPath } from '@/contexts/LearningPathContext';

const MyPath = () => {
  const navigate = useNavigate();
  const { userSubjects, streak, totalHours } = useLearningPath();

  // Get actual subject data for user subjects
  const enrichedSubjects = userSubjects.map(us => ({
    ...us,
    subject: getSubjectById(us.subjectId),
  })).filter(s => s.subject);

  const inProgressSubjects = enrichedSubjects.filter(s => s.status === 'in_progress');
  const notStartedSubjects = enrichedSubjects.filter(s => s.status === 'not_started');
  const completedSubjects = enrichedSubjects.filter(s => s.status === 'completed');

  const avgProgress = enrichedSubjects.length > 0 
    ? Math.round(enrichedSubjects.reduce((acc, s) => acc + s.progress, 0) / enrichedSubjects.length)
    : 0;

  const isEmpty = userSubjects.length === 0;

  return (
    <AppLayout>
      <Header 
        title="My Learning Path"
        rightActions={
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <ArrowUpDown className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-secondary hover:text-secondary"
              onClick={() => navigate('/geniuses')}
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        }
      />

      <div className="py-4 space-y-6">
        {isEmpty ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 text-center py-12"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
              <FolderOpen className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="font-heading text-xl font-semibold text-foreground mb-2">
              Your Learning Path is Empty
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xs mx-auto">
              Start by adding subjects from genius curricula to build your personalized learning path.
            </p>
            <Button 
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              onClick={() => navigate('/geniuses')}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Explore Geniuses
            </Button>
          </motion.div>
        ) : (
          <>
            {/* Stats Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-4 bg-card rounded-2xl border border-border p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-foreground">Your Progress</h3>
                <div className="flex items-center gap-1 bg-accent/10 text-accent px-2 py-1 rounded-full text-xs">
                  <span className="font-mono">🔥 {streak}</span>
                  <span>day streak</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto rounded-full bg-secondary/10 flex items-center justify-center mb-1">
                    <BookOpen className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="font-mono text-xl font-bold text-foreground">{enrichedSubjects.length}</div>
                  <div className="text-[10px] text-muted-foreground">Total</div>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto rounded-full bg-success/10 flex items-center justify-center mb-1">
                    <Target className="w-5 h-5 text-success" />
                  </div>
                  <div className="font-mono text-xl font-bold text-foreground">{inProgressSubjects.length}</div>
                  <div className="text-[10px] text-muted-foreground">In Progress</div>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-1">
                    <Award className="w-5 h-5 text-accent" />
                  </div>
                  <div className="font-mono text-xl font-bold text-foreground">{completedSubjects.length}</div>
                  <div className="text-[10px] text-muted-foreground">Completed</div>
                </div>
              </div>

              {/* Overall Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Overall progress</span>
                  <span className="font-mono text-foreground">{avgProgress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${avgProgress}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-secondary to-gold-light rounded-full"
                  />
                </div>
              </div>
            </motion.div>

            {/* In Progress */}
            {inProgressSubjects.length > 0 && (
              <Section title="Currently Studying">
                <div className="px-4 space-y-3">
                  {inProgressSubjects.map((item, i) => (
                    <motion.div
                      key={item.subjectId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <SubjectCard 
                        subject={item.subject!} 
                        progress={item.progress} 
                        variant="progress" 
                        showGenius 
                      />
                    </motion.div>
                  ))}
                </div>
              </Section>
            )}

            {/* Premium Limit Banner */}
            {userSubjects.length >= 5 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-4 gradient-premium rounded-xl p-4 text-cream"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <Crown className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{userSubjects.length}/5 subjects tracked</p>
                    <p className="text-xs text-cream/80 mt-0.5">Unlock unlimited with Premium</p>
                  </div>
                  <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-gold-light h-8">
                    Upgrade
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Not Started */}
            {notStartedSubjects.length > 0 && (
              <Section title="Not Started">
                <div className="px-4 space-y-3">
                  {notStartedSubjects.map((item, i) => (
                    <motion.div
                      key={item.subjectId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <SubjectCard 
                        subject={item.subject!} 
                        progress={0} 
                        variant="progress" 
                        showGenius 
                      />
                    </motion.div>
                  ))}
                </div>
              </Section>
            )}

            {/* Completed */}
            {completedSubjects.length > 0 && (
              <Section title="Completed">
                <div className="px-4 space-y-3">
                  {completedSubjects.map((item, i) => (
                    <motion.div
                      key={item.subjectId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-success/5 rounded-xl border border-success/20"
                    >
                      <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                        <Award className="w-4 h-4 text-success" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-foreground">{item.subject?.subjectName}</h4>
                        <p className="text-xs text-muted-foreground">
                          Completed {new Date(item.completedDate || '').toLocaleDateString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Section>
            )}
          </>
        )}
      </div>

      {/* FAB */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-secondary text-secondary-foreground shadow-lg shadow-gold/30 flex items-center justify-center z-40"
        onClick={() => navigate('/geniuses')}
      >
        <Plus className="w-6 h-6" />
      </motion.button>
    </AppLayout>
  );
};

export default MyPath;
