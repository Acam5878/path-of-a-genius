import { useState } from 'react';
import { QuizQuestion } from '@/data/quizzes';
import { Button } from '@/components/ui/button';
import { Check, X, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LessonQuizProps {
  questions: QuizQuestion[];
  onComplete: (passed: boolean) => void;
}

export const LessonQuiz = ({ questions, onComplete }: LessonQuizProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = selectedAnswers[currentIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const allAnswered = selectedAnswers.every(a => a !== null);

  const handleSelectAnswer = (optionIndex: number) => {
    if (showExplanation) return; // Don't allow changes after submitting
    const newAnswers = [...selectedAnswers];
    newAnswers[currentIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleCheckAnswer = () => {
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRetry = () => {
    setSelectedAnswers(new Array(questions.length).fill(null));
    setCurrentIndex(0);
    setShowResults(false);
    setShowExplanation(false);
  };

  const correctCount = selectedAnswers.filter(
    (answer, i) => answer === questions[i].correctAnswer
  ).length;
  const passed = correctCount >= Math.ceil(questions.length * 0.67); // 2/3 correct to pass

  if (showResults) {
    return (
      <div className="bg-muted/30 rounded-lg p-5 text-center">
        <div className={cn(
          "w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center",
          passed ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
        )}>
          {passed ? <Check className="w-8 h-8" /> : <X className="w-8 h-8" />}
        </div>
        
        <h3 className="font-heading text-lg mb-2">
          {passed ? "Quiz Passed! 🎉" : "Keep Practicing"}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4">
          You got {correctCount} out of {questions.length} correct
          {passed ? ". You can now mark this lesson complete!" : ". You need at least 2/3 correct to pass."}
        </p>

        <div className="flex gap-3 justify-center">
          <Button variant="outline" size="sm" onClick={handleRetry}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Retry Quiz
          </Button>
          {passed && (
            <Button 
              size="sm" 
              className="bg-success hover:bg-success/90 text-white"
              onClick={() => onComplete(true)}
            >
              <Check className="w-4 h-4 mr-2" />
              Complete Lesson
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-muted/30 rounded-lg p-4">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-muted-foreground">
          Question {currentIndex + 1} of {questions.length}
        </span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                i === currentIndex
                  ? "bg-secondary"
                  : selectedAnswers[i] !== null
                  ? selectedAnswers[i] === questions[i].correctAnswer
                    ? "bg-success"
                    : "bg-destructive"
                  : "bg-muted-foreground/30"
              )}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <h4 className="font-medium text-sm mb-4">{currentQuestion.question}</h4>

      {/* Options */}
      <div className="space-y-2 mb-4">
        {currentQuestion.options.map((option, i) => {
          const isSelected = selectedAnswer === i;
          const isCorrectOption = i === currentQuestion.correctAnswer;
          
          let optionStyle = "border-border hover:border-secondary/50 hover:bg-secondary/5";
          if (showExplanation) {
            if (isCorrectOption) {
              optionStyle = "border-success bg-success/10 text-success";
            } else if (isSelected && !isCorrectOption) {
              optionStyle = "border-destructive bg-destructive/10 text-destructive";
            }
          } else if (isSelected) {
            optionStyle = "border-secondary bg-secondary/10";
          }

          return (
            <button
              key={i}
              onClick={() => handleSelectAnswer(i)}
              disabled={showExplanation}
              className={cn(
                "w-full text-left p-3 rounded-lg border text-sm transition-all",
                optionStyle,
                showExplanation && "cursor-default"
              )}
            >
              <span className="font-mono text-xs mr-2">
                {String.fromCharCode(65 + i)}.
              </span>
              {option}
              {showExplanation && isCorrectOption && (
                <Check className="w-4 h-4 inline ml-2" />
              )}
              {showExplanation && isSelected && !isCorrectOption && (
                <X className="w-4 h-4 inline ml-2" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className={cn(
          "p-3 rounded-lg mb-4 text-sm",
          isCorrect ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
        )}>
          <p className="font-medium mb-1">
            {isCorrect ? "Correct!" : "Not quite right."}
          </p>
          <p className="text-foreground/80">{currentQuestion.explanation}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-2">
        {!showExplanation ? (
          <Button
            size="sm"
            onClick={handleCheckAnswer}
            disabled={selectedAnswer === null}
          >
            Check Answer
          </Button>
        ) : (
          <Button size="sm" onClick={handleNext}>
            {currentIndex < questions.length - 1 ? "Next Question" : "See Results"}
          </Button>
        )}
      </div>
    </div>
  );
};
