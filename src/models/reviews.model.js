import pool from "../config/db.js";

export const getUserReviewsWithProduct = async (userId) => {
  const [rows] = await pool.query(
    `
    SELECT
      r.id,
      r.rating,
      r.comment,
      r.created_at,
      p.id AS product_id,
      p.name AS product_name,
      p.image_url AS product_image_url
    FROM reviews r
    INNER JOIN products p ON r.product_id = p.id
    WHERE r.user_id = ?
    ORDER BY r.created_at DESC
    `,
    [userId],
  );

  return rows;
};

export const getAllReviews = async () => {
  const [rows] = await pool.query(`
    SELECT r.id, r.rating, r.comment, r.created_at,
           r.product_id, p.name AS product_name,
           r.user_id, u.name AS user_name
    FROM reviews r
    JOIN products p ON r.product_id = p.id
    JOIN users u ON r.user_id = u.id
  `);
  return rows;
};

export const getReviewById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT r.id, r.rating, r.comment, r.created_at,
           r.product_id, p.name AS product_name,
           r.user_id, u.name AS user_name
    FROM reviews r
    JOIN products p ON r.product_id = p.id
    JOIN users u ON r.user_id = u.id
    WHERE r.id = ?
  `,
    [id],
  );
  return rows[0];
};

export const createReview = async ({
  product_id,
  user_id,
  rating,
  comment,
}) => {
  const [result] = await pool.query(
    `INSERT INTO reviews (product_id, user_id, rating, comment)
     VALUES (?, ?, ?, ?)`,
    [product_id, user_id, rating, comment],
  );
  return { id: result.insertId, product_id, user_id, rating, comment };
};

export const updateReview = async (id, updates) => {
  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(updates)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }

  values.push(id);

  const [result] = await pool.query(
    `UPDATE reviews SET ${fields.join(", ")} WHERE id = ?`,
    values,
  );
  return result.affectedRows;
};

export const deleteReview = async (id) => {
  const [result] = await pool.query("DELETE FROM reviews WHERE id = ?", [id]);
  return result.affectedRows;
};
