import * as ProductsModel from "../models/products.model.js";
import {
  serializeProduct,
  serializeProducts,
} from "../utils/product.serializer.js";

export const listProductsByVenture = async (req, res) => {
  try {
    const ventureId = req.params.id;

    const products = await ProductsModel.getProductsByVentureId(ventureId);

    res.status(200).json(serializeProducts(products));
  } catch (error) {
    console.error("Error al obtener productos por venture:", error);
    res.status(500).json({ message: "Error al obtener los productos." });
  }
};

export const listProductsByProducer = async (req, res) => {
  try {
    const producerId = req.user.id;
    const products = await ProductsModel.getProductsByProducerId(producerId);
    res.status(200).json(serializeProducts(products));
  } catch (error) {
    console.error("Error al obtener productos por producer:", error);
    res.status(500).json({ message: "Error al obtener los productos." });
  }
};

export const getProducts = async (req, res) => {
  const products = await ProductsModel.getAllProducts();
  res.json(serializeProducts(products));
};

export const getProduct = async (req, res) => {
  const product = await ProductsModel.getProductById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(serializeProduct(product));
};

export const createProduct = async (req, res) => {
  const { venture_id, name, description, price, stock, image_url } = req.body;
  try {
    const product = await ProductsModel.createProduct({
      venture_id,
      name,
      description,
      price,
      stock,
      image_url,
    });
    res.status(201).json(serializeProduct(product));
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating product", error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  const updated = await ProductsModel.updateProduct(req.params.id, req.body);
  if (updated === 0)
    return res
      .status(404)
      .json({ message: "Product not found or no changes made" });
  res.json({ message: "Product updated successfully" });
};

export const deleteProduct = async (req, res) => {
  const deleted = await ProductsModel.deleteProduct(req.params.id);
  if (deleted === 0)
    return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Product deleted successfully" });
};
