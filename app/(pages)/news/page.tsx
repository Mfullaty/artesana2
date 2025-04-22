import { Metadata } from "next";
import NewsList from "@/components/NewsList";
import { getNewsArticles } from "@/lib/news";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const keywords =
    typeof searchParams.keywords === "string"
      ? searchParams.keywords
      : "export";
  const country =
    typeof searchParams.country === "string" ? searchParams.country : "Nigeria";

  // Generate dynamic title and description based on search parameters
  const title = `${
    keywords.charAt(0).toUpperCase() + keywords.slice(1)
  } News in ${country} | Artesana`;
  const description = `Latest ${keywords} news and updates from ${country}. Stay informed with the most recent developments in the agricultural export industry.`;

  return {
    title,
    description,
    keywords: `${keywords}, ${country}, agricultural news, export news, market trends, industry updates, Artesana news`,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_US",
      siteName: "Artesana",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/news${keywords !== "export" ? `?keywords=${keywords}` : ""}${
        country !== "Nigeria" ? `&country=${country}` : ""
      }`,
    },
  };
}

export default async function NewsPage({ searchParams }: Props) {
  const keywords =
    typeof searchParams.keywords === "string"
      ? searchParams.keywords
      : undefined;
  const country =
    typeof searchParams.country === "string" ? searchParams.country : undefined;

  // Fetch initial data for structured data
  const initialData = await getNewsArticles({
    keywords,
    country,
    page: 1,
    count: 10,
  });

  // Generate structured data for better SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: `Latest ${keywords || "Export"} News`,
    description: `Stay updated with the latest ${
      keywords || "export"
    } news and updates from ${country || "Nigeria"}.`,
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: "Artesana",
      url: "https://artesana.com.ng",
    },
    publisher: {
      "@type": "Organization",
      name: "Artesana",
      logo: {
        "@type": "ImageObject",
        url: "https://artesana.com.ng/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://artesana.com.ng/news${
        keywords ? `?keywords=${keywords}` : ""
      }${country ? `&country=${country}` : ""}`,
    },
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          {keywords
            ? `${keywords.charAt(0).toUpperCase() + keywords.slice(1)} News`
            : "Latest News"}
          {country && ` in ${country}`}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Stay informed with the latest updates and insights from the
          agricultural export industry.
          {keywords && ` Focused on ${keywords} news.`}
          {country && ` From ${country}.`}
        </p>
        <NewsList />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </div>
    </main>
  );
}
