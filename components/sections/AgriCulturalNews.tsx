import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Carousel from "../Carousel";
import Link from "next/link";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  image: string;
  url: string;
}

const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "Global Wheat Prices Surge Amid Supply Concerns",
    date: "15 October 2024",
    image: "/images/samplenews1.jpg",
    url: "#",
  },
  {
    id: "2",
    title: "New Sustainable Farming Techniques Boost Rice Yields",
    date: "12 October 2024",
    image: "/images/samplenews2.png",
    url: "#",
  },
  {
    id: "3",
    title: "Coffee Futures Rally on Brazilian Frost Reports",
    date: "10 October 2024",
    image: "/images/samplenews3.jpg",
    url: "#",
  },
  {
    id: "4",
    title: "Innovative Vertical Farming Project Launches in Urban Centers",
    date: "8 October 2024",
    image: "/images/samplenews4.jpg",
    url: "#",
  },
  {
    id: "5",
    title: "Global Soybean Trade Disrupted by New Tariffs",
    date: "5 October 2024",
    image: "/images/samplenews5.jpg",
    url: "#",
  },
];

export default function AgriculturalNews() {
  return (
    <div id="agricNews" className="max-w-6xl mx-auto px-4 py-8 font-mono">
      <h2 className="text-3xl font-bold text-primary mb-6">Latest News</h2>
      <Carousel showPlayPauseButton={false} showIndicators={false} showControls={false}>
        {newsItems.map((item) => (
          <Link
            href={item.url}
            key={item.id}
            className="block h-full"
            draggable="false"
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
          <a href="#">Discover More</a>
        </Button>
      </div>
    </div>
  );
}
