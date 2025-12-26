'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';

interface BlogCardProps {
  imageUrl: string;
  title: string;
  description: string;
  slug: string;
}

export default function BlogCard({ imageUrl, title, description, slug }: BlogCardProps) {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <Link href={`/blog/${slug}`} className="block group">
      <div className="relative aspect-[16/9] mb-4 overflow-hidden rounded-lg">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="space-y-2">
        <h3 className={`text-xl leading-relaxed tracking-tight transition-colors ${
          isDarkMode
            ? 'text-white/90 group-hover:text-white'
            : 'text-neutral-800 group-hover:text-black'
        }`}>
          {title}
        </h3>
        <p className={`text-sm leading-relaxed ${
          isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
        }`}>
          {description}
        </p>
      </div>
    </Link>
  );
}
