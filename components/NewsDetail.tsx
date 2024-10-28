'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Article {
  uri: string;
  title: string;
  body: string;
  date: string;
  source: { title: string };
  image: string;
  url: string;
}

export default function NewsDetail({ articleId }: { articleId: string }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/news/${articleId}`);
        const data = await res.json();
        setArticle(data.article);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
      setLoading(false);
    };

    fetchArticle();
  }, [articleId]);

  if (loading) {
    return <div>Loading article...</div>;
  }

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold mb-4">{article.title}</CardTitle>
        <div className="text-sm text-gray-500 mb-2">
          {new Date(article.date).toLocaleDateString()} | Source: {article.source.title}
        </div>
      </CardHeader>
      <CardContent>
        {article.image ? (
          <Image
            src={article.image}
            alt={article.title}
            width={800}
            height={400}
            className="w-full h-64 object-cover mb-6 rounded-md"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center mb-6 rounded-md">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.body }} />
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
  );
}