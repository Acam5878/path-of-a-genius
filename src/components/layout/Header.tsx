import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  title?: string;
  showLogo?: boolean;
  rightActions?: React.ReactNode;
}

export const Header = ({ title, showLogo = false, rightActions }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
      <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
        {showLogo ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-heading text-sm">G</span>
            </div>
            <span className="font-heading text-lg font-semibold text-primary">Genius Academy</span>
          </div>
        ) : (
          <h1 className="font-heading text-xl font-semibold text-foreground">{title}</h1>
        )}
        
        <div className="flex items-center gap-1">
          {rightActions || (
            <>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full" />
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
