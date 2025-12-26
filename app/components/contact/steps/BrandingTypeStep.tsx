'use client';

import { useContext } from 'react';
import { ThemeContext } from '../../ThemeProvider';
import { BrandingType } from '../ContactForm';

interface BrandingTypeStepProps {
  brandingType: BrandingType | null;
  setBrandingType: (type: BrandingType) => void;
  onNext: () => void;
  onBack: () => void;
}

const StackIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
  </svg>
);

const SwatchIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
  </svg>
);

const DocumentIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const BookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

export default function BrandingTypeStep({
  brandingType,
  setBrandingType,
  onNext,
  onBack
}: BrandingTypeStepProps) {
  const { isDarkMode } = useContext(ThemeContext);

  const options = [
    {
      id: 'logo',
      label: 'Logo Design',
      description: 'Create a unique and memorable logo',
      icon: StackIcon
    },
    {
      id: 'identity',
      label: 'Brand Identity',
      description: 'Develop your complete visual identity',
      icon: SwatchIcon
    },
    {
      id: 'guidelines',
      label: 'Brand Guidelines',
      description: 'Document your brand standards',
      icon: DocumentIcon
    },
    {
      id: 'full-package',
      label: 'Full Package',
      description: 'Complete branding solution',
      icon: BookIcon
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className={`text-3xl leading-tight tracking-tight mb-4 ${
          isDarkMode ? 'text-white/90' : 'text-neutral-800'
        }`}>
          What type of branding do you need?
        </h1>
        <p className={`text-sm leading-relaxed ${
          isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
        }`}>
          Select the option that best fits your needs
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {options.map(option => {
          const Icon = option.icon;
          return (
            <button
              key={option.id}
              onClick={() => setBrandingType(option.id as BrandingType)}
              className={`p-6 rounded-lg border text-left transition-all duration-300 ${
                brandingType === option.id
                  ? 'border-[#43D4A9] bg-[#43D4A9]/10'
                  : isDarkMode
                    ? 'border-white/10 hover:border-white/20'
                    : 'border-black/10 hover:border-black/20'
              }`}
            >
              <Icon className="w-8 h-8 mb-4 text-[#43D4A9]" />
              <h3 className={`text-xl leading-relaxed tracking-tight mb-1 ${
                isDarkMode ? 'text-white/90' : 'text-neutral-800'
              }`}>
                {option.label}
              </h3>
              <p className={`text-sm leading-relaxed ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}>
                {option.description}
              </p>
            </button>
          );
        })}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className={`px-6 py-3 rounded-full text-sm leading-relaxed tracking-[-0.01em] transition-all duration-300 ${
            isDarkMode
              ? 'text-neutral-400 border border-white/20 hover:bg-white hover:text-[#070606]'
              : 'text-neutral-500 border border-black/20 hover:bg-black hover:text-white'
          }`}
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!brandingType}
          className={`px-6 py-3 rounded-full text-sm leading-relaxed tracking-[-0.01em] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
            isDarkMode
              ? 'text-black bg-white hover:bg-white/90'
              : 'text-white bg-black hover:bg-black/90'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
