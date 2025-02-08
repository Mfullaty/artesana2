import NewsList from '@/components/NewsList';
import { Suspense } from 'react';

export default function NewsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-primary mb-8">News</h1>
      {/* <Suspense fallback={<div>Loading...</div>}>
        <NewsList />
      </Suspense> */}
    </main>
  );
}