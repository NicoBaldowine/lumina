'use client';

import { useContext, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { ThemeContext } from '../../components/ThemeProvider';
import ImageWithLoader from '../../components/ui/ImageWithLoader';

interface CaseStudy {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  headerImage: string;
  year: string;
  services: string[];
  client: string;
  hasFullCase: boolean;
}

const casesData: Record<string, CaseStudy> = {
  'the-outworld-app': {
    title: 'Bringing Families Closer to Adventure',
    subtitle: 'Outworld',
    description: 'A web app that connects parents with fun activities for kids. Using location-based filtering, it helps families discover exciting options to keep their calendars full of memorable experiences.',
    imageUrl: '/project1.png',
    headerImage: '/cases/Outworld1.png',
    year: '2024',
    services: ['Branding', 'Product Design', 'Mobile Development', 'Web Design'],
    client: 'Outworld',
    hasFullCase: true
  },
  'aspire-app': {
    title: 'Building Better Habits, One Day at a Time',
    subtitle: 'Aspire',
    description: 'A motivational app that helps users build positive habits or break negative ones through structured 21-day challenges. Psychology-backed methodology meets vibrant design to make self-improvement feel achievable.',
    imageUrl: '/project2.png',
    headerImage: '/cases/Aspire1.png',
    year: '2024',
    services: ['Branding', 'Product Design', 'Landing Page'],
    client: 'Aspire',
    hasFullCase: true
  },
  'shinkai-branding': {
    title: 'AI on Your Terms',
    subtitle: 'Shinkai',
    description: 'Brand identity and product guidelines for a decentralized AI platform. Shinkai enables users to build, run, and monetize autonomous AI agents while maintaining complete control over their data, identity, and payments.',
    imageUrl: '/project3.png',
    headerImage: '/cases/Shinkai1.png',
    year: '2024',
    services: ['Branding', 'Product Guidelines'],
    client: 'Shinkai',
    hasFullCase: true
  },
  'zuma': {
    title: 'Save Smarter, Live Better',
    subtitle: 'Zuma',
    description: 'A fintech web app helping young adults take control of their finances. By connecting to bank accounts through Plaid, Zuma enables unlimited savings buckets, turning one account into a powerful system for achieving financial goals.',
    imageUrl: '/project4.png',
    headerImage: '/cases/Zuma1.png',
    year: '2024',
    services: ['Product Design', 'Web Application'],
    client: 'Zuma',
    hasFullCase: true
  },
  'cinco': {
    title: 'The Staff Operations Platform for Modern Hotels',
    subtitle: 'Cinco',
    description: 'A complete hotel operations ecosystem: a dashboard for managers, a mobile app for staff, and a guest portal. All components work together to transform service quality and earn five-star reviews.',
    imageUrl: '/project5.png',
    headerImage: '/cases/Cinco1.png',
    year: '2024',
    services: ['Branding', 'Product Design', 'Web Application', 'Mobile App'],
    client: 'Cinco',
    hasFullCase: true
  },
  'quizland-app': {
    title: 'Learn Anything, Quiz Everything',
    subtitle: 'Quizland App',
    description: 'An AI-powered mobile app that generates custom quizzes on any topic. From history to pop culture to complex sciences, users simply type a topic and get personalized learning experiences instantly.',
    imageUrl: '/project6.png',
    headerImage: '/cases/Quizland1.png',
    year: '2024',
    services: ['Product Design', 'Mobile Development', 'Landing Page'],
    client: 'Quizland',
    hasFullCase: true
  },
  'yester-ai': {
    title: 'An AI-powered way to explore the past',
    subtitle: 'Yester.ai',
    description: 'Travel year by year from today all the way back to year 0. Explore key moments in history, art, science, sports, and more, across regions and countries around the world. A fast, visual, and educational journey through the past.',
    imageUrl: '/project7.png',
    headerImage: '/cases/Yester1.png',
    year: '2024',
    services: ['Product Design', 'Mobile App', 'Landing Page'],
    client: 'Yester.ai',
    hasFullCase: true
  },
  'versus': {
    title: 'Your Next Pickleball Match, One Tap Away',
    subtitle: 'Versus',
    description: 'A mobile app connecting pickleball players based on location and skill level. Create or join matches, find nearby players, and never miss a game. Like Tinder for pickleball: swipe, match, play.',
    imageUrl: '/project8.png',
    headerImage: '/cases/Versus1.png',
    year: '2024',
    services: ['Product Design', 'Mobile App', 'Landing Page'],
    client: 'Versus',
    hasFullCase: true
  }
};

// Full case study content for The Outworld
const outworldContent = {
  intro: {
    headline: 'Every weekend shouldn\'t feel like a research project',
    description: '73% of parents spend over 2 hours per week searching for family activities. 68% give up and repeat the same outings. The Outworld reduces activity discovery time by 85%, helping families reclaim their weekends and discover 3x more new experiences.'
  },
  challenge: {
    title: 'The Challenge',
    content: 'The founders had validated the problem through extensive user research: parents were frustrated with fragmented information about family activities.',
    content2: 'Some relied on Facebook groups, others on outdated websites, and many just gave up and stayed home. The challenge was threefold: create a brand that resonates with modern parents, design an intuitive mobile experience, and build a scalable technical foundation.'
  },
  approach: {
    title: 'The Approach',
    content: 'The process started with the people who would use it. Through interviews with parents across different demographics, the goal was to understand their mental models, frustrations, and desires. Parents didn\'t just want a list of activities; they wanted curated experiences that matched their family\'s unique needs.'
  },
  deliverables: [
    {
      title: 'Brand Identity',
      description: 'A brand that speaks to the adventurous spirit within every family. The name "Outworld" evokes exploration and discovery, while the visual identity balances playfulness with sophistication, appealing to parents who want quality experiences for their children.'
    },
    {
      title: 'Mobile Application',
      description: 'The core product is a React Native application that puts discovery at the forefront. Users can browse activities by location, filter by type (indoor, outdoor, educational, recreational), price range (free to premium), and age appropriateness. The geolocation feature surfaces nearby options in real-time.'
    },
    {
      title: 'Landing Page',
      description: 'A marketing website that communicates the value proposition clearly and drives app downloads. The landing page showcases key features, testimonials, and provides a seamless path to the app stores.'
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
        description: 'Deep immersion in the problem space. User interviews, competitor analysis, and market research helped understand not just what to build, but why it would matter. User personas, user journeys, and success metrics were defined.'
      },
      {
        name: 'Brand Development',
        description: 'The brand needed to feel trustworthy yet exciting. Multiple directions were explored before landing on a visual system that combines warm, inviting colors with clean typography. The logo symbolizes the connection between families and the world of experiences waiting for them.'
      },
      {
        name: 'Product Design',
        description: 'The app was designed with a mobile-first mindset. Every interaction was optimized for one-handed use, because parents often have their hands full. The information architecture prioritized quick discovery, with filters and search always accessible. Extensive prototyping and user testing at every stage.'
      },
      {
        name: 'Development',
        description: 'The development approach emphasized clean architecture and maintainability. The design system was implemented as reusable components, CI/CD pipelines set up for rapid deployment, and comprehensive analytics built to understand user behavior post-launch.'
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
        description: 'Find activities nearby or explore options in areas you\'re planning to visit.'
      },
      {
        name: 'Curated Content',
        description: 'Every activity is vetted and enriched with helpful details: what to expect, tips for visiting, and honest reviews from other parents.'
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
    quote: 'The team didn\'t just build an app. They helped realize the vision. Their attention to detail and understanding of users made all the difference.',
    author: 'Founder, The Outworld'
  }
};

// Full case study content for Shinkai
const shinkaiContent = {
  intro: {
    headline: 'AI should work for you, not the other way around',
    description: 'In a world where AI tools demand your data in exchange for intelligence, Shinkai takes a different approach. The identity embodies this philosophy: powerful AI that respects your privacy, autonomy, and ownership.'
  },
  challenge: {
    title: 'The Challenge',
    content: 'Shinkai is building something fundamentally different: a decentralized AI platform where users maintain control over their data, identity, and payments. The technology is groundbreaking: interconnected AI agents, local model execution, and blockchain-based micropayments.',
    content2: 'The challenge was translating this technical complexity into a brand that feels approachable yet sophisticated. How to visually represent decentralization? Privacy? Agent autonomy? The solution needed to communicate trust and innovation in equal measure.'
  },
  approach: {
    title: 'The Approach',
    content: 'The process started by understanding the core philosophy: AI on your terms. This became the north star. Every design decision was filtered through this lens: does it feel like the user is in control? Does it communicate empowerment over dependency? The result is a brand that feels both cutting-edge and human-centered.'
  },
  brandPillars: [
    {
      title: 'Privacy by Design',
      description: 'Your data stays local. Contained, self-sufficient design elements suggest security without feeling restrictive.'
    },
    {
      title: 'Decentralized Power',
      description: 'No single point of control. The visual system uses distributed, modular components that reflect the decentralized architecture of the platform.'
    },
    {
      title: 'Agent Autonomy',
      description: 'AI that works independently. A visual language for autonomous agents: distinct personalities that operate within a cohesive system.'
    }
  ],
  deliverables: [
    {
      title: 'Brand Strategy',
      description: 'A comprehensive brand strategy rooted in the concept of "AI liberation," freeing users from the data-for-service model that dominates the industry. This positioning differentiates Shinkai in a crowded AI market.'
    },
    {
      title: 'Visual Identity',
      description: 'A complete visual system including logo, color palette, typography, and iconography. The identity balances technical sophistication with accessibility, using geometric forms that suggest both precision and openness.'
    },
    {
      title: 'Product Guidelines',
      description: 'Detailed guidelines for applying the brand across digital products, from the desktop app to web interfaces. This includes component styling, interaction patterns, and voice guidelines for AI agent personas.'
    }
  ],
  visualSystem: {
    title: 'Visual System',
    elements: [
      {
        name: 'Logo',
        description: 'The Shinkai mark represents interconnected intelligence: nodes working in harmony while maintaining individual autonomy. It scales from favicon to billboard without losing meaning.'
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
        description: 'A custom icon set designed for AI concepts: agents, nodes, connections, privacy shields. Each icon works at multiple sizes and maintains clarity even at small scales.'
      }
    ]
  },
  guidelines: {
    title: 'Product Guidelines',
    sections: [
      {
        name: 'Interface Principles',
        description: 'Core principles for all Shinkai interfaces: clarity over cleverness, progressive disclosure of complexity, and consistent visual feedback for AI operations.'
      },
      {
        name: 'Agent Visualization',
        description: 'Guidelines for how autonomous agents appear and behave in the interface: their visual presence, status indicators, and interaction patterns.'
      },
      {
        name: 'Dark Mode First',
        description: 'Given the technical audience and extended usage patterns, dark mode was designed as the primary experience with light mode as an accessible alternative.'
      },
      {
        name: 'Voice & Tone',
        description: 'Guidelines for how Shinkai communicates: technical but not jargon-heavy, confident but not arrogant, helpful without being patronizing.'
      }
    ]
  },
  results: {
    title: 'The Impact',
    content: 'The new brand identity has given Shinkai a distinct presence in the AI space. The visual system successfully communicates the platform\'s unique value proposition: powerful AI that respects user autonomy. The product guidelines ensure consistency as the platform grows, while allowing flexibility for future features.'
  },
  testimonial: {
    quote: 'The brand needed to communicate something radical: that AI can be powerful AND private. This identity makes that vision tangible.',
    author: 'Founder, Shinkai'
  }
};

// Full case study content for Aspire App
const aspireContent = {
  intro: {
    headline: 'It takes 21 days to form a habit, but most people quit by day 3',
    description: '92% of New Year\'s resolutions fail. The average person attempts the same habit change 7 times before succeeding. Aspire users complete 21-day challenges at a 67% rate, 4x the industry average, by turning habit formation into a visual, rewarding journey.'
  },
  challenge: {
    title: 'The Challenge',
    content: 'Research showed that habit-building apps had a fundamental problem: they treated all habits the same way and relied on willpower alone. Users would start strong but lose motivation when progress felt invisible.',
    content2: 'The product needed to understand the psychology of behavior change: that 21 days is the scientifically-backed threshold for habit formation, and that visual progress is essential for motivation. The challenge was creating something that felt personal, not generic.'
  },
  approach: {
    title: 'The Approach',
    content: 'Deep immersion in behavioral psychology research and interviews with people who had both succeeded and failed at building habits. The insight was clear: people don\'t just need tracking, they need transformation to feel tangible. Every element was designed to make the 21-day journey feel like an adventure, not a chore.'
  },
  deliverables: [
    {
      title: 'Brand Identity',
      description: 'A brand that embodies aspiration and achievement. The vibrant iconography system uses color psychology to evoke energy and positivity, while the name "Aspire" speaks to the universal human desire for self-improvement.'
    },
    {
      title: 'Mobile Application',
      description: 'The app features curated 21-day challenges across categories, from fitness and mindfulness to productivity and creativity. Each day presents a specific task, with visual progress indicators and motivational content to keep users engaged through the critical early days.'
    },
    {
      title: 'Landing Page',
      description: 'A conversion-focused landing page that communicates the science behind 21-day habit formation and showcases the app\'s unique visual approach. The page drives app downloads while building trust in the methodology.'
    }
  ],
  process: {
    title: 'The Process',
    phases: [
      {
        name: 'Research & Psychology',
        description: 'Deep dive into habit formation science, studying the work of researchers on neuroplasticity and behavior change. User interviews with people who had successfully built lasting habits and those who had struggled, identifying the key differences in their approaches.'
      },
      {
        name: 'Brand Strategy',
        description: 'The brand needed to feel aspirational yet achievable. A visual system centered on vibrant, energetic colors that evolve as users progress. Each challenge category has its own color identity, making the experience feel personal and organized.'
      },
      {
        name: 'Product Design',
        description: 'The app was designed around daily micro-interactions that build momentum. Each day\'s task is revealed fresh, creating anticipation. Visual progress, like filling in a 21-day grid, provides the tangible sense of achievement that keeps users coming back.'
      },
      {
        name: 'Launch Strategy',
        description: 'A landing page optimized for conversion, with clear messaging about the 21-day methodology and social proof from beta users. The launch strategy focused on the new year resolution crowd, capitalizing on peak motivation periods.'
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
        description: 'From meditation and exercise to reading and digital detox, users can choose challenges that align with their personal growth goals.'
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
    quote: 'This wasn\'t just building an app. It was building a system for personal transformation. The design makes every day feel like an achievement.',
    author: 'Founder, Aspire'
  }
};

// Full case study content for Zuma
const zumaContent = {
  intro: {
    headline: 'Credit card debt is the silent killer of financial dreams',
    description: 'The average American under 35 carries $3,700 in credit card debt. 45% of Gen Z has already accumulated credit card debt before age 25. Zuma users save 3x more than traditional banking users by making every dollar intentional: no debt, no overdrafts, just progress toward real goals.'
  },
  challenge: {
    title: 'The Challenge',
    content: 'Young adults are entering the financial world with a dangerous default: credit cards. Banks push credit as the answer to everything, from coffee to emergencies, creating a cycle of debt that can take decades to escape. The average credit card APR is now over 20%, turning small purchases into long-term burdens.',
    content2: 'Zuma\'s founders saw a different path. What if instead of borrowing against your future, you could allocate your present? The product needed to make intentional saving as easy as swiping a credit card, and more rewarding than the instant gratification of debt.'
  },
  approach: {
    title: 'The Approach',
    content: 'The challenge was approached by understanding the psychology of young savers. Through user research, it became clear that the problem wasn\'t motivation: young people want to save. The problem was visibility. Traditional bank accounts show one number. That number hides everything: rent money, emergency funds, vacation savings, and spending money all look the same. Zuma makes the invisible visible.'
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
      description: 'The core product vision: your bank account, but organized. Zuma connects via Plaid to mirror your existing checking or savings account, then lets you create unlimited "buckets," virtual allocations that give every dollar a purpose without moving money between accounts.'
    },
    {
      title: 'Web Application Design',
      description: 'A responsive web app that makes bucket management intuitive. Users can create buckets for any goal, from "New iPhone" to "Emergency Fund" to "House Down Payment," set targets, and watch their progress in real-time. The interface prioritizes clarity and motivation.'
    },
    {
      title: 'Banking Integration',
      description: 'Through Plaid integration, Zuma securely connects to users\' existing bank accounts. The app acts as a smart mirror: it doesn\'t hold money, it organizes it. This approach removes friction (no new accounts needed) while providing powerful visibility.'
    }
  ],
  features: {
    title: 'Key Features',
    list: [
      {
        name: 'Unlimited Buckets',
        description: 'Create as many savings buckets as needed, from short-term goals like concert tickets to long-term dreams like a house down payment.'
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
        description: 'Interviews with young adults about their relationship with money. The patterns were clear: they felt out of control, overwhelmed by complexity, and pressured into credit. They wanted simplicity and progress they could see.'
      },
      {
        name: 'Product Architecture',
        description: 'The bucket system was designed to be infinitely flexible. Whether someone wants 3 buckets or 30, the interface scales elegantly. The most common actions were prioritized: checking progress, adding money, and creating new goals.'
      },
      {
        name: 'Visual Design',
        description: 'The interface uses color-coding and progress visualization to make abstract numbers feel concrete. Each bucket has its own personality, making saving feel like collecting achievements rather than restricting spending.'
      },
      {
        name: 'Technical Integration',
        description: 'The Plaid integration flow was designed to be trustworthy and transparent. Users understand exactly what Zuma can and can\'t do with their bank connection, building confidence in the security model.'
      }
    ]
  },
  philosophy: {
    title: 'The Anti-Credit Philosophy',
    content: 'Zuma exists because debt shouldn\'t be the default. Every purchase made on credit is a bet against your future self. Every purchase made with savings is an investment in your present peace of mind. Zuma makes the second choice as easy as the first.',
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
        description: 'The goal isn\'t financial sophistication, it\'s financial freedom. Own your purchases. Own your goals. Own your future.'
      }
    ]
  },
  results: {
    title: 'The Impact',
    content: 'Zuma launched as a tool for financial clarity in a world of financial confusion. Early users report feeling "in control of money for the first time" and "actually excited to check their savings." The bucket system has proven especially powerful for goal-oriented saving, with users achieving purchase goals 3x faster than with traditional savings accounts.'
  },
  testimonial: {
    quote: 'This wasn\'t just designing an app. It was designing a new relationship with money. The product feels like it understands how young people actually think about finances.',
    author: 'Founder, Zuma'
  }
};

// Full case study content for Cinco
const cincoContent = {
  intro: {
    headline: 'Five-star service starts behind the scenes',
    description: 'Hotels live and die by their reviews. Yet 68% of negative hotel reviews mention service issues: slow housekeeping, unresponsive staff, maintenance delays. Cinco helps hotels coordinate their entire staff operation in real-time, turning operational chaos into the seamless service guests remember.'
  },
  challenge: {
    title: 'The Challenge',
    content: 'The hospitality industry runs on paper clipboards, walkie-talkies, and WhatsApp groups. Managers don\'t know which rooms are ready. Staff don\'t know their priorities. Guests wait too long for everything. In Latin America and Spain, where tourism is a massive industry, hotels are competing for the same guests but operating like it\'s 1995.',
    content2: 'Cinco\'s founders saw an opportunity to modernize hotel operations from the inside out. They needed three products that work as one: a command center for managers, a task system for staff, and a service portal for guests. The name "Cinco" comes from the Spanish word for five, as in five-star service.'
  },
  approach: {
    title: 'The Approach',
    content: 'This was an ecosystem design challenge. Each user type (manager, staff, guest) has different needs, contexts, and devices. But they all share one goal: excellent service delivered efficiently. Three products were designed to feel like one unified system, with real-time synchronization and clear role-based experiences.'
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
        description: 'The command center for hotel operations. Managers see real-time room status, track housekeeping progress, monitor check-in/check-out timing, manage tickets and incidents, and analyze staff performance. Everything needed to run the hotel, in one view.'
      },
      {
        name: 'Staff App',
        platform: 'React Native Mobile',
        description: 'The daily companion for hotel staff. Housekeepers, maintenance, and front desk employees see their assigned tasks, clock in and out of shifts, report incidents, and update task status in real-time. Priorities are clear. Nothing falls through the cracks.'
      },
      {
        name: 'Guest Portal',
        platform: 'Web Application',
        description: 'The modern hotel experience for guests. Request room service, set do-not-disturb status, order amenities, and access hotel information, all from their phone. No more waiting on hold or walking to the front desk.'
      }
    ]
  },
  features: {
    title: 'Key Features',
    list: [
      {
        name: 'Real-Time Room Status',
        description: 'See every room\'s status at a glance: occupied, vacant, being cleaned, ready for check-in, or maintenance needed.'
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
        description: 'Time spent in hotels: watching operations, interviewing managers, shadowing housekeeping staff, and understanding guest pain points. The gap between how hotels think they operate and how they actually operate was eye-opening.'
      },
      {
        name: 'Ecosystem Architecture',
        description: 'Every interaction between managers, staff, and guests was mapped. The key insight: information flows in all directions, but each role needs it presented differently. A unified data model with role-specific interfaces.'
      },
      {
        name: 'Multi-Platform Design',
        description: 'The manager dashboard needed to handle complexity on desktop. The staff app needed to be fast and one-handed on mobile. The guest portal needed to be intuitive without any learning curve. Three products, one design language.'
      },
      {
        name: 'Bilingual Implementation',
        description: 'With Latin America and Spain as primary markets, the entire ecosystem was designed for English and Spanish from day one. Not just translated, but culturally adapted for hospitality contexts in both languages.'
      }
    ]
  },
  philosophy: {
    title: 'The Five-Star Philosophy',
    content: 'Great hotel service isn\'t about grand gestures, it\'s about consistency. The room is ready on time. The request is handled quickly. The problem is fixed before it escalates. Cinco makes the invisible work of hospitality visible, measurable, and manageable.',
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
    quote: 'This wasn\'t just building software. It was redesigning how hotels operate. Three products that work as one, and pilot hotels are already seeing the results in their reviews.',
    author: 'Founder, Cinco'
  }
};

// Full case study content for Quizland
const quizlandContent = {
  intro: {
    headline: 'What if you could learn about literally anything?',
    description: 'Traditional learning apps force you into their curriculum. Quizland flips the script: you choose the topic, AI creates the quiz, and you learn exactly what you want to know. From ancient history to modern memes, no subject is off-limits.'
  },
  challenge: {
    title: 'The Challenge',
    content: 'Education apps are everywhere, but they all share the same limitation: pre-made content. Users are stuck learning what the app decides is important. For curious minds who want to explore niche topics or test themselves on specific subjects, existing solutions fall short.',
    content2: 'Quizland\'s founder wanted to build something different: an app where the user\'s curiosity drives the experience. The challenge was making AI-generated content feel polished, educational, and fun, while keeping the interface simple enough that anyone could use it instantly.'
  },
  approach: {
    title: 'The Approach',
    content: 'Quizland was designed with one principle: get out of the user\'s way. The core interaction is beautifully simple: type a topic, tap generate, start quizzing. Behind that simplicity, a robust system leverages OpenAI\'s API to create intelligent, contextual questions that actually teach while they test.'
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
      description: 'Deep integration with OpenAI\'s API to generate contextually relevant questions. Prompts engineered to produce consistent, educational content across difficulty levels, from beginner-friendly to expert-challenging.'
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
        description: 'Type any topic you can imagine: history, science, pop culture, sports, niche hobbies. Get a custom quiz in seconds.'
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
        description: 'Save generated quizzes to play offline. Perfect for commutes, flights, or anywhere without connection.'
      }
    ]
  },
  process: {
    title: 'The Process',
    phases: [
      {
        name: 'Product Strategy',
        description: 'The user journey from curiosity to knowledge was mapped. The key insight: the moment between "I wonder about X" and "let me learn about X" needs to be frictionless. Every design decision optimized for that moment.'
      },
      {
        name: 'AI Engineering',
        description: 'Significant time was spent crafting prompts that generate high-quality educational content. The AI needed to understand context, calibrate difficulty, and create questions that test understanding, not just memory.'
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
        description: 'Active recall (testing yourself) is proven to be more effective than passive reading. Quizland makes testing fun.'
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
    quote: 'This wasn\'t just a quiz app. It was a tool for infinite curiosity. The result feels magical.',
    author: 'Founder, Quizland'
  }
};

// Full case study content for Yester.ai
const yesteraiContent = {
  intro: {
    headline: 'History at your fingertips',
    description: 'What happened in 1969? Who was the greatest artist of the Renaissance? What scientific breakthroughs occurred in your grandmother\'s birth year? Yester.ai transforms these questions into an immersive journey through time, powered by AI and designed for curious minds.'
  },
  challenge: {
    title: 'The Challenge',
    content: 'History education is often dry, disconnected, and hard to navigate. Traditional resources either overwhelm with academic depth or oversimplify to the point of uselessness. People want to explore the past on their own terms, by year, by topic, by region, but no tool existed that made this both possible and enjoyable.',
    content2: 'Yester.ai\'s founder envisioned an app where anyone could travel through time, exploring historical events with the same ease as scrolling through a social feed. The challenge was making vast amounts of historical data accessible, accurate, and genuinely engaging.'
  },
  approach: {
    title: 'The Approach',
    content: 'Yester.ai was designed as a time machine for the curious. The interface centers around a simple but powerful concept: pick a year, choose a category, select a region, and dive in. AI generates contextual, well-researched content that brings each era to life, while the clean design keeps the focus on discovery.'
  },
  stats: [
    {
      number: '2024',
      label: 'Years of history covered'
    },
    {
      number: '6',
      label: 'Content categories'
    },
    {
      number: '195',
      label: 'Countries and regions'
    },
    {
      number: '<2s',
      label: 'Content generation time'
    }
  ],
  categories: {
    title: 'Explore Every Dimension of the Past',
    list: [
      {
        name: 'History',
        description: 'Wars, treaties, revolutions, and the events that shaped nations. From ancient civilizations to modern conflicts.'
      },
      {
        name: 'Art',
        description: 'Masterpieces, movements, and the artists who defined their eras. Renaissance to contemporary, painting to sculpture.'
      },
      {
        name: 'Science',
        description: 'Discoveries, inventions, and the brilliant minds behind them. The breakthroughs that changed how humanity understands the world.'
      },
      {
        name: 'Sports',
        description: 'Champions, records, and unforgettable moments. The athletic achievements that captivated generations.'
      },
      {
        name: 'Politics',
        description: 'Leaders, elections, and policy shifts. The political landscape of every era, every region.'
      },
      {
        name: 'Culture',
        description: 'Music, literature, fashion, and social movements. How people lived, what they valued, what defined their time.'
      }
    ]
  },
  deliverables: [
    {
      title: 'Mobile Application',
      description: 'A native iOS app designed for exploration and discovery. The timeline-based interface makes navigating thousands of years intuitive, while the card-based content layout makes complex history digestible and engaging.'
    },
    {
      title: 'AI Integration',
      description: 'Deep integration with AI to generate historically accurate, well-contextualized content on demand. The system understands the intersection of time, place, and category to deliver relevant, interesting facts.'
    },
    {
      title: 'Landing Page',
      description: 'A marketing website that captures the magic of time travel. The elegant design and clear messaging communicate the app\'s unique value proposition and drive downloads.'
    }
  ],
  features: {
    title: 'Key Features',
    list: [
      {
        name: 'Year Navigator',
        description: 'Scroll through time from 2024 all the way back to year 0. Jump to any year instantly or explore decade by decade.'
      },
      {
        name: 'Category Filters',
        description: 'Focus on what interests you: history, art, science, sports, politics, or culture. Mix and match to find surprising connections.'
      },
      {
        name: 'Regional Focus',
        description: 'Explore events from specific countries or regions. See how world events played out differently across the globe.'
      },
      {
        name: 'AI-Generated Content',
        description: 'Every fact, every story, generated in real-time by AI trained on historical data. Always fresh, always accurate.'
      },
      {
        name: 'Save & Share',
        description: 'Bookmark fascinating discoveries and share them with friends. Build your own collection of historical highlights.'
      },
      {
        name: 'Beautiful Design',
        description: 'An elegant, minimalist interface that lets history speak for itself. Clean typography and thoughtful spacing.'
      }
    ]
  },
  process: {
    title: 'The Process',
    phases: [
      {
        name: 'Research & Discovery',
        description: 'Studying how people naturally explore history: by date, by topic, by connection. The timeline concept emerged as the most intuitive navigation model, mimicking how time is mentally organized.'
      },
      {
        name: 'Information Architecture',
        description: 'Organizing 2000+ years of world history across multiple categories required careful planning. A flexible system that scales infinitely while remaining navigable and coherent.'
      },
      {
        name: 'AI Engineering',
        description: 'Developing prompts and systems that generate historically accurate content while maintaining engaging, readable prose. The AI needed to be both scholarly and accessible.'
      },
      {
        name: 'Visual Design',
        description: 'The clean, black-and-white aesthetic pays homage to historical documents while feeling thoroughly modern. Typography-forward design puts content first.'
      }
    ]
  },
  philosophy: {
    title: 'The Discovery Philosophy',
    content: 'Yester.ai believes that understanding the past enriches the present. History isn\'t just names and dates, it\'s the story of humanity\'s journey. Making that story accessible and explorable helps people connect with the world\'s shared heritage.',
    principles: [
      {
        title: 'Curiosity-Driven Exploration',
        description: 'Follow your interests wherever they lead. There\'s no curriculum, no tests, just pure discovery at your own pace.'
      },
      {
        title: 'Context Over Isolation',
        description: 'Events don\'t happen in a vacuum. Yester.ai helps you see connections between art, politics, science, and culture within any era.'
      },
      {
        title: 'Accuracy Matters',
        description: 'History deserves respect. The AI is trained to deliver factually accurate content, not speculation or myth.'
      }
    ]
  },
  results: {
    title: 'The Impact',
    content: 'Yester.ai launched to enthusiastic reception from history enthusiasts, students, and curious minds alike. Users love the freedom to explore any era and the serendipitous discoveries that come from browsing through time. Teachers have found it valuable for sparking student interest in historical topics.'
  },
  testimonial: {
    quote: 'An app that makes history feel alive and accessible. The vision of democratizing historical knowledge became an experience that\'s both educational and genuinely delightful to use.',
    author: 'Founder, Yester.ai'
  }
};

// Full case study content for Versus
const versusContent = {
  intro: {
    headline: 'Pickleball is booming. Finding players shouldn\'t be hard.',
    description: 'Pickleball is the fastest-growing sport in America: 36.5 million players and counting. Yet most games still happen through group texts, Facebook posts, and hoping someone shows up at the courts. Versus changes that. One app. Endless matches.'
  },
  challenge: {
    title: 'The Challenge',
    content: 'Pickleball has exploded from a niche backyard game to a mainstream phenomenon. In 2023, participation grew 223% over three years, with courts popping up in parks, gyms, and community centers across the country. But the infrastructure for connecting players hasn\'t kept pace.',
    content2: 'Players face a fragmented landscape: some rely on local Facebook groups, others use outdated reservation systems, and many simply show up at courts hoping to find a match. For newcomers, finding players at their skill level, or any players at all, feels impossible. Versus saw an opportunity to bring the matchmaking revolution to the courts.'
  },
  approach: {
    title: 'The Approach',
    content: 'Versus was designed as "Tinder for pickleball," but better. The core experience is simple: create or join a match, specify your skill level, and let the app handle the rest. Behind that simplicity, a sophisticated matching algorithm considers location, skill rating, play style preferences, and availability to create the best possible games.'
  },
  stats: [
    {
      number: '36.5M',
      label: 'Pickleball players in the US'
    },
    {
      number: '223%',
      label: 'Growth in 3 years'
    },
    {
      number: '<5mi',
      label: 'Average match distance'
    },
    {
      number: '4.0+',
      label: 'Skill levels supported'
    }
  ],
  matchTypes: {
    title: 'Every Type of Game, One App',
    list: [
      {
        name: 'Singles',
        description: 'One-on-one matches for players who want focused, competitive play. Perfect for improving your game.'
      },
      {
        name: 'Doubles',
        description: 'The classic pickleball format. Find a partner or join a team looking for their fourth player.'
      },
      {
        name: 'Open Play',
        description: 'Casual sessions at local courts. Drop in, rotate, and play with whoever shows up.'
      },
      {
        name: 'Competitive',
        description: 'Ranked matches for serious players. Track your rating and climb the leaderboard.'
      }
    ]
  },
  deliverables: [
    {
      title: 'Mobile Application',
      description: 'A native iOS and Android app designed for quick interactions. Players can create a match in under 30 seconds, browse nearby games while commuting, and confirm attendance with a single tap.'
    },
    {
      title: 'Matching Algorithm',
      description: 'A proprietary matching system that considers skill level (using a standardized rating system), geographic proximity, preferred play times, and historical match quality to suggest the best possible games.'
    },
    {
      title: 'Landing Page',
      description: 'A marketing website that captures the energy of pickleball culture while clearly communicating the app\'s value proposition. Optimized for app store downloads.'
    }
  ],
  features: {
    title: 'Key Features',
    list: [
      {
        name: 'Geolocation Matching',
        description: 'Find players and courts near you. See who\'s looking for a game within walking distance or plan ahead for courts across town.'
      },
      {
        name: 'Skill-Based Pairing',
        description: 'Rate yourself honestly and get matched with players at your level. From beginners (2.0) to tournament players (5.0+).'
      },
      {
        name: 'Match Creation',
        description: 'Set up a game in seconds. Choose the court, time, format (singles/doubles), and skill range. The app handles invitations.'
      },
      {
        name: 'Player Profiles',
        description: 'Build your pickleball identity. Track matches played, win rate, preferred positions, and connect with regular partners.'
      },
      {
        name: 'Court Directory',
        description: 'Discover new courts in your area. See availability, read reviews, and check if players are looking for games there.'
      },
      {
        name: 'Push Notifications',
        description: 'Get notified when matches open up near you, when players join your games, or when your regular partners are looking to play.'
      }
    ]
  },
  process: {
    title: 'The Process',
    phases: [
      {
        name: 'Player Research',
        description: 'Time spent at courts talking to players of all levels. The insight: skill mismatch is the biggest friction. Games are either too easy or too hard. The rating system became central to the design.'
      },
      {
        name: 'Matchmaking Design',
        description: 'Studying dating apps, gaming matchmaking systems, and sports league software. The best experiences minimize decision fatigue while maximizing match quality. These principles were applied to court sports.'
      },
      {
        name: 'Mobile-First UX',
        description: 'Every interaction was optimized for one-handed use at the courts. Large tap targets, minimal typing, and quick actions. Players should spend time playing, not navigating menus.'
      },
      {
        name: 'Community Building',
        description: 'Beyond individual matches, features were designed to help local pickleball communities grow. Regular play groups, court ambassadors, and social features that turn strangers into regular partners.'
      }
    ]
  },
  philosophy: {
    title: 'The Versus Philosophy',
    content: 'Great games happen when players are evenly matched, courts are convenient, and showing up is easy. Versus removes every barrier between "I want to play" and "I\'m on the court." Not just an app, but a way to grow the sport.',
    principles: [
      {
        title: 'Skill Matters',
        description: 'Honest ratings make better games. Accurate self-assessment and match outcomes refine ratings over time.'
      },
      {
        title: 'Location is Everything',
        description: 'The best match in the world means nothing if it\'s an hour away. Proximity is prioritized so players actually show up.'
      },
      {
        title: 'Community First',
        description: 'Pickleball thrives because of its welcoming culture. Versus is designed to maintain that spirit while helping the community grow.'
      }
    ]
  },
  results: {
    title: 'The Impact',
    content: 'Versus launched in select US markets to immediate traction. Players love the simplicity of finding games and the quality of skill-matched play. Courts report higher utilization as players coordinate through the app. Most importantly, stories of strangers becoming regular playing partners: exactly what pickleball is all about.'
  },
  testimonial: {
    quote: 'This wasn\'t just building an app. It was building a community tool. Capturing the spirit of pickleball culture while solving a real problem. The matching system is exactly what the sport needed.',
    author: 'Founder, Versus'
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

            {/* Hero Image */}
            <div
              className={`mt-12 md:mt-16 aspect-[16/9] relative overflow-hidden transition-all duration-1000 delay-400 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <ImageWithLoader
                src="/cases/Outworld1.png"
                alt="Outworld App Overview"
                priority
              />
            </div>
          </div>
        </section>

        {/* Introduction & Challenge Section - Stats left, Challenge right */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              {/* Stats headline - Left */}
              <h2
                className={`text-medium-title ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
              >
                {outworldContent.intro.description}
              </h2>
              {/* Challenge - Right */}
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
              Deliverables
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
            {/* Outworld2 - Full width */}
            <div className="relative aspect-[16/9] mb-3">
              <ImageWithLoader
                src="/cases/Outworld2.png"
                alt="Outworld Brand Identity"
              />
            </div>
            {/* Outworld3 - Full width */}
            <div className="relative aspect-[16/9] mb-3">
              <ImageWithLoader
                src="/cases/Outworld3.png"
                alt="Outworld Brand Elements"
              />
            </div>
            {/* Outworld6_lil and Outworld7_lil - Side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="relative aspect-[4/3]">
                <ImageWithLoader
                src="/cases/Outworld6_lil.png"
                alt="Outworld Brand Detail"
              />
              </div>
              <div className="relative aspect-[4/3]">
                <ImageWithLoader
                src="/cases/Outworld7_lil.png"
                alt="Outworld Brand Detail"
              />
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
            {/* Outworld4 - Full width */}
            <div className="relative aspect-[16/9] mb-3">
              <ImageWithLoader
                src="/cases/Outworld4.png"
                alt="Outworld Product Design"
              />
            </div>
            {/* Outworld5 - Full width */}
            <div className="relative aspect-[16/9]">
              <ImageWithLoader
                src="/cases/Outworld5.png"
                alt="Outworld App Screens"
              />
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

        {/* Public Site Section - Wide Container */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-8 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              Public Site
            </h2>
            {/* Outworld8 */}
            <div className="relative aspect-[16/9] mb-3">
              <ImageWithLoader
                src="/cases/Outworld8.png"
                alt="Outworld Public Site"
              />
            </div>
            {/* Outworld9 */}
            <div className="relative aspect-[16/9] mb-3">
              <ImageWithLoader
                src="/cases/Outworld9.png"
                alt="Outworld Public Site"
              />
            </div>
            {/* Outworld10 */}
            <div className="relative aspect-[16/9]">
              <ImageWithLoader
                src="/cases/Outworld10.png"
                alt="Outworld Public Site"
              />
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
                className={`text-medium-title ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
              >
                &ldquo;{outworldContent.testimonial.quote}&rdquo;
              </p>
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

            {/* Hero Image */}
            <div
              className={`mt-12 md:mt-16 aspect-[16/9] relative overflow-hidden transition-all duration-1000 delay-400 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <ImageWithLoader
                src="/cases/Aspire1.png"
                alt="Aspire App Overview"
                priority
              />
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
              Deliverables
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

            {/* Hero Image */}
            <div
              className={`mt-12 md:mt-16 aspect-[16/9] relative overflow-hidden transition-all duration-1000 delay-400 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <ImageWithLoader
                src="/cases/Shinkai1.png"
                alt="Shinkai Brand Overview"
                priority
              />
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
              Deliverables
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

            {/* Hero Image */}
            <div
              className={`mt-12 md:mt-16 aspect-[16/9] relative overflow-hidden transition-all duration-1000 delay-400 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <ImageWithLoader
                src="/cases/Zuma1.png"
                alt="Zuma Dashboard Overview"
                priority
              />
            </div>
          </div>
        </section>

        {/* Introduction & Challenge Section - Headline left, Challenge right */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              {/* Headline - Left */}
              <h2
                className={`text-medium-title ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
              >
                {zumaContent.intro.headline}
              </h2>
              {/* Challenge - Right */}
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
            </div>
          </div>
        </section>

        {/* Brand Identity Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-8 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              Brand Identity
            </h2>
            {/* Zuma2 and Zuma3 - Side by side small */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div className="relative aspect-[4/3]">
                <ImageWithLoader
                src="/cases/zuma2_lil.png"
                alt="Zuma Brand Identity"
              />
              </div>
              <div className="relative aspect-[4/3]">
                <ImageWithLoader
                src="/cases/zuma3_lil.png"
                alt="Zuma Brand Elements"
              />
              </div>
            </div>
            {/* Zuma4 - Full width */}
            <div className="relative aspect-[16/9] mb-3">
              <ImageWithLoader
                src="/cases/zuma4.png"
                alt="Zuma Brand Design"
              />
            </div>
            {/* Zuma5 - Full width */}
            <div className="relative aspect-[16/9] mb-3">
              <ImageWithLoader
                src="/cases/zuma5.png"
                alt="Zuma Product Design"
              />
            </div>
            {/* Zuma6 and Zuma7 - Side by side, taller */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="relative aspect-[3/4]">
                <ImageWithLoader
                src="/cases/zuma6_lil.png"
                alt="Zuma Detail"
              />
              </div>
              <div className="relative aspect-[3/4]">
                <ImageWithLoader
                src="/cases/zuma7_lil.png"
                alt="Zuma Detail"
              />
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
              Deliverables
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

        {/* Product Design Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-medium-title mb-8 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              Product Design
            </h2>
            {/* Zuma Videos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div className="relative aspect-[1/1]">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/cases/zuma1.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="relative aspect-[1/1]">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/cases/zuma2.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
            {/* Zuma8 and Zuma9 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div className="relative aspect-[4/3]">
                <ImageWithLoader
                src="/cases/zuma8.png"
                alt="Zuma Product Design"
              />
              </div>
              <div className="relative aspect-[4/3]">
                <ImageWithLoader
                src="/cases/zuma9.png"
                alt="Zuma Product Design"
              />
              </div>
            </div>
            {/* Zuma10 and Zuma11 - taller */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div className="relative aspect-[1/1]">
                <ImageWithLoader
                src="/cases/zuma10.png"
                alt="Zuma Product Design"
              />
              </div>
              <div className="relative aspect-[1/1]">
                <ImageWithLoader
                src="/cases/zuma11.png"
                alt="Zuma Product Design"
              />
              </div>
            </div>
            {/* Zuma12 and Zuma13 - taller */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div className="relative aspect-[1/1]">
                <ImageWithLoader
                src="/cases/zuma12.png"
                alt="Zuma Product Design"
              />
              </div>
              <div className="relative aspect-[1/1]">
                <ImageWithLoader
                src="/cases/zuma13.png"
                alt="Zuma Product Design"
              />
              </div>
            </div>
            {/* Zuma14 and Zuma15 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="relative aspect-[1/1]">
                <ImageWithLoader
                src="/cases/zuma14.png"
                alt="Zuma Product Design"
              />
              </div>
              <div className="relative aspect-[1/1]">
                <ImageWithLoader
                src="/cases/zuma15.png"
                alt="Zuma Product Design"
              />
              </div>
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
                className={`text-medium-title ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
              >
                &ldquo;{zumaContent.testimonial.quote}&rdquo;
              </p>
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

            {/* Hero Image */}
            <div
              className={`mt-12 md:mt-16 aspect-[16/9] relative overflow-hidden rounded-2xl transition-all duration-1000 delay-400 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <ImageWithLoader
                src="/cases/Cinco1.png"
                alt="Cinco Platform Overview"
                priority
              />
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
                className={`grid grid-cols-3 gap-6 transition-all duration-700 delay-300 ${
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
                    Client
                  </p>
                  <p className={`text-small-description ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {caseData.client}
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

            {/* Hero Image */}
            <div
              className={`mt-12 md:mt-16 aspect-[16/9] relative overflow-hidden transition-all duration-1000 delay-400 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <ImageWithLoader
                src="/cases/Quizland1.png"
                alt="Quizland App Overview"
                priority
              />
            </div>

            {/* Second Image */}
            <div
              className={`mt-8 aspect-[16/9] relative overflow-hidden transition-all duration-1000 delay-500 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <ImageWithLoader
                src="/cases/Quizland2.png"
                alt="Quizland App Screens"
              />
            </div>
          </div>
        </section>

        {/* Challenge Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              {/* Text - Left */}
              <h2
                className={`text-medium-title ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
              >
                Traditional learning apps force you into their curriculum. Quizland flips the script: you choose the topic, AI creates the quiz, and you learn exactly what you want to know. From ancient history to modern memes, no subject is off-limits.
              </h2>
              {/* Challenge - Right */}
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
            </div>
          </div>
        </section>

        {/* App Screenshots */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            {/* Images */}
            <div className="flex flex-col gap-3">
              {/* Row with 2 images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <ImageWithLoader
                src="/cases/Quizland3_lil.png"
                alt="Quizland App Screen"
              />
                </div>
                <div className="aspect-[4/3] relative overflow-hidden">
                  <ImageWithLoader
                src="/cases/Quizland4_lil.png"
                alt="Quizland App Screen"
              />
                </div>
              </div>
              {/* Quizland 5 */}
              <div className="aspect-[16/9] relative overflow-hidden">
                <ImageWithLoader
                src="/cases/Quizland5.png"
                alt="Quizland App Full Screen"
              />
              </div>
              {/* Quizland 6 */}
              <div className="aspect-[16/9] relative overflow-hidden">
                <ImageWithLoader
                src="/cases/Quizland6.png"
                alt="Quizland Landing Page"
              />
              </div>
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
              Deliverables
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
              className={`aspect-[16/10] ${
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

  // Render full case study for Yester.ai
  if (slug === 'yester-ai' && caseData.hasFullCase) {
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

            {/* Hero Image */}
            <div
              className={`mt-12 md:mt-16 aspect-[16/9] relative overflow-hidden transition-all duration-1000 delay-400 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <ImageWithLoader
                src="/cases/Yester1.png"
                alt="Yester.ai App Overview"
                priority
              />
            </div>
          </div>
        </section>

        {/* Intro & Challenge Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
              {/* Intro */}
              <div>
                <h2
                  className={`text-medium-title ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  What happened in 1969? Who was the greatest artist of the Renaissance? What scientific breakthroughs occurred in your grandmother&apos;s birth year? Yester.ai transforms these questions into an immersive journey through time, powered by AI and designed for curious minds.
                </h2>
              </div>
              {/* Challenge */}
              <div>
                <h2
                  className={`text-medium-title mb-6 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  {yesteraiContent.challenge.title}
                </h2>
                <p
                  className={`text-big-description mb-4 ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  {yesteraiContent.challenge.content}
                </p>
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  {yesteraiContent.challenge.content2}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Deliverables Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-big-title mb-12 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              Deliverables
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3
                  className={`text-card-title mb-3 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  Mobile Application
                </h3>
                <p
                  className={`text-small-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  A native iOS app designed for exploration and discovery. The timeline-based interface makes navigating thousands of years intuitive, while the card-based content layout makes complex history digestible and engaging.
                </p>
              </div>
              <div>
                <h3
                  className={`text-card-title mb-3 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  AI Integration
                </h3>
                <p
                  className={`text-small-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  Deep integration with AI to generate historically accurate, well-contextualized content on demand. The system understands the intersection of time, place, and category to deliver relevant, interesting facts.
                </p>
              </div>
              <div>
                <h3
                  className={`text-card-title mb-3 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  Landing Page
                </h3>
                <p
                  className={`text-small-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  A marketing website that captures the magic of time travel. The elegant design and clear messaging communicate the app&apos;s unique value proposition and drive downloads.
                </p>
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
              {yesteraiContent.features.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {yesteraiContent.features.list.map((feature, index) => (
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

        {/* App Screenshots Section - All images with 12px gap */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="flex flex-col gap-3">
              {/* Two small images side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div className="aspect-square relative overflow-hidden">
                  <ImageWithLoader
                src="/cases/Yester5_lil.png"
                alt="Yester.ai App Icon"
              />
                </div>
                <div className="aspect-square relative overflow-hidden">
                  <ImageWithLoader
                src="/cases/Yester6_lil.png"
                alt="Yester.ai App on iPhone"
              />
                </div>
              </div>
              {/* Full width images */}
              <div className="aspect-[16/9] relative overflow-hidden">
                <ImageWithLoader
                src="/cases/Yester2.png"
                alt="Yester.ai App Screen"
              />
              </div>
              <div className="aspect-[16/9] relative overflow-hidden">
                <ImageWithLoader
                src="/cases/Yester3.png"
                alt="Yester.ai App Screen"
              />
              </div>
              <div className="aspect-[16/9] relative overflow-hidden">
                <ImageWithLoader
                src="/cases/Yester4.png"
                alt="Yester.ai App Screen"
              />
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-big-title mb-12 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {yesteraiContent.categories.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {yesteraiContent.categories.list.map((category, index) => (
                <div key={index}>
                  <h3
                    className={`text-card-title mb-3 ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    {category.name}
                  </h3>
                  <p
                    className={`text-small-description ${
                      isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                    }`}
                  >
                    {category.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Landing Page Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-big-title mb-12 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              Landing Page
            </h2>
            <div className="flex flex-col gap-3">
              <div className="aspect-[16/9] relative overflow-hidden">
                <ImageWithLoader
                src="/cases/Yester7.png"
                alt="Yester.ai Landing Page"
              />
              </div>
              <div className="aspect-[16/9] relative overflow-hidden">
                <ImageWithLoader
                src="/cases/Yester8.png"
                alt="Yester.ai Landing Page"
              />
              </div>
              <div className="aspect-[16/9] relative overflow-hidden">
                <ImageWithLoader
                src="/cases/Yester9.png"
                alt="Yester.ai Landing Page"
              />
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2
              className={`text-big-title mb-12 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {yesteraiContent.process.title}
            </h2>
            {yesteraiContent.process.phases.map((phase, index) => (
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

        {/* Philosophy Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-big-title mb-6 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {yesteraiContent.philosophy.title}
            </h2>
            <p
              className={`text-big-description mb-12 ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}
            >
              {yesteraiContent.philosophy.content}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {yesteraiContent.philosophy.principles.map((principle, index) => (
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

        {/* Results & Testimonial Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2
              className={`text-big-title mb-6 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {yesteraiContent.results.title}
            </h2>
            <p
              className={`text-big-description mb-16 ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}
            >
              {yesteraiContent.results.content}
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
                &ldquo;{yesteraiContent.testimonial.quote}&rdquo;
              </p>
              <cite
                className={`text-small-description not-italic ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                — {yesteraiContent.testimonial.author}
              </cite>
            </blockquote>
          </div>
        </section>
      </main>
    );
  }

  // Render full case study for Versus
  if (slug === 'versus' && caseData.hasFullCase) {
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

            {/* Hero Image */}
            <div
              className={`mt-12 md:mt-16 aspect-[16/9] relative overflow-hidden rounded-2xl transition-all duration-1000 delay-400 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <ImageWithLoader
                src="/cases/Versus1.png"
                alt="Versus App Overview"
                priority
              />
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
              {versusContent.intro.description}
            </h2>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {versusContent.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p
                    className={`text-huge-title mb-2 ${
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
                  {versusContent.challenge.title}
                </h2>
                <p
                  className={`text-big-description mb-4 ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  {versusContent.challenge.content}
                </p>
                <p
                  className={`text-big-description ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  {versusContent.challenge.content2}
                </p>
              </div>
              {/* Image Placeholder */}
              <div
                className={`aspect-[4/3] rounded-2xl overflow-hidden ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Pickleball Growth Chart</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Approach Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2
              className={`text-medium-title mb-6 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {versusContent.approach.title}
            </h2>
            <p
              className={`text-big-description ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}
            >
              {versusContent.approach.content}
            </p>
          </div>
        </section>

        {/* Match Types Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-big-title mb-12 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {versusContent.matchTypes.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {versusContent.matchTypes.list.map((type, index) => (
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
                    {type.name}
                  </h3>
                  <p
                    className={`text-small-description ${
                      isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                    }`}
                  >
                    {type.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Full Width Image */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div
              className={`aspect-[21/9] rounded-2xl overflow-hidden ${
                isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
              }`}
            >
              <div className={`w-full h-full flex items-center justify-center ${
                isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
              }`}>
                <span className="text-small-description">Match Discovery — App Screens</span>
              </div>
            </div>
          </div>
        </section>

        {/* Deliverables Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-big-title mb-12 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              Deliverables
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {versusContent.deliverables.map((item, index) => (
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

        {/* App Screenshots - 3 Column Grid */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`aspect-[9/16] rounded-2xl overflow-hidden ${
                    isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                  }`}
                >
                  <div className={`w-full h-full flex items-center justify-center ${
                    isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                  }`}>
                    <span className="text-small-description">App Screen {num}</span>
                  </div>
                </div>
              ))}
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
              {versusContent.features.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {versusContent.features.list.map((feature, index) => (
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

        {/* Two Column Image Layout */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className={`aspect-[4/3] rounded-2xl overflow-hidden ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Match Creation Flow</span>
                </div>
              </div>
              <div
                className={`aspect-[4/3] rounded-2xl overflow-hidden ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              >
                <div className={`w-full h-full flex items-center justify-center ${
                  isDarkMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  <span className="text-small-description">Player Profile</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2
              className={`text-big-title mb-12 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {versusContent.process.title}
            </h2>
            {versusContent.process.phases.map((phase, index) => (
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

        {/* Philosophy Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <h2
              className={`text-big-title mb-6 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {versusContent.philosophy.title}
            </h2>
            <p
              className={`text-big-description mb-12 ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}
            >
              {versusContent.philosophy.content}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {versusContent.philosophy.principles.map((principle, index) => (
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

        {/* Landing Page Mockup */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1420px] mx-auto px-6">
            <div
              className={`aspect-[16/9] rounded-2xl overflow-hidden ${
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

        {/* Results & Testimonial Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2
              className={`text-big-title mb-6 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {versusContent.results.title}
            </h2>
            <p
              className={`text-big-description mb-16 ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`}
            >
              {versusContent.results.content}
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
                &ldquo;{versusContent.testimonial.quote}&rdquo;
              </p>
              <cite
                className={`text-small-description not-italic ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                — {versusContent.testimonial.author}
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
