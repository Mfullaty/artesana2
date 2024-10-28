'use client'

import { useEffect, useState } from "react";
import Marquee from "./Marquee";
import { Skeleton } from "@/components/ui/skeleton";

interface NewsItem {
  uri: string;
  title: string;
  url: string;
}

export default function NewsMarquee() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news?page=1&keywords=agriculture&country=http://en.wikipedia.org/wiki/Nigeria');
        const data = await res.json();
        setNewsItems(data.articles.results.slice(0, 10)); // Get first 10 news items
      } catch (err) {
        setError("Failed to fetch news data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
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
            {item.title.split(' ').slice(0, 4).join(' ')}...
          </span>
        </a>
      ))}
    </Marquee>
  );
}