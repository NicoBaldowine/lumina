'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ThemeContext } from '../ThemeProvider';
import ActionButton from '../ui/ActionButton';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Check if we're on a case study page or blog post detail page
  const isCasePage = pathname.startsWith('/cases/');
  const isBlogPostPage = pathname.startsWith('/blog/') && pathname !== '/blog';
  const showBackButton = isCasePage || isBlogPostPage;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const isActive = (path: string) => pathname === path;

  const handleBack = () => {
    router.back();
  };

  const navLinks = [
    { href: '/#cases', label: 'Cases' },
    { href: '/about-us', label: 'About us' },
    { href: '/services', label: 'Services' },
    { href: '/blog', label: 'Stories' },
    { href: '/#stage', label: 'For Founders' },
  ];

  // Mobile menu component to be rendered via portal
  const MobileMenu = () => (
    <div
      className={`fixed inset-0 transition-opacity duration-300 md:hidden ${
        isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      style={{ zIndex: 9999 }}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 ${isDarkMode ? 'bg-[#222222]' : 'bg-white'}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Menu content */}
      <div
        className={`relative w-full h-full px-6 pt-4 pb-8 flex flex-col ${
          isDarkMode ? 'bg-[#222222]' : 'bg-white'
        }`}
        style={{
          paddingTop: 'max(16px, env(safe-area-inset-top))',
          paddingBottom: 'max(32px, env(safe-area-inset-bottom))'
        }}
      >
        <div className="flex items-center justify-between mb-12">
          <Image
            src={isDarkMode ? "/luminalogo.svg" : "/luminalogo-dark.svg"}
            alt="LUMINA"
            width={140}
            height={35}
            className="h-9 w-auto"
          />
          <button
            onClick={() => setIsMenuOpen(false)}
            className={`p-2 -mr-2 ${isDarkMode ? 'text-white' : 'text-black'}`}
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col space-y-1">
          {[...navLinks, { href: '/contact', label: 'Contact' }].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-medium-title-mobile py-3 transition-colors ${
                isActive(link.href)
                  ? (isDarkMode ? 'text-white' : 'text-black')
                  : (isDarkMode ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-black')
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-8 flex items-center justify-between">
          <button
            onClick={() => { toggleTheme(); }}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`p-2 -ml-2 rounded-full border transition-colors ${
              isDarkMode
                ? 'border-white/20 hover:bg-white/10'
                : 'border-black/20 hover:bg-black/10'
            }`}
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            )}
          </button>
          <span className={`text-small-description ${
            isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
          }`}>
            © 2024 Lumina Studio
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <header className={`fixed w-full top-0 z-50 backdrop-blur-xl transition-colors duration-300 ${
        isDarkMode ? 'bg-[#222222]/60' : 'bg-white/60'
      }`}>
        <nav className="w-full px-6 py-4">
          <div className="flex items-center">
            {/* Left element - fixed width container to prevent layout shift */}
            <div className="w-[140px] flex items-center">
              {showBackButton ? (
                <button
                  onClick={handleBack}
                  aria-label="Go back"
                  className={`p-2 rounded-full border transition-colors ${
                    isDarkMode
                      ? 'border-white/20 hover:bg-white/10 text-white'
                      : 'border-black/20 hover:bg-black/10 text-black'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                </button>
              ) : (
                <Link href="/" className="hover:opacity-80 transition-opacity">
                  <Image
                    src={isDarkMode ? "/luminalogo.svg" : "/luminalogo-dark.svg"}
                    alt="LUMINA"
                    width={140}
                    height={35}
                    className="h-9 w-auto"
                    priority
                  />
                </Link>
              )}
            </div>

            <div className="hidden md:flex items-center justify-end flex-1 space-x-16 mr-16">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-small-description transition-colors ${
                    isActive(link.href)
                      ? (isDarkMode ? 'text-white' : 'text-black')
                      : (isDarkMode ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-black')
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                className={`p-2 rounded-full border transition-colors ${
                  isDarkMode
                    ? 'border-white/20 hover:bg-white/10'
                    : 'border-black/20 hover:bg-black/10'
                }`}
              >
                {isDarkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                  </svg>
                )}
              </button>
              <ActionButton href="/contact" isActive={isActive('/contact')}>
                Let&apos;s talk
              </ActionButton>
            </div>

            <button
              className={`md:hidden ml-auto ${isDarkMode ? 'text-white' : 'text-black'}`}
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu rendered via portal to escape stacking context */}
      {mounted && createPortal(<MobileMenu />, document.body)}
    </>
  );
}
