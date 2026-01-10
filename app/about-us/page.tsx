'use client';

import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../components/ThemeProvider';
import ImageWithLoader from '../components/ui/ImageWithLoader';

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
              A design studio to partner with, from idea to released product.
            </h1>
            <p
              className={`text-big-description mb-12 transition-all duration-1000 delay-200 ease-out ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              We&apos;re a digital design studio that supports startups from idea to early launch, helping them build a strong brand and a production-ready MVP.
            </p>

            {/* About Us Image */}
            <div
              className={`relative aspect-[4/3] overflow-hidden transition-all duration-1000 delay-400 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <ImageWithLoader
                src="/aboutus.png"
                alt="Lumina Digital Studio"
              />
            </div>

            {/* Lumina name origin */}
            <p
              className={`text-small-description mt-6 transition-all duration-1000 delay-500 ease-out ${
                isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              Lumina — from the Latin word for light. Like the aurora borealis that illuminates the darkest skies, we bring clarity and direction to startups finding their way.
            </p>
          </div>

          {/* Right side */}
          <div>
            <h2
              className={`text-medium-title mb-8 transition-all duration-1000 delay-100 ease-out ${
                isDarkMode ? 'text-white' : 'text-black'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              In a landscape full of generic products, standing out matters more than ever.
            </h2>

            <p
              className={`text-big-description mb-12 transition-all duration-1000 delay-300 ease-out ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              Early startups often struggle to make a strong first impression. We focus on aligning brand and product so customers and investors perceive a solid and trustworthy company from the start.
            </p>

            <h2
              className={`text-medium-title mb-8 transition-all duration-1000 delay-500 ease-out ${
                isDarkMode ? 'text-white' : 'text-black'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              Professional and cohesive, when it matters most.
            </h2>

            <p
              className={`text-big-description transition-all duration-1000 delay-700 ease-out ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              Most studios hand off designs and wish you luck. We stay with you from the first sketch to the shipped product. Our team works side by side with startups, defining what to build, how it should look, and making sure it actually works in the hands of real users. One team, one vision, one cohesive product.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
