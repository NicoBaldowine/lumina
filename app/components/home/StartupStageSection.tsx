'use client';

import { useState, useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';

type Step = {
  title: string;
  description: string;
  icon: string;
};

type StageOption = {
  id: string;
  label: string;
  steps: Step[];
  isOther?: boolean;
};

// Icon components for each step
const StepIcon = ({ icon, isDarkMode }: { icon: string; isDarkMode: boolean }) => {
  const iconClass = `w-5 h-5 ${isDarkMode ? 'text-white' : 'text-neutral-700'}`;

  switch (icon) {
    case 'brand':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconClass}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
        </svg>
      );
    case 'ux':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconClass}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      );
    case 'ui':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconClass}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
        </svg>
      );
    case 'mvp':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconClass}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      );
    case 'landing':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconClass}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
      );
    default:
      return null;
  }
};

const stageOptions: StageOption[] = [
  {
    id: 'idea',
    label: 'I have an idea but need execution',
    steps: [
      { title: 'Brand Definition', description: 'Create your visual identity and brand strategy', icon: 'brand' },
      { title: 'UX Workflow', description: 'Map user journeys and define core features', icon: 'ux' },
      { title: 'UI & Design System', description: 'Design interfaces and build component libraries', icon: 'ui' },
      { title: 'MVP Development', description: 'Build your minimum viable product', icon: 'mvp' },
      { title: 'Landing Page', description: 'Launch your market presence', icon: 'landing' }
    ]
  },
  {
    id: 'mvp',
    label: 'I have an MVP but it needs polish',
    steps: [
      { title: 'UX Workflow', description: 'Optimize user flows and interactions', icon: 'ux' },
      { title: 'UI & Design System', description: 'Elevate visuals and systematize components', icon: 'ui' },
      { title: 'Landing Page', description: 'Improve your conversion', icon: 'landing' }
    ]
  },
  {
    id: 'brand-no-product',
    label: 'I have a brand but no product',
    steps: [
      { title: 'UX Workflow', description: 'Define your product experience', icon: 'ux' },
      { title: 'UI & Design System', description: 'Bring your brand to life digitally', icon: 'ui' },
      { title: 'MVP Development', description: 'Build your first product', icon: 'mvp' }
    ]
  },
  {
    id: 'product-no-brand',
    label: 'I have a product but no identity',
    steps: [
      { title: 'Brand Definition', description: 'Craft your unique identity', icon: 'brand' },
      { title: 'UI & Design System', description: 'Apply your new brand to product', icon: 'ui' },
      { title: 'Landing Page', description: 'Tell your brand story', icon: 'landing' }
    ]
  }
];

// Arrow icon component
const ArrowIcon = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={`w-5 h-5 flex-shrink-0 ${isDarkMode ? 'text-white/30' : 'text-black/30'}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

export default function StartupStageSection() {
  const { isDarkMode } = useContext(ThemeContext);
  const [selectedStage, setSelectedStage] = useState<StageOption>(stageOptions[0]);

  return (
    <section id="stage" className={`py-16 md:py-32 ${isDarkMode ? 'bg-[#222222]' : 'bg-white'}`}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <h2 className={`text-medium-title mb-4 ${
          isDarkMode ? 'text-white/90' : 'text-neutral-800'
        }`}>
          What stage is your startup at?
        </h2>
        <p className={`text-small-description mb-8 md:mb-12 max-w-xl ${
          isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
        }`}>
          Select your current situation and we&apos;ll show you the path forward
        </p>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left side - Stage badges */}
          <div className="flex flex-wrap gap-3">
            {stageOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedStage(option)}
                className={`px-4 py-2 rounded-full text-small-description transition-all duration-300 ${
                  selectedStage.id === option.id
                    ? isDarkMode
                      ? 'bg-white text-black'
                      : 'bg-black text-white'
                    : isDarkMode
                      ? 'bg-transparent border border-white/20 text-neutral-400 hover:border-white/40 hover:text-white'
                      : 'bg-transparent border border-black/20 text-neutral-500 hover:border-black/40 hover:text-black'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Right side - Steps */}
          <div className="space-y-6">
            {selectedStage.steps.map((step, index) => (
              <div key={step.title} className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isDarkMode ? 'bg-neutral-700' : 'bg-neutral-200'
                }`}>
                  <StepIcon icon={step.icon} isDarkMode={isDarkMode} />
                </div>
                <div className="flex-1 flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className={`text-small-description font-medium mb-1 ${
                      isDarkMode ? 'text-white' : 'text-neutral-800'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-small-description ${
                      isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                  {index < selectedStage.steps.length - 1 && (
                    <ArrowIcon isDarkMode={isDarkMode} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
