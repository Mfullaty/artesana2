"use server"
import { writeFile, unlink } from 'fs/promises'
import path from 'path'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { ProductFormData, productSchema } from '@/schemas/products'

export async function createProduct(formData: FormData) {
  try {
    const product: ProductFormData = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      origin: formData.get('origin') as string || undefined,
      moisture: formData.get('moisture') as string || undefined,
      color: formData.get('color') as string || undefined,
      form: formData.get('form') as string,
      cultivation: formData.get('cultivation') as string,
      cultivationType: formData.get('cultivationType') as string || undefined,
      purity: formData.get('purity') as string || undefined,
      grades: formData.get('grades') as string || undefined,
      measurement: formData.get('measurement') as string,
      images: [],
    }

    const validatedProduct = productSchema.parse(product)

    const imageUrls: string[] = []

    for (let i = 1; i <= 4; i++) {
      const image = formData.get(`image${i}`) as File | null
      if (image) {
        const bytes = await image.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const filename = `${Date.now()}-${image.name}`
        const filepath = path.join(process.cwd(), 'public', 'images', 'uploads', filename)
        await writeFile(filepath, buffer)
        imageUrls.push(`/images/uploads/${filename}`)
      }
    }

    const createdProduct = await db.product.create({
      data: {
        ...validatedProduct,
        origin: validatedProduct.origin ?? '', // provide a default value for origin
        images: imageUrls,
      },
    })

    revalidatePath('/admin/products')
    return { success: true, data: createdProduct }
  } catch (error) {
    console.error('Error creating product:', error)
    return { success: false, error: 'Error creating product' }
  }
}

export async function getProducts(page: number = 1, limit: number = 10) {
  try {
    const skip = (page - 1) * limit

    const products = await db.product.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    })

    const total = await db.product.count()

    return {
      success: true,
      data: {
        products,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    return { success: false, error: 'Error fetching products' }
  }
}

export async function updateProduct(formData: FormData) {
  try {
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
    }

    const existingProduct = await db.product.findUnique({ where: { id } })
    if (!existingProduct) {
      return { success: false, error: 'Product not found' }
    }

    const imageUrls: string[] = [...existingProduct.images]

    for (let i = 1; i <= 4; i++) {
      const image = formData.get(`image${i}`) as File | null
      if (image) {
        const bytes = await image.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const filename = `${Date.now()}-${image.name}`
        const filepath = path.join(process.cwd(), 'public', 'images', 'uploads', filename)
        await writeFile(filepath, buffer)
        imageUrls.push(`/images/uploads/${filename}`)
      }
    }

    const updatedProduct = await db.product.update({
      where: { id },
      data: {
        ...product,
        images: imageUrls,
      },
    })

    revalidatePath('/admin/products')
    return { success: true, data: updatedProduct }
  } catch (error) {
    console.error('Error updating product:', error)
    return { success: false, error: 'Error updating product' }
  }
}

export async function deleteProduct(id: string) {
  try {
    const product = await db.product.findUnique({
      where: { id },
    })

    if (!product) {
      return { success: false, error: 'Product not found' }
    }

    for (const imageUrl of product.images) {
      const imagePath = path.join(process.cwd(), 'public', imageUrl)
      await unlink(imagePath)
    }

    await db.product.delete({
      where: { id },
    })

    revalidatePath('/admin/products')
    return { success: true, message: 'Product deleted successfully' }
  } catch (error) {
    console.error('Error deleting product:', error)
    return { success: false, error: 'Error deleting product' }
  }
}

export async function getProduct(id: string) {
  try {
    const product = await db.product.findUnique({
      where: { id },
    })

    if (!product) {
      return { success: false, error: 'Product not found' }
    }

    return { success: true, data: product }
  } catch (error) {
    console.error('Error fetching product:', error)
    return { success: false, error: 'Error fetching product' }
  }
}