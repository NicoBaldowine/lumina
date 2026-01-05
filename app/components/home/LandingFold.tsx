'use client';

import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { ThemeContext } from '../ThemeProvider';
import { GradientBackground } from '../ui/GradientBackground';

interface LandingFoldProps {
  onScrollPast: (isPast: boolean) => void;
}

export default function LandingFold({ onScrollPast }: LandingFoldProps) {
  const { isDarkMode } = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animations
    const timer = setTimeout(() => setIsVisible(true), 100);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const foldHeight = window.innerHeight;
      onScrollPast(scrollY > foldHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onScrollPast]);

  return (
    <GradientBackground
      variant={isDarkMode ? 'dark' : 'light'}
      interactive={true}
    >
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-[1400px] mx-auto px-6 pt-[72px] pb-32 flex flex-col items-center justify-center text-center">
          {/* Hero Title */}
          <h1
            className={`text-superbig-title max-w-4xl mb-6 transition-all duration-500 ease-out ${
              isDarkMode ? 'text-white' : 'text-black'
            } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            We help startups build products with identity, not just features.
          </h1>

          {/* Description */}
          <p
            className={`text-big-description max-w-2xl mb-10 transition-all duration-500 delay-75 ease-out ${
              isDarkMode ? 'text-white/80' : 'text-neutral-500'
            } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            From brand and product design to MVP development, we build what founders need to show their work to users and investors from day one.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-row gap-3 transition-all duration-500 delay-150 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <button
              onClick={() => {
                const element = document.getElementById('cases');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`px-6 py-3 rounded-full text-small-description transition-colors ${
                isDarkMode
                  ? 'bg-white text-[#070606] hover:bg-neutral-200'
                  : 'bg-black text-white hover:bg-neutral-800'
              }`}
            >
              See cases
            </button>
            <Link
              href="/services"
              className={`px-6 py-3 rounded-full text-small-description border transition-colors ${
                isDarkMode
                  ? 'border-white/20 text-white/70 hover:bg-white/10'
                  : 'border-black/20 text-neutral-500 hover:bg-black/5'
              }`}
            >
              Our services
            </Link>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
}
