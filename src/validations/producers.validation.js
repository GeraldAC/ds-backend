import { z } from "zod";

export const createProducerInfoSchema = z.object({
  bio: z.string().optional(),
  location: z.string().max(150).optional(),
  phone: z.string().regex(/^\+?\d{7,15}$/, "Número telefónico inválido"),
});
