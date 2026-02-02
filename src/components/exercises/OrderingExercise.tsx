import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { GripVertical, CheckCircle, XCircle, RotateCcw, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrderingItem {
  id: string;
  content: string;
  correctPosition: number;
}

interface OrderingExerciseProps {
  items: OrderingItem[];
  instruction: string;
  onComplete: (allCorrect: boolean) => void;
}

export const OrderingExercise = ({ items, instruction, onComplete }: OrderingExerciseProps) => {
  const [orderedItems, setOrderedItems] = useState<OrderingItem[]>(() =>
    [...items].sort(() => Math.random() - 0.5)
  );
  const [showResults, setShowResults] = useState(false);

  const moveItem = useCallback((index: number, direction: 'up' | 'down') => {
    if (showResults) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= orderedItems.length) return;
    
    setOrderedItems(prev => {
      const newItems = [...prev];
      [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
      return newItems;
    });
  }, [showResults, orderedItems.length]);

  const handleCheck = () => {
    setShowResults(true);
    const allCorrect = orderedItems.every((item, index) => item.correctPosition === index + 1);
    onComplete(allCorrect);
  };

  const handleReset = () => {
    setOrderedItems([...items].sort(() => Math.random() - 0.5));
    setShowResults(false);
  };

  const correctCount = showResults 
    ? orderedItems.filter((item, index) => item.correctPosition === index + 1).length 
    : 0;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{instruction}</p>
      
      <div className="space-y-2">
        {orderedItems.map((item, index) => {
          const isCorrect = showResults && item.correctPosition === index + 1;
          const isWrong = showResults && item.correctPosition !== index + 1;
          
          return (
            <div
              key={item.id}
              className={cn(
                "flex items-center gap-2 p-3 rounded-lg border-2 transition-all",
                isCorrect && "border-success bg-success/10",
                isWrong && "border-destructive bg-destructive/10",
                !showResults && "border-border bg-card"
              )}
            >
              <GripVertical className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="flex-1 text-sm">{item.content}</span>
              
              {showResults ? (
                isCorrect ? (
                  <CheckCircle className="w-4 h-4 text-success shrink-0" />
                ) : (
                  <div className="flex items-center gap-1">
                    <XCircle className="w-4 h-4 text-destructive" />
                    <span className="text-xs text-muted-foreground">(#{item.correctPosition})</span>
                  </div>
                )
              ) : (
                <div className="flex gap-1">
                  <button
                    onClick={() => moveItem(index, 'up')}
                    disabled={index === 0}
                    className={cn(
                      "p-1 rounded hover:bg-muted transition-colors",
                      index === 0 && "opacity-30 cursor-not-allowed"
                    )}
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveItem(index, 'down')}
                    disabled={index === orderedItems.length - 1}
                    className={cn(
                      "p-1 rounded hover:bg-muted transition-colors",
                      index === orderedItems.length - 1 && "opacity-30 cursor-not-allowed"
                    )}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showResults && (
        <div className="text-center py-2">
          <p className="text-sm font-medium">
            {correctCount === items.length ? (
              <span className="text-success">Perfect order! 🎉</span>
            ) : (
              <span className="text-muted-foreground">{correctCount}/{items.length} in correct position</span>
            )}
          </p>
        </div>
      )}

      <div className="flex gap-2">
        {!showResults ? (
          <Button onClick={handleCheck} className="flex-1" size="sm">
            Check Order
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
