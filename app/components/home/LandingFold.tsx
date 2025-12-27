'use client';

import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ThemeContext } from '../ThemeProvider';

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

  const menuItems = [
    { label: 'Studio cases', href: '#cases' },
    { label: 'Services', href: '/services' },
    { label: 'About us', href: '/about-us' },
    { label: "Let's talk", href: '/contact' },
  ];

  return (
    <section className={`min-h-screen relative ${isDarkMode ? 'bg-[#222222]' : 'bg-white'}`}>
      <div className="container mx-auto px-6 py-8 md:py-16 min-h-screen flex flex-col justify-between">
        {/* Logo and Description */}
        <div>
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}
          >
            <Image
              src={isDarkMode ? "/luminalogo.svg" : "/luminalogo-dark.svg"}
              alt="LUMINA"
              width={140}
              height={35}
              className="h-9 w-auto mb-6"
              priority
            />
          </div>
          <p
            className={`text-big-description max-w-2xl transition-all duration-1000 delay-200 ease-out ${
              isDarkMode ? 'text-white/60' : 'text-neutral-500'
            } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}
          >
            We&apos;re a digital studio helping startups and businesses define who they are and what they build. From brand to product development, we turn vision into reality.
          </p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 flex flex-col justify-center py-4 md:py-12">
          {menuItems.map((item, index) => (
            <div key={item.label} className="group">
              <Link
                href={item.href}
                className={`block py-2 md:py-4 transition-all duration-1000 ease-out ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                }`}
                style={{ transitionDelay: `${500 + index * 150}ms` }}
              >
                <span
                  className={`text-huge-title transition-all duration-300 ${
                    isDarkMode
                      ? 'text-white/60 group-hover:text-white'
                      : 'text-neutral-400 group-hover:text-[#070606]'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
              {/* Bottom divider line with hover progress bar effect */}
              <div
                className={`h-px relative transition-all duration-1000 ease-out ${
                  isDarkMode ? 'bg-white/20' : 'bg-black/10'
                } ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
                style={{ transitionDelay: `${400 + index * 150}ms`, transformOrigin: 'left' }}
              >
                <div
                  className={`absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out ${
                    isDarkMode ? 'bg-white' : 'bg-black'
                  }`}
                />
              </div>
            </div>
          ))}
        </nav>

      </div>
    </section>
  );
}
