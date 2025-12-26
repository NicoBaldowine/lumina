'use client';

import { useState, useContext } from 'react';
import { ThemeContext } from '../components/ThemeProvider';

const services = [
  {
    id: 'product-design',
    title: 'Product Design',
    headline: 'Designing digital products that work, scale, and feel intuitive',
    description: 'In Product Design, we map out complete user journeys using interaction flows, wireframes, and prototypes to ensure clarity and usability. We create scalable design systems that maintain consistency across screens and platforms. Our focus is on building thoughtful interfaces that are both intuitive and ready to ship, supporting teams from early concept to final implementation.',
  },
  {
    id: 'web-design',
    title: 'Web Design',
    headline: 'Creating web experiences that engage, convert, and leave a mark',
    description: 'We design responsive websites that adapt seamlessly across devices while maintaining visual impact and performance. Every layout is crafted with purpose, guiding visitors through content that tells your story and drives action. From landing pages to full marketing sites, we focus on clarity, speed, and modern aesthetics that reflect your brand identity.',
  },
  {
    id: 'branding-design',
    title: 'Branding Design',
    headline: 'Building brand identities that connect, resonate, and endure',
    description: 'We develop comprehensive visual identities that capture the essence of who you are and what you stand for. From logo design to complete brand systems, we create cohesive visual languages that work across every touchpoint. Our branding process digs deep into your values, audience, and market position to deliver identities that feel authentic and memorable.',
  },
  {
    id: 'development',
    title: 'Development',
    headline: 'Turning designs into fast, reliable, and scalable code',
    description: 'We transform designs into production-ready applications using modern frameworks and best practices. Our development process prioritizes clean architecture, performance optimization, and maintainable code. Whether it\'s a marketing site, web app, or custom platform, we build with scalability in mind, ensuring your product grows smoothly as your business evolves.',
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
              We're a digital studio that turns ideas into digital products.
            </h1>
            <p className={`text-big-description mb-12 ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              We help businesses and startups bring their ideas to life. from first sketches to real, working digital products. At Lumina, we design interfaces, build brands, and code websites and apps that actually ship.
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
            <h2 className={`text-medium-title mb-6 transition-opacity duration-500 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>
              {activeService.headline}
            </h2>
            <p className={`text-big-description mb-8 transition-opacity duration-500 ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              {activeService.description}
            </p>
            <div
              className={`aspect-[4/3] transition-opacity duration-500 ${
                isDarkMode ? 'bg-neutral-700' : 'bg-neutral-300'
              }`}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
