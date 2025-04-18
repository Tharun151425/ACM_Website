// src/context/ThemeContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';

export const acmColors = {
  midnightIndigo: "#0A1128",
  deepNavyBlue: "#001F54",
  oceanicBlue: "#034078", 
  electricAzure: "#0466C8",
  tealSky: "#1282A2",
  porcelainWhite: "#FEFCFB"
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('acm-theme');
    if (savedTheme) return savedTheme;
    
    // Check system preference as fallback
    return window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    localStorage.setItem('acm-theme', theme);
    
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const colors = {
    background: theme === 'dark' ? acmColors.midnightIndigo : acmColors.porcelainWhite,
    text: theme === 'dark' ? acmColors.porcelainWhite : acmColors.midnightIndigo,
    accent: acmColors.electricAzure,
    secondary: theme === 'dark' ? acmColors.tealSky : acmColors.oceanicBlue,
    card: theme === 'dark' ? acmColors.deepNavyBlue : acmColors.porcelainWhite,
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};