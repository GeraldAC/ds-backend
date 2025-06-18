import { Router } from "express";
import userRoutes from "./users.routes.js";
import producerRoutes from "./producers.routes.js";
import ventureRoutes from "./ventures.routes.js";
import productRoutes from "./products.routes.js";
import reviewRoutes from "./reviews.routes.js";
import authRoutes from "./auth.routes.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/producers", producerRoutes);
router.use("/ventures", ventureRoutes);
router.use("/products", productRoutes);
router.use("/reviews", reviewRoutes);
router.use("/auth", authRoutes);

export default router;
