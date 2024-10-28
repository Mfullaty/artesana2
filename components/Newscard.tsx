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

export default function NewsCard({ article }: { article: Article }) {
  return (
    <a href={article.url} target="_blank" rel="noopener noreferrer" className="block h-full">
      <Card className="flex flex-col h-full transition-shadow hover:shadow-lg">
        <CardHeader>
          <CardTitle className="line-clamp-2">{article.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          {article.image ? (
            <Image
              src={article.image}
              alt={article.title}
              width={400}
              height={200}
              className="w-full h-48 object-cover mb-4 rounded-md"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-4 rounded-md">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
          <p className="line-clamp-3">{article.body}</p>
        </CardContent>
        <div className="px-6 pb-4">
          <span className="text-sm text-gray-500">{new Date(article.date).toLocaleDateString()}</span>
        </div>
      </Card>
    </a>
  );
}