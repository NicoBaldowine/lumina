'use client';

import { useEffect, useState } from 'react';
import BlogCard from '../components/home/BlogCard';

const posts = [
  {
    imageUrl: "/post1.png",
    title: "The Future of End-to-End Design",
    description: "Why cohesive design across brand, product, and development is more critical than ever in the age of AI.",
    slug: "the-future-of-end-to-end-design"
  },
  {
    imageUrl: "/post2.png",
    title: "Design Systems: The Bridge Between Vision and Code",
    description: "How systematic design connects brand identity, product experience, and development into one scalable foundation.",
    slug: "mastering-design-systems"
  },
  {
    imageUrl: "/post3.png",
    title: "Research: The Key to Differentiation",
    description: "Why startups that talk to users win, and how research separates products that scale from products that fail.",
    slug: "ux-research-methods"
  }
];

export default function BlogPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen pt-[72px]">
      <section className="py-8 md:py-16">
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
