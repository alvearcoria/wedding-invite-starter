"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const weddingDay = new Date(siteConfig.weddingDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDay - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isMounted) {
    return <div className="h-16 w-80 animate-pulse rounded-md bg-muted" />;
  }
  
  const hasEnded = Object.values(timeLeft).every(val => val === 0);

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
       {hasEnded ? (
        <div className="font-headline text-xl">The day is here!</div>
       ) : (
        <>
            <div className="flex flex-col">
                <span className="font-mono text-4xl md:text-5xl">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="text-xs uppercase tracking-widest">Days</span>
            </div>
            <div className="flex flex-col">
                <span className="font-mono text-4xl md:text-5xl">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-xs uppercase tracking-widest">Hours</span>
            </div>
            <div className="flex flex-col">
                <span className="font-mono text-4xl md:text-5xl">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-xs uppercase tracking-widest">Minutes</span>
            </div>
            <div className="flex flex-col">
                <span className="font-mono text-4xl md:text-5xl">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-xs uppercase tracking-widest">Seconds</span>
            </div>
        </>
       )}
    </div>
  );
}
