import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await db.user.findUnique({
      where: { id: params.id },
    })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    return NextResponse.json(user)
  } catch (error) {
    console.error('Failed to fetch user:', error)
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
  }
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const { role } = await request.json()
      const updatedUser = await db.user.update({
        where: { id: params.id },
        data: { role },
      })
      return NextResponse.json(updatedUser)
    } catch (error) {
      console.error('Failed to update user:', error)
      return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
    }
  }