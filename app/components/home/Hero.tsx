'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';

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
          <Link
            href="/contact"
            className={`inline-flex px-4 py-2 rounded-full text-sm leading-relaxed tracking-[-0.01em] transition-all duration-300 ${
              isDarkMode
                ? 'text-white bg-[#333333] hover:bg-[#444444]'
                : 'text-white bg-[#070606] hover:bg-[#333333]'
            }`}
          >
            Contact us
          </Link>
          <Link
            href="/services"
            className={`inline-flex px-4 py-2 rounded-full text-sm leading-relaxed tracking-[-0.01em] transition-all duration-300 ${
              isDarkMode
                ? 'text-neutral-400 border border-white/20 hover:bg-white hover:text-[#070606]'
                : 'text-neutral-500 border border-[#070606]/20 hover:bg-[#070606] hover:text-white'
            }`}
          >
            Services
          </Link>
        </div>
      </div>
    </section>
  );
}
