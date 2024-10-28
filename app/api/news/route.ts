import { NextResponse } from 'next/server';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const API_KEY = process.env.NEWSAPI_AI_KEY;
const BASE_URL = 'https://eventregistry.org/api/v1/article';
const CACHE_DIR = path.join(process.cwd(), 'cache');

// Ensure cache directory exists
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}


function getCacheFilePath(params: URLSearchParams): string {
    const hash = crypto.createHash('md5').update(params.toString()).digest('hex');
    return path.join(CACHE_DIR, `${hash}.json`);
  }

function isCacheValid(cacheFilePath: string): boolean {
  try {
    const stats = fs.statSync(cacheFilePath);
    const now = new Date();
    const cacheAge = (now.getTime() - stats.mtime.getTime()) / 1000 / 60 / 60; // in hours
    return cacheAge < 24;
  } catch (error) {
    // If there's an error (e.g., file doesn't exist), consider cache invalid
    return false;
  }
}

function deleteExpiredCache() {
  try {
    const files = fs.readdirSync(CACHE_DIR);
    const now = new Date();

    files.forEach(file => {
      const filePath = path.join(CACHE_DIR, file);
      try {
        const stats = fs.statSync(filePath);
        const fileAge = (now.getTime() - stats.mtime.getTime()) / 1000 / 60 / 60; // in hours

        if (fileAge >= 24) {
          fs.unlinkSync(filePath);
          console.log(`Deleted expired cache file: ${file}`);
        }
      } catch (error) {
        console.error(`Error processing cache file ${file}:`, error);
      }
    });
  } catch (error) {
    console.error('Error deleting expired cache:', error);
  }
}

function emptyCache() {
  try {
    const files = fs.readdirSync(CACHE_DIR);

    files.forEach(file => {
      const filePath = path.join(CACHE_DIR, file);
      try {
        fs.unlinkSync(filePath);
        console.log(`Deleted cache file: ${file}`);
      } catch (error) {
        console.error(`Error deleting cache file ${file}:`, error);
      }
    });

    console.log('Cache emptied successfully');
  } catch (error) {
    console.error('Error emptying cache:', error);
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const keywords = searchParams.get('keywords') || 'agriculture';
  const country = searchParams.get('country') || 'http://en.wikipedia.org/wiki/United_States';
  const action = searchParams.get('action');

  if (action === 'empty_cache') {
    emptyCache();
    return NextResponse.json({ message: 'Cache emptied successfully' });
  }

  // Delete expired cache files before processing the request
  deleteExpiredCache();

  const params = new URLSearchParams({
    apiKey: API_KEY!,
    keyword: keywords,
    lang: 'eng',
    articlesPage: page,
    articlesCount: '10',
    articlesSortBy: 'date',
    resultType: 'articles',
    dataType: 'news',
    sourceLocationUri: country,
  });

  const cacheFilePath = getCacheFilePath(params);

  try {
    // Check if valid cache exists
    if (fs.existsSync(cacheFilePath) && isCacheValid(cacheFilePath)) {
      try {
        const cachedData = fs.readFileSync(cacheFilePath, 'utf-8');
        console.log('Using cached data');
        return NextResponse.json(JSON.parse(cachedData));
      } catch (error) {
        console.error('Error reading cache file:', error);
        // If there's an error reading the cache, proceed to fetch fresh data
      }
    }

    // If no valid cache, fetch from API
    console.log('Fetching fresh data from API');
    const response = await axios.get(`${BASE_URL}/getArticles`, { params: Object.fromEntries(params) });
    const data = response.data;

    // Cache the new data
    try {
      fs.writeFileSync(cacheFilePath, JSON.stringify(data));
    } catch (error) {
      console.error('Error writing to cache file:', error);
    }

    console.log(`Found ${data.articles?.results?.length || 0} articles`);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}