'use client'
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface CommodityData {
  id: string;
  name: string;
  interval: string;
  unit: string;
  data: { date: string; value: string }[];
}

function calculatePriceChange(data: { date: string; value: string }[]): number {
  if (!data || data.length < 2) return 0;
  
  const currentPrice = parseFloat(data[0].value);
  const lastMonthPrice = parseFloat(data[1].value);
  
  if (isNaN(currentPrice) || isNaN(lastMonthPrice) || lastMonthPrice === 0) {
    return 0;
  }
  
  return ((currentPrice - lastMonthPrice) / lastMonthPrice) * 100;
}

export default function StockMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [commoditiesData, setCommoditiesData] = useState<CommodityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commodityEndpoints = [
          { id: "sugar", endpoint: "/api/alphavantage/sugar" },
          { id: "coffee", endpoint: "/api/alphavantage/coffee" },
          { id: "copper", endpoint: "/api/alphavantage/copper" },
          { id: "wheat", endpoint: "/api/alphavantage/wheat" },
          { id: "aluminium", endpoint: "/api/alphavantage/aluminium" },
          { id: "corn", endpoint: "/api/alphavantage/corn" },
        ];

        const responses = await Promise.all(
          commodityEndpoints.map(({ endpoint }) => fetch(endpoint))
        );

        const dataPromises = responses.map(async (response, index) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          return { ...data, id: commodityEndpoints[index].id };
        });

        const data = await Promise.all(dataPromises);
        setCommoditiesData(data);
      } catch (err) {
        setError("Failed to fetch commodity data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (loading || error || commoditiesData.length === 0) return;

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
    const animationDuration = 30000;

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
  }, [isHovered, loading, error, commoditiesData]);

  if (loading) {
    return (
      <div className="flex space-x-4 overflow-hidden">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="inline-block px-6 py-2">
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    );
  }

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div
      className="overflow-hidden relative rounded-md whitespace-nowrap bg-transparent space-x-4"
      ref={marqueeRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="inline-block">
        {commoditiesData.map((commodity) => {
          if (!commodity || !commodity.data || commodity.data.length < 2) {
            return null;
          }
          const priceChange = calculatePriceChange(commodity.data);
          return (
            <Link
              key={commodity.id}
              href={`/commodity/${commodity.id}`}
              className="inline-block px-6 py-2 text-center cursor-pointer opacity-100 hover:opacity-60"
            >
              <div className="font-semibold text-sm text-[#1a2b4c]">
                {commodity.name.replace("Global Price of ", "")}
              </div>
              <div
                className={cn(
                  "text-sm",
                  priceChange > 0 ? "text-green-600" : priceChange < 0 ? "text-red-600" : "text-gray-600"
                )}
              >
                {priceChange > 0 ? "+" : ""}
                {priceChange.toFixed(2)}%
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}