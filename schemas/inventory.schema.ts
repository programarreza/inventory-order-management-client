import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .max(100, "Product name cannot exceed 100 characters"),

  categoryId: z.string().min(1, "Category is required"),

  price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Price must be a valid non-negative number",
    }),

  stock: z
    .string()
    .min(1, "Stock is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Stock must be a valid non-negative number",
    }),

  minStock: z
    .string()
    .min(1, "Min stock is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Min stock must be a valid non-negative number",
    }),

  image: z.any().optional(),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;
