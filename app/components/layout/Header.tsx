'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeProvider';
import { Inter_Tight } from 'next/font/google';

const interTight = Inter_Tight({ subsets: ['latin'] });

export default function Header() {
  const pathname = usePathname();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header className={`fixed w-full top-0 z-50 backdrop-blur-xl transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-[#070606]/60' 
          : 'bg-white/60'
      }`}>
        <nav className={`container mx-auto px-6 py-4 ${interTight.className}`}>
          <div className="flex items-center">
            {/* Logo - Left */}
            <Link 
              href="/" 
              className="hover:opacity-80 transition-opacity"
            >
              <img 
                src={isDarkMode ? "/luminalogo.svg" : "/luminalogo-dark.svg"}
                alt="LUMINA" 
                className="h-10 w-auto"
              />
            </Link>

            {/* Navigation - Right aligned with flex-end */}
            <div className="hidden md:flex items-center justify-end flex-1 space-x-16 mr-16">
              <Link 
                href="/" 
                className={`text-[14px] leading-[1.6] tracking-[-0.01em] transition-colors ${
                  isActive('/') 
                    ? (isDarkMode ? 'text-white' : 'text-black') 
                    : (isDarkMode ? 'text-[#999999] hover:text-white' : 'text-[#666666] hover:text-black')
                }`}
              >
                Home
              </Link>
              <Link 
                href="/about-us" 
                className={`text-[14px] leading-[1.6] tracking-[-0.01em] transition-colors ${
                  isActive('/about-us') 
                    ? (isDarkMode ? 'text-white' : 'text-black') 
                    : (isDarkMode ? 'text-[#999999] hover:text-white' : 'text-[#666666] hover:text-black')
                }`}
              >
                About us
              </Link>
              <Link 
                href="/services" 
                className={`text-[14px] leading-[1.6] tracking-[-0.01em] transition-colors ${
                  isActive('/services') 
                    ? (isDarkMode ? 'text-white' : 'text-black') 
                    : (isDarkMode ? 'text-[#999999] hover:text-white' : 'text-[#666666] hover:text-black')
                }`}
              >
                Services
              </Link>
              <Link 
                href="/blog" 
                className={`text-[14px] leading-[1.6] tracking-[-0.01em] transition-colors ${
                  isActive('/blog') 
                    ? (isDarkMode ? 'text-white' : 'text-black') 
                    : (isDarkMode ? 'text-[#999999] hover:text-white' : 'text-[#666666] hover:text-black')
                }`}
              >
                Blog
              </Link>
            </div>

            {/* Right side buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleTheme}
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
                className={`px-4 py-2 rounded-full text-[14px] leading-[1.6] tracking-[-0.01em] transition-all duration-300 ${
                  isActive('/contact') 
                    ? (isDarkMode ? 'bg-white text-[#070606]' : 'bg-black text-white')
                    : isDarkMode 
                      ? 'text-[#999999] border border-white/20 hover:bg-white hover:text-[#070606]'
                      : 'text-[#666666] border border-black/20 hover:bg-black hover:text-white'
                }`}
              >
                Let&apos;s talk
              </Link>
            </div>

            {/* Mobile menu button */}
            <button 
              className={`md:hidden ml-auto ${isDarkMode ? 'text-white' : 'text-black'}`}
              onClick={() => setIsMenuOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-50 transition-transform duration-500 ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-end mb-8">
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="text-white p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className={`flex flex-col space-y-6 ${interTight.className}`}>
            <Link 
              href="/" 
              className="text-[24px] text-white hover:text-white/80"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/about-us" 
              className="text-[24px] text-white hover:text-white/80"
              onClick={() => setIsMenuOpen(false)}
            >
              About us
            </Link>
            <Link 
              href="/services" 
              className="text-[24px] text-white hover:text-white/80"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              href="/blog" 
              className="text-[24px] text-white hover:text-white/80"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              href="/contact" 
              className="text-[24px] text-white hover:text-white/80"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
