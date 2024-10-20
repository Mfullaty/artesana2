import { NextRequest, NextResponse } from 'next/server'
import { writeFile, unlink } from 'fs/promises'
import path from 'path'
import { db } from '@/lib/db'


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = await db.product.findUnique({
      where: { id: params.id },
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json({ error: 'Error fetching product' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const formData = await req.formData()
    const product = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      origin: formData.get('origin') as string,
      moisture: formData.get('moisture') as string,
      color: formData.get('color') as string,
      form: formData.get('form') as string,
      cultivation: formData.get('cultivation') as string,
      cultivationType: formData.get('cultivationType') as string,
      purity: formData.get('purity') as string,
      grades: formData.get('grades') as string,
      measurement: formData.get('measurement') as string,
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

    const existingProduct = await db.product.findUnique({
      where: { id: params.id },
    })

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Delete old images if new ones are uploaded
    if (imageUrls.length > 0) {
      for (const oldImage of existingProduct.images) {
        const oldImagePath = path.join(process.cwd(), 'public', oldImage)
        await unlink(oldImagePath)
      }
    }

    const updatedProduct = await db.product.update({
      where: { id: params.id },
      data: {
        ...product,
        images: imageUrls.length > 0 ? imageUrls : existingProduct.images,
      },
    })

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Error updating product' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = await db.product.findUnique({
      where: { id: params.id },
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Delete associated images
    for (const imageUrl of product.images) {
      const imagePath = path.join(process.cwd(), 'public', imageUrl)
      await unlink(imagePath)
    }

    await db.product.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ error: 'Error deleting product' }, { status: 500 })
  }
}