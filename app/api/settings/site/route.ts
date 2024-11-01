import { db } from '@/lib/db';
import { NextResponse } from 'next/server'

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  logo: string;
  favicon: string;
  facebookLink: string;
  twitterLink: string;
  instagramLink: string;
  linkedinLink: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
}

export async function GET() {
  try {
    const settings = await db.siteSettings.findFirst()
    return NextResponse.json(settings || {
      siteName: '',
      siteDescription: '',
      logo: '',
      favicon: '',
      facebookLink: '',
      twitterLink: '',
      instagramLink: '',
      linkedinLink: '',
      contactEmail: '',
      contactPhone: '',
      address: '',
    })
  } catch (error) {
    console.error('Failed to fetch site settings:', error)
    return NextResponse.json({ error: 'Failed to fetch site settings' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data: SiteSettings = await request.json()
    const settings = await db.siteSettings.upsert({
      where: { id: { $exists: true } },
      update: data,
      create: data,
    })
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Failed to update site settings:', error)
    return NextResponse.json({ error: 'Failed to update site settings' }, { status: 500 })
  }
}