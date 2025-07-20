import pool from "../src/config/db.js";

// Limpia la base antes de cada prueba
export const clearDatabase = async () => {
  const tables = ["reviews", "products", "ventures", "producers_info", "users"];
  for (const table of tables) {
    await pool.query(`DELETE FROM ${table}`);
  }
};

// Cierra conexiones al finalizar los tests
export const closeDatabase = async () => {
  await pool.end();
};
