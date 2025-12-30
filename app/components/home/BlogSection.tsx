'use client';

import BlogCard from './BlogCard';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';
import ActionButton from '../ui/ActionButton';

export default function BlogSection() {
  const { isDarkMode } = useContext(ThemeContext);

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
    }
  ];

  return (
    <section className="py-16 md:py-32">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <h2 className={`text-medium-title ${
            isDarkMode ? 'text-white/90' : 'text-neutral-800'
          }`}>
            Latest Posts
          </h2>
          <ActionButton href="/blog">
            All Posts
          </ActionButton>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {posts.map((post, index) => (
            <BlogCard
              key={index}
              imageUrl={post.imageUrl}
              title={post.title}
              description={post.description}
              slug={post.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
