import { NextRequest, NextResponse } from 'next/server'
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { db } from '@/lib/db'

const s3Client = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: "AKIAXQIQACUTMSJ4L5P4",
      secretAccessKey: "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",
    },
  });

async function deleteFromS3(imageUrl: string) {
  const key = imageUrl.split('.amazonaws.com/')[1]
  const command = new DeleteObjectCommand({
    Bucket: "artesana-bucket",
    Key: key,
  })
  await s3Client.send(command)
}

export async function POST(req: NextRequest) {
  try {
    const { productIds } = await req.json()

    if (!Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json({ error: 'Invalid product IDs' }, { status: 400 })
    }

    // Filter out any non-string IDs or the 'bulk' string
    const validProductIds = productIds.filter(id => typeof id === 'string' && id !== 'bulk')

    const products = await db.product.findMany({
      where: {
        id: {
          in: validProductIds
        }
      }
    })

    // Delete all images from S3
    for (const product of products) {
      for (const imageUrl of product.images) {
        try {
          await deleteFromS3(imageUrl)
        } catch (error) {
          console.error('Error deleting image from S3:', error)
        }
      }
    }

    // Delete all products
    const deleteResult = await db.product.deleteMany({
      where: {
        id: {
          in: validProductIds
        }
      }
    })

    return NextResponse.json({ message: `${deleteResult.count} products deleted successfully` })
  } catch (error) {
    console.error('Error deleting products:', error)
    return NextResponse.json({ error: 'Error deleting products' }, { status: 500 })
  }
}