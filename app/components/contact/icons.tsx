interface IconProps {
  className?: string;
}

export const Icons = {
  Check: ({ className }: IconProps) => (
    <svg className={className || "w-6 h-6"} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Website: ({ className }: IconProps) => (
    <svg className={className || "w-8 h-8"} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="10" strokeWidth="2"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" strokeWidth="2"/>
    </svg>
  ),
  MobileApp: ({ className }: IconProps) => (
    <svg className={className || "w-8 h-8"} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="5" y="2" width="14" height="20" rx="2" strokeWidth="2"/>
      <line x1="12" y1="18" x2="12" y2="18" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  WebApp: ({ className }: IconProps) => (
    <svg className={className || "w-8 h-8"} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/>
      <line x1="3" y1="9" x2="21" y2="9" strokeWidth="2"/>
      <line x1="9" y1="21" x2="9" y2="9" strokeWidth="2"/>
    </svg>
  ),
  Branding: ({ className }: IconProps) => (
    <svg className={className || "w-8 h-8"} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2"/>
    </svg>
  )
};
