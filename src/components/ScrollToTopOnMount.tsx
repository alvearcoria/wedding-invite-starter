
"use client";

import { useEffect } from "react";

export function ScrollToTopOnMount() {
  useEffect(() => {
    // This scrolls the window to the top (0,0) when the component mounts.
    // It's useful for ensuring the user starts at the top on a page refresh.
    window.scrollTo(0, 0);
  }, []);

  return null; // This component doesn't render anything.
}
