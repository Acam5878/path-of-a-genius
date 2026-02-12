import { ReactNode } from 'react';
import { BottomNav } from './BottomNav';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div 
      className="min-h-screen bg-background overflow-x-hidden"
      style={{ 
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)'
      }}
    >
      <main 
        className="pb-20 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto px-4 md:px-6 lg:px-8"
        style={{ 
          paddingTop: 'env(safe-area-inset-top, 0px)',
          WebkitOverflowScrolling: 'touch' 
        }}
      >
        {children}
      </main>
      <BottomNav />
    </div>
  );
};
