import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { headers } from 'next/headers'

export async function GET(request: Request) {
  try {
    const headersList = headers()
    const ip = headersList.get('x-forwarded-for') || 'Unknown'
    const email = request.headers.get('x-user-email') || ''

    const subscription = await db.emailSubscription.findFirst({
      where: {
        OR: [
          { email: email },
          { ip: ip }
        ]
      },
    })

    return NextResponse.json({ isSubscribed: !!subscription })
  } catch (error) {
    console.error('Error checking subscription:', error)
    return NextResponse.json({ isSubscribed: false, error: 'Failed to check subscription' }, { status: 500 })
  }
}