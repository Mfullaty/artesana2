import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  DeleteObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { db } from "@/lib/db";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

async function deleteFromS3(imageUrl: string) {
  const key = imageUrl.split(".amazonaws.com/")[1];
  const command = new DeleteObjectCommand({
    Bucket: "artesana-bucket",
    Key: key,
  });
  await s3Client.send(command);
}

async function uploadToS3(file: File, filename: string): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const command = new PutObjectCommand({
    Bucket: "artesana-bucket",
    Key: filename,
    Body: buffer,
    ContentType: file.type,
  });

  await s3Client.send(command);
  return `https://artesana-bucket.s3.amazonaws.com/${filename}`;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const product = await db.product.findUnique({
      where: { slug: params.slug },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Error fetching product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const formData = await req.formData();
    const product = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      origin: formData.get("origin") as string,
      moisture: formData.get("moisture") as string,
      color: formData.get("color") as string,
      form: formData.get("form") as string,
      cultivation: formData.get("cultivation") as string,
      cultivationType: formData.get("cultivationType") as string,
      purity: formData.get("purity") as string,
      grades: formData.get("grades") as string,
      admixture: formData.get("admixture") as string,
      defection: formData.get("defection") as string,
      measurement: formData.get("measurement") as string,
    };

    const existingProduct = await db.product.findUnique({
      where: { slug: params.slug },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const imageUrls: string[] = [...existingProduct.images];

    // Handle image uploads
    for (let i = 1; i <= 4; i++) {
      const image = formData.get(`image${i}`) as File | null;
      if (image) {
        const filename = `${Date.now()}-${image.name}`;
        const imageUrl = await uploadToS3(image, filename);
        imageUrls.push(imageUrl);
      }
    }

    const updatedProduct = await db.product.update({
      where: { slug: params.slug },
      data: {
        ...product,
        images: imageUrls,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Error updating product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const product = await db.product.findUnique({
      where: { slug: params.slug },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Delete images from S3
    for (const imageUrl of product.images) {
      try {
        await deleteFromS3(imageUrl);
      } catch (error) {
        console.error("Error deleting image from S3:", error);
      }
    }

    await db.product.delete({
      where: { slug: params.slug },
    });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Error deleting product" },
      { status: 500 }
    );
  }
}
