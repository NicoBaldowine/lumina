'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';

interface ActionButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'outline' | 'filled' | 'hero' | 'default';
  isActive?: boolean;
}

export default function ActionButton({
  href,
  children,
  variant = 'default',
  isActive = false
}: ActionButtonProps) {
  const { isDarkMode } = useContext(ThemeContext);

  const getButtonStyles = () => {
    if (isActive) {
      return isDarkMode ? 'bg-white text-[#070606]' : 'bg-black text-white';
    }

    if (variant === 'hero') {
      return 'text-white/70 border border-white/20 hover:bg-white hover:text-[#070606]';
    }

    if (variant === 'filled') {
      return isDarkMode
        ? 'text-white bg-[#333333] hover:bg-[#444444]'
        : 'text-white bg-[#070606] hover:bg-[#333333]';
    }

    // outline/default variant
    return isDarkMode
      ? 'text-neutral-400 border border-white/20 hover:bg-white hover:text-[#070606]'
      : 'text-neutral-500 border border-black/20 hover:bg-black hover:text-white';
  };

  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-full text-small-description transition-all duration-300 ${getButtonStyles()}`}
    >
      {children}
    </Link>
  );
}
