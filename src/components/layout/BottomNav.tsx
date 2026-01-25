import { Home, Users, BookOpen, BarChart2, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Discover', path: '/' },
  { icon: Users, label: 'Geniuses', path: '/geniuses' },
  { icon: BookOpen, label: 'My Path', path: '/my-path' },
  { icon: BarChart2, label: 'Progress', path: '/progress' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border safe-area-pb">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
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
