import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, RotateCcw, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

interface CalculatorVariable {
  id: string;
  label: string;
  unit?: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}

interface CalculatorExerciseProps {
  title: string;
  instruction: string;
  formula: string;
  formulaDisplay: string;
  variables: CalculatorVariable[];
  targetQuestion: string;
  targetAnswer: number;
  tolerance?: number; // percentage tolerance for answer
  onComplete: (correct: boolean) => void;
}

export const CalculatorExercise = ({
  title,
  instruction,
  formula,
  formulaDisplay,
  variables,
  targetQuestion,
  targetAnswer,
  tolerance = 5,
  onComplete,
}: CalculatorExerciseProps) => {
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(variables.map(v => [v.id, v.defaultValue]))
  );
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Calculate result based on formula
  const [calculatedResult, setCalculatedResult] = useState<number>(0);

  useEffect(() => {
    try {
      // Create a safe eval context with the variable values
      const evalContext = { ...values, Math };
      const result = new Function(...Object.keys(evalContext), `return ${formula}`)(...Object.values(evalContext));
      setCalculatedResult(typeof result === 'number' && isFinite(result) ? result : 0);
    } catch {
      setCalculatedResult(0);
    }
  }, [values, formula]);

  const handleSliderChange = (id: string, value: number[]) => {
    setValues(prev => ({ ...prev, [id]: value[0] }));
  };

  const handleCheck = () => {
    const answer = parseFloat(userAnswer);
    const toleranceRange = targetAnswer * (tolerance / 100);
    const correct = !isNaN(answer) && Math.abs(answer - targetAnswer) <= toleranceRange;
    setIsCorrect(correct);
    setShowResult(true);
    onComplete(correct);
  };

  const handleReset = () => {
    setValues(Object.fromEntries(variables.map(v => [v.id, v.defaultValue])));
    setUserAnswer('');
    setShowResult(false);
    setIsCorrect(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-secondary">
        <Calculator className="w-4 h-4" />
        <span className="text-sm font-medium">{title}</span>
      </div>
      
      <p className="text-sm text-muted-foreground">{instruction}</p>

      {/* Formula Display */}
      <div className="bg-muted/50 rounded-lg p-3 text-center">
        <code className="text-lg font-mono text-foreground">{formulaDisplay}</code>
      </div>

      {/* Variable Sliders */}
      <div className="space-y-4">
        {variables.map((variable) => (
          <div key={variable.id} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{variable.label}</span>
              <span className="font-mono font-medium">
                {values[variable.id]}{variable.unit && ` ${variable.unit}`}
              </span>
            </div>
            <Slider
              value={[values[variable.id]]}
              onValueChange={(value) => handleSliderChange(variable.id, value)}
              min={variable.min}
              max={variable.max}
              step={variable.step}
              disabled={showResult}
            />
          </div>
        ))}
      </div>

      {/* Live Calculation */}
      <div className="bg-card border border-border rounded-lg p-3">
        <div className="text-xs text-muted-foreground mb-1">Calculated Result:</div>
        <div className="font-mono text-xl font-bold text-secondary">
          {calculatedResult.toFixed(2)}
        </div>
      </div>

      {/* Question */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
        <p className="text-sm font-medium text-foreground mb-2">{targetQuestion}</p>
        <div className="flex gap-2">
          <Input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Your answer..."
            disabled={showResult}
            className={cn(
              showResult && isCorrect && "border-success bg-success/10",
              showResult && !isCorrect && "border-destructive bg-destructive/10"
            )}
          />
          {showResult && (
            isCorrect ? (
              <CheckCircle className="w-6 h-6 text-success shrink-0 self-center" />
            ) : (
              <XCircle className="w-6 h-6 text-destructive shrink-0 self-center" />
            )
          )}
        </div>
      </div>

      {showResult && !isCorrect && (
        <p className="text-sm text-center">
          <span className="text-muted-foreground">Correct answer: </span>
          <span className="text-success font-medium">{targetAnswer}</span>
        </p>
      )}

      <div className="flex gap-2">
        {!showResult ? (
          <Button
            onClick={handleCheck}
            disabled={!userAnswer.trim()}
            className="flex-1"
            size="sm"
          >
            Check Answer
          </Button>
        ) : (
          <Button onClick={handleReset} variant="outline" className="flex-1" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};
