import Image from 'next/image';
import { Inter_Tight } from 'next/font/google';

const interTight = Inter_Tight({ subsets: ['latin'] });

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export default function ProjectCard({ title, description, imageUrl }: ProjectCardProps) {
  const isShorterCard = title === "Mobile App Design" || title === "E-commerce Platform";

  return (
    <div>
      <div className={`relative overflow-hidden rounded-[32px] mb-6 ${
        isShorterCard ? 'aspect-[544/590]' : 'aspect-[544/704]'
      }`}>
        <Image 
          src={imageUrl} 
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="space-y-2">
        <h3 className={`text-[1.5vw] tracking-[0em] text-white ${interTight.className}`}>
          {title}
        </h3>
        <p className={`text-[16px] leading-[1.4] tracking-[0em] text-white/40 ${interTight.className}`}>
          {description}
        </p>
      </div>
    </div>
  );
}
