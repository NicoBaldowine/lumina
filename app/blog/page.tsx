export default function BlogPage() {
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
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] tracking-[-0.02em] mb-6 font-cabinet-grotesk">
              Our Blog
            </h1>
            <p className="text-[18px] leading-[1.6] text-[#999999] max-w-2xl">
              Insights and thoughts on design, development, and digital innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-[#111]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {posts.map((post, index) => (
              <article key={index} className="space-y-4">
                <div className="aspect-[16/9] relative bg-[#2a2626] rounded-lg overflow-hidden">
                  {/* Placeholder for post image */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-[12px] text-[#999999]">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-[24px] leading-[1.2] tracking-[-0.02em] text-white/90 font-cabinet-grotesk">
                    {post.title}
                  </h2>
                  <p className="text-[14px] leading-[1.6] text-[#999999]">
                    {post.excerpt}
                  </p>
                  <button className="text-[14px] text-[#43D4A9] hover:text-[#43D4A9]/80">
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