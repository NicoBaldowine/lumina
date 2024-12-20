import ServiceCard from './ServiceCard';
import Link from 'next/link';
import { GeistSans } from 'geist/font/sans';

export default function ServicesSection() {
  const services = [
    {
      title: "Product Design",
      description: "Crafting intuitive and visually appealing designs that enhance brand identity and deliver exceptional user experiences.",
      variant: 'ovals' as const
    },
    {
      title: "Web Design",
      description: "Strategic web designs to boost site visibility and enhance user engagement through modern, responsive solutions.",
      variant: 'circles' as const
    },
    {
      title: "Brand Design",
      description: "Building distinctive brand identities that forge strong connections and leave lasting impressions on your audience.",
      variant: 'flower' as const
    }
  ];

  return (
    <section className="py-32">
      <div className="px-6">
        <div className="flex justify-between items-center mb-12">
          <h2 className={`${GeistSans.className} font-light text-[40px] leading-[1.1] tracking-[-0.03em] text-white/90`}>
            Services
          </h2>
          <Link 
            href="/services"
            className="px-4 py-2 rounded-full text-[14px] leading-[1.6] tracking-[-0.01em] text-[#999999] border border-white/20 hover:bg-white hover:text-[#070606] transition-all duration-300"
          >
            All Services
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              variant={service.variant}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
