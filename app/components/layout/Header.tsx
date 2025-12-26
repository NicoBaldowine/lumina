'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeProvider';

export default function Header() {
  const pathname = usePathname();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about-us', label: 'About us' },
    { href: '/services', label: 'Services' },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <>
      <header className={`fixed w-full top-0 z-50 backdrop-blur-xl transition-colors duration-300 ${
        isDarkMode ? 'bg-[#222222]/60' : 'bg-white/60'
      }`}>
        <nav className="w-full px-6 py-4">
          <div className="flex items-center">
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
              <Link
                href="/contact"
                className={`px-4 py-2 rounded-full text-small-description transition-all duration-300 ${
                  isActive('/contact')
                    ? (isDarkMode ? 'bg-white text-[#070606]' : 'bg-black text-white')
                    : isDarkMode
                      ? 'text-neutral-400 border border-white/20 hover:bg-white hover:text-[#070606]'
                      : 'text-neutral-500 border border-black/20 hover:bg-black hover:text-white'
                }`}
              >
                Let&apos;s talk
              </Link>
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

      <div className={`fixed inset-0 z-50 transition-transform duration-300 ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      } ${isDarkMode ? 'bg-[#222222]' : 'bg-white'}`}>
        <div className="w-full h-full px-6 pt-4 pb-8 flex flex-col">
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
    </>
  );
}
