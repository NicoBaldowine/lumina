'use client';

import { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';
import ActionButton from '../ui/ActionButton';

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

          <div className="flex justify-end">
            <ActionButton href="/contact">
              Contact us
            </ActionButton>
          </div>
        </div>
      </nav>
    </footer>
  );
}
