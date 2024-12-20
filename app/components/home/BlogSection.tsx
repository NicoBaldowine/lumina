import BlogCard from './BlogCard';
import Link from 'next/link';
import { GeistSans } from 'geist/font/sans';

export default function BlogSection() {
  const posts = [
    {
      imageUrl: "/post1.png",
      title: "The Future of Web Design",
      description: "Exploring emerging trends and technologies shaping the future of web design and user experiences.",
      slug: "future-of-web-design"
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
    <section className="py-32">
      <div className="px-6">
        <div className="flex justify-between items-center mb-12">
          <h2 className={`${GeistSans.className} font-light text-[40px] leading-[1.1] tracking-[-0.03em] text-white/90`}>
            Latest Posts
          </h2>
          <Link 
            href="/blog"
            className="px-4 py-2 rounded-full text-[14px] leading-[1.6] tracking-[-0.01em] text-[#999999] border border-white/20 hover:bg-white hover:text-[#070606] transition-all duration-300"
          >
            All Posts
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
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
