'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeContext } from '../ThemeProvider';
import Badge from './Badge';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
  badges?: string[];
}

export default function ProjectCard({ title, description, imageUrl, slug, badges = [] }: ProjectCardProps) {
  const { isDarkMode } = useContext(ThemeContext);
  const router = useRouter();
  const isWiderCard = imageUrl.includes('project4') || imageUrl.includes('project5');

  const handleCardClick = () => {
    router.push(`/cases/${slug}`);
  };

  return (
    <div className="block group cursor-pointer" onClick={handleCardClick}>
      <div className={`relative overflow-hidden mb-3 md:mb-6 ${
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
        <div className="flex items-center justify-between gap-4">
          <h3 className={`text-card-title ${
            isDarkMode ? 'text-white' : 'text-[#070606]'
          }`}>
            {title}
          </h3>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {badges.map((badge, index) => (
              <Badge key={index} label={badge} />
            ))}
          </div>
        </div>
        <p className={`text-small-description ${
          isDarkMode ? 'text-white/40' : 'text-neutral-500'
        }`}>
          {description}
        </p>
      </div>
    </div>
  );
}
