'use client';

import { useContext } from 'react';
import { ThemeContext } from '../components/ThemeProvider';

export default function AboutUsPage() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <main className="min-h-screen pt-[72px]">
      <section className="relative py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className={`text-[clamp(2.5rem,5vw,4rem)] leading-tight tracking-tight mb-6 font-medium ${
              isDarkMode ? 'text-white' : 'text-neutral-800'
            }`}>
              We create digital experiences that matter
            </h1>
            <p className={`text-lg leading-relaxed max-w-2xl ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              Our team of designers and developers work together to create innovative solutions that help businesses grow and succeed in the digital world.
            </p>
          </div>
        </div>
      </section>

      <section className={`py-20 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-neutral-50'}`}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h3 className={`text-2xl leading-tight tracking-tight ${
                isDarkMode ? 'text-white/90' : 'text-neutral-800'
              }`}>
                Our Mission
              </h3>
              <p className={`text-sm leading-relaxed ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}>
                To deliver exceptional digital solutions that transform businesses and enhance user experiences.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className={`text-2xl leading-tight tracking-tight ${
                isDarkMode ? 'text-white/90' : 'text-neutral-800'
              }`}>
                Our Vision
              </h3>
              <p className={`text-sm leading-relaxed ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}>
                To be the leading creative force in digital innovation and design excellence.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className={`text-2xl leading-tight tracking-tight ${
                isDarkMode ? 'text-white/90' : 'text-neutral-800'
              }`}>
                Our Values
              </h3>
              <p className={`text-sm leading-relaxed ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}>
                Innovation, collaboration, and unwavering commitment to quality in everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
