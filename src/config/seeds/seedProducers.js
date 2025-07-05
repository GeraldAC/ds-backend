import pool from "../db.js";

const producers = [
  {
    user_id: 1,
    bio: "Agricultora de Cusco dedicada a productos orgánicos andinos.",
    location: "Cusco, Perú",
    phone: "+51999999901",
  },
  {
    user_id: 2,
    bio: "Fundador de Organik, una iniciativa agroecológica de la costa peruana.",
    location: "Lima, Perú",
    phone: "+51999999902",
  },
  {
    user_id: 3,
    bio: "Emprendedora rural especializada en frutas tropicales.",
    location: "Tarapoto, Perú",
    phone: "+51999999903",
  },
];

const connection = await pool.getConnection();

try {
  for (const p of producers) {
    await connection.query(
      `INSERT INTO producers_info (user_id, bio, location, phone)
       VALUES (?, ?, ?, ?)`,
      [p.user_id, p.bio, p.location, p.phone],
    );
  }

  console.log("Producers info insertado correctamente.");
} catch (err) {
  console.error("Error al insertar producers_info:", err);
} finally {
  connection.release();
}
