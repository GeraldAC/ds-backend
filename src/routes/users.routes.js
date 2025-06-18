import { Router } from "express";
import * as usersController from "../controllers/users.controller.js";

import { validate } from "../middlewares/validate.middleware.js";
import { createUserSchema } from "../validations/users.validation.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.get("/", usersController.getUsers);
router.get("/:id", usersController.getUser);
router.post("/", validate(createUserSchema), usersController.createUser);
router.put("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

export default router;
