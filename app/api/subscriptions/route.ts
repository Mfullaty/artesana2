import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { headers } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const skip = (page - 1) * limit

  try {
    const [subscriptions, totalCount] = await Promise.all([
      db.emailSubscription.findMany({
        skip,
        take: limit,
        orderBy: { submittedOn: 'desc' },
      }),
      db.emailSubscription.count(),
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      success: true,
      subscriptions,
      totalPages,
      currentPage: page,
    })
  } catch (error) {
    console.error('Error fetching subscriptions:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch subscriptions' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    const headersList = headers()
    const ip = headersList.get('x-forwarded-for') || 'Unknown'

    // Check if the email or IP is already subscribed
    const existingSubscription = await db.emailSubscription.findFirst({
      where: {
        OR: [
          { email: email },
          { ip: ip }
        ]
      },
    })

    if (existingSubscription) {
      return NextResponse.json({ success: true, message: 'Already subscribed' })
    }

    const subscription = await db.emailSubscription.create({
      data: {
        email,
        ip,
        submittedOn: new Date(),
      },
    })

    return NextResponse.json({ success: true, subscription })
  } catch (error) {
    console.error('Error creating subscription:', error)
    return NextResponse.json({ success: false, error: 'Failed to subscribe' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    await db.emailSubscription.delete({
      where: { id },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting subscription:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete subscription' }, { status: 500 })
  }
}