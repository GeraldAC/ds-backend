import { Router } from "express";
import * as venturesController from "../controllers/ventures.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createVentureSchema } from "../validations/ventures.validation.js";

const router = Router();

router.get("/", authenticate, venturesController.getVentures);
router.get("/:id", venturesController.getVenture);
router.post(
  "/",
  validate(createVentureSchema),
  authenticate,
  venturesController.createVenture,
);
router.put("/:id", authenticate, venturesController.updateVenture);
router.delete("/:id", authenticate, venturesController.deleteVenture);

export default router;
