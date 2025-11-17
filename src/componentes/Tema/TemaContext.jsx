import React, { createContext, useContext, useState, useEffect } from 'react';

const TemaContext = createContext();

export const useTheme = () => {
  const context = useContext(TemaContext);
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  return context;
};

export const TemaProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Verificar preferencia guardada o del sistema
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const setTheme = (theme) => {
    setIsDarkMode(theme === 'dark');
  };

  useEffect(() => {
    // Guardar preferencia
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Aplicar clase al body
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const value = {
    isDarkMode,
    toggleTheme,
    setTheme
  };

  return (
    <TemaContext.Provider value={value}>
      {children}
    </TemaContext.Provider>
  );
};