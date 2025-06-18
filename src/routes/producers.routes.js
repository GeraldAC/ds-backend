import { Router } from "express";
import * as producersController from "../controllers/producers.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createProducerInfoSchema } from "../validations/producers.validation.js";

const router = Router();

router.get("/", authenticate, producersController.getProducers);
router.get("/:id", producersController.getProducer);
router.post(
  "/",
  validate(createProducerInfoSchema),
  authenticate,
  producersController.createProducer,
);
router.put("/:id", authenticate, producersController.updateProducer);
router.delete("/:id", authenticate, producersController.deleteProducer);

export default router;
