import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const { content } = body

    const message = await db.message.findUnique({
      where: { id: params.id },
    })

    if (!message) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 })
    }

    const reply = await db.reply.create({
      data: {
        content,
        messageId: message.id,
        isAdmin: true, // Set this to true for admin replies
      },
    })

    // Send email using Resend
    await resend.emails.send({
      from: 'contact@artesana.com.ng',
      to: message.email,
      subject: 'Reply to your message',
      html: `<p>Hello ${message.name},</p><p>${content}</p>`,
    })

    // Update message status to 'Read'
    await db.message.update({
      where: { id: message.id },
      data: { status: 'Read' },
    })

    return NextResponse.json(reply, { status: 201 })
  } catch (error) {
    console.error('Error replying to message:', error)
    return NextResponse.json({ error: 'Error replying to message' }, { status: 500 })
  }
}