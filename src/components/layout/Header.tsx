import { Search, ArrowLeft, Settings, User, LogIn, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { NotificationPanel } from '@/components/notifications/NotificationPanel';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
  const { user, signOut } = useAuth();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <header 
      className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border"
    >
      <div className="flex items-center justify-between h-14 px-4 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto">
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
              <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-foreground">
                <Link to="/progress">
                  <BarChart3 className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Search className="w-5 h-5" />
              </Button>
              <NotificationPanel />
              <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-foreground">
                <Link to="/settings">
                  <Settings className="w-5 h-5" />
                </Link>
              </Button>
              
              {/* Account Button */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                      <User className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium truncate">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="cursor-pointer">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-foreground">
                  <Link to="/auth">
                    <LogIn className="w-5 h-5" />
                  </Link>
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};