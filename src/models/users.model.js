import pool from "../config/db.js";

export const getAllUsers = async () => {
  const [rows] = await pool.query(
    "SELECT id, name, email, is_producer, avatar_url, created_at FROM users"
  );
  return rows;
};

export const getUserById = async (id) => {
  const [rows] = await pool.query(
    "SELECT id, name, email, is_producer, avatar_url, created_at FROM users WHERE id = ?",
    [id]
  );
  return rows[0];
};

export const createUser = async ({
  name,
  email,
  password_hash,
  is_producer = false,
  avatar_url = null,
}) => {
  const [result] = await pool.query(
    "INSERT INTO users (name, email, password_hash, is_producer, avatar_url) VALUES (?, ?, ?, ?, ?)",
    [name, email, password_hash, is_producer, avatar_url]
  );
  return { id: result.insertId, name, email, is_producer, avatar_url };
};

export const updateUser = async (id, updates) => {
  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(updates)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }

  values.push(id);

  const [result] = await pool.query(
    `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
    values
  );
  return result.affectedRows;
};

export const deleteUser = async (id) => {
  const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
  return result.affectedRows;
};
