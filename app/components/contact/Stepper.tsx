'use client';

import { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';
import { Icons } from './icons';

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  steps: {
    title: string;
    description: string;
  }[];
}

export default function Stepper({ currentStep, totalSteps, steps }: StepperProps) {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
              index + 1 < currentStep
                ? 'border-[#43D4A9] bg-[#43D4A9] text-black'
                : index + 1 === currentStep
                  ? 'border-[#43D4A9] text-[#43D4A9]'
                  : isDarkMode
                    ? 'border-[#2a2626] text-neutral-400'
                    : 'border-neutral-300 text-neutral-400'
            }`}>
              {index + 1 < currentStep ? (
                <Icons.Check className="w-6 h-6" />
              ) : (
                <span className="text-lg">{index + 1}</span>
              )}
            </div>
            <div className="mt-2 text-center">
              <p className={`text-sm font-medium ${
                index + 1 === currentStep
                  ? 'text-[#43D4A9]'
                  : isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}>
                {step.title}
              </p>
              <p className={`text-xs mt-1 ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className={`absolute top-6 left-0 right-0 h-[2px] -z-10 ${
        isDarkMode ? 'bg-[#2a2626]' : 'bg-neutral-200'
      }`}>
        <div
          className="h-full bg-[#43D4A9] transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}
