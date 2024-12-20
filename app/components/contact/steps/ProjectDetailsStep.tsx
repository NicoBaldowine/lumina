interface ProjectDetailsStepProps {
  projectDetails: {
    pages: string;
    description: string;
  };
  setProjectDetails: (details: { pages: string; description: string }) => void;
  onBack: () => void;
}

export default function ProjectDetailsStep({
  projectDetails,
  setProjectDetails,
  onBack
}: ProjectDetailsStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[32px] leading-[1.2] tracking-[-0.03em] text-white/90 font-cabinet-grotesk mb-4">
          Tell us about your project
        </h1>
        <p className="text-[14px] leading-[1.6] tracking-[-0.01em] text-[#999999]">
          Help us understand your needs better
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-[14px] leading-[1.6] text-white/90 mb-2">
            How many pages will you need?
          </label>
          <input
            type="text"
            value={projectDetails.pages}
            onChange={(e) => setProjectDetails({
              ...projectDetails,
              pages: e.target.value
            })}
            className="w-full bg-[#2a2626] border border-white/10 rounded-lg px-4 py-3 text-white/90 focus:outline-none focus:border-[#43D4A9]"
            placeholder="e.g., 5-10 pages"
          />
        </div>

        <div>
          <label className="block text-[14px] leading-[1.6] text-white/90 mb-2">
            Describe your project
          </label>
          <textarea
            value={projectDetails.description}
            onChange={(e) => setProjectDetails({
              ...projectDetails,
              description: e.target.value
            })}
            className="w-full bg-[#2a2626] border border-white/10 rounded-lg px-4 py-3 text-white/90 focus:outline-none focus:border-[#43D4A9] min-h-[120px]"
            placeholder="Tell us about your project, goals, and timeline..."
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-full text-[14px] leading-[1.6] tracking-[-0.01em] text-[#999999] border border-white/20 hover:bg-white hover:text-[#070606] transition-all duration-300"
        >
          Back
        </button>
        <button
          onClick={() => {/* Handle form submission */}}
          disabled={!projectDetails.pages || !projectDetails.description}
          className="px-6 py-3 rounded-full text-[14px] leading-[1.6] tracking-[-0.01em] text-black bg-white hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </div>
    </div>
  );
} 