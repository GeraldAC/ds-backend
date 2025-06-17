import { Router } from "express";
import * as usersController from "../controllers/users.controller.js";

const router = Router();

router.get("/", usersController.getUsers);
router.get("/:id", usersController.getUser);
router.post("/", usersController.createUser);
router.put("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

export default router;
