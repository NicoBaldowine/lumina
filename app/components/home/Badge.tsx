'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';

interface BadgeProps {
  label: string;
}

export default function Badge({ label }: BadgeProps) {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <Link
      href="/services"
      onClick={(e) => e.stopPropagation()}
      className={`inline-block px-[6px] py-[4px] rounded-[4px] transition-colors ${
        isDarkMode
          ? 'bg-white/10 text-white hover:bg-white/20'
          : 'bg-black/10 text-black hover:bg-black/20'
      }`}
      style={{
        fontSize: '10px',
        fontFamily: 'var(--font-inter), sans-serif',
        fontWeight: 400,
        letterSpacing: '0.08em',
      }}
    >
      {label}
    </Link>
  );
}
