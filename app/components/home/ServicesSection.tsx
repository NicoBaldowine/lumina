'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';

export default function ServicesSection() {
  const { isDarkMode } = useContext(ThemeContext);

  const services = [
    {
      title: "Product Design",
      description: "Crafting intuitive and visually appealing designs that enhance brand identity and deliver exceptional user experiences.",
    },
    {
      title: "Web Design",
      description: "Strategic web designs to boost site visibility and enhance user engagement through modern, responsive solutions.",
    },
    {
      title: "Brand Design",
      description: "Building distinctive brand identities that forge strong connections and leave lasting impressions on your audience.",
    },
    {
      title: "Development",
      description: "Transforming designs into functional, performant applications with clean code and modern technologies.",
    }
  ];

  return (
    <section className="py-16 md:py-32">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <h2 className={`text-medium-title ${
            isDarkMode ? 'text-white/90' : 'text-neutral-800'
          }`}>
            Services
          </h2>
          <Link
            href="/services"
            className={`px-4 py-2 rounded-full text-sm leading-relaxed tracking-[-0.01em] transition-all duration-300 ${
              isDarkMode
                ? 'text-neutral-400 border border-white/20 hover:bg-white hover:text-[#070606]'
                : 'text-neutral-500 border border-black/20 hover:bg-black hover:text-white'
            }`}
          >
            All Services
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {services.map((service, index) => (
            <div key={index}>
              <div
                className={`aspect-[16/9] mb-4 ${
                  isDarkMode ? 'bg-neutral-700' : 'bg-neutral-300'
                }`}
              />
              <div className="space-y-2">
                <h3 className={`text-card-title ${
                  isDarkMode ? 'text-white/90' : 'text-neutral-800'
                }`}>
                  {service.title}
                </h3>
                <p className={`text-small-description ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}>
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
