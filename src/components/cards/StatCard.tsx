import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  sublabel?: string;
  variant?: 'default' | 'accent';
}

export const StatCard = ({ icon: Icon, value, label, sublabel, variant = 'default' }: StatCardProps) => {
  return (
    <div className={cn(
      "rounded-xl p-4 text-center",
      variant === 'accent' 
        ? "bg-gradient-to-br from-secondary to-gold-dark text-secondary-foreground" 
        : "bg-card border border-border"
    )}>
      <Icon className={cn(
        "w-5 h-5 mx-auto mb-2",
        variant === 'accent' ? "text-secondary-foreground" : "text-secondary"
      )} />
      <div className={cn(
        "font-mono text-2xl font-bold",
        variant === 'accent' ? "text-secondary-foreground" : "text-foreground"
      )}>
        {value}
      </div>
      <div className={cn(
        "text-xs mt-1",
        variant === 'accent' ? "text-secondary-foreground/80" : "text-muted-foreground"
      )}>
        {label}
      </div>
      {sublabel && (
        <div className={cn(
          "text-[10px] mt-0.5",
          variant === 'accent' ? "text-secondary-foreground/60" : "text-muted-foreground/70"
        )}>
          {sublabel}
        </div>
      )}
    </div>
  );
};
