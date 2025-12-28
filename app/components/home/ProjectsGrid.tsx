import ProjectCard from './ProjectCard';

export default function ProjectsGrid() {
  const projects = [
    {
      imageUrl: "/project1.png",
      title: "Outworld",
      slug: "the-outworld-app",
      description: "We collaborated to create a tool that connects parents with fun activities for kids. This web app identifies parents' locations and filters activities to keep their calendars full of exciting options to enjoy with their children.",
      badges: ["APP", "BRANDING", "DEV"],
    },
    {
      imageUrl: "/project2.png",
      title: "Aspire",
      slug: "aspire-app",
      description: "A visually impactful project aimed at creating an app for building routines through 21-day challenges on various topics. The idea was to use vibrant iconography to inspire anyone striving for self-improvement.",
      badges: ["APP", "BRANDING", "LANDING", "DEV"],
    },
    {
      imageUrl: "/project3.png",
      title: "Shinkai",
      slug: "shinkai-branding",
      description: "We partnered with Shinkai to craft a brand identity and product guidelines for their decentralized AI platform — where users build, run, and monetize autonomous AI agents while maintaining complete control over their data.",
      badges: ["BRANDING", "PRODUCT"],
    },
    {
      imageUrl: "/project4.png",
      title: "Zuma",
      slug: "zuma",
      description: "We partnered with Zuma to design a fintech web app that helps young adults take control of their finances through unlimited savings buckets — turning one account into a powerful system for achieving financial goals.",
      badges: ["WEBAPP", "PRODUCT"],
    },
    {
      imageUrl: "/project5.png",
      title: "Cinco",
      slug: "cinco",
      description: "We partnered with Cinco to design a complete hotel operations ecosystem — a dashboard for managers, a mobile app for staff, and a guest portal — all working together to earn five-star reviews.",
      badges: ["BRANDING", "WEBAPP", "APP", "PRODUCT"],
    },
    {
      imageUrl: "/project6.png",
      title: "Quizland App",
      slug: "quizland-app",
      description: "We designed and developed Quizland — an AI-powered mobile app that generates custom quizzes on any topic imaginable. From history to pop culture, users simply type a topic and let AI create personalized learning experiences.",
      badges: ["APP", "LANDING", "DEV"],
    },
    {
      imageUrl: "/project7.png",
      title: "Yester.ai",
      slug: "yester-ai",
      description: "We designed and developed Yester.ai — an AI-powered app that lets you explore history year by year. Pick any year, choose a topic like art or science, select a region, and discover the key moments that shaped our world.",
      badges: ["APP", "LANDING"],
    },
    {
      imageUrl: "/project8.png",
      title: "Versus",
      slug: "versus",
      description: "We designed and developed Versus — a mobile app connecting pickleball players based on location and skill level. Create or join matches, find players near you, and never miss a game.",
      badges: ["APP", "LANDING"],
    }
  ];

  return (
    <section className="relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-12">
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
