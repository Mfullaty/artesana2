import { NextResponse } from 'next/server';
import axios from 'axios';

const API_KEY = process.env.NEWSAPI_AI_KEY;
const BASE_URL = 'https://eventregistry.org/api/v1/article';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  const queryParams = {
    apiKey: API_KEY!,
    articleUri: id,
  };

  try {
    const response = await axios.get(`${BASE_URL}/getArticle`, { params: queryParams });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching news article:', error);
    return NextResponse.json({ error: 'Failed to fetch news article' }, { status: 500 });
  }
}