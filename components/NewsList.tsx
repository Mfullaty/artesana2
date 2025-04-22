"use client";

import { useState, useEffect } from "react";
import NewsCard from "./Newscard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { getNewsArticles } from "@/lib/news";
import { NewsItem, NewsQueryParams } from "@/types/news";
import { Skeleton } from "@/components/ui/skeleton";

const countries = [
  { value: "http://en.wikipedia.org/wiki/Nigeria", label: "Nigeria" },
  {
    value: "http://en.wikipedia.org/wiki/United_States",
    label: "United States",
  },
  {
    value: "http://en.wikipedia.org/wiki/United_Kingdom",
    label: "United Kingdom",
  },
  { value: "http://en.wikipedia.org/wiki/Ghana", label: "Ghana" },
  { value: "http://en.wikipedia.org/wiki/Cameroon", label: "Cameroon" },
  { value: "http://en.wikipedia.org/wiki/Egypt", label: "Egypt" },
  // Add more countries as needed
];

export default function NewsList() {
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [keywords, setKeywords] = useState("Export");
  const [country, setCountry] = useState(
    "http://en.wikipedia.org/wiki/Nigeria"
  );
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = async (reset = false) => {
    setLoading(true);
    setError(null);
    const currentPage = reset ? 1 : page;

    try {
      const params: NewsQueryParams = {
        page: currentPage,
        keywords,
        country,
        count: 10,
      };

      const data = await getNewsArticles(params);
      const newArticles = data.articles.results;

      setArticles((prevArticles) =>
        reset ? newArticles : [...prevArticles, ...newArticles]
      );
      setPage(currentPage + 1);
      setHasMore(newArticles.length === 10);
    } catch (err) {
      setError("Failed to fetch news articles");
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(true);
  }, [keywords, country]);

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <Input
          placeholder="Enter keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="flex-grow"
        />
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={() => fetchNews(true)}>Search</Button>
      </div>

      {error && <div className="text-red-500 text-center py-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <NewsCard key={article.uri} article={article} />
        ))}
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      )}

      {!loading && hasMore && articles.length > 0 && (
        <div className="text-center">
          <Button onClick={() => fetchNews()}>Load More</Button>
        </div>
      )}
    </div>
  );
}
