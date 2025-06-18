import { z } from "zod";

export const createProductSchema = z.object({
  venture_id: z.number().int(),
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative(),
  image_url: z.string().url().optional(),
});
