import pool from "../db.js";

const ventures = [
  {
    name: "EcoAndino",
    description: "Productos orgánicos de los Andes peruanos.",
    image_url:
      "https://scontent.fcuz2-1.fna.fbcdn.net/v/t39.30808-6/289996671_488711243059186_3181301956516631774_n.png?...",
    producer_id: 1,
  },
  {
    name: "Wiraccocha",
    description: "Alimentos saludables y agroecológicos.",
    image_url:
      "https://scontent.fcuz2-1.fna.fbcdn.net/v/t39.30808-6/486940515_1078685267610936_4186589355967150479_n.jpg?...",
    producer_id: 2,
  },
  {
    name: "De la Selva",
    description: "Sabores tropicales directamente del productor.",
    image_url:
      "https://scontent.fcuz2-1.fna.fbcdn.net/v/t39.30808-6/405306000_845363904264243_130979765248851425_n.jpg?...",
    producer_id: 3,
  },
];

const connection = await pool.getConnection();

try {
  for (const v of ventures) {
    await connection.query(
      `INSERT INTO ventures (name, description, image_url, producer_id)
       VALUES (?, ?, ?, ?)`,
      [v.name, v.description, v.image_url, v.producer_id],
    );
  }

  console.log("Ventures insertados correctamente.");
} catch (err) {
  console.error("Error al insertar ventures:", err);
} finally {
  connection.release();
}
