'use client';

import { cn } from '@/app/lib/utils';
import { useEffect, useRef, useState } from 'react';

interface GradientBackgroundProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'dark' | 'light';
  interactive?: boolean;
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
}

export function GradientBackground({
  children,
  className,
  variant = 'dark',
  interactive = true,
  gradientBackgroundStart,
  gradientBackgroundEnd,
  firstColor = '20, 184, 166',    // teal-500
  secondColor = '16, 185, 129',   // emerald-500
  thirdColor = '34, 211, 238',    // cyan-400
  fourthColor = '15, 118, 110',   // teal-700
  fifthColor = '45, 212, 191',    // teal-400
  pointerColor = '20, 184, 166',  // teal-500
  size = '80%',
  blendingValue = 'hard-light',
}: GradientBackgroundProps) {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);

  const isDark = variant === 'dark';

  const bgStart = gradientBackgroundStart || (isDark ? '#222222' : '#ffffff');
  const bgEnd = gradientBackgroundEnd || (isDark ? '#222222' : '#ffffff');

  useEffect(() => {
    document.body.style.setProperty('--gradient-background-start', bgStart);
    document.body.style.setProperty('--gradient-background-end', bgEnd);
    document.body.style.setProperty('--first-color', firstColor);
    document.body.style.setProperty('--second-color', secondColor);
    document.body.style.setProperty('--third-color', thirdColor);
    document.body.style.setProperty('--fourth-color', fourthColor);
    document.body.style.setProperty('--fifth-color', fifthColor);
    document.body.style.setProperty('--pointer-color', pointerColor);
    document.body.style.setProperty('--size', size);
    document.body.style.setProperty('--blending-value', blendingValue);
  }, [bgStart, bgEnd, firstColor, secondColor, thirdColor, fourthColor, fifthColor, pointerColor, size, blendingValue]);

  useEffect(() => {
    if (!interactive) return;

    function move() {
      setCurX((prev) => prev + (tgX - prev) / 20);
      setCurY((prev) => prev + (tgY - prev) / 20);
      if (interactiveRef.current) {
        interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      }
    }

    const animationFrame = requestAnimationFrame(function animate() {
      move();
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [tgX, tgY, curX, curY, interactive]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setTgX(event.clientX - rect.left);
    setTgY(event.clientY - rect.top);
  };

  return (
    <div
      className={cn(
        'relative min-h-screen w-full overflow-hidden',
        isDark ? 'bg-[#222222]' : 'bg-white',
        className
      )}
      onMouseMove={handleMouseMove}
    >
      {/* SVG Filter for blur effect */}
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Gradient Container - Hidden on mobile for better performance */}
      <div
        className={cn(
          'gradients-container absolute inset-0 h-full w-full blur-lg hidden md:block',
          isDark ? 'opacity-80' : 'opacity-50'
        )}
        style={{
          filter: 'url(#blurMe) blur(40px)',
        }}
      >
        {/* First Gradient - Vertical Movement */}
        <div
          className={cn(
            'absolute [mix-blend-mode:var(--blending-value)] animate-first',
            'w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]',
            'rounded-full'
          )}
          style={{
            opacity: 1,
            background: `radial-gradient(circle at center, rgba(var(--first-color), 0.8) 0%, rgba(var(--first-color), 0) 50%) no-repeat`,
          }}
        />

        {/* Second Gradient - Circular Movement Reverse */}
        <div
          className={cn(
            'absolute [mix-blend-mode:var(--blending-value)] animate-second',
            'w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]',
            'rounded-full'
          )}
          style={{
            opacity: 1,
            background: `radial-gradient(circle at center, rgba(var(--second-color), 0.8) 0%, rgba(var(--second-color), 0) 50%) no-repeat`,
          }}
        />

        {/* Third Gradient - Circular Movement */}
        <div
          className={cn(
            'absolute [mix-blend-mode:var(--blending-value)] animate-third',
            'w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2-200px)] left-[calc(50%-var(--size)/2+200px)]',
            'rounded-full'
          )}
          style={{
            opacity: 1,
            background: `radial-gradient(circle at center, rgba(var(--third-color), 0.8) 0%, rgba(var(--third-color), 0) 50%) no-repeat`,
          }}
        />

        {/* Fourth Gradient - Horizontal Movement */}
        <div
          className={cn(
            'absolute [mix-blend-mode:var(--blending-value)] animate-fourth',
            'w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2+200px)] left-[calc(50%-var(--size)/2-200px)]',
            'rounded-full'
          )}
          style={{
            opacity: 0.7,
            background: `radial-gradient(circle at center, rgba(var(--fourth-color), 0.8) 0%, rgba(var(--fourth-color), 0) 50%) no-repeat`,
          }}
        />

        {/* Fifth Gradient - Circular Movement */}
        <div
          className={cn(
            'absolute [mix-blend-mode:var(--blending-value)] animate-fifth',
            'w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]',
            'rounded-full'
          )}
          style={{
            opacity: 1,
            background: `radial-gradient(circle at center, rgba(var(--fifth-color), 0.8) 0%, rgba(var(--fifth-color), 0) 50%) no-repeat`,
          }}
        />

        {/* Interactive Pointer Gradient */}
        {interactive && (
          <div
            ref={interactiveRef}
            className={cn(
              'absolute [mix-blend-mode:var(--blending-value)]',
              'w-full h-full -top-1/2 -left-1/2',
              'rounded-full opacity-70'
            )}
            style={{
              background: `radial-gradient(circle at center, rgba(var(--pointer-color), 0.8) 0%, rgba(var(--pointer-color), 0) 50%) no-repeat`,
            }}
          />
        )}
      </div>

      {/* Bottom fade gradient */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: isDark
            ? 'linear-gradient(to bottom, transparent 0%, transparent 60%, rgba(34,34,34,0.8) 85%, rgba(34,34,34,1) 100%)'
            : 'linear-gradient(to bottom, transparent 0%, transparent 60%, rgba(255,255,255,0.8) 85%, rgba(255,255,255,1) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
