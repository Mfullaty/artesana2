"use client";

import { useEffect } from "react";
import Marquee from "./Marquee";
import { Skeleton } from "@/components/ui/skeleton";
import { useNews } from "@/context/NewsContext";

export default function NewsMarquee() {
  const { newsItems, loading, error, fetchNews } = useNews();

  useEffect(() => {
    fetchNews({
      page: 1,
      keywords: "export",
      country: "http://en.wikipedia.org/wiki/Nigeria",
      count: 10,
    });
  }, []);

  if (loading) {
    return (
      <div className="flex space-x-4 overflow-hidden">
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} className="h-6 w-40" />
        ))}
      </div>
    );
  }

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <Marquee>
      {newsItems.map((item) => (
        <a
          key={item.uri}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 text-center cursor-pointer opacity-100 hover:opacity-60"
        >
          <span className="font-semibold text-sm text-[#1a2b4c]">
            {item.title.split(" ").slice(0, 4).join(" ")}...
          </span>
        </a>
      ))}
    </Marquee>
  );
}
