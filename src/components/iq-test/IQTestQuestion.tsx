import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { IQQuestion } from '@/data/iqTypes';
import { Input } from '@/components/ui/input';
import { Check, X } from 'lucide-react';
import { IQQuestionVisual } from './IQQuestionVisual';

interface IQTestQuestionProps {
  question: IQQuestion;
  onAnswer: (answer: string | number) => void;
  selectedAnswer?: string | number;
  showResult?: boolean;
}

export const IQTestQuestion = ({ 
  question, 
  onAnswer, 
  selectedAnswer,
  showResult = false 
}: IQTestQuestionProps) => {
  const [numericAnswer, setNumericAnswer] = useState('');

  // Reset numeric answer when question changes
  useEffect(() => {
    setNumericAnswer(selectedAnswer !== undefined ? String(selectedAnswer) : '');
  }, [question.id]);

  const handleSelect = (answer: string) => {
    if (!showResult) {
      onAnswer(answer);
    }
  };

  const handleNumericChange = (value: string) => {
    setNumericAnswer(value);
    const num = Number(value);
    if (!isNaN(num)) {
      onAnswer(num);
    }
  };

  const isCorrect = showResult && String(selectedAnswer) === String(question.correctAnswer);

  return (
    <div className="space-y-4">
      {/* Visual Aid (if applicable) */}
      <IQQuestionVisual question={question} />

      {/* Question */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-heading text-lg font-medium text-foreground leading-relaxed">
          {question.question}
        </h3>
        <span className="shrink-0 px-3 py-1 bg-secondary/20 text-secondary rounded-full text-xs font-mono font-bold">
          {question.points} pts
        </span>
      </div>

      {/* Options or Input */}
      {question.type === 'numeric-input' ? (
        <div className="space-y-2">
          <Input
            type="number"
            value={numericAnswer}
            onChange={(e) => handleNumericChange(e.target.value)}
            placeholder="Enter your answer"
            disabled={showResult}
            className="text-lg font-mono"
          />
        </div>
      ) : (
        <div className="space-y-2">
          {question.options?.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrectOption = option === question.correctAnswer;
            
            return (
              <motion.button
                key={index}
                onClick={() => handleSelect(option)}
                disabled={showResult}
                whileTap={!showResult ? { scale: 0.98 } : undefined}
                className={cn(
                  "w-full p-4 text-left rounded-xl border-2 transition-all flex items-center gap-3",
                  !showResult && !isSelected && "border-border bg-card hover:border-secondary/50",
                  !showResult && isSelected && "border-secondary bg-secondary/10",
                  showResult && isCorrectOption && "border-success bg-success/10",
                  showResult && isSelected && !isCorrectOption && "border-destructive bg-destructive/10"
                )}
              >
                <span className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
                  !showResult && !isSelected && "bg-muted text-muted-foreground",
                  !showResult && isSelected && "bg-secondary text-secondary-foreground",
                  showResult && isCorrectOption && "bg-success text-success-foreground",
                  showResult && isSelected && !isCorrectOption && "bg-destructive text-destructive-foreground"
                )}>
                  {showResult && isCorrectOption ? (
                    <Check className="w-4 h-4" />
                  ) : showResult && isSelected && !isCorrectOption ? (
                    <X className="w-4 h-4" />
                  ) : (
                    String.fromCharCode(65 + index)
                  )}
                </span>
                <span className="text-foreground">{option}</span>
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Explanation (shown after answering) */}
      {showResult && question.explanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "p-4 rounded-xl",
            isCorrect ? "bg-success/10 border border-success/20" : "bg-destructive/10 border border-destructive/20"
          )}
        >
          <p className={cn(
            "font-bold mb-2 flex items-center gap-2",
            isCorrect ? "text-success" : "text-destructive"
          )}>
            {isCorrect ? (
              <>
                <Check className="w-4 h-4" /> Correct!
              </>
            ) : (
              <>
                <X className="w-4 h-4" /> Incorrect
              </>
            )}
          </p>
          <p className="text-sm text-muted-foreground">{question.explanation}</p>
        </motion.div>
      )}
    </div>
  );
};
