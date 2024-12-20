import Image from 'next/image';

export default function AboutUsPage() {
  return (
    <main className="min-h-screen pt-[72px]">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] tracking-[-0.02em] mb-6 font-cabinet-grotesk">
              We create digital experiences that matter
            </h1>
            <p className="text-[18px] leading-[1.6] text-[#999999] max-w-2xl">
              Our team of designers and developers work together to create innovative solutions that help businesses grow and succeed in the digital world.
            </p>
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section className="py-20 bg-[#111]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h3 className="text-[24px] leading-[1.2] tracking-[-0.02em] text-white/90 font-cabinet-grotesk">
                Our Mission
              </h3>
              <p className="text-[14px] leading-[1.6] text-[#999999]">
                To deliver exceptional digital solutions that transform businesses and enhance user experiences.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-[24px] leading-[1.2] tracking-[-0.02em] text-white/90 font-cabinet-grotesk">
                Our Vision
              </h3>
              <p className="text-[14px] leading-[1.6] text-[#999999]">
                To be the leading creative force in digital innovation and design excellence.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-[24px] leading-[1.2] tracking-[-0.02em] text-white/90 font-cabinet-grotesk">
                Our Values
              </h3>
              <p className="text-[14px] leading-[1.6] text-[#999999]">
                Innovation, collaboration, and unwavering commitment to quality in everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 