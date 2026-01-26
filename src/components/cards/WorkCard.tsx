import { motion } from 'framer-motion';
import { ExternalLink, BookOpen, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Work } from '@/data/works';

interface WorkCardProps {
  work: Work;
  index: number;
}

export const WorkCard = ({ work, index }: WorkCardProps) => {
  const handlePurchase = () => {
    window.open(work.amazonUrl, '_blank', 'noopener,noreferrer');
  };

  const formatYear = (year: number | string) => {
    if (typeof year === 'string') return year;
    if (year < 0) return `${Math.abs(year)} BC`;
    return year.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-card rounded-xl border border-border overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-foreground leading-tight">
              {work.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Published {formatYear(work.year)}
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-5 h-5 text-secondary" />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="p-4 space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {work.description}
        </p>

        {/* Impact Section */}
        <div className="bg-gradient-to-br from-secondary/5 to-accent/5 rounded-lg p-3 border border-secondary/10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-xs font-semibold text-secondary uppercase tracking-wide">
              Historical Impact
            </span>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            {work.impact}
          </p>
        </div>

        {/* Purchase Button */}
        <Button
          onClick={handlePurchase}
          className="w-full bg-[#FF9900] hover:bg-[#FF9900]/90 text-white font-semibold"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Buy on Amazon
        </Button>
      </div>
    </motion.div>
  );
};
