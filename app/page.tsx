'use client';

import { useState, useEffect, useRef } from 'react';
import { useContext } from 'react';
import { ThemeContext } from './components/ThemeProvider';
import LandingFold from './components/home/LandingFold';
import ProjectsGrid from './components/home/ProjectsGrid';
import ServicesSection from './components/home/ServicesSection';
import BlogSection from './components/home/BlogSection';

export default function Home() {
  const { isDarkMode } = useContext(ThemeContext);
  const [isPastFold, setIsPastFold] = useState(false);
  const [showCases, setShowCases] = useState(false);
  const casesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Dispatch custom event to control header/footer visibility
    window.dispatchEvent(new CustomEvent('foldVisibility', { detail: { isPastFold } }));
  }, [isPastFold]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowCases(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (casesRef.current) {
      observer.observe(casesRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Landing Fold - First screen */}
      <LandingFold onScrollPast={setIsPastFold} />

      {/* Main Content - Cases section */}
      <section
        ref={casesRef}
        id="cases"
        className={`py-24 ${isDarkMode ? 'bg-[#222222]' : 'bg-white'}`}
      >
        <div
          className={`transition-all duration-1000 ease-out ${
            showCases ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          <ProjectsGrid />
        </div>
      </section>

      <div
        className={`transition-all duration-1000 delay-300 ease-out ${
          showCases ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
        }`}
      >
        <ServicesSection />
        <BlogSection />
      </div>
    </div>
  );
}
