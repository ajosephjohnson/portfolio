import { useEffect, useState } from "react";

// Detect system dark mode changes
export default function useDarkMode() {
  const [ isDarkMode, setIsDarkMode ] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsDarkMode(e.matches);
    };
    handleChange(mediaQuery);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isDarkMode;
}