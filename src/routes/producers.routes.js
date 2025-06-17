import { Router } from "express";
import * as producersController from "../controllers/producers.controller.js";

const router = Router();

router.get("/", producersController.getProducers);
router.get("/:id", producersController.getProducer);
router.post("/", producersController.createProducer);
router.put("/:id", producersController.updateProducer);
router.delete("/:id", producersController.deleteProducer);

export default router;
