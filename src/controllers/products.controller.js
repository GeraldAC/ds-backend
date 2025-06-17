import * as ProductsModel from "../models/products.model.js";

export const getProducts = async (req, res) => {
  const products = await ProductsModel.getAllProducts();
  res.json(products);
};

export const getProduct = async (req, res) => {
  const product = await ProductsModel.getProductById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
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
    res.status(201).json(product);
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
