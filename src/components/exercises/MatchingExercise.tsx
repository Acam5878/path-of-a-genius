import { useState } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

interface MatchingExerciseProps {
  pairs: MatchingPair[];
  instruction: string;
  onComplete: (allCorrect: boolean) => void;
}

export const MatchingExercise = ({ pairs, instruction, onComplete }: MatchingExerciseProps) => {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  
  // Shuffle the right side items
  const [shuffledRight] = useState(() => 
    [...pairs].sort(() => Math.random() - 0.5).map(p => ({ id: p.id, right: p.right }))
  );

  const handleLeftClick = (id: string) => {
    if (showResults) return;
    setSelectedLeft(selectedLeft === id ? null : id);
  };

  const handleRightClick = (rightId: string) => {
    if (showResults || !selectedLeft) return;
    
    // Check if this right item is already matched
    const existingMatch = Object.entries(matches).find(([, v]) => v === rightId);
    if (existingMatch) {
      // Remove the existing match
      setMatches(prev => {
        const newMatches = { ...prev };
        delete newMatches[existingMatch[0]];
        return newMatches;
      });
    }
    
    setMatches(prev => ({ ...prev, [selectedLeft]: rightId }));
    setSelectedLeft(null);
  };

  const handleCheck = () => {
    setShowResults(true);
    const correctCount = pairs.filter(p => matches[p.id] === p.id).length;
    onComplete(correctCount === pairs.length);
  };

  const handleReset = () => {
    setMatches({});
    setSelectedLeft(null);
    setShowResults(false);
  };

  const allMatched = Object.keys(matches).length === pairs.length;
  const correctCount = showResults ? pairs.filter(p => matches[p.id] === p.id).length : 0;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{instruction}</p>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Left column */}
        <div className="space-y-2">
          {pairs.map((pair) => {
            const isSelected = selectedLeft === pair.id;
            const isMatched = matches[pair.id];
            const isCorrect = showResults && matches[pair.id] === pair.id;
            const isWrong = showResults && matches[pair.id] && matches[pair.id] !== pair.id;
            
            return (
              <button
                key={pair.id}
                onClick={() => handleLeftClick(pair.id)}
                disabled={showResults}
                className={cn(
                  "w-full p-3 rounded-lg border-2 text-left text-sm transition-all",
                  isSelected && "border-secondary bg-secondary/10",
                  isMatched && !showResults && "border-muted-foreground/30 bg-muted/50",
                  isCorrect && "border-success bg-success/10",
                  isWrong && "border-destructive bg-destructive/10",
                  !isSelected && !isMatched && !showResults && "border-border hover:border-secondary/50 bg-card"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span>{pair.left}</span>
                  {isCorrect && <CheckCircle className="w-4 h-4 text-success shrink-0" />}
                  {isWrong && <XCircle className="w-4 h-4 text-destructive shrink-0" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right column */}
        <div className="space-y-2">
          {shuffledRight.map((item) => {
            const matchedBy = Object.entries(matches).find(([, v]) => v === item.id)?.[0];
            const isCorrect = showResults && matchedBy === item.id;
            const isWrong = showResults && matchedBy && matchedBy !== item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleRightClick(item.id)}
                disabled={showResults || !selectedLeft}
                className={cn(
                  "w-full p-3 rounded-lg border-2 text-left text-sm transition-all",
                  matchedBy && !showResults && "border-muted-foreground/30 bg-muted/50",
                  isCorrect && "border-success bg-success/10",
                  isWrong && "border-destructive bg-destructive/10",
                  !matchedBy && !showResults && selectedLeft && "border-border hover:border-secondary/50 bg-card cursor-pointer",
                  !matchedBy && !showResults && !selectedLeft && "border-border bg-card opacity-60"
                )}
              >
                {item.right}
              </button>
            );
          })}
        </div>
      </div>

      {showResults && (
        <div className="text-center py-4">
          <p className="text-sm font-medium">
            {correctCount === pairs.length ? (
              <span className="text-success">Perfect! All matches correct! 🎉</span>
            ) : (
              <span className="text-muted-foreground">{correctCount}/{pairs.length} correct</span>
            )}
          </p>
        </div>
      )}

      <div className="flex gap-2">
        {!showResults ? (
          <Button
            onClick={handleCheck}
            disabled={!allMatched}
            className="flex-1"
            size="sm"
          >
            Check Matches
          </Button>
        ) : (
          <Button
            onClick={handleReset}
            variant="outline"
            className="flex-1"
            size="sm"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};
