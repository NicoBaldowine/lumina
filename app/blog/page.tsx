'use client';

import { useContext } from 'react';
import { ThemeContext } from '../components/ThemeProvider';

export default function BlogPage() {
  const { isDarkMode } = useContext(ThemeContext);

  const posts = [
    {
      title: "The Future of Web Development in 2024",
      excerpt: "Exploring the latest trends and technologies shaping the web development landscape.",
      category: "Development",
      date: "Nov 15, 2023",
      readTime: "5 min read"
    },
    {
      title: "Designing for Accessibility: A Complete Guide",
      excerpt: "Learn how to create inclusive digital experiences that work for everyone.",
      category: "Design",
      date: "Nov 10, 2023",
      readTime: "8 min read"
    },
    {
      title: "Mobile-First Design: Best Practices",
      excerpt: "Why mobile-first design is crucial for modern web development.",
      category: "Design",
      date: "Nov 5, 2023",
      readTime: "6 min read"
    },
    {
      title: "Understanding Design Systems",
      excerpt: "A comprehensive guide to creating and maintaining design systems.",
      category: "Design",
      date: "Nov 1, 2023",
      readTime: "7 min read"
    }
  ];

  return (
    <main className="min-h-screen pt-[72px]">
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className={`text-[clamp(2.5rem,5vw,4rem)] leading-tight tracking-tight mb-6 font-medium ${
              isDarkMode ? 'text-white' : 'text-neutral-800'
            }`}>
              Our Blog
            </h1>
            <p className={`text-lg leading-relaxed max-w-2xl ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              Insights and thoughts on design, development, and digital innovation.
            </p>
          </div>
        </div>
      </section>

      <section className={`py-20 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-neutral-50'}`}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {posts.map((post, index) => (
              <article key={index} className="space-y-4">
                <div className={`aspect-[16/9] relative overflow-hidden ${
                  isDarkMode ? 'bg-[#2a2a2a]' : 'bg-neutral-200'
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                </div>
                <div className="space-y-4">
                  <div className={`flex items-center gap-4 text-xs ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}>
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className={`text-2xl leading-tight tracking-tight ${
                    isDarkMode ? 'text-white/90' : 'text-neutral-800'
                  }`}>
                    {post.title}
                  </h2>
                  <p className={`text-sm leading-relaxed ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}>
                    {post.excerpt}
                  </p>
                  <button className="text-sm text-[#43D4A9] hover:text-[#43D4A9]/80 transition-colors">
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
