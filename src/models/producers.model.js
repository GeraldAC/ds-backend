import pool from "../config/db.js";

export const getAllProducers = async () => {
  const [rows] = await pool.query(`
    SELECT pi.id, pi.user_id, u.name, pi.bio, pi.location, pi.phone
    FROM producers_info pi
    JOIN users u ON pi.user_id = u.id
  `);
  return rows;
};

export const getProducerById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT pi.id, pi.user_id, u.name, pi.bio, pi.location, pi.phone
    FROM producers_info pi
    JOIN users u ON pi.user_id = u.id
    WHERE pi.id = ?
  `,
    [id],
  );
  return rows[0];
};

export const getProducerByUserId = async (userId) => {
  const [rows] = await pool.query(
    `
    SELECT pi.id, pi.user_id, u.name, pi.bio, pi.location, pi.phone
    FROM producers_info pi
    JOIN users u ON pi.user_id = u.id
    WHERE pi.user_id = ?
    `,
    [userId],
  );
  return rows[0];
};

export const createProducer = async ({ user_id, bio, location, phone }) => {
  const [result] = await pool.query(
    "INSERT INTO producers_info (user_id, bio, location, phone) VALUES (?, ?, ?, ?)",
    [user_id, bio, location, phone],
  );
  return { id: result.insertId, user_id, bio, location, phone };
};

export const updateProducer = async (id, updates) => {
  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(updates)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }

  values.push(id);

  const [result] = await pool.query(
    `UPDATE producers_info SET ${fields.join(", ")} WHERE id = ?`,
    values,
  );
  return result.affectedRows;
};

export const deleteProducer = async (id) => {
  const [result] = await pool.query("DELETE FROM producers_info WHERE id = ?", [
    id,
  ]);
  return result.affectedRows;
};
