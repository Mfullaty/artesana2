import { NextResponse } from 'next/server';
import axios from 'axios';

const API_KEY = process.env.NEWSAPI_AI_KEY;
const BASE_URL = 'https://eventregistry.org/api/v1/article';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const keywords = searchParams.get('keywords') || 'export';
  const country = searchParams.get('country') || 'http://en.wikipedia.org/wiki/Nigeria';

  const params = {
    apiKey: API_KEY!,
    keyword: keywords,
    lang: 'eng',
    articlesPage: page,
    articlesCount: '10',
    articlesSortBy: 'date',
    resultType: 'articles',
    dataType: 'news',
    sourceLocationUri: country,
  };

  try {
    console.log('Fetching data from API');
    const response = await axios.get(`${BASE_URL}/getArticles`, { params });
    const data = response.data;

    console.log(`Found ${data.articles?.results?.length || 0} articles`);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}