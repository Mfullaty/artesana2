'use client'

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Carousel from "../Carousel";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface NewsItem {
  uri: string;
  title: string;
  date: string;
  image: string;
  url: string;
}

export default function AgriculturalNews() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news?page=1&keywords=agriculture&country=http://en.wikipedia.org/wiki/Saudi_Arabia');
        const data = await res.json();
        setNewsItems(data.articles.results.slice(0, 5).map((item: any) => ({
          uri: item.uri,
          title: item.title,
          date: new Date(item.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
          image: item.image || '/images/placeholder.jpg',
          url: item.url
        })));
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
      <div className="max-w-6xl mx-auto px-4 py-8 font-mono">
        <h2 className="text-3xl font-bold text-primary mb-6">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-64 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div id="agricNews" className="max-w-6xl mx-auto px-4 py-8 font-mono">
      <h2 className="text-3xl font-bold text-primary mb-6">Latest News</h2>
      <Carousel showPlayPauseButton={false} showIndicators={false} showControls={false}>
        {newsItems.map((item) => (
          <Link
            href={item.url}
            key={item.uri}
            className="block h-full"
            draggable="false"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card className="h-full overflow-hidden rounded-xl border-none shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
              <CardContent className="p-0 h-full">
                <div className="relative h-full aspect-[3/2]">
                  <img
                    src={item.image}
                    alt=""
                    className="object-cover w-full h-full"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <p className="text-sm font-medium mb-2">{item.date}</p>
                    <h3 className="text-xl font-bold mb-4 line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Carousel>
      <div className="mt-8 text-center">
        <Button
          variant="default"
          size="lg"
          className="font-semibold bg-primary"
          asChild
        >
          <Link href="/news">Discover More</Link>
        </Button>
      </div>
    </div>
  );
}