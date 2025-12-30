'use client';

import { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';
import ActionButton from '../ui/ActionButton';

export default function Hero() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <section className={`relative min-h-[60vh] md:min-h-[80vh] flex items-start justify-center overflow-hidden pt-[100px] pb-[80px] md:pt-[200px] md:pb-[200px] ${
      isDarkMode ? 'bg-[#222222]' : 'bg-white'
    }`}>
      <div className="container relative z-10 mx-auto px-6">
        <h1 className="text-big-title text-left mb-6 max-w-[1200px]">
          <span className={`bg-clip-text text-transparent ${
            isDarkMode
              ? 'bg-gradient-to-r from-white to-[#666666]'
              : 'bg-gradient-to-r from-[#070606] to-[#666666]'
          }`}>
            Grow your business with simple,<br />
            innovative & effective design.
          </span>
        </h1>
        <p className={`text-big-description text-left ${
          isDarkMode ? 'text-white/40' : 'text-neutral-500'
        } mb-8 max-w-[600px]`}>
          Describe how you use data analysis to inform website design and marketing strategies,
          <br className="hidden md:block" />
          optimizing for better engagement and conversion rates.
        </p>
        <div className="flex gap-4">
          <ActionButton href="/contact" variant="filled">
            Contact us
          </ActionButton>
          <ActionButton href="/services">
            Services
          </ActionButton>
        </div>
      </div>
    </section>
  );
}
