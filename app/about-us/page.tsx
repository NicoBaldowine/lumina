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
              Lumina is a digital studio focused on building world-class MVPs.
            </h1>
            <p
              className={`text-big-description mb-12 transition-all duration-1000 delay-200 ease-out ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              We partner with early-stage founders to design, brand, and build products that are ready to launch. Not just prototypes, but real MVPs that can attract users, close sales, and raise capital.
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
            <h2
              className={`text-medium-title mb-8 transition-all duration-1000 delay-100 ease-out ${
                isDarkMode ? 'text-white' : 'text-black'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              We don&apos;t just design ideas. We help founders turn them into real products.
            </h2>

            <p
              className={`text-big-description mb-12 transition-all duration-1000 delay-300 ease-out ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              Most studios hand off designs and wish you luck. We stay with you from the first sketch to the shipped product. Our team works side by side with founders, defining what to build, how it should look, and making sure it actually works in the hands of real users.
            </p>

            <h2
              className={`text-medium-title mb-8 transition-all duration-1000 delay-500 ease-out ${
                isDarkMode ? 'text-white' : 'text-black'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              Built as one system, not disconnected pieces.
            </h2>

            <p
              className={`text-big-description transition-all duration-1000 delay-700 ease-out ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              When brand, product, and development live in separate silos, things break. Details get lost. The result feels fragmented. At Lumina, we own the entire process: from visual identity to user flows to production code. Everything connects. Your brand speaks through every screen, every interaction, every line of code. One team, one vision, one cohesive product.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
