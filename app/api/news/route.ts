import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.NEWSAPI_AI_KEY;
const BASE_URL = "https://eventregistry.org/api/v1/article";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const keywords = searchParams.get("keywords") || "export";
  const country =
    searchParams.get("country") || "http://en.wikipedia.org/wiki/Nigeria";
  const count = searchParams.get("count") || "10";

  const params = {
    apiKey: API_KEY!,
    keyword: keywords,
    lang: "eng",
    articlesPage: page,
    articlesCount: count,
    articlesSortBy: "date",
    resultType: "articles",
    dataType: "news",
    sourceLocationUri: country,
  };

  try {
    const response = await axios.get(`${BASE_URL}/getArticles`, { params });
    return NextResponse.json(response.data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }
}
