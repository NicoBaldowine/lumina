'use client';

import { useContext } from 'react';
import { ThemeContext } from '../../ThemeProvider';
import { ProjectType } from '../ContactForm';

interface ProjectDetails {
  pages?: string;
  description: string;
  timeline?: string;
  budget?: string;
}

interface ProjectDetailsStepProps {
  projectDetails: ProjectDetails;
  setProjectDetails: (details: ProjectDetails) => void;
  onBack: () => void;
  selectedTypes: ProjectType[];
}

export default function ProjectDetailsStep({
  projectDetails,
  setProjectDetails,
  onBack,
}: ProjectDetailsStepProps) {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className="space-y-8">
      <div>
        <h1 className={`text-3xl leading-tight tracking-tight mb-4 ${
          isDarkMode ? 'text-white/90' : 'text-neutral-800'
        }`}>
          Tell us about your project
        </h1>
        <p className={`text-sm leading-relaxed ${
          isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
        }`}>
          Help us understand your needs better
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className={`block text-sm leading-relaxed mb-2 ${
            isDarkMode ? 'text-white/90' : 'text-neutral-800'
          }`}>
            How many pages will you need?
          </label>
          <input
            type="text"
            value={projectDetails.pages || ''}
            onChange={(e) => setProjectDetails({
              ...projectDetails,
              pages: e.target.value
            })}
            className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-[#43D4A9] transition-colors ${
              isDarkMode
                ? 'bg-[#1a1a1a] border-white/10 text-white/90 placeholder:text-neutral-500'
                : 'bg-neutral-50 border-black/10 text-neutral-800 placeholder:text-neutral-400'
            }`}
            placeholder="e.g., 5-10 pages"
          />
        </div>

        <div>
          <label className={`block text-sm leading-relaxed mb-2 ${
            isDarkMode ? 'text-white/90' : 'text-neutral-800'
          }`}>
            Describe your project
          </label>
          <textarea
            value={projectDetails.description}
            onChange={(e) => setProjectDetails({
              ...projectDetails,
              description: e.target.value
            })}
            className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-[#43D4A9] min-h-[120px] resize-none transition-colors ${
              isDarkMode
                ? 'bg-[#1a1a1a] border-white/10 text-white/90 placeholder:text-neutral-500'
                : 'bg-neutral-50 border-black/10 text-neutral-800 placeholder:text-neutral-400'
            }`}
            placeholder="Tell us about your project, goals, and timeline..."
          />
        </div>
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
          onClick={() => {}}
          disabled={!projectDetails.description}
          className={`px-6 py-3 rounded-full text-sm leading-relaxed tracking-[-0.01em] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
            isDarkMode
              ? 'text-black bg-white hover:bg-white/90'
              : 'text-white bg-black hover:bg-black/90'
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
