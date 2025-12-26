'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';

export default function Footer() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <footer className={`border-t transition-colors duration-300 ${
      isDarkMode
        ? 'border-white/10 bg-[#222222]'
        : 'border-black/10 bg-white'
    }`}>
      <nav className="w-full px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-6 md:py-0 md:h-[72px] gap-6 md:gap-0">
          <div className="flex items-center justify-between md:justify-start gap-6 md:gap-12">
            <div className="flex items-center gap-6 md:gap-12">
              <Link
                href="/terms"
                className={`text-small-description transition-colors ${
                  isDarkMode
                    ? 'text-[#999999] hover:text-white'
                    : 'text-[#666666] hover:text-black'
                }`}
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className={`text-small-description transition-colors ${
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
                className={`text-small-description transition-colors ${
                  isDarkMode
                    ? 'text-[#999999] hover:text-white'
                    : 'text-[#666666] hover:text-black'
                }`}
              >
                LinkedIn
              </a>
            </div>
            <Link
              href="/contact"
              className={`md:hidden px-4 py-2 rounded-full text-small-description transition-all duration-300 ${
                isDarkMode
                  ? 'text-[#999999] border border-white/20 hover:bg-white hover:text-[#070606]'
                  : 'text-[#666666] border border-black/20 hover:bg-black hover:text-white'
              }`}
            >
              Contact us
            </Link>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-6 md:gap-12">
            <span className={`text-small-description ${
              isDarkMode ? 'text-[#999999]' : 'text-[#666666]'
            }`}>
              © 2024 Lumina Studio, LLC
            </span>
            <Link
              href="/contact"
              className={`hidden md:inline-flex px-4 py-2 rounded-full text-small-description transition-all duration-300 ${
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
