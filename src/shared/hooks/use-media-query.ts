import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    
    // Support modern browsers
    media.addEventListener("change", listener);
    
    // Check initial match again in case it changed between init and effect
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
