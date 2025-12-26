import ProjectCard from './ProjectCard';

export default function ProjectsGrid() {
  const projects = [
    {
      imageUrl: "/project1.png",
      title: "The Outworld App",
      description: "We collaborated to create a tool that connects parents with fun activities for kids. This web app identifies parents' locations and filters activities to keep their calendars full of exciting options to enjoy with their children.",
    },
    {
      imageUrl: "/project2.png",
      title: "Aspire App",
      description: "A visually impactful project aimed at creating an app for building routines through 21-day challenges on various topics. The idea was to use vibrant iconography to inspire anyone striving for self-improvement.",
    },
    {
      imageUrl: "/project3.png",
      title: "Shinkai Branding",
      description: "Shinkai is a powerful product offering interconnected AI agents, all in one place and open-source. This was an exciting project to craft an identity that resonates with its audience.",
    },
    {
      imageUrl: "/project4.png",
      title: "Shinkai Website",
      description: "A landing page for the Shinkai product designed to showcase use cases and features, highlighting the value proposition. It enables users to subscribe to different plans and access the tool effortlessly.",
    },
    {
      imageUrl: "/project5.png",
      title: "Scala Web Application",
      description: "An innovative platform connecting talent with hiring managers, bridging gaps to streamline and accelerate the hiring process. It's ideal for talent looking to build portfolio cases with real-world projects.",
    },
    {
      imageUrl: "/project6.png",
      title: "Travel Wallet",
      description: "A travel wallet project featuring multi-currency support, currency exchange, and a digital wallet card for payments worldwide. It also integrates AI for generating illustrations, making it a unique product.",
    },
    {
      imageUrl: "/project7.png",
      title: "Scala Branding",
      description: "Scala's concept bridges companies with talent, visually embodying the connection of these two worlds. The mission was to craft a recognizable identity emphasizing growth, connection, and scalability.",
    },
    {
      imageUrl: "/project8.png",
      title: "Quizland App",
      description: "An innovative product leveraging AI to generate quizzes on any topic users can imagine. With a simple interface and robust integration with OpenAI, this app provides a compelling blend of endless entertainment and education.",
    }
  ];

  return (
    <section className="relative -mt-[100px]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12">
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
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
