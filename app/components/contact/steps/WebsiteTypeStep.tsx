'use client';

import { useContext } from 'react';
import { ThemeContext } from '../../ThemeProvider';
import { WebsiteType } from '../ContactForm';

interface WebsiteTypeStepProps {
  websiteType: WebsiteType | null;
  setWebsiteType: (type: WebsiteType) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function WebsiteTypeStep({
  websiteType,
  setWebsiteType,
  onNext,
  onBack
}: WebsiteTypeStepProps) {
  const { isDarkMode } = useContext(ThemeContext);

  const options = [
    { id: 'revamp', label: 'Revamp my existing website' },
    { id: 'new', label: 'Create a new website' },
    { id: 'multiple', label: 'Create multiple websites' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className={`text-3xl leading-tight tracking-tight mb-4 ${
          isDarkMode ? 'text-white/90' : 'text-neutral-800'
        }`}>
          What type of website project is this?
        </h1>
        <p className={`text-sm leading-relaxed ${
          isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
        }`}>
          Select one option
        </p>
      </div>

      <div className="space-y-4">
        {options.map(option => (
          <button
            key={option.id}
            onClick={() => setWebsiteType(option.id as WebsiteType)}
            className={`w-full p-6 rounded-lg border text-left transition-all duration-300 ${
              websiteType === option.id
                ? 'border-[#43D4A9] bg-[#43D4A9]/10'
                : isDarkMode
                  ? 'border-white/10 hover:border-white/20'
                  : 'border-black/10 hover:border-black/20'
            }`}
          >
            <h3 className={`text-xl leading-relaxed tracking-tight ${
              isDarkMode ? 'text-white/90' : 'text-neutral-800'
            }`}>
              {option.label}
            </h3>
          </button>
        ))}
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
          disabled={!websiteType}
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
