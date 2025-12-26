'use client';

import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../components/ThemeProvider';
import BlogCard from '../components/home/BlogCard';
import Link from 'next/link';

const posts = [
  {
    imageUrl: "/post1.png",
    title: "The Future of Web Design",
    description: "Exploring emerging trends and technologies shaping the future of web design and user experiences.",
    slug: "the-future-of-web-design"
  },
  {
    imageUrl: "/post2.png",
    title: "Mastering Design Systems",
    description: "A comprehensive guide to creating and maintaining scalable design systems for modern applications.",
    slug: "mastering-design-systems"
  },
  {
    imageUrl: "/post3.png",
    title: "UX Research Methods",
    description: "Essential research methods and techniques for understanding user needs and behaviors.",
    slug: "ux-research-methods"
  },
  {
    title: "Building Accessible Interfaces",
    description: "How to create inclusive digital experiences that work for everyone, regardless of ability.",
    slug: "building-accessible-interfaces"
  },
  {
    title: "The Psychology of Color in Design",
    description: "Understanding how color choices impact user perception and behavior in digital products.",
    slug: "psychology-of-color-in-design"
  },
  {
    title: "Mobile-First Design Principles",
    description: "Why starting with mobile leads to better experiences across all devices and screen sizes.",
    slug: "mobile-first-design-principles"
  }
];

export default function BlogPage() {
  const { isDarkMode } = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen pt-[72px]">
      <section className="py-12 md:py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {posts.map((post, index) => (
              <div
                key={post.slug}
                className={`transition-all duration-1000 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <BlogCard
                  imageUrl={post.imageUrl}
                  title={post.title}
                  description={post.description}
                  slug={post.slug}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
