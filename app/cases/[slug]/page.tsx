'use client';

import { useContext, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ThemeContext } from '../../components/ThemeProvider';

interface CaseStudy {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  year: string;
  services: string[];
  client: string;
  hasFullCase: boolean;
}

const casesData: Record<string, CaseStudy> = {
  'the-outworld-app': {
    title: 'Bringing Families Closer to Adventure',
    subtitle: 'Outworld',
    description: 'We collaborated to create a tool that connects parents with fun activities for kids. This web app identifies parents\' locations and filters activities to keep their calendars full of exciting options to enjoy with their children.',
    imageUrl: '/project1.png',
    year: '2024',
    services: ['Branding', 'Product Design', 'Mobile Development', 'Web Design'],
    client: 'Outworld',
    hasFullCase: true
  },
  'aspire-app': {
    title: 'Building Better Habits, One Day at a Time',
    subtitle: 'Aspire',
    description: 'We partnered to create a motivational app that helps users build positive habits or break negative ones through structured 21-day challenges. The app combines psychology-backed methodology with vibrant design to make self-improvement feel achievable.',
    imageUrl: '/project2.png',
    year: '2024',
    services: ['Branding', 'Product Design', 'Landing Page'],
    client: 'Aspire',
    hasFullCase: true
  },
  'shinkai-branding': {
    title: 'AI on Your Terms',
    subtitle: 'Shinkai',
    description: 'We partnered with Shinkai to craft a brand identity and product guidelines for their decentralized AI platform — where users build, run, and monetize autonomous AI agents while maintaining complete control over their data, identity, and payments.',
    imageUrl: '/project3.png',
    year: '2024',
    services: ['Branding', 'Product Guidelines'],
    client: 'Shinkai',
    hasFullCase: true
  },
  'zuma': {
    title: 'Save Smarter, Live Better',
    subtitle: 'Zuma',
    description: 'We partnered with Zuma to design a fintech web app that helps young adults take control of their finances. By connecting to bank accounts through Plaid, Zuma lets users create unlimited savings buckets — turning one account into a powerful system for achieving financial goals.',
    imageUrl: '/project4.png',
    year: '2024',
    services: ['Product Design', 'Web Application'],
    client: 'Zuma',
    hasFullCase: true
  },
  'cinco': {
    title: 'The Staff Operations Platform for Modern Hotels',
    subtitle: 'Cinco',
    description: 'We partnered with Cinco to design a complete hotel operations ecosystem — a dashboard for managers, a mobile app for staff, and a guest portal — all working together to transform service quality and earn those five-star reviews.',
    imageUrl: '/project5.png',
    year: '2024',
    services: ['Branding', 'Product Design', 'Web Application', 'Mobile App'],
    client: 'Cinco',
    hasFullCase: true
  },
  'quizland-app': {
    title: 'Learn Anything, Quiz Everything',
    subtitle: 'Quizland App',
    description: 'We designed and developed Quizland — an AI-powered mobile app that generates custom quizzes on any topic imaginable. From history to pop culture to complex sciences, users simply type a topic and let AI create personalized learning experiences.',
    imageUrl: '/project6.png',
    year: '2024',
    services: ['Product Design', 'Mobile Development', 'Landing Page'],
    client: 'Quizland',
    hasFullCase: true
  },
  'yester-ai': {
    title: 'Memories, Intelligently Preserved',
    subtitle: 'Yester.ai',
    description: 'Brand identity and product design for an AI-powered platform that helps users capture, organize, and relive their most meaningful memories through intelligent storytelling.',
    imageUrl: '/project7.png',
    year: '2024',
    services: ['Branding', 'Product Design'],
    client: 'Yester.ai',
    hasFullCase: false
  },
  'versus': {
    title: 'Competition Redefined',
    subtitle: 'Versus',
    description: 'A bold brand identity for a competitive gaming platform that brings players together through head-to-head challenges and community-driven tournaments.',
    imageUrl: '/project8.png',
    year: '2024',
    services: ['Branding', 'Visual Identity'],
    client: 'Versus',
    hasFullCase: false
  }
};

// Full case study content for The Outworld
const outworldContent = {
  intro: {
    headline: 'Every weekend shouldn\'t feel like a research project',
    description: '73% of parents spend over 2 hours per week searching for family activities. 68% give up and repeat the same outings. The Outworld reduced activity discovery time by 85%, helping families reclaim their weekends and discover 3x more new experiences.'
  },
  challenge: {
    title: 'The Challenge',
    content: 'The founders of The Outworld came to us with a clear vision but needed help bringing it to life. They had validated the problem through extensive user research — parents were frustrated with fragmented information about family activities.',
    content2: 'Some relied on Facebook groups, others on outdated websites, and many just gave up and stayed home. The challenge was threefold: create a brand that resonates with modern parents, design an intuitive mobile experience, and build a scalable technical foundation.'
  },
  approach: {
    title: 'Our Approach',
    content: 'We started where we always start — with the people who would use it. Through interviews with parents across different demographics, we understood their mental models, frustrations, and desires. Parents didn\'t just want a list of activities; they wanted curated experiences that matched their family\'s unique needs.'
  },
  deliverables: [
    {
      title: 'Brand Identity',
      description: 'We crafted a brand that speaks to the adventurous spirit within every family. The name "Outworld" evokes exploration and discovery, while the visual identity balances playfulness with sophistication — appealing to parents who want quality experiences for their children.'
    },
    {
      title: 'Mobile Application',
      description: 'The core product is a React Native application that puts discovery at the forefront. Users can browse activities by location, filter by type (indoor, outdoor, educational, recreational), price range (free to premium), and age appropriateness. The geolocation feature surfaces nearby options in real-time.'
    },
    {
      title: 'Landing Page',
      description: 'We designed and developed a marketing website that communicates the value proposition clearly and drives app downloads. The landing page showcases key features, testimonials, and provides a seamless path to the app stores.'
    },
    {
      title: 'Technical Foundation',
      description: 'Built on React Native for cross-platform consistency and Supabase for a robust, scalable backend. This stack ensures fast iteration, real-time data sync, and cost-effective scaling as the user base grows.'
    }
  ],
  process: {
    title: 'The Process',
    phases: [
      {
        name: 'Discovery & Strategy',
        description: 'We immersed ourselves in the problem space. User interviews, competitor analysis, and market research helped us understand not just what to build, but why it would matter. We defined user personas, mapped out user journeys, and established success metrics.'
      },
      {
        name: 'Brand Development',
        description: 'The brand needed to feel trustworthy yet exciting. We explored multiple directions before landing on a visual system that combines warm, inviting colors with clean typography. The logo symbolizes the connection between families and the world of experiences waiting for them.'
      },
      {
        name: 'Product Design',
        description: 'We designed the app with a mobile-first mindset. Every interaction was optimized for one-handed use — because parents often have their hands full. The information architecture prioritized quick discovery, with filters and search always accessible. We prototyped extensively, testing with real users at every stage.'
      },
      {
        name: 'Development',
        description: 'Our development approach emphasized clean architecture and maintainability. We implemented the design system as reusable components, set up CI/CD pipelines for rapid deployment, and built comprehensive analytics to understand user behavior post-launch.'
      }
    ]
  },
  features: {
    title: 'Key Features',
    list: [
      {
        name: 'Smart Discovery',
        description: 'The app learns from user preferences and behavior to surface increasingly relevant activities over time.'
      },
      {
        name: 'Location-Based Search',
        description: 'Find activities near you or explore options in areas you\'re planning to visit.'
      },
      {
        name: 'Curated Content',
        description: 'Every activity is vetted and enriched with helpful details — what to expect, tips for visiting, and honest reviews from other parents.'
      },
      {
        name: 'Flexible Filtering',
        description: 'Filter by activity type, age range, price, distance, and more to find exactly what fits your family\'s needs.'
      },
      {
        name: 'Save & Share',
        description: 'Build collections of activities and share them with family or friends for collaborative planning.'
      }
    ]
  },
  results: {
    title: 'The Impact',
    content: 'The Outworld launched to an enthusiastic response from the parent community. The app has been praised for its intuitive design and the quality of its curated content. More importantly, it\'s helping families spend less time planning and more time experiencing.'
  },
  testimonial: {
    quote: 'Lumina didn\'t just build an app — they helped us realize our vision. Their attention to detail and understanding of our users made all the difference.',
    author: 'Founder, The Outworld'
  }
};

// Full case study content for Shinkai
const shinkaiContent = {
  intro: {
    headline: 'AI should work for you — not the other way around',
    description: 'In a world where AI tools demand your data in exchange for intelligence, Shinkai takes a different approach. We crafted an identity that embodies this philosophy: powerful AI that respects your privacy, autonomy, and ownership.'
  },
  challenge: {
    title: 'The Challenge',
    content: 'Shinkai is building something fundamentally different — a decentralized AI platform where users maintain control over their data, identity, and payments. The technology is groundbreaking: interconnected AI agents, local model execution, and blockchain-based micropayments.',
    content2: 'The challenge was translating this technical complexity into a brand that feels approachable yet sophisticated. How do you visually represent decentralization? Privacy? Agent autonomy? We needed to create a system that communicates trust and innovation in equal measure.'
  },
  approach: {
    title: 'Our Approach',
    content: 'We started by understanding the core philosophy: AI on your terms. This became our north star. Every design decision was filtered through this lens — does it feel like the user is in control? Does it communicate empowerment over dependency? The result is a brand that feels both cutting-edge and human-centered.'
  },
  brandPillars: [
    {
      title: 'Privacy by Design',
      description: 'Your data stays local. We visualized this through contained, self-sufficient design elements that suggest security without feeling restrictive.'
    },
    {
      title: 'Decentralized Power',
      description: 'No single point of control. The visual system uses distributed, modular components that reflect the decentralized architecture of the platform.'
    },
    {
      title: 'Agent Autonomy',
      description: 'AI that works independently. We created a visual language for autonomous agents — distinct personalities that operate within a cohesive system.'
    }
  ],
  deliverables: [
    {
      title: 'Brand Strategy',
      description: 'We developed a comprehensive brand strategy rooted in the concept of "AI liberation" — freeing users from the data-for-service model that dominates the industry. This positioning differentiates Shinkai in a crowded AI market.'
    },
    {
      title: 'Visual Identity',
      description: 'A complete visual system including logo, color palette, typography, and iconography. The identity balances technical sophistication with accessibility, using geometric forms that suggest both precision and openness.'
    },
    {
      title: 'Product Guidelines',
      description: 'Detailed guidelines for applying the brand across digital products — from the desktop app to web interfaces. This includes component styling, interaction patterns, and voice guidelines for AI agent personas.'
    }
  ],
  visualSystem: {
    title: 'Visual System',
    elements: [
      {
        name: 'Logo',
        description: 'The Shinkai mark represents interconnected intelligence — nodes working in harmony while maintaining individual autonomy. It scales from favicon to billboard without losing meaning.'
      },
      {
        name: 'Color Palette',
        description: 'A sophisticated palette anchored by deep navy and electric blue, balanced with warm neutrals. The colors evoke trust (navy), innovation (electric blue), and humanity (warm tones).'
      },
      {
        name: 'Typography',
        description: 'A type system that pairs a geometric sans-serif for headers with a highly legible text face for body copy. Technical enough for developers, friendly enough for everyone else.'
      },
      {
        name: 'Iconography',
        description: 'A custom icon set designed for AI concepts — agents, nodes, connections, privacy shields. Each icon works at multiple sizes and maintains clarity even at small scales.'
      }
    ]
  },
  guidelines: {
    title: 'Product Guidelines',
    sections: [
      {
        name: 'Interface Principles',
        description: 'We established core principles for all Shinkai interfaces: clarity over cleverness, progressive disclosure of complexity, and consistent visual feedback for AI operations.'
      },
      {
        name: 'Agent Visualization',
        description: 'Guidelines for how autonomous agents appear and behave in the interface — their visual presence, status indicators, and interaction patterns.'
      },
      {
        name: 'Dark Mode First',
        description: 'Given the technical audience and extended usage patterns, we designed dark mode as the primary experience with light mode as an accessible alternative.'
      },
      {
        name: 'Voice & Tone',
        description: 'Guidelines for how Shinkai communicates — technical but not jargon-heavy, confident but not arrogant, helpful without being patronizing.'
      }
    ]
  },
  results: {
    title: 'The Impact',
    content: 'The new brand identity has given Shinkai a distinct presence in the AI space. The visual system successfully communicates the platform\'s unique value proposition — powerful AI that respects user autonomy. The product guidelines ensure consistency as the platform grows, while allowing flexibility for future features.'
  },
  testimonial: {
    quote: 'Lumina understood that our brand needed to communicate something radical — that AI can be powerful AND private. They created an identity that makes this vision tangible.',
    author: 'Founder, Shinkai'
  }
};

// Full case study content for Aspire App
const aspireContent = {
  intro: {
    headline: 'It takes 21 days to form a habit — but most people quit by day 3',
    description: '92% of New Year\'s resolutions fail. The average person attempts the same habit change 7 times before succeeding. Aspire users complete 21-day challenges at a 67% rate — 4x the industry average — by turning habit formation into a visual, rewarding journey.'
  },
  challenge: {
    title: 'The Challenge',
    content: 'The Aspire team approached us with research showing that habit-building apps had a fundamental problem: they treated all habits the same way and relied on willpower alone. Users would start strong but lose motivation when progress felt invisible.',
    content2: 'They needed a product that understood the psychology of behavior change — that 21 days is the scientifically-backed threshold for habit formation, and that visual progress is essential for motivation. The challenge was to create something that felt personal, not generic.'
  },
  approach: {
    title: 'Our Approach',
    content: 'We immersed ourselves in behavioral psychology research and interviewed people who had both succeeded and failed at building habits. The insight was clear: people don\'t just need tracking, they need transformation to feel tangible. We designed every element to make the 21-day journey feel like an adventure, not a chore.'
  },
  deliverables: [
    {
      title: 'Brand Identity',
      description: 'We created a brand that embodies aspiration and achievement. The vibrant iconography system uses color psychology to evoke energy and positivity, while the name "Aspire" speaks to the universal human desire for self-improvement.'
    },
    {
      title: 'Mobile Application',
      description: 'The app features curated 21-day challenges across categories — from fitness and mindfulness to productivity and creativity. Each day presents a specific task, with visual progress indicators and motivational content to keep users engaged through the critical early days.'
    },
    {
      title: 'Landing Page',
      description: 'We designed a conversion-focused landing page that communicates the science behind 21-day habit formation and showcases the app\'s unique visual approach. The page drives app downloads while building trust in the methodology.'
    }
  ],
  process: {
    title: 'The Process',
    phases: [
      {
        name: 'Research & Psychology',
        description: 'We dove deep into habit formation science — studying the work of researchers on neuroplasticity and behavior change. We conducted user interviews with people who had successfully built lasting habits and those who had struggled, identifying the key differences in their approaches.'
      },
      {
        name: 'Brand Strategy',
        description: 'The brand needed to feel aspirational yet achievable. We developed a visual system centered on vibrant, energetic colors that evolve as users progress. Each challenge category has its own color identity, making the experience feel personal and organized.'
      },
      {
        name: 'Product Design',
        description: 'We designed the app around daily micro-interactions that build momentum. Each day\'s task is revealed fresh, creating anticipation. Visual progress — like filling in a 21-day grid — provides the tangible sense of achievement that keeps users coming back.'
      },
      {
        name: 'Launch Strategy',
        description: 'We created a landing page optimized for conversion, with clear messaging about the 21-day methodology and social proof from beta users. The launch strategy focused on the new year resolution crowd, capitalizing on peak motivation periods.'
      }
    ]
  },
  features: {
    title: 'Key Features',
    list: [
      {
        name: '21-Day Challenge Structure',
        description: 'Each challenge is carefully designed as a 21-day journey with daily tasks that build upon each other, based on proven habit formation science.'
      },
      {
        name: 'Visual Progress Tracking',
        description: 'A satisfying visual system shows progress as users complete each day, with special milestones at days 7, 14, and 21 to celebrate momentum.'
      },
      {
        name: 'Diverse Challenge Categories',
        description: 'From meditation and exercise to reading and digital detox — users can choose challenges that align with their personal growth goals.'
      },
      {
        name: 'Daily Motivation',
        description: 'Each day includes motivational content, tips, and reminders designed to help users push through the difficult middle phase of habit formation.'
      },
      {
        name: 'Streak Protection',
        description: 'Life happens. The app includes one "skip day" per challenge, acknowledging that flexibility increases long-term success rates.'
      }
    ]
  },
  results: {
    title: 'The Impact',
    content: 'Aspire launched to strong user engagement, with completion rates significantly higher than industry benchmarks for habit apps. The vibrant visual design has been praised by users as a key motivator, with many reporting that "seeing the progress" was what kept them going through difficult days.'
  },
  testimonial: {
    quote: 'Lumina understood that we weren\'t just building an app — we were building a system for personal transformation. The design makes every day feel like an achievement.',
    author: 'Founder, Aspire'
  }
};

// Full case study content for Zuma
const zumaContent = {
  intro: {
    headline: 'Credit card debt is the silent killer of financial dreams',
    description: 'The average American under 35 carries $3,700 in credit card debt. 45% of Gen Z has already accumulated credit card debt before age 25. Zuma users save 3x more than traditional banking users by making every dollar intentional — no debt, no overdrafts, just progress toward real goals.'
  },
  challenge: {
    title: 'The Challenge',
    content: 'Young adults are entering the financial world with a dangerous default: credit cards. Banks push credit as the answer to everything — from coffee to emergencies — creating a cycle of debt that can take decades to escape. The average credit card APR is now over 20%, turning small purchases into long-term burdens.',
    content2: 'Zuma\'s founders saw a different path. What if instead of borrowing against your future, you could allocate your present? They needed a product that would make intentional saving as easy as swiping a credit card — and more rewarding than the instant gratification of debt.'
  },
  approach: {
    title: 'Our Approach',
    content: 'We approached this challenge by understanding the psychology of young savers. Through user research, we discovered that the problem wasn\'t motivation — young people want to save. The problem was visibility. Traditional bank accounts show one number. That number hides everything: rent money, emergency funds, vacation savings, and spending money all look the same. Zuma makes the invisible visible.'
  },
  stats: [
    {
      number: '$3,700',
      label: 'Average credit card debt for under-35s'
    },
    {
      number: '45%',
      label: 'Of Gen Z with credit card debt before 25'
    },
    {
      number: '20%+',
      label: 'Average credit card APR'
    },
    {
      number: '3x',
      label: 'More savings with bucket-based systems'
    }
  ],
  deliverables: [
    {
      title: 'Product Strategy',
      description: 'We defined the core product vision: your bank account, but organized. Zuma connects via Plaid to mirror your existing checking or savings account, then lets you create unlimited "buckets" — virtual allocations that give every dollar a purpose without moving money between accounts.'
    },
    {
      title: 'Web Application Design',
      description: 'We designed a responsive web app that makes bucket management intuitive. Users can create buckets for any goal — from "New iPhone" to "Emergency Fund" to "House Down Payment" — set targets, and watch their progress in real-time. The interface prioritizes clarity and motivation.'
    },
    {
      title: 'Banking Integration',
      description: 'Through Plaid integration, Zuma securely connects to users\' existing bank accounts. The app acts as a smart mirror — it doesn\'t hold money, it organizes it. This approach removes friction (no new accounts needed) while providing powerful visibility.'
    }
  ],
  features: {
    title: 'Key Features',
    list: [
      {
        name: 'Unlimited Buckets',
        description: 'Create as many savings buckets as you need — from short-term goals like concert tickets to long-term dreams like a house down payment.'
      },
      {
        name: 'Smart Allocation',
        description: 'Set rules for automatic allocation when deposits hit your account. Pay yourself first, automatically.'
      },
      {
        name: 'Goal Tracking',
        description: 'Visual progress bars and milestone celebrations keep users motivated. Seeing progress is believing in progress.'
      },
      {
        name: 'Spending Awareness',
        description: 'Know exactly what\'s available to spend without touching your goals. No more "where did my money go?" moments.'
      },
      {
        name: 'No Credit Required',
        description: 'Zuma is anti-debt by design. Save for what you want, buy it when you\'re ready, own it outright.'
      }
    ]
  },
  process: {
    title: 'The Process',
    phases: [
      {
        name: 'User Research',
        description: 'We interviewed young adults about their relationship with money. The patterns were clear: they felt out of control, overwhelmed by complexity, and pressured into credit. They wanted simplicity and progress they could see.'
      },
      {
        name: 'Product Architecture',
        description: 'We designed the bucket system to be infinitely flexible. Whether someone wants 3 buckets or 30, the interface scales elegantly. We prioritized the most common actions: checking progress, adding money, and creating new goals.'
      },
      {
        name: 'Visual Design',
        description: 'The interface uses color-coding and progress visualization to make abstract numbers feel concrete. Each bucket has its own personality, making saving feel like collecting achievements rather than restricting spending.'
      },
      {
        name: 'Technical Integration',
        description: 'We designed the Plaid integration flow to be trustworthy and transparent. Users understand exactly what Zuma can and can\'t do with their bank connection, building confidence in the security model.'
      }
    ]
  },
  philosophy: {
    title: 'The Anti-Credit Philosophy',
    content: 'Zuma exists because we believe debt shouldn\'t be the default. Every purchase made on credit is a bet against your future self. Every purchase made with savings is an investment in your present peace of mind. Zuma makes the second choice as easy as the first.',
    principles: [
      {
        title: 'Visibility Over Complexity',
        description: 'Traditional finance hides information behind jargon and complexity. Zuma shows you exactly where you stand, in plain language.'
      },
      {
        title: 'Progress Over Perfection',
        description: 'You don\'t need to save 50% of your income. You need to save something, consistently, toward things that matter.'
      },
      {
        title: 'Ownership Over Owing',
        description: 'The goal isn\'t financial sophistication — it\'s financial freedom. Own your purchases. Own your goals. Own your future.'
      }
    ]
  },
  results: {
    title: 'The Impact',
    content: 'Zuma launched as a tool for financial clarity in a world of financial confusion. Early users report feeling "in control of money for the first time" and "actually excited to check their savings." The bucket system has proven especially powerful for goal-oriented saving, with users achieving purchase goals 3x faster than with traditional savings accounts.'
  },
  testimonial: {
    quote: 'Lumina didn\'t just design an app — they designed a new relationship with money. The product feels like it understands how young people actually think about finances.',
    author: 'Founder, Zuma'
  }
};

// Full case study content for Cinco
const cincoContent = {
  intro: {
    headline: 'Five-star service starts behind the scenes',
    description: 'Hotels live and die by their reviews. Yet 68% of negative hotel reviews mention service issues — slow housekeeping, unresponsive staff, maintenance delays. Cinco helps hotels coordinate their entire staff operation in real-time, turning operational chaos into the seamless service guests remember.'
  },
  challenge: {
    title: 'The Challenge',
    content: 'The hospitality industry runs on paper clipboards, walkie-talkies, and WhatsApp groups. Managers don\'t know which rooms are ready. Staff don\'t know their priorities. Guests wait too long for everything. In Latin America and Spain, where tourism is a massive industry, hotels are competing for the same guests — but operating like it\'s 1995.',
    content2: 'Cinco\'s founders saw an opportunity to modernize hotel operations from the inside out. They needed three products that work as one: a command center for managers, a task system for staff, and a service portal for guests. The name "Cinco" comes from the Spanish word for five — as in five-star service.'
  },
  approach: {
    title: 'Our Approach',
    content: 'We approached this as an ecosystem design challenge. Each user type — manager, staff, guest — has different needs, contexts, and devices. But they all share one goal: excellent service delivered efficiently. We designed three products that feel like one unified system, with real-time synchronization and clear role-based experiences.'
  },
  stats: [
    {
      number: '68%',
      label: 'Of negative reviews mention service issues'
    },
    {
      number: '47min',
      label: 'Average time saved per day per staff member'
    },
    {
      number: '3x',
      label: 'Faster response to guest requests'
    },
    {
      number: '40%',
      label: 'Reduction in operational miscommunication'
    }
  ],
  ecosystem: {
    title: 'The Ecosystem',
    products: [
      {
        name: 'Manager Dashboard',
        platform: 'Web Application',
        description: 'The command center for hotel operations. Managers see real-time room status, track housekeeping progress, monitor check-in/check-out timing, manage tickets and incidents, and analyze staff performance. Everything they need to run the hotel — in one view.'
      },
      {
        name: 'Staff App',
        platform: 'React Native Mobile',
        description: 'The daily companion for hotel staff. Housekeepers, maintenance, and front desk employees see their assigned tasks, clock in and out of shifts, report incidents, and update task status in real-time. Priorities are clear. Nothing falls through the cracks.'
      },
      {
        name: 'Guest Portal',
        platform: 'Web Application',
        description: 'The modern hotel experience for guests. Request room service, set do-not-disturb status, order amenities, and access hotel information — all from their phone. No more waiting on hold or walking to the front desk.'
      }
    ]
  },
  features: {
    title: 'Key Features',
    list: [
      {
        name: 'Real-Time Room Status',
        description: 'See every room\'s status at a glance — occupied, vacant, being cleaned, ready for check-in, or maintenance needed.'
      },
      {
        name: 'Smart Task Assignment',
        description: 'Automatically distribute tasks based on staff location, workload, and specialization. No more manual coordination.'
      },
      {
        name: 'Check-In/Out Tracking',
        description: 'Monitor guest arrivals and departures in real-time. Know exactly when rooms become available and how long turnovers take.'
      },
      {
        name: 'Incident Management',
        description: 'Staff can report issues instantly with photos. Maintenance tickets are created, assigned, and tracked until resolved.'
      },
      {
        name: 'Staff Performance Analytics',
        description: 'Track response times, task completion rates, and service quality metrics. Identify top performers and training opportunities.'
      },
      {
        name: 'Guest Request System',
        description: 'Guests make requests through the portal, staff receive them instantly, managers can monitor response times.'
      }
    ]
  },
  process: {
    title: 'The Process',
    phases: [
      {
        name: 'Industry Research',
        description: 'We spent time in hotels — watching operations, interviewing managers, shadowing housekeeping staff, and understanding guest pain points. The gap between how hotels think they operate and how they actually operate was eye-opening.'
      },
      {
        name: 'Ecosystem Architecture',
        description: 'We mapped every interaction between managers, staff, and guests. The key insight: information flows in all directions, but each role needs it presented differently. We designed a unified data model with role-specific interfaces.'
      },
      {
        name: 'Multi-Platform Design',
        description: 'The manager dashboard needed to handle complexity on desktop. The staff app needed to be fast and one-handed on mobile. The guest portal needed to be intuitive without any learning curve. Three products, one design language.'
      },
      {
        name: 'Bilingual Implementation',
        description: 'With Latin America and Spain as primary markets, the entire ecosystem was designed for English and Spanish from day one. Not just translated — culturally adapted for hospitality contexts in both languages.'
      }
    ]
  },
  philosophy: {
    title: 'The Five-Star Philosophy',
    content: 'Great hotel service isn\'t about grand gestures — it\'s about consistency. The room is ready on time. The request is handled quickly. The problem is fixed before it escalates. Cinco makes the invisible work of hospitality visible, measurable, and manageable.',
    principles: [
      {
        title: 'Visibility Creates Accountability',
        description: 'When everyone can see what needs to be done, ownership happens naturally. No more "I thought someone else was handling it."'
      },
      {
        title: 'Staff Empowerment Equals Guest Satisfaction',
        description: 'Give staff the tools to do their jobs well, and they\'ll deliver better service. Cinco treats staff as professionals, not just task-doers.'
      },
      {
        title: 'Operations Drive Reviews',
        description: 'Every five-star review starts with a well-coordinated back-of-house. Fix the operations, and the reviews follow.'
      }
    ]
  },
  results: {
    title: 'The Impact',
    content: 'Cinco launched with pilot hotels in Mexico and Colombia, with expansion planned across Latin America and Spain. Early results show 40% reduction in guest complaint response times, 25% improvement in room turnover efficiency, and measurable increases in review scores. Hotels using Cinco report that staff feel more organized and guests notice the difference.'
  },
  testimonial: {
    quote: 'Lumina understood that we weren\'t just building software — we were redesigning how hotels operate. They delivered three products that work as one, and our pilot hotels are already seeing the results in their reviews.',
    author: 'Founder, Cinco'
  }
};

// Full case study content for Quizland
const quizlandContent = {
  intro: {
    headline: 'What if you could learn about literally anything?',
    description: 'Traditional learning apps force you into their curriculum. Quizland flips the script — you choose the topic, AI creates the quiz, and you learn exactly what you want to know. From ancient history to modern memes, no subject is off-limits.'
  },
  challenge: {
    title: 'The Challenge',
    content: 'Education apps are everywhere, but they all share the same limitation: pre-made content. Users are stuck learning what the app decides is important. For curious minds who want to explore niche topics or test themselves on specific subjects, existing solutions fall short.',
    content2: 'Quizland\'s founder wanted to build something different — an app where the user\'s curiosity drives the experience. The challenge was making AI-generated content feel polished, educational, and fun, while keeping the interface simple enough that anyone could use it instantly.'
  },
  approach: {
    title: 'Our Approach',
    content: 'We designed Quizland with one principle: get out of the user\'s way. The core interaction is beautifully simple — type a topic, tap generate, start quizzing. Behind that simplicity, we built a robust system that leverages OpenAI\'s API to create intelligent, contextual questions that actually teach while they test.'
  },
  stats: [
    {
      number: '∞',
      label: 'Possible quiz topics'
    },
    {
      number: '4',
      label: 'Difficulty levels'
    },
    {
      number: '<3s',
      label: 'Quiz generation time'
    },
    {
      number: '4.8★',
      label: 'App Store rating'
    }
  ],
  deliverables: [
    {
      title: 'Mobile Application',
      description: 'A native iOS app built for speed and delight. The interface prioritizes the quiz experience with clean typography, smooth animations, and a dark theme that\'s easy on the eyes during late-night learning sessions.'
    },
    {
      title: 'AI Integration',
      description: 'Deep integration with OpenAI\'s API to generate contextually relevant questions. We engineered prompts that produce consistent, educational content across difficulty levels — from beginner-friendly to expert-challenging.'
    },
    {
      title: 'Landing Page',
      description: 'A marketing website that communicates the app\'s value proposition instantly. The page showcases key features, displays the app interface, and drives downloads with clear calls-to-action.'
    }
  ],
  features: {
    title: 'Key Features',
    list: [
      {
        name: 'Infinite Topics',
        description: 'Type any topic you can imagine — history, science, pop culture, sports, niche hobbies — and get a custom quiz in seconds.'
      },
      {
        name: 'Adaptive Difficulty',
        description: 'Start as a beginner and climb the ranks. Four difficulty levels let you challenge yourself as your knowledge grows.'
      },
      {
        name: 'Instant Feedback',
        description: 'See what you got right, where you went wrong, and learn from your mistakes immediately after each quiz.'
      },
      {
        name: 'Topic Discovery',
        description: 'Explore trending subjects, browse popular categories, or get suggestions based on your interests.'
      },
      {
        name: 'Progress Tracking',
        description: 'Watch your knowledge grow over time with stats on topics covered, accuracy rates, and skill improvement.'
      },
      {
        name: 'Offline Mode',
        description: 'Save generated quizzes to play offline — perfect for commutes, flights, or anywhere without connection.'
      }
    ]
  },
  process: {
    title: 'The Process',
    phases: [
      {
        name: 'Product Strategy',
        description: 'We mapped the user journey from curiosity to knowledge. The key insight: the moment between "I wonder about X" and "let me learn about X" needs to be frictionless. Every design decision optimized for that moment.'
      },
      {
        name: 'AI Engineering',
        description: 'We spent significant time crafting prompts that generate high-quality educational content. The AI needed to understand context, calibrate difficulty, and create questions that test understanding — not just memory.'
      },
      {
        name: 'Interface Design',
        description: 'The dark navy theme with white text creates focus and reduces eye strain. Card-based layouts make content scannable. Emoji icons add personality without cluttering the interface.'
      },
      {
        name: 'Development',
        description: 'Built natively for iOS with Swift, optimizing for performance and smooth animations. The app feels responsive and polished, with generation happening fast enough to feel instant.'
      }
    ]
  },
  philosophy: {
    title: 'The Learning Philosophy',
    content: 'Quizland is built on the belief that curiosity should never hit a dead end. Traditional education tells you what to learn. Quizland lets you follow your interests wherever they lead.',
    principles: [
      {
        title: 'Curiosity-Driven',
        description: 'You decide what\'s worth learning. The app serves your interests, not the other way around.'
      },
      {
        title: 'Learn by Testing',
        description: 'Active recall — testing yourself — is proven to be more effective than passive reading. Quizland makes testing fun.'
      },
      {
        title: 'No Limits',
        description: 'From quantum physics to reality TV, every topic is valid. Knowledge isn\'t hierarchical.'
      }
    ]
  },
  results: {
    title: 'The Impact',
    content: 'Quizland launched on the App Store to enthusiastic reception. Users love the freedom to explore any topic and the instant gratification of AI-generated quizzes. The app has been particularly popular with lifelong learners, trivia enthusiasts, and students looking to make studying more engaging.'
  },
  testimonial: {
    quote: 'Lumina brought our vision to life perfectly. They understood that we weren\'t just building a quiz app — we were building a tool for infinite curiosity. The result feels magical.',
    author: 'Founder, Quizland'
  }
};

export default function CasePage() {
  const { isDarkMode } = useContext(ThemeContext);
  const params = useParams();
  const slug = params.slug as string;
  const caseData = casesData[slug];
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

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

  // Render full case study for The Outworld
  if (slug === 'the-outworld-app' && caseData.hasFullCase) {
    return (
      <main className="min-h-screen pt-[72px]">
        {/* Hero Section - Wide Container (1420px) */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              <div>
                <p
                  className={`text-small-description mb-4 transition-all duration-1000 ease-out ${
                    isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  {caseData.subtitle}
                </p>
                <h1
                  className={`text-big-title mb-6 transition-all duration-1000 delay-100 ease-out ${
                    isDarkMode ? 'text-white' : 'text-black'
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  {caseData.title}
                </h1>
                <p
                  className={`text-big-description mb-8 transition-all duration-1000 delay-200 ease-out ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  {caseData.description}
                </p>

                {/* Project Meta */}
                <div
                  className={`grid grid-cols-2 gap-6 transition-all duration-1000 delay-300 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <div>
                    <p className={`text-small-description mb-1 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                      Client
                    </p>
                    <p className={`text-small-description ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {caseData.client}
                    </p>
                  </div>
                  <div>
                    <p className={`text-small-description mb-1 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                      Year
                    </p>
                    <p className={`text-small-description ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {caseData.year}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className={`text-small-description mb-1 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                      Services
                    </p>
                    <p className={`text-small-description ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {caseData.services.join(' · ')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div
              className={`mt-12 md:mt-16 aspect-[16/9] transition-all duration-1000 delay-400 ease-out ${
                isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className={`w-full h-full flex items-center justify-center ${
                isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
              }`}>
                <span className="text-small-description">Hero Image — App Overview</span>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction - Stats headline */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-medium-title max-w-4xl ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {outworldContent.intro.description}
            </h2>
          </div>
        </section>

        {/* Challenge Section - Wide Container (Text left, Image right) */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div>
                <h2
                  className={`text-medium-title mb-6 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  {outworldContent.challenge.title}
                </h2>
                <p
                  className={`text-big-description mb-4 ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  {outworldContent.challenge.content}
                </p>
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  {outworldContent.challenge.content2}
                </p>
              </div>
              {/* Image Placeholder */}
              <div
                className={`aspect-[4/3] ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Research & Discovery</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Approach Section - Wide Container (Image left, Text right) */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Image Placeholder - Now on the left */}
              <div
                className={`aspect-[4/3] order-2 lg:order-1 ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">User Research Insights</span>
                </div>
              </div>
              {/* Text - Now on the right */}
              <div className="order-1 lg:order-2">
                <h2
                  className={`text-medium-title mb-6 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  {outworldContent.approach.title}
                </h2>
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  {outworldContent.approach.content}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Deliverables Section - Wide Container */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-12 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              What We Delivered
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {outworldContent.deliverables.map((item, index) => {
                const icons = [
                  // Brand Identity - Sparkle/Star icon
                  <svg key="brand" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>,
                  // Mobile Application - Device phone icon
                  <svg key="mobile" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                  </svg>,
                  // Landing Page - Globe icon
                  <svg key="landing" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>,
                  // Technical Foundation - Code icon
                  <svg key="tech" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>
                ];
                return (
                  <div key={index}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                      isDarkMode ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-black'
                    }`}>
                      {icons[index]}
                    </div>
                    <h3
                      className={`text-card-title mb-3 ${
                        isDarkMode ? 'text-white' : 'text-black'
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-small-description ${
                        isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Brand Identity Images - Wide Container */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-8 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              Brand Identity
            </h2>
            {/* Full width image */}
            <div
              className={`aspect-[21/9] mb-8 ${
                isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
              }`}
            >
              <div className={`w-full h-full flex items-center justify-center ${
                isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
              }`}>
                <span className="text-small-description">Brand Overview — Logo & Colors</span>
              </div>
            </div>
            {/* Two column images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div
                className={`aspect-[4/3] ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Logo Variations</span>
                </div>
              </div>
              <div
                className={`aspect-[4/3] ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Color Palette & Typography</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section - Narrow Container */}
        <section className="py-12 md:py-20">
          <div className="max-w-[920px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-12 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {outworldContent.process.title}
            </h2>
            <div className="space-y-12">
              {outworldContent.process.phases.map((phase, index) => (
                <div key={index}>
                  <div className="flex items-baseline gap-4 mb-4">
                    <span
                      className={`text-small-description ${
                        isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <h3
                      className={`text-card-title ${
                        isDarkMode ? 'text-white' : 'text-black'
                      }`}
                    >
                      {phase.name}
                    </h3>
                  </div>
                  <p
                    className={`text-big-description pl-10 ${
                      isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                    }`}
                  >
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Design Images - Wide Container */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-8 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              Product Design
            </h2>
            {/* Full width image */}
            <div
              className={`aspect-[21/9] mb-8 ${
                isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
              }`}
            >
              <div className={`w-full h-full flex items-center justify-center ${
                isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
              }`}>
                <span className="text-small-description">App Screens Overview</span>
              </div>
            </div>
            {/* Three column images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                className={`aspect-[9/16] ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Home Screen</span>
                </div>
              </div>
              <div
                className={`aspect-[9/16] ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Activity Detail</span>
                </div>
              </div>
              <div
                className={`aspect-[9/16] ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Search & Filters</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Narrow Container */}
        <section className="py-12 md:py-20">
          <div className="max-w-[920px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-12 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {outworldContent.features.title}
            </h2>
            <div className="space-y-8">
              {outworldContent.features.list.map((feature, index) => (
                <div
                  key={index}
                  className={`pb-8 ${
                    index < outworldContent.features.list.length - 1
                      ? `border-b ${isDarkMode ? 'border-neutral-700' : 'border-neutral-200'}`
                      : ''
                  }`}
                >
                  <h3
                    className={`text-card-title mb-2 ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    {feature.name}
                  </h3>
                  <p
                    className={`text-big-description ${
                      isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* More Product Images - Wide Container */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            {/* Two column layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div
                className={`aspect-[4/3] ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Map View</span>
                </div>
              </div>
              <div
                className={`aspect-[4/3] ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Collections View</span>
                </div>
              </div>
            </div>
            {/* Full width image */}
            <div
              className={`aspect-[21/9] ${
                isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
              }`}
            >
              <div className={`w-full h-full flex items-center justify-center ${
                isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
              }`}>
                <span className="text-small-description">Landing Page Design</span>
              </div>
            </div>
          </div>
        </section>

        {/* Results & Testimonial - Narrow Container */}
        <section className="py-12 md:py-20">
          <div className="max-w-[920px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-6 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {outworldContent.results.title}
            </h2>
            <p
              className={`text-big-description mb-16 ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}
            >
              {outworldContent.results.content}
            </p>

            {/* Testimonial */}
            <blockquote className={`border-l-2 pl-8 ${
              isDarkMode ? 'border-white' : 'border-black'
            }`}>
              <p
                className={`text-medium-title mb-6 ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
              >
                &ldquo;{outworldContent.testimonial.quote}&rdquo;
              </p>
              <cite
                className={`text-small-description not-italic ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                — {outworldContent.testimonial.author}
              </cite>
            </blockquote>
          </div>
        </section>
      </main>
    );
  }

  // Render full case study for Aspire App
  if (slug === 'aspire-app' && caseData.hasFullCase) {
    return (
      <main className="min-h-screen pt-[72px]">
        {/* Hero Section - Wide Container (1420px) - Same as Outworld */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              <div>
                <p
                  className={`text-small-description mb-4 transition-all duration-1000 ease-out ${
                    isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  {caseData.subtitle}
                </p>
                <h1
                  className={`text-big-title mb-6 transition-all duration-1000 delay-100 ease-out ${
                    isDarkMode ? 'text-white' : 'text-black'
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  {caseData.title}
                </h1>
                <p
                  className={`text-big-description mb-8 transition-all duration-1000 delay-200 ease-out ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  {caseData.description}
                </p>

                {/* Project Meta */}
                <div
                  className={`grid grid-cols-2 gap-6 transition-all duration-1000 delay-300 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <div>
                    <p className={`text-small-description mb-1 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                      Client
                    </p>
                    <p className={`text-small-description ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {caseData.client}
                    </p>
                  </div>
                  <div>
                    <p className={`text-small-description mb-1 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                      Year
                    </p>
                    <p className={`text-small-description ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {caseData.year}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className={`text-small-description mb-1 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                      Services
                    </p>
                    <p className={`text-small-description ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {caseData.services.join(' · ')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div
              className={`mt-12 md:mt-16 aspect-[16/9] transition-all duration-1000 delay-400 ease-out ${
                isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className={`w-full h-full flex items-center justify-center ${
                isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
              }`}>
                <span className="text-small-description">Hero Image — App Overview</span>
              </div>
            </div>
          </div>
        </section>

        {/* The 21-Day Philosophy - Full width statement */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
              <div className="lg:col-span-4">
                <h2
                  className={`text-medium-title ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  The Science of 21 Days
                </h2>
              </div>
              <div className="lg:col-span-8">
                <p
                  className={`text-big-description mb-6 ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  {aspireContent.intro.description}
                </p>
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  {aspireContent.challenge.content}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* App Showcase - 3 Phone Screens */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              <div
                className={`aspect-[9/16] ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Onboarding Flow</span>
                </div>
              </div>
              <div
                className={`aspect-[9/16] ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Challenge Dashboard</span>
                </div>
              </div>
              <div
                className={`aspect-[9/16] ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Daily Check-in</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Solution - Text + Image side by side */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div>
                <h2
                  className={`text-medium-title mb-6 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  {aspireContent.approach.title}
                </h2>
                <p
                  className={`text-big-description mb-6 ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  {aspireContent.approach.content}
                </p>
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  {aspireContent.challenge.content2}
                </p>
              </div>
              <div
                className={`aspect-square ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Design Process</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deliverables - Horizontal Cards */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-12 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              What We Built
            </h2>
            <div className="space-y-6">
              {aspireContent.deliverables.map((item, index) => (
                <div
                  key={index}
                  className={`p-8 border ${
                    isDarkMode ? 'border-neutral-700' : 'border-neutral-200'
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-1">
                      <span className={`text-small-description ${
                        isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
                      }`}>
                        0{index + 1}
                      </span>
                    </div>
                    <div className="md:col-span-3">
                      <h3
                        className={`text-card-title ${
                          isDarkMode ? 'text-white' : 'text-black'
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <div className="md:col-span-8">
                      <p
                        className={`text-big-description ${
                          isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand & Iconography - Visual Grid */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-8 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              Visual Identity
            </h2>
            {/* Asymmetric grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div
                className={`md:col-span-2 aspect-[16/9] ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Logo & Wordmark</span>
                </div>
              </div>
              <div
                className={`aspect-[4/3] md:aspect-auto ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Icon System</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['Color 1', 'Color 2', 'Color 3', 'Color 4'].map((label, i) => (
                <div
                  key={i}
                  className={`aspect-square ${
                    isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                  }`}
                >
                  <div className={`w-full h-full flex items-center justify-center ${
                    isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                  }`}>
                    <span className="text-small-description">{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features - Two Column Layout */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
              <div>
                <h2
                  className={`text-medium-title mb-8 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  Core Features
                </h2>
                <div className="space-y-6">
                  {aspireContent.features.list.slice(0, 3).map((feature, index) => (
                    <div key={index}>
                      <h3
                        className={`text-card-title mb-2 ${
                          isDarkMode ? 'text-white' : 'text-black'
                        }`}
                      >
                        {feature.name}
                      </h3>
                      <p
                        className={`text-small-description ${
                          isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                        }`}
                      >
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div
                  className={`aspect-[4/5] mb-8 ${
                    isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                  }`}
                >
                  <div className={`w-full h-full flex items-center justify-center ${
                    isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                  }`}>
                    <span className="text-small-description">Feature Highlight</span>
                  </div>
                </div>
                <div className="space-y-6">
                  {aspireContent.features.list.slice(3).map((feature, index) => (
                    <div key={index}>
                      <h3
                        className={`text-card-title mb-2 ${
                          isDarkMode ? 'text-white' : 'text-black'
                        }`}
                      >
                        {feature.name}
                      </h3>
                      <p
                        className={`text-small-description ${
                          isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                        }`}
                      >
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* More App Screens */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div
                className={`aspect-[4/3] ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">21-Day Progress Grid</span>
                </div>
              </div>
              <div
                className={`aspect-[4/3] ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Completion Celebration</span>
                </div>
              </div>
            </div>
            <div
              className={`aspect-[21/9] ${
                isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
              }`}
            >
              <div className={`w-full h-full flex items-center justify-center ${
                isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
              }`}>
                <span className="text-small-description">Landing Page — Desktop View</span>
              </div>
            </div>
          </div>
        </section>

        {/* Results & Testimonial */}
        <section className="py-12 md:py-20">
          <div className="max-w-[920px] mx-auto px-6 text-center">
            <h2
              className={`text-medium-title mb-6 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {aspireContent.results.title}
            </h2>
            <p
              className={`text-big-description mb-16 ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}
            >
              {aspireContent.results.content}
            </p>

            {/* Testimonial - Centered */}
            <blockquote>
              <p
                className={`text-medium-title mb-6 ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
              >
                &ldquo;{aspireContent.testimonial.quote}&rdquo;
              </p>
              <cite
                className={`text-small-description not-italic ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                — {aspireContent.testimonial.author}
              </cite>
            </blockquote>
          </div>
        </section>
      </main>
    );
  }

  // Render full case study for Shinkai
  if (slug === 'shinkai-branding' && caseData.hasFullCase) {
    return (
      <main className="min-h-screen pt-[72px]">
        {/* Hero Section - Wide Container (1420px) - Same intro pattern */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              <div>
                <p
                  className={`text-small-description mb-4 transition-all duration-1000 ease-out ${
                    isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  {caseData.subtitle}
                </p>
                <h1
                  className={`text-big-title mb-6 transition-all duration-1000 delay-100 ease-out ${
                    isDarkMode ? 'text-white' : 'text-black'
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  {caseData.title}
                </h1>
                <p
                  className={`text-big-description mb-8 transition-all duration-1000 delay-200 ease-out ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  {caseData.description}
                </p>

                {/* Project Meta */}
                <div
                  className={`grid grid-cols-2 gap-6 transition-all duration-1000 delay-300 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <div>
                    <p className={`text-small-description mb-1 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                      Client
                    </p>
                    <p className={`text-small-description ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {caseData.client}
                    </p>
                  </div>
                  <div>
                    <p className={`text-small-description mb-1 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                      Year
                    </p>
                    <p className={`text-small-description ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {caseData.year}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className={`text-small-description mb-1 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                      Services
                    </p>
                    <p className={`text-small-description ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {caseData.services.join(' · ')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div
              className={`mt-12 md:mt-16 aspect-[16/9] transition-all duration-1000 delay-400 ease-out ${
                isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className={`w-full h-full flex items-center justify-center ${
                isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
              }`}>
                <span className="text-small-description">Hero Image — Brand Overview</span>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Statement - Full Width */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-medium-title max-w-4xl ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {shinkaiContent.intro.description}
            </h2>
          </div>
        </section>

        {/* The Challenge - Text + Image */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div>
                <h2
                  className={`text-medium-title mb-6 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  {shinkaiContent.challenge.title}
                </h2>
                <p
                  className={`text-big-description mb-4 ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  {shinkaiContent.challenge.content}
                </p>
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  {shinkaiContent.challenge.content2}
                </p>
              </div>
              <div
                className={`aspect-[4/3] ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Brand Discovery</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Pillars - Three Columns */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-12 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              Brand Pillars
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {shinkaiContent.brandPillars.map((pillar, index) => (
                <div
                  key={index}
                  className={`p-8 border ${
                    isDarkMode ? 'border-neutral-700 bg-neutral-800/30' : 'border-neutral-200 bg-neutral-50'
                  }`}
                >
                  <span className={`text-small-description mb-4 block ${
                    isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
                  }`}>
                    0{index + 1}
                  </span>
                  <h3
                    className={`text-card-title mb-3 ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    className={`text-small-description ${
                      isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                    }`}
                  >
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Logo Showcase - Full Width Image */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div
              className={`aspect-[21/9] ${
                isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
              }`}
            >
              <div className={`w-full h-full flex items-center justify-center ${
                isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
              }`}>
                <span className="text-small-description">Logo & Wordmark System</span>
              </div>
            </div>
          </div>
        </section>

        {/* Visual System - Grid Layout */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-12 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {shinkaiContent.visualSystem.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {shinkaiContent.visualSystem.elements.map((element, index) => (
                <div key={index}>
                  <div
                    className={`aspect-[16/10] mb-6 ${
                      isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                    }`}
                  >
                    <div className={`w-full h-full flex items-center justify-center ${
                      isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                    }`}>
                      <span className="text-small-description">{element.name}</span>
                    </div>
                  </div>
                  <h3
                    className={`text-card-title mb-2 ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    {element.name}
                  </h3>
                  <p
                    className={`text-small-description ${
                      isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                    }`}
                  >
                    {element.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deliverables - Narrow Container with Left Border */}
        <section className="py-12 md:py-20">
          <div className="max-w-[920px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-12 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              What We Delivered
            </h2>
            <div className="space-y-10">
              {shinkaiContent.deliverables.map((item, index) => (
                <div
                  key={index}
                  className={`pl-8 border-l-2 ${
                    isDarkMode ? 'border-white/20' : 'border-black/20'
                  }`}
                >
                  <h3
                    className={`text-card-title mb-3 ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-big-description ${
                      isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Guidelines Images */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div
                className={`aspect-[4/3] ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Component Library</span>
                </div>
              </div>
              <div
                className={`aspect-[4/3] ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Agent UI Patterns</span>
                </div>
              </div>
              <div
                className={`aspect-[4/3] ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Dark Mode System</span>
                </div>
              </div>
            </div>
            <div
              className={`aspect-[21/9] ${
                isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
              }`}
            >
              <div className={`w-full h-full flex items-center justify-center ${
                isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
              }`}>
                <span className="text-small-description">Product Interface Guidelines</span>
              </div>
            </div>
          </div>
        </section>

        {/* Product Guidelines Sections */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-12 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {shinkaiContent.guidelines.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
              {shinkaiContent.guidelines.sections.map((section, index) => (
                <div key={index}>
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-small-description ${
                      isDarkMode ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-100 text-neutral-500'
                    }`}>
                      {index + 1}
                    </div>
                    <h3
                      className={`text-card-title ${
                        isDarkMode ? 'text-white' : 'text-black'
                      }`}
                    >
                      {section.name}
                    </h3>
                  </div>
                  <p
                    className={`text-big-description pl-12 ${
                      isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                    }`}
                  >
                    {section.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Applications */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-8 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              Brand in Action
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              {['Business Card', 'Social Media', 'Documentation', 'Merchandise'].map((label, i) => (
                <div
                  key={i}
                  className={`aspect-square ${
                    isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                  }`}
                >
                  <div className={`w-full h-full flex items-center justify-center ${
                    isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                  }`}>
                    <span className="text-small-description">{label}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className={`aspect-[16/10] ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Desktop App Interface</span>
                </div>
              </div>
              <div
                className={`aspect-[16/10] ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Web Application Interface</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results & Testimonial */}
        <section className="py-12 md:py-20">
          <div className="max-w-[920px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-6 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {shinkaiContent.results.title}
            </h2>
            <p
              className={`text-big-description mb-16 ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}
            >
              {shinkaiContent.results.content}
            </p>

            {/* Testimonial - With left border like Outworld */}
            <blockquote className={`border-l-2 pl-8 ${
              isDarkMode ? 'border-white' : 'border-black'
            }`}>
              <p
                className={`text-medium-title mb-6 ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
              >
                &ldquo;{shinkaiContent.testimonial.quote}&rdquo;
              </p>
              <cite
                className={`text-small-description not-italic ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                — {shinkaiContent.testimonial.author}
              </cite>
            </blockquote>
          </div>
        </section>
      </main>
    );
  }

  // Render full case study for Zuma
  if (slug === 'zuma' && caseData.hasFullCase) {
    return (
      <main className="min-h-screen pt-[72px]">
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              <div>
                <p
                  className={`text-small-description mb-4 transition-all duration-1000 ease-out ${
                    isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  {caseData.subtitle}
                </p>
                <h1
                  className={`text-big-title mb-6 transition-all duration-1000 delay-100 ease-out ${
                    isDarkMode ? 'text-white' : 'text-black'
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  {caseData.title}
                </h1>
                <p
                  className={`text-big-description mb-8 transition-all duration-1000 delay-200 ease-out ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  {caseData.description}
                </p>

                {/* Project Meta */}
                <div
                  className={`grid grid-cols-2 gap-6 transition-all duration-1000 delay-300 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <div>
                    <p className={`text-small-description mb-1 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                      Client
                    </p>
                    <p className={`text-small-description ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {caseData.client}
                    </p>
                  </div>
                  <div>
                    <p className={`text-small-description mb-1 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                      Year
                    </p>
                    <p className={`text-small-description ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {caseData.year}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className={`text-small-description mb-1 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                      Services
                    </p>
                    <p className={`text-small-description ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {caseData.services.join(' · ')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div
              className={`mt-12 md:mt-16 aspect-[16/9] transition-all duration-1000 delay-400 ease-out ${
                isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className={`w-full h-full flex items-center justify-center ${
                isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
              }`}>
                <span className="text-small-description">Hero Image — Dashboard Overview</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {zumaContent.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p
                    className={`text-big-title mb-2 ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    {stat.number}
                  </p>
                  <p
                    className={`text-small-description ${
                      isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                    }`}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-medium-title max-w-4xl ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {zumaContent.intro.headline}
            </h2>
            <p
              className={`text-big-description max-w-3xl mt-6 ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}
            >
              {zumaContent.intro.description}
            </p>
          </div>
        </section>

        {/* The Challenge */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div>
                <h2
                  className={`text-medium-title mb-6 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  {zumaContent.challenge.title}
                </h2>
                <p
                  className={`text-big-description mb-4 ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  {zumaContent.challenge.content}
                </p>
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  {zumaContent.challenge.content2}
                </p>
              </div>
              <div
                className={`aspect-[4/3] ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">The Debt Cycle Visualization</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-12 md:py-20">
          <div className="max-w-[920px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-6 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {zumaContent.approach.title}
            </h2>
            <p
              className={`text-big-description ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}
            >
              {zumaContent.approach.content}
            </p>
          </div>
        </section>

        {/* Product Screenshots */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div
                className={`aspect-[16/10] ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Bucket Overview</span>
                </div>
              </div>
              <div
                className={`aspect-[16/10] ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Goal Progress</span>
                </div>
              </div>
            </div>
            <div
              className={`aspect-[21/9] ${
                isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
              }`}
            >
              <div className={`w-full h-full flex items-center justify-center ${
                isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
              }`}>
                <span className="text-small-description">Full Dashboard View</span>
              </div>
            </div>
          </div>
        </section>

        {/* Deliverables */}
        <section className="py-12 md:py-20">
          <div className="max-w-[920px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-12 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              What We Delivered
            </h2>
            <div className="space-y-10">
              {zumaContent.deliverables.map((item, index) => (
                <div
                  key={index}
                  className={`pl-8 border-l-2 ${
                    isDarkMode ? 'border-white/20' : 'border-black/20'
                  }`}
                >
                  <h3
                    className={`text-card-title mb-3 ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-big-description ${
                      isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-12 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {zumaContent.features.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {zumaContent.features.list.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 border ${
                    isDarkMode ? 'border-neutral-700 bg-neutral-800/30' : 'border-neutral-200 bg-neutral-50'
                  }`}
                >
                  <h3
                    className={`text-card-title mb-3 ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    {feature.name}
                  </h3>
                  <p
                    className={`text-small-description ${
                      isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-12 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {zumaContent.process.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
              {zumaContent.process.phases.map((phase, index) => (
                <div key={index}>
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-small-description ${
                      isDarkMode ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-100 text-neutral-500'
                    }`}>
                      {index + 1}
                    </div>
                    <h3
                      className={`text-card-title ${
                        isDarkMode ? 'text-white' : 'text-black'
                      }`}
                    >
                      {phase.name}
                    </h3>
                  </div>
                  <p
                    className={`text-big-description pl-12 ${
                      isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                    }`}
                  >
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* More Screenshots */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Create Bucket Flow', 'Allocation Rules', 'Progress Tracking'].map((label, i) => (
                <div
                  key={i}
                  className={`aspect-[4/3] ${
                    isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                  }`}
                >
                  <div className={`w-full h-full flex items-center justify-center ${
                    isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                  }`}>
                    <span className="text-small-description">{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-6 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {zumaContent.philosophy.title}
            </h2>
            <p
              className={`text-big-description max-w-3xl mb-12 ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}
            >
              {zumaContent.philosophy.content}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {zumaContent.philosophy.principles.map((principle, index) => (
                <div
                  key={index}
                  className={`p-8 border ${
                    isDarkMode ? 'border-neutral-700 bg-neutral-800/30' : 'border-neutral-200 bg-neutral-50'
                  }`}
                >
                  <span className={`text-small-description mb-4 block ${
                    isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
                  }`}>
                    0{index + 1}
                  </span>
                  <h3
                    className={`text-card-title mb-3 ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    {principle.title}
                  </h3>
                  <p
                    className={`text-small-description ${
                      isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                    }`}
                  >
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results & Testimonial */}
        <section className="py-12 md:py-20">
          <div className="max-w-[920px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-6 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {zumaContent.results.title}
            </h2>
            <p
              className={`text-big-description mb-16 ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}
            >
              {zumaContent.results.content}
            </p>

            {/* Testimonial */}
            <blockquote className={`border-l-2 pl-8 ${
              isDarkMode ? 'border-white' : 'border-black'
            }`}>
              <p
                className={`text-medium-title mb-6 ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
              >
                &ldquo;{zumaContent.testimonial.quote}&rdquo;
              </p>
              <cite
                className={`text-small-description not-italic ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                — {zumaContent.testimonial.author}
              </cite>
            </blockquote>
          </div>
        </section>
      </main>
    );
  }

  // Render full case study for Cinco
  if (slug === 'cinco' && caseData.hasFullCase) {
    return (
      <main className="min-h-screen pt-[72px]">
        {/* Hero Section - Wide Container (1420px) */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="max-w-3xl">
              <p
                className={`text-small-description mb-4 transition-all duration-700 ${
                  isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                {caseData.subtitle}
              </p>
              <h1
                className={`text-big-title mb-4 md:mb-6 transition-all duration-700 delay-100 ${
                  isDarkMode ? 'text-white' : 'text-neutral-800'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                {caseData.title}
              </h1>
              <p
                className={`text-big-description mb-8 transition-all duration-700 delay-200 ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                {caseData.description}
              </p>
              <div
                className={`grid grid-cols-2 gap-6 transition-all duration-700 delay-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <div>
                  <p className={`text-small-description mb-1 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                    Year
                  </p>
                  <p className={`text-small-description ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {caseData.year}
                  </p>
                </div>
                <div>
                  <p className={`text-small-description mb-1 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                    Services
                  </p>
                  <p className={`text-small-description ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {caseData.services.join(' · ')}
                  </p>
                </div>
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div
              className={`mt-12 md:mt-16 aspect-[16/9] rounded-2xl transition-all duration-1000 delay-400 ease-out ${
                isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className={`w-full h-full flex items-center justify-center ${
                isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
              }`}>
                <span className="text-small-description">Hero Image — Cinco Platform Overview</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {cincoContent.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className={`text-huge-title mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {stat.number}
                  </p>
                  <p className={`text-small-description ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-medium-title max-w-4xl ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {cincoContent.intro.description}
            </h2>
          </div>
        </section>

        {/* Challenge Section - Wide Container (Text left, Image right) */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div>
                <h2
                  className={`text-medium-title mb-6 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  {cincoContent.challenge.title}
                </h2>
                <p
                  className={`text-big-description mb-4 ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  {cincoContent.challenge.content}
                </p>
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  {cincoContent.challenge.content2}
                </p>
              </div>
              {/* Image Placeholder */}
              <div
                className={`aspect-[4/3] rounded-2xl ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Hotel Operations Pain Points</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Approach Section - Wide Container (Image left, Text right) */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Image Placeholder - Now on the left */}
              <div
                className={`aspect-[4/3] rounded-2xl order-2 lg:order-1 ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Ecosystem Architecture Diagram</span>
                </div>
              </div>
              {/* Text - Now on the right */}
              <div className="order-1 lg:order-2">
                <h2
                  className={`text-medium-title mb-6 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  {cincoContent.approach.title}
                </h2>
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  {cincoContent.approach.content}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ecosystem Section - Wide Container */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-big-title mb-12 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {cincoContent.ecosystem.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cincoContent.ecosystem.products.map((product, index) => {
                const mockupLabels = [
                  'Manager Dashboard — Room Status View',
                  'Staff App — Task List Screen',
                  'Guest Portal — Service Request'
                ];
                return (
                  <div key={index}>
                    {/* Product Mockup Placeholder */}
                    <div
                      className={`aspect-[3/4] rounded-2xl mb-6 ${
                        isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                      }`}
                    >
                      <div className={`w-full h-full flex items-center justify-center ${
                        isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                      }`}>
                        <span className="text-small-description text-center px-4">{mockupLabels[index]}</span>
                      </div>
                    </div>
                    <p
                      className={`text-small-description mb-2 ${
                        isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
                      }`}
                    >
                      {product.platform}
                    </p>
                    <h3
                      className={`text-medium-title mb-4 ${
                        isDarkMode ? 'text-white' : 'text-black'
                      }`}
                    >
                      {product.name}
                    </h3>
                    <p
                      className={`text-small-description ${
                        isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                      }`}
                    >
                      {product.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Full Width Dashboard Mockup */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div
              className={`aspect-[16/9] rounded-2xl ${
                isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
              }`}
            >
              <div className={`w-full h-full flex items-center justify-center ${
                isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
              }`}>
                <span className="text-small-description">Manager Dashboard — Full Interface Overview</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Wide Container */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-big-title mb-12 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {cincoContent.features.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cincoContent.features.list.map((feature, index) => (
                <div key={index}>
                  <h3
                    className={`text-card-title mb-3 ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    {feature.name}
                  </h3>
                  <p
                    className={`text-small-description ${
                      isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Detail Mockups - Two Column */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div
                className={`aspect-[4/3] rounded-2xl ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Real-Time Room Status Grid</span>
                </div>
              </div>
              <div
                className={`aspect-[4/3] rounded-2xl ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Staff Performance Analytics</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section - Narrow Container */}
        <section className="py-12 md:py-20">
          <div className="max-w-[920px] mx-auto px-6">
            <h2
              className={`text-big-title mb-12 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {cincoContent.process.title}
            </h2>
            {cincoContent.process.phases.map((phase, index) => (
              <div key={index} className="mb-12 last:mb-0">
                <div className="flex items-start gap-6">
                  <span
                    className={`text-small-description ${
                      isDarkMode ? 'text-neutral-600' : 'text-neutral-300'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3
                      className={`text-medium-title mb-3 ${
                        isDarkMode ? 'text-white' : 'text-black'
                      }`}
                    >
                      {phase.name}
                    </h3>
                    <p
                      className={`text-big-description ${
                        isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                      }`}
                    >
                      {phase.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Staff App Mockups - Mobile Screens */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-8 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              Staff App Experience
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {['Task Dashboard', 'Shift Clock-In', 'Incident Report', 'Room Status Update'].map((label, index) => (
                <div
                  key={index}
                  className={`aspect-[9/16] rounded-2xl ${
                    isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                  }`}
                >
                  <div className={`w-full h-full flex items-center justify-center ${
                    isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                  }`}>
                    <span className="text-small-description text-center px-2">{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Five-Star Philosophy Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-[920px] mx-auto px-6">
            <h2
              className={`text-big-title mb-6 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {cincoContent.philosophy.title}
            </h2>
            <p
              className={`text-big-description mb-12 ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}
            >
              {cincoContent.philosophy.content}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cincoContent.philosophy.principles.map((principle, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl border ${
                    isDarkMode ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'
                  }`}
                >
                  <h3
                    className={`text-card-title mb-3 ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    {principle.title}
                  </h3>
                  <p
                    className={`text-small-description ${
                      isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                    }`}
                  >
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Guest Portal Mockups */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-8 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              Guest Portal
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div
                className={`aspect-[4/3] rounded-2xl ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Room Service Request Flow</span>
                </div>
              </div>
              <div
                className={`aspect-[4/3] rounded-2xl ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Hotel Information & Amenities</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bilingual Support Visual */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div
              className={`aspect-[21/9] rounded-2xl ${
                isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
              }`}
            >
              <div className={`w-full h-full flex items-center justify-center ${
                isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
              }`}>
                <span className="text-small-description">Bilingual Interface — English & Spanish</span>
              </div>
            </div>
          </div>
        </section>

        {/* Results & Testimonial */}
        <section className="py-12 md:py-20">
          <div className="max-w-[920px] mx-auto px-6">
            <h2
              className={`text-big-title mb-6 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {cincoContent.results.title}
            </h2>
            <p
              className={`text-big-description mb-16 ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}
            >
              {cincoContent.results.content}
            </p>

            {/* Testimonial */}
            <blockquote className={`border-l-2 pl-8 ${
              isDarkMode ? 'border-white' : 'border-black'
            }`}>
              <p
                className={`text-medium-title mb-6 ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
              >
                &ldquo;{cincoContent.testimonial.quote}&rdquo;
              </p>
              <cite
                className={`text-small-description not-italic ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                — {cincoContent.testimonial.author}
              </cite>
            </blockquote>
          </div>
        </section>
      </main>
    );
  }

  // Render full case study for Quizland
  if (slug === 'quizland-app' && caseData.hasFullCase) {
    return (
      <main className="min-h-screen pt-[72px]">
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="max-w-3xl">
              <p
                className={`text-small-description mb-4 transition-all duration-700 ${
                  isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                {caseData.subtitle}
              </p>
              <h1
                className={`text-big-title mb-4 md:mb-6 transition-all duration-700 delay-100 ${
                  isDarkMode ? 'text-white' : 'text-neutral-800'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                {caseData.title}
              </h1>
              <p
                className={`text-big-description mb-8 transition-all duration-700 delay-200 ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                {caseData.description}
              </p>
              <div
                className={`grid grid-cols-2 gap-6 transition-all duration-700 delay-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <div>
                  <p className={`text-small-description mb-1 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                    Year
                  </p>
                  <p className={`text-small-description ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {caseData.year}
                  </p>
                </div>
                <div>
                  <p className={`text-small-description mb-1 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                    Services
                  </p>
                  <p className={`text-small-description ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {caseData.services.join(' · ')}
                  </p>
                </div>
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div
              className={`mt-12 md:mt-16 aspect-[16/9] rounded-2xl transition-all duration-1000 delay-400 ease-out ${
                isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className={`w-full h-full flex items-center justify-center ${
                isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
              }`}>
                <span className="text-small-description">Hero Image — Quizland App Overview</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {quizlandContent.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className={`text-huge-title mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {stat.number}
                  </p>
                  <p className={`text-small-description ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-medium-title max-w-4xl ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {quizlandContent.intro.description}
            </h2>
          </div>
        </section>

        {/* Challenge Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div>
                <h2
                  className={`text-medium-title mb-6 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  {quizlandContent.challenge.title}
                </h2>
                <p
                  className={`text-big-description mb-4 ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  {quizlandContent.challenge.content}
                </p>
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  {quizlandContent.challenge.content2}
                </p>
              </div>
              {/* Image Placeholder */}
              <div
                className={`aspect-[4/3] rounded-2xl ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Traditional Learning Apps Comparison</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Approach Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Image Placeholder */}
              <div
                className={`aspect-[4/3] rounded-2xl order-2 lg:order-1 ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">OpenAI Integration Flow</span>
                </div>
              </div>
              {/* Text */}
              <div className="order-1 lg:order-2">
                <h2
                  className={`text-medium-title mb-6 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  {quizlandContent.approach.title}
                </h2>
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  {quizlandContent.approach.content}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* App Screens - Mobile Mockups */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-8 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              The App Experience
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {['Topic Input', 'Quiz Generation', 'Question Screen', 'Results & Feedback'].map((label, index) => (
                <div
                  key={index}
                  className={`aspect-[9/16] rounded-2xl ${
                    isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                  }`}
                >
                  <div className={`w-full h-full flex items-center justify-center ${
                    isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                  }`}>
                    <span className="text-small-description text-center px-2">{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deliverables Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-12 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              What We Delivered
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {quizlandContent.deliverables.map((item, index) => (
                <div key={index}>
                  <h3
                    className={`text-card-title mb-3 ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-small-description ${
                      isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Full Width App Mockup */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div
              className={`aspect-[16/9] rounded-2xl ${
                isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
              }`}
            >
              <div className={`w-full h-full flex items-center justify-center ${
                isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
              }`}>
                <span className="text-small-description">Quiz Interface — Full Screen Experience</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-big-title mb-12 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {quizlandContent.features.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {quizlandContent.features.list.map((feature, index) => (
                <div key={index}>
                  <h3
                    className={`text-card-title mb-3 ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    {feature.name}
                  </h3>
                  <p
                    className={`text-small-description ${
                      isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Detail Mockups */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div
                className={`aspect-[4/3] rounded-2xl ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Difficulty Selection</span>
                </div>
              </div>
              <div
                className={`aspect-[4/3] rounded-2xl ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Topic Discovery</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-[920px] mx-auto px-6">
            <h2
              className={`text-big-title mb-12 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {quizlandContent.process.title}
            </h2>
            {quizlandContent.process.phases.map((phase, index) => (
              <div key={index} className="mb-12 last:mb-0">
                <div className="flex items-start gap-6">
                  <span
                    className={`text-small-description ${
                      isDarkMode ? 'text-neutral-600' : 'text-neutral-300'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3
                      className={`text-medium-title mb-3 ${
                        isDarkMode ? 'text-white' : 'text-black'
                      }`}
                    >
                      {phase.name}
                    </h3>
                    <p
                      className={`text-big-description ${
                        isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                      }`}
                    >
                      {phase.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Landing Page Mockup */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-8 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              Landing Page
            </h2>
            <div
              className={`aspect-[16/10] rounded-2xl ${
                isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
              }`}
            >
              <div className={`w-full h-full flex items-center justify-center ${
                isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
              }`}>
                <span className="text-small-description">quizland.app — Marketing Website</span>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-[920px] mx-auto px-6">
            <h2
              className={`text-big-title mb-6 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {quizlandContent.philosophy.title}
            </h2>
            <p
              className={`text-big-description mb-12 ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}
            >
              {quizlandContent.philosophy.content}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quizlandContent.philosophy.principles.map((principle, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl border ${
                    isDarkMode ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'
                  }`}
                >
                  <h3
                    className={`text-card-title mb-3 ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    {principle.title}
                  </h3>
                  <p
                    className={`text-small-description ${
                      isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                    }`}
                  >
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results & Testimonial */}
        <section className="py-12 md:py-20">
          <div className="max-w-[920px] mx-auto px-6">
            <h2
              className={`text-big-title mb-6 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {quizlandContent.results.title}
            </h2>
            <p
              className={`text-big-description mb-16 ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}
            >
              {quizlandContent.results.content}
            </p>

            {/* Testimonial */}
            <blockquote className={`border-l-2 pl-8 ${
              isDarkMode ? 'border-white' : 'border-black'
            }`}>
              <p
                className={`text-medium-title mb-6 ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
              >
                &ldquo;{quizlandContent.testimonial.quote}&rdquo;
              </p>
              <cite
                className={`text-small-description not-italic ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                — {quizlandContent.testimonial.author}
              </cite>
            </blockquote>
          </div>
        </section>
      </main>
    );
  }

  // Default case study view for other projects
  return (
    <main className="min-h-screen pt-[72px]">
      <section className="py-12 md:py-20">
        <div className="max-w-[1420px] mx-auto px-6">
          <div className="max-w-3xl">
            <p
              className={`text-small-description mb-4 ${
                isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
              }`}
            >
              {caseData.subtitle}
            </p>
            <h1 className={`text-big-title mb-4 md:mb-6 ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
              {caseData.title}
            </h1>
            <p className={`text-big-description mb-8 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              {caseData.description}
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className={`text-small-description mb-1 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                  Year
                </p>
                <p className={`text-small-description ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {caseData.year}
                </p>
              </div>
              <div>
                <p className={`text-small-description mb-1 ${isDarkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                  Services
                </p>
                <p className={`text-small-description ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {caseData.services.join(' · ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="max-w-[920px] mx-auto px-6">
          <p className={`text-big-description text-center ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Full case study coming soon.
          </p>
        </div>
      </section>
    </main>
  );
}
