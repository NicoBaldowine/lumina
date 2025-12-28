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
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between py-6 md:py-0 md:h-[72px] gap-4 md:gap-0">
          <span className={`text-small-description text-center md:text-left ${
            isDarkMode ? 'text-[#999999]' : 'text-[#666666]'
          }`}>
            © 2025 Lumina Digital Studio LLC
          </span>

          <Link
            href="/contact"
            className={`px-4 py-2 rounded-full text-small-description transition-all duration-300 text-center ${
              isDarkMode
                ? 'text-[#999999] border border-white/20 hover:bg-white hover:text-[#070606]'
                : 'text-[#666666] border border-black/20 hover:bg-black hover:text-white'
            }`}
          >
            Contact us
          </Link>
        </div>
      </nav>
    </footer>
  );
}
