'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';

export default function Footer() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <footer className={`border-t transition-colors duration-300 ${
      isDarkMode 
        ? 'border-white/10 bg-[#070606]' 
        : 'border-black/10 bg-white'
    }`}>
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between h-[72px]">
          <div className="flex items-center space-x-12">
            <Link 
              href="/terms" 
              className={`text-[14px] leading-[1.6] tracking-[-0.01em] transition-colors ${
                isDarkMode 
                  ? 'text-[#999999] hover:text-white' 
                  : 'text-[#666666] hover:text-black'
              }`}
            >
              Terms
            </Link>
            <Link 
              href="/privacy" 
              className={`text-[14px] leading-[1.6] tracking-[-0.01em] transition-colors ${
                isDarkMode 
                  ? 'text-[#999999] hover:text-white' 
                  : 'text-[#666666] hover:text-black'
              }`}
            >
              Privacy
            </Link>
            <a 
              href="https://linkedin.com/company/lumina-studio" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`text-[14px] leading-[1.6] tracking-[-0.01em] transition-colors ${
                isDarkMode 
                  ? 'text-[#999999] hover:text-white' 
                  : 'text-[#666666] hover:text-black'
              }`}
            >
              LinkedIn
            </a>
          </div>
          
          <div className="flex items-center space-x-12">
            <span className={`text-[14px] leading-[1.6] tracking-[-0.01em] ${
              isDarkMode ? 'text-[#999999]' : 'text-[#666666]'
            }`}>
              © 2024 Lumina Studio, LLC
            </span>
            <Link 
              href="/contact" 
              className={`px-4 py-2 rounded-full text-[14px] leading-[1.6] tracking-[-0.01em] transition-all duration-300 ${
                isDarkMode 
                  ? 'text-[#999999] border border-white/20 hover:bg-white hover:text-[#070606]'
                  : 'text-[#666666] border border-black/20 hover:bg-black hover:text-white'
              }`}
            >
              Contact us
            </Link>
          </div>
        </div>
      </nav>
    </footer>
  );
}
