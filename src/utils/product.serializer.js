export const serializeProduct = (product) => ({
  ...product,
  price: parseFloat(product.price),
});

export const serializeProducts = (products) => products.map(serializeProduct);
