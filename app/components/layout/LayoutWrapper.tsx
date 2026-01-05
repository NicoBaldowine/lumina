'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [showFooter, setShowFooter] = useState(!isHomePage);

  useEffect(() => {
    if (!isHomePage) {
      setShowFooter(true);
      return;
    }

    const handleFoldVisibility = (event: CustomEvent<{ isPastFold: boolean }>) => {
      setShowFooter(event.detail.isPastFold);
    };

    window.addEventListener('foldVisibility', handleFoldVisibility as EventListener);

    return () => {
      window.removeEventListener('foldVisibility', handleFoldVisibility as EventListener);
    };
  }, [isHomePage]);

  return (
    <>
      <Header />

      <main>{children}</main>

      <div
        className={`transition-all duration-500 ease-out ${
          showFooter
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-full pointer-events-none'
        }`}
      >
        <Footer />
      </div>
    </>
  );
}
