"use server";
import { db } from "@/lib/db";
import { requestAQuoteSchema } from "@/schemas";
import { quoteDetailSchema } from "@/schemas/quotes";
import { unlink, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import path from "path";

export interface QuoteDetailResponse {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  companyName: string | null;
  website: string | null;
  needFor: string;
  product: string;
  productType: string;
  cultivationType: string[];
  processing: string | null;
  unit: string;
  volume: string;
  purchaseType: string;
  deliveryAddress: string;
  incoterm: string | null;
  deliveryDate: Date;
  deliveryFrequency: string;
  additionalInfo: string | null;
  files: [] | null;
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
  deliveryDate: Date;
  createdAt: Date;
}

export const submitQuoteRequest = async (formData: FormData) => {
  try {
    // Convert FormData to a proper object with correct types
    const rawData = Object.fromEntries(formData);

    // Parse and transform the data
    const data = {
      ...rawData,
      // Convert cultivationType from string to array
      cultivationType: formData.getAll("cultivationType"),
      // Convert deliveryDate string to Date object
      deliveryDate: new Date(rawData.deliveryDate as string),
      // Handle files separately
      files: formData
        .getAll("files")
        .filter((file): file is File => file instanceof File)
        .map((file) => file.name),
    };

    const validatedFields = requestAQuoteSchema.safeParse(data);

    if (!validatedFields.success) {
      return { error: validatedFields.error.issues[0].message };
    }

    const files = formData
      .getAll("files")
      .filter((file): file is File => file instanceof File);
    const uploadedFiles = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = file.name;
      const filePath = path.join(
        process.cwd(),
        "/public/uploads/files",
        fileName
      );

      await writeFile(filePath, buffer);
      uploadedFiles.push(fileName);
    }

    await db.quote.create({
      data: {
        ...validatedFields.data,
        files: uploadedFiles,
      },
    });

    return { success: "Quote request submitted successfully" };
  } catch (error) {
    console.error("Error submitting quote request:", error);
    return { error: "Failed to submit quote request" };
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
    // First, get the quote to access its files
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

    // Delete associated files
    if (quote.files && quote.files.length > 0) {
      await Promise.all(
        quote.files.map(async (file) => {
          try {
            const filePath = path.join(
              process.cwd(),
              "public/uploads/files",
              file
            );
            await unlink(filePath);
          } catch (error) {
            console.error(`Error deleting file ${file}:`, error);
            // Continue with other files even if one fails
          }
        })
      );
    }

    // Delete the quote from the database
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
      data: quote as QuoteResponse,
    };
  } catch (error) {
    console.error("Error fetching quote:", error);
    return {
      success: false,
      error: "Failed to fetch quote details",
    };
  }
}

export async function updateQuote(
  id: string,
  data: Partial<QuoteDetailResponse>
) {
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
