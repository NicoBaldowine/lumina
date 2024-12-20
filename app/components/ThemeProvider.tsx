'use client';

import { createContext, useState, ReactNode } from 'react';

export const ThemeContext = createContext({
  isDarkMode: true,
  toggleTheme: () => {},
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div 
        className={`${isDarkMode ? 'dark' : 'light'} transition-colors duration-300`}
        style={{ 
          backgroundColor: isDarkMode ? '#070606' : '#ffffff',
          color: isDarkMode ? '#ffffff' : '#070606'
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
} 