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
  const projectTypes = [
    { 
      id: 'website', 
      label: 'Website',
      description: 'Custom website development',
      icon: Icons.Website 
    },
    { 
      id: 'mobile-app', 
      label: 'Mobile App',
      description: 'iOS and Android applications',
      icon: Icons.MobileApp 
    },
    { 
      id: 'web-app', 
      label: 'Web App',
      description: 'Complex web applications',
      icon: Icons.WebApp 
    },
    { 
      id: 'branding', 
      label: 'Branding',
      description: 'Brand identity & guidelines',
      icon: Icons.Branding 
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
        <h1 className="text-[32px] leading-[1.2] tracking-[-0.03em] text-white/90 font-cabinet-grotesk mb-4">
          What would you like to build?
        </h1>
        <p className="text-[14px] leading-[1.6] tracking-[-0.01em] text-[#999999]">
          Select all that apply
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {projectTypes.map(type => {
          return (
            <button
              key={type.id}
              onClick={() => toggleType(type.id as ProjectType)}
              className={`
                p-6 rounded-lg border text-left transition-all duration-300
                ${selectedTypes.includes(type.id as ProjectType)
                  ? 'border-[#43D4A9] bg-[#43D4A9]/10'
                  : 'border-white/10 hover:border-white/20'
                }
              `}
            >
              <type.icon className="w-8 h-8 mb-4 text-[#43D4A9]" />
              <h3 className="text-[20px] leading-[30px] tracking-[-0.03em] text-white/90 mb-1">
                {type.label}
              </h3>
              <p className="text-[14px] leading-[1.6] text-[#999999]">
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
          className="px-6 py-3 rounded-full text-[14px] leading-[1.6] tracking-[-0.01em] text-black bg-white hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          Continue
        </button>
      </div>
    </div>
  );
} 