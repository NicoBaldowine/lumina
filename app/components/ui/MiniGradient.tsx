'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/app/lib/utils';

type GradientVariant = 'blue' | 'red' | 'yellow' | 'green';

interface MiniGradientProps {
  variant: GradientVariant;
  className?: string;
}

const gradientConfigs: Record<GradientVariant, {
  colors: { first: string; second: string; third: string };
  shapes: { first: string; second: string; third: string };
  positions: { first: string; second: string; third: string };
  sizes: { first: string; second: string; third: string };
}> = {
  blue: {
    colors: {
      first: '59, 130, 246',    // blue-500
      second: '99, 102, 241',   // indigo-500
      third: '139, 92, 246',    // violet-500
    },
    shapes: {
      first: 'ellipse 80% 60%',
      second: 'circle',
      third: 'ellipse 50% 80%',
    },
    positions: {
      first: '20% 30%',
      second: '70% 60%',
      third: '50% 80%',
    },
    sizes: {
      first: '60%',
      second: '50%',
      third: '40%',
    },
  },
  red: {
    colors: {
      first: '239, 68, 68',     // red-500
      second: '249, 115, 22',   // orange-500
      third: '234, 88, 12',     // orange-600
    },
    shapes: {
      first: 'ellipse 100% 40%',
      second: 'ellipse 60% 100%',
      third: 'circle',
    },
    positions: {
      first: '50% 20%',
      second: '30% 70%',
      third: '80% 50%',
    },
    sizes: {
      first: '70%',
      second: '45%',
      third: '35%',
    },
  },
  yellow: {
    colors: {
      first: '234, 179, 8',     // yellow-500
      second: '245, 158, 11',   // amber-500
      third: '251, 191, 36',    // amber-400
    },
    shapes: {
      first: 'circle',
      second: 'ellipse 70% 50%',
      third: 'ellipse 40% 90%',
    },
    positions: {
      first: '40% 40%',
      second: '70% 30%',
      third: '20% 70%',
    },
    sizes: {
      first: '55%',
      second: '50%',
      third: '45%',
    },
  },
  green: {
    colors: {
      first: '16, 185, 129',    // emerald-500
      second: '20, 184, 166',   // teal-500
      third: '34, 211, 238',    // cyan-400
    },
    shapes: {
      first: 'ellipse 50% 70%',
      second: 'circle',
      third: 'ellipse 90% 50%',
    },
    positions: {
      first: '30% 50%',
      second: '60% 30%',
      third: '70% 80%',
    },
    sizes: {
      first: '50%',
      second: '45%',
      third: '60%',
    },
  },
};

export function MiniGradient({ variant, className }: MiniGradientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const config = gradientConfigs[variant];

  useEffect(() => {
    if (!isHovering) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovering]);

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* First gradient layer - unique animation per variant */}
      <div
        className={`absolute inset-0 animate-${variant}-1 opacity-70`}
        style={{
          background: `radial-gradient(${config.shapes.first} at ${config.positions.first}, rgba(${config.colors.first}, 0.9) 0%, transparent ${config.sizes.first})`,
          filter: 'blur(15px)',
        }}
      />

      {/* Second gradient layer - unique animation per variant */}
      <div
        className={`absolute inset-0 animate-${variant}-2 opacity-60`}
        style={{
          background: `radial-gradient(${config.shapes.second} at ${config.positions.second}, rgba(${config.colors.second}, 0.85) 0%, transparent ${config.sizes.second})`,
          filter: 'blur(18px)',
        }}
      />

      {/* Third gradient layer - unique animation per variant */}
      <div
        className={`absolute inset-0 animate-${variant}-3 opacity-50`}
        style={{
          background: `radial-gradient(${config.shapes.third} at ${config.positions.third}, rgba(${config.colors.third}, 0.7) 0%, transparent ${config.sizes.third})`,
          filter: 'blur(20px)',
        }}
      />

      {/* Interactive mouse-following gradient */}
      {isHovering && (
        <div
          className="absolute w-24 h-24 opacity-80 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at center, rgba(${config.colors.first}, 1) 0%, transparent 70%)`,
            filter: 'blur(12px)',
            transform: `translate(${mousePos.x - 48}px, ${mousePos.y - 48}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
      )}
    </div>
  );
}
