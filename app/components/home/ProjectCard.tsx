'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
}

export default function ProjectCard({ title, description, imageUrl, slug }: ProjectCardProps) {
  const { isDarkMode } = useContext(ThemeContext);
  const isWiderCard = imageUrl.includes('project4') || imageUrl.includes('project5');

  return (
    <Link href={`/cases/${slug}`} className="block group">
      <div className={`relative overflow-hidden mb-6 ${
        isWiderCard ? 'aspect-[790/590]' : 'aspect-[544/704]'
      }`}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover w-full h-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>
      <div className="space-y-2">
        <h3 className={`text-card-title ${
          isDarkMode ? 'text-white' : 'text-[#070606]'
        }`}>
          {title}
        </h3>
        <p className={`text-small-description ${
          isDarkMode ? 'text-white/40' : 'text-neutral-500'
        }`}>
          {description}
        </p>
      </div>
    </Link>
  );
}
