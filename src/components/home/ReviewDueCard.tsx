import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ReviewDueCardProps {
  dueCards: { id: string }[];
  totalCards: number;
}

export const ReviewDueCard = ({ dueCards, totalCards }: ReviewDueCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate('/progress?tab=review')}
      className={cn(
        "w-full text-left p-3 rounded-xl transition-all flex flex-col items-center justify-center min-h-[120px]",
        "bg-gradient-to-b from-[hsl(217,30%,14%)] to-[hsl(217,30%,18%)]",
        "border border-white/10 hover:border-secondary/30"
      )}
    >
      <div className="w-9 h-9 rounded-lg bg-secondary/20 flex items-center justify-center mb-2">
        <Brain className="w-4 h-4 text-secondary" />
      </div>
      <p className="text-[9px] text-white/40 uppercase tracking-wider mb-1">Review Due</p>
      <span className="font-heading text-2xl font-bold text-white">
        {dueCards.length}
      </span>
      <p className="text-[10px] text-white/40 mt-0.5">
        {totalCards} total cards
      </p>
    </motion.button>
  );
};
