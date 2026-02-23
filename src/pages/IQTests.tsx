import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

import { IQTestCard } from '@/components/iq-test/IQTestCard';
import { IQTestQuestion } from '@/components/iq-test/IQTestQuestion';
import { IQTestResults } from '@/components/iq-test/IQTestResults';
import { IQProgressCard } from '@/components/iq-test/IQProgressCard';
import { BrainRegionCard } from '@/components/brain/BrainRegionCard';
import { useIQPersistence } from '@/hooks/useIQPersistence';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { showMilestoneToast } from '@/components/milestones/MilestoneToast';
import { 
  allIQTests,
  childrenIQTests,
  IQTest, 
  TestResult, 
  calculateTestScore,
  categoryDisplayNames 
} from '@/data/iqTests';

type ViewState = 'selection' | 'test' | 'results';

// First test (Verbal Reasoning) and children's tests are free, rest require premium
const FREE_TEST_IDS = ['verbal-reasoning-1', 'young-children-test', 'older-children-test'];

const IQTests = () => {
  const { user } = useAuth();
  const { isPremium, showPaywall } = useSubscription();
  const { profile, saveTestResult, canTakeTestToday } = useIQPersistence();
  const hasShownFirstTestMilestone = useRef(false);
  const hasAutoStarted = useRef(false);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [viewState, setViewState] = useState<ViewState>('selection');
  const [selectedTest, setSelectedTest] = useState<IQTest | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, string | number>>(new Map());
  const [startTime, setStartTime] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Auto-start verbal test if navigated with ?start=verbal
  useEffect(() => {
    if (hasAutoStarted.current) return;
    const startParam = searchParams.get('start');
    if (startParam === 'verbal') {
      hasAutoStarted.current = true;
      const verbalTest = allIQTests.find(t => t.id === 'verbal-reasoning-1');
      if (verbalTest) {
        setSearchParams({}, { replace: true });
        startTest(verbalTest);
      }
    }
  }, [searchParams]);

  // Timer effect
  useEffect(() => {
    if (viewState !== 'test' || !selectedTest) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleFinishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [viewState, selectedTest]);

  const handleTestClick = (test: IQTest) => {
    const isTestLocked = !FREE_TEST_IDS.includes(test.id) && !isPremium;
    
    if (isTestLocked) {
      showPaywall();
      return;
    }
    
    startTest(test);
  };

  const startTest = (test: IQTest) => {
    setSelectedTest(test);
    setCurrentQuestionIndex(0);
    setAnswers(new Map());
    setStartTime(Date.now());
    setTimeRemaining(test.timeLimit * test.questions.length);
    setShowExplanation(false);
    setViewState('test');
  };

  const handleAnswer = (answer: string | number) => {
    if (!selectedTest) return;
    const newAnswers = new Map(answers);
    newAnswers.set(selectedTest.questions[currentQuestionIndex].id, answer);
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (!selectedTest) return;
    
    if (showExplanation) {
      setShowExplanation(false);
      if (currentQuestionIndex < selectedTest.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        handleFinishTest();
      }
    } else {
      setShowExplanation(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0 && !showExplanation) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleFinishTest = async () => {
    if (!selectedTest) return;
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const result = calculateTestScore(selectedTest, answers, timeTaken);
    setTestResult(result);
    setViewState('results');
    
    // Save result to database and show milestone for first test
    if (user) {
      const previousTestCount = profile?.totalTestsTaken || 0;
      await saveTestResult(result);
      
      // Show first IQ test milestone
      if (previousTestCount === 0 && !hasShownFirstTestMilestone.current) {
        hasShownFirstTestMilestone.current = true;
        setTimeout(() => showMilestoneToast('first_iq_test'), 1500);
      }
    }
  };

  const handleRetake = () => {
    if (selectedTest) {
      startTest(selectedTest);
    }
  };

  const handleBackToTests = () => {
    setSelectedTest(null);
    setTestResult(null);
    setViewState('selection');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = selectedTest?.questions[currentQuestionIndex];
  const currentAnswer = currentQuestion ? answers.get(currentQuestion.id) : undefined;
  const isLastQuestion = selectedTest && currentQuestionIndex === selectedTest.questions.length - 1;
  const progress = selectedTest ? ((currentQuestionIndex + 1) / selectedTest.questions.length) * 100 : 0;

  return (
    <AppLayout>
      <Header 
        showBackButton={viewState !== 'selection'}
        onBack={viewState !== 'selection' ? handleBackToTests : undefined}
        title={viewState === 'selection' ? 'IQ Tests' : selectedTest?.name}
      />

      <div className="py-4 px-4">
        {viewState === 'selection' && (
          <>
            {/* Value-first hero for new users */}
            {!profile?.totalTestsTaken && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 rounded-2xl overflow-hidden border border-secondary/20 bg-gradient-to-br from-[hsl(217,30%,11%)] to-[hsl(217,30%,16%)]"
              >
                <div className="p-4">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-secondary mb-2">Why do the IQ test?</p>
                  <h2 className="font-heading text-lg font-bold text-white mb-3 leading-snug">
                    You can't improve what you don't measure.
                  </h2>
                  <div className="space-y-2.5">
                    {[
                      { icon: '🧠', text: 'See exactly which of your 6 intelligence types are strongest' },
                      { icon: '📚', text: 'Get personalised lesson recommendations from your score' },
                      { icon: '📈', text: 'Retake over weeks — watch your score rise as you learn' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <span className="text-lg leading-none flex-shrink-0">{item.icon}</span>
                        <p className="text-xs text-white/70 leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-secondary font-semibold mt-3">⚡ Takes ~10 minutes · First test is free</p>
                </div>
              </motion.div>
            )}
          </>
        )}
        <AnimatePresence mode="wait">
          {/* Test Selection */}
          {viewState === 'selection' && (
            <motion.div
              key="selection"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Brain card above IQ Profile */}
              <BrainRegionCard
                iqCategory="comprehensive"
                title="IQ Tests train your"
                compact={false}
                wide
              />
              <IQProgressCard variant="full" showHistory />

              {/* Test List */}
              <div id="available-tests" className="space-y-3">
                <h2 className="font-heading font-semibold text-foreground">Available Tests</h2>
                {allIQTests.map((test) => {
                  const isFreeTest = FREE_TEST_IDS.includes(test.id);
                  const isLocked = !isFreeTest && !isPremium;
                  
                  return (
                    <IQTestCard
                      key={test.id}
                      test={test}
                      onClick={() => handleTestClick(test)}
                      isPremium={!isFreeTest}
                      isLocked={isLocked}
                  />
                  );
                })}

                {/* Children's Tests Section */}
                <h2 className="font-heading font-semibold text-foreground mt-6">Children's Tests</h2>
                <p className="text-sm text-muted-foreground mb-3">Age-appropriate cognitive assessments for young learners</p>
                {childrenIQTests.map((test) => (
                  <IQTestCard
                    key={test.id}
                    test={test}
                    onClick={() => handleTestClick(test)}
                    isPremium={false}
                    isLocked={false}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Active Test */}
          {viewState === 'test' && selectedTest && currentQuestion && (
            <motion.div
              key="test"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Progress Header */}
              <div className="bg-card rounded-2xl border border-border p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-foreground">
                    Question {currentQuestionIndex + 1} of {selectedTest.questions.length}
                  </span>
                  <span className={`flex items-center gap-1 text-sm font-mono font-bold ${timeRemaining < 60 ? 'text-destructive' : 'text-foreground'}`}>
                    <Clock className="w-4 h-4" />
                    {formatTime(timeRemaining)}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Brain Region Card */}
              <BrainRegionCard
                iqCategory={selectedTest.category}
                title="This test trains your"
                compact
              />

              {/* Question Card */}
              <div className="bg-card rounded-2xl border border-border p-5">
                <IQTestQuestion
                  question={currentQuestion}
                  onAnswer={handleAnswer}
                  selectedAnswer={currentAnswer}
                  showResult={showExplanation}
                />
              </div>

              {/* Navigation */}
              <div className="flex gap-3">
                <Button
                  onClick={handlePrevious}
                  variant="outline"
                  disabled={currentQuestionIndex === 0 || showExplanation}
                  className="flex-1"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={currentAnswer === undefined}
                  className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  {showExplanation 
                    ? (isLastQuestion ? 'See Results' : 'Next Question')
                    : 'Submit Answer'
                  }
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Results */}
          {viewState === 'results' && testResult && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <IQTestResults
                result={testResult}
                onRetake={handleRetake}
                onBackToTests={handleBackToTests}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
};

export default IQTests;
