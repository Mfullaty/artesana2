import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { writeFile } from 'fs/promises'
import path from 'path'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const product = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      origin: formData.get('origin') as string || '',
      moisture: formData.get('moisture') as string || '',
      color: formData.get('color') as string || '',
      form: formData.get('form') as string || '',
      cultivation: formData.get('cultivation') as string || '',
      cultivationType: formData.get('cultivationType') as string || '',
      purity: formData.get('purity') as string || '',
      grades: formData.get('grades') as string || '',
      measurement: formData.get('measurement') as string || '',
      inStock: formData.get('inStock') ? parseInt(formData.get('inStock') as string) : 0,
    }

    const imageUrls: string[] = []

    // Handle image uploads
    for (let i = 1; i <= 4; i++) {
      const image = formData.get(`image${i}`) as File | null
      if (image) {
        const bytes = await image.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Save the file
        const filename = `${Date.now()}-${image.name}`
        const filepath = path.join(process.cwd(), 'public', 'images', 'uploads', filename)
        await writeFile(filepath, buffer)
        imageUrls.push(`/images/uploads/${filename}`)
      }
    }

    const createdProduct = await prisma.product.create({
      data: {
        ...product,
        images: imageUrls,
      },
    })

    return NextResponse.json(createdProduct)
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Error creating product' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const products = await prisma.product.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    })

    const total = await prisma.product.count()

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData()
    const id = formData.get('id') as string
    const product = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      origin: formData.get('origin') as string || '',
      moisture: formData.get('moisture') as string || '',
      color: formData.get('color') as string || '',
      form: formData.get('form') as string || '',
      cultivation: formData.get('cultivation') as string || '',
      cultivationType: formData.get('cultivationType') as string || '',
      purity: formData.get('purity') as string || '',
      grades: formData.get('grades') as string || '',
      measurement: formData.get('measurement') as string || '',
      inStock: formData.get('inStock') ? parseInt(formData.get('inStock') as string) : 0,
    }

    const existingProduct = await prisma.product.findUnique({ where: { id } })
    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const imageUrls: string[] = [...existingProduct.images]

    // Handle image uploads
    for (let i = 1; i <= 4; i++) {
      const image = formData.get(`image${i}`) as File | null
      if (image) {
        const bytes = await image.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Save the file
        const filename = `${Date.now()}-${image.name}`
        const filepath = path.join(process.cwd(), 'public', 'images', 'uploads', filename)
        await writeFile(filepath, buffer)
        imageUrls.push(`/images/uploads/${filename}`)
      }
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...product,
        images: imageUrls,
      },
    })

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Error updating product' }, { status: 500 })
  }
}