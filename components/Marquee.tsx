'use client'

import { useEffect, useRef, useState } from "react";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
}

export default function Marquee({ children, speed = 30000 }: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const marqueeElement = marqueeRef.current;
    if (!marqueeElement) return;

    const marqueeContent = marqueeElement.firstElementChild as HTMLElement;
    if (!marqueeContent) return;

    const marqueeWidth = marqueeContent.offsetWidth;
    const cloneContent = () => {
      const clone = marqueeContent.cloneNode(true) as HTMLElement;
      marqueeElement.appendChild(clone);
    };

    for (let i = 0; i < 3; i++) {
      cloneContent();
    }

    let animationId: number;
    let startTime: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % speed) / speed;

      if (!isHovered) {
        marqueeElement.scrollLeft = progress * marqueeWidth;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isHovered, speed]);

  return (
    <div
      className="overflow-hidden relative rounded-md whitespace-nowrap bg-transparent"
      ref={marqueeRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="inline-block">{children}</div>
    </div>
  );
}