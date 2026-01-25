import { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SectionProps {
  title: string;
  action?: {
    label: string;
    href: string;
  };
  children: ReactNode;
  className?: string;
}

export const Section = ({ title, action, children, className }: SectionProps) => {
  return (
    <section className={className}>
      <div className="flex items-center justify-between mb-3 px-4">
        <h2 className="font-heading text-lg font-semibold text-foreground">{title}</h2>
        {action && (
          <Link 
            to={action.href}
            className="text-sm text-secondary flex items-center gap-0.5 hover:underline"
          >
            {action.label} <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
};
