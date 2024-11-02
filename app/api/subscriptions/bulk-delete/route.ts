import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function DELETE(request: Request) {
  try {
    const { ids } = await request.json()
    
    await db.emailSubscription.deleteMany({
      where: {
        id: { in: ids },
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting subscriptions:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete subscriptions' }, { status: 500 })
  }
}