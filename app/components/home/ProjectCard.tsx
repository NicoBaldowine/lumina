'use client';

import Image from 'next/image';
import { Inter_Tight } from 'next/font/google';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';

const interTight = Inter_Tight({ subsets: ['latin'] });

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
      <div className={`relative overflow-hidden rounded-[32px] mb-6 ${
        isWiderCard ? 'aspect-[790/590]' : 'aspect-[544/704]'
      }`}>
        <Image 
          src={imageUrl} 
          alt={title}
          fill
          priority
          className="object-cover w-full h-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={100}
        />
      </div>
      <div className="space-y-2">
        <h3 className={`text-[1.5vw] tracking-[0em] ${
          isDarkMode ? 'text-white' : 'text-[#070606]'
        } ${interTight.className}`}>
          {title}
        </h3>
        <p className={`text-[16px] leading-[1.4] tracking-[0em] ${
          isDarkMode ? 'text-white/40' : 'text-[rgb(153,153,153)]'
        } ${interTight.className}`}>
          {description}
        </p>
      </div>
    </div>
  );
}
