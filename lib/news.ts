import {
  NewsItem,
  NewsResponse,
  NewsQueryParams,
  ArticleResponse,
} from "@/types/news";
import { getCachedData, setCachedData, invalidateCache } from "./redis";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://artesana.com.ng";
const CACHE_TTL = 3600; // 1 hour cache TTL
const NEWS_API_KEY = process.env.NEWS_API_KEY;

function generateCacheKey(params: NewsQueryParams): string {
  const { keywords, country, page, count } = params;
  return `news:${keywords || "all"}:${country || "all"}:${page || 1}:${
    count || 10
  }`;
}

export async function getNewsArticles(
  params: NewsQueryParams
): Promise<NewsResponse> {
  const cacheKey = generateCacheKey(params);

  // Try to get cached data first
  const cachedData = await getCachedData<NewsResponse>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  // If no cache, fetch from API
  const { keywords, country, page = 1, count = 10 } = params;

  const queryParams = new URLSearchParams({
    apiKey: NEWS_API_KEY!,
    page: page.toString(),
    pageSize: count.toString(),
  });

  if (keywords) queryParams.append("q", keywords);
  if (country) queryParams.append("country", country);

  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?${queryParams.toString()}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch news articles");
  }

  const data = await response.json();

  // Cache the response
  await setCachedData(cacheKey, data, CACHE_TTL);

  return data;
}

export async function getNewsArticle(
  articleUri: string
): Promise<NewsItem | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/news/${articleUri}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error("Failed to fetch news article");
    }
    const data: ArticleResponse = await response.json();
    return data.article;
  } catch (error) {
    console.error("Error fetching news article:", error);
    throw error;
  }
}

// Function to manually invalidate cache (can be called when needed)
export async function invalidateNewsCache(): Promise<void> {
  await invalidateCache("news:*");
}
