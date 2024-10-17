import { NextResponse } from 'next/server';

let cache: {
  data: any;
  timestamp: number;
} | null = null;

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours (in milliseconds)
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;


export async function GET() {
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    return NextResponse.json(cache.data);
  }

  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=ALUMINUM&interval=monthly&apikey=${ALPHA_VANTAGE_API_KEY}`
    );

    if (!response.ok) {
      return NextResponse.json({ message: 'Error fetching data' }, { status: response.status });
    }

    const data = await response.json();

    // Cache the data and set the timestamp
    cache = {
      data,
      timestamp: Date.now(),
    };

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
