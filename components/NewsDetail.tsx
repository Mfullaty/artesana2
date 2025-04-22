"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getNewsArticle } from "@/lib/news";
import { NewsItem } from "@/types/news";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NewsDetail({ articleId }: { articleId: string }) {
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const data = await getNewsArticle(articleId);
        setArticle(data);
      } catch (err) {
        setError("Failed to fetch article");
        console.error("Error fetching article:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          {error || "Article not found"}
        </h2>
        <Link href="/news">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to News
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/news">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to News
          </Button>
        </Link>
        <span className="text-sm text-gray-500">
          {new Date(article.date).toLocaleDateString()} | Source:{" "}
          {article.source.title}
        </span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold mb-4">
            {article.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {article.image ? (
            <Image
              src={article.image}
              alt={article.title}
              width={800}
              height={400}
              className="w-full h-64 object-cover mb-6 rounded-md"
              priority
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center mb-6 rounded-md">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />
          <div className="mt-6">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Read full article
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
