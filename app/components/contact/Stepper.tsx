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
  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center border-2 
              ${index + 1 < currentStep 
                ? 'border-[#43D4A9] bg-[#43D4A9] text-black' 
                : index + 1 === currentStep
                  ? 'border-[#43D4A9] text-[#43D4A9]'
                  : 'border-[#2a2626] text-[#999999]'}
            `}>
              {index + 1 < currentStep ? (
                <Icons.Check />
              ) : (
                <span className="text-lg">{index + 1}</span>
              )}
            </div>
            <div className="mt-2 text-center">
              <p className={`text-sm font-medium ${index + 1 === currentStep ? 'text-[#43D4A9]' : 'text-[#999999]'}`}>
                {step.title}
              </p>
              <p className="text-xs text-[#999999] mt-1">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute top-6 left-0 right-0 h-[2px] bg-[#2a2626] -z-10">
        <div 
          className="h-full bg-[#43D4A9] transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
} 