import { db } from '@/lib/db';
import { NextResponse } from 'next/server'

interface GeneralSettings {
  heroText: string;
  tagLineText: string;
  aboutUsText: string;
  missionStatement: string;
  productsHeroTitle: string;
}

export async function GET() {
  try {
    const settings = await db.generalSettings.findFirst()
    return NextResponse.json(settings || {
      heroText: '',
      tagLineText: '',
      aboutUsText: '',
      missionStatement: '',
      productsHeroTitle: '',
    })
  } catch (error) {
    console.error('Failed to fetch general settings:', error)
    return NextResponse.json({ error: 'Failed to fetch general settings' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data: GeneralSettings = await request.json()
    const settings = await db.generalSettings.upsert({
      where: { id: { $exists: true } },
      update: {
        heroText: data.heroText,
        tagLineText: data.tagLineText,
        aboutUsText: data.aboutUsText,
        missionStatement: data.missionStatement,
        productsHeroTitle: data.productsHeroTitle,
      },
      create: {
        heroText: data.heroText,
        tagLineText: data.tagLineText,
        aboutUsText: data.aboutUsText,
        missionStatement: data.missionStatement,
        productsHeroTitle: data.productsHeroTitle,
      },
    })
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Failed to update general settings:', error)
    return NextResponse.json({ error: 'Failed to update general settings' }, { status: 500 })
  }
}