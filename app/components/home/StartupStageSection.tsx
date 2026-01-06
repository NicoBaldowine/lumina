'use client';

import { useState, useContext } from 'react';
import Link from 'next/link';
import { ThemeContext } from '../ThemeProvider';

// Contact form for "Other" option
const OtherContactForm = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = `w-full px-4 py-3 text-big-description transition-colors ${
    isDarkMode
      ? 'bg-[#1a1a1a] text-white placeholder-neutral-500 border border-neutral-700 focus:border-neutral-500'
      : 'bg-neutral-100 text-black placeholder-neutral-400 border border-neutral-200 focus:border-neutral-400'
  } outline-none`;

  const labelClasses = `block mb-2 text-small-description ${
    isDarkMode ? 'text-white' : 'text-black'
  }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="stage-name" className={labelClasses}>
          Name
        </label>
        <input
          type="text"
          id="stage-name"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
          required
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="stage-email" className={labelClasses}>
          Email
        </label>
        <input
          type="email"
          id="stage-email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="stage-company" className={labelClasses}>
          Company or Project
        </label>
        <input
          type="text"
          id="stage-company"
          name="company"
          placeholder="Enter company or project's name"
          value={formData.company}
          onChange={handleChange}
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="stage-message" className={labelClasses}>
          What do you need help with?
        </label>
        <textarea
          id="stage-message"
          name="message"
          placeholder="Tell us about your project"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
          className={`${inputClasses} resize-none`}
        />
      </div>

      {submitStatus === 'success' && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <p className="text-green-500 text-small-description">
            Thank you! Your message has been sent. We&apos;ll get back to you soon.
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-500 text-small-description">
            Something went wrong. Please try again or email us directly.
          </p>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 rounded-full text-small-description transition-all duration-300 ${
            isDarkMode
              ? 'bg-white text-black hover:bg-neutral-200 disabled:bg-neutral-600'
              : 'bg-black text-white hover:bg-neutral-800 disabled:bg-neutral-400'
          } disabled:cursor-not-allowed`}
        >
          {isSubmitting ? 'Sending...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

type Step = {
  title: string;
  description: string;
  icon: string;
};

type StageOption = {
  id: string;
  label: string;
  context: string;
  steps: Step[];
  isOther?: boolean;
};

// Icon components for each step
const StepIcon = ({ icon, isDarkMode }: { icon: string; isDarkMode: boolean }) => {
  const iconClass = `w-5 h-5 ${isDarkMode ? 'text-white' : 'text-neutral-700'}`;

  switch (icon) {
    case 'brand':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconClass}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
        </svg>
      );
    case 'ux':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconClass}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      );
    case 'ui':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconClass}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
        </svg>
      );
    case 'mvp':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconClass}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      );
    case 'landing':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconClass}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
      );
    default:
      return null;
  }
};

const stageOptions: StageOption[] = [
  {
    id: 'idea',
    label: 'I have an idea but need execution',
    context: 'Best for startups preparing to turn an idea into a clear and credible product.',
    steps: [
      { title: 'Understanding the idea and the people behind it', description: 'We clarify what matters early on to avoid unnecessary complexity.', icon: 'ux' },
      { title: 'Building a brand founders can stand behind', description: 'We shape a brand that feels intentional, clear, and trustworthy from day one.', icon: 'brand' },
      { title: 'Designing the product before building it', description: 'We design core flows and a lightweight design system for speed and consistency.', icon: 'ui' },
      { title: 'Validating early assumptions', description: 'We test key ideas with real users before committing to development.', icon: 'ux' },
      { title: 'Building something real, not a demo', description: 'We build a stable, production-ready MVP that\'s ready to evolve.', icon: 'mvp' },
      { title: 'Explaining the product clearly to the world', description: 'We create a landing page that drives traction and fundraising conversations.', icon: 'landing' }
    ]
  },
  {
    id: 'mvp',
    label: 'I have an MVP, but it doesn\'t feel ready yet',
    context: 'Best for startups looking to elevate how their product is perceived.',
    steps: [
      { title: 'Auditing what you have', description: 'We review your current product to identify UX gaps and visual inconsistencies.', icon: 'ux' },
      { title: 'Refining the user experience', description: 'We improve key flows so the product feels intuitive and polished.', icon: 'ux' },
      { title: 'Elevating the visual design', description: 'We upgrade the UI to look credible and consistent across the product.', icon: 'ui' },
      { title: 'Building a design system', description: 'We create reusable components so the product scales without losing coherence.', icon: 'ui' },
      { title: 'Improving the landing page', description: 'We refine messaging and design to convert visitors into users or investors.', icon: 'landing' }
    ]
  },
  {
    id: 'brand-no-product',
    label: 'I have a brand but no product',
    context: 'Best for startups translating a brand into a product experience.',
    steps: [
      { title: 'Understanding your brand and vision', description: 'We learn your brand, your goals, and the experience you want to create.', icon: 'brand' },
      { title: 'Designing the product experience', description: 'We translate your brand into intuitive flows and a cohesive interface.', icon: 'ui' },
      { title: 'Validating with real users', description: 'We test key ideas early to reduce risk before committing to development.', icon: 'ux' },
      { title: 'Building the MVP', description: 'We develop a production-ready product with a landing page that communicates its value.', icon: 'mvp' }
    ]
  },
  {
    id: 'product-no-brand',
    label: 'I have a product but no identity',
    context: 'Best for startups shaping a product identity users can recognize and trust.',
    steps: [
      { title: 'Understanding your product and market', description: 'We learn what makes your product unique and who you\'re building for.', icon: 'ux' },
      { title: 'Defining your brand identity', description: 'We craft a clear, credible brand that reflects your product\'s value.', icon: 'brand' },
      { title: 'Applying the brand to your product', description: 'We redesign the UI so the product feels intentional and cohesive.', icon: 'ui' },
      { title: 'Validating your new product experience', description: 'We test the updated experience with real users to ensure it resonates.', icon: 'ux' },
      { title: 'Communicating your value proposition', description: 'We create a landing page that clearly explains what you do and why it matters.', icon: 'landing' }
    ]
  },
  {
    id: 'other',
    label: 'Other',
    context: 'Tell us about your situation and we\'ll find the best way to help.',
    steps: [],
    isOther: true
  }
];

// Arrow icon component
const ArrowIcon = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={`w-5 h-5 flex-shrink-0 ${isDarkMode ? 'text-white/30' : 'text-black/30'}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

export default function StartupStageSection() {
  const { isDarkMode } = useContext(ThemeContext);
  const [selectedStage, setSelectedStage] = useState<StageOption>(stageOptions[0]);

  // Get the max number of steps across all options for fixed height
  const maxSteps = Math.max(...stageOptions.map(opt => opt.steps.length));

  return (
    <section id="stage" className={`py-24 md:py-40 ${isDarkMode ? 'bg-[#222222]' : 'bg-white'}`}>
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left side - Title, description and badges */}
          <div>
            <h2 className={`text-big-title mb-12 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>
              What stage is your<br />startup at?
            </h2>

            {/* Stage badges */}
            <div className="flex flex-wrap gap-3">
              {stageOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedStage(option)}
                  className={`px-4 py-2 rounded-full text-small-description transition-all duration-300 ${
                    selectedStage.id === option.id
                      ? isDarkMode
                        ? 'bg-white text-[#070606]'
                        : 'bg-black text-white'
                      : isDarkMode
                        ? 'bg-transparent border border-white/20 text-neutral-400 hover:bg-white hover:text-[#070606]'
                        : 'bg-transparent border border-black/20 text-neutral-500 hover:bg-black hover:text-white'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right side - Context + Steps or Form */}
          <div>
            <h3 className={`text-medium-title mb-8 transition-all duration-300 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>
              {selectedStage.context}
            </h3>
            {selectedStage.isOther ? (
              <OtherContactForm isDarkMode={isDarkMode} />
            ) : (
              <>
                <ul className="space-y-6">
                  {selectedStage.steps.map((step, index) => (
                    <li key={step.title} className="flex items-start gap-4">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-small-description ${
                        isDarkMode ? 'bg-neutral-700 text-neutral-400' : 'bg-neutral-200 text-neutral-500'
                      }`}>
                        {index + 1}
                      </span>
                      <div className="pt-1">
                        <span className={`text-big-description ${
                          isDarkMode ? 'text-white' : 'text-black'
                        }`}>
                          {step.title}
                        </span>
                        {step.description && (
                          <p className={`text-small-description mt-1 ${
                            isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
                          }`}>
                            {step.description}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-end mt-6">
                  <Link
                    href="/contact"
                    className={`inline-block px-4 py-2 rounded-full text-small-description transition-all duration-300 border ${
                      isDarkMode
                        ? 'border-white/20 text-neutral-400 hover:bg-white hover:text-[#070606]'
                        : 'border-black/20 text-neutral-500 hover:bg-black hover:text-white'
                    }`}
                  >
                    I&apos;m interested
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
