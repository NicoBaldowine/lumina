'use client';
import { useState } from 'react';
import Stepper from './Stepper';
import ProjectTypeStep from './steps/ProjectTypeStep';
import WebsiteTypeStep from './steps/WebsiteTypeStep';
import BrandingTypeStep from './steps/BrandingTypeStep';
import ProjectDetailsStep from './steps/ProjectDetailsStep';

export type ProjectType = 'website' | 'mobile-app' | 'web-app' | 'branding';
export type WebsiteType = 'revamp' | 'new' | 'multiple';
export type BrandingType = 'logo' | 'identity' | 'guidelines' | 'full-package';

const STEPS = [
  {
    title: 'Project Type',
    description: 'What would you like to build?'
  },
  {
    title: 'Specifications',
    description: 'Tell us more about it'
  },
  {
    title: 'Details',
    description: 'Final information'
  }
];

interface ProjectDetails {
  pages?: string;
  description: string;
  timeline?: string;
  budget?: string;
}

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState<ProjectType[]>([]);
  const [websiteType, setWebsiteType] = useState<WebsiteType | null>(null);
  const [brandingType, setBrandingType] = useState<BrandingType | null>(null);
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
    pages: '',
    description: '',
    timeline: '',
    budget: ''
  });

  const handleNext = () => {
    setStep(prev => Math.min(prev + 1, STEPS.length));
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Stepper 
        currentStep={step} 
        totalSteps={STEPS.length} 
        steps={STEPS}
      />
      
      <div className="mt-16">
        {step === 1 && (
          <ProjectTypeStep 
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            onNext={handleNext}
          />
        )}
        
        {step === 2 && (
          <>
            {selectedTypes.includes('website') && (
              <WebsiteTypeStep
                websiteType={websiteType}
                setWebsiteType={setWebsiteType}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {selectedTypes.includes('branding') && (
              <BrandingTypeStep
                brandingType={brandingType}
                setBrandingType={setBrandingType}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
          </>
        )}
        
        {step === 3 && (
          <ProjectDetailsStep
            projectDetails={projectDetails}
            setProjectDetails={setProjectDetails}
            onBack={handleBack}
            selectedTypes={selectedTypes}
          />
        )}
      </div>
    </div>
  );
} 