'use client';

import { useContext, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ThemeContext } from '../../components/ThemeProvider';
import ImageWithLoader from '../../components/ui/ImageWithLoader';

interface PostData {
  title: string;
  description: string;
  imageUrl: string;
}

const postsData: Record<string, PostData> = {
  'the-future-of-end-to-end-design': {
    title: 'The Future of End-to-End Design',
    description: 'Why cohesive design across brand, product, and development is more critical than ever in the age of AI.',
    imageUrl: '/post1.png',
  },
  'mastering-design-systems': {
    title: 'Design Systems: The Bridge Between Vision and Code',
    description: 'How systematic design connects brand identity, product experience, and development into one scalable foundation.',
    imageUrl: '/post2.png',
  },
  'research-key-to-differentiation': {
    title: 'Research: The Key to Differentiation',
    description: 'Why startups that talk to users win, and how research separates products that scale from products that fail.',
    imageUrl: '/post3.png',
  }
};

export default function BlogPostPage() {
  const { isDarkMode } = useContext(ThemeContext);
  const params = useParams();
  const slug = params.slug as string;
  const post = postsData[slug];
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!post) {
    return (
      <main className="min-h-screen pt-[72px]">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <h1 className={`text-big-title mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            Post not found
          </h1>
        </div>
      </main>
    );
  }

  // Render the future of end-to-end design post
  if (slug === 'the-future-of-end-to-end-design') {
    return (
      <main className="min-h-screen pt-[72px]">
        {/* Hero Section - Wide Container */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              <div>
                <h1
                  className={`text-big-title mb-6 transition-all duration-1000 ease-out ${
                    isDarkMode ? 'text-white' : 'text-black'
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  {post.title}
                </h1>
                <p
                  className={`text-big-description transition-all duration-1000 delay-100 ease-out ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  {post.description}
                </p>
              </div>
              <div
                className={`relative aspect-[4/3] overflow-hidden transition-all duration-1000 delay-200 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <ImageWithLoader
                  src={post.imageUrl}
                  alt={post.title}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Opening Statement - Full Width Quote */}
        <section
          className={`py-16 md:py-24 transition-all duration-1000 delay-300 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-[1000px] mx-auto px-6">
            <p
              className={`text-medium-title leading-relaxed ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              AI is making it easier than ever to build digital products. Code generation, rapid prototyping, automated workflows—the barriers to shipping software are falling fast. But this acceleration creates a new problem: when everyone can build, what makes a product stand out?
            </p>
          </div>
        </section>

        {/* The Answer - Centered */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-[800px] mx-auto px-6">
            <p
              className={`text-big-description ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}
            >
              The answer is design. Not design as decoration, but design as strategy. The cohesive, intentional work that connects brand identity to product experience to every line of code.
            </p>
          </div>
        </section>

        {/* Section: The New Competitive Advantage */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
              <div className="lg:col-span-4">
                <h2
                  className={`text-medium-title ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  The New Competitive Advantage
                </h2>
              </div>
              <div className="lg:col-span-8 space-y-6">
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  When building becomes commoditized, the differentiation shifts to what you build and how it feels. A landing page generated in minutes still needs to communicate trust. An app scaffolded by AI still needs to guide users through a coherent experience.
                </p>
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  The technology handles the how. Design answers the why.
                </p>
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  This is where end-to-end design becomes essential. Brand identity, product design, and development can no longer exist in silos. They must work as one system, each reinforcing the other.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Highlighted Quote with Border */}
        <section className="py-16 md:py-24">
          <div className="max-w-[1000px] mx-auto px-6">
            <div
              className={`border-l-2 pl-8 md:pl-12 ${
                isDarkMode ? 'border-white' : 'border-black'
              }`}
            >
              <p
                className={`text-medium-title leading-relaxed ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
              >
                Users form opinions in milliseconds. A disconnected brand—where the logo feels different from the product, where the landing page promises something the app does not deliver—creates friction. That friction costs conversions, engagement, and loyalty.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Consistency Builds Trust */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-[800px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-8 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              Consistency Builds Trust
            </h2>
            <p
              className={`text-big-description ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}
            >
              Cohesive design eliminates this friction. When your visual identity, messaging, and product experience align, users understand who you are immediately. They trust faster. They engage deeper. They remember longer.
            </p>
          </div>
        </section>

        {/* Section: Creativity is the Last Moat - Two Column */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-12 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              Creativity is the Last Moat
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              <p
                className={`text-big-description ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                AI can generate variations. It can optimize. It can execute patterns at scale. What it cannot do is understand your audience at a human level. It cannot make the strategic choice to break convention when breaking convention serves the brand.
              </p>
              <p
                className={`text-big-description ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                This is where designers earn their place. Not as operators of tools, but as strategic thinkers who understand how perception shapes behavior. How color communicates value. How typography conveys personality. How motion creates emotion.
              </p>
            </div>
          </div>
        </section>

        {/* Full Width Statement */}
        <section
          className={`py-20 md:py-32 ${
            isDarkMode ? 'bg-neutral-800/50' : 'bg-neutral-100'
          }`}
        >
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <p
              className={`text-big-title ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              The startups that win will not be the ones that build fastest. They will be the ones that build with intention.
            </p>
          </div>
        </section>

        {/* Section: The Integration Imperative */}
        <section className="py-16 md:py-24">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
              <div className="lg:col-span-5">
                <h2
                  className={`text-medium-title mb-6 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  The Integration Imperative
                </h2>
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  Where brand strategy informs product decisions. Where product design shapes development priorities. Where every touchpoint feels like the same company, the same vision, the same promise.
                </p>
              </div>
              <div className="lg:col-span-7">
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  This requires a different approach. Not brand agencies handing off guidelines to product teams who hand off specs to developers. But integrated teams where design thinking runs through every decision, from positioning to pixels to production code.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Closing Section */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-[800px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-8 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              The Future Belongs to the Cohesive
            </h2>
            <div className="space-y-6">
              <p
                className={`text-big-description ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                Speed is no longer a differentiator—everyone has access to the same AI tools. What separates successful products is clarity of vision, consistency of execution, and the creativity to stand out in an increasingly crowded market.
              </p>
              <p
                className={`text-big-description ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
              >
                End-to-end design is not a luxury. It is the foundation of products that capture attention, build trust, and create lasting value. In the age of AI, design matters more than ever.
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // Render the design systems post
  if (slug === 'mastering-design-systems') {
    return (
      <main className="min-h-screen pt-[72px]">
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              <div>
                <h1
                  className={`text-big-title mb-6 transition-all duration-1000 ease-out ${
                    isDarkMode ? 'text-white' : 'text-black'
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  {post.title}
                </h1>
                <p
                  className={`text-big-description transition-all duration-1000 delay-100 ease-out ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  {post.description}
                </p>
              </div>
              <div
                className={`relative aspect-[4/3] overflow-hidden transition-all duration-1000 delay-200 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <ImageWithLoader
                  src={post.imageUrl}
                  alt={post.title}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Opening Statement */}
        <section
          className={`py-16 md:py-24 transition-all duration-1000 delay-300 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-[1000px] mx-auto px-6">
            <p
              className={`text-medium-title leading-relaxed ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              A design system is not a component library. It is not a style guide. It is the operating system for how your brand thinks, speaks, and builds. Everything can be systematized. Everything can scale.
            </p>
          </div>
        </section>

        {/* The Real Problem */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
              <div className="lg:col-span-4">
                <h2
                  className={`text-medium-title ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  The Alignment Problem
                </h2>
              </div>
              <div className="lg:col-span-8 space-y-6">
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  Most startups operate in fragments. The brand team creates guidelines that never reach the product. The product team designs screens that developers interpret differently. The result is a product that feels disconnected from itself.
                </p>
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  Design systems solve this by creating a single source of truth that spans every discipline.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Three Pillars - Cards */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-12 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              Three Systems, One Foundation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Brand System */}
              <div
                className={`p-8 ${
                  isDarkMode ? 'bg-neutral-800/50' : 'bg-neutral-100'
                }`}
              >
                <h3
                  className={`text-card-title mb-4 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  Brand System
                </h3>
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  The DNA of your identity. Logo usage, color palettes, typography hierarchies, voice and tone. Rules that ensure your brand is recognizable whether on a billboard or a button.
                </p>
              </div>
              {/* Product System */}
              <div
                className={`p-8 ${
                  isDarkMode ? 'bg-neutral-800/50' : 'bg-neutral-100'
                }`}
              >
                <h3
                  className={`text-card-title mb-4 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  Product System
                </h3>
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  The language of interaction. Components, patterns, spacing, motion. How users navigate, how feedback appears, how actions feel. Consistency that builds muscle memory.
                </p>
              </div>
              {/* Development System */}
              <div
                className={`p-8 ${
                  isDarkMode ? 'bg-neutral-800/50' : 'bg-neutral-100'
                }`}
              >
                <h3
                  className={`text-card-title mb-4 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  Development System
                </h3>
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  The implementation of intent. Code components, design tokens, documentation. What designers envision is exactly what developers build. No interpretation, no drift.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quote with Border */}
        <section className="py-16 md:py-24">
          <div className="max-w-[1000px] mx-auto px-6">
            <div
              className={`border-l-2 pl-8 md:pl-12 ${
                isDarkMode ? 'border-white' : 'border-black'
              }`}
            >
              <p
                className={`text-medium-title leading-relaxed ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
              >
                Design systems are not about restricting creativity. They are about channeling it. Clear rules create freedom to innovate within a framework that maintains coherence.
              </p>
            </div>
          </div>
        </section>

        {/* The Bridge Section */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-[800px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-8 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              The Bridge We Build
            </h2>
            <div className="space-y-6">
              <p
                className={`text-big-description ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                At Lumina, we see design systems as the critical bridge between vision and execution. Brand guidelines that never leave the PDF are worthless. Product designs that get lost in translation help no one.
              </p>
              <p
                className={`text-big-description ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                We build systems that live in code. Components documented in Storybook. Design tokens that sync between Figma and your codebase. A single update propagates everywhere.
              </p>
            </div>
          </div>
        </section>

        {/* Full Width - AI Statement */}
        <section
          className={`py-20 md:py-32 ${
            isDarkMode ? 'bg-neutral-800/50' : 'bg-neutral-100'
          }`}
        >
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <p
              className={`text-big-title mb-8 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              AI has changed everything about building design systems.
            </p>
            <p
              className={`text-big-description max-w-[800px] mx-auto ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}
            >
              What once took months now takes weeks. Component libraries that required dedicated engineering teams can now be scaffolded and iterated rapidly. The barrier between design and code has never been lower.
            </p>
          </div>
        </section>

        {/* AI + Design Systems - Two Column */}
        <section className="py-16 md:py-24">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-12 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              AI-Accelerated Systems
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              <div className="space-y-6">
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  Frontend development has been transformed. AI can generate component code from design specs. It can create Storybook documentation automatically. It can suggest accessibility improvements and catch inconsistencies before they ship.
                </p>
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  The bottleneck is no longer implementation. It is thinking.
                </p>
              </div>
              <div className="space-y-6">
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  The strategic decisions—what to systematize, how components should behave, which patterns serve users best—still require human judgment. AI accelerates execution but cannot replace the intentionality that makes great design systems work.
                </p>
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  This is the new workflow: human strategy, AI acceleration, systematic delivery.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What Good Systems Do - List */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
              <div className="lg:col-span-5">
                <h2
                  className={`text-medium-title mb-6 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  What Good Systems Do
                </h2>
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  A well-built design system answers questions before they are asked. It creates guardrails that prevent mistakes. It empowers teams to move fast without breaking coherence.
                </p>
              </div>
              <div className="lg:col-span-7">
                <div className="space-y-4">
                  {[
                    'Define what to do and what not to do',
                    'Connect brand values to product decisions',
                    'Eliminate interpretation between design and code',
                    'Scale without losing consistency',
                    'Onboard new team members in days, not months',
                    'Enable rapid iteration within clear boundaries'
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-4 py-3 border-b ${
                        isDarkMode ? 'border-neutral-700' : 'border-neutral-200'
                      }`}
                    >
                      <span
                        className={`text-small-description ${
                          isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
                        }`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <p
                        className={`text-big-description ${
                          isDarkMode ? 'text-white' : 'text-black'
                        }`}
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-[800px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-8 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              Systems That Scale
            </h2>
            <div className="space-y-6">
              <p
                className={`text-big-description ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                The best products feel inevitable. Every screen, every interaction, every piece of communication feels like it belongs. That coherence does not happen by accident. It happens through systems.
              </p>
              <p
                className={`text-big-description ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
              >
                Brand systems. Product systems. Development systems. Connected, maintained, and scaled together. This is the foundation we build at Lumina—not just beautiful designs, but the infrastructure to keep them beautiful as you grow.
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // Render the research post
  if (slug === 'research-key-to-differentiation') {
    return (
      <main className="min-h-screen pt-[72px]">
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              <div>
                <h1
                  className={`text-big-title mb-6 transition-all duration-1000 ease-out ${
                    isDarkMode ? 'text-white' : 'text-black'
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  {post.title}
                </h1>
                <p
                  className={`text-big-description transition-all duration-1000 delay-100 ease-out ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  {post.description}
                </p>
              </div>
              <div
                className={`relative aspect-[4/3] overflow-hidden transition-all duration-1000 delay-200 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <ImageWithLoader
                  src={post.imageUrl}
                  alt={post.title}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Opening Statement */}
        <section
          className={`py-16 md:py-24 transition-all duration-1000 delay-300 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-[1000px] mx-auto px-6">
            <p
              className={`text-medium-title leading-relaxed ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              Most startups fail not because they cannot build. They fail because they build the wrong thing. The difference between products that scale and products that die is simple: talking to users.
            </p>
          </div>
        </section>

        {/* The Hard Truth */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-[800px] mx-auto px-6">
            <p
              className={`text-big-description ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}
            >
              Research is not a phase. It is not something you do once and forget. It is the continuous practice of understanding the people you serve—before you build, while you build, and after you ship.
            </p>
          </div>
        </section>

        {/* Full Width Statement */}
        <section
          className={`py-20 md:py-32 ${
            isDarkMode ? 'bg-neutral-800/50' : 'bg-neutral-100'
          }`}
        >
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <p
              className={`text-big-title ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              Without users, there is no startup.
            </p>
          </div>
        </section>

        {/* Market Research Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
              <div className="lg:col-span-4">
                <h2
                  className={`text-medium-title ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  Finding Your Niche
                </h2>
              </div>
              <div className="lg:col-span-8 space-y-6">
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  Market research is where differentiation begins. Understanding who you serve, what problems keep them up at night, and where current solutions fall short. This is not about demographics and market size. It is about finding the gap where your product becomes inevitable.
                </p>
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  The best products do not compete on features. They compete on understanding.
                </p>
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  Market fit is not found in spreadsheets. It is found in conversations. In watching people struggle with existing tools. In hearing the same frustrations repeated by different people who have never met each other.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quote with Border */}
        <section className="py-16 md:py-24">
          <div className="max-w-[1000px] mx-auto px-6">
            <div
              className={`border-l-2 pl-8 md:pl-12 ${
                isDarkMode ? 'border-white' : 'border-black'
              }`}
            >
              <p
                className={`text-medium-title leading-relaxed ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
              >
                Founders who do not talk to users are building for themselves. They create products based on assumptions, hunches, and what they think the market needs. They are almost always wrong.
              </p>
            </div>
          </div>
        </section>

        {/* Validation Section - Cards */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-12 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              Two Types of Validation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Business Validation */}
              <div
                className={`p-8 ${
                  isDarkMode ? 'bg-neutral-800/50' : 'bg-neutral-100'
                }`}
              >
                <h3
                  className={`text-card-title mb-4 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  Business Validation
                </h3>
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  Is this problem worth solving? Will people pay for the solution? How big is the opportunity? Business validation tests whether your startup should exist at all. Talk to potential customers before writing a single line of code. Understand their pain, their budget, their decision-making process.
                </p>
              </div>
              {/* Interface Validation */}
              <div
                className={`p-8 ${
                  isDarkMode ? 'bg-neutral-800/50' : 'bg-neutral-100'
                }`}
              >
                <h3
                  className={`text-card-title mb-4 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  Interface Validation
                </h3>
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  Can users actually use what you built? Do they understand the flow? Where do they get confused? Interface validation tests whether your solution is usable. High-fidelity prototypes in front of real users, watching them struggle and succeed, iterating until the experience feels obvious.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Prototyping Section */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-[800px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-8 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              The Power of Rapid Prototypes
            </h2>
            <div className="space-y-6">
              <p
                className={`text-big-description ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                You do not need a finished product to test with users. You need something that feels real enough to provoke honest reactions. High-quality rapid prototypes let you test assumptions in days, not months.
              </p>
              <p
                className={`text-big-description ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                The goal is not to impress users with polish. It is to learn where they hesitate, what they misunderstand, and what they wish existed. Every prototype session reveals something. Every conversation shapes the next iteration.
              </p>
              <p
                className={`text-big-description ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
              >
                Ship to learn. Learn to ship better.
              </p>
            </div>
          </div>
        </section>

        {/* Roadmap Section - Two Column */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-12 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              Users Build Your Roadmap
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              <p
                className={`text-big-description ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                Feature prioritization is not a guessing game. It is a conversation. Users tell you what they need most urgently, what would make them switch from competitors, what they would pay extra for. Your job is to listen.
              </p>
              <p
                className={`text-big-description ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                The best roadmaps are built from patterns in user feedback. When five different customers mention the same friction point, that is your next priority. When nobody asks for a feature you thought was essential, that is a feature you should not build.
              </p>
            </div>
          </div>
        </section>

        {/* Normalize Conversations - List */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
              <div className="lg:col-span-5">
                <h2
                  className={`text-medium-title mb-6 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  Make Research Normal
                </h2>
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  User research should not be an occasional event. It should be a continuous habit embedded in how your team operates.
                </p>
              </div>
              <div className="lg:col-span-7">
                <div className="space-y-4">
                  {[
                    'Schedule regular user calls, not just when problems arise',
                    'Include everyone on the team in research, not just designers',
                    'Build feedback loops into your product itself',
                    'Create channels for users to reach you easily',
                    'Share research findings across the entire organization',
                    'Celebrate insights that change your direction'
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-4 py-3 border-b ${
                        isDarkMode ? 'border-neutral-700' : 'border-neutral-200'
                      }`}
                    >
                      <span
                        className={`text-small-description ${
                          isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
                        }`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <p
                        className={`text-big-description ${
                          isDarkMode ? 'text-white' : 'text-black'
                        }`}
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Quote Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-[1000px] mx-auto px-6">
            <div
              className={`border-l-2 pl-8 md:pl-12 ${
                isDarkMode ? 'border-white' : 'border-black'
              }`}
            >
              <p
                className={`text-medium-title leading-relaxed ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
              >
                AI agents are changing research forever. They can conduct initial interviews, analyze transcripts for patterns, synthesize feedback at scale. The tools are getting better every month.
              </p>
            </div>
          </div>
        </section>

        {/* AI in Research - Asymmetric */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
              <div className="lg:col-span-5">
                <h2
                  className={`text-medium-title mb-6 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  AI-Augmented Research
                </h2>
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  AI does not replace human research. It amplifies it. What once required a dedicated research team can now be supported by intelligent agents that handle the repetitive work.
                </p>
              </div>
              <div className="lg:col-span-7 space-y-6">
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  Imagine AI agents that conduct preliminary user interviews, identify patterns across hundreds of feedback entries, and surface the insights that matter most. The human researcher still makes the strategic decisions, but they operate with far more data than was ever possible before.
                </p>
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  This is the future: human empathy amplified by artificial intelligence, creating products that truly understand the people they serve.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-[800px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-8 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              Research Is Your Unfair Advantage
            </h2>
            <div className="space-y-6">
              <p
                className={`text-big-description ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                The startups that win are the ones closest to their users. They know their customers by name. They understand problems the market does not even know it has. They build products that feel like they read minds.
              </p>
              <p
                className={`text-big-description ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
              >
                This is not magic. It is research. Continuous, rigorous, human-centered research. The greatest competitive advantage you can build is not a feature—it is understanding. The closer you are to your users, the harder you are to compete with.
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // Default render for other posts
  return (
    <main className="min-h-screen pt-[72px]">
      <article className="py-8 md:py-16">
        <div className="max-w-[800px] mx-auto px-6">
          <h1
            className={`text-big-title mb-4 md:mb-6 transition-all duration-1000 ease-out ${
              isDarkMode ? 'text-white' : 'text-black'
            } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {post.title}
          </h1>
          <p
            className={`text-big-description mb-8 md:mb-12 transition-all duration-1000 delay-200 ease-out ${
              isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
            } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {post.description}
          </p>

          <div
            className={`relative aspect-[16/9] mb-8 md:mb-12 overflow-hidden transition-all duration-1000 delay-300 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <ImageWithLoader
              src={post.imageUrl}
              alt={post.title}
            />
          </div>

          <div
            className={`transition-all duration-1000 delay-400 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className={`text-big-description ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Coming soon...
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
