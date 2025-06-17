import { Router } from "express";
import * as venturesController from "../controllers/ventures.controller.js";

const router = Router();

router.get("/", venturesController.getVentures);
router.get("/:id", venturesController.getVenture);
router.post("/", venturesController.createVenture);
router.put("/:id", venturesController.updateVenture);
router.delete("/:id", venturesController.deleteVenture);

export default router;
