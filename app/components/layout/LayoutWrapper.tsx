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
  const [showHeaderFooter, setShowHeaderFooter] = useState(!isHomePage);

  useEffect(() => {
    if (!isHomePage) {
      setShowHeaderFooter(true);
      return;
    }

    const handleFoldVisibility = (event: CustomEvent<{ isPastFold: boolean }>) => {
      setShowHeaderFooter(event.detail.isPastFold);
    };

    window.addEventListener('foldVisibility', handleFoldVisibility as EventListener);

    return () => {
      window.removeEventListener('foldVisibility', handleFoldVisibility as EventListener);
    };
  }, [isHomePage]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          showHeaderFooter
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <Header />
      </div>

      <main>{children}</main>

      <div
        className={`transition-all duration-500 ease-out ${
          showHeaderFooter
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-full pointer-events-none'
        }`}
      >
        <Footer />
      </div>
    </>
  );
}
