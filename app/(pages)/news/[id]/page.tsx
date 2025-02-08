import NewsDetail from "@/components/NewsDetail";
import { Suspense } from "react";

export default function NewsDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* <Suspense fallback={<div>Loading article...</div>}>
        <NewsDetail articleId={params.id} />
      </Suspense> */}
      News Here
    </main>
  );
}
