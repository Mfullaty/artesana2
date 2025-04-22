export interface NewsItem {
  uri: string;
  title: string;
  body: string;
  date: string;
  source: { title: string };
  image: string;
  url: string;
}

export interface NewsResponse {
  articles: {
    results: NewsItem[];
    totalResults: number;
    page: number;
    count: number;
  };
}

export interface NewsQueryParams {
  page?: number;
  keywords?: string;
  country?: string;
  count?: number;
}

export interface ArticleResponse {
  article: NewsItem;
}
