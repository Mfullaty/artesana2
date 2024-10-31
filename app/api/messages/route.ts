import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { messageSchema } from '@/schemas/messages'
import * as z from 'zod'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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

    // Send notification email to company
    await resend.emails.send({
      from: 'Artesana Messages <info@artesana.com.ng>',
      to: 'info@artesana.com.ng',
      subject: 'New Message Received',
      html: `
        <h1>New Message</h1>
        <p>A new message has been received from ${name}.</p>
        <h2>Message Details:</h2>
        <ul>
          <li>Name: ${name}</li>
          <li>Email: ${email}</li>
          <li>Message: ${message}</li>
        </ul>
        <p>Please log in to the admin panel to respond.</p>
      `
    })

    // Send confirmation email to customer
    await resend.emails.send({
      from: 'Artesana <info@artesana.com.ng>',
      to: email,
      subject: 'Message Received - Artesana',
      html: `
        <h1>Thank You for Your Message</h1>
        <p>Dear ${name},</p>
        <p>We have received your message. Our team will review it and get back to you as soon as possible.</p>
        <p>If you have any urgent inquiries, please don't hesitate to contact us directly at  <a href="mailto:info@artesana.com.ng">info@artesana.com.ng</a> visit the website and fill the contact form <a href="https://artesana.com.ng/contact-us">Here</a></p>
        <p>Best regards,<br>The Artesana Team</p>
      `
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
    const [messages, totalCount, unreadCount] = await Promise.all([
      db.message.findMany({
        skip,
        take: limit,
        orderBy: { sentOn: 'desc' },
      }),
      db.message.count(),
      db.message.count({ where: { status: 'new' } }),
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      messages,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
      },
      unreadCount,
    })
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json()
    const { messageIds } = body

    if (!Array.isArray(messageIds) || messageIds.length === 0) {
      return NextResponse.json({ error: 'Invalid message IDs' }, { status: 400 })
    }

    await db.message.deleteMany({
      where: {
        id: {
          in: messageIds,
        },
      },
    })

    return NextResponse.json({ success: true, deletedCount: messageIds.length })
  } catch (error) {
    console.error('Error deleting messages:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}