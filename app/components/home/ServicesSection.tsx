'use client';

import Image from 'next/image';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';
import ActionButton from '../ui/ActionButton';

export default function ServicesSection() {
  const { isDarkMode } = useContext(ThemeContext);

  const services = [
    {
      title: "Brand Design",
      description: "Building clear, credible brand foundations for early-stage startups.",
      image: "/Brand.png",
    },
    {
      title: "Web & Landing Pages",
      description: "High-quality landing pages designed to convert and build trust.",
      image: "/Web.png",
    },
    {
      title: "Product Design",
      description: "Designing usable, web or app products that are ready to ship.",
      image: "/Product.png",
    },
    {
      title: "MVP Development",
      description: "Building real, production-ready MVPs, not throwaway demos.",
      image: "/Development.png",
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
          <ActionButton href="/services">
            All Services
          </ActionButton>
        </div>
        {/* Mobile layout - horizontal list items */}
        <div className="flex flex-col gap-6 md:hidden">
          {services.map((service, index) => (
            <div key={index} className="flex items-start gap-4">
              <div
                className={`w-[70px] h-[70px] flex-shrink-0 flex items-center justify-center ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className="w-[50px] h-[50px] relative">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="space-y-1">
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

        {/* Desktop layout - grid with images in containers */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {services.map((service, index) => (
            <div key={index}>
              <div
                className={`aspect-[16/9] mb-4 flex items-center justify-center ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className="w-[113px] h-[113px] relative">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
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
