import { Router } from "express";
import * as reviewsController from "../controllers/reviews.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createReviewSchema } from "../validations/reviews.validation.js";

const router = Router();

router.get("/average/:productId", reviewsController.getAverageRating);
router.get("/user/:userId", reviewsController.getReviewsByUserId);
router.get("/", authenticate, reviewsController.getReviews);
router.get("/:id", reviewsController.getReview);
router.post(
  "/",
  validate(createReviewSchema),
  authenticate,
  reviewsController.createReview,
);
router.put("/:id", authenticate, reviewsController.updateReview);
router.delete("/:id", authenticate, reviewsController.deleteReview);

export default router;
