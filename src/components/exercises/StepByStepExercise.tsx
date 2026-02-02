import { useState } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, ChevronRight, Lightbulb, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Step {
  id: string;
  instruction: string;
  hint?: string;
  workedExample?: string;
  expectedAnswer: string;
  acceptableAnswers?: string[]; // Alternative correct answers
}

interface StepByStepExerciseProps {
  title: string;
  problem: string;
  steps: Step[];
  onComplete: (allCorrect: boolean) => void;
}

export const StepByStepExercise = ({ title, problem, steps, onComplete }: StepByStepExerciseProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [stepResults, setStepResults] = useState<Record<string, boolean>>({});
  const [showHint, setShowHint] = useState(false);
  const [showWorkedExample, setShowWorkedExample] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const step = steps[currentStep];
  const isCurrentStepChecked = stepResults[step?.id] !== undefined;
  const isCurrentCorrect = stepResults[step?.id];

  const checkAnswer = () => {
    const userAnswer = answers[step.id]?.toLowerCase().trim() || '';
    const correct = step.expectedAnswer.toLowerCase() === userAnswer ||
      step.acceptableAnswers?.some(a => a.toLowerCase() === userAnswer) ||
      userAnswer.includes(step.expectedAnswer.toLowerCase());
    
    setStepResults(prev => ({ ...prev, [step.id]: correct }));
    setShowHint(false);
    setShowWorkedExample(false);
  };

  const nextStep = () => {
    if (currentStep === steps.length - 1) {
      setIsComplete(true);
      const correctCount = Object.values(stepResults).filter(Boolean).length;
      onComplete(correctCount === steps.length);
    } else {
      setCurrentStep(prev => prev + 1);
      setShowHint(false);
      setShowWorkedExample(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setStepResults({});
    setShowHint(false);
    setShowWorkedExample(false);
    setIsComplete(false);
  };

  if (isComplete) {
    const correctCount = Object.values(stepResults).filter(Boolean).length;
    const allCorrect = correctCount === steps.length;

    return (
      <div className="text-center py-6 space-y-4">
        <div className={cn(
          "w-16 h-16 rounded-full mx-auto flex items-center justify-center",
          allCorrect ? "bg-success/20" : "bg-muted"
        )}>
          {allCorrect ? (
            <CheckCircle className="w-8 h-8 text-success" />
          ) : (
            <span className="text-2xl font-bold">{correctCount}/{steps.length}</span>
          )}
        </div>
        <div>
          <h3 className="font-heading text-lg font-semibold">
            {allCorrect ? "Excellent Work!" : "Good Progress!"}
          </h3>
          <p className="text-sm text-muted-foreground">
            You completed {correctCount} of {steps.length} steps correctly.
          </p>
        </div>
        <Button onClick={handleReset} variant="outline" size="sm">
          <RotateCcw className="w-4 h-4 mr-2" />
          Practice Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Title & Problem */}
      <div>
        <h4 className="font-medium text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground mt-1">{problem}</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-1">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <div className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
              i < currentStep && stepResults[s.id] && "bg-success text-success-foreground",
              i < currentStep && !stepResults[s.id] && "bg-destructive text-destructive-foreground",
              i === currentStep && "bg-secondary text-secondary-foreground",
              i > currentStep && "bg-muted text-muted-foreground"
            )}>
              {i < currentStep && stepResults[s.id] ? (
                <CheckCircle className="w-4 h-4" />
              ) : i < currentStep && !stepResults[s.id] ? (
                <XCircle className="w-4 h-4" />
              ) : (
                i + 1
              )}
            </div>
            {i < steps.length - 1 && (
              <ChevronRight className="w-4 h-4 text-muted-foreground mx-1" />
            )}
          </div>
        ))}
      </div>

      {/* Current Step */}
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <div className="text-xs text-secondary font-medium">Step {currentStep + 1}</div>
        <p className="text-sm font-medium">{step.instruction}</p>
        
        <Input
          value={answers[step.id] || ''}
          onChange={(e) => setAnswers(prev => ({ ...prev, [step.id]: e.target.value }))}
          placeholder="Your answer..."
          disabled={isCurrentStepChecked}
          className={cn(
            isCurrentStepChecked && isCurrentCorrect && "border-success bg-success/10",
            isCurrentStepChecked && !isCurrentCorrect && "border-destructive bg-destructive/10"
          )}
        />

        {/* Hint & Worked Example Buttons */}
        {!isCurrentStepChecked && (step.hint || step.workedExample) && (
          <div className="flex gap-2 text-xs">
            {step.hint && (
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-1 text-secondary hover:underline"
              >
                <Lightbulb className="w-3 h-3" />
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
            )}
            {step.workedExample && (
              <button
                onClick={() => setShowWorkedExample(!showWorkedExample)}
                className="text-muted-foreground hover:underline"
              >
                {showWorkedExample ? 'Hide Example' : 'Show Worked Example'}
              </button>
            )}
          </div>
        )}

        {showHint && step.hint && (
          <div className="text-xs text-muted-foreground bg-muted/50 rounded p-2">
            💡 {step.hint}
          </div>
        )}

        {showWorkedExample && step.workedExample && (
          <div className="text-xs bg-secondary/10 border border-secondary/20 rounded p-2">
            <div className="font-medium text-secondary mb-1">Worked Example:</div>
            <div className="text-foreground">{step.workedExample}</div>
          </div>
        )}

        {/* Correct Answer (if wrong) */}
        {isCurrentStepChecked && !isCurrentCorrect && (
          <div className="text-sm">
            <span className="text-muted-foreground">Correct: </span>
            <span className="text-success font-medium">{step.expectedAnswer}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {!isCurrentStepChecked ? (
          <Button
            onClick={checkAnswer}
            disabled={!answers[step.id]?.trim()}
            className="flex-1"
            size="sm"
          >
            Check Step
          </Button>
        ) : (
          <Button onClick={nextStep} className="flex-1" size="sm">
            {currentStep === steps.length - 1 ? 'Complete' : 'Next Step'}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
};
