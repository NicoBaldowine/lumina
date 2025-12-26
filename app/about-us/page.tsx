'use client';

import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../components/ThemeProvider';

export default function AboutUsPage() {
  const { isDarkMode } = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen pt-[72px]">
      <div className="max-w-[1200px] mx-auto px-6 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left side */}
          <div>
            <h1
              className={`text-big-title mb-6 transition-all duration-1000 ease-out ${
                isDarkMode ? 'text-white' : 'text-black'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              We&apos;re Lumina. We help Businesses find clarity, direction, and growth.
            </h1>
            <p
              className={`text-big-description mb-12 transition-all duration-1000 delay-200 ease-out ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              We&apos;re a digital studio focused on illuminating ideas — helping startups and businesses define who they are, what they build, and how they show up in the world. From brand to product, we turn vision into reality.
            </p>

            {/* Placeholder image */}
            <div
              className={`aspect-[4/3] transition-all duration-1000 delay-400 ease-out ${
                isDarkMode ? 'bg-neutral-700' : 'bg-neutral-300'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            />
          </div>

          {/* Right side */}
          <div>
            <p
              className={`text-big-description mb-8 transition-all duration-1000 delay-100 ease-out ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              We help businesses and startups bring their ideas to life, from first sketches to real, working digital products. At Lumina, we design interfaces, build brands, and code websites and apps that actually ship.
            </p>

            <h2
              className={`text-medium-title mb-8 transition-all duration-1000 delay-300 ease-out ${
                isDarkMode ? 'text-white' : 'text-black'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              To illuminate is to guide. To design is to shape. To build is to grow.
            </h2>

            <p
              className={`text-big-description mb-8 transition-all duration-1000 delay-500 ease-out ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              Our foundation is built on three simple principles: clarity, to simplify the complex; direction, to align vision with execution; and growth, to create things that evolve and scale. At Lumina, we exist to bring light to the path forward — whether you&apos;re launching something new or evolving what&apos;s already working.
            </p>

            <p
              className={`text-big-description transition-all duration-1000 delay-700 ease-out ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              We&apos;re a digital studio focused on illuminating ideas — helping startups and businesses define who they are, what they build, and how they show up in the world. From brand to product, we bring vision into reality.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
