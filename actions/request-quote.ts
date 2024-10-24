"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { requestAQuoteSchema } from "@/schemas";

export const submitQuoteRequest = async (values: z.infer<typeof requestAQuoteSchema>) => {
  const validatedFields = requestAQuoteSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid form data" };
  }

  const {
    product,
    fullName,
    email,
    phone,
    companyName,
    website,
    needFor,
    productType,
    cultivationType,
    processing,
    unit,
    volume,
    purchaseType,
    deliveryAddress,
    incoterm,
    deliveryDate,
    deliveryFrequency,
    additionalInfo,
  } = validatedFields.data;

  try {
    await db.quote.create({
      data: {
        product,
        fullName,
        email,
        phone: phone || null,
        companyName: companyName || null,
        website: website || null,
        needFor,
        productType,
        cultivationType,
        processing: processing || null,
        unit,
        volume,
        purchaseType,
        deliveryAddress,
        incoterm: incoterm || '',
        deliveryDate,
        deliveryFrequency,
        additionalInfo: additionalInfo || null,
        status: "PENDING",
      },
    });

    return { success: "Quote request submitted successfully" };
  } catch (error) {
    console.error("Error submitting quote request:", error);
    return { error: "Failed to submit quote request" };
  }
};