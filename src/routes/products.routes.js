import { Router } from "express";
import * as productsController from "../controllers/products.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { createProductSchema } from "../validations/products.validation.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/:id/details", productsController.fetchProductDetails);

router.get(
  "/producer",
  authenticate,
  productsController.listProductsByProducer,
);
router.get(
  "/venture/:id",
  authenticate,
  productsController.listProductsByVenture,
);
router.get("/", productsController.getProducts);
router.get("/:id", productsController.getProduct);
router.post(
  "/",
  validate(createProductSchema),
  authenticate,
  productsController.createProduct,
);
router.put("/:id", authenticate, productsController.updateProduct);
router.delete("/:id", authenticate, productsController.deleteProduct);

export default router;
