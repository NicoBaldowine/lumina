'use client';

import { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';

interface ServiceCardProps {
  title: string;
  description: string;
  variant: 'ovals' | 'circles' | 'flower';
}

export default function ServiceCard({ title, description, variant }: ServiceCardProps) {
  const { isDarkMode } = useContext(ThemeContext);

  const strokeColor = isDarkMode ? '#333333' : '#e5e5e5';
  const bgColor = isDarkMode ? '#1a1a1a' : '#f5f5f5';

  const illustrations = {
    ovals: (
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="ovalGradient" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={strokeColor} />
            <stop offset="40%" stopColor={strokeColor} />
            <stop offset="50%" stopColor="#AEC560" />
            <stop offset="60%" stopColor={strokeColor} />
            <stop offset="100%" stopColor={strokeColor} />
          </linearGradient>
        </defs>
        <ellipse cx="30" cy="50" rx="25" ry="20" fill="none" stroke={strokeColor} strokeWidth="0.5"/>
        <ellipse cx="50" cy="50" rx="25" ry="20" fill="none" stroke={strokeColor} strokeWidth="0.5"/>
        <ellipse cx="70" cy="50" rx="25" ry="20" fill="none" stroke={strokeColor} strokeWidth="0.5"/>
        <ellipse cx="30" cy="50" rx="25" ry="20" fill="none" stroke="url(#ovalGradient)" strokeWidth="0.5" className="animate-scanner-slow"/>
        <ellipse cx="50" cy="50" rx="25" ry="20" fill="none" stroke="url(#ovalGradient)" strokeWidth="0.5" className="animate-scanner-slow [animation-delay:-4s]"/>
        <ellipse cx="70" cy="50" rx="25" ry="20" fill="none" stroke="url(#ovalGradient)" strokeWidth="0.5" className="animate-scanner-slow [animation-delay:-8s]"/>
      </svg>
    ),
    circles: (
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="serviceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={strokeColor} />
            <stop offset="40%" stopColor={strokeColor} />
            <stop offset="50%" stopColor="#43D4A9" />
            <stop offset="60%" stopColor={strokeColor} />
            <stop offset="100%" stopColor={strokeColor} />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="none" stroke={strokeColor} strokeWidth="0.5"/>
        <circle cx="50" cy="50" r="35" fill="none" stroke={strokeColor} strokeWidth="0.5"/>
        <circle cx="50" cy="50" r="25" fill="none" stroke={strokeColor} strokeWidth="0.5"/>
        <circle cx="50" cy="50" r="15" fill="none" stroke={strokeColor} strokeWidth="0.5"/>
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
            <stop offset="0%" stopColor={strokeColor} />
            <stop offset="40%" stopColor={strokeColor} />
            <stop offset="50%" stopColor="#059B6F" />
            <stop offset="60%" stopColor={strokeColor} />
            <stop offset="100%" stopColor={strokeColor} />
          </linearGradient>
        </defs>
        <circle cx="50" cy="30" r="25" fill="none" stroke={strokeColor} strokeWidth="0.5"/>
        <circle cx="70" cy="50" r="25" fill="none" stroke={strokeColor} strokeWidth="0.5"/>
        <circle cx="50" cy="70" r="25" fill="none" stroke={strokeColor} strokeWidth="0.5"/>
        <circle cx="30" cy="50" r="25" fill="none" stroke={strokeColor} strokeWidth="0.5"/>
        <circle cx="50" cy="30" r="25" fill="none" stroke="url(#flowerGradient)" strokeWidth="0.5" className="animate-scanner-slow"/>
        <circle cx="70" cy="50" r="25" fill="none" stroke="url(#flowerGradient)" strokeWidth="0.5" className="animate-scanner-slow [animation-delay:-3s]"/>
        <circle cx="50" cy="70" r="25" fill="none" stroke="url(#flowerGradient)" strokeWidth="0.5" className="animate-scanner-slow [animation-delay:-6s]"/>
        <circle cx="30" cy="50" r="25" fill="none" stroke="url(#flowerGradient)" strokeWidth="0.5" className="animate-scanner-slow [animation-delay:-9s]"/>
      </svg>
    )
  };

  return (
    <div>
      <div className="relative aspect-[16/9] mb-4 overflow-hidden" style={{ backgroundColor: bgColor }}>
        <div className="absolute inset-0">
          {illustrations[variant]}
        </div>
      </div>
      <div className="space-y-2">
        <h3 className={`text-xl leading-relaxed tracking-tight ${
          isDarkMode ? 'text-white/90' : 'text-neutral-800'
        }`}>
          {title}
        </h3>
        <p className={`text-sm leading-relaxed ${
          isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
        }`}>
          {description}
        </p>
      </div>
    </div>
  );
}
