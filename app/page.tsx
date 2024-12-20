import Hero from './components/home/Hero';
import ProjectsGrid from './components/home/ProjectsGrid';
import ServicesSection from './components/home/ServicesSection';
import BlogSection from './components/home/BlogSection';

export default function Home() {
  return (
    <div className="min-h-screen text-white">
      <main>
        <Hero />
        <ProjectsGrid />
        <ServicesSection />
        <BlogSection />
      </main>
    </div>
  );
}
