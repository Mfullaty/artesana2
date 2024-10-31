import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Enter valid email"
  }).toLowerCase(),
  password: z.string().min(1, {
    message: "Password required"
  }),
});


export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required"
  }),
  email: z.string() .email({
    message: "Enter valid email"
  }),
  password: z.string().min(6, {
    message: "Minimum of 6 charachters required"
  }),
});

export const requestAQuoteSchema = z.object({
  // Product Selection
  product: z.string().min(1, "Product selection is required"),
  
  // Contact Information
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  companyName: z.string().optional(),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  needFor: z.enum([
    "import",
    "export",
    "import-export",
    "food-retail",
    "food-services",
    "wholesale",
    "retail",
    "other"
  ], {
    required_error: "Please select what you need this for",
  }),

  // Product Requirements
  productType: z.enum(["hulled", "natural"], {
    required_error: "Please select product type",
  }),
  cultivationType: z.array(z.enum(["organic", "conventional"])).min(1, "Please select at least one cultivation type"),
  processing: z.enum([
    "sun-dried",
    "sortex-cleaned",
    "double-sortex-cleaned",
    "roasted",
    "steam-sterilised"
  ]).optional(),

  // Quantity
  unit: z.enum(["kilogram", "ton", "metric-ton"], {
    required_error: "Please select a unit",
  }),
  volume: z.string().min(1, "Volume is required"),
  purchaseType: z.enum(["annual", "one-time", "not-sure"], {
    required_error: "Please select purchase type",
  }),

  // Delivery
  deliveryAddress: z.string().min(1, "Delivery address is required"),
  incoterm: z.enum(["exw", "fob", "cif", "ddp"]).optional(),
  deliveryDate: z.date({
    required_error: "Please select a delivery date",
  }),
  deliveryFrequency: z.enum([
    "weekly",
    "monthly",
    "quarterly",
    "annually",
    "one-time"
  ], {
    required_error: "Please select delivery frequency",
  }),

  // Additional Information
  additionalInfo: z.string().optional(),
  files: z.array(z.string()).optional(),
});
export type RequestAQuoteFormData = z.infer<typeof requestAQuoteSchema>;