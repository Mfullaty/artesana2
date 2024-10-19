import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const messages = await prisma.message.findMany()
  return NextResponse.json(messages)
}

export async function POST(request: Request) {
  const body = await request.json()
  const message = await prisma.message.create({
    data: {
      name: body.name,
      email: body.email,
      message: body.message,
      date: new Date(),
      status: 'Unread',
    },
  })
  return NextResponse.json(message)
}