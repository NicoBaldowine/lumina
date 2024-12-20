interface ServiceCardProps {
  title: string;
  description: string;
  variant: 'ovals' | 'circles' | 'flower';
}

export default function ServiceCard({ title, description, variant }: ServiceCardProps) {
  const illustrations = {
    ovals: (
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="ovalGradient" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#222222" />
            <stop offset="40%" stopColor="#222222" />
            <stop offset="50%" stopColor="#AEC560" />
            <stop offset="60%" stopColor="#222222" />
            <stop offset="100%" stopColor="#222222" />
          </linearGradient>
        </defs>
        <ellipse cx="30" cy="50" rx="25" ry="20" fill="none" stroke="#222222" strokeWidth="0.5"/>
        <ellipse cx="50" cy="50" rx="25" ry="20" fill="none" stroke="#222222" strokeWidth="0.5"/>
        <ellipse cx="70" cy="50" rx="25" ry="20" fill="none" stroke="#222222" strokeWidth="0.5"/>
        <ellipse cx="30" cy="50" rx="25" ry="20" fill="none" stroke="url(#ovalGradient)" strokeWidth="0.5" className="animate-scanner-slow"/>
        <ellipse cx="50" cy="50" rx="25" ry="20" fill="none" stroke="url(#ovalGradient)" strokeWidth="0.5" className="animate-scanner-slow [animation-delay:-4s]"/>
        <ellipse cx="70" cy="50" rx="25" ry="20" fill="none" stroke="url(#ovalGradient)" strokeWidth="0.5" className="animate-scanner-slow [animation-delay:-8s]"/>
      </svg>
    ),
    circles: (
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="serviceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#222222" />
            <stop offset="40%" stopColor="#222222" />
            <stop offset="50%" stopColor="#43D4A9" />
            <stop offset="60%" stopColor="#222222" />
            <stop offset="100%" stopColor="#222222" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="none" stroke="#222222" strokeWidth="0.5"/>
        <circle cx="50" cy="50" r="35" fill="none" stroke="#222222" strokeWidth="0.5"/>
        <circle cx="50" cy="50" r="25" fill="none" stroke="#222222" strokeWidth="0.5"/>
        <circle cx="50" cy="50" r="15" fill="none" stroke="#222222" strokeWidth="0.5"/>
        <circle cx="50" cy="50" r="45" fill="none" stroke="url(#serviceGradient)" strokeWidth="0.5" className="animate-gradient"/>
        <circle cx="50" cy="50" r="35" fill="none" stroke="url(#serviceGradient)" strokeWidth="0.5" className="animate-gradient [animation-delay:-3s]"/>
        <circle cx="50" cy="50" r="25" fill="none" stroke="url(#serviceGradient)" strokeWidth="0.5" className="animate-gradient [animation-delay:-6s]"/>
        <circle cx="50" cy="50" r="15" fill="none" stroke="url(#serviceGradient)" strokeWidth="0.5" className="animate-gradient [animation-delay:-9s]"/>
      </svg>
    ),
    flower: (
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="flowerGradient" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#222222" />
            <stop offset="40%" stopColor="#222222" />
            <stop offset="50%" stopColor="#059B6F" />
            <stop offset="60%" stopColor="#222222" />
            <stop offset="100%" stopColor="#222222" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="30" r="25" fill="none" stroke="#222222" strokeWidth="0.5"/>
        <circle cx="70" cy="50" r="25" fill="none" stroke="#222222" strokeWidth="0.5"/>
        <circle cx="50" cy="70" r="25" fill="none" stroke="#222222" strokeWidth="0.5"/>
        <circle cx="30" cy="50" r="25" fill="none" stroke="#222222" strokeWidth="0.5"/>
        <circle cx="50" cy="30" r="25" fill="none" stroke="url(#flowerGradient)" strokeWidth="0.5" className="animate-scanner-slow"/>
        <circle cx="70" cy="50" r="25" fill="none" stroke="url(#flowerGradient)" strokeWidth="0.5" className="animate-scanner-slow [animation-delay:-3s]"/>
        <circle cx="50" cy="70" r="25" fill="none" stroke="url(#flowerGradient)" strokeWidth="0.5" className="animate-scanner-slow [animation-delay:-6s]"/>
        <circle cx="30" cy="50" r="25" fill="none" stroke="url(#flowerGradient)" strokeWidth="0.5" className="animate-scanner-slow [animation-delay:-9s]"/>
      </svg>
    )
  };

  return (
    <div>
      <div className="relative aspect-[16/9] mb-4 bg-[#0c0c0c] overflow-hidden">
        <div className="absolute inset-0">
          {illustrations[variant]}
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-[20px] leading-[30px] tracking-[-0.03em] text-white/90">
          {title}
        </h3>
        <p className="text-[14px] leading-[1.6] tracking-[-0.01em] text-[#999999]">
          {description}
        </p>
      </div>
    </div>
  );
}
