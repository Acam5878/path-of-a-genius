import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { IQQuestion } from '@/data/iqTypes';
import { Check, X } from 'lucide-react';
import { IQQuestionVisual } from './IQQuestionVisual';

// Generate plausible wrong answers for numeric questions
const generateNumericOptions = (correctAnswer: number, questionId: string): string[] => {
  const correct = correctAnswer;
  const distractors = new Set<number>();
  
  // Add nearby values
  if (Number.isInteger(correct)) {
    distractors.add(correct + 1);
    distractors.add(correct - 1);
    if (correct > 3) distractors.add(correct * 2);
    if (correct > 1) distractors.add(Math.floor(correct / 2));
    distractors.add(correct + 2);
    distractors.add(correct - 2);
    distractors.add(correct + 3);
  } else {
    distractors.add(Math.round(correct));
    distractors.add(+(correct + 1.5).toFixed(1));
    distractors.add(+(correct - 1.5).toFixed(1));
    distractors.add(+(correct * 2).toFixed(1));
  }
  
  // Remove the correct answer and negatives
  distractors.delete(correct);
  const validDistractors = Array.from(distractors).filter(d => d > 0);
  
  // Pick 3 distractors
  const picked = validDistractors.slice(0, 3);
  while (picked.length < 3) {
    picked.push(correct + picked.length + 2);
  }
  
  // Combine and shuffle deterministically using questionId
  const options = [String(correct), ...picked.map(String)];
  // Simple seeded shuffle
  let seed = questionId.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  for (let i = options.length - 1; i > 0; i--) {
    seed = (seed * 31 + 7) % 1000;
    const j = seed % (i + 1);
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
};

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
  // Convert numeric-input questions to multiple choice
  const effectiveQuestion = useMemo(() => {
    if (question.type === 'numeric-input' && typeof question.correctAnswer === 'number') {
      return {
        ...question,
        type: 'multiple-choice' as const,
        options: generateNumericOptions(question.correctAnswer, question.id),
        correctAnswer: String(question.correctAnswer),
      };
    }
    return question;
  }, [question]);

  const handleSelect = (answer: string) => {
    if (!showResult) {
      onAnswer(answer);
    }
  };

  const isCorrect = showResult && String(selectedAnswer) === String(effectiveQuestion.correctAnswer);

  return (
    <div className="space-y-4">
      {/* Visual Aid (if applicable) */}
      <IQQuestionVisual question={effectiveQuestion} />

      {/* Question */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-heading text-lg font-medium text-foreground leading-relaxed">
          {effectiveQuestion.question}
        </h3>
        <span className="shrink-0 px-3 py-1 bg-secondary/20 text-secondary rounded-full text-xs font-mono font-bold">
          {effectiveQuestion.points} pts
        </span>
      </div>

      {/* Options */}
      <div className="space-y-2">
          {effectiveQuestion.options?.map((option, index) => {
            const isSelected = String(selectedAnswer) === String(option);
            const isCorrectOption = String(option) === String(effectiveQuestion.correctAnswer);
            
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

      {/* Explanation (shown after answering) */}
      {showResult && effectiveQuestion.explanation && (
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
          <p className="text-sm text-muted-foreground">{effectiveQuestion.explanation}</p>
        </motion.div>
      )}
    </div>
  );
};
