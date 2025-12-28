import ProjectCard from './ProjectCard';

export default function ProjectsGrid() {
  const projects = [
    {
      imageUrl: "/project1.png",
      title: "Outworld",
      slug: "the-outworld-app",
      description: "A web app that connects parents with fun activities for kids. Using location-based filtering, it helps families discover exciting options to keep their calendars full of memorable experiences.",
      badges: ["APP", "BRANDING", "DEV"],
    },
    {
      imageUrl: "/project2.png",
      title: "Aspire",
      slug: "aspire-app",
      description: "A habit-building app centered on 21-day challenges across various topics. Vibrant iconography and a clean interface inspire users to commit to self-improvement, one challenge at a time.",
      badges: ["APP", "BRANDING", "LANDING", "DEV"],
    },
    {
      imageUrl: "/project3.png",
      title: "Shinkai",
      slug: "shinkai-branding",
      description: "Brand identity and product guidelines for a decentralized AI platform. Shinkai enables users to build, run, and monetize autonomous AI agents while maintaining complete control over their data.",
      badges: ["BRANDING", "PRODUCT"],
    },
    {
      imageUrl: "/project4.png",
      title: "Zuma",
      slug: "zuma",
      description: "A fintech web app helping young adults take control of their finances through unlimited savings buckets. One account becomes a powerful system for achieving financial goals.",
      badges: ["WEBAPP", "PRODUCT"],
    },
    {
      imageUrl: "/project5.png",
      title: "Cinco",
      slug: "cinco",
      description: "A complete hotel operations ecosystem: a dashboard for managers, a mobile app for staff, and a guest portal. All components work together to help hotels earn five-star reviews.",
      badges: ["BRANDING", "WEBAPP", "APP", "PRODUCT"],
    },
    {
      imageUrl: "/project6.png",
      title: "Quizland App",
      slug: "quizland-app",
      description: "An AI-powered mobile app that generates custom quizzes on any topic. From history to pop culture, users simply type a subject and get personalized learning experiences instantly.",
      badges: ["APP", "LANDING", "DEV"],
    },
    {
      imageUrl: "/project7.png",
      title: "Yester.ai",
      slug: "yester-ai",
      description: "An AI-powered app for exploring history year by year. Pick any year, choose a topic like art or science, select a region, and discover the key moments that shaped the world.",
      badges: ["APP", "LANDING"],
    },
    {
      imageUrl: "/project8.png",
      title: "Versus",
      slug: "versus",
      description: "A mobile app connecting pickleball players based on location and skill level. Create or join matches, find nearby players, and never miss a game.",
      badges: ["APP", "LANDING"],
    }
  ];

  return (
    <section className="relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12 md:gap-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`
                ${(index === 3 || index === 4) ? 'md:col-span-3' : 'md:col-span-2'}
              `}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
                slug={project.slug}
                badges={project.badges}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
