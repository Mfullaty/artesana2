import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const message = await db.message.findUnique({
      where: { id: params.id },
    })

    if (!message) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 })
    }

    const replies = await db.reply.findMany({
      where: { messageId: params.id },
      orderBy: { sentOn: 'asc' },
    })

    return NextResponse.json({ message, replies })
  } catch (error) {
    console.error('Error fetching message and replies:', error)
    return NextResponse.json({ error: 'Error fetching message and replies' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const { status } = body

    const updatedMessage = await db.message.update({
      where: { id: params.id },
      data: { status },
    })

    return NextResponse.json(updatedMessage)
  } catch (error) {
    console.error('Error updating message:', error)
    return NextResponse.json({ error: 'Error updating message' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // First, delete all replies associated with this message
    await db.reply.deleteMany({
      where: { messageId: params.id },
    })

    // Then, delete the message itself
    await db.message.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Message and associated replies deleted successfully' })
  } catch (error) {
    console.error('Error deleting message:', error)
    return NextResponse.json({ error: 'Error deleting message' }, { status: 500 })
  }
}