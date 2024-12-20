'use client';

import { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';

export default function HeroBackground() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${
      isDarkMode ? 'bg-[#070606]' : 'bg-white'
    }`}>
      <div className="relative w-full h-full overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full animate-contourFlow"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="contour-gradient" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={isDarkMode ? "#121212" : "#f5f5f5"} />
              <stop offset="50%" stopColor={isDarkMode ? "#1A1A1A" : "#eeeeee"} />
              <stop offset="100%" stopColor={isDarkMode ? "#121212" : "#f5f5f5"} />
            </linearGradient>
            <mask id="contour-mask">
              <rect x="0" y="0" width="1200" height="800" fill="url(#contour-gradient)" />
            </mask>
          </defs>
          <g mask="url(#contour-mask)">
            <path
              d="M0,400 C150,200 350,600 600,400 C850,200 1050,600 1200,400"
              fill="none"
              stroke={isDarkMode ? "#1A1A1A" : "#eeeeee"}
              strokeWidth="1.5"
            />
            <path
              d="M0,450 C150,250 350,650 600,450 C850,250 1050,650 1200,450"
              fill="none"
              stroke={isDarkMode ? "#282828" : "#e5e5e5"}
              strokeWidth="1.5"
            />
            <path
              d="M0,500 C150,300 350,700 600,500 C850,300 1050,700 1200,500"
              fill="none"
              stroke={isDarkMode ? "#333333" : "#dddddd"}
              strokeWidth="1.5"
            />
            <path
              d="M0,550 C150,350 350,750 600,550 C850,350 1050,750 1200,550"
              fill="none"
              stroke={isDarkMode ? "#3D3D3D" : "#d5d5d5"}
              strokeWidth="1.5"
            />
            <path
              d="M0,600 C150,400 350,800 600,600 C850,400 1050,800 1200,600"
              fill="none"
              stroke={isDarkMode ? "#484848" : "#cccccc"}
              strokeWidth="1.5"
            />
          </g>
        </svg>
      </div>
      <style jsx>{`
        @keyframes contourFlow {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }
        .animate-contourFlow {
          animation: contourFlow 8s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
