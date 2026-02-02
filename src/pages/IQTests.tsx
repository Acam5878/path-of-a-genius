import { useState, useEffect, useRef } from 'react';
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
import { useIQPersistence } from '@/hooks/useIQPersistence';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { showMilestoneToast } from '@/components/milestones/MilestoneToast';
import { 
  allIQTests, 
  IQTest, 
  TestResult, 
  calculateTestScore,
  categoryDisplayNames 
} from '@/data/iqTests';

type ViewState = 'selection' | 'test' | 'results';

// First test (Verbal Reasoning) is free, rest require premium
const FREE_TEST_ID = 'verbal-reasoning-1';

const IQTests = () => {
  const { user } = useAuth();
  const { isPremium, showPaywall } = useSubscription();
  const { profile, saveTestResult, canTakeTestToday } = useIQPersistence();
  const hasShownFirstTestMilestone = useRef(false);
  
  const [viewState, setViewState] = useState<ViewState>('selection');
  const [selectedTest, setSelectedTest] = useState<IQTest | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, string | number>>(new Map());
  const [startTime, setStartTime] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

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
    const isTestLocked = test.id !== FREE_TEST_ID && !isPremium;
    
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
        onBack={viewState === 'test' ? handleBackToTests : undefined}
        title={viewState === 'selection' ? 'IQ Tests' : selectedTest?.name}
      />

      <div className="py-4 px-4">
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
              {/* IQ Progress - shows profile and history */}
              <IQProgressCard variant="full" showHistory />

              {/* Test List */}
              <div className="space-y-3">
                <h2 className="font-heading font-semibold text-foreground">Available Tests</h2>
                {allIQTests.map((test) => {
                  const isFreeTest = test.id === FREE_TEST_ID;
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
