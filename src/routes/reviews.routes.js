import { Router } from "express";
import * as reviewsController from "../controllers/reviews.controller.js";

const router = Router();

router.get("/", reviewsController.getReviews);
router.get("/:id", reviewsController.getReview);
router.post("/", reviewsController.createReview);
router.put("/:id", reviewsController.updateReview);
router.delete("/:id", reviewsController.deleteReview);

export default router;
