import { z } from "zod";

export const createReviewSchema = z.object({
  product_id: z.number().int(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
});
