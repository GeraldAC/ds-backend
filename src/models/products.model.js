import pool from "../config/db.js";

export const getProductDetails = async (productId) => {
  const [productRows] = await pool.query(
    `
    SELECT * FROM products WHERE id = ?
    `,
    [productId],
  );

  if (productRows.length === 0) return null;
  const product = productRows[0];

  const [ventureRows] = await pool.query(
    `
    SELECT * FROM ventures WHERE id = ?
    `,
    [product.venture_id],
  );
  const venture = ventureRows[0];

  const [producerUserRows] = await pool.query(
    `
    SELECT * FROM users WHERE id = ?
    `,
    [venture.producer_id],
  );
  const producerUser = producerUserRows[0];

  const [producerInfoRows] = await pool.query(
    `
    SELECT * FROM producers_info WHERE user_id = ?
    `,
    [venture.producer_id],
  );
  const producerInfo = producerInfoRows[0];

  const [reviews] = await pool.query(
    `
    SELECT r.*, u.name AS user_name, u.avatar_url
    FROM reviews r
    JOIN users u ON r.user_id = u.id
    WHERE r.product_id = ?
    ORDER BY r.created_at DESC
    `,
    [productId],
  );

  return {
    product,
    venture,
    producerUser,
    producerInfo,
    reviews,
  };
};

export const getProductsByVentureId = async (ventureId) => {
  const [rows] = await pool.query(
    `
    SELECT p.id, p.name, p.description, p.price, p.stock, p.image_url, p.created_at,
           p.venture_id, v.name AS venture_name
    FROM products p
    JOIN ventures v ON p.venture_id = v.id
    WHERE p.venture_id = ?
  `,
    [ventureId],
  );
  return rows;
};

export const getProductsByProducerId = async (producerId) => {
  const [rows] = await pool.query(
    `
    SELECT 
      p.id AS product_id,
      p.name AS product_name,
      p.description AS product_description,
      p.price,
      p.stock,
      p.image_url,
      p.created_at,
      v.id AS venture_id,
      v.name AS venture_name
    FROM products p
    JOIN ventures v ON p.venture_id = v.id
    JOIN producers_info pi ON v.producer_id = pi.user_id
    WHERE pi.user_id = ?
    `,
    [producerId],
  );
  return rows;
};

export const getAllProducts = async () => {
  const [rows] = await pool.query(`
    SELECT p.id, p.name, p.description, p.price, p.stock, p.image_url, p.created_at,
           p.venture_id, v.name AS venture_name
    FROM products p
    JOIN ventures v ON p.venture_id = v.id
  `);
  return rows;
};

export const getProductById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT p.id, p.name, p.description, p.price, p.stock, p.image_url, p.created_at,
           p.venture_id, v.name AS venture_name
    FROM products p
    JOIN ventures v ON p.venture_id = v.id
    WHERE p.id = ?
  `,
    [id],
  );
  return rows[0];
};

export const createProduct = async ({
  venture_id,
  name,
  description,
  price,
  stock,
  image_url,
}) => {
  const [result] = await pool.query(
    `INSERT INTO products (venture_id, name, description, price, stock, image_url)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [venture_id, name, description, price, stock, image_url],
  );
  return {
    id: result.insertId,
    venture_id,
    name,
    description,
    price,
    stock,
    image_url,
  };
};

export const updateProduct = async (id, updates) => {
  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(updates)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }

  values.push(id);

  const [result] = await pool.query(
    `UPDATE products SET ${fields.join(", ")} WHERE id = ?`,
    values,
  );
  return result.affectedRows;
};

export const deleteProduct = async (id) => {
  const [result] = await pool.query("DELETE FROM products WHERE id = ?", [id]);
  return result.affectedRows;
};
