'use client';

import { useState, useEffect } from 'react';
import NewsCard from './Newscard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface Article {
  uri: string;
  title: string;
  body: string;
  date: string;
  source: { title: string };
  image: string;
  url: string;
}

const countries = [
  { value: 'http://en.wikipedia.org/wiki/Nigeria', label: 'Nigeria' },
  { value: 'http://en.wikipedia.org/wiki/United_States', label: 'United States' },
  { value: 'http://en.wikipedia.org/wiki/United_Kingdom', label: 'United Kingdom' },
  { value: 'http://en.wikipedia.org/wiki/Ghana', label: 'Ghana' },
  { value: 'http://en.wikipedia.org/wiki/Cameroon', label: 'Cameroon' },
  { value: 'http://en.wikipedia.org/wiki/Egypt', label: 'Egypt' },
  // Add more countries as needed
];

export default function NewsList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [keywords, setKeywords] = useState('Export');
  const [country, setCountry] = useState('http://en.wikipedia.org/wiki/Nigeria');

  const fetchNews = async (reset = false) => {
    setLoading(true);
    const currentPage = reset ? 1 : page;
    try {
      const res = await fetch(`/api/news?page=${currentPage}&keywords=${keywords}&country=${country}`);
      const data = await res.json();
      setArticles(prevArticles => reset ? data.articles.results : [...prevArticles, ...data.articles.results]);
      setPage(currentPage + 1);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
    setLoading(false);
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <NewsCard key={article.uri} article={article} />
        ))}
      </div>
      {loading && <div className="text-center">Loading...</div>}
      {!loading && articles.length > 0 && (
        <div className="text-center">
          <Button onClick={() => fetchNews()}>Load More</Button>
        </div>
      )}
    </div>
  );
}