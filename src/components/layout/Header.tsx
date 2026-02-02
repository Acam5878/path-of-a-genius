import { Bell, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showLogo?: boolean;
  showBackButton?: boolean;
  onBack?: () => void;
  rightActions?: React.ReactNode;
}

export const Header = ({ 
  title, 
  showLogo = false, 
  showBackButton = false,
  onBack,
  rightActions 
}: HeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <header 
      className="sticky z-40 bg-background/95 backdrop-blur-lg border-b border-border"
      style={{ top: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
        <div className="flex items-center gap-2">
          {showBackButton && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleBack}
              className="text-muted-foreground hover:text-foreground -ml-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          {showLogo ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-heading text-sm">P</span>
              </div>
              <span className="font-heading text-lg font-semibold text-primary">Path of a Genius</span>
            </div>
          ) : (
            <h1 className="font-heading text-xl font-semibold text-foreground">{title}</h1>
          )}
        </div>
        
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