'use client';

import { useContext } from 'react';
import { ThemeContext } from '../../ThemeProvider';
import { Icons } from '../icons';
import { ProjectType } from '../ContactForm';

interface ProjectTypeStepProps {
  selectedTypes: ProjectType[];
  setSelectedTypes: (types: ProjectType[]) => void;
  onNext: () => void;
}

export default function ProjectTypeStep({
  selectedTypes,
  setSelectedTypes,
  onNext
}: ProjectTypeStepProps) {
  const { isDarkMode } = useContext(ThemeContext);

  const projectTypes = [
    {
      id: 'website',
      label: 'Website',
      description: 'Custom website development',
      Icon: Icons.Website
    },
    {
      id: 'mobile-app',
      label: 'Mobile App',
      description: 'iOS and Android applications',
      Icon: Icons.MobileApp
    },
    {
      id: 'web-app',
      label: 'Web App',
      description: 'Complex web applications',
      Icon: Icons.WebApp
    },
    {
      id: 'branding',
      label: 'Branding',
      description: 'Brand identity & guidelines',
      Icon: Icons.Branding
    }
  ];

  const toggleType = (type: ProjectType) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className={`text-3xl leading-tight tracking-tight mb-4 ${
          isDarkMode ? 'text-white/90' : 'text-neutral-800'
        }`}>
          What would you like to build?
        </h1>
        <p className={`text-sm leading-relaxed ${
          isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
        }`}>
          Select all that apply
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {projectTypes.map(type => {
          const { Icon } = type;
          return (
            <button
              key={type.id}
              onClick={() => toggleType(type.id as ProjectType)}
              className={`p-6 rounded-lg border text-left transition-all duration-300 ${
                selectedTypes.includes(type.id as ProjectType)
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
                {type.label}
              </h3>
              <p className={`text-sm leading-relaxed ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}>
                {type.description}
              </p>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={selectedTypes.length === 0}
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
