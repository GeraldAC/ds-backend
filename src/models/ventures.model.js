import pool from "../config/db.js";

export const getAllVentures = async () => {
  const [rows] = await pool.query(`
    SELECT v.id, v.name, v.description, v.image_url, v.created_at,
           v.producer_id, u.name AS producer_name
    FROM ventures v
    JOIN users u ON v.producer_id = u.id
  `);
  return rows;
};

export const getVentureById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT v.id, v.name, v.description, v.image_url, v.created_at,
           v.producer_id, u.name AS producer_name
    FROM ventures v
    JOIN users u ON v.producer_id = u.id
    WHERE v.id = ?
  `,
    [id]
  );
  return rows[0];
};

export const createVenture = async ({
  name,
  description,
  image_url,
  producer_id,
}) => {
  const [result] = await pool.query(
    `INSERT INTO ventures (name, description, image_url, producer_id)
     VALUES (?, ?, ?, ?)`,
    [name, description, image_url, producer_id]
  );
  return { id: result.insertId, name, description, image_url, producer_id };
};

export const updateVenture = async (id, updates) => {
  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(updates)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }

  values.push(id);

  const [result] = await pool.query(
    `UPDATE ventures SET ${fields.join(", ")} WHERE id = ?`,
    values
  );
  return result.affectedRows;
};

export const deleteVenture = async (id) => {
  const [result] = await pool.query("DELETE FROM ventures WHERE id = ?", [id]);
  return result.affectedRows;
};
