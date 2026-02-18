import { useState, useEffect } from 'react';
import { Home, Users, Sparkles, BookOpen, Brain, Flame } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Discover', path: '/' },
  { icon: Flame, label: 'Feed', path: '/feed' },
  { icon: Sparkles, label: 'The Path', path: '/the-path' },
  { icon: Users, label: 'Geniuses', path: '/geniuses' },
  { icon: BookOpen, label: 'My Path', path: '/my-path' },
];

export const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  // Hide bottom nav when keyboard is open (input/textarea focused)
  useEffect(() => {
    const onFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        setKeyboardOpen(true);
      }
    };
    const onFocusOut = () => {
      setKeyboardOpen(false);
    };

    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);
    return () => {
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
    };
  }, []);

  if (keyboardOpen) return null;

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center justify-around h-16 mx-auto px-0">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={(e) => {
                // When already on The Path, navigate to reset module selection (back to landing)
                if (item.path === '/the-path' && isActive) {
                  e.preventDefault();
                  navigate('/the-path', { state: { resetModule: true } });
                  window.dispatchEvent(new CustomEvent('the-path-reset'));
                }
              }}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full relative",
                "transition-colors duration-200 touch-manipulation",
                isActive ? "text-secondary" : "text-muted-foreground"
              )}
            >
              <motion.div
                initial={false}
                animate={{ scale: isActive ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="relative"
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-secondary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.div>
              <span className={cn(
                "text-[10px] mt-1 font-medium",
                isActive ? "text-secondary" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
