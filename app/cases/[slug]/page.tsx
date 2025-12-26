'use client';

import { useContext } from 'react';
import { useParams } from 'next/navigation';
import { ThemeContext } from '../../components/ThemeProvider';

const casesData: Record<string, { title: string; description: string; imageUrl: string }> = {
  'the-outworld-app': {
    title: 'The Outworld App',
    description: 'We collaborated to create a tool that connects parents with fun activities for kids. This web app identifies parents\' locations and filters activities to keep their calendars full of exciting options to enjoy with their children.',
    imageUrl: '/project1.png'
  },
  'aspire-app': {
    title: 'Aspire App',
    description: 'A visually impactful project aimed at creating an app for building routines through 21-day challenges on various topics. The idea was to use vibrant iconography to inspire anyone striving for self-improvement.',
    imageUrl: '/project2.png'
  },
  'shinkai-branding': {
    title: 'Shinkai Branding',
    description: 'Shinkai is a powerful product offering interconnected AI agents, all in one place and open-source. This was an exciting project to craft an identity that resonates with its audience.',
    imageUrl: '/project3.png'
  },
  'shinkai-website': {
    title: 'Shinkai Website',
    description: 'A landing page for the Shinkai product designed to showcase use cases and features, highlighting the value proposition. It enables users to subscribe to different plans and access the tool effortlessly.',
    imageUrl: '/project4.png'
  },
  'scala-web-application': {
    title: 'Scala Web Application',
    description: 'An innovative platform connecting talent with hiring managers, bridging gaps to streamline and accelerate the hiring process. It\'s ideal for talent looking to build portfolio cases with real-world projects.',
    imageUrl: '/project5.png'
  },
  'travel-wallet': {
    title: 'Travel Wallet',
    description: 'A travel wallet project featuring multi-currency support, currency exchange, and a digital wallet card for payments worldwide. It also integrates AI for generating illustrations, making it a unique product.',
    imageUrl: '/project6.png'
  },
  'scala-branding': {
    title: 'Scala Branding',
    description: 'Scala\'s concept bridges companies with talent, visually embodying the connection of these two worlds. The mission was to craft a recognizable identity emphasizing growth, connection, and scalability.',
    imageUrl: '/project7.png'
  },
  'quizland-app': {
    title: 'Quizland App',
    description: 'An innovative product leveraging AI to generate quizzes on any topic users can imagine. With a simple interface and robust integration with OpenAI, this app provides a compelling blend of endless entertainment and education.',
    imageUrl: '/project8.png'
  }
};

export default function CasePage() {
  const { isDarkMode } = useContext(ThemeContext);
  const params = useParams();
  const slug = params.slug as string;
  const caseData = casesData[slug];

  if (!caseData) {
    return (
      <main className="min-h-screen pt-[72px]">
        <div className="container mx-auto px-6 py-20">
          <h1 className={`text-big-title mb-6 ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
            Case not found
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-[72px]">
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className={`text-big-title mb-4 md:mb-6 ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
              {caseData.title}
            </h1>
            <p className={`text-big-description ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              {caseData.description}
            </p>
          </div>
        </div>
      </section>

      <section className={`py-12 md:py-20 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-neutral-50'}`}>
        <div className="container mx-auto px-6">
          <p className={`text-big-description text-center ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Full case study coming soon.
          </p>
        </div>
      </section>
    </main>
  );
}
