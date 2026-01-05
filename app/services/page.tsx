'use client';

import { useState, useContext } from 'react';
import { ThemeContext } from '../components/ThemeProvider';
import ImageWithLoader from '../components/ui/ImageWithLoader';

const services = [
  {
    id: 'brand-design',
    title: 'Brand Design',
    headline: 'Building clear, credible brand foundations for early-stage startups.',
    bullets: [
      'Brand positioning and direction',
      'Visual identity systems (logo, color, typography)',
      'Digital-first brand guidelines',
    ],
    image: '/brand_services.png',
  },
  {
    id: 'web-landing',
    title: 'Web & Landing Pages',
    headline: 'High-quality landing pages designed to convert and build trust.',
    bullets: [
      'Product and startup landing pages',
      'Messaging structure and content hierarchy',
      'Conversion-focused layouts',
      'Visual systems aligned with the brand',
    ],
    image: '/web_services.png',
  },
  {
    id: 'product-design',
    title: 'Product Design',
    headline: 'Designing usable, web or app products that are ready to ship.',
    bullets: [
      'Product definition and MVP scoping',
      'User flows for web and mobile products',
      'UX/UI for web and mobile products',
      'Design systems ready for development and scale',
    ],
    image: '/app_services.png',
  },
  {
    id: 'research',
    title: 'Research',
    headline: 'Understanding users to build products that actually matter.',
    bullets: [
      'Market research and niche validation',
      'Business model and idea validation with real users',
      'Interface testing with high-fidelity prototypes',
      'User interviews to prioritize features and roadmap',
    ],
    image: '/research_services.png',
  },
  {
    id: 'mvp-development',
    title: 'MVP Development',
    headline: 'Building real, production-ready MVPs, not throwaway demos.',
    bullets: [
      'Web and mobile MVP development',
      'Fast iteration using modern tools and AI-assisted workflows',
      'Tight collaboration between design and build',
      'Products ready to sell, test, or pitch',
    ],
    image: '/tech_services.png',
  },
];

export default function ServicesPage() {
  const { isDarkMode } = useContext(ThemeContext);
  const [activeService, setActiveService] = useState(services[0]);

  return (
    <main className="min-h-screen pt-[72px]">
      <div className="max-w-[1200px] mx-auto px-6 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left side - Title, description and service selector */}
          <div>
            <h1 className={`text-big-title mb-6 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>
              We help early-stage startups turn ideas into real products.
            </h1>
            <p className={`text-big-description mb-12 ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              We design, brand, and build world-class MVPs that founders can confidently use to validate ideas, attract users, and raise capital.
            </p>

            {/* Service list with dividers */}
            <div>
              {services.map((service, index) => (
                <div key={service.id}>
                  <button
                    onClick={() => setActiveService(service)}
                    className={`w-full text-left py-4 transition-all duration-300 group ${
                      activeService.id === service.id
                        ? isDarkMode ? 'text-white' : 'text-black'
                        : isDarkMode ? 'text-neutral-500 hover:text-white' : 'text-neutral-400 hover:text-black'
                    }`}
                  >
                    <span className="text-medium-title">{service.title}</span>
                  </button>
                  {index < services.length - 1 && (
                    <div className={`h-px ${isDarkMode ? 'bg-neutral-700' : 'bg-neutral-200'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Service details */}
          <div key={activeService.id} className="animate-fade-in">
            <h2 className={`text-medium-title mb-8 transition-opacity duration-500 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>
              {activeService.headline}
            </h2>
            <ul className="space-y-6 mb-8">
              {activeService.bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-small-description ${
                    isDarkMode ? 'bg-neutral-700 text-neutral-400' : 'bg-neutral-200 text-neutral-500'
                  }`}>
                    {index + 1}
                  </span>
                  <span className={`text-big-description pt-1 ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}>
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
            <div className="relative aspect-[4/3] overflow-hidden">
              <ImageWithLoader
                src={activeService.image}
                alt={activeService.title}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
