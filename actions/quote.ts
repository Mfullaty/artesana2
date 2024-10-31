"use server";

import { db } from "@/lib/db";
import { requestAQuoteSchema } from "@/schemas";
import { quoteDetailSchema, QuoteDetailFormData } from "@/schemas/quotes";
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { unlink, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import path from "path";

export interface QuoteDetailResponse extends QuoteDetailFormData {
  id: string;
  createdAt: Date;
}

export interface QuoteResponse {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  companyName: string | null;
  product: string;
  productType: string;
  volume: string;
  unit: string;
  files: string[];
  deliveryDate: Date;
  createdAt: Date;
}


const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

async function uploadFileToS3(file: File): Promise<string> {
  const key = `quotes/${Date.now()}-${file.name}`;
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
    ContentType: file.type,
  });

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  
  const response = await fetch(signedUrl, {
    method: 'PUT',
    body: await file.arrayBuffer(),
    headers: {
      'Content-Type': file.type,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to upload file: ${response.statusText}`);
  }

  return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}

async function deleteFileFromS3(fileUrl: string) {
  const key = fileUrl.split('.com/')[1];
  const command = new DeleteObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
  });

  await s3Client.send(command);
}

export const submitQuoteRequest = async (formData: FormData) => {
  try {
    const files = formData.getAll("files") as File[];
    const fileUrls: string[] = [];

    for (const file of files) {
      const fileUrl = await uploadFileToS3(file);
      fileUrls.push(fileUrl);
    }

    const rawData = Object.fromEntries(formData);
    const data = {
      ...rawData,
      cultivationType: formData.getAll("cultivationType"),
      deliveryDate: new Date(rawData.deliveryDate as string),
      files: fileUrls,
    };

    const validatedFields = requestAQuoteSchema.safeParse(data);

    if (!validatedFields.success) {
      return { error: validatedFields.error.issues[0].message };
    }

    await db.quote.create({
      data: {
        ...validatedFields.data,
        files: fileUrls,
      },
    });

    revalidatePath("/requestAQuote");
    return { success: "Quote request submitted successfully" };
  } catch (error) {
    console.error("Error submitting quote request:", error);
    return { error: "Failed to submit quote request" };
  }
};

export const deleteFile = async (fileUrl: string) => {
  try {
    await deleteFileFromS3(fileUrl);
    return { success: "File deleted successfully" };
  } catch (error) {
    console.error("Error deleting file:", error);
    return { error: "Failed to delete file" };
  }
};

export async function getQuotes(page: number, limit: number) {
  try {
    const skip = (page - 1) * limit;
    const [quotes, total] = await Promise.all([
      db.quote.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          fullName: true,
          email: true,
          phone: true,
          companyName: true,
          product: true,
          productType: true,
          volume: true,
          unit: true,
          deliveryDate: true,
          createdAt: true,
          files: true,
        },
      }),
      db.quote.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      data: {
        quotes: quotes as QuoteResponse[],
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: total,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return {
      success: false,
      error: "Failed to fetch quotes",
    };
  }
}

export async function deleteQuote(id: string) {
  try {
    const quote = await db.quote.findUnique({
      where: { id },
      select: { files: true },
    });

    if (!quote) {
      return {
        success: false,
        error: "Quote not found",
      };
    }

    if (quote.files && quote.files.length > 0) {
      await Promise.all(
        quote.files.map(async (file) => {
          try {
            const filePath = path.join(process.cwd(), "public/uploads/files", file);
            await unlink(filePath);
          } catch (error) {
            console.error(`Error deleting file ${file}:`, error);
          }
        })
      );
    }

    await db.quote.delete({
      where: { id },
    });

    revalidatePath("/admin/quotes");
    return { success: true };
  } catch (error) {
    console.error("Error deleting quote:", error);
    return {
      success: false,
      error: "Failed to delete quote",
    };
  }
}

export async function getQuoteDetail(id: string) {
  try {
    const quote = await db.quote.findUnique({
      where: { id },
    });

    if (!quote) {
      return {
        success: false,
        error: "Quote not found",
      };
    }

    return {
      success: true,
      data: quote as QuoteDetailResponse,
    };
  } catch (error) {
    console.error("Error fetching quote:", error);
    return {
      success: false,
      error: "Failed to fetch quote details",
    };
  }
}

export async function updateQuote(id: string, data: Partial<QuoteDetailFormData>) {
  try {
    const validatedFields = quoteDetailSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        success: false,
        error: validatedFields.error.issues[0].message,
      };
    }

    await db.quote.update({
      where: { id },
      data: validatedFields.data,
    });

    revalidatePath(`/admin/quotes/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating quote:", error);
    return {
      success: false,
      error: "Failed to update quote",
    };
  }
}