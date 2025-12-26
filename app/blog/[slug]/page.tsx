'use client';

import { useContext, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ThemeContext } from '../../components/ThemeProvider';
import Image from 'next/image';

const postsData: Record<string, {
  title: string;
  description: string;
  content: string;
  imageUrl?: string;
}> = {
  'the-future-of-web-design': {
    title: 'The Future of Web Design',
    description: 'Exploring emerging trends and technologies shaping the future of web design and user experiences.',
    imageUrl: '/post1.png',
    content: `The landscape of web design is constantly evolving, driven by technological advancements and changing user expectations. As we look ahead, several key trends are shaping how we approach digital experiences.

Artificial intelligence is becoming increasingly integrated into design workflows, from automated layout suggestions to personalized user experiences. Designers are leveraging AI tools to streamline repetitive tasks while focusing their creative energy on strategic decisions.

The rise of immersive technologies like AR and VR is pushing designers to think beyond traditional 2D interfaces. Spatial design principles are becoming essential skills as we prepare for more three-dimensional web experiences.

Sustainability in design is gaining momentum, with a focus on creating lightweight, energy-efficient websites that minimize environmental impact. This includes optimizing images, reducing unnecessary scripts, and choosing eco-friendly hosting solutions.

Accessibility continues to be a driving force, moving from an afterthought to a fundamental design requirement. Inclusive design practices ensure digital products work for everyone, regardless of ability or circumstance.`
  },
  'mastering-design-systems': {
    title: 'Mastering Design Systems',
    description: 'A comprehensive guide to creating and maintaining scalable design systems for modern applications.',
    imageUrl: '/post2.png',
    content: `Design systems have become essential infrastructure for modern digital products. They provide a shared language between designers and developers, ensuring consistency and efficiency across projects.

A successful design system starts with foundational elements: typography, color, spacing, and iconography. These building blocks form the DNA of your visual language and should be thoughtfully defined before moving to more complex components.

Component libraries are the heart of any design system. Each component should be designed for flexibility and reusability, with clear documentation on usage guidelines and implementation patterns.

Governance is often overlooked but crucial for long-term success. Establish clear processes for proposing changes, reviewing contributions, and deprecating outdated patterns. Without governance, design systems can quickly become fragmented.

Documentation transforms a collection of components into a true design system. Include usage guidelines, code examples, accessibility considerations, and best practices for each element.

Adoption requires ongoing effort. Regular training sessions, office hours, and champions within product teams help ensure the system is actually used and continues to evolve with the organization's needs.`
  },
  'ux-research-methods': {
    title: 'UX Research Methods',
    description: 'Essential research methods and techniques for understanding user needs and behaviors.',
    imageUrl: '/post3.png',
    content: `Understanding users is the foundation of great design. UX research provides the insights needed to make informed decisions and create products that truly serve user needs.

User interviews remain one of the most valuable research methods. One-on-one conversations reveal motivations, pain points, and mental models that quantitative data alone cannot capture. The key is asking open-ended questions and listening actively.

Usability testing puts your designs in front of real users to identify friction points and validate assumptions. Whether moderated or unmoderated, testing should happen early and often throughout the design process.

Surveys scale research to larger audiences, gathering quantitative data on preferences, satisfaction, and behaviors. Combine closed and open-ended questions for both statistical significance and qualitative depth.

Analytics provide behavioral data showing what users actually do, complementing self-reported data from surveys and interviews. Tools like heatmaps and session recordings reveal patterns that users themselves might not articulate.

Contextual inquiry observes users in their natural environment, uncovering workflows and pain points that don't surface in controlled settings. This method is particularly valuable for enterprise products with complex use cases.`
  },
  'building-accessible-interfaces': {
    title: 'Building Accessible Interfaces',
    description: 'How to create inclusive digital experiences that work for everyone, regardless of ability.',
    content: `Accessibility is not a feature—it's a fundamental aspect of good design. Creating inclusive interfaces ensures your product works for the widest possible audience, including people with disabilities.

Start with semantic HTML. Proper heading hierarchy, landmark regions, and meaningful element choices provide structure that assistive technologies can interpret. This foundation costs nothing and delivers significant accessibility benefits.

Color contrast affects readability for everyone, but especially users with low vision or color blindness. Follow WCAG guidelines for minimum contrast ratios and avoid conveying information through color alone.

Keyboard navigation is essential for users who cannot use a mouse. Ensure all interactive elements are focusable, focus states are visible, and focus order follows a logical sequence through the interface.

Form design requires special attention. Labels should be programmatically associated with inputs, error messages should be clear and helpful, and required fields should be indicated in accessible ways.

Testing with assistive technologies reveals issues automated tools miss. Screen readers, keyboard-only navigation, and zoom testing should be regular parts of your quality assurance process.`
  },
  'psychology-of-color-in-design': {
    title: 'The Psychology of Color in Design',
    description: 'Understanding how color choices impact user perception and behavior in digital products.',
    content: `Color is one of the most powerful tools in a designer's arsenal. Beyond aesthetics, color influences emotions, guides attention, and shapes how users perceive your product.

Cultural context matters enormously. Colors carry different meanings across cultures—white signifies purity in Western contexts but mourning in some Eastern cultures. Research your audience before committing to a color palette.

Emotional associations with colors are well-documented but not absolute. Blue often conveys trust and stability, making it popular in finance and healthcare. Red signals urgency and excitement, effective for calls-to-action but overwhelming when overused.

Functional color supports usability. Consistent use of colors for actions, states, and feedback helps users learn your interface faster. Green for success, red for errors, and yellow for warnings are patterns users already understand.

Accessibility considerations affect color choices significantly. Sufficient contrast, colorblind-friendly palettes, and not relying on color alone to convey meaning ensure your design works for everyone.

Testing color choices with real users reveals whether your intended associations actually land. What feels energetic to one audience might feel aggressive to another.`
  },
  'mobile-first-design-principles': {
    title: 'Mobile-First Design Principles',
    description: 'Why starting with mobile leads to better experiences across all devices and screen sizes.',
    content: `Mobile-first design is more than a technical approach—it's a philosophy that prioritizes content, performance, and user needs. Starting with constraints leads to better solutions.

The mobile context forces prioritization. Limited screen real estate means identifying what truly matters and presenting it clearly. This discipline benefits all screen sizes, preventing feature bloat and cluttered interfaces.

Performance considerations are amplified on mobile. Slower connections and less powerful processors demand efficient code and optimized assets. A fast mobile site will be blazingly fast on desktop.

Touch interactions inform interface design. Finger-friendly tap targets, swipe gestures, and thumb-zone awareness create interfaces that feel native to mobile devices. These considerations translate to more intuitive interfaces everywhere.

Progressive enhancement builds up from the mobile foundation. Rather than stripping features for small screens, you add capabilities as screen size and device power increase. The core experience remains solid regardless of context.

Responsive design is the technical implementation of mobile-first thinking. Flexible grids, fluid images, and strategic breakpoints ensure your design adapts gracefully to any screen size.`
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
            {post.imageUrl ? (
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                sizes="800px"
              />
            ) : (
              <div className={`w-full h-full ${isDarkMode ? 'bg-neutral-700' : 'bg-neutral-300'}`} />
            )}
          </div>

          <div
            className={`transition-all duration-1000 delay-400 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {post.content.split('\n\n').map((paragraph, index) => (
              <p
                key={index}
                className={`text-big-description mb-6 ${
                  isDarkMode ? 'text-neutral-300' : 'text-neutral-600'
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
