import { NextRequest, NextResponse } from "next/server";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
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

export async function POST(req: NextRequest) {
  try {
    const { productSlugs } = await req.json();

    if (!Array.isArray(productSlugs) || productSlugs.length === 0) {
      return NextResponse.json(
        { error: "Invalid product slugs" },
        { status: 400 }
      );
    }

    // Filter out any non-string slugs or the 'bulk' string
    const validProductSlugs = productSlugs.filter(
      (slug) => typeof slug === "string" && slug !== "bulk"
    );

    const products = await db.product.findMany({
      where: {
        slug: {
          in: validProductSlugs,
        },
      },
    });

    // Delete all images from S3
    for (const product of products) {
      for (const imageUrl of product.images) {
        try {
          await deleteFromS3(imageUrl);
        } catch (error) {
          console.error("Error deleting image from S3:", error);
        }
      }
    }

    // Delete all products
    const deleteResult = await db.product.deleteMany({
      where: {
        slug: {
          in: validProductSlugs,
        },
      },
    });

    return NextResponse.json({
      message: `${deleteResult.count} products deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting products:", error);
    return NextResponse.json(
      { error: "Error deleting products" },
      { status: 500 }
    );
  }
}
