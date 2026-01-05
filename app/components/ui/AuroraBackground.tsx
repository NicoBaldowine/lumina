'use client';

import { cn } from '@/app/lib/utils';
import React, { ReactNode } from 'react';

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
  variant?: 'dark' | 'light';
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  variant = 'dark',
  ...props
}: AuroraBackgroundProps) => {
  const isDark = variant === 'dark';

  const auroraGradient = 'repeating-linear-gradient(100deg, #14b8a6 10%, #10b981 15%, #22d3ee 20%, #0f766e 25%, #2dd4bf 30%)';
  const bgGradient = isDark
    ? 'repeating-linear-gradient(100deg, #222222 0%, #222222 7%, transparent 10%, transparent 12%, #222222 16%)'
    : 'repeating-linear-gradient(100deg, #ffffff 0%, #ffffff 7%, transparent 10%, transparent 12%, #ffffff 16%)';

  return (
    <div
      className={cn(
        'relative flex flex-col min-h-screen items-center justify-center overflow-hidden',
        isDark ? 'bg-[#222222] text-white' : 'bg-white text-black',
        className
      )}
      {...props}
    >
      {/* Aurora gradient effect - single smooth layer */}
      <div
        className={cn(
          'absolute inset-0 animate-aurora',
          isDark ? 'opacity-70' : 'opacity-50'
        )}
        style={{
          backgroundImage: `${bgGradient}, ${auroraGradient}`,
          backgroundSize: '300% 200%, 200% 200%',
          filter: 'blur(70px)',
          willChange: 'background-position',
        }}
      />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Bottom fade */}
      {showRadialGradient && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? 'linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(34,34,34,0.6) 75%, rgba(34,34,34,1) 100%)'
              : 'linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(255,255,255,0.6) 75%, rgba(255,255,255,1) 100%)',
          }}
        />
      )}

      {children}
    </div>
  );
};
