import pool from "../db.js";
import seedAll from "./seedAll.js";

const resetAndSeed = async () => {
  const connection = await pool.getConnection();

  try {
    // Desactiva checks de claves foráneas
    await connection.query("SET FOREIGN_KEY_CHECKS = 0");

    // Borra contenido de las tablas y reinicia ID
    const tables = [
      "reviews",
      "products",
      "ventures",
      "producers_info",
      "users",
    ];
    for (const table of tables) {
      await connection.query(`TRUNCATE TABLE ${table}`);
    }

    // Reactiva checks
    await connection.query("SET FOREIGN_KEY_CHECKS = 1");

    console.log("> Base de datos limpiada.");

    // Reseed
    await seedAll();
  } catch (error) {
    console.error("Error al resetear y poblar la base:", error);
  } finally {
    connection.release();
  }
};

resetAndSeed();
