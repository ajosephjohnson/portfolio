import { useEffect, useState } from "react";

// Detect system dark mode changes
export default function usePageVisibility() {
  const [ isPageVisible, setPageVisible ] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setPageVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return isPageVisible;
}