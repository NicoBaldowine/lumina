'use client';

import Image from 'next/image';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export default function ProjectCard({ title, description, imageUrl }: ProjectCardProps) {
  const { isDarkMode } = useContext(ThemeContext);
  const isWiderCard = imageUrl.includes('project4') || imageUrl.includes('project5');

  return (
    <div>
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
      </div>
      <div className="space-y-2">
        <h3 className={`text-lg md:text-xl tracking-tight ${
          isDarkMode ? 'text-white' : 'text-[#070606]'
        }`}>
          {title}
        </h3>
        <p className={`text-base leading-relaxed ${
          isDarkMode ? 'text-white/40' : 'text-neutral-500'
        }`}>
          {description}
        </p>
      </div>
    </div>
  );
}
