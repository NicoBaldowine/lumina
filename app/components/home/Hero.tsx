'use client';

import { Inter_Tight } from 'next/font/google';
import Link from 'next/link';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';

const interTight = Inter_Tight({ subsets: ['latin'] });

export default function Hero() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <section className={`relative min-h-[80vh] flex items-start justify-center overflow-hidden pt-[200px] pb-[200px] ${
      isDarkMode ? 'bg-[#070606]' : 'bg-white'
    }`}>
      <div className="container relative z-10 mx-auto px-6">
        <h1 
          className="text-left text-[clamp(40px,6.5vw,82px)] leading-[0.95] tracking-[-2px] mb-6 max-w-[1200px]" 
          style={{ fontFamily: 'Cabinet Grotesk' }}
        >
          <div className={`${
            isDarkMode 
              ? 'bg-gradient-to-r from-white to-[#666666]' 
              : 'bg-gradient-to-r from-[#070606] to-[#666666]'
          } bg-clip-text text-transparent`}>
            Grow your business with simple,<br />
            innovative & effective design.
          </div>
        </h1>
        <p className={`text-left text-[16px] leading-[1.4] tracking-[0px] ${
          isDarkMode ? 'text-white/40' : 'text-[rgb(153,153,153)]'
        } mb-8 max-w-[600px] ${interTight.className}`}>
          Describe how you use data analysis to inform website design and marketing strategies,<br className="hidden md:block" />
          optimizing for better engagement and conversion rates.
        </p>
        <div className="flex gap-4">
          <Link 
            href="/contact" 
            className={`inline-flex px-4 py-2 rounded-full text-[14px] leading-[1.6] tracking-[-0.01em] ${
              isDarkMode 
                ? 'text-white bg-[#333333] hover:bg-[#444444]' 
                : 'text-white bg-[#070606] hover:bg-[#333333]'
            } transition-all duration-300`}
          >
            Contact us
          </Link>
          <Link 
            href="/services" 
            className={`inline-flex px-4 py-2 rounded-full text-[14px] leading-[1.6] tracking-[-0.01em] ${
              isDarkMode 
                ? 'text-[#999999] border border-white/20 hover:bg-white hover:text-[#070606]'
                : 'text-[#666666] border border-[#070606]/20 hover:bg-[#070606] hover:text-white'
            } transition-all duration-300`}
          >
            Services
          </Link>
        </div>
      </div>
    </section>
  );
}
