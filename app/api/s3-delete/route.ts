import { NextRequest, NextResponse } from 'next/server'
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3"


const s3Client = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: "AKIAXQIQACUTMSJ4L5P4",
      secretAccessKey: "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",
    },
  });

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const fileName = searchParams.get('fileName')

    if (!fileName) {
      return NextResponse.json({ error: 'File name is required' }, { status: 400 })
    }

    const command = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `uploads/${fileName}`,
    })

    await s3Client.send(command)

    return NextResponse.json({ message: 'File deleted successfully' })
  } catch (error) {
    console.error('Error deleting file from S3:', error)
    return NextResponse.json({ error: 'Failed to delete file from S3' }, { status: 500 })
  }
}