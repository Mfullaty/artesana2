import { z } from "zod";

export const quotesQuerySchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

export type QuotesQuery = z.infer<typeof quotesQuerySchema>;


export const quoteDetailSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().nullable(),
  companyName: z.string().nullable(),
  website: z.string().url("Invalid website URL").nullable(),
  needFor: z.enum([
    "import",
    "export",
    "import-export",
    "food-retail",
    "food-services",
    "wholesale",
    "retail",
    "other"
  ]),
  product: z.string().min(1, "Product is required"),
  productType: z.enum(["hulled", "natural"]),
  cultivationType: z.array(z.enum(["organic", "conventional"])),
  processing: z.string().nullable(),
  unit: z.enum(["kilogram", "ton", "metric-ton"]),
  volume: z.string().min(1, "Volume is required"),
  purchaseType: z.enum(["annual", "one-time", "not-sure"]),
  deliveryAddress: z.string().min(1, "Delivery address is required"),
  incoterm: z.enum(["exw", "fob", "cif", "ddp"]).nullable(),
  deliveryDate: z.date(),
  deliveryFrequency: z.enum([
    "weekly",
    "monthly",
    "quarterly",
    "annually",
    "one-time"
  ]),
  additionalInfo: z.string().nullable(),
  files: z.array(z.string())
});

export type QuoteDetailFormData = z.infer<typeof quoteDetailSchema>;
