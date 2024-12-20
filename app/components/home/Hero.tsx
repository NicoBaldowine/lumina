import { Inter_Tight } from 'next/font/google';
import Link from 'next/link';
import HeroBackground from './HeroBackground';

const interTight = Inter_Tight({ subsets: ['latin'] });

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-start justify-center overflow-hidden pt-[200px] pb-[200px]">
      <HeroBackground />
      <div className="container relative z-10 mx-auto">
        <h1 
          className="text-left text-[clamp(40px,6.5vw,82px)] leading-[0.95] tracking-[-4px] mb-6 max-w-[1200px]" 
          style={{ fontFamily: 'Cabinet Grotesk' }}
        >
          <div className="animate-gradient bg-gradient-to-r from-white via-[#666666] to-white bg-[length:200%_auto] bg-clip-text text-transparent">
            Grow your business with simple,<br />
            innovative & effective design.
          </div>
        </h1>
        <p className={`text-left text-[16px] leading-[1.4] tracking-[0px] text-white/40 mb-8 max-w-[600px] ${interTight.className}`}>
          Describe how you use data analysis to inform website design and marketing strategies,<br />
          optimizing for better engagement and conversion rates.
        </p>
        <div className="flex gap-4">
          <Link 
            href="/contact" 
            className="inline-flex px-4 py-2 rounded-full text-[14px] leading-[1.6] tracking-[-0.01em] text-white bg-[#333333] hover:bg-[#444444] transition-all duration-300"
          >
            Contact us
          </Link>
          <Link 
            href="/services" 
            className="inline-flex px-4 py-2 rounded-full text-[14px] leading-[1.6] tracking-[-0.01em] text-[#999999] border border-white/20 hover:bg-white hover:text-[#070606] transition-all duration-300"
          >
            Services
          </Link>
        </div>
      </div>
    </section>
  );
}
