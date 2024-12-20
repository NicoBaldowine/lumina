import Link from 'next/link';
import Image from 'next/image';

interface BlogCardProps {
  imageUrl: string;
  title: string;
  description: string;
  slug: string;
}

export default function BlogCard({ imageUrl, title, description, slug }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="block group">
      <div className="relative aspect-[16/9] mb-4 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-[20px] leading-[30px] tracking-[-0.03em] text-white/90 group-hover:text-white transition-colors">
          {title}
        </h3>
        <p className="text-[14px] leading-[1.6] tracking-[-0.01em] text-[#999999]">
          {description}
        </p>
      </div>
    </Link>
  );
}
