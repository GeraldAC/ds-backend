import pool from "../config/db.js";

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
    [id]
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
    [venture_id, name, description, price, stock, image_url]
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
    values
  );
  return result.affectedRows;
};

export const deleteProduct = async (id) => {
  const [result] = await pool.query("DELETE FROM products WHERE id = ?", [id]);
  return result.affectedRows;
};
