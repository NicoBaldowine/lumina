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
  const options = [
    { id: 'revamp', label: 'Revamp my existing website' },
    { id: 'new', label: 'Create a new website' },
    { id: 'multiple', label: 'Create multiple websites' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[32px] leading-[1.2] tracking-[-0.03em] text-white/90 font-cabinet-grotesk mb-4">
          What type of website project is this?
        </h1>
        <p className="text-[14px] leading-[1.6] tracking-[-0.01em] text-[#999999]">
          Select one option
        </p>
      </div>

      <div className="space-y-4">
        {options.map(option => (
          <button
            key={option.id}
            onClick={() => setWebsiteType(option.id as WebsiteType)}
            className={`
              w-full p-6 rounded-lg border text-left
              ${websiteType === option.id
                ? 'border-[#43D4A9] bg-[#43D4A9]/10'
                : 'border-white/10 hover:border-white/20'
              }
            `}
          >
            <h3 className="text-[20px] leading-[30px] tracking-[-0.03em] text-white/90">
              {option.label}
            </h3>
          </button>
        ))}
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
          disabled={!websiteType}
          className="px-6 py-3 rounded-full text-[14px] leading-[1.6] tracking-[-0.01em] text-black bg-white hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
} 