import { z } from "zod";

export const createVentureSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  image_url: z.string().url().optional(),
  producer_id: z.number().int(),
});
