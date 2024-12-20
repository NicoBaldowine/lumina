export default function ServicesPage() {
  const services = [
    {
      title: "Web Development",
      description: "Custom websites and web applications built with the latest technologies.",
      features: ["Responsive Design", "Performance Optimization", "SEO Best Practices"]
    },
    {
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications for iOS and Android.",
      features: ["Native Performance", "Cross-platform Solutions", "App Store Optimization"]
    },
    {
      title: "Brand Design",
      description: "Comprehensive branding solutions to establish your visual identity.",
      features: ["Logo Design", "Brand Guidelines", "Visual Identity"]
    },
    {
      title: "UI/UX Design",
      description: "User-centered design solutions that enhance user experience.",
      features: ["User Research", "Wireframing", "Prototyping"]
    }
  ];

  return (
    <main className="min-h-screen pt-[72px]">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] tracking-[-0.02em] mb-6 font-cabinet-grotesk">
              Our Services
            </h1>
            <p className="text-[18px] leading-[1.6] text-[#999999] max-w-2xl">
              We offer a comprehensive range of digital services to help your business succeed online.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-[#111]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div key={index} className="p-8 border border-white/10 rounded-lg space-y-4">
                <h3 className="text-[24px] leading-[1.2] tracking-[-0.02em] text-white/90 font-cabinet-grotesk">
                  {service.title}
                </h3>
                <p className="text-[14px] leading-[1.6] text-[#999999]">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-[14px] leading-[1.6] text-[#999999] flex items-center gap-2">
                      <span className="w-1 h-1 bg-[#43D4A9] rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 