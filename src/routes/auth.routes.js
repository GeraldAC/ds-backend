import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createUserSchema,
  loginSchema,
} from "../validations/users.validation.js";

const router = Router();

router.post("/register", validate(createUserSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);

export default router;
