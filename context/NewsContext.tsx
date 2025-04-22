"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { NewsItem, NewsQueryParams } from "@/types/news";
import { getNewsArticles } from "@/lib/news";

interface NewsContextType {
  newsItems: NewsItem[];
  loading: boolean;
  error: string | null;
  fetchNews: (params: NewsQueryParams) => Promise<void>;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export function NewsProvider({ children }: { children: ReactNode }) {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async (params: NewsQueryParams) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getNewsArticles(params);
      setNewsItems(data.articles.results);
    } catch (err) {
      setError("Failed to fetch news data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NewsContext.Provider value={{ newsItems, loading, error, fetchNews }}>
      {children}
    </NewsContext.Provider>
  );
}

export function useNews() {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error("useNews must be used within a NewsProvider");
  }
  return context;
}
