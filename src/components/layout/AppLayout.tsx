import { ReactNode } from 'react';
import { BottomNav } from './BottomNav';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div 
      className="min-h-screen bg-background"
      style={{ 
        paddingTop: 'env(safe-area-inset-top)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)'
      }}
    >
      <main className="pb-20 max-w-lg mx-auto">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};
