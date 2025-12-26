'use client';

import { useContext } from 'react';
import { ThemeContext } from '../components/ThemeProvider';

export default function ServicesPage() {
  const { isDarkMode } = useContext(ThemeContext);

  const services = [
    {
      title: "Web Development",
      description: "Custom websites and web applications built with the latest technologies.",
      features: ["Responsive Design", "Performance Optimization", "SEO Best Practices"]
    },
    {
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications for iOS and Android.",
      features: ["Native Performance", "Cross-platform Solutions", "App Store Optimization"]
    },
    {
      title: "Brand Design",
      description: "Comprehensive branding solutions to establish your visual identity.",
      features: ["Logo Design", "Brand Guidelines", "Visual Identity"]
    },
    {
      title: "UI/UX Design",
      description: "User-centered design solutions that enhance user experience.",
      features: ["User Research", "Wireframing", "Prototyping"]
    }
  ];

  return (
    <main className="min-h-screen pt-[72px]">
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className={`text-[clamp(2.5rem,5vw,4rem)] leading-tight tracking-tight mb-6 font-medium ${
              isDarkMode ? 'text-white' : 'text-neutral-800'
            }`}>
              Our Services
            </h1>
            <p className={`text-lg leading-relaxed max-w-2xl ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              We offer a comprehensive range of digital services to help your business succeed online.
            </p>
          </div>
        </div>
      </section>

      <section className={`py-20 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-neutral-50'}`}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div key={index} className={`p-8 border space-y-4 ${
                isDarkMode ? 'border-white/10' : 'border-black/10'
              }`}>
                <h3 className={`text-2xl leading-tight tracking-tight ${
                  isDarkMode ? 'text-white/90' : 'text-neutral-800'
                }`}>
                  {service.title}
                </h3>
                <p className={`text-sm leading-relaxed ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}>
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={`text-sm leading-relaxed flex items-center gap-2 ${
                      isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                    }`}>
                      <span className="w-1 h-1 bg-[#43D4A9] rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
