import { cn } from "@/lib/utils";
import { StockInfo } from "@/types/all";
import { useEffect, useRef, useState } from "react";

const stocks: StockInfo[] = [
  { name: "Beans in beirut", change: 18.0 },
  { name: "Corn in china", change: -2.5 },
  { name: "Wheat in brazil", change: 5.3 },
  { name: "Soybeans in Egypt", change: -1.2 },
  { name: "Rice in Nigeria", change: 3.7 },
];
export default function StockMarquee() {
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

    // Clone the content multiple times to ensure smooth looping
    for (let i = 0; i < 3; i++) {
      cloneContent();
    }

    let animationId: number;
    let startTime: number;
    const animationDuration = 30000; // 30 seconds for one full loop

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % animationDuration) / animationDuration;

      if (!isHovered) {
        marqueeElement.scrollLeft = progress * marqueeWidth;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isHovered]);

  return (
    <div
      className="overflow-hidden rounded-md whitespace-nowrap bg-white space-x-4"
      ref={marqueeRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="inline-block">
        {stocks.map((stock, index) => (
          <div
            key={index}
            className="inline-block px-6 py-2 text-center cursor-pointer opacity-100 hover:opacity-60"
          >
            <div className="font-semibold text-sm text-[#1a2b4c]">
              {stock.name}
            </div>
            <div
              className={cn(
                "text-sm",
                stock.change >= 0 ? "text-green-600" : "text-red-600"
              )}
            >
              {stock.change >= 0 ? "+" : ""}
              {stock.change.toFixed(2)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
