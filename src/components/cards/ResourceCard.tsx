import { motion } from 'framer-motion';
import { Book, Video, FileText, GraduationCap, ExternalLink } from 'lucide-react';
import { StudyResource } from '@/data/geniuses';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ResourceCardProps {
  resource: StudyResource;
  index?: number;
}

const typeIcons = {
  book: Book,
  video: Video,
  article: FileText,
  course: GraduationCap,
};

const typeColors = {
  book: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  video: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  article: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  course: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
};

export const ResourceCard = ({ resource, index = 0 }: ResourceCardProps) => {
  const Icon = typeIcons[resource.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-card border border-border rounded-xl p-4 hover:border-secondary/50 transition-colors"
    >
      <div className="flex gap-3">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0", typeColors[resource.type])}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-semibold text-sm text-foreground line-clamp-1">{resource.title}</h4>
              <p className="text-xs text-muted-foreground">{resource.author}</p>
            </div>
            {resource.price && (
              <span className={cn(
                "text-xs font-mono font-bold px-2 py-0.5 rounded-full flex-shrink-0",
                resource.price === "Free" || resource.price === "Free Online" 
                  ? "bg-success/10 text-success" 
                  : "bg-secondary/10 text-secondary"
              )}>
                {resource.price}
              </span>
            )}
          </div>
          
          {resource.provider && (
            <span className="text-[10px] text-muted-foreground">via {resource.provider}</span>
          )}
          
          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{resource.description}</p>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="mt-2 h-7 text-xs text-secondary hover:text-secondary hover:bg-secondary/10 p-0"
            onClick={() => window.open(resource.url, '_blank')}
          >
            View Resource <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
