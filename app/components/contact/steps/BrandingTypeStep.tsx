import { 
  Square3Stack3DIcon,
  SwatchIcon,
  DocumentTextIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';
import { BrandingType } from '../ContactForm';

interface BrandingTypeStepProps {
  brandingType: BrandingType | null;
  setBrandingType: (type: BrandingType) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function BrandingTypeStep({
  brandingType,
  setBrandingType,
  onNext,
  onBack
}: BrandingTypeStepProps) {
  const options = [
    {
      id: 'logo',
      label: 'Logo Design',
      description: 'Create a unique and memorable logo',
      icon: Square3Stack3DIcon
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
      icon: DocumentTextIcon
    },
    {
      id: 'full-package',
      label: 'Full Package',
      description: 'Complete branding solution',
      icon: BookOpenIcon
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[32px] leading-[1.2] tracking-[-0.03em] text-white/90 font-cabinet-grotesk mb-4">
          What type of branding do you need?
        </h1>
        <p className="text-[14px] leading-[1.6] tracking-[-0.01em] text-[#999999]">
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
              className={`
                p-6 rounded-lg border text-left transition-all duration-300
                ${brandingType === option.id
                  ? 'border-[#43D4A9] bg-[#43D4A9]/10'
                  : 'border-white/10 hover:border-white/20'
                }
              `}
            >
              <Icon className="w-8 h-8 mb-4 text-[#43D4A9]" />
              <h3 className="text-[20px] leading-[30px] tracking-[-0.03em] text-white/90 mb-1">
                {option.label}
              </h3>
              <p className="text-[14px] leading-[1.6] text-[#999999]">
                {option.description}
              </p>
            </button>
          );
        })}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-full text-[14px] leading-[1.6] tracking-[-0.01em] text-[#999999] border border-white/20 hover:bg-white hover:text-[#070606] transition-all duration-300"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!brandingType}
          className="px-6 py-3 rounded-full text-[14px] leading-[1.6] tracking-[-0.01em] text-black bg-white hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          Continue
        </button>
      </div>
    </div>
  );
} 