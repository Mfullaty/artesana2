import { NextResponse } from 'next/server'
import {db} from '@/lib/db'
import { headers } from 'next/headers'

export async function GET() {
  try {
    const ip = headers().get('x-forwarded-for') || 'Unknown'

    const subscription = await db.emailSubscription.findFirst({
      where: { ip },
    })

    return NextResponse.json({ isSubscribed: !!subscription })
  } catch (error) {
    console.error('Error checking subscription:', error)
    return NextResponse.json({ isSubscribed: false, error: 'Failed to check subscription' }, { status: 500 })
  }
}