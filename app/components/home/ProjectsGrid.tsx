import ProjectCard from './ProjectCard';

export default function ProjectsGrid() {
  const projects = [
    {
      imageUrl: "/project1.png",
      title: "Brand Identity Design",
      description: "Creating a cohesive visual language that reflects the brand's core values and resonates with its audience.",
      layout: "third"
    },
    {
      imageUrl: "/project2.png",
      title: "Digital Product Design",
      description: "Crafting intuitive digital experiences that prioritize user needs and business objectives.",
      layout: "third"
    },
    {
      imageUrl: "/project3.png",
      title: "Web Design System",
      description: "Building scalable design systems that ensure consistency across digital platforms.",
      layout: "third"
    },
    {
      imageUrl: "/project4.png",
      title: "Mobile App Design",
      description: "Designing engaging mobile experiences that delight users and drive engagement.",
      layout: "half"
    },
    {
      imageUrl: "/project5.png",
      title: "E-commerce Platform",
      description: "Creating seamless shopping experiences that convert visitors into customers.",
      layout: "half"
    },
    {
      imageUrl: "/project6.png",
      title: "Marketing Website",
      description: "Developing compelling websites that tell brand stories and generate leads.",
      layout: "third"
    },
    {
      imageUrl: "/project7.png",
      title: "Brand Strategy",
      description: "Developing effective brand strategies that connect with target audiences.",
      layout: "third"
    },
    {
      imageUrl: "/project8.png",
      title: "UI Design",
      description: "Creating beautiful and functional user interfaces for digital products.",
      layout: "third"
    }
  ];

  return (
    <section className="relative -mt-[100px]">
      <div className="px-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12">
          {projects.map((project, index) => (
            <div 
              key={index}
              className={`
                ${project.layout === 'third' ? 'md:col-span-2' : 'md:col-span-3'}
              `}
            >
              <ProjectCard 
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
                layout={project.layout}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
