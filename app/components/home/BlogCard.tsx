'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';
import ImageWithLoader from '../ui/ImageWithLoader';

interface BlogCardProps {
  imageUrl?: string;
  title: string;
  description: string;
  slug: string;
}

export default function BlogCard({ imageUrl, title, description, slug }: BlogCardProps) {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <Link href={`/blog/${slug}`} className="block group">
      <div className="relative aspect-[16/9] mb-4 overflow-hidden">
        {imageUrl ? (
          <ImageWithLoader
            src={imageUrl}
            alt={title}
          />
        ) : (
          <div className={`w-full h-full ${isDarkMode ? 'bg-neutral-700' : 'bg-neutral-300'}`} />
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>
      <div className="space-y-2">
        <h3 className={`text-card-title transition-colors ${
          isDarkMode
            ? 'text-white/90 group-hover:text-white'
            : 'text-neutral-800 group-hover:text-black'
        }`}>
          {title}
        </h3>
        <p className={`text-small-description ${
          isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
        }`}>
          {description}
        </p>
      </div>
    </Link>
  );
}
