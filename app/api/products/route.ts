import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { db } from "@/lib/db";
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

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

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    let slug = formData.get("slug") as string;

    // Check if slug already exists and make it unique if needed
    let slugExists = true;
    let uniqueSlug = slug;
    let counter = 1;

    while (slugExists) {
      const existingProduct = await db.product.findUnique({
        where: { slug: uniqueSlug },
      });

      if (!existingProduct) {
        slugExists = false;
      } else {
        // Append a random number to make the slug unique
        uniqueSlug = `${slug}-${counter}`;
        counter++;
      }
    }

    const product = {
      name: formData.get("name") as string,
      slug: uniqueSlug, // Use the unique slug
      description: formData.get("description") as string,
      origin: (formData.get("origin") as string) || "",
      moisture: (formData.get("moisture") as string) || "",
      color: (formData.get("color") as string) || "",
      form: (formData.get("form") as string) || "",
      cultivation: (formData.get("cultivation") as string) || "",
      cultivationType: (formData.get("cultivationType") as string) || "",
      purity: (formData.get("purity") as string) || "",
      grades: (formData.get("grades") as string) || "",
      admixture: (formData.get("admixture") as string) || "",
      defection: (formData.get("defection") as string) || "",
      measurement: (formData.get("measurement") as string) || "",
    };

    const imageUrls: string[] = [];

    // Handle image uploads
    for (let i = 1; i <= 4; i++) {
      const image = formData.get(`image${i}`) as File | null;
      if (image) {
        const filename = `${Date.now()}-${image.name}`;
        const imageUrl = await uploadToS3(image, filename);
        imageUrls.push(imageUrl);
      }
    }

    const createdProduct = await db.product.create({
      data: {
        ...product,
        images: imageUrls,
      },
    });

    return NextResponse.json(createdProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Error creating product" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;
    const product = {
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
      description: formData.get("description") as string,
      origin: (formData.get("origin") as string) || "",
      moisture: (formData.get("moisture") as string) || "",
      color: (formData.get("color") as string) || "",
      form: (formData.get("form") as string) || "",
      cultivation: (formData.get("cultivation") as string) || "",
      cultivationType: (formData.get("cultivationType") as string) || "",
      purity: (formData.get("purity") as string) || "",
      grades: (formData.get("grades") as string) || "",
      admixture: (formData.get("admixture") as string) || "",
      defection: (formData.get("defection") as string) || "",
      measurement: (formData.get("measurement") as string) || "",
    };

    const existingProduct = await db.product.findUnique({ where: { id } });
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
      where: { id },
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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const products = await db.product.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await db.product.count();
    // console.log(products);

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 }
    );
  }
}
