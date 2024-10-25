import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { messageSchema } from '@/schemas/messages'
import * as z from 'zod'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, message } = messageSchema.parse(body)

    const newMessage = await db.message.create({
      data: {
        name,
        email,
        message,
        status: 'new',
      },
    })

    return NextResponse.json(newMessage, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error sending message:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const skip = (page - 1) * limit

  try {
    const [messages, totalCount] = await Promise.all([
      db.message.findMany({
        skip,
        take: limit,
        orderBy: { sentOn: 'desc' },
      }),
      db.message.count(),
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      messages,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
      },
    })
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}