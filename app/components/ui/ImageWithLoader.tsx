'use client';

import Image from 'next/image';
import { useState, useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
}

export default function ImageWithLoader({
  src,
  alt,
  fill = true,
  className = 'object-cover',
  priority = false,
}: ImageWithLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-10 h-10">
            {/* Modern spinner */}
            <div
              className={`absolute inset-0 rounded-full border-2 border-t-transparent animate-spin ${
                isDarkMode ? 'border-neutral-600' : 'border-neutral-300'
              }`}
              style={{ animationDuration: '0.8s' }}
            />
            <div
              className={`absolute inset-1 rounded-full border-2 border-b-transparent animate-spin ${
                isDarkMode ? 'border-neutral-500' : 'border-neutral-400'
              }`}
              style={{ animationDuration: '0.6s', animationDirection: 'reverse' }}
            />
          </div>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={`${className} transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        priority={priority}
        onLoad={() => setIsLoading(false)}
      />
    </>
  );
}
